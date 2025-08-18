import { useState, useCallback, useRef, useEffect } from 'react';

export interface VoiceSettings {
  enabled: boolean;
  autoSpeak: boolean;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

export const useVoiceChat = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    autoSpeak: false,
    voice: null,
    rate: 1.1,
    pitch: 1,
    volume: 0.9
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      synthRef.current = speechSynthesis;

      // Configure speech recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      // Load available voices
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Set default voice (prefer Hindi voice, then English)
        const defaultVoice = availableVoices.find(voice => 
          voice.lang.startsWith('hi')
        ) || availableVoices.find(voice => 
          voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
        ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        
        if (defaultVoice) {
          setSettings(prev => ({ ...prev, voice: defaultVoice }));
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
      
      // Load saved settings
      const savedSettings = localStorage.getItem('voice-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          // Find the saved voice by name
          const savedVoice = availableVoices.find(v => v.name === parsed.voiceName);
          setSettings(prev => ({
            ...prev,
            ...parsed,
            voice: savedVoice || prev.voice
          }));
        } catch (error) {
          console.error('Failed to load voice settings:', error);
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settingsToSave = {
      ...settings,
      voiceName: settings.voice?.name || null
    };
    delete (settingsToSave as any).voice; // Don't save the voice object itself
    
    localStorage.setItem('voice-settings', JSON.stringify(settingsToSave));
  }, [settings]);

  const startListening = useCallback((onResult: (text: string) => void, onError?: (error: string) => void) => {
    if (!recognitionRef.current || !settings.enabled) return;

    setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError?.(event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsListening(false);
      onError?.('Failed to start listening');
    }
  }, [settings.enabled]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current || !settings.enabled || !settings.voice) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = settings.voice;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      console.error('Speech synthesis error');
    };

    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  }, [settings]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem('voice-settings');
    window.location.reload();
  }, []);

  return {
    isListening,
    isSpeaking,
    isSupported,
    voices,
    settings,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    updateSettings
    updateSettings,
    resetToDefaults
  };
};