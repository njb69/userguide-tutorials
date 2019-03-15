// @ts-check
const prot = require("protractor");
const Promise = require("es6-promise").Promise;

/** @type {prot.Config} */
const configuration = {
  framework: "jasmine",
  specs: ["dist/test/tests/*.js"],
  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,
  restartBrowserBetweenTests: process.env.RX_DEBUG === "true" ? false : true,
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: function () {
    prot.browser.ignoreSynchronization = true;

    const jasmineReporters = require('jasmine-reporters');
    const junitReporter = new jasmineReporters.JUnitXmlReporter({

      // setup the output path for the junit reports
      savePath: 'temp-reports/',

      // consolidate all true:
      //   output/junitresults.xml
      //
      // consolidate all set to false:
      //   output/junitresults-example1.xml
      //   output/junitresults-example2.xml
      consolidateAll: true,
      filePrefix: process.env.TEST_REPORT_FILENAME
    });
    jasmine.getEnv().addReporter(junitReporter);
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: parseInt(process.env.RX_DEFAULT_TIMEOUT, 10)
  },
  beforeLaunch: function () {
    require('ts-node').register();
  },
  onComplete: function () {
    return process.env.RX_DEBUG !== "true" ? Promise.resolve() : new Promise(function (resolve) { });
  }
};

if (process.env.RX_ENDPOINT_TYPE === "saucelabs") {
  if (process.env.RX_PROXY) {
    const HTTPSProxyAgent = require('https-proxy-agent');
    const sauceRestAgent = new HTTPSProxyAgent(process.env.RX_PROXY);
    configuration.sauceAgent = sauceRestAgent;
    configuration.webDriverProxy = process.env.RX_PROXY;
  }

  configuration.multiCapabilities = [{
    browserName: process.env.RX_ENDPOINT_BROWSER,
    platform: process.env.RX_ENDPOINT_PLATFORM,
    version: process.env.RX_ENDPOINT_VERSION
  }];
  configuration.sauceUser = process.env.RX_ENDPOINT_USER;
  configuration.sauceKey = process.env.RX_ENDPOINT_KEY;
} else if (process.env.RX_ENDPOINT_TYPE === "seleniumgrid") {
  if (process.env.RX_PROXY) {
    configuration.webDriverProxy = process.env.RX_PROXY;
  }

  let customCapabilities = {};
  try { customCapabilities = JSON.parse(process.env.RX_ENDPOINT_CAPABILITIES) } catch (e) { /* */ }
  const capabilities = Object.assign({
    browserName: process.env.RX_ENDPOINT_BROWSER,
    platform: process.env.RX_ENDPOINT_PLATFORM,
    version: process.env.RX_ENDPOINT_VERSION
  }, customCapabilities);


  configuration.multiCapabilities = [capabilities];
  configuration.seleniumAddress = process.env.RX_ENDPOINT_GRID_URL;
} else if (process.env.RX_ENDPOINT_TYPE === "custom") {
  if (process.env.RX_PROXY) {
    configuration.webDriverProxy = process.env.RX_PROXY;
  }

  let customCapabilities = {};
  try { customCapabilities = JSON.parse(process.env.RX_ENDPOINT_CAPABILITIES) } catch (e) { /* */ }

  configuration.multiCapabilities = [customCapabilities];
  configuration.seleniumAddress = process.env.RX_ENDPOINT_GRID_URL;
} else {
  let capabilities = {};
  try { capabilities = JSON.parse(process.env.RX_ENDPOINT_CAPABILITIES) } catch (e) { /* */ }
  configuration.capabilities = Object.assign({
    browserName: process.env.RX_ENDPOINT_BROWSER,
    operaOptions: {
      args: [],
      extensions: [],
      binary: process.env.RX_OPERA_PATH
    }
  }, capabilities);

  if (process.env.RX_ENDPOINT_TYPE === "android") {
    configuration.capabilities.chromeOptions = {
      androidPackage: "com.android.chrome"
    }
  }

  configuration.seleniumAddress = "http://localhost:4444/wd/hub";
}

const headless = process.env.RX_ENDPOINT_HEADLESS;
if (headless === "true") {
  switch (configuration.capabilities.browserName) {
    case "chrome":
      configuration.capabilities.chromeOptions = {
        args: ["--headless"]
      };
      break;

    case "firefox":
      configuration.capabilities['moz:firefoxOptions'] = {
        args: ["--headless"]
      }
      break;
  }
} else if (process.env.RX_DEBUG === "true" && configuration.capabilities.browserName === "chrome" && process.env.RX_SELOCITYPATH) {
  configuration.capabilities.chromeOptions = {
    args: ["--load-extension=" + process.env.RX_SELOCITYPATH, "--auto-open-devtools-for-tabs"]
  };
}

exports.config = configuration;
