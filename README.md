# YouTube Clone - Flutter

A fully functional YouTube clone built with Flutter, featuring video playback, search, subscriptions, and more.

## Features

### Core Features
- 📱 **Modern UI** - Clean and intuitive interface matching YouTube's design
- 🎥 **Video Player** - Full-featured video player with controls
- 🔍 **Search** - Search videos with real-time results
- 🏠 **Home Feed** - Browse videos in your home feed
- 🔥 **Trending** - Discover trending videos
- 📺 **Subscriptions** - Manage your subscribed channels
- 📚 **Library** - Access your playlists and saved videos
- 💬 **Comments** - View and interact with comments
- 👍 **Interactions** - Like, dislike, and subscribe to channels
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes

### Technical Features
- Provider for state management
- Go Router for navigation
- Cached images for better performance
- Shimmer loading effects
- Video player with Chewie
- Responsive design
- Mock data service for demonstration

## Project Structure

```
lib/
├── models/          # Data models
│   ├── video.dart
│   ├── comment.dart
│   └── channel.dart
├── providers/       # State management
│   ├── video_provider.dart
│   └── theme_provider.dart
├── screens/         # UI screens
│   ├── main_screen.dart
│   ├── home_screen.dart
│   ├── trending_screen.dart
│   ├── subscriptions_screen.dart
│   ├── library_screen.dart
│   ├── video_player_screen.dart
│   └── search_screen.dart
├── widgets/         # Reusable widgets
│   ├── video_card.dart
│   ├── comment_card.dart
│   └── shimmer_loading.dart
├── services/        # Business logic
│   └── mock_data_service.dart
├── utils/           # Helper functions
│   └── format_helper.dart
└── main.dart        # App entry point
```

## Dependencies

- **flutter**: Flutter SDK
- **provider**: State management
- **go_router**: Navigation and routing
- **video_player**: Video playback functionality
- **chewie**: Enhanced video player UI
- **cached_network_image**: Image caching
- **shimmer**: Loading animations
- **font_awesome_flutter**: Additional icons
- **timeago**: Time formatting
- **shared_preferences**: Local storage

## Getting Started

### Prerequisites
- Flutter SDK (^3.9.2)
- Dart SDK
- Android Studio / Xcode (for mobile development)
- VS Code or Android Studio (recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube_clone
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
flutter run
```

### Running on Different Platforms

**Android:**
```bash
flutter run -d android
```

**iOS:**
```bash
flutter run -d ios
```

**Web:**
```bash
flutter run -d chrome
```

**Desktop:**
```bash
flutter run -d windows
# or
flutter run -d macos
# or
flutter run -d linux
```

## Usage

### Home Screen
- Browse through a list of videos
- Pull to refresh content
- Tap on any video to watch

### Video Player
- Full-screen video playback
- Like/Dislike videos
- Subscribe to channels
- Read and interact with comments
- View related videos

### Search
- Search for videos by title or channel
- Real-time search results
- Search suggestions

### Subscriptions
- View subscribed channels
- Browse videos from subscribed channels

### Library
- Access watch history
- View liked videos
- Manage playlists

### Settings
- Toggle dark/light mode
- Configure app preferences

## Customization

### Adding Real API Integration

To integrate with a real API (like YouTube Data API):

1. Replace the `MockDataService` with real API calls
2. Update the models to match API response
3. Add API key configuration
4. Implement proper error handling

Example:
```dart
// lib/services/youtube_api_service.dart
class YouTubeApiService {
  static const String API_KEY = 'YOUR_API_KEY';
  static const String BASE_URL = 'https://www.googleapis.com/youtube/v3';
  
  Future<List<Video>> fetchVideos() async {
    // Implement API call
  }
}
```

### Modifying Theme

Edit `lib/providers/theme_provider.dart` to customize colors and styling:

```dart
ThemeData.dark().copyWith(
  primaryColor: Colors.red,
  // Add your customizations
);
```

## Architecture

The app follows a clean architecture pattern:

- **Models**: Define data structures
- **Services**: Handle data fetching and business logic
- **Providers**: Manage app state
- **Screens**: UI components for different pages
- **Widgets**: Reusable UI components
- **Utils**: Helper functions and utilities

## Performance Optimizations

- Lazy loading of videos
- Image caching with cached_network_image
- Efficient state management with Provider
- Shimmer effects during loading
- Optimized video player with Chewie

## Known Limitations

- Uses mock data instead of real API
- Video URLs are placeholders
- No user authentication
- No video upload functionality
- Limited offline support

## Future Enhancements

- [ ] User authentication
- [ ] Real YouTube API integration
- [ ] Video upload functionality
- [ ] Advanced search filters
- [ ] Playlist management
- [ ] Picture-in-picture mode
- [ ] Download videos for offline viewing
- [ ] Push notifications
- [ ] Live streaming support
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This is a clone project for educational purposes only. It is not affiliated with YouTube or Google in any way.

## Acknowledgments

- Flutter team for the amazing framework
- All package maintainers
- YouTube for the design inspiration

## Support

For issues and questions, please open an issue on the GitHub repository.

---

Built with ❤️ using Flutter
