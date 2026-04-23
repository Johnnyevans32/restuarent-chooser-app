# Restaurant Chooser App

A React Native (Expo) application that helps a group decide where to eat by letting users add people, restaurants, and run a round-based selection flow that filters restaurants by everyone's preferences.

Built as the capstone for the Mobile App Development course (Week 9 — Packaging & Distribution).

---

## Features

- **People** — add, list and delete the people who will be part of a decision.
- **Restaurants** — add, list and delete candidate restaurants with cuisine, price, rating and delivery metadata.
- **Decision flow** — pick participants, then walk through restaurants one at a time; a restaurant is chosen only if every participant swipes yes.
- **Local persistence** — data is stored with AsyncStorage so it survives app restarts.
- **Cross-platform** — runs on Android, iOS and web from a single Expo codebase.

---

## Tech stack

- Expo SDK 54 / React Native 0.81
- React Navigation (stack + bottom tabs + material top tabs)
- `@react-native-async-storage/async-storage` for persistence
- `react-native-toast-message` for in-app feedback
- EAS Build for native packaging and distribution

---

## Project structure

```
app/           file-based routes (expo-router)
screens/      screen components (People, Restaurants, Decision)
components/   reusable UI pieces
constants/    shared constants (colors, keys, etc.)
hooks/        custom React hooks
assets/       icons, splash, images
eas.json      EAS build profiles
app.json      Expo configuration
```

---

## Getting started (development)

### Prerequisites

- Node.js 18+ and npm
- A device with the Expo Go app, or an Android / iOS simulator

### Install and run

```bash
# 1. Clone
git clone <this-repo-url>
cd restaurant-chooser-app

# 2. Install dependencies
npm install

# 3. Start the Metro bundler
npx expo start
```

From the Metro UI you can:

- Scan the QR code with Expo Go (Android) or the Camera app (iOS)
- Press `a` to open an Android emulator
- Press `i` to open an iOS simulator
- Press `w` to open in the browser

---

## Packaging with EAS Build

EAS (Expo Application Services) builds native binaries in the cloud so the app can run standalone, be shared with testers, or be submitted to the Google Play Store / Apple App Store.

### 1. Install the EAS CLI

```bash
npm install -g eas-cli
```

### 2. Log in

```bash
eas login
```

(Use your Expo account credentials — sign up at <https://expo.dev/signup> if you don't have one.)

### 3. Link the project

Running this once creates / links an Expo project and writes the `extra.eas.projectId` into `app.json`:

```bash
eas init
```

### 4. Build

Build profiles are defined in [`eas.json`](./eas.json):

| Profile       | Purpose                                            | Output                          |
|---------------|----------------------------------------------------|---------------------------------|
| `development` | Dev client build for on-device debugging           | Dev client (.apk / simulator)   |
| `preview`     | Shareable internal build for testers               | APK (Android) / Simulator (iOS) |
| `production`  | Store-ready release build                          | AAB (Android) / IPA (iOS)       |

Typical commands:

```bash
# Shareable preview build for both platforms
eas build --platform all --profile preview

# Production build (store submission)
eas build --platform all --profile production

# Android only
eas build --platform android --profile preview
```

When the build finishes, EAS prints a URL to the build artifact (APK / IPA) you can download or share.

### 5. Submit to stores (optional)

```bash
eas submit --platform android --profile production
eas submit --platform ios --profile production
```

---

## Build artifacts

Finished EAS builds (status: **finished**):

- **Android** — <https://expo.dev/accounts/0xjevan/projects/restaurant-chooser-app/builds/df244c1f-8ab6-42a8-8f94-800e15bb0fda>
- **iOS** — <https://expo.dev/accounts/0xjevan/projects/restaurant-chooser-app/builds/7c92630d-e9cb-48e1-85bf-1053c58f9514>

Each build page contains the downloadable artifact (APK for Android, simulator build for iOS), an install QR code, and the full build logs.

All builds for this project: <https://expo.dev/accounts/0xjevan/projects/restaurant-chooser-app/builds>

---

## Troubleshooting

- **"Invalid package name" / "bundleIdentifier"** — check `android.package` and `ios.bundleIdentifier` in `app.json` match the pattern `com.company.app`.
- **"No EAS project ID"** — run `eas init` to link the project.
- **Metro cache oddness** — `npx expo start -c` starts with a cleared cache.
- **Dependency version warnings** — `npx expo install --check` aligns versions to the current Expo SDK.

---

## License

MIT — see [LICENSE](./LICENSE) if present.
