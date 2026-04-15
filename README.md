# Carthaginian Shekel 3D Viewer

Projekt oparty o Next.js.

## Wymagania

- Node.js **20.9+**
- npm **10+**

## Start lokalny

```bash
npm install
npm run dev
```

Aplikacja otworzy się pod:

- `http://localhost:3000`

## Start po sieci lokalnej (LAN)

Jeśli chcesz odpalić projekt tak, żeby wejść z innego urządzenia w tej samej sieci:

```bash
npm run dev:host
```

W razie potrzeby dopisz swój lokalny adres IP do `allowedDevOrigins` w `next.config.ts`.

## Co zostało poprawione

- uproszczony `dev` script, żeby lokalne odpalanie działało normalnie przez `npm run dev`
- osobny script `dev:host` do odpalania po `0.0.0.0`
- poprawione `allowedDevOrigins`, żeby localhost nie był blokowany w devie
- dopisana wymagana wersja Node.js
