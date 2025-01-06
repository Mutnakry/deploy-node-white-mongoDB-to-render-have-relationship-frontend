/// <reference types="vite/client" />

export default {
    server: {
      host: '0.0.0.0', // Ensures the server listens on all network interfaces
      port: process.env.PORT || 3000, // Use the port provided by Render or default to 3000
    },
  };