# 💖 HeartHeal - Daily Breakup Helper

A compassionate Angular web application to help you heal and grow after a breakup. Pay once (R50), heal forever.

## ✨ Features

### 1. 💬 Reality Check Chatbot
- AI-powered chatbot that gives you tough love when you're thinking about texting your ex
- Responds with encouraging yet firm messages to help you stay strong
- Available 24/7 when you need that extra push

### 2. ✅ Accountability Tracker
- Track multiple social media platforms (Instagram, TikTok, Facebook, Twitter, Snapchat, WhatsApp)
- Monitor how many days you've stayed away from checking their profiles
- Visual milestones and motivational messages based on your progress
- Record "slips" to restart your counter (no judgment!)

### 3. ✨ Daily Affirmations
- 30 powerful affirmations specifically for breakup recovery
- Daily affirmation that changes automatically
- Beautiful, uplifting interface with girl power vibes
- Tips on how to use affirmations effectively

### 4. 🎯 Recovery Goals
- Set goals across 6 categories: Self-Care, Career & Education, Fitness & Health, Social Life, Personal Growth, Hobbies & Interests
- Pre-loaded suggestions to get you started
- Track completion with visual indicators
- Celebrate achievements and stay focused on your growth

### 5. 📔 What I Felt Today Journal
- Express your emotions with mood tracking (Sad, Angry, Hopeful, Peaceful, Confused, Strong)
- Write freely in a safe, private space
- Optional gratitude section for each entry
- Filter entries by mood
- 10 journal prompts to help you get started
- Edit or delete entries as needed

### 6. 📈 Progress & Rewards
- Visual dashboard showing your overall healing journey
- Milestone tracking (1 day, 3 days, 1 week, 2 weeks, 21 days, 30 days, 60 days, 90 days)
- Create custom rewards to celebrate your progress
- Reward suggestions for self-care treats
- Motivational messages based on your progress
- Beautiful progress bar showing your journey to 90-day milestone

## 🎨 Design

The app features a beautiful, girly color scheme with:
- Soft pinks, purples, and pastels
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Card-based layouts for easy navigation
- Emoji accents throughout for emotional connection

## 🛠️ Tech Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Styling**: SCSS with custom CSS variables
- **UI Components**: Angular Material
- **State Management**: LocalStorage for data persistence
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms

## 📦 Installation

1. **Prerequisites**
   ```bash
   # Install Node.js (v18 or higher)
   # Install Angular CLI
   npm install -g @angular/cli
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/MBXLEE/HeartHeal.git
   cd HeartHeal
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   ng serve
   ```

5. **Open in browser**
   Navigate to `http://localhost:4200/`

## 📱 Usage

### First Time Setup
1. The app uses browser LocalStorage to save all your data
2. No account needed - your data stays private on your device
3. Start by exploring each feature from the navigation menu

### Daily Routine
1. Check your **Daily Affirmation** every morning
2. Update your **Accountability Tracker** to mark another day strong
3. Write in your **Journal** about your feelings
4. Check your **Progress** to see how far you've come
5. If you're tempted to contact your ex, use the **Reality Check Chat**

### Setting Goals
1. Navigate to the Goals section
2. Choose a category and add your goal
3. Or click on suggested goals to add them quickly
4. Check off goals as you complete them

### Earning Rewards
1. Go to the Progress section
2. Add custom rewards with triggers (e.g., "7 days no contact")
3. Mark rewards as earned when you achieve them
4. Celebrate your wins!

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
ng build --base-href /HeartHeal/
npx angular-cli-ghpages --dir=dist/heart-heal
```

### Deploy to Netlify
```bash
ng build --configuration production
# Drag and drop the dist/heart-heal folder to Netlify
```

### Deploy to Vercel
```bash
ng build --configuration production
vercel --prod
```

## 💾 Data Storage

All data is stored locally in your browser using LocalStorage:
- `accountability` - Social media tracking data
- `goals` - Your recovery goals
- `journal` - Journal entries
- `rewards` - Custom rewards
- `dailyAffirmation` - Today's affirmation

**Note**: Clearing your browser data will erase your progress. Consider exporting your data regularly if you want to keep backups.

## 🤝 Contributing

This is a personal healing tool, but if you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Features

- Export journal entries as PDF
- Data backup and restore functionality
- Customizable color themes
- More chatbot personalities
- Community support forum (anonymous)
- Guided meditation audio
- Progress sharing on social media (optional)

## 💝 Support

If HeartHeal helped you, consider:
- Sharing it with friends going through breakups
- Leaving feedback or suggestions
- Contributing to the codebase

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💌 Message from the Creator

Breakups are hard. Really hard. But you're not alone, and you WILL get through this. This app is designed to be your companion during the tough days, to celebrate your wins, and to remind you that you're worthy of love - especially your own.

Stay strong, queen. You've got this! 👑✨

---

Made with 💖 for everyone healing from heartbreak