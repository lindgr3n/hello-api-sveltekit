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
      cwd: './frontend/',
      script: 'ORIGIN=http://hello-api-sveltekit node build/index.js',
      exec_mode: 'fork',
      instances: '1',
      autorestart: true,
      node_args: '-r dotenv/config',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        ORIGIN: 'http://hello-api-sveltekit',
      },
    },
  ],
}
