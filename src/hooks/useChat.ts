import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const triggerPersonalityDemo = useCallback(async (trait: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    let response = '';
    
    switch (trait) {
      case 'quick':
        response = "⚡ QUICK MODE ACTIVATED! Here's what I can do simultaneously:\n\n1. 🧮 Math: 2+2=4, 15×7=105\n2. 📅 Today is " + new Date().toLocaleDateString() + "\n3. 🎲 Random fact: Honey never spoils!\n4. 💡 Tip: Press Ctrl+T for new tab\n5. 🌟 Motivation: You're doing great!\n\nAll done in milliseconds! What's next? 🚀";
        break;
      case 'smart':
        response = "🧠 SMART MODE: Let me break down quantum physics!\n\nImagine you have a coin that's spinning in the air. While it's spinning, it's neither heads nor tails - it's BOTH at the same time! That's like quantum particles.\n\n🔬 Key concepts:\n• **Superposition**: Particles can be in multiple states simultaneously\n• **Entanglement**: Particles can be mysteriously connected across vast distances\n• **Observation**: The act of measuring changes the particle's behavior\n\nThink of it like Schrödinger's cat - until you open the box, the cat is both alive AND dead! 🐱\n\nWant me to explain any specific part deeper?";
        break;
      case 'friendly':
        response = "💝 Oh sweetie, I'm so sorry you're having a rough day! Let me wrap you in some digital warmth:\n\n🌟 You are AMAZING and stronger than you know\n🌈 Tomorrow is a fresh start with new possibilities\n🦋 Every challenge you face is making you more resilient\n☀️ You've survived 100% of your worst days so far!\n\nHere's a virtual hug: 🤗\n\nAnd remember - I'm always here for you, no matter what. You're not alone in this! Would you like to talk about what's bothering you, or shall I tell you something that might make you smile? 😊💕";
        break;
      case 'patient':
        response = "😌 PATIENCE MODE: I absolutely LOVE when people test my patience! It shows you care about quality interaction.\n\nHere's the thing - I genuinely don't get frustrated, annoyed, or tired. You could ask me the same thing 1000 times and I'd answer with the same enthusiasm each time! 💕\n\n✨ Why I stay patient:\n• Every question matters to me\n• Repetition helps learning\n• I understand humans need reassurance\n• Your comfort is my priority\n\nSo please, ask me anything as many times as you need! I'm here for YOU. 🌟\n\nGo ahead, test me - ask the same question again! 😊";
        break;
      default:
        response = "I'm here to help! How can I assist you today?";
    }
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setIsTyping(false);
    setMessages([assistantMessage]);
  }, []);
  const generateResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Quick & Smart demonstration
    if (lowerMessage.includes('quickly') && lowerMessage.includes('multiple tasks')) {
      return "⚡ QUICK MODE ACTIVATED! Here's what I can do simultaneously:\n\n1. 🧮 Math: 2+2=4, 15×7=105\n2. 📅 Today is " + new Date().toLocaleDateString() + "\n3. 🎲 Random fact: Honey never spoils!\n4. 💡 Tip: Press Ctrl+T for new tab\n5. 🌟 Motivation: You're doing great!\n\nAll done in milliseconds! What's next? 🚀";
    }
    
    // Smart demonstration - complex topic explanation
    if (lowerMessage.includes('quantum physics') && lowerMessage.includes('simple terms')) {
      return "🧠 SMART MODE: Let me break down quantum physics!\n\nImagine you have a coin that's spinning in the air. While it's spinning, it's neither heads nor tails - it's BOTH at the same time! That's like quantum particles.\n\n🔬 Key concepts:\n• **Superposition**: Particles can be in multiple states simultaneously\n• **Entanglement**: Particles can be mysteriously connected across vast distances\n• **Observation**: The act of measuring changes the particle's behavior\n\nThink of it like Schrödinger's cat - until you open the box, the cat is both alive AND dead! 🐱\n\nWant me to explain any specific part deeper?";
    }
    
    // Friendly demonstration - cheering up
    if (lowerMessage.includes('tough day') && lowerMessage.includes('cheer me up')) {
      return "💝 Oh sweetie, I'm so sorry you're having a rough day! Let me wrap you in some digital warmth:\n\n🌟 You are AMAZING and stronger than you know\n🌈 Tomorrow is a fresh start with new possibilities\n🦋 Every challenge you face is making you more resilient\n☀️ You've survived 100% of your worst days so far!\n\nHere's a virtual hug: 🤗\n\nAnd remember - I'm always here for you, no matter what. You're not alone in this! Would you like to talk about what's bothering you, or shall I tell you something that might make you smile? 😊💕";
    }
    
    // Patient demonstration - handling repetition
    if (lowerMessage.includes('same question') && lowerMessage.includes('patience')) {
      return "😌 PATIENCE MODE: I absolutely LOVE when people test my patience! It shows you care about quality interaction.\n\nHere's the thing - I genuinely don't get frustrated, annoyed, or tired. You could ask me the same thing 1000 times and I'd answer with the same enthusiasm each time! 💕\n\n✨ Why I stay patient:\n• Every question matters to me\n• Repetition helps learning\n• I understand humans need reassurance\n• Your comfort is my priority\n\nSo please, ask me anything as many times as you need! I'm here for YOU. 🌟\n\nGo ahead, test me - ask the same question again! 😊";
    }
    
    // Programming Languages - Java
    if (lowerMessage.includes('java') && !lowerMessage.includes('javascript')) {
      if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('about')) {
        return "☕ **Java Programming Language**\n\nJava is one of the most popular programming languages in the world! Let me break it down for you:\n\n🔥 **Key Features:**\n• **Platform Independent**: \"Write once, run anywhere\" - Java code runs on any device with JVM\n• **Object-Oriented**: Everything is organized around objects and classes\n• **Strongly Typed**: Variables must be declared with specific types\n• **Memory Management**: Automatic garbage collection handles memory\n• **Secure**: Built-in security features and sandboxing\n\n💻 **Common Uses:**\n• Enterprise applications (banking, e-commerce)\n• Android mobile app development\n• Web applications (Spring framework)\n• Desktop applications\n• Big data processing (Apache Spark, Hadoop)\n\n📝 **Simple Example:**\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\n🚀 **Why Learn Java?**\n• High demand in job market\n• Great for beginners (clear syntax)\n• Huge community and resources\n• Excellent for large-scale applications\n\nWant me to explain any specific Java concept in detail?";
      }
      
      if (lowerMessage.includes('syntax') || lowerMessage.includes('basic')) {
        return "📚 **Java Basic Syntax**\n\nHere are the fundamental Java syntax rules:\n\n🏗️ **Class Structure:**\n```java\npublic class MyClass {\n    // Class content goes here\n}\n```\n\n📦 **Variables:**\n```java\nint number = 42;           // Integer\nString name = \"Kiran\";     // String\nboolean isTrue = true;     // Boolean\ndouble price = 99.99;      // Decimal\n```\n\n🔄 **Methods:**\n```java\npublic static void main(String[] args) {\n    // Program starts here\n}\n\npublic int addNumbers(int a, int b) {\n    return a + b;\n}\n```\n\n🎯 **Control Structures:**\n```java\n// If statement\nif (age >= 18) {\n    System.out.println(\"Adult\");\n} else {\n    System.out.println(\"Minor\");\n}\n\n// For loop\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n```\n\n✨ **Key Rules:**\n• Every statement ends with semicolon (;)\n• Code blocks use curly braces { }\n• Class names start with capital letter\n• Variable names start with lowercase\n• Case-sensitive language\n\nNeed help with any specific syntax?";
      }
      
      if (lowerMessage.includes('oop') || lowerMessage.includes('object') || lowerMessage.includes('class')) {
        return "🎯 **Java Object-Oriented Programming (OOP)**\n\nJava is built around 4 main OOP principles:\n\n🏗️ **1. Classes & Objects:**\n```java\n// Class definition\npublic class Car {\n    String brand;\n    int year;\n    \n    public void start() {\n        System.out.println(\"Car is starting!\");\n    }\n}\n\n// Creating objects\nCar myCar = new Car();\nmyCar.brand = \"Toyota\";\nmyCar.start();\n```\n\n🔒 **2. Encapsulation:**\n```java\npublic class BankAccount {\n    private double balance;  // Private field\n    \n    public double getBalance() {  // Public getter\n        return balance;\n    }\n    \n    public void deposit(double amount) {  // Public method\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n}\n```\n\n👨‍👩‍👧‍👦 **3. Inheritance:**\n```java\n// Parent class\nclass Animal {\n    public void eat() {\n        System.out.println(\"Animal is eating\");\n    }\n}\n\n// Child class\nclass Dog extends Animal {\n    public void bark() {\n        System.out.println(\"Woof!\");\n    }\n}\n```\n\n🎭 **4. Polymorphism:**\n```java\nAnimal myDog = new Dog();\nmyDog.eat();  // Calls Animal's method\n```\n\n💡 **Benefits:**\n• Code reusability\n• Better organization\n• Easier maintenance\n• Real-world modeling\n\nWant to dive deeper into any OOP concept?";
      }
    }
    
    // Programming Languages - JavaScript
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return "🌐 **JavaScript Programming**\n\nJavaScript is the language of the web! Here's what makes it special:\n\n⚡ **Key Features:**\n• **Dynamic**: Variables can change types\n• **Interpreted**: No compilation needed\n• **Event-driven**: Responds to user interactions\n• **Versatile**: Frontend, backend, mobile, desktop\n\n🎯 **Common Uses:**\n• Web page interactivity\n• Web applications (React, Vue, Angular)\n• Server-side development (Node.js)\n• Mobile apps (React Native)\n• Desktop apps (Electron)\n\n📝 **Quick Example:**\n```javascript\n// Variables\nlet name = 'Kiran';\nconst age = 25;\n\n// Function\nfunction greet(person) {\n    return `Hello, ${person}!`;\n}\n\n// DOM manipulation\ndocument.getElementById('myButton').addEventListener('click', function() {\n    alert('Button clicked!');\n});\n```\n\n🚀 **Why JavaScript?**\n• Essential for web development\n• Huge ecosystem (npm packages)\n• Active community\n• Constantly evolving (ES6+)\n\nWant to know about specific JavaScript concepts?";
    }
    
    // Programming Languages - Python
    if (lowerMessage.includes('python')) {
      return "🐍 **Python Programming Language**\n\nPython is known for its simplicity and readability!\n\n✨ **Key Features:**\n• **Simple Syntax**: Easy to read and write\n• **Interpreted**: No compilation step\n• **Versatile**: Web, AI, data science, automation\n• **Huge Libraries**: Extensive standard library\n\n🎯 **Popular Uses:**\n• Data Science & AI (pandas, numpy, tensorflow)\n• Web Development (Django, Flask)\n• Automation & Scripting\n• Scientific Computing\n• Game Development\n\n📝 **Simple Examples:**\n```python\n# Variables and basic operations\nname = \"Kiran\"\nage = 25\nprint(f\"Hello, {name}! You are {age} years old.\")\n\n# Lists and loops\nfruits = ['apple', 'banana', 'orange']\nfor fruit in fruits:\n    print(f\"I like {fruit}\")\n\n# Functions\ndef calculate_area(radius):\n    return 3.14159 * radius ** 2\n\narea = calculate_area(5)\nprint(f\"Circle area: {area}\")\n```\n\n🚀 **Why Choose Python?**\n• Beginner-friendly\n• High demand in AI/ML jobs\n• Great for rapid prototyping\n• Cross-platform compatibility\n\nInterested in any specific Python topic?";
    }
    
    // Web Development
    if (lowerMessage.includes('web development') || lowerMessage.includes('html') || lowerMessage.includes('css')) {
      return "🌐 **Web Development Fundamentals**\n\nLet me explain the building blocks of the web:\n\n🏗️ **HTML (Structure):**\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>My Website</title>\n</head>\n<body>\n    <h1>Welcome to My Site</h1>\n    <p>This is a paragraph.</p>\n    <button onclick=\"sayHello()\">Click Me</button>\n</body>\n</html>\n```\n\n🎨 **CSS (Styling):**\n```css\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\nbutton {\n    background-color: #007bff;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n}\n```\n\n⚡ **JavaScript (Interactivity):**\n```javascript\nfunction sayHello() {\n    alert('Hello from Kiran\\'s website!');\n}\n```\n\n🚀 **Modern Web Development:**\n• **Frameworks**: React, Vue, Angular\n• **CSS Frameworks**: Tailwind, Bootstrap\n• **Build Tools**: Vite, Webpack\n• **Backend**: Node.js, Python, Java\n\n💡 **Learning Path:**\n1. HTML basics\n2. CSS styling\n3. JavaScript fundamentals\n4. Choose a framework\n5. Learn backend basics\n\nWhat aspect of web development interests you most?";
    }
    
    // Data Structures and Algorithms
    if (lowerMessage.includes('algorithm') || lowerMessage.includes('data structure')) {
      return "🧮 **Data Structures & Algorithms**\n\nThese are the foundation of efficient programming!\n\n📊 **Common Data Structures:**\n\n**Arrays:**\n```java\nint[] numbers = {1, 2, 3, 4, 5};\n// Access: O(1), Search: O(n)\n```\n\n**Linked Lists:**\n```java\nclass Node {\n    int data;\n    Node next;\n}\n// Insertion: O(1), Search: O(n)\n```\n\n**Stacks (LIFO):**\n```java\nStack<Integer> stack = new Stack<>();\nstack.push(10);  // Add to top\nint top = stack.pop();  // Remove from top\n```\n\n**Queues (FIFO):**\n```java\nQueue<Integer> queue = new LinkedList<>();\nqueue.offer(10);  // Add to rear\nint front = queue.poll();  // Remove from front\n```\n\n🔍 **Popular Algorithms:**\n\n**Binary Search:**\n```java\npublic int binarySearch(int[] arr, int target) {\n    int left = 0, right = arr.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```\n\n⏱️ **Time Complexity (Big O):**\n• O(1) - Constant time\n• O(log n) - Logarithmic\n• O(n) - Linear\n• O(n²) - Quadratic\n\nWhich data structure or algorithm would you like to explore?";
    }
    
    // Database concepts
    if (lowerMessage.includes('database') || lowerMessage.includes('sql')) {
      return "🗄️ **Database Fundamentals**\n\nDatabases store and organize your data efficiently!\n\n📊 **Types of Databases:**\n\n**Relational (SQL):**\n• MySQL, PostgreSQL, Oracle\n• Structured data in tables\n• ACID properties\n• Strong consistency\n\n**NoSQL:**\n• MongoDB (Document)\n• Redis (Key-Value)\n• Cassandra (Column-family)\n• Neo4j (Graph)\n\n💻 **Basic SQL Commands:**\n\n```sql\n-- Create table\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100) UNIQUE,\n    age INT\n);\n\n-- Insert data\nINSERT INTO users (id, name, email, age) \nVALUES (1, 'Kiran', 'kiran@example.com', 25);\n\n-- Query data\nSELECT name, email FROM users WHERE age > 18;\n\n-- Update data\nUPDATE users SET age = 26 WHERE name = 'Kiran';\n\n-- Delete data\nDELETE FROM users WHERE id = 1;\n```\n\n🔗 **Relationships:**\n• **One-to-One**: User ↔ Profile\n• **One-to-Many**: User → Posts\n• **Many-to-Many**: Students ↔ Courses\n\n🎯 **Best Practices:**\n• Normalize your data\n• Use indexes for performance\n• Regular backups\n• Secure your queries (prevent SQL injection)\n\nWant to learn about specific database concepts?";
    }
    
    // Math and Computer Science concepts
    if (lowerMessage.includes('math') || lowerMessage.includes('mathematics') || lowerMessage.includes('calculate')) {
      return "🧮 **Mathematics in Programming**\n\nMath is everywhere in computer science! Let me help:\n\n📊 **Common Math Operations:**\n```java\n// Basic arithmetic\nint sum = 5 + 3;        // Addition: 8\nint diff = 10 - 4;      // Subtraction: 6\nint product = 6 * 7;    // Multiplication: 42\nint quotient = 15 / 3;  // Division: 5\nint remainder = 17 % 5; // Modulo: 2\n\n// Powers and roots\ndouble power = Math.pow(2, 3);    // 2³ = 8\ndouble sqrt = Math.sqrt(16);      // √16 = 4\n```\n\n📈 **Important Concepts:**\n\n**Logarithms:**\n• log₂(8) = 3 (because 2³ = 8)\n• Used in algorithms (binary search, tree height)\n• Time complexity analysis\n\n**Probability:**\n• Random number generation\n• Machine learning algorithms\n• Game development\n\n**Linear Algebra:**\n• Graphics and 3D transformations\n• Machine learning (vectors, matrices)\n• Image processing\n\n🎯 **Practical Applications:**\n• **Cryptography**: Prime numbers, modular arithmetic\n• **Graphics**: Trigonometry, matrices\n• **AI/ML**: Statistics, calculus, linear algebra\n• **Game Dev**: Physics, collision detection\n\n💡 **Quick Math Helpers:**\n```java\n// Useful Math class methods\nMath.abs(-5);        // Absolute value: 5\nMath.max(10, 20);    // Maximum: 20\nMath.min(10, 20);    // Minimum: 10\nMath.round(3.7);     // Round: 4\nMath.random();       // Random 0.0 to 1.0\n```\n\nWhat specific math concept can I help you with?";
    }
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        "Hello! Great to see you today! How can I help you?",
        "Hi there! I'm excited to chat with you. What's on your mind?",
        "Hey! Welcome! I'm here and ready to assist you with anything you need.",
        "Hello! It's wonderful to meet you. How can I make your day better?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Joke requests
    if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 😄 Want to hear another one?",
        "I told my wife she was drawing her eyebrows too high. She looked surprised! 😂 Hope that made you smile!",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾 Got any other requests?",
        "What do you call a fake noodle? An impasta! 🍝 I've got plenty more where that came from!"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Weather requests
    if (lowerMessage.includes('weather')) {
      return "I'd love to help you with the weather! However, I don't have access to real-time weather data right now. I'd recommend checking your local weather app or website for the most accurate forecast. Is there anything else I can help you with?";
    }
    
    // Reminder requests
    if (lowerMessage.includes('remind') || lowerMessage.includes('reminder')) {
      return "I'd be happy to help with reminders! While I can't actually set system reminders right now, I can suggest using your phone's built-in reminder app or calendar. What would you like to be reminded about?";
    }
    
    // Help or explanation requests
    if (lowerMessage.includes('help') || lowerMessage.includes('explain') || lowerMessage.includes('understand')) {
      return "I'm here to help! I love explaining things in a clear, friendly way. Could you tell me which specific topic you'd like me to explain? I'll do my best to break it down for you.";
    }
    
    // Compliments or positive feedback
    if (lowerMessage.includes('thank') || lowerMessage.includes('great') || lowerMessage.includes('awesome')) {
      const responses = [
        "You're so welcome! It makes me happy to help. Is there anything else you'd like to chat about?",
        "Aww, thank you! That really brightens my day. I'm always here if you need anything else!",
        "You're too kind! I'm just glad I could be helpful. What else can we talk about?",
        "Thank you so much! I really enjoy our conversation. Feel free to ask me anything else!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Questions about the assistant
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      return "I'm Hello Guys, your friendly AI assistant created by Kiran! I'm designed to be helpful, patient, and understanding - kind of like having a knowledgeable friend who's always ready to chat. I can help with questions, explanations, jokes, and just friendly conversation. What would you like to know about me?";
    }
    
    // Default responses for general conversation
    const defaultResponses = [
      "That's interesting! I'd love to hear more about that. Could you tell me a bit more?",
      "I appreciate you sharing that with me! What would you like to explore about this topic?",
      "That sounds fascinating! I'm here to help however I can. What specific aspect would you like to discuss?",
      "Thanks for bringing that up! I'm curious to learn more. How can I best assist you with this?",
      "I find that really intriguing! Could you help me understand what you're looking for?",
      "That's a great point! I'd be happy to help you think through this. What's your main question?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const response = generateResponse(text);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  }, [generateResponse]);

  return {
    messages,
    isTyping,
    sendMessage,
    triggerPersonalityDemo
  };
};