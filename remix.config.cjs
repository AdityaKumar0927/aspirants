/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget: "node-cjs",
  server: undefined, 
  devServerPort: 8002,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_headers: true,
    v2_meta: true
  }
};
