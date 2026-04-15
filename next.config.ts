import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
