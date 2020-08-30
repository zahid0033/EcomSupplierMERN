/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    "/images/*",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
