module.exports = {
  apps: [
    {
      name: "file-server",
      script: "index.js",
      env: {
        NODE_ENV: "local",
        PORT: 3001,
        API_ENDPOINT: "http://127.0.0.1:3001"
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
        API_ENDPOINT: "http://127.0.0.1:2015"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
        API_ENDPOINT: "https://zoadesk.io"
      }
    }
  ]
};
