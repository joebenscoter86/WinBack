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
  var import_react11 = __require("react");
  var import_ui18 = __toESM(require_ui());

  // src/components/DisputeWorkflow.tsx
  var import_react10 = __require("react");
  var import_ui17 = __toESM(require_ui());

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
  var USE_LOCAL_BACKEND = false;
  var BACKEND_URL = USE_LOCAL_BACKEND ? "http://localhost:3000" : "https://winbackpay.com";
  var ApiError = class extends Error {
    constructor(message, status, code) {
      super(message);
      this.status = status;
      this.code = code;
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
          error.error || error.message || `API error: ${response.status}`,
          response.status,
          error.code
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
          error.error || error.message || `API error: ${response.status}`,
          response.status,
          error.code
        );
      }
      return response.json();
    });
  }
  function deleteBackend(path, context) {
    return __async(this, null, function* () {
      var _a, _b;
      const signature = yield (0, import_signature.default)();
      const body = JSON.stringify({
        user_id: (_a = context.userContext) == null ? void 0 : _a.id,
        account_id: (_b = context.userContext) == null ? void 0 : _b.account.id
      });
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
          error.error || error.message || `API error: ${response.status}`,
          response.status,
          error.code
        );
      }
      return response.json();
    });
  }

  // src/lib/utils.ts
  var REASON_CODE_LABELS = {
    "visa:10.4": "Fraud -- Card Not Present",
    "visa:13.1": "Merchandise / Services Not Received",
    "visa:13.2": "Cancelled Recurring Transaction",
    "visa:13.3": "Not as Described or Defective",
    "visa:13.6": "Credit Not Processed",
    "mastercard:4808": "Authorization-Related Dispute",
    "mastercard:4853": "Not as Described / Defective"
  };
  function getReasonCodeLabel(network, reasonCode) {
    var _a;
    return (_a = REASON_CODE_LABELS[`${network}:${reasonCode}`]) != null ? _a : null;
  }
  var RESOLVED_STATUSES = ["won", "lost", "warning_closed", "charge_refunded"];
  function isResolved(status) {
    return RESOLVED_STATUSES.includes(status);
  }
  function isDisputeExpired(dueBy, status) {
    if (status !== "needs_response" && status !== "warning_needs_response") {
      return false;
    }
    return getTimeRemaining(dueBy).isExpired;
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
  function getTimeRemaining(dueBy) {
    const totalMs = new Date(dueBy).getTime() - Date.now();
    if (totalMs <= 0)
      return { days: 0, hours: 0, isExpired: true };
    const totalHours = Math.floor(totalMs / (1e3 * 60 * 60));
    return {
      days: Math.floor(totalHours / 24),
      hours: totalHours % 24,
      isExpired: false
    };
  }
  function getUrgencyTier(days) {
    if (days < 5)
      return "urgent";
    if (days <= 13)
      return "warning";
    return "positive";
  }
  function getUrgencyBadge(dueBy, status) {
    if (isResolved(status))
      return null;
    const time = getTimeRemaining(dueBy);
    const tier = getUrgencyTier(time.days);
    if (time.isExpired)
      return { label: "Expired", type: "urgent" };
    if (time.days < 5)
      return { label: `${time.days}d ${time.hours}h left`, type: tier };
    return { label: `${time.days}d left`, type: tier };
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

  // src/components/DeadlineTimer.tsx
  var import_react = __require("react");
  var import_ui2 = __toESM(require_ui());
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  var DeadlineTimer = ({ dueBy, status }) => {
    const [, setTick] = (0, import_react.useState)(0);
    (0, import_react.useEffect)(() => {
      const id = setInterval(() => setTick((t) => t + 1), 6e4);
      return () => clearInterval(id);
    }, [dueBy]);
    if (!dueBy || isResolved(status))
      return null;
    const time = getTimeRemaining(dueBy);
    const tier = getUrgencyTier(time.days);
    const isUrgent = time.days < 5 && !time.isExpired;
    const label = time.isExpired ? "Deadline passed" : time.days === 0 ? `${time.hours}h remaining` : `${time.days}d ${time.hours}h remaining`;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
      css: {
        stack: "x",
        gap: "small",
        distribute: "space-between",
        alignY: "center",
        backgroundColor: "container",
        padding: "small",
        borderRadius: "medium"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Inline, {
          css: { font: "caption", fontWeight: "semibold", color: isUrgent ? "critical" : "secondary" },
          children: isUrgent ? "Respond now" : "Response deadline"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Badge, {
          type: time.isExpired ? "urgent" : tier,
          children: label
        })
      ]
    });
  };
  var DeadlineTimer_default = DeadlineTimer;

  // src/components/review/DisputeOverview.tsx
  var import_ui3 = __toESM(require_ui());
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  function InfoRow({ label, value }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
      css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
          css: { font: "caption", color: "secondary" },
          children: label
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
      css: { stack: "y", gap: "medium", backgroundColor: "container", padding: "medium", borderRadius: "medium" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
              css: { font: "heading", fontWeight: "bold" },
              children: formatAmount(dispute.amount, dispute.currency)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Badge, {
              type: statusBadge.type,
              children: statusBadge.label
            })
          ]
        }),
        (dispute.customer_name || dispute.customer_email) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            dispute.customer_name && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Customer",
              value: dispute.customer_name
            }),
            dispute.customer_email && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Email",
              value: dispute.customer_email
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Divider, {}),
        loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Box, {
          css: { padding: "small", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Spinner, {})
        }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            dispute.card_brand && dispute.card_last4 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Card",
              value: `${dispute.card_brand.charAt(0).toUpperCase() + dispute.card_brand.slice(1)} ending in ${dispute.card_last4}`
            }),
            dispute.transaction_date && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Transaction date",
              value: formatDate(dispute.transaction_date)
            }),
            dispute.charge_description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Description",
              value: dispute.charge_description
            }),
            dispute.billing_address && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Billing address",
              value: dispute.billing_address
            }),
            dispute.receipt_url && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
              label: "Receipt",
              value: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
                href: dispute.receipt_url,
                target: "_blank",
                children: "View receipt"
              })
            }),
            dispute.metadata && Object.keys(dispute.metadata).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, {
              children: Object.entries(dispute.metadata).map(([key, val]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(InfoRow, {
                label: key,
                value: val
              }, key))
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { stack: "y", gap: "xxsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Inline, {
              css: { font: "caption", color: "disabled" },
              children: [
                "Dispute: ",
                dispute.id
              ]
            }),
            dispute.charge_id && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Inline, {
              css: { font: "caption", color: "disabled" },
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
  var import_ui4 = __toESM(require_ui());
  var import_jsx_runtime4 = __require("react/jsx-runtime");
  var CoachHeader = ({ headline, summary, urgencyMode, daysRemaining }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui4.Box, {
      css: { stack: "y", gap: "small", backgroundColor: "container", padding: "medium", borderRadius: "medium" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Badge, {
          type: "info",
          children: "AI Coach"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Inline, {
          css: { font: "heading", fontWeight: "semibold" },
          children: headline
        }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui4.Inline, {
          css: { font: "body", color: "secondary" },
          children: urgencyMode && daysRemaining !== void 0 ? `You have ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. Focus on the essentials below.` : summary
        })
      ]
    });
  };
  var CoachHeader_default = CoachHeader;

  // src/components/review/QuickActions.tsx
  var import_ui5 = __toESM(require_ui());
  var import_jsx_runtime5 = __require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Box, {
      css: { stack: "y", gap: "medium" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
          css: { font: "subheading", fontWeight: "semibold" },
          children: urgencyMode ? "Focus on these essentials" : "Your next steps"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: items.map((text, index) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Box, {
            css: {
              stack: "x",
              gap: "small",
              alignY: "center",
              backgroundColor: "surface",
              padding: "small",
              borderRadius: "small"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Box, {
                css: {
                  alignX: "center",
                  alignY: "center",
                  width: "1/12"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui5.Inline, {
                  css: { font: "caption", fontWeight: "bold", color: "secondary" },
                  children: [
                    index + 1,
                    "."
                  ]
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
                css: { font: "body" },
                children: text
              })
            ]
          }, index))
        }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_ui5.Inline, {
          css: { font: "caption", color: "secondary" },
          children: "Don't worry, we'll walk you through each of these on the next step."
        })
      ]
    });
  };
  var QuickActions_default = QuickActions;

  // src/components/review/LearnMore.tsx
  var import_ui6 = __toESM(require_ui());
  var import_jsx_runtime6 = __require("react/jsx-runtime");
  var LearnMore = ({ issuerSummary, acquirerSummary }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Accordion, {
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.AccordionItem, {
        title: "Why this matters",
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
          css: { stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
              css: { stack: "y", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: "What the bank checks"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Inline, {
                  css: { font: "body", color: "secondary" },
                  children: issuerSummary
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui6.Box, {
              css: { stack: "y", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: "What happens to your response"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ui6.Inline, {
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

  // src/components/evidence/EvidenceChecklist.tsx
  var import_react4 = __require("react");
  var import_ui10 = __toESM(require_ui());

  // src/lib/stripe-field-status.ts
  function formatCheckValue(raw) {
    if (!raw)
      return "Not checked";
    switch (raw) {
      case "pass":
        return "Match";
      case "fail":
        return "No match";
      case "unavailable":
        return "Not checked";
      case "unchecked":
        return "Not checked";
      default:
        return raw;
    }
  }
  function formatDate2(ts) {
    return new Date(ts * 1e3).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
  function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency != null ? currency : "usd"
    }).format(amount / 100);
  }
  function getStripeFieldResult(item, dispute) {
    const field = item.stripe_field;
    if (!field)
      return null;
    switch (field) {
      case "avs_result": {
        const addr = dispute.avs_address_check;
        const zip = dispute.avs_zip_check;
        if (!addr && !zip)
          return {
            status: "unavailable",
            value: "Not collected at checkout",
            guidance: "Address verification wasn't run on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead."
          };
        const addrFail = addr === "fail";
        const zipFail = zip === "fail";
        if (addrFail && zipFail)
          return {
            status: "negative",
            value: "Address: no match, ZIP: no match",
            guidance: "The billing address didn't match what the bank has on file. The issuer will see this automatically -- it weakens your case. Focus on strengthening other evidence to compensate."
          };
        if (addrFail || zipFail)
          return {
            status: "negative",
            value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
            guidance: "Partial address match -- one element didn't match. The issuer will see this. It's not as damaging as a full mismatch, but strengthen your other evidence to compensate."
          };
        return {
          status: "positive",
          value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      }
      case "cvc_check": {
        const cvc = dispute.cvc_check;
        if (!cvc || cvc === "unavailable" || cvc === "unchecked")
          return {
            status: "unavailable",
            value: "Not collected at checkout",
            guidance: "The security code (CVV) wasn't verified on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead."
          };
        if (cvc === "fail")
          return {
            status: "negative",
            value: "CVV: no match",
            guidance: "The CVV check failed on this transaction -- the code entered didn't match. The issuer will see this automatically and it hurts your case. Focus on strengthening other evidence to compensate."
          };
        return {
          status: "positive",
          value: "CVV verified",
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      }
      case "three_d_secure": {
        const result = dispute.three_d_secure_result;
        if (!result)
          return {
            status: "unavailable",
            value: "Not used on this transaction",
            guidance: "3D Secure wasn't used on this transaction. This is the single strongest defense for fraud disputes -- consider enabling it for future transactions. For this dispute, focus on the other evidence items."
          };
        const version = dispute.three_d_secure_version;
        if (result === "authenticated")
          return {
            status: "positive",
            value: version ? `Verified by bank (3DS v${version})` : "Verified by bank (3DS)",
            guidance: "We pulled this from your transaction -- you're covered here. This is your strongest piece of evidence."
          };
        if (result === "attempt_acknowledged")
          return {
            status: "positive",
            value: "Bank verification attempted",
            guidance: "We pulled this from your transaction -- the bank acknowledged the 3DS attempt, which still provides liability shift in most cases."
          };
        return {
          status: "positive",
          value: `3DS result: ${result}`,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      }
      case "authorization": {
        const code = dispute.authorization_code;
        const status = dispute.network_status;
        if (!code && !status)
          return null;
        if (status === "declined_by_network")
          return {
            status: "negative",
            value: "Declined by network",
            guidance: "The authorization was declined by the network. This is unusual for a completed charge -- contact support if this doesn't look right."
          };
        if (code && status === "approved_by_network")
          return {
            status: "positive",
            value: `Approved (auth code: ${code})`,
            guidance: "We pulled this from your transaction -- you're covered here."
          };
        if (code)
          return {
            status: "positive",
            value: `Auth code: ${code}`,
            guidance: "We pulled this from your transaction -- you're covered here."
          };
        if (status === "approved_by_network")
          return {
            status: "positive",
            value: "Approved by network",
            guidance: "We pulled this from your transaction -- you're covered here."
          };
        return {
          status: "positive",
          value: `Network status: ${status}`,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      }
      case "customer_email":
        if (!dispute.customer_email)
          return null;
        return {
          status: "positive",
          value: dispute.customer_email,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      case "billing_address":
        if (!dispute.billing_address)
          return null;
        return {
          status: "positive",
          value: dispute.billing_address,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      case "transaction_date":
        if (!dispute.transaction_date)
          return null;
        return {
          status: "positive",
          value: formatDate2(dispute.transaction_date),
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      case "receipt_url":
        if (!dispute.receipt_url)
          return null;
        return {
          status: "positive",
          value: "Receipt available",
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      case "refund_data": {
        const refunds = dispute.refunds;
        if (!refunds || refunds.length === 0)
          return null;
        const r = refunds[0];
        return {
          status: "positive",
          value: `Refund of ${formatCurrency(r.amount, dispute.currency)} on ${formatDate2(r.created)}`,
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      }
      case "calculated_statement_descriptor":
        return {
          status: "positive",
          value: "Covered by your Stripe transaction data",
          guidance: "We pulled this from your transaction -- you're covered here."
        };
      default:
        return {
          status: "positive",
          value: "Covered by your Stripe transaction data",
          guidance: "We pulled this from your transaction -- you're covered here."
        };
    }
  }

  // src/components/evidence/ChecklistProgress.tsx
  var import_ui7 = __toESM(require_ui());
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  function getProgressWidth(completed, total) {
    if (total === 0 || completed === 0)
      return null;
    if (completed >= total)
      return "fill";
    const twelfths = Math.max(1, Math.round(completed / total * 12));
    return `${twelfths}/12`;
  }
  var ChecklistProgress = ({ completed, total }) => {
    const progressWidth = getProgressWidth(completed, total);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
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
        }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Box, {
          css: { backgroundColor: "container", borderRadius: "rounded", overflow: "hidden" },
          children: progressWidth ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Box, {
            css: {
              backgroundColor: "surface",
              borderRadius: "rounded",
              width: progressWidth,
              padding: "xxsmall"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
              children: " "
            })
          }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Box, {
            css: { padding: "xxsmall" },
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
              children: " "
            })
          })
        })
      ]
    });
  };
  var ChecklistProgress_default = ChecklistProgress;

  // src/components/evidence/ChecklistItem.tsx
  var import_react3 = __require("react");
  var import_ui9 = __toESM(require_ui());

  // src/components/evidence/FileUploadSection.tsx
  var import_react2 = __require("react");
  var import_ui8 = __toESM(require_ui());
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  function formatFileSize(bytes) {
    if (bytes < 1024)
      return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  var EXTENSION_TO_MIME = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    csv: "text/csv",
    txt: "text/plain",
    heic: "image/heic",
    heif: "image/heif"
  };
  function normalizeMimeType(type, filename) {
    const t = (type != null ? type : "").toLowerCase().trim();
    if (t.includes("/"))
      return t;
    if (t && EXTENSION_TO_MIME[t])
      return EXTENSION_TO_MIME[t];
    const name = (filename != null ? filename : "").toLowerCase();
    const dot = name.lastIndexOf(".");
    if (dot >= 0) {
      const ext = name.slice(dot + 1);
      if (EXTENSION_TO_MIME[ext])
        return EXTENSION_TO_MIME[ext];
    }
    return "application/octet-stream";
  }
  function getMimeLabel(mimeType) {
    var _a;
    const map = {
      "application/pdf": "PDF",
      "image/png": "PNG",
      "image/jpeg": "JPG",
      "image/gif": "GIF",
      "text/csv": "CSV",
      "text/plain": "TXT"
    };
    return (_a = map[mimeType]) != null ? _a : "FILE";
  }
  var FileUploadSection = ({
    disputeId,
    checklistItemKey,
    existingFile,
    context,
    onFileChange,
    submitted
  }) => {
    const [error, setError] = (0, import_react2.useState)(null);
    const [showReplace, setShowReplace] = (0, import_react2.useState)(false);
    const [saving, setSaving] = (0, import_react2.useState)(false);
    const handleUploadComplete = (fileObject) => __async(void 0, null, function* () {
      var _a;
      setError(null);
      const normalizedMime = normalizeMimeType(fileObject.type, fileObject.filename);
      if (normalizedMime === "image/heic" || normalizedMime === "image/heif") {
        setError(
          "HEIC photos aren't supported. Open the file in Preview or your photo app, export it as JPEG or PNG, and try again."
        );
        return;
      }
      setSaving(true);
      try {
        const result = yield fetchBackend(
          `/api/disputes/${disputeId}/evidence-files`,
          context,
          {
            checklist_item_key: checklistItemKey,
            stripe_file_id: fileObject.id,
            file_name: (_a = fileObject.filename) != null ? _a : "untitled",
            file_size: fileObject.size,
            mime_type: normalizedMime
          }
        );
        onFileChange(result.data);
        setShowReplace(false);
      } catch (err) {
        setError("Failed to save file record. The file was uploaded to Stripe but we could not link it. Try again.");
      } finally {
        setSaving(false);
      }
    });
    const handleUploadError = () => {
      setError("Upload failed. Check your file is under 10MB and a supported type (PDF, PNG, JPG, GIF, CSV, TXT).");
    };
    const handleRemove = () => __async(void 0, null, function* () {
      if (!existingFile)
        return;
      setError(null);
      try {
        yield deleteBackend(
          `/api/disputes/${disputeId}/evidence-files/${existingFile.id}`,
          context
        );
        onFileChange(null);
      } catch (err) {
        setError("Failed to remove file. Try again.");
      }
    });
    if (submitted) {
      if (existingFile) {
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
          css: { stack: "x", gap: "xsmall", alignY: "center", wrap: "wrap" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Icon, {
              name: "check",
              size: "xsmall"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
              css: { font: "caption", fontWeight: "semibold" },
              children: existingFile.file_name
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
              type: "info",
              children: getMimeLabel(existingFile.mime_type)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
              css: { font: "caption", color: "secondary" },
              children: formatFileSize(existingFile.file_size)
            })
          ]
        });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
        css: { font: "caption", color: "secondary" },
        children: "No file attached"
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
      css: { stack: "y", gap: "xsmall" },
      children: [
        error && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Banner, {
          type: "critical",
          title: "Upload issue",
          description: error,
          onDismiss: () => setError(null)
        }),
        existingFile && !showReplace ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
              css: { stack: "x", gap: "xsmall", alignY: "center", wrap: "wrap" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Icon, {
                  name: "check",
                  size: "xsmall"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                  css: { font: "caption", fontWeight: "semibold" },
                  children: existingFile.file_name
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
                  type: "info",
                  children: getMimeLabel(existingFile.mime_type)
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: formatFileSize(existingFile.file_size)
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
              css: { stack: "x", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Link, {
                  onPress: () => setShowReplace(true),
                  children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                    css: { font: "caption", color: "info" },
                    children: "Replace"
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Link, {
                  onPress: handleRemove,
                  children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                    css: { font: "caption", color: "critical" },
                    children: "Remove"
                  })
                })
              ]
            })
          ]
        }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            showReplace && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Link, {
              onPress: () => setShowReplace(false),
              children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Cancel replace"
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.StripeFileUploader, {
              label: saving ? "Saving..." : "Choose file",
              purpose: "dispute_evidence",
              onComplete: handleUploadComplete,
              onError: handleUploadError
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "PDF, PNG, JPG, or GIF. Max 10MB."
            })
          ]
        })
      ]
    });
  };
  var FileUploadSection_default = FileUploadSection;

  // src/components/evidence/ChecklistItem.tsx
  var import_jsx_runtime9 = __require("react/jsx-runtime");
  function getCategoryBadge(category) {
    switch (category) {
      case "mandatory":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "negative",
          children: "REQUIRED"
        });
      case "recommended":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "warning",
          children: "HELPFUL"
        });
      case "situational":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "neutral",
          children: "IF APPLICABLE"
        });
    }
  }
  function getStripeStatusBadge(result) {
    switch (result.status) {
      case "positive":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "info",
          children: "FROM STRIPE"
        });
      case "unavailable":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "neutral",
          children: "NOT AVAILABLE"
        });
      case "negative":
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
          type: "warning",
          children: "HEADS UP"
        });
    }
  }
  var SectionToggle = ({ label, expanded, onPress }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Link, {
    onPress,
    children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
      css: { stack: "x", gap: "xxsmall", alignY: "center" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
          css: { font: "caption", color: "info" },
          children: label
        }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Icon, {
          name: expanded ? "chevronUp" : "chevronDown",
          size: "xsmall"
        })
      ]
    })
  });
  var ChecklistItem = ({
    item,
    checked,
    stripeFieldResult,
    expandedSections,
    notes,
    existingFile,
    disputeId,
    context,
    onToggle,
    onSectionToggle,
    onNotesChange,
    onSaveNotes,
    onFileChange,
    submitted
  }) => {
    const whyExpanded = expandedSections.has("why");
    const whereExpanded = expandedSections.has("where");
    const notesExpanded = expandedSections.has("notes");
    const fileExpanded = expandedSections.has("file");
    const [justSaved, setJustSaved] = (0, import_react3.useState)(false);
    const handleSaveClick = () => {
      if (onSaveNotes)
        onSaveNotes();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2e3);
    };
    const isUnavailable = (stripeFieldResult == null ? void 0 : stripeFieldResult.status) === "unavailable";
    const isNegative = (stripeFieldResult == null ? void 0 : stripeFieldResult.status) === "negative";
    const isPositive = (stripeFieldResult == null ? void 0 : stripeFieldResult.status) === "positive";
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
      css: {
        stack: "y",
        gap: "small",
        padding: "small",
        borderRadius: "medium",
        backgroundColor: "container"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { stack: "x", gap: "small", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Checkbox, {
              label: "",
              checked,
              onChange: onToggle,
              disabled: isUnavailable || isPositive || submitted,
              "aria-label": item.item
            }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
              css: { stack: "y", gap: "xxsmall", width: "fill" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
                  css: { stack: "x", gap: "xsmall", alignY: "center", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                      css: {
                        font: "body",
                        fontWeight: "semibold",
                        color: isUnavailable ? "disabled" : checked ? "secondary" : void 0
                      },
                      children: item.item
                    }),
                    stripeFieldResult && getStripeStatusBadge(stripeFieldResult),
                    getCategoryBadge(item.category)
                  ]
                }),
                stripeFieldResult && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                  css: {
                    font: "caption",
                    color: isNegative ? "attention" : "secondary"
                  },
                  children: stripeFieldResult.value
                }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
                  css: { stack: "x", gap: "small", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: "Why this matters",
                      expanded: whyExpanded,
                      onPress: () => onSectionToggle("why")
                    }),
                    (item.where_to_find || stripeFieldResult) && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: stripeFieldResult ? "Details" : "Where to find this",
                      expanded: whereExpanded,
                      onPress: () => onSectionToggle("where")
                    }),
                    item.narrative_only && !submitted ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: notes ? "Your notes" : "Add detail",
                      expanded: notesExpanded,
                      onPress: () => onSectionToggle("notes")
                    }) : !isUnavailable && !isPositive && !submitted ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                          label: notes ? "Your notes" : "Add notes",
                          expanded: notesExpanded,
                          onPress: () => onSectionToggle("notes")
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                          label: existingFile ? existingFile.file_name : "Attach file",
                          expanded: fileExpanded,
                          onPress: () => onSectionToggle("file")
                        })
                      ]
                    }) : null,
                    submitted && existingFile && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: existingFile.file_name,
                      expanded: fileExpanded,
                      onPress: () => onSectionToggle("file")
                    })
                  ]
                })
              ]
            })
          ]
        }),
        whyExpanded && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge", padding: "small", borderRadius: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
            css: { font: "caption", color: "secondary" },
            children: item.why_matters
          })
        }),
        whereExpanded && (item.where_to_find || stripeFieldResult) && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge", padding: "small", borderRadius: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
            css: { font: "caption", color: isNegative ? "attention" : "secondary" },
            children: stripeFieldResult ? stripeFieldResult.guidance : item.where_to_find
          })
        }),
        notesExpanded && !isUnavailable && !submitted && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { marginLeft: "xlarge", stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TextArea, {
              label: item.narrative_only ? "Add detail (optional)" : "Your notes",
              placeholder: item.narrative_only ? "In your own words, what should the narrative say about this?" : "e.g. tracking #, file name, where to find this...",
              value: notes,
              onChange: (e) => onNotesChange(e.target.value),
              rows: 2
            }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
              css: { stack: "x", gap: "small", alignY: "center" },
              children: [
                onSaveNotes && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Button, {
                  type: "secondary",
                  size: "small",
                  onPress: handleSaveClick,
                  children: "Save"
                }),
                justSaved && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                  css: { font: "caption", color: "success" },
                  children: "Saved"
                })
              ]
            }),
            item.narrative_only && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Optional. Add detail to strengthen this point. If left blank, your narrative will note this generally."
            })
          ]
        }),
        fileExpanded && !isUnavailable && !item.narrative_only && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FileUploadSection_default, {
            disputeId,
            checklistItemKey: item.key,
            existingFile,
            context,
            onFileChange,
            submitted
          })
        })
      ]
    });
  };
  var ChecklistItem_default = ChecklistItem;

  // src/components/evidence/EvidenceChecklist.tsx
  var import_jsx_runtime10 = __require("react/jsx-runtime");
  var CATEGORY_ORDER = ["mandatory", "recommended", "situational"];
  var CATEGORY_LABELS = {
    mandatory: "Mandatory",
    recommended: "Recommended",
    situational: "Situational"
  };
  function buildInitialState(items, dispute) {
    const state = {};
    for (const item of items) {
      state[item.key] = false;
      const result = getStripeFieldResult(item, dispute);
      if ((result == null ? void 0 : result.status) === "positive") {
        state[item.key] = true;
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
  var EvidenceChecklist = ({ dispute, playbook, context, isUrgent, daysRemaining, submitted }) => {
    var _a;
    const items = (_a = playbook == null ? void 0 : playbook.evidence_checklist) != null ? _a : [];
    const [checklistState, setChecklistState] = (0, import_react4.useState)(
      () => buildInitialState(items, dispute)
    );
    const [notesState, setNotesState] = (0, import_react4.useState)(
      () => {
        var _a2;
        return (_a2 = dispute.checklist_notes) != null ? _a2 : {};
      }
    );
    const [expandedSections, setExpandedSections] = (0, import_react4.useState)(
      () => {
        const initial = /* @__PURE__ */ new Map();
        for (const item of items) {
          if (item.narrative_only) {
            initial.set(item.key, /* @__PURE__ */ new Set(["notes"]));
          }
        }
        return initial;
      }
    );
    const [filesState, setFilesState] = (0, import_react4.useState)({});
    const [showFullChecklist, setShowFullChecklist] = (0, import_react4.useState)(false);
    const checklistTimeoutRef = (0, import_react4.useRef)(null);
    const notesTimeoutRef = (0, import_react4.useRef)(null);
    const contextRef = (0, import_react4.useRef)(context);
    contextRef.current = context;
    (0, import_react4.useEffect)(() => {
      var _a2;
      const nextChecklist = buildInitialState(items, dispute);
      setChecklistState(nextChecklist);
      latestChecklistRef.current = nextChecklist;
      const nextNotes = (_a2 = dispute.checklist_notes) != null ? _a2 : {};
      setNotesState(nextNotes);
      latestNotesRef.current = nextNotes;
      const nextExpanded = /* @__PURE__ */ new Map();
      for (const item of items) {
        if (item.narrative_only) {
          nextExpanded.set(item.key, /* @__PURE__ */ new Set(["notes"]));
        }
      }
      setExpandedSections(nextExpanded);
    }, [dispute.id, dispute.checklist_state, dispute.checklist_notes, playbook == null ? void 0 : playbook.reason_code]);
    (0, import_react4.useEffect)(() => {
      const fetchFiles = () => __async(void 0, null, function* () {
        try {
          const result = yield fetchBackend(
            `/api/disputes/${dispute.id}/evidence-files`,
            contextRef.current
          );
          const fileMap = {};
          for (const file of result.data) {
            fileMap[file.checklist_item_key] = file;
          }
          setFilesState(fileMap);
        } catch (err) {
          console.error("Failed to fetch evidence files:", err);
        }
      });
      fetchFiles();
    }, [dispute.id]);
    const latestChecklistRef = (0, import_react4.useRef)({});
    const persistChecklist = (0, import_react4.useCallback)((newState) => {
      latestChecklistRef.current = newState;
      if (checklistTimeoutRef.current) {
        clearTimeout(checklistTimeoutRef.current);
      }
      checklistTimeoutRef.current = setTimeout(() => {
        patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
          checklist_state: latestChecklistRef.current
        }).catch((err) => {
          console.error("Failed to save checklist state:", err);
        });
      }, 500);
    }, [dispute.id]);
    const latestNotesRef = (0, import_react4.useRef)({});
    const flushNotes = (0, import_react4.useCallback)(() => {
      if (notesTimeoutRef.current) {
        clearTimeout(notesTimeoutRef.current);
        notesTimeoutRef.current = null;
      }
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_notes: latestNotesRef.current
      }).catch((err) => {
        console.error("Failed to save checklist notes:", err);
      });
    }, [dispute.id]);
    const persistNotes = (0, import_react4.useCallback)((newNotes) => {
      latestNotesRef.current = newNotes;
      if (notesTimeoutRef.current) {
        clearTimeout(notesTimeoutRef.current);
        notesTimeoutRef.current = null;
      }
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_notes: newNotes
      }).catch((err) => {
        console.error("Failed to save checklist notes:", err);
      });
    }, [dispute.id]);
    (0, import_react4.useEffect)(() => {
      return () => {
        if (notesTimeoutRef.current) {
          clearTimeout(notesTimeoutRef.current);
          notesTimeoutRef.current = null;
          patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
            checklist_notes: latestNotesRef.current
          }).catch((err) => {
            console.error("Failed to flush checklist notes on unmount:", err);
          });
        }
        if (checklistTimeoutRef.current) {
          clearTimeout(checklistTimeoutRef.current);
          checklistTimeoutRef.current = null;
          patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
            checklist_state: latestChecklistRef.current
          }).catch((err) => {
            console.error("Failed to flush checklist state on unmount:", err);
          });
        }
      };
    }, [dispute.id]);
    const handleToggle = (0, import_react4.useCallback)((itemKey) => {
      setChecklistState((prev) => {
        const newState = __spreadProps(__spreadValues({}, prev), { [itemKey]: !prev[itemKey] });
        persistChecklist(newState);
        return newState;
      });
    }, [persistChecklist]);
    const handleNotesChange = (0, import_react4.useCallback)((itemKey, value) => {
      setNotesState((prev) => {
        const newNotes = __spreadProps(__spreadValues({}, prev), { [itemKey]: value });
        persistNotes(newNotes);
        return newNotes;
      });
    }, [persistNotes]);
    const handleFileChange = (0, import_react4.useCallback)((itemKey, file) => {
      setFilesState((prev) => __spreadProps(__spreadValues({}, prev), { [itemKey]: file }));
    }, []);
    const handleSectionToggle = (0, import_react4.useCallback)((itemKey, section) => {
      setExpandedSections((prev) => {
        var _a2;
        const next = new Map(prev);
        const sections = new Set((_a2 = prev.get(itemKey)) != null ? _a2 : []);
        if (sections.has(section)) {
          sections.delete(section);
        } else {
          sections.add(section);
        }
        next.set(itemKey, sections);
        return next;
      });
    }, []);
    if (!playbook || items.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Box, {
        css: { padding: "medium" },
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
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
    const completedItems = items.filter((item) => checklistState[item.key]).length;
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
      css: { padding: "medium", stack: "y", gap: "large" },
      children: [
        submitted ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
          type: "default",
          title: "Evidence submitted",
          description: "Your evidence has been submitted to Stripe. Files and checklist items are now read-only."
        }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
          type: "default",
          title: "Gather your evidence",
          description: "Here's what you'll need to build your case. Expand each item to see why it matters and jot down notes as you go."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChecklistProgress_default, {
          completed: completedItems,
          total: totalItems
        }),
        isUrgent && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
          css: { stack: "y", gap: "xsmall" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
              type: "caution",
              title: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left to respond`,
              description: showFullChecklist ? "Showing all evidence items." : "Showing only essential items to maximize your chances."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Link, {
              onPress: () => setShowFullChecklist(!showFullChecklist),
              children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
                css: { font: "caption", color: "info" },
                children: showFullChecklist ? "Show essentials only" : "View full checklist"
              })
            })
          ]
        }),
        grouped.map(({ category, label, items: groupItems }, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
          css: { stack: "y", gap: "small" },
          children: [
            groupIndex > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
              css: { font: "caption", fontWeight: "bold", color: "secondary", textTransform: "uppercase" },
              children: label
            }),
            groupItems.map((item) => {
              var _a2, _b, _c;
              const stripeResult = getStripeFieldResult(item, dispute);
              return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChecklistItem_default, {
                item,
                checked: !!checklistState[item.key],
                stripeFieldResult: stripeResult != null ? stripeResult : void 0,
                expandedSections: (_a2 = expandedSections.get(item.key)) != null ? _a2 : /* @__PURE__ */ new Set(),
                notes: (_b = notesState[item.key]) != null ? _b : "",
                existingFile: (_c = filesState[item.key]) != null ? _c : null,
                disputeId: dispute.id,
                context: contextRef.current,
                onToggle: () => handleToggle(item.key),
                onSectionToggle: (section) => handleSectionToggle(item.key, section),
                onNotesChange: (value) => handleNotesChange(item.key, value),
                onSaveNotes: flushNotes,
                onFileChange: (file) => handleFileChange(item.key, file),
                submitted
              }, item.key);
            })
          ]
        }, category)),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Divider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
          css: { font: "caption", color: "disabled" },
          children: "Your progress and notes are saved automatically."
        })
      ]
    });
  };
  var EvidenceChecklist_default = EvidenceChecklist;

  // src/components/narrative/NarrativePanel.tsx
  var import_react8 = __require("react");

  // src/lib/narrative-types.ts
  var MAX_GENERATIONS = 5;
  var POLL_INTERVAL_MS = 3e3;
  var MAX_POLL_DURATION_MS = 6e4;
  var FEEDBACK_TAGS = [
    { id: "too_formal", label: "Too formal" },
    { id: "missing_evidence", label: "Missing key evidence" },
    { id: "inaccurate", label: "Inaccurate details" },
    { id: "too_long", label: "Too long" },
    { id: "other", label: "Other" }
  ];

  // src/components/narrative/NarrativePreGeneration.tsx
  var import_react5 = __require("react");
  var import_ui11 = __toESM(require_ui());
  var import_jsx_runtime11 = __require("react/jsx-runtime");
  var NarrativePreGeneration = ({
    dispute,
    playbook,
    evidenceFiles,
    generationNumber,
    onGenerate,
    onNavigateBack
  }) => {
    var _a, _b;
    const [feedback, setFeedback] = (0, import_react5.useState)("");
    const remaining = MAX_GENERATIONS - generationNumber;
    const limitReached = remaining <= 0;
    const filesByKey = /* @__PURE__ */ new Map();
    for (const file of evidenceFiles) {
      filesByKey.set(file.checklist_item_key, file);
    }
    const checklistNotes = (_a = dispute.checklist_notes) != null ? _a : {};
    const checklistItems = (_b = playbook == null ? void 0 : playbook.evidence_checklist) != null ? _b : [];
    const itemStatuses = checklistItems.map((item) => {
      var _a2;
      const matchedFile = filesByKey.get(item.key);
      const stripeField = getStripeFieldResult(item, dispute);
      const autoFilled = (stripeField == null ? void 0 : stripeField.status) === "positive";
      const hasMerchantNote = !!((_a2 = checklistNotes[item.key]) == null ? void 0 : _a2.trim());
      const isNarrativeOnly = !!item.narrative_only;
      const satisfied = !!matchedFile || autoFilled || isNarrativeOnly;
      let statusLabel;
      if (matchedFile) {
        statusLabel = "Uploaded";
      } else if (autoFilled) {
        statusLabel = "From Stripe";
      } else if (isNarrativeOnly) {
        statusLabel = hasMerchantNote ? "Notes added" : "In narrative";
      } else {
        statusLabel = "Not uploaded";
      }
      return {
        item,
        matchedFile,
        stripeField,
        autoFilled,
        isNarrativeOnly,
        hasMerchantNote,
        satisfied,
        statusLabel
      };
    });
    const satisfiedCount = itemStatuses.filter((s) => s.satisfied).length;
    const totalItems = itemStatuses.length;
    const hasNoEvidence = satisfiedCount === 0;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
      css: { padding: "medium", stack: "y", gap: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Badge, {
              type: "info",
              children: "AI Coach"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
              css: { font: "heading", fontWeight: "semibold" },
              children: "Ready to write your narrative"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
              css: { font: "body", color: "secondary" },
              children: "WinBack will use your uploaded evidence and the details Stripe has on this transaction to draft a response tailored to this dispute. Review what the AI will work with below, then generate your draft."
            })
          ]
        }),
        playbook ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: {
            stack: "y",
            gap: "medium",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
              css: { stack: "x", distribute: "space-between", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                  css: { font: "subheading", fontWeight: "semibold" },
                  children: "Evidence summary"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: [
                    satisfiedCount,
                    " of ",
                    totalItems,
                    " covered"
                  ]
                })
              ]
            }),
            hasNoEvidence && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
              type: "caution",
              title: "No evidence available",
              description: "The AI can still generate a narrative, but your chances of winning are much lower without supporting evidence."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
              css: { stack: "y", gap: 0 },
              children: itemStatuses.map(({ item, satisfied }, index) => {
                const isFirst = index === 0;
                return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                  css: { stack: "y", gap: 0 },
                  children: [
                    !isFirst && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Divider, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                      css: {
                        stack: "x",
                        gap: "small",
                        alignY: "center",
                        distribute: "space-between",
                        paddingY: "small"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                          css: {
                            stack: "x",
                            gap: "small",
                            alignY: "center",
                            width: "3/4"
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                              css: {
                                font: "body",
                                color: satisfied ? "success" : "disabled"
                              },
                              children: satisfied ? "\u2713" : "\u25CB"
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                              css: {
                                font: "caption",
                                color: satisfied ? "primary" : "secondary"
                              },
                              children: item.item
                            })
                          ]
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                          css: {
                            font: "caption",
                            fontWeight: "semibold",
                            color: satisfied ? "success" : "disabled"
                          },
                          children: itemStatuses[index].statusLabel
                        })
                      ]
                    })
                  ]
                }, item.key);
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Link, {
              onPress: onNavigateBack,
              children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                css: { font: "caption", color: "info" },
                children: "\u2190 Go back to add more evidence"
              })
            })
          ]
        }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
          type: "caution",
          title: "Playbook not available",
          description: "No playbook was found for this dispute type. The AI will generate a general narrative based on the dispute details."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
              css: { font: "subheading", fontWeight: "semibold" },
              children: "Anything else the AI should know?"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Optional. Add any context the evidence files don't already capture."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TextArea, {
              label: "",
              placeholder: "e.g. Customer confirmed receipt by phone on March 20th",
              value: feedback,
              onChange: (e) => setFeedback(e.target.value),
              rows: 3
            })
          ]
        }),
        limitReached ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
          type: "caution",
          title: "Generation limit reached",
          description: `You have used all ${MAX_GENERATIONS} narrative generations for this dispute. Review and edit the existing narrative, or use it as-is for your submission.`
        }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: { stack: "x", gap: "medium", alignY: "center", distribute: "space-between" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Button, {
              type: "primary",
              onPress: () => onGenerate(feedback),
              children: "Generate Narrative"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Inline, {
              css: { font: "caption", color: "secondary" },
              children: [
                remaining,
                " of ",
                MAX_GENERATIONS,
                " generation",
                remaining === 1 ? "" : "s",
                " remaining"
              ]
            })
          ]
        })
      ]
    });
  };
  var NarrativePreGeneration_default = NarrativePreGeneration;

  // src/components/narrative/NarrativeGenerating.tsx
  var import_ui12 = __toESM(require_ui());
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  var NarrativeGenerating = ({ dispute }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Box, {
      css: { padding: "medium", stack: "y", gap: "large" },
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
        css: {
          stack: "y",
          gap: "medium",
          alignX: "center",
          backgroundColor: "container",
          padding: "xlarge",
          borderRadius: "medium"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Badge, {
            type: "info",
            children: "AI Coach"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Spinner, {
            size: "large"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
            css: { font: "heading", fontWeight: "semibold" },
            children: "Generating your narrative..."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Inline, {
            css: { font: "body", color: "secondary" },
            children: [
              "WinBack is analyzing your evidence and building a response tailored to",
              " ",
              dispute.network,
              " reason code ",
              dispute.reason_code,
              ". This usually takes 5-10 seconds."
            ]
          })
        ]
      })
    });
  };
  var NarrativeGenerating_default = NarrativeGenerating;

  // src/components/narrative/NarrativeReview.tsx
  var import_react6 = __require("react");
  var import_ui13 = __toESM(require_ui());
  var import_jsx_runtime13 = __require("react/jsx-runtime");
  var NarrativeReview = ({
    narrative,
    annotations,
    editedNarrative,
    generationNumber,
    onEditChange,
    onApprove,
    onRegenerate,
    submitted
  }) => {
    const [showRegenConfirm, setShowRegenConfirm] = (0, import_react6.useState)(false);
    const [feedback, setFeedback] = (0, import_react6.useState)("");
    const [selectedTags, setSelectedTags] = (0, import_react6.useState)([]);
    const remaining = MAX_GENERATIONS - generationNumber;
    const limitReached = remaining <= 0;
    const hasEdits = editedNarrative !== narrative;
    const toggleTag = (tag) => {
      setSelectedTags(
        (prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };
    const handleRegenerateClick = () => {
      if (hasEdits) {
        setShowRegenConfirm(true);
      } else {
        onRegenerate(feedback, selectedTags);
      }
    };
    const handleConfirmRegenerate = () => {
      setShowRegenConfirm(false);
      onRegenerate(feedback, selectedTags);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
      css: { padding: "medium", stack: "y", gap: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
              css: { stack: "x", distribute: "space-between", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Badge, {
                  type: "info",
                  children: "AI Coach"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: [
                    "Generation ",
                    generationNumber,
                    " of ",
                    MAX_GENERATIONS
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "heading", fontWeight: "semibold" },
              children: "Your dispute narrative"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "body", color: "secondary" },
              children: "Review the AI's reasoning, then edit the narrative below. This is the text that will be submitted to Stripe."
            })
          ]
        }),
        annotations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Accordion, {
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.AccordionItem, {
            title: "AI Strategy & Reasoning",
            subtitle: `${annotations.length} section${annotations.length === 1 ? "" : "s"} analyzed`,
            defaultOpen: true,
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Box, {
              css: { stack: "y", gap: "medium" },
              children: annotations.map((annotation, index) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
                css: { stack: "y", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
                    css: {
                      font: "caption",
                      fontWeight: "semibold",
                      color: "secondary",
                      textTransform: "uppercase"
                    },
                    children: annotation.section
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
                    css: { font: "caption", color: "info" },
                    children: annotation.reasoning
                  })
                ]
              }, index))
            })
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
              css: { stack: "x", distribute: "space-between", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
                  css: { font: "subheading", fontWeight: "semibold" },
                  children: submitted ? "Submitted narrative" : "Edit your narrative"
                }),
                !submitted && hasEdits && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Inline, {
                  css: { font: "caption", color: "success" },
                  children: [
                    "\u2713",
                    " Auto-saved"
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "caption", color: "secondary" },
              children: submitted ? "This narrative was submitted to Stripe and cannot be changed." : "Edits are saved locally and travel forward to the Submit step."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.TextArea, {
              label: "",
              value: editedNarrative,
              onChange: (e) => onEditChange(e.target.value),
              rows: 12,
              disabled: submitted
            })
          ]
        }),
        !submitted && showRegenConfirm && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Banner, {
          type: "caution",
          title: "Regenerating will replace your edits. Continue?",
          actions: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
            css: { stack: "x", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
                type: "destructive",
                onPress: handleConfirmRegenerate,
                children: "Yes, regenerate"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
                onPress: () => setShowRegenConfirm(false),
                children: "Keep editing"
              })
            ]
          })
        }),
        !submitted && !limitReached && !showRegenConfirm && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "subheading", fontWeight: "semibold" },
              children: "What would you like to change?"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Optional. Pick one or more, add notes, or skip and click Regenerate."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Box, {
              css: { stack: "x", gap: "small", wrap: "wrap" },
              children: FEEDBACK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
                  type: isSelected ? "primary" : "secondary",
                  size: "small",
                  onPress: () => toggleTag(tag.id),
                  children: tag.label
                }, tag.id);
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.TextArea, {
              label: "",
              placeholder: "Anything specific? e.g. Emphasize the delivery tracking more",
              value: feedback,
              onChange: (e) => setFeedback(e.target.value),
              rows: 2
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Divider, {}),
        !submitted && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
          css: { stack: "x", distribute: "space-between", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
              css: { stack: "x", gap: "small" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
                  type: "primary",
                  onPress: onApprove,
                  children: "Approve & Continue"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
                  onPress: handleRegenerateClick,
                  disabled: limitReached,
                  children: "Regenerate"
                })
              ]
            }),
            limitReached ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "caption", color: "attention" },
              children: "No generations remaining"
            }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Inline, {
              css: { font: "caption", color: "secondary" },
              children: [
                remaining,
                " generation",
                remaining === 1 ? "" : "s",
                " remaining"
              ]
            })
          ]
        })
      ]
    });
  };
  var NarrativeReview_default = NarrativeReview;

  // src/components/narrative/NarrativeError.tsx
  var import_react7 = __require("react");
  var import_ui14 = __toESM(require_ui());

  // src/lib/narrative-utils.ts
  var TEMPLATE_FIELD_MAP = {
    avs_address_check: (d) => d.avs_address_check,
    avs_zip_check: (d) => d.avs_zip_check,
    cvc_check: (d) => d.cvc_check,
    three_d_secure_result: (d) => d.three_d_secure_result,
    three_d_secure_version: (d) => d.three_d_secure_version,
    authorization_code: (d) => d.authorization_code,
    network_status: (d) => d.network_status,
    customer_email: (d) => d.customer_email,
    customer_name: (d) => d.customer_name,
    billing_address: (d) => d.billing_address,
    charge_description: (d) => d.charge_description
  };
  function interpolateTemplate(template, dispute) {
    return template.replace(/\{\{(\w+)\}\}/g, (_match, field) => {
      const accessor = TEMPLATE_FIELD_MAP[field];
      if (!accessor)
        return "N/A";
      const value = accessor(dispute);
      return value !== void 0 && value !== null && value !== "" ? value : "N/A";
    });
  }

  // src/components/narrative/NarrativeError.tsx
  var import_jsx_runtime14 = __require("react/jsx-runtime");
  var NarrativeError = ({
    dispute,
    playbook,
    errorMessage,
    editedNarrative,
    isGenerationLimit,
    onEditChange,
    onContinue,
    onRetry
  }) => {
    const templateText = (playbook == null ? void 0 : playbook.narrative_template) ? interpolateTemplate(playbook.narrative_template, dispute) : "";
    (0, import_react7.useEffect)(() => {
      if (!editedNarrative && templateText) {
        onEditChange(templateText);
      }
    }, []);
    const displayText = editedNarrative || templateText;
    const hasTemplate = Boolean(templateText);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
      css: { padding: "medium", stack: "y", gap: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Badge, {
              type: "info",
              children: "AI Coach"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "heading", fontWeight: "semibold" },
              children: isGenerationLimit ? "Generation limit reached" : "AI generation unavailable"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "body", color: "secondary" },
              children: isGenerationLimit ? "You have used all available AI narrative generations for this dispute. You can still edit the template below and submit it as your manual narrative." : "We could not reach the AI this time. You can edit the reason-code-specific template below and submit it manually, or try again in a moment. Your deadline is not affected."
            })
          ]
        }),
        errorMessage && !isGenerationLimit && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Banner, {
          type: "critical",
          title: "Details",
          description: errorMessage
        }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
          css: {
            stack: "y",
            gap: "small",
            backgroundColor: "container",
            padding: "medium",
            borderRadius: "medium"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "subheading", fontWeight: "semibold" },
              children: hasTemplate ? "Edit the template" : "Write your narrative"
            }),
            hasTemplate ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Fill in the [bracketed sections] with your specific details. Stripe-verified fields (AVS, CVV, 3DS) are already filled in."
            }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Describe what happened, why this charge was legitimate, and the evidence that supports your case."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.TextArea, {
              label: "",
              value: displayText,
              onChange: (e) => onEditChange(e.target.value),
              rows: 14,
              placeholder: hasTemplate ? void 0 : "Describe what happened, why this charge was legitimate, and any supporting details..."
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
          css: { stack: "x", gap: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Button, {
              type: "primary",
              onPress: onContinue,
              children: "Continue with Manual Narrative"
            }),
            !isGenerationLimit && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Button, {
              type: "secondary",
              onPress: onRetry,
              children: "Try Again"
            })
          ]
        })
      ]
    });
  };
  var NarrativeError_default = NarrativeError;

  // src/components/narrative/NarrativePanel.tsx
  var import_jsx_runtime15 = __require("react/jsx-runtime");
  var NarrativePanel = ({
    dispute,
    playbook,
    evidenceFiles,
    context,
    editedNarrative,
    onEditedNarrativeChange,
    onApprove,
    onNavigateBack,
    submitted
  }) => {
    const [phase, setPhase] = (0, import_react8.useState)(
      () => editedNarrative ? "review" : "idle"
    );
    const [generationId, setGenerationId] = (0, import_react8.useState)(null);
    const [narrative, setNarrative] = (0, import_react8.useState)(() => editedNarrative);
    const [annotations, setAnnotations] = (0, import_react8.useState)([]);
    const [generationNumber, setGenerationNumber] = (0, import_react8.useState)(0);
    const [errorMessage, setErrorMessage] = (0, import_react8.useState)(null);
    const [isGenerationLimit, setIsGenerationLimit] = (0, import_react8.useState)(false);
    const contextRef = (0, import_react8.useRef)(context);
    const pollStartRef = (0, import_react8.useRef)(0);
    const pollRetryCountRef = (0, import_react8.useRef)(0);
    (0, import_react8.useEffect)(() => {
      contextRef.current = context;
    }, [context]);
    (0, import_react8.useEffect)(() => {
      if (phase !== "generating" || !generationId) {
        return;
      }
      pollStartRef.current = Date.now();
      pollRetryCountRef.current = 0;
      const interval = setInterval(() => __async(void 0, null, function* () {
        if (Date.now() - pollStartRef.current > MAX_POLL_DURATION_MS) {
          clearInterval(interval);
          setErrorMessage("Narrative generation timed out. Please try again.");
          setPhase("error");
          return;
        }
        try {
          const statusResponse = yield fetchBackend(
            `/api/narratives/${generationId}/status`,
            contextRef.current
          );
          if (statusResponse.status === "completed") {
            clearInterval(interval);
            setNarrative(statusResponse.narrative);
            setAnnotations(statusResponse.annotations);
            onEditedNarrativeChange(statusResponse.narrative);
            setPhase("review");
          } else if (statusResponse.status === "failed") {
            clearInterval(interval);
            setErrorMessage(statusResponse.error);
            setPhase("error");
          }
        } catch (e) {
          pollRetryCountRef.current += 1;
          if (pollRetryCountRef.current >= 3) {
            clearInterval(interval);
            setErrorMessage("Network error while checking generation status. Please try again.");
            setPhase("error");
          }
        }
      }), POLL_INTERVAL_MS);
      return () => clearInterval(interval);
    }, [phase, generationId, onEditedNarrativeChange]);
    const handleGenerate = (0, import_react8.useCallback)((_0, ..._1) => __async(void 0, [_0, ..._1], function* (merchantFeedback, tags = []) {
      setPhase("generating");
      setErrorMessage(null);
      setIsGenerationLimit(false);
      try {
        const response = yield fetchBackend(
          "/api/narratives/generate",
          contextRef.current,
          {
            dispute_id: dispute.id,
            reason_code: dispute.reason_code,
            network: dispute.network,
            merchant_feedback: merchantFeedback,
            merchant_feedback_tags: tags
          }
        );
        setGenerationId(response.generation_id);
        setGenerationNumber((prev) => prev + 1);
      } catch (err) {
        if (err instanceof ApiError && err.status === 429 && err.code === "generation_limit") {
          setIsGenerationLimit(true);
          setErrorMessage(err.message);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        setPhase("error");
      }
    }), [dispute.id, dispute.reason_code, dispute.network]);
    const handleApprove = (0, import_react8.useCallback)(() => {
      onApprove(editedNarrative);
    }, [onApprove, editedNarrative]);
    const handleRegenerate = (0, import_react8.useCallback)((merchantFeedback, tags) => {
      handleGenerate(merchantFeedback, tags);
    }, [handleGenerate]);
    const handleRetry = (0, import_react8.useCallback)(() => {
      setErrorMessage(null);
      setPhase("idle");
    }, []);
    const handleErrorContinue = (0, import_react8.useCallback)(() => {
      onApprove(editedNarrative);
    }, [onApprove, editedNarrative]);
    if (submitted) {
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NarrativeReview_default, {
        narrative: editedNarrative,
        annotations,
        editedNarrative,
        generationNumber,
        onEditChange: onEditedNarrativeChange,
        onApprove: handleApprove,
        onRegenerate: handleRegenerate,
        submitted: true
      });
    }
    switch (phase) {
      case "idle":
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NarrativePreGeneration_default, {
          dispute,
          playbook,
          evidenceFiles,
          generationNumber,
          onGenerate: handleGenerate,
          onNavigateBack
        });
      case "generating":
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NarrativeGenerating_default, {
          dispute
        });
      case "review":
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NarrativeReview_default, {
          narrative,
          annotations,
          editedNarrative,
          generationNumber,
          onEditChange: onEditedNarrativeChange,
          onApprove: handleApprove,
          onRegenerate: handleRegenerate
        });
      case "error":
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NarrativeError_default, {
          dispute,
          playbook,
          errorMessage,
          editedNarrative,
          isGenerationLimit,
          onEditChange: onEditedNarrativeChange,
          onContinue: handleErrorContinue,
          onRetry: handleRetry
        });
    }
  };
  var NarrativePanel_default = NarrativePanel;

  // src/components/submit/SubmitView.tsx
  var import_react9 = __require("react");
  var import_ui16 = __toESM(require_ui());

  // src/components/submit/SubmissionConfirmation.tsx
  var import_ui15 = __toESM(require_ui());
  var import_jsx_runtime16 = __require("react/jsx-runtime");
  function describeWarning(w) {
    switch (w.code) {
      case "field_truncated":
        return `Your narrative was truncated from ${w.original_length} to ${w.truncated_length} characters before submission.`;
      case "field_collision":
        return `"${w.losing_item}" collided with "${w.winning_item}" on ${w.field}; resolved by ${w.resolution === "uncategorized_file" ? "attaching as uncategorized file" : "dropping the losing item"}.`;
      case "missing_mandatory_items":
        return `Mandatory items were not attached: ${w.items.join(", ")}. Submitted without them.`;
      case "deadline_passed":
        return `The response deadline has passed. Submitted late.`;
      case "concat_skipped":
        return `"${w.file_name}" could not be merged into ${w.slot}: ${w.reason}. Submitted without it.`;
    }
  }
  function SubmissionConfirmation({ response, onBackToList }) {
    const submittedAt = new Date(response.submitted_at).toLocaleString();
    const hasWarnings = response.warnings && response.warnings.length > 0;
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui15.Box, {
      css: { stack: "y", gap: "large", padding: "large" },
      children: [
        hasWarnings && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Banner, {
          type: "caution",
          title: "Submitted with warnings",
          description: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: response.warnings.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui15.Inline, {
              css: { font: "caption" },
              children: [
                "\u2022 ",
                describeWarning(w)
              ]
            }, i))
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Banner, {
          type: "default",
          title: "Evidence submitted",
          description: "Your rebuttal is on its way to the card issuer."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui15.Box, {
          css: { stack: "y", gap: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Inline, {
              css: { font: "heading" },
              children: "What happens next"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Box, {
              children: "The bank typically takes 60-75 days to issue a decision. You will be notified in Stripe when the dispute is resolved."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui15.Box, {
              css: { stack: "y", gap: "xxsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: "Submitted at"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Inline, {
                  css: { font: "caption" },
                  children: submittedAt
                })
              ]
            })
          ]
        }),
        onBackToList && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui15.Button, {
          type: "secondary",
          onPress: onBackToList,
          children: "Back to disputes"
        })
      ]
    });
  }

  // src/components/submit/SubmitView.tsx
  var import_jsx_runtime17 = __require("react/jsx-runtime");
  var TERMINAL_CODES = /* @__PURE__ */ new Set([
    "dispute_not_submittable",
    "validation_failed"
  ]);
  function countMandatoryAttached(playbook, evidenceFiles) {
    const mandatory = playbook.evidence_checklist.filter(
      (i) => i.category === "mandatory"
    );
    const filed = new Set(evidenceFiles.map((f) => f.checklist_item_key));
    const attached = mandatory.filter(
      (i) => i.stripe_field || i.narrative_only || filed.has(i.key)
    ).length;
    return { attached, total: mandatory.length };
  }
  function SubmitView({
    dispute,
    playbook,
    evidenceFiles,
    narrativeText,
    context,
    onSubmitted
  }) {
    const [acknowledged, setAcknowledged] = (0, import_react9.useState)(false);
    const [state, setState] = (0, import_react9.useState)({ kind: "idle" });
    const contextRef = (0, import_react9.useRef)(context);
    contextRef.current = context;
    const { attached, total } = countMandatoryAttached(playbook, evidenceFiles);
    const narrativeWords = narrativeText.trim().split(/\s+/).filter(Boolean).length;
    function handleSubmit() {
      return __async(this, null, function* () {
        var _a;
        setState({ kind: "submitting" });
        try {
          const response = yield fetchBackend(
            `/api/disputes/${dispute.id}/submit`,
            contextRef.current
          );
          setState({ kind: "success", response: response.data });
          onSubmitted(response.data);
        } catch (err) {
          if (err instanceof ApiError) {
            const code = (_a = err.code) != null ? _a : "internal_error";
            setState({
              kind: "error",
              code,
              message: err.message,
              terminal: TERMINAL_CODES.has(code),
              warnings: []
            });
          } else {
            setState({
              kind: "error",
              code: "internal_error",
              message: "Something went wrong. Your submission was NOT sent.",
              terminal: false,
              warnings: []
            });
          }
        }
      });
    }
    if (state.kind === "success") {
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SubmissionConfirmation, {
        response: state.response
      });
    }
    const isSubmitting = state.kind === "submitting";
    const isTerminalError = state.kind === "error" && state.terminal;
    const submitDisabled = !acknowledged || isSubmitting || isTerminalError;
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
      css: { stack: "y", gap: "large", padding: "large" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
          css: { font: "heading" },
          children: "Submit evidence"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
          css: { stack: "y", gap: "xsmall", padding: "medium", backgroundColor: "container", borderRadius: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
              css: { stack: "x", gap: "small", distribute: "space-between" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: "Dispute"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption" },
                  children: dispute.id
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
              css: { stack: "x", gap: "small", distribute: "space-between" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: "Reason"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption" },
                  children: playbook.display_name
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
              css: { stack: "x", gap: "small", distribute: "space-between" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: "Mandatory evidence"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Inline, {
                  css: { font: "caption" },
                  children: [
                    attached,
                    " of ",
                    total,
                    " attached"
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
              css: { stack: "x", gap: "small", distribute: "space-between" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: "Narrative"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Inline, {
                  css: { font: "caption" },
                  children: [
                    narrativeWords,
                    " words"
                  ]
                })
              ]
            })
          ]
        }),
        state.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Banner, {
          type: state.terminal ? "critical" : "caution",
          title: state.terminal ? "Can't submit" : "Submission failed",
          description: state.message
        }),
        attached < total && !isTerminalError && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Banner, {
          type: "caution",
          title: "Missing mandatory evidence",
          description: `${total - attached} mandatory item${total - attached === 1 ? "" : "s"} not attached. You can still submit, but your chances improve with more evidence.`
        }),
        !isTerminalError && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Banner, {
          type: "caution",
          title: "Submission is final",
          description: "Once you submit, your evidence is final and cannot be changed or recalled. Stripe will send it directly to the card issuer."
        }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Checkbox, {
          label: "I understand this submission is final.",
          checked: acknowledged,
          onChange: () => setAcknowledged((prev) => !prev),
          disabled: isSubmitting || isTerminalError
        }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Box, {
          children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Button, {
            type: "primary",
            disabled: submitDisabled,
            onPress: handleSubmit,
            children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_ui16.Box, {
              css: { stack: "x", gap: "small", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Spinner, {}),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_ui16.Inline, {
                  children: "Submitting evidence..."
                })
              ]
            }) : "Submit to Stripe"
          })
        })
      ]
    });
  }

  // src/components/DisputeWorkflow.tsx
  var import_jsx_runtime18 = __require("react/jsx-runtime");
  var DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }) => {
    const [currentStep, setCurrentStep] = (0, import_react10.useState)("review");
    const [dispute, setDispute] = (0, import_react10.useState)(initialDispute);
    const [playbook, setPlaybook] = (0, import_react10.useState)(null);
    const [loading, setLoading] = (0, import_react10.useState)({
      dispute: false,
      playbook: false
    });
    const [errors, setErrors] = (0, import_react10.useState)({
      dispute: null,
      playbook: null
    });
    const [editedNarrative, setEditedNarrative] = (0, import_react10.useState)("");
    const [evidenceFiles, setEvidenceFiles] = (0, import_react10.useState)([]);
    const contextRef = (0, import_react10.useRef)(context);
    contextRef.current = context;
    (0, import_react10.useEffect)(() => {
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
          const fetched = disputeResult.value.data;
          setDispute(fetched);
          if (fetched.narrative_text) {
            setEditedNarrative(fetched.narrative_text);
          }
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
        try {
          const filesResult = yield fetchBackend(
            `/api/disputes/${initialDispute.id}/evidence-files`,
            contextRef.current
          );
          setEvidenceFiles(filesResult.data);
        } catch (err) {
          console.error("Failed to fetch evidence files:", err);
          setEvidenceFiles([]);
        }
      });
      fetchData();
    }, [shown, initialDispute.id, initialDispute.network, initialDispute.reason_code]);
    (0, import_react10.useEffect)(() => {
      if (currentStep !== "narrative")
        return;
      fetchBackend(
        `/api/disputes/${initialDispute.id}/evidence-files`,
        contextRef.current
      ).then((result) => setEvidenceFiles(result.data)).catch((err) => console.error("Failed to refresh evidence files:", err));
    }, [currentStep, initialDispute.id]);
    const submitted = Boolean(dispute.evidence_submitted_at);
    const expired = !submitted && isDisputeExpired(dispute.due_by, dispute.status);
    const lockdown = submitted || expired;
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
    const focusViewTitle = dispute.customer_name ? `Dispute: ${dispute.customer_name}` : dispute.charge_description ? `Dispute: ${dispute.charge_description}` : `Dispute ${dispute.id.slice(0, 12)}...`;
    const renderReviewTab = () => {
      const isLoadingPlaybook = loading.playbook;
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Box, {
        css: { padding: "medium", stack: "y", gap: "large" },
        children: [
          errors.dispute && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ErrorBanner_default, {
            message: errors.dispute
          }),
          isLoadingPlaybook ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Box, {
            css: { alignX: "center", padding: "medium", stack: "y", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Spinner, {
                size: "medium"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Loading playbook..."
              })
            ]
          }) : errors.playbook ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ErrorBanner_default, {
            message: errors.playbook
          }) : playbook ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CoachHeader_default, {
                headline: playbook.coach_headline,
                summary: playbook.coach_summary,
                urgencyMode: isUrgent,
                daysRemaining
              }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(QuickActions_default, {
                playbook,
                urgencyMode: isUrgent
              })
            ]
          }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Banner, {
            type: "default",
            title: "No playbook available",
            description: "We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(DisputeOverview_default, {
            dispute,
            loading: loading.dispute
          }),
          playbook && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(LearnMore_default, {
            issuerSummary: playbook.coach_issuer_summary,
            acquirerSummary: playbook.coach_acquirer_summary
          })
        ]
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.FocusView, {
      title: focusViewTitle,
      shown,
      setShown,
      confirmCloseMessages: {
        title: "Leave dispute workflow?",
        description: "Your progress on this step will not be saved.",
        cancelAction: "Stay",
        exitAction: "Leave"
      },
      primaryAction: isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Button, {
        type: "primary",
        onPress: () => setShown(false),
        children: submitted ? "Done" : "Close"
      }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Button, {
        type: "primary",
        onPress: handleNext,
        children: [
          "Next: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]
        ]
      }),
      secondaryAction: isFirstStep ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Button, {
        onPress: () => setShown(false),
        children: "Cancel"
      }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Button, {
        onPress: handleBack,
        children: [
          "Back: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Box, {
        css: { stack: "y" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Box, {
            css: { padding: "medium", paddingBottom: "small", stack: "y", gap: "small" },
            children: [
              submitted && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Banner, {
                type: "default",
                title: "Evidence submitted",
                description: "Your evidence has been submitted to Stripe. This dispute is now read-only."
              }),
              expired && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Banner, {
                type: "critical",
                title: "Response deadline has passed",
                description: "No further action can be taken on this dispute. Evidence uploads, narrative generation, and submission are disabled."
              }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(DeadlineTimer_default, {
                dueBy: dispute.due_by,
                status: dispute.status
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.Tabs, {
            fitted: true,
            size: "medium",
            selectedKey: currentStep,
            onSelectionChange: (key) => setCurrentStep(key),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.TabList, {
                children: WIZARD_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Tab, {
                  id: step,
                  children: WIZARD_STEP_LABELS[step]
                }, step))
              }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_ui17.TabPanels, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.TabPanel, {
                    id: "review",
                    children: renderReviewTab()
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.TabPanel, {
                    id: "evidence",
                    children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(EvidenceChecklist_default, {
                      dispute,
                      playbook,
                      context: contextRef.current,
                      isUrgent,
                      daysRemaining,
                      submitted: lockdown
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.TabPanel, {
                    id: "narrative",
                    children: currentStep === "narrative" && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(NarrativePanel_default, {
                      dispute,
                      playbook,
                      evidenceFiles,
                      context: contextRef.current,
                      editedNarrative,
                      onEditedNarrativeChange: setEditedNarrative,
                      onApprove: (text) => {
                        setEditedNarrative(text);
                        setCurrentStep("submit");
                      },
                      onNavigateBack: () => setCurrentStep("evidence"),
                      submitted: lockdown
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.TabPanel, {
                    id: "submit",
                    children: submitted && dispute.evidence_submitted_at ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(SubmissionConfirmation, {
                      response: {
                        submission_id: "",
                        submitted_at: dispute.evidence_submitted_at,
                        dispute_status: "evidence_submitted",
                        warnings: []
                      }
                    }) : expired ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Box, {
                      css: { padding: "medium" },
                      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Banner, {
                        type: "critical",
                        title: "Submission is no longer available",
                        description: "This dispute's response deadline has passed. Stripe will no longer accept evidence for it."
                      })
                    }) : playbook ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(SubmitView, {
                      dispute,
                      playbook,
                      evidenceFiles,
                      narrativeText: editedNarrative,
                      context: contextRef.current,
                      onSubmitted: (response) => {
                        setDispute(__spreadProps(__spreadValues({}, dispute), {
                          evidence_submitted_at: response.submitted_at
                        }));
                      }
                    }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Box, {
                      css: { padding: "medium", alignX: "center" },
                      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_ui17.Spinner, {
                        size: "medium"
                      })
                    })
                  })
                ]
              })
            ]
          })
        ]
      })
    });
  };
  var DisputeWorkflow_default = DisputeWorkflow;

  // src/views/PaymentDisputeView.tsx
  var import_jsx_runtime19 = __require("react/jsx-runtime");
  var PaymentDisputeView = (context) => {
    var _a;
    const { environment } = context;
    const paymentIntentId = (_a = environment == null ? void 0 : environment.objectContext) == null ? void 0 : _a.id;
    const [viewState, setViewState] = (0, import_react11.useState)("loading");
    const [dispute, setDispute] = (0, import_react11.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react11.useState)(false);
    const contextRef = (0, import_react11.useRef)(context);
    contextRef.current = context;
    const loadDispute = (0, import_react11.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react11.useEffect)(() => {
      loadDispute();
    }, [loadDispute]);
    if (viewState === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Spinner, {
            size: "large"
          })
        })
      });
    }
    if (viewState === "no_dispute" || viewState === "error" || !dispute) {
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Inline, {
            css: { font: "caption", color: "secondary" },
            children: "No dispute on this payment."
          })
        })
      });
    }
    const statusBadge = getStatusBadge(dispute.status);
    const reasonLabel = getReasonCodeLabel(dispute.network, dispute.reason_code);
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui18.ContextView, {
      title: "WinBack",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui18.Box, {
          css: { padding: "medium", stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui18.Box, {
              css: {
                stack: "x",
                gap: "small",
                distribute: "space-between",
                alignY: "center"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Inline, {
                  css: { font: "heading", fontWeight: "semibold" },
                  children: "Dispute"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Badge, {
                  type: statusBadge.type,
                  children: statusBadge.label
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui18.Box, {
              css: { stack: "y", gap: "xsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: reasonLabel != null ? reasonLabel : dispute.reason.replace(/_/g, " ")
                }),
                /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_ui18.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: [
                    dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                    " ",
                    dispute.reason_code
                  ]
                })
              ]
            }),
            (dispute.status === "needs_response" || dispute.status === "warning_needs_response") && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ui18.Button, {
              type: "primary",
              css: { width: "fill" },
              onPress: () => setShowWorkflow(true),
              children: "Open in WinBack"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(DisputeWorkflow_default, {
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
  var import_react14 = __require("react");
  var import_ui23 = __toESM(require_ui());

  // src/components/DisputeCard.tsx
  var import_ui19 = __toESM(require_ui());
  var import_jsx_runtime20 = __require("react/jsx-runtime");
  function formatAmount2(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }
  var DisputeCard = ({ dispute, onSelect }) => {
    const expired = isDisputeExpired(dispute.due_by, dispute.status);
    const statusBadge = expired ? null : getStatusBadge(dispute.status);
    const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
    const reasonLabel = getReasonCodeLabel(dispute.network, dispute.reason_code);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Button, {
      type: "secondary",
      css: { width: "fill" },
      onPress: () => onSelect(dispute.id),
      children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Box, {
        css: {
          stack: "y",
          gap: "xsmall",
          width: "fill",
          padding: "small"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Box, {
            css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Inline, {
                css: { font: "body", fontWeight: "semibold" },
                children: formatAmount2(dispute.amount, dispute.currency)
              }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Box, {
                css: { stack: "x", gap: "xsmall" },
                children: [
                  dispute.is_new && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Badge, {
                    type: "info",
                    children: "New"
                  }),
                  statusBadge && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Badge, {
                    type: statusBadge.type,
                    children: statusBadge.label
                  }),
                  urgencyBadge && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Badge, {
                    type: urgencyBadge.type,
                    children: urgencyBadge.label
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Inline, {
            css: { font: "caption" },
            children: dispute.customer_name || "Unknown customer"
          }),
          reasonLabel && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Inline, {
            css: { font: "caption", color: "secondary" },
            children: reasonLabel
          }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Box, {
            css: { stack: "x", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Inline, {
                css: { font: "caption", color: "secondary" },
                children: [
                  dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                  " ",
                  dispute.reason_code
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_ui19.Inline, {
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

  // src/components/EmptyDisputesState.tsx
  var import_ui20 = __toESM(require_ui());
  var import_jsx_runtime21 = __require("react/jsx-runtime");
  var EmptyDisputesState = ({ onboardingCompleted, onShowGuide }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_ui20.Box, {
      css: { stack: "y", gap: "small", padding: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Banner, {
          type: "default",
          title: "You're all set",
          description: "When a new dispute arrives, you'll see it here with an alert. No setup needed."
        }),
        onboardingCompleted && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_ui20.Box, {
          css: { stack: "x", gap: "small", alignY: "center", paddingTop: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Need a refresher on how WinBack works?"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Button, {
              type: "secondary",
              onPress: onShowGuide,
              children: "Show guide"
            })
          ]
        })
      ]
    });
  };
  var EmptyDisputesState_default = EmptyDisputesState;

  // src/components/OnboardingPanel.tsx
  var import_react12 = __require("react");
  var import_ui21 = __toESM(require_ui());
  var import_jsx_runtime22 = __require("react/jsx-runtime");
  var STEPS = [
    {
      icon: "notifications",
      title: "A new dispute arrives",
      description: "You'll see it here the moment it lands. No setup, no configs."
    },
    {
      icon: "clipboardCheck",
      title: "We walk you through the evidence",
      description: "A reason-code-specific checklist, tailored to that dispute. No guessing."
    },
    {
      icon: "sparkle",
      title: "AI drafts your response",
      description: "We tie your evidence into a clean narrative. You review, edit, submit."
    }
  ];
  var tileCss = {
    padding: "large",
    backgroundColor: "container",
    borderRadius: "medium",
    stack: "y",
    gap: "small"
  };
  var OnboardingPanel = ({ onDismiss }) => {
    const [dismissing, setDismissing] = (0, import_react12.useState)(false);
    const handleDismiss = () => __async(void 0, null, function* () {
      setDismissing(true);
      try {
        yield onDismiss();
      } finally {
        setDismissing(false);
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
      css: { stack: "y", gap: "small" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
          css: tileCss,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
              css: { font: "heading", fontWeight: "semibold" },
              children: "Welcome to WinBack"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "We'll handle disputes with you, step by step. Here's what to expect."
            })
          ]
        }),
        STEPS.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
          css: tileCss,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
              css: { stack: "x", gap: "medium", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Icon, {
                  name: step.icon,
                  size: "small",
                  css: { fill: "brand" }
                }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Inline, {
                  css: { font: "caption", color: "secondary", fontWeight: "semibold" },
                  children: [
                    "Step ",
                    idx + 1
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
              css: { font: "subheading", fontWeight: "semibold" },
              children: step.title
            }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
              css: { font: "body", color: "secondary" },
              children: step.description
            })
          ]
        }, step.title)),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Box, {
          css: { stack: "x", alignX: "end", paddingTop: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Button, {
            type: "primary",
            onPress: handleDismiss,
            disabled: dismissing,
            children: dismissing ? "Saving..." : "Got it, let's go"
          })
        })
      ]
    });
  };
  var OnboardingPanel_default = OnboardingPanel;

  // src/components/UpgradePromptBanner.tsx
  var import_react13 = __require("react");
  var import_ui22 = __toESM(require_ui());
  var import_jsx_runtime23 = __require("react/jsx-runtime");
  var UpgradePromptBanner = ({ context }) => {
    const [billing, setBilling] = (0, import_react13.useState)(null);
    const [dismissed, setDismissed] = (0, import_react13.useState)(false);
    const [upgrading, setUpgrading] = (0, import_react13.useState)(false);
    (0, import_react13.useEffect)(() => {
      let cancelled = false;
      const load = () => __async(void 0, null, function* () {
        try {
          const result = yield fetchBackend(
            "/api/billing/status",
            context
          );
          if (!cancelled)
            setBilling(result);
        } catch (e) {
        }
      });
      load();
      return () => {
        cancelled = true;
      };
    }, [context]);
    if (!billing || billing.tier !== "usage" || billing.ytd_success_fees_cents <= 0 || dismissed) {
      return null;
    }
    const handleUpgrade = () => __async(void 0, null, function* () {
      setUpgrading(true);
      try {
        const returnUrl = "https://dashboard.stripe.com/settings/apps";
        const result = yield fetchBackend(
          "/api/billing/checkout",
          context,
          { success_url: returnUrl, cancel_url: returnUrl }
        );
        if (typeof window !== "undefined") {
          window.open(result.url, "_blank", "noopener");
        }
      } catch (e) {
      } finally {
        setUpgrading(false);
      }
    });
    const saved = `$${(billing.ytd_success_fees_cents / 100).toFixed(2)}`;
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Box, {
      css: { marginBottom: "medium" },
      children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Banner, {
        type: "default",
        title: "Keep 100% of your next win",
        description: `You've paid ${saved} in success fees this year. At $79/month on Pro, you'd keep all of it.`,
        actions: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_ui22.Box, {
          css: { stack: "x", gap: "small" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Button, {
              type: "primary",
              onPress: handleUpgrade,
              disabled: upgrading,
              children: upgrading ? "Opening\u2026" : "Upgrade to Pro"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Button, {
              type: "secondary",
              onPress: () => setDismissed(true),
              children: "Not now"
            })
          ]
        })
      })
    });
  };
  var UpgradePromptBanner_default = UpgradePromptBanner;

  // src/views/DisputeListView.tsx
  var import_jsx_runtime24 = __require("react/jsx-runtime");
  var FILTER_OPTIONS = [
    { value: "all", label: "All disputes" },
    { value: "needs_response", label: "Needs response" },
    { value: "under_review", label: "Under review" },
    { value: "resolved", label: "Resolved" },
    { value: "expired", label: "Expired" }
  ];
  function matchesFilter(dispute, filter) {
    const expired = isDisputeExpired(dispute.due_by, dispute.status);
    switch (filter) {
      case "all":
        return true;
      case "needs_response":
        return (dispute.status === "needs_response" || dispute.status === "warning_needs_response") && !expired;
      case "under_review":
        return dispute.status === "under_review" || dispute.status === "warning_under_review";
      case "resolved":
        return isResolved(dispute.status);
      case "expired":
        return expired;
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
      case "expired":
        return `${count} expired`;
      default:
        return `${count} ${noun}`;
    }
  }
  var DisputeListView = (context) => {
    var _a;
    const { environment, userContext } = context;
    const [viewState, setViewState] = (0, import_react14.useState)("loading");
    const [disputes, setDisputes] = (0, import_react14.useState)([]);
    const [errorMessage, setErrorMessage] = (0, import_react14.useState)("");
    const [statusFilter, setStatusFilter] = (0, import_react14.useState)("needs_response");
    const [onboardingCompleted, setOnboardingCompleted] = (0, import_react14.useState)(true);
    const [selectedDispute, setSelectedDispute] = (0, import_react14.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react14.useState)(false);
    const contextRef = (0, import_react14.useRef)(context);
    contextRef.current = context;
    const loadDisputes = (0, import_react14.useCallback)(() => __async(void 0, null, function* () {
      setViewState("loading");
      try {
        const [disputesResult, onboardingResult] = yield Promise.all([
          fetchBackend("/api/disputes", contextRef.current),
          fetchBackend(
            "/api/merchant/onboarding",
            contextRef.current
          )
        ]);
        setDisputes(disputesResult.data);
        setOnboardingCompleted(onboardingResult.completed);
        setViewState("ready");
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Failed to load disputes. Please try again.";
        setErrorMessage(message);
        setViewState("error");
      }
    }), []);
    (0, import_react14.useEffect)(() => {
      loadDisputes();
    }, [loadDisputes]);
    const handleSelectDispute = (dispute) => {
      setSelectedDispute(dispute);
      setShowWorkflow(true);
      if (dispute.is_new) {
        setDisputes(
          (prev) => prev.map((d) => d.id === dispute.id ? __spreadProps(__spreadValues({}, d), { is_new: false }) : d)
        );
      }
    };
    const newDisputeCount = disputes.filter((d) => d.is_new).length;
    const handleCloseWorkflow = (shown) => {
      setShowWorkflow(shown);
      if (!shown)
        setSelectedDispute(null);
    };
    const sortedDisputes = [...disputes].sort((a, b) => {
      const aExpired = isDisputeExpired(a.due_by, a.status);
      const bExpired = isDisputeExpired(b.due_by, b.status);
      if (aExpired !== bExpired)
        return aExpired ? 1 : -1;
      return new Date(a.due_by).getTime() - new Date(b.due_by).getTime();
    });
    const filteredDisputes = sortedDisputes.filter((d) => matchesFilter(d, statusFilter));
    const handleDismissOnboarding = () => __async(void 0, null, function* () {
      setOnboardingCompleted(true);
      try {
        yield fetchBackend("/api/merchant/onboarding/update", contextRef.current, {
          completed: true
        });
      } catch (e) {
      }
    });
    const handleShowGuide = () => __async(void 0, null, function* () {
      setOnboardingCompleted(false);
      try {
        yield fetchBackend("/api/merchant/onboarding/update", contextRef.current, {
          completed: false
        });
      } catch (e) {
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.ContextView, {
      title: "WinBack",
      description: "Guided dispute resolution",
      children: [
        viewState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.Box, {
          css: {
            padding: "xlarge",
            alignX: "center",
            alignY: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Spinner, {
              size: "large"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Loading disputes..."
            })
          ]
        }),
        viewState === "error" && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ErrorBanner_default, {
          message: errorMessage
        }),
        viewState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.Tabs, {
          fitted: true,
          size: "medium",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.TabList, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Tab, {
                  id: "disputes",
                  children: newDisputeCount > 0 ? `Disputes (${newDisputeCount} new)` : "Disputes"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Tab, {
                  id: "insights",
                  children: "Insights"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.TabPanel, {
                  id: "disputes",
                  children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.Box, {
                    css: { padding: "small", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(UpgradePromptBanner_default, {
                        context: contextRef.current
                      }),
                      !onboardingCompleted && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(OnboardingPanel_default, {
                        onDismiss: handleDismissOnboarding
                      }),
                      disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(EmptyDisputesState_default, {
                        onboardingCompleted,
                        onShowGuide: handleShowGuide
                      }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Select, {
                            label: "Filter",
                            hiddenElements: ["label"],
                            value: statusFilter,
                            onChange: (e) => setStatusFilter(e.target.value),
                            children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("option", {
                              value: opt.value,
                              children: opt.label
                            }, opt.value))
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Box, {
                            css: { paddingTop: "small", paddingBottom: "small" },
                            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Inline, {
                              css: { font: "caption", color: "secondary" },
                              children: getCountText(filteredDisputes.length, statusFilter)
                            })
                          }),
                          filteredDisputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Box, {
                            css: { padding: "medium", alignX: "center" },
                            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.Inline, {
                              css: { font: "caption", color: "secondary" },
                              children: [
                                "No ",
                                (_a = FILTER_OPTIONS.find((o) => o.value === statusFilter)) == null ? void 0 : _a.label.toLowerCase(),
                                " disputes."
                              ]
                            })
                          }) : filteredDisputes.map((dispute) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DisputeCard_default, {
                            dispute,
                            onSelect: () => handleSelectDispute(dispute)
                          }, dispute.id))
                        ]
                      })
                    ]
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.TabPanel, {
                  id: "insights",
                  children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_ui23.Box, {
                    css: { padding: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Banner, {
                        type: "default",
                        title: "Insights",
                        description: "Win rate analytics and dispute patterns will appear here."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_ui23.Inline, {
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
        selectedDispute && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DisputeWorkflow_default, {
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
  var import_react15 = __require("react");
  var import_ui24 = __toESM(require_ui());
  var import_jsx_runtime25 = __require("react/jsx-runtime");
  function formatCents(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }
  function formatDate3(iso) {
    if (!iso)
      return "\u2014";
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  var AppSettings = (context) => {
    const [viewState, setViewState] = (0, import_react15.useState)("loading");
    const [billing, setBilling] = (0, import_react15.useState)(null);
    const [errorMessage, setErrorMessage] = (0, import_react15.useState)(null);
    const [upgrading, setUpgrading] = (0, import_react15.useState)(false);
    const [upgradeError, setUpgradeError] = (0, import_react15.useState)(null);
    const [reopening, setReopening] = (0, import_react15.useState)(false);
    const [reopenDone, setReopenDone] = (0, import_react15.useState)(false);
    const [reopenError, setReopenError] = (0, import_react15.useState)(null);
    const contextRef = (0, import_react15.useRef)(context);
    contextRef.current = context;
    const handleReopenOnboarding = () => __async(void 0, null, function* () {
      setReopening(true);
      setReopenError(null);
      setReopenDone(false);
      try {
        yield fetchBackend("/api/merchant/onboarding/update", contextRef.current, {
          completed: false
        });
        setReopenDone(true);
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : "Failed to reopen guide";
        setReopenError(msg);
      } finally {
        setReopening(false);
      }
    });
    (0, import_react15.useEffect)(() => {
      const loadBilling = () => __async(void 0, null, function* () {
        try {
          const result = yield fetchBackend(
            "/api/billing/status",
            contextRef.current
          );
          setBilling(result);
          setViewState("ready");
        } catch (err) {
          const msg = err instanceof ApiError ? err.message : "Failed to load billing status";
          setErrorMessage(msg);
          setViewState("error");
        }
      });
      loadBilling();
    }, []);
    const handleUpgrade = () => __async(void 0, null, function* () {
      setUpgrading(true);
      setUpgradeError(null);
      try {
        const returnUrl = "https://dashboard.stripe.com/settings/apps";
        const result = yield fetchBackend(
          "/api/billing/checkout",
          contextRef.current,
          { success_url: returnUrl, cancel_url: returnUrl }
        );
        if (typeof window !== "undefined") {
          window.open(result.url, "_blank", "noopener");
        }
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : "Failed to start upgrade";
        setUpgradeError(msg);
      } finally {
        setUpgrading(false);
      }
    });
    if (viewState === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.SettingsView, {
        children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
          css: { stack: "x", gap: "small", alignX: "center", padding: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Spinner, {}),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
              children: "Loading billing status\u2026"
            })
          ]
        })
      });
    }
    if (viewState === "error" || !billing) {
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.SettingsView, {
        children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Box, {
          css: { padding: "medium" },
          children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Banner, {
            type: "critical",
            title: "Could not load billing status",
            description: errorMessage != null ? errorMessage : "Please try again."
          })
        })
      });
    }
    const isPastDue = billing.subscription_status === "past_due";
    const isPro = billing.tier === "pro";
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.SettingsView, {
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
        css: { stack: "y", gap: "medium", padding: "medium" },
        children: [
          isPastDue && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Banner, {
            type: "caution",
            title: "Payment past due",
            description: "Your Pro subscription has a payment issue. Update your payment method in Stripe to avoid interruption. You can still file and submit disputes."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
            css: { stack: "y", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Billing"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
                css: { stack: "x", gap: "small", alignY: "center" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "body" },
                    children: "Plan:"
                  }),
                  isPro ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Badge, {
                    type: "positive",
                    children: "Pro \xB7 $79/mo"
                  }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Badge, {
                    type: "info",
                    children: "Pay-Per-Win \xB7 15% of recovered amount"
                  })
                ]
              }),
              isPro ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "caption", color: "secondary" },
                    children: "Unlimited disputes. Zero success fee."
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Inline, {
                    css: { font: "caption" },
                    children: [
                      "Pro since ",
                      formatDate3(billing.pro_since_at),
                      " \xB7 Next billing",
                      " ",
                      formatDate3(billing.next_billing_at)
                    ]
                  })
                ]
              }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "caption", color: "secondary" },
                    children: "You pay nothing until you win. We charge 15% of what you recover."
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Inline, {
                    css: { font: "caption" },
                    children: [
                      "Success fees this year: ",
                      formatCents(billing.ytd_success_fees_cents)
                    ]
                  })
                ]
              })
            ]
          }),
          !isPro && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
                css: { stack: "y", gap: "small" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "heading", fontWeight: "semibold" },
                    children: "Upgrade to Pro"
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "body" },
                    children: "$79/month, unlimited disputes, no success fee. Break-even after ~1 win/month at a $500 average dispute."
                  }),
                  upgradeError && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Banner, {
                    type: "critical",
                    title: "Upgrade failed",
                    description: upgradeError
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
                    css: { stack: "x", gap: "small", alignY: "center" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Button, {
                        type: "primary",
                        onPress: handleUpgrade,
                        disabled: upgrading,
                        children: upgrading ? "Opening Checkout\u2026" : "Upgrade to Pro"
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "Opens Stripe Checkout in a new tab"
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          isPro && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
                css: { stack: "y", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                    css: { font: "heading", fontWeight: "semibold" },
                    children: "Manage subscription"
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Inline, {
                    css: { font: "caption" },
                    children: [
                      "Update your payment method or cancel from the",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Link, {
                        href: "https://dashboard.stripe.com/settings/billing",
                        target: "_blank",
                        children: "Stripe billing portal"
                      }),
                      ". Canceling reverts you to Pay-Per-Win at period end."
                    ]
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Getting started guide"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "caption", color: "secondary" },
                children: 'Show the "How WinBack works" guide again in the Disputes tab next time you have no active disputes.'
              }),
              reopenError && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Banner, {
                type: "critical",
                title: "Could not reopen guide",
                description: reopenError
              }),
              reopenDone && !reopenError && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Done. The guide will appear the next time your disputes list is empty."
              }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Box, {
                css: { stack: "x", alignX: "start" },
                children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Button, {
                  type: "secondary",
                  onPress: handleReopenOnboarding,
                  disabled: reopening,
                  children: reopening ? "Reopening\u2026" : "Show getting started guide"
                })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_ui24.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "About WinBack"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
                css: { font: "body" },
                children: "Version 0.0.1"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ui24.Inline, {
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
  var BUILD_TIME = "2026-04-20 21:40:46.629754 -0700 PDT m=+7.356487376";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "distribution_type": "PRIVATE",
    "icon": "./src/assets/winback_logo.png",
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
          "https://winbackpay.com/api/"
        ],
        "purpose": "Backend API calls to WinBack services for dispute guidance, AI narrative generation, evidence metadata, and billing."
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
    "version": "1.0.1"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EZWFkbGluZVRpbWVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0LnRzeCIsICIuLi9zcmMvbGliL3N0cmlwZS1maWVsZC1zdGF0dXMudHMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0UHJvZ3Jlc3MudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0NoZWNrbGlzdEl0ZW0udHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0ZpbGVVcGxvYWRTZWN0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlUGFuZWwudHN4IiwgIi4uL3NyYy9saWIvbmFycmF0aXZlLXR5cGVzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hcnJhdGl2ZS9OYXJyYXRpdmVQcmVHZW5lcmF0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlR2VuZXJhdGluZy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZVJldmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZUVycm9yLnRzeCIsICIuLi9zcmMvbGliL25hcnJhdGl2ZS11dGlscy50cyIsICIuLi9zcmMvY29tcG9uZW50cy9zdWJtaXQvU3VibWl0Vmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvc3VibWl0L1N1Ym1pc3Npb25Db25maXJtYXRpb24udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eURpc3B1dGVzU3RhdGUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL09uYm9hcmRpbmdQYW5lbC50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvVXBncmFkZVByb21wdEJhbm5lci50c3giLCAiLi4vc3JjL3ZpZXdzL0FwcFNldHRpbmdzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNES19WRVJTSU9OID0gdm9pZCAwO1xuZXhwb3J0cy5TREtfVkVSU0lPTiA9ICc5LjEuMCc7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGV4cG9ydHMuVGFibGVIZWFkID0gZXhwb3J0cy5UYWJsZUZvb3RlciA9IGV4cG9ydHMuVGFibGVDZWxsID0gZXhwb3J0cy5UYWJsZUJvZHkgPSBleHBvcnRzLlRhYiA9IGV4cG9ydHMuVGFiUGFuZWxzID0gZXhwb3J0cy5UYWJQYW5lbCA9IGV4cG9ydHMuVGFiTGlzdCA9IGV4cG9ydHMuU3dpdGNoID0gZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBleHBvcnRzLlNwaW5uZXIgPSBleHBvcnRzLlNwYXJrbGluZSA9IGV4cG9ydHMuU2lnbkluVmlldyA9IGV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZXhwb3J0cy5TZWxlY3QgPSBleHBvcnRzLlJhZGlvID0gZXhwb3J0cy5Qcm9wZXJ0eUxpc3QgPSBleHBvcnRzLlByb3BlcnR5TGlzdEl0ZW0gPSBleHBvcnRzLlBsYXRmb3JtQ29uZmlndXJhdGlvblZpZXcgPSBleHBvcnRzLk9uYm9hcmRpbmdWaWV3ID0gZXhwb3J0cy5NZW51ID0gZXhwb3J0cy5NZW51SXRlbSA9IGV4cG9ydHMuTWVudUdyb3VwID0gZXhwb3J0cy5MaXN0ID0gZXhwb3J0cy5MaXN0SXRlbSA9IGV4cG9ydHMuTGluayA9IGV4cG9ydHMuTGluZUNoYXJ0ID0gZXhwb3J0cy5JbmxpbmUgPSBleHBvcnRzLkltZyA9IGV4cG9ydHMuSWNvbiA9IGV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBleHBvcnRzLkZvY3VzVmlldyA9IGV4cG9ydHMuRGl2aWRlciA9IGV4cG9ydHMuRGV0YWlsUGFnZVRhYmxlID0gZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZXhwb3J0cy5EYXRlRmllbGQgPSBleHBvcnRzLkNvbnRleHRWaWV3ID0gZXhwb3J0cy5DaGlwID0gZXhwb3J0cy5DaGlwTGlzdCA9IGV4cG9ydHMuQ2hlY2tib3ggPSBleHBvcnRzLkJ1dHRvbiA9IGV4cG9ydHMuQnV0dG9uR3JvdXAgPSBleHBvcnRzLkJveCA9IGV4cG9ydHMuQmFyQ2hhcnQgPSBleHBvcnRzLkJhbm5lciA9IGV4cG9ydHMuQmFkZ2UgPSBleHBvcnRzLkFjY29yZGlvbiA9IGV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IHZvaWQgMDtcbmV4cG9ydHMuVG9vbHRpcCA9IGV4cG9ydHMuVGV4dEZpZWxkID0gZXhwb3J0cy5UZXh0QXJlYSA9IGV4cG9ydHMuVGFza0xpc3QgPSBleHBvcnRzLlRhc2tMaXN0SXRlbSA9IGV4cG9ydHMuVGFicyA9IGV4cG9ydHMuVGFibGVSb3cgPSBleHBvcnRzLlRhYmxlID0gdm9pZCAwO1xuY29uc3QganN4X3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtcnVudGltZVwiKTtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwiQHJlbW90ZS11aS9yZWFjdFwiKTtcbmNvbnN0IHZlcnNpb25fMSA9IHJlcXVpcmUoXCIuLi92ZXJzaW9uXCIpO1xuY29uc3Qgd2l0aFNka1Byb3BzID0gKENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHdyYXBwZWRDb21wb25lbnROYW1lID0gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC50b1N0cmluZygpO1xuICAgIGNvbnN0IFdpdGhTZGtQcm9wcyA9IChwcm9wcykgPT4gKCgwLCBqc3hfcnVudGltZV8xLmpzeCkoQ29tcG9uZW50LCB7IC4uLnByb3BzLCB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsIHNka1ZlcnNpb246IHZlcnNpb25fMS5TREtfVkVSU0lPTiwgc2NoZW1hVmVyc2lvbjogXCJ2OVwiIH0pKTtcbiAgICBXaXRoU2RrUHJvcHMud3JhcHBlZENvbXBvbmVudE5hbWUgPSB3cmFwcGVkQ29tcG9uZW50TmFtZTtcbiAgICByZXR1cm4gV2l0aFNka1Byb3BzO1xufTtcbmNvbnN0IGRlZmluZUNvbXBvbmVudCA9IChuYW1lLCBmcmFnbWVudFByb3BzLCB3cmFwV2l0aFNka1Byb3BzKSA9PiB7XG4gICAgY29uc3QgcmVtb3RlQ29tcG9uZW50ID0gKDAsIHJlYWN0XzEuY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQpKG5hbWUsIHtcbiAgICAgICAgZnJhZ21lbnRQcm9wcyxcbiAgICB9KTtcbiAgICBpZiAoIXdyYXBXaXRoU2RrUHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHJlbW90ZUNvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhTZGtQcm9wcyhyZW1vdGVDb21wb25lbnQpO1xufTtcbmV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IGRlZmluZUNvbXBvbmVudCgnQWNjb3JkaW9uSXRlbScsIFsndGl0bGUnLCAnYWN0aW9ucycsICdtZWRpYScsICdzdWJ0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQWNjb3JkaW9uID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJhZGdlID0gZGVmaW5lQ29tcG9uZW50KCdCYWRnZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFubmVyID0gZGVmaW5lQ29tcG9uZW50KCdCYW5uZXInLCBbJ2FjdGlvbnMnLCAnZGVzY3JpcHRpb24nLCAndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLkJhckNoYXJ0ID0gZGVmaW5lQ29tcG9uZW50KCdCYXJDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQm94ID0gZGVmaW5lQ29tcG9uZW50KCdCb3gnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbkdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b25Hcm91cCcsIFsnbWVudVRyaWdnZXInXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbiA9IGRlZmluZUNvbXBvbmVudCgnQnV0dG9uJywgW10sIHRydWUpO1xuZXhwb3J0cy5DaGVja2JveCA9IGRlZmluZUNvbXBvbmVudCgnQ2hlY2tib3gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5DaGlwTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcExpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXAgPSBkZWZpbmVDb21wb25lbnQoJ0NoaXAnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNvbnRleHRWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdDb250ZXh0VmlldycsIFsnYWN0aW9ucycsICdiYW5uZXInLCAnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRGF0ZUZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdEYXRlRmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlTW9kdWxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VUYWJsZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRGl2aWRlciA9IGRlZmluZUNvbXBvbmVudCgnRGl2aWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRm9jdXNWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdGb2N1c1ZpZXcnLCBbJ2Zvb3RlckNvbnRlbnQnLCAncHJpbWFyeUFjdGlvbicsICdzZWNvbmRhcnlBY3Rpb24nXSwgdHJ1ZSk7XG5leHBvcnRzLkZvcm1GaWVsZEdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdGb3JtRmllbGRHcm91cCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSWNvbiA9IGRlZmluZUNvbXBvbmVudCgnSWNvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW1nID0gZGVmaW5lQ29tcG9uZW50KCdJbWcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLklubGluZSA9IGRlZmluZUNvbXBvbmVudCgnSW5saW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5lQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0xpbmVDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGluayA9IGRlZmluZUNvbXBvbmVudCgnTGluaycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGlzdEl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ0xpc3RJdGVtJywgWydpY29uJywgJ2ltYWdlJywgJ3NlY29uZGFyeVRpdGxlJywgJ3RpdGxlJywgJ3ZhbHVlJ10sIHRydWUpO1xuZXhwb3J0cy5MaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51R3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ01lbnVHcm91cCcsIFsndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdNZW51SXRlbScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTWVudSA9IGRlZmluZUNvbXBvbmVudCgnTWVudScsIFsndHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ09uYm9hcmRpbmdWaWV3JywgWydlcnJvciddLCB0cnVlKTtcbmV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGRlZmluZUNvbXBvbmVudCgnUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0SXRlbScsIFsnbGFiZWwnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLlByb3BlcnR5TGlzdCA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5SYWRpbyA9IGRlZmluZUNvbXBvbmVudCgnUmFkaW8nLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5TZWxlY3QgPSBkZWZpbmVDb21wb25lbnQoJ1NlbGVjdCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNldHRpbmdzVmlldyA9IGRlZmluZUNvbXBvbmVudCgnU2V0dGluZ3NWaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5TaWduSW5WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTaWduSW5WaWV3JywgWydkZXNjcmlwdGlvbkFjdGlvbkNvbnRlbnRzJywgJ2Zvb3RlckNvbnRlbnQnXSwgdHJ1ZSk7XG5leHBvcnRzLlNwYXJrbGluZSA9IGRlZmluZUNvbXBvbmVudCgnU3BhcmtsaW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5TcGlubmVyID0gZGVmaW5lQ29tcG9uZW50KCdTcGlubmVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBkZWZpbmVDb21wb25lbnQoJ1N0cmlwZUZpbGVVcGxvYWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU3dpdGNoID0gZGVmaW5lQ29tcG9uZW50KCdTd2l0Y2gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5UYWJMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJQYW5lbCA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVscyA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWxzJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWIgPSBkZWZpbmVDb21wb25lbnQoJ1RhYicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVCb2R5ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUJvZHknLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUZvb3RlciA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVGb290ZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckNlbGwgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlSGVhZGVyQ2VsbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZVJvdyA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVSb3cnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYnMgPSBkZWZpbmVDb21wb25lbnQoJ1RhYnMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3RJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYXNrTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRBcmVhID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0QXJlYScsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRGaWVsZCA9IGRlZmluZUNvbXBvbmVudCgnVGV4dEZpZWxkJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVG9vbHRpcCA9IGRlZmluZUNvbXBvbmVudCgnVG9vbHRpcCcsIFsndHJpZ2dlciddLCB0cnVlKTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFByaXZhdGUhIFRoaXMgYWxsb3dzIHRoZSBzaGFyZWQgZW5kcG9pbnQgdG8gYmUgaW50aWFsaXplZFxuICogc28gdGhhdCB0aGUgU0RLIGNhbiBjb21tdW5pY2F0ZSB3aXRoIHRoZSBEYXNoYm9hcmQuXG4gKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gdm9pZCAwO1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBnZXRIb3N0RW5kcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBlbmRwb2ludCBpcyBjcmVhdGVkIGZyb20gdGhlIE1lc3NhZ2VQb3J0IHRyYW5zZmVycmVkIGZyb20gdGhlIGhvc3QgZW52XG4gICAgLy8gYXMgYSBwYXJ0IG9mIHRoZSBgaW5pdF9leHRlbnNpb25gIG1lc3NhZ2UuXG4gICAgY29uc3QgaG9zdEVuZHBvaW50ID0gZ2xvYmFsVGhpcy5fX1N0cmlwZUV4dEV4cG9ydHM/LmVuZHBvaW50O1xuICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShob3N0RW5kcG9pbnQsICdob3N0RW5kcG9pbnQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkJyk7XG4gICAgcmV0dXJuIGhvc3RFbmRwb2ludDtcbn07XG5leHBvcnRzLmdldEhvc3RFbmRwb2ludCA9IGdldEhvc3RFbmRwb2ludDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gYXN5bmMgKCkgPT4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKVxuICAgIC5jYWxsLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSgpXG4gICAgLnRoZW4oKHN1cHBvcnRlZCkgPT4gc3VwcG9ydGVkKVxuICAgIC5jYXRjaCgoKSA9PiBmYWxzZSk7XG5leHBvcnRzLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSA9IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hBcHBFbWJlZGRlZEtleSA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoQXBwRW1iZWRkZWRLZXkoKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBhcHAgZW1iZWRkZWQga2V5Jyk7XG4gICAgfVxuICAgIHJldHVybiBhcGlLZXk7XG59O1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gZmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IHZvaWQgMDtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL2ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lID0gYXN5bmMgKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIGZldGNoQXBwRW1iZWRkZWRLZXlfMS5mZXRjaEFwcEVtYmVkZGVkS2V5KSgpO1xuICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBpbml0KTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIGNvbnN0IHNlcmlhbGl6YWJsZVJlc3BvbnNlID0ge1xuICAgICAgICBqc29uOiB1bmRlZmluZWQsXG4gICAgICAgIGFycmF5QnVmZmVyOiB1bmRlZmluZWQsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIG9rOiByZXNwb25zZS5vayxcbiAgICAgICAgcmVkaXJlY3RlZDogcmVzcG9uc2UucmVkaXJlY3RlZCxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIHR5cGU6IHJlc3BvbnNlLnR5cGUsXG4gICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgIH07XG4gICAgc3dpdGNoIChyZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIHtcbiAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5qc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5hcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHNlcmlhbGl6YWJsZVJlc3BvbnNlO1xufTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IGZldGNoVmlhRnJhbWU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoVmlhSG9zdCA9IGFzeW5jIChlbmNvZGVkVXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGVuY29kZWRVcmwpO1xuICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuc3RyaXBlQXBpRmV0Y2godXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUhvc3QgPSBmZXRjaFZpYUhvc3Q7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lXzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUZyYW1lXCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0XzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUhvc3RcIik7XG5sZXQgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IG51bGw7XG5jb25zdCBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkU3RyaXBlQXBpRmV0Y2gpIHtcbiAgICAgICAgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKVxuICAgICAgICAgICAgPyBmZXRjaFZpYUZyYW1lXzEuZmV0Y2hWaWFGcmFtZVxuICAgICAgICAgICAgOiBmZXRjaFZpYUhvc3RfMS5mZXRjaFZpYUhvc3Q7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZFN0cmlwZUFwaUZldGNoO1xufTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG52YXIgc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2g7IH0gfSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBzdHJpcGVBcGlGZXRjaCA9IGFzeW5jIChwYXRoLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgcHJlZmVycmVkRmV0Y2hNZXRob2QgPSBhd2FpdCAoMCwgYXBpXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2gpKCk7XG4gICAgcmV0dXJuIHByZWZlcnJlZEZldGNoTWV0aG9kKHBhdGgsIG9wdGlvbnMpO1xufTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSBzdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBleHBvcnRzLkFVVEhPUklaQVRJT05fSEVBREVSID0gZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9IGV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSB2b2lkIDA7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgSHR0cENsaWVudCB0aGF0IGNhbiBiZSBwbHVnZ2VkIGludG8gc3RyaXBlLW5vZGVcbiAqIHRoYXQgd2lsbCBhbGxvdyB0aGUgdXNlciB0byB1c2Ugc3RyaXBlLW5vZGUgaW4gZXh0ZW5zaW9ucyBpZiB0aGUgRGFzaGJvYXJkXG4gKiBwcm92aWRlcyBhIGBzdHJpcGVBcGlGZXRjaGAgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbGF5IEFQSSBjYWxscyB0aHJvdWdoIHRoZVxuICogRGFzaGJvYXJkIGFuZCBwaWdneSBiYWNrIG9uIHRoZSB1c2VyJ3MgRGFzaGJvYXJkIHNlc3Npb24uXG4gKi9cbmNvbnN0IGludmFyaWFudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJpbnZhcmlhbnRcIikpO1xuY29uc3QgYXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2FwaUZldGNoXCIpO1xuY29uc3QgbWF0Y2hlc1N0cmlwZUtleSA9IC9bcHNda18odGVzdHxsaXZlKV9bQS1aYS16MC05XSsvO1xuY2xhc3MgU3RyaXBlQXBwc0h0dHBSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IocmVzcCkge1xuICAgICAgICB0aGlzLl9yZXNwID0gcmVzcDtcbiAgICB9XG4gICAgZ2V0SGVhZGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3AuaGVhZGVycztcbiAgICB9XG4gICAgZ2V0U3RhdHVzQ29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3Auc3RhdHVzO1xuICAgIH1cbiAgICBnZXRSYXdSZXNwb25zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3A7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgdG9TdHJlYW0oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyZWFtcyBoYXZlIG5vdCBiZWVuIGltcGxlbWVudGVkIGluIHRoZSBTdHJpcGUgSFRUUCBjbGllbnQnKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHsganNvbiB9ID0gdGhpcy5fcmVzcDtcbiAgICAgICAgaWYgKGpzb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUmVzcG9uc2UgYm9keSB1bmRlZmluZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU3RyaXBlQXBwc0h0dHBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGZldGNoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgZ2V0Q2xpZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpcGUtdWktZXh0ZW5zaW9uJztcbiAgICB9XG4gICAgYXN5bmMgbWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgcGF0aCwgbWV0aG9kLCBoZWFkZXJzLCByZXF1ZXN0RGF0YSwgcHJvdG9jb2wsIF90aW1lb3V0KSB7XG4gICAgICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShwcm90b2NvbCA9PT0gJ2h0dHBzJywgJ011c3QgdXNlIGh0dHBzIGNvbm5lY3Rpb25zIGluIFVJIGV4dGVuc2lvbnMnKTtcbiAgICAgICAgY29uc3QgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlcXVlc3REYXRhKSB7XG4gICAgICAgICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IHJlcXVlc3REYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBoZWFkZXJzLkF1dGhvcml6YXRpb247XG4gICAgICAgIGlmIChhdXRoSGVhZGVyICYmIG1hdGNoZXNTdHJpcGVLZXkudGVzdChhdXRoSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgdXNlIGFjdHVhbCBzdHJpcGUga2V5cyB3aGVuIHVzaW5nIHRoZSBTdHJpcGUgSlMgQVBJIGNsaWVudCB3aXRoIFVJIGV4dGVzaW9ucy5cXG5cXG4gSW5zdGVhZCwgdXNlIGBTVFJJUEVfQVBJX0tFWWAgZnJvbSBgQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2h0dHBfY2xpZW50YCBhcyBhIHBsYWNlaG9sZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWApO1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5fZmV0Y2godXJsLnRvU3RyaW5nKCksIGZldGNoT3B0aW9ucyk7XG4gICAgICAgIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciB0aW1lb3V0cy5cbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlKHJlc3ApO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSBTdHJpcGVBcHBzSHR0cENsaWVudDtcbi8vIERPIE5PVCBjaGFuZ2UgdGhpcyBzdHJpbmcgd2l0aG91dCBhIGRlcHJlY2F0aW9uIHBsYW4uIFRoZSBydW50aW1lIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGlzXG4vLyBleGFjdCBzdHJpbmcgaXMgcGFzc2VkLCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbi8vIFNlZTogbWFuYWdlL2Zyb250ZW5kL3NyYy90YWlsb3IvZXh0ZW5zaW9ucy9ob3N0L2FwaV9mZXRjaC5qc1xuZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9ICdET19OT1RfUEFTU19BX1JFQUxfQVBJX0tFWSc7XG5jb25zdCBjcmVhdGVIdHRwQ2xpZW50ID0gKCkgPT4gbmV3IFN0cmlwZUFwcHNIdHRwQ2xpZW50KGFwaUZldGNoXzEuc3RyaXBlQXBpRmV0Y2gpO1xuZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gY3JlYXRlSHR0cENsaWVudDtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvbic7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBgQmVhcmVyICR7ZXhwb3J0cy5TVFJJUEVfQVBJX0tFWX1gO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gdm9pZCAwO1xuY29uc3QgaHR0cENsaWVudF8xID0gcmVxdWlyZShcIi4uL2h0dHBDbGllbnRcIik7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKHsgaG9zdCwgcG9ydCB9KSA9PiBhc3luYyAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHBzOi8vJHtob3N0fToke3BvcnR9L3YxL2FwcHMvYXBwX2VtYmVkZGVkX2JhY2tlbmRfc2lnbmF0dXJlYCk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3BheWxvYWQnLCBKU09OLnN0cmluZ2lmeSh7IC4uLnBheWxvYWQgfSkpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdpbmNsdWRlX29ubHlbXScsICdzaWduYXR1cmUnKTtcbiAgICBjb25zdCBjbGllbnQgPSAoMCwgaHR0cENsaWVudF8xLmNyZWF0ZUh0dHBDbGllbnQpKCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBjbGllbnQubWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgJ0dFVCcsIHt9LCBudWxsLCAnaHR0cHMnKTtcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgLnRoZW4oKHIpID0+IHIudG9KU09OKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnNpZ25hdHVyZSk7XG59O1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gZXhwb3J0cy5jb25uZWN0aW9uU2V0dGluZ3MgPSB2b2lkIDA7XG5jb25zdCBkZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIGhvc3Q6ICdhcGkuc3RyaXBlLmNvbScsXG4gICAgcG9ydDogNDQzLFxufTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5leHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3M7XG5jb25zdCBzZXRDb25uZWN0aW9uU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICAgICAgLi4uZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgfTtcbn07XG5leHBvcnRzLnNldENvbm5lY3Rpb25TZXR0aW5ncyA9IHNldENvbm5lY3Rpb25TZXR0aW5ncztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSB2b2lkIDA7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseVwiKTtcbmNvbnN0IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGNvbm5lY3Rpb25TZXR0aW5nc18xID0gcmVxdWlyZShcIi4vc2lnbmF0dXJlL2Nvbm5lY3Rpb25TZXR0aW5nc1wiKTtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSBhc3luYyAoYWRkaXRpb25hbFBheWxvYWQpID0+IHtcbiAgICBpZiAoYXdhaXQgKDAsIHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSkoKSkge1xuICAgICAgICBjb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKDAsIGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMS5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KShjb25uZWN0aW9uU2V0dGluZ3NfMS5jb25uZWN0aW9uU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gZmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseShhZGRpdGlvbmFsUGF5bG9hZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoU3RyaXBlU2lnbmF0dXJlKGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG59O1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gVGhpcyBmaWxlIG1vdmVkIHRvIHV0aWxzOyByZS1leHBvcnRlZCB0byBub3QgYnJlYWsgaW1wb3J0c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2lnbmF0dXJlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zaWduYXR1cmVcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBzaWduYXR1cmVfMS5mZXRjaFN0cmlwZVNpZ25hdHVyZTtcbiIsICIvLyBBVVRPR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuaW1wb3J0IFBheW1lbnREaXNwdXRlVmlldyBmcm9tICcuLi9zcmMvdmlld3MvUGF5bWVudERpc3B1dGVWaWV3JztpbXBvcnQgRGlzcHV0ZUxpc3RWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcnO2ltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MnO1xuXG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA0LTIwIDIxOjQwOjQ2LjYyOTc1NCAtMDcwMCBQRFQgbT0rNy4zNTY0ODczNzYnO1xuXG5leHBvcnQgeyBcbiAgUGF5bWVudERpc3B1dGVWaWV3LFxuXG4gIERpc3B1dGVMaXN0VmlldyxcblxuICBBcHBTZXR0aW5nc1xuIH07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJkaXN0cmlidXRpb25fdHlwZVwiOiBcIlBSSVZBVEVcIixcbiAgXCJpY29uXCI6IFwiLi9zcmMvYXNzZXRzL3dpbmJhY2tfbG9nby5wbmdcIixcbiAgXCJpZFwiOiBcImNvbS5qa2J0ZWNoLndpbmJhY2tcIixcbiAgXCJuYW1lXCI6IFwiV2luQmFja1wiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZGlzcHV0ZSBkZXRhaWxzIHRvIGd1aWRlIG1lcmNoYW50cyB0aHJvdWdoIHRoZSByZXNwb25zZSBwcm9jZXNzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImRpc3B1dGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN1Ym1pdCBldmlkZW5jZSBhbmQgcmVzcG9uc2VzIG9uIGJlaGFsZiBvZiB0aGUgbWVyY2hhbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiY2hhcmdlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY2hhcmdlIGRldGFpbHMgYXNzb2NpYXRlZCB3aXRoIGRpc3B1dGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImN1c3RvbWVyX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY3VzdG9tZXIgaW5mb3JtYXRpb24gZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJmaWxlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgdXBsb2FkZWQgZXZpZGVuY2UgZmlsZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV93cml0ZVwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiVXBsb2FkIGV2aWRlbmNlIGZpbGVzIGZvciBkaXNwdXRlIHJlc3BvbnNlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X2ludGVudF9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHBheW1lbnQgaW50ZW50IGRldGFpbHMgZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfVxuICBdLFxuICBcInBvc3RfaW5zdGFsbF9hY3Rpb25cIjoge1xuICAgIFwidHlwZVwiOiBcInNldHRpbmdzXCJcbiAgfSxcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93aW5iYWNrcGF5LmNvbS9hcGkvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJCYWNrZW5kIEFQSSBjYWxscyB0byBXaW5CYWNrIHNlcnZpY2VzIGZvciBkaXNwdXRlIGd1aWRhbmNlLCBBSSBuYXJyYXRpdmUgZ2VuZXJhdGlvbiwgZXZpZGVuY2UgbWV0YWRhdGEsIGFuZCBiaWxsaW5nLlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJQYXltZW50RGlzcHV0ZVZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQucGF5bWVudC5kZXRhaWxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJEaXNwdXRlTGlzdFZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBTZXR0aW5nc1wiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic2V0dGluZ3NcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjFcIlxufTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCYWRnZSxcbiAgQnV0dG9uLFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSwgZ2V0UmVhc29uQ29kZUxhYmVsIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAnbm9fZGlzcHV0ZScgfCAnZXJyb3InIHwgJ3JlYWR5JztcblxuY29uc3QgUGF5bWVudERpc3B1dGVWaWV3ID0gKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCB7IGVudmlyb25tZW50IH0gPSBjb250ZXh0O1xuICBjb25zdCBwYXltZW50SW50ZW50SWQgPSBlbnZpcm9ubWVudD8ub2JqZWN0Q29udGV4dD8uaWQ7XG5cbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1dvcmtmbG93LCBzZXRTaG93V29ya2Zsb3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIGNvbnN0IGxvYWREaXNwdXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcGF5bWVudEludGVudElkKSB7XG4gICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWaWV3U3RhdGUoJ2xvYWRpbmcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvYnktcGF5bWVudC1pbnRlbnQvJHtwYXltZW50SW50ZW50SWR9YCxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgKTtcbiAgICAgIHNldERpc3B1dGUocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdyZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtwYXltZW50SW50ZW50SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlKCk7XG4gIH0sIFtsb2FkRGlzcHV0ZV0pO1xuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ25vX2Rpc3B1dGUnIHx8IHZpZXdTdGF0ZSA9PT0gJ2Vycm9yJyB8fCAhZGlzcHV0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTm8gZGlzcHV0ZSBvbiB0aGlzIHBheW1lbnQuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHJlYXNvbkxhYmVsID0gZ2V0UmVhc29uQ29kZUxhYmVsKGRpc3B1dGUubmV0d29yaywgZGlzcHV0ZS5yZWFzb25fY29kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIERpc3B1dGVcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge3JlYXNvbkxhYmVsID8/IGRpc3B1dGUucmVhc29uLnJlcGxhY2UoL18vZywgJyAnKX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgICBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9eycgJ31cbiAgICAgICAgICAgIHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICB7KGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8XG4gICAgICAgICAgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJykgJiYgKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNzcz17eyB3aWR0aDogJ2ZpbGwnIH19XG4gICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRTaG93V29ya2Zsb3codHJ1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgT3BlbiBpbiBXaW5CYWNrXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cblxuICAgICAgPERpc3B1dGVXb3JrZmxvd1xuICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICBzaG93bj17c2hvd1dvcmtmbG93fVxuICAgICAgICBzZXRTaG93bj17c2V0U2hvd1dvcmtmbG93fVxuICAgICAgLz5cbiAgICA8L0NvbnRleHRWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudERpc3B1dGVWaWV3O1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBCYW5uZXIsXG4gIEZvY3VzVmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgV2l6YXJkU3RlcCwgRGlzcHV0ZSwgUGxheWJvb2tEYXRhLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgV0laQVJEX1NURVBTLCBXSVpBUkRfU1RFUF9MQUJFTFMgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgZ2V0RGF5c1JlbWFpbmluZywgaXNSZXNvbHZlZCwgaXNEaXNwdXRlRXhwaXJlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgRXJyb3JCYW5uZXIgZnJvbSAnLi9FcnJvckJhbm5lcic7XG5pbXBvcnQgRGVhZGxpbmVUaW1lciBmcm9tICcuL0RlYWRsaW5lVGltZXInO1xuaW1wb3J0IERpc3B1dGVPdmVydmlldyBmcm9tICcuL3Jldmlldy9EaXNwdXRlT3ZlcnZpZXcnO1xuaW1wb3J0IENvYWNoSGVhZGVyIGZyb20gJy4vcmV2aWV3L0NvYWNoSGVhZGVyJztcbmltcG9ydCBRdWlja0FjdGlvbnMgZnJvbSAnLi9yZXZpZXcvUXVpY2tBY3Rpb25zJztcbmltcG9ydCBMZWFybk1vcmUgZnJvbSAnLi9yZXZpZXcvTGVhcm5Nb3JlJztcbmltcG9ydCBFdmlkZW5jZUNoZWNrbGlzdCBmcm9tICcuL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0JztcbmltcG9ydCBOYXJyYXRpdmVQYW5lbCBmcm9tICcuL25hcnJhdGl2ZS9OYXJyYXRpdmVQYW5lbCc7XG5pbXBvcnQgU3VibWl0VmlldyBmcm9tICcuL3N1Ym1pdC9TdWJtaXRWaWV3JztcbmltcG9ydCBTdWJtaXNzaW9uQ29uZmlybWF0aW9uIGZyb20gJy4vc3VibWl0L1N1Ym1pc3Npb25Db25maXJtYXRpb24nO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZVdvcmtmbG93UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIHNob3duOiBib29sZWFuO1xuICBzZXRTaG93bjogKHNob3duOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5jb25zdCBEaXNwdXRlV29ya2Zsb3cgPSAoeyBkaXNwdXRlOiBpbml0aWFsRGlzcHV0ZSwgY29udGV4dCwgc2hvd24sIHNldFNob3duIH06IERpc3B1dGVXb3JrZmxvd1Byb3BzKSA9PiB7XG4gIGNvbnN0IFtjdXJyZW50U3RlcCwgc2V0Q3VycmVudFN0ZXBdID0gdXNlU3RhdGU8V2l6YXJkU3RlcD4oJ3JldmlldycpO1xuICBjb25zdCBbZGlzcHV0ZSwgc2V0RGlzcHV0ZV0gPSB1c2VTdGF0ZTxEaXNwdXRlPihpbml0aWFsRGlzcHV0ZSk7XG4gIGNvbnN0IFtwbGF5Ym9vaywgc2V0UGxheWJvb2tdID0gdXNlU3RhdGU8UGxheWJvb2tEYXRhIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPHsgZGlzcHV0ZTogYm9vbGVhbjsgcGxheWJvb2s6IGJvb2xlYW4gfT4oe1xuICAgIGRpc3B1dGU6IGZhbHNlLFxuICAgIHBsYXlib29rOiBmYWxzZSxcbiAgfSk7XG4gIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZTx7IGRpc3B1dGU6IHN0cmluZyB8IG51bGw7IHBsYXlib29rOiBzdHJpbmcgfCBudWxsIH0+KHtcbiAgICBkaXNwdXRlOiBudWxsLFxuICAgIHBsYXlib29rOiBudWxsLFxuICB9KTtcbiAgY29uc3QgW2VkaXRlZE5hcnJhdGl2ZSwgc2V0RWRpdGVkTmFycmF0aXZlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2V2aWRlbmNlRmlsZXMsIHNldEV2aWRlbmNlRmlsZXNdID0gdXNlU3RhdGU8RXZpZGVuY2VGaWxlW10+KFtdKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvd24pIHJldHVybjtcblxuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcoeyBkaXNwdXRlOiB0cnVlLCBwbGF5Ym9vazogdHJ1ZSB9KTtcbiAgICAgIHNldEVycm9ycyh7IGRpc3B1dGU6IG51bGwsIHBsYXlib29rOiBudWxsIH0pO1xuXG4gICAgICAvLyBGZXRjaCBlbnJpY2hlZCBkaXNwdXRlIGFuZCBwbGF5Ym9vayBpbiBwYXJhbGxlbFxuICAgICAgLy8gU2tpcCBwbGF5Ym9vayBmZXRjaCBpZiByZWFzb25fY29kZSBpcyBlbXB0eSAodGVzdCBkaXNwdXRlcywgdW5rbm93biBjb2RlcylcbiAgICAgIGNvbnN0IHNob3VsZEZldGNoUGxheWJvb2sgPSAhIWluaXRpYWxEaXNwdXRlLnJlYXNvbl9jb2RlO1xuICAgICAgY29uc3QgW2Rpc3B1dGVSZXN1bHQsIHBsYXlib29rUmVzdWx0XSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbXG4gICAgICAgIGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGUgfT4oYC9hcGkvZGlzcHV0ZXMvJHtpbml0aWFsRGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQpLFxuICAgICAgICBzaG91bGRGZXRjaFBsYXlib29rXG4gICAgICAgICAgPyBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBQbGF5Ym9va0RhdGEgfT4oJy9hcGkvcGxheWJvb2tzJywgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgICAgICAgIG5ldHdvcms6IGluaXRpYWxEaXNwdXRlLm5ldHdvcmssXG4gICAgICAgICAgICAgIHJlYXNvbl9jb2RlOiBpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgQXBpRXJyb3IoJ05vIHJlYXNvbiBjb2RlJywgNDA0KSksXG4gICAgICBdKTtcblxuICAgICAgaWYgKGRpc3B1dGVSZXN1bHQuc3RhdHVzID09PSAnZnVsZmlsbGVkJykge1xuICAgICAgICBjb25zdCBmZXRjaGVkID0gZGlzcHV0ZVJlc3VsdC52YWx1ZS5kYXRhO1xuICAgICAgICBzZXREaXNwdXRlKGZldGNoZWQpO1xuICAgICAgICBpZiAoZmV0Y2hlZC5uYXJyYXRpdmVfdGV4dCkge1xuICAgICAgICAgIHNldEVkaXRlZE5hcnJhdGl2ZShmZXRjaGVkLm5hcnJhdGl2ZV90ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gZGlzcHV0ZVJlc3VsdC5yZWFzb247XG4gICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgIGRpc3B1dGU6IGVyciBpbnN0YW5jZW9mIEFwaUVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZSBkZXRhaWxzLicsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIGRpc3B1dGU6IGZhbHNlIH0pKTtcblxuICAgICAgaWYgKHBsYXlib29rUmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgc2V0UGxheWJvb2socGxheWJvb2tSZXN1bHQudmFsdWUuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnIgPSBwbGF5Ym9va1Jlc3VsdC5yZWFzb247XG4gICAgICAgIC8vIDQwNCBpcyBub3QgYW4gZXJyb3IgLS0ganVzdCBtZWFucyBubyBwbGF5Ym9vayBmb3IgdGhpcyByZWFzb24gY29kZVxuICAgICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDQpKSB7XG4gICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIHBsYXlib29rOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIHBsYXlib29rLicsXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHNldFBsYXlib29rKG51bGwpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZygocHJldikgPT4gKHsgLi4ucHJldiwgcGxheWJvb2s6IGZhbHNlIH0pKTtcblxuICAgICAgLy8gRmV0Y2ggZXZpZGVuY2UgZmlsZXMgZm9yIG5hcnJhdGl2ZSB0YWJcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbGVzUmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRXZpZGVuY2VGaWxlW10gfT4oXG4gICAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtpbml0aWFsRGlzcHV0ZS5pZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcbiAgICAgICAgc2V0RXZpZGVuY2VGaWxlcyhmaWxlc1Jlc3VsdC5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZXZpZGVuY2UgZmlsZXM6JywgZXJyKTtcbiAgICAgICAgc2V0RXZpZGVuY2VGaWxlcyhbXSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbc2hvd24sIGluaXRpYWxEaXNwdXRlLmlkLCBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLCBpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZV0pO1xuXG4gIC8vIFJlLWZldGNoIGV2aWRlbmNlIGZpbGVzIHdoZW5ldmVyIHRoZSB1c2VyIGVudGVycyB0aGUgbmFycmF0aXZlIHN0ZXAuXG4gIC8vIFRoZSBFdmlkZW5jZSB0YWIgb3ducyBpdHMgb3duIHVwbG9hZCBzdGF0ZSwgc28gRGlzcHV0ZVdvcmtmbG93J3MgY29weVxuICAvLyBnb2VzIHN0YWxlIGFzIHNvb24gYXMgdGhlIG1lcmNoYW50IHVwbG9hZHMgYSBmaWxlLiBSZWZyZXNoaW5nIG9uIHRhYlxuICAvLyBlbnRyeSBrZWVwcyB0aGUgbmFycmF0aXZlIHByZS1nZW5lcmF0aW9uIHZpZXcgaW4gc3luYyB3aXRob3V0IGxpZnRpbmdcbiAgLy8gdXBsb2FkIHN0YXRlIGFjcm9zcyB0aGUgd2hvbGUgd29ya2Zsb3cuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRTdGVwICE9PSAnbmFycmF0aXZlJykgcmV0dXJuO1xuICAgIGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZVtdIH0+KFxuICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtpbml0aWFsRGlzcHV0ZS5pZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgIClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHNldEV2aWRlbmNlRmlsZXMocmVzdWx0LmRhdGEpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZWZyZXNoIGV2aWRlbmNlIGZpbGVzOicsIGVycikpO1xuICB9LCBbY3VycmVudFN0ZXAsIGluaXRpYWxEaXNwdXRlLmlkXSk7XG5cbiAgY29uc3Qgc3VibWl0dGVkID0gQm9vbGVhbihkaXNwdXRlLmV2aWRlbmNlX3N1Ym1pdHRlZF9hdCk7XG4gIGNvbnN0IGV4cGlyZWQgPSAhc3VibWl0dGVkICYmIGlzRGlzcHV0ZUV4cGlyZWQoZGlzcHV0ZS5kdWVfYnksIGRpc3B1dGUuc3RhdHVzKTtcbiAgLy8gQW55IGNoaWxkIGNvbXBvbmVudCB0aGF0IGtleXMgaW5wdXRzIG9mZiBgc3VibWl0dGVkYCBzaG91bGQgYWxzbyBiZVxuICAvLyBsb2NrZWQgZG93biB3aGVuIHRoZSBkaXNwdXRlIGlzIGV4cGlyZWQuIFdlIHBhc3MgdGhlIE9SIGFzIGBzdWJtaXR0ZWRgXG4gIC8vIHRvIGF2b2lkIGNhc2NhZGluZyBhIG5ldyBwcm9wIHRocm91Z2ggNSsgY29tcG9uZW50czsgdGhlIHRvcC1sZXZlbFxuICAvLyBiYW5uZXIgYmVsb3cgcHJvdmlkZXMgdGhlIGFjY3VyYXRlIFwid2h5XCIgZm9yIGV4cGlyZWQgZGlzcHV0ZXMuXG4gIGNvbnN0IGxvY2tkb3duID0gc3VibWl0dGVkIHx8IGV4cGlyZWQ7XG5cbiAgY29uc3QgY3VycmVudEluZGV4ID0gV0laQVJEX1NURVBTLmluZGV4T2YoY3VycmVudFN0ZXApO1xuICBjb25zdCBpc0ZpcnN0U3RlcCA9IGN1cnJlbnRJbmRleCA9PT0gMDtcbiAgY29uc3QgaXNMYXN0U3RlcCA9IGN1cnJlbnRJbmRleCA9PT0gV0laQVJEX1NURVBTLmxlbmd0aCAtIDE7XG5cbiAgY29uc3QgaGFuZGxlTmV4dCA9ICgpID0+IHtcbiAgICBpZiAoIWlzTGFzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggKyAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0ZpcnN0U3RlcCkge1xuICAgICAgc2V0Q3VycmVudFN0ZXAoV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGF5c1JlbWFpbmluZyA9IGdldERheXNSZW1haW5pbmcoZGlzcHV0ZS5kdWVfYnkpO1xuICBjb25zdCBpc1VyZ2VudCA9IGRheXNSZW1haW5pbmcgPCA1ICYmICFpc1Jlc29sdmVkKGRpc3B1dGUuc3RhdHVzKTtcblxuICAvLyBQcmVmZXIgdGhlIGN1c3RvbWVyIG5hbWUgb24gdGhlIGRpc3B1dGVkIGNoYXJnZSBzbyBtZXJjaGFudHMgcmVjb2duaXplIHRoZVxuICAvLyBjYXNlIGF0IGEgZ2xhbmNlLiBGYWxsIGJhY2sgdG8gdGhlIGNoYXJnZSBkZXNjcmlwdGlvbiwgdGhlbiB0byB0aGUgc2hvcnRcbiAgLy8gZGlzcHV0ZSBpZCBpZiBuZWl0aGVyIGlzIGF2YWlsYWJsZSAoZS5nLiwgYmVmb3JlIGVucmljaG1lbnQpLlxuICBjb25zdCBmb2N1c1ZpZXdUaXRsZSA9IGRpc3B1dGUuY3VzdG9tZXJfbmFtZVxuICAgID8gYERpc3B1dGU6ICR7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfWBcbiAgICA6IGRpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uXG4gICAgICA/IGBEaXNwdXRlOiAke2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9ufWBcbiAgICAgIDogYERpc3B1dGUgJHtkaXNwdXRlLmlkLnNsaWNlKDAsIDEyKX0uLi5gO1xuXG4gIGNvbnN0IHJlbmRlclJldmlld1RhYiA9ICgpID0+IHtcbiAgICBjb25zdCBpc0xvYWRpbmdQbGF5Ym9vayA9IGxvYWRpbmcucGxheWJvb2s7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgICAge2Vycm9ycy5kaXNwdXRlICYmIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMuZGlzcHV0ZX0gLz59XG5cbiAgICAgICAge2lzTG9hZGluZ1BsYXlib29rID8gKFxuICAgICAgICAgIDxCb3ggY3NzPXt7IGFsaWduWDogJ2NlbnRlcicsIHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibWVkaXVtXCIgLz5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkxvYWRpbmcgcGxheWJvb2suLi48L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IGVycm9ycy5wbGF5Ym9vayA/IChcbiAgICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JzLnBsYXlib29rfSAvPlxuICAgICAgICApIDogcGxheWJvb2sgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxDb2FjaEhlYWRlclxuICAgICAgICAgICAgICBoZWFkbGluZT17cGxheWJvb2suY29hY2hfaGVhZGxpbmV9XG4gICAgICAgICAgICAgIHN1bW1hcnk9e3BsYXlib29rLmNvYWNoX3N1bW1hcnl9XG4gICAgICAgICAgICAgIHVyZ2VuY3lNb2RlPXtpc1VyZ2VudH1cbiAgICAgICAgICAgICAgZGF5c1JlbWFpbmluZz17ZGF5c1JlbWFpbmluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UXVpY2tBY3Rpb25zIHBsYXlib29rPXtwbGF5Ym9va30gdXJnZW5jeU1vZGU9e2lzVXJnZW50fSAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgIHRpdGxlPVwiTm8gcGxheWJvb2sgYXZhaWxhYmxlXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2UgZG9uJ3QgaGF2ZSBhIHNwZWNpZmljIHBsYXlib29rIGZvciB0aGlzIHJlYXNvbiBjb2RlIHlldC4gVXNlIHRoZSBnZW5lcmFsIGV2aWRlbmNlIGd1aWRlbGluZXMgdG8gYnVpbGQgeW91ciByZXNwb25zZS5cIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPERpc3B1dGVPdmVydmlldyBkaXNwdXRlPXtkaXNwdXRlfSBsb2FkaW5nPXtsb2FkaW5nLmRpc3B1dGV9IC8+XG5cbiAgICAgICAge3BsYXlib29rICYmIChcbiAgICAgICAgICA8TGVhcm5Nb3JlXG4gICAgICAgICAgICBpc3N1ZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9pc3N1ZXJfc3VtbWFyeX1cbiAgICAgICAgICAgIGFjcXVpcmVyU3VtbWFyeT17cGxheWJvb2suY29hY2hfYWNxdWlyZXJfc3VtbWFyeX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGb2N1c1ZpZXdcbiAgICAgIHRpdGxlPXtmb2N1c1ZpZXdUaXRsZX1cbiAgICAgIHNob3duPXtzaG93bn1cbiAgICAgIHNldFNob3duPXtzZXRTaG93bn1cbiAgICAgIGNvbmZpcm1DbG9zZU1lc3NhZ2VzPXt7XG4gICAgICAgIHRpdGxlOiAnTGVhdmUgZGlzcHV0ZSB3b3JrZmxvdz8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1lvdXIgcHJvZ3Jlc3Mgb24gdGhpcyBzdGVwIHdpbGwgbm90IGJlIHNhdmVkLicsXG4gICAgICAgIGNhbmNlbEFjdGlvbjogJ1N0YXknLFxuICAgICAgICBleGl0QWN0aW9uOiAnTGVhdmUnLFxuICAgICAgfX1cbiAgICAgIHByaW1hcnlBY3Rpb249e1xuICAgICAgICBpc0xhc3RTdGVwID8gKFxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXsoKSA9PiBzZXRTaG93bihmYWxzZSl9PlxuICAgICAgICAgICAge3N1Ym1pdHRlZCA/ICdEb25lJyA6ICdDbG9zZSd9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZU5leHR9PlxuICAgICAgICAgICAgTmV4dDoge1dJWkFSRF9TVEVQX0xBQkVMU1tXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV1dfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZWNvbmRhcnlBY3Rpb249e1xuICAgICAgICBpc0ZpcnN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9eygpID0+IHNldFNob3duKGZhbHNlKX0+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIEJhY2s6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgID5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBwYWRkaW5nQm90dG9tOiAnc21hbGwnLCBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAge3N1Ym1pdHRlZCAmJiAoXG4gICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFdmlkZW5jZSBzdWJtaXR0ZWRcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIllvdXIgZXZpZGVuY2UgaGFzIGJlZW4gc3VibWl0dGVkIHRvIFN0cmlwZS4gVGhpcyBkaXNwdXRlIGlzIG5vdyByZWFkLW9ubHkuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZXhwaXJlZCAmJiAoXG4gICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUmVzcG9uc2UgZGVhZGxpbmUgaGFzIHBhc3NlZFwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiTm8gZnVydGhlciBhY3Rpb24gY2FuIGJlIHRha2VuIG9uIHRoaXMgZGlzcHV0ZS4gRXZpZGVuY2UgdXBsb2FkcywgbmFycmF0aXZlIGdlbmVyYXRpb24sIGFuZCBzdWJtaXNzaW9uIGFyZSBkaXNhYmxlZC5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxEZWFkbGluZVRpbWVyIGR1ZUJ5PXtkaXNwdXRlLmR1ZV9ieX0gc3RhdHVzPXtkaXNwdXRlLnN0YXR1c30gLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxUYWJzXG4gICAgICAgICAgZml0dGVkXG4gICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgc2VsZWN0ZWRLZXk9e2N1cnJlbnRTdGVwfVxuICAgICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlPXsoa2V5KSA9PiBzZXRDdXJyZW50U3RlcChrZXkgYXMgV2l6YXJkU3RlcCl9XG4gICAgICAgID5cbiAgICAgICAgICA8VGFiTGlzdD5cbiAgICAgICAgICAgIHtXSVpBUkRfU1RFUFMubWFwKChzdGVwKSA9PiAoXG4gICAgICAgICAgICAgIDxUYWIga2V5PXtzdGVwfSBpZD17c3RlcH0+XG4gICAgICAgICAgICAgICAge1dJWkFSRF9TVEVQX0xBQkVMU1tzdGVwXX1cbiAgICAgICAgICAgICAgPC9UYWI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInJldmlld1wiPlxuICAgICAgICAgICAgICB7cmVuZGVyUmV2aWV3VGFiKCl9XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiZXZpZGVuY2VcIj5cbiAgICAgICAgICAgICAgey8qXG4gICAgICAgICAgICAgICAgSW50ZW50aW9uYWxseSBOT1QgZ2F0ZWQgb24gY3VycmVudFN0ZXAuIEtlZXBpbmcgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIG1vdW50ZWQgYWNyb3NzIHRhYiBzd2l0Y2hlcyBwcmVzZXJ2ZXMgY2hlY2tsaXN0IGFuZCBub3Rlc1xuICAgICAgICAgICAgICAgIHN0YXRlIHdoZW4gdGhlIG1lcmNoYW50IHRhYnMgYXdheSBhbmQgYmFjay4gVGhlIHByZXZpb3VzIGdhdGVcbiAgICAgICAgICAgICAgICB1bm1vdW50ZWQgdGhpcyBvbiBldmVyeSB0YWIgc3dpdGNoLCBraWxsaW5nIGFueSBwZW5kaW5nIHNhdmVcbiAgICAgICAgICAgICAgICBhbmQgcmUtcmVhZGluZyBzdGFsZSBzdGF0ZSBmcm9tIHRoZSBwYXJlbnQgZGlzcHV0ZSBwcm9wIG9uXG4gICAgICAgICAgICAgICAgcmVtb3VudC4gKFdJTi00OSlcbiAgICAgICAgICAgICAgKi99XG4gICAgICAgICAgICAgIDxFdmlkZW5jZUNoZWNrbGlzdFxuICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICBpc1VyZ2VudD17aXNVcmdlbnR9XG4gICAgICAgICAgICAgICAgZGF5c1JlbWFpbmluZz17ZGF5c1JlbWFpbmluZ31cbiAgICAgICAgICAgICAgICBzdWJtaXR0ZWQ9e2xvY2tkb3dufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cIm5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICB7Y3VycmVudFN0ZXAgPT09ICduYXJyYXRpdmUnICYmIChcbiAgICAgICAgICAgICAgPE5hcnJhdGl2ZVBhbmVsXG4gICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgICAgICAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2U9e3NldEVkaXRlZE5hcnJhdGl2ZX1cbiAgICAgICAgICAgICAgICBvbkFwcHJvdmU9eyh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRFZGl0ZWROYXJyYXRpdmUodGV4dCk7XG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50U3RlcCgnc3VibWl0Jyk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbk5hdmlnYXRlQmFjaz17KCkgPT4gc2V0Q3VycmVudFN0ZXAoJ2V2aWRlbmNlJyl9XG4gICAgICAgICAgICAgICAgc3VibWl0dGVkPXtsb2NrZG93bn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAge3N1Ym1pdHRlZCAmJiBkaXNwdXRlLmV2aWRlbmNlX3N1Ym1pdHRlZF9hdCA/IChcbiAgICAgICAgICAgICAgICA8U3VibWlzc2lvbkNvbmZpcm1hdGlvblxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2U9e3tcbiAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbl9pZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdHRlZF9hdDogZGlzcHV0ZS5ldmlkZW5jZV9zdWJtaXR0ZWRfYXQsXG4gICAgICAgICAgICAgICAgICAgIGRpc3B1dGVfc3RhdHVzOiAnZXZpZGVuY2Vfc3VibWl0dGVkJyxcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ3M6IFtdLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogZXhwaXJlZCA/IChcbiAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJTdWJtaXNzaW9uIGlzIG5vIGxvbmdlciBhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlRoaXMgZGlzcHV0ZSdzIHJlc3BvbnNlIGRlYWRsaW5lIGhhcyBwYXNzZWQuIFN0cmlwZSB3aWxsIG5vIGxvbmdlciBhY2NlcHQgZXZpZGVuY2UgZm9yIGl0LlwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApIDogcGxheWJvb2sgPyAoXG4gICAgICAgICAgICAgICAgPFN1Ym1pdFZpZXdcbiAgICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgICBldmlkZW5jZUZpbGVzPXtldmlkZW5jZUZpbGVzfVxuICAgICAgICAgICAgICAgICAgbmFycmF0aXZlVGV4dD17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXR0ZWQ9eyhyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXREaXNwdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5kaXNwdXRlLFxuICAgICAgICAgICAgICAgICAgICAgIGV2aWRlbmNlX3N1Ym1pdHRlZF9hdDogcmVzcG9uc2Uuc3VibWl0dGVkX2F0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICA8L1RhYlBhbmVscz5cbiAgICAgICAgPC9UYWJzPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Gb2N1c1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlV29ya2Zsb3c7XG4iLCAiZXhwb3J0IHR5cGUgRGlzcHV0ZVN0YXR1cyA9XG4gIHwgJ25lZWRzX3Jlc3BvbnNlJ1xuICB8ICd1bmRlcl9yZXZpZXcnXG4gIHwgJ3dvbidcbiAgfCAnbG9zdCdcbiAgfCAnd2FybmluZ19uZWVkc19yZXNwb25zZSdcbiAgfCAnd2FybmluZ191bmRlcl9yZXZpZXcnXG4gIHwgJ3dhcm5pbmdfY2xvc2VkJ1xuICB8ICdjaGFyZ2VfcmVmdW5kZWQnO1xuXG5leHBvcnQgdHlwZSBDYXJkTmV0d29yayA9ICd2aXNhJyB8ICdtYXN0ZXJjYXJkJyB8ICdhbWV4JyB8ICdkaXNjb3ZlcicgfCAndW5rbm93bic7XG5cbmV4cG9ydCB0eXBlIFdpemFyZFN0ZXAgPSAncmV2aWV3JyB8ICdldmlkZW5jZScgfCAnbmFycmF0aXZlJyB8ICdzdWJtaXQnO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBTOiBXaXphcmRTdGVwW10gPSBbJ3JldmlldycsICdldmlkZW5jZScsICduYXJyYXRpdmUnLCAnc3VibWl0J107XG5cbmV4cG9ydCBjb25zdCBXSVpBUkRfU1RFUF9MQUJFTFM6IFJlY29yZDxXaXphcmRTdGVwLCBzdHJpbmc+ID0ge1xuICByZXZpZXc6ICdSZXZpZXcnLFxuICBldmlkZW5jZTogJ0V2aWRlbmNlJyxcbiAgbmFycmF0aXZlOiAnTmFycmF0aXZlJyxcbiAgc3VibWl0OiAnU3VibWl0Jyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcHV0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBjdXJyZW5jeTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc3RhdHVzOiBEaXNwdXRlU3RhdHVzO1xuICBkdWVfYnk6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgbmV0d29yazogQ2FyZE5ldHdvcms7XG4gIHBheW1lbnRfaW50ZW50Pzogc3RyaW5nO1xuICBjaGFyZ2VfaWQ6IHN0cmluZztcbiAgY3VzdG9tZXJfbmFtZT86IHN0cmluZztcbiAgY3VzdG9tZXJfZW1haWw/OiBzdHJpbmc7XG4gIGNyZWF0ZWQ6IG51bWJlcjtcbiAgZXZpZGVuY2VfZHVlX2J5OiBudW1iZXI7XG4gIC8vIFdJTi0yNjogdHJ1ZSB1bnRpbCB0aGUgbWVyY2hhbnQgb3BlbnMgdGhlIGRpc3B1dGUgaW4gV2luQmFjay4gRHJpdmVzIHRoZVxuICAvLyBcIk5ld1wiIGJhZGdlIG9uIHRoZSBsaXN0IGNhcmQuXG4gIGlzX25ldz86IGJvb2xlYW47XG4gIC8vIEVucmljaGVkIGZpZWxkcyAoYXZhaWxhYmxlIGFmdGVyIGRldGFpbCBmZXRjaClcbiAgdHJhbnNhY3Rpb25fZGF0ZT86IG51bWJlcjtcbiAgY2FyZF9icmFuZD86IHN0cmluZztcbiAgY2FyZF9sYXN0ND86IHN0cmluZztcbiAgYmlsbGluZ19hZGRyZXNzPzogc3RyaW5nO1xuICBjaGFyZ2VfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJlY2VpcHRfdXJsPzogc3RyaW5nO1xuICBoYXNfZXZpZGVuY2U/OiBib29sZWFuO1xuICBldmlkZW5jZV9zdWJtaXNzaW9uX2NvdW50PzogbnVtYmVyO1xuICBpc19jaGFyZ2VfcmVmdW5kYWJsZT86IGJvb2xlYW47XG4gIG1ldGFkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgY2hlY2tsaXN0X3N0YXRlPzogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIGNoZWNrbGlzdF9ub3Rlcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIG5hcnJhdGl2ZV90ZXh0Pzogc3RyaW5nIHwgbnVsbDtcbiAgZXZpZGVuY2Vfc3VibWl0dGVkX2F0Pzogc3RyaW5nIHwgbnVsbDtcbiAgLy8gQXV0by1wdWxsIGZpZWxkcyAoV0lOLTM3KVxuICBhdnNfYWRkcmVzc19jaGVjaz86IHN0cmluZztcbiAgYXZzX3ppcF9jaGVjaz86IHN0cmluZztcbiAgY3ZjX2NoZWNrPzogc3RyaW5nO1xuICB0aHJlZV9kX3NlY3VyZV9yZXN1bHQ/OiBzdHJpbmc7XG4gIHRocmVlX2Rfc2VjdXJlX3ZlcnNpb24/OiBzdHJpbmc7XG4gIGF1dGhvcml6YXRpb25fY29kZT86IHN0cmluZztcbiAgbmV0d29ya19zdGF0dXM/OiBzdHJpbmc7XG4gIHJlZnVuZHM/OiBBcnJheTx7IGFtb3VudDogbnVtYmVyOyBjcmVhdGVkOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+O1xufVxuXG4vLyBQbGF5Ym9vayB0eXBlcyAobWlycm9ycyBiYWNrZW5kIFBsYXlib29rRGF0YSlcblxuZXhwb3J0IGludGVyZmFjZSBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0ge1xuICAvLyBTdGFibGUgaWRlbnRpZmllciB0aGF0IG1pcnJvcnMgYmFja2VuZC9saWIvcGxheWJvb2tzL3R5cGVzLnRzIEV2aWRlbmNlQ2hlY2tsaXN0SXRlbS5rZXkuXG4gIC8vIFVzZWQgZXZlcnl3aGVyZSB0aGUgcGxheWJvb2sgaXRlbSBuZWVkcyBhIHN0YWJsZSBoYW5kbGUgKGZpbGVzQnlLZXksXG4gIC8vIGNoZWNrbGlzdF9zdGF0ZSwgY2hlY2tsaXN0X25vdGVzKS4gVGhlIGBpdGVtYCBmaWVsZCBpcyB0aGUgZGlzcGxheSBsYWJlbC4gKFdJTi00MClcbiAga2V5OiBzdHJpbmc7XG4gIGl0ZW06IHN0cmluZztcbiAgY2F0ZWdvcnk6ICdtYW5kYXRvcnknIHwgJ3JlY29tbWVuZGVkJyB8ICdzaXR1YXRpb25hbCc7XG4gIGNvbnRleHQ6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIHdoeV9tYXR0ZXJzOiBzdHJpbmc7XG4gIHdoZXJlX3RvX2ZpbmQ/OiBzdHJpbmc7XG4gIHN0cmlwZV9maWVsZD86IHN0cmluZztcbiAgbmFycmF0aXZlX29ubHk/OiBib29sZWFuO1xuICAvLyBQZXItcGxheWJvb2sgY2FubmVkIG1lcmNoYW50IGFzc2VydGlvbiB1c2VkIGJ5IHRoZSBiYWNrZW5kIHByb21wdCBidWlsZGVyXG4gIC8vIHdoZW4gYSBUIGl0ZW0gaGFzIG5vIG1lcmNoYW50IG5vdGUuIEZyb250ZW5kIGRvZXNuJ3QgcmVuZGVyIHRoaXMgLS0gaXQnc1xuICAvLyBvbmx5IGhlcmUgc28gdGhlIHR5cGUgbWF0Y2hlcyB0aGUgYmFja2VuZCBwYXlsb2FkLiAoV0lOLTQ5KVxuICBuYXJyYXRpdmVfZmFsbGJhY2s/OiBzdHJpbmc7XG4gIHVyZ2VuY3lfZXNzZW50aWFsOiBib29sZWFuO1xuICB1cmdlbmN5X29yZGVyOiBudW1iZXIgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXlib29rRGF0YSB7XG4gIG5ldHdvcms6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvYWNoX2hlYWRsaW5lOiBzdHJpbmc7XG4gIGNvYWNoX3N1bW1hcnk6IHN0cmluZztcbiAgY29hY2hfaXNzdWVyX3N1bW1hcnk6IHN0cmluZztcbiAgY29hY2hfYWNxdWlyZXJfc3VtbWFyeTogc3RyaW5nO1xuICBpc3N1ZXJfZXZhbHVhdGlvbjogc3RyaW5nO1xuICBhY3F1aXJlcl9wcmVyZXZpZXc6IHN0cmluZztcbiAgZXZpZGVuY2VfY2hlY2tsaXN0OiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bXTtcbiAgY29tbW9uX21pc3Rha2VzOiB7IG1pc3Rha2U6IHN0cmluZzsgZXhwbGFuYXRpb246IHN0cmluZyB9W107XG4gIHByb190aXBzOiB7IHRpcDogc3RyaW5nIH1bXTtcbiAgdXJnZW5jeV9lc3NlbnRpYWxzOiB7IHN1bW1hcnk6IHN0cmluZzsgb3JkZXJlZF9pdGVtczogc3RyaW5nW10gfTtcbiAgbmFycmF0aXZlX3RlbXBsYXRlOiBzdHJpbmc7XG4gIHJlc3BvbnNlX2RlYWRsaW5lX2RheXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmlkZW5jZUZpbGUge1xuICBpZDogc3RyaW5nO1xuICBzdHJpcGVfZmlsZV9pZDogc3RyaW5nO1xuICBjaGVja2xpc3RfaXRlbV9rZXk6IHN0cmluZztcbiAgZmlsZV9uYW1lOiBzdHJpbmc7XG4gIGZpbGVfc2l6ZTogbnVtYmVyO1xuICBtaW1lX3R5cGU6IHN0cmluZztcbiAgdXBsb2FkZWRfYXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3VibWlzc2lvbldhcm5pbmcgPVxuICB8IHsgY29kZTogJ2ZpZWxkX3RydW5jYXRlZCc7IGZpZWxkOiBzdHJpbmc7IG9yaWdpbmFsX2xlbmd0aDogbnVtYmVyOyB0cnVuY2F0ZWRfbGVuZ3RoOiBudW1iZXIgfVxuICB8IHsgY29kZTogJ2ZpZWxkX2NvbGxpc2lvbic7IHdpbm5pbmdfaXRlbTogc3RyaW5nOyBsb3NpbmdfaXRlbTogc3RyaW5nOyBmaWVsZDogc3RyaW5nOyByZXNvbHV0aW9uOiAndW5jYXRlZ29yaXplZF9maWxlJyB8ICdkcm9wcGVkJyB9XG4gIHwgeyBjb2RlOiAnbWlzc2luZ19tYW5kYXRvcnlfaXRlbXMnOyBpdGVtczogc3RyaW5nW10gfVxuICB8IHsgY29kZTogJ2RlYWRsaW5lX3Bhc3NlZCc7IGR1ZV9ieTogbnVtYmVyIH1cbiAgfCB7IGNvZGU6ICdjb25jYXRfc2tpcHBlZCc7IGZpbGVfbmFtZTogc3RyaW5nOyBzbG90OiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VibWlzc2lvblJlc3BvbnNlIHtcbiAgc3VibWlzc2lvbl9pZDogc3RyaW5nO1xuICBzdWJtaXR0ZWRfYXQ6IHN0cmluZztcbiAgZGlzcHV0ZV9zdGF0dXM6IHN0cmluZztcbiAgd2FybmluZ3M6IFN1Ym1pc3Npb25XYXJuaW5nW107XG59XG4iLCAiaW1wb3J0IGZldGNoU3RyaXBlU2lnbmF0dXJlIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9zaWduYXR1cmUnO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5cbi8vIFRvZ2dsZSBmb3IgbG9jYWwgZGV2ZWxvcG1lbnQ6IHNldCB0byB0cnVlIHdoZW4gcnVubmluZyBgc3RyaXBlIGFwcHMgc3RhcnRgLlxuLy8gTVVTVCBiZSBmYWxzZSBmb3IgYW55IGJ1bmRsZSB1cGxvYWRlZCB0byBTdHJpcGUgKHN0cmlwZSBhcHBzIHVwbG9hZCksIGJlY2F1c2Vcbi8vIHRoZSBDU1AgY29ubmVjdC1zcmMgb24gdGhlIHVwbG9hZGVkIG1hbmlmZXN0IG9ubHkgYWxsb3dzIHRoZSBwcm9kdWN0aW9uIFVSTC5cbmNvbnN0IFVTRV9MT0NBTF9CQUNLRU5EID0gZmFsc2U7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gVVNFX0xPQ0FMX0JBQ0tFTkRcbiAgPyAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICA6ICdodHRwczovL3dpbmJhY2twYXkuY29tJztcblxuZXhwb3J0IGNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcHVibGljIHN0YXR1czogbnVtYmVyLFxuICAgIHB1YmxpYyBjb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnQXBpRXJyb3InO1xuICB9XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBBdXRvbWF0aWNhbGx5IGluY2x1ZGVzIFN0cmlwZSBBcHAgc2lnbmF0dXJlIGFuZCBpZGVudGl0eSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5kYXRhLFxuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5lcnJvciB8fCBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICBlcnJvci5jb2RlLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIE1ha2VzIGFuIGF1dGhlbnRpY2F0ZWQgUEFUQ0ggcmVxdWVzdCB0byB0aGUgV2luQmFjayBiYWNrZW5kLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0Y2hCYWNrZW5kPFQgPSB1bmtub3duPihcbiAgcGF0aDogc3RyaW5nLFxuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUsXG4gIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5kYXRhLFxuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdTdHJpcGUtU2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgIH0sXG4gICAgYm9keSxcbiAgfSk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBlcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICB9KSk7XG4gICAgdGhyb3cgbmV3IEFwaUVycm9yKFxuICAgICAgZXJyb3IuZXJyb3IgfHwgZXJyb3IubWVzc2FnZSB8fCBgQVBJIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgZXJyb3IuY29kZSxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIFBPU1QgcmVxdWVzdCB0byBhIFwiZGVsZXRlXCIgZW5kcG9pbnQgb24gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqIFVzZXMgUE9TVCBiZWNhdXNlIFN0cmlwZSBBcHAgc2lnbmF0dXJlIHZlcmlmaWNhdGlvbiByZXF1aXJlcyBhIGJvZHksXG4gKiBhbmQgc29tZSBwcm94aWVzIHN0cmlwIGJvZGllcyBmcm9tIERFTEVURSByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLmVycm9yIHx8IGVycm9yLm1lc3NhZ2UgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGVycm9yLmNvZGUsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDYXJkTmV0d29yaywgRGlzcHV0ZVN0YXR1cyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBSRUFTT05fQ09ERV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICd2aXNhOjEwLjQnOiAnRnJhdWQgLS0gQ2FyZCBOb3QgUHJlc2VudCcsXG4gICd2aXNhOjEzLjEnOiAnTWVyY2hhbmRpc2UgLyBTZXJ2aWNlcyBOb3QgUmVjZWl2ZWQnLFxuICAndmlzYToxMy4yJzogJ0NhbmNlbGxlZCBSZWN1cnJpbmcgVHJhbnNhY3Rpb24nLFxuICAndmlzYToxMy4zJzogJ05vdCBhcyBEZXNjcmliZWQgb3IgRGVmZWN0aXZlJyxcbiAgJ3Zpc2E6MTMuNic6ICdDcmVkaXQgTm90IFByb2Nlc3NlZCcsXG4gICdtYXN0ZXJjYXJkOjQ4MDgnOiAnQXV0aG9yaXphdGlvbi1SZWxhdGVkIERpc3B1dGUnLFxuICAnbWFzdGVyY2FyZDo0ODUzJzogJ05vdCBhcyBEZXNjcmliZWQgLyBEZWZlY3RpdmUnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYXNvbkNvZGVMYWJlbChuZXR3b3JrOiBDYXJkTmV0d29yaywgcmVhc29uQ29kZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBSRUFTT05fQ09ERV9MQUJFTFNbYCR7bmV0d29ya306JHtyZWFzb25Db2RlfWBdID8/IG51bGw7XG59XG5cbmNvbnN0IFJFU09MVkVEX1NUQVRVU0VTOiBEaXNwdXRlU3RhdHVzW10gPSBbJ3dvbicsICdsb3N0JywgJ3dhcm5pbmdfY2xvc2VkJywgJ2NoYXJnZV9yZWZ1bmRlZCddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNvbHZlZChzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gUkVTT0xWRURfU1RBVFVTRVMuaW5jbHVkZXMoc3RhdHVzIGFzIERpc3B1dGVTdGF0dXMpO1xufVxuXG4vKipcbiAqIEEgZGlzcHV0ZSBpcyBcImV4cGlyZWRcIiB3aGVuIHRoZSBkZWFkbGluZSBoYXMgcGFzc2VkIGJ1dCBTdHJpcGUgc3RpbGxcbiAqIHJlcG9ydHMgaXQgYXMgbmVlZHNfcmVzcG9uc2UuIEF1dGhvcml0YXRpdmUgc291cmNlIGZvciB0aGUgYmFja2VuZCBpc1xuICogc3RyaXBlRGlzcHV0ZS5zdGF0dXM7IHRoZSBVSSB1c2VzIGR1ZV9ieSBhcyBhIGxlYWRpbmcgaW5kaWNhdG9yIGJlZm9yZVxuICogU3RyaXBlIGZsaXBzIHRoZSBzdGF0dXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Rpc3B1dGVFeHBpcmVkKGR1ZUJ5OiBzdHJpbmcsIHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmIChzdGF0dXMgIT09ICduZWVkc19yZXNwb25zZScgJiYgc3RhdHVzICE9PSAnd2FybmluZ19uZWVkc19yZXNwb25zZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGdldFRpbWVSZW1haW5pbmcoZHVlQnkpLmlzRXhwaXJlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXR1c0JhZGdlKHN0YXR1czogc3RyaW5nKToge1xuICBsYWJlbDogc3RyaW5nO1xuICB0eXBlOiAndXJnZW50JyB8ICd3YXJuaW5nJyB8ICdwb3NpdGl2ZScgfCAnbmVnYXRpdmUnIHwgJ2luZm8nO1xufSB7XG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSAnbmVlZHNfcmVzcG9uc2UnOlxuICAgIGNhc2UgJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdOZWVkcyBSZXNwb25zZScsIHR5cGU6ICd1cmdlbnQnIH07XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICBjYXNlICd3YXJuaW5nX3VuZGVyX3Jldmlldyc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ1VuZGVyIFJldmlldycsIHR5cGU6ICdpbmZvJyB9O1xuICAgIGNhc2UgJ3dvbic6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ1dvbicsIHR5cGU6ICdwb3NpdGl2ZScgfTtcbiAgICBjYXNlICdsb3N0JzpcbiAgICBjYXNlICd3YXJuaW5nX2Nsb3NlZCc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ0xvc3QnLCB0eXBlOiAnbmVnYXRpdmUnIH07XG4gICAgY2FzZSAnY2hhcmdlX3JlZnVuZGVkJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnUmVmdW5kZWQnLCB0eXBlOiAnaW5mbycgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHsgbGFiZWw6IHN0YXR1cywgdHlwZTogJ2luZm8nIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNSZW1haW5pbmcoZHVlQnk6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGR1ZSA9IG5ldyBEYXRlKGR1ZUJ5KTtcbiAgcmV0dXJuIE1hdGguY2VpbCgoZHVlLmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaW1lUmVtYWluaW5nIHtcbiAgZGF5czogbnVtYmVyO1xuICBob3VyczogbnVtYmVyO1xuICBpc0V4cGlyZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5OiBzdHJpbmcpOiBUaW1lUmVtYWluaW5nIHtcbiAgY29uc3QgdG90YWxNcyA9IG5ldyBEYXRlKGR1ZUJ5KS5nZXRUaW1lKCkgLSBEYXRlLm5vdygpO1xuICBpZiAodG90YWxNcyA8PSAwKSByZXR1cm4geyBkYXlzOiAwLCBob3VyczogMCwgaXNFeHBpcmVkOiB0cnVlIH07XG4gIGNvbnN0IHRvdGFsSG91cnMgPSBNYXRoLmZsb29yKHRvdGFsTXMgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgcmV0dXJuIHtcbiAgICBkYXlzOiBNYXRoLmZsb29yKHRvdGFsSG91cnMgLyAyNCksXG4gICAgaG91cnM6IHRvdGFsSG91cnMgJSAyNCxcbiAgICBpc0V4cGlyZWQ6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcmdlbmN5VGllciA9ICd1cmdlbnQnIHwgJ3dhcm5pbmcnIHwgJ3Bvc2l0aXZlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVyZ2VuY3lUaWVyKGRheXM6IG51bWJlcik6IFVyZ2VuY3lUaWVyIHtcbiAgaWYgKGRheXMgPCA1KSByZXR1cm4gJ3VyZ2VudCc7XG4gIGlmIChkYXlzIDw9IDEzKSByZXR1cm4gJ3dhcm5pbmcnO1xuICByZXR1cm4gJ3Bvc2l0aXZlJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVyZ2VuY3lCYWRnZShcbiAgZHVlQnk6IHN0cmluZyxcbiAgc3RhdHVzOiBzdHJpbmcsXG4pOiB7IGxhYmVsOiBzdHJpbmc7IHR5cGU6IFVyZ2VuY3lUaWVyIH0gfCBudWxsIHtcbiAgaWYgKGlzUmVzb2x2ZWQoc3RhdHVzKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgdGltZSA9IGdldFRpbWVSZW1haW5pbmcoZHVlQnkpO1xuICBjb25zdCB0aWVyID0gZ2V0VXJnZW5jeVRpZXIodGltZS5kYXlzKTtcblxuICBpZiAodGltZS5pc0V4cGlyZWQpIHJldHVybiB7IGxhYmVsOiAnRXhwaXJlZCcsIHR5cGU6ICd1cmdlbnQnIH07XG4gIGlmICh0aW1lLmRheXMgPCA1KSByZXR1cm4geyBsYWJlbDogYCR7dGltZS5kYXlzfWQgJHt0aW1lLmhvdXJzfWggbGVmdGAsIHR5cGU6IHRpZXIgfTtcbiAgcmV0dXJuIHsgbGFiZWw6IGAke3RpbWUuZGF5c31kIGxlZnRgLCB0eXBlOiB0aWVyIH07XG59XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9FcnJvckJhbm5lci50c3hcblxuaW1wb3J0IHsgQmFubmVyLCBCb3gsIEJ1dHRvbiB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBFcnJvckJhbm5lclByb3BzIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBvblJldHJ5PzogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgRXJyb3JCYW5uZXIgPSAoeyBtZXNzYWdlLCBvblJldHJ5IH06IEVycm9yQmFubmVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCYW5uZXJcbiAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgdGl0bGU9XCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgICAgIGRlc2NyaXB0aW9uPXttZXNzYWdlfVxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICBvblJldHJ5ID8gKFxuICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtvblJldHJ5fT5SZXRyeTwvQnV0dG9uPlxuICAgICAgICAgICkgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQmFubmVyO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJhZGdlLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHsgZ2V0VGltZVJlbWFpbmluZywgZ2V0VXJnZW5jeVRpZXIsIGlzUmVzb2x2ZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGVhZGxpbmVUaW1lclByb3BzIHtcbiAgZHVlQnk6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmNvbnN0IERlYWRsaW5lVGltZXIgPSAoeyBkdWVCeSwgc3RhdHVzIH06IERlYWRsaW5lVGltZXJQcm9wcykgPT4ge1xuICBjb25zdCBbLCBzZXRUaWNrXSA9IHVzZVN0YXRlKDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiBzZXRUaWNrKCh0KSA9PiB0ICsgMSksIDYwXzAwMCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaWQpO1xuICB9LCBbZHVlQnldKTtcblxuICBpZiAoIWR1ZUJ5IHx8IGlzUmVzb2x2ZWQoc3RhdHVzKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgdGltZSA9IGdldFRpbWVSZW1haW5pbmcoZHVlQnkpO1xuICBjb25zdCB0aWVyID0gZ2V0VXJnZW5jeVRpZXIodGltZS5kYXlzKTtcbiAgY29uc3QgaXNVcmdlbnQgPSB0aW1lLmRheXMgPCA1ICYmICF0aW1lLmlzRXhwaXJlZDtcblxuICBjb25zdCBsYWJlbCA9IHRpbWUuaXNFeHBpcmVkXG4gICAgPyAnRGVhZGxpbmUgcGFzc2VkJ1xuICAgIDogdGltZS5kYXlzID09PSAwXG4gICAgICA/IGAke3RpbWUuaG91cnN9aCByZW1haW5pbmdgXG4gICAgICA6IGAke3RpbWUuZGF5c31kICR7dGltZS5ob3Vyc31oIHJlbWFpbmluZ2A7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBjc3M9e3tcbiAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgIHBhZGRpbmc6ICdzbWFsbCcsXG4gICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ3NlbWlib2xkJywgY29sb3I6IGlzVXJnZW50ID8gJ2NyaXRpY2FsJyA6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICB7aXNVcmdlbnQgPyAnUmVzcG9uZCBub3cnIDogJ1Jlc3BvbnNlIGRlYWRsaW5lJ31cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPEJhZGdlIHR5cGU9e3RpbWUuaXNFeHBpcmVkID8gJ3VyZ2VudCcgOiB0aWVyfT57bGFiZWx9PC9CYWRnZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlYWRsaW5lVGltZXI7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgRGl2aWRlciwgSW5saW5lLCBMaW5rLCBTcGlubmVyIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSB9IGZyb20gJy4uLy4uL2xpYi91dGlscyc7XG5cbmludGVyZmFjZSBEaXNwdXRlT3ZlcnZpZXdQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBJbmZvUm93UHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogUmVhY3QuUmVhY3ROb2RlO1xufVxuXG5mdW5jdGlvbiBJbmZvUm93KHsgbGFiZWwsIHZhbHVlIH06IEluZm9Sb3dQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+e2xhYmVsfTwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19Pnt2YWx1ZX08L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QW1vdW50KGFtb3VudDogbnVtYmVyLCBjdXJyZW5jeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5LnRvVXBwZXJDYXNlKCksXG4gIH0pLmZvcm1hdChhbW91bnQgLyAxMDApO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKHRpbWVzdGFtcDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCAqIDEwMDApLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICB9KTtcbn1cblxuY29uc3QgRGlzcHV0ZU92ZXJ2aWV3ID0gKHsgZGlzcHV0ZSwgbG9hZGluZyB9OiBEaXNwdXRlT3ZlcnZpZXdQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNCYWRnZSA9IGdldFN0YXR1c0JhZGdlKGRpc3B1dGUuc3RhdHVzKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScsIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIHBhZGRpbmc6ICdtZWRpdW0nLCBib3JkZXJSYWRpdXM6ICdtZWRpdW0nIH19PlxuICAgICAgey8qIEhlYWRlcjogYW1vdW50ICsgc3RhdHVzICovfVxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ2JvbGQnIH19PlxuICAgICAgICAgIHtmb3JtYXRBbW91bnQoZGlzcHV0ZS5hbW91bnQsIGRpc3B1dGUuY3VycmVuY3kpfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBDdXN0b21lciBpbmZvICovfVxuICAgICAgeyhkaXNwdXRlLmN1c3RvbWVyX25hbWUgfHwgZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCkgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX25hbWUgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJDdXN0b21lclwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX25hbWV9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIkVtYWlsXCIgdmFsdWU9e2Rpc3B1dGUuY3VzdG9tZXJfZW1haWx9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICA8RGl2aWRlciAvPlxuXG4gICAgICB7LyogRW5yaWNoZWQgc2VjdGlvbiAqL31cbiAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnc21hbGwnLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jYXJkX2JyYW5kICYmIGRpc3B1dGUuY2FyZF9sYXN0NCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIkNhcmRcIlxuICAgICAgICAgICAgICB2YWx1ZT17YCR7ZGlzcHV0ZS5jYXJkX2JyYW5kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZGlzcHV0ZS5jYXJkX2JyYW5kLnNsaWNlKDEpfSBlbmRpbmcgaW4gJHtkaXNwdXRlLmNhcmRfbGFzdDR9YH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiVHJhbnNhY3Rpb24gZGF0ZVwiIHZhbHVlPXtmb3JtYXREYXRlKGRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSl9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJEZXNjcmlwdGlvblwiIHZhbHVlPXtkaXNwdXRlLmNoYXJnZV9kZXNjcmlwdGlvbn0gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLmJpbGxpbmdfYWRkcmVzcyAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIkJpbGxpbmcgYWRkcmVzc1wiIHZhbHVlPXtkaXNwdXRlLmJpbGxpbmdfYWRkcmVzc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLnJlY2VpcHRfdXJsICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93XG4gICAgICAgICAgICAgIGxhYmVsPVwiUmVjZWlwdFwiXG4gICAgICAgICAgICAgIHZhbHVlPXs8TGluayBocmVmPXtkaXNwdXRlLnJlY2VpcHRfdXJsfSB0YXJnZXQ9XCJfYmxhbmtcIj5WaWV3IHJlY2VpcHQ8L0xpbms+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLm1ldGFkYXRhICYmIE9iamVjdC5rZXlzKGRpc3B1dGUubWV0YWRhdGEpLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKGRpc3B1dGUubWV0YWRhdGEpLm1hcCgoW2tleSwgdmFsXSkgPT4gKFxuICAgICAgICAgICAgICAgIDxJbmZvUm93IGtleT17a2V5fSBsYWJlbD17a2V5fSB2YWx1ZT17dmFsfSAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgey8qIEZvb3RlcjogSURzICovfVxuICAgICAgPERpdmlkZXIgLz5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3h4c21hbGwnIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PkRpc3B1dGU6IHtkaXNwdXRlLmlkfTwvSW5saW5lPlxuICAgICAgICB7ZGlzcHV0ZS5jaGFyZ2VfaWQgJiYgKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdkaXNhYmxlZCcgfX0+Q2hhcmdlOiB7ZGlzcHV0ZS5jaGFyZ2VfaWR9PC9JbmxpbmU+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVPdmVydmlldztcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgQ29hY2hIZWFkZXJQcm9wcyB7XG4gIGhlYWRsaW5lOiBzdHJpbmc7XG4gIHN1bW1hcnk6IHN0cmluZztcbiAgdXJnZW5jeU1vZGU6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc/OiBudW1iZXI7XG59XG5cbmNvbnN0IENvYWNoSGVhZGVyID0gKHsgaGVhZGxpbmUsIHN1bW1hcnksIHVyZ2VuY3lNb2RlLCBkYXlzUmVtYWluaW5nIH06IENvYWNoSGVhZGVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcsIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIHBhZGRpbmc6ICdtZWRpdW0nLCBib3JkZXJSYWRpdXM6ICdtZWRpdW0nIH19PlxuICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+QUkgQ29hY2g8L0JhZGdlPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICB7aGVhZGxpbmV9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICB7dXJnZW5jeU1vZGUgJiYgZGF5c1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBgWW91IGhhdmUgJHtkYXlzUmVtYWluaW5nfSBkYXkke2RheXNSZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30uIEZvY3VzIG9uIHRoZSBlc3NlbnRpYWxzIGJlbG93LmBcbiAgICAgICAgICA6IHN1bW1hcnl9XG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvYWNoSGVhZGVyO1xuIiwgImltcG9ydCB7IEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgUGxheWJvb2tEYXRhIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcblxuaW50ZXJmYWNlIFF1aWNrQWN0aW9uc1Byb3BzIHtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YTtcbiAgdXJnZW5jeU1vZGU6IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIGRlcml2ZUFjdGlvbnMocGxheWJvb2s6IFBsYXlib29rRGF0YSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgYWN0aW9uczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdCBtYW5kYXRvcnlJdGVtcyA9IHBsYXlib29rLmV2aWRlbmNlX2NoZWNrbGlzdFxuICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY2F0ZWdvcnkgPT09ICdtYW5kYXRvcnknICYmIGl0ZW0uY29udGV4dCA9PT0gJ2FsbCcpXG4gICAgLnNsaWNlKDAsIDMpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgbWFuZGF0b3J5SXRlbXMpIHtcbiAgICBhY3Rpb25zLnB1c2goYENvbmZpcm0geW91IGhhdmU6ICR7aXRlbS5pdGVtLnRvTG93ZXJDYXNlKCl9YCk7XG4gIH1cblxuICBjb25zdCB0b3BNaXN0YWtlcyA9IHBsYXlib29rLmNvbW1vbl9taXN0YWtlcy5zbGljZSgwLCAyKTtcbiAgZm9yIChjb25zdCBtaXN0YWtlIG9mIHRvcE1pc3Rha2VzKSB7XG4gICAgY29uc3QgcmVmcmFtZWQgPSBtaXN0YWtlLm1pc3Rha2Uuc3RhcnRzV2l0aCgnTm90ICcpXG4gICAgICA/IGBNYWtlIHN1cmUgeW91J3JlICR7bWlzdGFrZS5taXN0YWtlLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCl9YFxuICAgICAgOiBtaXN0YWtlLm1pc3Rha2Uuc3RhcnRzV2l0aCgnU2tpcHBpbmcgJylcbiAgICAgICAgPyBgTWFrZSBzdXJlIHlvdSdyZSB1c2luZyAke21pc3Rha2UubWlzdGFrZS5zbGljZSg5KS50b0xvd2VyQ2FzZSgpfWBcbiAgICAgICAgOiBgQ2hlY2s6ICR7bWlzdGFrZS5taXN0YWtlLnRvTG93ZXJDYXNlKCl9YDtcbiAgICBhY3Rpb25zLnB1c2gocmVmcmFtZWQpO1xuICB9XG5cbiAgcmV0dXJuIGFjdGlvbnMuc2xpY2UoMCwgNSk7XG59XG5cbmNvbnN0IFF1aWNrQWN0aW9ucyA9ICh7IHBsYXlib29rLCB1cmdlbmN5TW9kZSB9OiBRdWlja0FjdGlvbnNQcm9wcykgPT4ge1xuICBjb25zdCBpdGVtcyA9IHVyZ2VuY3lNb2RlXG4gICAgPyBwbGF5Ym9vay51cmdlbmN5X2Vzc2VudGlhbHMub3JkZXJlZF9pdGVtc1xuICAgIDogZGVyaXZlQWN0aW9ucyhwbGF5Ym9vayk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICB7dXJnZW5jeU1vZGUgPyAnRm9jdXMgb24gdGhlc2UgZXNzZW50aWFscycgOiAnWW91ciBuZXh0IHN0ZXBzJ31cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAge2l0ZW1zLm1hcCgodGV4dCwgaW5kZXgpID0+IChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnc3VyZmFjZScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICdzbWFsbCcsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3NtYWxsJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgICBhbGlnblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxLzEyJyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICB7aW5kZXggKyAxfS5cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT57dGV4dH08L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSl9XG4gICAgICA8L0JveD5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICBEb24ndCB3b3JyeSwgd2UnbGwgd2FsayB5b3UgdGhyb3VnaCBlYWNoIG9mIHRoZXNlIG9uIHRoZSBuZXh0IHN0ZXAuXG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFF1aWNrQWN0aW9ucztcbiIsICJpbXBvcnQgeyBBY2NvcmRpb24sIEFjY29yZGlvbkl0ZW0sIEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIExlYXJuTW9yZVByb3BzIHtcbiAgaXNzdWVyU3VtbWFyeTogc3RyaW5nO1xuICBhY3F1aXJlclN1bW1hcnk6IHN0cmluZztcbn1cblxuY29uc3QgTGVhcm5Nb3JlID0gKHsgaXNzdWVyU3VtbWFyeSwgYWNxdWlyZXJTdW1tYXJ5IH06IExlYXJuTW9yZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEFjY29yZGlvbj5cbiAgICAgIDxBY2NvcmRpb25JdGVtIHRpdGxlPVwiV2h5IHRoaXMgbWF0dGVyc1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCB0aGUgYmFuayBjaGVja3NcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtpc3N1ZXJTdW1tYXJ5fVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBXaGF0IGhhcHBlbnMgdG8geW91ciByZXNwb25zZVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2FjcXVpcmVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICA8L0FjY29yZGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExlYXJuTW9yZTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYW5uZXIsIERpdmlkZXIsIElubGluZSwgTGluayB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgUGxheWJvb2tEYXRhLCBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0sIEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBwYXRjaEJhY2tlbmQsIGZldGNoQmFja2VuZCB9IGZyb20gJy4uLy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgZ2V0U3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuLi8uLi9saWIvc3RyaXBlLWZpZWxkLXN0YXR1cyc7XG5pbXBvcnQgdHlwZSB7IFN0cmlwZUZpZWxkU3RhdHVzLCBTdHJpcGVGaWVsZFJlc3VsdCB9IGZyb20gJy4uLy4uL2xpYi9zdHJpcGUtZmllbGQtc3RhdHVzJztcbmltcG9ydCBDaGVja2xpc3RQcm9ncmVzcyBmcm9tICcuL0NoZWNrbGlzdFByb2dyZXNzJztcbmltcG9ydCBDaGVja2xpc3RJdGVtIGZyb20gJy4vQ2hlY2tsaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IEV4cGFuZGVkU2VjdGlvbiB9IGZyb20gJy4vQ2hlY2tsaXN0SXRlbSc7XG5cbi8vIFJlLWV4cG9ydCBmb3IgY29uc3VtZXJzIHRoYXQgaW1wb3J0ZWQgZnJvbSB0aGlzIG1vZHVsZVxuZXhwb3J0IHR5cGUgeyBTdHJpcGVGaWVsZFN0YXR1cywgU3RyaXBlRmllbGRSZXN1bHQgfTtcblxuaW50ZXJmYWNlIEV2aWRlbmNlQ2hlY2tsaXN0UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhIHwgbnVsbDtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBpc1VyZ2VudDogYm9vbGVhbjtcbiAgZGF5c1JlbWFpbmluZzogbnVtYmVyO1xuICBzdWJtaXR0ZWQ/OiBib29sZWFuO1xufVxuXG50eXBlIENoZWNrbGlzdFN0YXRlID0gUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG50eXBlIE5vdGVzU3RhdGUgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG5jb25zdCBDQVRFR09SWV9PUkRFUjogRXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddW10gPSBbJ21hbmRhdG9yeScsICdyZWNvbW1lbmRlZCcsICdzaXR1YXRpb25hbCddO1xuXG5jb25zdCBDQVRFR09SWV9MQUJFTFM6IFJlY29yZDxFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bJ2NhdGVnb3J5J10sIHN0cmluZz4gPSB7XG4gIG1hbmRhdG9yeTogJ01hbmRhdG9yeScsXG4gIHJlY29tbWVuZGVkOiAnUmVjb21tZW5kZWQnLFxuICBzaXR1YXRpb25hbDogJ1NpdHVhdGlvbmFsJyxcbn07XG5cbi8qKlxuICogQnVpbGRzIHRoZSBpbml0aWFsIGNoZWNrbGlzdCBzdGF0ZSBieSBtZXJnaW5nOlxuICogMS4gRGVmYXVsdCAoYWxsIGZhbHNlKVxuICogMi4gQXV0by1wb3B1bGF0ZWQgaXRlbXMgKHRydWUgaWYgU3RyaXBlIGRhdGEgZXhpc3RzKVxuICogMy4gU2F2ZWQgc3RhdGUgZnJvbSBTdXBhYmFzZSAob3ZlcnJpZGVzIGV2ZXJ5dGhpbmcpXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkSW5pdGlhbFN0YXRlKFxuICBpdGVtczogRXZpZGVuY2VDaGVja2xpc3RJdGVtW10sXG4gIGRpc3B1dGU6IERpc3B1dGUsXG4pOiBDaGVja2xpc3RTdGF0ZSB7XG4gIGNvbnN0IHN0YXRlOiBDaGVja2xpc3RTdGF0ZSA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBzdGF0ZVtpdGVtLmtleV0gPSBmYWxzZTtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRTdHJpcGVGaWVsZFJlc3VsdChpdGVtLCBkaXNwdXRlKTtcbiAgICBpZiAocmVzdWx0Py5zdGF0dXMgPT09ICdwb3NpdGl2ZScpIHtcbiAgICAgIHN0YXRlW2l0ZW0ua2V5XSA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSkge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRpc3B1dGUuY2hlY2tsaXN0X3N0YXRlKSkge1xuICAgICAgaWYgKGtleSBpbiBzdGF0ZSkge1xuICAgICAgICBzdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuY29uc3QgRXZpZGVuY2VDaGVja2xpc3QgPSAoeyBkaXNwdXRlLCBwbGF5Ym9vaywgY29udGV4dCwgaXNVcmdlbnQsIGRheXNSZW1haW5pbmcsIHN1Ym1pdHRlZCB9OiBFdmlkZW5jZUNoZWNrbGlzdFByb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gcGxheWJvb2s/LmV2aWRlbmNlX2NoZWNrbGlzdCA/PyBbXTtcbiAgY29uc3QgW2NoZWNrbGlzdFN0YXRlLCBzZXRDaGVja2xpc3RTdGF0ZV0gPSB1c2VTdGF0ZTxDaGVja2xpc3RTdGF0ZT4oKCkgPT5cbiAgICBidWlsZEluaXRpYWxTdGF0ZShpdGVtcywgZGlzcHV0ZSksXG4gICk7XG4gIGNvbnN0IFtub3Rlc1N0YXRlLCBzZXROb3Rlc1N0YXRlXSA9IHVzZVN0YXRlPE5vdGVzU3RhdGU+KFxuICAgICgpID0+IGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzID8/IHt9LFxuICApO1xuICAvLyBULWNhdGVnb3J5IChuYXJyYXRpdmVfb25seSkgaXRlbXMgZGVmYXVsdCB0byBoYXZpbmcgdGhlaXIgbm90ZXMgc2VjdGlvblxuICAvLyBleHBhbmRlZCAtLSBpdCdzIHRoZSBvbmx5IHBsYWNlIG1lcmNoYW50cyBjYW4gY29udHJpYnV0ZSBmb3IgdGhlc2UgaXRlbXMsXG4gIC8vIHNvIGNvbGxhcHNpbmcgaXQgaHVydHMgZGlzY292ZXJhYmlsaXR5LiAoV0lOLTQ5KVxuICBjb25zdCBbZXhwYW5kZWRTZWN0aW9ucywgc2V0RXhwYW5kZWRTZWN0aW9uc10gPSB1c2VTdGF0ZTxNYXA8c3RyaW5nLCBTZXQ8RXhwYW5kZWRTZWN0aW9uPj4+KFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBuZXcgTWFwPHN0cmluZywgU2V0PEV4cGFuZGVkU2VjdGlvbj4+KCk7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKGl0ZW0ubmFycmF0aXZlX29ubHkpIHtcbiAgICAgICAgICBpbml0aWFsLnNldChpdGVtLmtleSwgbmV3IFNldDxFeHBhbmRlZFNlY3Rpb24+KFsnbm90ZXMnXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5pdGlhbDtcbiAgICB9XG4gICk7XG4gIGNvbnN0IFtmaWxlc1N0YXRlLCBzZXRGaWxlc1N0YXRlXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV2aWRlbmNlRmlsZSB8IG51bGw+Pih7fSk7XG4gIGNvbnN0IFtzaG93RnVsbENoZWNrbGlzdCwgc2V0U2hvd0Z1bGxDaGVja2xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZnMgZm9yIGRlYm91bmNlZCBzYXZlc1xuICBjb25zdCBjaGVja2xpc3RUaW1lb3V0UmVmID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IG5vdGVzVGltZW91dFJlZiA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIC8vIFJlYnVpbGQgc3RhdGUgd2hlbiBkaXNwdXRlIG9yIHBsYXlib29rIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBuZXh0Q2hlY2tsaXN0ID0gYnVpbGRJbml0aWFsU3RhdGUoaXRlbXMsIGRpc3B1dGUpO1xuICAgIHNldENoZWNrbGlzdFN0YXRlKG5leHRDaGVja2xpc3QpO1xuICAgIGxhdGVzdENoZWNrbGlzdFJlZi5jdXJyZW50ID0gbmV4dENoZWNrbGlzdDtcbiAgICBjb25zdCBuZXh0Tm90ZXMgPSBkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcyA/PyB7fTtcbiAgICBzZXROb3Rlc1N0YXRlKG5leHROb3Rlcyk7XG4gICAgbGF0ZXN0Tm90ZXNSZWYuY3VycmVudCA9IG5leHROb3RlcztcbiAgICAvLyBSZS1zZWVkIFQtaXRlbSBub3RlcyBhcyBleHBhbmRlZCB3aGVuIHN3aXRjaGluZyBwbGF5Ym9va3MuIChXSU4tNDkpXG4gICAgY29uc3QgbmV4dEV4cGFuZGVkID0gbmV3IE1hcDxzdHJpbmcsIFNldDxFeHBhbmRlZFNlY3Rpb24+PigpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKGl0ZW0ubmFycmF0aXZlX29ubHkpIHtcbiAgICAgICAgbmV4dEV4cGFuZGVkLnNldChpdGVtLmtleSwgbmV3IFNldDxFeHBhbmRlZFNlY3Rpb24+KFsnbm90ZXMnXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRFeHBhbmRlZFNlY3Rpb25zKG5leHRFeHBhbmRlZCk7XG4gIH0sIFtkaXNwdXRlLmlkLCBkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSwgZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMsIHBsYXlib29rPy5yZWFzb25fY29kZV0pO1xuXG4gIC8vIEZldGNoIGV2aWRlbmNlIGZpbGVzIG9uIG1vdW50IC8gZGlzcHV0ZSBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEZpbGVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRXZpZGVuY2VGaWxlW10gfT4oXG4gICAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfS9ldmlkZW5jZS1maWxlc2AsXG4gICAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaWxlTWFwOiBSZWNvcmQ8c3RyaW5nLCBFdmlkZW5jZUZpbGUgfCBudWxsPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVzdWx0LmRhdGEpIHtcbiAgICAgICAgICBmaWxlTWFwW2ZpbGUuY2hlY2tsaXN0X2l0ZW1fa2V5XSA9IGZpbGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmlsZXNTdGF0ZShmaWxlTWFwKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZXZpZGVuY2UgZmlsZXM6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZldGNoRmlsZXMoKTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICAvLyBIb2xkcyB0aGUgbGF0ZXN0IGNoZWNrbGlzdCBzdGF0ZSBzbyB0aGUgdW5tb3VudCBmbHVzaCBjYW4gcGVyc2lzdCBpdFxuICAvLyB3aXRob3V0IHJhY2luZyBhZ2FpbnN0IFJlYWN0IHJlLXJlbmRlcnMuIChXSU4tNDkpXG4gIGNvbnN0IGxhdGVzdENoZWNrbGlzdFJlZiA9IHVzZVJlZjxDaGVja2xpc3RTdGF0ZT4oe30pO1xuXG4gIGNvbnN0IHBlcnNpc3RDaGVja2xpc3QgPSB1c2VDYWxsYmFjaygobmV3U3RhdGU6IENoZWNrbGlzdFN0YXRlKSA9PiB7XG4gICAgbGF0ZXN0Q2hlY2tsaXN0UmVmLmN1cnJlbnQgPSBuZXdTdGF0ZTtcbiAgICBpZiAoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KTtcbiAgICB9XG4gICAgY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjaGVja2xpc3Rfc3RhdGU6IGxhdGVzdENoZWNrbGlzdFJlZi5jdXJyZW50LFxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaGVja2xpc3Qgc3RhdGU6JywgZXJyKTtcbiAgICAgIH0pO1xuICAgIH0sIDUwMCk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgLy8gSG9sZHMgdGhlIGxhdGVzdCBub3RlcyBzdGF0ZSBzbyBmbHVzaE5vdGVzIGNhbiByZWFkIHRoZSBjdXJyZW50IHZhbHVlc1xuICAvLyB3aXRob3V0IGRlcGVuZGluZyBvbiBSZWFjdCByZS1yZW5kZXJzLiBUaGUgZGVib3VuY2VkIHNhdmUgYW5kIHRoZSBleHBsaWNpdFxuICAvLyBTYXZlIGJ1dHRvbiBib3RoIHJlYWQgZnJvbSBoZXJlLlxuICBjb25zdCBsYXRlc3ROb3Rlc1JlZiA9IHVzZVJlZjxOb3Rlc1N0YXRlPih7fSk7XG5cbiAgY29uc3QgZmx1c2hOb3RlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICBub3Rlc1RpbWVvdXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICBjaGVja2xpc3Rfbm90ZXM6IGxhdGVzdE5vdGVzUmVmLmN1cnJlbnQsXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2hlY2tsaXN0IG5vdGVzOicsIGVycik7XG4gICAgfSk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgY29uc3QgcGVyc2lzdE5vdGVzID0gdXNlQ2FsbGJhY2soKG5ld05vdGVzOiBOb3Rlc1N0YXRlKSA9PiB7XG4gICAgbGF0ZXN0Tm90ZXNSZWYuY3VycmVudCA9IG5ld05vdGVzO1xuICAgIC8vIE5vIGRlYm91bmNlIC0tIG5vdGVzIGFyZSBzaG9ydCwgdHlwZWQgaW5mcmVxdWVudGx5LCBhbmQgdGhlIGNvc3Qgb2ZcbiAgICAvLyBsb3NpbmcgYSBub3RlIHRvIGEgZGVib3VuY2UgcmFjZSAoV0lOLTQ5IFFBKSBmYXIgZXhjZWVkcyB0aGUgY29zdCBvZlxuICAgIC8vIGEgZmV3IGV4dHJhIFBBVENIIHJlcXVlc3RzLiBFdmVyeSBrZXlzdHJva2UgY29tbWl0cyBpbW1lZGlhdGVseS5cbiAgICBpZiAobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICBub3Rlc1RpbWVvdXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICBjaGVja2xpc3Rfbm90ZXM6IG5ld05vdGVzLFxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGNoZWNrbGlzdCBub3RlczonLCBlcnIpO1xuICAgIH0pO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIC8vIFNhZmV0eSBuZXQ6IGlmIHRoZSB3aXphcmQgdW5tb3VudHMgKHVzZXIgY2xvc2VzIHRoZSBGb2N1c1ZpZXcsIG5hdmlnYXRlc1xuICAvLyB0byBhIGRpZmZlcmVudCBkaXNwdXRlLCBldGMuKSBiZWZvcmUgdGhlIGRlYm91bmNlIGZpcmVzLCBmbHVzaCBhbnlcbiAgLy8gcGVuZGluZyBub3RlcyBhbmQgY2hlY2tsaXN0IHN0YXRlIGltbWVkaWF0ZWx5IHNvIG5vdGhpbmcgaXMgbG9zdC4gKFdJTi00OSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKG5vdGVzVGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICAgIG5vdGVzVGltZW91dFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICBjaGVja2xpc3Rfbm90ZXM6IGxhdGVzdE5vdGVzUmVmLmN1cnJlbnQsXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmx1c2ggY2hlY2tsaXN0IG5vdGVzIG9uIHVubW91bnQ6JywgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgICBjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICAgIGNoZWNrbGlzdF9zdGF0ZTogbGF0ZXN0Q2hlY2tsaXN0UmVmLmN1cnJlbnQsXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmx1c2ggY2hlY2tsaXN0IHN0YXRlIG9uIHVubW91bnQ6JywgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlID0gdXNlQ2FsbGJhY2soKGl0ZW1LZXk6IHN0cmluZykgPT4ge1xuICAgIHNldENoZWNrbGlzdFN0YXRlKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgLi4ucHJldiwgW2l0ZW1LZXldOiAhcHJldltpdGVtS2V5XSB9O1xuICAgICAgcGVyc2lzdENoZWNrbGlzdChuZXdTdGF0ZSk7XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSk7XG4gIH0sIFtwZXJzaXN0Q2hlY2tsaXN0XSk7XG5cbiAgY29uc3QgaGFuZGxlTm90ZXNDaGFuZ2UgPSB1c2VDYWxsYmFjaygoaXRlbUtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Tm90ZXNTdGF0ZSgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3Tm90ZXMgPSB7IC4uLnByZXYsIFtpdGVtS2V5XTogdmFsdWUgfTtcbiAgICAgIHBlcnNpc3ROb3RlcyhuZXdOb3Rlcyk7XG4gICAgICByZXR1cm4gbmV3Tm90ZXM7XG4gICAgfSk7XG4gIH0sIFtwZXJzaXN0Tm90ZXNdKTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGl0ZW1LZXk6IHN0cmluZywgZmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbCkgPT4ge1xuICAgIHNldEZpbGVzU3RhdGUoKHByZXYpID0+ICh7IC4uLnByZXYsIFtpdGVtS2V5XTogZmlsZSB9KSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVTZWN0aW9uVG9nZ2xlID0gdXNlQ2FsbGJhY2soKGl0ZW1LZXk6IHN0cmluZywgc2VjdGlvbjogRXhwYW5kZWRTZWN0aW9uKSA9PiB7XG4gICAgc2V0RXhwYW5kZWRTZWN0aW9ucygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IG5ldyBNYXAocHJldik7XG4gICAgICBjb25zdCBzZWN0aW9ucyA9IG5ldyBTZXQocHJldi5nZXQoaXRlbUtleSkgPz8gW10pO1xuICAgICAgaWYgKHNlY3Rpb25zLmhhcyhzZWN0aW9uKSkge1xuICAgICAgICBzZWN0aW9ucy5kZWxldGUoc2VjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWN0aW9ucy5hZGQoc2VjdGlvbik7XG4gICAgICB9XG4gICAgICBuZXh0LnNldChpdGVtS2V5LCBzZWN0aW9ucyk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIE5vIHBsYXlib29rIGZhbGxiYWNrXG4gIGlmICghcGxheWJvb2sgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgIHRpdGxlPVwiTm8gZXZpZGVuY2UgY2hlY2tsaXN0IGF2YWlsYWJsZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJObyBzcGVjaWZpYyBldmlkZW5jZSBjaGVja2xpc3QgZm9yIHRoaXMgcmVhc29uIGNvZGUuIFVzZSBTdHJpcGUncyBnZW5lcmFsIGV2aWRlbmNlIGd1aWRlbGluZXMgZm9yIHlvdXIgcmVzcG9uc2UuXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICAvLyBGaWx0ZXIgZm9yIHVyZ2VuY3kgbW9kZVxuICBjb25zdCBlZmZlY3RpdmVVcmdlbmN5ID0gaXNVcmdlbnQgJiYgIXNob3dGdWxsQ2hlY2tsaXN0O1xuICBsZXQgZGlzcGxheUl0ZW1zID0gaXRlbXM7XG4gIGlmIChlZmZlY3RpdmVVcmdlbmN5KSB7XG4gICAgZGlzcGxheUl0ZW1zID0gaXRlbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udXJnZW5jeV9lc3NlbnRpYWwpXG4gICAgICAuc29ydCgoYSwgYikgPT4gKGEudXJnZW5jeV9vcmRlciA/PyA5OTkpIC0gKGIudXJnZW5jeV9vcmRlciA/PyA5OTkpKTtcbiAgfVxuXG4gIC8vIEdyb3VwIGJ5IGNhdGVnb3J5XG4gIGNvbnN0IGdyb3VwZWQgPSBDQVRFR09SWV9PUkRFUi5tYXAoKGNhdGVnb3J5KSA9PiAoe1xuICAgIGNhdGVnb3J5LFxuICAgIGxhYmVsOiBDQVRFR09SWV9MQUJFTFNbY2F0ZWdvcnldLFxuICAgIGl0ZW1zOiBkaXNwbGF5SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSBjYXRlZ29yeSksXG4gIH0pKS5maWx0ZXIoKGdyb3VwKSA9PiBncm91cC5pdGVtcy5sZW5ndGggPiAwKTtcblxuICAvLyBQcm9ncmVzcyBjb3VudHMgKGFsd2F5cyBhZ2FpbnN0IGZ1bGwgbGlzdCwgbm90IGZpbHRlcmVkKVxuICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCBjb21wbGV0ZWRJdGVtcyA9IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tsaXN0U3RhdGVbaXRlbS5rZXldKS5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAge3N1Ym1pdHRlZCA/IChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICB0aXRsZT1cIkV2aWRlbmNlIHN1Ym1pdHRlZFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIGV2aWRlbmNlIGhhcyBiZWVuIHN1Ym1pdHRlZCB0byBTdHJpcGUuIEZpbGVzIGFuZCBjaGVja2xpc3QgaXRlbXMgYXJlIG5vdyByZWFkLW9ubHkuXCJcbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgdGl0bGU9XCJHYXRoZXIgeW91ciBldmlkZW5jZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJIZXJlJ3Mgd2hhdCB5b3UnbGwgbmVlZCB0byBidWlsZCB5b3VyIGNhc2UuIEV4cGFuZCBlYWNoIGl0ZW0gdG8gc2VlIHdoeSBpdCBtYXR0ZXJzIGFuZCBqb3QgZG93biBub3RlcyBhcyB5b3UgZ28uXCJcbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIDxDaGVja2xpc3RQcm9ncmVzcyBjb21wbGV0ZWQ9e2NvbXBsZXRlZEl0ZW1zfSB0b3RhbD17dG90YWxJdGVtc30gLz5cblxuICAgICAge2lzVXJnZW50ICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICB0aXRsZT17YCR7ZGF5c1JlbWFpbmluZ30gZGF5JHtkYXlzUmVtYWluaW5nID09PSAxID8gJycgOiAncyd9IGxlZnQgdG8gcmVzcG9uZGB9XG4gICAgICAgICAgICBkZXNjcmlwdGlvbj17c2hvd0Z1bGxDaGVja2xpc3RcbiAgICAgICAgICAgICAgPyAnU2hvd2luZyBhbGwgZXZpZGVuY2UgaXRlbXMuJ1xuICAgICAgICAgICAgICA6ICdTaG93aW5nIG9ubHkgZXNzZW50aWFsIGl0ZW1zIHRvIG1heGltaXplIHlvdXIgY2hhbmNlcy4nfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPExpbmsgb25QcmVzcz17KCkgPT4gc2V0U2hvd0Z1bGxDaGVja2xpc3QoIXNob3dGdWxsQ2hlY2tsaXN0KX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+XG4gICAgICAgICAgICAgIHtzaG93RnVsbENoZWNrbGlzdCA/ICdTaG93IGVzc2VudGlhbHMgb25seScgOiAnVmlldyBmdWxsIGNoZWNrbGlzdCd9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge2dyb3VwZWQubWFwKCh7IGNhdGVnb3J5LCBsYWJlbCwgaXRlbXM6IGdyb3VwSXRlbXMgfSwgZ3JvdXBJbmRleCkgPT4gKFxuICAgICAgICA8Qm94IGtleT17Y2F0ZWdvcnl9IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAge2dyb3VwSW5kZXggPiAwICYmIDxEaXZpZGVyIC8+fVxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ3NlY29uZGFyeScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIHtncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RyaXBlUmVzdWx0ID0gZ2V0U3RyaXBlRmllbGRSZXN1bHQoaXRlbSwgZGlzcHV0ZSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8Q2hlY2tsaXN0SXRlbVxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXshIWNoZWNrbGlzdFN0YXRlW2l0ZW0ua2V5XX1cbiAgICAgICAgICAgICAgICBzdHJpcGVGaWVsZFJlc3VsdD17c3RyaXBlUmVzdWx0ID8/IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBleHBhbmRlZFNlY3Rpb25zPXtleHBhbmRlZFNlY3Rpb25zLmdldChpdGVtLmtleSkgPz8gbmV3IFNldCgpfVxuICAgICAgICAgICAgICAgIG5vdGVzPXtub3Rlc1N0YXRlW2l0ZW0ua2V5XSA/PyAnJ31cbiAgICAgICAgICAgICAgICBleGlzdGluZ0ZpbGU9e2ZpbGVzU3RhdGVbaXRlbS5rZXldID8/IG51bGx9XG4gICAgICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlLmlkfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gaGFuZGxlVG9nZ2xlKGl0ZW0ua2V5KX1cbiAgICAgICAgICAgICAgICBvblNlY3Rpb25Ub2dnbGU9eyhzZWN0aW9uKSA9PiBoYW5kbGVTZWN0aW9uVG9nZ2xlKGl0ZW0ua2V5LCBzZWN0aW9uKX1cbiAgICAgICAgICAgICAgICBvbk5vdGVzQ2hhbmdlPXsodmFsdWUpID0+IGhhbmRsZU5vdGVzQ2hhbmdlKGl0ZW0ua2V5LCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgb25TYXZlTm90ZXM9e2ZsdXNoTm90ZXN9XG4gICAgICAgICAgICAgICAgb25GaWxlQ2hhbmdlPXsoZmlsZSkgPT4gaGFuZGxlRmlsZUNoYW5nZShpdGVtLmtleSwgZmlsZSl9XG4gICAgICAgICAgICAgICAgc3VibWl0dGVkPXtzdWJtaXR0ZWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L0JveD5cbiAgICAgICkpfVxuXG4gICAgICA8RGl2aWRlciAvPlxuXG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PlxuICAgICAgICBZb3VyIHByb2dyZXNzIGFuZCBub3RlcyBhcmUgc2F2ZWQgYXV0b21hdGljYWxseS5cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXZpZGVuY2VDaGVja2xpc3Q7XG4iLCAiaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0gfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBTdGF0dXMgb2YgYSBzdHJpcGVfZmllbGQtbGlua2VkIGNoZWNrbGlzdCBpdGVtOlxuICogLSAncG9zaXRpdmUnOiBkYXRhIGV4aXN0cyBhbmQgaGVscHMgdGhlIGNhc2UgKGF1dG8tY2hlY2ssIHNob3cgdmFsdWUpXG4gKiAtICd1bmF2YWlsYWJsZSc6IHZlcmlmaWNhdGlvbiB3YXNuJ3QgY29sbGVjdGVkIGF0IGNoZWNrb3V0IChncmV5IG91dCwgZXhwbGFpbilcbiAqIC0gJ25lZ2F0aXZlJzogdmVyaWZpY2F0aW9uIGZhaWxlZCwgaHVydHMgdGhlIGNhc2UgKHdhcm4gbWVyY2hhbnQpXG4gKiAtIG51bGw6IG5vIHN0cmlwZV9maWVsZCBvciBub3QgYSBtYXBwZWQgaXRlbVxuICovXG5leHBvcnQgdHlwZSBTdHJpcGVGaWVsZFN0YXR1cyA9ICdwb3NpdGl2ZScgfCAndW5hdmFpbGFibGUnIHwgJ25lZ2F0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdHJpcGVGaWVsZFJlc3VsdCB7XG4gIHN0YXR1czogU3RyaXBlRmllbGRTdGF0dXM7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGd1aWRhbmNlOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdENoZWNrVmFsdWUocmF3OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKCFyYXcpIHJldHVybiAnTm90IGNoZWNrZWQnO1xuICBzd2l0Y2ggKHJhdykge1xuICAgIGNhc2UgJ3Bhc3MnOiByZXR1cm4gJ01hdGNoJztcbiAgICBjYXNlICdmYWlsJzogcmV0dXJuICdObyBtYXRjaCc7XG4gICAgY2FzZSAndW5hdmFpbGFibGUnOiByZXR1cm4gJ05vdCBjaGVja2VkJztcbiAgICBjYXNlICd1bmNoZWNrZWQnOiByZXR1cm4gJ05vdCBjaGVja2VkJztcbiAgICBkZWZhdWx0OiByZXR1cm4gcmF3O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUodHM6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0cyAqIDEwMDApLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgbW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnLCB5ZWFyOiAnbnVtZXJpYycsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDdXJyZW5jeShhbW91bnQ6IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICBjdXJyZW5jeTogY3VycmVuY3kgPz8gJ3VzZCcsXG4gIH0pLmZvcm1hdChhbW91bnQgLyAxMDApO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgY2hlY2tsaXN0IGl0ZW0gYW5kIGEgZGlzcHV0ZSwgY29tcHV0ZSB0aGUgYXV0by1maWxsIHN0YXR1cyBmb3IgYW55XG4gKiBpdGVtIHRoYXQgbWFwcyB0byBhIHN0cmlwZV9maWVsZC4gUmV0dXJucyBudWxsIGZvciBpdGVtcyBub3QgbWFwcGVkIG9yIHdpdGhcbiAqIG5vIGF1dG8tZmlsbCBkYXRhIGF2YWlsYWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmlwZUZpZWxkUmVzdWx0KFxuICBpdGVtOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0sXG4gIGRpc3B1dGU6IERpc3B1dGUsXG4pOiBTdHJpcGVGaWVsZFJlc3VsdCB8IG51bGwge1xuICBjb25zdCBmaWVsZCA9IGl0ZW0uc3RyaXBlX2ZpZWxkO1xuICBpZiAoIWZpZWxkKSByZXR1cm4gbnVsbDtcblxuICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSAnYXZzX3Jlc3VsdCc6IHtcbiAgICAgIGNvbnN0IGFkZHIgPSBkaXNwdXRlLmF2c19hZGRyZXNzX2NoZWNrO1xuICAgICAgY29uc3QgemlwID0gZGlzcHV0ZS5hdnNfemlwX2NoZWNrO1xuICAgICAgaWYgKCFhZGRyICYmICF6aXApIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3VuYXZhaWxhYmxlJyxcbiAgICAgICAgdmFsdWU6ICdOb3QgY29sbGVjdGVkIGF0IGNoZWNrb3V0JyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiQWRkcmVzcyB2ZXJpZmljYXRpb24gd2Fzbid0IHJ1biBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGNhbid0IGJlIGFkZGVkIGFmdGVyIHRoZSBmYWN0IC0tIGZvY3VzIHlvdXIgZW5lcmd5IG9uIHRoZSBvdGhlciBldmlkZW5jZSBpdGVtcyBpbnN0ZWFkLlwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFkZHJGYWlsID0gYWRkciA9PT0gJ2ZhaWwnO1xuICAgICAgY29uc3QgemlwRmFpbCA9IHppcCA9PT0gJ2ZhaWwnO1xuICAgICAgaWYgKGFkZHJGYWlsICYmIHppcEZhaWwpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdBZGRyZXNzOiBubyBtYXRjaCwgWklQOiBubyBtYXRjaCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIlRoZSBiaWxsaW5nIGFkZHJlc3MgZGlkbid0IG1hdGNoIHdoYXQgdGhlIGJhbmsgaGFzIG9uIGZpbGUuIFRoZSBpc3N1ZXIgd2lsbCBzZWUgdGhpcyBhdXRvbWF0aWNhbGx5IC0tIGl0IHdlYWtlbnMgeW91ciBjYXNlLiBGb2N1cyBvbiBzdHJlbmd0aGVuaW5nIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGFkZHJGYWlsIHx8IHppcEZhaWwpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBZGRyZXNzOiAke2Zvcm1hdENoZWNrVmFsdWUoYWRkcil9LCBaSVA6ICR7Zm9ybWF0Q2hlY2tWYWx1ZSh6aXApfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIlBhcnRpYWwgYWRkcmVzcyBtYXRjaCAtLSBvbmUgZWxlbWVudCBkaWRuJ3QgbWF0Y2guIFRoZSBpc3N1ZXIgd2lsbCBzZWUgdGhpcy4gSXQncyBub3QgYXMgZGFtYWdpbmcgYXMgYSBmdWxsIG1pc21hdGNoLCBidXQgc3RyZW5ndGhlbiB5b3VyIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYEFkZHJlc3M6ICR7Zm9ybWF0Q2hlY2tWYWx1ZShhZGRyKX0sIFpJUDogJHtmb3JtYXRDaGVja1ZhbHVlKHppcCl9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdjdmNfY2hlY2snOiB7XG4gICAgICBjb25zdCBjdmMgPSBkaXNwdXRlLmN2Y19jaGVjaztcbiAgICAgIGlmICghY3ZjIHx8IGN2YyA9PT0gJ3VuYXZhaWxhYmxlJyB8fCBjdmMgPT09ICd1bmNoZWNrZWQnKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IGNvbGxlY3RlZCBhdCBjaGVja291dCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIlRoZSBzZWN1cml0eSBjb2RlIChDVlYpIHdhc24ndCB2ZXJpZmllZCBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGNhbid0IGJlIGFkZGVkIGFmdGVyIHRoZSBmYWN0IC0tIGZvY3VzIHlvdXIgZW5lcmd5IG9uIHRoZSBvdGhlciBldmlkZW5jZSBpdGVtcyBpbnN0ZWFkLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChjdmMgPT09ICdmYWlsJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAnbmVnYXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NWVjogbm8gbWF0Y2gnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgQ1ZWIGNoZWNrIGZhaWxlZCBvbiB0aGlzIHRyYW5zYWN0aW9uIC0tIHRoZSBjb2RlIGVudGVyZWQgZGlkbid0IG1hdGNoLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMgYXV0b21hdGljYWxseSBhbmQgaXQgaHVydHMgeW91ciBjYXNlLiBGb2N1cyBvbiBzdHJlbmd0aGVuaW5nIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NWViB2ZXJpZmllZCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAndGhyZWVfZF9zZWN1cmUnOiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBkaXNwdXRlLnRocmVlX2Rfc2VjdXJlX3Jlc3VsdDtcbiAgICAgIGlmICghcmVzdWx0KSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IHVzZWQgb24gdGhpcyB0cmFuc2FjdGlvbicsXG4gICAgICAgIGd1aWRhbmNlOiBcIjNEIFNlY3VyZSB3YXNuJ3QgdXNlZCBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGlzIHRoZSBzaW5nbGUgc3Ryb25nZXN0IGRlZmVuc2UgZm9yIGZyYXVkIGRpc3B1dGVzIC0tIGNvbnNpZGVyIGVuYWJsaW5nIGl0IGZvciBmdXR1cmUgdHJhbnNhY3Rpb25zLiBGb3IgdGhpcyBkaXNwdXRlLCBmb2N1cyBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMuXCIsXG4gICAgICB9O1xuICAgICAgY29uc3QgdmVyc2lvbiA9IGRpc3B1dGUudGhyZWVfZF9zZWN1cmVfdmVyc2lvbjtcbiAgICAgIGlmIChyZXN1bHQgPT09ICdhdXRoZW50aWNhdGVkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogdmVyc2lvbiA/IGBWZXJpZmllZCBieSBiYW5rICgzRFMgdiR7dmVyc2lvbn0pYCA6ICdWZXJpZmllZCBieSBiYW5rICgzRFMpJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuIFRoaXMgaXMgeW91ciBzdHJvbmdlc3QgcGllY2Ugb2YgZXZpZGVuY2UuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKHJlc3VsdCA9PT0gJ2F0dGVtcHRfYWNrbm93bGVkZ2VkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0JhbmsgdmVyaWZpY2F0aW9uIGF0dGVtcHRlZCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB0aGUgYmFuayBhY2tub3dsZWRnZWQgdGhlIDNEUyBhdHRlbXB0LCB3aGljaCBzdGlsbCBwcm92aWRlcyBsaWFiaWxpdHkgc2hpZnQgaW4gbW9zdCBjYXNlcy5cIixcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgM0RTIHJlc3VsdDogJHtyZXN1bHR9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdhdXRob3JpemF0aW9uJzoge1xuICAgICAgY29uc3QgY29kZSA9IGRpc3B1dGUuYXV0aG9yaXphdGlvbl9jb2RlO1xuICAgICAgY29uc3Qgc3RhdHVzID0gZGlzcHV0ZS5uZXR3b3JrX3N0YXR1cztcbiAgICAgIGlmICghY29kZSAmJiAhc3RhdHVzKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChzdGF0dXMgPT09ICdkZWNsaW5lZF9ieV9uZXR3b3JrJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAnbmVnYXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0RlY2xpbmVkIGJ5IG5ldHdvcmsnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgYXV0aG9yaXphdGlvbiB3YXMgZGVjbGluZWQgYnkgdGhlIG5ldHdvcmsuIFRoaXMgaXMgdW51c3VhbCBmb3IgYSBjb21wbGV0ZWQgY2hhcmdlIC0tIGNvbnRhY3Qgc3VwcG9ydCBpZiB0aGlzIGRvZXNuJ3QgbG9vayByaWdodC5cIixcbiAgICAgIH07XG4gICAgICBpZiAoY29kZSAmJiBzdGF0dXMgPT09ICdhcHByb3ZlZF9ieV9uZXR3b3JrJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYEFwcHJvdmVkIChhdXRoIGNvZGU6ICR7Y29kZX0pYCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGNvZGUpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBdXRoIGNvZGU6ICR7Y29kZX1gLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgICBpZiAoc3RhdHVzID09PSAnYXBwcm92ZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdBcHByb3ZlZCBieSBuZXR3b3JrJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYE5ldHdvcmsgc3RhdHVzOiAke3N0YXR1c31gLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgJ2N1c3RvbWVyX2VtYWlsJzpcbiAgICAgIGlmICghZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBkaXNwdXRlLmN1c3RvbWVyX2VtYWlsLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAnYmlsbGluZ19hZGRyZXNzJzpcbiAgICAgIGlmICghZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICBjYXNlICd0cmFuc2FjdGlvbl9kYXRlJzpcbiAgICAgIGlmICghZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGZvcm1hdERhdGUoZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKSxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ3JlY2VpcHRfdXJsJzpcbiAgICAgIGlmICghZGlzcHV0ZS5yZWNlaXB0X3VybCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnUmVjZWlwdCBhdmFpbGFibGUnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAncmVmdW5kX2RhdGEnOiB7XG4gICAgICBjb25zdCByZWZ1bmRzID0gZGlzcHV0ZS5yZWZ1bmRzO1xuICAgICAgaWYgKCFyZWZ1bmRzIHx8IHJlZnVuZHMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHIgPSByZWZ1bmRzWzBdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYFJlZnVuZCBvZiAke2Zvcm1hdEN1cnJlbmN5KHIuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX0gb24gJHtmb3JtYXREYXRlKHIuY3JlYXRlZCl9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdjYWxjdWxhdGVkX3N0YXRlbWVudF9kZXNjcmlwdG9yJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdDb3ZlcmVkIGJ5IHlvdXIgU3RyaXBlIHRyYW5zYWN0aW9uIGRhdGEnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEFueSBzdHJpcGVfZmllbGQgdmFsdWUgdGhlIHJlbmRlcmVyIGRvZXNuJ3QgaGF2ZSBjdXN0b20gY29weSBmb3Igc3RpbGxcbiAgICAgIC8vIG1lYW5zIHRoZSBkYXRhIGlzIGF1dG9maWxsZWQgZnJvbSB0aGUgdHJhbnNhY3Rpb24uIFNob3cgYSBnZW5lcmljXG4gICAgICAvLyBoaW50IHNvIHRoZSB1cGxvYWQgVUkgc3RheXMgaGlkZGVuIGFuZCB0aGUgbWVyY2hhbnQgZG9lc24ndCB0cnkgdG9cbiAgICAgIC8vIGF0dGFjaCBhIGZpbGUgdGhhdCB3b3VsZCBiZSBzaWxlbnRseSBkcm9wcGVkIGJ5IHRoZSBhc3NlbWJsZXIuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQ292ZXJlZCBieSB5b3VyIFN0cmlwZSB0cmFuc2FjdGlvbiBkYXRhJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgQ2hlY2tsaXN0UHJvZ3Jlc3NQcm9wcyB7XG4gIGNvbXBsZXRlZDogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG50eXBlIEZyYWN0aW9uV2lkdGggPSAnMS8xMicgfCAnMi8xMicgfCAnMy8xMicgfCAnNC8xMicgfCAnNS8xMicgfCAnNi8xMicgfCAnNy8xMicgfCAnOC8xMicgfCAnOS8xMicgfCAnMTAvMTInIHwgJzExLzEyJyB8ICdmaWxsJztcblxuZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NXaWR0aChjb21wbGV0ZWQ6IG51bWJlciwgdG90YWw6IG51bWJlcik6IEZyYWN0aW9uV2lkdGggfCBudWxsIHtcbiAgaWYgKHRvdGFsID09PSAwIHx8IGNvbXBsZXRlZCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGlmIChjb21wbGV0ZWQgPj0gdG90YWwpIHJldHVybiAnZmlsbCc7XG4gIGNvbnN0IHR3ZWxmdGhzID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCgoY29tcGxldGVkIC8gdG90YWwpICogMTIpKTtcbiAgcmV0dXJuIGAke3R3ZWxmdGhzfS8xMmAgYXMgRnJhY3Rpb25XaWR0aDtcbn1cblxuY29uc3QgQ2hlY2tsaXN0UHJvZ3Jlc3MgPSAoeyBjb21wbGV0ZWQsIHRvdGFsIH06IENoZWNrbGlzdFByb2dyZXNzUHJvcHMpID0+IHtcbiAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IGdldFByb2dyZXNzV2lkdGgoY29tcGxldGVkLCB0b3RhbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBFdmlkZW5jZSBQcm9ncmVzc1xuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAge2NvbXBsZXRlZH0gb2Yge3RvdGFsfSBjb21wbGV0ZWRcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggY3NzPXt7IGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIGJvcmRlclJhZGl1czogJ3JvdW5kZWQnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgIHtwcm9ncmVzc1dpZHRoID8gKFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdzdXJmYWNlJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAncm91bmRlZCcsXG4gICAgICAgICAgICAgIHdpZHRoOiBwcm9ncmVzc1dpZHRoLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAneHhzbWFsbCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxJbmxpbmU+eycgJ308L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAneHhzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lPnsnICd9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrbGlzdFByb2dyZXNzO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIENoZWNrYm94LCBCYWRnZSwgSW5saW5lLCBMaW5rLCBJY29uLCBUZXh0QXJlYSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRXZpZGVuY2VDaGVja2xpc3RJdGVtLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTdHJpcGVGaWVsZFJlc3VsdCB9IGZyb20gJy4vRXZpZGVuY2VDaGVja2xpc3QnO1xuaW1wb3J0IEZpbGVVcGxvYWRTZWN0aW9uIGZyb20gJy4vRmlsZVVwbG9hZFNlY3Rpb24nO1xuXG5leHBvcnQgdHlwZSBFeHBhbmRlZFNlY3Rpb24gPSAnd2h5JyB8ICd3aGVyZScgfCAnbm90ZXMnIHwgJ2ZpbGUnO1xuXG5pbnRlcmZhY2UgQ2hlY2tsaXN0SXRlbVByb3BzIHtcbiAgaXRlbTogRXZpZGVuY2VDaGVja2xpc3RJdGVtO1xuICBjaGVja2VkOiBib29sZWFuO1xuICBzdHJpcGVGaWVsZFJlc3VsdD86IFN0cmlwZUZpZWxkUmVzdWx0O1xuICBleHBhbmRlZFNlY3Rpb25zOiBTZXQ8RXhwYW5kZWRTZWN0aW9uPjtcbiAgbm90ZXM6IHN0cmluZztcbiAgZXhpc3RpbmdGaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsO1xuICBkaXNwdXRlSWQ6IHN0cmluZztcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBvblRvZ2dsZTogKCkgPT4gdm9pZDtcbiAgb25TZWN0aW9uVG9nZ2xlOiAoc2VjdGlvbjogRXhwYW5kZWRTZWN0aW9uKSA9PiB2b2lkO1xuICBvbk5vdGVzQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TYXZlTm90ZXM/OiAoKSA9PiB2b2lkO1xuICBvbkZpbGVDaGFuZ2U6IChmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB2b2lkO1xuICBzdWJtaXR0ZWQ/OiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBnZXRDYXRlZ29yeUJhZGdlKGNhdGVnb3J5OiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bJ2NhdGVnb3J5J10pIHtcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgIGNhc2UgJ21hbmRhdG9yeSc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJuZWdhdGl2ZVwiPlJFUVVJUkVEPC9CYWRnZT47XG4gICAgY2FzZSAncmVjb21tZW5kZWQnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwid2FybmluZ1wiPkhFTFBGVUw8L0JhZGdlPjtcbiAgICBjYXNlICdzaXR1YXRpb25hbCc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJuZXV0cmFsXCI+SUYgQVBQTElDQUJMRTwvQmFkZ2U+O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFN0cmlwZVN0YXR1c0JhZGdlKHJlc3VsdDogU3RyaXBlRmllbGRSZXN1bHQpIHtcbiAgc3dpdGNoIChyZXN1bHQuc3RhdHVzKSB7XG4gICAgY2FzZSAncG9zaXRpdmUnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkZST00gU1RSSVBFPC9CYWRnZT47XG4gICAgY2FzZSAndW5hdmFpbGFibGUnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwibmV1dHJhbFwiPk5PVCBBVkFJTEFCTEU8L0JhZGdlPjtcbiAgICBjYXNlICduZWdhdGl2ZSc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJ3YXJuaW5nXCI+SEVBRFMgVVA8L0JhZGdlPjtcbiAgfVxufVxuXG5pbnRlcmZhY2UgU2VjdGlvblRvZ2dsZVByb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZXhwYW5kZWQ6IGJvb2xlYW47XG4gIG9uUHJlc3M6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IFNlY3Rpb25Ub2dnbGUgPSAoeyBsYWJlbCwgZXhwYW5kZWQsIG9uUHJlc3MgfTogU2VjdGlvblRvZ2dsZVByb3BzKSA9PiAoXG4gIDxMaW5rIG9uUHJlc3M9e29uUHJlc3N9PlxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3h4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxJY29uIG5hbWU9e2V4cGFuZGVkID8gJ2NoZXZyb25VcCcgOiAnY2hldnJvbkRvd24nfSBzaXplPVwieHNtYWxsXCIgLz5cbiAgICA8L0JveD5cbiAgPC9MaW5rPlxuKTtcblxuY29uc3QgQ2hlY2tsaXN0SXRlbSA9ICh7XG4gIGl0ZW0sXG4gIGNoZWNrZWQsXG4gIHN0cmlwZUZpZWxkUmVzdWx0LFxuICBleHBhbmRlZFNlY3Rpb25zLFxuICBub3RlcyxcbiAgZXhpc3RpbmdGaWxlLFxuICBkaXNwdXRlSWQsXG4gIGNvbnRleHQsXG4gIG9uVG9nZ2xlLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIG9uTm90ZXNDaGFuZ2UsXG4gIG9uU2F2ZU5vdGVzLFxuICBvbkZpbGVDaGFuZ2UsXG4gIHN1Ym1pdHRlZCxcbn06IENoZWNrbGlzdEl0ZW1Qcm9wcykgPT4ge1xuICBjb25zdCB3aHlFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCd3aHknKTtcbiAgY29uc3Qgd2hlcmVFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCd3aGVyZScpO1xuICBjb25zdCBub3Rlc0V4cGFuZGVkID0gZXhwYW5kZWRTZWN0aW9ucy5oYXMoJ25vdGVzJyk7XG4gIGNvbnN0IGZpbGVFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCdmaWxlJyk7XG5cbiAgLy8gRmxhc2ggYSBcIlNhdmVkXCIgY29uZmlybWF0aW9uIGZvciAycyBhZnRlciB0aGUgbWVyY2hhbnQgZXhwbGljaXRseSBjbGlja3NcbiAgLy8gU2F2ZSwgc28gdGhleSBoYXZlIHZpc3VhbCBjb25maXJtYXRpb24gdGhlIGNvbnRlbnQgcGVyc2lzdGVkLiAoV0lOLTQ5KVxuICBjb25zdCBbanVzdFNhdmVkLCBzZXRKdXN0U2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVTYXZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKG9uU2F2ZU5vdGVzKSBvblNhdmVOb3RlcygpO1xuICAgIHNldEp1c3RTYXZlZCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEp1c3RTYXZlZChmYWxzZSksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGlzVW5hdmFpbGFibGUgPSBzdHJpcGVGaWVsZFJlc3VsdD8uc3RhdHVzID09PSAndW5hdmFpbGFibGUnO1xuICBjb25zdCBpc05lZ2F0aXZlID0gc3RyaXBlRmllbGRSZXN1bHQ/LnN0YXR1cyA9PT0gJ25lZ2F0aXZlJztcbiAgY29uc3QgaXNQb3NpdGl2ZSA9IHN0cmlwZUZpZWxkUmVzdWx0Py5zdGF0dXMgPT09ICdwb3NpdGl2ZSc7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17e1xuICAgICAgc3RhY2s6ICd5JyxcbiAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgIHBhZGRpbmc6ICdzbWFsbCcsXG4gICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICB9fT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgIGNoZWNrZWQ9e2NoZWNrZWR9XG4gICAgICAgICAgb25DaGFuZ2U9e29uVG9nZ2xlfVxuICAgICAgICAgIGRpc2FibGVkPXtpc1VuYXZhaWxhYmxlIHx8IGlzUG9zaXRpdmUgfHwgc3VibWl0dGVkfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0uaXRlbX1cbiAgICAgICAgLz5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHhzbWFsbCcsIHdpZHRoOiAnZmlsbCcgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3tcbiAgICAgICAgICAgICAgZm9udDogJ2JvZHknLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnc2VtaWJvbGQnLFxuICAgICAgICAgICAgICBjb2xvcjogaXNVbmF2YWlsYWJsZSA/ICdkaXNhYmxlZCcgOiBjaGVja2VkID8gJ3NlY29uZGFyeScgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge2l0ZW0uaXRlbX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAge3N0cmlwZUZpZWxkUmVzdWx0ICYmIGdldFN0cmlwZVN0YXR1c0JhZGdlKHN0cmlwZUZpZWxkUmVzdWx0KX1cbiAgICAgICAgICAgIHtnZXRDYXRlZ29yeUJhZGdlKGl0ZW0uY2F0ZWdvcnkpfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdCAmJiAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17e1xuICAgICAgICAgICAgICBmb250OiAnY2FwdGlvbicsXG4gICAgICAgICAgICAgIGNvbG9yOiBpc05lZ2F0aXZlID8gJ2F0dGVudGlvbicgOiAnc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICB7c3RyaXBlRmllbGRSZXN1bHQudmFsdWV9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgbGFiZWw9XCJXaHkgdGhpcyBtYXR0ZXJzXCJcbiAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doeUV4cGFuZGVkfVxuICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ3doeScpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsoaXRlbS53aGVyZV90b19maW5kIHx8IHN0cmlwZUZpZWxkUmVzdWx0KSAmJiAoXG4gICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgbGFiZWw9e3N0cmlwZUZpZWxkUmVzdWx0ID8gJ0RldGFpbHMnIDogJ1doZXJlIHRvIGZpbmQgdGhpcyd9XG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doZXJlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aGVyZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtpdGVtLm5hcnJhdGl2ZV9vbmx5ICYmICFzdWJtaXR0ZWQgPyAoXG4gICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgbGFiZWw9e25vdGVzID8gJ1lvdXIgbm90ZXMnIDogJ0FkZCBkZXRhaWwnfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkPXtub3Rlc0V4cGFuZGVkfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnbm90ZXMnKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAhaXNVbmF2YWlsYWJsZSAmJiAhaXNQb3NpdGl2ZSAmJiAhc3VibWl0dGVkID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgICBsYWJlbD17bm90ZXMgPyAnWW91ciBub3RlcycgOiAnQWRkIG5vdGVzJ31cbiAgICAgICAgICAgICAgICAgIGV4cGFuZGVkPXtub3Rlc0V4cGFuZGVkfVxuICAgICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdub3RlcycpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtleGlzdGluZ0ZpbGUgPyBleGlzdGluZ0ZpbGUuZmlsZV9uYW1lIDogJ0F0dGFjaCBmaWxlJ31cbiAgICAgICAgICAgICAgICAgIGV4cGFuZGVkPXtmaWxlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ2ZpbGUnKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge3N1Ym1pdHRlZCAmJiBleGlzdGluZ0ZpbGUgJiYgKFxuICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgIGxhYmVsPXtleGlzdGluZ0ZpbGUuZmlsZV9uYW1lfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkPXtmaWxlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdmaWxlJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7d2h5RXhwYW5kZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJywgcGFkZGluZzogJ3NtYWxsJywgYm9yZGVyUmFkaXVzOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2l0ZW0ud2h5X21hdHRlcnN9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge3doZXJlRXhwYW5kZWQgJiYgKGl0ZW0ud2hlcmVfdG9fZmluZCB8fCBzdHJpcGVGaWVsZFJlc3VsdCkgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJywgcGFkZGluZzogJ3NtYWxsJywgYm9yZGVyUmFkaXVzOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6IGlzTmVnYXRpdmUgPyAnYXR0ZW50aW9uJyA6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge3N0cmlwZUZpZWxkUmVzdWx0XG4gICAgICAgICAgICAgID8gc3RyaXBlRmllbGRSZXN1bHQuZ3VpZGFuY2VcbiAgICAgICAgICAgICAgOiBpdGVtLndoZXJlX3RvX2ZpbmR9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge25vdGVzRXhwYW5kZWQgJiYgIWlzVW5hdmFpbGFibGUgJiYgIXN1Ym1pdHRlZCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkxlZnQ6ICd4bGFyZ2UnLCBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubmFycmF0aXZlX29ubHkgPyAnQWRkIGRldGFpbCAob3B0aW9uYWwpJyA6ICdZb3VyIG5vdGVzJ31cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgICAgaXRlbS5uYXJyYXRpdmVfb25seVxuICAgICAgICAgICAgICAgID8gJ0luIHlvdXIgb3duIHdvcmRzLCB3aGF0IHNob3VsZCB0aGUgbmFycmF0aXZlIHNheSBhYm91dCB0aGlzPydcbiAgICAgICAgICAgICAgICA6ICdlLmcuIHRyYWNraW5nICMsIGZpbGUgbmFtZSwgd2hlcmUgdG8gZmluZCB0aGlzLi4uJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVzfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbk5vdGVzQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICB7b25TYXZlTm90ZXMgJiYgKFxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzZWNvbmRhcnlcIiBzaXplPVwic21hbGxcIiBvblByZXNzPXtoYW5kbGVTYXZlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIFNhdmVcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2p1c3RTYXZlZCAmJiAoXG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzdWNjZXNzJyB9fT5cbiAgICAgICAgICAgICAgICBTYXZlZFxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAge2l0ZW0ubmFycmF0aXZlX29ubHkgJiYgKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIE9wdGlvbmFsLiBBZGQgZGV0YWlsIHRvIHN0cmVuZ3RoZW4gdGhpcyBwb2ludC4gSWYgbGVmdCBibGFuaywgeW91ciBuYXJyYXRpdmUgd2lsbCBub3RlIHRoaXMgZ2VuZXJhbGx5LlxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7ZmlsZUV4cGFuZGVkICYmICFpc1VuYXZhaWxhYmxlICYmICFpdGVtLm5hcnJhdGl2ZV9vbmx5ICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScgfX0+XG4gICAgICAgICAgPEZpbGVVcGxvYWRTZWN0aW9uXG4gICAgICAgICAgICBkaXNwdXRlSWQ9e2Rpc3B1dGVJZH1cbiAgICAgICAgICAgIGNoZWNrbGlzdEl0ZW1LZXk9e2l0ZW0ua2V5fVxuICAgICAgICAgICAgZXhpc3RpbmdGaWxlPXtleGlzdGluZ0ZpbGV9XG4gICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICAgICAgb25GaWxlQ2hhbmdlPXtvbkZpbGVDaGFuZ2V9XG4gICAgICAgICAgICBzdWJtaXR0ZWQ9e3N1Ym1pdHRlZH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVja2xpc3RJdGVtO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYW5uZXIsIEJhZGdlLCBJbmxpbmUsIExpbmssIEljb24sIFN0cmlwZUZpbGVVcGxvYWRlciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgZGVsZXRlQmFja2VuZCB9IGZyb20gJy4uLy4uL2xpYi9hcGlDbGllbnQnO1xuXG5pbnRlcmZhY2UgRmlsZVVwbG9hZFNlY3Rpb25Qcm9wcyB7XG4gIGRpc3B1dGVJZDogc3RyaW5nO1xuICBjaGVja2xpc3RJdGVtS2V5OiBzdHJpbmc7XG4gIGV4aXN0aW5nRmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbDtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBvbkZpbGVDaGFuZ2U6IChmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB2b2lkO1xuICBzdWJtaXR0ZWQ/OiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRGaWxlU2l6ZShieXRlczogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKGJ5dGVzIDwgMTAyNCkgcmV0dXJuIGAke2J5dGVzfSBCYDtcbiAgaWYgKGJ5dGVzIDwgMTAyNCAqIDEwMjQpIHJldHVybiBgJHsoYnl0ZXMgLyAxMDI0KS50b0ZpeGVkKDEpfSBLQmA7XG4gIHJldHVybiBgJHsoYnl0ZXMgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDEpfSBNQmA7XG59XG5cbmNvbnN0IEVYVEVOU0lPTl9UT19NSU1FOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBwZGY6ICdhcHBsaWNhdGlvbi9wZGYnLFxuICBwbmc6ICdpbWFnZS9wbmcnLFxuICBqcGc6ICdpbWFnZS9qcGVnJyxcbiAganBlZzogJ2ltYWdlL2pwZWcnLFxuICBnaWY6ICdpbWFnZS9naWYnLFxuICBjc3Y6ICd0ZXh0L2NzdicsXG4gIHR4dDogJ3RleHQvcGxhaW4nLFxuICBoZWljOiAnaW1hZ2UvaGVpYycsXG4gIGhlaWY6ICdpbWFnZS9oZWlmJyxcbn07XG5cbi8qKlxuICogVGhlIFN0cmlwZSB1cGxvYWRlcidzIGZpbGVPYmplY3QudHlwZSBjYW4gYmUgYSBmdWxsIE1JTUUgdHlwZVxuICogKFwiYXBwbGljYXRpb24vcGRmXCIpIG9yIGEgYmFyZSBleHRlbnNpb24gKFwicGRmXCIpIGRlcGVuZGluZyBvbiBob3cgdGhlIFNES1xuICogcmVzb2x2ZXMgaXQuIERvd25zdHJlYW0gYXNzZW1ibHkgY29kZSBpbiB0aGUgYmFja2VuZCB3YW50cyByZWFsIE1JTUUgdHlwZXMsXG4gKiBzbyBub3JtYWxpemUgaGVyZSBiZWZvcmUgcGVyc2lzdGluZyB0byBldmlkZW5jZV9maWxlcy5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplTWltZVR5cGUodHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBmaWxlbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgY29uc3QgdCA9ICh0eXBlID8/ICcnKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgaWYgKHQuaW5jbHVkZXMoJy8nKSkgcmV0dXJuIHQ7XG4gIGlmICh0ICYmIEVYVEVOU0lPTl9UT19NSU1FW3RdKSByZXR1cm4gRVhURU5TSU9OX1RPX01JTUVbdF07XG4gIGNvbnN0IG5hbWUgPSAoZmlsZW5hbWUgPz8gJycpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGRvdCA9IG5hbWUubGFzdEluZGV4T2YoJy4nKTtcbiAgaWYgKGRvdCA+PSAwKSB7XG4gICAgY29uc3QgZXh0ID0gbmFtZS5zbGljZShkb3QgKyAxKTtcbiAgICBpZiAoRVhURU5TSU9OX1RPX01JTUVbZXh0XSkgcmV0dXJuIEVYVEVOU0lPTl9UT19NSU1FW2V4dF07XG4gIH1cbiAgcmV0dXJuICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xufVxuXG5mdW5jdGlvbiBnZXRNaW1lTGFiZWwobWltZVR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAnYXBwbGljYXRpb24vcGRmJzogJ1BERicsXG4gICAgJ2ltYWdlL3BuZyc6ICdQTkcnLFxuICAgICdpbWFnZS9qcGVnJzogJ0pQRycsXG4gICAgJ2ltYWdlL2dpZic6ICdHSUYnLFxuICAgICd0ZXh0L2Nzdic6ICdDU1YnLFxuICAgICd0ZXh0L3BsYWluJzogJ1RYVCcsXG4gIH07XG4gIHJldHVybiBtYXBbbWltZVR5cGVdID8/ICdGSUxFJztcbn1cblxuY29uc3QgRmlsZVVwbG9hZFNlY3Rpb24gPSAoe1xuICBkaXNwdXRlSWQsXG4gIGNoZWNrbGlzdEl0ZW1LZXksXG4gIGV4aXN0aW5nRmlsZSxcbiAgY29udGV4dCxcbiAgb25GaWxlQ2hhbmdlLFxuICBzdWJtaXR0ZWQsXG59OiBGaWxlVXBsb2FkU2VjdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93UmVwbGFjZSwgc2V0U2hvd1JlcGxhY2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZENvbXBsZXRlID0gYXN5bmMgKGZpbGVPYmplY3Q6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICB0eXBlPzogc3RyaW5nO1xuICB9KSA9PiB7XG4gICAgc2V0RXJyb3IobnVsbCk7XG5cbiAgICBjb25zdCBub3JtYWxpemVkTWltZSA9IG5vcm1hbGl6ZU1pbWVUeXBlKGZpbGVPYmplY3QudHlwZSwgZmlsZU9iamVjdC5maWxlbmFtZSk7XG4gICAgaWYgKG5vcm1hbGl6ZWRNaW1lID09PSAnaW1hZ2UvaGVpYycgfHwgbm9ybWFsaXplZE1pbWUgPT09ICdpbWFnZS9oZWlmJykge1xuICAgICAgc2V0RXJyb3IoXG4gICAgICAgIFwiSEVJQyBwaG90b3MgYXJlbid0IHN1cHBvcnRlZC4gT3BlbiB0aGUgZmlsZSBpbiBQcmV2aWV3IG9yIHlvdXIgcGhvdG8gYXBwLCBleHBvcnQgaXQgYXMgSlBFRyBvciBQTkcsIGFuZCB0cnkgYWdhaW4uXCIsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNhdmluZyh0cnVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBFdmlkZW5jZUZpbGUgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZUlkfS9ldmlkZW5jZS1maWxlc2AsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHtcbiAgICAgICAgICBjaGVja2xpc3RfaXRlbV9rZXk6IGNoZWNrbGlzdEl0ZW1LZXksXG4gICAgICAgICAgc3RyaXBlX2ZpbGVfaWQ6IGZpbGVPYmplY3QuaWQsXG4gICAgICAgICAgZmlsZV9uYW1lOiBmaWxlT2JqZWN0LmZpbGVuYW1lID8/ICd1bnRpdGxlZCcsXG4gICAgICAgICAgZmlsZV9zaXplOiBmaWxlT2JqZWN0LnNpemUsXG4gICAgICAgICAgbWltZV90eXBlOiBub3JtYWxpemVkTWltZSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBvbkZpbGVDaGFuZ2UocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0U2hvd1JlcGxhY2UoZmFsc2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGZpbGUgcmVjb3JkLiBUaGUgZmlsZSB3YXMgdXBsb2FkZWQgdG8gU3RyaXBlIGJ1dCB3ZSBjb3VsZCBub3QgbGluayBpdC4gVHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGxvYWRFcnJvciA9ICgpID0+IHtcbiAgICBzZXRFcnJvcignVXBsb2FkIGZhaWxlZC4gQ2hlY2sgeW91ciBmaWxlIGlzIHVuZGVyIDEwTUIgYW5kIGEgc3VwcG9ydGVkIHR5cGUgKFBERiwgUE5HLCBKUEcsIEdJRiwgQ1NWLCBUWFQpLicpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWV4aXN0aW5nRmlsZSkgcmV0dXJuO1xuICAgIHNldEVycm9yKG51bGwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZUJhY2tlbmQoXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZUlkfS9ldmlkZW5jZS1maWxlcy8ke2V4aXN0aW5nRmlsZS5pZH1gLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgKTtcbiAgICAgIG9uRmlsZUNoYW5nZShudWxsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGZpbGUuIFRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVhZC1vbmx5IG1vZGUgcG9zdC1zdWJtaXNzaW9uXG4gIGlmIChzdWJtaXR0ZWQpIHtcbiAgICBpZiAoZXhpc3RpbmdGaWxlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge2V4aXN0aW5nRmlsZS5maWxlX25hbWV9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+e2dldE1pbWVMYWJlbChleGlzdGluZ0ZpbGUubWltZV90eXBlKX08L0JhZGdlPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Zvcm1hdEZpbGVTaXplKGV4aXN0aW5nRmlsZS5maWxlX3NpemUpfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgTm8gZmlsZSBhdHRhY2hlZFxuICAgICAgPC9JbmxpbmU+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY3JpdGljYWxcIlxuICAgICAgICAgIHRpdGxlPVwiVXBsb2FkIGlzc3VlXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17ZXJyb3J9XG4gICAgICAgICAgb25EaXNtaXNzPXsoKSA9PiBzZXRFcnJvcihudWxsKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHtleGlzdGluZ0ZpbGUgJiYgIXNob3dSZXBsYWNlID8gKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9XCJ4c21hbGxcIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICB7ZXhpc3RpbmdGaWxlLmZpbGVfbmFtZX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+e2dldE1pbWVMYWJlbChleGlzdGluZ0ZpbGUubWltZV90eXBlKX08L0JhZGdlPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtmb3JtYXRGaWxlU2l6ZShleGlzdGluZ0ZpbGUuZmlsZV9zaXplKX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxMaW5rIG9uUHJlc3M9eygpID0+IHNldFNob3dSZXBsYWNlKHRydWUpfT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlJlcGxhY2U8L0lubGluZT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxMaW5rIG9uUHJlc3M9e2hhbmRsZVJlbW92ZX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdjcml0aWNhbCcgfX0+UmVtb3ZlPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7c2hvd1JlcGxhY2UgJiYgKFxuICAgICAgICAgICAgPExpbmsgb25QcmVzcz17KCkgPT4gc2V0U2hvd1JlcGxhY2UoZmFsc2UpfT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+Q2FuY2VsIHJlcGxhY2U8L0lubGluZT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxTdHJpcGVGaWxlVXBsb2FkZXJcbiAgICAgICAgICAgIGxhYmVsPXtzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdDaG9vc2UgZmlsZSd9XG4gICAgICAgICAgICBwdXJwb3NlPVwiZGlzcHV0ZV9ldmlkZW5jZVwiXG4gICAgICAgICAgICBvbkNvbXBsZXRlPXtoYW5kbGVVcGxvYWRDb21wbGV0ZX1cbiAgICAgICAgICAgIG9uRXJyb3I9e2hhbmRsZVVwbG9hZEVycm9yfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBQREYsIFBORywgSlBHLCBvciBHSUYuIE1heCAxME1CLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGaWxlVXBsb2FkU2VjdGlvbjtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgTmFycmF0aXZlUGhhc2UsIE5hcnJhdGl2ZUFubm90YXRpb24sIFN0YXR1c1Jlc3BvbnNlLCBGZWVkYmFja1RhZyB9IGZyb20gJy4uLy4uL2xpYi9uYXJyYXRpdmUtdHlwZXMnO1xuaW1wb3J0IHsgUE9MTF9JTlRFUlZBTF9NUywgTUFYX1BPTExfRFVSQVRJT05fTVMgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCBOYXJyYXRpdmVQcmVHZW5lcmF0aW9uIGZyb20gJy4vTmFycmF0aXZlUHJlR2VuZXJhdGlvbic7XG5pbXBvcnQgTmFycmF0aXZlR2VuZXJhdGluZyBmcm9tICcuL05hcnJhdGl2ZUdlbmVyYXRpbmcnO1xuaW1wb3J0IE5hcnJhdGl2ZVJldmlldyBmcm9tICcuL05hcnJhdGl2ZVJldmlldyc7XG5pbXBvcnQgTmFycmF0aXZlRXJyb3IgZnJvbSAnLi9OYXJyYXRpdmVFcnJvcic7XG5cbmludGVyZmFjZSBOYXJyYXRpdmVQYW5lbFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGV2aWRlbmNlRmlsZXM6IEV2aWRlbmNlRmlsZVtdO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIGVkaXRlZE5hcnJhdGl2ZTogc3RyaW5nO1xuICBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZTogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25BcHByb3ZlOiAobmFycmF0aXZlVGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk5hdmlnYXRlQmFjazogKCkgPT4gdm9pZDtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxuY29uc3QgTmFycmF0aXZlUGFuZWwgPSAoe1xuICBkaXNwdXRlLFxuICBwbGF5Ym9vayxcbiAgZXZpZGVuY2VGaWxlcyxcbiAgY29udGV4dCxcbiAgZWRpdGVkTmFycmF0aXZlLFxuICBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZSxcbiAgb25BcHByb3ZlLFxuICBvbk5hdmlnYXRlQmFjayxcbiAgc3VibWl0dGVkLFxufTogTmFycmF0aXZlUGFuZWxQcm9wcykgPT4ge1xuICAvLyBTZWVkIGZyb20gcGVyc2lzdGVkIG5hcnJhdGl2ZV90ZXh0IHNvIHRoZSBSZXZpZXcgdmlldyBzaG93cyBvbiByZWxvYWRcbiAgLy8gYWNyb3NzIHNlc3Npb25zLCBub3QgdGhlIHByZS1nZW5lcmF0aW9uIHByb21wdCAoV0lOLTIwKS5cbiAgY29uc3QgW3BoYXNlLCBzZXRQaGFzZV0gPSB1c2VTdGF0ZTxOYXJyYXRpdmVQaGFzZT4oKCkgPT5cbiAgICBlZGl0ZWROYXJyYXRpdmUgPyAncmV2aWV3JyA6ICdpZGxlJyxcbiAgKTtcbiAgY29uc3QgW2dlbmVyYXRpb25JZCwgc2V0R2VuZXJhdGlvbklkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbmFycmF0aXZlLCBzZXROYXJyYXRpdmVdID0gdXNlU3RhdGU8c3RyaW5nPigoKSA9PiBlZGl0ZWROYXJyYXRpdmUpO1xuICBjb25zdCBbYW5ub3RhdGlvbnMsIHNldEFubm90YXRpb25zXSA9IHVzZVN0YXRlPE5hcnJhdGl2ZUFubm90YXRpb25bXT4oW10pO1xuICBjb25zdCBbZ2VuZXJhdGlvbk51bWJlciwgc2V0R2VuZXJhdGlvbk51bWJlcl0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0dlbmVyYXRpb25MaW1pdCwgc2V0SXNHZW5lcmF0aW9uTGltaXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWY8RXh0ZW5zaW9uQ29udGV4dFZhbHVlPihjb250ZXh0KTtcbiAgY29uc3QgcG9sbFN0YXJ0UmVmID0gdXNlUmVmPG51bWJlcj4oMCk7XG4gIGNvbnN0IHBvbGxSZXRyeUNvdW50UmVmID0gdXNlUmVmPG51bWJlcj4oMCk7XG5cbiAgLy8gS2VlcCBjb250ZXh0UmVmIGZyZXNoIGFzIGNvbnRleHQgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG4gIH0sIFtjb250ZXh0XSk7XG5cbiAgLy8gUG9sbGluZyBlZmZlY3Q6IG9ubHkgYWN0aXZlIHdoZW4gcGhhc2UgPT09ICdnZW5lcmF0aW5nJyBhbmQgZ2VuZXJhdGlvbklkIGlzIHNldFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwaGFzZSAhPT0gJ2dlbmVyYXRpbmcnIHx8ICFnZW5lcmF0aW9uSWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwb2xsU3RhcnRSZWYuY3VycmVudCA9IERhdGUubm93KCk7XG4gICAgcG9sbFJldHJ5Q291bnRSZWYuY3VycmVudCA9IDA7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGV4Y2VlZGVkIHRoZSBtYXggcG9sbCBkdXJhdGlvblxuICAgICAgaWYgKERhdGUubm93KCkgLSBwb2xsU3RhcnRSZWYuY3VycmVudCA+IE1BWF9QT0xMX0RVUkFUSU9OX01TKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoJ05hcnJhdGl2ZSBnZW5lcmF0aW9uIHRpbWVkIG91dC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgc2V0UGhhc2UoJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RhdHVzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8U3RhdHVzUmVzcG9uc2U+KFxuICAgICAgICAgIGAvYXBpL25hcnJhdGl2ZXMvJHtnZW5lcmF0aW9uSWR9L3N0YXR1c2AsXG4gICAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChzdGF0dXNSZXNwb25zZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0TmFycmF0aXZlKHN0YXR1c1Jlc3BvbnNlLm5hcnJhdGl2ZSk7XG4gICAgICAgICAgc2V0QW5ub3RhdGlvbnMoc3RhdHVzUmVzcG9uc2UuYW5ub3RhdGlvbnMpO1xuICAgICAgICAgIG9uRWRpdGVkTmFycmF0aXZlQ2hhbmdlKHN0YXR1c1Jlc3BvbnNlLm5hcnJhdGl2ZSk7XG4gICAgICAgICAgc2V0UGhhc2UoJ3JldmlldycpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1c1Jlc3BvbnNlLnN0YXR1cyA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2Uoc3RhdHVzUmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIC8vICdwZW5kaW5nJyA9PiBrZWVwIHBvbGxpbmdcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBwb2xsUmV0cnlDb3VudFJlZi5jdXJyZW50ICs9IDE7XG4gICAgICAgIGlmIChwb2xsUmV0cnlDb3VudFJlZi5jdXJyZW50ID49IDMpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoJ05ldHdvcmsgZXJyb3Igd2hpbGUgY2hlY2tpbmcgZ2VuZXJhdGlvbiBzdGF0dXMuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgc2V0UGhhc2UoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBQT0xMX0lOVEVSVkFMX01TKTtcblxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW3BoYXNlLCBnZW5lcmF0aW9uSWQsIG9uRWRpdGVkTmFycmF0aXZlQ2hhbmdlXSk7XG5cbiAgY29uc3QgaGFuZGxlR2VuZXJhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAobWVyY2hhbnRGZWVkYmFjazogc3RyaW5nLCB0YWdzOiBGZWVkYmFja1RhZ1tdID0gW10pID0+IHtcbiAgICBzZXRQaGFzZSgnZ2VuZXJhdGluZycpO1xuICAgIHNldEVycm9yTWVzc2FnZShudWxsKTtcbiAgICBzZXRJc0dlbmVyYXRpb25MaW1pdChmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBnZW5lcmF0aW9uX2lkOiBzdHJpbmcgfT4oXG4gICAgICAgICcvYXBpL25hcnJhdGl2ZXMvZ2VuZXJhdGUnLFxuICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwdXRlX2lkOiBkaXNwdXRlLmlkLFxuICAgICAgICAgIHJlYXNvbl9jb2RlOiBkaXNwdXRlLnJlYXNvbl9jb2RlLFxuICAgICAgICAgIG5ldHdvcms6IGRpc3B1dGUubmV0d29yayxcbiAgICAgICAgICBtZXJjaGFudF9mZWVkYmFjazogbWVyY2hhbnRGZWVkYmFjayxcbiAgICAgICAgICBtZXJjaGFudF9mZWVkYmFja190YWdzOiB0YWdzLFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgc2V0R2VuZXJhdGlvbklkKHJlc3BvbnNlLmdlbmVyYXRpb25faWQpO1xuICAgICAgc2V0R2VuZXJhdGlvbk51bWJlcigocHJldikgPT4gcHJldiArIDEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yICYmIGVyci5zdGF0dXMgPT09IDQyOSAmJiBlcnIuY29kZSA9PT0gJ2dlbmVyYXRpb25fbGltaXQnKSB7XG4gICAgICAgIHNldElzR2VuZXJhdGlvbkxpbWl0KHRydWUpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgfVxuICAgICAgc2V0UGhhc2UoJ2Vycm9yJyk7XG4gICAgfVxuICB9LCBbZGlzcHV0ZS5pZCwgZGlzcHV0ZS5yZWFzb25fY29kZSwgZGlzcHV0ZS5uZXR3b3JrXSk7XG5cbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvbkFwcHJvdmUoZWRpdGVkTmFycmF0aXZlKTtcbiAgfSwgW29uQXBwcm92ZSwgZWRpdGVkTmFycmF0aXZlXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVnZW5lcmF0ZSA9IHVzZUNhbGxiYWNrKChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcsIHRhZ3M6IEZlZWRiYWNrVGFnW10pID0+IHtcbiAgICBoYW5kbGVHZW5lcmF0ZShtZXJjaGFudEZlZWRiYWNrLCB0YWdzKTtcbiAgfSwgW2hhbmRsZUdlbmVyYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlUmV0cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKG51bGwpO1xuICAgIHNldFBoYXNlKCdpZGxlJyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVFcnJvckNvbnRpbnVlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9uQXBwcm92ZShlZGl0ZWROYXJyYXRpdmUpO1xuICB9LCBbb25BcHByb3ZlLCBlZGl0ZWROYXJyYXRpdmVdKTtcblxuICAvLyBQb3N0LXN1Ym1pc3Npb246IHJlbmRlciBuYXJyYXRpdmUgaW4gcmVhZC1vbmx5IG1vZGUgcmVnYXJkbGVzcyBvZiBsb2NhbCBwaGFzZSBzdGF0ZVxuICBpZiAoc3VibWl0dGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxOYXJyYXRpdmVSZXZpZXdcbiAgICAgICAgbmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgIGFubm90YXRpb25zPXthbm5vdGF0aW9uc31cbiAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgIGdlbmVyYXRpb25OdW1iZXI9e2dlbmVyYXRpb25OdW1iZXJ9XG4gICAgICAgIG9uRWRpdENoYW5nZT17b25FZGl0ZWROYXJyYXRpdmVDaGFuZ2V9XG4gICAgICAgIG9uQXBwcm92ZT17aGFuZGxlQXBwcm92ZX1cbiAgICAgICAgb25SZWdlbmVyYXRlPXtoYW5kbGVSZWdlbmVyYXRlfVxuICAgICAgICBzdWJtaXR0ZWRcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHN3aXRjaCAocGhhc2UpIHtcbiAgICBjYXNlICdpZGxlJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVQcmVHZW5lcmF0aW9uXG4gICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICBnZW5lcmF0aW9uTnVtYmVyPXtnZW5lcmF0aW9uTnVtYmVyfVxuICAgICAgICAgIG9uR2VuZXJhdGU9e2hhbmRsZUdlbmVyYXRlfVxuICAgICAgICAgIG9uTmF2aWdhdGVCYWNrPXtvbk5hdmlnYXRlQmFja31cbiAgICAgICAgLz5cbiAgICAgICk7XG5cbiAgICBjYXNlICdnZW5lcmF0aW5nJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVHZW5lcmF0aW5nIGRpc3B1dGU9e2Rpc3B1dGV9IC8+XG4gICAgICApO1xuXG4gICAgY2FzZSAncmV2aWV3JzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVSZXZpZXdcbiAgICAgICAgICBuYXJyYXRpdmU9e25hcnJhdGl2ZX1cbiAgICAgICAgICBhbm5vdGF0aW9ucz17YW5ub3RhdGlvbnN9XG4gICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgZ2VuZXJhdGlvbk51bWJlcj17Z2VuZXJhdGlvbk51bWJlcn1cbiAgICAgICAgICBvbkVkaXRDaGFuZ2U9e29uRWRpdGVkTmFycmF0aXZlQ2hhbmdlfVxuICAgICAgICAgIG9uQXBwcm92ZT17aGFuZGxlQXBwcm92ZX1cbiAgICAgICAgICBvblJlZ2VuZXJhdGU9e2hhbmRsZVJlZ2VuZXJhdGV9XG4gICAgICAgIC8+XG4gICAgICApO1xuXG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5hcnJhdGl2ZUVycm9yXG4gICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgaXNHZW5lcmF0aW9uTGltaXQ9e2lzR2VuZXJhdGlvbkxpbWl0fVxuICAgICAgICAgIG9uRWRpdENoYW5nZT17b25FZGl0ZWROYXJyYXRpdmVDaGFuZ2V9XG4gICAgICAgICAgb25Db250aW51ZT17aGFuZGxlRXJyb3JDb250aW51ZX1cbiAgICAgICAgICBvblJldHJ5PXtoYW5kbGVSZXRyeX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZVBhbmVsO1xuIiwgImV4cG9ydCB0eXBlIE5hcnJhdGl2ZVBoYXNlID0gJ2lkbGUnIHwgJ2dlbmVyYXRpbmcnIHwgJ3JldmlldycgfCAnZXJyb3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hcnJhdGl2ZUFubm90YXRpb24ge1xuICBzZWN0aW9uOiBzdHJpbmc7XG4gIHJlYXNvbmluZzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmVzcG9uc2Uge1xuICBnZW5lcmF0aW9uX2lkOiBzdHJpbmc7XG4gIHN0YXR1czogJ3BlbmRpbmcnO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0dXNSZXNwb25zZSA9XG4gIHwgeyBzdGF0dXM6ICdwZW5kaW5nJyB9XG4gIHwgeyBzdGF0dXM6ICdjb21wbGV0ZWQnOyBuYXJyYXRpdmU6IHN0cmluZzsgYW5ub3RhdGlvbnM6IE5hcnJhdGl2ZUFubm90YXRpb25bXSB9XG4gIHwgeyBzdGF0dXM6ICdmYWlsZWQnOyBlcnJvcjogc3RyaW5nIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpRXJyb3JSZXNwb25zZSB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IE1BWF9HRU5FUkFUSU9OUyA9IDU7XG5leHBvcnQgY29uc3QgUE9MTF9JTlRFUlZBTF9NUyA9IDMwMDA7XG5leHBvcnQgY29uc3QgTUFYX1BPTExfRFVSQVRJT05fTVMgPSA2MDAwMDtcblxuLy8gU3RydWN0dXJlZCBmZWVkYmFjayBjaGlwcyBvbiB0aGUgcmVnZW5lcmF0aW9uIFVJIChXSU4tMzUpLiBWYWx1ZXMgbWlycm9yXG4vLyB0aGUgYmFja2VuZCdzIEZFRURCQUNLX1RBR1MgbGlzdCBpbiBiYWNrZW5kL2xpYi9uYXJyYXRpdmVzL2ZlZWRiYWNrLXRhZ3MudHNcbi8vIC0tIGtlZXAgdGhlbSBpbiBzeW5jLlxuZXhwb3J0IGNvbnN0IEZFRURCQUNLX1RBR1MgPSBbXG4gIHsgaWQ6ICd0b29fZm9ybWFsJywgbGFiZWw6ICdUb28gZm9ybWFsJyB9LFxuICB7IGlkOiAnbWlzc2luZ19ldmlkZW5jZScsIGxhYmVsOiAnTWlzc2luZyBrZXkgZXZpZGVuY2UnIH0sXG4gIHsgaWQ6ICdpbmFjY3VyYXRlJywgbGFiZWw6ICdJbmFjY3VyYXRlIGRldGFpbHMnIH0sXG4gIHsgaWQ6ICd0b29fbG9uZycsIGxhYmVsOiAnVG9vIGxvbmcnIH0sXG4gIHsgaWQ6ICdvdGhlcicsIGxhYmVsOiAnT3RoZXInIH0sXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja1RhZyA9ICh0eXBlb2YgRkVFREJBQ0tfVEFHUylbbnVtYmVyXVsnaWQnXTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJhZGdlLFxuICBCYW5uZXIsXG4gIEJveCxcbiAgQnV0dG9uLFxuICBEaXZpZGVyLFxuICBJbmxpbmUsXG4gIExpbmssXG4gIFRleHRBcmVhLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBQbGF5Ym9va0RhdGEsIEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBNQVhfR0VORVJBVElPTlMgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcbmltcG9ydCB7IGdldFN0cmlwZUZpZWxkUmVzdWx0IH0gZnJvbSAnLi4vLi4vbGliL3N0cmlwZS1maWVsZC1zdGF0dXMnO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlUHJlR2VuZXJhdGlvblByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGV2aWRlbmNlRmlsZXM6IEV2aWRlbmNlRmlsZVtdO1xuICBnZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG4gIG9uR2VuZXJhdGU6IChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTmF2aWdhdGVCYWNrOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBOYXJyYXRpdmVQcmVHZW5lcmF0aW9uID0gKHtcbiAgZGlzcHV0ZSxcbiAgcGxheWJvb2ssXG4gIGV2aWRlbmNlRmlsZXMsXG4gIGdlbmVyYXRpb25OdW1iZXIsXG4gIG9uR2VuZXJhdGUsXG4gIG9uTmF2aWdhdGVCYWNrLFxufTogTmFycmF0aXZlUHJlR2VuZXJhdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IFtmZWVkYmFjaywgc2V0RmVlZGJhY2tdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHJlbWFpbmluZyA9IE1BWF9HRU5FUkFUSU9OUyAtIGdlbmVyYXRpb25OdW1iZXI7XG4gIGNvbnN0IGxpbWl0UmVhY2hlZCA9IHJlbWFpbmluZyA8PSAwO1xuXG4gIC8vIEJ1aWxkIGEgbG9va3VwIG1hcDogY2hlY2tsaXN0X2l0ZW1fa2V5IC0+IEV2aWRlbmNlRmlsZVxuICBjb25zdCBmaWxlc0J5S2V5ID0gbmV3IE1hcDxzdHJpbmcsIEV2aWRlbmNlRmlsZT4oKTtcbiAgZm9yIChjb25zdCBmaWxlIG9mIGV2aWRlbmNlRmlsZXMpIHtcbiAgICBmaWxlc0J5S2V5LnNldChmaWxlLmNoZWNrbGlzdF9pdGVtX2tleSwgZmlsZSk7XG4gIH1cblxuICAvLyBDb21wdXRlIHBlci1pdGVtIHNhdGlzZmFjdGlvbi4gVGhyZWUgY2F0ZWdvcmllcyBvZiBcInNhdGlzZmllZFwiOlxuICAvLyAgIC0gQSAoc3RyaXBlX2ZpZWxkKTogc2F0aXNmaWVkIHdoZW4gYXV0by1wdWxsIHJldHVybnMgYSBwb3NpdGl2ZSB2YWx1ZVxuICAvLyAgIC0gU2xvdCAoc3RyaXBlX2V2aWRlbmNlX2ZpZWxkKTogc2F0aXNmaWVkIHdoZW4gYSBmaWxlIGlzIHVwbG9hZGVkXG4gIC8vICAgLSBUIChuYXJyYXRpdmVfb25seSk6IGFsd2F5cyBzYXRpc2ZpZWQgLS0gZWl0aGVyIHRoZSBtZXJjaGFudCB0eXBlZFxuICAvLyAgICAgYSBub3RlIG9yIHRoZSBwZXItcGxheWJvb2sgZmFsbGJhY2sgZmlsbHMgaXQgaW4gYXQgbmFycmF0aXZlIHRpbWUuXG4gIC8vICAgICAoV0lOLTQ5KVxuICBjb25zdCBjaGVja2xpc3ROb3RlcyA9IGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzID8/IHt9O1xuICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IHBsYXlib29rPy5ldmlkZW5jZV9jaGVja2xpc3QgPz8gW107XG4gIGNvbnN0IGl0ZW1TdGF0dXNlcyA9IGNoZWNrbGlzdEl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZWRGaWxlID0gZmlsZXNCeUtleS5nZXQoaXRlbS5rZXkpO1xuICAgIGNvbnN0IHN0cmlwZUZpZWxkID0gZ2V0U3RyaXBlRmllbGRSZXN1bHQoaXRlbSwgZGlzcHV0ZSk7XG4gICAgY29uc3QgYXV0b0ZpbGxlZCA9IHN0cmlwZUZpZWxkPy5zdGF0dXMgPT09ICdwb3NpdGl2ZSc7XG4gICAgY29uc3QgaGFzTWVyY2hhbnROb3RlID0gISEoY2hlY2tsaXN0Tm90ZXNbaXRlbS5rZXldPy50cmltKCkpO1xuICAgIGNvbnN0IGlzTmFycmF0aXZlT25seSA9ICEhaXRlbS5uYXJyYXRpdmVfb25seTtcbiAgICBjb25zdCBzYXRpc2ZpZWQgPSAhIW1hdGNoZWRGaWxlIHx8IGF1dG9GaWxsZWQgfHwgaXNOYXJyYXRpdmVPbmx5O1xuICAgIGxldCBzdGF0dXNMYWJlbDogc3RyaW5nO1xuICAgIGlmIChtYXRjaGVkRmlsZSkge1xuICAgICAgc3RhdHVzTGFiZWwgPSAnVXBsb2FkZWQnO1xuICAgIH0gZWxzZSBpZiAoYXV0b0ZpbGxlZCkge1xuICAgICAgc3RhdHVzTGFiZWwgPSAnRnJvbSBTdHJpcGUnO1xuICAgIH0gZWxzZSBpZiAoaXNOYXJyYXRpdmVPbmx5KSB7XG4gICAgICBzdGF0dXNMYWJlbCA9IGhhc01lcmNoYW50Tm90ZSA/ICdOb3RlcyBhZGRlZCcgOiAnSW4gbmFycmF0aXZlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzTGFiZWwgPSAnTm90IHVwbG9hZGVkJztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW0sXG4gICAgICBtYXRjaGVkRmlsZSxcbiAgICAgIHN0cmlwZUZpZWxkLFxuICAgICAgYXV0b0ZpbGxlZCxcbiAgICAgIGlzTmFycmF0aXZlT25seSxcbiAgICAgIGhhc01lcmNoYW50Tm90ZSxcbiAgICAgIHNhdGlzZmllZCxcbiAgICAgIHN0YXR1c0xhYmVsLFxuICAgIH07XG4gIH0pO1xuICBjb25zdCBzYXRpc2ZpZWRDb3VudCA9IGl0ZW1TdGF0dXNlcy5maWx0ZXIoKHMpID0+IHMuc2F0aXNmaWVkKS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsSXRlbXMgPSBpdGVtU3RhdHVzZXMubGVuZ3RoO1xuICBjb25zdCBoYXNOb0V2aWRlbmNlID0gc2F0aXNmaWVkQ291bnQgPT09IDA7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgey8qIENvYWNoIGhlYWRlcjogaW50cm9kdWNlcyB0aGUgbmFycmF0aXZlIHN0ZXAgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+QUkgQ29hY2g8L0JhZGdlPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgUmVhZHkgdG8gd3JpdGUgeW91ciBuYXJyYXRpdmVcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIFdpbkJhY2sgd2lsbCB1c2UgeW91ciB1cGxvYWRlZCBldmlkZW5jZSBhbmQgdGhlIGRldGFpbHMgU3RyaXBlIGhhc1xuICAgICAgICAgIG9uIHRoaXMgdHJhbnNhY3Rpb24gdG8gZHJhZnQgYSByZXNwb25zZSB0YWlsb3JlZCB0byB0aGlzIGRpc3B1dGUuXG4gICAgICAgICAgUmV2aWV3IHdoYXQgdGhlIEFJIHdpbGwgd29yayB3aXRoIGJlbG93LCB0aGVuIGdlbmVyYXRlIHlvdXIgZHJhZnQuXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBFdmlkZW5jZSBzdW1tYXJ5IGNhcmQgKi99XG4gICAgICB7cGxheWJvb2sgPyAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgICBnYXA6ICdtZWRpdW0nLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBFdmlkZW5jZSBzdW1tYXJ5XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7c2F0aXNmaWVkQ291bnR9IG9mIHt0b3RhbEl0ZW1zfSBjb3ZlcmVkXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHtoYXNOb0V2aWRlbmNlICYmIChcbiAgICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgICAgICB0aXRsZT1cIk5vIGV2aWRlbmNlIGF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiVGhlIEFJIGNhbiBzdGlsbCBnZW5lcmF0ZSBhIG5hcnJhdGl2ZSwgYnV0IHlvdXIgY2hhbmNlcyBvZiB3aW5uaW5nIGFyZSBtdWNoIGxvd2VyIHdpdGhvdXQgc3VwcG9ydGluZyBldmlkZW5jZS5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAwIH19PlxuICAgICAgICAgICAge2l0ZW1TdGF0dXNlcy5tYXAoKHsgaXRlbSwgc2F0aXNmaWVkIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzRmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aXRlbS5rZXl9IGNzcz17eyBzdGFjazogJ3knLCBnYXA6IDAgfX0+XG4gICAgICAgICAgICAgICAgICB7IWlzRmlyc3QgJiYgPERpdmlkZXIgLz59XG4gICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdZOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMy80JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNhdGlzZmllZCA/ICdzdWNjZXNzJyA6ICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYXRpc2ZpZWQgPyAnXFx1MjcxMycgOiAnXFx1MjVDQid9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdjYXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNhdGlzZmllZCA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udDogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ3NlbWlib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzYXRpc2ZpZWQgPyAnc3VjY2VzcycgOiAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbVN0YXR1c2VzW2luZGV4XS5zdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgPExpbmsgb25QcmVzcz17b25OYXZpZ2F0ZUJhY2t9PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICAgICAgICB7J1xcdTIxOTAgR28gYmFjayB0byBhZGQgbW9yZSBldmlkZW5jZSd9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIlBsYXlib29rIG5vdCBhdmFpbGFibGVcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiTm8gcGxheWJvb2sgd2FzIGZvdW5kIGZvciB0aGlzIGRpc3B1dGUgdHlwZS4gVGhlIEFJIHdpbGwgZ2VuZXJhdGUgYSBnZW5lcmFsIG5hcnJhdGl2ZSBiYXNlZCBvbiB0aGUgZGlzcHV0ZSBkZXRhaWxzLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogTWVyY2hhbnQgZmVlZGJhY2sgY2FyZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgQW55dGhpbmcgZWxzZSB0aGUgQUkgc2hvdWxkIGtub3c/XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBPcHRpb25hbC4gQWRkIGFueSBjb250ZXh0IHRoZSBldmlkZW5jZSBmaWxlcyBkb24ndCBhbHJlYWR5IGNhcHR1cmUuXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIEN1c3RvbWVyIGNvbmZpcm1lZCByZWNlaXB0IGJ5IHBob25lIG9uIE1hcmNoIDIwdGhcIlxuICAgICAgICAgIHZhbHVlPXtmZWVkYmFja31cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZlZWRiYWNrKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICByb3dzPXszfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBHZW5lcmF0ZSBidXR0b24gb3IgbGltaXQgYmFubmVyICovfVxuICAgICAge2xpbWl0UmVhY2hlZCA/IChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIkdlbmVyYXRpb24gbGltaXQgcmVhY2hlZFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249e2BZb3UgaGF2ZSB1c2VkIGFsbCAke01BWF9HRU5FUkFUSU9OU30gbmFycmF0aXZlIGdlbmVyYXRpb25zIGZvciB0aGlzIGRpc3B1dGUuIFJldmlldyBhbmQgZWRpdCB0aGUgZXhpc3RpbmcgbmFycmF0aXZlLCBvciB1c2UgaXQgYXMtaXMgZm9yIHlvdXIgc3VibWlzc2lvbi5gfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnbWVkaXVtJywgYWxpZ25ZOiAnY2VudGVyJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uR2VuZXJhdGUoZmVlZGJhY2spfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEdlbmVyYXRlIE5hcnJhdGl2ZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge3JlbWFpbmluZ30gb2Yge01BWF9HRU5FUkFUSU9OU30gZ2VuZXJhdGlvbntyZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gcmVtYWluaW5nXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZVByZUdlbmVyYXRpb247XG4iLCAiaW1wb3J0IHsgQmFkZ2UsIEJveCwgSW5saW5lLCBTcGlubmVyIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBOYXJyYXRpdmVHZW5lcmF0aW5nUHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xufVxuXG5jb25zdCBOYXJyYXRpdmVHZW5lcmF0aW5nID0gKHsgZGlzcHV0ZSB9OiBOYXJyYXRpdmVHZW5lcmF0aW5nUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ21lZGl1bScsXG4gICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICd4bGFyZ2UnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIEdlbmVyYXRpbmcgeW91ciBuYXJyYXRpdmUuLi5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIFdpbkJhY2sgaXMgYW5hbHl6aW5nIHlvdXIgZXZpZGVuY2UgYW5kIGJ1aWxkaW5nIGEgcmVzcG9uc2UgdGFpbG9yZWQgdG97JyAnfVxuICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmt9IHJlYXNvbiBjb2RlIHtkaXNwdXRlLnJlYXNvbl9jb2RlfS4gVGhpcyB1c3VhbGx5IHRha2VzXG4gICAgICAgICAgNS0xMCBzZWNvbmRzLlxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmFycmF0aXZlR2VuZXJhdGluZztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFjY29yZGlvbixcbiAgQWNjb3JkaW9uSXRlbSxcbiAgQmFkZ2UsXG4gIEJhbm5lcixcbiAgQm94LFxuICBCdXR0b24sXG4gIERpdmlkZXIsXG4gIElubGluZSxcbiAgVGV4dEFyZWEsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQge1xuICBOYXJyYXRpdmVBbm5vdGF0aW9uLFxuICBNQVhfR0VORVJBVElPTlMsXG4gIEZFRURCQUNLX1RBR1MsXG4gIEZlZWRiYWNrVGFnLFxufSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcblxuaW50ZXJmYWNlIE5hcnJhdGl2ZVJldmlld1Byb3BzIHtcbiAgbmFycmF0aXZlOiBzdHJpbmc7XG4gIGFubm90YXRpb25zOiBOYXJyYXRpdmVBbm5vdGF0aW9uW107XG4gIGVkaXRlZE5hcnJhdGl2ZTogc3RyaW5nO1xuICBnZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG4gIG9uRWRpdENoYW5nZTogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25BcHByb3ZlOiAoKSA9PiB2b2lkO1xuICBvblJlZ2VuZXJhdGU6IChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcsIHRhZ3M6IEZlZWRiYWNrVGFnW10pID0+IHZvaWQ7XG4gIHN1Ym1pdHRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IE5hcnJhdGl2ZVJldmlldyA9ICh7XG4gIG5hcnJhdGl2ZSxcbiAgYW5ub3RhdGlvbnMsXG4gIGVkaXRlZE5hcnJhdGl2ZSxcbiAgZ2VuZXJhdGlvbk51bWJlcixcbiAgb25FZGl0Q2hhbmdlLFxuICBvbkFwcHJvdmUsXG4gIG9uUmVnZW5lcmF0ZSxcbiAgc3VibWl0dGVkLFxufTogTmFycmF0aXZlUmV2aWV3UHJvcHMpID0+IHtcbiAgY29uc3QgW3Nob3dSZWdlbkNvbmZpcm0sIHNldFNob3dSZWdlbkNvbmZpcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZmVlZGJhY2ssIHNldEZlZWRiYWNrXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3NlbGVjdGVkVGFncywgc2V0U2VsZWN0ZWRUYWdzXSA9IHVzZVN0YXRlPEZlZWRiYWNrVGFnW10+KFtdKTtcblxuICBjb25zdCByZW1haW5pbmcgPSBNQVhfR0VORVJBVElPTlMgLSBnZW5lcmF0aW9uTnVtYmVyO1xuICBjb25zdCBsaW1pdFJlYWNoZWQgPSByZW1haW5pbmcgPD0gMDtcbiAgY29uc3QgaGFzRWRpdHMgPSBlZGl0ZWROYXJyYXRpdmUgIT09IG5hcnJhdGl2ZTtcblxuICBjb25zdCB0b2dnbGVUYWcgPSAodGFnOiBGZWVkYmFja1RhZykgPT4ge1xuICAgIHNldFNlbGVjdGVkVGFncygocHJldikgPT5cbiAgICAgIHByZXYuaW5jbHVkZXModGFnKSA/IHByZXYuZmlsdGVyKCh0KSA9PiB0ICE9PSB0YWcpIDogWy4uLnByZXYsIHRhZ10sXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWdlbmVyYXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGhhc0VkaXRzKSB7XG4gICAgICBzZXRTaG93UmVnZW5Db25maXJtKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblJlZ2VuZXJhdGUoZmVlZGJhY2ssIHNlbGVjdGVkVGFncyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1SZWdlbmVyYXRlID0gKCkgPT4ge1xuICAgIHNldFNob3dSZWdlbkNvbmZpcm0oZmFsc2UpO1xuICAgIG9uUmVnZW5lcmF0ZShmZWVkYmFjaywgc2VsZWN0ZWRUYWdzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdsYXJnZScgfX0+XG4gICAgICB7LyogQ29hY2ggaGVhZGVyIGNhcmQgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEdlbmVyYXRpb24ge2dlbmVyYXRpb25OdW1iZXJ9IG9mIHtNQVhfR0VORVJBVElPTlN9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgWW91ciBkaXNwdXRlIG5hcnJhdGl2ZVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgUmV2aWV3IHRoZSBBSSdzIHJlYXNvbmluZywgdGhlbiBlZGl0IHRoZSBuYXJyYXRpdmUgYmVsb3cuIFRoaXMgaXNcbiAgICAgICAgICB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgc3VibWl0dGVkIHRvIFN0cmlwZS5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIEFJIFN0cmF0ZWd5ICYgUmVhc29uaW5nIGFjY29yZGlvbiAqL31cbiAgICAgIHthbm5vdGF0aW9ucy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPEFjY29yZGlvbj5cbiAgICAgICAgICA8QWNjb3JkaW9uSXRlbVxuICAgICAgICAgICAgdGl0bGU9XCJBSSBTdHJhdGVneSAmIFJlYXNvbmluZ1wiXG4gICAgICAgICAgICBzdWJ0aXRsZT17YCR7YW5ub3RhdGlvbnMubGVuZ3RofSBzZWN0aW9uJHthbm5vdGF0aW9ucy5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gYW5hbHl6ZWRgfVxuICAgICAgICAgICAgZGVmYXVsdE9wZW5cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICB7YW5ub3RhdGlvbnMubWFwKChhbm5vdGF0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0gY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICA8SW5saW5lXG4gICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdjYXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnc2VtaWJvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2Fubm90YXRpb24uc2VjdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICAgICAgICAgICAgICB7YW5ub3RhdGlvbi5yZWFzb25pbmd9XG4gICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L0FjY29yZGlvbkl0ZW0+XG4gICAgICAgIDwvQWNjb3JkaW9uPlxuICAgICAgKX1cblxuICAgICAgey8qIEVkaXQgY2FyZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge3N1Ym1pdHRlZCA/ICdTdWJtaXR0ZWQgbmFycmF0aXZlJyA6ICdFZGl0IHlvdXIgbmFycmF0aXZlJ31cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICB7IXN1Ym1pdHRlZCAmJiBoYXNFZGl0cyAmJiAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc3VjY2VzcycgfX0+XG4gICAgICAgICAgICAgIHsnXFx1MjcxMyd9IEF1dG8tc2F2ZWRcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7c3VibWl0dGVkXG4gICAgICAgICAgICA/ICdUaGlzIG5hcnJhdGl2ZSB3YXMgc3VibWl0dGVkIHRvIFN0cmlwZSBhbmQgY2Fubm90IGJlIGNoYW5nZWQuJ1xuICAgICAgICAgICAgOiAnRWRpdHMgYXJlIHNhdmVkIGxvY2FsbHkgYW5kIHRyYXZlbCBmb3J3YXJkIHRvIHRoZSBTdWJtaXQgc3RlcC4nfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgIHZhbHVlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkVkaXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHJvd3M9ezEyfVxuICAgICAgICAgIGRpc2FibGVkPXtzdWJtaXR0ZWR9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIFJlZ2VuZXJhdGlvbiBjb25maXJtIGJhbm5lciBcdTIwMTQgaGlkZGVuIHdoZW4gc3VibWl0dGVkICovfVxuICAgICAgeyFzdWJtaXR0ZWQgJiYgc2hvd1JlZ2VuQ29uZmlybSAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJSZWdlbmVyYXRpbmcgd2lsbCByZXBsYWNlIHlvdXIgZWRpdHMuIENvbnRpbnVlP1wiXG4gICAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cImRlc3RydWN0aXZlXCIgb25QcmVzcz17aGFuZGxlQ29uZmlybVJlZ2VuZXJhdGV9PlxuICAgICAgICAgICAgICAgIFllcywgcmVnZW5lcmF0ZVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXsoKSA9PiBzZXRTaG93UmVnZW5Db25maXJtKGZhbHNlKX0+XG4gICAgICAgICAgICAgICAgS2VlcCBlZGl0aW5nXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEZlZWRiYWNrIGNhcmQgZm9yIHJlZ2VuZXJhdGlvbiBcdTIwMTQgaGlkZGVuIHdoZW4gc3VibWl0dGVkICovfVxuICAgICAgeyFzdWJtaXR0ZWQgJiYgIWxpbWl0UmVhY2hlZCAmJiAhc2hvd1JlZ2VuQ29uZmlybSAmJiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBXaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGNoYW5nZT9cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIE9wdGlvbmFsLiBQaWNrIG9uZSBvciBtb3JlLCBhZGQgbm90ZXMsIG9yIHNraXAgYW5kIGNsaWNrIFJlZ2VuZXJhdGUuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICB7RkVFREJBQ0tfVEFHUy5tYXAoKHRhZykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRUYWdzLmluY2x1ZGVzKHRhZy5pZCk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXt0YWcuaWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPXtpc1NlbGVjdGVkID8gJ3ByaW1hcnknIDogJ3NlY29uZGFyeSd9XG4gICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gdG9nZ2xlVGFnKHRhZy5pZCl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RhZy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBbnl0aGluZyBzcGVjaWZpYz8gZS5nLiBFbXBoYXNpemUgdGhlIGRlbGl2ZXJ5IHRyYWNraW5nIG1vcmVcIlxuICAgICAgICAgICAgdmFsdWU9e2ZlZWRiYWNrfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGZWVkYmFjayhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgey8qIEFjdGlvbiBidXR0b25zIFx1MjAxNCBoaWRkZW4gd2hlbiBzdWJtaXR0ZWQgKi99XG4gICAgICB7IXN1Ym1pdHRlZCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17b25BcHByb3ZlfT5cbiAgICAgICAgICAgICAgQXBwcm92ZSAmYW1wOyBDb250aW51ZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIG9uUHJlc3M9e2hhbmRsZVJlZ2VuZXJhdGVDbGlja31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbWl0UmVhY2hlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmVnZW5lcmF0ZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAge2xpbWl0UmVhY2hlZCA/IChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdhdHRlbnRpb24nIH19PlxuICAgICAgICAgICAgICBObyBnZW5lcmF0aW9ucyByZW1haW5pbmdcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge3JlbWFpbmluZ30gZ2VuZXJhdGlvbntyZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gcmVtYWluaW5nXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXJyYXRpdmVSZXZpZXc7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQmFkZ2UsXG4gIEJhbm5lcixcbiAgQm94LFxuICBCdXR0b24sXG4gIElubGluZSxcbiAgVGV4dEFyZWEsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBpbnRlcnBvbGF0ZVRlbXBsYXRlIH0gZnJvbSAnLi4vLi4vbGliL25hcnJhdGl2ZS11dGlscyc7XG5cbmludGVyZmFjZSBOYXJyYXRpdmVFcnJvclByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nIHwgbnVsbDtcbiAgZWRpdGVkTmFycmF0aXZlOiBzdHJpbmc7XG4gIGlzR2VuZXJhdGlvbkxpbWl0OiBib29sZWFuO1xuICBvbkVkaXRDaGFuZ2U6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ29udGludWU6ICgpID0+IHZvaWQ7XG4gIG9uUmV0cnk6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IE5hcnJhdGl2ZUVycm9yID0gKHtcbiAgZGlzcHV0ZSxcbiAgcGxheWJvb2ssXG4gIGVycm9yTWVzc2FnZSxcbiAgZWRpdGVkTmFycmF0aXZlLFxuICBpc0dlbmVyYXRpb25MaW1pdCxcbiAgb25FZGl0Q2hhbmdlLFxuICBvbkNvbnRpbnVlLFxuICBvblJldHJ5LFxufTogTmFycmF0aXZlRXJyb3JQcm9wcykgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZVRleHQgPVxuICAgIHBsYXlib29rPy5uYXJyYXRpdmVfdGVtcGxhdGVcbiAgICAgID8gaW50ZXJwb2xhdGVUZW1wbGF0ZShwbGF5Ym9vay5uYXJyYXRpdmVfdGVtcGxhdGUsIGRpc3B1dGUpXG4gICAgICA6ICcnO1xuXG4gIC8vIE9uIG1vdW50IG9ubHk6IHNlZWQgcGFyZW50IHN0YXRlIHdpdGggdGhlIHRlbXBsYXRlIGlmIHRoZSBuYXJyYXRpdmUgaXMgZW1wdHlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVkaXRlZE5hcnJhdGl2ZSAmJiB0ZW1wbGF0ZVRleHQpIHtcbiAgICAgIG9uRWRpdENoYW5nZSh0ZW1wbGF0ZVRleHQpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtdKTtcblxuICBjb25zdCBkaXNwbGF5VGV4dCA9IGVkaXRlZE5hcnJhdGl2ZSB8fCB0ZW1wbGF0ZVRleHQ7XG4gIGNvbnN0IGhhc1RlbXBsYXRlID0gQm9vbGVhbih0ZW1wbGF0ZVRleHQpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIHsvKiBDb2FjaCBoZWFkZXIgZXhwbGFpbmluZyB0aGUgZmFsbGJhY2sgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+QUkgQ29hY2g8L0JhZGdlPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAge2lzR2VuZXJhdGlvbkxpbWl0XG4gICAgICAgICAgICA/ICdHZW5lcmF0aW9uIGxpbWl0IHJlYWNoZWQnXG4gICAgICAgICAgICA6ICdBSSBnZW5lcmF0aW9uIHVuYXZhaWxhYmxlJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIHtpc0dlbmVyYXRpb25MaW1pdFxuICAgICAgICAgICAgPyAnWW91IGhhdmUgdXNlZCBhbGwgYXZhaWxhYmxlIEFJIG5hcnJhdGl2ZSBnZW5lcmF0aW9ucyBmb3IgdGhpcyBkaXNwdXRlLiBZb3UgY2FuIHN0aWxsIGVkaXQgdGhlIHRlbXBsYXRlIGJlbG93IGFuZCBzdWJtaXQgaXQgYXMgeW91ciBtYW51YWwgbmFycmF0aXZlLidcbiAgICAgICAgICAgIDogJ1dlIGNvdWxkIG5vdCByZWFjaCB0aGUgQUkgdGhpcyB0aW1lLiBZb3UgY2FuIGVkaXQgdGhlIHJlYXNvbi1jb2RlLXNwZWNpZmljIHRlbXBsYXRlIGJlbG93IGFuZCBzdWJtaXQgaXQgbWFudWFsbHksIG9yIHRyeSBhZ2FpbiBpbiBhIG1vbWVudC4gWW91ciBkZWFkbGluZSBpcyBub3QgYWZmZWN0ZWQuJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIElubGluZSBlcnJvciBkZXRhaWwgKG9ubHkgZm9yIG5vbi1saW1pdCBlcnJvcnMpICovfVxuICAgICAge2Vycm9yTWVzc2FnZSAmJiAhaXNHZW5lcmF0aW9uTGltaXQgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgICB0aXRsZT1cIkRldGFpbHNcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogRWRpdCBjYXJkICovfVxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICB7aGFzVGVtcGxhdGUgPyAnRWRpdCB0aGUgdGVtcGxhdGUnIDogJ1dyaXRlIHlvdXIgbmFycmF0aXZlJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIHtoYXNUZW1wbGF0ZSA/IChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEZpbGwgaW4gdGhlIFticmFja2V0ZWQgc2VjdGlvbnNdIHdpdGggeW91ciBzcGVjaWZpYyBkZXRhaWxzLlxuICAgICAgICAgICAgU3RyaXBlLXZlcmlmaWVkIGZpZWxkcyAoQVZTLCBDVlYsIDNEUykgYXJlIGFscmVhZHkgZmlsbGVkIGluLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgRGVzY3JpYmUgd2hhdCBoYXBwZW5lZCwgd2h5IHRoaXMgY2hhcmdlIHdhcyBsZWdpdGltYXRlLCBhbmQgdGhlXG4gICAgICAgICAgICBldmlkZW5jZSB0aGF0IHN1cHBvcnRzIHlvdXIgY2FzZS5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgKX1cbiAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgIHZhbHVlPXtkaXNwbGF5VGV4dH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRWRpdENoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcm93cz17MTR9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e1xuICAgICAgICAgICAgaGFzVGVtcGxhdGVcbiAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgOiAnRGVzY3JpYmUgd2hhdCBoYXBwZW5lZCwgd2h5IHRoaXMgY2hhcmdlIHdhcyBsZWdpdGltYXRlLCBhbmQgYW55IHN1cHBvcnRpbmcgZGV0YWlscy4uLidcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIEFjdGlvbiBidXR0b25zICovfVxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17b25Db250aW51ZX0+XG4gICAgICAgICAgQ29udGludWUgd2l0aCBNYW51YWwgTmFycmF0aXZlXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICB7IWlzR2VuZXJhdGlvbkxpbWl0ICYmIChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzZWNvbmRhcnlcIiBvblByZXNzPXtvblJldHJ5fT5cbiAgICAgICAgICAgIFRyeSBBZ2FpblxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXJyYXRpdmVFcnJvcjtcbiIsICJpbXBvcnQgeyBEaXNwdXRlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFRFTVBMQVRFX0ZJRUxEX01BUDogUmVjb3JkPHN0cmluZywgKGQ6IERpc3B1dGUpID0+IHN0cmluZyB8IHVuZGVmaW5lZD4gPSB7XG4gIGF2c19hZGRyZXNzX2NoZWNrOiAoZCkgPT4gZC5hdnNfYWRkcmVzc19jaGVjayxcbiAgYXZzX3ppcF9jaGVjazogKGQpID0+IGQuYXZzX3ppcF9jaGVjayxcbiAgY3ZjX2NoZWNrOiAoZCkgPT4gZC5jdmNfY2hlY2ssXG4gIHRocmVlX2Rfc2VjdXJlX3Jlc3VsdDogKGQpID0+IGQudGhyZWVfZF9zZWN1cmVfcmVzdWx0LFxuICB0aHJlZV9kX3NlY3VyZV92ZXJzaW9uOiAoZCkgPT4gZC50aHJlZV9kX3NlY3VyZV92ZXJzaW9uLFxuICBhdXRob3JpemF0aW9uX2NvZGU6IChkKSA9PiBkLmF1dGhvcml6YXRpb25fY29kZSxcbiAgbmV0d29ya19zdGF0dXM6IChkKSA9PiBkLm5ldHdvcmtfc3RhdHVzLFxuICBjdXN0b21lcl9lbWFpbDogKGQpID0+IGQuY3VzdG9tZXJfZW1haWwsXG4gIGN1c3RvbWVyX25hbWU6IChkKSA9PiBkLmN1c3RvbWVyX25hbWUsXG4gIGJpbGxpbmdfYWRkcmVzczogKGQpID0+IGQuYmlsbGluZ19hZGRyZXNzLFxuICBjaGFyZ2VfZGVzY3JpcHRpb246IChkKSA9PiBkLmNoYXJnZV9kZXNjcmlwdGlvbixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIGRpc3B1dGU6IERpc3B1dGUpOiBzdHJpbmcge1xuICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFx7XFx7KFxcdyspXFx9XFx9L2csIChfbWF0Y2gsIGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBhY2Nlc3NvciA9IFRFTVBMQVRFX0ZJRUxEX01BUFtmaWVsZF07XG4gICAgaWYgKCFhY2Nlc3NvcikgcmV0dXJuICdOL0EnO1xuICAgIGNvbnN0IHZhbHVlID0gYWNjZXNzb3IoZGlzcHV0ZSk7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnID8gdmFsdWUgOiAnTi9BJztcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBCYW5uZXIsXG4gIENoZWNrYm94LFxuICBJbmxpbmUsXG4gIFNwaW5uZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHtcbiAgRGlzcHV0ZSxcbiAgRXZpZGVuY2VGaWxlLFxuICBQbGF5Ym9va0RhdGEsXG4gIFN1Ym1pc3Npb25SZXNwb25zZSxcbiAgU3VibWlzc2lvbldhcm5pbmcsXG59IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbmZpcm1hdGlvbiBmcm9tICcuL1N1Ym1pc3Npb25Db25maXJtYXRpb24nO1xuXG5pbnRlcmZhY2UgU3VibWl0Vmlld1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YTtcbiAgZXZpZGVuY2VGaWxlczogRXZpZGVuY2VGaWxlW107XG4gIG5hcnJhdGl2ZVRleHQ6IHN0cmluZztcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBvblN1Ym1pdHRlZDogKHJlc3BvbnNlOiBTdWJtaXNzaW9uUmVzcG9uc2UpID0+IHZvaWQ7XG59XG5cbnR5cGUgU3RhdGUgPVxuICB8IHsga2luZDogJ2lkbGUnIH1cbiAgfCB7IGtpbmQ6ICdzdWJtaXR0aW5nJyB9XG4gIHwgeyBraW5kOiAnc3VjY2Vzcyc7IHJlc3BvbnNlOiBTdWJtaXNzaW9uUmVzcG9uc2UgfVxuICB8IHtcbiAgICAgIGtpbmQ6ICdlcnJvcic7XG4gICAgICBjb2RlOiBzdHJpbmc7XG4gICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICB0ZXJtaW5hbDogYm9vbGVhbjtcbiAgICAgIHdhcm5pbmdzOiBTdWJtaXNzaW9uV2FybmluZ1tdO1xuICAgIH07XG5cbmNvbnN0IFRFUk1JTkFMX0NPREVTID0gbmV3IFNldChbXG4gICdkaXNwdXRlX25vdF9zdWJtaXR0YWJsZScsXG4gICd2YWxpZGF0aW9uX2ZhaWxlZCcsXG5dKTtcblxuZnVuY3Rpb24gY291bnRNYW5kYXRvcnlBdHRhY2hlZChcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSxcbiAgZXZpZGVuY2VGaWxlczogRXZpZGVuY2VGaWxlW10sXG4pOiB7IGF0dGFjaGVkOiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSB7XG4gIC8vIENvdW50ZXIgbWlycm9ycyB3aGF0IGFjdHVhbGx5IGdldHMgc3VibWl0dGVkLiBBIG1hbmRhdG9yeSBpdGVtIGNvdW50cyBhc1xuICAvLyBhdHRhY2hlZCBpZiBhbnkgb2YgdGhlIHRocmVlIHN1Ym1pc3Npb24gcGF0aHMgaXMgY292ZXJlZDogYXV0b2ZpbGxlZCBmcm9tXG4gIC8vIFN0cmlwZSAoc3RyaXBlX2ZpZWxkKSwgY292ZXJlZCBieSB0aGUgbmFycmF0aXZlIChuYXJyYXRpdmVfb25seSksIG9yIGhhc1xuICAvLyBhIHJlYWwgdXBsb2FkZWQgZmlsZS5cbiAgY29uc3QgbWFuZGF0b3J5ID0gcGxheWJvb2suZXZpZGVuY2VfY2hlY2tsaXN0LmZpbHRlcihcbiAgICAoaSkgPT4gaS5jYXRlZ29yeSA9PT0gJ21hbmRhdG9yeScsXG4gICk7XG4gIGNvbnN0IGZpbGVkID0gbmV3IFNldChldmlkZW5jZUZpbGVzLm1hcCgoZikgPT4gZi5jaGVja2xpc3RfaXRlbV9rZXkpKTtcbiAgY29uc3QgYXR0YWNoZWQgPSBtYW5kYXRvcnkuZmlsdGVyKFxuICAgIChpKSA9PiBpLnN0cmlwZV9maWVsZCB8fCBpLm5hcnJhdGl2ZV9vbmx5IHx8IGZpbGVkLmhhcyhpLmtleSksXG4gICkubGVuZ3RoO1xuICByZXR1cm4geyBhdHRhY2hlZCwgdG90YWw6IG1hbmRhdG9yeS5sZW5ndGggfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3VibWl0Vmlldyh7XG4gIGRpc3B1dGUsXG4gIHBsYXlib29rLFxuICBldmlkZW5jZUZpbGVzLFxuICBuYXJyYXRpdmVUZXh0LFxuICBjb250ZXh0LFxuICBvblN1Ym1pdHRlZCxcbn06IFN1Ym1pdFZpZXdQcm9wcykge1xuICBjb25zdCBbYWNrbm93bGVkZ2VkLCBzZXRBY2tub3dsZWRnZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPFN0YXRlPih7IGtpbmQ6ICdpZGxlJyB9KTtcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCB7IGF0dGFjaGVkLCB0b3RhbCB9ID0gY291bnRNYW5kYXRvcnlBdHRhY2hlZChwbGF5Ym9vaywgZXZpZGVuY2VGaWxlcyk7XG4gIGNvbnN0IG5hcnJhdGl2ZVdvcmRzID0gbmFycmF0aXZlVGV4dC50cmltKCkuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbikubGVuZ3RoO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICBzZXRTdGF0ZSh7IGtpbmQ6ICdzdWJtaXR0aW5nJyB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBTdWJtaXNzaW9uUmVzcG9uc2UgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH0vc3VibWl0YCxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgKTtcbiAgICAgIHNldFN0YXRlKHsga2luZDogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UuZGF0YSB9KTtcbiAgICAgIG9uU3VibWl0dGVkKHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBlcnIuY29kZSA/PyAnaW50ZXJuYWxfZXJyb3InO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAga2luZDogJ2Vycm9yJyxcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgIHRlcm1pbmFsOiBURVJNSU5BTF9DT0RFUy5oYXMoY29kZSksXG4gICAgICAgICAgLy8gQXBpRXJyb3IgZG9lcyBub3QgZXhwb3NlIHRoZSByZXNwb25zZSBib2R5LCBzbyB3YXJuaW5ncyBhcmVcbiAgICAgICAgICAvLyBub3QgYXZhaWxhYmxlIGZyb20gdGhlIGNhdGNoLiBTdXJmYWNlIHRoZW0gdmlhIHRoZSBtZXNzYWdlIG9ubHkuXG4gICAgICAgICAgd2FybmluZ3M6IFtdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBraW5kOiAnZXJyb3InLFxuICAgICAgICAgIGNvZGU6ICdpbnRlcm5hbF9lcnJvcicsXG4gICAgICAgICAgbWVzc2FnZTogJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBZb3VyIHN1Ym1pc3Npb24gd2FzIE5PVCBzZW50LicsXG4gICAgICAgICAgdGVybWluYWw6IGZhbHNlLFxuICAgICAgICAgIHdhcm5pbmdzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmtpbmQgPT09ICdzdWNjZXNzJykge1xuICAgIHJldHVybiA8U3VibWlzc2lvbkNvbmZpcm1hdGlvbiByZXNwb25zZT17c3RhdGUucmVzcG9uc2V9IC8+O1xuICB9XG5cbiAgY29uc3QgaXNTdWJtaXR0aW5nID0gc3RhdGUua2luZCA9PT0gJ3N1Ym1pdHRpbmcnO1xuICBjb25zdCBpc1Rlcm1pbmFsRXJyb3IgPSBzdGF0ZS5raW5kID09PSAnZXJyb3InICYmIHN0YXRlLnRlcm1pbmFsO1xuICBjb25zdCBzdWJtaXREaXNhYmxlZCA9ICFhY2tub3dsZWRnZWQgfHwgaXNTdWJtaXR0aW5nIHx8IGlzVGVybWluYWxFcnJvcjtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJywgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJyB9fT5TdWJtaXQgZXZpZGVuY2U8L0lubGluZT5cblxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJywgcGFkZGluZzogJ21lZGl1bScsIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIGJvcmRlclJhZGl1czogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkRpc3B1dGU8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e2Rpc3B1dGUuaWR9PC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5SZWFzb248L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e3BsYXlib29rLmRpc3BsYXlfbmFtZX08L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19Pk1hbmRhdG9yeSBldmlkZW5jZTwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57YXR0YWNoZWR9IG9mIHt0b3RhbH0gYXR0YWNoZWQ8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19Pk5hcnJhdGl2ZTwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57bmFycmF0aXZlV29yZHN9IHdvcmRzPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHtzdGF0ZS5raW5kID09PSAnZXJyb3InICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9e3N0YXRlLnRlcm1pbmFsID8gJ2NyaXRpY2FsJyA6ICdjYXV0aW9uJ31cbiAgICAgICAgICB0aXRsZT17c3RhdGUudGVybWluYWwgPyBcIkNhbid0IHN1Ym1pdFwiIDogJ1N1Ym1pc3Npb24gZmFpbGVkJ31cbiAgICAgICAgICBkZXNjcmlwdGlvbj17c3RhdGUubWVzc2FnZX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHthdHRhY2hlZCA8IHRvdGFsICYmICFpc1Rlcm1pbmFsRXJyb3IgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgIHRpdGxlPVwiTWlzc2luZyBtYW5kYXRvcnkgZXZpZGVuY2VcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtgJHt0b3RhbCAtIGF0dGFjaGVkfSBtYW5kYXRvcnkgaXRlbSR7dG90YWwgLSBhdHRhY2hlZCA9PT0gMSA/ICcnIDogJ3MnfSBub3QgYXR0YWNoZWQuIFlvdSBjYW4gc3RpbGwgc3VibWl0LCBidXQgeW91ciBjaGFuY2VzIGltcHJvdmUgd2l0aCBtb3JlIGV2aWRlbmNlLmB9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7IWlzVGVybWluYWxFcnJvciAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXNzaW9uIGlzIGZpbmFsXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk9uY2UgeW91IHN1Ym1pdCwgeW91ciBldmlkZW5jZSBpcyBmaW5hbCBhbmQgY2Fubm90IGJlIGNoYW5nZWQgb3IgcmVjYWxsZWQuIFN0cmlwZSB3aWxsIHNlbmQgaXQgZGlyZWN0bHkgdG8gdGhlIGNhcmQgaXNzdWVyLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8Q2hlY2tib3hcbiAgICAgICAgbGFiZWw9XCJJIHVuZGVyc3RhbmQgdGhpcyBzdWJtaXNzaW9uIGlzIGZpbmFsLlwiXG4gICAgICAgIGNoZWNrZWQ9e2Fja25vd2xlZGdlZH1cbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHNldEFja25vd2xlZGdlZCgocHJldikgPT4gIXByZXYpfVxuICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nIHx8IGlzVGVybWluYWxFcnJvcn1cbiAgICAgIC8+XG5cbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3N1Ym1pdERpc2FibGVkfVxuICAgICAgICAgIG9uUHJlc3M9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1N1Ym1pdHRpbmcgPyAoXG4gICAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgICAgIDxJbmxpbmU+U3VibWl0dGluZyBldmlkZW5jZS4uLjwvSW5saW5lPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICdTdWJtaXQgdG8gU3RyaXBlJ1xuICAgICAgICAgICl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgQm94LCBCYW5uZXIsIEJ1dHRvbiwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgU3VibWlzc2lvblJlc3BvbnNlLCBTdWJtaXNzaW9uV2FybmluZyB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBTdWJtaXNzaW9uQ29uZmlybWF0aW9uUHJvcHMge1xuICByZXNwb25zZTogU3VibWlzc2lvblJlc3BvbnNlO1xuICBvbkJhY2tUb0xpc3Q/OiAoKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVdhcm5pbmcodzogU3VibWlzc2lvbldhcm5pbmcpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHcuY29kZSkge1xuICAgIGNhc2UgJ2ZpZWxkX3RydW5jYXRlZCc6XG4gICAgICByZXR1cm4gYFlvdXIgbmFycmF0aXZlIHdhcyB0cnVuY2F0ZWQgZnJvbSAke3cub3JpZ2luYWxfbGVuZ3RofSB0byAke3cudHJ1bmNhdGVkX2xlbmd0aH0gY2hhcmFjdGVycyBiZWZvcmUgc3VibWlzc2lvbi5gO1xuICAgIGNhc2UgJ2ZpZWxkX2NvbGxpc2lvbic6XG4gICAgICByZXR1cm4gYFwiJHt3Lmxvc2luZ19pdGVtfVwiIGNvbGxpZGVkIHdpdGggXCIke3cud2lubmluZ19pdGVtfVwiIG9uICR7dy5maWVsZH07IHJlc29sdmVkIGJ5ICR7dy5yZXNvbHV0aW9uID09PSAndW5jYXRlZ29yaXplZF9maWxlJyA/ICdhdHRhY2hpbmcgYXMgdW5jYXRlZ29yaXplZCBmaWxlJyA6ICdkcm9wcGluZyB0aGUgbG9zaW5nIGl0ZW0nfS5gO1xuICAgIGNhc2UgJ21pc3NpbmdfbWFuZGF0b3J5X2l0ZW1zJzpcbiAgICAgIHJldHVybiBgTWFuZGF0b3J5IGl0ZW1zIHdlcmUgbm90IGF0dGFjaGVkOiAke3cuaXRlbXMuam9pbignLCAnKX0uIFN1Ym1pdHRlZCB3aXRob3V0IHRoZW0uYDtcbiAgICBjYXNlICdkZWFkbGluZV9wYXNzZWQnOlxuICAgICAgcmV0dXJuIGBUaGUgcmVzcG9uc2UgZGVhZGxpbmUgaGFzIHBhc3NlZC4gU3VibWl0dGVkIGxhdGUuYDtcbiAgICBjYXNlICdjb25jYXRfc2tpcHBlZCc6XG4gICAgICByZXR1cm4gYFwiJHt3LmZpbGVfbmFtZX1cIiBjb3VsZCBub3QgYmUgbWVyZ2VkIGludG8gJHt3LnNsb3R9OiAke3cucmVhc29ufS4gU3VibWl0dGVkIHdpdGhvdXQgaXQuYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdWJtaXNzaW9uQ29uZmlybWF0aW9uKHsgcmVzcG9uc2UsIG9uQmFja1RvTGlzdCB9OiBTdWJtaXNzaW9uQ29uZmlybWF0aW9uUHJvcHMpIHtcbiAgY29uc3Qgc3VibWl0dGVkQXQgPSBuZXcgRGF0ZShyZXNwb25zZS5zdWJtaXR0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIGNvbnN0IGhhc1dhcm5pbmdzID0gcmVzcG9uc2Uud2FybmluZ3MgJiYgcmVzcG9uc2Uud2FybmluZ3MubGVuZ3RoID4gMDtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJywgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIHtoYXNXYXJuaW5ncyAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXR0ZWQgd2l0aCB3YXJuaW5nc1wiXG4gICAgICAgICAgZGVzY3JpcHRpb249e1xuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgICAge3Jlc3BvbnNlLndhcm5pbmdzLm1hcCgodywgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxJbmxpbmUga2V5PXtpfSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgICAgICAgICAgXHUyMDIyIHtkZXNjcmliZVdhcm5pbmcodyl9XG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgIHRpdGxlPVwiRXZpZGVuY2Ugc3VibWl0dGVkXCJcbiAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIHJlYnV0dGFsIGlzIG9uIGl0cyB3YXkgdG8gdGhlIGNhcmQgaXNzdWVyLlwiXG4gICAgICAvPlxuXG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJyB9fT5XaGF0IGhhcHBlbnMgbmV4dDwvSW5saW5lPlxuICAgICAgICA8Qm94PlxuICAgICAgICAgIFRoZSBiYW5rIHR5cGljYWxseSB0YWtlcyA2MC03NSBkYXlzIHRvIGlzc3VlIGEgZGVjaXNpb24uIFlvdSB3aWxsIGJlXG4gICAgICAgICAgbm90aWZpZWQgaW4gU3RyaXBlIHdoZW4gdGhlIGRpc3B1dGUgaXMgcmVzb2x2ZWQuXG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5TdWJtaXR0ZWQgYXQ8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e3N1Ym1pdHRlZEF0fTwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7b25CYWNrVG9MaXN0ICYmIChcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgb25QcmVzcz17b25CYWNrVG9MaXN0fT5cbiAgICAgICAgICBCYWNrIHRvIGRpc3B1dGVzXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTZWxlY3QsXG4gIFNwaW5uZXIsXG4gIFRhYnMsXG4gIFRhYixcbiAgVGFiTGlzdCxcbiAgVGFiUGFuZWxzLFxuICBUYWJQYW5lbCxcbiAgQmFubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZUNhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9EaXNwdXRlQ2FyZCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCBFbXB0eURpc3B1dGVzU3RhdGUgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eURpc3B1dGVzU3RhdGUnO1xuaW1wb3J0IE9uYm9hcmRpbmdQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL09uYm9hcmRpbmdQYW5lbCc7XG5pbXBvcnQgRXJyb3JCYW5uZXIgZnJvbSAnLi4vY29tcG9uZW50cy9FcnJvckJhbm5lcic7XG5pbXBvcnQgVXBncmFkZVByb21wdEJhbm5lciBmcm9tICcuLi9jb21wb25lbnRzL1VwZ3JhZGVQcm9tcHRCYW5uZXInO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgaXNSZXNvbHZlZCwgaXNEaXNwdXRlRXhwaXJlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFZpZXdTdGF0ZSA9ICdsb2FkaW5nJyB8ICdlcnJvcicgfCAncmVhZHknO1xudHlwZSBTdGF0dXNGaWx0ZXIgPSAnYWxsJyB8ICduZWVkc19yZXNwb25zZScgfCAndW5kZXJfcmV2aWV3JyB8ICdyZXNvbHZlZCcgfCAnZXhwaXJlZCc7XG5cbmNvbnN0IEZJTFRFUl9PUFRJT05TOiB7IHZhbHVlOiBTdGF0dXNGaWx0ZXI7IGxhYmVsOiBzdHJpbmcgfVtdID0gW1xuICB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwgZGlzcHV0ZXMnIH0sXG4gIHsgdmFsdWU6ICduZWVkc19yZXNwb25zZScsIGxhYmVsOiAnTmVlZHMgcmVzcG9uc2UnIH0sXG4gIHsgdmFsdWU6ICd1bmRlcl9yZXZpZXcnLCBsYWJlbDogJ1VuZGVyIHJldmlldycgfSxcbiAgeyB2YWx1ZTogJ3Jlc29sdmVkJywgbGFiZWw6ICdSZXNvbHZlZCcgfSxcbiAgeyB2YWx1ZTogJ2V4cGlyZWQnLCBsYWJlbDogJ0V4cGlyZWQnIH0sXG5dO1xuXG5mdW5jdGlvbiBtYXRjaGVzRmlsdGVyKGRpc3B1dGU6IERpc3B1dGUsIGZpbHRlcjogU3RhdHVzRmlsdGVyKTogYm9vbGVhbiB7XG4gIGNvbnN0IGV4cGlyZWQgPSBpc0Rpc3B1dGVFeHBpcmVkKGRpc3B1dGUuZHVlX2J5LCBkaXNwdXRlLnN0YXR1cyk7XG4gIHN3aXRjaCAoZmlsdGVyKSB7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIC8vIEV4Y2x1ZGUgZXhwaXJlZCBkaXNwdXRlcyAtLSB0aGV5IGFyZSBub3QgYWN0aW9uYWJsZSBldmVuIHRob3VnaFxuICAgICAgLy8gU3RyaXBlIHN0aWxsIHJlcG9ydHMgc3RhdHVzPW5lZWRzX3Jlc3BvbnNlIChXSU4tNDgpLlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZScpICYmXG4gICAgICAgICFleHBpcmVkXG4gICAgICApO1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgICByZXR1cm4gZGlzcHV0ZS5zdGF0dXMgPT09ICd1bmRlcl9yZXZpZXcnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ191bmRlcl9yZXZpZXcnO1xuICAgIGNhc2UgJ3Jlc29sdmVkJzpcbiAgICAgIHJldHVybiBpc1Jlc29sdmVkKGRpc3B1dGUuc3RhdHVzKTtcbiAgICBjYXNlICdleHBpcmVkJzpcbiAgICAgIHJldHVybiBleHBpcmVkO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb3VudFRleHQoY291bnQ6IG51bWJlciwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBzdHJpbmcge1xuICBjb25zdCBub3VuID0gY291bnQgPT09IDEgPyAnZGlzcHV0ZScgOiAnZGlzcHV0ZXMnO1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gbmVlZGluZyByZXNwb25zZWA7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gdW5kZXIgcmV2aWV3YDtcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHJlc29sdmVkYDtcbiAgICBjYXNlICdleHBpcmVkJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gZXhwaXJlZGA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gJHtub3VufWA7XG4gIH1cbn1cblxuY29uc3QgRGlzcHV0ZUxpc3RWaWV3ID0gKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCB7IGVudmlyb25tZW50LCB1c2VyQ29udGV4dCB9ID0gY29udGV4dDtcbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2Rpc3B1dGVzLCBzZXREaXNwdXRlc10gPSB1c2VTdGF0ZTxEaXNwdXRlW10+KFtdKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlciwgc2V0U3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlPFN0YXR1c0ZpbHRlcj4oJ25lZWRzX3Jlc3BvbnNlJyk7XG4gIGNvbnN0IFtvbmJvYXJkaW5nQ29tcGxldGVkLCBzZXRPbmJvYXJkaW5nQ29tcGxldGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuXG4gIGNvbnN0IFtzZWxlY3RlZERpc3B1dGUsIHNldFNlbGVjdGVkRGlzcHV0ZV0gPSB1c2VTdGF0ZTxEaXNwdXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93V29ya2Zsb3csIHNldFNob3dXb3JrZmxvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgY29uc3QgbG9hZERpc3B1dGVzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldFZpZXdTdGF0ZSgnbG9hZGluZycpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbZGlzcHV0ZXNSZXN1bHQsIG9uYm9hcmRpbmdSZXN1bHRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlW10gfT4oJy9hcGkvZGlzcHV0ZXMnLCBjb250ZXh0UmVmLmN1cnJlbnQpLFxuICAgICAgICBmZXRjaEJhY2tlbmQ8eyBjb21wbGV0ZWQ6IGJvb2xlYW47IGNvbXBsZXRlZF9hdDogc3RyaW5nIHwgbnVsbCB9PihcbiAgICAgICAgICAnL2FwaS9tZXJjaGFudC9vbmJvYXJkaW5nJyxcbiAgICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICAgICksXG4gICAgICBdKTtcbiAgICAgIHNldERpc3B1dGVzKGRpc3B1dGVzUmVzdWx0LmRhdGEpO1xuICAgICAgc2V0T25ib2FyZGluZ0NvbXBsZXRlZChvbmJvYXJkaW5nUmVzdWx0LmNvbXBsZXRlZCk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgQXBpRXJyb3JcbiAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZXMuIFBsZWFzZSB0cnkgYWdhaW4uJztcbiAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlcygpO1xuICB9LCBbbG9hZERpc3B1dGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0RGlzcHV0ZSA9IChkaXNwdXRlOiBEaXNwdXRlKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWREaXNwdXRlKGRpc3B1dGUpO1xuICAgIHNldFNob3dXb3JrZmxvdyh0cnVlKTtcbiAgICAvLyBXSU4tMjY6IG9wdGltaXN0aWNhbGx5IGNsZWFyIHRoZSBcIk5ld1wiIGJhZGdlLiBUaGUgYmFja2VuZCBtYXJrc1xuICAgIC8vIHZpZXdlZF9hdCBvbiB0aGUgbmV4dCBHRVQgL2FwaS9kaXNwdXRlcy9baWRdOyBpZiB0aGF0IGZhaWxzIHRoZSBuZXh0XG4gICAgLy8gZnVsbCBsaXN0IGZldGNoIHdpbGwgcmUtc3VyZmFjZSB0aGUgYmFkZ2UuXG4gICAgaWYgKGRpc3B1dGUuaXNfbmV3KSB7XG4gICAgICBzZXREaXNwdXRlcygocHJldikgPT5cbiAgICAgICAgcHJldi5tYXAoKGQpID0+IChkLmlkID09PSBkaXNwdXRlLmlkID8geyAuLi5kLCBpc19uZXc6IGZhbHNlIH0gOiBkKSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBuZXdEaXNwdXRlQ291bnQgPSBkaXNwdXRlcy5maWx0ZXIoKGQpID0+IGQuaXNfbmV3KS5sZW5ndGg7XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2VXb3JrZmxvdyA9IChzaG93bjogYm9vbGVhbikgPT4ge1xuICAgIHNldFNob3dXb3JrZmxvdyhzaG93bik7XG4gICAgaWYgKCFzaG93bikgc2V0U2VsZWN0ZWREaXNwdXRlKG51bGwpO1xuICB9O1xuXG4gIC8vIFNvcnQgYnkgZGVhZGxpbmUgKHNvb25lc3QgZmlyc3QpLCBidXQgcHVzaCBleHBpcmVkIGRpc3B1dGVzIHRvIHRoZVxuICAvLyBib3R0b20gcmVnYXJkbGVzcyBvZiBob3cgb3ZlcmR1ZSB0aGV5IGFyZSAtLSB0aGV5J3JlIG5vIGxvbmdlciBhY3Rpb25hYmxlXG4gIC8vIHNvIHRoZXkgc2hvdWxkbid0IGp1bXAgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdCBqdXN0IGJlY2F1c2UgdGhleSdyZSB0aGVcbiAgLy8gXCJtb3N0IG92ZXJkdWVcIiAoV0lOLTQ4KS5cbiAgY29uc3Qgc29ydGVkRGlzcHV0ZXMgPSBbLi4uZGlzcHV0ZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCBhRXhwaXJlZCA9IGlzRGlzcHV0ZUV4cGlyZWQoYS5kdWVfYnksIGEuc3RhdHVzKTtcbiAgICBjb25zdCBiRXhwaXJlZCA9IGlzRGlzcHV0ZUV4cGlyZWQoYi5kdWVfYnksIGIuc3RhdHVzKTtcbiAgICBpZiAoYUV4cGlyZWQgIT09IGJFeHBpcmVkKSByZXR1cm4gYUV4cGlyZWQgPyAxIDogLTE7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGEuZHVlX2J5KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZV9ieSkuZ2V0VGltZSgpO1xuICB9KTtcblxuICBjb25zdCBmaWx0ZXJlZERpc3B1dGVzID0gc29ydGVkRGlzcHV0ZXMuZmlsdGVyKChkKSA9PiBtYXRjaGVzRmlsdGVyKGQsIHN0YXR1c0ZpbHRlcikpO1xuXG4gIGNvbnN0IGhhbmRsZURpc21pc3NPbmJvYXJkaW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIE9wdGltaXN0aWM6IGhpZGUgdGhlIHBhbmVsIGltbWVkaWF0ZWx5LiBJZiB0aGUgYmFja2VuZCBjYWxsIGZhaWxzIHdlXG4gICAgLy8gd2lsbCByZWh5ZHJhdGUgb24gbmV4dCBtb3VudCwgd2hpY2ggaXMgZmluZTsgd29yc3QgY2FzZSB0aGUgbWVyY2hhbnRcbiAgICAvLyBzZWVzIGl0IG9uY2UgbW9yZS5cbiAgICBzZXRPbmJvYXJkaW5nQ29tcGxldGVkKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaEJhY2tlbmQoJy9hcGkvbWVyY2hhbnQvb25ib2FyZGluZy91cGRhdGUnLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgY29tcGxldGVkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBTd2FsbG93OiB0aGUgbmV4dCBsb2FkIHdpbGwgY29ycmVjdCBzdGF0ZS5cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2hvd0d1aWRlID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIE9wdGltaXN0aWM6IHNob3cgdGhlIHBhbmVsIGltbWVkaWF0ZWx5LCB0aGVuIHBlcnNpc3Qgc28gaXQgc3RheXNcbiAgICAvLyBvcGVuIGFjcm9zcyByZWxvYWRzIHVudGlsIHRoZSBtZXJjaGFudCBkaXNtaXNzZXMgYWdhaW4uXG4gICAgc2V0T25ib2FyZGluZ0NvbXBsZXRlZChmYWxzZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoQmFja2VuZCgnL2FwaS9tZXJjaGFudC9vbmJvYXJkaW5nL3VwZGF0ZScsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBTd2FsbG93OiB0aGUgbmV4dCBsb2FkIHdpbGwgY29ycmVjdCBzdGF0ZS5cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCIgZGVzY3JpcHRpb249XCJHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uXCI+XG4gICAgICB7dmlld1N0YXRlID09PSAnbG9hZGluZycgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTG9hZGluZyBkaXNwdXRlcy4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdlcnJvcicgJiYgKFxuICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JNZXNzYWdlfSAvPlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ3JlYWR5JyAmJiAoXG4gICAgICAgIDxUYWJzIGZpdHRlZCBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICA8VGFiIGlkPVwiZGlzcHV0ZXNcIj5cbiAgICAgICAgICAgICAge25ld0Rpc3B1dGVDb3VudCA+IDAgPyBgRGlzcHV0ZXMgKCR7bmV3RGlzcHV0ZUNvdW50fSBuZXcpYCA6ICdEaXNwdXRlcyd9XG4gICAgICAgICAgICA8L1RhYj5cbiAgICAgICAgICAgIDxUYWIgaWQ9XCJpbnNpZ2h0c1wiPkluc2lnaHRzPC9UYWI+XG4gICAgICAgICAgPC9UYWJMaXN0PlxuICAgICAgICAgIDxUYWJQYW5lbHM+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJkaXNwdXRlc1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnc21hbGwnLCBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICAgIDxVcGdyYWRlUHJvbXB0QmFubmVyIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH0gLz5cbiAgICAgICAgICAgICAgICB7IW9uYm9hcmRpbmdDb21wbGV0ZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgPE9uYm9hcmRpbmdQYW5lbCBvbkRpc21pc3M9e2hhbmRsZURpc21pc3NPbmJvYXJkaW5nfSAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2Rpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgIDxFbXB0eURpc3B1dGVzU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgb25ib2FyZGluZ0NvbXBsZXRlZD17b25ib2FyZGluZ0NvbXBsZXRlZH1cbiAgICAgICAgICAgICAgICAgICAgb25TaG93R3VpZGU9e2hhbmRsZVNob3dHdWlkZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgaGlkZGVuRWxlbWVudHM9e1snbGFiZWwnXX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlIGFzIFN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7RklMVEVSX09QVElPTlMubWFwKChvcHQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHQudmFsdWV9IHZhbHVlPXtvcHQudmFsdWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmdUb3A6ICdzbWFsbCcsIHBhZGRpbmdCb3R0b206ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0Q291bnRUZXh0KGZpbHRlcmVkRGlzcHV0ZXMubGVuZ3RoLCBzdGF0dXNGaWx0ZXIpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWREaXNwdXRlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm8ge0ZJTFRFUl9PUFRJT05TLmZpbmQoKG8pID0+IG8udmFsdWUgPT09IHN0YXR1c0ZpbHRlcik/LmxhYmVsLnRvTG93ZXJDYXNlKCl9IGRpc3B1dGVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWREaXNwdXRlcy5tYXAoKGRpc3B1dGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEaXNwdXRlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Rpc3B1dGUuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoKSA9PiBoYW5kbGVTZWxlY3REaXNwdXRlKGRpc3B1dGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiaW5zaWdodHNcIj5cbiAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJJbnNpZ2h0c1wiXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldpbiByYXRlIGFuYWx5dGljcyBhbmQgZGlzcHV0ZSBwYXR0ZXJucyB3aWxsIGFwcGVhciBoZXJlLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIENvbWluZyBpbiBXSU4tMjIgYW5kIFdJTi0yMy5cbiAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgIDwvVGFiUGFuZWxzPlxuICAgICAgICA8L1RhYnM+XG4gICAgICApfVxuXG4gICAgICB7c2VsZWN0ZWREaXNwdXRlICYmIChcbiAgICAgICAgPERpc3B1dGVXb3JrZmxvd1xuICAgICAgICAgIGRpc3B1dGU9e3NlbGVjdGVkRGlzcHV0ZX1cbiAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICAgIHNob3duPXtzaG93V29ya2Zsb3d9XG4gICAgICAgICAgc2V0U2hvd249e2hhbmRsZUNsb3NlV29ya2Zsb3d9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlTGlzdFZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgQnV0dG9uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7XG4gIGdldFN0YXR1c0JhZGdlLFxuICBnZXRVcmdlbmN5QmFkZ2UsXG4gIGdldFJlYXNvbkNvZGVMYWJlbCxcbiAgaXNEaXNwdXRlRXhwaXJlZCxcbn0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERpc3B1dGVDYXJkUHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBvblNlbGVjdDogKGRpc3B1dGVJZDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBbW91bnQoYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICBjdXJyZW5jeTogY3VycmVuY3kudG9VcHBlckNhc2UoKSxcbiAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG59XG5cbmNvbnN0IERpc3B1dGVDYXJkID0gKHsgZGlzcHV0ZSwgb25TZWxlY3QgfTogRGlzcHV0ZUNhcmRQcm9wcykgPT4ge1xuICBjb25zdCBleHBpcmVkID0gaXNEaXNwdXRlRXhwaXJlZChkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuICAvLyBIaWRlIHRoZSBcIk5lZWRzIFJlc3BvbnNlXCIgc3RhdHVzIGJhZGdlIGZvciBleHBpcmVkIGRpc3B1dGVzIC0tIHRoZVxuICAvLyByZWQgXCJFeHBpcmVkXCIgdXJnZW5jeSBiYWRnZSBhbHJlYWR5IHRlbGxzIHRoZSBtZXJjaGFudCB3aGF0IHN0YXRlXG4gIC8vIHRoZXkncmUgaW4sIGFuZCBzaG93aW5nIGJvdGggaXMgY29udHJhZGljdG9yeSAoV0lOLTQ4KS5cbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBleHBpcmVkID8gbnVsbCA6IGdldFN0YXR1c0JhZGdlKGRpc3B1dGUuc3RhdHVzKTtcbiAgY29uc3QgdXJnZW5jeUJhZGdlID0gZ2V0VXJnZW5jeUJhZGdlKGRpc3B1dGUuZHVlX2J5LCBkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHJlYXNvbkxhYmVsID0gZ2V0UmVhc29uQ29kZUxhYmVsKGRpc3B1dGUubmV0d29yaywgZGlzcHV0ZS5yZWFzb25fY29kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uXG4gICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgIGNzcz17eyB3aWR0aDogJ2ZpbGwnIH19XG4gICAgICBvblByZXNzPXsoKSA9PiBvblNlbGVjdChkaXNwdXRlLmlkKX1cbiAgICA+XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAneHNtYWxsJyxcbiAgICAgICAgICB3aWR0aDogJ2ZpbGwnLFxuICAgICAgICAgIHBhZGRpbmc6ICdzbWFsbCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtmb3JtYXRBbW91bnQoZGlzcHV0ZS5hbW91bnQsIGRpc3B1dGUuY3VycmVuY3kpfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5pc19uZXcgJiYgPEJhZGdlIHR5cGU9XCJpbmZvXCI+TmV3PC9CYWRnZT59XG4gICAgICAgICAgICB7c3RhdHVzQmFkZ2UgJiYgKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPXt1cmdlbmN5QmFkZ2UudHlwZX0+e3VyZ2VuY3lCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8ICdVbmtub3duIGN1c3RvbWVyJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIHtyZWFzb25MYWJlbCAmJiAoXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7cmVhc29uTGFiZWx9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICl9XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9IHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZUNhcmQ7XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9FbXB0eURpc3B1dGVzU3RhdGUudHN4XG4vL1xuLy8gV0lOLTI1OiBSZWFzc3VyYW5jZSBiYW5uZXIgc2hvd24gd2hlbiB0aGUgbWVyY2hhbnQgaGFzIHplcm8gYWN0aXZlIGRpc3B1dGVzLFxuLy8gcGx1cyBhIG9uZS1jbGljayB3YXkgdG8gcmVvcGVuIHRoZSBvbmJvYXJkaW5nIGd1aWRlIHdpdGhvdXQgbGVhdmluZyB0aGVcbi8vIGRpc3B1dGVzIHZpZXcuIFBpY3R1cmUgYSBtZXJjaGFudCB3aG8gaW5zdGFsbGVkIHRoZSBhcHAgYSBtb250aCBhZ28gYW5kXG4vLyBoYXNuJ3QgaGFkIGEgZGlzcHV0ZSBzaW5jZTogdGhleSBtYXkgd2FudCBhIHJlZnJlc2hlciBvbiB3aHkgdGhpcyBhcHAgaXNcbi8vIGV2ZW4gaGVyZSB3aXRob3V0IGRpZ2dpbmcgaW50byBTZXR0aW5ncy5cblxuaW1wb3J0IHsgQmFubmVyLCBCb3gsIEJ1dHRvbiwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIEVtcHR5RGlzcHV0ZXNTdGF0ZVByb3BzIHtcbiAgb25ib2FyZGluZ0NvbXBsZXRlZDogYm9vbGVhbjtcbiAgb25TaG93R3VpZGU6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVtcHR5RGlzcHV0ZXNTdGF0ZSA9ICh7IG9uYm9hcmRpbmdDb21wbGV0ZWQsIG9uU2hvd0d1aWRlIH06IEVtcHR5RGlzcHV0ZXNTdGF0ZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnLCBwYWRkaW5nOiAnc21hbGwnIH19PlxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgIHRpdGxlPVwiWW91J3JlIGFsbCBzZXRcIlxuICAgICAgICBkZXNjcmlwdGlvbj1cIldoZW4gYSBuZXcgZGlzcHV0ZSBhcnJpdmVzLCB5b3UnbGwgc2VlIGl0IGhlcmUgd2l0aCBhbiBhbGVydC4gTm8gc2V0dXAgbmVlZGVkLlwiXG4gICAgICAvPlxuICAgICAge29uYm9hcmRpbmdDb21wbGV0ZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicsIHBhZGRpbmdUb3A6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBOZWVkIGEgcmVmcmVzaGVyIG9uIGhvdyBXaW5CYWNrIHdvcmtzP1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInNlY29uZGFyeVwiIG9uUHJlc3M9e29uU2hvd0d1aWRlfT5cbiAgICAgICAgICAgIFNob3cgZ3VpZGVcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlEaXNwdXRlc1N0YXRlO1xuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvT25ib2FyZGluZ1BhbmVsLnRzeFxuLy9cbi8vIFdJTi0yNTogRmlyc3QtcnVuIG9uYm9hcmRpbmcgYmxvY2sgc2hvd24gYXQgdGhlIHRvcCBvZiB0aGUgZGlzcHV0ZXMgdGFiXG4vLyBmb3IgZXZlcnkgbmV3IG1lcmNoYW50LCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhleSBjdXJyZW50bHkgaGF2ZSBkaXNwdXRlcy5cbi8vIEVhY2ggc2VjdGlvbiByZW5kZXJzIGFzIGl0cyBvd24gdGlsZSBzbyB0aGUgZXllIGxhbmRzIG9uIG9uZSBpZGVhIGF0IGFcbi8vIHRpbWUgYXMgdGhlIG1lcmNoYW50IHNjYW5zIGRvd24gdGhlIHBhbmVsLlxuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgT25ib2FyZGluZ1BhbmVsUHJvcHMge1xuICBvbkRpc21pc3M6ICgpID0+IFByb21pc2U8dm9pZD47XG59XG5cbnR5cGUgSWNvbk5hbWUgPSAnbm90aWZpY2F0aW9ucycgfCAnY2xpcGJvYXJkQ2hlY2snIHwgJ3NwYXJrbGUnO1xuXG5jb25zdCBTVEVQUzogeyBpY29uOiBJY29uTmFtZTsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZyB9W10gPSBbXG4gIHtcbiAgICBpY29uOiAnbm90aWZpY2F0aW9ucycsXG4gICAgdGl0bGU6ICdBIG5ldyBkaXNwdXRlIGFycml2ZXMnLFxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSdsbCBzZWUgaXQgaGVyZSB0aGUgbW9tZW50IGl0IGxhbmRzLiBObyBzZXR1cCwgbm8gY29uZmlncy5cIixcbiAgfSxcbiAge1xuICAgIGljb246ICdjbGlwYm9hcmRDaGVjaycsXG4gICAgdGl0bGU6ICdXZSB3YWxrIHlvdSB0aHJvdWdoIHRoZSBldmlkZW5jZScsXG4gICAgZGVzY3JpcHRpb246ICdBIHJlYXNvbi1jb2RlLXNwZWNpZmljIGNoZWNrbGlzdCwgdGFpbG9yZWQgdG8gdGhhdCBkaXNwdXRlLiBObyBndWVzc2luZy4nLFxuICB9LFxuICB7XG4gICAgaWNvbjogJ3NwYXJrbGUnLFxuICAgIHRpdGxlOiAnQUkgZHJhZnRzIHlvdXIgcmVzcG9uc2UnLFxuICAgIGRlc2NyaXB0aW9uOiAnV2UgdGllIHlvdXIgZXZpZGVuY2UgaW50byBhIGNsZWFuIG5hcnJhdGl2ZS4gWW91IHJldmlldywgZWRpdCwgc3VibWl0LicsXG4gIH0sXG5dO1xuXG5jb25zdCB0aWxlQ3NzID0ge1xuICBwYWRkaW5nOiAnbGFyZ2UnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICBzdGFjazogJ3knLFxuICBnYXA6ICdzbWFsbCcsXG59IGFzIGNvbnN0O1xuXG5jb25zdCBPbmJvYXJkaW5nUGFuZWwgPSAoeyBvbkRpc21pc3MgfTogT25ib2FyZGluZ1BhbmVsUHJvcHMpID0+IHtcbiAgY29uc3QgW2Rpc21pc3NpbmcsIHNldERpc21pc3NpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZURpc21pc3MgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0RGlzbWlzc2luZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgb25EaXNtaXNzKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERpc21pc3NpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgIDxCb3ggY3NzPXt0aWxlQ3NzfT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIFdlbGNvbWUgdG8gV2luQmFja1xuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgV2UnbGwgaGFuZGxlIGRpc3B1dGVzIHdpdGggeW91LCBzdGVwIGJ5IHN0ZXAuIEhlcmUncyB3aGF0IHRvIGV4cGVjdC5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cblxuICAgICAge1NURVBTLm1hcCgoc3RlcCwgaWR4KSA9PiAoXG4gICAgICAgIDxCb3gga2V5PXtzdGVwLnRpdGxlfSBjc3M9e3RpbGVDc3N9PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ21lZGl1bScsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPXtzdGVwLmljb259IHNpemU9XCJzbWFsbFwiIGNzcz17eyBmaWxsOiAnYnJhbmQnIH19IC8+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgU3RlcCB7aWR4ICsgMX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtzdGVwLnRpdGxlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge3N0ZXAuZGVzY3JpcHRpb259XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSl9XG5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGFsaWduWDogJ2VuZCcsIHBhZGRpbmdUb3A6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtoYW5kbGVEaXNtaXNzfSBkaXNhYmxlZD17ZGlzbWlzc2luZ30+XG4gICAgICAgICAge2Rpc21pc3NpbmcgPyAnU2F2aW5nLi4uJyA6IFwiR290IGl0LCBsZXQncyBnb1wifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT25ib2FyZGluZ1BhbmVsO1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCYW5uZXIsXG4gIEJveCxcbiAgQnV0dG9uLFxuICBJbmxpbmUsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcblxudHlwZSBCaWxsaW5nU3RhdHVzID0ge1xuICB0aWVyOiAndXNhZ2UnIHwgJ3Bybyc7XG4gIHN1YnNjcmlwdGlvbl9zdGF0dXM6IHN0cmluZyB8IG51bGw7XG4gIHl0ZF9zdWNjZXNzX2ZlZXNfY2VudHM6IG51bWJlcjtcbn07XG5cbi8qKlxuICogV0lOLTI0OiBVcGdyYWRlIHByb21wdCBzaG93biBhdCB0aGUgdG9wIG9mIERpc3B1dGVMaXN0VmlldyBhZnRlciBhIG1lcmNoYW50XG4gKiBoYXMgd29uIGF0IGxlYXN0IG9uZSBkaXNwdXRlIG9uIHRoZSB1c2FnZSB0aWVyLiBEaXNhcHBlYXJzIG9uY2UgdGhleSB1cGdyYWRlLlxuICpcbiAqIFRoZSBcImZpcnN0IHdvblwiIHRyaWdnZXIgaXMgYXBwcm94aW1hdGVkIGJ5IFwiWVREIHN1Y2Nlc3MgZmVlcyA+IDBcIiBcdTIwMTQgZ29vZFxuICogZW5vdWdoIGZvciBub3c7IGEgbW9yZSBwcmVjaXNlIHRyaWdnZXIgKGRpc21pc3NlZC1vbmNlLCBzdGlja3kgc3RhdGUpIGNhblxuICogY29tZSBsYXRlci5cbiAqL1xudHlwZSBQcm9wcyA9IHtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xufTtcblxuY29uc3QgVXBncmFkZVByb21wdEJhbm5lciA9ICh7IGNvbnRleHQgfTogUHJvcHMpID0+IHtcbiAgY29uc3QgW2JpbGxpbmcsIHNldEJpbGxpbmddID0gdXNlU3RhdGU8QmlsbGluZ1N0YXR1cyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZGlzbWlzc2VkLCBzZXREaXNtaXNzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBncmFkaW5nLCBzZXRVcGdyYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8QmlsbGluZ1N0YXR1cz4oXG4gICAgICAgICAgJy9hcGkvYmlsbGluZy9zdGF0dXMnLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICk7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSBzZXRCaWxsaW5nKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gU2lsZW50IGZhaWx1cmUgXHUyMDE0IHRoZSBiYW5uZXIgaXMgbm9uLWNyaXRpY2FsIFVJLlxuICAgICAgfVxuICAgIH07XG4gICAgbG9hZCgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgIH07XG4gIH0sIFtjb250ZXh0XSk7XG5cbiAgaWYgKFxuICAgICFiaWxsaW5nIHx8XG4gICAgYmlsbGluZy50aWVyICE9PSAndXNhZ2UnIHx8XG4gICAgYmlsbGluZy55dGRfc3VjY2Vzc19mZWVzX2NlbnRzIDw9IDAgfHxcbiAgICBkaXNtaXNzZWRcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBoYW5kbGVVcGdyYWRlID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldFVwZ3JhZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0dXJuVXJsID0gJ2h0dHBzOi8vZGFzaGJvYXJkLnN0cmlwZS5jb20vc2V0dGluZ3MvYXBwcyc7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyB1cmw6IHN0cmluZyB9PihcbiAgICAgICAgJy9hcGkvYmlsbGluZy9jaGVja291dCcsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHsgc3VjY2Vzc191cmw6IHJldHVyblVybCwgY2FuY2VsX3VybDogcmV0dXJuVXJsIH0sXG4gICAgICApO1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKHJlc3VsdC51cmwsICdfYmxhbmsnLCAnbm9vcGVuZXInKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEVycm9ycyBzdXJmYWNlIG9uIHRoZSBTZXR0aW5ncyB2aWV3J3MgdXBncmFkZSBmbG93OyBrZWVwIHRoZSBiYW5uZXJcbiAgICAgIC8vIHF1aWV0IGhlcmUgdG8gYXZvaWQgbm9pc2Ugb24gdGhlIGxpc3QuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFVwZ3JhZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNhdmVkID0gYCQkeyhiaWxsaW5nLnl0ZF9zdWNjZXNzX2ZlZXNfY2VudHMgLyAxMDApLnRvRml4ZWQoMil9YDtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgdGl0bGU9XCJLZWVwIDEwMCUgb2YgeW91ciBuZXh0IHdpblwiXG4gICAgICAgIGRlc2NyaXB0aW9uPXtgWW91J3ZlIHBhaWQgJHtzYXZlZH0gaW4gc3VjY2VzcyBmZWVzIHRoaXMgeWVhci4gQXQgJDc5L21vbnRoIG9uIFBybywgeW91J2Qga2VlcCBhbGwgb2YgaXQuYH1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZVVwZ3JhZGV9IGRpc2FibGVkPXt1cGdyYWRpbmd9PlxuICAgICAgICAgICAgICB7dXBncmFkaW5nID8gJ09wZW5pbmdcdTIwMjYnIDogJ1VwZ3JhZGUgdG8gUHJvJ31cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0RGlzbWlzc2VkKHRydWUpfT5cbiAgICAgICAgICAgICAgTm90IG5vd1xuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVcGdyYWRlUHJvbXB0QmFubmVyO1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQmFkZ2UsXG4gIEJhbm5lcixcbiAgQnV0dG9uLFxuICBEaXZpZGVyLFxuICBJbmxpbmUsXG4gIExpbmssXG4gIFNldHRpbmdzVmlldyxcbiAgU3Bpbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuXG50eXBlIEJpbGxpbmdTdGF0dXMgPSB7XG4gIHRpZXI6ICd1c2FnZScgfCAncHJvJztcbiAgc3Vic2NyaXB0aW9uX3N0YXR1czogc3RyaW5nIHwgbnVsbDtcbiAgcHJvX3NpbmNlX2F0OiBzdHJpbmcgfCBudWxsO1xuICB1cGdyYWRlX3Byb21wdGVkX2F0OiBzdHJpbmcgfCBudWxsO1xuICBuZXh0X2JpbGxpbmdfYXQ6IHN0cmluZyB8IG51bGw7XG4gIHl0ZF9zdWNjZXNzX2ZlZXNfY2VudHM6IG51bWJlcjtcbn07XG5cbnR5cGUgVmlld1N0YXRlID0gJ2xvYWRpbmcnIHwgJ3JlYWR5JyB8ICdlcnJvcic7XG5cbmZ1bmN0aW9uIGZvcm1hdENlbnRzKGNlbnRzOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYCQkeyhjZW50cyAvIDEwMCkudG9GaXhlZCgyKX1gO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGlzbzogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB7XG4gIGlmICghaXNvKSByZXR1cm4gJ1x1MjAxNCc7XG4gIHJldHVybiBuZXcgRGF0ZShpc28pLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICB9KTtcbn1cblxuY29uc3QgQXBwU2V0dGluZ3MgPSAoY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtiaWxsaW5nLCBzZXRCaWxsaW5nXSA9IHVzZVN0YXRlPEJpbGxpbmdTdGF0dXMgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbdXBncmFkaW5nLCBzZXRVcGdyYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBncmFkZUVycm9yLCBzZXRVcGdyYWRlRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgW3Jlb3BlbmluZywgc2V0UmVvcGVuaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Jlb3BlbkRvbmUsIHNldFJlb3BlbkRvbmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVvcGVuRXJyb3IsIHNldFJlb3BlbkVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgY29uc3QgaGFuZGxlUmVvcGVuT25ib2FyZGluZyA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRSZW9wZW5pbmcodHJ1ZSk7XG4gICAgc2V0UmVvcGVuRXJyb3IobnVsbCk7XG4gICAgc2V0UmVvcGVuRG9uZShmYWxzZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoQmFja2VuZCgnL2FwaS9tZXJjaGFudC9vbmJvYXJkaW5nL3VwZGF0ZScsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBzZXRSZW9wZW5Eb25lKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gcmVvcGVuIGd1aWRlJztcbiAgICAgIHNldFJlb3BlbkVycm9yKG1zZyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJlb3BlbmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZEJpbGxpbmcgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8QmlsbGluZ1N0YXR1cz4oXG4gICAgICAgICAgJy9hcGkvYmlsbGluZy9zdGF0dXMnLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcbiAgICAgICAgc2V0QmlsbGluZyhyZXN1bHQpO1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBiaWxsaW5nIHN0YXR1cyc7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtc2cpO1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsb2FkQmlsbGluZygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVXBncmFkZSA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRVcGdyYWRpbmcodHJ1ZSk7XG4gICAgc2V0VXBncmFkZUVycm9yKG51bGwpO1xuICAgIHRyeSB7XG4gICAgICAvLyBEYXNoYm9hcmQgaXMgdGhlIG5hdHVyYWwgXCJyZXR1cm4gaGVyZVwiIGRlc3RpbmF0aW9uIFx1MjAxNCB0aGUgaWZyYW1lIHdpbGxcbiAgICAgIC8vIHJlZnJlc2ggd2hlbiBTdHJpcGUgcmVkaXJlY3RzIGJhY2ssIGFuZCB0aGUgYmlsbGluZyB3ZWJob29rIHdpbGwgaGF2ZVxuICAgICAgLy8gZmxpcHBlZCB0aGUgdGllciBieSB0aGVuLlxuICAgICAgY29uc3QgcmV0dXJuVXJsID0gJ2h0dHBzOi8vZGFzaGJvYXJkLnN0cmlwZS5jb20vc2V0dGluZ3MvYXBwcyc7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyB1cmw6IHN0cmluZyB9PihcbiAgICAgICAgJy9hcGkvYmlsbGluZy9jaGVja291dCcsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgeyBzdWNjZXNzX3VybDogcmV0dXJuVXJsLCBjYW5jZWxfdXJsOiByZXR1cm5VcmwgfSxcbiAgICAgICk7XG4gICAgICAvLyBPcGVuIENoZWNrb3V0IGluIGEgbmV3IHRhYiBcdTIwMTQgdGhlIFN0cmlwZSBEYXNoYm9hcmQgaWZyYW1lIGJsb2Nrc1xuICAgICAgLy8gQ2hlY2tvdXQgZnJvbSByZW5kZXJpbmcgaW5zaWRlIGl0LlxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKHJlc3VsdC51cmwsICdfYmxhbmsnLCAnbm9vcGVuZXInKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEFwaUVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHN0YXJ0IHVwZ3JhZGUnO1xuICAgICAgc2V0VXBncmFkZUVycm9yKG1zZyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFVwZ3JhZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiAoXG4gICAgICA8U2V0dGluZ3NWaWV3PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWDogJ2NlbnRlcicsIHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgPElubGluZT5Mb2FkaW5nIGJpbGxpbmcgc3RhdHVzXHUyMDI2PC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9TZXR0aW5nc1ZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdlcnJvcicgfHwgIWJpbGxpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNldHRpbmdzVmlldz5cbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiQ291bGQgbm90IGxvYWQgYmlsbGluZyBzdGF0dXNcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249e2Vycm9yTWVzc2FnZSA/PyAnUGxlYXNlIHRyeSBhZ2Fpbi4nfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9TZXR0aW5nc1ZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGlzUGFzdER1ZSA9IGJpbGxpbmcuc3Vic2NyaXB0aW9uX3N0YXR1cyA9PT0gJ3Bhc3RfZHVlJztcbiAgY29uc3QgaXNQcm8gPSBiaWxsaW5nLnRpZXIgPT09ICdwcm8nO1xuXG4gIHJldHVybiAoXG4gICAgPFNldHRpbmdzVmlldz5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScsIHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICB7aXNQYXN0RHVlICYmIChcbiAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICB0aXRsZT1cIlBheW1lbnQgcGFzdCBkdWVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIFBybyBzdWJzY3JpcHRpb24gaGFzIGEgcGF5bWVudCBpc3N1ZS4gVXBkYXRlIHlvdXIgcGF5bWVudCBtZXRob2QgaW4gU3RyaXBlIHRvIGF2b2lkIGludGVycnVwdGlvbi4gWW91IGNhbiBzdGlsbCBmaWxlIGFuZCBzdWJtaXQgZGlzcHV0ZXMuXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBCaWxsaW5nXG4gICAgICAgICAgPC9JbmxpbmU+XG5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+UGxhbjo8L0lubGluZT5cbiAgICAgICAgICAgIHtpc1BybyA/IChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9XCJwb3NpdGl2ZVwiPlBybyBcdTAwQjcgJDc5L21vPC9CYWRnZT5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPlBheS1QZXItV2luIFx1MDBCNyAxNSUgb2YgcmVjb3ZlcmVkIGFtb3VudDwvQmFkZ2U+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge2lzUHJvID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgVW5saW1pdGVkIGRpc3B1dGVzLiBaZXJvIHN1Y2Nlc3MgZmVlLlxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgICAgICAgIFBybyBzaW5jZSB7Zm9ybWF0RGF0ZShiaWxsaW5nLnByb19zaW5jZV9hdCl9IFx1MDBCNyBOZXh0IGJpbGxpbmd7JyAnfVxuICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlKGJpbGxpbmcubmV4dF9iaWxsaW5nX2F0KX1cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgWW91IHBheSBub3RoaW5nIHVudGlsIHlvdSB3aW4uIFdlIGNoYXJnZSAxNSUgb2Ygd2hhdCB5b3UgcmVjb3Zlci5cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICAgICAgICBTdWNjZXNzIGZlZXMgdGhpcyB5ZWFyOiB7Zm9ybWF0Q2VudHMoYmlsbGluZy55dGRfc3VjY2Vzc19mZWVzX2NlbnRzKX1cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cblxuICAgICAgICB7IWlzUHJvICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICAgIFVwZ3JhZGUgdG8gUHJvXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+XG4gICAgICAgICAgICAgICAgJDc5L21vbnRoLCB1bmxpbWl0ZWQgZGlzcHV0ZXMsIG5vIHN1Y2Nlc3MgZmVlLiBCcmVhay1ldmVuIGFmdGVyXG4gICAgICAgICAgICAgICAgfjEgd2luL21vbnRoIGF0IGEgJDUwMCBhdmVyYWdlIGRpc3B1dGUuXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICB7dXBncmFkZUVycm9yICYmIChcbiAgICAgICAgICAgICAgICA8QmFubmVyIHR5cGU9XCJjcml0aWNhbFwiIHRpdGxlPVwiVXBncmFkZSBmYWlsZWRcIiBkZXNjcmlwdGlvbj17dXBncmFkZUVycm9yfSAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZVVwZ3JhZGV9IGRpc2FibGVkPXt1cGdyYWRpbmd9PlxuICAgICAgICAgICAgICAgICAge3VwZ3JhZGluZyA/ICdPcGVuaW5nIENoZWNrb3V0XHUyMDI2JyA6ICdVcGdyYWRlIHRvIFBybyd9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICBPcGVucyBTdHJpcGUgQ2hlY2tvdXQgaW4gYSBuZXcgdGFiXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2lzUHJvICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgICBNYW5hZ2Ugc3Vic2NyaXB0aW9uXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+XG4gICAgICAgICAgICAgICAgVXBkYXRlIHlvdXIgcGF5bWVudCBtZXRob2Qgb3IgY2FuY2VsIGZyb20gdGhleycgJ31cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly9kYXNoYm9hcmQuc3RyaXBlLmNvbS9zZXR0aW5ncy9iaWxsaW5nXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICBTdHJpcGUgYmlsbGluZyBwb3J0YWxcbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgLiBDYW5jZWxpbmcgcmV2ZXJ0cyB5b3UgdG8gUGF5LVBlci1XaW4gYXQgcGVyaW9kIGVuZC5cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgR2V0dGluZyBzdGFydGVkIGd1aWRlXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBTaG93IHRoZSBcIkhvdyBXaW5CYWNrIHdvcmtzXCIgZ3VpZGUgYWdhaW4gaW4gdGhlIERpc3B1dGVzIHRhYiBuZXh0IHRpbWUgeW91IGhhdmUgbm8gYWN0aXZlIGRpc3B1dGVzLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIHtyZW9wZW5FcnJvciAmJiAoXG4gICAgICAgICAgICA8QmFubmVyIHR5cGU9XCJjcml0aWNhbFwiIHRpdGxlPVwiQ291bGQgbm90IHJlb3BlbiBndWlkZVwiIGRlc2NyaXB0aW9uPXtyZW9wZW5FcnJvcn0gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtyZW9wZW5Eb25lICYmICFyZW9wZW5FcnJvciAmJiAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgRG9uZS4gVGhlIGd1aWRlIHdpbGwgYXBwZWFyIHRoZSBuZXh0IHRpbWUgeW91ciBkaXNwdXRlcyBsaXN0IGlzIGVtcHR5LlxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBhbGlnblg6ICdzdGFydCcgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzZWNvbmRhcnlcIiBvblByZXNzPXtoYW5kbGVSZW9wZW5PbmJvYXJkaW5nfSBkaXNhYmxlZD17cmVvcGVuaW5nfT5cbiAgICAgICAgICAgICAge3Jlb3BlbmluZyA/ICdSZW9wZW5pbmdcXHUyMDI2JyA6ICdTaG93IGdldHRpbmcgc3RhcnRlZCBndWlkZSd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEFib3V0IFdpbkJhY2tcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+VmVyc2lvbiAwLjAuMTwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgR3VpZGVkIGRpc3B1dGUgcmVzb2x1dGlvbiBmb3IgU3RyaXBlIG1lcmNoYW50cy4gQnVpbHQgYnkgSktCIFRlY2guXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9TZXR0aW5nc1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBTZXR0aW5ncztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGNBQWM7QUFDdEIsY0FBUSxjQUFjO0FBQUE7QUFBQTs7O0FDSHRCO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtB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QUNkLDJCQUEyQjtBQUFBLFFBQ3pCLGVBQWU7QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLEVBQ2I7IiwKICAibmFtZXMiOiBbImZldGNoIiwgImZldGNoU3RyaXBlU2lnbmF0dXJlIiwgInJlcXVpcmVfc2lnbmF0dXJlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJmb3JtYXREYXRlIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIl9hIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJfYSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImZvcm1hdEFtb3VudCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJmb3JtYXREYXRlIl0KfQo=
