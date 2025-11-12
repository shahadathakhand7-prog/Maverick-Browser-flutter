# Quick Start Guide

Get your YouTube Clone up and running in minutes!

## Prerequisites Check

Before you begin, ensure you have:

```bash
# Check Flutter installation
flutter --version

# Check Dart installation
dart --version

# Check for connected devices
flutter devices
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd youtube_clone
```

### 2. Install Dependencies

```bash
flutter pub get
```

This will install all required packages including:
- provider (state management)
- video_player & chewie (video playback)
- go_router (navigation)
- cached_network_image (image caching)
- And more...

### 3. Run the App

#### On Android Emulator/Device
```bash
flutter run -d android
```

#### On iOS Simulator/Device
```bash
flutter run -d ios
```

#### On Web Browser
```bash
flutter run -d chrome
```

#### On Desktop
```bash
# Windows
flutter run -d windows

# macOS
flutter run -d macos

# Linux
flutter run -d linux
```

## First Launch

When you first launch the app:

1. **Home Screen** will load with sample videos
2. Navigate using the **bottom navigation bar**
3. Tap any video to watch it
4. Use the **search icon** in the app bar to search
5. Toggle **dark/light mode** from the menu

## Testing the Features

### Watch a Video
1. Tap any video card on the home screen
2. Video will auto-play
3. Try the like/dislike buttons
4. Subscribe to the channel
5. Read comments below

### Search for Videos
1. Tap the search icon in the app bar
2. Type a search query or select a suggestion
3. View search results

### Explore Trending
1. Tap "Trending" in the bottom navigation
2. Browse trending videos

### View Subscriptions
1. Tap "Subscriptions" in the bottom navigation
2. See your subscribed channels at the top
3. View videos from subscribed channels

### Access Library
1. Tap "Library" in the bottom navigation
2. View history, playlists, and saved videos

## Customization

### Change App Theme
1. Tap the menu icon (⋮) in the app bar
2. Select "Light Mode" or "Dark Mode"
3. Theme preference is saved automatically

### Modify Colors
Edit `lib/providers/theme_provider.dart`:

```dart
ThemeData.dark().copyWith(
  primaryColor: Colors.blue, // Change to your color
  // Add more customizations
);
```

### Add Your Own Videos
Edit `lib/services/mock_data_service.dart`:

```dart
Video(
  id: 'your-id',
  title: 'Your Video Title',
  channelName: 'Your Channel',
  // ... add your video details
)
```

## Troubleshooting

### Issue: "No devices available"
**Solution**: 
- For Android: Start an emulator or connect a device
- For iOS: Start a simulator or connect a device
- For Web: Ensure Chrome is installed
- For Desktop: Ensure you're on the correct platform

### Issue: "Packages not found"
**Solution**:
```bash
flutter pub get
flutter clean
flutter pub get
```

### Issue: "Build failed"
**Solution**:
```bash
flutter clean
flutter pub get
flutter run
```

### Issue: "Video not playing"
**Solution**:
- Check your internet connection
- Videos require network access
- Ensure video URLs are valid

### Issue: "Images not loading"
**Solution**:
- Check internet connection
- Placeholder images are from via.placeholder.com
- Replace with your own image URLs if needed

## Development Tips

### Hot Reload
While the app is running, make code changes and press:
- `r` for hot reload (fast)
- `R` for hot restart (slower, full restart)

### Debug Mode
The app runs in debug mode by default. For better performance:

```bash
# Release mode (much faster)
flutter run --release
```

### View Logs
```bash
# View all logs
flutter logs

# Clear console
Clear (Ctrl+L)
```

## Building for Production

### Android APK
```bash
flutter build apk --release
```
Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle
```bash
flutter build appbundle --release
```
Output: `build/app/outputs/bundle/release/app-release.aab`

### iOS App
```bash
flutter build ios --release
```

### Web
```bash
flutter build web --release
```
Output: `build/web/`

## Next Steps

1. **Explore the Code**
   - Check out `lib/screens/` for UI components
   - Look at `lib/providers/` for state management
   - Review `lib/models/` for data structures

2. **Integrate Real API**
   - Create a new service file
   - Add API key configuration
   - Replace mock data with API calls

3. **Add Features**
   - Implement user authentication
   - Add video upload functionality
   - Create playlist management

4. **Optimize Performance**
   - Profile the app with Flutter DevTools
   - Optimize images and assets
   - Reduce app size

## Useful Commands

```bash
# Check for outdated packages
flutter pub outdated

# Upgrade packages
flutter pub upgrade

# Analyze code for issues
flutter analyze

# Format code
flutter format .

# Run tests
flutter test

# Generate app icons
flutter pub run flutter_launcher_icons:main

# Clean build artifacts
flutter clean
```

## Getting Help

- Check the [README.md](README.md) for detailed documentation
- Review [FEATURES.md](FEATURES.md) for feature list
- Flutter Documentation: https://docs.flutter.dev
- Stack Overflow: Tag your questions with `flutter`

## Happy Coding! 🚀

You're now ready to build amazing video streaming experiences with Flutter!
