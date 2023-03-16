module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
    {
      name: 'web-app-frontend',
      script: './frontend/build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
