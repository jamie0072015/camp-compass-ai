import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1919422aae884f4c8a58b000662d3d00',
  appName: 'camp-compass-ai',
  webDir: 'dist',
  server: {
    url: 'https://1919422a-ae88-4f4c-8a58-b000662d3d00.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;