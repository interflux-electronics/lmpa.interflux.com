'use strict';

const PKG = require('../package.json');

// Responsible for making .env variables available (for example: process.env.GIT_REVISION)
require('dotenv').config();

// Where the Rails backend is located
const apiHosts = {
  development: 'http://localhost:3000',
  production: 'https://api.interflux.com'
};

// Where this Ember app is located
const appHosts = {
  development: 'http://localhost:4200',
  production: 'https://lmpa.interflux.com'
};

// Where the CDN is located
const cdnHosts = {
  development: 'http://localhost:9000',
  production: 'https://cdn.interflux.com'
};

// The exact time of the build
const now = new Date();
const timeOfBuild = [
  now.getUTCFullYear(),
  now.getUTCMonth() + 1,
  now.getUTCDate(),
  now.getUTCHours(),
  now.getUTCMinutes(),
  now.getUTCSeconds()
].join('-');

module.exports = function(env) {
  // Environment flags
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  // Hosts
  const apiHost = apiHosts[env];
  const appHost = appHosts[env];
  const cdnHost = cdnHosts[env];

  // The Rails API namespace
  const apiNamespace = 'v1/public';

  // The git revision SHA of this build (only in production)
  const gitRevision = process.env.GIT_REVISION;

  let ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    environment: env,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    buildConfig: {
      isDevelopment,
      isTest,
      isProduction,
      apiHost,
      appHost,
      cdnHost,
      apiNamespace,
      gitRevision,
      timeOfBuild
    },

    fastboot: {
      hostWhitelist: ['lmpa.interflux.com', '127.0.0.1:8000', /^localhost:\d+$/]
    },

    googleAnalytics: {
      trackingId: 'UA-34474019-11'
    },

    mixPanel: {
      token: '108f7f07c111c43a83a2365ef952fc06'
    }
  };

  if (isDevelopment) {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (isTest) {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (isProduction) {
    // here you can enable a production-specific feature
  }

  return ENV;
};
