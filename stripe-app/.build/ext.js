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
  var USE_LOCAL_BACKEND = true;
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
      title: `Dispute ${initialDispute.id.slice(0, 12)}...`,
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
    };
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
                  children: "Disputes"
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
  var BUILD_TIME = "2026-04-18 21:03:07.112397 -0700 PDT m=+0.015122793";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EZWFkbGluZVRpbWVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0LnRzeCIsICIuLi9zcmMvbGliL3N0cmlwZS1maWVsZC1zdGF0dXMudHMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0UHJvZ3Jlc3MudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0NoZWNrbGlzdEl0ZW0udHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0ZpbGVVcGxvYWRTZWN0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlUGFuZWwudHN4IiwgIi4uL3NyYy9saWIvbmFycmF0aXZlLXR5cGVzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hcnJhdGl2ZS9OYXJyYXRpdmVQcmVHZW5lcmF0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlR2VuZXJhdGluZy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZVJldmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZUVycm9yLnRzeCIsICIuLi9zcmMvbGliL25hcnJhdGl2ZS11dGlscy50cyIsICIuLi9zcmMvY29tcG9uZW50cy9zdWJtaXQvU3VibWl0Vmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvc3VibWl0L1N1Ym1pc3Npb25Db25maXJtYXRpb24udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eURpc3B1dGVzU3RhdGUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL09uYm9hcmRpbmdQYW5lbC50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvVXBncmFkZVByb21wdEJhbm5lci50c3giLCAiLi4vc3JjL3ZpZXdzL0FwcFNldHRpbmdzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNES19WRVJTSU9OID0gdm9pZCAwO1xuZXhwb3J0cy5TREtfVkVSU0lPTiA9ICc5LjEuMCc7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGV4cG9ydHMuVGFibGVIZWFkID0gZXhwb3J0cy5UYWJsZUZvb3RlciA9IGV4cG9ydHMuVGFibGVDZWxsID0gZXhwb3J0cy5UYWJsZUJvZHkgPSBleHBvcnRzLlRhYiA9IGV4cG9ydHMuVGFiUGFuZWxzID0gZXhwb3J0cy5UYWJQYW5lbCA9IGV4cG9ydHMuVGFiTGlzdCA9IGV4cG9ydHMuU3dpdGNoID0gZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBleHBvcnRzLlNwaW5uZXIgPSBleHBvcnRzLlNwYXJrbGluZSA9IGV4cG9ydHMuU2lnbkluVmlldyA9IGV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZXhwb3J0cy5TZWxlY3QgPSBleHBvcnRzLlJhZGlvID0gZXhwb3J0cy5Qcm9wZXJ0eUxpc3QgPSBleHBvcnRzLlByb3BlcnR5TGlzdEl0ZW0gPSBleHBvcnRzLlBsYXRmb3JtQ29uZmlndXJhdGlvblZpZXcgPSBleHBvcnRzLk9uYm9hcmRpbmdWaWV3ID0gZXhwb3J0cy5NZW51ID0gZXhwb3J0cy5NZW51SXRlbSA9IGV4cG9ydHMuTWVudUdyb3VwID0gZXhwb3J0cy5MaXN0ID0gZXhwb3J0cy5MaXN0SXRlbSA9IGV4cG9ydHMuTGluayA9IGV4cG9ydHMuTGluZUNoYXJ0ID0gZXhwb3J0cy5JbmxpbmUgPSBleHBvcnRzLkltZyA9IGV4cG9ydHMuSWNvbiA9IGV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBleHBvcnRzLkZvY3VzVmlldyA9IGV4cG9ydHMuRGl2aWRlciA9IGV4cG9ydHMuRGV0YWlsUGFnZVRhYmxlID0gZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZXhwb3J0cy5EYXRlRmllbGQgPSBleHBvcnRzLkNvbnRleHRWaWV3ID0gZXhwb3J0cy5DaGlwID0gZXhwb3J0cy5DaGlwTGlzdCA9IGV4cG9ydHMuQ2hlY2tib3ggPSBleHBvcnRzLkJ1dHRvbiA9IGV4cG9ydHMuQnV0dG9uR3JvdXAgPSBleHBvcnRzLkJveCA9IGV4cG9ydHMuQmFyQ2hhcnQgPSBleHBvcnRzLkJhbm5lciA9IGV4cG9ydHMuQmFkZ2UgPSBleHBvcnRzLkFjY29yZGlvbiA9IGV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IHZvaWQgMDtcbmV4cG9ydHMuVG9vbHRpcCA9IGV4cG9ydHMuVGV4dEZpZWxkID0gZXhwb3J0cy5UZXh0QXJlYSA9IGV4cG9ydHMuVGFza0xpc3QgPSBleHBvcnRzLlRhc2tMaXN0SXRlbSA9IGV4cG9ydHMuVGFicyA9IGV4cG9ydHMuVGFibGVSb3cgPSBleHBvcnRzLlRhYmxlID0gdm9pZCAwO1xuY29uc3QganN4X3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtcnVudGltZVwiKTtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwiQHJlbW90ZS11aS9yZWFjdFwiKTtcbmNvbnN0IHZlcnNpb25fMSA9IHJlcXVpcmUoXCIuLi92ZXJzaW9uXCIpO1xuY29uc3Qgd2l0aFNka1Byb3BzID0gKENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHdyYXBwZWRDb21wb25lbnROYW1lID0gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC50b1N0cmluZygpO1xuICAgIGNvbnN0IFdpdGhTZGtQcm9wcyA9IChwcm9wcykgPT4gKCgwLCBqc3hfcnVudGltZV8xLmpzeCkoQ29tcG9uZW50LCB7IC4uLnByb3BzLCB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsIHNka1ZlcnNpb246IHZlcnNpb25fMS5TREtfVkVSU0lPTiwgc2NoZW1hVmVyc2lvbjogXCJ2OVwiIH0pKTtcbiAgICBXaXRoU2RrUHJvcHMud3JhcHBlZENvbXBvbmVudE5hbWUgPSB3cmFwcGVkQ29tcG9uZW50TmFtZTtcbiAgICByZXR1cm4gV2l0aFNka1Byb3BzO1xufTtcbmNvbnN0IGRlZmluZUNvbXBvbmVudCA9IChuYW1lLCBmcmFnbWVudFByb3BzLCB3cmFwV2l0aFNka1Byb3BzKSA9PiB7XG4gICAgY29uc3QgcmVtb3RlQ29tcG9uZW50ID0gKDAsIHJlYWN0XzEuY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQpKG5hbWUsIHtcbiAgICAgICAgZnJhZ21lbnRQcm9wcyxcbiAgICB9KTtcbiAgICBpZiAoIXdyYXBXaXRoU2RrUHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHJlbW90ZUNvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhTZGtQcm9wcyhyZW1vdGVDb21wb25lbnQpO1xufTtcbmV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IGRlZmluZUNvbXBvbmVudCgnQWNjb3JkaW9uSXRlbScsIFsndGl0bGUnLCAnYWN0aW9ucycsICdtZWRpYScsICdzdWJ0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQWNjb3JkaW9uID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJhZGdlID0gZGVmaW5lQ29tcG9uZW50KCdCYWRnZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFubmVyID0gZGVmaW5lQ29tcG9uZW50KCdCYW5uZXInLCBbJ2FjdGlvbnMnLCAnZGVzY3JpcHRpb24nLCAndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLkJhckNoYXJ0ID0gZGVmaW5lQ29tcG9uZW50KCdCYXJDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQm94ID0gZGVmaW5lQ29tcG9uZW50KCdCb3gnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbkdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b25Hcm91cCcsIFsnbWVudVRyaWdnZXInXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbiA9IGRlZmluZUNvbXBvbmVudCgnQnV0dG9uJywgW10sIHRydWUpO1xuZXhwb3J0cy5DaGVja2JveCA9IGRlZmluZUNvbXBvbmVudCgnQ2hlY2tib3gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5DaGlwTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcExpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXAgPSBkZWZpbmVDb21wb25lbnQoJ0NoaXAnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNvbnRleHRWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdDb250ZXh0VmlldycsIFsnYWN0aW9ucycsICdiYW5uZXInLCAnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRGF0ZUZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdEYXRlRmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlTW9kdWxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VUYWJsZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRGl2aWRlciA9IGRlZmluZUNvbXBvbmVudCgnRGl2aWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRm9jdXNWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdGb2N1c1ZpZXcnLCBbJ2Zvb3RlckNvbnRlbnQnLCAncHJpbWFyeUFjdGlvbicsICdzZWNvbmRhcnlBY3Rpb24nXSwgdHJ1ZSk7XG5leHBvcnRzLkZvcm1GaWVsZEdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdGb3JtRmllbGRHcm91cCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSWNvbiA9IGRlZmluZUNvbXBvbmVudCgnSWNvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW1nID0gZGVmaW5lQ29tcG9uZW50KCdJbWcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLklubGluZSA9IGRlZmluZUNvbXBvbmVudCgnSW5saW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5lQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0xpbmVDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGluayA9IGRlZmluZUNvbXBvbmVudCgnTGluaycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGlzdEl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ0xpc3RJdGVtJywgWydpY29uJywgJ2ltYWdlJywgJ3NlY29uZGFyeVRpdGxlJywgJ3RpdGxlJywgJ3ZhbHVlJ10sIHRydWUpO1xuZXhwb3J0cy5MaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51R3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ01lbnVHcm91cCcsIFsndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdNZW51SXRlbScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTWVudSA9IGRlZmluZUNvbXBvbmVudCgnTWVudScsIFsndHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ09uYm9hcmRpbmdWaWV3JywgWydlcnJvciddLCB0cnVlKTtcbmV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGRlZmluZUNvbXBvbmVudCgnUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0SXRlbScsIFsnbGFiZWwnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLlByb3BlcnR5TGlzdCA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5SYWRpbyA9IGRlZmluZUNvbXBvbmVudCgnUmFkaW8nLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5TZWxlY3QgPSBkZWZpbmVDb21wb25lbnQoJ1NlbGVjdCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNldHRpbmdzVmlldyA9IGRlZmluZUNvbXBvbmVudCgnU2V0dGluZ3NWaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5TaWduSW5WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTaWduSW5WaWV3JywgWydkZXNjcmlwdGlvbkFjdGlvbkNvbnRlbnRzJywgJ2Zvb3RlckNvbnRlbnQnXSwgdHJ1ZSk7XG5leHBvcnRzLlNwYXJrbGluZSA9IGRlZmluZUNvbXBvbmVudCgnU3BhcmtsaW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5TcGlubmVyID0gZGVmaW5lQ29tcG9uZW50KCdTcGlubmVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBkZWZpbmVDb21wb25lbnQoJ1N0cmlwZUZpbGVVcGxvYWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU3dpdGNoID0gZGVmaW5lQ29tcG9uZW50KCdTd2l0Y2gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5UYWJMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJQYW5lbCA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVscyA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWxzJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWIgPSBkZWZpbmVDb21wb25lbnQoJ1RhYicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVCb2R5ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUJvZHknLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUZvb3RlciA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVGb290ZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckNlbGwgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlSGVhZGVyQ2VsbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZVJvdyA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVSb3cnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYnMgPSBkZWZpbmVDb21wb25lbnQoJ1RhYnMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3RJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYXNrTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRBcmVhID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0QXJlYScsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRGaWVsZCA9IGRlZmluZUNvbXBvbmVudCgnVGV4dEZpZWxkJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVG9vbHRpcCA9IGRlZmluZUNvbXBvbmVudCgnVG9vbHRpcCcsIFsndHJpZ2dlciddLCB0cnVlKTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFByaXZhdGUhIFRoaXMgYWxsb3dzIHRoZSBzaGFyZWQgZW5kcG9pbnQgdG8gYmUgaW50aWFsaXplZFxuICogc28gdGhhdCB0aGUgU0RLIGNhbiBjb21tdW5pY2F0ZSB3aXRoIHRoZSBEYXNoYm9hcmQuXG4gKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gdm9pZCAwO1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBnZXRIb3N0RW5kcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBlbmRwb2ludCBpcyBjcmVhdGVkIGZyb20gdGhlIE1lc3NhZ2VQb3J0IHRyYW5zZmVycmVkIGZyb20gdGhlIGhvc3QgZW52XG4gICAgLy8gYXMgYSBwYXJ0IG9mIHRoZSBgaW5pdF9leHRlbnNpb25gIG1lc3NhZ2UuXG4gICAgY29uc3QgaG9zdEVuZHBvaW50ID0gZ2xvYmFsVGhpcy5fX1N0cmlwZUV4dEV4cG9ydHM/LmVuZHBvaW50O1xuICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShob3N0RW5kcG9pbnQsICdob3N0RW5kcG9pbnQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkJyk7XG4gICAgcmV0dXJuIGhvc3RFbmRwb2ludDtcbn07XG5leHBvcnRzLmdldEhvc3RFbmRwb2ludCA9IGdldEhvc3RFbmRwb2ludDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gYXN5bmMgKCkgPT4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKVxuICAgIC5jYWxsLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSgpXG4gICAgLnRoZW4oKHN1cHBvcnRlZCkgPT4gc3VwcG9ydGVkKVxuICAgIC5jYXRjaCgoKSA9PiBmYWxzZSk7XG5leHBvcnRzLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSA9IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hBcHBFbWJlZGRlZEtleSA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoQXBwRW1iZWRkZWRLZXkoKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBhcHAgZW1iZWRkZWQga2V5Jyk7XG4gICAgfVxuICAgIHJldHVybiBhcGlLZXk7XG59O1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gZmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IHZvaWQgMDtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL2ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lID0gYXN5bmMgKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIGZldGNoQXBwRW1iZWRkZWRLZXlfMS5mZXRjaEFwcEVtYmVkZGVkS2V5KSgpO1xuICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBpbml0KTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIGNvbnN0IHNlcmlhbGl6YWJsZVJlc3BvbnNlID0ge1xuICAgICAgICBqc29uOiB1bmRlZmluZWQsXG4gICAgICAgIGFycmF5QnVmZmVyOiB1bmRlZmluZWQsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIG9rOiByZXNwb25zZS5vayxcbiAgICAgICAgcmVkaXJlY3RlZDogcmVzcG9uc2UucmVkaXJlY3RlZCxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIHR5cGU6IHJlc3BvbnNlLnR5cGUsXG4gICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgIH07XG4gICAgc3dpdGNoIChyZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIHtcbiAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5qc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5hcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHNlcmlhbGl6YWJsZVJlc3BvbnNlO1xufTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IGZldGNoVmlhRnJhbWU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoVmlhSG9zdCA9IGFzeW5jIChlbmNvZGVkVXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGVuY29kZWRVcmwpO1xuICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuc3RyaXBlQXBpRmV0Y2godXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUhvc3QgPSBmZXRjaFZpYUhvc3Q7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lXzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUZyYW1lXCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0XzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUhvc3RcIik7XG5sZXQgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IG51bGw7XG5jb25zdCBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkU3RyaXBlQXBpRmV0Y2gpIHtcbiAgICAgICAgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKVxuICAgICAgICAgICAgPyBmZXRjaFZpYUZyYW1lXzEuZmV0Y2hWaWFGcmFtZVxuICAgICAgICAgICAgOiBmZXRjaFZpYUhvc3RfMS5mZXRjaFZpYUhvc3Q7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZFN0cmlwZUFwaUZldGNoO1xufTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG52YXIgc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2g7IH0gfSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBzdHJpcGVBcGlGZXRjaCA9IGFzeW5jIChwYXRoLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgcHJlZmVycmVkRmV0Y2hNZXRob2QgPSBhd2FpdCAoMCwgYXBpXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2gpKCk7XG4gICAgcmV0dXJuIHByZWZlcnJlZEZldGNoTWV0aG9kKHBhdGgsIG9wdGlvbnMpO1xufTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSBzdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBleHBvcnRzLkFVVEhPUklaQVRJT05fSEVBREVSID0gZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9IGV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSB2b2lkIDA7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgSHR0cENsaWVudCB0aGF0IGNhbiBiZSBwbHVnZ2VkIGludG8gc3RyaXBlLW5vZGVcbiAqIHRoYXQgd2lsbCBhbGxvdyB0aGUgdXNlciB0byB1c2Ugc3RyaXBlLW5vZGUgaW4gZXh0ZW5zaW9ucyBpZiB0aGUgRGFzaGJvYXJkXG4gKiBwcm92aWRlcyBhIGBzdHJpcGVBcGlGZXRjaGAgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbGF5IEFQSSBjYWxscyB0aHJvdWdoIHRoZVxuICogRGFzaGJvYXJkIGFuZCBwaWdneSBiYWNrIG9uIHRoZSB1c2VyJ3MgRGFzaGJvYXJkIHNlc3Npb24uXG4gKi9cbmNvbnN0IGludmFyaWFudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJpbnZhcmlhbnRcIikpO1xuY29uc3QgYXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2FwaUZldGNoXCIpO1xuY29uc3QgbWF0Y2hlc1N0cmlwZUtleSA9IC9bcHNda18odGVzdHxsaXZlKV9bQS1aYS16MC05XSsvO1xuY2xhc3MgU3RyaXBlQXBwc0h0dHBSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IocmVzcCkge1xuICAgICAgICB0aGlzLl9yZXNwID0gcmVzcDtcbiAgICB9XG4gICAgZ2V0SGVhZGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3AuaGVhZGVycztcbiAgICB9XG4gICAgZ2V0U3RhdHVzQ29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3Auc3RhdHVzO1xuICAgIH1cbiAgICBnZXRSYXdSZXNwb25zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3A7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgdG9TdHJlYW0oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyZWFtcyBoYXZlIG5vdCBiZWVuIGltcGxlbWVudGVkIGluIHRoZSBTdHJpcGUgSFRUUCBjbGllbnQnKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHsganNvbiB9ID0gdGhpcy5fcmVzcDtcbiAgICAgICAgaWYgKGpzb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUmVzcG9uc2UgYm9keSB1bmRlZmluZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU3RyaXBlQXBwc0h0dHBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGZldGNoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgZ2V0Q2xpZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpcGUtdWktZXh0ZW5zaW9uJztcbiAgICB9XG4gICAgYXN5bmMgbWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgcGF0aCwgbWV0aG9kLCBoZWFkZXJzLCByZXF1ZXN0RGF0YSwgcHJvdG9jb2wsIF90aW1lb3V0KSB7XG4gICAgICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShwcm90b2NvbCA9PT0gJ2h0dHBzJywgJ011c3QgdXNlIGh0dHBzIGNvbm5lY3Rpb25zIGluIFVJIGV4dGVuc2lvbnMnKTtcbiAgICAgICAgY29uc3QgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlcXVlc3REYXRhKSB7XG4gICAgICAgICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IHJlcXVlc3REYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBoZWFkZXJzLkF1dGhvcml6YXRpb247XG4gICAgICAgIGlmIChhdXRoSGVhZGVyICYmIG1hdGNoZXNTdHJpcGVLZXkudGVzdChhdXRoSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgdXNlIGFjdHVhbCBzdHJpcGUga2V5cyB3aGVuIHVzaW5nIHRoZSBTdHJpcGUgSlMgQVBJIGNsaWVudCB3aXRoIFVJIGV4dGVzaW9ucy5cXG5cXG4gSW5zdGVhZCwgdXNlIGBTVFJJUEVfQVBJX0tFWWAgZnJvbSBgQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2h0dHBfY2xpZW50YCBhcyBhIHBsYWNlaG9sZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWApO1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5fZmV0Y2godXJsLnRvU3RyaW5nKCksIGZldGNoT3B0aW9ucyk7XG4gICAgICAgIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciB0aW1lb3V0cy5cbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlKHJlc3ApO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSBTdHJpcGVBcHBzSHR0cENsaWVudDtcbi8vIERPIE5PVCBjaGFuZ2UgdGhpcyBzdHJpbmcgd2l0aG91dCBhIGRlcHJlY2F0aW9uIHBsYW4uIFRoZSBydW50aW1lIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGlzXG4vLyBleGFjdCBzdHJpbmcgaXMgcGFzc2VkLCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbi8vIFNlZTogbWFuYWdlL2Zyb250ZW5kL3NyYy90YWlsb3IvZXh0ZW5zaW9ucy9ob3N0L2FwaV9mZXRjaC5qc1xuZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9ICdET19OT1RfUEFTU19BX1JFQUxfQVBJX0tFWSc7XG5jb25zdCBjcmVhdGVIdHRwQ2xpZW50ID0gKCkgPT4gbmV3IFN0cmlwZUFwcHNIdHRwQ2xpZW50KGFwaUZldGNoXzEuc3RyaXBlQXBpRmV0Y2gpO1xuZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gY3JlYXRlSHR0cENsaWVudDtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvbic7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBgQmVhcmVyICR7ZXhwb3J0cy5TVFJJUEVfQVBJX0tFWX1gO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gdm9pZCAwO1xuY29uc3QgaHR0cENsaWVudF8xID0gcmVxdWlyZShcIi4uL2h0dHBDbGllbnRcIik7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKHsgaG9zdCwgcG9ydCB9KSA9PiBhc3luYyAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHBzOi8vJHtob3N0fToke3BvcnR9L3YxL2FwcHMvYXBwX2VtYmVkZGVkX2JhY2tlbmRfc2lnbmF0dXJlYCk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3BheWxvYWQnLCBKU09OLnN0cmluZ2lmeSh7IC4uLnBheWxvYWQgfSkpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdpbmNsdWRlX29ubHlbXScsICdzaWduYXR1cmUnKTtcbiAgICBjb25zdCBjbGllbnQgPSAoMCwgaHR0cENsaWVudF8xLmNyZWF0ZUh0dHBDbGllbnQpKCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBjbGllbnQubWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgJ0dFVCcsIHt9LCBudWxsLCAnaHR0cHMnKTtcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgLnRoZW4oKHIpID0+IHIudG9KU09OKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnNpZ25hdHVyZSk7XG59O1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gZXhwb3J0cy5jb25uZWN0aW9uU2V0dGluZ3MgPSB2b2lkIDA7XG5jb25zdCBkZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIGhvc3Q6ICdhcGkuc3RyaXBlLmNvbScsXG4gICAgcG9ydDogNDQzLFxufTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5leHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3M7XG5jb25zdCBzZXRDb25uZWN0aW9uU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICAgICAgLi4uZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgfTtcbn07XG5leHBvcnRzLnNldENvbm5lY3Rpb25TZXR0aW5ncyA9IHNldENvbm5lY3Rpb25TZXR0aW5ncztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSB2b2lkIDA7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseVwiKTtcbmNvbnN0IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGNvbm5lY3Rpb25TZXR0aW5nc18xID0gcmVxdWlyZShcIi4vc2lnbmF0dXJlL2Nvbm5lY3Rpb25TZXR0aW5nc1wiKTtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSBhc3luYyAoYWRkaXRpb25hbFBheWxvYWQpID0+IHtcbiAgICBpZiAoYXdhaXQgKDAsIHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSkoKSkge1xuICAgICAgICBjb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKDAsIGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMS5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KShjb25uZWN0aW9uU2V0dGluZ3NfMS5jb25uZWN0aW9uU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gZmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseShhZGRpdGlvbmFsUGF5bG9hZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoU3RyaXBlU2lnbmF0dXJlKGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG59O1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gVGhpcyBmaWxlIG1vdmVkIHRvIHV0aWxzOyByZS1leHBvcnRlZCB0byBub3QgYnJlYWsgaW1wb3J0c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2lnbmF0dXJlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zaWduYXR1cmVcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBzaWduYXR1cmVfMS5mZXRjaFN0cmlwZVNpZ25hdHVyZTtcbiIsICIvLyBBVVRPR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuaW1wb3J0IFBheW1lbnREaXNwdXRlVmlldyBmcm9tICcuLi9zcmMvdmlld3MvUGF5bWVudERpc3B1dGVWaWV3JztpbXBvcnQgRGlzcHV0ZUxpc3RWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcnO2ltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MnO1xuXG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA0LTE4IDIxOjAzOjA3LjExMjM5NyAtMDcwMCBQRFQgbT0rMC4wMTUxMjI3OTMnO1xuXG5leHBvcnQgeyBcbiAgUGF5bWVudERpc3B1dGVWaWV3LFxuXG4gIERpc3B1dGVMaXN0VmlldyxcblxuICBBcHBTZXR0aW5nc1xuIH07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJpY29uXCI6IFwiXCIsXG4gIFwiaWRcIjogXCJjb20uamtidGVjaC53aW5iYWNrXCIsXG4gIFwibmFtZVwiOiBcIldpbkJhY2tcIixcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZGlzcHV0ZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGRpc3B1dGUgZGV0YWlscyB0byBndWlkZSBtZXJjaGFudHMgdGhyb3VnaCB0aGUgcmVzcG9uc2UgcHJvY2Vzc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3dyaXRlXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJTdWJtaXQgZXZpZGVuY2UgYW5kIHJlc3BvbnNlcyBvbiBiZWhhbGYgb2YgdGhlIG1lcmNoYW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImNoYXJnZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGNoYXJnZSBkZXRhaWxzIGFzc29jaWF0ZWQgd2l0aCBkaXNwdXRlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJjdXN0b21lcl9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGN1c3RvbWVyIGluZm9ybWF0aW9uIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHVwbG9hZGVkIGV2aWRlbmNlIGZpbGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImZpbGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlVwbG9hZCBldmlkZW5jZSBmaWxlcyBmb3IgZGlzcHV0ZSByZXNwb25zZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9pbnRlbnRfcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBwYXltZW50IGludGVudCBkZXRhaWxzIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH1cbiAgXSxcbiAgXCJwb3N0X2luc3RhbGxfYWN0aW9uXCI6IHtcbiAgICBcInR5cGVcIjogXCJzZXR0aW5nc1wiXG4gIH0sXG4gIFwidWlfZXh0ZW5zaW9uXCI6IHtcbiAgICBcImNvbnRlbnRfc2VjdXJpdHlfcG9saWN5XCI6IHtcbiAgICAgIFwiY29ubmVjdC1zcmNcIjogW1xuICAgICAgICBcImh0dHBzOi8vd2luYmFja3BheS5jb20vYXBpL1wiLFxuICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJcIlxuICAgIH0sXG4gICAgXCJ2aWV3c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiUGF5bWVudERpc3B1dGVWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLnBheW1lbnQuZGV0YWlsXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiRGlzcHV0ZUxpc3RWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLmRyYXdlci5kZWZhdWx0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiQXBwU2V0dGluZ3NcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInNldHRpbmdzXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCJcbn07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQmFkZ2UsXG4gIEJ1dHRvbixcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UsIGdldFJlYXNvbkNvZGVMYWJlbCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbnR5cGUgVmlld1N0YXRlID0gJ2xvYWRpbmcnIHwgJ25vX2Rpc3B1dGUnIHwgJ2Vycm9yJyB8ICdyZWFkeSc7XG5cbmNvbnN0IFBheW1lbnREaXNwdXRlVmlldyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgeyBlbnZpcm9ubWVudCB9ID0gY29udGV4dDtcbiAgY29uc3QgcGF5bWVudEludGVudElkID0gZW52aXJvbm1lbnQ/Lm9iamVjdENvbnRleHQ/LmlkO1xuXG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBheW1lbnRJbnRlbnRJZCkge1xuICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGUgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzL2J5LXBheW1lbnQtaW50ZW50LyR7cGF5bWVudEludGVudElkfWAsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICk7XG4gICAgICBzZXREaXNwdXRlKHJlc3VsdC5kYXRhKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgncmVhZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbcGF5bWVudEludGVudElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGlzcHV0ZSgpO1xuICB9LCBbbG9hZERpc3B1dGVdKTtcblxuICBpZiAodmlld1N0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdub19kaXNwdXRlJyB8fCB2aWV3U3RhdGUgPT09ICdlcnJvcicgfHwgIWRpc3B1dGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIE5vIGRpc3B1dGUgb24gdGhpcyBwYXltZW50LlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXR1c0JhZGdlID0gZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCByZWFzb25MYWJlbCA9IGdldFJlYXNvbkNvZGVMYWJlbChkaXNwdXRlLm5ldHdvcmssIGRpc3B1dGUucmVhc29uX2NvZGUpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBEaXNwdXRlXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtyZWFzb25MYWJlbCA/PyBkaXNwdXRlLnJlYXNvbi5yZXBsYWNlKC9fL2csICcgJyl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5uZXR3b3JrLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgZGlzcHV0ZS5uZXR3b3JrLnNsaWNlKDEpfXsnICd9XG4gICAgICAgICAgICB7ZGlzcHV0ZS5yZWFzb25fY29kZX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgeyhkaXNwdXRlLnN0YXR1cyA9PT0gJ25lZWRzX3Jlc3BvbnNlJyB8fFxuICAgICAgICAgIGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZScpICYmIChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gc2V0U2hvd1dvcmtmbG93KHRydWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE9wZW4gaW4gV2luQmFja1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxEaXNwdXRlV29ya2Zsb3dcbiAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgc2V0U2hvd249e3NldFNob3dXb3JrZmxvd31cbiAgICAgIC8+XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnREaXNwdXRlVmlldztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQmFubmVyLFxuICBGb2N1c1ZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbiAgVGFicyxcbiAgVGFiLFxuICBUYWJMaXN0LFxuICBUYWJQYW5lbHMsXG4gIFRhYlBhbmVsLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IFdpemFyZFN0ZXAsIERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IFdJWkFSRF9TVEVQUywgV0laQVJEX1NURVBfTEFCRUxTIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldERheXNSZW1haW5pbmcsIGlzUmVzb2x2ZWQsIGlzRGlzcHV0ZUV4cGlyZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4vRXJyb3JCYW5uZXInO1xuaW1wb3J0IERlYWRsaW5lVGltZXIgZnJvbSAnLi9EZWFkbGluZVRpbWVyJztcbmltcG9ydCBEaXNwdXRlT3ZlcnZpZXcgZnJvbSAnLi9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3JztcbmltcG9ydCBDb2FjaEhlYWRlciBmcm9tICcuL3Jldmlldy9Db2FjaEhlYWRlcic7XG5pbXBvcnQgUXVpY2tBY3Rpb25zIGZyb20gJy4vcmV2aWV3L1F1aWNrQWN0aW9ucyc7XG5pbXBvcnQgTGVhcm5Nb3JlIGZyb20gJy4vcmV2aWV3L0xlYXJuTW9yZSc7XG5pbXBvcnQgRXZpZGVuY2VDaGVja2xpc3QgZnJvbSAnLi9ldmlkZW5jZS9FdmlkZW5jZUNoZWNrbGlzdCc7XG5pbXBvcnQgTmFycmF0aXZlUGFuZWwgZnJvbSAnLi9uYXJyYXRpdmUvTmFycmF0aXZlUGFuZWwnO1xuaW1wb3J0IFN1Ym1pdFZpZXcgZnJvbSAnLi9zdWJtaXQvU3VibWl0Vmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbmZpcm1hdGlvbiBmcm9tICcuL3N1Ym1pdC9TdWJtaXNzaW9uQ29uZmlybWF0aW9uJztcblxuaW50ZXJmYWNlIERpc3B1dGVXb3JrZmxvd1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBzaG93bjogYm9vbGVhbjtcbiAgc2V0U2hvd246IChzaG93bjogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuY29uc3QgRGlzcHV0ZVdvcmtmbG93ID0gKHsgZGlzcHV0ZTogaW5pdGlhbERpc3B1dGUsIGNvbnRleHQsIHNob3duLCBzZXRTaG93biB9OiBEaXNwdXRlV29ya2Zsb3dQcm9wcykgPT4ge1xuICBjb25zdCBbY3VycmVudFN0ZXAsIHNldEN1cnJlbnRTdGVwXSA9IHVzZVN0YXRlPFdpemFyZFN0ZXA+KCdyZXZpZXcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZT4oaW5pdGlhbERpc3B1dGUpO1xuICBjb25zdCBbcGxheWJvb2ssIHNldFBsYXlib29rXSA9IHVzZVN0YXRlPFBsYXlib29rRGF0YSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTx7IGRpc3B1dGU6IGJvb2xlYW47IHBsYXlib29rOiBib29sZWFuIH0+KHtcbiAgICBkaXNwdXRlOiBmYWxzZSxcbiAgICBwbGF5Ym9vazogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBzdHJpbmcgfCBudWxsOyBwbGF5Ym9vazogc3RyaW5nIHwgbnVsbCB9Pih7XG4gICAgZGlzcHV0ZTogbnVsbCxcbiAgICBwbGF5Ym9vazogbnVsbCxcbiAgfSk7XG4gIGNvbnN0IFtlZGl0ZWROYXJyYXRpdmUsIHNldEVkaXRlZE5hcnJhdGl2ZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtldmlkZW5jZUZpbGVzLCBzZXRFdmlkZW5jZUZpbGVzXSA9IHVzZVN0YXRlPEV2aWRlbmNlRmlsZVtdPihbXSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3duKSByZXR1cm47XG5cbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHsgZGlzcHV0ZTogdHJ1ZSwgcGxheWJvb2s6IHRydWUgfSk7XG4gICAgICBzZXRFcnJvcnMoeyBkaXNwdXRlOiBudWxsLCBwbGF5Ym9vazogbnVsbCB9KTtcblxuICAgICAgLy8gRmV0Y2ggZW5yaWNoZWQgZGlzcHV0ZSBhbmQgcGxheWJvb2sgaW4gcGFyYWxsZWxcbiAgICAgIC8vIFNraXAgcGxheWJvb2sgZmV0Y2ggaWYgcmVhc29uX2NvZGUgaXMgZW1wdHkgKHRlc3QgZGlzcHV0ZXMsIHVua25vd24gY29kZXMpXG4gICAgICBjb25zdCBzaG91bGRGZXRjaFBsYXlib29rID0gISFpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZTtcbiAgICAgIGNvbnN0IFtkaXNwdXRlUmVzdWx0LCBwbGF5Ym9va1Jlc3VsdF0gPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlIH0+KGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50KSxcbiAgICAgICAgc2hvdWxkRmV0Y2hQbGF5Ym9va1xuICAgICAgICAgID8gZmV0Y2hCYWNrZW5kPHsgZGF0YTogUGxheWJvb2tEYXRhIH0+KCcvYXBpL3BsYXlib29rcycsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICAgICAgICBuZXR3b3JrOiBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLFxuICAgICAgICAgICAgICByZWFzb25fY29kZTogaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IEFwaUVycm9yKCdObyByZWFzb24gY29kZScsIDQwNCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGlmIChkaXNwdXRlUmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hlZCA9IGRpc3B1dGVSZXN1bHQudmFsdWUuZGF0YTtcbiAgICAgICAgc2V0RGlzcHV0ZShmZXRjaGVkKTtcbiAgICAgICAgaWYgKGZldGNoZWQubmFycmF0aXZlX3RleHQpIHtcbiAgICAgICAgICBzZXRFZGl0ZWROYXJyYXRpdmUoZmV0Y2hlZC5uYXJyYXRpdmVfdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGRpc3B1dGVSZXN1bHQucmVhc29uO1xuICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBkaXNwdXRlOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGUgZGV0YWlscy4nLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBkaXNwdXRlOiBmYWxzZSB9KSk7XG5cbiAgICAgIGlmIChwbGF5Ym9va1Jlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldFBsYXlib29rKHBsYXlib29rUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gcGxheWJvb2tSZXN1bHQucmVhc29uO1xuICAgICAgICAvLyA0MDQgaXMgbm90IGFuIGVycm9yIC0tIGp1c3QgbWVhbnMgbm8gcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGVcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSkge1xuICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5Ym9vazogZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBwbGF5Ym9vay4nLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQbGF5Ym9vayhudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlib29rOiBmYWxzZSB9KSk7XG5cbiAgICAgIC8vIEZldGNoIGV2aWRlbmNlIGZpbGVzIGZvciBuYXJyYXRpdmUgdGFiXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlc1Jlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZVtdIH0+KFxuICAgICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICAgICk7XG4gICAgICAgIHNldEV2aWRlbmNlRmlsZXMoZmlsZXNSZXN1bHQuZGF0YSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGV2aWRlbmNlIGZpbGVzOicsIGVycik7XG4gICAgICAgIHNldEV2aWRlbmNlRmlsZXMoW10pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW3Nob3duLCBpbml0aWFsRGlzcHV0ZS5pZCwgaW5pdGlhbERpc3B1dGUubmV0d29yaywgaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGVdKTtcblxuICAvLyBSZS1mZXRjaCBldmlkZW5jZSBmaWxlcyB3aGVuZXZlciB0aGUgdXNlciBlbnRlcnMgdGhlIG5hcnJhdGl2ZSBzdGVwLlxuICAvLyBUaGUgRXZpZGVuY2UgdGFiIG93bnMgaXRzIG93biB1cGxvYWQgc3RhdGUsIHNvIERpc3B1dGVXb3JrZmxvdydzIGNvcHlcbiAgLy8gZ29lcyBzdGFsZSBhcyBzb29uIGFzIHRoZSBtZXJjaGFudCB1cGxvYWRzIGEgZmlsZS4gUmVmcmVzaGluZyBvbiB0YWJcbiAgLy8gZW50cnkga2VlcHMgdGhlIG5hcnJhdGl2ZSBwcmUtZ2VuZXJhdGlvbiB2aWV3IGluIHN5bmMgd2l0aG91dCBsaWZ0aW5nXG4gIC8vIHVwbG9hZCBzdGF0ZSBhY3Jvc3MgdGhlIHdob2xlIHdvcmtmbG93LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U3RlcCAhPT0gJ25hcnJhdGl2ZScpIHJldHVybjtcbiAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBFdmlkZW5jZUZpbGVbXSB9PihcbiAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiBzZXRFdmlkZW5jZUZpbGVzKHJlc3VsdC5kYXRhKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCBldmlkZW5jZSBmaWxlczonLCBlcnIpKTtcbiAgfSwgW2N1cnJlbnRTdGVwLCBpbml0aWFsRGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IHN1Ym1pdHRlZCA9IEJvb2xlYW4oZGlzcHV0ZS5ldmlkZW5jZV9zdWJtaXR0ZWRfYXQpO1xuICBjb25zdCBleHBpcmVkID0gIXN1Ym1pdHRlZCAmJiBpc0Rpc3B1dGVFeHBpcmVkKGRpc3B1dGUuZHVlX2J5LCBkaXNwdXRlLnN0YXR1cyk7XG4gIC8vIEFueSBjaGlsZCBjb21wb25lbnQgdGhhdCBrZXlzIGlucHV0cyBvZmYgYHN1Ym1pdHRlZGAgc2hvdWxkIGFsc28gYmVcbiAgLy8gbG9ja2VkIGRvd24gd2hlbiB0aGUgZGlzcHV0ZSBpcyBleHBpcmVkLiBXZSBwYXNzIHRoZSBPUiBhcyBgc3VibWl0dGVkYFxuICAvLyB0byBhdm9pZCBjYXNjYWRpbmcgYSBuZXcgcHJvcCB0aHJvdWdoIDUrIGNvbXBvbmVudHM7IHRoZSB0b3AtbGV2ZWxcbiAgLy8gYmFubmVyIGJlbG93IHByb3ZpZGVzIHRoZSBhY2N1cmF0ZSBcIndoeVwiIGZvciBleHBpcmVkIGRpc3B1dGVzLlxuICBjb25zdCBsb2NrZG93biA9IHN1Ym1pdHRlZCB8fCBleHBpcmVkO1xuXG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IFdJWkFSRF9TVEVQUy5pbmRleE9mKGN1cnJlbnRTdGVwKTtcbiAgY29uc3QgaXNGaXJzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IDA7XG4gIGNvbnN0IGlzTGFzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IFdJWkFSRF9TVEVQUy5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0xhc3RTdGVwKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcChXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmICghaXNGaXJzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRheXNSZW1haW5pbmcgPSBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KTtcbiAgY29uc3QgaXNVcmdlbnQgPSBkYXlzUmVtYWluaW5nIDwgNSAmJiAhaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG5cbiAgY29uc3QgcmVuZGVyUmV2aWV3VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTG9hZGluZ1BsYXlib29rID0gbG9hZGluZy5wbGF5Ym9vaztcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgICB7ZXJyb3JzLmRpc3B1dGUgJiYgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9ycy5kaXNwdXRlfSAvPn1cblxuICAgICAgICB7aXNMb2FkaW5nUGxheWJvb2sgPyAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+TG9hZGluZyBwbGF5Ym9vay4uLjwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogZXJyb3JzLnBsYXlib29rID8gKFxuICAgICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMucGxheWJvb2t9IC8+XG4gICAgICAgICkgOiBwbGF5Ym9vayA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvYWNoSGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRsaW5lPXtwbGF5Ym9vay5jb2FjaF9oZWFkbGluZX1cbiAgICAgICAgICAgICAgc3VtbWFyeT17cGxheWJvb2suY29hY2hfc3VtbWFyeX1cbiAgICAgICAgICAgICAgdXJnZW5jeU1vZGU9e2lzVXJnZW50fVxuICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxRdWlja0FjdGlvbnMgcGxheWJvb2s9e3BsYXlib29rfSB1cmdlbmN5TW9kZT17aXNVcmdlbnR9IC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgdGl0bGU9XCJObyBwbGF5Ym9vayBhdmFpbGFibGVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXZSBkb24ndCBoYXZlIGEgc3BlY2lmaWMgcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGUgeWV0LiBVc2UgdGhlIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyB0byBidWlsZCB5b3VyIHJlc3BvbnNlLlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RGlzcHV0ZU92ZXJ2aWV3IGRpc3B1dGU9e2Rpc3B1dGV9IGxvYWRpbmc9e2xvYWRpbmcuZGlzcHV0ZX0gLz5cblxuICAgICAgICB7cGxheWJvb2sgJiYgKFxuICAgICAgICAgIDxMZWFybk1vcmVcbiAgICAgICAgICAgIGlzc3VlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2lzc3Vlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgYWNxdWlyZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9hY3F1aXJlcl9zdW1tYXJ5fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVmlld1xuICAgICAgdGl0bGU9e2BEaXNwdXRlICR7aW5pdGlhbERpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLmB9XG4gICAgICBzaG93bj17c2hvd259XG4gICAgICBzZXRTaG93bj17c2V0U2hvd259XG4gICAgICBjb25maXJtQ2xvc2VNZXNzYWdlcz17e1xuICAgICAgICB0aXRsZTogJ0xlYXZlIGRpc3B1dGUgd29ya2Zsb3c/JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdZb3VyIHByb2dyZXNzIG9uIHRoaXMgc3RlcCB3aWxsIG5vdCBiZSBzYXZlZC4nLFxuICAgICAgICBjYW5jZWxBY3Rpb246ICdTdGF5JyxcbiAgICAgICAgZXhpdEFjdGlvbjogJ0xlYXZlJyxcbiAgICAgIH19XG4gICAgICBwcmltYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNMYXN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0U2hvd24oZmFsc2UpfT5cbiAgICAgICAgICAgIHtzdWJtaXR0ZWQgPyAnRG9uZScgOiAnQ2xvc2UnfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtoYW5kbGVOZXh0fT5cbiAgICAgICAgICAgIE5leHQ6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCArIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgc2Vjb25kYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNGaXJzdFN0ZXAgPyAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXsoKSA9PiBzZXRTaG93bihmYWxzZSl9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlQmFja30+XG4gICAgICAgICAgICBCYWNrOiB7V0laQVJEX1NURVBfTEFCRUxTW1dJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXV19XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICA+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJywgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgKFxuICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRXZpZGVuY2Ugc3VibWl0dGVkXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIGV2aWRlbmNlIGhhcyBiZWVuIHN1Ym1pdHRlZCB0byBTdHJpcGUuIFRoaXMgZGlzcHV0ZSBpcyBub3cgcmVhZC1vbmx5LlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2V4cGlyZWQgJiYgKFxuICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICB0eXBlPVwiY3JpdGljYWxcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlJlc3BvbnNlIGRlYWRsaW5lIGhhcyBwYXNzZWRcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5vIGZ1cnRoZXIgYWN0aW9uIGNhbiBiZSB0YWtlbiBvbiB0aGlzIGRpc3B1dGUuIEV2aWRlbmNlIHVwbG9hZHMsIG5hcnJhdGl2ZSBnZW5lcmF0aW9uLCBhbmQgc3VibWlzc2lvbiBhcmUgZGlzYWJsZWQuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8RGVhZGxpbmVUaW1lciBkdWVCeT17ZGlzcHV0ZS5kdWVfYnl9IHN0YXR1cz17ZGlzcHV0ZS5zdGF0dXN9IC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8VGFic1xuICAgICAgICAgIGZpdHRlZFxuICAgICAgICAgIHNpemU9XCJtZWRpdW1cIlxuICAgICAgICAgIHNlbGVjdGVkS2V5PXtjdXJyZW50U3RlcH1cbiAgICAgICAgICBvblNlbGVjdGlvbkNoYW5nZT17KGtleSkgPT4gc2V0Q3VycmVudFN0ZXAoa2V5IGFzIFdpemFyZFN0ZXApfVxuICAgICAgICA+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICB7V0laQVJEX1NURVBTLm1hcCgoc3RlcCkgPT4gKFxuICAgICAgICAgICAgICA8VGFiIGtleT17c3RlcH0gaWQ9e3N0ZXB9PlxuICAgICAgICAgICAgICAgIHtXSVpBUkRfU1RFUF9MQUJFTFNbc3RlcF19XG4gICAgICAgICAgICAgIDwvVGFiPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9UYWJMaXN0PlxuICAgICAgICAgIDxUYWJQYW5lbHM+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJyZXZpZXdcIj5cbiAgICAgICAgICAgICAge3JlbmRlclJldmlld1RhYigpfVxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImV2aWRlbmNlXCI+XG4gICAgICAgICAgICAgIHsvKlxuICAgICAgICAgICAgICAgIEludGVudGlvbmFsbHkgTk9UIGdhdGVkIG9uIGN1cnJlbnRTdGVwLiBLZWVwaW5nIHRoZSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICBtb3VudGVkIGFjcm9zcyB0YWIgc3dpdGNoZXMgcHJlc2VydmVzIGNoZWNrbGlzdCBhbmQgbm90ZXNcbiAgICAgICAgICAgICAgICBzdGF0ZSB3aGVuIHRoZSBtZXJjaGFudCB0YWJzIGF3YXkgYW5kIGJhY2suIFRoZSBwcmV2aW91cyBnYXRlXG4gICAgICAgICAgICAgICAgdW5tb3VudGVkIHRoaXMgb24gZXZlcnkgdGFiIHN3aXRjaCwga2lsbGluZyBhbnkgcGVuZGluZyBzYXZlXG4gICAgICAgICAgICAgICAgYW5kIHJlLXJlYWRpbmcgc3RhbGUgc3RhdGUgZnJvbSB0aGUgcGFyZW50IGRpc3B1dGUgcHJvcCBvblxuICAgICAgICAgICAgICAgIHJlbW91bnQuIChXSU4tNDkpXG4gICAgICAgICAgICAgICovfVxuICAgICAgICAgICAgICA8RXZpZGVuY2VDaGVja2xpc3RcbiAgICAgICAgICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICAgICAgICAgIHBsYXlib29rPXtwbGF5Ym9va31cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgICAgaXNVcmdlbnQ9e2lzVXJnZW50fVxuICAgICAgICAgICAgICAgIGRheXNSZW1haW5pbmc9e2RheXNSZW1haW5pbmd9XG4gICAgICAgICAgICAgICAgc3VibWl0dGVkPXtsb2NrZG93bn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJuYXJyYXRpdmVcIj5cbiAgICAgICAgICAgICAge2N1cnJlbnRTdGVwID09PSAnbmFycmF0aXZlJyAmJiAoXG4gICAgICAgICAgICAgIDxOYXJyYXRpdmVQYW5lbFxuICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgICAgICAgIGV2aWRlbmNlRmlsZXM9e2V2aWRlbmNlRmlsZXN9XG4gICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgIGVkaXRlZE5hcnJhdGl2ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICAgICAgICAgIG9uRWRpdGVkTmFycmF0aXZlQ2hhbmdlPXtzZXRFZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgICAgICAgb25BcHByb3ZlPXsodGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0RWRpdGVkTmFycmF0aXZlKHRleHQpO1xuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoJ3N1Ym1pdCcpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25OYXZpZ2F0ZUJhY2s9eygpID0+IHNldEN1cnJlbnRTdGVwKCdldmlkZW5jZScpfVxuICAgICAgICAgICAgICAgIHN1Ym1pdHRlZD17bG9ja2Rvd259XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgZGlzcHV0ZS5ldmlkZW5jZV9zdWJtaXR0ZWRfYXQgPyAoXG4gICAgICAgICAgICAgICAgPFN1Ym1pc3Npb25Db25maXJtYXRpb25cbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlPXt7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25faWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXR0ZWRfYXQ6IGRpc3B1dGUuZXZpZGVuY2Vfc3VibWl0dGVkX2F0LFxuICAgICAgICAgICAgICAgICAgICBkaXNwdXRlX3N0YXR1czogJ2V2aWRlbmNlX3N1Ym1pdHRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdzOiBbXSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IGV4cGlyZWQgPyAoXG4gICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU3VibWlzc2lvbiBpcyBubyBsb25nZXIgYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJUaGlzIGRpc3B1dGUncyByZXNwb25zZSBkZWFkbGluZSBoYXMgcGFzc2VkLiBTdHJpcGUgd2lsbCBubyBsb25nZXIgYWNjZXB0IGV2aWRlbmNlIGZvciBpdC5cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKSA6IHBsYXlib29rID8gKFxuICAgICAgICAgICAgICAgIDxTdWJtaXRWaWV3XG4gICAgICAgICAgICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICAgICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICAgICAgICAgIG5hcnJhdGl2ZVRleHQ9e2VkaXRlZE5hcnJhdGl2ZX1cbiAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICAgIG9uU3VibWl0dGVkPXsocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGlzcHV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uZGlzcHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBldmlkZW5jZV9zdWJtaXR0ZWRfYXQ6IHJlc3BvbnNlLnN1Ym1pdHRlZF9hdCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibWVkaXVtXCIgLz5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgIDwvQm94PlxuICAgIDwvRm9jdXNWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZVdvcmtmbG93O1xuIiwgImV4cG9ydCB0eXBlIERpc3B1dGVTdGF0dXMgPVxuICB8ICduZWVkc19yZXNwb25zZSdcbiAgfCAndW5kZXJfcmV2aWV3J1xuICB8ICd3b24nXG4gIHwgJ2xvc3QnXG4gIHwgJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnXG4gIHwgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3J1xuICB8ICd3YXJuaW5nX2Nsb3NlZCdcbiAgfCAnY2hhcmdlX3JlZnVuZGVkJztcblxuZXhwb3J0IHR5cGUgQ2FyZE5ldHdvcmsgPSAndmlzYScgfCAnbWFzdGVyY2FyZCcgfCAnYW1leCcgfCAnZGlzY292ZXInIHwgJ3Vua25vd24nO1xuXG5leHBvcnQgdHlwZSBXaXphcmRTdGVwID0gJ3JldmlldycgfCAnZXZpZGVuY2UnIHwgJ25hcnJhdGl2ZScgfCAnc3VibWl0JztcblxuZXhwb3J0IGNvbnN0IFdJWkFSRF9TVEVQUzogV2l6YXJkU3RlcFtdID0gWydyZXZpZXcnLCAnZXZpZGVuY2UnLCAnbmFycmF0aXZlJywgJ3N1Ym1pdCddO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBfTEFCRUxTOiBSZWNvcmQ8V2l6YXJkU3RlcCwgc3RyaW5nPiA9IHtcbiAgcmV2aWV3OiAnUmV2aWV3JyxcbiAgZXZpZGVuY2U6ICdFdmlkZW5jZScsXG4gIG5hcnJhdGl2ZTogJ05hcnJhdGl2ZScsXG4gIHN1Ym1pdDogJ1N1Ym1pdCcsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3B1dGUge1xuICBpZDogc3RyaW5nO1xuICBhbW91bnQ6IG51bWJlcjtcbiAgY3VycmVuY3k6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHN0YXR1czogRGlzcHV0ZVN0YXR1cztcbiAgZHVlX2J5OiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIG5ldHdvcms6IENhcmROZXR3b3JrO1xuICBwYXltZW50X2ludGVudD86IHN0cmluZztcbiAgY2hhcmdlX2lkOiBzdHJpbmc7XG4gIGN1c3RvbWVyX25hbWU/OiBzdHJpbmc7XG4gIGN1c3RvbWVyX2VtYWlsPzogc3RyaW5nO1xuICBjcmVhdGVkOiBudW1iZXI7XG4gIGV2aWRlbmNlX2R1ZV9ieTogbnVtYmVyO1xuICAvLyBFbnJpY2hlZCBmaWVsZHMgKGF2YWlsYWJsZSBhZnRlciBkZXRhaWwgZmV0Y2gpXG4gIHRyYW5zYWN0aW9uX2RhdGU/OiBudW1iZXI7XG4gIGNhcmRfYnJhbmQ/OiBzdHJpbmc7XG4gIGNhcmRfbGFzdDQ/OiBzdHJpbmc7XG4gIGJpbGxpbmdfYWRkcmVzcz86IHN0cmluZztcbiAgY2hhcmdlX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICByZWNlaXB0X3VybD86IHN0cmluZztcbiAgaGFzX2V2aWRlbmNlPzogYm9vbGVhbjtcbiAgZXZpZGVuY2Vfc3VibWlzc2lvbl9jb3VudD86IG51bWJlcjtcbiAgaXNfY2hhcmdlX3JlZnVuZGFibGU/OiBib29sZWFuO1xuICBtZXRhZGF0YT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGNoZWNrbGlzdF9zdGF0ZT86IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICBjaGVja2xpc3Rfbm90ZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBuYXJyYXRpdmVfdGV4dD86IHN0cmluZyB8IG51bGw7XG4gIGV2aWRlbmNlX3N1Ym1pdHRlZF9hdD86IHN0cmluZyB8IG51bGw7XG4gIC8vIEF1dG8tcHVsbCBmaWVsZHMgKFdJTi0zNylcbiAgYXZzX2FkZHJlc3NfY2hlY2s/OiBzdHJpbmc7XG4gIGF2c196aXBfY2hlY2s/OiBzdHJpbmc7XG4gIGN2Y19jaGVjaz86IHN0cmluZztcbiAgdGhyZWVfZF9zZWN1cmVfcmVzdWx0Pzogc3RyaW5nO1xuICB0aHJlZV9kX3NlY3VyZV92ZXJzaW9uPzogc3RyaW5nO1xuICBhdXRob3JpemF0aW9uX2NvZGU/OiBzdHJpbmc7XG4gIG5ldHdvcmtfc3RhdHVzPzogc3RyaW5nO1xuICByZWZ1bmRzPzogQXJyYXk8eyBhbW91bnQ6IG51bWJlcjsgY3JlYXRlZDogbnVtYmVyOyBzdGF0dXM6IHN0cmluZyB9Pjtcbn1cblxuLy8gUGxheWJvb2sgdHlwZXMgKG1pcnJvcnMgYmFja2VuZCBQbGF5Ym9va0RhdGEpXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VDaGVja2xpc3RJdGVtIHtcbiAgLy8gU3RhYmxlIGlkZW50aWZpZXIgdGhhdCBtaXJyb3JzIGJhY2tlbmQvbGliL3BsYXlib29rcy90eXBlcy50cyBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0ua2V5LlxuICAvLyBVc2VkIGV2ZXJ5d2hlcmUgdGhlIHBsYXlib29rIGl0ZW0gbmVlZHMgYSBzdGFibGUgaGFuZGxlIChmaWxlc0J5S2V5LFxuICAvLyBjaGVja2xpc3Rfc3RhdGUsIGNoZWNrbGlzdF9ub3RlcykuIFRoZSBgaXRlbWAgZmllbGQgaXMgdGhlIGRpc3BsYXkgbGFiZWwuIChXSU4tNDApXG4gIGtleTogc3RyaW5nO1xuICBpdGVtOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiAnbWFuZGF0b3J5JyB8ICdyZWNvbW1lbmRlZCcgfCAnc2l0dWF0aW9uYWwnO1xuICBjb250ZXh0OiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICB3aHlfbWF0dGVyczogc3RyaW5nO1xuICB3aGVyZV90b19maW5kPzogc3RyaW5nO1xuICBzdHJpcGVfZmllbGQ/OiBzdHJpbmc7XG4gIG5hcnJhdGl2ZV9vbmx5PzogYm9vbGVhbjtcbiAgLy8gUGVyLXBsYXlib29rIGNhbm5lZCBtZXJjaGFudCBhc3NlcnRpb24gdXNlZCBieSB0aGUgYmFja2VuZCBwcm9tcHQgYnVpbGRlclxuICAvLyB3aGVuIGEgVCBpdGVtIGhhcyBubyBtZXJjaGFudCBub3RlLiBGcm9udGVuZCBkb2Vzbid0IHJlbmRlciB0aGlzIC0tIGl0J3NcbiAgLy8gb25seSBoZXJlIHNvIHRoZSB0eXBlIG1hdGNoZXMgdGhlIGJhY2tlbmQgcGF5bG9hZC4gKFdJTi00OSlcbiAgbmFycmF0aXZlX2ZhbGxiYWNrPzogc3RyaW5nO1xuICB1cmdlbmN5X2Vzc2VudGlhbDogYm9vbGVhbjtcbiAgdXJnZW5jeV9vcmRlcjogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGF5Ym9va0RhdGEge1xuICBuZXR3b3JrOiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb2FjaF9oZWFkbGluZTogc3RyaW5nO1xuICBjb2FjaF9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2lzc3Vlcl9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2FjcXVpcmVyX3N1bW1hcnk6IHN0cmluZztcbiAgaXNzdWVyX2V2YWx1YXRpb246IHN0cmluZztcbiAgYWNxdWlyZXJfcHJlcmV2aWV3OiBzdHJpbmc7XG4gIGV2aWRlbmNlX2NoZWNrbGlzdDogRXZpZGVuY2VDaGVja2xpc3RJdGVtW107XG4gIGNvbW1vbl9taXN0YWtlczogeyBtaXN0YWtlOiBzdHJpbmc7IGV4cGxhbmF0aW9uOiBzdHJpbmcgfVtdO1xuICBwcm9fdGlwczogeyB0aXA6IHN0cmluZyB9W107XG4gIHVyZ2VuY3lfZXNzZW50aWFsczogeyBzdW1tYXJ5OiBzdHJpbmc7IG9yZGVyZWRfaXRlbXM6IHN0cmluZ1tdIH07XG4gIG5hcnJhdGl2ZV90ZW1wbGF0ZTogc3RyaW5nO1xuICByZXNwb25zZV9kZWFkbGluZV9kYXlzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VGaWxlIHtcbiAgaWQ6IHN0cmluZztcbiAgc3RyaXBlX2ZpbGVfaWQ6IHN0cmluZztcbiAgY2hlY2tsaXN0X2l0ZW1fa2V5OiBzdHJpbmc7XG4gIGZpbGVfbmFtZTogc3RyaW5nO1xuICBmaWxlX3NpemU6IG51bWJlcjtcbiAgbWltZV90eXBlOiBzdHJpbmc7XG4gIHVwbG9hZGVkX2F0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1Ym1pc3Npb25XYXJuaW5nID1cbiAgfCB7IGNvZGU6ICdmaWVsZF90cnVuY2F0ZWQnOyBmaWVsZDogc3RyaW5nOyBvcmlnaW5hbF9sZW5ndGg6IG51bWJlcjsgdHJ1bmNhdGVkX2xlbmd0aDogbnVtYmVyIH1cbiAgfCB7IGNvZGU6ICdmaWVsZF9jb2xsaXNpb24nOyB3aW5uaW5nX2l0ZW06IHN0cmluZzsgbG9zaW5nX2l0ZW06IHN0cmluZzsgZmllbGQ6IHN0cmluZzsgcmVzb2x1dGlvbjogJ3VuY2F0ZWdvcml6ZWRfZmlsZScgfCAnZHJvcHBlZCcgfVxuICB8IHsgY29kZTogJ21pc3NpbmdfbWFuZGF0b3J5X2l0ZW1zJzsgaXRlbXM6IHN0cmluZ1tdIH1cbiAgfCB7IGNvZGU6ICdkZWFkbGluZV9wYXNzZWQnOyBkdWVfYnk6IG51bWJlciB9XG4gIHwgeyBjb2RlOiAnY29uY2F0X3NraXBwZWQnOyBmaWxlX25hbWU6IHN0cmluZzsgc2xvdDogc3RyaW5nOyByZWFzb246IHN0cmluZyB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN1Ym1pc3Npb25SZXNwb25zZSB7XG4gIHN1Ym1pc3Npb25faWQ6IHN0cmluZztcbiAgc3VibWl0dGVkX2F0OiBzdHJpbmc7XG4gIGRpc3B1dGVfc3RhdHVzOiBzdHJpbmc7XG4gIHdhcm5pbmdzOiBTdWJtaXNzaW9uV2FybmluZ1tdO1xufVxuIiwgImltcG9ydCBmZXRjaFN0cmlwZVNpZ25hdHVyZSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuXG4vLyBUb2dnbGUgZm9yIGxvY2FsIGRldmVsb3BtZW50OiBzZXQgdG8gdHJ1ZSB3aGVuIHJ1bm5pbmcgYHN0cmlwZSBhcHBzIHN0YXJ0YFxuY29uc3QgVVNFX0xPQ0FMX0JBQ0tFTkQgPSB0cnVlO1xuXG5jb25zdCBCQUNLRU5EX1VSTCA9IFVTRV9MT0NBTF9CQUNLRU5EXG4gID8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgOiAnaHR0cHM6Ly93aW5iYWNrcGF5LmNvbSc7XG5cbmV4cG9ydCBjbGFzcyBBcGlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHB1YmxpYyBzdGF0dXM6IG51bWJlcixcbiAgICBwdWJsaWMgY29kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gJ0FwaUVycm9yJztcbiAgfVxufVxuXG4vKipcbiAqIE1ha2VzIGFuIGF1dGhlbnRpY2F0ZWQgcmVxdWVzdCB0byB0aGUgV2luQmFjayBiYWNrZW5kLlxuICogQXV0b21hdGljYWxseSBpbmNsdWRlcyBTdHJpcGUgQXBwIHNpZ25hdHVyZSBhbmQgaWRlbnRpdHkgZmllbGRzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCYWNrZW5kPFQgPSB1bmtub3duPihcbiAgcGF0aDogc3RyaW5nLFxuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUsXG4gIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgLi4uZGF0YSxcbiAgICB1c2VyX2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5pZCxcbiAgICBhY2NvdW50X2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5hY2NvdW50LmlkLFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfSR7cGF0aH1gLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdTdHJpcGUtU2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgIH0sXG4gICAgYm9keSxcbiAgfSk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBlcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICB9KSk7XG4gICAgdGhyb3cgbmV3IEFwaUVycm9yKFxuICAgICAgZXJyb3IuZXJyb3IgfHwgZXJyb3IubWVzc2FnZSB8fCBgQVBJIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgZXJyb3IuY29kZSxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIFBBVENIIHJlcXVlc3QgdG8gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhdGNoQmFja2VuZDxUID0gdW5rbm93bj4oXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlLFxuICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgLi4uZGF0YSxcbiAgICB1c2VyX2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5pZCxcbiAgICBhY2NvdW50X2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5hY2NvdW50LmlkLFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfSR7cGF0aH1gLCB7XG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLmVycm9yIHx8IGVycm9yLm1lc3NhZ2UgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGVycm9yLmNvZGUsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCBQT1NUIHJlcXVlc3QgdG8gYSBcImRlbGV0ZVwiIGVuZHBvaW50IG9uIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBVc2VzIFBPU1QgYmVjYXVzZSBTdHJpcGUgQXBwIHNpZ25hdHVyZSB2ZXJpZmljYXRpb24gcmVxdWlyZXMgYSBib2R5LFxuICogYW5kIHNvbWUgcHJveGllcyBzdHJpcCBib2RpZXMgZnJvbSBERUxFVEUgcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVCYWNrZW5kPFQgPSB1bmtub3duPihcbiAgcGF0aDogc3RyaW5nLFxuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUsXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5lcnJvciB8fCBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICBlcnJvci5jb2RlLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPFQ+O1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ2FyZE5ldHdvcmssIERpc3B1dGVTdGF0dXMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgUkVBU09OX0NPREVfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAndmlzYToxMC40JzogJ0ZyYXVkIC0tIENhcmQgTm90IFByZXNlbnQnLFxuICAndmlzYToxMy4xJzogJ01lcmNoYW5kaXNlIC8gU2VydmljZXMgTm90IFJlY2VpdmVkJyxcbiAgJ3Zpc2E6MTMuMic6ICdDYW5jZWxsZWQgUmVjdXJyaW5nIFRyYW5zYWN0aW9uJyxcbiAgJ3Zpc2E6MTMuMyc6ICdOb3QgYXMgRGVzY3JpYmVkIG9yIERlZmVjdGl2ZScsXG4gICd2aXNhOjEzLjYnOiAnQ3JlZGl0IE5vdCBQcm9jZXNzZWQnLFxuICAnbWFzdGVyY2FyZDo0ODA4JzogJ0F1dGhvcml6YXRpb24tUmVsYXRlZCBEaXNwdXRlJyxcbiAgJ21hc3RlcmNhcmQ6NDg1Myc6ICdOb3QgYXMgRGVzY3JpYmVkIC8gRGVmZWN0aXZlJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWFzb25Db2RlTGFiZWwobmV0d29yazogQ2FyZE5ldHdvcmssIHJlYXNvbkNvZGU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gUkVBU09OX0NPREVfTEFCRUxTW2Ake25ldHdvcmt9OiR7cmVhc29uQ29kZX1gXSA/PyBudWxsO1xufVxuXG5jb25zdCBSRVNPTFZFRF9TVEFUVVNFUzogRGlzcHV0ZVN0YXR1c1tdID0gWyd3b24nLCAnbG9zdCcsICd3YXJuaW5nX2Nsb3NlZCcsICdjaGFyZ2VfcmVmdW5kZWQnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzb2x2ZWQoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIFJFU09MVkVEX1NUQVRVU0VTLmluY2x1ZGVzKHN0YXR1cyBhcyBEaXNwdXRlU3RhdHVzKTtcbn1cblxuLyoqXG4gKiBBIGRpc3B1dGUgaXMgXCJleHBpcmVkXCIgd2hlbiB0aGUgZGVhZGxpbmUgaGFzIHBhc3NlZCBidXQgU3RyaXBlIHN0aWxsXG4gKiByZXBvcnRzIGl0IGFzIG5lZWRzX3Jlc3BvbnNlLiBBdXRob3JpdGF0aXZlIHNvdXJjZSBmb3IgdGhlIGJhY2tlbmQgaXNcbiAqIHN0cmlwZURpc3B1dGUuc3RhdHVzOyB0aGUgVUkgdXNlcyBkdWVfYnkgYXMgYSBsZWFkaW5nIGluZGljYXRvciBiZWZvcmVcbiAqIFN0cmlwZSBmbGlwcyB0aGUgc3RhdHVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEaXNwdXRlRXhwaXJlZChkdWVCeTogc3RyaW5nLCBzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoc3RhdHVzICE9PSAnbmVlZHNfcmVzcG9uc2UnICYmIHN0YXR1cyAhPT0gJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KS5pc0V4cGlyZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNCYWRnZShzdGF0dXM6IHN0cmluZyk6IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdHlwZTogJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnIHwgJ25lZ2F0aXZlJyB8ICdpbmZvJztcbn0ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICBjYXNlICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTmVlZHMgUmVzcG9uc2UnLCB0eXBlOiAndXJnZW50JyB9O1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgY2FzZSAnd2FybmluZ191bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdVbmRlciBSZXZpZXcnLCB0eXBlOiAnaW5mbycgfTtcbiAgICBjYXNlICd3b24nOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdXb24nLCB0eXBlOiAncG9zaXRpdmUnIH07XG4gICAgY2FzZSAnbG9zdCc6XG4gICAgY2FzZSAnd2FybmluZ19jbG9zZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdMb3N0JywgdHlwZTogJ25lZ2F0aXZlJyB9O1xuICAgIGNhc2UgJ2NoYXJnZV9yZWZ1bmRlZCc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ1JlZnVuZGVkJywgdHlwZTogJ2luZm8nIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7IGxhYmVsOiBzdGF0dXMsIHR5cGU6ICdpbmZvJyB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzUmVtYWluaW5nKGR1ZUJ5OiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdWUgPSBuZXcgRGF0ZShkdWVCeSk7XG4gIHJldHVybiBNYXRoLmNlaWwoKGR1ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVJlbWFpbmluZyB7XG4gIGRheXM6IG51bWJlcjtcbiAgaG91cnM6IG51bWJlcjtcbiAgaXNFeHBpcmVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVJlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogVGltZVJlbWFpbmluZyB7XG4gIGNvbnN0IHRvdGFsTXMgPSBuZXcgRGF0ZShkdWVCeSkuZ2V0VGltZSgpIC0gRGF0ZS5ub3coKTtcbiAgaWYgKHRvdGFsTXMgPD0gMCkgcmV0dXJuIHsgZGF5czogMCwgaG91cnM6IDAsIGlzRXhwaXJlZDogdHJ1ZSB9O1xuICBjb25zdCB0b3RhbEhvdXJzID0gTWF0aC5mbG9vcih0b3RhbE1zIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gIHJldHVybiB7XG4gICAgZGF5czogTWF0aC5mbG9vcih0b3RhbEhvdXJzIC8gMjQpLFxuICAgIGhvdXJzOiB0b3RhbEhvdXJzICUgMjQsXG4gICAgaXNFeHBpcmVkOiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXJnZW5jeVRpZXIgPSAndXJnZW50JyB8ICd3YXJuaW5nJyB8ICdwb3NpdGl2ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5VGllcihkYXlzOiBudW1iZXIpOiBVcmdlbmN5VGllciB7XG4gIGlmIChkYXlzIDwgNSkgcmV0dXJuICd1cmdlbnQnO1xuICBpZiAoZGF5cyA8PSAxMykgcmV0dXJuICd3YXJuaW5nJztcbiAgcmV0dXJuICdwb3NpdGl2ZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5QmFkZ2UoXG4gIGR1ZUJ5OiBzdHJpbmcsXG4gIHN0YXR1czogc3RyaW5nLFxuKTogeyBsYWJlbDogc3RyaW5nOyB0eXBlOiBVcmdlbmN5VGllciB9IHwgbnVsbCB7XG4gIGlmIChpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG5cbiAgaWYgKHRpbWUuaXNFeHBpcmVkKSByZXR1cm4geyBsYWJlbDogJ0V4cGlyZWQnLCB0eXBlOiAndXJnZW50JyB9O1xuICBpZiAodGltZS5kYXlzIDwgNSkgcmV0dXJuIHsgbGFiZWw6IGAke3RpbWUuZGF5c31kICR7dGltZS5ob3Vyc31oIGxlZnRgLCB0eXBlOiB0aWVyIH07XG4gIHJldHVybiB7IGxhYmVsOiBgJHt0aW1lLmRheXN9ZCBsZWZ0YCwgdHlwZTogdGllciB9O1xufVxuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRXJyb3JCYW5uZXIudHN4XG5cbmltcG9ydCB7IEJhbm5lciwgQm94LCBCdXR0b24gfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRXJyb3JCYW5uZXJQcm9wcyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25SZXRyeT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVycm9yQmFubmVyID0gKHsgbWVzc2FnZSwgb25SZXRyeSB9OiBFcnJvckJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgIHRpdGxlPVwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgICAgICBkZXNjcmlwdGlvbj17bWVzc2FnZX1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgb25SZXRyeSA/IChcbiAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17b25SZXRyeX0+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJhbm5lcjtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB7IGdldFRpbWVSZW1haW5pbmcsIGdldFVyZ2VuY3lUaWVyLCBpc1Jlc29sdmVkIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERlYWRsaW5lVGltZXJQcm9wcyB7XG4gIGR1ZUJ5OiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5jb25zdCBEZWFkbGluZVRpbWVyID0gKHsgZHVlQnksIHN0YXR1cyB9OiBEZWFkbGluZVRpbWVyUHJvcHMpID0+IHtcbiAgY29uc3QgWywgc2V0VGlja10gPSB1c2VTdGF0ZSgwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gc2V0VGljaygodCkgPT4gdCArIDEpLCA2MF8wMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGlkKTtcbiAgfSwgW2R1ZUJ5XSk7XG5cbiAgaWYgKCFkdWVCeSB8fCBpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG4gIGNvbnN0IGlzVXJnZW50ID0gdGltZS5kYXlzIDwgNSAmJiAhdGltZS5pc0V4cGlyZWQ7XG5cbiAgY29uc3QgbGFiZWwgPSB0aW1lLmlzRXhwaXJlZFxuICAgID8gJ0RlYWRsaW5lIHBhc3NlZCdcbiAgICA6IHRpbWUuZGF5cyA9PT0gMFxuICAgICAgPyBgJHt0aW1lLmhvdXJzfWggcmVtYWluaW5nYFxuICAgICAgOiBgJHt0aW1lLmRheXN9ZCAke3RpbWUuaG91cnN9aCByZW1haW5pbmdgO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgY3NzPXt7XG4gICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsIGNvbG9yOiBpc1VyZ2VudCA/ICdjcml0aWNhbCcgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge2lzVXJnZW50ID8gJ1Jlc3BvbmQgbm93JyA6ICdSZXNwb25zZSBkZWFkbGluZSd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCYWRnZSB0eXBlPXt0aW1lLmlzRXhwaXJlZCA/ICd1cmdlbnQnIDogdGllcn0+e2xhYmVsfTwvQmFkZ2U+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWFkbGluZVRpbWVyO1xuIiwgImltcG9ydCB7IEJveCwgQmFkZ2UsIERpdmlkZXIsIElubGluZSwgTGluaywgU3Bpbm5lciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UgfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZU92ZXJ2aWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSW5mb1Jvd1Byb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZnVuY3Rpb24gSW5mb1Jvdyh7IGxhYmVsLCB2YWx1ZSB9OiBJbmZvUm93UHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PntsYWJlbH08L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57dmFsdWV9PC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ3Nob3J0JyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmNvbnN0IERpc3B1dGVPdmVydmlldyA9ICh7IGRpc3B1dGUsIGxvYWRpbmcgfTogRGlzcHV0ZU92ZXJ2aWV3UHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIHsvKiBIZWFkZXI6IGFtb3VudCArIHN0YXR1cyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5cbiAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ3VzdG9tZXIgaW5mbyAqL31cbiAgICAgIHsoZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8IGRpc3B1dGUuY3VzdG9tZXJfZW1haWwpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQ3VzdG9tZXJcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfZW1haWwgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJFbWFpbFwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgey8qIEVucmljaGVkIHNlY3Rpb24gKi99XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY2FyZF9icmFuZCAmJiBkaXNwdXRlLmNhcmRfbGFzdDQgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXJkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ake2Rpc3B1dGUuY2FyZF9icmFuZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUuY2FyZF9icmFuZC5zbGljZSgxKX0gZW5kaW5nIGluICR7ZGlzcHV0ZS5jYXJkX2xhc3Q0fWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIlRyYW5zYWN0aW9uIGRhdGVcIiB2YWx1ZT17Zm9ybWF0RGF0ZShkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRGVzY3JpcHRpb25cIiB2YWx1ZT17ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJCaWxsaW5nIGFkZHJlc3NcIiB2YWx1ZT17ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5yZWNlaXB0X3VybCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIlJlY2VpcHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17PExpbmsgaHJlZj17ZGlzcHV0ZS5yZWNlaXB0X3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+VmlldyByZWNlaXB0PC9MaW5rPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5tZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhkaXNwdXRlLm1ldGFkYXRhKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhkaXNwdXRlLm1ldGFkYXRhKS5tYXAoKFtrZXksIHZhbF0pID0+IChcbiAgICAgICAgICAgICAgICA8SW5mb1JvdyBrZXk9e2tleX0gbGFiZWw9e2tleX0gdmFsdWU9e3ZhbH0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXI6IElEcyAqL31cbiAgICAgIDxEaXZpZGVyIC8+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5EaXNwdXRlOiB7ZGlzcHV0ZS5pZH08L0lubGluZT5cbiAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2lkICYmIChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PkNoYXJnZToge2Rpc3B1dGUuY2hhcmdlX2lkfTwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlT3ZlcnZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIENvYWNoSGVhZGVyUHJvcHMge1xuICBoZWFkbGluZTogc3RyaW5nO1xuICBzdW1tYXJ5OiBzdHJpbmc7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xuICBkYXlzUmVtYWluaW5nPzogbnVtYmVyO1xufVxuXG5jb25zdCBDb2FjaEhlYWRlciA9ICh7IGhlYWRsaW5lLCBzdW1tYXJ5LCB1cmdlbmN5TW9kZSwgZGF5c1JlbWFpbmluZyB9OiBDb2FjaEhlYWRlclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge2hlYWRsaW5lfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlICYmIGRheXNSZW1haW5pbmcgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gYFlvdSBoYXZlICR7ZGF5c1JlbWFpbmluZ30gZGF5JHtkYXlzUmVtYWluaW5nID09PSAxID8gJycgOiAncyd9LiBGb2N1cyBvbiB0aGUgZXNzZW50aWFscyBiZWxvdy5gXG4gICAgICAgICAgOiBzdW1tYXJ5fVxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2FjaEhlYWRlcjtcbiIsICJpbXBvcnQgeyBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IFBsYXlib29rRGF0YSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBRdWlja0FjdGlvbnNQcm9wcyB7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGE7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBkZXJpdmVBY3Rpb25zKHBsYXlib29rOiBQbGF5Ym9va0RhdGEpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3QgbWFuZGF0b3J5SXRlbXMgPSBwbGF5Ym9vay5ldmlkZW5jZV9jaGVja2xpc3RcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSAnbWFuZGF0b3J5JyAmJiBpdGVtLmNvbnRleHQgPT09ICdhbGwnKVxuICAgIC5zbGljZSgwLCAzKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIG1hbmRhdG9yeUl0ZW1zKSB7XG4gICAgYWN0aW9ucy5wdXNoKGBDb25maXJtIHlvdSBoYXZlOiAke2l0ZW0uaXRlbS50b0xvd2VyQ2FzZSgpfWApO1xuICB9XG5cbiAgY29uc3QgdG9wTWlzdGFrZXMgPSBwbGF5Ym9vay5jb21tb25fbWlzdGFrZXMuc2xpY2UoMCwgMik7XG4gIGZvciAoY29uc3QgbWlzdGFrZSBvZiB0b3BNaXN0YWtlcykge1xuICAgIGNvbnN0IHJlZnJhbWVkID0gbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ05vdCAnKVxuICAgICAgPyBgTWFrZSBzdXJlIHlvdSdyZSAke21pc3Rha2UubWlzdGFrZS5zbGljZSg0KS50b0xvd2VyQ2FzZSgpfWBcbiAgICAgIDogbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ1NraXBwaW5nICcpXG4gICAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgdXNpbmcgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoOSkudG9Mb3dlckNhc2UoKX1gXG4gICAgICAgIDogYENoZWNrOiAke21pc3Rha2UubWlzdGFrZS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgYWN0aW9ucy5wdXNoKHJlZnJhbWVkKTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zLnNsaWNlKDAsIDUpO1xufVxuXG5jb25zdCBRdWlja0FjdGlvbnMgPSAoeyBwbGF5Ym9vaywgdXJnZW5jeU1vZGUgfTogUXVpY2tBY3Rpb25zUHJvcHMpID0+IHtcbiAgY29uc3QgaXRlbXMgPSB1cmdlbmN5TW9kZVxuICAgID8gcGxheWJvb2sudXJnZW5jeV9lc3NlbnRpYWxzLm9yZGVyZWRfaXRlbXNcbiAgICA6IGRlcml2ZUFjdGlvbnMocGxheWJvb2spO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlID8gJ0ZvY3VzIG9uIHRoZXNlIGVzc2VudGlhbHMnIDogJ1lvdXIgbmV4dCBzdGVwcyd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIHtpdGVtcy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3N1cmZhY2UnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdzbWFsbCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMS8xMicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAge2luZGV4ICsgMX0uXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+e3RleHR9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgRG9uJ3Qgd29ycnksIHdlJ2xsIHdhbGsgeW91IHRocm91Z2ggZWFjaCBvZiB0aGVzZSBvbiB0aGUgbmV4dCBzdGVwLlxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBRdWlja0FjdGlvbnM7XG4iLCAiaW1wb3J0IHsgQWNjb3JkaW9uLCBBY2NvcmRpb25JdGVtLCBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBMZWFybk1vcmVQcm9wcyB7XG4gIGlzc3VlclN1bW1hcnk6IHN0cmluZztcbiAgYWNxdWlyZXJTdW1tYXJ5OiBzdHJpbmc7XG59XG5cbmNvbnN0IExlYXJuTW9yZSA9ICh7IGlzc3VlclN1bW1hcnksIGFjcXVpcmVyU3VtbWFyeSB9OiBMZWFybk1vcmVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxBY2NvcmRpb24+XG4gICAgICA8QWNjb3JkaW9uSXRlbSB0aXRsZT1cIldoeSB0aGlzIG1hdHRlcnNcIj5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIFdoYXQgdGhlIGJhbmsgY2hlY2tzXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7aXNzdWVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCBoYXBwZW5zIHRvIHlvdXIgcmVzcG9uc2VcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHthY3F1aXJlclN1bW1hcnl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0FjY29yZGlvbkl0ZW0+XG4gICAgPC9BY2NvcmRpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMZWFybk1vcmU7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFubmVyLCBEaXZpZGVyLCBJbmxpbmUsIExpbmsgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgcGF0Y2hCYWNrZW5kLCBmZXRjaEJhY2tlbmQgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldFN0cmlwZUZpZWxkUmVzdWx0IH0gZnJvbSAnLi4vLi4vbGliL3N0cmlwZS1maWVsZC1zdGF0dXMnO1xuaW1wb3J0IHR5cGUgeyBTdHJpcGVGaWVsZFN0YXR1cywgU3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuLi8uLi9saWIvc3RyaXBlLWZpZWxkLXN0YXR1cyc7XG5pbXBvcnQgQ2hlY2tsaXN0UHJvZ3Jlc3MgZnJvbSAnLi9DaGVja2xpc3RQcm9ncmVzcyc7XG5pbXBvcnQgQ2hlY2tsaXN0SXRlbSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBFeHBhbmRlZFNlY3Rpb24gfSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuXG4vLyBSZS1leHBvcnQgZm9yIGNvbnN1bWVycyB0aGF0IGltcG9ydGVkIGZyb20gdGhpcyBtb2R1bGVcbmV4cG9ydCB0eXBlIHsgU3RyaXBlRmllbGRTdGF0dXMsIFN0cmlwZUZpZWxkUmVzdWx0IH07XG5cbmludGVyZmFjZSBFdmlkZW5jZUNoZWNrbGlzdFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgaXNVcmdlbnQ6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc6IG51bWJlcjtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxudHlwZSBDaGVja2xpc3RTdGF0ZSA9IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xudHlwZSBOb3Rlc1N0YXRlID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuY29uc3QgQ0FURUdPUllfT1JERVI6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXVtdID0gWydtYW5kYXRvcnknLCAncmVjb21tZW5kZWQnLCAnc2l0dWF0aW9uYWwnXTtcblxuY29uc3QgQ0FURUdPUllfTEFCRUxTOiBSZWNvcmQ8RXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddLCBzdHJpbmc+ID0ge1xuICBtYW5kYXRvcnk6ICdNYW5kYXRvcnknLFxuICByZWNvbW1lbmRlZDogJ1JlY29tbWVuZGVkJyxcbiAgc2l0dWF0aW9uYWw6ICdTaXR1YXRpb25hbCcsXG59O1xuXG4vKipcbiAqIEJ1aWxkcyB0aGUgaW5pdGlhbCBjaGVja2xpc3Qgc3RhdGUgYnkgbWVyZ2luZzpcbiAqIDEuIERlZmF1bHQgKGFsbCBmYWxzZSlcbiAqIDIuIEF1dG8tcG9wdWxhdGVkIGl0ZW1zICh0cnVlIGlmIFN0cmlwZSBkYXRhIGV4aXN0cylcbiAqIDMuIFNhdmVkIHN0YXRlIGZyb20gU3VwYWJhc2UgKG92ZXJyaWRlcyBldmVyeXRoaW5nKVxuICovXG5mdW5jdGlvbiBidWlsZEluaXRpYWxTdGF0ZShcbiAgaXRlbXM6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVtdLFxuICBkaXNwdXRlOiBEaXNwdXRlLFxuKTogQ2hlY2tsaXN0U3RhdGUge1xuICBjb25zdCBzdGF0ZTogQ2hlY2tsaXN0U3RhdGUgPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgc3RhdGVbaXRlbS5rZXldID0gZmFsc2U7XG4gICAgY29uc3QgcmVzdWx0ID0gZ2V0U3RyaXBlRmllbGRSZXN1bHQoaXRlbSwgZGlzcHV0ZSk7XG4gICAgaWYgKHJlc3VsdD8uc3RhdHVzID09PSAncG9zaXRpdmUnKSB7XG4gICAgICBzdGF0ZVtpdGVtLmtleV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSkpIHtcbiAgICAgIGlmIChrZXkgaW4gc3RhdGUpIHtcbiAgICAgICAgc3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IEV2aWRlbmNlQ2hlY2tsaXN0ID0gKHsgZGlzcHV0ZSwgcGxheWJvb2ssIGNvbnRleHQsIGlzVXJnZW50LCBkYXlzUmVtYWluaW5nLCBzdWJtaXR0ZWQgfTogRXZpZGVuY2VDaGVja2xpc3RQcm9wcykgPT4ge1xuICBjb25zdCBpdGVtcyA9IHBsYXlib29rPy5ldmlkZW5jZV9jaGVja2xpc3QgPz8gW107XG4gIGNvbnN0IFtjaGVja2xpc3RTdGF0ZSwgc2V0Q2hlY2tsaXN0U3RhdGVdID0gdXNlU3RhdGU8Q2hlY2tsaXN0U3RhdGU+KCgpID0+XG4gICAgYnVpbGRJbml0aWFsU3RhdGUoaXRlbXMsIGRpc3B1dGUpLFxuICApO1xuICBjb25zdCBbbm90ZXNTdGF0ZSwgc2V0Tm90ZXNTdGF0ZV0gPSB1c2VTdGF0ZTxOb3Rlc1N0YXRlPihcbiAgICAoKSA9PiBkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcyA/PyB7fSxcbiAgKTtcbiAgLy8gVC1jYXRlZ29yeSAobmFycmF0aXZlX29ubHkpIGl0ZW1zIGRlZmF1bHQgdG8gaGF2aW5nIHRoZWlyIG5vdGVzIHNlY3Rpb25cbiAgLy8gZXhwYW5kZWQgLS0gaXQncyB0aGUgb25seSBwbGFjZSBtZXJjaGFudHMgY2FuIGNvbnRyaWJ1dGUgZm9yIHRoZXNlIGl0ZW1zLFxuICAvLyBzbyBjb2xsYXBzaW5nIGl0IGh1cnRzIGRpc2NvdmVyYWJpbGl0eS4gKFdJTi00OSlcbiAgY29uc3QgW2V4cGFuZGVkU2VjdGlvbnMsIHNldEV4cGFuZGVkU2VjdGlvbnNdID0gdXNlU3RhdGU8TWFwPHN0cmluZywgU2V0PEV4cGFuZGVkU2VjdGlvbj4+PihcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBpbml0aWFsID0gbmV3IE1hcDxzdHJpbmcsIFNldDxFeHBhbmRlZFNlY3Rpb24+PigpO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChpdGVtLm5hcnJhdGl2ZV9vbmx5KSB7XG4gICAgICAgICAgaW5pdGlhbC5zZXQoaXRlbS5rZXksIG5ldyBTZXQ8RXhwYW5kZWRTZWN0aW9uPihbJ25vdGVzJ10pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGluaXRpYWw7XG4gICAgfVxuICApO1xuICBjb25zdCBbZmlsZXNTdGF0ZSwgc2V0RmlsZXNTdGF0ZV0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFdmlkZW5jZUZpbGUgfCBudWxsPj4oe30pO1xuICBjb25zdCBbc2hvd0Z1bGxDaGVja2xpc3QsIHNldFNob3dGdWxsQ2hlY2tsaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWZzIGZvciBkZWJvdW5jZWQgc2F2ZXNcbiAgY29uc3QgY2hlY2tsaXN0VGltZW91dFJlZiA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBub3Rlc1RpbWVvdXRSZWYgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICAvLyBSZWJ1aWxkIHN0YXRlIHdoZW4gZGlzcHV0ZSBvciBwbGF5Ym9vayBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbmV4dENoZWNrbGlzdCA9IGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKTtcbiAgICBzZXRDaGVja2xpc3RTdGF0ZShuZXh0Q2hlY2tsaXN0KTtcbiAgICBsYXRlc3RDaGVja2xpc3RSZWYuY3VycmVudCA9IG5leHRDaGVja2xpc3Q7XG4gICAgY29uc3QgbmV4dE5vdGVzID0gZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMgPz8ge307XG4gICAgc2V0Tm90ZXNTdGF0ZShuZXh0Tm90ZXMpO1xuICAgIGxhdGVzdE5vdGVzUmVmLmN1cnJlbnQgPSBuZXh0Tm90ZXM7XG4gICAgLy8gUmUtc2VlZCBULWl0ZW0gbm90ZXMgYXMgZXhwYW5kZWQgd2hlbiBzd2l0Y2hpbmcgcGxheWJvb2tzLiAoV0lOLTQ5KVxuICAgIGNvbnN0IG5leHRFeHBhbmRlZCA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8RXhwYW5kZWRTZWN0aW9uPj4oKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChpdGVtLm5hcnJhdGl2ZV9vbmx5KSB7XG4gICAgICAgIG5leHRFeHBhbmRlZC5zZXQoaXRlbS5rZXksIG5ldyBTZXQ8RXhwYW5kZWRTZWN0aW9uPihbJ25vdGVzJ10pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0RXhwYW5kZWRTZWN0aW9ucyhuZXh0RXhwYW5kZWQpO1xuICB9LCBbZGlzcHV0ZS5pZCwgZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUsIGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzLCBwbGF5Ym9vaz8ucmVhc29uX2NvZGVdKTtcblxuICAvLyBGZXRjaCBldmlkZW5jZSBmaWxlcyBvbiBtb3VudCAvIGRpc3B1dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hGaWxlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZVtdIH0+KFxuICAgICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZmlsZU1hcDogUmVjb3JkPHN0cmluZywgRXZpZGVuY2VGaWxlIHwgbnVsbD4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgZmlsZU1hcFtmaWxlLmNoZWNrbGlzdF9pdGVtX2tleV0gPSBmaWxlO1xuICAgICAgICB9XG4gICAgICAgIHNldEZpbGVzU3RhdGUoZmlsZU1hcCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGV2aWRlbmNlIGZpbGVzOicsIGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICBmZXRjaEZpbGVzKCk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgLy8gSG9sZHMgdGhlIGxhdGVzdCBjaGVja2xpc3Qgc3RhdGUgc28gdGhlIHVubW91bnQgZmx1c2ggY2FuIHBlcnNpc3QgaXRcbiAgLy8gd2l0aG91dCByYWNpbmcgYWdhaW5zdCBSZWFjdCByZS1yZW5kZXJzLiAoV0lOLTQ5KVxuICBjb25zdCBsYXRlc3RDaGVja2xpc3RSZWYgPSB1c2VSZWY8Q2hlY2tsaXN0U3RhdGU+KHt9KTtcblxuICBjb25zdCBwZXJzaXN0Q2hlY2tsaXN0ID0gdXNlQ2FsbGJhY2soKG5ld1N0YXRlOiBDaGVja2xpc3RTdGF0ZSkgPT4ge1xuICAgIGxhdGVzdENoZWNrbGlzdFJlZi5jdXJyZW50ID0gbmV3U3RhdGU7XG4gICAgaWYgKGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgfVxuICAgIGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgY2hlY2tsaXN0X3N0YXRlOiBsYXRlc3RDaGVja2xpc3RSZWYuY3VycmVudCxcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2hlY2tsaXN0IHN0YXRlOicsIGVycik7XG4gICAgICB9KTtcbiAgICB9LCA1MDApO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIC8vIEhvbGRzIHRoZSBsYXRlc3Qgbm90ZXMgc3RhdGUgc28gZmx1c2hOb3RlcyBjYW4gcmVhZCB0aGUgY3VycmVudCB2YWx1ZXNcbiAgLy8gd2l0aG91dCBkZXBlbmRpbmcgb24gUmVhY3QgcmUtcmVuZGVycy4gVGhlIGRlYm91bmNlZCBzYXZlIGFuZCB0aGUgZXhwbGljaXRcbiAgLy8gU2F2ZSBidXR0b24gYm90aCByZWFkIGZyb20gaGVyZS5cbiAgY29uc3QgbGF0ZXN0Tm90ZXNSZWYgPSB1c2VSZWY8Tm90ZXNTdGF0ZT4oe30pO1xuXG4gIGNvbnN0IGZsdXNoTm90ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKG5vdGVzVGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgbm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgY2hlY2tsaXN0X25vdGVzOiBsYXRlc3ROb3Rlc1JlZi5jdXJyZW50LFxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGNoZWNrbGlzdCBub3RlczonLCBlcnIpO1xuICAgIH0pO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IHBlcnNpc3ROb3RlcyA9IHVzZUNhbGxiYWNrKChuZXdOb3RlczogTm90ZXNTdGF0ZSkgPT4ge1xuICAgIGxhdGVzdE5vdGVzUmVmLmN1cnJlbnQgPSBuZXdOb3RlcztcbiAgICAvLyBObyBkZWJvdW5jZSAtLSBub3RlcyBhcmUgc2hvcnQsIHR5cGVkIGluZnJlcXVlbnRseSwgYW5kIHRoZSBjb3N0IG9mXG4gICAgLy8gbG9zaW5nIGEgbm90ZSB0byBhIGRlYm91bmNlIHJhY2UgKFdJTi00OSBRQSkgZmFyIGV4Y2VlZHMgdGhlIGNvc3Qgb2ZcbiAgICAvLyBhIGZldyBleHRyYSBQQVRDSCByZXF1ZXN0cy4gRXZlcnkga2V5c3Ryb2tlIGNvbW1pdHMgaW1tZWRpYXRlbHkuXG4gICAgaWYgKG5vdGVzVGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgbm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgY2hlY2tsaXN0X25vdGVzOiBuZXdOb3RlcyxcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaGVja2xpc3Qgbm90ZXM6JywgZXJyKTtcbiAgICB9KTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICAvLyBTYWZldHkgbmV0OiBpZiB0aGUgd2l6YXJkIHVubW91bnRzICh1c2VyIGNsb3NlcyB0aGUgRm9jdXNWaWV3LCBuYXZpZ2F0ZXNcbiAgLy8gdG8gYSBkaWZmZXJlbnQgZGlzcHV0ZSwgZXRjLikgYmVmb3JlIHRoZSBkZWJvdW5jZSBmaXJlcywgZmx1c2ggYW55XG4gIC8vIHBlbmRpbmcgbm90ZXMgYW5kIGNoZWNrbGlzdCBzdGF0ZSBpbW1lZGlhdGVseSBzbyBub3RoaW5nIGlzIGxvc3QuIChXSU4tNDkpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgICBub3Rlc1RpbWVvdXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgICAgY2hlY2tsaXN0X25vdGVzOiBsYXRlc3ROb3Rlc1JlZi5jdXJyZW50LFxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZsdXNoIGNoZWNrbGlzdCBub3RlcyBvbiB1bm1vdW50OicsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgICAgY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICBjaGVja2xpc3Rfc3RhdGU6IGxhdGVzdENoZWNrbGlzdFJlZi5jdXJyZW50LFxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZsdXNoIGNoZWNrbGlzdCBzdGF0ZSBvbiB1bm1vdW50OicsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZSA9IHVzZUNhbGxiYWNrKChpdGVtS2V5OiBzdHJpbmcpID0+IHtcbiAgICBzZXRDaGVja2xpc3RTdGF0ZSgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IC4uLnByZXYsIFtpdGVtS2V5XTogIXByZXZbaXRlbUtleV0gfTtcbiAgICAgIHBlcnNpc3RDaGVja2xpc3QobmV3U3RhdGUpO1xuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH0pO1xuICB9LCBbcGVyc2lzdENoZWNrbGlzdF0pO1xuXG4gIGNvbnN0IGhhbmRsZU5vdGVzQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGl0ZW1LZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHNldE5vdGVzU3RhdGUoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld05vdGVzID0geyAuLi5wcmV2LCBbaXRlbUtleV06IHZhbHVlIH07XG4gICAgICBwZXJzaXN0Tm90ZXMobmV3Tm90ZXMpO1xuICAgICAgcmV0dXJuIG5ld05vdGVzO1xuICAgIH0pO1xuICB9LCBbcGVyc2lzdE5vdGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IHVzZUNhbGxiYWNrKChpdGVtS2V5OiBzdHJpbmcsIGZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGwpID0+IHtcbiAgICBzZXRGaWxlc1N0YXRlKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbaXRlbUtleV06IGZpbGUgfSkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VjdGlvblRvZ2dsZSA9IHVzZUNhbGxiYWNrKChpdGVtS2V5OiBzdHJpbmcsIHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4ge1xuICAgIHNldEV4cGFuZGVkU2VjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBuZXcgTWFwKHByZXYpO1xuICAgICAgY29uc3Qgc2VjdGlvbnMgPSBuZXcgU2V0KHByZXYuZ2V0KGl0ZW1LZXkpID8/IFtdKTtcbiAgICAgIGlmIChzZWN0aW9ucy5oYXMoc2VjdGlvbikpIHtcbiAgICAgICAgc2VjdGlvbnMuZGVsZXRlKHNlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnMuYWRkKHNlY3Rpb24pO1xuICAgICAgfVxuICAgICAgbmV4dC5zZXQoaXRlbUtleSwgc2VjdGlvbnMpO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICAvLyBObyBwbGF5Ym9vayBmYWxsYmFja1xuICBpZiAoIXBsYXlib29rIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICB0aXRsZT1cIk5vIGV2aWRlbmNlIGNoZWNrbGlzdCBhdmFpbGFibGVcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiTm8gc3BlY2lmaWMgZXZpZGVuY2UgY2hlY2tsaXN0IGZvciB0aGlzIHJlYXNvbiBjb2RlLiBVc2UgU3RyaXBlJ3MgZ2VuZXJhbCBldmlkZW5jZSBndWlkZWxpbmVzIGZvciB5b3VyIHJlc3BvbnNlLlwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgLy8gRmlsdGVyIGZvciB1cmdlbmN5IG1vZGVcbiAgY29uc3QgZWZmZWN0aXZlVXJnZW5jeSA9IGlzVXJnZW50ICYmICFzaG93RnVsbENoZWNrbGlzdDtcbiAgbGV0IGRpc3BsYXlJdGVtcyA9IGl0ZW1zO1xuICBpZiAoZWZmZWN0aXZlVXJnZW5jeSkge1xuICAgIGRpc3BsYXlJdGVtcyA9IGl0ZW1zXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnVyZ2VuY3lfZXNzZW50aWFsKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IChhLnVyZ2VuY3lfb3JkZXIgPz8gOTk5KSAtIChiLnVyZ2VuY3lfb3JkZXIgPz8gOTk5KSk7XG4gIH1cblxuICAvLyBHcm91cCBieSBjYXRlZ29yeVxuICBjb25zdCBncm91cGVkID0gQ0FURUdPUllfT1JERVIubWFwKChjYXRlZ29yeSkgPT4gKHtcbiAgICBjYXRlZ29yeSxcbiAgICBsYWJlbDogQ0FURUdPUllfTEFCRUxTW2NhdGVnb3J5XSxcbiAgICBpdGVtczogZGlzcGxheUl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpLFxuICB9KSkuZmlsdGVyKChncm91cCkgPT4gZ3JvdXAuaXRlbXMubGVuZ3RoID4gMCk7XG5cbiAgLy8gUHJvZ3Jlc3MgY291bnRzIChhbHdheXMgYWdhaW5zdCBmdWxsIGxpc3QsIG5vdCBmaWx0ZXJlZClcbiAgY29uc3QgdG90YWxJdGVtcyA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgY29tcGxldGVkSXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGNoZWNrbGlzdFN0YXRlW2l0ZW0ua2V5XSkubGVuZ3RoO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIHtzdWJtaXR0ZWQgPyAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgdGl0bGU9XCJFdmlkZW5jZSBzdWJtaXR0ZWRcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiWW91ciBldmlkZW5jZSBoYXMgYmVlbiBzdWJtaXR0ZWQgdG8gU3RyaXBlLiBGaWxlcyBhbmQgY2hlY2tsaXN0IGl0ZW1zIGFyZSBub3cgcmVhZC1vbmx5LlwiXG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgIHRpdGxlPVwiR2F0aGVyIHlvdXIgZXZpZGVuY2VcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiSGVyZSdzIHdoYXQgeW91J2xsIG5lZWQgdG8gYnVpbGQgeW91ciBjYXNlLiBFeHBhbmQgZWFjaCBpdGVtIHRvIHNlZSB3aHkgaXQgbWF0dGVycyBhbmQgam90IGRvd24gbm90ZXMgYXMgeW91IGdvLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8Q2hlY2tsaXN0UHJvZ3Jlc3MgY29tcGxldGVkPXtjb21wbGV0ZWRJdGVtc30gdG90YWw9e3RvdGFsSXRlbXN9IC8+XG5cbiAgICAgIHtpc1VyZ2VudCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgICAgdGl0bGU9e2Ake2RheXNSZW1haW5pbmd9IGRheSR7ZGF5c1JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfSBsZWZ0IHRvIHJlc3BvbmRgfVxuICAgICAgICAgICAgZGVzY3JpcHRpb249e3Nob3dGdWxsQ2hlY2tsaXN0XG4gICAgICAgICAgICAgID8gJ1Nob3dpbmcgYWxsIGV2aWRlbmNlIGl0ZW1zLidcbiAgICAgICAgICAgICAgOiAnU2hvd2luZyBvbmx5IGVzc2VudGlhbCBpdGVtcyB0byBtYXhpbWl6ZSB5b3VyIGNoYW5jZXMuJ31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxMaW5rIG9uUHJlc3M9eygpID0+IHNldFNob3dGdWxsQ2hlY2tsaXN0KCFzaG93RnVsbENoZWNrbGlzdCl9PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICAgICAgICB7c2hvd0Z1bGxDaGVja2xpc3QgPyAnU2hvdyBlc3NlbnRpYWxzIG9ubHknIDogJ1ZpZXcgZnVsbCBjaGVja2xpc3QnfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtncm91cGVkLm1hcCgoeyBjYXRlZ29yeSwgbGFiZWwsIGl0ZW1zOiBncm91cEl0ZW1zIH0sIGdyb3VwSW5kZXgpID0+IChcbiAgICAgICAgPEJveCBrZXk9e2NhdGVnb3J5fSBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIHtncm91cEluZGV4ID4gMCAmJiA8RGl2aWRlciAvPn1cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdzZWNvbmRhcnknLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICB7Z3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmlwZVJlc3VsdCA9IGdldFN0cmlwZUZpZWxkUmVzdWx0KGl0ZW0sIGRpc3B1dGUpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPENoZWNrbGlzdEl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ua2V5fVxuICAgICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17ISFjaGVja2xpc3RTdGF0ZVtpdGVtLmtleV19XG4gICAgICAgICAgICAgICAgc3RyaXBlRmllbGRSZXN1bHQ9e3N0cmlwZVJlc3VsdCA/PyB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgZXhwYW5kZWRTZWN0aW9ucz17ZXhwYW5kZWRTZWN0aW9ucy5nZXQoaXRlbS5rZXkpID8/IG5ldyBTZXQoKX1cbiAgICAgICAgICAgICAgICBub3Rlcz17bm90ZXNTdGF0ZVtpdGVtLmtleV0gPz8gJyd9XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdGaWxlPXtmaWxlc1N0YXRlW2l0ZW0ua2V5XSA/PyBudWxsfVxuICAgICAgICAgICAgICAgIGRpc3B1dGVJZD17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IGhhbmRsZVRvZ2dsZShpdGVtLmtleSl9XG4gICAgICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlPXsoc2VjdGlvbikgPT4gaGFuZGxlU2VjdGlvblRvZ2dsZShpdGVtLmtleSwgc2VjdGlvbil9XG4gICAgICAgICAgICAgICAgb25Ob3Rlc0NoYW5nZT17KHZhbHVlKSA9PiBoYW5kbGVOb3Rlc0NoYW5nZShpdGVtLmtleSwgdmFsdWUpfVxuICAgICAgICAgICAgICAgIG9uU2F2ZU5vdGVzPXtmbHVzaE5vdGVzfVxuICAgICAgICAgICAgICAgIG9uRmlsZUNoYW5nZT17KGZpbGUpID0+IGhhbmRsZUZpbGVDaGFuZ2UoaXRlbS5rZXksIGZpbGUpfVxuICAgICAgICAgICAgICAgIHN1Ym1pdHRlZD17c3VibWl0dGVkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5cbiAgICAgICAgWW91ciBwcm9ncmVzcyBhbmQgbm90ZXMgYXJlIHNhdmVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2aWRlbmNlQ2hlY2tsaXN0O1xuIiwgImltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogU3RhdHVzIG9mIGEgc3RyaXBlX2ZpZWxkLWxpbmtlZCBjaGVja2xpc3QgaXRlbTpcbiAqIC0gJ3Bvc2l0aXZlJzogZGF0YSBleGlzdHMgYW5kIGhlbHBzIHRoZSBjYXNlIChhdXRvLWNoZWNrLCBzaG93IHZhbHVlKVxuICogLSAndW5hdmFpbGFibGUnOiB2ZXJpZmljYXRpb24gd2Fzbid0IGNvbGxlY3RlZCBhdCBjaGVja291dCAoZ3JleSBvdXQsIGV4cGxhaW4pXG4gKiAtICduZWdhdGl2ZSc6IHZlcmlmaWNhdGlvbiBmYWlsZWQsIGh1cnRzIHRoZSBjYXNlICh3YXJuIG1lcmNoYW50KVxuICogLSBudWxsOiBubyBzdHJpcGVfZmllbGQgb3Igbm90IGEgbWFwcGVkIGl0ZW1cbiAqL1xuZXhwb3J0IHR5cGUgU3RyaXBlRmllbGRTdGF0dXMgPSAncG9zaXRpdmUnIHwgJ3VuYXZhaWxhYmxlJyB8ICduZWdhdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyaXBlRmllbGRSZXN1bHQge1xuICBzdGF0dXM6IFN0cmlwZUZpZWxkU3RhdHVzO1xuICB2YWx1ZTogc3RyaW5nO1xuICBndWlkYW5jZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDaGVja1ZhbHVlKHJhdzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGlmICghcmF3KSByZXR1cm4gJ05vdCBjaGVja2VkJztcbiAgc3dpdGNoIChyYXcpIHtcbiAgICBjYXNlICdwYXNzJzogcmV0dXJuICdNYXRjaCc7XG4gICAgY2FzZSAnZmFpbCc6IHJldHVybiAnTm8gbWF0Y2gnO1xuICAgIGNhc2UgJ3VuYXZhaWxhYmxlJzogcmV0dXJuICdOb3QgY2hlY2tlZCc7XG4gICAgY2FzZSAndW5jaGVja2VkJzogcmV0dXJuICdOb3QgY2hlY2tlZCc7XG4gICAgZGVmYXVsdDogcmV0dXJuIHJhdztcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKHRzOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IERhdGUodHMgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJywgeWVhcjogJ251bWVyaWMnLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3koYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5ID8/ICd1c2QnLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIGNoZWNrbGlzdCBpdGVtIGFuZCBhIGRpc3B1dGUsIGNvbXB1dGUgdGhlIGF1dG8tZmlsbCBzdGF0dXMgZm9yIGFueVxuICogaXRlbSB0aGF0IG1hcHMgdG8gYSBzdHJpcGVfZmllbGQuIFJldHVybnMgbnVsbCBmb3IgaXRlbXMgbm90IG1hcHBlZCBvciB3aXRoXG4gKiBubyBhdXRvLWZpbGwgZGF0YSBhdmFpbGFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpcGVGaWVsZFJlc3VsdChcbiAgaXRlbTogRXZpZGVuY2VDaGVja2xpc3RJdGVtLFxuICBkaXNwdXRlOiBEaXNwdXRlLFxuKTogU3RyaXBlRmllbGRSZXN1bHQgfCBudWxsIHtcbiAgY29uc3QgZmllbGQgPSBpdGVtLnN0cmlwZV9maWVsZDtcbiAgaWYgKCFmaWVsZCkgcmV0dXJuIG51bGw7XG5cbiAgc3dpdGNoIChmaWVsZCkge1xuICAgIGNhc2UgJ2F2c19yZXN1bHQnOiB7XG4gICAgICBjb25zdCBhZGRyID0gZGlzcHV0ZS5hdnNfYWRkcmVzc19jaGVjaztcbiAgICAgIGNvbnN0IHppcCA9IGRpc3B1dGUuYXZzX3ppcF9jaGVjaztcbiAgICAgIGlmICghYWRkciAmJiAhemlwKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IGNvbGxlY3RlZCBhdCBjaGVja291dCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIkFkZHJlc3MgdmVyaWZpY2F0aW9uIHdhc24ndCBydW4gb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBjYW4ndCBiZSBhZGRlZCBhZnRlciB0aGUgZmFjdCAtLSBmb2N1cyB5b3VyIGVuZXJneSBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMgaW5zdGVhZC5cIixcbiAgICAgIH07XG4gICAgICBjb25zdCBhZGRyRmFpbCA9IGFkZHIgPT09ICdmYWlsJztcbiAgICAgIGNvbnN0IHppcEZhaWwgPSB6aXAgPT09ICdmYWlsJztcbiAgICAgIGlmIChhZGRyRmFpbCAmJiB6aXBGYWlsKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICduZWdhdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQWRkcmVzczogbm8gbWF0Y2gsIFpJUDogbm8gbWF0Y2gnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgYmlsbGluZyBhZGRyZXNzIGRpZG4ndCBtYXRjaCB3aGF0IHRoZSBiYW5rIGhhcyBvbiBmaWxlLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMgYXV0b21hdGljYWxseSAtLSBpdCB3ZWFrZW5zIHlvdXIgY2FzZS4gRm9jdXMgb24gc3RyZW5ndGhlbmluZyBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChhZGRyRmFpbCB8fCB6aXBGYWlsKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICduZWdhdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgQWRkcmVzczogJHtmb3JtYXRDaGVja1ZhbHVlKGFkZHIpfSwgWklQOiAke2Zvcm1hdENoZWNrVmFsdWUoemlwKX1gLFxuICAgICAgICBndWlkYW5jZTogXCJQYXJ0aWFsIGFkZHJlc3MgbWF0Y2ggLS0gb25lIGVsZW1lbnQgZGlkbid0IG1hdGNoLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMuIEl0J3Mgbm90IGFzIGRhbWFnaW5nIGFzIGEgZnVsbCBtaXNtYXRjaCwgYnV0IHN0cmVuZ3RoZW4geW91ciBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBZGRyZXNzOiAke2Zvcm1hdENoZWNrVmFsdWUoYWRkcil9LCBaSVA6ICR7Zm9ybWF0Q2hlY2tWYWx1ZSh6aXApfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnY3ZjX2NoZWNrJzoge1xuICAgICAgY29uc3QgY3ZjID0gZGlzcHV0ZS5jdmNfY2hlY2s7XG4gICAgICBpZiAoIWN2YyB8fCBjdmMgPT09ICd1bmF2YWlsYWJsZScgfHwgY3ZjID09PSAndW5jaGVja2VkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAndW5hdmFpbGFibGUnLFxuICAgICAgICB2YWx1ZTogJ05vdCBjb2xsZWN0ZWQgYXQgY2hlY2tvdXQnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgc2VjdXJpdHkgY29kZSAoQ1ZWKSB3YXNuJ3QgdmVyaWZpZWQgb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBjYW4ndCBiZSBhZGRlZCBhZnRlciB0aGUgZmFjdCAtLSBmb2N1cyB5b3VyIGVuZXJneSBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMgaW5zdGVhZC5cIixcbiAgICAgIH07XG4gICAgICBpZiAoY3ZjID09PSAnZmFpbCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdDVlY6IG5vIG1hdGNoJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiVGhlIENWViBjaGVjayBmYWlsZWQgb24gdGhpcyB0cmFuc2FjdGlvbiAtLSB0aGUgY29kZSBlbnRlcmVkIGRpZG4ndCBtYXRjaC4gVGhlIGlzc3VlciB3aWxsIHNlZSB0aGlzIGF1dG9tYXRpY2FsbHkgYW5kIGl0IGh1cnRzIHlvdXIgY2FzZS4gRm9jdXMgb24gc3RyZW5ndGhlbmluZyBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdDVlYgdmVyaWZpZWQnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgJ3RocmVlX2Rfc2VjdXJlJzoge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZGlzcHV0ZS50aHJlZV9kX3NlY3VyZV9yZXN1bHQ7XG4gICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAndW5hdmFpbGFibGUnLFxuICAgICAgICB2YWx1ZTogJ05vdCB1c2VkIG9uIHRoaXMgdHJhbnNhY3Rpb24nLFxuICAgICAgICBndWlkYW5jZTogXCIzRCBTZWN1cmUgd2Fzbid0IHVzZWQgb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBpcyB0aGUgc2luZ2xlIHN0cm9uZ2VzdCBkZWZlbnNlIGZvciBmcmF1ZCBkaXNwdXRlcyAtLSBjb25zaWRlciBlbmFibGluZyBpdCBmb3IgZnV0dXJlIHRyYW5zYWN0aW9ucy4gRm9yIHRoaXMgZGlzcHV0ZSwgZm9jdXMgb24gdGhlIG90aGVyIGV2aWRlbmNlIGl0ZW1zLlwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHZlcnNpb24gPSBkaXNwdXRlLnRocmVlX2Rfc2VjdXJlX3ZlcnNpb247XG4gICAgICBpZiAocmVzdWx0ID09PSAnYXV0aGVudGljYXRlZCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IHZlcnNpb24gPyBgVmVyaWZpZWQgYnkgYmFuayAoM0RTIHYke3ZlcnNpb259KWAgOiAnVmVyaWZpZWQgYnkgYmFuayAoM0RTKScsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLiBUaGlzIGlzIHlvdXIgc3Ryb25nZXN0IHBpZWNlIG9mIGV2aWRlbmNlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChyZXN1bHQgPT09ICdhdHRlbXB0X2Fja25vd2xlZGdlZCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdCYW5rIHZlcmlmaWNhdGlvbiBhdHRlbXB0ZWQnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0gdGhlIGJhbmsgYWNrbm93bGVkZ2VkIHRoZSAzRFMgYXR0ZW1wdCwgd2hpY2ggc3RpbGwgcHJvdmlkZXMgbGlhYmlsaXR5IHNoaWZ0IGluIG1vc3QgY2FzZXMuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYDNEUyByZXN1bHQ6ICR7cmVzdWx0fWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnYXV0aG9yaXphdGlvbic6IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBkaXNwdXRlLmF1dGhvcml6YXRpb25fY29kZTtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGRpc3B1dGUubmV0d29ya19zdGF0dXM7XG4gICAgICBpZiAoIWNvZGUgJiYgIXN0YXR1cykgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoc3RhdHVzID09PSAnZGVjbGluZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdEZWNsaW5lZCBieSBuZXR3b3JrJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiVGhlIGF1dGhvcml6YXRpb24gd2FzIGRlY2xpbmVkIGJ5IHRoZSBuZXR3b3JrLiBUaGlzIGlzIHVudXN1YWwgZm9yIGEgY29tcGxldGVkIGNoYXJnZSAtLSBjb250YWN0IHN1cHBvcnQgaWYgdGhpcyBkb2Vzbid0IGxvb2sgcmlnaHQuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGNvZGUgJiYgc3RhdHVzID09PSAnYXBwcm92ZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBcHByb3ZlZCAoYXV0aCBjb2RlOiAke2NvZGV9KWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChjb2RlKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgQXV0aCBjb2RlOiAke2NvZGV9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FwcHJvdmVkX2J5X25ldHdvcmsnKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQXBwcm92ZWQgYnkgbmV0d29yaycsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBOZXR3b3JrIHN0YXR1czogJHtzdGF0dXN9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdjdXN0b21lcl9lbWFpbCc6XG4gICAgICBpZiAoIWRpc3B1dGUuY3VzdG9tZXJfZW1haWwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ2JpbGxpbmdfYWRkcmVzcyc6XG4gICAgICBpZiAoIWRpc3B1dGUuYmlsbGluZ19hZGRyZXNzKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGRpc3B1dGUuYmlsbGluZ19hZGRyZXNzLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAndHJhbnNhY3Rpb25fZGF0ZSc6XG4gICAgICBpZiAoIWRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBmb3JtYXREYXRlKGRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSksXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICBjYXNlICdyZWNlaXB0X3VybCc6XG4gICAgICBpZiAoIWRpc3B1dGUucmVjZWlwdF91cmwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ1JlY2VpcHQgYXZhaWxhYmxlJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ3JlZnVuZF9kYXRhJzoge1xuICAgICAgY29uc3QgcmVmdW5kcyA9IGRpc3B1dGUucmVmdW5kcztcbiAgICAgIGlmICghcmVmdW5kcyB8fCByZWZ1bmRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCByID0gcmVmdW5kc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBSZWZ1bmQgb2YgJHtmb3JtYXRDdXJyZW5jeShyLmFtb3VudCwgZGlzcHV0ZS5jdXJyZW5jeSl9IG9uICR7Zm9ybWF0RGF0ZShyLmNyZWF0ZWQpfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnY2FsY3VsYXRlZF9zdGF0ZW1lbnRfZGVzY3JpcHRvcic6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQ292ZXJlZCBieSB5b3VyIFN0cmlwZSB0cmFuc2FjdGlvbiBkYXRhJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBBbnkgc3RyaXBlX2ZpZWxkIHZhbHVlIHRoZSByZW5kZXJlciBkb2Vzbid0IGhhdmUgY3VzdG9tIGNvcHkgZm9yIHN0aWxsXG4gICAgICAvLyBtZWFucyB0aGUgZGF0YSBpcyBhdXRvZmlsbGVkIGZyb20gdGhlIHRyYW5zYWN0aW9uLiBTaG93IGEgZ2VuZXJpY1xuICAgICAgLy8gaGludCBzbyB0aGUgdXBsb2FkIFVJIHN0YXlzIGhpZGRlbiBhbmQgdGhlIG1lcmNoYW50IGRvZXNuJ3QgdHJ5IHRvXG4gICAgICAvLyBhdHRhY2ggYSBmaWxlIHRoYXQgd291bGQgYmUgc2lsZW50bHkgZHJvcHBlZCBieSB0aGUgYXNzZW1ibGVyLlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NvdmVyZWQgYnkgeW91ciBTdHJpcGUgdHJhbnNhY3Rpb24gZGF0YScsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIENoZWNrbGlzdFByb2dyZXNzUHJvcHMge1xuICBjb21wbGV0ZWQ6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbn1cblxudHlwZSBGcmFjdGlvbldpZHRoID0gJzEvMTInIHwgJzIvMTInIHwgJzMvMTInIHwgJzQvMTInIHwgJzUvMTInIHwgJzYvMTInIHwgJzcvMTInIHwgJzgvMTInIHwgJzkvMTInIHwgJzEwLzEyJyB8ICcxMS8xMicgfCAnZmlsbCc7XG5cbmZ1bmN0aW9uIGdldFByb2dyZXNzV2lkdGgoY29tcGxldGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpOiBGcmFjdGlvbldpZHRoIHwgbnVsbCB7XG4gIGlmICh0b3RhbCA9PT0gMCB8fCBjb21wbGV0ZWQgPT09IDApIHJldHVybiBudWxsO1xuICBpZiAoY29tcGxldGVkID49IHRvdGFsKSByZXR1cm4gJ2ZpbGwnO1xuICBjb25zdCB0d2VsZnRocyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoKGNvbXBsZXRlZCAvIHRvdGFsKSAqIDEyKSk7XG4gIHJldHVybiBgJHt0d2VsZnRoc30vMTJgIGFzIEZyYWN0aW9uV2lkdGg7XG59XG5cbmNvbnN0IENoZWNrbGlzdFByb2dyZXNzID0gKHsgY29tcGxldGVkLCB0b3RhbCB9OiBDaGVja2xpc3RQcm9ncmVzc1Byb3BzKSA9PiB7XG4gIGNvbnN0IHByb2dyZXNzV2lkdGggPSBnZXRQcm9ncmVzc1dpZHRoKGNvbXBsZXRlZCwgdG90YWwpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgRXZpZGVuY2UgUHJvZ3Jlc3NcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIHtjb21wbGV0ZWR9IG9mIHt0b3RhbH0gY29tcGxldGVkXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGNzcz17eyBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBib3JkZXJSYWRpdXM6ICdyb3VuZGVkJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICB7cHJvZ3Jlc3NXaWR0aCA/IChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnc3VyZmFjZScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3JvdW5kZWQnLFxuICAgICAgICAgICAgICB3aWR0aDogcHJvZ3Jlc3NXaWR0aCxcbiAgICAgICAgICAgICAgcGFkZGluZzogJ3h4c21hbGwnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SW5saW5lPnsnICd9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3h4c21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZT57JyAnfTwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVja2xpc3RQcm9ncmVzcztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBDaGVja2JveCwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgVGV4dEFyZWEgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuL0V2aWRlbmNlQ2hlY2tsaXN0JztcbmltcG9ydCBGaWxlVXBsb2FkU2VjdGlvbiBmcm9tICcuL0ZpbGVVcGxvYWRTZWN0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhwYW5kZWRTZWN0aW9uID0gJ3doeScgfCAnd2hlcmUnIHwgJ25vdGVzJyB8ICdmaWxlJztcblxuaW50ZXJmYWNlIENoZWNrbGlzdEl0ZW1Qcm9wcyB7XG4gIGl0ZW06IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbTtcbiAgY2hlY2tlZDogYm9vbGVhbjtcbiAgc3RyaXBlRmllbGRSZXN1bHQ/OiBTdHJpcGVGaWVsZFJlc3VsdDtcbiAgZXhwYW5kZWRTZWN0aW9uczogU2V0PEV4cGFuZGVkU2VjdGlvbj47XG4gIG5vdGVzOiBzdHJpbmc7XG4gIGV4aXN0aW5nRmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbDtcbiAgZGlzcHV0ZUlkOiBzdHJpbmc7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4gdm9pZDtcbiAgb25Ob3Rlc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2F2ZU5vdGVzPzogKCkgPT4gdm9pZDtcbiAgb25GaWxlQ2hhbmdlOiAoZmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbCkgPT4gdm9pZDtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcnlCYWRnZShjYXRlZ29yeTogRXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddKSB7XG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcbiAgICBjYXNlICdtYW5kYXRvcnknOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwibmVnYXRpdmVcIj5SRVFVSVJFRDwvQmFkZ2U+O1xuICAgIGNhc2UgJ3JlY29tbWVuZGVkJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIndhcm5pbmdcIj5IRUxQRlVMPC9CYWRnZT47XG4gICAgY2FzZSAnc2l0dWF0aW9uYWwnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwibmV1dHJhbFwiPklGIEFQUExJQ0FCTEU8L0JhZGdlPjtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTdHJpcGVTdGF0dXNCYWRnZShyZXN1bHQ6IFN0cmlwZUZpZWxkUmVzdWx0KSB7XG4gIHN3aXRjaCAocmVzdWx0LnN0YXR1cykge1xuICAgIGNhc2UgJ3Bvc2l0aXZlJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cImluZm9cIj5GUk9NIFNUUklQRTwvQmFkZ2U+O1xuICAgIGNhc2UgJ3VuYXZhaWxhYmxlJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5ldXRyYWxcIj5OT1QgQVZBSUxBQkxFPC9CYWRnZT47XG4gICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwid2FybmluZ1wiPkhFQURTIFVQPC9CYWRnZT47XG4gIH1cbn1cblxuaW50ZXJmYWNlIFNlY3Rpb25Ub2dnbGVQcm9wcyB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGV4cGFuZGVkOiBib29sZWFuO1xuICBvblByZXNzOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBTZWN0aW9uVG9nZ2xlID0gKHsgbGFiZWwsIGV4cGFuZGVkLCBvblByZXNzIH06IFNlY3Rpb25Ub2dnbGVQcm9wcykgPT4gKFxuICA8TGluayBvblByZXNzPXtvblByZXNzfT5cbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4eHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SWNvbiBuYW1lPXtleHBhbmRlZCA/ICdjaGV2cm9uVXAnIDogJ2NoZXZyb25Eb3duJ30gc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgPC9Cb3g+XG4gIDwvTGluaz5cbik7XG5cbmNvbnN0IENoZWNrbGlzdEl0ZW0gPSAoe1xuICBpdGVtLFxuICBjaGVja2VkLFxuICBzdHJpcGVGaWVsZFJlc3VsdCxcbiAgZXhwYW5kZWRTZWN0aW9ucyxcbiAgbm90ZXMsXG4gIGV4aXN0aW5nRmlsZSxcbiAgZGlzcHV0ZUlkLFxuICBjb250ZXh0LFxuICBvblRvZ2dsZSxcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbk5vdGVzQ2hhbmdlLFxuICBvblNhdmVOb3RlcyxcbiAgb25GaWxlQ2hhbmdlLFxuICBzdWJtaXR0ZWQsXG59OiBDaGVja2xpc3RJdGVtUHJvcHMpID0+IHtcbiAgY29uc3Qgd2h5RXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2h5Jyk7XG4gIGNvbnN0IHdoZXJlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2hlcmUnKTtcbiAgY29uc3Qgbm90ZXNFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCdub3RlcycpO1xuICBjb25zdCBmaWxlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnZmlsZScpO1xuXG4gIC8vIEZsYXNoIGEgXCJTYXZlZFwiIGNvbmZpcm1hdGlvbiBmb3IgMnMgYWZ0ZXIgdGhlIG1lcmNoYW50IGV4cGxpY2l0bHkgY2xpY2tzXG4gIC8vIFNhdmUsIHNvIHRoZXkgaGF2ZSB2aXN1YWwgY29uZmlybWF0aW9uIHRoZSBjb250ZW50IHBlcnNpc3RlZC4gKFdJTi00OSlcbiAgY29uc3QgW2p1c3RTYXZlZCwgc2V0SnVzdFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2F2ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChvblNhdmVOb3Rlcykgb25TYXZlTm90ZXMoKTtcbiAgICBzZXRKdXN0U2F2ZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRKdXN0U2F2ZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBpc1VuYXZhaWxhYmxlID0gc3RyaXBlRmllbGRSZXN1bHQ/LnN0YXR1cyA9PT0gJ3VuYXZhaWxhYmxlJztcbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHN0cmlwZUZpZWxkUmVzdWx0Py5zdGF0dXMgPT09ICduZWdhdGl2ZSc7XG4gIGNvbnN0IGlzUG9zaXRpdmUgPSBzdHJpcGVGaWVsZFJlc3VsdD8uc3RhdHVzID09PSAncG9zaXRpdmUnO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3tcbiAgICAgIHN0YWNrOiAneScsXG4gICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgfX0+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxDaGVja2JveFxuICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZX1cbiAgICAgICAgICBkaXNhYmxlZD17aXNVbmF2YWlsYWJsZSB8fCBpc1Bvc2l0aXZlIHx8IHN1Ym1pdHRlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLml0ZW19XG4gICAgICAgIC8+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3h4c21hbGwnLCB3aWR0aDogJ2ZpbGwnIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7XG4gICAgICAgICAgICAgIGZvbnQ6ICdib2R5JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ3NlbWlib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6IGlzVW5hdmFpbGFibGUgPyAnZGlzYWJsZWQnIDogY2hlY2tlZCA/ICdzZWNvbmRhcnknIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIHtpdGVtLml0ZW19XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdCAmJiBnZXRTdHJpcGVTdGF0dXNCYWRnZShzdHJpcGVGaWVsZFJlc3VsdCl9XG4gICAgICAgICAgICB7Z2V0Q2F0ZWdvcnlCYWRnZShpdGVtLmNhdGVnb3J5KX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICB7c3RyaXBlRmllbGRSZXN1bHQgJiYgKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3tcbiAgICAgICAgICAgICAgZm9udDogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICBjb2xvcjogaXNOZWdhdGl2ZSA/ICdhdHRlbnRpb24nIDogJ3NlY29uZGFyeScsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge3N0cmlwZUZpZWxkUmVzdWx0LnZhbHVlfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2h5IHRoaXMgbWF0dGVyc1wiXG4gICAgICAgICAgICAgIGV4cGFuZGVkPXt3aHlFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aHknKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7KGl0ZW0ud2hlcmVfdG9fZmluZCB8fCBzdHJpcGVGaWVsZFJlc3VsdCkgJiYgKFxuICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgIGxhYmVsPXtzdHJpcGVGaWVsZFJlc3VsdCA/ICdEZXRhaWxzJyA6ICdXaGVyZSB0byBmaW5kIHRoaXMnfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkPXt3aGVyZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnd2hlcmUnKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aXRlbS5uYXJyYXRpdmVfb25seSAmJiAhc3VibWl0dGVkID8gKFxuICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgIGxhYmVsPXtub3RlcyA/ICdZb3VyIG5vdGVzJyA6ICdBZGQgZGV0YWlsJ31cbiAgICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ25vdGVzJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogIWlzVW5hdmFpbGFibGUgJiYgIWlzUG9zaXRpdmUgJiYgIXN1Ym1pdHRlZCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e25vdGVzID8gJ1lvdXIgbm90ZXMnIDogJ0FkZCBub3Rlcyd9XG4gICAgICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnbm90ZXMnKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhpc3RpbmdGaWxlID8gZXhpc3RpbmdGaWxlLmZpbGVfbmFtZSA6ICdBdHRhY2ggZmlsZSd9XG4gICAgICAgICAgICAgICAgICBleHBhbmRlZD17ZmlsZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdmaWxlJyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgZXhpc3RpbmdGaWxlICYmIChcbiAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICBsYWJlbD17ZXhpc3RpbmdGaWxlLmZpbGVfbmFtZX1cbiAgICAgICAgICAgICAgICBleHBhbmRlZD17ZmlsZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnZmlsZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgICAge3doeUV4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtpdGVtLndoeV9tYXR0ZXJzfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt3aGVyZUV4cGFuZGVkICYmIChpdGVtLndoZXJlX3RvX2ZpbmQgfHwgc3RyaXBlRmllbGRSZXN1bHQpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiBpc05lZ2F0aXZlID8gJ2F0dGVudGlvbicgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdFxuICAgICAgICAgICAgICA/IHN0cmlwZUZpZWxkUmVzdWx0Lmd1aWRhbmNlXG4gICAgICAgICAgICAgIDogaXRlbS53aGVyZV90b19maW5kfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtub3Rlc0V4cGFuZGVkICYmICFpc1VuYXZhaWxhYmxlICYmICFzdWJtaXR0ZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJywgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgIGxhYmVsPXtpdGVtLm5hcnJhdGl2ZV9vbmx5ID8gJ0FkZCBkZXRhaWwgKG9wdGlvbmFsKScgOiAnWW91ciBub3Rlcyd9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICAgIGl0ZW0ubmFycmF0aXZlX29ubHlcbiAgICAgICAgICAgICAgICA/ICdJbiB5b3VyIG93biB3b3Jkcywgd2hhdCBzaG91bGQgdGhlIG5hcnJhdGl2ZSBzYXkgYWJvdXQgdGhpcz8nXG4gICAgICAgICAgICAgICAgOiAnZS5nLiB0cmFja2luZyAjLCBmaWxlIG5hbWUsIHdoZXJlIHRvIGZpbmQgdGhpcy4uLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlPXtub3Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Ob3Rlc0NoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAge29uU2F2ZU5vdGVzICYmIChcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgc2l6ZT1cInNtYWxsXCIgb25QcmVzcz17aGFuZGxlU2F2ZUNsaWNrfT5cbiAgICAgICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtqdXN0U2F2ZWQgJiYgKFxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc3VjY2VzcycgfX0+XG4gICAgICAgICAgICAgICAgU2F2ZWRcbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIHtpdGVtLm5hcnJhdGl2ZV9vbmx5ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICBPcHRpb25hbC4gQWRkIGRldGFpbCB0byBzdHJlbmd0aGVuIHRoaXMgcG9pbnQuIElmIGxlZnQgYmxhbmssIHlvdXIgbmFycmF0aXZlIHdpbGwgbm90ZSB0aGlzIGdlbmVyYWxseS5cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge2ZpbGVFeHBhbmRlZCAmJiAhaXNVbmF2YWlsYWJsZSAmJiAhaXRlbS5uYXJyYXRpdmVfb25seSAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkxlZnQ6ICd4bGFyZ2UnIH19PlxuICAgICAgICAgIDxGaWxlVXBsb2FkU2VjdGlvblxuICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlSWR9XG4gICAgICAgICAgICBjaGVja2xpc3RJdGVtS2V5PXtpdGVtLmtleX1cbiAgICAgICAgICAgIGV4aXN0aW5nRmlsZT17ZXhpc3RpbmdGaWxlfVxuICAgICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICAgIG9uRmlsZUNoYW5nZT17b25GaWxlQ2hhbmdlfVxuICAgICAgICAgICAgc3VibWl0dGVkPXtzdWJtaXR0ZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tsaXN0SXRlbTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFubmVyLCBCYWRnZSwgSW5saW5lLCBMaW5rLCBJY29uLCBTdHJpcGVGaWxlVXBsb2FkZXIgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIGRlbGV0ZUJhY2tlbmQgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcblxuaW50ZXJmYWNlIEZpbGVVcGxvYWRTZWN0aW9uUHJvcHMge1xuICBkaXNwdXRlSWQ6IHN0cmluZztcbiAgY2hlY2tsaXN0SXRlbUtleTogc3RyaW5nO1xuICBleGlzdGluZ0ZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGw7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgb25GaWxlQ2hhbmdlOiAoZmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbCkgPT4gdm9pZDtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RmlsZVNpemUoYnl0ZXM6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChieXRlcyA8IDEwMjQpIHJldHVybiBgJHtieXRlc30gQmA7XG4gIGlmIChieXRlcyA8IDEwMjQgKiAxMDI0KSByZXR1cm4gYCR7KGJ5dGVzIC8gMTAyNCkudG9GaXhlZCgxKX0gS0JgO1xuICByZXR1cm4gYCR7KGJ5dGVzIC8gKDEwMjQgKiAxMDI0KSkudG9GaXhlZCgxKX0gTUJgO1xufVxuXG5jb25zdCBFWFRFTlNJT05fVE9fTUlNRTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGRmOiAnYXBwbGljYXRpb24vcGRmJyxcbiAgcG5nOiAnaW1hZ2UvcG5nJyxcbiAganBnOiAnaW1hZ2UvanBlZycsXG4gIGpwZWc6ICdpbWFnZS9qcGVnJyxcbiAgZ2lmOiAnaW1hZ2UvZ2lmJyxcbiAgY3N2OiAndGV4dC9jc3YnLFxuICB0eHQ6ICd0ZXh0L3BsYWluJyxcbiAgaGVpYzogJ2ltYWdlL2hlaWMnLFxuICBoZWlmOiAnaW1hZ2UvaGVpZicsXG59O1xuXG4vKipcbiAqIFRoZSBTdHJpcGUgdXBsb2FkZXIncyBmaWxlT2JqZWN0LnR5cGUgY2FuIGJlIGEgZnVsbCBNSU1FIHR5cGVcbiAqIChcImFwcGxpY2F0aW9uL3BkZlwiKSBvciBhIGJhcmUgZXh0ZW5zaW9uIChcInBkZlwiKSBkZXBlbmRpbmcgb24gaG93IHRoZSBTREtcbiAqIHJlc29sdmVzIGl0LiBEb3duc3RyZWFtIGFzc2VtYmx5IGNvZGUgaW4gdGhlIGJhY2tlbmQgd2FudHMgcmVhbCBNSU1FIHR5cGVzLFxuICogc28gbm9ybWFsaXplIGhlcmUgYmVmb3JlIHBlcnNpc3RpbmcgdG8gZXZpZGVuY2VfZmlsZXMuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1pbWVUeXBlKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCwgZmlsZW5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGNvbnN0IHQgPSAodHlwZSA/PyAnJykudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGlmICh0LmluY2x1ZGVzKCcvJykpIHJldHVybiB0O1xuICBpZiAodCAmJiBFWFRFTlNJT05fVE9fTUlNRVt0XSkgcmV0dXJuIEVYVEVOU0lPTl9UT19NSU1FW3RdO1xuICBjb25zdCBuYW1lID0gKGZpbGVuYW1lID8/ICcnKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBkb3QgPSBuYW1lLmxhc3RJbmRleE9mKCcuJyk7XG4gIGlmIChkb3QgPj0gMCkge1xuICAgIGNvbnN0IGV4dCA9IG5hbWUuc2xpY2UoZG90ICsgMSk7XG4gICAgaWYgKEVYVEVOU0lPTl9UT19NSU1FW2V4dF0pIHJldHVybiBFWFRFTlNJT05fVE9fTUlNRVtleHRdO1xuICB9XG4gIHJldHVybiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbn1cblxuZnVuY3Rpb24gZ2V0TWltZUxhYmVsKG1pbWVUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ2FwcGxpY2F0aW9uL3BkZic6ICdQREYnLFxuICAgICdpbWFnZS9wbmcnOiAnUE5HJyxcbiAgICAnaW1hZ2UvanBlZyc6ICdKUEcnLFxuICAgICdpbWFnZS9naWYnOiAnR0lGJyxcbiAgICAndGV4dC9jc3YnOiAnQ1NWJyxcbiAgICAndGV4dC9wbGFpbic6ICdUWFQnLFxuICB9O1xuICByZXR1cm4gbWFwW21pbWVUeXBlXSA/PyAnRklMRSc7XG59XG5cbmNvbnN0IEZpbGVVcGxvYWRTZWN0aW9uID0gKHtcbiAgZGlzcHV0ZUlkLFxuICBjaGVja2xpc3RJdGVtS2V5LFxuICBleGlzdGluZ0ZpbGUsXG4gIGNvbnRleHQsXG4gIG9uRmlsZUNoYW5nZSxcbiAgc3VibWl0dGVkLFxufTogRmlsZVVwbG9hZFNlY3Rpb25Qcm9wcykgPT4ge1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1JlcGxhY2UsIHNldFNob3dSZXBsYWNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVVcGxvYWRDb21wbGV0ZSA9IGFzeW5jIChmaWxlT2JqZWN0OiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBzaXplOiBudW1iZXI7XG4gICAgdHlwZT86IHN0cmluZztcbiAgfSkgPT4ge1xuICAgIHNldEVycm9yKG51bGwpO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZE1pbWUgPSBub3JtYWxpemVNaW1lVHlwZShmaWxlT2JqZWN0LnR5cGUsIGZpbGVPYmplY3QuZmlsZW5hbWUpO1xuICAgIGlmIChub3JtYWxpemVkTWltZSA9PT0gJ2ltYWdlL2hlaWMnIHx8IG5vcm1hbGl6ZWRNaW1lID09PSAnaW1hZ2UvaGVpZicpIHtcbiAgICAgIHNldEVycm9yKFxuICAgICAgICBcIkhFSUMgcGhvdG9zIGFyZW4ndCBzdXBwb3J0ZWQuIE9wZW4gdGhlIGZpbGUgaW4gUHJldmlldyBvciB5b3VyIHBob3RvIGFwcCwgZXhwb3J0IGl0IGFzIEpQRUcgb3IgUE5HLCBhbmQgdHJ5IGFnYWluLlwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTYXZpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRXZpZGVuY2VGaWxlIH0+KFxuICAgICAgICBgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGVJZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICB7XG4gICAgICAgICAgY2hlY2tsaXN0X2l0ZW1fa2V5OiBjaGVja2xpc3RJdGVtS2V5LFxuICAgICAgICAgIHN0cmlwZV9maWxlX2lkOiBmaWxlT2JqZWN0LmlkLFxuICAgICAgICAgIGZpbGVfbmFtZTogZmlsZU9iamVjdC5maWxlbmFtZSA/PyAndW50aXRsZWQnLFxuICAgICAgICAgIGZpbGVfc2l6ZTogZmlsZU9iamVjdC5zaXplLFxuICAgICAgICAgIG1pbWVfdHlwZTogbm9ybWFsaXplZE1pbWUsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgb25GaWxlQ2hhbmdlKHJlc3VsdC5kYXRhKTtcbiAgICAgIHNldFNob3dSZXBsYWNlKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gc2F2ZSBmaWxlIHJlY29yZC4gVGhlIGZpbGUgd2FzIHVwbG9hZGVkIHRvIFN0cmlwZSBidXQgd2UgY291bGQgbm90IGxpbmsgaXQuIFRyeSBhZ2Fpbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVXBsb2FkRXJyb3IgPSAoKSA9PiB7XG4gICAgc2V0RXJyb3IoJ1VwbG9hZCBmYWlsZWQuIENoZWNrIHlvdXIgZmlsZSBpcyB1bmRlciAxME1CIGFuZCBhIHN1cHBvcnRlZCB0eXBlIChQREYsIFBORywgSlBHLCBHSUYsIENTViwgVFhUKS4nKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFleGlzdGluZ0ZpbGUpIHJldHVybjtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkZWxldGVCYWNrZW5kKFxuICAgICAgICBgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGVJZH0vZXZpZGVuY2UtZmlsZXMvJHtleGlzdGluZ0ZpbGUuaWR9YCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICk7XG4gICAgICBvbkZpbGVDaGFuZ2UobnVsbCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHJlbW92ZSBmaWxlLiBUcnkgYWdhaW4uJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlYWQtb25seSBtb2RlIHBvc3Qtc3VibWlzc2lvblxuICBpZiAoc3VibWl0dGVkKSB7XG4gICAgaWYgKGV4aXN0aW5nRmlsZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9XCJ4c21hbGxcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtleGlzdGluZ0ZpbGUuZmlsZV9uYW1lfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPntnZXRNaW1lTGFiZWwoZXhpc3RpbmdGaWxlLm1pbWVfdHlwZSl9PC9CYWRnZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtmb3JtYXRGaWxlU2l6ZShleGlzdGluZ0ZpbGUuZmlsZV9zaXplKX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIE5vIGZpbGUgYXR0YWNoZWRcbiAgICAgIDwvSW5saW5lPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgICB0aXRsZT1cIlVwbG9hZCBpc3N1ZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249e2Vycm9yfVxuICAgICAgICAgIG9uRGlzbWlzcz17KCkgPT4gc2V0RXJyb3IobnVsbCl9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7ZXhpc3RpbmdGaWxlICYmICFzaG93UmVwbGFjZSA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPVwieHNtYWxsXCIgLz5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAge2V4aXN0aW5nRmlsZS5maWxlX25hbWV9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPntnZXRNaW1lTGFiZWwoZXhpc3RpbmdGaWxlLm1pbWVfdHlwZSl9PC9CYWRnZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7Zm9ybWF0RmlsZVNpemUoZXhpc3RpbmdGaWxlLmZpbGVfc2l6ZSl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93UmVwbGFjZSh0cnVlKX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5SZXBsYWNlPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8TGluayBvblByZXNzPXtoYW5kbGVSZW1vdmV9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnY3JpdGljYWwnIH19PlJlbW92ZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge3Nob3dSZXBsYWNlICYmIChcbiAgICAgICAgICAgIDxMaW5rIG9uUHJlc3M9eygpID0+IHNldFNob3dSZXBsYWNlKGZhbHNlKX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkNhbmNlbCByZXBsYWNlPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8U3RyaXBlRmlsZVVwbG9hZGVyXG4gICAgICAgICAgICBsYWJlbD17c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnQ2hvb3NlIGZpbGUnfVxuICAgICAgICAgICAgcHVycG9zZT1cImRpc3B1dGVfZXZpZGVuY2VcIlxuICAgICAgICAgICAgb25Db21wbGV0ZT17aGFuZGxlVXBsb2FkQ29tcGxldGV9XG4gICAgICAgICAgICBvbkVycm9yPXtoYW5kbGVVcGxvYWRFcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgUERGLCBQTkcsIEpQRywgb3IgR0lGLiBNYXggMTBNQi5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZFNlY3Rpb247XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBQbGF5Ym9va0RhdGEsIEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IE5hcnJhdGl2ZVBoYXNlLCBOYXJyYXRpdmVBbm5vdGF0aW9uLCBTdGF0dXNSZXNwb25zZSwgRmVlZGJhY2tUYWcgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcbmltcG9ydCB7IFBPTExfSU5URVJWQUxfTVMsIE1BWF9QT0xMX0RVUkFUSU9OX01TIH0gZnJvbSAnLi4vLi4vbGliL25hcnJhdGl2ZS10eXBlcyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgTmFycmF0aXZlUHJlR2VuZXJhdGlvbiBmcm9tICcuL05hcnJhdGl2ZVByZUdlbmVyYXRpb24nO1xuaW1wb3J0IE5hcnJhdGl2ZUdlbmVyYXRpbmcgZnJvbSAnLi9OYXJyYXRpdmVHZW5lcmF0aW5nJztcbmltcG9ydCBOYXJyYXRpdmVSZXZpZXcgZnJvbSAnLi9OYXJyYXRpdmVSZXZpZXcnO1xuaW1wb3J0IE5hcnJhdGl2ZUVycm9yIGZyb20gJy4vTmFycmF0aXZlRXJyb3InO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlUGFuZWxQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEgfCBudWxsO1xuICBldmlkZW5jZUZpbGVzOiBFdmlkZW5jZUZpbGVbXTtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBlZGl0ZWROYXJyYXRpdmU6IHN0cmluZztcbiAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2U6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQXBwcm92ZTogKG5hcnJhdGl2ZVRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25OYXZpZ2F0ZUJhY2s6ICgpID0+IHZvaWQ7XG4gIHN1Ym1pdHRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IE5hcnJhdGl2ZVBhbmVsID0gKHtcbiAgZGlzcHV0ZSxcbiAgcGxheWJvb2ssXG4gIGV2aWRlbmNlRmlsZXMsXG4gIGNvbnRleHQsXG4gIGVkaXRlZE5hcnJhdGl2ZSxcbiAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2UsXG4gIG9uQXBwcm92ZSxcbiAgb25OYXZpZ2F0ZUJhY2ssXG4gIHN1Ym1pdHRlZCxcbn06IE5hcnJhdGl2ZVBhbmVsUHJvcHMpID0+IHtcbiAgLy8gU2VlZCBmcm9tIHBlcnNpc3RlZCBuYXJyYXRpdmVfdGV4dCBzbyB0aGUgUmV2aWV3IHZpZXcgc2hvd3Mgb24gcmVsb2FkXG4gIC8vIGFjcm9zcyBzZXNzaW9ucywgbm90IHRoZSBwcmUtZ2VuZXJhdGlvbiBwcm9tcHQgKFdJTi0yMCkuXG4gIGNvbnN0IFtwaGFzZSwgc2V0UGhhc2VdID0gdXNlU3RhdGU8TmFycmF0aXZlUGhhc2U+KCgpID0+XG4gICAgZWRpdGVkTmFycmF0aXZlID8gJ3JldmlldycgOiAnaWRsZScsXG4gICk7XG4gIGNvbnN0IFtnZW5lcmF0aW9uSWQsIHNldEdlbmVyYXRpb25JZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHN0cmluZz4oKCkgPT4gZWRpdGVkTmFycmF0aXZlKTtcbiAgY29uc3QgW2Fubm90YXRpb25zLCBzZXRBbm5vdGF0aW9uc10gPSB1c2VTdGF0ZTxOYXJyYXRpdmVBbm5vdGF0aW9uW10+KFtdKTtcbiAgY29uc3QgW2dlbmVyYXRpb25OdW1iZXIsIHNldEdlbmVyYXRpb25OdW1iZXJdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNHZW5lcmF0aW9uTGltaXQsIHNldElzR2VuZXJhdGlvbkxpbWl0XSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmPEV4dGVuc2lvbkNvbnRleHRWYWx1ZT4oY29udGV4dCk7XG4gIGNvbnN0IHBvbGxTdGFydFJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBwb2xsUmV0cnlDb3VudFJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuXG4gIC8vIEtlZXAgY29udGV4dFJlZiBmcmVzaCBhcyBjb250ZXh0IGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuICB9LCBbY29udGV4dF0pO1xuXG4gIC8vIFBvbGxpbmcgZWZmZWN0OiBvbmx5IGFjdGl2ZSB3aGVuIHBoYXNlID09PSAnZ2VuZXJhdGluZycgYW5kIGdlbmVyYXRpb25JZCBpcyBzZXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocGhhc2UgIT09ICdnZW5lcmF0aW5nJyB8fCAhZ2VuZXJhdGlvbklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcG9sbFN0YXJ0UmVmLmN1cnJlbnQgPSBEYXRlLm5vdygpO1xuICAgIHBvbGxSZXRyeUNvdW50UmVmLmN1cnJlbnQgPSAwO1xuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBleGNlZWRlZCB0aGUgbWF4IHBvbGwgZHVyYXRpb25cbiAgICAgIGlmIChEYXRlLm5vdygpIC0gcG9sbFN0YXJ0UmVmLmN1cnJlbnQgPiBNQVhfUE9MTF9EVVJBVElPTl9NUykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdOYXJyYXRpdmUgZ2VuZXJhdGlvbiB0aW1lZCBvdXQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2hCYWNrZW5kPFN0YXR1c1Jlc3BvbnNlPihcbiAgICAgICAgICBgL2FwaS9uYXJyYXRpdmVzLyR7Z2VuZXJhdGlvbklkfS9zdGF0dXNgLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc3RhdHVzUmVzcG9uc2Uuc3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHNldE5hcnJhdGl2ZShzdGF0dXNSZXNwb25zZS5uYXJyYXRpdmUpO1xuICAgICAgICAgIHNldEFubm90YXRpb25zKHN0YXR1c1Jlc3BvbnNlLmFubm90YXRpb25zKTtcbiAgICAgICAgICBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZShzdGF0dXNSZXNwb25zZS5uYXJyYXRpdmUpO1xuICAgICAgICAgIHNldFBoYXNlKCdyZXZpZXcnKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXNSZXNwb25zZS5zdGF0dXMgPT09ICdmYWlsZWQnKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHN0YXR1c1Jlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICBzZXRQaGFzZSgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAncGVuZGluZycgPT4ga2VlcCBwb2xsaW5nXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgcG9sbFJldHJ5Q291bnRSZWYuY3VycmVudCArPSAxO1xuICAgICAgICBpZiAocG9sbFJldHJ5Q291bnRSZWYuY3VycmVudCA+PSAzKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdOZXR3b3JrIGVycm9yIHdoaWxlIGNoZWNraW5nIGdlbmVyYXRpb24gc3RhdHVzLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgUE9MTF9JTlRFUlZBTF9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtwaGFzZSwgZ2VuZXJhdGlvbklkLCBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZV0pO1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKG1lcmNoYW50RmVlZGJhY2s6IHN0cmluZywgdGFnczogRmVlZGJhY2tUYWdbXSA9IFtdKSA9PiB7XG4gICAgc2V0UGhhc2UoJ2dlbmVyYXRpbmcnKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UobnVsbCk7XG4gICAgc2V0SXNHZW5lcmF0aW9uTGltaXQoZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZ2VuZXJhdGlvbl9pZDogc3RyaW5nIH0+KFxuICAgICAgICAnL2FwaS9uYXJyYXRpdmVzL2dlbmVyYXRlJyxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcHV0ZV9pZDogZGlzcHV0ZS5pZCxcbiAgICAgICAgICByZWFzb25fY29kZTogZGlzcHV0ZS5yZWFzb25fY29kZSxcbiAgICAgICAgICBuZXR3b3JrOiBkaXNwdXRlLm5ldHdvcmssXG4gICAgICAgICAgbWVyY2hhbnRfZmVlZGJhY2s6IG1lcmNoYW50RmVlZGJhY2ssXG4gICAgICAgICAgbWVyY2hhbnRfZmVlZGJhY2tfdGFnczogdGFncyxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHNldEdlbmVyYXRpb25JZChyZXNwb25zZS5nZW5lcmF0aW9uX2lkKTtcbiAgICAgIHNldEdlbmVyYXRpb25OdW1iZXIoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MjkgJiYgZXJyLmNvZGUgPT09ICdnZW5lcmF0aW9uX2xpbWl0Jykge1xuICAgICAgICBzZXRJc0dlbmVyYXRpb25MaW1pdCh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVyci5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVyci5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZSgnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgIH1cbiAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgIH1cbiAgfSwgW2Rpc3B1dGUuaWQsIGRpc3B1dGUucmVhc29uX2NvZGUsIGRpc3B1dGUubmV0d29ya10pO1xuXG4gIGNvbnN0IGhhbmRsZUFwcHJvdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgb25BcHByb3ZlKGVkaXRlZE5hcnJhdGl2ZSk7XG4gIH0sIFtvbkFwcHJvdmUsIGVkaXRlZE5hcnJhdGl2ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVJlZ2VuZXJhdGUgPSB1c2VDYWxsYmFjaygobWVyY2hhbnRGZWVkYmFjazogc3RyaW5nLCB0YWdzOiBGZWVkYmFja1RhZ1tdKSA9PiB7XG4gICAgaGFuZGxlR2VuZXJhdGUobWVyY2hhbnRGZWVkYmFjaywgdGFncyk7XG4gIH0sIFtoYW5kbGVHZW5lcmF0ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVJldHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEVycm9yTWVzc2FnZShudWxsKTtcbiAgICBzZXRQaGFzZSgnaWRsZScpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlRXJyb3JDb250aW51ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvbkFwcHJvdmUoZWRpdGVkTmFycmF0aXZlKTtcbiAgfSwgW29uQXBwcm92ZSwgZWRpdGVkTmFycmF0aXZlXSk7XG5cbiAgLy8gUG9zdC1zdWJtaXNzaW9uOiByZW5kZXIgbmFycmF0aXZlIGluIHJlYWQtb25seSBtb2RlIHJlZ2FyZGxlc3Mgb2YgbG9jYWwgcGhhc2Ugc3RhdGVcbiAgaWYgKHN1Ym1pdHRlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TmFycmF0aXZlUmV2aWV3XG4gICAgICAgIG5hcnJhdGl2ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICBhbm5vdGF0aW9ucz17YW5ub3RhdGlvbnN9XG4gICAgICAgIGVkaXRlZE5hcnJhdGl2ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICBnZW5lcmF0aW9uTnVtYmVyPXtnZW5lcmF0aW9uTnVtYmVyfVxuICAgICAgICBvbkVkaXRDaGFuZ2U9e29uRWRpdGVkTmFycmF0aXZlQ2hhbmdlfVxuICAgICAgICBvbkFwcHJvdmU9e2hhbmRsZUFwcHJvdmV9XG4gICAgICAgIG9uUmVnZW5lcmF0ZT17aGFuZGxlUmVnZW5lcmF0ZX1cbiAgICAgICAgc3VibWl0dGVkXG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBzd2l0Y2ggKHBoYXNlKSB7XG4gICAgY2FzZSAnaWRsZSc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TmFycmF0aXZlUHJlR2VuZXJhdGlvblxuICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgIGV2aWRlbmNlRmlsZXM9e2V2aWRlbmNlRmlsZXN9XG4gICAgICAgICAgZ2VuZXJhdGlvbk51bWJlcj17Z2VuZXJhdGlvbk51bWJlcn1cbiAgICAgICAgICBvbkdlbmVyYXRlPXtoYW5kbGVHZW5lcmF0ZX1cbiAgICAgICAgICBvbk5hdmlnYXRlQmFjaz17b25OYXZpZ2F0ZUJhY2t9XG4gICAgICAgIC8+XG4gICAgICApO1xuXG4gICAgY2FzZSAnZ2VuZXJhdGluZyc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TmFycmF0aXZlR2VuZXJhdGluZyBkaXNwdXRlPXtkaXNwdXRlfSAvPlxuICAgICAgKTtcblxuICAgIGNhc2UgJ3Jldmlldyc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TmFycmF0aXZlUmV2aWV3XG4gICAgICAgICAgbmFycmF0aXZlPXtuYXJyYXRpdmV9XG4gICAgICAgICAgYW5ub3RhdGlvbnM9e2Fubm90YXRpb25zfVxuICAgICAgICAgIGVkaXRlZE5hcnJhdGl2ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICAgIGdlbmVyYXRpb25OdW1iZXI9e2dlbmVyYXRpb25OdW1iZXJ9XG4gICAgICAgICAgb25FZGl0Q2hhbmdlPXtvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZX1cbiAgICAgICAgICBvbkFwcHJvdmU9e2hhbmRsZUFwcHJvdmV9XG4gICAgICAgICAgb25SZWdlbmVyYXRlPXtoYW5kbGVSZWdlbmVyYXRlfVxuICAgICAgICAvPlxuICAgICAgKTtcblxuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVFcnJvclxuICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxuICAgICAgICAgIGVkaXRlZE5hcnJhdGl2ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICAgIGlzR2VuZXJhdGlvbkxpbWl0PXtpc0dlbmVyYXRpb25MaW1pdH1cbiAgICAgICAgICBvbkVkaXRDaGFuZ2U9e29uRWRpdGVkTmFycmF0aXZlQ2hhbmdlfVxuICAgICAgICAgIG9uQ29udGludWU9e2hhbmRsZUVycm9yQ29udGludWV9XG4gICAgICAgICAgb25SZXRyeT17aGFuZGxlUmV0cnl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXJyYXRpdmVQYW5lbDtcbiIsICJleHBvcnQgdHlwZSBOYXJyYXRpdmVQaGFzZSA9ICdpZGxlJyB8ICdnZW5lcmF0aW5nJyB8ICdyZXZpZXcnIHwgJ2Vycm9yJztcblxuZXhwb3J0IGludGVyZmFjZSBOYXJyYXRpdmVBbm5vdGF0aW9uIHtcbiAgc2VjdGlvbjogc3RyaW5nO1xuICByZWFzb25pbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVJlc3BvbnNlIHtcbiAgZ2VuZXJhdGlvbl9pZDogc3RyaW5nO1xuICBzdGF0dXM6ICdwZW5kaW5nJztcbn1cblxuZXhwb3J0IHR5cGUgU3RhdHVzUmVzcG9uc2UgPVxuICB8IHsgc3RhdHVzOiAncGVuZGluZycgfVxuICB8IHsgc3RhdHVzOiAnY29tcGxldGVkJzsgbmFycmF0aXZlOiBzdHJpbmc7IGFubm90YXRpb25zOiBOYXJyYXRpdmVBbm5vdGF0aW9uW10gfVxuICB8IHsgc3RhdHVzOiAnZmFpbGVkJzsgZXJyb3I6IHN0cmluZyB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwaUVycm9yUmVzcG9uc2Uge1xuICBlcnJvcjogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBNQVhfR0VORVJBVElPTlMgPSA1O1xuZXhwb3J0IGNvbnN0IFBPTExfSU5URVJWQUxfTVMgPSAzMDAwO1xuZXhwb3J0IGNvbnN0IE1BWF9QT0xMX0RVUkFUSU9OX01TID0gNjAwMDA7XG5cbi8vIFN0cnVjdHVyZWQgZmVlZGJhY2sgY2hpcHMgb24gdGhlIHJlZ2VuZXJhdGlvbiBVSSAoV0lOLTM1KS4gVmFsdWVzIG1pcnJvclxuLy8gdGhlIGJhY2tlbmQncyBGRUVEQkFDS19UQUdTIGxpc3QgaW4gYmFja2VuZC9saWIvbmFycmF0aXZlcy9mZWVkYmFjay10YWdzLnRzXG4vLyAtLSBrZWVwIHRoZW0gaW4gc3luYy5cbmV4cG9ydCBjb25zdCBGRUVEQkFDS19UQUdTID0gW1xuICB7IGlkOiAndG9vX2Zvcm1hbCcsIGxhYmVsOiAnVG9vIGZvcm1hbCcgfSxcbiAgeyBpZDogJ21pc3NpbmdfZXZpZGVuY2UnLCBsYWJlbDogJ01pc3Npbmcga2V5IGV2aWRlbmNlJyB9LFxuICB7IGlkOiAnaW5hY2N1cmF0ZScsIGxhYmVsOiAnSW5hY2N1cmF0ZSBkZXRhaWxzJyB9LFxuICB7IGlkOiAndG9vX2xvbmcnLCBsYWJlbDogJ1RvbyBsb25nJyB9LFxuICB7IGlkOiAnb3RoZXInLCBsYWJlbDogJ090aGVyJyB9LFxuXSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tUYWcgPSAodHlwZW9mIEZFRURCQUNLX1RBR1MpW251bWJlcl1bJ2lkJ107XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCYWRnZSxcbiAgQmFubmVyLFxuICBCb3gsXG4gIEJ1dHRvbixcbiAgRGl2aWRlcixcbiAgSW5saW5lLFxuICBMaW5rLFxuICBUZXh0QXJlYSxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgUGxheWJvb2tEYXRhLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgTUFYX0dFTkVSQVRJT05TIH0gZnJvbSAnLi4vLi4vbGliL25hcnJhdGl2ZS10eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHJpcGVGaWVsZFJlc3VsdCB9IGZyb20gJy4uLy4uL2xpYi9zdHJpcGUtZmllbGQtc3RhdHVzJztcblxuaW50ZXJmYWNlIE5hcnJhdGl2ZVByZUdlbmVyYXRpb25Qcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEgfCBudWxsO1xuICBldmlkZW5jZUZpbGVzOiBFdmlkZW5jZUZpbGVbXTtcbiAgZ2VuZXJhdGlvbk51bWJlcjogbnVtYmVyO1xuICBvbkdlbmVyYXRlOiAobWVyY2hhbnRGZWVkYmFjazogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk5hdmlnYXRlQmFjazogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTmFycmF0aXZlUHJlR2VuZXJhdGlvbiA9ICh7XG4gIGRpc3B1dGUsXG4gIHBsYXlib29rLFxuICBldmlkZW5jZUZpbGVzLFxuICBnZW5lcmF0aW9uTnVtYmVyLFxuICBvbkdlbmVyYXRlLFxuICBvbk5hdmlnYXRlQmFjayxcbn06IE5hcnJhdGl2ZVByZUdlbmVyYXRpb25Qcm9wcykgPT4ge1xuICBjb25zdCBbZmVlZGJhY2ssIHNldEZlZWRiYWNrXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCByZW1haW5pbmcgPSBNQVhfR0VORVJBVElPTlMgLSBnZW5lcmF0aW9uTnVtYmVyO1xuICBjb25zdCBsaW1pdFJlYWNoZWQgPSByZW1haW5pbmcgPD0gMDtcblxuICAvLyBCdWlsZCBhIGxvb2t1cCBtYXA6IGNoZWNrbGlzdF9pdGVtX2tleSAtPiBFdmlkZW5jZUZpbGVcbiAgY29uc3QgZmlsZXNCeUtleSA9IG5ldyBNYXA8c3RyaW5nLCBFdmlkZW5jZUZpbGU+KCk7XG4gIGZvciAoY29uc3QgZmlsZSBvZiBldmlkZW5jZUZpbGVzKSB7XG4gICAgZmlsZXNCeUtleS5zZXQoZmlsZS5jaGVja2xpc3RfaXRlbV9rZXksIGZpbGUpO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSBwZXItaXRlbSBzYXRpc2ZhY3Rpb24uIFRocmVlIGNhdGVnb3JpZXMgb2YgXCJzYXRpc2ZpZWRcIjpcbiAgLy8gICAtIEEgKHN0cmlwZV9maWVsZCk6IHNhdGlzZmllZCB3aGVuIGF1dG8tcHVsbCByZXR1cm5zIGEgcG9zaXRpdmUgdmFsdWVcbiAgLy8gICAtIFNsb3QgKHN0cmlwZV9ldmlkZW5jZV9maWVsZCk6IHNhdGlzZmllZCB3aGVuIGEgZmlsZSBpcyB1cGxvYWRlZFxuICAvLyAgIC0gVCAobmFycmF0aXZlX29ubHkpOiBhbHdheXMgc2F0aXNmaWVkIC0tIGVpdGhlciB0aGUgbWVyY2hhbnQgdHlwZWRcbiAgLy8gICAgIGEgbm90ZSBvciB0aGUgcGVyLXBsYXlib29rIGZhbGxiYWNrIGZpbGxzIGl0IGluIGF0IG5hcnJhdGl2ZSB0aW1lLlxuICAvLyAgICAgKFdJTi00OSlcbiAgY29uc3QgY2hlY2tsaXN0Tm90ZXMgPSBkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcyA/PyB7fTtcbiAgY29uc3QgY2hlY2tsaXN0SXRlbXMgPSBwbGF5Ym9vaz8uZXZpZGVuY2VfY2hlY2tsaXN0ID8/IFtdO1xuICBjb25zdCBpdGVtU3RhdHVzZXMgPSBjaGVja2xpc3RJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICBjb25zdCBtYXRjaGVkRmlsZSA9IGZpbGVzQnlLZXkuZ2V0KGl0ZW0ua2V5KTtcbiAgICBjb25zdCBzdHJpcGVGaWVsZCA9IGdldFN0cmlwZUZpZWxkUmVzdWx0KGl0ZW0sIGRpc3B1dGUpO1xuICAgIGNvbnN0IGF1dG9GaWxsZWQgPSBzdHJpcGVGaWVsZD8uc3RhdHVzID09PSAncG9zaXRpdmUnO1xuICAgIGNvbnN0IGhhc01lcmNoYW50Tm90ZSA9ICEhKGNoZWNrbGlzdE5vdGVzW2l0ZW0ua2V5XT8udHJpbSgpKTtcbiAgICBjb25zdCBpc05hcnJhdGl2ZU9ubHkgPSAhIWl0ZW0ubmFycmF0aXZlX29ubHk7XG4gICAgY29uc3Qgc2F0aXNmaWVkID0gISFtYXRjaGVkRmlsZSB8fCBhdXRvRmlsbGVkIHx8IGlzTmFycmF0aXZlT25seTtcbiAgICBsZXQgc3RhdHVzTGFiZWw6IHN0cmluZztcbiAgICBpZiAobWF0Y2hlZEZpbGUpIHtcbiAgICAgIHN0YXR1c0xhYmVsID0gJ1VwbG9hZGVkJztcbiAgICB9IGVsc2UgaWYgKGF1dG9GaWxsZWQpIHtcbiAgICAgIHN0YXR1c0xhYmVsID0gJ0Zyb20gU3RyaXBlJztcbiAgICB9IGVsc2UgaWYgKGlzTmFycmF0aXZlT25seSkge1xuICAgICAgc3RhdHVzTGFiZWwgPSBoYXNNZXJjaGFudE5vdGUgPyAnTm90ZXMgYWRkZWQnIDogJ0luIG5hcnJhdGl2ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1c0xhYmVsID0gJ05vdCB1cGxvYWRlZCc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpdGVtLFxuICAgICAgbWF0Y2hlZEZpbGUsXG4gICAgICBzdHJpcGVGaWVsZCxcbiAgICAgIGF1dG9GaWxsZWQsXG4gICAgICBpc05hcnJhdGl2ZU9ubHksXG4gICAgICBoYXNNZXJjaGFudE5vdGUsXG4gICAgICBzYXRpc2ZpZWQsXG4gICAgICBzdGF0dXNMYWJlbCxcbiAgICB9O1xuICB9KTtcbiAgY29uc3Qgc2F0aXNmaWVkQ291bnQgPSBpdGVtU3RhdHVzZXMuZmlsdGVyKChzKSA9PiBzLnNhdGlzZmllZCkubGVuZ3RoO1xuICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbVN0YXR1c2VzLmxlbmd0aDtcbiAgY29uc3QgaGFzTm9FdmlkZW5jZSA9IHNhdGlzZmllZENvdW50ID09PSAwO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIHsvKiBDb2FjaCBoZWFkZXI6IGludHJvZHVjZXMgdGhlIG5hcnJhdGl2ZSBzdGVwICovfVxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIFJlYWR5IHRvIHdyaXRlIHlvdXIgbmFycmF0aXZlXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBXaW5CYWNrIHdpbGwgdXNlIHlvdXIgdXBsb2FkZWQgZXZpZGVuY2UgYW5kIHRoZSBkZXRhaWxzIFN0cmlwZSBoYXNcbiAgICAgICAgICBvbiB0aGlzIHRyYW5zYWN0aW9uIHRvIGRyYWZ0IGEgcmVzcG9uc2UgdGFpbG9yZWQgdG8gdGhpcyBkaXNwdXRlLlxuICAgICAgICAgIFJldmlldyB3aGF0IHRoZSBBSSB3aWxsIHdvcmsgd2l0aCBiZWxvdywgdGhlbiBnZW5lcmF0ZSB5b3VyIGRyYWZ0LlxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogRXZpZGVuY2Ugc3VtbWFyeSBjYXJkICovfVxuICAgICAge3BsYXlib29rID8gKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgICAgZ2FwOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgRXZpZGVuY2Ugc3VtbWFyeVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge3NhdGlzZmllZENvdW50fSBvZiB7dG90YWxJdGVtc30gY292ZXJlZFxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7aGFzTm9FdmlkZW5jZSAmJiAoXG4gICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJObyBldmlkZW5jZSBhdmFpbGFibGVcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlRoZSBBSSBjYW4gc3RpbGwgZ2VuZXJhdGUgYSBuYXJyYXRpdmUsIGJ1dCB5b3VyIGNoYW5jZXMgb2Ygd2lubmluZyBhcmUgbXVjaCBsb3dlciB3aXRob3V0IHN1cHBvcnRpbmcgZXZpZGVuY2UuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogMCB9fT5cbiAgICAgICAgICAgIHtpdGVtU3RhdHVzZXMubWFwKCh7IGl0ZW0sIHNhdGlzZmllZCB9LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0ZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e2l0ZW0ua2V5fSBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAwIH19PlxuICAgICAgICAgICAgICAgICAgeyFpc0ZpcnN0ICYmIDxEaXZpZGVyIC8+fVxuICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nWTogJ3NtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzMvNCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiAnYm9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzYXRpc2ZpZWQgPyAnc3VjY2VzcycgOiAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2F0aXNmaWVkID8gJ1xcdTI3MTMnIDogJ1xcdTI1Q0InfVxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiAnY2FwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzYXRpc2ZpZWQgPyAncHJpbWFyeScgOiAnc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdjYXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogc2F0aXNmaWVkID8gJ3N1Y2Nlc3MnIDogJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW1TdGF0dXNlc1tpbmRleF0uc3RhdHVzTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIDxMaW5rIG9uUHJlc3M9e29uTmF2aWdhdGVCYWNrfT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAgICAgICAgeydcXHUyMTkwIEdvIGJhY2sgdG8gYWRkIG1vcmUgZXZpZGVuY2UnfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJQbGF5Ym9vayBub3QgYXZhaWxhYmxlXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5vIHBsYXlib29rIHdhcyBmb3VuZCBmb3IgdGhpcyBkaXNwdXRlIHR5cGUuIFRoZSBBSSB3aWxsIGdlbmVyYXRlIGEgZ2VuZXJhbCBuYXJyYXRpdmUgYmFzZWQgb24gdGhlIGRpc3B1dGUgZGV0YWlscy5cIlxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIE1lcmNoYW50IGZlZWRiYWNrIGNhcmQgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIEFueXRoaW5nIGVsc2UgdGhlIEFJIHNob3VsZCBrbm93P1xuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgT3B0aW9uYWwuIEFkZCBhbnkgY29udGV4dCB0aGUgZXZpZGVuY2UgZmlsZXMgZG9uJ3QgYWxyZWFkeSBjYXB0dXJlLlxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBDdXN0b21lciBjb25maXJtZWQgcmVjZWlwdCBieSBwaG9uZSBvbiBNYXJjaCAyMHRoXCJcbiAgICAgICAgICB2YWx1ZT17ZmVlZGJhY2t9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGZWVkYmFjayhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcm93cz17M31cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogR2VuZXJhdGUgYnV0dG9uIG9yIGxpbWl0IGJhbm5lciAqL31cbiAgICAgIHtsaW1pdFJlYWNoZWQgPyAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJHZW5lcmF0aW9uIGxpbWl0IHJlYWNoZWRcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtgWW91IGhhdmUgdXNlZCBhbGwgJHtNQVhfR0VORVJBVElPTlN9IG5hcnJhdGl2ZSBnZW5lcmF0aW9ucyBmb3IgdGhpcyBkaXNwdXRlLiBSZXZpZXcgYW5kIGVkaXQgdGhlIGV4aXN0aW5nIG5hcnJhdGl2ZSwgb3IgdXNlIGl0IGFzLWlzIGZvciB5b3VyIHN1Ym1pc3Npb24uYH1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ21lZGl1bScsIGFsaWduWTogJ2NlbnRlcicsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvbkdlbmVyYXRlKGZlZWRiYWNrKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBHZW5lcmF0ZSBOYXJyYXRpdmVcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtyZW1haW5pbmd9IG9mIHtNQVhfR0VORVJBVElPTlN9IGdlbmVyYXRpb257cmVtYWluaW5nID09PSAxID8gJycgOiAncyd9IHJlbWFpbmluZ1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXJyYXRpdmVQcmVHZW5lcmF0aW9uO1xuIiwgImltcG9ydCB7IEJhZGdlLCBCb3gsIElubGluZSwgU3Bpbm5lciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlR2VuZXJhdGluZ1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbn1cblxuY29uc3QgTmFycmF0aXZlR2VuZXJhdGluZyA9ICh7IGRpc3B1dGUgfTogTmFycmF0aXZlR2VuZXJhdGluZ1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdtZWRpdW0nLFxuICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj5BSSBDb2FjaDwvQmFkZ2U+XG4gICAgICAgIDxTcGlubmVyIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBHZW5lcmF0aW5nIHlvdXIgbmFycmF0aXZlLi4uXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBXaW5CYWNrIGlzIGFuYWx5emluZyB5b3VyIGV2aWRlbmNlIGFuZCBidWlsZGluZyBhIHJlc3BvbnNlIHRhaWxvcmVkIHRveycgJ31cbiAgICAgICAgICB7ZGlzcHV0ZS5uZXR3b3JrfSByZWFzb24gY29kZSB7ZGlzcHV0ZS5yZWFzb25fY29kZX0uIFRoaXMgdXN1YWxseSB0YWtlc1xuICAgICAgICAgIDUtMTAgc2Vjb25kcy5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZUdlbmVyYXRpbmc7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBBY2NvcmRpb24sXG4gIEFjY29yZGlvbkl0ZW0sXG4gIEJhZGdlLFxuICBCYW5uZXIsXG4gIEJveCxcbiAgQnV0dG9uLFxuICBEaXZpZGVyLFxuICBJbmxpbmUsXG4gIFRleHRBcmVhLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHtcbiAgTmFycmF0aXZlQW5ub3RhdGlvbixcbiAgTUFYX0dFTkVSQVRJT05TLFxuICBGRUVEQkFDS19UQUdTLFxuICBGZWVkYmFja1RhZyxcbn0gZnJvbSAnLi4vLi4vbGliL25hcnJhdGl2ZS10eXBlcyc7XG5cbmludGVyZmFjZSBOYXJyYXRpdmVSZXZpZXdQcm9wcyB7XG4gIG5hcnJhdGl2ZTogc3RyaW5nO1xuICBhbm5vdGF0aW9uczogTmFycmF0aXZlQW5ub3RhdGlvbltdO1xuICBlZGl0ZWROYXJyYXRpdmU6IHN0cmluZztcbiAgZ2VuZXJhdGlvbk51bWJlcjogbnVtYmVyO1xuICBvbkVkaXRDaGFuZ2U6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQXBwcm92ZTogKCkgPT4gdm9pZDtcbiAgb25SZWdlbmVyYXRlOiAobWVyY2hhbnRGZWVkYmFjazogc3RyaW5nLCB0YWdzOiBGZWVkYmFja1RhZ1tdKSA9PiB2b2lkO1xuICBzdWJtaXR0ZWQ/OiBib29sZWFuO1xufVxuXG5jb25zdCBOYXJyYXRpdmVSZXZpZXcgPSAoe1xuICBuYXJyYXRpdmUsXG4gIGFubm90YXRpb25zLFxuICBlZGl0ZWROYXJyYXRpdmUsXG4gIGdlbmVyYXRpb25OdW1iZXIsXG4gIG9uRWRpdENoYW5nZSxcbiAgb25BcHByb3ZlLFxuICBvblJlZ2VuZXJhdGUsXG4gIHN1Ym1pdHRlZCxcbn06IE5hcnJhdGl2ZVJldmlld1Byb3BzKSA9PiB7XG4gIGNvbnN0IFtzaG93UmVnZW5Db25maXJtLCBzZXRTaG93UmVnZW5Db25maXJtXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2ZlZWRiYWNrLCBzZXRGZWVkYmFja10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFRhZ3MsIHNldFNlbGVjdGVkVGFnc10gPSB1c2VTdGF0ZTxGZWVkYmFja1RhZ1tdPihbXSk7XG5cbiAgY29uc3QgcmVtYWluaW5nID0gTUFYX0dFTkVSQVRJT05TIC0gZ2VuZXJhdGlvbk51bWJlcjtcbiAgY29uc3QgbGltaXRSZWFjaGVkID0gcmVtYWluaW5nIDw9IDA7XG4gIGNvbnN0IGhhc0VkaXRzID0gZWRpdGVkTmFycmF0aXZlICE9PSBuYXJyYXRpdmU7XG5cbiAgY29uc3QgdG9nZ2xlVGFnID0gKHRhZzogRmVlZGJhY2tUYWcpID0+IHtcbiAgICBzZXRTZWxlY3RlZFRhZ3MoKHByZXYpID0+XG4gICAgICBwcmV2LmluY2x1ZGVzKHRhZykgPyBwcmV2LmZpbHRlcigodCkgPT4gdCAhPT0gdGFnKSA6IFsuLi5wcmV2LCB0YWddLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVnZW5lcmF0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChoYXNFZGl0cykge1xuICAgICAgc2V0U2hvd1JlZ2VuQ29uZmlybSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25SZWdlbmVyYXRlKGZlZWRiYWNrLCBzZWxlY3RlZFRhZ3MpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtUmVnZW5lcmF0ZSA9ICgpID0+IHtcbiAgICBzZXRTaG93UmVnZW5Db25maXJtKGZhbHNlKTtcbiAgICBvblJlZ2VuZXJhdGUoZmVlZGJhY2ssIHNlbGVjdGVkVGFncyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgey8qIENvYWNoIGhlYWRlciBjYXJkICovfVxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj5BSSBDb2FjaDwvQmFkZ2U+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBHZW5lcmF0aW9uIHtnZW5lcmF0aW9uTnVtYmVyfSBvZiB7TUFYX0dFTkVSQVRJT05TfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIFlvdXIgZGlzcHV0ZSBuYXJyYXRpdmVcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIFJldmlldyB0aGUgQUkncyByZWFzb25pbmcsIHRoZW4gZWRpdCB0aGUgbmFycmF0aXZlIGJlbG93LiBUaGlzIGlzXG4gICAgICAgICAgdGhlIHRleHQgdGhhdCB3aWxsIGJlIHN1Ym1pdHRlZCB0byBTdHJpcGUuXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBBSSBTdHJhdGVneSAmIFJlYXNvbmluZyBhY2NvcmRpb24gKi99XG4gICAgICB7YW5ub3RhdGlvbnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxBY2NvcmRpb24+XG4gICAgICAgICAgPEFjY29yZGlvbkl0ZW1cbiAgICAgICAgICAgIHRpdGxlPVwiQUkgU3RyYXRlZ3kgJiBSZWFzb25pbmdcIlxuICAgICAgICAgICAgc3VidGl0bGU9e2Ake2Fubm90YXRpb25zLmxlbmd0aH0gc2VjdGlvbiR7YW5ub3RhdGlvbnMubGVuZ3RoID09PSAxID8gJycgOiAncyd9IGFuYWx5emVkYH1cbiAgICAgICAgICAgIGRlZmF1bHRPcGVuXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAge2Fubm90YXRpb25zLm1hcCgoYW5ub3RhdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgICAgICAgICBmb250OiAnY2FwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ3NlbWlib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3NlY29uZGFyeScsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHthbm5vdGF0aW9uLnNlY3Rpb259XG4gICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2Fubm90YXRpb24ucmVhc29uaW5nfVxuICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9BY2NvcmRpb25JdGVtPlxuICAgICAgICA8L0FjY29yZGlvbj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBFZGl0IGNhcmQgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtzdWJtaXR0ZWQgPyAnU3VibWl0dGVkIG5hcnJhdGl2ZScgOiAnRWRpdCB5b3VyIG5hcnJhdGl2ZSd9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgeyFzdWJtaXR0ZWQgJiYgaGFzRWRpdHMgJiYgKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3N1Y2Nlc3MnIH19PlxuICAgICAgICAgICAgICB7J1xcdTI3MTMnfSBBdXRvLXNhdmVkXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAge3N1Ym1pdHRlZFxuICAgICAgICAgICAgPyAnVGhpcyBuYXJyYXRpdmUgd2FzIHN1Ym1pdHRlZCB0byBTdHJpcGUgYW5kIGNhbm5vdCBiZSBjaGFuZ2VkLidcbiAgICAgICAgICAgIDogJ0VkaXRzIGFyZSBzYXZlZCBsb2NhbGx5IGFuZCB0cmF2ZWwgZm9yd2FyZCB0byB0aGUgU3VibWl0IHN0ZXAuJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICB2YWx1ZT17ZWRpdGVkTmFycmF0aXZlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25FZGl0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICByb3dzPXsxMn1cbiAgICAgICAgICBkaXNhYmxlZD17c3VibWl0dGVkfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBSZWdlbmVyYXRpb24gY29uZmlybSBiYW5uZXIgXHUyMDE0IGhpZGRlbiB3aGVuIHN1Ym1pdHRlZCAqL31cbiAgICAgIHshc3VibWl0dGVkICYmIHNob3dSZWdlbkNvbmZpcm0gJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgIHRpdGxlPVwiUmVnZW5lcmF0aW5nIHdpbGwgcmVwbGFjZSB5b3VyIGVkaXRzLiBDb250aW51ZT9cIlxuICAgICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJkZXN0cnVjdGl2ZVwiIG9uUHJlc3M9e2hhbmRsZUNvbmZpcm1SZWdlbmVyYXRlfT5cbiAgICAgICAgICAgICAgICBZZXMsIHJlZ2VuZXJhdGVcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17KCkgPT4gc2V0U2hvd1JlZ2VuQ29uZmlybShmYWxzZSl9PlxuICAgICAgICAgICAgICAgIEtlZXAgZWRpdGluZ1xuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGZWVkYmFjayBjYXJkIGZvciByZWdlbmVyYXRpb24gXHUyMDE0IGhpZGRlbiB3aGVuIHN1Ym1pdHRlZCAqL31cbiAgICAgIHshc3VibWl0dGVkICYmICFsaW1pdFJlYWNoZWQgJiYgIXNob3dSZWdlbkNvbmZpcm0gJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgV2hhdCB3b3VsZCB5b3UgbGlrZSB0byBjaGFuZ2U/XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBPcHRpb25hbC4gUGljayBvbmUgb3IgbW9yZSwgYWRkIG5vdGVzLCBvciBza2lwIGFuZCBjbGljayBSZWdlbmVyYXRlLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAge0ZFRURCQUNLX1RBR1MubWFwKCh0YWcpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkVGFncy5pbmNsdWRlcyh0YWcuaWQpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17dGFnLmlkfVxuICAgICAgICAgICAgICAgICAgdHlwZT17aXNTZWxlY3RlZCA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknfVxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IHRvZ2dsZVRhZyh0YWcuaWQpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHt0YWcubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQW55dGhpbmcgc3BlY2lmaWM/IGUuZy4gRW1waGFzaXplIHRoZSBkZWxpdmVyeSB0cmFja2luZyBtb3JlXCJcbiAgICAgICAgICAgIHZhbHVlPXtmZWVkYmFja31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RmVlZGJhY2soZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcm93cz17Mn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgIHsvKiBBY3Rpb24gYnV0dG9ucyBcdTIwMTQgaGlkZGVuIHdoZW4gc3VibWl0dGVkICovfVxuICAgICAgeyFzdWJtaXR0ZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e29uQXBwcm92ZX0+XG4gICAgICAgICAgICAgIEFwcHJvdmUgJmFtcDsgQ29udGludWVcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvblByZXNzPXtoYW5kbGVSZWdlbmVyYXRlQ2xpY2t9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsaW1pdFJlYWNoZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFJlZ2VuZXJhdGVcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIHtsaW1pdFJlYWNoZWQgPyAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnYXR0ZW50aW9uJyB9fT5cbiAgICAgICAgICAgICAgTm8gZ2VuZXJhdGlvbnMgcmVtYWluaW5nXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtyZW1haW5pbmd9IGdlbmVyYXRpb257cmVtYWluaW5nID09PSAxID8gJycgOiAncyd9IHJlbWFpbmluZ1xuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmFycmF0aXZlUmV2aWV3O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJhZGdlLFxuICBCYW5uZXIsXG4gIEJveCxcbiAgQnV0dG9uLFxuICBJbmxpbmUsXG4gIFRleHRBcmVhLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBQbGF5Ym9va0RhdGEgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVUZW1wbGF0ZSB9IGZyb20gJy4uLy4uL2xpYi9uYXJyYXRpdmUtdXRpbHMnO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlRXJyb3JQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEgfCBudWxsO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZyB8IG51bGw7XG4gIGVkaXRlZE5hcnJhdGl2ZTogc3RyaW5nO1xuICBpc0dlbmVyYXRpb25MaW1pdDogYm9vbGVhbjtcbiAgb25FZGl0Q2hhbmdlOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkNvbnRpbnVlOiAoKSA9PiB2b2lkO1xuICBvblJldHJ5OiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBOYXJyYXRpdmVFcnJvciA9ICh7XG4gIGRpc3B1dGUsXG4gIHBsYXlib29rLFxuICBlcnJvck1lc3NhZ2UsXG4gIGVkaXRlZE5hcnJhdGl2ZSxcbiAgaXNHZW5lcmF0aW9uTGltaXQsXG4gIG9uRWRpdENoYW5nZSxcbiAgb25Db250aW51ZSxcbiAgb25SZXRyeSxcbn06IE5hcnJhdGl2ZUVycm9yUHJvcHMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGVUZXh0ID1cbiAgICBwbGF5Ym9vaz8ubmFycmF0aXZlX3RlbXBsYXRlXG4gICAgICA/IGludGVycG9sYXRlVGVtcGxhdGUocGxheWJvb2submFycmF0aXZlX3RlbXBsYXRlLCBkaXNwdXRlKVxuICAgICAgOiAnJztcblxuICAvLyBPbiBtb3VudCBvbmx5OiBzZWVkIHBhcmVudCBzdGF0ZSB3aXRoIHRoZSB0ZW1wbGF0ZSBpZiB0aGUgbmFycmF0aXZlIGlzIGVtcHR5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlZGl0ZWROYXJyYXRpdmUgJiYgdGVtcGxhdGVUZXh0KSB7XG4gICAgICBvbkVkaXRDaGFuZ2UodGVtcGxhdGVUZXh0KTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZGlzcGxheVRleHQgPSBlZGl0ZWROYXJyYXRpdmUgfHwgdGVtcGxhdGVUZXh0O1xuICBjb25zdCBoYXNUZW1wbGF0ZSA9IEJvb2xlYW4odGVtcGxhdGVUZXh0KTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdsYXJnZScgfX0+XG4gICAgICB7LyogQ29hY2ggaGVhZGVyIGV4cGxhaW5pbmcgdGhlIGZhbGxiYWNrICovfVxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIHtpc0dlbmVyYXRpb25MaW1pdFxuICAgICAgICAgICAgPyAnR2VuZXJhdGlvbiBsaW1pdCByZWFjaGVkJ1xuICAgICAgICAgICAgOiAnQUkgZ2VuZXJhdGlvbiB1bmF2YWlsYWJsZSd9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7aXNHZW5lcmF0aW9uTGltaXRcbiAgICAgICAgICAgID8gJ1lvdSBoYXZlIHVzZWQgYWxsIGF2YWlsYWJsZSBBSSBuYXJyYXRpdmUgZ2VuZXJhdGlvbnMgZm9yIHRoaXMgZGlzcHV0ZS4gWW91IGNhbiBzdGlsbCBlZGl0IHRoZSB0ZW1wbGF0ZSBiZWxvdyBhbmQgc3VibWl0IGl0IGFzIHlvdXIgbWFudWFsIG5hcnJhdGl2ZS4nXG4gICAgICAgICAgICA6ICdXZSBjb3VsZCBub3QgcmVhY2ggdGhlIEFJIHRoaXMgdGltZS4gWW91IGNhbiBlZGl0IHRoZSByZWFzb24tY29kZS1zcGVjaWZpYyB0ZW1wbGF0ZSBiZWxvdyBhbmQgc3VibWl0IGl0IG1hbnVhbGx5LCBvciB0cnkgYWdhaW4gaW4gYSBtb21lbnQuIFlvdXIgZGVhZGxpbmUgaXMgbm90IGFmZmVjdGVkLid9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBJbmxpbmUgZXJyb3IgZGV0YWlsIChvbmx5IGZvciBub24tbGltaXQgZXJyb3JzKSAqL31cbiAgICAgIHtlcnJvck1lc3NhZ2UgJiYgIWlzR2VuZXJhdGlvbkxpbWl0ICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgICAgdGl0bGU9XCJEZXRhaWxzXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17ZXJyb3JNZXNzYWdlfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEVkaXQgY2FyZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAge2hhc1RlbXBsYXRlID8gJ0VkaXQgdGhlIHRlbXBsYXRlJyA6ICdXcml0ZSB5b3VyIG5hcnJhdGl2ZSd9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICB7aGFzVGVtcGxhdGUgPyAoXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBGaWxsIGluIHRoZSBbYnJhY2tldGVkIHNlY3Rpb25zXSB3aXRoIHlvdXIgc3BlY2lmaWMgZGV0YWlscy5cbiAgICAgICAgICAgIFN0cmlwZS12ZXJpZmllZCBmaWVsZHMgKEFWUywgQ1ZWLCAzRFMpIGFyZSBhbHJlYWR5IGZpbGxlZCBpbi5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIERlc2NyaWJlIHdoYXQgaGFwcGVuZWQsIHdoeSB0aGlzIGNoYXJnZSB3YXMgbGVnaXRpbWF0ZSwgYW5kIHRoZVxuICAgICAgICAgICAgZXZpZGVuY2UgdGhhdCBzdXBwb3J0cyB5b3VyIGNhc2UuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICl9XG4gICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICB2YWx1ZT17ZGlzcGxheVRleHR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkVkaXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHJvd3M9ezE0fVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgIGhhc1RlbXBsYXRlXG4gICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIDogJ0Rlc2NyaWJlIHdoYXQgaGFwcGVuZWQsIHdoeSB0aGlzIGNoYXJnZSB3YXMgbGVnaXRpbWF0ZSwgYW5kIGFueSBzdXBwb3J0aW5nIGRldGFpbHMuLi4nXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBBY3Rpb24gYnV0dG9ucyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e29uQ29udGludWV9PlxuICAgICAgICAgIENvbnRpbnVlIHdpdGggTWFudWFsIE5hcnJhdGl2ZVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgeyFpc0dlbmVyYXRpb25MaW1pdCAmJiAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgb25QcmVzcz17b25SZXRyeX0+XG4gICAgICAgICAgICBUcnkgQWdhaW5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmFycmF0aXZlRXJyb3I7XG4iLCAiaW1wb3J0IHsgRGlzcHV0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBURU1QTEFURV9GSUVMRF9NQVA6IFJlY29yZDxzdHJpbmcsIChkOiBEaXNwdXRlKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ+ID0ge1xuICBhdnNfYWRkcmVzc19jaGVjazogKGQpID0+IGQuYXZzX2FkZHJlc3NfY2hlY2ssXG4gIGF2c196aXBfY2hlY2s6IChkKSA9PiBkLmF2c196aXBfY2hlY2ssXG4gIGN2Y19jaGVjazogKGQpID0+IGQuY3ZjX2NoZWNrLFxuICB0aHJlZV9kX3NlY3VyZV9yZXN1bHQ6IChkKSA9PiBkLnRocmVlX2Rfc2VjdXJlX3Jlc3VsdCxcbiAgdGhyZWVfZF9zZWN1cmVfdmVyc2lvbjogKGQpID0+IGQudGhyZWVfZF9zZWN1cmVfdmVyc2lvbixcbiAgYXV0aG9yaXphdGlvbl9jb2RlOiAoZCkgPT4gZC5hdXRob3JpemF0aW9uX2NvZGUsXG4gIG5ldHdvcmtfc3RhdHVzOiAoZCkgPT4gZC5uZXR3b3JrX3N0YXR1cyxcbiAgY3VzdG9tZXJfZW1haWw6IChkKSA9PiBkLmN1c3RvbWVyX2VtYWlsLFxuICBjdXN0b21lcl9uYW1lOiAoZCkgPT4gZC5jdXN0b21lcl9uYW1lLFxuICBiaWxsaW5nX2FkZHJlc3M6IChkKSA9PiBkLmJpbGxpbmdfYWRkcmVzcyxcbiAgY2hhcmdlX2Rlc2NyaXB0aW9uOiAoZCkgPT4gZC5jaGFyZ2VfZGVzY3JpcHRpb24sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCBkaXNwdXRlOiBEaXNwdXRlKTogc3RyaW5nIHtcbiAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoL1xce1xceyhcXHcrKVxcfVxcfS9nLCAoX21hdGNoLCBmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgYWNjZXNzb3IgPSBURU1QTEFURV9GSUVMRF9NQVBbZmllbGRdO1xuICAgIGlmICghYWNjZXNzb3IpIHJldHVybiAnTi9BJztcbiAgICBjb25zdCB2YWx1ZSA9IGFjY2Vzc29yKGRpc3B1dGUpO1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJyA/IHZhbHVlIDogJ04vQSc7XG4gIH0pO1xufVxuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQmFubmVyLFxuICBDaGVja2JveCxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7XG4gIERpc3B1dGUsXG4gIEV2aWRlbmNlRmlsZSxcbiAgUGxheWJvb2tEYXRhLFxuICBTdWJtaXNzaW9uUmVzcG9uc2UsXG4gIFN1Ym1pc3Npb25XYXJuaW5nLFxufSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uLy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IFN1Ym1pc3Npb25Db25maXJtYXRpb24gZnJvbSAnLi9TdWJtaXNzaW9uQ29uZmlybWF0aW9uJztcblxuaW50ZXJmYWNlIFN1Ym1pdFZpZXdQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGE7XG4gIGV2aWRlbmNlRmlsZXM6IEV2aWRlbmNlRmlsZVtdO1xuICBuYXJyYXRpdmVUZXh0OiBzdHJpbmc7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgb25TdWJtaXR0ZWQ6IChyZXNwb25zZTogU3VibWlzc2lvblJlc3BvbnNlKSA9PiB2b2lkO1xufVxuXG50eXBlIFN0YXRlID1cbiAgfCB7IGtpbmQ6ICdpZGxlJyB9XG4gIHwgeyBraW5kOiAnc3VibWl0dGluZycgfVxuICB8IHsga2luZDogJ3N1Y2Nlc3MnOyByZXNwb25zZTogU3VibWlzc2lvblJlc3BvbnNlIH1cbiAgfCB7XG4gICAgICBraW5kOiAnZXJyb3InO1xuICAgICAgY29kZTogc3RyaW5nO1xuICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgdGVybWluYWw6IGJvb2xlYW47XG4gICAgICB3YXJuaW5nczogU3VibWlzc2lvbldhcm5pbmdbXTtcbiAgICB9O1xuXG5jb25zdCBURVJNSU5BTF9DT0RFUyA9IG5ldyBTZXQoW1xuICAnZGlzcHV0ZV9ub3Rfc3VibWl0dGFibGUnLFxuICAndmFsaWRhdGlvbl9mYWlsZWQnLFxuXSk7XG5cbmZ1bmN0aW9uIGNvdW50TWFuZGF0b3J5QXR0YWNoZWQoXG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEsXG4gIGV2aWRlbmNlRmlsZXM6IEV2aWRlbmNlRmlsZVtdLFxuKTogeyBhdHRhY2hlZDogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH0ge1xuICAvLyBDb3VudGVyIG1pcnJvcnMgd2hhdCBhY3R1YWxseSBnZXRzIHN1Ym1pdHRlZC4gQSBtYW5kYXRvcnkgaXRlbSBjb3VudHMgYXNcbiAgLy8gYXR0YWNoZWQgaWYgYW55IG9mIHRoZSB0aHJlZSBzdWJtaXNzaW9uIHBhdGhzIGlzIGNvdmVyZWQ6IGF1dG9maWxsZWQgZnJvbVxuICAvLyBTdHJpcGUgKHN0cmlwZV9maWVsZCksIGNvdmVyZWQgYnkgdGhlIG5hcnJhdGl2ZSAobmFycmF0aXZlX29ubHkpLCBvciBoYXNcbiAgLy8gYSByZWFsIHVwbG9hZGVkIGZpbGUuXG4gIGNvbnN0IG1hbmRhdG9yeSA9IHBsYXlib29rLmV2aWRlbmNlX2NoZWNrbGlzdC5maWx0ZXIoXG4gICAgKGkpID0+IGkuY2F0ZWdvcnkgPT09ICdtYW5kYXRvcnknLFxuICApO1xuICBjb25zdCBmaWxlZCA9IG5ldyBTZXQoZXZpZGVuY2VGaWxlcy5tYXAoKGYpID0+IGYuY2hlY2tsaXN0X2l0ZW1fa2V5KSk7XG4gIGNvbnN0IGF0dGFjaGVkID0gbWFuZGF0b3J5LmZpbHRlcihcbiAgICAoaSkgPT4gaS5zdHJpcGVfZmllbGQgfHwgaS5uYXJyYXRpdmVfb25seSB8fCBmaWxlZC5oYXMoaS5rZXkpLFxuICApLmxlbmd0aDtcbiAgcmV0dXJuIHsgYXR0YWNoZWQsIHRvdGFsOiBtYW5kYXRvcnkubGVuZ3RoIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN1Ym1pdFZpZXcoe1xuICBkaXNwdXRlLFxuICBwbGF5Ym9vayxcbiAgZXZpZGVuY2VGaWxlcyxcbiAgbmFycmF0aXZlVGV4dCxcbiAgY29udGV4dCxcbiAgb25TdWJtaXR0ZWQsXG59OiBTdWJtaXRWaWV3UHJvcHMpIHtcbiAgY29uc3QgW2Fja25vd2xlZGdlZCwgc2V0QWNrbm93bGVkZ2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxTdGF0ZT4oeyBraW5kOiAnaWRsZScgfSk7XG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgY29uc3QgeyBhdHRhY2hlZCwgdG90YWwgfSA9IGNvdW50TWFuZGF0b3J5QXR0YWNoZWQocGxheWJvb2ssIGV2aWRlbmNlRmlsZXMpO1xuICBjb25zdCBuYXJyYXRpdmVXb3JkcyA9IG5hcnJhdGl2ZVRleHQudHJpbSgpLnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aDtcblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoKSB7XG4gICAgc2V0U3RhdGUoeyBraW5kOiAnc3VibWl0dGluZycgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogU3VibWlzc2lvblJlc3BvbnNlIH0+KFxuICAgICAgICBgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9L3N1Ym1pdGAsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICk7XG4gICAgICBzZXRTdGF0ZSh7IGtpbmQ6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlLmRhdGEgfSk7XG4gICAgICBvblN1Ym1pdHRlZChyZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvcikge1xuICAgICAgICBjb25zdCBjb2RlID0gZXJyLmNvZGUgPz8gJ2ludGVybmFsX2Vycm9yJztcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGtpbmQ6ICdlcnJvcicsXG4gICAgICAgICAgY29kZSxcbiAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgICAgICB0ZXJtaW5hbDogVEVSTUlOQUxfQ09ERVMuaGFzKGNvZGUpLFxuICAgICAgICAgIC8vIEFwaUVycm9yIGRvZXMgbm90IGV4cG9zZSB0aGUgcmVzcG9uc2UgYm9keSwgc28gd2FybmluZ3MgYXJlXG4gICAgICAgICAgLy8gbm90IGF2YWlsYWJsZSBmcm9tIHRoZSBjYXRjaC4gU3VyZmFjZSB0aGVtIHZpYSB0aGUgbWVzc2FnZSBvbmx5LlxuICAgICAgICAgIHdhcm5pbmdzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAga2luZDogJ2Vycm9yJyxcbiAgICAgICAgICBjb2RlOiAnaW50ZXJuYWxfZXJyb3InLFxuICAgICAgICAgIG1lc3NhZ2U6ICdTb21ldGhpbmcgd2VudCB3cm9uZy4gWW91ciBzdWJtaXNzaW9uIHdhcyBOT1Qgc2VudC4nLFxuICAgICAgICAgIHRlcm1pbmFsOiBmYWxzZSxcbiAgICAgICAgICB3YXJuaW5nczogW10sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5raW5kID09PSAnc3VjY2VzcycpIHtcbiAgICByZXR1cm4gPFN1Ym1pc3Npb25Db25maXJtYXRpb24gcmVzcG9uc2U9e3N0YXRlLnJlc3BvbnNlfSAvPjtcbiAgfVxuXG4gIGNvbnN0IGlzU3VibWl0dGluZyA9IHN0YXRlLmtpbmQgPT09ICdzdWJtaXR0aW5nJztcbiAgY29uc3QgaXNUZXJtaW5hbEVycm9yID0gc3RhdGUua2luZCA9PT0gJ2Vycm9yJyAmJiBzdGF0ZS50ZXJtaW5hbDtcbiAgY29uc3Qgc3VibWl0RGlzYWJsZWQgPSAhYWNrbm93bGVkZ2VkIHx8IGlzU3VibWl0dGluZyB8fCBpc1Rlcm1pbmFsRXJyb3I7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdsYXJnZScsIHBhZGRpbmc6ICdsYXJnZScgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycgfX0+U3VibWl0IGV2aWRlbmNlPC9JbmxpbmU+XG5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcsIHBhZGRpbmc6ICdtZWRpdW0nLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBib3JkZXJSYWRpdXM6ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5EaXNwdXRlPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PntkaXNwdXRlLmlkfTwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+UmVhc29uPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PntwbGF5Ym9vay5kaXNwbGF5X25hbWV9PC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5NYW5kYXRvcnkgZXZpZGVuY2U8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e2F0dGFjaGVkfSBvZiB7dG90YWx9IGF0dGFjaGVkPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5OYXJyYXRpdmU8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e25hcnJhdGl2ZVdvcmRzfSB3b3JkczwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7c3RhdGUua2luZCA9PT0gJ2Vycm9yJyAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPXtzdGF0ZS50ZXJtaW5hbCA/ICdjcml0aWNhbCcgOiAnY2F1dGlvbid9XG4gICAgICAgICAgdGl0bGU9e3N0YXRlLnRlcm1pbmFsID8gXCJDYW4ndCBzdWJtaXRcIiA6ICdTdWJtaXNzaW9uIGZhaWxlZCd9XG4gICAgICAgICAgZGVzY3JpcHRpb249e3N0YXRlLm1lc3NhZ2V9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7YXR0YWNoZWQgPCB0b3RhbCAmJiAhaXNUZXJtaW5hbEVycm9yICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIk1pc3NpbmcgbWFuZGF0b3J5IGV2aWRlbmNlXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17YCR7dG90YWwgLSBhdHRhY2hlZH0gbWFuZGF0b3J5IGl0ZW0ke3RvdGFsIC0gYXR0YWNoZWQgPT09IDEgPyAnJyA6ICdzJ30gbm90IGF0dGFjaGVkLiBZb3UgY2FuIHN0aWxsIHN1Ym1pdCwgYnV0IHlvdXIgY2hhbmNlcyBpbXByb3ZlIHdpdGggbW9yZSBldmlkZW5jZS5gfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgeyFpc1Rlcm1pbmFsRXJyb3IgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgIHRpdGxlPVwiU3VibWlzc2lvbiBpcyBmaW5hbFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJPbmNlIHlvdSBzdWJtaXQsIHlvdXIgZXZpZGVuY2UgaXMgZmluYWwgYW5kIGNhbm5vdCBiZSBjaGFuZ2VkIG9yIHJlY2FsbGVkLiBTdHJpcGUgd2lsbCBzZW5kIGl0IGRpcmVjdGx5IHRvIHRoZSBjYXJkIGlzc3Vlci5cIlxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgPENoZWNrYm94XG4gICAgICAgIGxhYmVsPVwiSSB1bmRlcnN0YW5kIHRoaXMgc3VibWlzc2lvbiBpcyBmaW5hbC5cIlxuICAgICAgICBjaGVja2VkPXthY2tub3dsZWRnZWR9XG4gICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRBY2tub3dsZWRnZWQoKHByZXYpID0+ICFwcmV2KX1cbiAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZyB8fCBpc1Rlcm1pbmFsRXJyb3J9XG4gICAgICAvPlxuXG4gICAgICA8Qm94PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgIGRpc2FibGVkPXtzdWJtaXREaXNhYmxlZH1cbiAgICAgICAgICBvblByZXNzPXtoYW5kbGVTdWJtaXR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTdWJtaXR0aW5nID8gKFxuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICAgICAgICA8SW5saW5lPlN1Ym1pdHRpbmcgZXZpZGVuY2UuLi48L0lubGluZT5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAnU3VibWl0IHRvIFN0cmlwZSdcbiAgICAgICAgICApfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufVxuIiwgImltcG9ydCB7IEJveCwgQmFubmVyLCBCdXR0b24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IFN1Ym1pc3Npb25SZXNwb25zZSwgU3VibWlzc2lvbldhcm5pbmcgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5pbnRlcmZhY2UgU3VibWlzc2lvbkNvbmZpcm1hdGlvblByb3BzIHtcbiAgcmVzcG9uc2U6IFN1Ym1pc3Npb25SZXNwb25zZTtcbiAgb25CYWNrVG9MaXN0PzogKCkgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVXYXJuaW5nKHc6IFN1Ym1pc3Npb25XYXJuaW5nKTogc3RyaW5nIHtcbiAgc3dpdGNoICh3LmNvZGUpIHtcbiAgICBjYXNlICdmaWVsZF90cnVuY2F0ZWQnOlxuICAgICAgcmV0dXJuIGBZb3VyIG5hcnJhdGl2ZSB3YXMgdHJ1bmNhdGVkIGZyb20gJHt3Lm9yaWdpbmFsX2xlbmd0aH0gdG8gJHt3LnRydW5jYXRlZF9sZW5ndGh9IGNoYXJhY3RlcnMgYmVmb3JlIHN1Ym1pc3Npb24uYDtcbiAgICBjYXNlICdmaWVsZF9jb2xsaXNpb24nOlxuICAgICAgcmV0dXJuIGBcIiR7dy5sb3NpbmdfaXRlbX1cIiBjb2xsaWRlZCB3aXRoIFwiJHt3Lndpbm5pbmdfaXRlbX1cIiBvbiAke3cuZmllbGR9OyByZXNvbHZlZCBieSAke3cucmVzb2x1dGlvbiA9PT0gJ3VuY2F0ZWdvcml6ZWRfZmlsZScgPyAnYXR0YWNoaW5nIGFzIHVuY2F0ZWdvcml6ZWQgZmlsZScgOiAnZHJvcHBpbmcgdGhlIGxvc2luZyBpdGVtJ30uYDtcbiAgICBjYXNlICdtaXNzaW5nX21hbmRhdG9yeV9pdGVtcyc6XG4gICAgICByZXR1cm4gYE1hbmRhdG9yeSBpdGVtcyB3ZXJlIG5vdCBhdHRhY2hlZDogJHt3Lml0ZW1zLmpvaW4oJywgJyl9LiBTdWJtaXR0ZWQgd2l0aG91dCB0aGVtLmA7XG4gICAgY2FzZSAnZGVhZGxpbmVfcGFzc2VkJzpcbiAgICAgIHJldHVybiBgVGhlIHJlc3BvbnNlIGRlYWRsaW5lIGhhcyBwYXNzZWQuIFN1Ym1pdHRlZCBsYXRlLmA7XG4gICAgY2FzZSAnY29uY2F0X3NraXBwZWQnOlxuICAgICAgcmV0dXJuIGBcIiR7dy5maWxlX25hbWV9XCIgY291bGQgbm90IGJlIG1lcmdlZCBpbnRvICR7dy5zbG90fTogJHt3LnJlYXNvbn0uIFN1Ym1pdHRlZCB3aXRob3V0IGl0LmA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3VibWlzc2lvbkNvbmZpcm1hdGlvbih7IHJlc3BvbnNlLCBvbkJhY2tUb0xpc3QgfTogU3VibWlzc2lvbkNvbmZpcm1hdGlvblByb3BzKSB7XG4gIGNvbnN0IHN1Ym1pdHRlZEF0ID0gbmV3IERhdGUocmVzcG9uc2Uuc3VibWl0dGVkX2F0KS50b0xvY2FsZVN0cmluZygpO1xuICBjb25zdCBoYXNXYXJuaW5ncyA9IHJlc3BvbnNlLndhcm5pbmdzICYmIHJlc3BvbnNlLndhcm5pbmdzLmxlbmd0aCA+IDA7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdsYXJnZScsIHBhZGRpbmc6ICdsYXJnZScgfX0+XG4gICAgICB7aGFzV2FybmluZ3MgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgIHRpdGxlPVwiU3VibWl0dGVkIHdpdGggd2FybmluZ3NcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtcbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICAgIHtyZXNwb25zZS53YXJuaW5ncy5tYXAoKHcsIGkpID0+IChcbiAgICAgICAgICAgICAgICA8SW5saW5lIGtleT17aX0gY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICAgICAgICAgIFx1MjAyMiB7ZGVzY3JpYmVXYXJuaW5nKHcpfVxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIDxCYW5uZXJcbiAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICB0aXRsZT1cIkV2aWRlbmNlIHN1Ym1pdHRlZFwiXG4gICAgICAgIGRlc2NyaXB0aW9uPVwiWW91ciByZWJ1dHRhbCBpcyBvbiBpdHMgd2F5IHRvIHRoZSBjYXJkIGlzc3Vlci5cIlxuICAgICAgLz5cblxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycgfX0+V2hhdCBoYXBwZW5zIG5leHQ8L0lubGluZT5cbiAgICAgICAgPEJveD5cbiAgICAgICAgICBUaGUgYmFuayB0eXBpY2FsbHkgdGFrZXMgNjAtNzUgZGF5cyB0byBpc3N1ZSBhIGRlY2lzaW9uLiBZb3Ugd2lsbCBiZVxuICAgICAgICAgIG5vdGlmaWVkIGluIFN0cmlwZSB3aGVuIHRoZSBkaXNwdXRlIGlzIHJlc29sdmVkLlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHhzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+U3VibWl0dGVkIGF0PC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PntzdWJtaXR0ZWRBdH08L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgICAge29uQmFja1RvTGlzdCAmJiAoXG4gICAgICAgIDxCdXR0b24gdHlwZT1cInNlY29uZGFyeVwiIG9uUHJlc3M9e29uQmFja1RvTGlzdH0+XG4gICAgICAgICAgQmFjayB0byBkaXNwdXRlc1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU2VsZWN0LFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG4gIEJhbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVDYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZUNhcmQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgRW1wdHlEaXNwdXRlc1N0YXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRW1wdHlEaXNwdXRlc1N0YXRlJztcbmltcG9ydCBPbmJvYXJkaW5nUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9PbmJvYXJkaW5nUGFuZWwnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCYW5uZXInO1xuaW1wb3J0IFVwZ3JhZGVQcm9tcHRCYW5uZXIgZnJvbSAnLi4vY29tcG9uZW50cy9VcGdyYWRlUHJvbXB0QmFubmVyJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGlzUmVzb2x2ZWQsIGlzRGlzcHV0ZUV4cGlyZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAnZXJyb3InIHwgJ3JlYWR5JztcbnR5cGUgU3RhdHVzRmlsdGVyID0gJ2FsbCcgfCAnbmVlZHNfcmVzcG9uc2UnIHwgJ3VuZGVyX3JldmlldycgfCAncmVzb2x2ZWQnIHwgJ2V4cGlyZWQnO1xuXG5jb25zdCBGSUxURVJfT1BUSU9OUzogeyB2YWx1ZTogU3RhdHVzRmlsdGVyOyBsYWJlbDogc3RyaW5nIH1bXSA9IFtcbiAgeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnQWxsIGRpc3B1dGVzJyB9LFxuICB7IHZhbHVlOiAnbmVlZHNfcmVzcG9uc2UnLCBsYWJlbDogJ05lZWRzIHJlc3BvbnNlJyB9LFxuICB7IHZhbHVlOiAndW5kZXJfcmV2aWV3JywgbGFiZWw6ICdVbmRlciByZXZpZXcnIH0sXG4gIHsgdmFsdWU6ICdyZXNvbHZlZCcsIGxhYmVsOiAnUmVzb2x2ZWQnIH0sXG4gIHsgdmFsdWU6ICdleHBpcmVkJywgbGFiZWw6ICdFeHBpcmVkJyB9LFxuXTtcblxuZnVuY3Rpb24gbWF0Y2hlc0ZpbHRlcihkaXNwdXRlOiBEaXNwdXRlLCBmaWx0ZXI6IFN0YXR1c0ZpbHRlcik6IGJvb2xlYW4ge1xuICBjb25zdCBleHBpcmVkID0gaXNEaXNwdXRlRXhwaXJlZChkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgICAvLyBFeGNsdWRlIGV4cGlyZWQgZGlzcHV0ZXMgLS0gdGhleSBhcmUgbm90IGFjdGlvbmFibGUgZXZlbiB0aG91Z2hcbiAgICAgIC8vIFN0cmlwZSBzdGlsbCByZXBvcnRzIHN0YXR1cz1uZWVkc19yZXNwb25zZSAoV0lOLTQ4KS5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIChkaXNwdXRlLnN0YXR1cyA9PT0gJ25lZWRzX3Jlc3BvbnNlJyB8fCBkaXNwdXRlLnN0YXR1cyA9PT0gJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnKSAmJlxuICAgICAgICAhZXhwaXJlZFxuICAgICAgKTtcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIGRpc3B1dGUuc3RhdHVzID09PSAndW5kZXJfcmV2aWV3JyB8fCBkaXNwdXRlLnN0YXR1cyA9PT0gJ3dhcm5pbmdfdW5kZXJfcmV2aWV3JztcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG4gICAgY2FzZSAnZXhwaXJlZCc6XG4gICAgICByZXR1cm4gZXhwaXJlZDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q291bnRUZXh0KGNvdW50OiBudW1iZXIsIGZpbHRlcjogU3RhdHVzRmlsdGVyKTogc3RyaW5nIHtcbiAgY29uc3Qgbm91biA9IGNvdW50ID09PSAxID8gJ2Rpc3B1dGUnIDogJ2Rpc3B1dGVzJztcbiAgc3dpdGNoIChmaWx0ZXIpIHtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSAke25vdW59YDtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IG5lZWRpbmcgcmVzcG9uc2VgO1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHVuZGVyIHJldmlld2A7XG4gICAgY2FzZSAncmVzb2x2ZWQnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSByZXNvbHZlZGA7XG4gICAgY2FzZSAnZXhwaXJlZCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IGV4cGlyZWRgO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICB9XG59XG5cbmNvbnN0IERpc3B1dGVMaXN0VmlldyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgeyBlbnZpcm9ubWVudCwgdXNlckNvbnRleHQgfSA9IGNvbnRleHQ7XG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtkaXNwdXRlcywgc2V0RGlzcHV0ZXNdID0gdXNlU3RhdGU8RGlzcHV0ZVtdPihbXSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxTdGF0dXNGaWx0ZXI+KCduZWVkc19yZXNwb25zZScpO1xuICBjb25zdCBbb25ib2FyZGluZ0NvbXBsZXRlZCwgc2V0T25ib2FyZGluZ0NvbXBsZXRlZF0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICBjb25zdCBbc2VsZWN0ZWREaXNwdXRlLCBzZXRTZWxlY3RlZERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1dvcmtmbG93LCBzZXRTaG93V29ya2Zsb3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIGNvbnN0IGxvYWREaXNwdXRlcyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRWaWV3U3RhdGUoJ2xvYWRpbmcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW2Rpc3B1dGVzUmVzdWx0LCBvbmJvYXJkaW5nUmVzdWx0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZVtdIH0+KCcvYXBpL2Rpc3B1dGVzJywgY29udGV4dFJlZi5jdXJyZW50KSxcbiAgICAgICAgZmV0Y2hCYWNrZW5kPHsgY29tcGxldGVkOiBib29sZWFuOyBjb21wbGV0ZWRfYXQ6IHN0cmluZyB8IG51bGwgfT4oXG4gICAgICAgICAgJy9hcGkvbWVyY2hhbnQvb25ib2FyZGluZycsXG4gICAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICApLFxuICAgICAgXSk7XG4gICAgICBzZXREaXNwdXRlcyhkaXNwdXRlc1Jlc3VsdC5kYXRhKTtcbiAgICAgIHNldE9uYm9hcmRpbmdDb21wbGV0ZWQob25ib2FyZGluZ1Jlc3VsdC5jb21wbGV0ZWQpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdyZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIGVyciBpbnN0YW5jZW9mIEFwaUVycm9yXG4gICAgICAgICAgPyBlcnIubWVzc2FnZVxuICAgICAgICAgIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGVzLiBQbGVhc2UgdHJ5IGFnYWluLic7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGlzcHV0ZXMoKTtcbiAgfSwgW2xvYWREaXNwdXRlc10pO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdERpc3B1dGUgPSAoZGlzcHV0ZTogRGlzcHV0ZSkgPT4ge1xuICAgIHNldFNlbGVjdGVkRGlzcHV0ZShkaXNwdXRlKTtcbiAgICBzZXRTaG93V29ya2Zsb3codHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2VXb3JrZmxvdyA9IChzaG93bjogYm9vbGVhbikgPT4ge1xuICAgIHNldFNob3dXb3JrZmxvdyhzaG93bik7XG4gICAgaWYgKCFzaG93bikgc2V0U2VsZWN0ZWREaXNwdXRlKG51bGwpO1xuICB9O1xuXG4gIC8vIFNvcnQgYnkgZGVhZGxpbmUgKHNvb25lc3QgZmlyc3QpLCBidXQgcHVzaCBleHBpcmVkIGRpc3B1dGVzIHRvIHRoZVxuICAvLyBib3R0b20gcmVnYXJkbGVzcyBvZiBob3cgb3ZlcmR1ZSB0aGV5IGFyZSAtLSB0aGV5J3JlIG5vIGxvbmdlciBhY3Rpb25hYmxlXG4gIC8vIHNvIHRoZXkgc2hvdWxkbid0IGp1bXAgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdCBqdXN0IGJlY2F1c2UgdGhleSdyZSB0aGVcbiAgLy8gXCJtb3N0IG92ZXJkdWVcIiAoV0lOLTQ4KS5cbiAgY29uc3Qgc29ydGVkRGlzcHV0ZXMgPSBbLi4uZGlzcHV0ZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCBhRXhwaXJlZCA9IGlzRGlzcHV0ZUV4cGlyZWQoYS5kdWVfYnksIGEuc3RhdHVzKTtcbiAgICBjb25zdCBiRXhwaXJlZCA9IGlzRGlzcHV0ZUV4cGlyZWQoYi5kdWVfYnksIGIuc3RhdHVzKTtcbiAgICBpZiAoYUV4cGlyZWQgIT09IGJFeHBpcmVkKSByZXR1cm4gYUV4cGlyZWQgPyAxIDogLTE7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGEuZHVlX2J5KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZV9ieSkuZ2V0VGltZSgpO1xuICB9KTtcblxuICBjb25zdCBmaWx0ZXJlZERpc3B1dGVzID0gc29ydGVkRGlzcHV0ZXMuZmlsdGVyKChkKSA9PiBtYXRjaGVzRmlsdGVyKGQsIHN0YXR1c0ZpbHRlcikpO1xuXG4gIGNvbnN0IGhhbmRsZURpc21pc3NPbmJvYXJkaW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIE9wdGltaXN0aWM6IGhpZGUgdGhlIHBhbmVsIGltbWVkaWF0ZWx5LiBJZiB0aGUgYmFja2VuZCBjYWxsIGZhaWxzIHdlXG4gICAgLy8gd2lsbCByZWh5ZHJhdGUgb24gbmV4dCBtb3VudCwgd2hpY2ggaXMgZmluZTsgd29yc3QgY2FzZSB0aGUgbWVyY2hhbnRcbiAgICAvLyBzZWVzIGl0IG9uY2UgbW9yZS5cbiAgICBzZXRPbmJvYXJkaW5nQ29tcGxldGVkKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaEJhY2tlbmQoJy9hcGkvbWVyY2hhbnQvb25ib2FyZGluZy91cGRhdGUnLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgY29tcGxldGVkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBTd2FsbG93OiB0aGUgbmV4dCBsb2FkIHdpbGwgY29ycmVjdCBzdGF0ZS5cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2hvd0d1aWRlID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIE9wdGltaXN0aWM6IHNob3cgdGhlIHBhbmVsIGltbWVkaWF0ZWx5LCB0aGVuIHBlcnNpc3Qgc28gaXQgc3RheXNcbiAgICAvLyBvcGVuIGFjcm9zcyByZWxvYWRzIHVudGlsIHRoZSBtZXJjaGFudCBkaXNtaXNzZXMgYWdhaW4uXG4gICAgc2V0T25ib2FyZGluZ0NvbXBsZXRlZChmYWxzZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoQmFja2VuZCgnL2FwaS9tZXJjaGFudC9vbmJvYXJkaW5nL3VwZGF0ZScsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBTd2FsbG93OiB0aGUgbmV4dCBsb2FkIHdpbGwgY29ycmVjdCBzdGF0ZS5cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCIgZGVzY3JpcHRpb249XCJHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uXCI+XG4gICAgICB7dmlld1N0YXRlID09PSAnbG9hZGluZycgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTG9hZGluZyBkaXNwdXRlcy4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdlcnJvcicgJiYgKFxuICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JNZXNzYWdlfSAvPlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ3JlYWR5JyAmJiAoXG4gICAgICAgIDxUYWJzIGZpdHRlZCBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICA8VGFiIGlkPVwiZGlzcHV0ZXNcIj5EaXNwdXRlczwvVGFiPlxuICAgICAgICAgICAgPFRhYiBpZD1cImluc2lnaHRzXCI+SW5zaWdodHM8L1RhYj5cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImRpc3B1dGVzXCI+XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdzbWFsbCcsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPFVwZ3JhZGVQcm9tcHRCYW5uZXIgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fSAvPlxuICAgICAgICAgICAgICAgIHshb25ib2FyZGluZ0NvbXBsZXRlZCAmJiAoXG4gICAgICAgICAgICAgICAgICA8T25ib2FyZGluZ1BhbmVsIG9uRGlzbWlzcz17aGFuZGxlRGlzbWlzc09uYm9hcmRpbmd9IC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZGlzcHV0ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPEVtcHR5RGlzcHV0ZXNTdGF0ZVxuICAgICAgICAgICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkPXtvbmJvYXJkaW5nQ29tcGxldGVkfVxuICAgICAgICAgICAgICAgICAgICBvblNob3dHdWlkZT17aGFuZGxlU2hvd0d1aWRlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5FbGVtZW50cz17WydsYWJlbCddfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUgYXMgU3RhdHVzRmlsdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtGSUxURVJfT1BUSU9OUy5tYXAoKG9wdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZ1RvcDogJ3NtYWxsJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDb3VudFRleHQoZmlsdGVyZWREaXNwdXRlcy5sZW5ndGgsIHN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZERpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBObyB7RklMVEVSX09QVElPTlMuZmluZCgobykgPT4gby52YWx1ZSA9PT0gc3RhdHVzRmlsdGVyKT8ubGFiZWwudG9Mb3dlckNhc2UoKX0gZGlzcHV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZERpc3B1dGVzLm1hcCgoZGlzcHV0ZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPERpc3B1dGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpID0+IGhhbmRsZVNlbGVjdERpc3B1dGUoZGlzcHV0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJpbnNpZ2h0c1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkluc2lnaHRzXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2luIHJhdGUgYW5hbHl0aWNzIGFuZCBkaXNwdXRlIHBhdHRlcm5zIHdpbGwgYXBwZWFyIGhlcmUuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgQ29taW5nIGluIFdJTi0yMiBhbmQgV0lOLTIzLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgICl9XG5cbiAgICAgIHtzZWxlY3RlZERpc3B1dGUgJiYgKFxuICAgICAgICA8RGlzcHV0ZVdvcmtmbG93XG4gICAgICAgICAgZGlzcHV0ZT17c2VsZWN0ZWREaXNwdXRlfVxuICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgICBzZXRTaG93bj17aGFuZGxlQ2xvc2VXb3JrZmxvd31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVMaXN0VmlldztcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBCdXR0b24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHtcbiAgZ2V0U3RhdHVzQmFkZ2UsXG4gIGdldFVyZ2VuY3lCYWRnZSxcbiAgZ2V0UmVhc29uQ29kZUxhYmVsLFxuICBpc0Rpc3B1dGVFeHBpcmVkLFxufSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZUNhcmRQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIG9uU2VsZWN0OiAoZGlzcHV0ZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuY29uc3QgRGlzcHV0ZUNhcmQgPSAoeyBkaXNwdXRlLCBvblNlbGVjdCB9OiBEaXNwdXRlQ2FyZFByb3BzKSA9PiB7XG4gIGNvbnN0IGV4cGlyZWQgPSBpc0Rpc3B1dGVFeHBpcmVkKGRpc3B1dGUuZHVlX2J5LCBkaXNwdXRlLnN0YXR1cyk7XG4gIC8vIEhpZGUgdGhlIFwiTmVlZHMgUmVzcG9uc2VcIiBzdGF0dXMgYmFkZ2UgZm9yIGV4cGlyZWQgZGlzcHV0ZXMgLS0gdGhlXG4gIC8vIHJlZCBcIkV4cGlyZWRcIiB1cmdlbmN5IGJhZGdlIGFscmVhZHkgdGVsbHMgdGhlIG1lcmNoYW50IHdoYXQgc3RhdGVcbiAgLy8gdGhleSdyZSBpbiwgYW5kIHNob3dpbmcgYm90aCBpcyBjb250cmFkaWN0b3J5IChXSU4tNDgpLlxuICBjb25zdCBzdGF0dXNCYWRnZSA9IGV4cGlyZWQgPyBudWxsIDogZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCB1cmdlbmN5QmFkZ2UgPSBnZXRVcmdlbmN5QmFkZ2UoZGlzcHV0ZS5kdWVfYnksIGRpc3B1dGUuc3RhdHVzKTtcbiAgY29uc3QgcmVhc29uTGFiZWwgPSBnZXRSZWFzb25Db2RlTGFiZWwoZGlzcHV0ZS5uZXR3b3JrLCBkaXNwdXRlLnJlYXNvbl9jb2RlKTtcblxuICByZXR1cm4gKFxuICAgIDxCdXR0b25cbiAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgY3NzPXt7IHdpZHRoOiAnZmlsbCcgfX1cbiAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VsZWN0KGRpc3B1dGUuaWQpfVxuICAgID5cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICd4c21hbGwnLFxuICAgICAgICAgIHdpZHRoOiAnZmlsbCcsXG4gICAgICAgICAgcGFkZGluZzogJ3NtYWxsJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge2Zvcm1hdEFtb3VudChkaXNwdXRlLmFtb3VudCwgZGlzcHV0ZS5jdXJyZW5jeSl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgIHtzdGF0dXNCYWRnZSAmJiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dXJnZW5jeUJhZGdlICYmIChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9e3VyZ2VuY3lCYWRnZS50eXBlfT57dXJnZW5jeUJhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX25hbWUgfHwgJ1Vua25vd24gY3VzdG9tZXInfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAge3JlYXNvbkxhYmVsICYmIChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtyZWFzb25MYWJlbH1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgKX1cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUubmV0d29yay5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUubmV0d29yay5zbGljZSgxKX0ge2Rpc3B1dGUucmVhc29uX2NvZGV9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5pZC5zbGljZSgwLCAxMil9Li4uXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9CdXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlQ2FyZDtcbiIsICIvLyBzdHJpcGUtYXBwL3NyYy9jb21wb25lbnRzL0VtcHR5RGlzcHV0ZXNTdGF0ZS50c3hcbi8vXG4vLyBXSU4tMjU6IFJlYXNzdXJhbmNlIGJhbm5lciBzaG93biB3aGVuIHRoZSBtZXJjaGFudCBoYXMgemVybyBhY3RpdmUgZGlzcHV0ZXMsXG4vLyBwbHVzIGEgb25lLWNsaWNrIHdheSB0byByZW9wZW4gdGhlIG9uYm9hcmRpbmcgZ3VpZGUgd2l0aG91dCBsZWF2aW5nIHRoZVxuLy8gZGlzcHV0ZXMgdmlldy4gUGljdHVyZSBhIG1lcmNoYW50IHdobyBpbnN0YWxsZWQgdGhlIGFwcCBhIG1vbnRoIGFnbyBhbmRcbi8vIGhhc24ndCBoYWQgYSBkaXNwdXRlIHNpbmNlOiB0aGV5IG1heSB3YW50IGEgcmVmcmVzaGVyIG9uIHdoeSB0aGlzIGFwcCBpc1xuLy8gZXZlbiBoZXJlIHdpdGhvdXQgZGlnZ2luZyBpbnRvIFNldHRpbmdzLlxuXG5pbXBvcnQgeyBCYW5uZXIsIEJveCwgQnV0dG9uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRW1wdHlEaXNwdXRlc1N0YXRlUHJvcHMge1xuICBvbmJvYXJkaW5nQ29tcGxldGVkOiBib29sZWFuO1xuICBvblNob3dHdWlkZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgRW1wdHlEaXNwdXRlc1N0YXRlID0gKHsgb25ib2FyZGluZ0NvbXBsZXRlZCwgb25TaG93R3VpZGUgfTogRW1wdHlEaXNwdXRlc1N0YXRlUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcsIHBhZGRpbmc6ICdzbWFsbCcgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgdGl0bGU9XCJZb3UncmUgYWxsIHNldFwiXG4gICAgICAgIGRlc2NyaXB0aW9uPVwiV2hlbiBhIG5ldyBkaXNwdXRlIGFycml2ZXMsIHlvdSdsbCBzZWUgaXQgaGVyZSB3aXRoIGFuIGFsZXJ0LiBObyBzZXR1cCBuZWVkZWQuXCJcbiAgICAgIC8+XG4gICAgICB7b25ib2FyZGluZ0NvbXBsZXRlZCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgcGFkZGluZ1RvcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIE5lZWQgYSByZWZyZXNoZXIgb24gaG93IFdpbkJhY2sgd29ya3M/XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgb25QcmVzcz17b25TaG93R3VpZGV9PlxuICAgICAgICAgICAgU2hvdyBndWlkZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFbXB0eURpc3B1dGVzU3RhdGU7XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9PbmJvYXJkaW5nUGFuZWwudHN4XG4vL1xuLy8gV0lOLTI1OiBGaXJzdC1ydW4gb25ib2FyZGluZyBibG9jayBzaG93biBhdCB0aGUgdG9wIG9mIHRoZSBkaXNwdXRlcyB0YWJcbi8vIGZvciBldmVyeSBuZXcgbWVyY2hhbnQsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGV5IGN1cnJlbnRseSBoYXZlIGRpc3B1dGVzLlxuLy8gRWFjaCBzZWN0aW9uIHJlbmRlcnMgYXMgaXRzIG93biB0aWxlIHNvIHRoZSBleWUgbGFuZHMgb24gb25lIGlkZWEgYXQgYVxuLy8gdGltZSBhcyB0aGUgbWVyY2hhbnQgc2NhbnMgZG93biB0aGUgcGFuZWwuXG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBPbmJvYXJkaW5nUGFuZWxQcm9wcyB7XG4gIG9uRGlzbWlzczogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxudHlwZSBJY29uTmFtZSA9ICdub3RpZmljYXRpb25zJyB8ICdjbGlwYm9hcmRDaGVjaycgfCAnc3BhcmtsZSc7XG5cbmNvbnN0IFNURVBTOiB7IGljb246IEljb25OYW1lOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSA9IFtcbiAge1xuICAgIGljb246ICdub3RpZmljYXRpb25zJyxcbiAgICB0aXRsZTogJ0EgbmV3IGRpc3B1dGUgYXJyaXZlcycsXG4gICAgZGVzY3JpcHRpb246IFwiWW91J2xsIHNlZSBpdCBoZXJlIHRoZSBtb21lbnQgaXQgbGFuZHMuIE5vIHNldHVwLCBubyBjb25maWdzLlwiLFxuICB9LFxuICB7XG4gICAgaWNvbjogJ2NsaXBib2FyZENoZWNrJyxcbiAgICB0aXRsZTogJ1dlIHdhbGsgeW91IHRocm91Z2ggdGhlIGV2aWRlbmNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0EgcmVhc29uLWNvZGUtc3BlY2lmaWMgY2hlY2tsaXN0LCB0YWlsb3JlZCB0byB0aGF0IGRpc3B1dGUuIE5vIGd1ZXNzaW5nLicsXG4gIH0sXG4gIHtcbiAgICBpY29uOiAnc3BhcmtsZScsXG4gICAgdGl0bGU6ICdBSSBkcmFmdHMgeW91ciByZXNwb25zZScsXG4gICAgZGVzY3JpcHRpb246ICdXZSB0aWUgeW91ciBldmlkZW5jZSBpbnRvIGEgY2xlYW4gbmFycmF0aXZlLiBZb3UgcmV2aWV3LCBlZGl0LCBzdWJtaXQuJyxcbiAgfSxcbl07XG5cbmNvbnN0IHRpbGVDc3MgPSB7XG4gIHBhZGRpbmc6ICdsYXJnZScsXG4gIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gIHN0YWNrOiAneScsXG4gIGdhcDogJ3NtYWxsJyxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IE9uYm9hcmRpbmdQYW5lbCA9ICh7IG9uRGlzbWlzcyB9OiBPbmJvYXJkaW5nUGFuZWxQcm9wcykgPT4ge1xuICBjb25zdCBbZGlzbWlzc2luZywgc2V0RGlzbWlzc2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlRGlzbWlzcyA9IGFzeW5jICgpID0+IHtcbiAgICBzZXREaXNtaXNzaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBvbkRpc21pc3MoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGlzbWlzc2luZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgPEJveCBjc3M9e3RpbGVDc3N9PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgV2VsY29tZSB0byBXaW5CYWNrXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBXZSdsbCBoYW5kbGUgZGlzcHV0ZXMgd2l0aCB5b3UsIHN0ZXAgYnkgc3RlcC4gSGVyZSdzIHdoYXQgdG8gZXhwZWN0LlxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7U1RFUFMubWFwKChzdGVwLCBpZHgpID0+IChcbiAgICAgICAgPEJveCBrZXk9e3N0ZXAudGl0bGV9IGNzcz17dGlsZUNzc30+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnbWVkaXVtJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9e3N0ZXAuaWNvbn0gc2l6ZT1cInNtYWxsXCIgY3NzPXt7IGZpbGw6ICdicmFuZCcgfX0gLz5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBTdGVwIHtpZHggKyAxfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge3N0ZXAudGl0bGV9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7c3RlcC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cblxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgYWxpZ25YOiAnZW5kJywgcGFkZGluZ1RvcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZURpc21pc3N9IGRpc2FibGVkPXtkaXNtaXNzaW5nfT5cbiAgICAgICAgICB7ZGlzbWlzc2luZyA/ICdTYXZpbmcuLi4nIDogXCJHb3QgaXQsIGxldCdzIGdvXCJ9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPbmJvYXJkaW5nUGFuZWw7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJhbm5lcixcbiAgQm94LFxuICBCdXR0b24sXG4gIElubGluZSxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuXG50eXBlIEJpbGxpbmdTdGF0dXMgPSB7XG4gIHRpZXI6ICd1c2FnZScgfCAncHJvJztcbiAgc3Vic2NyaXB0aW9uX3N0YXR1czogc3RyaW5nIHwgbnVsbDtcbiAgeXRkX3N1Y2Nlc3NfZmVlc19jZW50czogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBXSU4tMjQ6IFVwZ3JhZGUgcHJvbXB0IHNob3duIGF0IHRoZSB0b3Agb2YgRGlzcHV0ZUxpc3RWaWV3IGFmdGVyIGEgbWVyY2hhbnRcbiAqIGhhcyB3b24gYXQgbGVhc3Qgb25lIGRpc3B1dGUgb24gdGhlIHVzYWdlIHRpZXIuIERpc2FwcGVhcnMgb25jZSB0aGV5IHVwZ3JhZGUuXG4gKlxuICogVGhlIFwiZmlyc3Qgd29uXCIgdHJpZ2dlciBpcyBhcHByb3hpbWF0ZWQgYnkgXCJZVEQgc3VjY2VzcyBmZWVzID4gMFwiIFx1MjAxNCBnb29kXG4gKiBlbm91Z2ggZm9yIG5vdzsgYSBtb3JlIHByZWNpc2UgdHJpZ2dlciAoZGlzbWlzc2VkLW9uY2UsIHN0aWNreSBzdGF0ZSkgY2FuXG4gKiBjb21lIGxhdGVyLlxuICovXG50eXBlIFByb3BzID0ge1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG59O1xuXG5jb25zdCBVcGdyYWRlUHJvbXB0QmFubmVyID0gKHsgY29udGV4dCB9OiBQcm9wcykgPT4ge1xuICBjb25zdCBbYmlsbGluZywgc2V0QmlsbGluZ10gPSB1c2VTdGF0ZTxCaWxsaW5nU3RhdHVzIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtkaXNtaXNzZWQsIHNldERpc21pc3NlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGdyYWRpbmcsIHNldFVwZ3JhZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDxCaWxsaW5nU3RhdHVzPihcbiAgICAgICAgICAnL2FwaS9iaWxsaW5nL3N0YXR1cycsXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHNldEJpbGxpbmcocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBTaWxlbnQgZmFpbHVyZSBcdTIwMTQgdGhlIGJhbm5lciBpcyBub24tY3JpdGljYWwgVUkuXG4gICAgICB9XG4gICAgfTtcbiAgICBsb2FkKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW2NvbnRleHRdKTtcblxuICBpZiAoXG4gICAgIWJpbGxpbmcgfHxcbiAgICBiaWxsaW5nLnRpZXIgIT09ICd1c2FnZScgfHxcbiAgICBiaWxsaW5nLnl0ZF9zdWNjZXNzX2ZlZXNfY2VudHMgPD0gMCB8fFxuICAgIGRpc21pc3NlZFxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVVwZ3JhZGUgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0VXBncmFkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXR1cm5VcmwgPSAnaHR0cHM6Ly9kYXNoYm9hcmQuc3RyaXBlLmNvbS9zZXR0aW5ncy9hcHBzJztcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IHVybDogc3RyaW5nIH0+KFxuICAgICAgICAnL2FwaS9iaWxsaW5nL2NoZWNrb3V0JyxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgeyBzdWNjZXNzX3VybDogcmV0dXJuVXJsLCBjYW5jZWxfdXJsOiByZXR1cm5VcmwgfSxcbiAgICAgICk7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93Lm9wZW4ocmVzdWx0LnVybCwgJ19ibGFuaycsICdub29wZW5lcicpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRXJyb3JzIHN1cmZhY2Ugb24gdGhlIFNldHRpbmdzIHZpZXcncyB1cGdyYWRlIGZsb3c7IGtlZXAgdGhlIGJhbm5lclxuICAgICAgLy8gcXVpZXQgaGVyZSB0byBhdm9pZCBub2lzZSBvbiB0aGUgbGlzdC5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VXBncmFkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2F2ZWQgPSBgJCR7KGJpbGxpbmcueXRkX3N1Y2Nlc3NfZmVlc19jZW50cyAvIDEwMCkudG9GaXhlZCgyKX1gO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgbWFyZ2luQm90dG9tOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCYW5uZXJcbiAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICB0aXRsZT1cIktlZXAgMTAwJSBvZiB5b3VyIG5leHQgd2luXCJcbiAgICAgICAgZGVzY3JpcHRpb249e2BZb3UndmUgcGFpZCAke3NhdmVkfSBpbiBzdWNjZXNzIGZlZXMgdGhpcyB5ZWFyLiBBdCAkNzkvbW9udGggb24gUHJvLCB5b3UnZCBrZWVwIGFsbCBvZiBpdC5gfVxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17aGFuZGxlVXBncmFkZX0gZGlzYWJsZWQ9e3VwZ3JhZGluZ30+XG4gICAgICAgICAgICAgIHt1cGdyYWRpbmcgPyAnT3BlbmluZ1x1MjAyNicgOiAnVXBncmFkZSB0byBQcm8nfVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzZWNvbmRhcnlcIiBvblByZXNzPXsoKSA9PiBzZXREaXNtaXNzZWQodHJ1ZSl9PlxuICAgICAgICAgICAgICBOb3Qgbm93XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVwZ3JhZGVQcm9tcHRCYW5uZXI7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCYWRnZSxcbiAgQmFubmVyLFxuICBCdXR0b24sXG4gIERpdmlkZXIsXG4gIElubGluZSxcbiAgTGluayxcbiAgU2V0dGluZ3NWaWV3LFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5cbnR5cGUgQmlsbGluZ1N0YXR1cyA9IHtcbiAgdGllcjogJ3VzYWdlJyB8ICdwcm8nO1xuICBzdWJzY3JpcHRpb25fc3RhdHVzOiBzdHJpbmcgfCBudWxsO1xuICBwcm9fc2luY2VfYXQ6IHN0cmluZyB8IG51bGw7XG4gIHVwZ3JhZGVfcHJvbXB0ZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gIG5leHRfYmlsbGluZ19hdDogc3RyaW5nIHwgbnVsbDtcbiAgeXRkX3N1Y2Nlc3NfZmVlc19jZW50czogbnVtYmVyO1xufTtcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAncmVhZHknIHwgJ2Vycm9yJztcblxuZnVuY3Rpb24gZm9ybWF0Q2VudHMoY2VudHM6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgJCR7KGNlbnRzIC8gMTAwKS50b0ZpeGVkKDIpfWA7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoaXNvOiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHtcbiAgaWYgKCFpc28pIHJldHVybiAnXHUyMDE0JztcbiAgcmV0dXJuIG5ldyBEYXRlKGlzbykudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdzaG9ydCcsXG4gICAgZGF5OiAnbnVtZXJpYycsXG4gIH0pO1xufVxuXG5jb25zdCBBcHBTZXR0aW5ncyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2JpbGxpbmcsIHNldEJpbGxpbmddID0gdXNlU3RhdGU8QmlsbGluZ1N0YXR1cyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt1cGdyYWRpbmcsIHNldFVwZ3JhZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGdyYWRlRXJyb3IsIHNldFVwZ3JhZGVFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbcmVvcGVuaW5nLCBzZXRSZW9wZW5pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVvcGVuRG9uZSwgc2V0UmVvcGVuRG9uZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtyZW9wZW5FcnJvciwgc2V0UmVvcGVuRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBoYW5kbGVSZW9wZW5PbmJvYXJkaW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldFJlb3BlbmluZyh0cnVlKTtcbiAgICBzZXRSZW9wZW5FcnJvcihudWxsKTtcbiAgICBzZXRSZW9wZW5Eb25lKGZhbHNlKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmV0Y2hCYWNrZW5kKCcvYXBpL21lcmNoYW50L29uYm9hcmRpbmcvdXBkYXRlJywgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIHNldFJlb3BlbkRvbmUodHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtc2cgPSBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byByZW9wZW4gZ3VpZGUnO1xuICAgICAgc2V0UmVvcGVuRXJyb3IobXNnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UmVvcGVuaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkQmlsbGluZyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDxCaWxsaW5nU3RhdHVzPihcbiAgICAgICAgICAnL2FwaS9iaWxsaW5nL3N0YXR1cycsXG4gICAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICApO1xuICAgICAgICBzZXRCaWxsaW5nKHJlc3VsdCk7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgncmVhZHknKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBtc2cgPSBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGJpbGxpbmcgc3RhdHVzJztcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1zZyk7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxvYWRCaWxsaW5nKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVVcGdyYWRlID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldFVwZ3JhZGluZyh0cnVlKTtcbiAgICBzZXRVcGdyYWRlRXJyb3IobnVsbCk7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERhc2hib2FyZCBpcyB0aGUgbmF0dXJhbCBcInJldHVybiBoZXJlXCIgZGVzdGluYXRpb24gXHUyMDE0IHRoZSBpZnJhbWUgd2lsbFxuICAgICAgLy8gcmVmcmVzaCB3aGVuIFN0cmlwZSByZWRpcmVjdHMgYmFjaywgYW5kIHRoZSBiaWxsaW5nIHdlYmhvb2sgd2lsbCBoYXZlXG4gICAgICAvLyBmbGlwcGVkIHRoZSB0aWVyIGJ5IHRoZW4uXG4gICAgICBjb25zdCByZXR1cm5VcmwgPSAnaHR0cHM6Ly9kYXNoYm9hcmQuc3RyaXBlLmNvbS9zZXR0aW5ncy9hcHBzJztcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IHVybDogc3RyaW5nIH0+KFxuICAgICAgICAnL2FwaS9iaWxsaW5nL2NoZWNrb3V0JyxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICB7IHN1Y2Nlc3NfdXJsOiByZXR1cm5VcmwsIGNhbmNlbF91cmw6IHJldHVyblVybCB9LFxuICAgICAgKTtcbiAgICAgIC8vIE9wZW4gQ2hlY2tvdXQgaW4gYSBuZXcgdGFiIFx1MjAxNCB0aGUgU3RyaXBlIERhc2hib2FyZCBpZnJhbWUgYmxvY2tzXG4gICAgICAvLyBDaGVja291dCBmcm9tIHJlbmRlcmluZyBpbnNpZGUgaXQuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93Lm9wZW4ocmVzdWx0LnVybCwgJ19ibGFuaycsICdub29wZW5lcicpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gc3RhcnQgdXBncmFkZSc7XG4gICAgICBzZXRVcGdyYWRlRXJyb3IobXNnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VXBncmFkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTZXR0aW5nc1ZpZXc+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgICA8SW5saW5lPkxvYWRpbmcgYmlsbGluZyBzdGF0dXNcdTIwMjY8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L1NldHRpbmdzVmlldz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ2Vycm9yJyB8fCAhYmlsbGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8U2V0dGluZ3NWaWV3PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICB0eXBlPVwiY3JpdGljYWxcIlxuICAgICAgICAgICAgdGl0bGU9XCJDb3VsZCBub3QgbG9hZCBiaWxsaW5nIHN0YXR1c1wiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbj17ZXJyb3JNZXNzYWdlID8/ICdQbGVhc2UgdHJ5IGFnYWluLid9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L1NldHRpbmdzVmlldz5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgaXNQYXN0RHVlID0gYmlsbGluZy5zdWJzY3JpcHRpb25fc3RhdHVzID09PSAncGFzdF9kdWUnO1xuICBjb25zdCBpc1BybyA9IGJpbGxpbmcudGllciA9PT0gJ3Bybyc7XG5cbiAgcmV0dXJuIChcbiAgICA8U2V0dGluZ3NWaWV3PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJywgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgIHtpc1Bhc3REdWUgJiYgKFxuICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUGF5bWVudCBwYXN0IGR1ZVwiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbj1cIllvdXIgUHJvIHN1YnNjcmlwdGlvbiBoYXMgYSBwYXltZW50IGlzc3VlLiBVcGRhdGUgeW91ciBwYXltZW50IG1ldGhvZCBpbiBTdHJpcGUgdG8gYXZvaWQgaW50ZXJydXB0aW9uLiBZb3UgY2FuIHN0aWxsIGZpbGUgYW5kIHN1Ym1pdCBkaXNwdXRlcy5cIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEJpbGxpbmdcbiAgICAgICAgICA8L0lubGluZT5cblxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5QbGFuOjwvSW5saW5lPlxuICAgICAgICAgICAge2lzUHJvID8gKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT1cInBvc2l0aXZlXCI+UHJvIFx1MDBCNyAkNzkvbW88L0JhZGdlPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+UGF5LVBlci1XaW4gXHUwMEI3IDE1JSBvZiByZWNvdmVyZWQgYW1vdW50PC9CYWRnZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7aXNQcm8gPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICBVbmxpbWl0ZWQgZGlzcHV0ZXMuIFplcm8gc3VjY2VzcyBmZWUuXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+XG4gICAgICAgICAgICAgICAgUHJvIHNpbmNlIHtmb3JtYXREYXRlKGJpbGxpbmcucHJvX3NpbmNlX2F0KX0gXHUwMEI3IE5leHQgYmlsbGluZ3snICd9XG4gICAgICAgICAgICAgICAge2Zvcm1hdERhdGUoYmlsbGluZy5uZXh0X2JpbGxpbmdfYXQpfVxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICBZb3UgcGF5IG5vdGhpbmcgdW50aWwgeW91IHdpbi4gV2UgY2hhcmdlIDE1JSBvZiB3aGF0IHlvdSByZWNvdmVyLlxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgICAgICAgIFN1Y2Nlc3MgZmVlcyB0aGlzIHllYXI6IHtmb3JtYXRDZW50cyhiaWxsaW5nLnl0ZF9zdWNjZXNzX2ZlZXNfY2VudHMpfVxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIHshaXNQcm8gJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgICAgVXBncmFkZSB0byBQcm9cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5cbiAgICAgICAgICAgICAgICAkNzkvbW9udGgsIHVubGltaXRlZCBkaXNwdXRlcywgbm8gc3VjY2VzcyBmZWUuIEJyZWFrLWV2ZW4gYWZ0ZXJcbiAgICAgICAgICAgICAgICB+MSB3aW4vbW9udGggYXQgYSAkNTAwIGF2ZXJhZ2UgZGlzcHV0ZS5cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIHt1cGdyYWRlRXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCIgdGl0bGU9XCJVcGdyYWRlIGZhaWxlZFwiIGRlc2NyaXB0aW9uPXt1cGdyYWRlRXJyb3J9IC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17aGFuZGxlVXBncmFkZX0gZGlzYWJsZWQ9e3VwZ3JhZGluZ30+XG4gICAgICAgICAgICAgICAgICB7dXBncmFkaW5nID8gJ09wZW5pbmcgQ2hlY2tvdXRcdTIwMjYnIDogJ1VwZ3JhZGUgdG8gUHJvJ31cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIE9wZW5zIFN0cmlwZSBDaGVja291dCBpbiBhIG5ldyB0YWJcbiAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cblxuICAgICAgICB7aXNQcm8gJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICAgIE1hbmFnZSBzdWJzY3JpcHRpb25cbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICAgICAgICBVcGRhdGUgeW91ciBwYXltZW50IG1ldGhvZCBvciBjYW5jZWwgZnJvbSB0aGV7JyAnfVxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCJodHRwczovL2Rhc2hib2FyZC5zdHJpcGUuY29tL3NldHRpbmdzL2JpbGxpbmdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgIFN0cmlwZSBiaWxsaW5nIHBvcnRhbFxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAuIENhbmNlbGluZyByZXZlcnRzIHlvdSB0byBQYXktUGVyLVdpbiBhdCBwZXJpb2QgZW5kLlxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuXG4gICAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBHZXR0aW5nIHN0YXJ0ZWQgZ3VpZGVcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIFNob3cgdGhlIFwiSG93IFdpbkJhY2sgd29ya3NcIiBndWlkZSBhZ2FpbiBpbiB0aGUgRGlzcHV0ZXMgdGFiIG5leHQgdGltZSB5b3UgaGF2ZSBubyBhY3RpdmUgZGlzcHV0ZXMuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAge3Jlb3BlbkVycm9yICYmIChcbiAgICAgICAgICAgIDxCYW5uZXIgdHlwZT1cImNyaXRpY2FsXCIgdGl0bGU9XCJDb3VsZCBub3QgcmVvcGVuIGd1aWRlXCIgZGVzY3JpcHRpb249e3Jlb3BlbkVycm9yfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Jlb3BlbkRvbmUgJiYgIXJlb3BlbkVycm9yICYmIChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICBEb25lLiBUaGUgZ3VpZGUgd2lsbCBhcHBlYXIgdGhlIG5leHQgdGltZSB5b3VyIGRpc3B1dGVzIGxpc3QgaXMgZW1wdHkuXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGFsaWduWDogJ3N0YXJ0JyB9fT5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInNlY29uZGFyeVwiIG9uUHJlc3M9e2hhbmRsZVJlb3Blbk9uYm9hcmRpbmd9IGRpc2FibGVkPXtyZW9wZW5pbmd9PlxuICAgICAgICAgICAgICB7cmVvcGVuaW5nID8gJ1Jlb3BlbmluZ1xcdTIwMjYnIDogJ1Nob3cgZ2V0dGluZyBzdGFydGVkIGd1aWRlJ31cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgQWJvdXQgV2luQmFja1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5WZXJzaW9uIDAuMC4xPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uIGZvciBTdHJpcGUgbWVyY2hhbnRzLiBCdWlsdCBieSBKS0IgVGVjaC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L1NldHRpbmdzVmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNldHRpbmdzO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsY0FBYztBQUN0QixjQUFRLGNBQWM7QUFBQTtBQUFBOzs7QUNIdEI7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsa0JBQWtCLFFBQVEsWUFBWSxRQUFRLGNBQWMsUUFBUSxZQUFZLFFBQVEsWUFBWSxRQUFRLE1BQU0sUUFBUSxZQUFZLFFBQVEsV0FBVyxRQUFRLFVBQVUsUUFBUSxTQUFTLFFBQVEscUJBQXFCLFFBQVEsVUFBVSxRQUFRLFlBQVksUUFBUSxhQUFhLFFBQVEsZUFBZSxRQUFRLFNBQVMsUUFBUSxRQUFRLFFBQVEsZUFBZSxRQUFRLG1CQUFtQixRQUFRLDRCQUE0QixRQUFRLGlCQUFpQixRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsWUFBWSxRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsT0FBTyxRQUFRLFlBQVksUUFBUSxTQUFTLFFBQVEsTUFBTSxRQUFRLE9BQU8sUUFBUSxpQkFBaUIsUUFBUSxZQUFZLFFBQVEsVUFBVSxRQUFRLGtCQUFrQixRQUFRLHlCQUF5QixRQUFRLG1CQUFtQixRQUFRLFlBQVksUUFBUSxjQUFjLFFBQVEsT0FBTyxRQUFRLFdBQVcsUUFBUSxXQUFXLFFBQVEsU0FBUyxRQUFRLGNBQWMsUUFBUSxNQUFNLFFBQVEsV0FBVyxRQUFRLFNBQVMsUUFBUSxRQUFRLFFBQVEsWUFBWSxRQUFRLGdCQUFnQjtBQUNyL0IsY0FBUSxVQUFVLFFB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QSxVQUNiO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxFQUNiOyIsCiAgIm5hbWVzIjogWyJmZXRjaCIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJyZXF1aXJlX3NpZ25hdHVyZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiZmV0Y2hTdHJpcGVTaWduYXR1cmUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiZm9ybWF0RGF0ZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJfYSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiX2EiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJmb3JtYXRBbW91bnQiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZm9ybWF0RGF0ZSJdCn0K
