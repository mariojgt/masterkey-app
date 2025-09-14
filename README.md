# MasterKey App – CORS-safe API setup

This app is configured to avoid CORS issues in all environments.

## Env variables

Copy `.env.example` to `.env` and adjust:

- `VITE_API_BASE`: Base URL of your backend (used in production web builds and when `VITE_DIRECT_API=true` in dev)
- `VITE_DEV_PROXY_TARGET`: Where the Vite dev server proxies `/api` during `npm run dev` (avoids browser CORS)
- `VITE_DIRECT_API=false`: Keep `false` to prefer proxy in dev. Set to `true` to call the API directly from the browser in dev (you'll need proper CORS on the backend).

Restart the dev server after changing `.env`.

## How requests are made

- Web (dev): Calls go to `/api/...` and are proxied to `VITE_DEV_PROXY_TARGET` by Vite (no CORS).
- Web (prod): Calls go directly to `VITE_API_BASE`.
- Native (iOS/Android): Calls use `CapacitorHttp` which performs native requests (CORS does not apply).

## Notes for native builds

- iOS: If using `http://` endpoints, add ATS exceptions in the Xcode project (NSAppTransportSecurity → NSAllowsArbitraryLoads or per-domain exceptions).
- Android: If using `http://` endpoints, allow cleartext traffic in the Android app manifest or a network security config.

## Common gotchas

- Change `.env`? Restart the dev server.
- Use `/api/...` paths from the app. The client will prepend `/api` if you omit it.
- If you intentionally want to hit the backend directly from the browser in dev, set `VITE_DIRECT_API=true` and ensure server CORS allows `http://localhost:5173`.
