# 📸 Instagram Stories Clone - 24-Hour Stories Feature

A modern, fully-featured Instagram Stories clone built with React, featuring 24-hour ephemeral content, swipe navigation, and local storage persistence.

![Stories App](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![Zustand](https://img.shields.io/badge/Zustand-State-orange) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-pink)

## ✨ Features

### Core Features
- ✅ **24-Hour Expiration**: Stories automatically disappear after 24 hours
- ✅ **Image Upload**: Click the + button to upload photos
- ✅ **Base64 Encoding**: Images converted to base64 and stored locally
- ✅ **Local Storage**: Persistent storage using browser's localStorage
- ✅ **Auto-Cleanup**: Expired stories are automatically removed

### Advanced Features
- 🎯 **Swipe Navigation**: Swipe left/right to navigate between stories
- ⌨️ **Keyboard Controls**: Arrow keys, Escape, and Delete support
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- 🎨 **Instagram-like UI**: Gradient rings, progress bars, and animations
- ⏸️ **Pause/Play**: Hold to pause, release to continue
- 🗑️ **Delete Stories**: Remove stories before they expire
- 🔄 **Auto-Progress**: Stories auto-advance after 5 seconds
- ✨ **Smooth Animations**: Powered by Framer Motion
- 👁️ **View Status**: Track viewed vs unviewed stories

## 🚀 Technologies Used

- **React 18** - Modern UI library
- **Vite 7.2** - Lightning-fast build tool
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations and transitions
- **react-swipeable** - Touch gesture support
- **date-fns** - Date manipulation utilities
- **CSS3** - Custom styling with gradients and animations

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone or navigate to the project**:
   ```bash
   cd stories-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:5174
   ```

## 🎮 How to Use

### Adding Stories
1. Click the **+ button** in the stories list
2. Select an image from your device
3. Image will be automatically:
   - Resized to max 1080x1920px
   - Compressed to 85% quality
   - Converted to base64
   - Stored in localStorage

### Viewing Stories
1. Click on any story circle to view full-screen
2. **Navigation options**:
   - **Swipe left**: Next story
   - **Swipe right**: Previous story
   - **Swipe down**: Close viewer
   - **Arrow keys**: Navigate (← →)
   - **Escape**: Close viewer
   - **Click left/right**: Navigate
   - **Hold image**: Pause story

### Managing Stories
- **Pause/Play**: Click the ⏸/▶ button or hold the image
- **Delete**: Click the 🗑️ button or press Delete/Backspace
- **Close**: Click the ✕ button or press Escape
- **Auto-expire**: Stories disappear after 24 hours

## 📱 Responsive Design

### Mobile (< 480px)
- Optimized touch targets
- Full-screen story viewer
- Swipe gestures enabled
- Compact UI elements

### Tablet (480px - 768px)
- Balanced layout
- Touch and mouse support
- Adaptive sizing

### Desktop (> 768px)
- Maximum width constraints
- Keyboard navigation
- Hover effects
- Mouse click navigation

## 🏗️ Project Structure

```
stories-app/
├── src/
│   ├── components/
│   │   ├── AddStory.jsx          # Upload button component
│   │   ├── AddStory.css
│   │   ├── StoryCircle.jsx       # Story thumbnail component
│   │   ├── StoryCircle.css
│   │   ├── StoriesList.jsx       # Stories list container
│   │   ├── StoriesList.css
│   │   ├── StoryViewer.jsx       # Full-screen story viewer
│   │   └── StoryViewer.css
│   ├── store/
│   │   └── storiesStore.js       # Zustand state management
│   ├── utils/
│   │   └── imageUtils.js         # Image processing utilities
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # App styles
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── public/
├── package.json
└── README.md
```

## 🔧 Configuration

### Image Constraints
- **Maximum dimensions**: 1080px × 1920px (Instagram story size)
- **Maximum file size**: 10MB
- **Compression quality**: 85%
- **Supported formats**: All image formats (JPEG, PNG, GIF, WebP, etc.)

### Story Duration
- **Display time**: 5 seconds per story
- **Expiration time**: 24 hours
- **Cleanup interval**: Every 60 seconds

### Storage
- **Method**: Browser localStorage
- **Key**: `stories-storage`
- **Data**: Base64 encoded images + metadata

## 🎨 Features Breakdown

### State Management (Zustand)
```javascript
- stories: Array of story objects
- currentViewingStory: Currently displayed story
- currentStoryIndex: Index of current story
- addStory(): Add new story
- removeStory(): Delete story
- markAsViewed(): Mark story as viewed
- nextStory(): Navigate to next
- previousStory(): Navigate to previous
- cleanupExpiredStories(): Remove expired stories
```

### Image Processing
```javascript
- processImage(): Resize, compress, convert to base64
- getTimeRemaining(): Calculate time until expiration
- getRelativeTime(): Format relative time (e.g., "2h ago")
```

### Keyboard Shortcuts
- **→ (Right Arrow)**: Next story
- **← (Left Arrow)**: Previous story
- **Escape**: Close viewer
- **Delete/Backspace**: Delete current story

### Touch Gestures
- **Swipe Left**: Next story
- **Swipe Right**: Previous story
- **Swipe Down**: Close viewer
- **Hold**: Pause story

## 🌟 Key Features Explained

### 24-Hour Expiration
Stories are timestamped on creation. The app checks timestamps and automatically removes stories older than 24 hours. Cleanup runs:
- On app mount
- Every 60 seconds
- Before displaying stories
- When adding new stories

### Local Storage Persistence
Stories are saved to localStorage using Zustand's persist middleware. Data persists across:
- Page refreshes
- Browser restarts
- Tab closures

### Progress Bars
Multiple progress bars show:
- Completed stories (100% filled)
- Current story (animated progress)
- Upcoming stories (0% filled)

### View Status
Stories track viewed status:
- **Unviewed**: Gradient ring (Instagram colors)
- **Viewed**: Gray ring
- Status persists in localStorage

## 🚀 Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The build output will be in the `dist/` folder, ready for deployment.

## 📊 Performance

- **Lazy loading**: Components load on demand
- **Image optimization**: Automatic resize and compression
- **Efficient re-renders**: Zustand prevents unnecessary updates
- **Smooth animations**: Hardware-accelerated CSS and Framer Motion
- **Local storage**: No network requests needed

## 🔒 Privacy & Security

- **Client-side only**: No server, no database
- **Local storage**: Images never leave your browser
- **No tracking**: No analytics or external services
- **No authentication**: No user accounts needed

## 🐛 Troubleshooting

### Stories not appearing?
- Check browser console for errors
- Verify localStorage is enabled
- Clear localStorage and try again

### Images not uploading?
- Check file size (max 10MB)
- Verify file is an image format
- Try a different image

### Swipe not working?
- Ensure you're swiping on the story image
- Try using keyboard arrows instead
- Check if touch events are enabled

### Stories not expiring?
- Check system time is correct
- Wait for cleanup interval (60 seconds)
- Manually refresh the page

## 📝 Future Enhancements

Potential features to add:
- [ ] Video support
- [ ] Text overlays
- [ ] Filters and effects
- [ ] Multiple users/accounts
- [ ] Story replies
- [ ] Story highlights
- [ ] Analytics dashboard
- [ ] Share to social media
- [ ] Cloud storage integration
- [ ] PWA support

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning or personal use.

## 📧 Support

For issues or questions, please check the troubleshooting section or review the code comments.

---

**Built with ❤️ using React + Vite + Zustand + Framer Motion**

*A modern Instagram Stories clone with 24-hour ephemeral content*

