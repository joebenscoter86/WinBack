"use strict";
var __StripeExtExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@stripe/ui-extension-sdk/version.js
  var require_version = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SDK_VERSION = void 0;
      exports.SDK_VERSION = "9.1.0";
    }
  });

  // node_modules/@stripe/ui-extension-sdk/ui/index.js
  var require_ui = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/ui/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TableHeaderCell = exports.TableHead = exports.TableFooter = exports.TableCell = exports.TableBody = exports.Tab = exports.TabPanels = exports.TabPanel = exports.TabList = exports.Switch = exports.StripeFileUploader = exports.Spinner = exports.Sparkline = exports.SignInView = exports.SettingsView = exports.Select = exports.Radio = exports.PropertyList = exports.PropertyListItem = exports.PlatformConfigurationView = exports.OnboardingView = exports.Menu = exports.MenuItem = exports.MenuGroup = exports.List = exports.ListItem = exports.Link = exports.LineChart = exports.Inline = exports.Img = exports.Icon = exports.FormFieldGroup = exports.FocusView = exports.Divider = exports.DetailPageTable = exports.DetailPagePropertyList = exports.DetailPageModule = exports.DateField = exports.ContextView = exports.Chip = exports.ChipList = exports.Checkbox = exports.Button = exports.ButtonGroup = exports.Box = exports.BarChart = exports.Banner = exports.Badge = exports.Accordion = exports.AccordionItem = void 0;
      exports.Tooltip = exports.TextField = exports.TextArea = exports.TaskList = exports.TaskListItem = exports.Tabs = exports.TableRow = exports.Table = void 0;
      var jsx_runtime_1 = __require("react/jsx-runtime");
      var react_1 = __require("@remote-ui/react");
      var version_1 = require_version();
      var withSdkProps = (Component) => {
        const wrappedComponentName = Component.displayName || Component.toString();
        const WithSdkProps = (props) => (0, jsx_runtime_1.jsx)(Component, __spreadProps(__spreadValues({}, props), { wrappedComponentName, sdkVersion: version_1.SDK_VERSION, schemaVersion: "v9" }));
        WithSdkProps.wrappedComponentName = wrappedComponentName;
        return WithSdkProps;
      };
      var defineComponent = (name, fragmentProps, wrapWithSdkProps) => {
        const remoteComponent = (0, react_1.createRemoteReactComponent)(name, {
          fragmentProps
        });
        if (!wrapWithSdkProps) {
          return remoteComponent;
        }
        return withSdkProps(remoteComponent);
      };
      exports.AccordionItem = defineComponent("AccordionItem", ["title", "actions", "media", "subtitle"], true);
      exports.Accordion = defineComponent("Accordion", [], true);
      exports.Badge = defineComponent("Badge", [], true);
      exports.Banner = defineComponent("Banner", ["actions", "description", "title"], true);
      exports.BarChart = defineComponent("BarChart", [], true);
      exports.Box = defineComponent("Box", [], true);
      exports.ButtonGroup = defineComponent("ButtonGroup", ["menuTrigger"], true);
      exports.Button = defineComponent("Button", [], true);
      exports.Checkbox = defineComponent("Checkbox", ["label"], true);
      exports.ChipList = defineComponent("ChipList", [], true);
      exports.Chip = defineComponent("Chip", [], true);
      exports.ContextView = defineComponent("ContextView", ["actions", "banner", "footerContent", "primaryAction", "secondaryAction"], true);
      exports.DateField = defineComponent("DateField", ["label"], true);
      exports.DetailPageModule = defineComponent("DetailPageModule", [], true);
      exports.DetailPagePropertyList = defineComponent("DetailPagePropertyList", [], true);
      exports.DetailPageTable = defineComponent("DetailPageTable", [], true);
      exports.Divider = defineComponent("Divider", [], true);
      exports.FocusView = defineComponent("FocusView", ["footerContent", "primaryAction", "secondaryAction"], true);
      exports.FormFieldGroup = defineComponent("FormFieldGroup", [], true);
      exports.Icon = defineComponent("Icon", [], true);
      exports.Img = defineComponent("Img", [], true);
      exports.Inline = defineComponent("Inline", [], true);
      exports.LineChart = defineComponent("LineChart", [], true);
      exports.Link = defineComponent("Link", [], true);
      exports.ListItem = defineComponent("ListItem", ["icon", "image", "secondaryTitle", "title", "value"], true);
      exports.List = defineComponent("List", [], true);
      exports.MenuGroup = defineComponent("MenuGroup", ["title"], true);
      exports.MenuItem = defineComponent("MenuItem", [], true);
      exports.Menu = defineComponent("Menu", ["trigger"], true);
      exports.OnboardingView = defineComponent("OnboardingView", ["error"], true);
      exports.PlatformConfigurationView = defineComponent("PlatformConfigurationView", [], true);
      exports.PropertyListItem = defineComponent("PropertyListItem", ["label", "value"], true);
      exports.PropertyList = defineComponent("PropertyList", [], true);
      exports.Radio = defineComponent("Radio", ["label"], true);
      exports.Select = defineComponent("Select", ["label"], true);
      exports.SettingsView = defineComponent("SettingsView", [], true);
      exports.SignInView = defineComponent("SignInView", ["descriptionActionContents", "footerContent"], true);
      exports.Sparkline = defineComponent("Sparkline", [], true);
      exports.Spinner = defineComponent("Spinner", [], true);
      exports.StripeFileUploader = defineComponent("StripeFileUploader", [], true);
      exports.Switch = defineComponent("Switch", ["label"], true);
      exports.TabList = defineComponent("TabList", [], true);
      exports.TabPanel = defineComponent("TabPanel", [], true);
      exports.TabPanels = defineComponent("TabPanels", [], true);
      exports.Tab = defineComponent("Tab", [], true);
      exports.TableBody = defineComponent("TableBody", [], true);
      exports.TableCell = defineComponent("TableCell", [], true);
      exports.TableFooter = defineComponent("TableFooter", [], true);
      exports.TableHead = defineComponent("TableHead", [], true);
      exports.TableHeaderCell = defineComponent("TableHeaderCell", [], true);
      exports.Table = defineComponent("Table", [], true);
      exports.TableRow = defineComponent("TableRow", [], true);
      exports.Tabs = defineComponent("Tabs", [], true);
      exports.TaskListItem = defineComponent("TaskListItem", [], true);
      exports.TaskList = defineComponent("TaskList", [], true);
      exports.TextArea = defineComponent("TextArea", ["label"], true);
      exports.TextField = defineComponent("TextField", ["label"], true);
      exports.Tooltip = defineComponent("Tooltip", ["trigger"], true);
    }
  });

  // node_modules/invariant/browser.js
  var require_browser = __commonJS({
    "node_modules/invariant/browser.js"(exports, module) {
      "use strict";
      var invariant = function(condition, format, a, b, c, d, e, f) {
        if (true) {
          if (format === void 0) {
            throw new Error("invariant requires an error message argument");
          }
        }
        if (!condition) {
          var error;
          if (format === void 0) {
            error = new Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(
              format.replace(/%s/g, function() {
                return args[argIndex++];
              })
            );
            error.name = "Invariant Violation";
          }
          error.framesToPop = 1;
          throw error;
        }
      };
      module.exports = invariant;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/_endpoint.js
  var require_endpoint = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/_endpoint.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getHostEndpoint = void 0;
      var invariant_1 = __importDefault(require_browser());
      var getHostEndpoint = () => {
        var _a;
        const hostEndpoint = (_a = globalThis.__StripeExtExports) == null ? void 0 : _a.endpoint;
        (0, invariant_1.default)(hostEndpoint, "hostEndpoint has not been initialized");
        return hostEndpoint;
      };
      exports.getHostEndpoint = getHostEndpoint;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/supportsFetchAppEmbeddedKey.js
  var require_supportsFetchAppEmbeddedKey = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/supportsFetchAppEmbeddedKey.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.supportsFetchAppEmbeddedKey = void 0;
      var _endpoint_1 = require_endpoint();
      var supportsFetchAppEmbeddedKey = () => __async(exports, null, function* () {
        return (0, _endpoint_1.getHostEndpoint)().call.supportsFetchAppEmbeddedKey().then((supported) => supported).catch(() => false);
      });
      exports.supportsFetchAppEmbeddedKey = supportsFetchAppEmbeddedKey;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/fetchAppEmbeddedKey.js
  var require_fetchAppEmbeddedKey = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/fetchAppEmbeddedKey.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchAppEmbeddedKey = void 0;
      var _endpoint_1 = require_endpoint();
      var fetchAppEmbeddedKey = () => __async(exports, null, function* () {
        const apiKey = yield (0, _endpoint_1.getHostEndpoint)().call.fetchAppEmbeddedKey();
        if (!apiKey) {
          throw new Error("Unable to fetch app embedded key");
        }
        return apiKey;
      });
      exports.fetchAppEmbeddedKey = fetchAppEmbeddedKey;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/fetchViaFrame.js
  var require_fetchViaFrame = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/fetchViaFrame.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchViaFrame = void 0;
      var fetchAppEmbeddedKey_1 = require_fetchAppEmbeddedKey();
      var fetchViaFrame = (_0, ..._1) => __async(exports, [_0, ..._1], function* (url, options = {}) {
        const apiKey = yield (0, fetchAppEmbeddedKey_1.fetchAppEmbeddedKey)();
        const init = __spreadProps(__spreadValues({}, options), {
          headers: __spreadProps(__spreadValues({}, options.headers), {
            Authorization: `Bearer ${apiKey}`
          })
        });
        const response = yield fetch(url, init);
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const serializableResponse = {
          json: void 0,
          arrayBuffer: void 0,
          headers,
          ok: response.ok,
          redirected: response.redirected,
          status: response.status,
          statusText: response.statusText,
          type: response.type,
          url: response.url
        };
        switch (response.headers.get("Content-Type")) {
          case "application/json":
            serializableResponse.json = yield response.json();
            break;
          default:
            serializableResponse.arrayBuffer = yield response.arrayBuffer();
            break;
        }
        return serializableResponse;
      });
      exports.fetchViaFrame = fetchViaFrame;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/fetchViaHost.js
  var require_fetchViaHost = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/fetchViaHost.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchViaHost = void 0;
      var _endpoint_1 = require_endpoint();
      var fetchViaHost = (_0, ..._1) => __async(exports, [_0, ..._1], function* (encodedUrl, options = {}) {
        const url = new URL(encodedUrl);
        return (0, _endpoint_1.getHostEndpoint)().call.stripeApiFetch(url.pathname + url.search, options);
      });
      exports.fetchViaHost = fetchViaHost;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/selectPreferredStripeApiFetch.js
  var require_selectPreferredStripeApiFetch = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/selectPreferredStripeApiFetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.selectPreferredStripeApiFetch = void 0;
      var supportsFetchAppEmbeddedKey_1 = require_supportsFetchAppEmbeddedKey();
      var fetchViaFrame_1 = require_fetchViaFrame();
      var fetchViaHost_1 = require_fetchViaHost();
      var selectedStripeApiFetch = null;
      var selectPreferredStripeApiFetch = () => __async(exports, null, function* () {
        if (!selectedStripeApiFetch) {
          selectedStripeApiFetch = (yield (0, supportsFetchAppEmbeddedKey_1.supportsFetchAppEmbeddedKey)()) ? fetchViaFrame_1.fetchViaFrame : fetchViaHost_1.fetchViaHost;
        }
        return selectedStripeApiFetch;
      });
      exports.selectPreferredStripeApiFetch = selectPreferredStripeApiFetch;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/api/index.js
  var require_api = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/api/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.selectPreferredStripeApiFetch = void 0;
      var selectPreferredStripeApiFetch_1 = require_selectPreferredStripeApiFetch();
      Object.defineProperty(exports, "selectPreferredStripeApiFetch", { enumerable: true, get: function() {
        return selectPreferredStripeApiFetch_1.selectPreferredStripeApiFetch;
      } });
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/apiFetch.js
  var require_apiFetch = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/apiFetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stripeApiFetch = void 0;
      var api_1 = require_api();
      var stripeApiFetch = (path, options) => __async(exports, null, function* () {
        const preferredFetchMethod = yield (0, api_1.selectPreferredStripeApiFetch)();
        return preferredFetchMethod(path, options);
      });
      exports.stripeApiFetch = stripeApiFetch;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/httpClient.js
  var require_httpClient = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/httpClient.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AUTHORIZATION_VALUE = exports.AUTHORIZATION_HEADER = exports.createHttpClient = exports.STRIPE_API_KEY = exports.StripeAppsHttpClient = void 0;
      var invariant_1 = __importDefault(require_browser());
      var apiFetch_1 = require_apiFetch();
      var matchesStripeKey = /[ps]k_(test|live)_[A-Za-z0-9]+/;
      var StripeAppsHttpResponse = class {
        constructor(resp) {
          this._resp = resp;
        }
        getHeaders() {
          return this._resp.headers;
        }
        getStatusCode() {
          return this._resp.status;
        }
        getRawResponse() {
          return this._resp;
        }
        toStream() {
          throw new Error("Streams have not been implemented in the Stripe HTTP client");
        }
        toJSON() {
          const { json } = this._resp;
          if (json === void 0) {
            return Promise.reject(new Error("Response body undefined"));
          } else {
            return Promise.resolve(json);
          }
        }
      };
      var StripeAppsHttpClient = class {
        constructor(fetch2) {
          this._fetch = fetch2;
        }
        getClientName() {
          return "stripe-ui-extension";
        }
        makeRequest(host, port, path, method, headers, requestData, protocol, _timeout) {
          return __async(this, null, function* () {
            (0, invariant_1.default)(protocol === "https", "Must use https connections in UI extensions");
            const fetchOptions = {
              method,
              headers
            };
            if (requestData) {
              fetchOptions.body = requestData;
            }
            const authHeader = headers.Authorization;
            if (authHeader && matchesStripeKey.test(authHeader)) {
              throw new Error("Do not use actual stripe keys when using the Stripe JS API client with UI extesions.\n\n Instead, use `STRIPE_API_KEY` from `@stripe/ui-extension-sdk/http_client` as a placeholder.");
            }
            const url = new URL(path, `${protocol}://${host}`);
            const resp = yield this._fetch(url.toString(), fetchOptions);
            return new StripeAppsHttpResponse(resp);
          });
        }
      };
      exports.StripeAppsHttpClient = StripeAppsHttpClient;
      exports.STRIPE_API_KEY = "DO_NOT_PASS_A_REAL_API_KEY";
      var createHttpClient = () => new StripeAppsHttpClient(apiFetch_1.stripeApiFetch);
      exports.createHttpClient = createHttpClient;
      exports.AUTHORIZATION_HEADER = "Authorization";
      exports.AUTHORIZATION_VALUE = `Bearer ${exports.STRIPE_API_KEY}`;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/signature/createFetchStripeSignatureDirectly.js
  var require_createFetchStripeSignatureDirectly = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/signature/createFetchStripeSignatureDirectly.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createFetchStripeSignatureDirectly = void 0;
      var httpClient_1 = require_httpClient();
      var createFetchStripeSignatureDirectly = ({ host, port }) => (payload) => __async(exports, null, function* () {
        const url = new URL(`https://${host}:${port}/v1/apps/app_embedded_backend_signature`);
        url.searchParams.set("payload", JSON.stringify(__spreadValues({}, payload)));
        url.searchParams.set("include_only[]", "signature");
        const client = (0, httpClient_1.createHttpClient)();
        const response = client.makeRequest(host, port, url.pathname + url.search, "GET", {}, null, "https");
        return response.then((r) => r.toJSON()).then((data) => data.signature);
      });
      exports.createFetchStripeSignatureDirectly = createFetchStripeSignatureDirectly;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/signature/connectionSettings.js
  var require_connectionSettings = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/signature/connectionSettings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.setConnectionSettings = exports.connectionSettings = void 0;
      var defaultConnectionSettings = {
        host: "api.stripe.com",
        port: 443
      };
      exports.connectionSettings = defaultConnectionSettings;
      var setConnectionSettings = (settings) => {
        exports.connectionSettings = __spreadValues(__spreadValues({}, defaultConnectionSettings), settings);
      };
      exports.setConnectionSettings = setConnectionSettings;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/signature.js
  var require_signature = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/signature.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchStripeSignature = void 0;
      var createFetchStripeSignatureDirectly_1 = require_createFetchStripeSignatureDirectly();
      var supportsFetchAppEmbeddedKey_1 = require_supportsFetchAppEmbeddedKey();
      var connectionSettings_1 = require_connectionSettings();
      var _endpoint_1 = require_endpoint();
      var fetchStripeSignature2 = (additionalPayload) => __async(exports, null, function* () {
        if (yield (0, supportsFetchAppEmbeddedKey_1.supportsFetchAppEmbeddedKey)()) {
          const fetchStripeSignatureDirectly = (0, createFetchStripeSignatureDirectly_1.createFetchStripeSignatureDirectly)(connectionSettings_1.connectionSettings);
          return fetchStripeSignatureDirectly(additionalPayload);
        } else {
          return (0, _endpoint_1.getHostEndpoint)().call.fetchStripeSignature(additionalPayload);
        }
      });
      exports.fetchStripeSignature = fetchStripeSignature2;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/signature.js
  var require_signature2 = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/signature.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var signature_1 = require_signature();
      exports.default = signature_1.fetchStripeSignature;
    }
  });

  // .build/manifest.js
  var manifest_exports = {};
  __export(manifest_exports, {
    AppSettings: () => AppSettings_default,
    BUILD_TIME: () => BUILD_TIME,
    DisputeListView: () => DisputeListView_default,
    PaymentDisputeView: () => PaymentDisputeView_default,
    default: () => manifest_default
  });

  // src/views/PaymentDisputeView.tsx
  var import_react3 = __require("react");
  var import_ui11 = __toESM(require_ui());

  // src/components/DisputeWorkflow.tsx
  var import_react2 = __require("react");
  var import_ui10 = __toESM(require_ui());

  // src/lib/types.ts
  var WIZARD_STEPS = ["review", "evidence", "narrative", "submit"];
  var WIZARD_STEP_LABELS = {
    review: "Review",
    evidence: "Evidence",
    narrative: "Narrative",
    submit: "Submit"
  };

  // src/lib/apiClient.ts
  var import_signature = __toESM(require_signature2());
  var USE_LOCAL_BACKEND = true;
  var BACKEND_URL = USE_LOCAL_BACKEND ? "http://localhost:3000" : "https://winbackpay.com";
  var ApiError = class extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
      this.name = "ApiError";
    }
  };
  function fetchBackend(path, context, data) {
    return __async(this, null, function* () {
      var _a, _b;
      const signature = yield (0, import_signature.default)();
      const body = JSON.stringify(__spreadProps(__spreadValues({}, data), {
        user_id: (_a = context.userContext) == null ? void 0 : _a.id,
        account_id: (_b = context.userContext) == null ? void 0 : _b.account.id
      }));
      const response = yield fetch(`${BACKEND_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Stripe-Signature": signature
        },
        body
      });
      if (!response.ok) {
        const error = yield response.json().catch(() => ({
          message: response.statusText
        }));
        throw new ApiError(
          error.message || `API error: ${response.status}`,
          response.status
        );
      }
      return response.json();
    });
  }
  function patchBackend(path, context, data) {
    return __async(this, null, function* () {
      var _a, _b;
      const signature = yield (0, import_signature.default)();
      const body = JSON.stringify(__spreadProps(__spreadValues({}, data), {
        user_id: (_a = context.userContext) == null ? void 0 : _a.id,
        account_id: (_b = context.userContext) == null ? void 0 : _b.account.id
      }));
      const response = yield fetch(`${BACKEND_URL}${path}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Stripe-Signature": signature
        },
        body
      });
      if (!response.ok) {
        const error = yield response.json().catch(() => ({
          message: response.statusText
        }));
        throw new ApiError(
          error.message || error.error || `API error: ${response.status}`,
          response.status
        );
      }
      return response.json();
    });
  }

  // src/lib/utils.ts
  var RESOLVED_STATUSES = ["won", "lost", "warning_closed", "charge_refunded"];
  function isResolved(status) {
    return RESOLVED_STATUSES.includes(status);
  }
  function getStatusBadge(status) {
    switch (status) {
      case "needs_response":
      case "warning_needs_response":
        return { label: "Needs Response", type: "urgent" };
      case "under_review":
      case "warning_under_review":
        return { label: "Under Review", type: "info" };
      case "won":
        return { label: "Won", type: "positive" };
      case "lost":
      case "warning_closed":
        return { label: "Lost", type: "negative" };
      case "charge_refunded":
        return { label: "Refunded", type: "info" };
      default:
        return { label: status, type: "info" };
    }
  }
  function getDaysRemaining(dueBy) {
    const now = new Date();
    const due = new Date(dueBy);
    return Math.ceil((due.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
  }
  function getUrgencyBadge(dueBy, status) {
    if (isResolved(status))
      return null;
    const days = getDaysRemaining(dueBy);
    if (days < 5)
      return { label: `${days}d left`, type: "urgent" };
    if (days <= 13)
      return { label: `${days}d left`, type: "warning" };
    return { label: `${days}d left`, type: "positive" };
  }

  // src/components/ErrorBanner.tsx
  var import_ui = __toESM(require_ui());
  var import_jsx_runtime = __require("react/jsx-runtime");
  var ErrorBanner = ({ message, onRetry }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
      css: { padding: "medium" },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Banner, {
        type: "critical",
        title: "Something went wrong",
        description: message,
        actions: onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
          onPress: onRetry,
          children: "Retry"
        }) : void 0
      })
    });
  };
  var ErrorBanner_default = ErrorBanner;

  // src/components/review/DisputeOverview.tsx
  var import_ui2 = __toESM(require_ui());
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  function InfoRow({ label, value }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
      css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Inline, {
          css: { font: "caption", color: "secondary" },
          children: label
        }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Inline, {
          css: { font: "caption" },
          children: value
        })
      ]
    });
  }
  function formatAmount(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }
  function formatDate(timestamp) {
    return new Date(timestamp * 1e3).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  var DisputeOverview = ({ dispute, loading }) => {
    const statusBadge = getStatusBadge(dispute.status);
    const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
    const daysRemaining = dispute.due_by ? getDaysRemaining(dispute.due_by) : null;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
          css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Inline, {
              css: { font: "heading", fontWeight: "semibold" },
              children: formatAmount(dispute.amount, dispute.currency)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
              css: { stack: "x", gap: "xsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Badge, {
                  type: statusBadge.type,
                  children: statusBadge.label
                }),
                urgencyBadge && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Badge, {
                  type: urgencyBadge.type,
                  children: urgencyBadge.label
                })
              ]
            })
          ]
        }),
        daysRemaining !== null && daysRemaining > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Inline, {
          css: { font: "body", color: "secondary" },
          children: [
            daysRemaining,
            " ",
            daysRemaining === 1 ? "day" : "days",
            " to respond"
          ]
        }),
        dispute.customer_name && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
          label: "Customer",
          value: dispute.customer_name
        }),
        dispute.customer_email && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
          label: "Email",
          value: dispute.customer_email
        }),
        loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Box, {
          css: { padding: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Spinner, {})
        }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            dispute.card_brand && dispute.card_last4 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
              label: "Card",
              value: `${dispute.card_brand.charAt(0).toUpperCase() + dispute.card_brand.slice(1)} ending in ${dispute.card_last4}`
            }),
            dispute.transaction_date && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
              label: "Transaction date",
              value: formatDate(dispute.transaction_date)
            }),
            dispute.charge_description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
              label: "Description",
              value: dispute.charge_description
            }),
            dispute.billing_address && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
              label: "Billing address",
              value: dispute.billing_address
            }),
            dispute.receipt_url && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
              label: "Receipt",
              value: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Link, {
                href: dispute.receipt_url,
                target: "_blank",
                children: "View receipt"
              })
            }),
            dispute.metadata && Object.keys(dispute.metadata).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {
              children: Object.entries(dispute.metadata).map(([key, val]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoRow, {
                label: key,
                value: val
              }, key))
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Inline, {
              css: { font: "caption", color: "secondary" },
              children: [
                "Dispute: ",
                dispute.id
              ]
            }),
            dispute.charge_id && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Inline, {
              css: { font: "caption", color: "secondary" },
              children: [
                "Charge: ",
                dispute.charge_id
              ]
            })
          ]
        })
      ]
    });
  };
  var DisputeOverview_default = DisputeOverview;

  // src/components/review/CoachHeader.tsx
  var import_ui3 = __toESM(require_ui());
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  var CoachHeader = ({ headline, summary, urgencyMode, daysRemaining }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
          css: { font: "subheading", fontWeight: "semibold" },
          children: headline
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
          css: { font: "body", color: "secondary" },
          children: urgencyMode && daysRemaining !== void 0 ? `You have ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. Focus on the essentials below.` : summary
        })
      ]
    });
  };
  var CoachHeader_default = CoachHeader;

  // src/components/review/QuickActions.tsx
  var import_ui4 = __toESM(require_ui());
  var import_jsx_runtime4 = __require("react/jsx-runtime");
  function deriveActions(playbook) {
    const actions = [];
    const mandatoryItems = playbook.evidence_checklist.filter((item) => item.category === "mandatory" && item.context === "all").slice(0, 3);
    for (const item of mandatoryItems) {
      actions.push(`Confirm you have: ${item.item.toLowerCase()}`);
    }
    const topMistakes = playbook.common_mistakes.slice(0, 2);
    for (const mistake of topMistakes) {
      const reframed = mistake.mistake.startsWith("Not ") ? `Make sure you're ${mistake.mistake.slice(4).toLowerCase()}` : mistake.mistake.startsWith("Skipping ") ? `Make sure you're using ${mistake.mistake.slice(9).toLowerCase()}` : `Check: ${mistake.mistake.toLowerCase()}`;
      actions.push(reframed);
    }
    return actions.slice(0, 5);
  }
  var QuickActions = ({ playbook, urgencyMode }) => {
    const items = urgencyMode ? playbook.urgency_essentials.ordered_items : deriveActions(playbook);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Inline, {
          css: { font: "subheading", fontWeight: "semibold" },
          children: urgencyMode ? "Focus on these essentials" : "Your next steps"
        }),
        items.map((text, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Box, {
          css: { stack: "x", gap: "small", alignY: "top" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Icon, {
              name: "info",
              size: "xsmall"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Inline, {
              css: { font: "body" },
              children: text
            })
          ]
        }, index)),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Inline, {
          css: { font: "caption", color: "secondary" },
          children: "Don't worry, we'll walk you through each of these on the next step."
        })
      ]
    });
  };
  var QuickActions_default = QuickActions;

  // src/components/review/LearnMore.tsx
  var import_ui5 = __toESM(require_ui());
  var import_jsx_runtime5 = __require("react/jsx-runtime");
  var LearnMore = ({ issuerSummary, acquirerSummary }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Accordion, {
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.AccordionItem, {
        title: "Why this matters",
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Box, {
          css: { stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Box, {
              css: { stack: "y", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: "What the bank checks"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
                  css: { font: "body", color: "secondary" },
                  children: issuerSummary
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Box, {
              css: { stack: "y", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: "What happens to your response"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
                  css: { font: "body", color: "secondary" },
                  children: acquirerSummary
                })
              ]
            })
          ]
        })
      })
    });
  };
  var LearnMore_default = LearnMore;

  // src/components/review/UrgencyBanner.tsx
  var import_ui6 = __toESM(require_ui());
  var import_jsx_runtime6 = __require("react/jsx-runtime");
  var UrgencyBanner = ({ daysRemaining, essentials }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Banner, {
          type: "caution",
          title: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left to respond`,
          description: "Focus on the essentials below to maximize your chances."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
          css: { stack: "y", gap: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Box, {
              children: essentials.summary
            }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Box, {
              css: { stack: "y", gap: "xsmall" },
              children: essentials.ordered_items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Inline, {
                css: { stack: "x", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
                    children: [
                      index + 1,
                      "."
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Box, {
                    children: item
                  })
                ]
              }, index))
            })
          ]
        })
      ]
    });
  };
  var UrgencyBanner_default = UrgencyBanner;

  // src/components/evidence/EvidenceChecklist.tsx
  var import_react = __require("react");
  var import_ui9 = __toESM(require_ui());

  // src/components/evidence/ChecklistProgress.tsx
  var import_ui7 = __toESM(require_ui());
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  var ChecklistProgress = ({ completed, total }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Box, {
      css: { stack: "y", gap: "xsmall" },
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
        css: { stack: "x", distribute: "space-between" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
            css: { font: "subheading", fontWeight: "semibold" },
            children: "Evidence Progress"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Inline, {
            css: { font: "caption", color: "secondary" },
            children: [
              completed,
              " of ",
              total,
              " completed"
            ]
          })
        ]
      })
    });
  };
  var ChecklistProgress_default = ChecklistProgress;

  // src/components/evidence/ChecklistItem.tsx
  var import_ui8 = __toESM(require_ui());
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  function getCategoryBadge(category) {
    switch (category) {
      case "mandatory":
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
          type: "negative",
          children: "REQUIRED"
        });
      case "recommended":
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
          type: "warning",
          children: "HELPFUL"
        });
      case "situational":
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
          type: "neutral",
          children: "IF APPLICABLE"
        });
    }
  }
  var SectionToggle = ({ label, expanded, onPress }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Link, {
    onPress,
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
      css: { stack: "x", gap: "xxsmall", alignY: "center" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
          css: { font: "caption", color: "info" },
          children: label
        }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Icon, {
          name: expanded ? "chevronUp" : "chevronDown",
          size: "xsmall"
        })
      ]
    })
  });
  var ChecklistItem = ({
    item,
    checked,
    autoPopulated,
    expandedSections,
    notes,
    onToggle,
    onSectionToggle,
    onNotesChange
  }) => {
    const whyExpanded = expandedSections.has("why");
    const whereExpanded = expandedSections.has("where");
    const notesExpanded = expandedSections.has("notes");
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
      css: { stack: "y", gap: "xsmall", padding: "small", borderRadius: "medium" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
          css: { stack: "x", gap: "small", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Checkbox, {
              label: "",
              checked,
              onChange: onToggle,
              "aria-label": item.item
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
              css: { stack: "y", gap: "xxsmall", width: "fill" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
                  css: { stack: "x", gap: "xsmall", alignY: "center", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                      css: { font: "body", fontWeight: "semibold" },
                      children: item.item
                    }),
                    autoPopulated && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
                      type: "info",
                      children: "FROM STRIPE"
                    }),
                    getCategoryBadge(item.category)
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
                  css: { stack: "x", gap: "small", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SectionToggle, {
                      label: "Why this matters",
                      expanded: whyExpanded,
                      onPress: () => onSectionToggle("why")
                    }),
                    item.where_to_find && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SectionToggle, {
                      label: "Where to find this",
                      expanded: whereExpanded,
                      onPress: () => onSectionToggle("where")
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SectionToggle, {
                      label: notes ? "Your notes" : "Add notes",
                      expanded: notesExpanded,
                      onPress: () => onSectionToggle("notes")
                    })
                  ]
                })
              ]
            })
          ]
        }),
        whyExpanded && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Box, {
          css: { marginLeft: "xlarge", padding: "small", borderRadius: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
            css: { font: "caption", color: "secondary" },
            children: item.why_matters
          })
        }),
        whereExpanded && item.where_to_find && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Box, {
          css: { marginLeft: "xlarge", padding: "small", borderRadius: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
            css: { font: "caption", color: "secondary" },
            children: item.where_to_find
          })
        }),
        notesExpanded && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Box, {
          css: { marginLeft: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.TextArea, {
            label: "Your notes",
            placeholder: "e.g. tracking #, file name, where to find this...",
            value: notes,
            onChange: (e) => onNotesChange(e.target.value),
            rows: 2
          })
        })
      ]
    });
  };
  var ChecklistItem_default = ChecklistItem;

  // src/components/evidence/EvidenceChecklist.tsx
  var import_jsx_runtime9 = __require("react/jsx-runtime");
  var CATEGORY_ORDER = ["mandatory", "recommended", "situational"];
  var CATEGORY_LABELS = {
    mandatory: "Mandatory",
    recommended: "Recommended",
    situational: "Situational"
  };
  function isAutoPopulated(item, dispute) {
    const lower = item.item.toLowerCase();
    if ((lower.includes("receipt") || lower.includes("proof of purchase")) && dispute.receipt_url) {
      return true;
    }
    if (lower.includes("customer email") && dispute.customer_email) {
      return true;
    }
    if (lower.includes("billing address") && dispute.billing_address) {
      return true;
    }
    if (lower.includes("transaction") && lower.includes("date") && dispute.transaction_date) {
      return true;
    }
    return false;
  }
  function buildInitialState(items, dispute) {
    const state = {};
    for (const item of items) {
      state[item.item] = false;
      if (isAutoPopulated(item, dispute)) {
        state[item.item] = true;
      }
    }
    if (dispute.checklist_state) {
      for (const [key, value] of Object.entries(dispute.checklist_state)) {
        if (key in state) {
          state[key] = value;
        }
      }
    }
    return state;
  }
  var EvidenceChecklist = ({ dispute, playbook, context, isUrgent, daysRemaining }) => {
    var _a;
    const items = (_a = playbook == null ? void 0 : playbook.evidence_checklist) != null ? _a : [];
    const [checklistState, setChecklistState] = (0, import_react.useState)(
      () => buildInitialState(items, dispute)
    );
    const [notesState, setNotesState] = (0, import_react.useState)(
      () => {
        var _a2;
        return (_a2 = dispute.checklist_notes) != null ? _a2 : {};
      }
    );
    const [expandedSections, setExpandedSections] = (0, import_react.useState)(/* @__PURE__ */ new Map());
    const [showFullChecklist, setShowFullChecklist] = (0, import_react.useState)(false);
    const checklistTimeoutRef = (0, import_react.useRef)(null);
    const notesTimeoutRef = (0, import_react.useRef)(null);
    const contextRef = (0, import_react.useRef)(context);
    contextRef.current = context;
    (0, import_react.useEffect)(() => {
      var _a2;
      setChecklistState(buildInitialState(items, dispute));
      setNotesState((_a2 = dispute.checklist_notes) != null ? _a2 : {});
    }, [dispute.id, dispute.checklist_state, dispute.checklist_notes, playbook == null ? void 0 : playbook.reason_code]);
    const persistChecklist = (0, import_react.useCallback)((newState) => {
      if (checklistTimeoutRef.current) {
        clearTimeout(checklistTimeoutRef.current);
      }
      checklistTimeoutRef.current = setTimeout(() => {
        patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
          checklist_state: newState
        }).catch((err) => {
          console.error("Failed to save checklist state:", err);
        });
      }, 500);
    }, [dispute.id]);
    const persistNotes = (0, import_react.useCallback)((newNotes) => {
      if (notesTimeoutRef.current) {
        clearTimeout(notesTimeoutRef.current);
      }
      notesTimeoutRef.current = setTimeout(() => {
        patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
          checklist_notes: newNotes
        }).catch((err) => {
          console.error("Failed to save checklist notes:", err);
        });
      }, 1e3);
    }, [dispute.id]);
    const handleToggle = (0, import_react.useCallback)((itemName) => {
      setChecklistState((prev) => {
        const newState = __spreadProps(__spreadValues({}, prev), { [itemName]: !prev[itemName] });
        persistChecklist(newState);
        return newState;
      });
    }, [persistChecklist]);
    const handleNotesChange = (0, import_react.useCallback)((itemName, value) => {
      setNotesState((prev) => {
        const newNotes = __spreadProps(__spreadValues({}, prev), { [itemName]: value });
        persistNotes(newNotes);
        return newNotes;
      });
    }, [persistNotes]);
    const handleSectionToggle = (0, import_react.useCallback)((itemName, section) => {
      setExpandedSections((prev) => {
        var _a2;
        const next = new Map(prev);
        const sections = new Set((_a2 = prev.get(itemName)) != null ? _a2 : []);
        if (sections.has(section)) {
          sections.delete(section);
        } else {
          sections.add(section);
        }
        next.set(itemName, sections);
        return next;
      });
    }, []);
    if (!playbook || items.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
        css: { padding: "medium" },
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Banner, {
          type: "default",
          title: "No evidence checklist available",
          description: "No specific evidence checklist for this reason code. Use Stripe's general evidence guidelines for your response."
        })
      });
    }
    const effectiveUrgency = isUrgent && !showFullChecklist;
    let displayItems = items;
    if (effectiveUrgency) {
      displayItems = items.filter((item) => item.urgency_essential).sort((a, b) => {
        var _a2, _b;
        return ((_a2 = a.urgency_order) != null ? _a2 : 999) - ((_b = b.urgency_order) != null ? _b : 999);
      });
    }
    const grouped = CATEGORY_ORDER.map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      items: displayItems.filter((item) => item.category === category)
    })).filter((group) => group.items.length > 0);
    const totalItems = items.length;
    const completedItems = items.filter((item) => checklistState[item.item]).length;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
      css: { padding: "medium", stack: "y", gap: "medium" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
              css: { font: "subheading", fontWeight: "semibold" },
              children: "Gather your evidence"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
              css: { font: "body", color: "secondary" },
              children: "Here's what you'll need to build your case. Don't let the list intimidate you. Expand each item to see why it matters and jot down notes as you go. On the next step, you'll put it all together."
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ChecklistProgress_default, {
          completed: completedItems,
          total: totalItems
        }),
        isUrgent && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Banner, {
              type: "caution",
              title: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left to respond`,
              description: showFullChecklist ? "Showing all evidence items." : "Showing only essential items to maximize your chances."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Link, {
              onPress: () => setShowFullChecklist(!showFullChecklist),
              children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                css: { font: "caption", color: "info" },
                children: showFullChecklist ? "Show essentials only" : "View full checklist"
              })
            })
          ]
        }),
        grouped.map(({ category, label, items: groupItems }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { stack: "y", gap: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
              css: { font: "caption", fontWeight: "bold", color: "secondary", textTransform: "uppercase" },
              children: label
            }),
            groupItems.map((item) => {
              var _a2, _b;
              return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ChecklistItem_default, {
                item,
                checked: !!checklistState[item.item],
                autoPopulated: isAutoPopulated(item, dispute),
                expandedSections: (_a2 = expandedSections.get(item.item)) != null ? _a2 : /* @__PURE__ */ new Set(),
                notes: (_b = notesState[item.item]) != null ? _b : "",
                onToggle: () => handleToggle(item.item),
                onSectionToggle: (section) => handleSectionToggle(item.item, section),
                onNotesChange: (value) => handleNotesChange(item.item, value)
              }, item.item);
            })
          ]
        }, category)),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
          css: { font: "caption", color: "secondary" },
          children: "Your progress and notes are saved automatically."
        })
      ]
    });
  };
  var EvidenceChecklist_default = EvidenceChecklist;

  // src/components/DisputeWorkflow.tsx
  var import_jsx_runtime10 = __require("react/jsx-runtime");
  var DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }) => {
    const [currentStep, setCurrentStep] = (0, import_react2.useState)("review");
    const [dispute, setDispute] = (0, import_react2.useState)(initialDispute);
    const [playbook, setPlaybook] = (0, import_react2.useState)(null);
    const [loading, setLoading] = (0, import_react2.useState)({
      dispute: false,
      playbook: false
    });
    const [errors, setErrors] = (0, import_react2.useState)({
      dispute: null,
      playbook: null
    });
    const contextRef = (0, import_react2.useRef)(context);
    contextRef.current = context;
    (0, import_react2.useEffect)(() => {
      if (!shown)
        return;
      const fetchData = () => __async(void 0, null, function* () {
        setLoading({ dispute: true, playbook: true });
        setErrors({ dispute: null, playbook: null });
        const shouldFetchPlaybook = !!initialDispute.reason_code;
        const [disputeResult, playbookResult] = yield Promise.allSettled([
          fetchBackend(`/api/disputes/${initialDispute.id}`, contextRef.current),
          shouldFetchPlaybook ? fetchBackend("/api/playbooks", contextRef.current, {
            network: initialDispute.network,
            reason_code: initialDispute.reason_code
          }) : Promise.reject(new ApiError("No reason code", 404))
        ]);
        if (disputeResult.status === "fulfilled") {
          setDispute(disputeResult.value.data);
        } else {
          const err = disputeResult.reason;
          setErrors((prev) => __spreadProps(__spreadValues({}, prev), {
            dispute: err instanceof ApiError ? err.message : "Failed to load dispute details."
          }));
        }
        setLoading((prev) => __spreadProps(__spreadValues({}, prev), { dispute: false }));
        if (playbookResult.status === "fulfilled") {
          setPlaybook(playbookResult.value.data);
        } else {
          const err = playbookResult.reason;
          if (!(err instanceof ApiError && err.status === 404)) {
            setErrors((prev) => __spreadProps(__spreadValues({}, prev), {
              playbook: err instanceof ApiError ? err.message : "Failed to load playbook."
            }));
          }
          setPlaybook(null);
        }
        setLoading((prev) => __spreadProps(__spreadValues({}, prev), { playbook: false }));
      });
      fetchData();
    }, [shown, initialDispute.id, initialDispute.network, initialDispute.reason_code]);
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === WIZARD_STEPS.length - 1;
    const handleNext = () => {
      if (!isLastStep) {
        setCurrentStep(WIZARD_STEPS[currentIndex + 1]);
      }
    };
    const handleBack = () => {
      if (!isFirstStep) {
        setCurrentStep(WIZARD_STEPS[currentIndex - 1]);
      }
    };
    const daysRemaining = getDaysRemaining(dispute.due_by);
    const isUrgent = daysRemaining < 5 && !isResolved(dispute.status);
    const renderReviewTab = () => {
      const isLoadingPlaybook = loading.playbook;
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
        css: { padding: "medium", stack: "y", gap: "medium" },
        children: [
          isUrgent && playbook && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(UrgencyBanner_default, {
            daysRemaining,
            essentials: playbook.urgency_essentials
          }),
          errors.dispute && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ErrorBanner_default, {
            message: errors.dispute
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DisputeOverview_default, {
            dispute,
            loading: loading.dispute
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Divider, {}),
          isLoadingPlaybook ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
            css: { alignX: "center", padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Spinner, {
                size: "medium"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Loading playbook..."
              })
            ]
          }) : errors.playbook ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ErrorBanner_default, {
            message: errors.playbook
          }) : playbook ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CoachHeader_default, {
                headline: playbook.coach_headline,
                summary: playbook.coach_summary,
                urgencyMode: isUrgent,
                daysRemaining
              }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(QuickActions_default, {
                playbook,
                urgencyMode: isUrgent
              }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(LearnMore_default, {
                issuerSummary: playbook.coach_issuer_summary,
                acquirerSummary: playbook.coach_acquirer_summary
              })
            ]
          }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
            type: "default",
            title: "No playbook available",
            description: "We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          })
        ]
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.FocusView, {
      title: `Dispute ${initialDispute.id.slice(0, 12)}...`,
      shown,
      setShown,
      confirmCloseMessages: {
        title: "Leave dispute workflow?",
        description: "Your progress on this step will not be saved.",
        cancelAction: "Stay",
        exitAction: "Leave"
      },
      primaryAction: isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Button, {
        type: "primary",
        onPress: () => setShown(false),
        children: "Submit (placeholder)"
      }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Button, {
        type: "primary",
        onPress: handleNext,
        children: [
          "Next: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]
        ]
      }),
      secondaryAction: isFirstStep ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Button, {
        onPress: () => setShown(false),
        children: "Cancel"
      }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Button, {
        onPress: handleBack,
        children: [
          "Back: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Box, {
        css: { padding: "medium" },
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Tabs, {
          fitted: true,
          size: "medium",
          selectedKey: currentStep,
          onSelectionChange: (key) => setCurrentStep(key),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.TabList, {
              children: WIZARD_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Tab, {
                id: step,
                children: WIZARD_STEP_LABELS[step]
              }, step))
            }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.TabPanel, {
                  id: "review",
                  children: renderReviewTab()
                }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.TabPanel, {
                  id: "evidence",
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(EvidenceChecklist_default, {
                    dispute,
                    playbook,
                    context: contextRef.current,
                    isUrgent,
                    daysRemaining
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.TabPanel, {
                  id: "narrative",
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
                    css: { padding: "medium", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
                        type: "default",
                        title: "Step 3: AI Narrative",
                        description: "Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "AI narrative generation and editing will be built in WIN-18 and WIN-19."
                      })
                    ]
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.TabPanel, {
                  id: "submit",
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
                    css: { padding: "medium", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
                        type: "caution",
                        title: "Step 4: Submit Evidence",
                        description: "Review everything one final time. Submission to Stripe is irrevocable."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "Final review and Stripe submission will be built in WIN-20."
                      })
                    ]
                  })
                })
              ]
            })
          ]
        })
      })
    });
  };
  var DisputeWorkflow_default = DisputeWorkflow;

  // src/views/PaymentDisputeView.tsx
  var import_jsx_runtime11 = __require("react/jsx-runtime");
  var PaymentDisputeView = (context) => {
    var _a;
    const { environment } = context;
    const paymentIntentId = (_a = environment == null ? void 0 : environment.objectContext) == null ? void 0 : _a.id;
    const [viewState, setViewState] = (0, import_react3.useState)("loading");
    const [dispute, setDispute] = (0, import_react3.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react3.useState)(false);
    const contextRef = (0, import_react3.useRef)(context);
    contextRef.current = context;
    const loadDispute = (0, import_react3.useCallback)(() => __async(void 0, null, function* () {
      if (!paymentIntentId) {
        setViewState("no_dispute");
        return;
      }
      setViewState("loading");
      try {
        const result = yield fetchBackend(
          `/api/disputes/by-payment-intent/${paymentIntentId}`,
          contextRef.current
        );
        setDispute(result.data);
        setViewState("ready");
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setViewState("no_dispute");
        } else {
          setViewState("error");
        }
      }
    }), [paymentIntentId]);
    (0, import_react3.useEffect)(() => {
      loadDispute();
    }, [loadDispute]);
    if (viewState === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Spinner, {
            size: "large"
          })
        })
      });
    }
    if (viewState === "no_dispute" || viewState === "error" || !dispute) {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
            css: { font: "caption", color: "secondary" },
            children: "No dispute on this payment."
          })
        })
      });
    }
    const statusBadge = getStatusBadge(dispute.status);
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.ContextView, {
      title: "WinBack",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: { padding: "medium", stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
              css: {
                stack: "x",
                gap: "small",
                distribute: "space-between",
                alignY: "center"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                  css: { font: "heading", fontWeight: "semibold" },
                  children: "Dispute"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Badge, {
                  type: statusBadge.type,
                  children: statusBadge.label
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
              css: { stack: "y", gap: "xsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Inline, {
                  css: { font: "body" },
                  children: [
                    dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                    " ",
                    dispute.reason_code
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: dispute.reason.replace(/_/g, " ")
                })
              ]
            }),
            (dispute.status === "needs_response" || dispute.status === "warning_needs_response") && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Button, {
              type: "primary",
              css: { width: "fill" },
              onPress: () => setShowWorkflow(true),
              children: "Open in WinBack"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DisputeWorkflow_default, {
          dispute,
          context,
          shown: showWorkflow,
          setShown: setShowWorkflow
        })
      ]
    });
  };
  var PaymentDisputeView_default = PaymentDisputeView;

  // src/views/DisputeListView.tsx
  var import_react4 = __require("react");
  var import_ui14 = __toESM(require_ui());

  // src/components/DisputeCard.tsx
  var import_ui12 = __toESM(require_ui());
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  function formatAmount2(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }
  var DisputeCard = ({ dispute, onSelect }) => {
    const statusBadge = getStatusBadge(dispute.status);
    const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Button, {
      type: "secondary",
      css: { width: "fill" },
      onPress: () => onSelect(dispute.id),
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
        css: {
          stack: "y",
          gap: "xsmall",
          width: "fill",
          padding: "small"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
            css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "body", fontWeight: "semibold" },
                children: formatAmount2(dispute.amount, dispute.currency)
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
                css: { stack: "x", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Badge, {
                    type: statusBadge.type,
                    children: statusBadge.label
                  }),
                  urgencyBadge && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Badge, {
                    type: urgencyBadge.type,
                    children: urgencyBadge.label
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
            css: { font: "caption" },
            children: dispute.customer_name || "Unknown customer"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
            css: { stack: "x", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Inline, {
                css: { font: "caption", color: "secondary" },
                children: [
                  dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                  " ",
                  dispute.reason_code
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Inline, {
                css: { font: "caption", color: "secondary" },
                children: [
                  dispute.id.slice(0, 12),
                  "..."
                ]
              })
            ]
          })
        ]
      })
    });
  };
  var DisputeCard_default = DisputeCard;

  // src/components/EmptyState.tsx
  var import_ui13 = __toESM(require_ui());
  var import_jsx_runtime13 = __require("react/jsx-runtime");
  var EmptyState = ({ title, description }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
      css: {
        padding: "xlarge",
        stack: "y",
        gap: "small",
        alignX: "center",
        alignY: "center"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Icon, {
          name: "info",
          size: "large"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
          css: { font: "heading", fontWeight: "semibold" },
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
          css: { font: "caption", color: "secondary" },
          children: description
        })
      ]
    });
  };
  var EmptyState_default = EmptyState;

  // src/views/DisputeListView.tsx
  var import_jsx_runtime14 = __require("react/jsx-runtime");
  var FILTER_OPTIONS = [
    { value: "all", label: "All disputes" },
    { value: "needs_response", label: "Needs response" },
    { value: "under_review", label: "Under review" },
    { value: "resolved", label: "Resolved" }
  ];
  function matchesFilter(dispute, filter) {
    switch (filter) {
      case "all":
        return true;
      case "needs_response":
        return dispute.status === "needs_response" || dispute.status === "warning_needs_response";
      case "under_review":
        return dispute.status === "under_review" || dispute.status === "warning_under_review";
      case "resolved":
        return isResolved(dispute.status);
      default:
        return true;
    }
  }
  function getCountText(count, filter) {
    const noun = count === 1 ? "dispute" : "disputes";
    switch (filter) {
      case "all":
        return `${count} ${noun}`;
      case "needs_response":
        return `${count} needing response`;
      case "under_review":
        return `${count} under review`;
      case "resolved":
        return `${count} resolved`;
      default:
        return `${count} ${noun}`;
    }
  }
  var DisputeListView = (context) => {
    var _a;
    const { environment, userContext } = context;
    const [viewState, setViewState] = (0, import_react4.useState)("loading");
    const [disputes, setDisputes] = (0, import_react4.useState)([]);
    const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
    const [statusFilter, setStatusFilter] = (0, import_react4.useState)("all");
    const [selectedDispute, setSelectedDispute] = (0, import_react4.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react4.useState)(false);
    const contextRef = (0, import_react4.useRef)(context);
    contextRef.current = context;
    const loadDisputes = (0, import_react4.useCallback)(() => __async(void 0, null, function* () {
      setViewState("loading");
      try {
        const result = yield fetchBackend("/api/disputes", contextRef.current);
        setDisputes(result.data);
        setViewState("ready");
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Failed to load disputes. Please try again.";
        setErrorMessage(message);
        setViewState("error");
      }
    }), []);
    (0, import_react4.useEffect)(() => {
      loadDisputes();
    }, [loadDisputes]);
    const handleSelectDispute = (dispute) => {
      setSelectedDispute(dispute);
      setShowWorkflow(true);
    };
    const handleCloseWorkflow = (shown) => {
      setShowWorkflow(shown);
      if (!shown)
        setSelectedDispute(null);
    };
    const sortedDisputes = [...disputes].sort(
      (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime()
    );
    const filteredDisputes = sortedDisputes.filter((d) => matchesFilter(d, statusFilter));
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.ContextView, {
      title: "WinBack",
      description: "Guided dispute resolution",
      children: [
        viewState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
          css: {
            padding: "xlarge",
            alignX: "center",
            alignY: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Spinner, {
              size: "large"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Loading disputes..."
            })
          ]
        }),
        viewState === "error" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ErrorBanner_default, {
          message: errorMessage
        }),
        viewState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Tabs, {
          fitted: true,
          size: "medium",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.TabList, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Tab, {
                  id: "disputes",
                  children: "Disputes"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Tab, {
                  id: "insights",
                  children: "Insights"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.TabPanel, {
                  id: "disputes",
                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Box, {
                    css: { padding: "small", stack: "y", gap: "small" },
                    children: disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(EmptyState_default, {
                      title: "No disputes yet",
                      description: "When a dispute comes in, we'll walk you through exactly what to do."
                    }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Select, {
                          label: "Filter",
                          hiddenElements: ["label"],
                          value: statusFilter,
                          onChange: (e) => setStatusFilter(e.target.value),
                          children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("option", {
                            value: opt.value,
                            children: opt.label
                          }, opt.value))
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Box, {
                          css: { paddingTop: "small", paddingBottom: "small" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: getCountText(filteredDisputes.length, statusFilter)
                          })
                        }),
                        filteredDisputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Box, {
                          css: { padding: "medium", alignX: "center" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: [
                              "No ",
                              (_a = FILTER_OPTIONS.find((o) => o.value === statusFilter)) == null ? void 0 : _a.label.toLowerCase(),
                              " disputes."
                            ]
                          })
                        }) : filteredDisputes.map((dispute) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DisputeCard_default, {
                          dispute,
                          onSelect: () => handleSelectDispute(dispute)
                        }, dispute.id))
                      ]
                    })
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.TabPanel, {
                  id: "insights",
                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
                    css: { padding: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Banner, {
                        type: "default",
                        title: "Insights",
                        description: "Win rate analytics and dispute patterns will appear here."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "Coming in WIN-22 and WIN-23."
                      })
                    ]
                  })
                })
              ]
            })
          ]
        }),
        selectedDispute && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DisputeWorkflow_default, {
          dispute: selectedDispute,
          context,
          shown: showWorkflow,
          setShown: handleCloseWorkflow
        })
      ]
    });
  };
  var DisputeListView_default = DisputeListView;

  // src/views/AppSettings.tsx
  var import_ui15 = __toESM(require_ui());
  var import_jsx_runtime15 = __require("react/jsx-runtime");
  var AppSettings = ({ environment, userContext }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.SettingsView, {
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
        css: { stack: "y", gap: "medium", padding: "medium" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Subscription"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Subscription management will be available here. Coming in WIN-24."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Account"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Connected Stripe account information will appear here."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "About WinBack"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "body" },
                children: "Version 0.0.1"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Guided dispute resolution for Stripe merchants. Built by JKB Tech."
              })
            ]
          })
        ]
      })
    });
  };
  var AppSettings_default = AppSettings;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-04-05 16:48:29.195886 -0700 PDT m=+0.018368126";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "icon": "",
    "id": "com.jkbtech.winback",
    "name": "WinBack",
    "permissions": [
      {
        "permission": "dispute_read",
        "purpose": "Read dispute details to guide merchants through the response process"
      },
      {
        "permission": "dispute_write",
        "purpose": "Submit evidence and responses on behalf of the merchant"
      },
      {
        "permission": "charge_read",
        "purpose": "Read charge details associated with disputes"
      },
      {
        "permission": "customer_read",
        "purpose": "Read customer information for dispute context"
      },
      {
        "permission": "file_read",
        "purpose": "Read uploaded evidence files"
      },
      {
        "permission": "file_write",
        "purpose": "Upload evidence files for dispute responses"
      },
      {
        "permission": "payment_intent_read",
        "purpose": "Read payment intent details for dispute context"
      }
    ],
    "post_install_action": {
      "type": "settings"
    },
    "ui_extension": {
      "content_security_policy": {
        "connect-src": [
          "https://winbackpay.com/api/",
          "http://localhost:3000/api/"
        ],
        "purpose": ""
      },
      "views": [
        {
          "component": "PaymentDisputeView",
          "viewport": "stripe.dashboard.payment.detail"
        },
        {
          "component": "DisputeListView",
          "viewport": "stripe.dashboard.drawer.default"
        },
        {
          "component": "AppSettings",
          "viewport": "settings"
        }
      ]
    },
    "version": "0.0.1"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9VcmdlbmN5QmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9ldmlkZW5jZS9FdmlkZW5jZUNoZWNrbGlzdC50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0UHJvZ3Jlc3MudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0NoZWNrbGlzdEl0ZW0udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeCIsICIuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU0RLX1ZFUlNJT04gPSB2b2lkIDA7XG5leHBvcnRzLlNES19WRVJTSU9OID0gJzkuMS4wJztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFibGVIZWFkZXJDZWxsID0gZXhwb3J0cy5UYWJsZUhlYWQgPSBleHBvcnRzLlRhYmxlRm9vdGVyID0gZXhwb3J0cy5UYWJsZUNlbGwgPSBleHBvcnRzLlRhYmxlQm9keSA9IGV4cG9ydHMuVGFiID0gZXhwb3J0cy5UYWJQYW5lbHMgPSBleHBvcnRzLlRhYlBhbmVsID0gZXhwb3J0cy5UYWJMaXN0ID0gZXhwb3J0cy5Td2l0Y2ggPSBleHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGV4cG9ydHMuU3Bpbm5lciA9IGV4cG9ydHMuU3BhcmtsaW5lID0gZXhwb3J0cy5TaWduSW5WaWV3ID0gZXhwb3J0cy5TZXR0aW5nc1ZpZXcgPSBleHBvcnRzLlNlbGVjdCA9IGV4cG9ydHMuUmFkaW8gPSBleHBvcnRzLlByb3BlcnR5TGlzdCA9IGV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBleHBvcnRzLk1lbnUgPSBleHBvcnRzLk1lbnVJdGVtID0gZXhwb3J0cy5NZW51R3JvdXAgPSBleHBvcnRzLkxpc3QgPSBleHBvcnRzLkxpc3RJdGVtID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5MaW5lQ2hhcnQgPSBleHBvcnRzLklubGluZSA9IGV4cG9ydHMuSW1nID0gZXhwb3J0cy5JY29uID0gZXhwb3J0cy5Gb3JtRmllbGRHcm91cCA9IGV4cG9ydHMuRm9jdXNWaWV3ID0gZXhwb3J0cy5EaXZpZGVyID0gZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBleHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBleHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBleHBvcnRzLkRhdGVGaWVsZCA9IGV4cG9ydHMuQ29udGV4dFZpZXcgPSBleHBvcnRzLkNoaXAgPSBleHBvcnRzLkNoaXBMaXN0ID0gZXhwb3J0cy5DaGVja2JveCA9IGV4cG9ydHMuQnV0dG9uID0gZXhwb3J0cy5CdXR0b25Hcm91cCA9IGV4cG9ydHMuQm94ID0gZXhwb3J0cy5CYXJDaGFydCA9IGV4cG9ydHMuQmFubmVyID0gZXhwb3J0cy5CYWRnZSA9IGV4cG9ydHMuQWNjb3JkaW9uID0gZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gdm9pZCAwO1xuZXhwb3J0cy5Ub29sdGlwID0gZXhwb3J0cy5UZXh0RmllbGQgPSBleHBvcnRzLlRleHRBcmVhID0gZXhwb3J0cy5UYXNrTGlzdCA9IGV4cG9ydHMuVGFza0xpc3RJdGVtID0gZXhwb3J0cy5UYWJzID0gZXhwb3J0cy5UYWJsZVJvdyA9IGV4cG9ydHMuVGFibGUgPSB2b2lkIDA7XG5jb25zdCBqc3hfcnVudGltZV8xID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJAcmVtb3RlLXVpL3JlYWN0XCIpO1xuY29uc3QgdmVyc2lvbl8xID0gcmVxdWlyZShcIi4uL3ZlcnNpb25cIik7XG5jb25zdCB3aXRoU2RrUHJvcHMgPSAoQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgV2l0aFNka1Byb3BzID0gKHByb3BzKSA9PiAoKDAsIGpzeF9ydW50aW1lXzEuanN4KShDb21wb25lbnQsIHsgLi4ucHJvcHMsIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSwgc2RrVmVyc2lvbjogdmVyc2lvbl8xLlNES19WRVJTSU9OLCBzY2hlbWFWZXJzaW9uOiBcInY5XCIgfSkpO1xuICAgIFdpdGhTZGtQcm9wcy53cmFwcGVkQ29tcG9uZW50TmFtZSA9IHdyYXBwZWRDb21wb25lbnROYW1lO1xuICAgIHJldHVybiBXaXRoU2RrUHJvcHM7XG59O1xuY29uc3QgZGVmaW5lQ29tcG9uZW50ID0gKG5hbWUsIGZyYWdtZW50UHJvcHMsIHdyYXBXaXRoU2RrUHJvcHMpID0+IHtcbiAgICBjb25zdCByZW1vdGVDb21wb25lbnQgPSAoMCwgcmVhY3RfMS5jcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCkobmFtZSwge1xuICAgICAgICBmcmFnbWVudFByb3BzLFxuICAgIH0pO1xuICAgIGlmICghd3JhcFdpdGhTZGtQcm9wcykge1xuICAgICAgICByZXR1cm4gcmVtb3RlQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aFNka1Byb3BzKHJlbW90ZUNvbXBvbmVudCk7XG59O1xuZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb25JdGVtJywgWyd0aXRsZScsICdhY3Rpb25zJywgJ21lZGlhJywgJ3N1YnRpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5BY2NvcmRpb24gPSBkZWZpbmVDb21wb25lbnQoJ0FjY29yZGlvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFkZ2UgPSBkZWZpbmVDb21wb25lbnQoJ0JhZGdlJywgW10sIHRydWUpO1xuZXhwb3J0cy5CYW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ0Jhbm5lcicsIFsnYWN0aW9ucycsICdkZXNjcmlwdGlvbicsICd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQmFyQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0JhckNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5Cb3ggPSBkZWZpbmVDb21wb25lbnQoJ0JveCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0J1dHRvbkdyb3VwJywgWydtZW51VHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoZWNrYm94ID0gZGVmaW5lQ29tcG9uZW50KCdDaGVja2JveCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXBMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdDaGlwTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ2hpcCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ29udGV4dFZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0NvbnRleHRWaWV3JywgWydhY3Rpb25zJywgJ2Jhbm5lcicsICdmb290ZXJDb250ZW50JywgJ3ByaW1hcnlBY3Rpb24nLCAnc2Vjb25kYXJ5QWN0aW9uJ10sIHRydWUpO1xuZXhwb3J0cy5EYXRlRmllbGQgPSBkZWZpbmVDb21wb25lbnQoJ0RhdGVGaWVsZCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VNb2R1bGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VUYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZVRhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EaXZpZGVyID0gZGVmaW5lQ29tcG9uZW50KCdEaXZpZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Gb2N1c1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0ZvY3VzVmlldycsIFsnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0Zvcm1GaWVsZEdyb3VwJywgW10sIHRydWUpO1xuZXhwb3J0cy5JY29uID0gZGVmaW5lQ29tcG9uZW50KCdJY29uJywgW10sIHRydWUpO1xuZXhwb3J0cy5JbWcgPSBkZWZpbmVDb21wb25lbnQoJ0ltZycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW5saW5lID0gZGVmaW5lQ29tcG9uZW50KCdJbmxpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpbmVDaGFydCA9IGRlZmluZUNvbXBvbmVudCgnTGluZUNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5rID0gZGVmaW5lQ29tcG9uZW50KCdMaW5rJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnTGlzdEl0ZW0nLCBbJ2ljb24nLCAnaW1hZ2UnLCAnc2Vjb25kYXJ5VGl0bGUnLCAndGl0bGUnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVHcm91cCA9IGRlZmluZUNvbXBvbmVudCgnTWVudUdyb3VwJywgWyd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuTWVudUl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ01lbnVJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51ID0gZGVmaW5lQ29tcG9uZW50KCdNZW51JywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuZXhwb3J0cy5PbmJvYXJkaW5nVmlldyA9IGRlZmluZUNvbXBvbmVudCgnT25ib2FyZGluZ1ZpZXcnLCBbJ2Vycm9yJ10sIHRydWUpO1xuZXhwb3J0cy5QbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdQbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5Qcm9wZXJ0eUxpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3RJdGVtJywgWydsYWJlbCcsICd2YWx1ZSddLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlJhZGlvID0gZGVmaW5lQ29tcG9uZW50KCdSYWRpbycsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNlbGVjdCA9IGRlZmluZUNvbXBvbmVudCgnU2VsZWN0JywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTZXR0aW5nc1ZpZXcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNpZ25JblZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1NpZ25JblZpZXcnLCBbJ2Rlc2NyaXB0aW9uQWN0aW9uQ29udGVudHMnLCAnZm9vdGVyQ29udGVudCddLCB0cnVlKTtcbmV4cG9ydHMuU3BhcmtsaW5lID0gZGVmaW5lQ29tcG9uZW50KCdTcGFya2xpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNwaW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ1NwaW5uZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGRlZmluZUNvbXBvbmVudCgnU3RyaXBlRmlsZVVwbG9hZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Td2l0Y2ggPSBkZWZpbmVDb21wb25lbnQoJ1N3aXRjaCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1RhYkxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiUGFuZWxzID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbHMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYiA9IGRlZmluZUNvbXBvbmVudCgnVGFiJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUJvZHkgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlQm9keScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVDZWxsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUNlbGwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlRm9vdGVyID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUZvb3RlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVIZWFkID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUhlYWQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkZXJDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnVGFibGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlUm93ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZVJvdycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFicyA9IGRlZmluZUNvbXBvbmVudCgnVGFicycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFza0xpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdEl0ZW0nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEFyZWEgPSBkZWZpbmVDb21wb25lbnQoJ1RleHRBcmVhJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0RmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5Ub29sdGlwID0gZGVmaW5lQ29tcG9uZW50KCdUb29sdGlwJywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogUHJpdmF0ZSEgVGhpcyBhbGxvd3MgdGhlIHNoYXJlZCBlbmRwb2ludCB0byBiZSBpbnRpYWxpemVkXG4gKiBzbyB0aGF0IHRoZSBTREsgY2FuIGNvbW11bmljYXRlIHdpdGggdGhlIERhc2hib2FyZC5cbiAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRIb3N0RW5kcG9pbnQgPSB2b2lkIDA7XG5jb25zdCBpbnZhcmlhbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaW52YXJpYW50XCIpKTtcbmNvbnN0IGdldEhvc3RFbmRwb2ludCA9ICgpID0+IHtcbiAgICAvLyBUaGlzIGlzIGVuZHBvaW50IGlzIGNyZWF0ZWQgZnJvbSB0aGUgTWVzc2FnZVBvcnQgdHJhbnNmZXJyZWQgZnJvbSB0aGUgaG9zdCBlbnZcbiAgICAvLyBhcyBhIHBhcnQgb2YgdGhlIGBpbml0X2V4dGVuc2lvbmAgbWVzc2FnZS5cbiAgICBjb25zdCBob3N0RW5kcG9pbnQgPSBnbG9iYWxUaGlzLl9fU3RyaXBlRXh0RXhwb3J0cz8uZW5kcG9pbnQ7XG4gICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKGhvc3RFbmRwb2ludCwgJ2hvc3RFbmRwb2ludCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQnKTtcbiAgICByZXR1cm4gaG9zdEVuZHBvaW50O1xufTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gZ2V0SG9zdEVuZHBvaW50O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSB2b2lkIDA7XG5jb25zdCBfZW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuLi9fZW5kcG9pbnRcIik7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpXG4gICAgLmNhbGwuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KClcbiAgICAudGhlbigoc3VwcG9ydGVkKSA9PiBzdXBwb3J0ZWQpXG4gICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hBcHBFbWJlZGRlZEtleSgpO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGFwcCBlbWJlZGRlZCBrZXknKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaUtleTtcbn07XG5leHBvcnRzLmZldGNoQXBwRW1iZWRkZWRLZXkgPSBmZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gdm9pZCAwO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vZmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWUgPSBhc3luYyAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgZmV0Y2hBcHBFbWJlZGRlZEtleV8xLmZldGNoQXBwRW1iZWRkZWRLZXkpKCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGluaXQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgY29uc3Qgc2VyaWFsaXphYmxlUmVzcG9uc2UgPSB7XG4gICAgICAgIGpzb246IHVuZGVmaW5lZCxcbiAgICAgICAgYXJyYXlCdWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb2s6IHJlc3BvbnNlLm9rLFxuICAgICAgICByZWRpcmVjdGVkOiByZXNwb25zZS5yZWRpcmVjdGVkLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgdHlwZTogcmVzcG9uc2UudHlwZSxcbiAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgfTtcbiAgICBzd2l0Y2ggKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkge1xuICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc2VyaWFsaXphYmxlUmVzcG9uc2U7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gZmV0Y2hWaWFGcmFtZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFIb3N0ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0ID0gYXN5bmMgKGVuY29kZWRVcmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5jb2RlZFVybCk7XG4gICAgcmV0dXJuICgwLCBfZW5kcG9pbnRfMS5nZXRIb3N0RW5kcG9pbnQpKCkuY2FsbC5zdHJpcGVBcGlGZXRjaCh1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCBvcHRpb25zKTtcbn07XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IGZldGNoVmlhSG9zdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWVfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhRnJhbWVcIik7XG5jb25zdCBmZXRjaFZpYUhvc3RfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhSG9zdFwiKTtcbmxldCBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gbnVsbDtcbmNvbnN0IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCkge1xuICAgICAgICBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gKGF3YWl0ICgwLCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMS5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkpKCkpXG4gICAgICAgICAgICA/IGZldGNoVmlhRnJhbWVfMS5mZXRjaFZpYUZyYW1lXG4gICAgICAgICAgICA6IGZldGNoVmlhSG9zdF8xLmZldGNoVmlhSG9zdDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkU3RyaXBlQXBpRmV0Y2g7XG59O1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHZvaWQgMDtcbnZhciBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDsgfSB9KTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IHN0cmlwZUFwaUZldGNoID0gYXN5bmMgKHBhdGgsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcmVmZXJyZWRGZXRjaE1ldGhvZCA9IGF3YWl0ICgwLCBhcGlfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCkoKTtcbiAgICByZXR1cm4gcHJlZmVycmVkRmV0Y2hNZXRob2QocGF0aCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5zdHJpcGVBcGlGZXRjaCA9IHN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSBleHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBleHBvcnRzLlNUUklQRV9BUElfS0VZID0gZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IHZvaWQgMDtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBIdHRwQ2xpZW50IHRoYXQgY2FuIGJlIHBsdWdnZWQgaW50byBzdHJpcGUtbm9kZVxuICogdGhhdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHVzZSBzdHJpcGUtbm9kZSBpbiBleHRlbnNpb25zIGlmIHRoZSBEYXNoYm9hcmRcbiAqIHByb3ZpZGVzIGEgYHN0cmlwZUFwaUZldGNoYCBmdW5jdGlvbiB0aGF0IHdpbGwgcmVsYXkgQVBJIGNhbGxzIHRocm91Z2ggdGhlXG4gKiBEYXNoYm9hcmQgYW5kIHBpZ2d5IGJhY2sgb24gdGhlIHVzZXIncyBEYXNoYm9hcmQgc2Vzc2lvbi5cbiAqL1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBhcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vYXBpRmV0Y2hcIik7XG5jb25zdCBtYXRjaGVzU3RyaXBlS2V5ID0gL1twc11rXyh0ZXN0fGxpdmUpX1tBLVphLXowLTldKy87XG5jbGFzcyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwKSB7XG4gICAgICAgIHRoaXMuX3Jlc3AgPSByZXNwO1xuICAgIH1cbiAgICBnZXRIZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5oZWFkZXJzO1xuICAgIH1cbiAgICBnZXRTdGF0dXNDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5zdGF0dXM7XG4gICAgfVxuICAgIGdldFJhd1Jlc3BvbnNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICB0b1N0cmVhbSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJlYW1zIGhhdmUgbm90IGJlZW4gaW1wbGVtZW50ZWQgaW4gdGhlIFN0cmlwZSBIVFRQIGNsaWVudCcpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgeyBqc29uIH0gPSB0aGlzLl9yZXNwO1xuICAgICAgICBpZiAoanNvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdSZXNwb25zZSBib2R5IHVuZGVmaW5lZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdHJpcGVBcHBzSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoZmV0Y2gpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBnZXRDbGllbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3N0cmlwZS11aS1leHRlbnNpb24nO1xuICAgIH1cbiAgICBhc3luYyBtYWtlUmVxdWVzdChob3N0LCBwb3J0LCBwYXRoLCBtZXRob2QsIGhlYWRlcnMsIHJlcXVlc3REYXRhLCBwcm90b2NvbCwgX3RpbWVvdXQpIHtcbiAgICAgICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKHByb3RvY29sID09PSAnaHR0cHMnLCAnTXVzdCB1c2UgaHR0cHMgY29ubmVjdGlvbnMgaW4gVUkgZXh0ZW5zaW9ucycpO1xuICAgICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAocmVxdWVzdERhdGEpIHtcbiAgICAgICAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gcmVxdWVzdERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGhlYWRlcnMuQXV0aG9yaXphdGlvbjtcbiAgICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgbWF0Y2hlc1N0cmlwZUtleS50ZXN0KGF1dGhIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgYWN0dWFsIHN0cmlwZSBrZXlzIHdoZW4gdXNpbmcgdGhlIFN0cmlwZSBKUyBBUEkgY2xpZW50IHdpdGggVUkgZXh0ZXNpb25zLlxcblxcbiBJbnN0ZWFkLCB1c2UgYFNUUklQRV9BUElfS0VZYCBmcm9tIGBAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvaHR0cF9jbGllbnRgIGFzIGEgcGxhY2Vob2xkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBgJHtwcm90b2NvbH06Ly8ke2hvc3R9YCk7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9mZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKTtcbiAgICAgICAgLy8gVE9ETzogQWRkIHN1cHBvcnQgZm9yIHRpbWVvdXRzLlxuICAgICAgICByZXR1cm4gbmV3IFN0cmlwZUFwcHNIdHRwUmVzcG9uc2UocmVzcCk7XG4gICAgfVxufVxuZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IFN0cmlwZUFwcHNIdHRwQ2xpZW50O1xuLy8gRE8gTk9UIGNoYW5nZSB0aGlzIHN0cmluZyB3aXRob3V0IGEgZGVwcmVjYXRpb24gcGxhbi4gVGhlIHJ1bnRpbWUgY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoaXNcbi8vIGV4YWN0IHN0cmluZyBpcyBwYXNzZWQsIG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuLy8gU2VlOiBtYW5hZ2UvZnJvbnRlbmQvc3JjL3RhaWxvci9leHRlbnNpb25zL2hvc3QvYXBpX2ZldGNoLmpzXG5leHBvcnRzLlNUUklQRV9BUElfS0VZID0gJ0RPX05PVF9QQVNTX0FfUkVBTF9BUElfS0VZJztcbmNvbnN0IGNyZWF0ZUh0dHBDbGllbnQgPSAoKSA9PiBuZXcgU3RyaXBlQXBwc0h0dHBDbGllbnQoYXBpRmV0Y2hfMS5zdHJpcGVBcGlGZXRjaCk7XG5leHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBjcmVhdGVIdHRwQ2xpZW50O1xuZXhwb3J0cy5BVVRIT1JJWkFUSU9OX0hFQURFUiA9ICdBdXRob3JpemF0aW9uJztcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGBCZWFyZXIgJHtleHBvcnRzLlNUUklQRV9BUElfS0VZfWA7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSB2b2lkIDA7XG5jb25zdCBodHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi4vaHR0cENsaWVudFwiKTtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoeyBob3N0LCBwb3J0IH0pID0+IGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cHM6Ly8ke2hvc3R9OiR7cG9ydH0vdjEvYXBwcy9hcHBfZW1iZWRkZWRfYmFja2VuZF9zaWduYXR1cmVgKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncGF5bG9hZCcsIEpTT04uc3RyaW5naWZ5KHsgLi4ucGF5bG9hZCB9KSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2luY2x1ZGVfb25seVtdJywgJ3NpZ25hdHVyZScpO1xuICAgIGNvbnN0IGNsaWVudCA9ICgwLCBodHRwQ2xpZW50XzEuY3JlYXRlSHR0cENsaWVudCkoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGNsaWVudC5tYWtlUmVxdWVzdChob3N0LCBwb3J0LCB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCAnR0VUJywge30sIG51bGwsICdodHRwcycpO1xuICAgIHJldHVybiByZXNwb25zZVxuICAgICAgICAudGhlbigocikgPT4gci50b0pTT04oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuc2lnbmF0dXJlKTtcbn07XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRDb25uZWN0aW9uU2V0dGluZ3MgPSBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHZvaWQgMDtcbmNvbnN0IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgaG9zdDogJ2FwaS5zdHJpcGUuY29tJyxcbiAgICBwb3J0OiA0NDMsXG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0gZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncztcbmNvbnN0IHNldENvbm5lY3Rpb25TZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIGV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgICAgICAuLi5kZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzLFxuICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gc2V0Q29ubmVjdGlvblNldHRpbmdzO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IHZvaWQgMDtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMSA9IHJlcXVpcmUoXCIuL3NpZ25hdHVyZS9jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9hcGkvc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XCIpO1xuY29uc3QgY29ubmVjdGlvblNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzXCIpO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9fZW5kcG9pbnRcIik7XG5jb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGFzeW5jIChhZGRpdGlvbmFsUGF5bG9hZCkgPT4ge1xuICAgIGlmIChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKSB7XG4gICAgICAgIGNvbnN0IGZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoMCwgY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseV8xLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkpKGNvbm5lY3Rpb25TZXR0aW5nc18xLmNvbm5lY3Rpb25TZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hTdHJpcGVTaWduYXR1cmUoYWRkaXRpb25hbFBheWxvYWQpO1xuICAgIH1cbn07XG5leHBvcnRzLmZldGNoU3RyaXBlU2lnbmF0dXJlID0gZmV0Y2hTdHJpcGVTaWduYXR1cmU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBUaGlzIGZpbGUgbW92ZWQgdG8gdXRpbHM7IHJlLWV4cG9ydGVkIHRvIG5vdCBicmVhayBpbXBvcnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaWduYXR1cmVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NpZ25hdHVyZVwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpZ25hdHVyZV8xLmZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIi8vIEFVVE9HRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG5pbXBvcnQgUGF5bWVudERpc3B1dGVWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcnO2ltcG9ydCBEaXNwdXRlTGlzdFZpZXcgZnJvbSAnLi4vc3JjL3ZpZXdzL0Rpc3B1dGVMaXN0Vmlldyc7aW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4uL3NyYy92aWV3cy9BcHBTZXR0aW5ncyc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjYtMDQtMDUgMTY6NDg6MjkuMTk1ODg2IC0wNzAwIFBEVCBtPSswLjAxODM2ODEyNic7XG5cbmV4cG9ydCB7IFxuICBQYXltZW50RGlzcHV0ZVZpZXcsXG5cbiAgRGlzcHV0ZUxpc3RWaWV3LFxuXG4gIEFwcFNldHRpbmdzXG4gfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL3N0cmlwZS5jb20vc3RyaXBlLWFwcC5zY2hlbWEuanNvblwiLFxuICBcImljb25cIjogXCJcIixcbiAgXCJpZFwiOiBcImNvbS5qa2J0ZWNoLndpbmJhY2tcIixcbiAgXCJuYW1lXCI6IFwiV2luQmFja1wiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZGlzcHV0ZSBkZXRhaWxzIHRvIGd1aWRlIG1lcmNoYW50cyB0aHJvdWdoIHRoZSByZXNwb25zZSBwcm9jZXNzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImRpc3B1dGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN1Ym1pdCBldmlkZW5jZSBhbmQgcmVzcG9uc2VzIG9uIGJlaGFsZiBvZiB0aGUgbWVyY2hhbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiY2hhcmdlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY2hhcmdlIGRldGFpbHMgYXNzb2NpYXRlZCB3aXRoIGRpc3B1dGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImN1c3RvbWVyX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY3VzdG9tZXIgaW5mb3JtYXRpb24gZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJmaWxlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgdXBsb2FkZWQgZXZpZGVuY2UgZmlsZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV93cml0ZVwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiVXBsb2FkIGV2aWRlbmNlIGZpbGVzIGZvciBkaXNwdXRlIHJlc3BvbnNlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X2ludGVudF9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHBheW1lbnQgaW50ZW50IGRldGFpbHMgZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfVxuICBdLFxuICBcInBvc3RfaW5zdGFsbF9hY3Rpb25cIjoge1xuICAgIFwidHlwZVwiOiBcInNldHRpbmdzXCJcbiAgfSxcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93aW5iYWNrcGF5LmNvbS9hcGkvXCIsXG4gICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9cIlxuICAgICAgXSxcbiAgICAgIFwicHVycG9zZVwiOiBcIlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJQYXltZW50RGlzcHV0ZVZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQucGF5bWVudC5kZXRhaWxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJEaXNwdXRlTGlzdFZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBTZXR0aW5nc1wiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic2V0dGluZ3NcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxufTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCYWRnZSxcbiAgQnV0dG9uLFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbnR5cGUgVmlld1N0YXRlID0gJ2xvYWRpbmcnIHwgJ25vX2Rpc3B1dGUnIHwgJ2Vycm9yJyB8ICdyZWFkeSc7XG5cbmNvbnN0IFBheW1lbnREaXNwdXRlVmlldyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgeyBlbnZpcm9ubWVudCB9ID0gY29udGV4dDtcbiAgY29uc3QgcGF5bWVudEludGVudElkID0gZW52aXJvbm1lbnQ/Lm9iamVjdENvbnRleHQ/LmlkO1xuXG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBheW1lbnRJbnRlbnRJZCkge1xuICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGUgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzL2J5LXBheW1lbnQtaW50ZW50LyR7cGF5bWVudEludGVudElkfWAsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICk7XG4gICAgICBzZXREaXNwdXRlKHJlc3VsdC5kYXRhKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgncmVhZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbcGF5bWVudEludGVudElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGlzcHV0ZSgpO1xuICB9LCBbbG9hZERpc3B1dGVdKTtcblxuICBpZiAodmlld1N0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdub19kaXNwdXRlJyB8fCB2aWV3U3RhdGUgPT09ICdlcnJvcicgfHwgIWRpc3B1dGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIE5vIGRpc3B1dGUgb24gdGhpcyBwYXltZW50LlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXR1c0JhZGdlID0gZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBEaXNwdXRlXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgICBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9eycgJ31cbiAgICAgICAgICAgIHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUucmVhc29uLnJlcGxhY2UoL18vZywgJyAnKX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgeyhkaXNwdXRlLnN0YXR1cyA9PT0gJ25lZWRzX3Jlc3BvbnNlJyB8fFxuICAgICAgICAgIGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZScpICYmIChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gc2V0U2hvd1dvcmtmbG93KHRydWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE9wZW4gaW4gV2luQmFja1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxEaXNwdXRlV29ya2Zsb3dcbiAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgc2V0U2hvd249e3NldFNob3dXb3JrZmxvd31cbiAgICAgIC8+XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnREaXNwdXRlVmlldztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQmFubmVyLFxuICBEaXZpZGVyLFxuICBGb2N1c1ZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbiAgVGFicyxcbiAgVGFiLFxuICBUYWJMaXN0LFxuICBUYWJQYW5lbHMsXG4gIFRhYlBhbmVsLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IFdpemFyZFN0ZXAsIERpc3B1dGUsIFBsYXlib29rRGF0YSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBXSVpBUkRfU1RFUFMsIFdJWkFSRF9TVEVQX0xBQkVMUyB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgeyBnZXREYXlzUmVtYWluaW5nLCBpc1Jlc29sdmVkIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcbmltcG9ydCBFcnJvckJhbm5lciBmcm9tICcuL0Vycm9yQmFubmVyJztcbmltcG9ydCBEaXNwdXRlT3ZlcnZpZXcgZnJvbSAnLi9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3JztcbmltcG9ydCBDb2FjaEhlYWRlciBmcm9tICcuL3Jldmlldy9Db2FjaEhlYWRlcic7XG5pbXBvcnQgUXVpY2tBY3Rpb25zIGZyb20gJy4vcmV2aWV3L1F1aWNrQWN0aW9ucyc7XG5pbXBvcnQgTGVhcm5Nb3JlIGZyb20gJy4vcmV2aWV3L0xlYXJuTW9yZSc7XG5pbXBvcnQgVXJnZW5jeUJhbm5lciBmcm9tICcuL3Jldmlldy9VcmdlbmN5QmFubmVyJztcbmltcG9ydCBFdmlkZW5jZUNoZWNrbGlzdCBmcm9tICcuL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0JztcblxuaW50ZXJmYWNlIERpc3B1dGVXb3JrZmxvd1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBzaG93bjogYm9vbGVhbjtcbiAgc2V0U2hvd246IChzaG93bjogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuY29uc3QgRGlzcHV0ZVdvcmtmbG93ID0gKHsgZGlzcHV0ZTogaW5pdGlhbERpc3B1dGUsIGNvbnRleHQsIHNob3duLCBzZXRTaG93biB9OiBEaXNwdXRlV29ya2Zsb3dQcm9wcykgPT4ge1xuICBjb25zdCBbY3VycmVudFN0ZXAsIHNldEN1cnJlbnRTdGVwXSA9IHVzZVN0YXRlPFdpemFyZFN0ZXA+KCdyZXZpZXcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZT4oaW5pdGlhbERpc3B1dGUpO1xuICBjb25zdCBbcGxheWJvb2ssIHNldFBsYXlib29rXSA9IHVzZVN0YXRlPFBsYXlib29rRGF0YSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTx7IGRpc3B1dGU6IGJvb2xlYW47IHBsYXlib29rOiBib29sZWFuIH0+KHtcbiAgICBkaXNwdXRlOiBmYWxzZSxcbiAgICBwbGF5Ym9vazogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBzdHJpbmcgfCBudWxsOyBwbGF5Ym9vazogc3RyaW5nIHwgbnVsbCB9Pih7XG4gICAgZGlzcHV0ZTogbnVsbCxcbiAgICBwbGF5Ym9vazogbnVsbCxcbiAgfSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3duKSByZXR1cm47XG5cbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHsgZGlzcHV0ZTogdHJ1ZSwgcGxheWJvb2s6IHRydWUgfSk7XG4gICAgICBzZXRFcnJvcnMoeyBkaXNwdXRlOiBudWxsLCBwbGF5Ym9vazogbnVsbCB9KTtcblxuICAgICAgLy8gRmV0Y2ggZW5yaWNoZWQgZGlzcHV0ZSBhbmQgcGxheWJvb2sgaW4gcGFyYWxsZWxcbiAgICAgIC8vIFNraXAgcGxheWJvb2sgZmV0Y2ggaWYgcmVhc29uX2NvZGUgaXMgZW1wdHkgKHRlc3QgZGlzcHV0ZXMsIHVua25vd24gY29kZXMpXG4gICAgICBjb25zdCBzaG91bGRGZXRjaFBsYXlib29rID0gISFpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZTtcbiAgICAgIGNvbnN0IFtkaXNwdXRlUmVzdWx0LCBwbGF5Ym9va1Jlc3VsdF0gPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlIH0+KGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50KSxcbiAgICAgICAgc2hvdWxkRmV0Y2hQbGF5Ym9va1xuICAgICAgICAgID8gZmV0Y2hCYWNrZW5kPHsgZGF0YTogUGxheWJvb2tEYXRhIH0+KCcvYXBpL3BsYXlib29rcycsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICAgICAgICBuZXR3b3JrOiBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLFxuICAgICAgICAgICAgICByZWFzb25fY29kZTogaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IEFwaUVycm9yKCdObyByZWFzb24gY29kZScsIDQwNCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGlmIChkaXNwdXRlUmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgc2V0RGlzcHV0ZShkaXNwdXRlUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gZGlzcHV0ZVJlc3VsdC5yZWFzb247XG4gICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgIGRpc3B1dGU6IGVyciBpbnN0YW5jZW9mIEFwaUVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZSBkZXRhaWxzLicsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIGRpc3B1dGU6IGZhbHNlIH0pKTtcblxuICAgICAgaWYgKHBsYXlib29rUmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgc2V0UGxheWJvb2socGxheWJvb2tSZXN1bHQudmFsdWUuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnIgPSBwbGF5Ym9va1Jlc3VsdC5yZWFzb247XG4gICAgICAgIC8vIDQwNCBpcyBub3QgYW4gZXJyb3IgLS0ganVzdCBtZWFucyBubyBwbGF5Ym9vayBmb3IgdGhpcyByZWFzb24gY29kZVxuICAgICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDQpKSB7XG4gICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIHBsYXlib29rOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIHBsYXlib29rLicsXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHNldFBsYXlib29rKG51bGwpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZygocHJldikgPT4gKHsgLi4ucHJldiwgcGxheWJvb2s6IGZhbHNlIH0pKTtcbiAgICB9O1xuXG4gICAgZmV0Y2hEYXRhKCk7XG4gIH0sIFtzaG93biwgaW5pdGlhbERpc3B1dGUuaWQsIGluaXRpYWxEaXNwdXRlLm5ldHdvcmssIGluaXRpYWxEaXNwdXRlLnJlYXNvbl9jb2RlXSk7XG5cbiAgY29uc3QgY3VycmVudEluZGV4ID0gV0laQVJEX1NURVBTLmluZGV4T2YoY3VycmVudFN0ZXApO1xuICBjb25zdCBpc0ZpcnN0U3RlcCA9IGN1cnJlbnRJbmRleCA9PT0gMDtcbiAgY29uc3QgaXNMYXN0U3RlcCA9IGN1cnJlbnRJbmRleCA9PT0gV0laQVJEX1NURVBTLmxlbmd0aCAtIDE7XG5cbiAgY29uc3QgaGFuZGxlTmV4dCA9ICgpID0+IHtcbiAgICBpZiAoIWlzTGFzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggKyAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0ZpcnN0U3RlcCkge1xuICAgICAgc2V0Q3VycmVudFN0ZXAoV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGF5c1JlbWFpbmluZyA9IGdldERheXNSZW1haW5pbmcoZGlzcHV0ZS5kdWVfYnkpO1xuICBjb25zdCBpc1VyZ2VudCA9IGRheXNSZW1haW5pbmcgPCA1ICYmICFpc1Jlc29sdmVkKGRpc3B1dGUuc3RhdHVzKTtcblxuICBjb25zdCByZW5kZXJSZXZpZXdUYWIgPSAoKSA9PiB7XG4gICAgY29uc3QgaXNMb2FkaW5nUGxheWJvb2sgPSBsb2FkaW5nLnBsYXlib29rO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICB7aXNVcmdlbnQgJiYgcGxheWJvb2sgJiYgPFVyZ2VuY3lCYW5uZXIgZGF5c1JlbWFpbmluZz17ZGF5c1JlbWFpbmluZ30gZXNzZW50aWFscz17cGxheWJvb2sudXJnZW5jeV9lc3NlbnRpYWxzfSAvPn1cblxuICAgICAgICB7ZXJyb3JzLmRpc3B1dGUgJiYgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9ycy5kaXNwdXRlfSAvPn1cblxuICAgICAgICA8RGlzcHV0ZU92ZXJ2aWV3IGRpc3B1dGU9e2Rpc3B1dGV9IGxvYWRpbmc9e2xvYWRpbmcuZGlzcHV0ZX0gLz5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIHtpc0xvYWRpbmdQbGF5Ym9vayA/IChcbiAgICAgICAgICA8Qm94IGNzcz17eyBhbGlnblg6ICdjZW50ZXInLCBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+TG9hZGluZyBwbGF5Ym9vay4uLjwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogZXJyb3JzLnBsYXlib29rID8gKFxuICAgICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMucGxheWJvb2t9IC8+XG4gICAgICAgICkgOiBwbGF5Ym9vayA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvYWNoSGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRsaW5lPXtwbGF5Ym9vay5jb2FjaF9oZWFkbGluZX1cbiAgICAgICAgICAgICAgc3VtbWFyeT17cGxheWJvb2suY29hY2hfc3VtbWFyeX1cbiAgICAgICAgICAgICAgdXJnZW5jeU1vZGU9e2lzVXJnZW50fVxuICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxRdWlja0FjdGlvbnMgcGxheWJvb2s9e3BsYXlib29rfSB1cmdlbmN5TW9kZT17aXNVcmdlbnR9IC8+XG4gICAgICAgICAgICA8TGVhcm5Nb3JlXG4gICAgICAgICAgICAgIGlzc3VlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2lzc3Vlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgICBhY3F1aXJlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2FjcXVpcmVyX3N1bW1hcnl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgIHRpdGxlPVwiTm8gcGxheWJvb2sgYXZhaWxhYmxlXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2UgZG9uJ3QgaGF2ZSBhIHNwZWNpZmljIHBsYXlib29rIGZvciB0aGlzIHJlYXNvbiBjb2RlIHlldC4gVXNlIHRoZSBnZW5lcmFsIGV2aWRlbmNlIGd1aWRlbGluZXMgdG8gYnVpbGQgeW91ciByZXNwb25zZS5cIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVmlld1xuICAgICAgdGl0bGU9e2BEaXNwdXRlICR7aW5pdGlhbERpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLmB9XG4gICAgICBzaG93bj17c2hvd259XG4gICAgICBzZXRTaG93bj17c2V0U2hvd259XG4gICAgICBjb25maXJtQ2xvc2VNZXNzYWdlcz17e1xuICAgICAgICB0aXRsZTogJ0xlYXZlIGRpc3B1dGUgd29ya2Zsb3c/JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdZb3VyIHByb2dyZXNzIG9uIHRoaXMgc3RlcCB3aWxsIG5vdCBiZSBzYXZlZC4nLFxuICAgICAgICBjYW5jZWxBY3Rpb246ICdTdGF5JyxcbiAgICAgICAgZXhpdEFjdGlvbjogJ0xlYXZlJyxcbiAgICAgIH19XG4gICAgICBwcmltYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNMYXN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0U2hvd24oZmFsc2UpfT5cbiAgICAgICAgICAgIFN1Ym1pdCAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZU5leHR9PlxuICAgICAgICAgICAgTmV4dDoge1dJWkFSRF9TVEVQX0xBQkVMU1tXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV1dfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZWNvbmRhcnlBY3Rpb249e1xuICAgICAgICBpc0ZpcnN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9eygpID0+IHNldFNob3duKGZhbHNlKX0+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIEJhY2s6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgID5cbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8VGFic1xuICAgICAgICAgIGZpdHRlZFxuICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgIHNlbGVjdGVkS2V5PXtjdXJyZW50U3RlcH1cbiAgICAgICAgICBvblNlbGVjdGlvbkNoYW5nZT17KGtleSkgPT4gc2V0Q3VycmVudFN0ZXAoa2V5IGFzIFdpemFyZFN0ZXApfVxuICAgICAgICA+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICB7V0laQVJEX1NURVBTLm1hcCgoc3RlcCkgPT4gKFxuICAgICAgICAgICAgICA8VGFiIGtleT17c3RlcH0gaWQ9e3N0ZXB9PlxuICAgICAgICAgICAgICAgIHtXSVpBUkRfU1RFUF9MQUJFTFNbc3RlcF19XG4gICAgICAgICAgICAgIDwvVGFiPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9UYWJMaXN0PlxuICAgICAgICAgIDxUYWJQYW5lbHM+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJyZXZpZXdcIj5cbiAgICAgICAgICAgICAge3JlbmRlclJldmlld1RhYigpfVxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImV2aWRlbmNlXCI+XG4gICAgICAgICAgICAgIDxFdmlkZW5jZUNoZWNrbGlzdFxuICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICBpc1VyZ2VudD17aXNVcmdlbnR9XG4gICAgICAgICAgICAgICAgZGF5c1JlbWFpbmluZz17ZGF5c1JlbWFpbmluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJuYXJyYXRpdmVcIj5cbiAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJTdGVwIDM6IEFJIE5hcnJhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIkdlbmVyYXRlIGEgY29tcGVsbGluZyBuYXJyYXRpdmUgYmFzZWQgb24geW91ciBldmlkZW5jZS4gUmV2aWV3LCBlZGl0LCBhbmQgYXBwcm92ZSBiZWZvcmUgc3VibWlzc2lvbi5cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICBBSSBuYXJyYXRpdmUgZ2VuZXJhdGlvbiBhbmQgZWRpdGluZyB3aWxsIGJlIGJ1aWx0IGluIFdJTi0xOCBhbmQgV0lOLTE5LlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJTdGVwIDQ6IFN1Ym1pdCBFdmlkZW5jZVwiXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlJldmlldyBldmVyeXRoaW5nIG9uZSBmaW5hbCB0aW1lLiBTdWJtaXNzaW9uIHRvIFN0cmlwZSBpcyBpcnJldm9jYWJsZS5cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICBGaW5hbCByZXZpZXcgYW5kIFN0cmlwZSBzdWJtaXNzaW9uIHdpbGwgYmUgYnVpbHQgaW4gV0lOLTIwLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgIDwvQm94PlxuICAgIDwvRm9jdXNWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZVdvcmtmbG93O1xuIiwgImV4cG9ydCB0eXBlIERpc3B1dGVTdGF0dXMgPVxuICB8ICduZWVkc19yZXNwb25zZSdcbiAgfCAndW5kZXJfcmV2aWV3J1xuICB8ICd3b24nXG4gIHwgJ2xvc3QnXG4gIHwgJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnXG4gIHwgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3J1xuICB8ICd3YXJuaW5nX2Nsb3NlZCdcbiAgfCAnY2hhcmdlX3JlZnVuZGVkJztcblxuZXhwb3J0IHR5cGUgQ2FyZE5ldHdvcmsgPSAndmlzYScgfCAnbWFzdGVyY2FyZCcgfCAnYW1leCcgfCAnZGlzY292ZXInIHwgJ3Vua25vd24nO1xuXG5leHBvcnQgdHlwZSBXaXphcmRTdGVwID0gJ3JldmlldycgfCAnZXZpZGVuY2UnIHwgJ25hcnJhdGl2ZScgfCAnc3VibWl0JztcblxuZXhwb3J0IGNvbnN0IFdJWkFSRF9TVEVQUzogV2l6YXJkU3RlcFtdID0gWydyZXZpZXcnLCAnZXZpZGVuY2UnLCAnbmFycmF0aXZlJywgJ3N1Ym1pdCddO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBfTEFCRUxTOiBSZWNvcmQ8V2l6YXJkU3RlcCwgc3RyaW5nPiA9IHtcbiAgcmV2aWV3OiAnUmV2aWV3JyxcbiAgZXZpZGVuY2U6ICdFdmlkZW5jZScsXG4gIG5hcnJhdGl2ZTogJ05hcnJhdGl2ZScsXG4gIHN1Ym1pdDogJ1N1Ym1pdCcsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3B1dGUge1xuICBpZDogc3RyaW5nO1xuICBhbW91bnQ6IG51bWJlcjtcbiAgY3VycmVuY3k6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHN0YXR1czogRGlzcHV0ZVN0YXR1cztcbiAgZHVlX2J5OiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIG5ldHdvcms6IENhcmROZXR3b3JrO1xuICBwYXltZW50X2ludGVudD86IHN0cmluZztcbiAgY2hhcmdlX2lkOiBzdHJpbmc7XG4gIGN1c3RvbWVyX25hbWU/OiBzdHJpbmc7XG4gIGN1c3RvbWVyX2VtYWlsPzogc3RyaW5nO1xuICBjcmVhdGVkOiBudW1iZXI7XG4gIGV2aWRlbmNlX2R1ZV9ieTogbnVtYmVyO1xuICAvLyBFbnJpY2hlZCBmaWVsZHMgKGF2YWlsYWJsZSBhZnRlciBkZXRhaWwgZmV0Y2gpXG4gIHRyYW5zYWN0aW9uX2RhdGU/OiBudW1iZXI7XG4gIGNhcmRfYnJhbmQ/OiBzdHJpbmc7XG4gIGNhcmRfbGFzdDQ/OiBzdHJpbmc7XG4gIGJpbGxpbmdfYWRkcmVzcz86IHN0cmluZztcbiAgY2hhcmdlX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICByZWNlaXB0X3VybD86IHN0cmluZztcbiAgaGFzX2V2aWRlbmNlPzogYm9vbGVhbjtcbiAgZXZpZGVuY2Vfc3VibWlzc2lvbl9jb3VudD86IG51bWJlcjtcbiAgaXNfY2hhcmdlX3JlZnVuZGFibGU/OiBib29sZWFuO1xuICBtZXRhZGF0YT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGNoZWNrbGlzdF9zdGF0ZT86IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICBjaGVja2xpc3Rfbm90ZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG4vLyBQbGF5Ym9vayB0eXBlcyAobWlycm9ycyBiYWNrZW5kIFBsYXlib29rRGF0YSlcblxuZXhwb3J0IGludGVyZmFjZSBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0ge1xuICBpdGVtOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiAnbWFuZGF0b3J5JyB8ICdyZWNvbW1lbmRlZCcgfCAnc2l0dWF0aW9uYWwnO1xuICBjb250ZXh0OiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICB3aHlfbWF0dGVyczogc3RyaW5nO1xuICB3aGVyZV90b19maW5kPzogc3RyaW5nO1xuICB1cmdlbmN5X2Vzc2VudGlhbDogYm9vbGVhbjtcbiAgdXJnZW5jeV9vcmRlcjogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGF5Ym9va0RhdGEge1xuICBuZXR3b3JrOiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb2FjaF9oZWFkbGluZTogc3RyaW5nO1xuICBjb2FjaF9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2lzc3Vlcl9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2FjcXVpcmVyX3N1bW1hcnk6IHN0cmluZztcbiAgaXNzdWVyX2V2YWx1YXRpb246IHN0cmluZztcbiAgYWNxdWlyZXJfcHJlcmV2aWV3OiBzdHJpbmc7XG4gIGV2aWRlbmNlX2NoZWNrbGlzdDogRXZpZGVuY2VDaGVja2xpc3RJdGVtW107XG4gIGNvbW1vbl9taXN0YWtlczogeyBtaXN0YWtlOiBzdHJpbmc7IGV4cGxhbmF0aW9uOiBzdHJpbmcgfVtdO1xuICBwcm9fdGlwczogeyB0aXA6IHN0cmluZyB9W107XG4gIHVyZ2VuY3lfZXNzZW50aWFsczogeyBzdW1tYXJ5OiBzdHJpbmc7IG9yZGVyZWRfaXRlbXM6IHN0cmluZ1tdIH07XG4gIG5hcnJhdGl2ZV90ZW1wbGF0ZTogc3RyaW5nO1xuICByZXNwb25zZV9kZWFkbGluZV9kYXlzOiBudW1iZXI7XG59XG4iLCAiaW1wb3J0IGZldGNoU3RyaXBlU2lnbmF0dXJlIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9zaWduYXR1cmUnO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5cbi8vIFRvZ2dsZSBmb3IgbG9jYWwgZGV2ZWxvcG1lbnQ6IHNldCB0byB0cnVlIHdoZW4gcnVubmluZyBgc3RyaXBlIGFwcHMgc3RhcnRgXG5jb25zdCBVU0VfTE9DQUxfQkFDS0VORCA9IHRydWU7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gVVNFX0xPQ0FMX0JBQ0tFTkRcbiAgPyAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICA6ICdodHRwczovL3dpbmJhY2twYXkuY29tJztcblxuZXhwb3J0IGNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcHVibGljIHN0YXR1czogbnVtYmVyLFxuICApIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnQXBpRXJyb3InO1xuICB9XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBBdXRvbWF0aWNhbGx5IGluY2x1ZGVzIFN0cmlwZSBBcHAgc2lnbmF0dXJlIGFuZCBpZGVudGl0eSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5kYXRhLFxuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCBQQVRDSCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLmVycm9yIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEaXNwdXRlU3RhdHVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFJFU09MVkVEX1NUQVRVU0VTOiBEaXNwdXRlU3RhdHVzW10gPSBbJ3dvbicsICdsb3N0JywgJ3dhcm5pbmdfY2xvc2VkJywgJ2NoYXJnZV9yZWZ1bmRlZCddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNvbHZlZChzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gUkVTT0xWRURfU1RBVFVTRVMuaW5jbHVkZXMoc3RhdHVzIGFzIERpc3B1dGVTdGF0dXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHVzQmFkZ2Uoc3RhdHVzOiBzdHJpbmcpOiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHR5cGU6ICd1cmdlbnQnIHwgJ3dhcm5pbmcnIHwgJ3Bvc2l0aXZlJyB8ICduZWdhdGl2ZScgfCAnaW5mbyc7XG59IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgY2FzZSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ05lZWRzIFJlc3BvbnNlJywgdHlwZTogJ3VyZ2VudCcgfTtcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgIGNhc2UgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnVW5kZXIgUmV2aWV3JywgdHlwZTogJ2luZm8nIH07XG4gICAgY2FzZSAnd29uJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnV29uJywgdHlwZTogJ3Bvc2l0aXZlJyB9O1xuICAgIGNhc2UgJ2xvc3QnOlxuICAgIGNhc2UgJ3dhcm5pbmdfY2xvc2VkJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTG9zdCcsIHR5cGU6ICduZWdhdGl2ZScgfTtcbiAgICBjYXNlICdjaGFyZ2VfcmVmdW5kZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdSZWZ1bmRlZCcsIHR5cGU6ICdpbmZvJyB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4geyBsYWJlbDogc3RhdHVzLCB0eXBlOiAnaW5mbycgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c1JlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZHVlID0gbmV3IERhdGUoZHVlQnkpO1xuICByZXR1cm4gTWF0aC5jZWlsKChkdWUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJnZW5jeUJhZGdlKFxuICBkdWVCeTogc3RyaW5nLFxuICBzdGF0dXM6IHN0cmluZyxcbik6IHsgbGFiZWw6IHN0cmluZzsgdHlwZTogJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnIH0gfCBudWxsIHtcbiAgaWYgKGlzUmVzb2x2ZWQoc3RhdHVzKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF5cyA9IGdldERheXNSZW1haW5pbmcoZHVlQnkpO1xuICBpZiAoZGF5cyA8IDUpIHJldHVybiB7IGxhYmVsOiBgJHtkYXlzfWQgbGVmdGAsIHR5cGU6ICd1cmdlbnQnIH07XG4gIGlmIChkYXlzIDw9IDEzKSByZXR1cm4geyBsYWJlbDogYCR7ZGF5c31kIGxlZnRgLCB0eXBlOiAnd2FybmluZycgfTtcbiAgcmV0dXJuIHsgbGFiZWw6IGAke2RheXN9ZCBsZWZ0YCwgdHlwZTogJ3Bvc2l0aXZlJyB9O1xufVxuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRXJyb3JCYW5uZXIudHN4XG5cbmltcG9ydCB7IEJhbm5lciwgQm94LCBCdXR0b24gfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRXJyb3JCYW5uZXJQcm9wcyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25SZXRyeT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVycm9yQmFubmVyID0gKHsgbWVzc2FnZSwgb25SZXRyeSB9OiBFcnJvckJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgIHRpdGxlPVwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgICAgICBkZXNjcmlwdGlvbj17bWVzc2FnZX1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgb25SZXRyeSA/IChcbiAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17b25SZXRyeX0+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJhbm5lcjtcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBJbmxpbmUsIExpbmssIFNwaW5uZXIgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGdldFN0YXR1c0JhZGdlLCBnZXRVcmdlbmN5QmFkZ2UsIGdldERheXNSZW1haW5pbmcgfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZU92ZXJ2aWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSW5mb1Jvd1Byb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZnVuY3Rpb24gSW5mb1Jvdyh7IGxhYmVsLCB2YWx1ZSB9OiBJbmZvUm93UHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PntsYWJlbH08L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57dmFsdWV9PC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ3Nob3J0JyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmNvbnN0IERpc3B1dGVPdmVydmlldyA9ICh7IGRpc3B1dGUsIGxvYWRpbmcgfTogRGlzcHV0ZU92ZXJ2aWV3UHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHVyZ2VuY3lCYWRnZSA9IGdldFVyZ2VuY3lCYWRnZShkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCBkYXlzUmVtYWluaW5nID0gZGlzcHV0ZS5kdWVfYnkgPyBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICB7LyogSGVhZGVyOiBhbW91bnQgKyBiYWRnZXMgKi99XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIHtmb3JtYXRBbW91bnQoZGlzcHV0ZS5hbW91bnQsIGRpc3B1dGUuY3VycmVuY3kpfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT17dXJnZW5jeUJhZGdlLnR5cGV9Pnt1cmdlbmN5QmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ291bnRkb3duICovfVxuICAgICAge2RheXNSZW1haW5pbmcgIT09IG51bGwgJiYgZGF5c1JlbWFpbmluZyA+IDAgJiYgKFxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7ZGF5c1JlbWFpbmluZ30ge2RheXNSZW1haW5pbmcgPT09IDEgPyAnZGF5JyA6ICdkYXlzJ30gdG8gcmVzcG9uZFxuICAgICAgICA8L0lubGluZT5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBDdXN0b21lciBpbmZvICovfVxuICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfbmFtZSAmJiAoXG4gICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQ3VzdG9tZXJcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfSAvPlxuICAgICAgKX1cbiAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsICYmIChcbiAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJFbWFpbFwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsfSAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEVucmljaGVkIHNlY3Rpb24gKi99XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY2FyZF9icmFuZCAmJiBkaXNwdXRlLmNhcmRfbGFzdDQgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXJkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ake2Rpc3B1dGUuY2FyZF9icmFuZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUuY2FyZF9icmFuZC5zbGljZSgxKX0gZW5kaW5nIGluICR7ZGlzcHV0ZS5jYXJkX2xhc3Q0fWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIlRyYW5zYWN0aW9uIGRhdGVcIiB2YWx1ZT17Zm9ybWF0RGF0ZShkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRGVzY3JpcHRpb25cIiB2YWx1ZT17ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJCaWxsaW5nIGFkZHJlc3NcIiB2YWx1ZT17ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5yZWNlaXB0X3VybCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIlJlY2VpcHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17PExpbmsgaHJlZj17ZGlzcHV0ZS5yZWNlaXB0X3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+VmlldyByZWNlaXB0PC9MaW5rPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5tZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhkaXNwdXRlLm1ldGFkYXRhKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhkaXNwdXRlLm1ldGFkYXRhKS5tYXAoKFtrZXksIHZhbF0pID0+IChcbiAgICAgICAgICAgICAgICA8SW5mb1JvdyBrZXk9e2tleX0gbGFiZWw9e2tleX0gdmFsdWU9e3ZhbH0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXI6IElEcyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkRpc3B1dGU6IHtkaXNwdXRlLmlkfTwvSW5saW5lPlxuICAgICAgICB7ZGlzcHV0ZS5jaGFyZ2VfaWQgJiYgKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkNoYXJnZToge2Rpc3B1dGUuY2hhcmdlX2lkfTwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlT3ZlcnZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgQ29hY2hIZWFkZXJQcm9wcyB7XG4gIGhlYWRsaW5lOiBzdHJpbmc7XG4gIHN1bW1hcnk6IHN0cmluZztcbiAgdXJnZW5jeU1vZGU6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc/OiBudW1iZXI7XG59XG5cbmNvbnN0IENvYWNoSGVhZGVyID0gKHsgaGVhZGxpbmUsIHN1bW1hcnksIHVyZ2VuY3lNb2RlLCBkYXlzUmVtYWluaW5nIH06IENvYWNoSGVhZGVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHtoZWFkbGluZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHt1cmdlbmN5TW9kZSAmJiBkYXlzUmVtYWluaW5nICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGBZb3UgaGF2ZSAke2RheXNSZW1haW5pbmd9IGRheSR7ZGF5c1JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfS4gRm9jdXMgb24gdGhlIGVzc2VudGlhbHMgYmVsb3cuYFxuICAgICAgICAgIDogc3VtbWFyeX1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29hY2hIZWFkZXI7XG4iLCAiaW1wb3J0IHsgQm94LCBJY29uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBQbGF5Ym9va0RhdGEgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5pbnRlcmZhY2UgUXVpY2tBY3Rpb25zUHJvcHMge1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhO1xuICB1cmdlbmN5TW9kZTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZGVyaXZlQWN0aW9ucyhwbGF5Ym9vazogUGxheWJvb2tEYXRhKTogc3RyaW5nW10ge1xuICBjb25zdCBhY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0IG1hbmRhdG9yeUl0ZW1zID0gcGxheWJvb2suZXZpZGVuY2VfY2hlY2tsaXN0XG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jYXRlZ29yeSA9PT0gJ21hbmRhdG9yeScgJiYgaXRlbS5jb250ZXh0ID09PSAnYWxsJylcbiAgICAuc2xpY2UoMCwgMyk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBtYW5kYXRvcnlJdGVtcykge1xuICAgIGFjdGlvbnMucHVzaChgQ29uZmlybSB5b3UgaGF2ZTogJHtpdGVtLml0ZW0udG9Mb3dlckNhc2UoKX1gKTtcbiAgfVxuXG4gIGNvbnN0IHRvcE1pc3Rha2VzID0gcGxheWJvb2suY29tbW9uX21pc3Rha2VzLnNsaWNlKDAsIDIpO1xuICBmb3IgKGNvbnN0IG1pc3Rha2Ugb2YgdG9wTWlzdGFrZXMpIHtcbiAgICBjb25zdCByZWZyYW1lZCA9IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdOb3QgJylcbiAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoNCkudG9Mb3dlckNhc2UoKX1gXG4gICAgICA6IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdTa2lwcGluZyAnKVxuICAgICAgICA/IGBNYWtlIHN1cmUgeW91J3JlIHVzaW5nICR7bWlzdGFrZS5taXN0YWtlLnNsaWNlKDkpLnRvTG93ZXJDYXNlKCl9YFxuICAgICAgICA6IGBDaGVjazogJHttaXN0YWtlLm1pc3Rha2UudG9Mb3dlckNhc2UoKX1gO1xuICAgIGFjdGlvbnMucHVzaChyZWZyYW1lZCk7XG4gIH1cblxuICByZXR1cm4gYWN0aW9ucy5zbGljZSgwLCA1KTtcbn1cblxuY29uc3QgUXVpY2tBY3Rpb25zID0gKHsgcGxheWJvb2ssIHVyZ2VuY3lNb2RlIH06IFF1aWNrQWN0aW9uc1Byb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gdXJnZW5jeU1vZGVcbiAgICA/IHBsYXlib29rLnVyZ2VuY3lfZXNzZW50aWFscy5vcmRlcmVkX2l0ZW1zXG4gICAgOiBkZXJpdmVBY3Rpb25zKHBsYXlib29rKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlID8gJ0ZvY3VzIG9uIHRoZXNlIGVzc2VudGlhbHMnIDogJ1lvdXIgbmV4dCBzdGVwcyd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIHtpdGVtcy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgIDxCb3gga2V5PXtpbmRleH0gY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAndG9wJyB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9XCJ4c21hbGxcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT57dGV4dH08L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICBEb24ndCB3b3JyeSwgd2UnbGwgd2FsayB5b3UgdGhyb3VnaCBlYWNoIG9mIHRoZXNlIG9uIHRoZSBuZXh0IHN0ZXAuXG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFF1aWNrQWN0aW9ucztcbiIsICJpbXBvcnQgeyBBY2NvcmRpb24sIEFjY29yZGlvbkl0ZW0sIEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIExlYXJuTW9yZVByb3BzIHtcbiAgaXNzdWVyU3VtbWFyeTogc3RyaW5nO1xuICBhY3F1aXJlclN1bW1hcnk6IHN0cmluZztcbn1cblxuY29uc3QgTGVhcm5Nb3JlID0gKHsgaXNzdWVyU3VtbWFyeSwgYWNxdWlyZXJTdW1tYXJ5IH06IExlYXJuTW9yZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEFjY29yZGlvbj5cbiAgICAgIDxBY2NvcmRpb25JdGVtIHRpdGxlPVwiV2h5IHRoaXMgbWF0dGVyc1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCB0aGUgYmFuayBjaGVja3NcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtpc3N1ZXJTdW1tYXJ5fVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBXaGF0IGhhcHBlbnMgdG8geW91ciByZXNwb25zZVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2FjcXVpcmVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICA8L0FjY29yZGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExlYXJuTW9yZTtcbiIsICIvLyBzdHJpcGUtYXBwL3NyYy9jb21wb25lbnRzL3Jldmlldy9VcmdlbmN5QmFubmVyLnRzeFxuXG5pbXBvcnQgeyBCYW5uZXIsIEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIFVyZ2VuY3lCYW5uZXJQcm9wcyB7XG4gIGRheXNSZW1haW5pbmc6IG51bWJlcjtcbiAgZXNzZW50aWFsczoge1xuICAgIHN1bW1hcnk6IHN0cmluZztcbiAgICBvcmRlcmVkX2l0ZW1zOiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuY29uc3QgVXJnZW5jeUJhbm5lciA9ICh7IGRheXNSZW1haW5pbmcsIGVzc2VudGlhbHMgfTogVXJnZW5jeUJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgIHRpdGxlPXtgJHtkYXlzUmVtYWluaW5nfSBkYXkke2RheXNSZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gbGVmdCB0byByZXNwb25kYH1cbiAgICAgICAgZGVzY3JpcHRpb249XCJGb2N1cyBvbiB0aGUgZXNzZW50aWFscyBiZWxvdyB0byBtYXhpbWl6ZSB5b3VyIGNoYW5jZXMuXCJcbiAgICAgIC8+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxCb3g+e2Vzc2VudGlhbHMuc3VtbWFyeX08L0JveD5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZXNzZW50aWFscy5vcmRlcmVkX2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxJbmxpbmUga2V5PXtpbmRleH0gY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICAgIDxCb3g+e2luZGV4ICsgMX0uPC9Cb3g+XG4gICAgICAgICAgICAgIDxCb3g+e2l0ZW19PC9Cb3g+XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVyZ2VuY3lCYW5uZXI7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFubmVyLCBJbmxpbmUsIExpbmssIERpdmlkZXIgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IHBhdGNoQmFja2VuZCB9IGZyb20gJy4uLy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IENoZWNrbGlzdFByb2dyZXNzIGZyb20gJy4vQ2hlY2tsaXN0UHJvZ3Jlc3MnO1xuaW1wb3J0IENoZWNrbGlzdEl0ZW0gZnJvbSAnLi9DaGVja2xpc3RJdGVtJztcbmltcG9ydCB0eXBlIHsgRXhwYW5kZWRTZWN0aW9uIH0gZnJvbSAnLi9DaGVja2xpc3RJdGVtJztcblxuaW50ZXJmYWNlIEV2aWRlbmNlQ2hlY2tsaXN0UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhIHwgbnVsbDtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBpc1VyZ2VudDogYm9vbGVhbjtcbiAgZGF5c1JlbWFpbmluZzogbnVtYmVyO1xufVxuXG50eXBlIENoZWNrbGlzdFN0YXRlID0gUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG50eXBlIE5vdGVzU3RhdGUgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG5jb25zdCBDQVRFR09SWV9PUkRFUjogRXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddW10gPSBbJ21hbmRhdG9yeScsICdyZWNvbW1lbmRlZCcsICdzaXR1YXRpb25hbCddO1xuXG5jb25zdCBDQVRFR09SWV9MQUJFTFM6IFJlY29yZDxFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bJ2NhdGVnb3J5J10sIHN0cmluZz4gPSB7XG4gIG1hbmRhdG9yeTogJ01hbmRhdG9yeScsXG4gIHJlY29tbWVuZGVkOiAnUmVjb21tZW5kZWQnLFxuICBzaXR1YXRpb25hbDogJ1NpdHVhdGlvbmFsJyxcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIGNoZWNrbGlzdCBpdGVtIGNhbiBiZSBhdXRvLXBvcHVsYXRlZCBmcm9tIFN0cmlwZSBkaXNwdXRlIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGlzQXV0b1BvcHVsYXRlZChpdGVtOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0sIGRpc3B1dGU6IERpc3B1dGUpOiBib29sZWFuIHtcbiAgY29uc3QgbG93ZXIgPSBpdGVtLml0ZW0udG9Mb3dlckNhc2UoKTtcbiAgaWYgKChsb3dlci5pbmNsdWRlcygncmVjZWlwdCcpIHx8IGxvd2VyLmluY2x1ZGVzKCdwcm9vZiBvZiBwdXJjaGFzZScpKSAmJiBkaXNwdXRlLnJlY2VpcHRfdXJsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGxvd2VyLmluY2x1ZGVzKCdjdXN0b21lciBlbWFpbCcpICYmIGRpc3B1dGUuY3VzdG9tZXJfZW1haWwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAobG93ZXIuaW5jbHVkZXMoJ2JpbGxpbmcgYWRkcmVzcycpICYmIGRpc3B1dGUuYmlsbGluZ19hZGRyZXNzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGxvd2VyLmluY2x1ZGVzKCd0cmFuc2FjdGlvbicpICYmIGxvd2VyLmluY2x1ZGVzKCdkYXRlJykgJiYgZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgaW5pdGlhbCBjaGVja2xpc3Qgc3RhdGUgYnkgbWVyZ2luZzpcbiAqIDEuIERlZmF1bHQgKGFsbCBmYWxzZSlcbiAqIDIuIEF1dG8tcG9wdWxhdGVkIGl0ZW1zICh0cnVlIGlmIFN0cmlwZSBkYXRhIGV4aXN0cylcbiAqIDMuIFNhdmVkIHN0YXRlIGZyb20gU3VwYWJhc2UgKG92ZXJyaWRlcyBldmVyeXRoaW5nKVxuICovXG5mdW5jdGlvbiBidWlsZEluaXRpYWxTdGF0ZShcbiAgaXRlbXM6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVtdLFxuICBkaXNwdXRlOiBEaXNwdXRlLFxuKTogQ2hlY2tsaXN0U3RhdGUge1xuICBjb25zdCBzdGF0ZTogQ2hlY2tsaXN0U3RhdGUgPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgc3RhdGVbaXRlbS5pdGVtXSA9IGZhbHNlO1xuICAgIGlmIChpc0F1dG9Qb3B1bGF0ZWQoaXRlbSwgZGlzcHV0ZSkpIHtcbiAgICAgIHN0YXRlW2l0ZW0uaXRlbV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSkpIHtcbiAgICAgIGlmIChrZXkgaW4gc3RhdGUpIHtcbiAgICAgICAgc3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IEV2aWRlbmNlQ2hlY2tsaXN0ID0gKHsgZGlzcHV0ZSwgcGxheWJvb2ssIGNvbnRleHQsIGlzVXJnZW50LCBkYXlzUmVtYWluaW5nIH06IEV2aWRlbmNlQ2hlY2tsaXN0UHJvcHMpID0+IHtcbiAgY29uc3QgaXRlbXMgPSBwbGF5Ym9vaz8uZXZpZGVuY2VfY2hlY2tsaXN0ID8/IFtdO1xuICBjb25zdCBbY2hlY2tsaXN0U3RhdGUsIHNldENoZWNrbGlzdFN0YXRlXSA9IHVzZVN0YXRlPENoZWNrbGlzdFN0YXRlPigoKSA9PlxuICAgIGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKSxcbiAgKTtcbiAgY29uc3QgW25vdGVzU3RhdGUsIHNldE5vdGVzU3RhdGVdID0gdXNlU3RhdGU8Tm90ZXNTdGF0ZT4oXG4gICAgKCkgPT4gZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMgPz8ge30sXG4gICk7XG4gIGNvbnN0IFtleHBhbmRlZFNlY3Rpb25zLCBzZXRFeHBhbmRlZFNlY3Rpb25zXSA9IHVzZVN0YXRlPE1hcDxzdHJpbmcsIFNldDxFeHBhbmRlZFNlY3Rpb24+Pj4obmV3IE1hcCgpKTtcbiAgY29uc3QgW3Nob3dGdWxsQ2hlY2tsaXN0LCBzZXRTaG93RnVsbENoZWNrbGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVmcyBmb3IgZGVib3VuY2VkIHNhdmVzXG4gIGNvbnN0IGNoZWNrbGlzdFRpbWVvdXRSZWYgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsPihudWxsKTtcbiAgY29uc3Qgbm90ZXNUaW1lb3V0UmVmID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgLy8gUmVidWlsZCBzdGF0ZSB3aGVuIGRpc3B1dGUgb3IgcGxheWJvb2sgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldENoZWNrbGlzdFN0YXRlKGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKSk7XG4gICAgc2V0Tm90ZXNTdGF0ZShkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcyA/PyB7fSk7XG4gIH0sIFtkaXNwdXRlLmlkLCBkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSwgZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMsIHBsYXlib29rPy5yZWFzb25fY29kZV0pO1xuXG4gIGNvbnN0IHBlcnNpc3RDaGVja2xpc3QgPSB1c2VDYWxsYmFjaygobmV3U3RhdGU6IENoZWNrbGlzdFN0YXRlKSA9PiB7XG4gICAgaWYgKGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgfVxuICAgIGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgY2hlY2tsaXN0X3N0YXRlOiBuZXdTdGF0ZSxcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2hlY2tsaXN0IHN0YXRlOicsIGVycik7XG4gICAgICB9KTtcbiAgICB9LCA1MDApO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IHBlcnNpc3ROb3RlcyA9IHVzZUNhbGxiYWNrKChuZXdOb3RlczogTm90ZXNTdGF0ZSkgPT4ge1xuICAgIGlmIChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KG5vdGVzVGltZW91dFJlZi5jdXJyZW50KTtcbiAgICB9XG4gICAgbm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgIGNoZWNrbGlzdF9ub3RlczogbmV3Tm90ZXMsXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGNoZWNrbGlzdCBub3RlczonLCBlcnIpO1xuICAgICAgfSk7XG4gICAgfSwgMTAwMCk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlID0gdXNlQ2FsbGJhY2soKGl0ZW1OYW1lOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDaGVja2xpc3RTdGF0ZSgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IC4uLnByZXYsIFtpdGVtTmFtZV06ICFwcmV2W2l0ZW1OYW1lXSB9O1xuICAgICAgcGVyc2lzdENoZWNrbGlzdChuZXdTdGF0ZSk7XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSk7XG4gIH0sIFtwZXJzaXN0Q2hlY2tsaXN0XSk7XG5cbiAgY29uc3QgaGFuZGxlTm90ZXNDaGFuZ2UgPSB1c2VDYWxsYmFjaygoaXRlbU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHNldE5vdGVzU3RhdGUoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld05vdGVzID0geyAuLi5wcmV2LCBbaXRlbU5hbWVdOiB2YWx1ZSB9O1xuICAgICAgcGVyc2lzdE5vdGVzKG5ld05vdGVzKTtcbiAgICAgIHJldHVybiBuZXdOb3RlcztcbiAgICB9KTtcbiAgfSwgW3BlcnNpc3ROb3Rlc10pO1xuXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25Ub2dnbGUgPSB1c2VDYWxsYmFjaygoaXRlbU5hbWU6IHN0cmluZywgc2VjdGlvbjogRXhwYW5kZWRTZWN0aW9uKSA9PiB7XG4gICAgc2V0RXhwYW5kZWRTZWN0aW9ucygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IG5ldyBNYXAocHJldik7XG4gICAgICBjb25zdCBzZWN0aW9ucyA9IG5ldyBTZXQocHJldi5nZXQoaXRlbU5hbWUpID8/IFtdKTtcbiAgICAgIGlmIChzZWN0aW9ucy5oYXMoc2VjdGlvbikpIHtcbiAgICAgICAgc2VjdGlvbnMuZGVsZXRlKHNlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnMuYWRkKHNlY3Rpb24pO1xuICAgICAgfVxuICAgICAgbmV4dC5zZXQoaXRlbU5hbWUsIHNlY3Rpb25zKTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgLy8gTm8gcGxheWJvb2sgZmFsbGJhY2tcbiAgaWYgKCFwbGF5Ym9vayB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgdGl0bGU9XCJObyBldmlkZW5jZSBjaGVja2xpc3QgYXZhaWxhYmxlXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5vIHNwZWNpZmljIGV2aWRlbmNlIGNoZWNrbGlzdCBmb3IgdGhpcyByZWFzb24gY29kZS4gVXNlIFN0cmlwZSdzIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyBmb3IgeW91ciByZXNwb25zZS5cIlxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIC8vIEZpbHRlciBmb3IgdXJnZW5jeSBtb2RlXG4gIGNvbnN0IGVmZmVjdGl2ZVVyZ2VuY3kgPSBpc1VyZ2VudCAmJiAhc2hvd0Z1bGxDaGVja2xpc3Q7XG4gIGxldCBkaXNwbGF5SXRlbXMgPSBpdGVtcztcbiAgaWYgKGVmZmVjdGl2ZVVyZ2VuY3kpIHtcbiAgICBkaXNwbGF5SXRlbXMgPSBpdGVtc1xuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS51cmdlbmN5X2Vzc2VudGlhbClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiAoYS51cmdlbmN5X29yZGVyID8/IDk5OSkgLSAoYi51cmdlbmN5X29yZGVyID8/IDk5OSkpO1xuICB9XG5cbiAgLy8gR3JvdXAgYnkgY2F0ZWdvcnlcbiAgY29uc3QgZ3JvdXBlZCA9IENBVEVHT1JZX09SREVSLm1hcCgoY2F0ZWdvcnkpID0+ICh7XG4gICAgY2F0ZWdvcnksXG4gICAgbGFiZWw6IENBVEVHT1JZX0xBQkVMU1tjYXRlZ29yeV0sXG4gICAgaXRlbXM6IGRpc3BsYXlJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY2F0ZWdvcnkgPT09IGNhdGVnb3J5KSxcbiAgfSkpLmZpbHRlcigoZ3JvdXApID0+IGdyb3VwLml0ZW1zLmxlbmd0aCA+IDApO1xuXG4gIC8vIFByb2dyZXNzIGNvdW50cyAoYWx3YXlzIGFnYWluc3QgZnVsbCBsaXN0LCBub3QgZmlsdGVyZWQpXG4gIGNvbnN0IHRvdGFsSXRlbXMgPSBpdGVtcy5sZW5ndGg7XG4gIGNvbnN0IGNvbXBsZXRlZEl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBjaGVja2xpc3RTdGF0ZVtpdGVtLml0ZW1dKS5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBHYXRoZXIgeW91ciBldmlkZW5jZVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgSGVyZSdzIHdoYXQgeW91J2xsIG5lZWQgdG8gYnVpbGQgeW91ciBjYXNlLiBEb24ndCBsZXQgdGhlIGxpc3QgaW50aW1pZGF0ZSB5b3UuXG4gICAgICAgICAgRXhwYW5kIGVhY2ggaXRlbSB0byBzZWUgd2h5IGl0IG1hdHRlcnMgYW5kIGpvdCBkb3duIG5vdGVzIGFzIHlvdSBnby5cbiAgICAgICAgICBPbiB0aGUgbmV4dCBzdGVwLCB5b3UnbGwgcHV0IGl0IGFsbCB0b2dldGhlci5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cblxuICAgICAgPENoZWNrbGlzdFByb2dyZXNzIGNvbXBsZXRlZD17Y29tcGxldGVkSXRlbXN9IHRvdGFsPXt0b3RhbEl0ZW1zfSAvPlxuXG4gICAgICB7aXNVcmdlbnQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICAgIHRpdGxlPXtgJHtkYXlzUmVtYWluaW5nfSBkYXkke2RheXNSZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gbGVmdCB0byByZXNwb25kYH1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtzaG93RnVsbENoZWNrbGlzdFxuICAgICAgICAgICAgICA/ICdTaG93aW5nIGFsbCBldmlkZW5jZSBpdGVtcy4nXG4gICAgICAgICAgICAgIDogJ1Nob3dpbmcgb25seSBlc3NlbnRpYWwgaXRlbXMgdG8gbWF4aW1pemUgeW91ciBjaGFuY2VzLid9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93RnVsbENoZWNrbGlzdCghc2hvd0Z1bGxDaGVja2xpc3QpfT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAgICAgICAge3Nob3dGdWxsQ2hlY2tsaXN0ID8gJ1Nob3cgZXNzZW50aWFscyBvbmx5JyA6ICdWaWV3IGZ1bGwgY2hlY2tsaXN0J31cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7Z3JvdXBlZC5tYXAoKHsgY2F0ZWdvcnksIGxhYmVsLCBpdGVtczogZ3JvdXBJdGVtcyB9KSA9PiAoXG4gICAgICAgIDxCb3gga2V5PXtjYXRlZ29yeX0gY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdzZWNvbmRhcnknLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICB7Z3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgIDxDaGVja2xpc3RJdGVtXG4gICAgICAgICAgICAgIGtleT17aXRlbS5pdGVtfVxuICAgICAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgICAgICBjaGVja2VkPXshIWNoZWNrbGlzdFN0YXRlW2l0ZW0uaXRlbV19XG4gICAgICAgICAgICAgIGF1dG9Qb3B1bGF0ZWQ9e2lzQXV0b1BvcHVsYXRlZChpdGVtLCBkaXNwdXRlKX1cbiAgICAgICAgICAgICAgZXhwYW5kZWRTZWN0aW9ucz17ZXhwYW5kZWRTZWN0aW9ucy5nZXQoaXRlbS5pdGVtKSA/PyBuZXcgU2V0KCl9XG4gICAgICAgICAgICAgIG5vdGVzPXtub3Rlc1N0YXRlW2l0ZW0uaXRlbV0gPz8gJyd9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiBoYW5kbGVUb2dnbGUoaXRlbS5pdGVtKX1cbiAgICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlPXsoc2VjdGlvbikgPT4gaGFuZGxlU2VjdGlvblRvZ2dsZShpdGVtLml0ZW0sIHNlY3Rpb24pfVxuICAgICAgICAgICAgICBvbk5vdGVzQ2hhbmdlPXsodmFsdWUpID0+IGhhbmRsZU5vdGVzQ2hhbmdlKGl0ZW0uaXRlbSwgdmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIFlvdXIgcHJvZ3Jlc3MgYW5kIG5vdGVzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFdmlkZW5jZUNoZWNrbGlzdDtcbiIsICJpbXBvcnQgeyBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBDaGVja2xpc3RQcm9ncmVzc1Byb3BzIHtcbiAgY29tcGxldGVkOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmNvbnN0IENoZWNrbGlzdFByb2dyZXNzID0gKHsgY29tcGxldGVkLCB0b3RhbCB9OiBDaGVja2xpc3RQcm9ncmVzc1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIEV2aWRlbmNlIFByb2dyZXNzXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7Y29tcGxldGVkfSBvZiB7dG90YWx9IGNvbXBsZXRlZFxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tsaXN0UHJvZ3Jlc3M7XG4iLCAiaW1wb3J0IHsgQm94LCBDaGVja2JveCwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgVGV4dEFyZWEgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0gfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBFeHBhbmRlZFNlY3Rpb24gPSAnd2h5JyB8ICd3aGVyZScgfCAnbm90ZXMnO1xuXG5pbnRlcmZhY2UgQ2hlY2tsaXN0SXRlbVByb3BzIHtcbiAgaXRlbTogRXZpZGVuY2VDaGVja2xpc3RJdGVtO1xuICBjaGVja2VkOiBib29sZWFuO1xuICBhdXRvUG9wdWxhdGVkOiBib29sZWFuO1xuICBleHBhbmRlZFNlY3Rpb25zOiBTZXQ8RXhwYW5kZWRTZWN0aW9uPjtcbiAgbm90ZXM6IHN0cmluZztcbiAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4gdm9pZDtcbiAgb25Ob3Rlc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIGdldENhdGVnb3J5QmFkZ2UoY2F0ZWdvcnk6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXSkge1xuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgY2FzZSAnbWFuZGF0b3J5JzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5lZ2F0aXZlXCI+UkVRVUlSRUQ8L0JhZGdlPjtcbiAgICBjYXNlICdyZWNvbW1lbmRlZCc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJ3YXJuaW5nXCI+SEVMUEZVTDwvQmFkZ2U+O1xuICAgIGNhc2UgJ3NpdHVhdGlvbmFsJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5ldXRyYWxcIj5JRiBBUFBMSUNBQkxFPC9CYWRnZT47XG4gIH1cbn1cblxuaW50ZXJmYWNlIFNlY3Rpb25Ub2dnbGVQcm9wcyB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGV4cGFuZGVkOiBib29sZWFuO1xuICBvblByZXNzOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBTZWN0aW9uVG9nZ2xlID0gKHsgbGFiZWwsIGV4cGFuZGVkLCBvblByZXNzIH06IFNlY3Rpb25Ub2dnbGVQcm9wcykgPT4gKFxuICA8TGluayBvblByZXNzPXtvblByZXNzfT5cbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4eHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SWNvbiBuYW1lPXtleHBhbmRlZCA/ICdjaGV2cm9uVXAnIDogJ2NoZXZyb25Eb3duJ30gc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgPC9Cb3g+XG4gIDwvTGluaz5cbik7XG5cbmNvbnN0IENoZWNrbGlzdEl0ZW0gPSAoe1xuICBpdGVtLFxuICBjaGVja2VkLFxuICBhdXRvUG9wdWxhdGVkLFxuICBleHBhbmRlZFNlY3Rpb25zLFxuICBub3RlcyxcbiAgb25Ub2dnbGUsXG4gIG9uU2VjdGlvblRvZ2dsZSxcbiAgb25Ob3Rlc0NoYW5nZSxcbn06IENoZWNrbGlzdEl0ZW1Qcm9wcykgPT4ge1xuICBjb25zdCB3aHlFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCd3aHknKTtcbiAgY29uc3Qgd2hlcmVFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCd3aGVyZScpO1xuICBjb25zdCBub3Rlc0V4cGFuZGVkID0gZXhwYW5kZWRTZWN0aW9ucy5oYXMoJ25vdGVzJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnLCBwYWRkaW5nOiAnc21hbGwnLCBib3JkZXJSYWRpdXM6ICdtZWRpdW0nIH19PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgICBvbkNoYW5nZT17b25Ub2dnbGV9XG4gICAgICAgICAgYXJpYS1sYWJlbD17aXRlbS5pdGVtfVxuICAgICAgICAvPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJywgd2lkdGg6ICdmaWxsJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIHtpdGVtLml0ZW19XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIHthdXRvUG9wdWxhdGVkICYmIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkZST00gU1RSSVBFPC9CYWRnZT59XG4gICAgICAgICAgICB7Z2V0Q2F0ZWdvcnlCYWRnZShpdGVtLmNhdGVnb3J5KX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2h5IHRoaXMgbWF0dGVyc1wiXG4gICAgICAgICAgICAgIGV4cGFuZGVkPXt3aHlFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aHknKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7aXRlbS53aGVyZV90b19maW5kICYmIChcbiAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICBsYWJlbD1cIldoZXJlIHRvIGZpbmQgdGhpc1wiXG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doZXJlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aGVyZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPXtub3RlcyA/ICdZb3VyIG5vdGVzJyA6ICdBZGQgbm90ZXMnfVxuICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdub3RlcycpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgICAge3doeUV4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtpdGVtLndoeV9tYXR0ZXJzfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt3aGVyZUV4cGFuZGVkICYmIGl0ZW0ud2hlcmVfdG9fZmluZCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkxlZnQ6ICd4bGFyZ2UnLCBwYWRkaW5nOiAnc21hbGwnLCBib3JkZXJSYWRpdXM6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7aXRlbS53aGVyZV90b19maW5kfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtub3Rlc0V4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScgfX0+XG4gICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICBsYWJlbD1cIllvdXIgbm90ZXNcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIHRyYWNraW5nICMsIGZpbGUgbmFtZSwgd2hlcmUgdG8gZmluZCB0aGlzLi4uXCJcbiAgICAgICAgICAgIHZhbHVlPXtub3Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Ob3Rlc0NoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrbGlzdEl0ZW07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU2VsZWN0LFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG4gIEJhbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVDYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZUNhcmQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5U3RhdGUnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCYW5uZXInO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgaXNSZXNvbHZlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFZpZXdTdGF0ZSA9ICdsb2FkaW5nJyB8ICdlcnJvcicgfCAncmVhZHknO1xudHlwZSBTdGF0dXNGaWx0ZXIgPSAnYWxsJyB8ICduZWVkc19yZXNwb25zZScgfCAndW5kZXJfcmV2aWV3JyB8ICdyZXNvbHZlZCc7XG5cbmNvbnN0IEZJTFRFUl9PUFRJT05TOiB7IHZhbHVlOiBTdGF0dXNGaWx0ZXI7IGxhYmVsOiBzdHJpbmcgfVtdID0gW1xuICB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwgZGlzcHV0ZXMnIH0sXG4gIHsgdmFsdWU6ICduZWVkc19yZXNwb25zZScsIGxhYmVsOiAnTmVlZHMgcmVzcG9uc2UnIH0sXG4gIHsgdmFsdWU6ICd1bmRlcl9yZXZpZXcnLCBsYWJlbDogJ1VuZGVyIHJldmlldycgfSxcbiAgeyB2YWx1ZTogJ3Jlc29sdmVkJywgbGFiZWw6ICdSZXNvbHZlZCcgfSxcbl07XG5cbmZ1bmN0aW9uIG1hdGNoZXNGaWx0ZXIoZGlzcHV0ZTogRGlzcHV0ZSwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBib29sZWFuIHtcbiAgc3dpdGNoIChmaWx0ZXIpIHtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnbmVlZHNfcmVzcG9uc2UnOlxuICAgICAgcmV0dXJuIGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBkaXNwdXRlLnN0YXR1cyA9PT0gJ3VuZGVyX3JldmlldycgfHwgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX3VuZGVyX3Jldmlldyc7XG4gICAgY2FzZSAncmVzb2x2ZWQnOlxuICAgICAgcmV0dXJuIGlzUmVzb2x2ZWQoZGlzcHV0ZS5zdGF0dXMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb3VudFRleHQoY291bnQ6IG51bWJlciwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBzdHJpbmcge1xuICBjb25zdCBub3VuID0gY291bnQgPT09IDEgPyAnZGlzcHV0ZScgOiAnZGlzcHV0ZXMnO1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gbmVlZGluZyByZXNwb25zZWA7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gdW5kZXIgcmV2aWV3YDtcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHJlc29sdmVkYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAke2NvdW50fSAke25vdW59YDtcbiAgfVxufVxuXG5jb25zdCBEaXNwdXRlTGlzdFZpZXcgPSAoY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIGNvbnN0IHsgZW52aXJvbm1lbnQsIHVzZXJDb250ZXh0IH0gPSBjb250ZXh0O1xuICBjb25zdCBbdmlld1N0YXRlLCBzZXRWaWV3U3RhdGVdID0gdXNlU3RhdGU8Vmlld1N0YXRlPignbG9hZGluZycpO1xuICBjb25zdCBbZGlzcHV0ZXMsIHNldERpc3B1dGVzXSA9IHVzZVN0YXRlPERpc3B1dGVbXT4oW10pO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3RhdHVzRmlsdGVyLCBzZXRTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGU8U3RhdHVzRmlsdGVyPignYWxsJyk7XG5cbiAgY29uc3QgW3NlbGVjdGVkRGlzcHV0ZSwgc2V0U2VsZWN0ZWREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZXMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGVbXSB9PignL2FwaS9kaXNwdXRlcycsIGNvbnRleHRSZWYuY3VycmVudCk7XG4gICAgICBzZXREaXNwdXRlcyhyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgQXBpRXJyb3JcbiAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZXMuIFBsZWFzZSB0cnkgYWdhaW4uJztcbiAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlcygpO1xuICB9LCBbbG9hZERpc3B1dGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0RGlzcHV0ZSA9IChkaXNwdXRlOiBEaXNwdXRlKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWREaXNwdXRlKGRpc3B1dGUpO1xuICAgIHNldFNob3dXb3JrZmxvdyh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbG9zZVdvcmtmbG93ID0gKHNob3duOiBib29sZWFuKSA9PiB7XG4gICAgc2V0U2hvd1dvcmtmbG93KHNob3duKTtcbiAgICBpZiAoIXNob3duKSBzZXRTZWxlY3RlZERpc3B1dGUobnVsbCk7XG4gIH07XG5cbiAgLy8gU29ydCBieSBkZWFkbGluZSAoc29vbmVzdCBmaXJzdClcbiAgY29uc3Qgc29ydGVkRGlzcHV0ZXMgPSBbLi4uZGlzcHV0ZXNdLnNvcnQoXG4gICAgKGEsIGIpID0+IG5ldyBEYXRlKGEuZHVlX2J5KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZV9ieSkuZ2V0VGltZSgpLFxuICApO1xuXG4gIGNvbnN0IGZpbHRlcmVkRGlzcHV0ZXMgPSBzb3J0ZWREaXNwdXRlcy5maWx0ZXIoKGQpID0+IG1hdGNoZXNGaWx0ZXIoZCwgc3RhdHVzRmlsdGVyKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCIgZGVzY3JpcHRpb249XCJHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uXCI+XG4gICAgICB7dmlld1N0YXRlID09PSAnbG9hZGluZycgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTG9hZGluZyBkaXNwdXRlcy4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdlcnJvcicgJiYgKFxuICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JNZXNzYWdlfSAvPlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ3JlYWR5JyAmJiAoXG4gICAgICAgIDxUYWJzIGZpdHRlZCBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICA8VGFiIGlkPVwiZGlzcHV0ZXNcIj5EaXNwdXRlczwvVGFiPlxuICAgICAgICAgICAgPFRhYiBpZD1cImluc2lnaHRzXCI+SW5zaWdodHM8L1RhYj5cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImRpc3B1dGVzXCI+XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdzbWFsbCcsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICB7ZGlzcHV0ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPEVtcHR5U3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJObyBkaXNwdXRlcyB5ZXRcIlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldoZW4gYSBkaXNwdXRlIGNvbWVzIGluLCB3ZSdsbCB3YWxrIHlvdSB0aHJvdWdoIGV4YWN0bHkgd2hhdCB0byBkby5cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5FbGVtZW50cz17WydsYWJlbCddfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUgYXMgU3RhdHVzRmlsdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtGSUxURVJfT1BUSU9OUy5tYXAoKG9wdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZ1RvcDogJ3NtYWxsJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDb3VudFRleHQoZmlsdGVyZWREaXNwdXRlcy5sZW5ndGgsIHN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZERpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBObyB7RklMVEVSX09QVElPTlMuZmluZCgobykgPT4gby52YWx1ZSA9PT0gc3RhdHVzRmlsdGVyKT8ubGFiZWwudG9Mb3dlckNhc2UoKX0gZGlzcHV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZERpc3B1dGVzLm1hcCgoZGlzcHV0ZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPERpc3B1dGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpID0+IGhhbmRsZVNlbGVjdERpc3B1dGUoZGlzcHV0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJpbnNpZ2h0c1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkluc2lnaHRzXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2luIHJhdGUgYW5hbHl0aWNzIGFuZCBkaXNwdXRlIHBhdHRlcm5zIHdpbGwgYXBwZWFyIGhlcmUuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgQ29taW5nIGluIFdJTi0yMiBhbmQgV0lOLTIzLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgICl9XG5cbiAgICAgIHtzZWxlY3RlZERpc3B1dGUgJiYgKFxuICAgICAgICA8RGlzcHV0ZVdvcmtmbG93XG4gICAgICAgICAgZGlzcHV0ZT17c2VsZWN0ZWREaXNwdXRlfVxuICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgICBzZXRTaG93bj17aGFuZGxlQ2xvc2VXb3JrZmxvd31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVMaXN0VmlldztcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBCdXR0b24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UsIGdldFVyZ2VuY3lCYWRnZSB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmludGVyZmFjZSBEaXNwdXRlQ2FyZFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgb25TZWxlY3Q6IChkaXNwdXRlSWQ6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QW1vdW50KGFtb3VudDogbnVtYmVyLCBjdXJyZW5jeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5LnRvVXBwZXJDYXNlKCksXG4gIH0pLmZvcm1hdChhbW91bnQgLyAxMDApO1xufVxuXG5jb25zdCBEaXNwdXRlQ2FyZCA9ICh7IGRpc3B1dGUsIG9uU2VsZWN0IH06IERpc3B1dGVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHVyZ2VuY3lCYWRnZSA9IGdldFVyZ2VuY3lCYWRnZShkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgb25QcmVzcz17KCkgPT4gb25TZWxlY3QoZGlzcHV0ZS5pZCl9XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3hzbWFsbCcsXG4gICAgICAgICAgd2lkdGg6ICdmaWxsJyxcbiAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPXt1cmdlbmN5QmFkZ2UudHlwZX0+e3VyZ2VuY3lCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8ICdVbmtub3duIGN1c3RvbWVyJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9IHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZUNhcmQ7XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeFxuXG5pbXBvcnQgeyBCb3gsIEljb24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBFbXB0eVN0YXRlUHJvcHMge1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5jb25zdCBFbXB0eVN0YXRlID0gKHsgdGl0bGUsIGRlc2NyaXB0aW9uIH06IEVtcHR5U3RhdGVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGNzcz17e1xuICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICBhbGlnblg6ICdjZW50ZXInLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHtkZXNjcmlwdGlvbn1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlTdGF0ZTtcbiIsICJpbXBvcnQge1xuICBCb3gsXG4gIEJhbm5lcixcbiAgSW5saW5lLFxuICBTZXR0aW5nc1ZpZXcsXG4gIERpdmlkZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcblxuY29uc3QgQXBwU2V0dGluZ3MgPSAoeyBlbnZpcm9ubWVudCwgdXNlckNvbnRleHQgfTogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFNldHRpbmdzVmlldz5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScsIHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgU3Vic2NyaXB0aW9uIG1hbmFnZW1lbnQgd2lsbCBiZSBhdmFpbGFibGUgaGVyZS4gQ29taW5nIGluIFdJTi0yNC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEFjY291bnRcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIENvbm5lY3RlZCBTdHJpcGUgYWNjb3VudCBpbmZvcm1hdGlvbiB3aWxsIGFwcGVhciBoZXJlLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgQWJvdXQgV2luQmFja1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5cbiAgICAgICAgICAgIFZlcnNpb24gMC4wLjFcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEd1aWRlZCBkaXNwdXRlIHJlc29sdXRpb24gZm9yIFN0cmlwZSBtZXJjaGFudHMuIEJ1aWx0IGJ5IEpLQiBUZWNoLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvU2V0dGluZ3NWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwU2V0dGluZ3M7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxjQUFjO0FBQ3RCLGNBQVEsY0FBYztBQUFBO0FBQUE7OztBQ0h0QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxL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QTtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLEVBQ2I7IiwKICAibmFtZXMiOiBbImZldGNoIiwgImZldGNoU3RyaXBlU2lnbmF0dXJlIiwgInJlcXVpcmVfc2lnbmF0dXJlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiX2EiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZm9ybWF0QW1vdW50IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
