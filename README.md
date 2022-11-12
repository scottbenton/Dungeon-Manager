<img src="./public/DungeonManagerCover.svg" style="width: 100%" alt="Dungeon Manager" />

The goal of Dungeon Manager is to create a tool for Dungeon Masters to organize different online tools for running the game.

# Current Features

## Images

Upload images here to share them with your group. Click an image to set it as active. Best used with an extra screen to share character art & scenery with your players.

## Music

Add your favorite music, ambient soundtracks, and playlists from Youtube to control playback throughout the application.

# Roadmap

- Spotify Music Integration
  - Users with a Spotify premium account should be able to control spotify playback through Dungeon Master
- Smart Home support
  - By integrating with [Home Assistant](https://www.home-assistant.io/), I hope to be able to create & control lighting scenes, as well as create a pathway for other smart home integrations.
- Embed Support
  - We can't support every tool used by every DM. By allowing users to embed outside websites, DMs can create their own experiences

---

# Development

## Setup

1. Clone the repository
2. Create a new Firebase project
3. Add authentication to the Firebase project. We currently support Google authentication, as well as email and password authentication
4. Add Firestore to the Firebase project
5. Add Storage to the Firebase project
6. Add Hosting to the Firebase project
7. Create a `.env.local` file at the root of the project folder, and add your Firebase config (see example `.env.local below`).
8. (Optional) Setup a posthog project for UI logging and add the api key to your `.env.local`
9. Install dependencies `npm i`
10. Start the project `npm run dev`

## Example `.env.local`

```
VITE_FIREBASE_APIKEY=ApiKeyHere
VITE_FIREBASE_AUTHDOMAIN=project-id.firebaseapp.com
VITE_FIREBASE_PROJECTID=project-id
VITE_FIREBASE_STORAGEBUCKET=project-id.appspot.com
VITE_FIREBASE_MESSAGINGID=1234567890
VITE_FIREBASE_APPID=1:12134567890:web:abcde12345
VITE_LOGGER_KEY=loggerkeyhere
```
