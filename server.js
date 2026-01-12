const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Helper function to get count of open connections
function getOpenClientCount(sessionClients) {
  let count = 0;
  sessionClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      count++;
    }
  });
  return count;
}

// Helper function to clean up closed connections from a session
function cleanupClosedConnections(sessionClients) {
  const closedClients = [];
  sessionClients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) {
      closedClients.push(client);
    }
  });
  closedClients.forEach((client) => {
    sessionClients.delete(client);
  });
  return closedClients.length;
}

// Helper function to broadcast session update to all clients
function broadcastSessionUpdate(sessionClients, sessionId) {
  // Clean up any closed connections first
  cleanupClosedConnections(sessionClients);
  
  // Count only open connections
  const openCount = getOpenClientCount(sessionClients);
  
  const update = JSON.stringify({
    type: 'session',
    sessionId: sessionId,
    clientCount: openCount
  });
  
  console.log(`Session ${sessionId}: Broadcasting update - ${openCount} open clients (${sessionClients.size} total in Set)`);
  
  sessionClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(update);
    }
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Serve the client HTML file for all routes (SPA-style)
  // This handles hard refresh with query parameters
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store sessions: { sessionId: Set of WebSocket clients }
const sessions = new Map();

// Generate a random session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 9);
}

// Get session ID from URL query parameter
function getSessionIdFromUrl(url) {
  const urlObj = new URL(url, 'http://localhost');
  return urlObj.searchParams.get('session') || 'default';
}

wss.on('connection', (ws, req) => {
  // Extract session ID from WebSocket upgrade request URL
  const sessionId = getSessionIdFromUrl(req.url);
  
  console.log(`Client connected to session: ${sessionId}`);
  
  // Initialize session if it doesn't exist
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, new Set());
    console.log(`Created new session: ${sessionId}`);
  }
  
  // Add client to session
  const sessionClients = sessions.get(sessionId);
  
  // Clean up any closed connections before adding new one
  cleanupClosedConnections(sessionClients);
  
  sessionClients.add(ws);
  
  // Store session ID on the WebSocket for easy access
  ws.sessionId = sessionId;
  
  console.log(`Session ${sessionId}: Added client. Total in Set: ${sessionClients.size}, Open: ${getOpenClientCount(sessionClients)}`);
  
  // Broadcast updated session info to all clients in the session
  broadcastSessionUpdate(sessionClients, sessionId);

  // Forward drawing data to all other clients in the same session
  ws.on('message', (data) => {
    const message = data.toString();
    console.log(`Session ${sessionId} - Received message:`, message.substring(0, 50));
    
    // Relay to all other clients in the same session
    sessionClients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log(`Client disconnected from session: ${sessionId}`);
    const wasRemoved = sessionClients.delete(ws);
    
    if (wasRemoved) {
      // Clean up any other closed connections
      cleanupClosedConnections(sessionClients);
      
      // Broadcast updated session info to remaining clients
      if (sessionClients.size > 0) {
        broadcastSessionUpdate(sessionClients, sessionId);
      }
      
      // Clean up empty sessions
      if (sessionClients.size === 0) {
        sessions.delete(sessionId);
        console.log(`Removed empty session: ${sessionId}`);
      }
    }
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error in session ${sessionId}:`, error);
    sessionClients.delete(ws);
    
    // Broadcast updated session info to remaining clients
    if (sessionClients.size > 0) {
      broadcastSessionUpdate(sessionClients, sessionId);
    }
    
    // Clean up empty sessions
    if (sessionClients.size === 0) {
      sessions.delete(sessionId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Open this URL on both devices to start drawing!');
});
