# Contributing to Maverick Browser

Thank you for your interest in contributing to Maverick Browser! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and constructive in all interactions
- Respect the time and effort of other contributors
- Provide helpful feedback and be open to receiving it
- Report issues responsibly and privately if they involve security

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git
- iOS Simulator or Android Emulator (for testing)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/maverick-browser.git
   cd maverick-browser
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-repo/maverick-browser.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start development server:
   ```bash
   npm start
   ```

## Development Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/tab-sync` - for new features
- `fix/address-bar-crash` - for bug fixes
- `docs/contributing` - for documentation
- `refactor/store-optimization` - for refactoring

### Making Changes

1. **Follow Code Style**
   - Use TypeScript strictly
   - Follow the established project structure
   - Run `npm run lint:fix` before committing

2. **Testing**
   - Write tests for new features
   - Ensure all tests pass: `npm test`
   - Maintain code coverage above 70%

3. **Type Safety**
   - Use proper TypeScript types
   - Run `npm run type-check` to verify

### Commit Messages

Follow conventional commit format:

```
type(scope): short description

Longer explanation if needed. Explain what and why, not how.

Fixes #123
Closes #456
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Test additions or updates
- `chore`: Build, dependencies, config
- `style`: Formatting, missing semicolons

Example:
```
feat(browser): add tab grouping functionality

Allows users to group related tabs together for better organization.
Implements tab group creation, deletion, and switching between groups.

Fixes #234
```

## Pull Request Process

### Before Submitting

1. Update your branch with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Run quality checks:
   ```bash
   npm run lint:fix
   npm run type-check
   npm test
   ```

3. Test on actual devices if possible

### Creating the PR

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open PR on GitHub with:
   - Clear title following conventional commits
   - Description of changes
   - Screenshots/videos for UI changes
   - Reference to related issues
   - Checklist of completion

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web
- [ ] Unit tests added/updated
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] TypeScript types are correct
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

## Code Standards

### TypeScript
- Enable strict mode: `strict: true`
- Avoid `any` type, use specific types or generics
- Define interfaces for data structures
- Use discriminated unions for complex types

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => {
  // ...
};

// Avoid
const getUser = (id: any): any => {
  // ...
};
```

### React Components

```typescript
// Good
interface Props {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<Props> = ({ title, onPress }) => {
  return <TouchableOpacity onPress={onPress}>{title}</TouchableOpacity>;
};

// File: Button.tsx
// Directory: src/components/Button.tsx
// Export from: src/components/index.ts
```

### State Management (Zustand)

```typescript
interface Store {
  value: string;
  setValue: (value: string) => void;
}

export const useStore = create<Store>((set) => ({
  value: '',
  setValue: (value: string) => set({ value }),
}));
```

### Testing

```typescript
describe('Feature Name', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

## Performance Guidelines

- Minimize re-renders using React.memo for components
- Use Zustand's selector pattern for store subscriptions
- Implement virtualization for long lists
- Lazy load components when appropriate
- Profile with React Native DevTools

## Security Guidelines

- Never commit sensitive data or keys
- Use environment variables for configuration
- Validate all user inputs
- Use HTTPS for all external requests
- Keep dependencies updated
- Report security issues privately

## Documentation

### Code Comments
- Explain WHY, not WHAT
- Use JSDoc for public functions
- Keep comments concise and up-to-date

```typescript
/**
 * Normalizes a URL by adding https protocol if missing
 * @param url - The URL to normalize
 * @returns Normalized URL string
 */
const normalizeUrl = (url: string): string => {
  // ...
};
```

### README Updates
Update README.md if you:
- Add new features
- Change installation steps
- Add new dependencies
- Update API

### Architecture Documentation
Update ARCHITECTURE.md if you:
- Significantly change project structure
- Add new layers or patterns
- Modify data flow
- Add major features

## Testing Guidelines

### Unit Tests
- Test utility functions in `src/utils/`
- Test store actions and mutations
- Test type validation

### Integration Tests
- Test component interaction
- Test store hydration
- Test data persistence

### E2E Tests
- Test complete workflows
- Test on multiple devices
- Test different app states

```bash
npm test                # Run all tests
npm run test:watch     # Watch mode
npm test -- --coverage # With coverage
```

## Reporting Issues

### Bug Reports
Include:
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Device info (OS, version)
- Screenshots/logs

### Feature Requests
Include:
- Clear problem statement
- Proposed solution
- Alternative approaches
- Use cases

### Questions
- Check existing issues first
- Use GitHub Discussions for questions
- Be specific and provide context

## Review Process

1. **Code Review**
   - At least 1 approval required
   - All checks must pass
   - No conflicts with main branch

2. **Feedback**
   - Respond to all comments
   - Request re-review after changes
   - Be respectful and collaborative

3. **Merge**
   - Squash commits for cleaner history
   - Delete branch after merge
   - Close related issues

## Development Tips

### Debugging
```bash
# Enable React DevTools
expo start --dev-client

# View logs
npm start  # Select 'i' for iOS or 'a' for Android

# TypeScript errors
npm run type-check
```

### Performance Profiling
- Use React Native Debugger
- Check memory usage regularly
- Profile component renders

### Useful Commands
```bash
npm run lint:fix        # Fix linting issues
npm run type-check      # Check types
npm test -- --watch     # Run tests in watch mode
npm start -- --clear    # Clear cache
git reset --hard HEAD   # Discard changes
```

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

Release checklist:
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Create git tag
- [ ] Build production versions
- [ ] Create GitHub release
- [ ] Deploy to app stores

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- CONTRIBUTORS.md file
- Release notes

## Questions?

- Check existing documentation
- Review similar pull requests
- Ask in GitHub Discussions
- Open an issue for clarification

Thank you for contributing! 🎉
