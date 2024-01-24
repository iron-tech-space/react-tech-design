const { createProxyMiddleware } = require("http-proxy-middleware");

const GEOSERVER_URL = "http://10.5.121.73";
const API_URL = "http://10.5.121.74";
const OAUTH_URL = "http://10.5.121.74:8809";
const PSD_CONNECT = "http://10.5.121.74";
const WORKER_CONNECT ="http://10.5.121.80:57108";

// const API_URL_MAP = 'http://10.5.121.80';
// const OAUTH_URL = 'https://oauth.dias-dev.ru';
// const LOCAL_URL = 'http://localhost';

module.exports = function (app) {
  app.use(
    "/api/advanced",
    createProxyMiddleware({
      target: `${API_URL}:8818/advanced`,
      pathRewrite: { "^/api/advanced": "" },
    })
  );
    app.use(
        "/api/bear",
        createProxyMiddleware({
            target: `${API_URL}:8820/bear`,
            pathRewrite: { "^/api/bear": "" },
        })
    );
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: `${OAUTH_URL}/oauth`,
      pathRewrite: { "^/api/auth": "" },
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    "/api/tiles",
    createProxyMiddleware({
      target: `${GEOSERVER_URL}/api/tiles`,
      pathRewrite: { "^/api/tiles": "" },
    })
  );

  app.use(
    "/api/geoserver",
    createProxyMiddleware({
      target: `${GEOSERVER_URL}/geoserver`,
      pathRewrite: { "^/api/geoserver": "" },
    })
  );
  app.use(
    "/api/psd",
    createProxyMiddleware({
      target: `${PSD_CONNECT}:8801/psd`,
      pathRewrite: { "^/api/psd": "" },
    })
  );
    app.use(
        "/api/router",
        createProxyMiddleware({
            target: `${WORKER_CONNECT}/router`,//
            pathRewrite: { "^/api/router": "" },
        })
    );
    app.use(
        "/api/integration-sap",
        createProxyMiddleware({
            target: `${API_URL}:8803/integration-sap`,
            pathRewrite: { "^/api/integration-sap": "" },
        })
    );
  // app.use(
  // 	'/api/dispatcher',
  // 	createProxyMiddleware({
  // 		target: `${API_URL}:8808/dispatcher`,
  // 		pathRewrite: {'^/api/dispatcher': ''}
  // 	})
  // );
};


