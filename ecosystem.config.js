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
      instances: '1',
      autorestart: true,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000, // port the app will be launched on
      },
    },
  ],
}
