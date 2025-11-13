# Maverick Browser - Architecture Documentation

## Overview

Maverick Browser is a Flutter-based mobile web browser application designed for both iOS and Android platforms. The architecture follows Clean Architecture principles and feature-driven development patterns.

## Architecture Layers

### 1. Presentation Layer (`lib/features/*/presentation/`)

This layer handles all user interface rendering using Flutter widgets and state management with BLoC.

**Components:**
- Screen widgets (StatelessWidget/StatefulWidget)
- BLoC/Cubit classes for state management
- UI-specific models and view logic

### 2. Domain Layer (`lib/features/*/domain/`)

Contains business logic independent of frameworks:

**Components:**
- Entities: Core business objects
- Use Cases: Business logic implementation
- Repository interfaces: Abstract data contracts

### 3. Data Layer (`lib/features/*/data/`)

Handles data operations and implements repository interfaces:

**Components:**
- Repository implementations
- Data sources (local/remote)
- Data models and mappers
- API clients

### 4. Core Layer (`lib/core/`)

Shared functionality across features:

```
core/
├── constants/        # App-wide constants (routes, colors, config)
├── di/              # Dependency injection setup (GetIt)
├── error/           # Failure handling and error models
├── network/         # Dio HTTP client configuration
├── storage/         # Hive local storage setup
├── theme/           # Light/dark theme definitions
└── utils/           # Helper utilities (logging, URL, platform)
```

### 5. Common Layer (`lib/common/`)

Reusable UI components and widgets shared across features:

- `widgets/`: Shared UI components (buttons, loaders, etc.)

## Feature Modules

Each feature follows a vertical slice architecture:

```
features/
├── home/
│   ├── data/         # Data sources and repository implementations
│   ├── domain/       # Entities, use cases, repository contracts
│   └── presentation/ # UI screens and BLoC state management
├── browser/
├── bookmarks/
├── history/
├── downloads/
├── ads/
└── settings/
```

## Data Flow

### User Opens a URL

```
User Input (AddressBar Widget)
    ↓
URL Validation (UrlHelper)
    ↓
BLoC Event (LoadUrlEvent)
    ↓
Use Case (LoadUrl)
    ↓
Repository (BrowserRepository)
    ↓
WebView renders URL
    ↓
BLoC State Update
    ↓
UI Re-renders
    ↓
History Entry Added (async)
```

### App Initialization

```
main.dart starts
    ↓
WidgetsFlutterBinding.ensureInitialized()
    ↓
Initialize DI Container (GetIt)
    ├── Register Logger
    ├── Register DioClient
    ├── Initialize Hive Storage
    └── Register Feature Dependencies
    ↓
runApp(MaverickBrowserApp)
    ↓
MaterialApp builds with theme
    ↓
Home Screen renders
```

## State Management

### BLoC Pattern

The app uses the BLoC (Business Logic Component) pattern:

```
UI → Event → BLoC → State → UI
```

**Benefits:**
- Clear separation of UI and business logic
- Testable business logic
- Predictable state changes
- Time-travel debugging support

### HydratedBloc

For persistent state:

```
BLoC State → HydratedBloc → Hive Storage
     ↑                            ↓
     └─────── App Restart ────────┘
```

## Dependency Injection

Uses GetIt for service locator pattern:

```dart
// Registration (injection_container.dart)
serviceLocator.registerLazySingleton<Logger>(() => AppLogger.logger);
serviceLocator.registerLazySingleton<DioClient>(() => DioClient(...));

// Usage
final logger = serviceLocator<Logger>();
```

## Error Handling

### Failure Model

Uses `Either<Failure, Success>` from dartz for functional error handling:

```dart
Either<Failure, BookmarkList> result = await getBookmarks();

result.fold(
  (failure) => emit(BookmarksError(failure)),
  (bookmarks) => emit(BookmarksLoaded(bookmarks)),
);
```

### Failure Types
- `ServerFailure`: API/network errors
- `CacheFailure`: Local storage errors
- `NetworkFailure`: Connectivity issues
- `ValidationFailure`: Input validation errors

## Routing & Navigation

Navigation setup using named routes:

```dart
AppRoutes.home       // '/'
AppRoutes.browser    // '/browser'
AppRoutes.bookmarks  // '/bookmarks'
AppRoutes.history    // '/history'
AppRoutes.downloads  // '/downloads'
AppRoutes.settings   // '/settings'
```

## Performance Optimizations

### 1. Lazy Loading
- Feature modules loaded on demand
- Heavy widgets use `const` constructors

### 2. State Management
- BLoC prevents unnecessary rebuilds
- Selective widget rebuilds with BlocBuilder

### 3. Storage
- Hive provides fast key-value storage
- HydratedBloc auto-persists state

### 4. Network
- Dio with interceptors for logging
- Request cancellation support

## Testing Strategy

```
test/
├── unit/           # Unit tests for use cases, repositories
├── widget/         # Widget tests for UI components
└── integration/    # Integration tests for features
```

## Platform Configuration

### Android
- Application ID: `com.maverick.browser`
- Min SDK: 21 (Android 5.0)
- Target SDK: 34 (Android 14)
- MultiDex enabled
- ProGuard/R8 shrinking for release builds

### iOS
- Bundle ID: `com.maverick.browser`
- Deployment Target: iOS 12+
- Swift 5.0
- CocoaPods for dependency management

## Future Enhancements

### Planned Architecture Improvements
1. Implement feature-specific routing modules
2. Add analytics tracking layer
3. Implement offline-first architecture
4. Add state restoration for app lifecycle
5. Implement download manager module
6. Add ad integration layer
7. Implement permission handler abstraction

### Code Generation
- Freezed for immutable models
- JsonSerializable for JSON parsing
- Build runner for code generation:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

## Best Practices

1. **Feature Independence**: Each feature should be self-contained
2. **Dependency Rule**: Dependencies point inward (domain is innermost)
3. **Single Responsibility**: Each class/module has one reason to change
4. **Testability**: Write testable code with dependency injection
5. **Type Safety**: Use strong typing and const constructors
6. **Documentation**: Document public APIs and complex logic

---

For implementation details, refer to specific feature documentation.
