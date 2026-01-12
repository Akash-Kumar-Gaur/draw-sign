# Low-Latency Drawing Sync App

A real-time drawing application that allows you to draw on one device and see it instantly on another device with minimal latency.

## Features

- **Ultra-low latency**: Uses WebSockets for real-time communication
- **Cross-platform**: Works on any device with a modern web browser
- **Touch & Mouse support**: Works with both touch screens and mouse input
- **Color picker**: Choose any color for drawing
- **Clear canvas**: Reset the drawing on all connected devices
- **Auto-reconnect**: Automatically reconnects if connection is lost

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the app:**
   - Open your browser and navigate to `http://localhost:8080`
   - On another device, open the same URL (make sure both devices are on the same network, or use your computer's IP address)

## Usage

1. **On Device 1 (Drawing Device):**
   - Open the app in your browser
   - Start drawing with your mouse or touch

2. **On Device 2 (Display Device):**
   - Open the app in your browser
   - Watch the drawing appear in real-time as Device 1 draws

## Network Configuration

### Same Network (Local)
- Use `http://localhost:8080` on the same computer
- Use `http://YOUR_IP:8080` on other devices (replace YOUR_IP with your computer's local IP address)

### Different Networks (Remote)
- Deploy to a cloud service (Heroku, Railway, Render, etc.)
- Or use a tunneling service like ngrok:
  ```bash
  ngrok http 8080
  ```
  Then use the ngrok URL on both devices

## Performance Optimization

The app is optimized for minimal latency:
- Direct WebSocket relay (no processing delay)
- Minimal data payload (only essential drawing coordinates)
- Binary-ready protocol (can be upgraded to binary for even lower latency)
- No buffering or batching (immediate transmission)

## Customization

- **Port**: Change the port by setting the `PORT` environment variable:
  ```bash
  PORT=3000 npm start
  ```

- **Drawing thickness**: Modify `lineWidth` in `index.html` (currently set to 3)

## Requirements

- Node.js 14+ 
- Modern web browser with WebSocket support
