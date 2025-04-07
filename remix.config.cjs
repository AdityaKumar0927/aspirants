// remix.config.js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "node-cjs",
  ignoredRouteFiles: ["**/.*"],
  future: {},
  browserNodeBuiltinsPolyfill: {
    modules: {
      fs: true,
      path: true,
      vm: true,
      buffer: true,
      string_decoder: true,
      events: true,
      util: true,
      os: true,
      crypto: true,
      http: true,
      child_process: true,
      https: true,
      net: true,
      tls: true,
      url: true,
      assert: true,
      stream: true,
      zlib: true
    }
  }
}
