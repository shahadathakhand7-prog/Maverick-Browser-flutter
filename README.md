# Maverick Browser (Flutter)

Maverick Browser is a Flutter-based mobile browser experience designed for high performance, privacy, and extensibility. This repository contains the baseline project structure, tooling, and platform configuration required to develop the next generation Maverick Browser using Flutter 3.x.

## Project Goals

- ✅ Establish a Flutter application skeleton with core architecture folders
- ✅ Configure Android and iOS platforms to match Maverick requirements
- ✅ Integrate baseline dependencies for networking, storage, analytics, and UI
- ✅ Provide development tooling (code generation, linting, logging)

---

## Tech Stack

- **Flutter 3.x** with Dart 3
- **State Management**: `flutter_bloc`, `hydrated_bloc`
- **Dependency Injection**: `get_it`
- **Networking**: `dio`
- **Storage**: `hive`, `hive_flutter`
- **Code Generation**: `freezed`, `json_serializable`
- **Analytics / Utilities**: `logger`, `intl`, `url_launcher`, `share_plus`
- **UI Enhancements**: `webview_flutter`, `pull_to_refresh`, `google_mobile_ads`, `lottie`

---

## Project Structure

```
lib/
├── app.dart                    # Root MaterialApp / router (coming soon)
├── main.dart                   # Entry point and bootstrap logic
├── core/
│   ├── constants/              # Route names, colors, configuration constants
│   ├── di/                     # Dependency injection container (GetIt)
│   ├── error/                  # Failure / exception modelling
│   ├── network/                # Dio client configuration
│   ├── storage/                # Hive storage adapters and helpers
│   ├── theme/                  # Light / dark theme definitions
│   └── utils/                  # Helpers (logging, platform utilities, url utils)
├── features/
│   ├── home/
│   ├── browser/
│   ├── bookmarks/
│   ├── history/
│   ├── downloads/
│   ├── ads/
│   └── settings/
│       ├── data/               # Data sources, repositories (placeholders)
│       ├── domain/             # Entities, usecases (placeholders)
│       └── presentation/       # UI widgets and blocs (placeholders)
└── common/
    └── widgets/                # Shared widgets (buttons, indicators, etc.)
```

Each feature directory is organised by **data**, **domain**, and **presentation** layers, allowing the team to scale functionality independently.

---

## Getting Started

### Prerequisites

- Flutter 3.16+ (stable) — [Install Flutter](https://docs.flutter.dev/get-started/install)
- Android Studio / Xcode (for platform builds)
- Java 17+ (Android toolchain requirement)

Verify your Flutter environment:

```bash
flutter --version
```

### Installation

```bash
git clone <repository-url>
cd maverick-browser
flutter pub get
```

### Development

```bash
# Run on device / emulator
flutter run

# Analyze and check for lint issues
flutter analyze

# Execute tests
flutter test
```

To target specific platforms:

```bash
# Android APK
flutter build apk

# iOS (simulator)
flutter build ios --simulator
```

---

## Tooling

- `flutter_lints` enforced via `analysis_options.yaml`
- `build_runner` for code generation (`freezed`, `json_serializable`)
- `logger` + custom helpers for structured logs
- `hive` for local persistence, with `hydrated_bloc` for state restoration

Run code generation when models are introduced:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

---

## Android Configuration

- Application ID: `com.maverick.browser`
- Min SDK: 21
- Target / Compile SDK: 34
- Kotlin: 1.9+
- R8 / ProGuard shrinker enabled for release builds
- MultiDex support enabled

Configuration lives under `android/app/build.gradle.kts` and `android/app/proguard-rules.pro`.

---

## iOS Configuration

- Deployment target: iOS 12+
- Swift 5.0
- CocoaPods setup handled via `ios/Podfile`
- Bitcode disabled (Flutter default)

---

## Next Steps

This repository provides the scaffolding for feature implementation. Upcoming tasks may include:

- Implementing navigation & routing
- Creating data models and services
- Building UI flows for each feature module
- Integrating ads, permissions, downloads, and history persistence

---

## Contributing

1. Create a new branch: `git checkout -b feature/xyz`
2. Make your changes adhering to the architecture outlined above.
3. Run `flutter analyze` and `flutter test` before submitting PRs.
4. Open a pull request with a description of the changes.

---

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
