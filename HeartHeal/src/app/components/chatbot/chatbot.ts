import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container fade-in">
      <div class="card chat-header">
        <h2>💬 Reality Check Chat</h2>
        <p>Thinking about texting them? Let's talk about that...</p>
      </div>

      <div class="card chat-box">
        <div class="messages" #messagesContainer>
          <div *ngFor="let message of messages" 
               [class]="message.isUser ? 'message user-message' : 'message bot-message'">
            <div class="message-content">
              <p>{{message.text}}</p>
              <span class="timestamp">{{formatTime(message.timestamp)}}</span>
            </div>
          </div>
        </div>

        <div class="input-area">
          <input 
            type="text" 
            [(ngModel)]="userInput"
            (keyup.enter)="sendMessage()"
            placeholder="Type your message..."
            class="input-field"
            [disabled]="isTyping">
          <button 
            class="btn-primary send-btn" 
            (click)="sendMessage()"
            [disabled]="!userInput.trim() || isTyping">
            Send
          </button>
        </div>
      </div>

      <div class="card warning-box">
        <p><strong>⚠️ Remember:</strong> This chat is designed to help you think twice before reaching out. 
        Sometimes we need tough love to stay strong!</p>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .chat-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .chat-header h2 {
      margin-bottom: 10px;
    }

    .chat-header p {
      color: var(--text-light);
      font-size: 16px;
    }

    .chat-box {
      height: 600px;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 25px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .message {
      display: flex;
      animation: fadeIn 0.3s ease;
    }

    .user-message {
      justify-content: flex-end;
    }

    .bot-message {
      justify-content: flex-start;
    }

    .message-content {
      max-width: 70%;
      padding: 15px 20px;
      border-radius: 20px;
      position: relative;
    }

    .user-message .message-content {
      background: linear-gradient(135deg, #ff69b4, #ff8fd4);
      color: white;
      border-bottom-right-radius: 5px;
    }

    .bot-message .message-content {
      background: #f5f5f5;
      color: var(--text-dark);
      border-bottom-left-radius: 5px;
    }

    .message-content p {
      margin: 0 0 5px 0;
      line-height: 1.5;
    }

    .timestamp {
      font-size: 11px;
      opacity: 0.7;
    }

    .input-area {
      display: flex;
      gap: 10px;
      padding: 20px;
      background: var(--pale-pink);
      border-top: 2px solid var(--light-pink);
    }

    .input-area .input-field {
      flex: 1;
      margin: 0;
    }

    .send-btn {
      padding: 12px 30px;
      white-space: nowrap;
    }

    .warning-box {
      margin-top: 20px;
      background: #fff9e6;
      border-left: 4px solid #ffd700;
    }

    .warning-box p {
      margin: 0;
      color: var(--text-dark);
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .chat-box {
        height: 500px;
      }

      .message-content {
        max-width: 85%;
      }

      .input-area {
        flex-wrap: wrap;
      }

      .send-btn {
        flex: 1;
        width: 100%;
      }
    }
  `]
})
export class ChatbotComponent {
  messages: Message[] = [];
  userInput = '';
  isTyping = false;

  toughLoveResponses = [
    "Girl, NO! 🛑 They don't deserve your energy right now. Remember why you two broke up?",
    "Seriously? You know texting them won't change anything. You're better than this! 💪",
    "STOP RIGHT THERE! ✋ This is the heartbreak talking, not you. Take a deep breath.",
    "Honey, they're not thinking about you right now, why waste your time thinking about them? 👑",
    "If they wanted to talk to you, they would. Don't chase someone who's not chasing you back. 💅",
    "You're about to undo all your progress! Is one text really worth going back to square one? 🚫",
    "Imagine how you'll feel tomorrow if you text them tonight. Regret? Yeah, thought so. 😤",
    "They're living their life, you should be living yours! Put that phone DOWN. 📵",
    "Real talk: Texting them won't make you feel better. It'll just make you feel desperate. You're NOT desperate! 👸",
    "What would your best friend say right now? Probably the same thing I'm saying - DON'T DO IT! 🙅‍♀️",
    "You're stronger than this urge. Remember all the tears? Remember the pain? Don't go back to that. 💔➡️💖",
    "Plot twist: Instead of texting them, text yourself something nice. You deserve your own attention! ✨",
    "They showed you who they really are. Believe them. Move on, queen! 👑",
    "Nostalgia is a liar. You're remembering the good times and forgetting why it ended. Stay strong! 💪",
    "Your future self is begging you not to send that text. Listen to her! 🙏"
  ];

  encouragementResponses = [
    "You're doing amazing by even stopping to think about it first! That's growth! 🌱",
    "I know it's hard, but you're handling this so well. Keep going! 💕",
    "Every urge you resist makes you stronger. You've got this! 💪✨",
    "Your healing journey is yours alone. Don't let them interrupt it! 🦋",
    "Think about all the goals you set. Focus on those instead! 🎯"
  ];

  ngOnInit() {
    this.addBotMessage("Hey there! 👋 I'm here to help you stay strong. If you're thinking about texting them, let's talk it through first. What's going on?");
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isTyping) return;

    const userMessage = this.userInput.trim();
    this.messages.push({
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    });

    this.userInput = '';
    this.isTyping = true;

    setTimeout(() => {
      this.generateResponse(userMessage);
      this.scrollToBottom();
    }, 1000 + Math.random() * 1000);
  }

  generateResponse(userMessage: string) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    if (lowerMessage.includes('miss') || lowerMessage.includes('thinking about')) {
      response = this.getRandomResponse(this.toughLoveResponses);
    } else if (lowerMessage.includes('text') || lowerMessage.includes('message') || lowerMessage.includes('call')) {
      response = "NO NO NO! 🚨 That's exactly what we're trying to avoid here! " + this.getRandomResponse(this.toughLoveResponses);
    } else if (lowerMessage.includes('hard') || lowerMessage.includes('difficult') || lowerMessage.includes('sad')) {
      response = this.getRandomResponse(this.encouragementResponses);
    } else if (lowerMessage.includes('right') || lowerMessage.includes('should i') || lowerMessage.includes('what if')) {
      response = "Listen, if you have to ask, you already know the answer is NO. " + this.getRandomResponse(this.toughLoveResponses);
    } else if (lowerMessage.includes('ok') || lowerMessage.includes('thanks') || lowerMessage.includes('you\'re right')) {
      response = "That's what I like to hear! 🙌 You're making the right choice. Stay strong and focus on yourself! Want to check out your goals or write in your journal instead?";
    } else {
      response = this.getRandomResponse([...this.toughLoveResponses, ...this.encouragementResponses]);
    }

    this.addBotMessage(response);
    this.isTyping = false;
  }

  addBotMessage(text: string) {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date()
    });
  }

  getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}