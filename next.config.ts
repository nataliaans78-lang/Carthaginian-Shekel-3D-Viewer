import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  output: "export",
  ...(phase === PHASE_DEVELOPMENT_SERVER
    ? {
        env: {
          NEXT_PUBLIC_BASE_PATH: "",
        },
      }
    : {
        basePath: "/Carthaginian-Shekel-3D-Viewer",
        assetPrefix: "/Carthaginian-Shekel-3D-Viewer/",
        env: {
          NEXT_PUBLIC_BASE_PATH: "/Carthaginian-Shekel-3D-Viewer",
        },
      }),
  // Keep local dev working out of the box.
  // If you run `npm run dev:host` and open the app via LAN IP,
  // add that IP here as well.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "*.localhost",
    "10.81.35.171",
    "10.20.19.171",
  ],
});

export default nextConfig;
