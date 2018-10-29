'use strict';

const git = require('git-rev-sync');
const gitRevision = git.short();

module.exports = function(environment) {
  // Environment flags
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';
  const isTest = environment === 'test';

  let ENV = {
    modulePrefix: 'lmpa-interflux-com',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    buildConfig: {
      isDevelopment,
      isTest,
      isProduction,
      gitRevision
    },

    fastboot: {
      hostWhitelist: [
        'interflux.com',
        'fastboot.lmpa.interflux.com',
        'lmpa.interflux.com',
        '127.0.0.1:8000',
        /^localhost:\d+$/
      ]
    },

    googleAnalytics: {
      trackingId: 'UA-34474019-11'
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
