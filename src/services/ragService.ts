import trainingData from '../data/iot_rag_training_2000_combined_sorted.csv?raw';

interface RAGEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}

class RAGService {
  private knowledgeBase: RAGEntry[] = [];
  private isInitialized = false;

  constructor() {
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    try {
      const lines = trainingData.split('\n');
      lines.slice(1).forEach(line => {
        if (line.trim()) {
          const match = line.match(/^(\d+),([^,]+),"?([^"]+)"?,"?(.+)"?$/);
          if (match) {
            this.knowledgeBase.push({
              id: match[1],
              category: match[2],
              question: match[3],
              answer: match[4]
            });
          }
        }
      });
      this.isInitialized = true;
      console.log(`RAG Knowledge Base initialized with ${this.knowledgeBase.length} entries`);
    } catch (error) {
      console.error('Failed to initialize RAG knowledge base:', error);
    }
  }

  loadAdditionalCSV(csvContent: string) {
    try {
      const lines = csvContent.split('\n');
      let addedCount = 0;

      lines.slice(1).forEach((line, index) => {
        if (line.trim()) {
          const match = line.match(/^(\d+),([^,]+),"?([^"]+)"?,"?(.+)"?$/);
          if (match) {
            this.knowledgeBase.push({
              id: `custom_${Date.now()}_${index}`,
              category: match[2],
              question: match[3],
              answer: match[4]
            });
            addedCount++;
          }
        }
      });

      console.log(`Added ${addedCount} entries from custom CSV`);
      return { success: true, count: addedCount };
    } catch (error) {
      console.error('Failed to load additional CSV:', error);
      return { success: false, count: 0, error: String(error) };
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.8;

    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    let matchCount = 0;
    words1.forEach(word => {
      if (words2.some(w => w.includes(word) || word.includes(w))) {
        matchCount++;
      }
    });

    return matchCount / Math.max(words1.length, words2.length);
  }

  findBestMatch(query: string): RAGEntry | null {
    if (!this.isInitialized || this.knowledgeBase.length === 0) {
      return null;
    }

    let bestMatch: RAGEntry | null = null;
    let bestScore = 0;

    this.knowledgeBase.forEach(entry => {
      const score = this.calculateSimilarity(query, entry.question);
      if (score > bestScore && score > 0.3) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    return bestMatch;
  }

  searchByCategory(category: string): RAGEntry[] {
    return this.knowledgeBase.filter(entry =>
      entry.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  getAllCategories(): string[] {
    const categories = new Set<string>();
    this.knowledgeBase.forEach(entry => categories.add(entry.category));
    return Array.from(categories).sort();
  }

  getRandomEntry(): RAGEntry | null {
    if (this.knowledgeBase.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.knowledgeBase.length);
    return this.knowledgeBase[randomIndex];
  }

  isAvailable(): boolean {
    return this.isInitialized && this.knowledgeBase.length > 0;
  }

  getKnowledgeBaseSize(): number {
    return this.knowledgeBase.length;
  }
}

export const ragService = new RAGService();
