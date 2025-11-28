const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data:; font-src *; connect-src *;");
  next();
});

app.use(express.json());
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const metrics = {
  servers: [
    {
      id: 1,
      name: 'Server Local - Prometheus',
      ip: '192.168.1.100',
      status: 'online',
      cpu: 45,
      ram: 62,
      disk: 78,
      network: 125,
      uptime: 45,
      lastUpdate: new Date()
    },
    {
      id: 2,
      name: 'Server Backup',
      ip: '192.168.1.101',
      status: 'online',
      cpu: 28,
      ram: 41,
      disk: 55,
      network: 89,
      uptime: 120,
      lastUpdate: new Date()
    },
    {
      id: 3,
      name: 'Database Server',
      ip: '192.168.1.102',
      status: 'online',
      cpu: 72,
      ram: 85,
      disk: 92,
      network: 234,
      uptime: 240,
      lastUpdate: new Date()
    }
  ],
  alerts: []
};

const history = {
  cpu: [],
  ram: [],
  disk: [],
  network: []
};

app.get('/api/metrics', (req, res) => {
  metrics.servers.forEach(server => {
    server.cpu = Math.max(10, Math.min(95, server.cpu + (Math.random() - 0.5) * 10));
    server.ram = Math.max(20, Math.min(95, server.ram + (Math.random() - 0.5) * 8));
    server.disk = Math.max(30, Math.min(98, server.disk + (Math.random() - 0.5) * 3));
    server.network = Math.max(50, Math.min(500, server.network + (Math.random() - 0.5) * 50));
    server.lastUpdate = new Date();

    if (server.cpu > 80) {
      const alert = {
        id: Date.now(),
        server: server.name,
        type: 'CPU',
        value: server.cpu.toFixed(2),
        severity: 'high',
        timestamp: new Date()
      };
      if (!metrics.alerts.find(a => a.server === alert.server && a.type === 'CPU')) {
        metrics.alerts.push(alert);
      }
    }

    if (server.ram > 85) {
      const alert = {
        id: Date.now(),
        server: server.name,
        type: 'RAM',
        value: server.ram.toFixed(2),
        severity: 'high',
        timestamp: new Date()
      };
      if (!metrics.alerts.find(a => a.server === alert.server && a.type === 'RAM')) {
        metrics.alerts.push(alert);
      }
    }
  });

  metrics.alerts = metrics.alerts.slice(-10);

  res.json(metrics);
});

app.get('/api/history', (req, res) => {
  res.json(history);
});

app.post('/api/receive-metrics', (req, res) => {
  const { serverName, cpu, ram, disk, network } = req.body;

  const server = metrics.servers.find(s => s.name === serverName);
  if (server) {
    server.cpu = cpu;
    server.ram = ram;
    server.disk = disk;
    server.network = network;
    server.lastUpdate = new Date();
  }

  res.json({ success: true, message: 'Metrics received' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Monitoring Dashboard API running on port ${PORT}`);
  console.log(`📊 Access dashboard at http://localhost:${PORT}`);
});
