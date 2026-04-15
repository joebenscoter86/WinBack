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
            checklistItemKey: item.item,
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
      state[item.item] = false;
      const result = getStripeFieldResult(item, dispute);
      if ((result == null ? void 0 : result.status) === "positive") {
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
            initial.set(item.item, /* @__PURE__ */ new Set(["notes"]));
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
          nextExpanded.set(item.item, /* @__PURE__ */ new Set(["notes"]));
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
    const handleToggle = (0, import_react4.useCallback)((itemName) => {
      setChecklistState((prev) => {
        const newState = __spreadProps(__spreadValues({}, prev), { [itemName]: !prev[itemName] });
        persistChecklist(newState);
        return newState;
      });
    }, [persistChecklist]);
    const handleNotesChange = (0, import_react4.useCallback)((itemName, value) => {
      setNotesState((prev) => {
        const newNotes = __spreadProps(__spreadValues({}, prev), { [itemName]: value });
        persistNotes(newNotes);
        return newNotes;
      });
    }, [persistNotes]);
    const handleFileChange = (0, import_react4.useCallback)((itemName, file) => {
      setFilesState((prev) => __spreadProps(__spreadValues({}, prev), { [itemName]: file }));
    }, []);
    const handleSectionToggle = (0, import_react4.useCallback)((itemName, section) => {
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
    const completedItems = items.filter((item) => checklistState[item.item]).length;
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
                checked: !!checklistState[item.item],
                stripeFieldResult: stripeResult != null ? stripeResult : void 0,
                expandedSections: (_a2 = expandedSections.get(item.item)) != null ? _a2 : /* @__PURE__ */ new Set(),
                notes: (_b = notesState[item.item]) != null ? _b : "",
                existingFile: (_c = filesState[item.item]) != null ? _c : null,
                disputeId: dispute.id,
                context: contextRef.current,
                onToggle: () => handleToggle(item.item),
                onSectionToggle: (section) => handleSectionToggle(item.item, section),
                onNotesChange: (value) => handleNotesChange(item.item, value),
                onSaveNotes: flushNotes,
                onFileChange: (file) => handleFileChange(item.item, file),
                submitted
              }, item.item);
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
      const matchedFile = filesByKey.get(item.item);
      const stripeField = getStripeFieldResult(item, dispute);
      const autoFilled = (stripeField == null ? void 0 : stripeField.status) === "positive";
      const hasMerchantNote = !!((_a2 = checklistNotes[item.item]) == null ? void 0 : _a2.trim());
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
                }, item.item);
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
    const remaining = MAX_GENERATIONS - generationNumber;
    const limitReached = remaining <= 0;
    const hasEdits = editedNarrative !== narrative;
    const handleRegenerateClick = () => {
      if (hasEdits) {
        setShowRegenConfirm(true);
      } else {
        onRegenerate(feedback);
      }
    };
    const handleConfirmRegenerate = () => {
      setShowRegenConfirm(false);
      onRegenerate(feedback);
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
              children: "Want to try again with different guidance?"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Optional. Tell the AI what to emphasize or change before regenerating."
            }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.TextArea, {
              label: "",
              placeholder: "e.g. Emphasize the delivery tracking more",
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
    const handleGenerate = (0, import_react8.useCallback)((merchantFeedback) => __async(void 0, null, function* () {
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
            merchant_feedback: merchantFeedback
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
    const handleRegenerate = (0, import_react8.useCallback)((merchantFeedback) => {
      handleGenerate(merchantFeedback);
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
      (i) => i.stripe_field || i.narrative_only || filed.has(i.item)
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
                      submitted
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
                      submitted
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
  var import_react12 = __require("react");
  var import_ui21 = __toESM(require_ui());

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
    const statusBadge = getStatusBadge(dispute.status);
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
                  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_ui19.Badge, {
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

  // src/components/EmptyState.tsx
  var import_ui20 = __toESM(require_ui());
  var import_jsx_runtime21 = __require("react/jsx-runtime");
  var EmptyState = ({ title, description }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_ui20.Box, {
      css: {
        padding: "xlarge",
        stack: "y",
        gap: "small",
        alignX: "center",
        alignY: "center"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Icon, {
          name: "info",
          size: "large"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Inline, {
          css: { font: "heading", fontWeight: "semibold" },
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_ui20.Inline, {
          css: { font: "caption", color: "secondary" },
          children: description
        })
      ]
    });
  };
  var EmptyState_default = EmptyState;

  // src/views/DisputeListView.tsx
  var import_jsx_runtime22 = __require("react/jsx-runtime");
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
    const [viewState, setViewState] = (0, import_react12.useState)("loading");
    const [disputes, setDisputes] = (0, import_react12.useState)([]);
    const [errorMessage, setErrorMessage] = (0, import_react12.useState)("");
    const [statusFilter, setStatusFilter] = (0, import_react12.useState)("all");
    const [selectedDispute, setSelectedDispute] = (0, import_react12.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react12.useState)(false);
    const contextRef = (0, import_react12.useRef)(context);
    contextRef.current = context;
    const loadDisputes = (0, import_react12.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react12.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.ContextView, {
      title: "WinBack",
      description: "Guided dispute resolution",
      children: [
        viewState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
          css: {
            padding: "xlarge",
            alignX: "center",
            alignY: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Spinner, {
              size: "large"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Loading disputes..."
            })
          ]
        }),
        viewState === "error" && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ErrorBanner_default, {
          message: errorMessage
        }),
        viewState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Tabs, {
          fitted: true,
          size: "medium",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.TabList, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Tab, {
                  id: "disputes",
                  children: "Disputes"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Tab, {
                  id: "insights",
                  children: "Insights"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.TabPanel, {
                  id: "disputes",
                  children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Box, {
                    css: { padding: "small", stack: "y", gap: "small" },
                    children: disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(EmptyState_default, {
                      title: "No disputes yet",
                      description: "When a dispute comes in, we'll walk you through exactly what to do."
                    }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Select, {
                          label: "Filter",
                          hiddenElements: ["label"],
                          value: statusFilter,
                          onChange: (e) => setStatusFilter(e.target.value),
                          children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("option", {
                            value: opt.value,
                            children: opt.label
                          }, opt.value))
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Box, {
                          css: { paddingTop: "small", paddingBottom: "small" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: getCountText(filteredDisputes.length, statusFilter)
                          })
                        }),
                        filteredDisputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Box, {
                          css: { padding: "medium", alignX: "center" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: [
                              "No ",
                              (_a = FILTER_OPTIONS.find((o) => o.value === statusFilter)) == null ? void 0 : _a.label.toLowerCase(),
                              " disputes."
                            ]
                          })
                        }) : filteredDisputes.map((dispute) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DisputeCard_default, {
                          dispute,
                          onSelect: () => handleSelectDispute(dispute)
                        }, dispute.id))
                      ]
                    })
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.TabPanel, {
                  id: "insights",
                  children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_ui21.Box, {
                    css: { padding: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Banner, {
                        type: "default",
                        title: "Insights",
                        description: "Win rate analytics and dispute patterns will appear here."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ui21.Inline, {
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
        selectedDispute && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DisputeWorkflow_default, {
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
  var import_ui22 = __toESM(require_ui());
  var import_jsx_runtime23 = __require("react/jsx-runtime");
  var AppSettings = ({ environment, userContext }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.SettingsView, {
      children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_ui22.Box, {
        css: { stack: "y", gap: "medium", padding: "medium" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_ui22.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Subscription"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Subscription management will be available here. Coming in WIN-24."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_ui22.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Account"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Connected Stripe account information will appear here."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_ui22.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "About WinBack"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
                css: { font: "body" },
                children: "Version 0.0.1"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_ui22.Inline, {
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
  var BUILD_TIME = "2026-04-14 22:48:14.6421 -0700 PDT m=+0.006297417";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EZWFkbGluZVRpbWVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0LnRzeCIsICIuLi9zcmMvbGliL3N0cmlwZS1maWVsZC1zdGF0dXMudHMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0UHJvZ3Jlc3MudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0NoZWNrbGlzdEl0ZW0udHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0ZpbGVVcGxvYWRTZWN0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlUGFuZWwudHN4IiwgIi4uL3NyYy9saWIvbmFycmF0aXZlLXR5cGVzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hcnJhdGl2ZS9OYXJyYXRpdmVQcmVHZW5lcmF0aW9uLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9uYXJyYXRpdmUvTmFycmF0aXZlR2VuZXJhdGluZy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZVJldmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvbmFycmF0aXZlL05hcnJhdGl2ZUVycm9yLnRzeCIsICIuLi9zcmMvbGliL25hcnJhdGl2ZS11dGlscy50cyIsICIuLi9zcmMvY29tcG9uZW50cy9zdWJtaXQvU3VibWl0Vmlldy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvc3VibWl0L1N1Ym1pc3Npb25Db25maXJtYXRpb24udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeCIsICIuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU0RLX1ZFUlNJT04gPSB2b2lkIDA7XG5leHBvcnRzLlNES19WRVJTSU9OID0gJzkuMS4wJztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFibGVIZWFkZXJDZWxsID0gZXhwb3J0cy5UYWJsZUhlYWQgPSBleHBvcnRzLlRhYmxlRm9vdGVyID0gZXhwb3J0cy5UYWJsZUNlbGwgPSBleHBvcnRzLlRhYmxlQm9keSA9IGV4cG9ydHMuVGFiID0gZXhwb3J0cy5UYWJQYW5lbHMgPSBleHBvcnRzLlRhYlBhbmVsID0gZXhwb3J0cy5UYWJMaXN0ID0gZXhwb3J0cy5Td2l0Y2ggPSBleHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGV4cG9ydHMuU3Bpbm5lciA9IGV4cG9ydHMuU3BhcmtsaW5lID0gZXhwb3J0cy5TaWduSW5WaWV3ID0gZXhwb3J0cy5TZXR0aW5nc1ZpZXcgPSBleHBvcnRzLlNlbGVjdCA9IGV4cG9ydHMuUmFkaW8gPSBleHBvcnRzLlByb3BlcnR5TGlzdCA9IGV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBleHBvcnRzLk1lbnUgPSBleHBvcnRzLk1lbnVJdGVtID0gZXhwb3J0cy5NZW51R3JvdXAgPSBleHBvcnRzLkxpc3QgPSBleHBvcnRzLkxpc3RJdGVtID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5MaW5lQ2hhcnQgPSBleHBvcnRzLklubGluZSA9IGV4cG9ydHMuSW1nID0gZXhwb3J0cy5JY29uID0gZXhwb3J0cy5Gb3JtRmllbGRHcm91cCA9IGV4cG9ydHMuRm9jdXNWaWV3ID0gZXhwb3J0cy5EaXZpZGVyID0gZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBleHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBleHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBleHBvcnRzLkRhdGVGaWVsZCA9IGV4cG9ydHMuQ29udGV4dFZpZXcgPSBleHBvcnRzLkNoaXAgPSBleHBvcnRzLkNoaXBMaXN0ID0gZXhwb3J0cy5DaGVja2JveCA9IGV4cG9ydHMuQnV0dG9uID0gZXhwb3J0cy5CdXR0b25Hcm91cCA9IGV4cG9ydHMuQm94ID0gZXhwb3J0cy5CYXJDaGFydCA9IGV4cG9ydHMuQmFubmVyID0gZXhwb3J0cy5CYWRnZSA9IGV4cG9ydHMuQWNjb3JkaW9uID0gZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gdm9pZCAwO1xuZXhwb3J0cy5Ub29sdGlwID0gZXhwb3J0cy5UZXh0RmllbGQgPSBleHBvcnRzLlRleHRBcmVhID0gZXhwb3J0cy5UYXNrTGlzdCA9IGV4cG9ydHMuVGFza0xpc3RJdGVtID0gZXhwb3J0cy5UYWJzID0gZXhwb3J0cy5UYWJsZVJvdyA9IGV4cG9ydHMuVGFibGUgPSB2b2lkIDA7XG5jb25zdCBqc3hfcnVudGltZV8xID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJAcmVtb3RlLXVpL3JlYWN0XCIpO1xuY29uc3QgdmVyc2lvbl8xID0gcmVxdWlyZShcIi4uL3ZlcnNpb25cIik7XG5jb25zdCB3aXRoU2RrUHJvcHMgPSAoQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgV2l0aFNka1Byb3BzID0gKHByb3BzKSA9PiAoKDAsIGpzeF9ydW50aW1lXzEuanN4KShDb21wb25lbnQsIHsgLi4ucHJvcHMsIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSwgc2RrVmVyc2lvbjogdmVyc2lvbl8xLlNES19WRVJTSU9OLCBzY2hlbWFWZXJzaW9uOiBcInY5XCIgfSkpO1xuICAgIFdpdGhTZGtQcm9wcy53cmFwcGVkQ29tcG9uZW50TmFtZSA9IHdyYXBwZWRDb21wb25lbnROYW1lO1xuICAgIHJldHVybiBXaXRoU2RrUHJvcHM7XG59O1xuY29uc3QgZGVmaW5lQ29tcG9uZW50ID0gKG5hbWUsIGZyYWdtZW50UHJvcHMsIHdyYXBXaXRoU2RrUHJvcHMpID0+IHtcbiAgICBjb25zdCByZW1vdGVDb21wb25lbnQgPSAoMCwgcmVhY3RfMS5jcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCkobmFtZSwge1xuICAgICAgICBmcmFnbWVudFByb3BzLFxuICAgIH0pO1xuICAgIGlmICghd3JhcFdpdGhTZGtQcm9wcykge1xuICAgICAgICByZXR1cm4gcmVtb3RlQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aFNka1Byb3BzKHJlbW90ZUNvbXBvbmVudCk7XG59O1xuZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb25JdGVtJywgWyd0aXRsZScsICdhY3Rpb25zJywgJ21lZGlhJywgJ3N1YnRpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5BY2NvcmRpb24gPSBkZWZpbmVDb21wb25lbnQoJ0FjY29yZGlvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFkZ2UgPSBkZWZpbmVDb21wb25lbnQoJ0JhZGdlJywgW10sIHRydWUpO1xuZXhwb3J0cy5CYW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ0Jhbm5lcicsIFsnYWN0aW9ucycsICdkZXNjcmlwdGlvbicsICd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQmFyQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0JhckNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5Cb3ggPSBkZWZpbmVDb21wb25lbnQoJ0JveCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0J1dHRvbkdyb3VwJywgWydtZW51VHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoZWNrYm94ID0gZGVmaW5lQ29tcG9uZW50KCdDaGVja2JveCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXBMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdDaGlwTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ2hpcCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ29udGV4dFZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0NvbnRleHRWaWV3JywgWydhY3Rpb25zJywgJ2Jhbm5lcicsICdmb290ZXJDb250ZW50JywgJ3ByaW1hcnlBY3Rpb24nLCAnc2Vjb25kYXJ5QWN0aW9uJ10sIHRydWUpO1xuZXhwb3J0cy5EYXRlRmllbGQgPSBkZWZpbmVDb21wb25lbnQoJ0RhdGVGaWVsZCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VNb2R1bGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VUYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZVRhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EaXZpZGVyID0gZGVmaW5lQ29tcG9uZW50KCdEaXZpZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Gb2N1c1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0ZvY3VzVmlldycsIFsnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0Zvcm1GaWVsZEdyb3VwJywgW10sIHRydWUpO1xuZXhwb3J0cy5JY29uID0gZGVmaW5lQ29tcG9uZW50KCdJY29uJywgW10sIHRydWUpO1xuZXhwb3J0cy5JbWcgPSBkZWZpbmVDb21wb25lbnQoJ0ltZycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW5saW5lID0gZGVmaW5lQ29tcG9uZW50KCdJbmxpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpbmVDaGFydCA9IGRlZmluZUNvbXBvbmVudCgnTGluZUNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5rID0gZGVmaW5lQ29tcG9uZW50KCdMaW5rJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnTGlzdEl0ZW0nLCBbJ2ljb24nLCAnaW1hZ2UnLCAnc2Vjb25kYXJ5VGl0bGUnLCAndGl0bGUnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVHcm91cCA9IGRlZmluZUNvbXBvbmVudCgnTWVudUdyb3VwJywgWyd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuTWVudUl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ01lbnVJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51ID0gZGVmaW5lQ29tcG9uZW50KCdNZW51JywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuZXhwb3J0cy5PbmJvYXJkaW5nVmlldyA9IGRlZmluZUNvbXBvbmVudCgnT25ib2FyZGluZ1ZpZXcnLCBbJ2Vycm9yJ10sIHRydWUpO1xuZXhwb3J0cy5QbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdQbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5Qcm9wZXJ0eUxpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3RJdGVtJywgWydsYWJlbCcsICd2YWx1ZSddLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlJhZGlvID0gZGVmaW5lQ29tcG9uZW50KCdSYWRpbycsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNlbGVjdCA9IGRlZmluZUNvbXBvbmVudCgnU2VsZWN0JywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTZXR0aW5nc1ZpZXcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNpZ25JblZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1NpZ25JblZpZXcnLCBbJ2Rlc2NyaXB0aW9uQWN0aW9uQ29udGVudHMnLCAnZm9vdGVyQ29udGVudCddLCB0cnVlKTtcbmV4cG9ydHMuU3BhcmtsaW5lID0gZGVmaW5lQ29tcG9uZW50KCdTcGFya2xpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNwaW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ1NwaW5uZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGRlZmluZUNvbXBvbmVudCgnU3RyaXBlRmlsZVVwbG9hZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Td2l0Y2ggPSBkZWZpbmVDb21wb25lbnQoJ1N3aXRjaCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1RhYkxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiUGFuZWxzID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbHMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYiA9IGRlZmluZUNvbXBvbmVudCgnVGFiJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUJvZHkgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlQm9keScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVDZWxsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUNlbGwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlRm9vdGVyID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUZvb3RlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVIZWFkID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUhlYWQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkZXJDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnVGFibGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlUm93ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZVJvdycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFicyA9IGRlZmluZUNvbXBvbmVudCgnVGFicycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFza0xpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdEl0ZW0nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEFyZWEgPSBkZWZpbmVDb21wb25lbnQoJ1RleHRBcmVhJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0RmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5Ub29sdGlwID0gZGVmaW5lQ29tcG9uZW50KCdUb29sdGlwJywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogUHJpdmF0ZSEgVGhpcyBhbGxvd3MgdGhlIHNoYXJlZCBlbmRwb2ludCB0byBiZSBpbnRpYWxpemVkXG4gKiBzbyB0aGF0IHRoZSBTREsgY2FuIGNvbW11bmljYXRlIHdpdGggdGhlIERhc2hib2FyZC5cbiAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRIb3N0RW5kcG9pbnQgPSB2b2lkIDA7XG5jb25zdCBpbnZhcmlhbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaW52YXJpYW50XCIpKTtcbmNvbnN0IGdldEhvc3RFbmRwb2ludCA9ICgpID0+IHtcbiAgICAvLyBUaGlzIGlzIGVuZHBvaW50IGlzIGNyZWF0ZWQgZnJvbSB0aGUgTWVzc2FnZVBvcnQgdHJhbnNmZXJyZWQgZnJvbSB0aGUgaG9zdCBlbnZcbiAgICAvLyBhcyBhIHBhcnQgb2YgdGhlIGBpbml0X2V4dGVuc2lvbmAgbWVzc2FnZS5cbiAgICBjb25zdCBob3N0RW5kcG9pbnQgPSBnbG9iYWxUaGlzLl9fU3RyaXBlRXh0RXhwb3J0cz8uZW5kcG9pbnQ7XG4gICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKGhvc3RFbmRwb2ludCwgJ2hvc3RFbmRwb2ludCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQnKTtcbiAgICByZXR1cm4gaG9zdEVuZHBvaW50O1xufTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gZ2V0SG9zdEVuZHBvaW50O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSB2b2lkIDA7XG5jb25zdCBfZW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuLi9fZW5kcG9pbnRcIik7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpXG4gICAgLmNhbGwuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KClcbiAgICAudGhlbigoc3VwcG9ydGVkKSA9PiBzdXBwb3J0ZWQpXG4gICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hBcHBFbWJlZGRlZEtleSgpO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGFwcCBlbWJlZGRlZCBrZXknKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaUtleTtcbn07XG5leHBvcnRzLmZldGNoQXBwRW1iZWRkZWRLZXkgPSBmZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gdm9pZCAwO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vZmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWUgPSBhc3luYyAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgZmV0Y2hBcHBFbWJlZGRlZEtleV8xLmZldGNoQXBwRW1iZWRkZWRLZXkpKCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGluaXQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgY29uc3Qgc2VyaWFsaXphYmxlUmVzcG9uc2UgPSB7XG4gICAgICAgIGpzb246IHVuZGVmaW5lZCxcbiAgICAgICAgYXJyYXlCdWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb2s6IHJlc3BvbnNlLm9rLFxuICAgICAgICByZWRpcmVjdGVkOiByZXNwb25zZS5yZWRpcmVjdGVkLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgdHlwZTogcmVzcG9uc2UudHlwZSxcbiAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgfTtcbiAgICBzd2l0Y2ggKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkge1xuICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc2VyaWFsaXphYmxlUmVzcG9uc2U7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gZmV0Y2hWaWFGcmFtZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFIb3N0ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0ID0gYXN5bmMgKGVuY29kZWRVcmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5jb2RlZFVybCk7XG4gICAgcmV0dXJuICgwLCBfZW5kcG9pbnRfMS5nZXRIb3N0RW5kcG9pbnQpKCkuY2FsbC5zdHJpcGVBcGlGZXRjaCh1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCBvcHRpb25zKTtcbn07XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IGZldGNoVmlhSG9zdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWVfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhRnJhbWVcIik7XG5jb25zdCBmZXRjaFZpYUhvc3RfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhSG9zdFwiKTtcbmxldCBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gbnVsbDtcbmNvbnN0IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCkge1xuICAgICAgICBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gKGF3YWl0ICgwLCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMS5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkpKCkpXG4gICAgICAgICAgICA/IGZldGNoVmlhRnJhbWVfMS5mZXRjaFZpYUZyYW1lXG4gICAgICAgICAgICA6IGZldGNoVmlhSG9zdF8xLmZldGNoVmlhSG9zdDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkU3RyaXBlQXBpRmV0Y2g7XG59O1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHZvaWQgMDtcbnZhciBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDsgfSB9KTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IHN0cmlwZUFwaUZldGNoID0gYXN5bmMgKHBhdGgsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcmVmZXJyZWRGZXRjaE1ldGhvZCA9IGF3YWl0ICgwLCBhcGlfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCkoKTtcbiAgICByZXR1cm4gcHJlZmVycmVkRmV0Y2hNZXRob2QocGF0aCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5zdHJpcGVBcGlGZXRjaCA9IHN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSBleHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBleHBvcnRzLlNUUklQRV9BUElfS0VZID0gZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IHZvaWQgMDtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBIdHRwQ2xpZW50IHRoYXQgY2FuIGJlIHBsdWdnZWQgaW50byBzdHJpcGUtbm9kZVxuICogdGhhdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHVzZSBzdHJpcGUtbm9kZSBpbiBleHRlbnNpb25zIGlmIHRoZSBEYXNoYm9hcmRcbiAqIHByb3ZpZGVzIGEgYHN0cmlwZUFwaUZldGNoYCBmdW5jdGlvbiB0aGF0IHdpbGwgcmVsYXkgQVBJIGNhbGxzIHRocm91Z2ggdGhlXG4gKiBEYXNoYm9hcmQgYW5kIHBpZ2d5IGJhY2sgb24gdGhlIHVzZXIncyBEYXNoYm9hcmQgc2Vzc2lvbi5cbiAqL1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBhcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vYXBpRmV0Y2hcIik7XG5jb25zdCBtYXRjaGVzU3RyaXBlS2V5ID0gL1twc11rXyh0ZXN0fGxpdmUpX1tBLVphLXowLTldKy87XG5jbGFzcyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwKSB7XG4gICAgICAgIHRoaXMuX3Jlc3AgPSByZXNwO1xuICAgIH1cbiAgICBnZXRIZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5oZWFkZXJzO1xuICAgIH1cbiAgICBnZXRTdGF0dXNDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5zdGF0dXM7XG4gICAgfVxuICAgIGdldFJhd1Jlc3BvbnNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICB0b1N0cmVhbSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJlYW1zIGhhdmUgbm90IGJlZW4gaW1wbGVtZW50ZWQgaW4gdGhlIFN0cmlwZSBIVFRQIGNsaWVudCcpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgeyBqc29uIH0gPSB0aGlzLl9yZXNwO1xuICAgICAgICBpZiAoanNvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdSZXNwb25zZSBib2R5IHVuZGVmaW5lZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdHJpcGVBcHBzSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoZmV0Y2gpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBnZXRDbGllbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3N0cmlwZS11aS1leHRlbnNpb24nO1xuICAgIH1cbiAgICBhc3luYyBtYWtlUmVxdWVzdChob3N0LCBwb3J0LCBwYXRoLCBtZXRob2QsIGhlYWRlcnMsIHJlcXVlc3REYXRhLCBwcm90b2NvbCwgX3RpbWVvdXQpIHtcbiAgICAgICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKHByb3RvY29sID09PSAnaHR0cHMnLCAnTXVzdCB1c2UgaHR0cHMgY29ubmVjdGlvbnMgaW4gVUkgZXh0ZW5zaW9ucycpO1xuICAgICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAocmVxdWVzdERhdGEpIHtcbiAgICAgICAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gcmVxdWVzdERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGhlYWRlcnMuQXV0aG9yaXphdGlvbjtcbiAgICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgbWF0Y2hlc1N0cmlwZUtleS50ZXN0KGF1dGhIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgYWN0dWFsIHN0cmlwZSBrZXlzIHdoZW4gdXNpbmcgdGhlIFN0cmlwZSBKUyBBUEkgY2xpZW50IHdpdGggVUkgZXh0ZXNpb25zLlxcblxcbiBJbnN0ZWFkLCB1c2UgYFNUUklQRV9BUElfS0VZYCBmcm9tIGBAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvaHR0cF9jbGllbnRgIGFzIGEgcGxhY2Vob2xkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBgJHtwcm90b2NvbH06Ly8ke2hvc3R9YCk7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9mZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKTtcbiAgICAgICAgLy8gVE9ETzogQWRkIHN1cHBvcnQgZm9yIHRpbWVvdXRzLlxuICAgICAgICByZXR1cm4gbmV3IFN0cmlwZUFwcHNIdHRwUmVzcG9uc2UocmVzcCk7XG4gICAgfVxufVxuZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IFN0cmlwZUFwcHNIdHRwQ2xpZW50O1xuLy8gRE8gTk9UIGNoYW5nZSB0aGlzIHN0cmluZyB3aXRob3V0IGEgZGVwcmVjYXRpb24gcGxhbi4gVGhlIHJ1bnRpbWUgY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoaXNcbi8vIGV4YWN0IHN0cmluZyBpcyBwYXNzZWQsIG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuLy8gU2VlOiBtYW5hZ2UvZnJvbnRlbmQvc3JjL3RhaWxvci9leHRlbnNpb25zL2hvc3QvYXBpX2ZldGNoLmpzXG5leHBvcnRzLlNUUklQRV9BUElfS0VZID0gJ0RPX05PVF9QQVNTX0FfUkVBTF9BUElfS0VZJztcbmNvbnN0IGNyZWF0ZUh0dHBDbGllbnQgPSAoKSA9PiBuZXcgU3RyaXBlQXBwc0h0dHBDbGllbnQoYXBpRmV0Y2hfMS5zdHJpcGVBcGlGZXRjaCk7XG5leHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBjcmVhdGVIdHRwQ2xpZW50O1xuZXhwb3J0cy5BVVRIT1JJWkFUSU9OX0hFQURFUiA9ICdBdXRob3JpemF0aW9uJztcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGBCZWFyZXIgJHtleHBvcnRzLlNUUklQRV9BUElfS0VZfWA7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSB2b2lkIDA7XG5jb25zdCBodHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi4vaHR0cENsaWVudFwiKTtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoeyBob3N0LCBwb3J0IH0pID0+IGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cHM6Ly8ke2hvc3R9OiR7cG9ydH0vdjEvYXBwcy9hcHBfZW1iZWRkZWRfYmFja2VuZF9zaWduYXR1cmVgKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncGF5bG9hZCcsIEpTT04uc3RyaW5naWZ5KHsgLi4ucGF5bG9hZCB9KSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2luY2x1ZGVfb25seVtdJywgJ3NpZ25hdHVyZScpO1xuICAgIGNvbnN0IGNsaWVudCA9ICgwLCBodHRwQ2xpZW50XzEuY3JlYXRlSHR0cENsaWVudCkoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGNsaWVudC5tYWtlUmVxdWVzdChob3N0LCBwb3J0LCB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCAnR0VUJywge30sIG51bGwsICdodHRwcycpO1xuICAgIHJldHVybiByZXNwb25zZVxuICAgICAgICAudGhlbigocikgPT4gci50b0pTT04oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuc2lnbmF0dXJlKTtcbn07XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRDb25uZWN0aW9uU2V0dGluZ3MgPSBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHZvaWQgMDtcbmNvbnN0IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgaG9zdDogJ2FwaS5zdHJpcGUuY29tJyxcbiAgICBwb3J0OiA0NDMsXG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0gZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncztcbmNvbnN0IHNldENvbm5lY3Rpb25TZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIGV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgICAgICAuLi5kZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzLFxuICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gc2V0Q29ubmVjdGlvblNldHRpbmdzO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IHZvaWQgMDtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMSA9IHJlcXVpcmUoXCIuL3NpZ25hdHVyZS9jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9hcGkvc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XCIpO1xuY29uc3QgY29ubmVjdGlvblNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzXCIpO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9fZW5kcG9pbnRcIik7XG5jb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGFzeW5jIChhZGRpdGlvbmFsUGF5bG9hZCkgPT4ge1xuICAgIGlmIChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKSB7XG4gICAgICAgIGNvbnN0IGZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoMCwgY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseV8xLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkpKGNvbm5lY3Rpb25TZXR0aW5nc18xLmNvbm5lY3Rpb25TZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hTdHJpcGVTaWduYXR1cmUoYWRkaXRpb25hbFBheWxvYWQpO1xuICAgIH1cbn07XG5leHBvcnRzLmZldGNoU3RyaXBlU2lnbmF0dXJlID0gZmV0Y2hTdHJpcGVTaWduYXR1cmU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBUaGlzIGZpbGUgbW92ZWQgdG8gdXRpbHM7IHJlLWV4cG9ydGVkIHRvIG5vdCBicmVhayBpbXBvcnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaWduYXR1cmVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NpZ25hdHVyZVwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpZ25hdHVyZV8xLmZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIi8vIEFVVE9HRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG5pbXBvcnQgUGF5bWVudERpc3B1dGVWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcnO2ltcG9ydCBEaXNwdXRlTGlzdFZpZXcgZnJvbSAnLi4vc3JjL3ZpZXdzL0Rpc3B1dGVMaXN0Vmlldyc7aW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4uL3NyYy92aWV3cy9BcHBTZXR0aW5ncyc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjYtMDQtMTQgMjI6NDg6MTQuNjQyMSAtMDcwMCBQRFQgbT0rMC4wMDYyOTc0MTcnO1xuXG5leHBvcnQgeyBcbiAgUGF5bWVudERpc3B1dGVWaWV3LFxuXG4gIERpc3B1dGVMaXN0VmlldyxcblxuICBBcHBTZXR0aW5nc1xuIH07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJpY29uXCI6IFwiXCIsXG4gIFwiaWRcIjogXCJjb20uamtidGVjaC53aW5iYWNrXCIsXG4gIFwibmFtZVwiOiBcIldpbkJhY2tcIixcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZGlzcHV0ZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGRpc3B1dGUgZGV0YWlscyB0byBndWlkZSBtZXJjaGFudHMgdGhyb3VnaCB0aGUgcmVzcG9uc2UgcHJvY2Vzc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3dyaXRlXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJTdWJtaXQgZXZpZGVuY2UgYW5kIHJlc3BvbnNlcyBvbiBiZWhhbGYgb2YgdGhlIG1lcmNoYW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImNoYXJnZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGNoYXJnZSBkZXRhaWxzIGFzc29jaWF0ZWQgd2l0aCBkaXNwdXRlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJjdXN0b21lcl9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGN1c3RvbWVyIGluZm9ybWF0aW9uIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHVwbG9hZGVkIGV2aWRlbmNlIGZpbGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImZpbGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlVwbG9hZCBldmlkZW5jZSBmaWxlcyBmb3IgZGlzcHV0ZSByZXNwb25zZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9pbnRlbnRfcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBwYXltZW50IGludGVudCBkZXRhaWxzIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH1cbiAgXSxcbiAgXCJwb3N0X2luc3RhbGxfYWN0aW9uXCI6IHtcbiAgICBcInR5cGVcIjogXCJzZXR0aW5nc1wiXG4gIH0sXG4gIFwidWlfZXh0ZW5zaW9uXCI6IHtcbiAgICBcImNvbnRlbnRfc2VjdXJpdHlfcG9saWN5XCI6IHtcbiAgICAgIFwiY29ubmVjdC1zcmNcIjogW1xuICAgICAgICBcImh0dHBzOi8vd2luYmFja3BheS5jb20vYXBpL1wiLFxuICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJcIlxuICAgIH0sXG4gICAgXCJ2aWV3c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiUGF5bWVudERpc3B1dGVWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLnBheW1lbnQuZGV0YWlsXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiRGlzcHV0ZUxpc3RWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLmRyYXdlci5kZWZhdWx0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiQXBwU2V0dGluZ3NcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInNldHRpbmdzXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCJcbn07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQmFkZ2UsXG4gIEJ1dHRvbixcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UsIGdldFJlYXNvbkNvZGVMYWJlbCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbnR5cGUgVmlld1N0YXRlID0gJ2xvYWRpbmcnIHwgJ25vX2Rpc3B1dGUnIHwgJ2Vycm9yJyB8ICdyZWFkeSc7XG5cbmNvbnN0IFBheW1lbnREaXNwdXRlVmlldyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgeyBlbnZpcm9ubWVudCB9ID0gY29udGV4dDtcbiAgY29uc3QgcGF5bWVudEludGVudElkID0gZW52aXJvbm1lbnQ/Lm9iamVjdENvbnRleHQ/LmlkO1xuXG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBheW1lbnRJbnRlbnRJZCkge1xuICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGUgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzL2J5LXBheW1lbnQtaW50ZW50LyR7cGF5bWVudEludGVudElkfWAsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICk7XG4gICAgICBzZXREaXNwdXRlKHJlc3VsdC5kYXRhKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgncmVhZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgc2V0Vmlld1N0YXRlKCdub19kaXNwdXRlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbcGF5bWVudEludGVudElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGlzcHV0ZSgpO1xuICB9LCBbbG9hZERpc3B1dGVdKTtcblxuICBpZiAodmlld1N0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdub19kaXNwdXRlJyB8fCB2aWV3U3RhdGUgPT09ICdlcnJvcicgfHwgIWRpc3B1dGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIE5vIGRpc3B1dGUgb24gdGhpcyBwYXltZW50LlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ29udGV4dFZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXR1c0JhZGdlID0gZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCByZWFzb25MYWJlbCA9IGdldFJlYXNvbkNvZGVMYWJlbChkaXNwdXRlLm5ldHdvcmssIGRpc3B1dGUucmVhc29uX2NvZGUpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiPlxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBEaXNwdXRlXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtyZWFzb25MYWJlbCA/PyBkaXNwdXRlLnJlYXNvbi5yZXBsYWNlKC9fL2csICcgJyl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5uZXR3b3JrLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgZGlzcHV0ZS5uZXR3b3JrLnNsaWNlKDEpfXsnICd9XG4gICAgICAgICAgICB7ZGlzcHV0ZS5yZWFzb25fY29kZX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgeyhkaXNwdXRlLnN0YXR1cyA9PT0gJ25lZWRzX3Jlc3BvbnNlJyB8fFxuICAgICAgICAgIGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZScpICYmIChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gc2V0U2hvd1dvcmtmbG93KHRydWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE9wZW4gaW4gV2luQmFja1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxEaXNwdXRlV29ya2Zsb3dcbiAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgc2V0U2hvd249e3NldFNob3dXb3JrZmxvd31cbiAgICAgIC8+XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBheW1lbnREaXNwdXRlVmlldztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQmFubmVyLFxuICBGb2N1c1ZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbiAgVGFicyxcbiAgVGFiLFxuICBUYWJMaXN0LFxuICBUYWJQYW5lbHMsXG4gIFRhYlBhbmVsLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IFdpemFyZFN0ZXAsIERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IFdJWkFSRF9TVEVQUywgV0laQVJEX1NURVBfTEFCRUxTIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldERheXNSZW1haW5pbmcsIGlzUmVzb2x2ZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4vRXJyb3JCYW5uZXInO1xuaW1wb3J0IERlYWRsaW5lVGltZXIgZnJvbSAnLi9EZWFkbGluZVRpbWVyJztcbmltcG9ydCBEaXNwdXRlT3ZlcnZpZXcgZnJvbSAnLi9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3JztcbmltcG9ydCBDb2FjaEhlYWRlciBmcm9tICcuL3Jldmlldy9Db2FjaEhlYWRlcic7XG5pbXBvcnQgUXVpY2tBY3Rpb25zIGZyb20gJy4vcmV2aWV3L1F1aWNrQWN0aW9ucyc7XG5pbXBvcnQgTGVhcm5Nb3JlIGZyb20gJy4vcmV2aWV3L0xlYXJuTW9yZSc7XG5pbXBvcnQgRXZpZGVuY2VDaGVja2xpc3QgZnJvbSAnLi9ldmlkZW5jZS9FdmlkZW5jZUNoZWNrbGlzdCc7XG5pbXBvcnQgTmFycmF0aXZlUGFuZWwgZnJvbSAnLi9uYXJyYXRpdmUvTmFycmF0aXZlUGFuZWwnO1xuaW1wb3J0IFN1Ym1pdFZpZXcgZnJvbSAnLi9zdWJtaXQvU3VibWl0Vmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbmZpcm1hdGlvbiBmcm9tICcuL3N1Ym1pdC9TdWJtaXNzaW9uQ29uZmlybWF0aW9uJztcblxuaW50ZXJmYWNlIERpc3B1dGVXb3JrZmxvd1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBzaG93bjogYm9vbGVhbjtcbiAgc2V0U2hvd246IChzaG93bjogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuY29uc3QgRGlzcHV0ZVdvcmtmbG93ID0gKHsgZGlzcHV0ZTogaW5pdGlhbERpc3B1dGUsIGNvbnRleHQsIHNob3duLCBzZXRTaG93biB9OiBEaXNwdXRlV29ya2Zsb3dQcm9wcykgPT4ge1xuICBjb25zdCBbY3VycmVudFN0ZXAsIHNldEN1cnJlbnRTdGVwXSA9IHVzZVN0YXRlPFdpemFyZFN0ZXA+KCdyZXZpZXcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZT4oaW5pdGlhbERpc3B1dGUpO1xuICBjb25zdCBbcGxheWJvb2ssIHNldFBsYXlib29rXSA9IHVzZVN0YXRlPFBsYXlib29rRGF0YSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTx7IGRpc3B1dGU6IGJvb2xlYW47IHBsYXlib29rOiBib29sZWFuIH0+KHtcbiAgICBkaXNwdXRlOiBmYWxzZSxcbiAgICBwbGF5Ym9vazogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBzdHJpbmcgfCBudWxsOyBwbGF5Ym9vazogc3RyaW5nIHwgbnVsbCB9Pih7XG4gICAgZGlzcHV0ZTogbnVsbCxcbiAgICBwbGF5Ym9vazogbnVsbCxcbiAgfSk7XG4gIGNvbnN0IFtlZGl0ZWROYXJyYXRpdmUsIHNldEVkaXRlZE5hcnJhdGl2ZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtldmlkZW5jZUZpbGVzLCBzZXRFdmlkZW5jZUZpbGVzXSA9IHVzZVN0YXRlPEV2aWRlbmNlRmlsZVtdPihbXSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3duKSByZXR1cm47XG5cbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHsgZGlzcHV0ZTogdHJ1ZSwgcGxheWJvb2s6IHRydWUgfSk7XG4gICAgICBzZXRFcnJvcnMoeyBkaXNwdXRlOiBudWxsLCBwbGF5Ym9vazogbnVsbCB9KTtcblxuICAgICAgLy8gRmV0Y2ggZW5yaWNoZWQgZGlzcHV0ZSBhbmQgcGxheWJvb2sgaW4gcGFyYWxsZWxcbiAgICAgIC8vIFNraXAgcGxheWJvb2sgZmV0Y2ggaWYgcmVhc29uX2NvZGUgaXMgZW1wdHkgKHRlc3QgZGlzcHV0ZXMsIHVua25vd24gY29kZXMpXG4gICAgICBjb25zdCBzaG91bGRGZXRjaFBsYXlib29rID0gISFpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZTtcbiAgICAgIGNvbnN0IFtkaXNwdXRlUmVzdWx0LCBwbGF5Ym9va1Jlc3VsdF0gPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlIH0+KGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50KSxcbiAgICAgICAgc2hvdWxkRmV0Y2hQbGF5Ym9va1xuICAgICAgICAgID8gZmV0Y2hCYWNrZW5kPHsgZGF0YTogUGxheWJvb2tEYXRhIH0+KCcvYXBpL3BsYXlib29rcycsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICAgICAgICBuZXR3b3JrOiBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLFxuICAgICAgICAgICAgICByZWFzb25fY29kZTogaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IEFwaUVycm9yKCdObyByZWFzb24gY29kZScsIDQwNCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGlmIChkaXNwdXRlUmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hlZCA9IGRpc3B1dGVSZXN1bHQudmFsdWUuZGF0YTtcbiAgICAgICAgc2V0RGlzcHV0ZShmZXRjaGVkKTtcbiAgICAgICAgaWYgKGZldGNoZWQubmFycmF0aXZlX3RleHQpIHtcbiAgICAgICAgICBzZXRFZGl0ZWROYXJyYXRpdmUoZmV0Y2hlZC5uYXJyYXRpdmVfdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGRpc3B1dGVSZXN1bHQucmVhc29uO1xuICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBkaXNwdXRlOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGUgZGV0YWlscy4nLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBkaXNwdXRlOiBmYWxzZSB9KSk7XG5cbiAgICAgIGlmIChwbGF5Ym9va1Jlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldFBsYXlib29rKHBsYXlib29rUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gcGxheWJvb2tSZXN1bHQucmVhc29uO1xuICAgICAgICAvLyA0MDQgaXMgbm90IGFuIGVycm9yIC0tIGp1c3QgbWVhbnMgbm8gcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGVcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSkge1xuICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5Ym9vazogZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBwbGF5Ym9vay4nLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQbGF5Ym9vayhudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlib29rOiBmYWxzZSB9KSk7XG5cbiAgICAgIC8vIEZldGNoIGV2aWRlbmNlIGZpbGVzIGZvciBuYXJyYXRpdmUgdGFiXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlc1Jlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZVtdIH0+KFxuICAgICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICAgICk7XG4gICAgICAgIHNldEV2aWRlbmNlRmlsZXMoZmlsZXNSZXN1bHQuZGF0YSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGV2aWRlbmNlIGZpbGVzOicsIGVycik7XG4gICAgICAgIHNldEV2aWRlbmNlRmlsZXMoW10pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW3Nob3duLCBpbml0aWFsRGlzcHV0ZS5pZCwgaW5pdGlhbERpc3B1dGUubmV0d29yaywgaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGVdKTtcblxuICAvLyBSZS1mZXRjaCBldmlkZW5jZSBmaWxlcyB3aGVuZXZlciB0aGUgdXNlciBlbnRlcnMgdGhlIG5hcnJhdGl2ZSBzdGVwLlxuICAvLyBUaGUgRXZpZGVuY2UgdGFiIG93bnMgaXRzIG93biB1cGxvYWQgc3RhdGUsIHNvIERpc3B1dGVXb3JrZmxvdydzIGNvcHlcbiAgLy8gZ29lcyBzdGFsZSBhcyBzb29uIGFzIHRoZSBtZXJjaGFudCB1cGxvYWRzIGEgZmlsZS4gUmVmcmVzaGluZyBvbiB0YWJcbiAgLy8gZW50cnkga2VlcHMgdGhlIG5hcnJhdGl2ZSBwcmUtZ2VuZXJhdGlvbiB2aWV3IGluIHN5bmMgd2l0aG91dCBsaWZ0aW5nXG4gIC8vIHVwbG9hZCBzdGF0ZSBhY3Jvc3MgdGhlIHdob2xlIHdvcmtmbG93LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U3RlcCAhPT0gJ25hcnJhdGl2ZScpIHJldHVybjtcbiAgICBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBFdmlkZW5jZUZpbGVbXSB9PihcbiAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7aW5pdGlhbERpc3B1dGUuaWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICApXG4gICAgICAudGhlbigocmVzdWx0KSA9PiBzZXRFdmlkZW5jZUZpbGVzKHJlc3VsdC5kYXRhKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCBldmlkZW5jZSBmaWxlczonLCBlcnIpKTtcbiAgfSwgW2N1cnJlbnRTdGVwLCBpbml0aWFsRGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IHN1Ym1pdHRlZCA9IEJvb2xlYW4oZGlzcHV0ZS5ldmlkZW5jZV9zdWJtaXR0ZWRfYXQpO1xuXG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IFdJWkFSRF9TVEVQUy5pbmRleE9mKGN1cnJlbnRTdGVwKTtcbiAgY29uc3QgaXNGaXJzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IDA7XG4gIGNvbnN0IGlzTGFzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IFdJWkFSRF9TVEVQUy5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0xhc3RTdGVwKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcChXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmICghaXNGaXJzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRheXNSZW1haW5pbmcgPSBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KTtcbiAgY29uc3QgaXNVcmdlbnQgPSBkYXlzUmVtYWluaW5nIDwgNSAmJiAhaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG5cbiAgY29uc3QgcmVuZGVyUmV2aWV3VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTG9hZGluZ1BsYXlib29rID0gbG9hZGluZy5wbGF5Ym9vaztcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgICB7ZXJyb3JzLmRpc3B1dGUgJiYgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9ycy5kaXNwdXRlfSAvPn1cblxuICAgICAgICB7aXNMb2FkaW5nUGxheWJvb2sgPyAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+TG9hZGluZyBwbGF5Ym9vay4uLjwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogZXJyb3JzLnBsYXlib29rID8gKFxuICAgICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMucGxheWJvb2t9IC8+XG4gICAgICAgICkgOiBwbGF5Ym9vayA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvYWNoSGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRsaW5lPXtwbGF5Ym9vay5jb2FjaF9oZWFkbGluZX1cbiAgICAgICAgICAgICAgc3VtbWFyeT17cGxheWJvb2suY29hY2hfc3VtbWFyeX1cbiAgICAgICAgICAgICAgdXJnZW5jeU1vZGU9e2lzVXJnZW50fVxuICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxRdWlja0FjdGlvbnMgcGxheWJvb2s9e3BsYXlib29rfSB1cmdlbmN5TW9kZT17aXNVcmdlbnR9IC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgdGl0bGU9XCJObyBwbGF5Ym9vayBhdmFpbGFibGVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXZSBkb24ndCBoYXZlIGEgc3BlY2lmaWMgcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGUgeWV0LiBVc2UgdGhlIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyB0byBidWlsZCB5b3VyIHJlc3BvbnNlLlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RGlzcHV0ZU92ZXJ2aWV3IGRpc3B1dGU9e2Rpc3B1dGV9IGxvYWRpbmc9e2xvYWRpbmcuZGlzcHV0ZX0gLz5cblxuICAgICAgICB7cGxheWJvb2sgJiYgKFxuICAgICAgICAgIDxMZWFybk1vcmVcbiAgICAgICAgICAgIGlzc3VlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2lzc3Vlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgYWNxdWlyZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9hY3F1aXJlcl9zdW1tYXJ5fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVmlld1xuICAgICAgdGl0bGU9e2BEaXNwdXRlICR7aW5pdGlhbERpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLmB9XG4gICAgICBzaG93bj17c2hvd259XG4gICAgICBzZXRTaG93bj17c2V0U2hvd259XG4gICAgICBjb25maXJtQ2xvc2VNZXNzYWdlcz17e1xuICAgICAgICB0aXRsZTogJ0xlYXZlIGRpc3B1dGUgd29ya2Zsb3c/JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdZb3VyIHByb2dyZXNzIG9uIHRoaXMgc3RlcCB3aWxsIG5vdCBiZSBzYXZlZC4nLFxuICAgICAgICBjYW5jZWxBY3Rpb246ICdTdGF5JyxcbiAgICAgICAgZXhpdEFjdGlvbjogJ0xlYXZlJyxcbiAgICAgIH19XG4gICAgICBwcmltYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNMYXN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0U2hvd24oZmFsc2UpfT5cbiAgICAgICAgICAgIHtzdWJtaXR0ZWQgPyAnRG9uZScgOiAnQ2xvc2UnfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtoYW5kbGVOZXh0fT5cbiAgICAgICAgICAgIE5leHQ6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCArIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgc2Vjb25kYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNGaXJzdFN0ZXAgPyAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXsoKSA9PiBzZXRTaG93bihmYWxzZSl9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlQmFja30+XG4gICAgICAgICAgICBCYWNrOiB7V0laQVJEX1NURVBfTEFCRUxTW1dJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXV19XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICA+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJywgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgKFxuICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRXZpZGVuY2Ugc3VibWl0dGVkXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIGV2aWRlbmNlIGhhcyBiZWVuIHN1Ym1pdHRlZCB0byBTdHJpcGUuIFRoaXMgZGlzcHV0ZSBpcyBub3cgcmVhZC1vbmx5LlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPERlYWRsaW5lVGltZXIgZHVlQnk9e2Rpc3B1dGUuZHVlX2J5fSBzdGF0dXM9e2Rpc3B1dGUuc3RhdHVzfSAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPFRhYnNcbiAgICAgICAgICBmaXR0ZWRcbiAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICBzZWxlY3RlZEtleT17Y3VycmVudFN0ZXB9XG4gICAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2U9eyhrZXkpID0+IHNldEN1cnJlbnRTdGVwKGtleSBhcyBXaXphcmRTdGVwKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUYWJMaXN0PlxuICAgICAgICAgICAge1dJWkFSRF9TVEVQUy5tYXAoKHN0ZXApID0+IChcbiAgICAgICAgICAgICAgPFRhYiBrZXk9e3N0ZXB9IGlkPXtzdGVwfT5cbiAgICAgICAgICAgICAgICB7V0laQVJEX1NURVBfTEFCRUxTW3N0ZXBdfVxuICAgICAgICAgICAgICA8L1RhYj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvVGFiTGlzdD5cbiAgICAgICAgICA8VGFiUGFuZWxzPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwicmV2aWV3XCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJSZXZpZXdUYWIoKX1cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJldmlkZW5jZVwiPlxuICAgICAgICAgICAgICB7LypcbiAgICAgICAgICAgICAgICBJbnRlbnRpb25hbGx5IE5PVCBnYXRlZCBvbiBjdXJyZW50U3RlcC4gS2VlcGluZyB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgbW91bnRlZCBhY3Jvc3MgdGFiIHN3aXRjaGVzIHByZXNlcnZlcyBjaGVja2xpc3QgYW5kIG5vdGVzXG4gICAgICAgICAgICAgICAgc3RhdGUgd2hlbiB0aGUgbWVyY2hhbnQgdGFicyBhd2F5IGFuZCBiYWNrLiBUaGUgcHJldmlvdXMgZ2F0ZVxuICAgICAgICAgICAgICAgIHVubW91bnRlZCB0aGlzIG9uIGV2ZXJ5IHRhYiBzd2l0Y2gsIGtpbGxpbmcgYW55IHBlbmRpbmcgc2F2ZVxuICAgICAgICAgICAgICAgIGFuZCByZS1yZWFkaW5nIHN0YWxlIHN0YXRlIGZyb20gdGhlIHBhcmVudCBkaXNwdXRlIHByb3Agb25cbiAgICAgICAgICAgICAgICByZW1vdW50LiAoV0lOLTQ5KVxuICAgICAgICAgICAgICAqL31cbiAgICAgICAgICAgICAgPEV2aWRlbmNlQ2hlY2tsaXN0XG4gICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgIGlzVXJnZW50PXtpc1VyZ2VudH1cbiAgICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgICAgIHN1Ym1pdHRlZD17c3VibWl0dGVkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cIm5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICB7Y3VycmVudFN0ZXAgPT09ICduYXJyYXRpdmUnICYmIChcbiAgICAgICAgICAgICAgPE5hcnJhdGl2ZVBhbmVsXG4gICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgICAgICAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2U9e3NldEVkaXRlZE5hcnJhdGl2ZX1cbiAgICAgICAgICAgICAgICBvbkFwcHJvdmU9eyh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRFZGl0ZWROYXJyYXRpdmUodGV4dCk7XG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50U3RlcCgnc3VibWl0Jyk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbk5hdmlnYXRlQmFjaz17KCkgPT4gc2V0Q3VycmVudFN0ZXAoJ2V2aWRlbmNlJyl9XG4gICAgICAgICAgICAgICAgc3VibWl0dGVkPXtzdWJtaXR0ZWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgZGlzcHV0ZS5ldmlkZW5jZV9zdWJtaXR0ZWRfYXQgPyAoXG4gICAgICAgICAgICAgICAgPFN1Ym1pc3Npb25Db25maXJtYXRpb25cbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlPXt7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25faWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXR0ZWRfYXQ6IGRpc3B1dGUuZXZpZGVuY2Vfc3VibWl0dGVkX2F0LFxuICAgICAgICAgICAgICAgICAgICBkaXNwdXRlX3N0YXR1czogJ2V2aWRlbmNlX3N1Ym1pdHRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdzOiBbXSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IHBsYXlib29rID8gKFxuICAgICAgICAgICAgICAgIDxTdWJtaXRWaWV3XG4gICAgICAgICAgICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICAgICAgICAgICAgcGxheWJvb2s9e3BsYXlib29rfVxuICAgICAgICAgICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICAgICAgICAgIG5hcnJhdGl2ZVRleHQ9e2VkaXRlZE5hcnJhdGl2ZX1cbiAgICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICAgIG9uU3VibWl0dGVkPXsocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGlzcHV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uZGlzcHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBldmlkZW5jZV9zdWJtaXR0ZWRfYXQ6IHJlc3BvbnNlLnN1Ym1pdHRlZF9hdCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibWVkaXVtXCIgLz5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgIDwvQm94PlxuICAgIDwvRm9jdXNWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZVdvcmtmbG93O1xuIiwgImV4cG9ydCB0eXBlIERpc3B1dGVTdGF0dXMgPVxuICB8ICduZWVkc19yZXNwb25zZSdcbiAgfCAndW5kZXJfcmV2aWV3J1xuICB8ICd3b24nXG4gIHwgJ2xvc3QnXG4gIHwgJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnXG4gIHwgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3J1xuICB8ICd3YXJuaW5nX2Nsb3NlZCdcbiAgfCAnY2hhcmdlX3JlZnVuZGVkJztcblxuZXhwb3J0IHR5cGUgQ2FyZE5ldHdvcmsgPSAndmlzYScgfCAnbWFzdGVyY2FyZCcgfCAnYW1leCcgfCAnZGlzY292ZXInIHwgJ3Vua25vd24nO1xuXG5leHBvcnQgdHlwZSBXaXphcmRTdGVwID0gJ3JldmlldycgfCAnZXZpZGVuY2UnIHwgJ25hcnJhdGl2ZScgfCAnc3VibWl0JztcblxuZXhwb3J0IGNvbnN0IFdJWkFSRF9TVEVQUzogV2l6YXJkU3RlcFtdID0gWydyZXZpZXcnLCAnZXZpZGVuY2UnLCAnbmFycmF0aXZlJywgJ3N1Ym1pdCddO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBfTEFCRUxTOiBSZWNvcmQ8V2l6YXJkU3RlcCwgc3RyaW5nPiA9IHtcbiAgcmV2aWV3OiAnUmV2aWV3JyxcbiAgZXZpZGVuY2U6ICdFdmlkZW5jZScsXG4gIG5hcnJhdGl2ZTogJ05hcnJhdGl2ZScsXG4gIHN1Ym1pdDogJ1N1Ym1pdCcsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3B1dGUge1xuICBpZDogc3RyaW5nO1xuICBhbW91bnQ6IG51bWJlcjtcbiAgY3VycmVuY3k6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHN0YXR1czogRGlzcHV0ZVN0YXR1cztcbiAgZHVlX2J5OiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIG5ldHdvcms6IENhcmROZXR3b3JrO1xuICBwYXltZW50X2ludGVudD86IHN0cmluZztcbiAgY2hhcmdlX2lkOiBzdHJpbmc7XG4gIGN1c3RvbWVyX25hbWU/OiBzdHJpbmc7XG4gIGN1c3RvbWVyX2VtYWlsPzogc3RyaW5nO1xuICBjcmVhdGVkOiBudW1iZXI7XG4gIGV2aWRlbmNlX2R1ZV9ieTogbnVtYmVyO1xuICAvLyBFbnJpY2hlZCBmaWVsZHMgKGF2YWlsYWJsZSBhZnRlciBkZXRhaWwgZmV0Y2gpXG4gIHRyYW5zYWN0aW9uX2RhdGU/OiBudW1iZXI7XG4gIGNhcmRfYnJhbmQ/OiBzdHJpbmc7XG4gIGNhcmRfbGFzdDQ/OiBzdHJpbmc7XG4gIGJpbGxpbmdfYWRkcmVzcz86IHN0cmluZztcbiAgY2hhcmdlX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICByZWNlaXB0X3VybD86IHN0cmluZztcbiAgaGFzX2V2aWRlbmNlPzogYm9vbGVhbjtcbiAgZXZpZGVuY2Vfc3VibWlzc2lvbl9jb3VudD86IG51bWJlcjtcbiAgaXNfY2hhcmdlX3JlZnVuZGFibGU/OiBib29sZWFuO1xuICBtZXRhZGF0YT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGNoZWNrbGlzdF9zdGF0ZT86IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICBjaGVja2xpc3Rfbm90ZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBuYXJyYXRpdmVfdGV4dD86IHN0cmluZyB8IG51bGw7XG4gIGV2aWRlbmNlX3N1Ym1pdHRlZF9hdD86IHN0cmluZyB8IG51bGw7XG4gIC8vIEF1dG8tcHVsbCBmaWVsZHMgKFdJTi0zNylcbiAgYXZzX2FkZHJlc3NfY2hlY2s/OiBzdHJpbmc7XG4gIGF2c196aXBfY2hlY2s/OiBzdHJpbmc7XG4gIGN2Y19jaGVjaz86IHN0cmluZztcbiAgdGhyZWVfZF9zZWN1cmVfcmVzdWx0Pzogc3RyaW5nO1xuICB0aHJlZV9kX3NlY3VyZV92ZXJzaW9uPzogc3RyaW5nO1xuICBhdXRob3JpemF0aW9uX2NvZGU/OiBzdHJpbmc7XG4gIG5ldHdvcmtfc3RhdHVzPzogc3RyaW5nO1xuICByZWZ1bmRzPzogQXJyYXk8eyBhbW91bnQ6IG51bWJlcjsgY3JlYXRlZDogbnVtYmVyOyBzdGF0dXM6IHN0cmluZyB9Pjtcbn1cblxuLy8gUGxheWJvb2sgdHlwZXMgKG1pcnJvcnMgYmFja2VuZCBQbGF5Ym9va0RhdGEpXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VDaGVja2xpc3RJdGVtIHtcbiAgaXRlbTogc3RyaW5nO1xuICBjYXRlZ29yeTogJ21hbmRhdG9yeScgfCAncmVjb21tZW5kZWQnIHwgJ3NpdHVhdGlvbmFsJztcbiAgY29udGV4dDogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgd2h5X21hdHRlcnM6IHN0cmluZztcbiAgd2hlcmVfdG9fZmluZD86IHN0cmluZztcbiAgc3RyaXBlX2ZpZWxkPzogc3RyaW5nO1xuICBuYXJyYXRpdmVfb25seT86IGJvb2xlYW47XG4gIC8vIFBlci1wbGF5Ym9vayBjYW5uZWQgbWVyY2hhbnQgYXNzZXJ0aW9uIHVzZWQgYnkgdGhlIGJhY2tlbmQgcHJvbXB0IGJ1aWxkZXJcbiAgLy8gd2hlbiBhIFQgaXRlbSBoYXMgbm8gbWVyY2hhbnQgbm90ZS4gRnJvbnRlbmQgZG9lc24ndCByZW5kZXIgdGhpcyAtLSBpdCdzXG4gIC8vIG9ubHkgaGVyZSBzbyB0aGUgdHlwZSBtYXRjaGVzIHRoZSBiYWNrZW5kIHBheWxvYWQuIChXSU4tNDkpXG4gIG5hcnJhdGl2ZV9mYWxsYmFjaz86IHN0cmluZztcbiAgdXJnZW5jeV9lc3NlbnRpYWw6IGJvb2xlYW47XG4gIHVyZ2VuY3lfb3JkZXI6IG51bWJlciB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxheWJvb2tEYXRhIHtcbiAgbmV0d29yazogc3RyaW5nO1xuICByZWFzb25fY29kZTogc3RyaW5nO1xuICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29hY2hfaGVhZGxpbmU6IHN0cmluZztcbiAgY29hY2hfc3VtbWFyeTogc3RyaW5nO1xuICBjb2FjaF9pc3N1ZXJfc3VtbWFyeTogc3RyaW5nO1xuICBjb2FjaF9hY3F1aXJlcl9zdW1tYXJ5OiBzdHJpbmc7XG4gIGlzc3Vlcl9ldmFsdWF0aW9uOiBzdHJpbmc7XG4gIGFjcXVpcmVyX3ByZXJldmlldzogc3RyaW5nO1xuICBldmlkZW5jZV9jaGVja2xpc3Q6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVtdO1xuICBjb21tb25fbWlzdGFrZXM6IHsgbWlzdGFrZTogc3RyaW5nOyBleHBsYW5hdGlvbjogc3RyaW5nIH1bXTtcbiAgcHJvX3RpcHM6IHsgdGlwOiBzdHJpbmcgfVtdO1xuICB1cmdlbmN5X2Vzc2VudGlhbHM6IHsgc3VtbWFyeTogc3RyaW5nOyBvcmRlcmVkX2l0ZW1zOiBzdHJpbmdbXSB9O1xuICBuYXJyYXRpdmVfdGVtcGxhdGU6IHN0cmluZztcbiAgcmVzcG9uc2VfZGVhZGxpbmVfZGF5czogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV2aWRlbmNlRmlsZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHN0cmlwZV9maWxlX2lkOiBzdHJpbmc7XG4gIGNoZWNrbGlzdF9pdGVtX2tleTogc3RyaW5nO1xuICBmaWxlX25hbWU6IHN0cmluZztcbiAgZmlsZV9zaXplOiBudW1iZXI7XG4gIG1pbWVfdHlwZTogc3RyaW5nO1xuICB1cGxvYWRlZF9hdDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdWJtaXNzaW9uV2FybmluZyA9XG4gIHwgeyBjb2RlOiAnZmllbGRfdHJ1bmNhdGVkJzsgZmllbGQ6IHN0cmluZzsgb3JpZ2luYWxfbGVuZ3RoOiBudW1iZXI7IHRydW5jYXRlZF9sZW5ndGg6IG51bWJlciB9XG4gIHwgeyBjb2RlOiAnZmllbGRfY29sbGlzaW9uJzsgd2lubmluZ19pdGVtOiBzdHJpbmc7IGxvc2luZ19pdGVtOiBzdHJpbmc7IGZpZWxkOiBzdHJpbmc7IHJlc29sdXRpb246ICd1bmNhdGVnb3JpemVkX2ZpbGUnIHwgJ2Ryb3BwZWQnIH1cbiAgfCB7IGNvZGU6ICdtaXNzaW5nX21hbmRhdG9yeV9pdGVtcyc7IGl0ZW1zOiBzdHJpbmdbXSB9XG4gIHwgeyBjb2RlOiAnZGVhZGxpbmVfcGFzc2VkJzsgZHVlX2J5OiBudW1iZXIgfVxuICB8IHsgY29kZTogJ2NvbmNhdF9za2lwcGVkJzsgZmlsZV9uYW1lOiBzdHJpbmc7IHNsb3Q6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfTtcblxuZXhwb3J0IGludGVyZmFjZSBTdWJtaXNzaW9uUmVzcG9uc2Uge1xuICBzdWJtaXNzaW9uX2lkOiBzdHJpbmc7XG4gIHN1Ym1pdHRlZF9hdDogc3RyaW5nO1xuICBkaXNwdXRlX3N0YXR1czogc3RyaW5nO1xuICB3YXJuaW5nczogU3VibWlzc2lvbldhcm5pbmdbXTtcbn1cbiIsICJpbXBvcnQgZmV0Y2hTdHJpcGVTaWduYXR1cmUgZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3NpZ25hdHVyZSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcblxuLy8gVG9nZ2xlIGZvciBsb2NhbCBkZXZlbG9wbWVudDogc2V0IHRvIHRydWUgd2hlbiBydW5uaW5nIGBzdHJpcGUgYXBwcyBzdGFydGBcbmNvbnN0IFVTRV9MT0NBTF9CQUNLRU5EID0gdHJ1ZTtcblxuY29uc3QgQkFDS0VORF9VUkwgPSBVU0VfTE9DQUxfQkFDS0VORFxuICA/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIDogJ2h0dHBzOi8vd2luYmFja3BheS5jb20nO1xuXG5leHBvcnQgY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBwdWJsaWMgc3RhdHVzOiBudW1iZXIsXG4gICAgcHVibGljIGNvZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdBcGlFcnJvcic7XG4gIH1cbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIHJlcXVlc3QgdG8gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqIEF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgU3RyaXBlIEFwcCBzaWduYXR1cmUgYW5kIGlkZW50aXR5IGZpZWxkcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQmFja2VuZDxUID0gdW5rbm93bj4oXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlLFxuICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLmVycm9yIHx8IGVycm9yLm1lc3NhZ2UgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGVycm9yLmNvZGUsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCBQQVRDSCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5lcnJvciB8fCBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICBlcnJvci5jb2RlLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIE1ha2VzIGFuIGF1dGhlbnRpY2F0ZWQgUE9TVCByZXF1ZXN0IHRvIGEgXCJkZWxldGVcIiBlbmRwb2ludCBvbiB0aGUgV2luQmFjayBiYWNrZW5kLlxuICogVXNlcyBQT1NUIGJlY2F1c2UgU3RyaXBlIEFwcCBzaWduYXR1cmUgdmVyaWZpY2F0aW9uIHJlcXVpcmVzIGEgYm9keSxcbiAqIGFuZCBzb21lIHByb3hpZXMgc3RyaXAgYm9kaWVzIGZyb20gREVMRVRFIHJlcXVlc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQmFja2VuZDxUID0gdW5rbm93bj4oXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlLFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICB1c2VyX2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5pZCxcbiAgICBhY2NvdW50X2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5hY2NvdW50LmlkLFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfSR7cGF0aH1gLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdTdHJpcGUtU2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgIH0sXG4gICAgYm9keSxcbiAgfSk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBlcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICB9KSk7XG4gICAgdGhyb3cgbmV3IEFwaUVycm9yKFxuICAgICAgZXJyb3IuZXJyb3IgfHwgZXJyb3IubWVzc2FnZSB8fCBgQVBJIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgZXJyb3IuY29kZSxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENhcmROZXR3b3JrLCBEaXNwdXRlU3RhdHVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFJFQVNPTl9DT0RFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgJ3Zpc2E6MTAuNCc6ICdGcmF1ZCAtLSBDYXJkIE5vdCBQcmVzZW50JyxcbiAgJ3Zpc2E6MTMuMSc6ICdNZXJjaGFuZGlzZSAvIFNlcnZpY2VzIE5vdCBSZWNlaXZlZCcsXG4gICd2aXNhOjEzLjInOiAnQ2FuY2VsbGVkIFJlY3VycmluZyBUcmFuc2FjdGlvbicsXG4gICd2aXNhOjEzLjMnOiAnTm90IGFzIERlc2NyaWJlZCBvciBEZWZlY3RpdmUnLFxuICAndmlzYToxMy42JzogJ0NyZWRpdCBOb3QgUHJvY2Vzc2VkJyxcbiAgJ21hc3RlcmNhcmQ6NDgwOCc6ICdBdXRob3JpemF0aW9uLVJlbGF0ZWQgRGlzcHV0ZScsXG4gICdtYXN0ZXJjYXJkOjQ4NTMnOiAnTm90IGFzIERlc2NyaWJlZCAvIERlZmVjdGl2ZScsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVhc29uQ29kZUxhYmVsKG5ldHdvcms6IENhcmROZXR3b3JrLCByZWFzb25Db2RlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIFJFQVNPTl9DT0RFX0xBQkVMU1tgJHtuZXR3b3JrfToke3JlYXNvbkNvZGV9YF0gPz8gbnVsbDtcbn1cblxuY29uc3QgUkVTT0xWRURfU1RBVFVTRVM6IERpc3B1dGVTdGF0dXNbXSA9IFsnd29uJywgJ2xvc3QnLCAnd2FybmluZ19jbG9zZWQnLCAnY2hhcmdlX3JlZnVuZGVkJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Jlc29sdmVkKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBSRVNPTFZFRF9TVEFUVVNFUy5pbmNsdWRlcyhzdGF0dXMgYXMgRGlzcHV0ZVN0YXR1cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNCYWRnZShzdGF0dXM6IHN0cmluZyk6IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdHlwZTogJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnIHwgJ25lZ2F0aXZlJyB8ICdpbmZvJztcbn0ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICBjYXNlICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTmVlZHMgUmVzcG9uc2UnLCB0eXBlOiAndXJnZW50JyB9O1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgY2FzZSAnd2FybmluZ191bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdVbmRlciBSZXZpZXcnLCB0eXBlOiAnaW5mbycgfTtcbiAgICBjYXNlICd3b24nOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdXb24nLCB0eXBlOiAncG9zaXRpdmUnIH07XG4gICAgY2FzZSAnbG9zdCc6XG4gICAgY2FzZSAnd2FybmluZ19jbG9zZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdMb3N0JywgdHlwZTogJ25lZ2F0aXZlJyB9O1xuICAgIGNhc2UgJ2NoYXJnZV9yZWZ1bmRlZCc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ1JlZnVuZGVkJywgdHlwZTogJ2luZm8nIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7IGxhYmVsOiBzdGF0dXMsIHR5cGU6ICdpbmZvJyB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzUmVtYWluaW5nKGR1ZUJ5OiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdWUgPSBuZXcgRGF0ZShkdWVCeSk7XG4gIHJldHVybiBNYXRoLmNlaWwoKGR1ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVJlbWFpbmluZyB7XG4gIGRheXM6IG51bWJlcjtcbiAgaG91cnM6IG51bWJlcjtcbiAgaXNFeHBpcmVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVJlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogVGltZVJlbWFpbmluZyB7XG4gIGNvbnN0IHRvdGFsTXMgPSBuZXcgRGF0ZShkdWVCeSkuZ2V0VGltZSgpIC0gRGF0ZS5ub3coKTtcbiAgaWYgKHRvdGFsTXMgPD0gMCkgcmV0dXJuIHsgZGF5czogMCwgaG91cnM6IDAsIGlzRXhwaXJlZDogdHJ1ZSB9O1xuICBjb25zdCB0b3RhbEhvdXJzID0gTWF0aC5mbG9vcih0b3RhbE1zIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gIHJldHVybiB7XG4gICAgZGF5czogTWF0aC5mbG9vcih0b3RhbEhvdXJzIC8gMjQpLFxuICAgIGhvdXJzOiB0b3RhbEhvdXJzICUgMjQsXG4gICAgaXNFeHBpcmVkOiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXJnZW5jeVRpZXIgPSAndXJnZW50JyB8ICd3YXJuaW5nJyB8ICdwb3NpdGl2ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5VGllcihkYXlzOiBudW1iZXIpOiBVcmdlbmN5VGllciB7XG4gIGlmIChkYXlzIDwgNSkgcmV0dXJuICd1cmdlbnQnO1xuICBpZiAoZGF5cyA8PSAxMykgcmV0dXJuICd3YXJuaW5nJztcbiAgcmV0dXJuICdwb3NpdGl2ZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5QmFkZ2UoXG4gIGR1ZUJ5OiBzdHJpbmcsXG4gIHN0YXR1czogc3RyaW5nLFxuKTogeyBsYWJlbDogc3RyaW5nOyB0eXBlOiBVcmdlbmN5VGllciB9IHwgbnVsbCB7XG4gIGlmIChpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG5cbiAgaWYgKHRpbWUuaXNFeHBpcmVkKSByZXR1cm4geyBsYWJlbDogJ0V4cGlyZWQnLCB0eXBlOiAndXJnZW50JyB9O1xuICBpZiAodGltZS5kYXlzIDwgNSkgcmV0dXJuIHsgbGFiZWw6IGAke3RpbWUuZGF5c31kICR7dGltZS5ob3Vyc31oIGxlZnRgLCB0eXBlOiB0aWVyIH07XG4gIHJldHVybiB7IGxhYmVsOiBgJHt0aW1lLmRheXN9ZCBsZWZ0YCwgdHlwZTogdGllciB9O1xufVxuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRXJyb3JCYW5uZXIudHN4XG5cbmltcG9ydCB7IEJhbm5lciwgQm94LCBCdXR0b24gfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRXJyb3JCYW5uZXJQcm9wcyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25SZXRyeT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVycm9yQmFubmVyID0gKHsgbWVzc2FnZSwgb25SZXRyeSB9OiBFcnJvckJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgIHRpdGxlPVwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgICAgICBkZXNjcmlwdGlvbj17bWVzc2FnZX1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgb25SZXRyeSA/IChcbiAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17b25SZXRyeX0+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJhbm5lcjtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB7IGdldFRpbWVSZW1haW5pbmcsIGdldFVyZ2VuY3lUaWVyLCBpc1Jlc29sdmVkIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERlYWRsaW5lVGltZXJQcm9wcyB7XG4gIGR1ZUJ5OiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5jb25zdCBEZWFkbGluZVRpbWVyID0gKHsgZHVlQnksIHN0YXR1cyB9OiBEZWFkbGluZVRpbWVyUHJvcHMpID0+IHtcbiAgY29uc3QgWywgc2V0VGlja10gPSB1c2VTdGF0ZSgwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gc2V0VGljaygodCkgPT4gdCArIDEpLCA2MF8wMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGlkKTtcbiAgfSwgW2R1ZUJ5XSk7XG5cbiAgaWYgKCFkdWVCeSB8fCBpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG4gIGNvbnN0IGlzVXJnZW50ID0gdGltZS5kYXlzIDwgNSAmJiAhdGltZS5pc0V4cGlyZWQ7XG5cbiAgY29uc3QgbGFiZWwgPSB0aW1lLmlzRXhwaXJlZFxuICAgID8gJ0RlYWRsaW5lIHBhc3NlZCdcbiAgICA6IHRpbWUuZGF5cyA9PT0gMFxuICAgICAgPyBgJHt0aW1lLmhvdXJzfWggcmVtYWluaW5nYFxuICAgICAgOiBgJHt0aW1lLmRheXN9ZCAke3RpbWUuaG91cnN9aCByZW1haW5pbmdgO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgY3NzPXt7XG4gICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsIGNvbG9yOiBpc1VyZ2VudCA/ICdjcml0aWNhbCcgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge2lzVXJnZW50ID8gJ1Jlc3BvbmQgbm93JyA6ICdSZXNwb25zZSBkZWFkbGluZSd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCYWRnZSB0eXBlPXt0aW1lLmlzRXhwaXJlZCA/ICd1cmdlbnQnIDogdGllcn0+e2xhYmVsfTwvQmFkZ2U+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWFkbGluZVRpbWVyO1xuIiwgImltcG9ydCB7IEJveCwgQmFkZ2UsIERpdmlkZXIsIElubGluZSwgTGluaywgU3Bpbm5lciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UgfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZU92ZXJ2aWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSW5mb1Jvd1Byb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZnVuY3Rpb24gSW5mb1Jvdyh7IGxhYmVsLCB2YWx1ZSB9OiBJbmZvUm93UHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PntsYWJlbH08L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57dmFsdWV9PC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ3Nob3J0JyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmNvbnN0IERpc3B1dGVPdmVydmlldyA9ICh7IGRpc3B1dGUsIGxvYWRpbmcgfTogRGlzcHV0ZU92ZXJ2aWV3UHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIHsvKiBIZWFkZXI6IGFtb3VudCArIHN0YXR1cyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5cbiAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ3VzdG9tZXIgaW5mbyAqL31cbiAgICAgIHsoZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8IGRpc3B1dGUuY3VzdG9tZXJfZW1haWwpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQ3VzdG9tZXJcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfZW1haWwgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJFbWFpbFwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgey8qIEVucmljaGVkIHNlY3Rpb24gKi99XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY2FyZF9icmFuZCAmJiBkaXNwdXRlLmNhcmRfbGFzdDQgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXJkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ake2Rpc3B1dGUuY2FyZF9icmFuZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUuY2FyZF9icmFuZC5zbGljZSgxKX0gZW5kaW5nIGluICR7ZGlzcHV0ZS5jYXJkX2xhc3Q0fWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIlRyYW5zYWN0aW9uIGRhdGVcIiB2YWx1ZT17Zm9ybWF0RGF0ZShkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRGVzY3JpcHRpb25cIiB2YWx1ZT17ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJCaWxsaW5nIGFkZHJlc3NcIiB2YWx1ZT17ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5yZWNlaXB0X3VybCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIlJlY2VpcHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17PExpbmsgaHJlZj17ZGlzcHV0ZS5yZWNlaXB0X3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+VmlldyByZWNlaXB0PC9MaW5rPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5tZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhkaXNwdXRlLm1ldGFkYXRhKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhkaXNwdXRlLm1ldGFkYXRhKS5tYXAoKFtrZXksIHZhbF0pID0+IChcbiAgICAgICAgICAgICAgICA8SW5mb1JvdyBrZXk9e2tleX0gbGFiZWw9e2tleX0gdmFsdWU9e3ZhbH0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXI6IElEcyAqL31cbiAgICAgIDxEaXZpZGVyIC8+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5EaXNwdXRlOiB7ZGlzcHV0ZS5pZH08L0lubGluZT5cbiAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2lkICYmIChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PkNoYXJnZToge2Rpc3B1dGUuY2hhcmdlX2lkfTwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlT3ZlcnZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIENvYWNoSGVhZGVyUHJvcHMge1xuICBoZWFkbGluZTogc3RyaW5nO1xuICBzdW1tYXJ5OiBzdHJpbmc7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xuICBkYXlzUmVtYWluaW5nPzogbnVtYmVyO1xufVxuXG5jb25zdCBDb2FjaEhlYWRlciA9ICh7IGhlYWRsaW5lLCBzdW1tYXJ5LCB1cmdlbmN5TW9kZSwgZGF5c1JlbWFpbmluZyB9OiBDb2FjaEhlYWRlclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge2hlYWRsaW5lfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlICYmIGRheXNSZW1haW5pbmcgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gYFlvdSBoYXZlICR7ZGF5c1JlbWFpbmluZ30gZGF5JHtkYXlzUmVtYWluaW5nID09PSAxID8gJycgOiAncyd9LiBGb2N1cyBvbiB0aGUgZXNzZW50aWFscyBiZWxvdy5gXG4gICAgICAgICAgOiBzdW1tYXJ5fVxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2FjaEhlYWRlcjtcbiIsICJpbXBvcnQgeyBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IFBsYXlib29rRGF0YSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBRdWlja0FjdGlvbnNQcm9wcyB7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGE7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBkZXJpdmVBY3Rpb25zKHBsYXlib29rOiBQbGF5Ym9va0RhdGEpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3QgbWFuZGF0b3J5SXRlbXMgPSBwbGF5Ym9vay5ldmlkZW5jZV9jaGVja2xpc3RcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSAnbWFuZGF0b3J5JyAmJiBpdGVtLmNvbnRleHQgPT09ICdhbGwnKVxuICAgIC5zbGljZSgwLCAzKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIG1hbmRhdG9yeUl0ZW1zKSB7XG4gICAgYWN0aW9ucy5wdXNoKGBDb25maXJtIHlvdSBoYXZlOiAke2l0ZW0uaXRlbS50b0xvd2VyQ2FzZSgpfWApO1xuICB9XG5cbiAgY29uc3QgdG9wTWlzdGFrZXMgPSBwbGF5Ym9vay5jb21tb25fbWlzdGFrZXMuc2xpY2UoMCwgMik7XG4gIGZvciAoY29uc3QgbWlzdGFrZSBvZiB0b3BNaXN0YWtlcykge1xuICAgIGNvbnN0IHJlZnJhbWVkID0gbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ05vdCAnKVxuICAgICAgPyBgTWFrZSBzdXJlIHlvdSdyZSAke21pc3Rha2UubWlzdGFrZS5zbGljZSg0KS50b0xvd2VyQ2FzZSgpfWBcbiAgICAgIDogbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ1NraXBwaW5nICcpXG4gICAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgdXNpbmcgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoOSkudG9Mb3dlckNhc2UoKX1gXG4gICAgICAgIDogYENoZWNrOiAke21pc3Rha2UubWlzdGFrZS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgYWN0aW9ucy5wdXNoKHJlZnJhbWVkKTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zLnNsaWNlKDAsIDUpO1xufVxuXG5jb25zdCBRdWlja0FjdGlvbnMgPSAoeyBwbGF5Ym9vaywgdXJnZW5jeU1vZGUgfTogUXVpY2tBY3Rpb25zUHJvcHMpID0+IHtcbiAgY29uc3QgaXRlbXMgPSB1cmdlbmN5TW9kZVxuICAgID8gcGxheWJvb2sudXJnZW5jeV9lc3NlbnRpYWxzLm9yZGVyZWRfaXRlbXNcbiAgICA6IGRlcml2ZUFjdGlvbnMocGxheWJvb2spO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlID8gJ0ZvY3VzIG9uIHRoZXNlIGVzc2VudGlhbHMnIDogJ1lvdXIgbmV4dCBzdGVwcyd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIHtpdGVtcy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3N1cmZhY2UnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdzbWFsbCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMS8xMicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAge2luZGV4ICsgMX0uXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+e3RleHR9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgRG9uJ3Qgd29ycnksIHdlJ2xsIHdhbGsgeW91IHRocm91Z2ggZWFjaCBvZiB0aGVzZSBvbiB0aGUgbmV4dCBzdGVwLlxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBRdWlja0FjdGlvbnM7XG4iLCAiaW1wb3J0IHsgQWNjb3JkaW9uLCBBY2NvcmRpb25JdGVtLCBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBMZWFybk1vcmVQcm9wcyB7XG4gIGlzc3VlclN1bW1hcnk6IHN0cmluZztcbiAgYWNxdWlyZXJTdW1tYXJ5OiBzdHJpbmc7XG59XG5cbmNvbnN0IExlYXJuTW9yZSA9ICh7IGlzc3VlclN1bW1hcnksIGFjcXVpcmVyU3VtbWFyeSB9OiBMZWFybk1vcmVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxBY2NvcmRpb24+XG4gICAgICA8QWNjb3JkaW9uSXRlbSB0aXRsZT1cIldoeSB0aGlzIG1hdHRlcnNcIj5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIFdoYXQgdGhlIGJhbmsgY2hlY2tzXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7aXNzdWVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCBoYXBwZW5zIHRvIHlvdXIgcmVzcG9uc2VcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHthY3F1aXJlclN1bW1hcnl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0FjY29yZGlvbkl0ZW0+XG4gICAgPC9BY2NvcmRpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMZWFybk1vcmU7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFubmVyLCBEaXZpZGVyLCBJbmxpbmUsIExpbmsgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgcGF0Y2hCYWNrZW5kLCBmZXRjaEJhY2tlbmQgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldFN0cmlwZUZpZWxkUmVzdWx0IH0gZnJvbSAnLi4vLi4vbGliL3N0cmlwZS1maWVsZC1zdGF0dXMnO1xuaW1wb3J0IHR5cGUgeyBTdHJpcGVGaWVsZFN0YXR1cywgU3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuLi8uLi9saWIvc3RyaXBlLWZpZWxkLXN0YXR1cyc7XG5pbXBvcnQgQ2hlY2tsaXN0UHJvZ3Jlc3MgZnJvbSAnLi9DaGVja2xpc3RQcm9ncmVzcyc7XG5pbXBvcnQgQ2hlY2tsaXN0SXRlbSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBFeHBhbmRlZFNlY3Rpb24gfSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuXG4vLyBSZS1leHBvcnQgZm9yIGNvbnN1bWVycyB0aGF0IGltcG9ydGVkIGZyb20gdGhpcyBtb2R1bGVcbmV4cG9ydCB0eXBlIHsgU3RyaXBlRmllbGRTdGF0dXMsIFN0cmlwZUZpZWxkUmVzdWx0IH07XG5cbmludGVyZmFjZSBFdmlkZW5jZUNoZWNrbGlzdFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgaXNVcmdlbnQ6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc6IG51bWJlcjtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxudHlwZSBDaGVja2xpc3RTdGF0ZSA9IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xudHlwZSBOb3Rlc1N0YXRlID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuY29uc3QgQ0FURUdPUllfT1JERVI6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXVtdID0gWydtYW5kYXRvcnknLCAncmVjb21tZW5kZWQnLCAnc2l0dWF0aW9uYWwnXTtcblxuY29uc3QgQ0FURUdPUllfTEFCRUxTOiBSZWNvcmQ8RXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddLCBzdHJpbmc+ID0ge1xuICBtYW5kYXRvcnk6ICdNYW5kYXRvcnknLFxuICByZWNvbW1lbmRlZDogJ1JlY29tbWVuZGVkJyxcbiAgc2l0dWF0aW9uYWw6ICdTaXR1YXRpb25hbCcsXG59O1xuXG4vKipcbiAqIEJ1aWxkcyB0aGUgaW5pdGlhbCBjaGVja2xpc3Qgc3RhdGUgYnkgbWVyZ2luZzpcbiAqIDEuIERlZmF1bHQgKGFsbCBmYWxzZSlcbiAqIDIuIEF1dG8tcG9wdWxhdGVkIGl0ZW1zICh0cnVlIGlmIFN0cmlwZSBkYXRhIGV4aXN0cylcbiAqIDMuIFNhdmVkIHN0YXRlIGZyb20gU3VwYWJhc2UgKG92ZXJyaWRlcyBldmVyeXRoaW5nKVxuICovXG5mdW5jdGlvbiBidWlsZEluaXRpYWxTdGF0ZShcbiAgaXRlbXM6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVtdLFxuICBkaXNwdXRlOiBEaXNwdXRlLFxuKTogQ2hlY2tsaXN0U3RhdGUge1xuICBjb25zdCBzdGF0ZTogQ2hlY2tsaXN0U3RhdGUgPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgc3RhdGVbaXRlbS5pdGVtXSA9IGZhbHNlO1xuICAgIGNvbnN0IHJlc3VsdCA9IGdldFN0cmlwZUZpZWxkUmVzdWx0KGl0ZW0sIGRpc3B1dGUpO1xuICAgIGlmIChyZXN1bHQ/LnN0YXR1cyA9PT0gJ3Bvc2l0aXZlJykge1xuICAgICAgc3RhdGVbaXRlbS5pdGVtXSA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSkge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRpc3B1dGUuY2hlY2tsaXN0X3N0YXRlKSkge1xuICAgICAgaWYgKGtleSBpbiBzdGF0ZSkge1xuICAgICAgICBzdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuY29uc3QgRXZpZGVuY2VDaGVja2xpc3QgPSAoeyBkaXNwdXRlLCBwbGF5Ym9vaywgY29udGV4dCwgaXNVcmdlbnQsIGRheXNSZW1haW5pbmcsIHN1Ym1pdHRlZCB9OiBFdmlkZW5jZUNoZWNrbGlzdFByb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gcGxheWJvb2s/LmV2aWRlbmNlX2NoZWNrbGlzdCA/PyBbXTtcbiAgY29uc3QgW2NoZWNrbGlzdFN0YXRlLCBzZXRDaGVja2xpc3RTdGF0ZV0gPSB1c2VTdGF0ZTxDaGVja2xpc3RTdGF0ZT4oKCkgPT5cbiAgICBidWlsZEluaXRpYWxTdGF0ZShpdGVtcywgZGlzcHV0ZSksXG4gICk7XG4gIGNvbnN0IFtub3Rlc1N0YXRlLCBzZXROb3Rlc1N0YXRlXSA9IHVzZVN0YXRlPE5vdGVzU3RhdGU+KFxuICAgICgpID0+IGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzID8/IHt9LFxuICApO1xuICAvLyBULWNhdGVnb3J5IChuYXJyYXRpdmVfb25seSkgaXRlbXMgZGVmYXVsdCB0byBoYXZpbmcgdGhlaXIgbm90ZXMgc2VjdGlvblxuICAvLyBleHBhbmRlZCAtLSBpdCdzIHRoZSBvbmx5IHBsYWNlIG1lcmNoYW50cyBjYW4gY29udHJpYnV0ZSBmb3IgdGhlc2UgaXRlbXMsXG4gIC8vIHNvIGNvbGxhcHNpbmcgaXQgaHVydHMgZGlzY292ZXJhYmlsaXR5LiAoV0lOLTQ5KVxuICBjb25zdCBbZXhwYW5kZWRTZWN0aW9ucywgc2V0RXhwYW5kZWRTZWN0aW9uc10gPSB1c2VTdGF0ZTxNYXA8c3RyaW5nLCBTZXQ8RXhwYW5kZWRTZWN0aW9uPj4+KFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBuZXcgTWFwPHN0cmluZywgU2V0PEV4cGFuZGVkU2VjdGlvbj4+KCk7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKGl0ZW0ubmFycmF0aXZlX29ubHkpIHtcbiAgICAgICAgICBpbml0aWFsLnNldChpdGVtLml0ZW0sIG5ldyBTZXQ8RXhwYW5kZWRTZWN0aW9uPihbJ25vdGVzJ10pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGluaXRpYWw7XG4gICAgfVxuICApO1xuICBjb25zdCBbZmlsZXNTdGF0ZSwgc2V0RmlsZXNTdGF0ZV0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFdmlkZW5jZUZpbGUgfCBudWxsPj4oe30pO1xuICBjb25zdCBbc2hvd0Z1bGxDaGVja2xpc3QsIHNldFNob3dGdWxsQ2hlY2tsaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWZzIGZvciBkZWJvdW5jZWQgc2F2ZXNcbiAgY29uc3QgY2hlY2tsaXN0VGltZW91dFJlZiA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBub3Rlc1RpbWVvdXRSZWYgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICAvLyBSZWJ1aWxkIHN0YXRlIHdoZW4gZGlzcHV0ZSBvciBwbGF5Ym9vayBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbmV4dENoZWNrbGlzdCA9IGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKTtcbiAgICBzZXRDaGVja2xpc3RTdGF0ZShuZXh0Q2hlY2tsaXN0KTtcbiAgICBsYXRlc3RDaGVja2xpc3RSZWYuY3VycmVudCA9IG5leHRDaGVja2xpc3Q7XG4gICAgY29uc3QgbmV4dE5vdGVzID0gZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMgPz8ge307XG4gICAgc2V0Tm90ZXNTdGF0ZShuZXh0Tm90ZXMpO1xuICAgIGxhdGVzdE5vdGVzUmVmLmN1cnJlbnQgPSBuZXh0Tm90ZXM7XG4gICAgLy8gUmUtc2VlZCBULWl0ZW0gbm90ZXMgYXMgZXhwYW5kZWQgd2hlbiBzd2l0Y2hpbmcgcGxheWJvb2tzLiAoV0lOLTQ5KVxuICAgIGNvbnN0IG5leHRFeHBhbmRlZCA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8RXhwYW5kZWRTZWN0aW9uPj4oKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChpdGVtLm5hcnJhdGl2ZV9vbmx5KSB7XG4gICAgICAgIG5leHRFeHBhbmRlZC5zZXQoaXRlbS5pdGVtLCBuZXcgU2V0PEV4cGFuZGVkU2VjdGlvbj4oWydub3RlcyddKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldEV4cGFuZGVkU2VjdGlvbnMobmV4dEV4cGFuZGVkKTtcbiAgfSwgW2Rpc3B1dGUuaWQsIGRpc3B1dGUuY2hlY2tsaXN0X3N0YXRlLCBkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcywgcGxheWJvb2s/LnJlYXNvbl9jb2RlXSk7XG5cbiAgLy8gRmV0Y2ggZXZpZGVuY2UgZmlsZXMgb24gbW91bnQgLyBkaXNwdXRlIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRmlsZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBFdmlkZW5jZUZpbGVbXSB9PihcbiAgICAgICAgICBgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZpbGVNYXA6IFJlY29yZDxzdHJpbmcsIEV2aWRlbmNlRmlsZSB8IG51bGw+ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiByZXN1bHQuZGF0YSkge1xuICAgICAgICAgIGZpbGVNYXBbZmlsZS5jaGVja2xpc3RfaXRlbV9rZXldID0gZmlsZTtcbiAgICAgICAgfVxuICAgICAgICBzZXRGaWxlc1N0YXRlKGZpbGVNYXApO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBldmlkZW5jZSBmaWxlczonLCBlcnIpO1xuICAgICAgfVxuICAgIH07XG4gICAgZmV0Y2hGaWxlcygpO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIC8vIEhvbGRzIHRoZSBsYXRlc3QgY2hlY2tsaXN0IHN0YXRlIHNvIHRoZSB1bm1vdW50IGZsdXNoIGNhbiBwZXJzaXN0IGl0XG4gIC8vIHdpdGhvdXQgcmFjaW5nIGFnYWluc3QgUmVhY3QgcmUtcmVuZGVycy4gKFdJTi00OSlcbiAgY29uc3QgbGF0ZXN0Q2hlY2tsaXN0UmVmID0gdXNlUmVmPENoZWNrbGlzdFN0YXRlPih7fSk7XG5cbiAgY29uc3QgcGVyc2lzdENoZWNrbGlzdCA9IHVzZUNhbGxiYWNrKChuZXdTdGF0ZTogQ2hlY2tsaXN0U3RhdGUpID0+IHtcbiAgICBsYXRlc3RDaGVja2xpc3RSZWYuY3VycmVudCA9IG5ld1N0YXRlO1xuICAgIGlmIChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgIH1cbiAgICBjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgIGNoZWNrbGlzdF9zdGF0ZTogbGF0ZXN0Q2hlY2tsaXN0UmVmLmN1cnJlbnQsXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGNoZWNrbGlzdCBzdGF0ZTonLCBlcnIpO1xuICAgICAgfSk7XG4gICAgfSwgNTAwKTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICAvLyBIb2xkcyB0aGUgbGF0ZXN0IG5vdGVzIHN0YXRlIHNvIGZsdXNoTm90ZXMgY2FuIHJlYWQgdGhlIGN1cnJlbnQgdmFsdWVzXG4gIC8vIHdpdGhvdXQgZGVwZW5kaW5nIG9uIFJlYWN0IHJlLXJlbmRlcnMuIFRoZSBkZWJvdW5jZWQgc2F2ZSBhbmQgdGhlIGV4cGxpY2l0XG4gIC8vIFNhdmUgYnV0dG9uIGJvdGggcmVhZCBmcm9tIGhlcmUuXG4gIGNvbnN0IGxhdGVzdE5vdGVzUmVmID0gdXNlUmVmPE5vdGVzU3RhdGU+KHt9KTtcblxuICBjb25zdCBmbHVzaE5vdGVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KG5vdGVzVGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgIG5vdGVzVGltZW91dFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgIGNoZWNrbGlzdF9ub3RlczogbGF0ZXN0Tm90ZXNSZWYuY3VycmVudCxcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaGVja2xpc3Qgbm90ZXM6JywgZXJyKTtcbiAgICB9KTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICBjb25zdCBwZXJzaXN0Tm90ZXMgPSB1c2VDYWxsYmFjaygobmV3Tm90ZXM6IE5vdGVzU3RhdGUpID0+IHtcbiAgICBsYXRlc3ROb3Rlc1JlZi5jdXJyZW50ID0gbmV3Tm90ZXM7XG4gICAgLy8gTm8gZGVib3VuY2UgLS0gbm90ZXMgYXJlIHNob3J0LCB0eXBlZCBpbmZyZXF1ZW50bHksIGFuZCB0aGUgY29zdCBvZlxuICAgIC8vIGxvc2luZyBhIG5vdGUgdG8gYSBkZWJvdW5jZSByYWNlIChXSU4tNDkgUUEpIGZhciBleGNlZWRzIHRoZSBjb3N0IG9mXG4gICAgLy8gYSBmZXcgZXh0cmEgUEFUQ0ggcmVxdWVzdHMuIEV2ZXJ5IGtleXN0cm9rZSBjb21taXRzIGltbWVkaWF0ZWx5LlxuICAgIGlmIChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KG5vdGVzVGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgIG5vdGVzVGltZW91dFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgIGNoZWNrbGlzdF9ub3RlczogbmV3Tm90ZXMsXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2hlY2tsaXN0IG5vdGVzOicsIGVycik7XG4gICAgfSk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgLy8gU2FmZXR5IG5ldDogaWYgdGhlIHdpemFyZCB1bm1vdW50cyAodXNlciBjbG9zZXMgdGhlIEZvY3VzVmlldywgbmF2aWdhdGVzXG4gIC8vIHRvIGEgZGlmZmVyZW50IGRpc3B1dGUsIGV0Yy4pIGJlZm9yZSB0aGUgZGVib3VuY2UgZmlyZXMsIGZsdXNoIGFueVxuICAvLyBwZW5kaW5nIG5vdGVzIGFuZCBjaGVja2xpc3Qgc3RhdGUgaW1tZWRpYXRlbHkgc28gbm90aGluZyBpcyBsb3N0LiAoV0lOLTQ5KVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG5vdGVzVGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgICAgbm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICAgIGNoZWNrbGlzdF9ub3RlczogbGF0ZXN0Tm90ZXNSZWYuY3VycmVudCxcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmbHVzaCBjaGVja2xpc3Qgbm90ZXMgb24gdW5tb3VudDonLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICAgIGNoZWNrbGlzdFRpbWVvdXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgICAgY2hlY2tsaXN0X3N0YXRlOiBsYXRlc3RDaGVja2xpc3RSZWYuY3VycmVudCxcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmbHVzaCBjaGVja2xpc3Qgc3RhdGUgb24gdW5tb3VudDonLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGUgPSB1c2VDYWxsYmFjaygoaXRlbU5hbWU6IHN0cmluZykgPT4ge1xuICAgIHNldENoZWNrbGlzdFN0YXRlKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgLi4ucHJldiwgW2l0ZW1OYW1lXTogIXByZXZbaXRlbU5hbWVdIH07XG4gICAgICBwZXJzaXN0Q2hlY2tsaXN0KG5ld1N0YXRlKTtcbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9KTtcbiAgfSwgW3BlcnNpc3RDaGVja2xpc3RdKTtcblxuICBjb25zdCBoYW5kbGVOb3Rlc0NoYW5nZSA9IHVzZUNhbGxiYWNrKChpdGVtTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Tm90ZXNTdGF0ZSgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3Tm90ZXMgPSB7IC4uLnByZXYsIFtpdGVtTmFtZV06IHZhbHVlIH07XG4gICAgICBwZXJzaXN0Tm90ZXMobmV3Tm90ZXMpO1xuICAgICAgcmV0dXJuIG5ld05vdGVzO1xuICAgIH0pO1xuICB9LCBbcGVyc2lzdE5vdGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IHVzZUNhbGxiYWNrKChpdGVtTmFtZTogc3RyaW5nLCBmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB7XG4gICAgc2V0RmlsZXNTdGF0ZSgocHJldikgPT4gKHsgLi4ucHJldiwgW2l0ZW1OYW1lXTogZmlsZSB9KSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVTZWN0aW9uVG9nZ2xlID0gdXNlQ2FsbGJhY2soKGl0ZW1OYW1lOiBzdHJpbmcsIHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4ge1xuICAgIHNldEV4cGFuZGVkU2VjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBuZXcgTWFwKHByZXYpO1xuICAgICAgY29uc3Qgc2VjdGlvbnMgPSBuZXcgU2V0KHByZXYuZ2V0KGl0ZW1OYW1lKSA/PyBbXSk7XG4gICAgICBpZiAoc2VjdGlvbnMuaGFzKHNlY3Rpb24pKSB7XG4gICAgICAgIHNlY3Rpb25zLmRlbGV0ZShzZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb25zLmFkZChzZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIG5leHQuc2V0KGl0ZW1OYW1lLCBzZWN0aW9ucyk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIE5vIHBsYXlib29rIGZhbGxiYWNrXG4gIGlmICghcGxheWJvb2sgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgIHRpdGxlPVwiTm8gZXZpZGVuY2UgY2hlY2tsaXN0IGF2YWlsYWJsZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJObyBzcGVjaWZpYyBldmlkZW5jZSBjaGVja2xpc3QgZm9yIHRoaXMgcmVhc29uIGNvZGUuIFVzZSBTdHJpcGUncyBnZW5lcmFsIGV2aWRlbmNlIGd1aWRlbGluZXMgZm9yIHlvdXIgcmVzcG9uc2UuXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICAvLyBGaWx0ZXIgZm9yIHVyZ2VuY3kgbW9kZVxuICBjb25zdCBlZmZlY3RpdmVVcmdlbmN5ID0gaXNVcmdlbnQgJiYgIXNob3dGdWxsQ2hlY2tsaXN0O1xuICBsZXQgZGlzcGxheUl0ZW1zID0gaXRlbXM7XG4gIGlmIChlZmZlY3RpdmVVcmdlbmN5KSB7XG4gICAgZGlzcGxheUl0ZW1zID0gaXRlbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udXJnZW5jeV9lc3NlbnRpYWwpXG4gICAgICAuc29ydCgoYSwgYikgPT4gKGEudXJnZW5jeV9vcmRlciA/PyA5OTkpIC0gKGIudXJnZW5jeV9vcmRlciA/PyA5OTkpKTtcbiAgfVxuXG4gIC8vIEdyb3VwIGJ5IGNhdGVnb3J5XG4gIGNvbnN0IGdyb3VwZWQgPSBDQVRFR09SWV9PUkRFUi5tYXAoKGNhdGVnb3J5KSA9PiAoe1xuICAgIGNhdGVnb3J5LFxuICAgIGxhYmVsOiBDQVRFR09SWV9MQUJFTFNbY2F0ZWdvcnldLFxuICAgIGl0ZW1zOiBkaXNwbGF5SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSBjYXRlZ29yeSksXG4gIH0pKS5maWx0ZXIoKGdyb3VwKSA9PiBncm91cC5pdGVtcy5sZW5ndGggPiAwKTtcblxuICAvLyBQcm9ncmVzcyBjb3VudHMgKGFsd2F5cyBhZ2FpbnN0IGZ1bGwgbGlzdCwgbm90IGZpbHRlcmVkKVxuICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCBjb21wbGV0ZWRJdGVtcyA9IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tsaXN0U3RhdGVbaXRlbS5pdGVtXSkubGVuZ3RoO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIHtzdWJtaXR0ZWQgPyAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgdGl0bGU9XCJFdmlkZW5jZSBzdWJtaXR0ZWRcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiWW91ciBldmlkZW5jZSBoYXMgYmVlbiBzdWJtaXR0ZWQgdG8gU3RyaXBlLiBGaWxlcyBhbmQgY2hlY2tsaXN0IGl0ZW1zIGFyZSBub3cgcmVhZC1vbmx5LlwiXG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgIHRpdGxlPVwiR2F0aGVyIHlvdXIgZXZpZGVuY2VcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiSGVyZSdzIHdoYXQgeW91J2xsIG5lZWQgdG8gYnVpbGQgeW91ciBjYXNlLiBFeHBhbmQgZWFjaCBpdGVtIHRvIHNlZSB3aHkgaXQgbWF0dGVycyBhbmQgam90IGRvd24gbm90ZXMgYXMgeW91IGdvLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8Q2hlY2tsaXN0UHJvZ3Jlc3MgY29tcGxldGVkPXtjb21wbGV0ZWRJdGVtc30gdG90YWw9e3RvdGFsSXRlbXN9IC8+XG5cbiAgICAgIHtpc1VyZ2VudCAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgICAgdGl0bGU9e2Ake2RheXNSZW1haW5pbmd9IGRheSR7ZGF5c1JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfSBsZWZ0IHRvIHJlc3BvbmRgfVxuICAgICAgICAgICAgZGVzY3JpcHRpb249e3Nob3dGdWxsQ2hlY2tsaXN0XG4gICAgICAgICAgICAgID8gJ1Nob3dpbmcgYWxsIGV2aWRlbmNlIGl0ZW1zLidcbiAgICAgICAgICAgICAgOiAnU2hvd2luZyBvbmx5IGVzc2VudGlhbCBpdGVtcyB0byBtYXhpbWl6ZSB5b3VyIGNoYW5jZXMuJ31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxMaW5rIG9uUHJlc3M9eygpID0+IHNldFNob3dGdWxsQ2hlY2tsaXN0KCFzaG93RnVsbENoZWNrbGlzdCl9PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICAgICAgICB7c2hvd0Z1bGxDaGVja2xpc3QgPyAnU2hvdyBlc3NlbnRpYWxzIG9ubHknIDogJ1ZpZXcgZnVsbCBjaGVja2xpc3QnfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtncm91cGVkLm1hcCgoeyBjYXRlZ29yeSwgbGFiZWwsIGl0ZW1zOiBncm91cEl0ZW1zIH0sIGdyb3VwSW5kZXgpID0+IChcbiAgICAgICAgPEJveCBrZXk9e2NhdGVnb3J5fSBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIHtncm91cEluZGV4ID4gMCAmJiA8RGl2aWRlciAvPn1cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdzZWNvbmRhcnknLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICB7Z3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmlwZVJlc3VsdCA9IGdldFN0cmlwZUZpZWxkUmVzdWx0KGl0ZW0sIGRpc3B1dGUpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPENoZWNrbGlzdEl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaXRlbX1cbiAgICAgICAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9eyEhY2hlY2tsaXN0U3RhdGVbaXRlbS5pdGVtXX1cbiAgICAgICAgICAgICAgICBzdHJpcGVGaWVsZFJlc3VsdD17c3RyaXBlUmVzdWx0ID8/IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBleHBhbmRlZFNlY3Rpb25zPXtleHBhbmRlZFNlY3Rpb25zLmdldChpdGVtLml0ZW0pID8/IG5ldyBTZXQoKX1cbiAgICAgICAgICAgICAgICBub3Rlcz17bm90ZXNTdGF0ZVtpdGVtLml0ZW1dID8/ICcnfVxuICAgICAgICAgICAgICAgIGV4aXN0aW5nRmlsZT17ZmlsZXNTdGF0ZVtpdGVtLml0ZW1dID8/IG51bGx9XG4gICAgICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlLmlkfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHRSZWYuY3VycmVudH1cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gaGFuZGxlVG9nZ2xlKGl0ZW0uaXRlbSl9XG4gICAgICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlPXsoc2VjdGlvbikgPT4gaGFuZGxlU2VjdGlvblRvZ2dsZShpdGVtLml0ZW0sIHNlY3Rpb24pfVxuICAgICAgICAgICAgICAgIG9uTm90ZXNDaGFuZ2U9eyh2YWx1ZSkgPT4gaGFuZGxlTm90ZXNDaGFuZ2UoaXRlbS5pdGVtLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgb25TYXZlTm90ZXM9e2ZsdXNoTm90ZXN9XG4gICAgICAgICAgICAgICAgb25GaWxlQ2hhbmdlPXsoZmlsZSkgPT4gaGFuZGxlRmlsZUNoYW5nZShpdGVtLml0ZW0sIGZpbGUpfVxuICAgICAgICAgICAgICAgIHN1Ym1pdHRlZD17c3VibWl0dGVkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5cbiAgICAgICAgWW91ciBwcm9ncmVzcyBhbmQgbm90ZXMgYXJlIHNhdmVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2aWRlbmNlQ2hlY2tsaXN0O1xuIiwgImltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogU3RhdHVzIG9mIGEgc3RyaXBlX2ZpZWxkLWxpbmtlZCBjaGVja2xpc3QgaXRlbTpcbiAqIC0gJ3Bvc2l0aXZlJzogZGF0YSBleGlzdHMgYW5kIGhlbHBzIHRoZSBjYXNlIChhdXRvLWNoZWNrLCBzaG93IHZhbHVlKVxuICogLSAndW5hdmFpbGFibGUnOiB2ZXJpZmljYXRpb24gd2Fzbid0IGNvbGxlY3RlZCBhdCBjaGVja291dCAoZ3JleSBvdXQsIGV4cGxhaW4pXG4gKiAtICduZWdhdGl2ZSc6IHZlcmlmaWNhdGlvbiBmYWlsZWQsIGh1cnRzIHRoZSBjYXNlICh3YXJuIG1lcmNoYW50KVxuICogLSBudWxsOiBubyBzdHJpcGVfZmllbGQgb3Igbm90IGEgbWFwcGVkIGl0ZW1cbiAqL1xuZXhwb3J0IHR5cGUgU3RyaXBlRmllbGRTdGF0dXMgPSAncG9zaXRpdmUnIHwgJ3VuYXZhaWxhYmxlJyB8ICduZWdhdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyaXBlRmllbGRSZXN1bHQge1xuICBzdGF0dXM6IFN0cmlwZUZpZWxkU3RhdHVzO1xuICB2YWx1ZTogc3RyaW5nO1xuICBndWlkYW5jZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDaGVja1ZhbHVlKHJhdzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGlmICghcmF3KSByZXR1cm4gJ05vdCBjaGVja2VkJztcbiAgc3dpdGNoIChyYXcpIHtcbiAgICBjYXNlICdwYXNzJzogcmV0dXJuICdNYXRjaCc7XG4gICAgY2FzZSAnZmFpbCc6IHJldHVybiAnTm8gbWF0Y2gnO1xuICAgIGNhc2UgJ3VuYXZhaWxhYmxlJzogcmV0dXJuICdOb3QgY2hlY2tlZCc7XG4gICAgY2FzZSAndW5jaGVja2VkJzogcmV0dXJuICdOb3QgY2hlY2tlZCc7XG4gICAgZGVmYXVsdDogcmV0dXJuIHJhdztcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKHRzOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IERhdGUodHMgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJywgeWVhcjogJ251bWVyaWMnLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3koYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5ID8/ICd1c2QnLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIGNoZWNrbGlzdCBpdGVtIGFuZCBhIGRpc3B1dGUsIGNvbXB1dGUgdGhlIGF1dG8tZmlsbCBzdGF0dXMgZm9yIGFueVxuICogaXRlbSB0aGF0IG1hcHMgdG8gYSBzdHJpcGVfZmllbGQuIFJldHVybnMgbnVsbCBmb3IgaXRlbXMgbm90IG1hcHBlZCBvciB3aXRoXG4gKiBubyBhdXRvLWZpbGwgZGF0YSBhdmFpbGFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpcGVGaWVsZFJlc3VsdChcbiAgaXRlbTogRXZpZGVuY2VDaGVja2xpc3RJdGVtLFxuICBkaXNwdXRlOiBEaXNwdXRlLFxuKTogU3RyaXBlRmllbGRSZXN1bHQgfCBudWxsIHtcbiAgY29uc3QgZmllbGQgPSBpdGVtLnN0cmlwZV9maWVsZDtcbiAgaWYgKCFmaWVsZCkgcmV0dXJuIG51bGw7XG5cbiAgc3dpdGNoIChmaWVsZCkge1xuICAgIGNhc2UgJ2F2c19yZXN1bHQnOiB7XG4gICAgICBjb25zdCBhZGRyID0gZGlzcHV0ZS5hdnNfYWRkcmVzc19jaGVjaztcbiAgICAgIGNvbnN0IHppcCA9IGRpc3B1dGUuYXZzX3ppcF9jaGVjaztcbiAgICAgIGlmICghYWRkciAmJiAhemlwKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IGNvbGxlY3RlZCBhdCBjaGVja291dCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIkFkZHJlc3MgdmVyaWZpY2F0aW9uIHdhc24ndCBydW4gb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBjYW4ndCBiZSBhZGRlZCBhZnRlciB0aGUgZmFjdCAtLSBmb2N1cyB5b3VyIGVuZXJneSBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMgaW5zdGVhZC5cIixcbiAgICAgIH07XG4gICAgICBjb25zdCBhZGRyRmFpbCA9IGFkZHIgPT09ICdmYWlsJztcbiAgICAgIGNvbnN0IHppcEZhaWwgPSB6aXAgPT09ICdmYWlsJztcbiAgICAgIGlmIChhZGRyRmFpbCAmJiB6aXBGYWlsKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICduZWdhdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQWRkcmVzczogbm8gbWF0Y2gsIFpJUDogbm8gbWF0Y2gnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgYmlsbGluZyBhZGRyZXNzIGRpZG4ndCBtYXRjaCB3aGF0IHRoZSBiYW5rIGhhcyBvbiBmaWxlLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMgYXV0b21hdGljYWxseSAtLSBpdCB3ZWFrZW5zIHlvdXIgY2FzZS4gRm9jdXMgb24gc3RyZW5ndGhlbmluZyBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChhZGRyRmFpbCB8fCB6aXBGYWlsKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICduZWdhdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgQWRkcmVzczogJHtmb3JtYXRDaGVja1ZhbHVlKGFkZHIpfSwgWklQOiAke2Zvcm1hdENoZWNrVmFsdWUoemlwKX1gLFxuICAgICAgICBndWlkYW5jZTogXCJQYXJ0aWFsIGFkZHJlc3MgbWF0Y2ggLS0gb25lIGVsZW1lbnQgZGlkbid0IG1hdGNoLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMuIEl0J3Mgbm90IGFzIGRhbWFnaW5nIGFzIGEgZnVsbCBtaXNtYXRjaCwgYnV0IHN0cmVuZ3RoZW4geW91ciBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBZGRyZXNzOiAke2Zvcm1hdENoZWNrVmFsdWUoYWRkcil9LCBaSVA6ICR7Zm9ybWF0Q2hlY2tWYWx1ZSh6aXApfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnY3ZjX2NoZWNrJzoge1xuICAgICAgY29uc3QgY3ZjID0gZGlzcHV0ZS5jdmNfY2hlY2s7XG4gICAgICBpZiAoIWN2YyB8fCBjdmMgPT09ICd1bmF2YWlsYWJsZScgfHwgY3ZjID09PSAndW5jaGVja2VkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAndW5hdmFpbGFibGUnLFxuICAgICAgICB2YWx1ZTogJ05vdCBjb2xsZWN0ZWQgYXQgY2hlY2tvdXQnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgc2VjdXJpdHkgY29kZSAoQ1ZWKSB3YXNuJ3QgdmVyaWZpZWQgb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBjYW4ndCBiZSBhZGRlZCBhZnRlciB0aGUgZmFjdCAtLSBmb2N1cyB5b3VyIGVuZXJneSBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMgaW5zdGVhZC5cIixcbiAgICAgIH07XG4gICAgICBpZiAoY3ZjID09PSAnZmFpbCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdDVlY6IG5vIG1hdGNoJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiVGhlIENWViBjaGVjayBmYWlsZWQgb24gdGhpcyB0cmFuc2FjdGlvbiAtLSB0aGUgY29kZSBlbnRlcmVkIGRpZG4ndCBtYXRjaC4gVGhlIGlzc3VlciB3aWxsIHNlZSB0aGlzIGF1dG9tYXRpY2FsbHkgYW5kIGl0IGh1cnRzIHlvdXIgY2FzZS4gRm9jdXMgb24gc3RyZW5ndGhlbmluZyBvdGhlciBldmlkZW5jZSB0byBjb21wZW5zYXRlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdDVlYgdmVyaWZpZWQnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgJ3RocmVlX2Rfc2VjdXJlJzoge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZGlzcHV0ZS50aHJlZV9kX3NlY3VyZV9yZXN1bHQ7XG4gICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAndW5hdmFpbGFibGUnLFxuICAgICAgICB2YWx1ZTogJ05vdCB1c2VkIG9uIHRoaXMgdHJhbnNhY3Rpb24nLFxuICAgICAgICBndWlkYW5jZTogXCIzRCBTZWN1cmUgd2Fzbid0IHVzZWQgb24gdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBpcyB0aGUgc2luZ2xlIHN0cm9uZ2VzdCBkZWZlbnNlIGZvciBmcmF1ZCBkaXNwdXRlcyAtLSBjb25zaWRlciBlbmFibGluZyBpdCBmb3IgZnV0dXJlIHRyYW5zYWN0aW9ucy4gRm9yIHRoaXMgZGlzcHV0ZSwgZm9jdXMgb24gdGhlIG90aGVyIGV2aWRlbmNlIGl0ZW1zLlwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHZlcnNpb24gPSBkaXNwdXRlLnRocmVlX2Rfc2VjdXJlX3ZlcnNpb247XG4gICAgICBpZiAocmVzdWx0ID09PSAnYXV0aGVudGljYXRlZCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IHZlcnNpb24gPyBgVmVyaWZpZWQgYnkgYmFuayAoM0RTIHYke3ZlcnNpb259KWAgOiAnVmVyaWZpZWQgYnkgYmFuayAoM0RTKScsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLiBUaGlzIGlzIHlvdXIgc3Ryb25nZXN0IHBpZWNlIG9mIGV2aWRlbmNlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChyZXN1bHQgPT09ICdhdHRlbXB0X2Fja25vd2xlZGdlZCcpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdCYW5rIHZlcmlmaWNhdGlvbiBhdHRlbXB0ZWQnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0gdGhlIGJhbmsgYWNrbm93bGVkZ2VkIHRoZSAzRFMgYXR0ZW1wdCwgd2hpY2ggc3RpbGwgcHJvdmlkZXMgbGlhYmlsaXR5IHNoaWZ0IGluIG1vc3QgY2FzZXMuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYDNEUyByZXN1bHQ6ICR7cmVzdWx0fWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnYXV0aG9yaXphdGlvbic6IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBkaXNwdXRlLmF1dGhvcml6YXRpb25fY29kZTtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGRpc3B1dGUubmV0d29ya19zdGF0dXM7XG4gICAgICBpZiAoIWNvZGUgJiYgIXN0YXR1cykgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoc3RhdHVzID09PSAnZGVjbGluZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdEZWNsaW5lZCBieSBuZXR3b3JrJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiVGhlIGF1dGhvcml6YXRpb24gd2FzIGRlY2xpbmVkIGJ5IHRoZSBuZXR3b3JrLiBUaGlzIGlzIHVudXN1YWwgZm9yIGEgY29tcGxldGVkIGNoYXJnZSAtLSBjb250YWN0IHN1cHBvcnQgaWYgdGhpcyBkb2Vzbid0IGxvb2sgcmlnaHQuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGNvZGUgJiYgc3RhdHVzID09PSAnYXBwcm92ZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBcHByb3ZlZCAoYXV0aCBjb2RlOiAke2NvZGV9KWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChjb2RlKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgQXV0aCBjb2RlOiAke2NvZGV9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FwcHJvdmVkX2J5X25ldHdvcmsnKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQXBwcm92ZWQgYnkgbmV0d29yaycsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBOZXR3b3JrIHN0YXR1czogJHtzdGF0dXN9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdjdXN0b21lcl9lbWFpbCc6XG4gICAgICBpZiAoIWRpc3B1dGUuY3VzdG9tZXJfZW1haWwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ2JpbGxpbmdfYWRkcmVzcyc6XG4gICAgICBpZiAoIWRpc3B1dGUuYmlsbGluZ19hZGRyZXNzKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGRpc3B1dGUuYmlsbGluZ19hZGRyZXNzLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAndHJhbnNhY3Rpb25fZGF0ZSc6XG4gICAgICBpZiAoIWRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBmb3JtYXREYXRlKGRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSksXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICBjYXNlICdyZWNlaXB0X3VybCc6XG4gICAgICBpZiAoIWRpc3B1dGUucmVjZWlwdF91cmwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ1JlY2VpcHQgYXZhaWxhYmxlJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ3JlZnVuZF9kYXRhJzoge1xuICAgICAgY29uc3QgcmVmdW5kcyA9IGRpc3B1dGUucmVmdW5kcztcbiAgICAgIGlmICghcmVmdW5kcyB8fCByZWZ1bmRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCByID0gcmVmdW5kc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBSZWZ1bmQgb2YgJHtmb3JtYXRDdXJyZW5jeShyLmFtb3VudCwgZGlzcHV0ZS5jdXJyZW5jeSl9IG9uICR7Zm9ybWF0RGF0ZShyLmNyZWF0ZWQpfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAnY2FsY3VsYXRlZF9zdGF0ZW1lbnRfZGVzY3JpcHRvcic6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnQ292ZXJlZCBieSB5b3VyIFN0cmlwZSB0cmFuc2FjdGlvbiBkYXRhJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBBbnkgc3RyaXBlX2ZpZWxkIHZhbHVlIHRoZSByZW5kZXJlciBkb2Vzbid0IGhhdmUgY3VzdG9tIGNvcHkgZm9yIHN0aWxsXG4gICAgICAvLyBtZWFucyB0aGUgZGF0YSBpcyBhdXRvZmlsbGVkIGZyb20gdGhlIHRyYW5zYWN0aW9uLiBTaG93IGEgZ2VuZXJpY1xuICAgICAgLy8gaGludCBzbyB0aGUgdXBsb2FkIFVJIHN0YXlzIGhpZGRlbiBhbmQgdGhlIG1lcmNoYW50IGRvZXNuJ3QgdHJ5IHRvXG4gICAgICAvLyBhdHRhY2ggYSBmaWxlIHRoYXQgd291bGQgYmUgc2lsZW50bHkgZHJvcHBlZCBieSB0aGUgYXNzZW1ibGVyLlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NvdmVyZWQgYnkgeW91ciBTdHJpcGUgdHJhbnNhY3Rpb24gZGF0YScsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIENoZWNrbGlzdFByb2dyZXNzUHJvcHMge1xuICBjb21wbGV0ZWQ6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbn1cblxudHlwZSBGcmFjdGlvbldpZHRoID0gJzEvMTInIHwgJzIvMTInIHwgJzMvMTInIHwgJzQvMTInIHwgJzUvMTInIHwgJzYvMTInIHwgJzcvMTInIHwgJzgvMTInIHwgJzkvMTInIHwgJzEwLzEyJyB8ICcxMS8xMicgfCAnZmlsbCc7XG5cbmZ1bmN0aW9uIGdldFByb2dyZXNzV2lkdGgoY29tcGxldGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpOiBGcmFjdGlvbldpZHRoIHwgbnVsbCB7XG4gIGlmICh0b3RhbCA9PT0gMCB8fCBjb21wbGV0ZWQgPT09IDApIHJldHVybiBudWxsO1xuICBpZiAoY29tcGxldGVkID49IHRvdGFsKSByZXR1cm4gJ2ZpbGwnO1xuICBjb25zdCB0d2VsZnRocyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoKGNvbXBsZXRlZCAvIHRvdGFsKSAqIDEyKSk7XG4gIHJldHVybiBgJHt0d2VsZnRoc30vMTJgIGFzIEZyYWN0aW9uV2lkdGg7XG59XG5cbmNvbnN0IENoZWNrbGlzdFByb2dyZXNzID0gKHsgY29tcGxldGVkLCB0b3RhbCB9OiBDaGVja2xpc3RQcm9ncmVzc1Byb3BzKSA9PiB7XG4gIGNvbnN0IHByb2dyZXNzV2lkdGggPSBnZXRQcm9ncmVzc1dpZHRoKGNvbXBsZXRlZCwgdG90YWwpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgRXZpZGVuY2UgUHJvZ3Jlc3NcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIHtjb21wbGV0ZWR9IG9mIHt0b3RhbH0gY29tcGxldGVkXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGNzcz17eyBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBib3JkZXJSYWRpdXM6ICdyb3VuZGVkJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICB7cHJvZ3Jlc3NXaWR0aCA/IChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnc3VyZmFjZScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3JvdW5kZWQnLFxuICAgICAgICAgICAgICB3aWR0aDogcHJvZ3Jlc3NXaWR0aCxcbiAgICAgICAgICAgICAgcGFkZGluZzogJ3h4c21hbGwnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SW5saW5lPnsnICd9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3h4c21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZT57JyAnfTwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVja2xpc3RQcm9ncmVzcztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBDaGVja2JveCwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgVGV4dEFyZWEgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuL0V2aWRlbmNlQ2hlY2tsaXN0JztcbmltcG9ydCBGaWxlVXBsb2FkU2VjdGlvbiBmcm9tICcuL0ZpbGVVcGxvYWRTZWN0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhwYW5kZWRTZWN0aW9uID0gJ3doeScgfCAnd2hlcmUnIHwgJ25vdGVzJyB8ICdmaWxlJztcblxuaW50ZXJmYWNlIENoZWNrbGlzdEl0ZW1Qcm9wcyB7XG4gIGl0ZW06IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbTtcbiAgY2hlY2tlZDogYm9vbGVhbjtcbiAgc3RyaXBlRmllbGRSZXN1bHQ/OiBTdHJpcGVGaWVsZFJlc3VsdDtcbiAgZXhwYW5kZWRTZWN0aW9uczogU2V0PEV4cGFuZGVkU2VjdGlvbj47XG4gIG5vdGVzOiBzdHJpbmc7XG4gIGV4aXN0aW5nRmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbDtcbiAgZGlzcHV0ZUlkOiBzdHJpbmc7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4gdm9pZDtcbiAgb25Ob3Rlc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2F2ZU5vdGVzPzogKCkgPT4gdm9pZDtcbiAgb25GaWxlQ2hhbmdlOiAoZmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbCkgPT4gdm9pZDtcbiAgc3VibWl0dGVkPzogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcnlCYWRnZShjYXRlZ29yeTogRXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddKSB7XG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcbiAgICBjYXNlICdtYW5kYXRvcnknOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwibmVnYXRpdmVcIj5SRVFVSVJFRDwvQmFkZ2U+O1xuICAgIGNhc2UgJ3JlY29tbWVuZGVkJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIndhcm5pbmdcIj5IRUxQRlVMPC9CYWRnZT47XG4gICAgY2FzZSAnc2l0dWF0aW9uYWwnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwibmV1dHJhbFwiPklGIEFQUExJQ0FCTEU8L0JhZGdlPjtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTdHJpcGVTdGF0dXNCYWRnZShyZXN1bHQ6IFN0cmlwZUZpZWxkUmVzdWx0KSB7XG4gIHN3aXRjaCAocmVzdWx0LnN0YXR1cykge1xuICAgIGNhc2UgJ3Bvc2l0aXZlJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cImluZm9cIj5GUk9NIFNUUklQRTwvQmFkZ2U+O1xuICAgIGNhc2UgJ3VuYXZhaWxhYmxlJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5ldXRyYWxcIj5OT1QgQVZBSUxBQkxFPC9CYWRnZT47XG4gICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwid2FybmluZ1wiPkhFQURTIFVQPC9CYWRnZT47XG4gIH1cbn1cblxuaW50ZXJmYWNlIFNlY3Rpb25Ub2dnbGVQcm9wcyB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGV4cGFuZGVkOiBib29sZWFuO1xuICBvblByZXNzOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBTZWN0aW9uVG9nZ2xlID0gKHsgbGFiZWwsIGV4cGFuZGVkLCBvblByZXNzIH06IFNlY3Rpb25Ub2dnbGVQcm9wcykgPT4gKFxuICA8TGluayBvblByZXNzPXtvblByZXNzfT5cbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4eHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SWNvbiBuYW1lPXtleHBhbmRlZCA/ICdjaGV2cm9uVXAnIDogJ2NoZXZyb25Eb3duJ30gc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgPC9Cb3g+XG4gIDwvTGluaz5cbik7XG5cbmNvbnN0IENoZWNrbGlzdEl0ZW0gPSAoe1xuICBpdGVtLFxuICBjaGVja2VkLFxuICBzdHJpcGVGaWVsZFJlc3VsdCxcbiAgZXhwYW5kZWRTZWN0aW9ucyxcbiAgbm90ZXMsXG4gIGV4aXN0aW5nRmlsZSxcbiAgZGlzcHV0ZUlkLFxuICBjb250ZXh0LFxuICBvblRvZ2dsZSxcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbk5vdGVzQ2hhbmdlLFxuICBvblNhdmVOb3RlcyxcbiAgb25GaWxlQ2hhbmdlLFxuICBzdWJtaXR0ZWQsXG59OiBDaGVja2xpc3RJdGVtUHJvcHMpID0+IHtcbiAgY29uc3Qgd2h5RXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2h5Jyk7XG4gIGNvbnN0IHdoZXJlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2hlcmUnKTtcbiAgY29uc3Qgbm90ZXNFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCdub3RlcycpO1xuICBjb25zdCBmaWxlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnZmlsZScpO1xuXG4gIC8vIEZsYXNoIGEgXCJTYXZlZFwiIGNvbmZpcm1hdGlvbiBmb3IgMnMgYWZ0ZXIgdGhlIG1lcmNoYW50IGV4cGxpY2l0bHkgY2xpY2tzXG4gIC8vIFNhdmUsIHNvIHRoZXkgaGF2ZSB2aXN1YWwgY29uZmlybWF0aW9uIHRoZSBjb250ZW50IHBlcnNpc3RlZC4gKFdJTi00OSlcbiAgY29uc3QgW2p1c3RTYXZlZCwgc2V0SnVzdFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlU2F2ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChvblNhdmVOb3Rlcykgb25TYXZlTm90ZXMoKTtcbiAgICBzZXRKdXN0U2F2ZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRKdXN0U2F2ZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBpc1VuYXZhaWxhYmxlID0gc3RyaXBlRmllbGRSZXN1bHQ/LnN0YXR1cyA9PT0gJ3VuYXZhaWxhYmxlJztcbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHN0cmlwZUZpZWxkUmVzdWx0Py5zdGF0dXMgPT09ICduZWdhdGl2ZSc7XG4gIGNvbnN0IGlzUG9zaXRpdmUgPSBzdHJpcGVGaWVsZFJlc3VsdD8uc3RhdHVzID09PSAncG9zaXRpdmUnO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3tcbiAgICAgIHN0YWNrOiAneScsXG4gICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgfX0+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxDaGVja2JveFxuICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZX1cbiAgICAgICAgICBkaXNhYmxlZD17aXNVbmF2YWlsYWJsZSB8fCBpc1Bvc2l0aXZlIHx8IHN1Ym1pdHRlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLml0ZW19XG4gICAgICAgIC8+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3h4c21hbGwnLCB3aWR0aDogJ2ZpbGwnIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7XG4gICAgICAgICAgICAgIGZvbnQ6ICdib2R5JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ3NlbWlib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6IGlzVW5hdmFpbGFibGUgPyAnZGlzYWJsZWQnIDogY2hlY2tlZCA/ICdzZWNvbmRhcnknIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIHtpdGVtLml0ZW19XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdCAmJiBnZXRTdHJpcGVTdGF0dXNCYWRnZShzdHJpcGVGaWVsZFJlc3VsdCl9XG4gICAgICAgICAgICB7Z2V0Q2F0ZWdvcnlCYWRnZShpdGVtLmNhdGVnb3J5KX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICB7c3RyaXBlRmllbGRSZXN1bHQgJiYgKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3tcbiAgICAgICAgICAgICAgZm9udDogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICBjb2xvcjogaXNOZWdhdGl2ZSA/ICdhdHRlbnRpb24nIDogJ3NlY29uZGFyeScsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge3N0cmlwZUZpZWxkUmVzdWx0LnZhbHVlfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2h5IHRoaXMgbWF0dGVyc1wiXG4gICAgICAgICAgICAgIGV4cGFuZGVkPXt3aHlFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aHknKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7KGl0ZW0ud2hlcmVfdG9fZmluZCB8fCBzdHJpcGVGaWVsZFJlc3VsdCkgJiYgKFxuICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgIGxhYmVsPXtzdHJpcGVGaWVsZFJlc3VsdCA/ICdEZXRhaWxzJyA6ICdXaGVyZSB0byBmaW5kIHRoaXMnfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkPXt3aGVyZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnd2hlcmUnKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7aXRlbS5uYXJyYXRpdmVfb25seSAmJiAhc3VibWl0dGVkID8gKFxuICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgIGxhYmVsPXtub3RlcyA/ICdZb3VyIG5vdGVzJyA6ICdBZGQgZGV0YWlsJ31cbiAgICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ25vdGVzJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogIWlzVW5hdmFpbGFibGUgJiYgIWlzUG9zaXRpdmUgJiYgIXN1Ym1pdHRlZCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e25vdGVzID8gJ1lvdXIgbm90ZXMnIDogJ0FkZCBub3Rlcyd9XG4gICAgICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnbm90ZXMnKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhpc3RpbmdGaWxlID8gZXhpc3RpbmdGaWxlLmZpbGVfbmFtZSA6ICdBdHRhY2ggZmlsZSd9XG4gICAgICAgICAgICAgICAgICBleHBhbmRlZD17ZmlsZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdmaWxlJyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtzdWJtaXR0ZWQgJiYgZXhpc3RpbmdGaWxlICYmIChcbiAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICBsYWJlbD17ZXhpc3RpbmdGaWxlLmZpbGVfbmFtZX1cbiAgICAgICAgICAgICAgICBleHBhbmRlZD17ZmlsZUV4cGFuZGVkfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnZmlsZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgICAge3doeUV4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtpdGVtLndoeV9tYXR0ZXJzfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt3aGVyZUV4cGFuZGVkICYmIChpdGVtLndoZXJlX3RvX2ZpbmQgfHwgc3RyaXBlRmllbGRSZXN1bHQpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiBpc05lZ2F0aXZlID8gJ2F0dGVudGlvbicgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdFxuICAgICAgICAgICAgICA/IHN0cmlwZUZpZWxkUmVzdWx0Lmd1aWRhbmNlXG4gICAgICAgICAgICAgIDogaXRlbS53aGVyZV90b19maW5kfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtub3Rlc0V4cGFuZGVkICYmICFpc1VuYXZhaWxhYmxlICYmICFzdWJtaXR0ZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJywgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgIGxhYmVsPXtpdGVtLm5hcnJhdGl2ZV9vbmx5ID8gJ0FkZCBkZXRhaWwgKG9wdGlvbmFsKScgOiAnWW91ciBub3Rlcyd9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICAgIGl0ZW0ubmFycmF0aXZlX29ubHlcbiAgICAgICAgICAgICAgICA/ICdJbiB5b3VyIG93biB3b3Jkcywgd2hhdCBzaG91bGQgdGhlIG5hcnJhdGl2ZSBzYXkgYWJvdXQgdGhpcz8nXG4gICAgICAgICAgICAgICAgOiAnZS5nLiB0cmFja2luZyAjLCBmaWxlIG5hbWUsIHdoZXJlIHRvIGZpbmQgdGhpcy4uLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlPXtub3Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Ob3Rlc0NoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAge29uU2F2ZU5vdGVzICYmIChcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgc2l6ZT1cInNtYWxsXCIgb25QcmVzcz17aGFuZGxlU2F2ZUNsaWNrfT5cbiAgICAgICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtqdXN0U2F2ZWQgJiYgKFxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc3VjY2VzcycgfX0+XG4gICAgICAgICAgICAgICAgU2F2ZWRcbiAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIHtpdGVtLm5hcnJhdGl2ZV9vbmx5ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICBPcHRpb25hbC4gQWRkIGRldGFpbCB0byBzdHJlbmd0aGVuIHRoaXMgcG9pbnQuIElmIGxlZnQgYmxhbmssIHlvdXIgbmFycmF0aXZlIHdpbGwgbm90ZSB0aGlzIGdlbmVyYWxseS5cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge2ZpbGVFeHBhbmRlZCAmJiAhaXNVbmF2YWlsYWJsZSAmJiAhaXRlbS5uYXJyYXRpdmVfb25seSAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkxlZnQ6ICd4bGFyZ2UnIH19PlxuICAgICAgICAgIDxGaWxlVXBsb2FkU2VjdGlvblxuICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlSWR9XG4gICAgICAgICAgICBjaGVja2xpc3RJdGVtS2V5PXtpdGVtLml0ZW19XG4gICAgICAgICAgICBleGlzdGluZ0ZpbGU9e2V4aXN0aW5nRmlsZX1cbiAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICBvbkZpbGVDaGFuZ2U9e29uRmlsZUNoYW5nZX1cbiAgICAgICAgICAgIHN1Ym1pdHRlZD17c3VibWl0dGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrbGlzdEl0ZW07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJhbm5lciwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgU3RyaXBlRmlsZVVwbG9hZGVyIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBkZWxldGVCYWNrZW5kIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5cbmludGVyZmFjZSBGaWxlVXBsb2FkU2VjdGlvblByb3BzIHtcbiAgZGlzcHV0ZUlkOiBzdHJpbmc7XG4gIGNoZWNrbGlzdEl0ZW1LZXk6IHN0cmluZztcbiAgZXhpc3RpbmdGaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIG9uRmlsZUNoYW5nZTogKGZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGwpID0+IHZvaWQ7XG4gIHN1Ym1pdHRlZD86IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEZpbGVTaXplKGJ5dGVzOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoYnl0ZXMgPCAxMDI0KSByZXR1cm4gYCR7Ynl0ZXN9IEJgO1xuICBpZiAoYnl0ZXMgPCAxMDI0ICogMTAyNCkgcmV0dXJuIGAkeyhieXRlcyAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCYDtcbiAgcmV0dXJuIGAkeyhieXRlcyAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMSl9IE1CYDtcbn1cblxuY29uc3QgRVhURU5TSU9OX1RPX01JTUU6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHBkZjogJ2FwcGxpY2F0aW9uL3BkZicsXG4gIHBuZzogJ2ltYWdlL3BuZycsXG4gIGpwZzogJ2ltYWdlL2pwZWcnLFxuICBqcGVnOiAnaW1hZ2UvanBlZycsXG4gIGdpZjogJ2ltYWdlL2dpZicsXG4gIGNzdjogJ3RleHQvY3N2JyxcbiAgdHh0OiAndGV4dC9wbGFpbicsXG4gIGhlaWM6ICdpbWFnZS9oZWljJyxcbiAgaGVpZjogJ2ltYWdlL2hlaWYnLFxufTtcblxuLyoqXG4gKiBUaGUgU3RyaXBlIHVwbG9hZGVyJ3MgZmlsZU9iamVjdC50eXBlIGNhbiBiZSBhIGZ1bGwgTUlNRSB0eXBlXG4gKiAoXCJhcHBsaWNhdGlvbi9wZGZcIikgb3IgYSBiYXJlIGV4dGVuc2lvbiAoXCJwZGZcIikgZGVwZW5kaW5nIG9uIGhvdyB0aGUgU0RLXG4gKiByZXNvbHZlcyBpdC4gRG93bnN0cmVhbSBhc3NlbWJseSBjb2RlIGluIHRoZSBiYWNrZW5kIHdhbnRzIHJlYWwgTUlNRSB0eXBlcyxcbiAqIHNvIG5vcm1hbGl6ZSBoZXJlIGJlZm9yZSBwZXJzaXN0aW5nIHRvIGV2aWRlbmNlX2ZpbGVzLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemVNaW1lVHlwZSh0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsIGZpbGVuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICBjb25zdCB0ID0gKHR5cGUgPz8gJycpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBpZiAodC5pbmNsdWRlcygnLycpKSByZXR1cm4gdDtcbiAgaWYgKHQgJiYgRVhURU5TSU9OX1RPX01JTUVbdF0pIHJldHVybiBFWFRFTlNJT05fVE9fTUlNRVt0XTtcbiAgY29uc3QgbmFtZSA9IChmaWxlbmFtZSA/PyAnJykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZG90ID0gbmFtZS5sYXN0SW5kZXhPZignLicpO1xuICBpZiAoZG90ID49IDApIHtcbiAgICBjb25zdCBleHQgPSBuYW1lLnNsaWNlKGRvdCArIDEpO1xuICAgIGlmIChFWFRFTlNJT05fVE9fTUlNRVtleHRdKSByZXR1cm4gRVhURU5TSU9OX1RPX01JTUVbZXh0XTtcbiAgfVxuICByZXR1cm4gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG59XG5cbmZ1bmN0aW9uIGdldE1pbWVMYWJlbChtaW1lVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhcHBsaWNhdGlvbi9wZGYnOiAnUERGJyxcbiAgICAnaW1hZ2UvcG5nJzogJ1BORycsXG4gICAgJ2ltYWdlL2pwZWcnOiAnSlBHJyxcbiAgICAnaW1hZ2UvZ2lmJzogJ0dJRicsXG4gICAgJ3RleHQvY3N2JzogJ0NTVicsXG4gICAgJ3RleHQvcGxhaW4nOiAnVFhUJyxcbiAgfTtcbiAgcmV0dXJuIG1hcFttaW1lVHlwZV0gPz8gJ0ZJTEUnO1xufVxuXG5jb25zdCBGaWxlVXBsb2FkU2VjdGlvbiA9ICh7XG4gIGRpc3B1dGVJZCxcbiAgY2hlY2tsaXN0SXRlbUtleSxcbiAgZXhpc3RpbmdGaWxlLFxuICBjb250ZXh0LFxuICBvbkZpbGVDaGFuZ2UsXG4gIHN1Ym1pdHRlZCxcbn06IEZpbGVVcGxvYWRTZWN0aW9uUHJvcHMpID0+IHtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dSZXBsYWNlLCBzZXRTaG93UmVwbGFjZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlVXBsb2FkQ29tcGxldGUgPSBhc3luYyAoZmlsZU9iamVjdDoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gIH0pID0+IHtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNaW1lID0gbm9ybWFsaXplTWltZVR5cGUoZmlsZU9iamVjdC50eXBlLCBmaWxlT2JqZWN0LmZpbGVuYW1lKTtcbiAgICBpZiAobm9ybWFsaXplZE1pbWUgPT09ICdpbWFnZS9oZWljJyB8fCBub3JtYWxpemVkTWltZSA9PT0gJ2ltYWdlL2hlaWYnKSB7XG4gICAgICBzZXRFcnJvcihcbiAgICAgICAgXCJIRUlDIHBob3RvcyBhcmVuJ3Qgc3VwcG9ydGVkLiBPcGVuIHRoZSBmaWxlIGluIFByZXZpZXcgb3IgeW91ciBwaG90byBhcHAsIGV4cG9ydCBpdCBhcyBKUEVHIG9yIFBORywgYW5kIHRyeSBhZ2Fpbi5cIixcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U2F2aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZSB9PihcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlSWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAge1xuICAgICAgICAgIGNoZWNrbGlzdF9pdGVtX2tleTogY2hlY2tsaXN0SXRlbUtleSxcbiAgICAgICAgICBzdHJpcGVfZmlsZV9pZDogZmlsZU9iamVjdC5pZCxcbiAgICAgICAgICBmaWxlX25hbWU6IGZpbGVPYmplY3QuZmlsZW5hbWUgPz8gJ3VudGl0bGVkJyxcbiAgICAgICAgICBmaWxlX3NpemU6IGZpbGVPYmplY3Quc2l6ZSxcbiAgICAgICAgICBtaW1lX3R5cGU6IG5vcm1hbGl6ZWRNaW1lLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIG9uRmlsZUNoYW5nZShyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRTaG93UmVwbGFjZShmYWxzZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHNhdmUgZmlsZSByZWNvcmQuIFRoZSBmaWxlIHdhcyB1cGxvYWRlZCB0byBTdHJpcGUgYnV0IHdlIGNvdWxkIG5vdCBsaW5rIGl0LiBUcnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZEVycm9yID0gKCkgPT4ge1xuICAgIHNldEVycm9yKCdVcGxvYWQgZmFpbGVkLiBDaGVjayB5b3VyIGZpbGUgaXMgdW5kZXIgMTBNQiBhbmQgYSBzdXBwb3J0ZWQgdHlwZSAoUERGLCBQTkcsIEpQRywgR0lGLCBDU1YsIFRYVCkuJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZXhpc3RpbmdGaWxlKSByZXR1cm47XG4gICAgc2V0RXJyb3IobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGVsZXRlQmFja2VuZChcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlSWR9L2V2aWRlbmNlLWZpbGVzLyR7ZXhpc3RpbmdGaWxlLmlkfWAsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICApO1xuICAgICAgb25GaWxlQ2hhbmdlKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byByZW1vdmUgZmlsZS4gVHJ5IGFnYWluLicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWFkLW9ubHkgbW9kZSBwb3N0LXN1Ym1pc3Npb25cbiAgaWYgKHN1Ym1pdHRlZCkge1xuICAgIGlmIChleGlzdGluZ0ZpbGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPVwieHNtYWxsXCIgLz5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICB7ZXhpc3RpbmdGaWxlLmZpbGVfbmFtZX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj57Z2V0TWltZUxhYmVsKGV4aXN0aW5nRmlsZS5taW1lX3R5cGUpfTwvQmFkZ2U+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7Zm9ybWF0RmlsZVNpemUoZXhpc3RpbmdGaWxlLmZpbGVfc2l6ZSl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICBObyBmaWxlIGF0dGFjaGVkXG4gICAgICA8L0lubGluZT5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgICAgdGl0bGU9XCJVcGxvYWQgaXNzdWVcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtlcnJvcn1cbiAgICAgICAgICBvbkRpc21pc3M9eygpID0+IHNldEVycm9yKG51bGwpfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAge2V4aXN0aW5nRmlsZSAmJiAhc2hvd1JlcGxhY2UgPyAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIHtleGlzdGluZ0ZpbGUuZmlsZV9uYW1lfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj57Z2V0TWltZUxhYmVsKGV4aXN0aW5nRmlsZS5taW1lX3R5cGUpfTwvQmFkZ2U+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2Zvcm1hdEZpbGVTaXplKGV4aXN0aW5nRmlsZS5maWxlX3NpemUpfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPExpbmsgb25QcmVzcz17KCkgPT4gc2V0U2hvd1JlcGxhY2UodHJ1ZSl9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+UmVwbGFjZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmsgb25QcmVzcz17aGFuZGxlUmVtb3ZlfT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2NyaXRpY2FsJyB9fT5SZW1vdmU8L0lubGluZT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIHtzaG93UmVwbGFjZSAmJiAoXG4gICAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93UmVwbGFjZShmYWxzZSl9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5DYW5jZWwgcmVwbGFjZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPFN0cmlwZUZpbGVVcGxvYWRlclxuICAgICAgICAgICAgbGFiZWw9e3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ0Nob29zZSBmaWxlJ31cbiAgICAgICAgICAgIHB1cnBvc2U9XCJkaXNwdXRlX2V2aWRlbmNlXCJcbiAgICAgICAgICAgIG9uQ29tcGxldGU9e2hhbmRsZVVwbG9hZENvbXBsZXRlfVxuICAgICAgICAgICAgb25FcnJvcj17aGFuZGxlVXBsb2FkRXJyb3J9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIFBERiwgUE5HLCBKUEcsIG9yIEdJRi4gTWF4IDEwTUIuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRTZWN0aW9uO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgUGxheWJvb2tEYXRhLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBOYXJyYXRpdmVQaGFzZSwgTmFycmF0aXZlQW5ub3RhdGlvbiwgU3RhdHVzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcbmltcG9ydCB7IFBPTExfSU5URVJWQUxfTVMsIE1BWF9QT0xMX0RVUkFUSU9OX01TIH0gZnJvbSAnLi4vLi4vbGliL25hcnJhdGl2ZS10eXBlcyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgTmFycmF0aXZlUHJlR2VuZXJhdGlvbiBmcm9tICcuL05hcnJhdGl2ZVByZUdlbmVyYXRpb24nO1xuaW1wb3J0IE5hcnJhdGl2ZUdlbmVyYXRpbmcgZnJvbSAnLi9OYXJyYXRpdmVHZW5lcmF0aW5nJztcbmltcG9ydCBOYXJyYXRpdmVSZXZpZXcgZnJvbSAnLi9OYXJyYXRpdmVSZXZpZXcnO1xuaW1wb3J0IE5hcnJhdGl2ZUVycm9yIGZyb20gJy4vTmFycmF0aXZlRXJyb3InO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlUGFuZWxQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEgfCBudWxsO1xuICBldmlkZW5jZUZpbGVzOiBFdmlkZW5jZUZpbGVbXTtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBlZGl0ZWROYXJyYXRpdmU6IHN0cmluZztcbiAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2U6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQXBwcm92ZTogKG5hcnJhdGl2ZVRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25OYXZpZ2F0ZUJhY2s6ICgpID0+IHZvaWQ7XG4gIHN1Ym1pdHRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IE5hcnJhdGl2ZVBhbmVsID0gKHtcbiAgZGlzcHV0ZSxcbiAgcGxheWJvb2ssXG4gIGV2aWRlbmNlRmlsZXMsXG4gIGNvbnRleHQsXG4gIGVkaXRlZE5hcnJhdGl2ZSxcbiAgb25FZGl0ZWROYXJyYXRpdmVDaGFuZ2UsXG4gIG9uQXBwcm92ZSxcbiAgb25OYXZpZ2F0ZUJhY2ssXG4gIHN1Ym1pdHRlZCxcbn06IE5hcnJhdGl2ZVBhbmVsUHJvcHMpID0+IHtcbiAgLy8gU2VlZCBmcm9tIHBlcnNpc3RlZCBuYXJyYXRpdmVfdGV4dCBzbyB0aGUgUmV2aWV3IHZpZXcgc2hvd3Mgb24gcmVsb2FkXG4gIC8vIGFjcm9zcyBzZXNzaW9ucywgbm90IHRoZSBwcmUtZ2VuZXJhdGlvbiBwcm9tcHQgKFdJTi0yMCkuXG4gIGNvbnN0IFtwaGFzZSwgc2V0UGhhc2VdID0gdXNlU3RhdGU8TmFycmF0aXZlUGhhc2U+KCgpID0+XG4gICAgZWRpdGVkTmFycmF0aXZlID8gJ3JldmlldycgOiAnaWRsZScsXG4gICk7XG4gIGNvbnN0IFtnZW5lcmF0aW9uSWQsIHNldEdlbmVyYXRpb25JZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHN0cmluZz4oKCkgPT4gZWRpdGVkTmFycmF0aXZlKTtcbiAgY29uc3QgW2Fubm90YXRpb25zLCBzZXRBbm5vdGF0aW9uc10gPSB1c2VTdGF0ZTxOYXJyYXRpdmVBbm5vdGF0aW9uW10+KFtdKTtcbiAgY29uc3QgW2dlbmVyYXRpb25OdW1iZXIsIHNldEdlbmVyYXRpb25OdW1iZXJdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNHZW5lcmF0aW9uTGltaXQsIHNldElzR2VuZXJhdGlvbkxpbWl0XSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmPEV4dGVuc2lvbkNvbnRleHRWYWx1ZT4oY29udGV4dCk7XG4gIGNvbnN0IHBvbGxTdGFydFJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBwb2xsUmV0cnlDb3VudFJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuXG4gIC8vIEtlZXAgY29udGV4dFJlZiBmcmVzaCBhcyBjb250ZXh0IGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuICB9LCBbY29udGV4dF0pO1xuXG4gIC8vIFBvbGxpbmcgZWZmZWN0OiBvbmx5IGFjdGl2ZSB3aGVuIHBoYXNlID09PSAnZ2VuZXJhdGluZycgYW5kIGdlbmVyYXRpb25JZCBpcyBzZXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocGhhc2UgIT09ICdnZW5lcmF0aW5nJyB8fCAhZ2VuZXJhdGlvbklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcG9sbFN0YXJ0UmVmLmN1cnJlbnQgPSBEYXRlLm5vdygpO1xuICAgIHBvbGxSZXRyeUNvdW50UmVmLmN1cnJlbnQgPSAwO1xuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBleGNlZWRlZCB0aGUgbWF4IHBvbGwgZHVyYXRpb25cbiAgICAgIGlmIChEYXRlLm5vdygpIC0gcG9sbFN0YXJ0UmVmLmN1cnJlbnQgPiBNQVhfUE9MTF9EVVJBVElPTl9NUykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdOYXJyYXRpdmUgZ2VuZXJhdGlvbiB0aW1lZCBvdXQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2hCYWNrZW5kPFN0YXR1c1Jlc3BvbnNlPihcbiAgICAgICAgICBgL2FwaS9uYXJyYXRpdmVzLyR7Z2VuZXJhdGlvbklkfS9zdGF0dXNgLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc3RhdHVzUmVzcG9uc2Uuc3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHNldE5hcnJhdGl2ZShzdGF0dXNSZXNwb25zZS5uYXJyYXRpdmUpO1xuICAgICAgICAgIHNldEFubm90YXRpb25zKHN0YXR1c1Jlc3BvbnNlLmFubm90YXRpb25zKTtcbiAgICAgICAgICBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZShzdGF0dXNSZXNwb25zZS5uYXJyYXRpdmUpO1xuICAgICAgICAgIHNldFBoYXNlKCdyZXZpZXcnKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXNSZXNwb25zZS5zdGF0dXMgPT09ICdmYWlsZWQnKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHN0YXR1c1Jlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICBzZXRQaGFzZSgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAncGVuZGluZycgPT4ga2VlcCBwb2xsaW5nXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgcG9sbFJldHJ5Q291bnRSZWYuY3VycmVudCArPSAxO1xuICAgICAgICBpZiAocG9sbFJldHJ5Q291bnRSZWYuY3VycmVudCA+PSAzKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdOZXR3b3JrIGVycm9yIHdoaWxlIGNoZWNraW5nIGdlbmVyYXRpb24gc3RhdHVzLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgIHNldFBoYXNlKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgUE9MTF9JTlRFUlZBTF9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtwaGFzZSwgZ2VuZXJhdGlvbklkLCBvbkVkaXRlZE5hcnJhdGl2ZUNoYW5nZV0pO1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKG1lcmNoYW50RmVlZGJhY2s6IHN0cmluZykgPT4ge1xuICAgIHNldFBoYXNlKCdnZW5lcmF0aW5nJyk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKG51bGwpO1xuICAgIHNldElzR2VuZXJhdGlvbkxpbWl0KGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGdlbmVyYXRpb25faWQ6IHN0cmluZyB9PihcbiAgICAgICAgJy9hcGkvbmFycmF0aXZlcy9nZW5lcmF0ZScsXG4gICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3B1dGVfaWQ6IGRpc3B1dGUuaWQsXG4gICAgICAgICAgcmVhc29uX2NvZGU6IGRpc3B1dGUucmVhc29uX2NvZGUsXG4gICAgICAgICAgbmV0d29yazogZGlzcHV0ZS5uZXR3b3JrLFxuICAgICAgICAgIG1lcmNoYW50X2ZlZWRiYWNrOiBtZXJjaGFudEZlZWRiYWNrLFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgc2V0R2VuZXJhdGlvbklkKHJlc3BvbnNlLmdlbmVyYXRpb25faWQpO1xuICAgICAgc2V0R2VuZXJhdGlvbk51bWJlcigocHJldikgPT4gcHJldiArIDEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yICYmIGVyci5zdGF0dXMgPT09IDQyOSAmJiBlcnIuY29kZSA9PT0gJ2dlbmVyYXRpb25fbGltaXQnKSB7XG4gICAgICAgIHNldElzR2VuZXJhdGlvbkxpbWl0KHRydWUpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKCdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgfVxuICAgICAgc2V0UGhhc2UoJ2Vycm9yJyk7XG4gICAgfVxuICB9LCBbZGlzcHV0ZS5pZCwgZGlzcHV0ZS5yZWFzb25fY29kZSwgZGlzcHV0ZS5uZXR3b3JrXSk7XG5cbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvbkFwcHJvdmUoZWRpdGVkTmFycmF0aXZlKTtcbiAgfSwgW29uQXBwcm92ZSwgZWRpdGVkTmFycmF0aXZlXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVnZW5lcmF0ZSA9IHVzZUNhbGxiYWNrKChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcpID0+IHtcbiAgICBoYW5kbGVHZW5lcmF0ZShtZXJjaGFudEZlZWRiYWNrKTtcbiAgfSwgW2hhbmRsZUdlbmVyYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlUmV0cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKG51bGwpO1xuICAgIHNldFBoYXNlKCdpZGxlJyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVFcnJvckNvbnRpbnVlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9uQXBwcm92ZShlZGl0ZWROYXJyYXRpdmUpO1xuICB9LCBbb25BcHByb3ZlLCBlZGl0ZWROYXJyYXRpdmVdKTtcblxuICAvLyBQb3N0LXN1Ym1pc3Npb246IHJlbmRlciBuYXJyYXRpdmUgaW4gcmVhZC1vbmx5IG1vZGUgcmVnYXJkbGVzcyBvZiBsb2NhbCBwaGFzZSBzdGF0ZVxuICBpZiAoc3VibWl0dGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxOYXJyYXRpdmVSZXZpZXdcbiAgICAgICAgbmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgIGFubm90YXRpb25zPXthbm5vdGF0aW9uc31cbiAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgIGdlbmVyYXRpb25OdW1iZXI9e2dlbmVyYXRpb25OdW1iZXJ9XG4gICAgICAgIG9uRWRpdENoYW5nZT17b25FZGl0ZWROYXJyYXRpdmVDaGFuZ2V9XG4gICAgICAgIG9uQXBwcm92ZT17aGFuZGxlQXBwcm92ZX1cbiAgICAgICAgb25SZWdlbmVyYXRlPXtoYW5kbGVSZWdlbmVyYXRlfVxuICAgICAgICBzdWJtaXR0ZWRcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHN3aXRjaCAocGhhc2UpIHtcbiAgICBjYXNlICdpZGxlJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVQcmVHZW5lcmF0aW9uXG4gICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgZXZpZGVuY2VGaWxlcz17ZXZpZGVuY2VGaWxlc31cbiAgICAgICAgICBnZW5lcmF0aW9uTnVtYmVyPXtnZW5lcmF0aW9uTnVtYmVyfVxuICAgICAgICAgIG9uR2VuZXJhdGU9e2hhbmRsZUdlbmVyYXRlfVxuICAgICAgICAgIG9uTmF2aWdhdGVCYWNrPXtvbk5hdmlnYXRlQmFja31cbiAgICAgICAgLz5cbiAgICAgICk7XG5cbiAgICBjYXNlICdnZW5lcmF0aW5nJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVHZW5lcmF0aW5nIGRpc3B1dGU9e2Rpc3B1dGV9IC8+XG4gICAgICApO1xuXG4gICAgY2FzZSAncmV2aWV3JzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOYXJyYXRpdmVSZXZpZXdcbiAgICAgICAgICBuYXJyYXRpdmU9e25hcnJhdGl2ZX1cbiAgICAgICAgICBhbm5vdGF0aW9ucz17YW5ub3RhdGlvbnN9XG4gICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgZ2VuZXJhdGlvbk51bWJlcj17Z2VuZXJhdGlvbk51bWJlcn1cbiAgICAgICAgICBvbkVkaXRDaGFuZ2U9e29uRWRpdGVkTmFycmF0aXZlQ2hhbmdlfVxuICAgICAgICAgIG9uQXBwcm92ZT17aGFuZGxlQXBwcm92ZX1cbiAgICAgICAgICBvblJlZ2VuZXJhdGU9e2hhbmRsZVJlZ2VuZXJhdGV9XG4gICAgICAgIC8+XG4gICAgICApO1xuXG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5hcnJhdGl2ZUVycm9yXG4gICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgZWRpdGVkTmFycmF0aXZlPXtlZGl0ZWROYXJyYXRpdmV9XG4gICAgICAgICAgaXNHZW5lcmF0aW9uTGltaXQ9e2lzR2VuZXJhdGlvbkxpbWl0fVxuICAgICAgICAgIG9uRWRpdENoYW5nZT17b25FZGl0ZWROYXJyYXRpdmVDaGFuZ2V9XG4gICAgICAgICAgb25Db250aW51ZT17aGFuZGxlRXJyb3JDb250aW51ZX1cbiAgICAgICAgICBvblJldHJ5PXtoYW5kbGVSZXRyeX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZVBhbmVsO1xuIiwgImV4cG9ydCB0eXBlIE5hcnJhdGl2ZVBoYXNlID0gJ2lkbGUnIHwgJ2dlbmVyYXRpbmcnIHwgJ3JldmlldycgfCAnZXJyb3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hcnJhdGl2ZUFubm90YXRpb24ge1xuICBzZWN0aW9uOiBzdHJpbmc7XG4gIHJlYXNvbmluZzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmVzcG9uc2Uge1xuICBnZW5lcmF0aW9uX2lkOiBzdHJpbmc7XG4gIHN0YXR1czogJ3BlbmRpbmcnO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0dXNSZXNwb25zZSA9XG4gIHwgeyBzdGF0dXM6ICdwZW5kaW5nJyB9XG4gIHwgeyBzdGF0dXM6ICdjb21wbGV0ZWQnOyBuYXJyYXRpdmU6IHN0cmluZzsgYW5ub3RhdGlvbnM6IE5hcnJhdGl2ZUFubm90YXRpb25bXSB9XG4gIHwgeyBzdGF0dXM6ICdmYWlsZWQnOyBlcnJvcjogc3RyaW5nIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpRXJyb3JSZXNwb25zZSB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IE1BWF9HRU5FUkFUSU9OUyA9IDU7XG5leHBvcnQgY29uc3QgUE9MTF9JTlRFUlZBTF9NUyA9IDMwMDA7XG5leHBvcnQgY29uc3QgTUFYX1BPTExfRFVSQVRJT05fTVMgPSA2MDAwMDtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJhZGdlLFxuICBCYW5uZXIsXG4gIEJveCxcbiAgQnV0dG9uLFxuICBEaXZpZGVyLFxuICBJbmxpbmUsXG4gIExpbmssXG4gIFRleHRBcmVhLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBQbGF5Ym9va0RhdGEsIEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBNQVhfR0VORVJBVElPTlMgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcbmltcG9ydCB7IGdldFN0cmlwZUZpZWxkUmVzdWx0IH0gZnJvbSAnLi4vLi4vbGliL3N0cmlwZS1maWVsZC1zdGF0dXMnO1xuXG5pbnRlcmZhY2UgTmFycmF0aXZlUHJlR2VuZXJhdGlvblByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGV2aWRlbmNlRmlsZXM6IEV2aWRlbmNlRmlsZVtdO1xuICBnZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG4gIG9uR2VuZXJhdGU6IChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTmF2aWdhdGVCYWNrOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBOYXJyYXRpdmVQcmVHZW5lcmF0aW9uID0gKHtcbiAgZGlzcHV0ZSxcbiAgcGxheWJvb2ssXG4gIGV2aWRlbmNlRmlsZXMsXG4gIGdlbmVyYXRpb25OdW1iZXIsXG4gIG9uR2VuZXJhdGUsXG4gIG9uTmF2aWdhdGVCYWNrLFxufTogTmFycmF0aXZlUHJlR2VuZXJhdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IFtmZWVkYmFjaywgc2V0RmVlZGJhY2tdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHJlbWFpbmluZyA9IE1BWF9HRU5FUkFUSU9OUyAtIGdlbmVyYXRpb25OdW1iZXI7XG4gIGNvbnN0IGxpbWl0UmVhY2hlZCA9IHJlbWFpbmluZyA8PSAwO1xuXG4gIC8vIEJ1aWxkIGEgbG9va3VwIG1hcDogY2hlY2tsaXN0X2l0ZW1fa2V5IC0+IEV2aWRlbmNlRmlsZVxuICBjb25zdCBmaWxlc0J5S2V5ID0gbmV3IE1hcDxzdHJpbmcsIEV2aWRlbmNlRmlsZT4oKTtcbiAgZm9yIChjb25zdCBmaWxlIG9mIGV2aWRlbmNlRmlsZXMpIHtcbiAgICBmaWxlc0J5S2V5LnNldChmaWxlLmNoZWNrbGlzdF9pdGVtX2tleSwgZmlsZSk7XG4gIH1cblxuICAvLyBDb21wdXRlIHBlci1pdGVtIHNhdGlzZmFjdGlvbi4gVGhyZWUgY2F0ZWdvcmllcyBvZiBcInNhdGlzZmllZFwiOlxuICAvLyAgIC0gQSAoc3RyaXBlX2ZpZWxkKTogc2F0aXNmaWVkIHdoZW4gYXV0by1wdWxsIHJldHVybnMgYSBwb3NpdGl2ZSB2YWx1ZVxuICAvLyAgIC0gU2xvdCAoc3RyaXBlX2V2aWRlbmNlX2ZpZWxkKTogc2F0aXNmaWVkIHdoZW4gYSBmaWxlIGlzIHVwbG9hZGVkXG4gIC8vICAgLSBUIChuYXJyYXRpdmVfb25seSk6IGFsd2F5cyBzYXRpc2ZpZWQgLS0gZWl0aGVyIHRoZSBtZXJjaGFudCB0eXBlZFxuICAvLyAgICAgYSBub3RlIG9yIHRoZSBwZXItcGxheWJvb2sgZmFsbGJhY2sgZmlsbHMgaXQgaW4gYXQgbmFycmF0aXZlIHRpbWUuXG4gIC8vICAgICAoV0lOLTQ5KVxuICBjb25zdCBjaGVja2xpc3ROb3RlcyA9IGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzID8/IHt9O1xuICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IHBsYXlib29rPy5ldmlkZW5jZV9jaGVja2xpc3QgPz8gW107XG4gIGNvbnN0IGl0ZW1TdGF0dXNlcyA9IGNoZWNrbGlzdEl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZWRGaWxlID0gZmlsZXNCeUtleS5nZXQoaXRlbS5pdGVtKTtcbiAgICBjb25zdCBzdHJpcGVGaWVsZCA9IGdldFN0cmlwZUZpZWxkUmVzdWx0KGl0ZW0sIGRpc3B1dGUpO1xuICAgIGNvbnN0IGF1dG9GaWxsZWQgPSBzdHJpcGVGaWVsZD8uc3RhdHVzID09PSAncG9zaXRpdmUnO1xuICAgIGNvbnN0IGhhc01lcmNoYW50Tm90ZSA9ICEhKGNoZWNrbGlzdE5vdGVzW2l0ZW0uaXRlbV0/LnRyaW0oKSk7XG4gICAgY29uc3QgaXNOYXJyYXRpdmVPbmx5ID0gISFpdGVtLm5hcnJhdGl2ZV9vbmx5O1xuICAgIGNvbnN0IHNhdGlzZmllZCA9ICEhbWF0Y2hlZEZpbGUgfHwgYXV0b0ZpbGxlZCB8fCBpc05hcnJhdGl2ZU9ubHk7XG4gICAgbGV0IHN0YXR1c0xhYmVsOiBzdHJpbmc7XG4gICAgaWYgKG1hdGNoZWRGaWxlKSB7XG4gICAgICBzdGF0dXNMYWJlbCA9ICdVcGxvYWRlZCc7XG4gICAgfSBlbHNlIGlmIChhdXRvRmlsbGVkKSB7XG4gICAgICBzdGF0dXNMYWJlbCA9ICdGcm9tIFN0cmlwZSc7XG4gICAgfSBlbHNlIGlmIChpc05hcnJhdGl2ZU9ubHkpIHtcbiAgICAgIHN0YXR1c0xhYmVsID0gaGFzTWVyY2hhbnROb3RlID8gJ05vdGVzIGFkZGVkJyA6ICdJbiBuYXJyYXRpdmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXNMYWJlbCA9ICdOb3QgdXBsb2FkZWQnO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbSxcbiAgICAgIG1hdGNoZWRGaWxlLFxuICAgICAgc3RyaXBlRmllbGQsXG4gICAgICBhdXRvRmlsbGVkLFxuICAgICAgaXNOYXJyYXRpdmVPbmx5LFxuICAgICAgaGFzTWVyY2hhbnROb3RlLFxuICAgICAgc2F0aXNmaWVkLFxuICAgICAgc3RhdHVzTGFiZWwsXG4gICAgfTtcbiAgfSk7XG4gIGNvbnN0IHNhdGlzZmllZENvdW50ID0gaXRlbVN0YXR1c2VzLmZpbHRlcigocykgPT4gcy5zYXRpc2ZpZWQpLmxlbmd0aDtcbiAgY29uc3QgdG90YWxJdGVtcyA9IGl0ZW1TdGF0dXNlcy5sZW5ndGg7XG4gIGNvbnN0IGhhc05vRXZpZGVuY2UgPSBzYXRpc2ZpZWRDb3VudCA9PT0gMDtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdsYXJnZScgfX0+XG4gICAgICB7LyogQ29hY2ggaGVhZGVyOiBpbnRyb2R1Y2VzIHRoZSBuYXJyYXRpdmUgc3RlcCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj5BSSBDb2FjaDwvQmFkZ2U+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBSZWFkeSB0byB3cml0ZSB5b3VyIG5hcnJhdGl2ZVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgV2luQmFjayB3aWxsIHVzZSB5b3VyIHVwbG9hZGVkIGV2aWRlbmNlIGFuZCB0aGUgZGV0YWlscyBTdHJpcGUgaGFzXG4gICAgICAgICAgb24gdGhpcyB0cmFuc2FjdGlvbiB0byBkcmFmdCBhIHJlc3BvbnNlIHRhaWxvcmVkIHRvIHRoaXMgZGlzcHV0ZS5cbiAgICAgICAgICBSZXZpZXcgd2hhdCB0aGUgQUkgd2lsbCB3b3JrIHdpdGggYmVsb3csIHRoZW4gZ2VuZXJhdGUgeW91ciBkcmFmdC5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIEV2aWRlbmNlIHN1bW1hcnkgY2FyZCAqL31cbiAgICAgIHtwbGF5Ym9vayA/IChcbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICAgIGdhcDogJ21lZGl1bScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIEV2aWRlbmNlIHN1bW1hcnlcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtzYXRpc2ZpZWRDb3VudH0gb2Yge3RvdGFsSXRlbXN9IGNvdmVyZWRcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge2hhc05vRXZpZGVuY2UgJiYgKFxuICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiTm8gZXZpZGVuY2UgYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJUaGUgQUkgY2FuIHN0aWxsIGdlbmVyYXRlIGEgbmFycmF0aXZlLCBidXQgeW91ciBjaGFuY2VzIG9mIHdpbm5pbmcgYXJlIG11Y2ggbG93ZXIgd2l0aG91dCBzdXBwb3J0aW5nIGV2aWRlbmNlLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6IDAgfX0+XG4gICAgICAgICAgICB7aXRlbVN0YXR1c2VzLm1hcCgoeyBpdGVtLCBzYXRpc2ZpZWQgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNGaXJzdCA9IGluZGV4ID09PSAwO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxCb3gga2V5PXtpdGVtLml0ZW19IGNzcz17eyBzdGFjazogJ3knLCBnYXA6IDAgfX0+XG4gICAgICAgICAgICAgICAgICB7IWlzRmlyc3QgJiYgPERpdmlkZXIgLz59XG4gICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdZOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMy80JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNhdGlzZmllZCA/ICdzdWNjZXNzJyA6ICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYXRpc2ZpZWQgPyAnXFx1MjcxMycgOiAnXFx1MjVDQid9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdjYXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNhdGlzZmllZCA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZVxuICAgICAgICAgICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udDogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ3NlbWlib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzYXRpc2ZpZWQgPyAnc3VjY2VzcycgOiAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbVN0YXR1c2VzW2luZGV4XS5zdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgPExpbmsgb25QcmVzcz17b25OYXZpZ2F0ZUJhY2t9PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2luZm8nIH19PlxuICAgICAgICAgICAgICB7J1xcdTIxOTAgR28gYmFjayB0byBhZGQgbW9yZSBldmlkZW5jZSd9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIlBsYXlib29rIG5vdCBhdmFpbGFibGVcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiTm8gcGxheWJvb2sgd2FzIGZvdW5kIGZvciB0aGlzIGRpc3B1dGUgdHlwZS4gVGhlIEFJIHdpbGwgZ2VuZXJhdGUgYSBnZW5lcmFsIG5hcnJhdGl2ZSBiYXNlZCBvbiB0aGUgZGlzcHV0ZSBkZXRhaWxzLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogTWVyY2hhbnQgZmVlZGJhY2sgY2FyZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgQW55dGhpbmcgZWxzZSB0aGUgQUkgc2hvdWxkIGtub3c/XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBPcHRpb25hbC4gQWRkIGFueSBjb250ZXh0IHRoZSBldmlkZW5jZSBmaWxlcyBkb24ndCBhbHJlYWR5IGNhcHR1cmUuXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIEN1c3RvbWVyIGNvbmZpcm1lZCByZWNlaXB0IGJ5IHBob25lIG9uIE1hcmNoIDIwdGhcIlxuICAgICAgICAgIHZhbHVlPXtmZWVkYmFja31cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZlZWRiYWNrKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICByb3dzPXszfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBHZW5lcmF0ZSBidXR0b24gb3IgbGltaXQgYmFubmVyICovfVxuICAgICAge2xpbWl0UmVhY2hlZCA/IChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIkdlbmVyYXRpb24gbGltaXQgcmVhY2hlZFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249e2BZb3UgaGF2ZSB1c2VkIGFsbCAke01BWF9HRU5FUkFUSU9OU30gbmFycmF0aXZlIGdlbmVyYXRpb25zIGZvciB0aGlzIGRpc3B1dGUuIFJldmlldyBhbmQgZWRpdCB0aGUgZXhpc3RpbmcgbmFycmF0aXZlLCBvciB1c2UgaXQgYXMtaXMgZm9yIHlvdXIgc3VibWlzc2lvbi5gfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnbWVkaXVtJywgYWxpZ25ZOiAnY2VudGVyJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uR2VuZXJhdGUoZmVlZGJhY2spfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEdlbmVyYXRlIE5hcnJhdGl2ZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge3JlbWFpbmluZ30gb2Yge01BWF9HRU5FUkFUSU9OU30gZ2VuZXJhdGlvbntyZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gcmVtYWluaW5nXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZVByZUdlbmVyYXRpb247XG4iLCAiaW1wb3J0IHsgQmFkZ2UsIEJveCwgSW5saW5lLCBTcGlubmVyIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBOYXJyYXRpdmVHZW5lcmF0aW5nUHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xufVxuXG5jb25zdCBOYXJyYXRpdmVHZW5lcmF0aW5nID0gKHsgZGlzcHV0ZSB9OiBOYXJyYXRpdmVHZW5lcmF0aW5nUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ21lZGl1bScsXG4gICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICd4bGFyZ2UnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIEdlbmVyYXRpbmcgeW91ciBuYXJyYXRpdmUuLi5cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIFdpbkJhY2sgaXMgYW5hbHl6aW5nIHlvdXIgZXZpZGVuY2UgYW5kIGJ1aWxkaW5nIGEgcmVzcG9uc2UgdGFpbG9yZWQgdG97JyAnfVxuICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmt9IHJlYXNvbiBjb2RlIHtkaXNwdXRlLnJlYXNvbl9jb2RlfS4gVGhpcyB1c3VhbGx5IHRha2VzXG4gICAgICAgICAgNS0xMCBzZWNvbmRzLlxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmFycmF0aXZlR2VuZXJhdGluZztcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFjY29yZGlvbixcbiAgQWNjb3JkaW9uSXRlbSxcbiAgQmFkZ2UsXG4gIEJhbm5lcixcbiAgQm94LFxuICBCdXR0b24sXG4gIERpdmlkZXIsXG4gIElubGluZSxcbiAgVGV4dEFyZWEsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgeyBOYXJyYXRpdmVBbm5vdGF0aW9uLCBNQVhfR0VORVJBVElPTlMgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXR5cGVzJztcblxuaW50ZXJmYWNlIE5hcnJhdGl2ZVJldmlld1Byb3BzIHtcbiAgbmFycmF0aXZlOiBzdHJpbmc7XG4gIGFubm90YXRpb25zOiBOYXJyYXRpdmVBbm5vdGF0aW9uW107XG4gIGVkaXRlZE5hcnJhdGl2ZTogc3RyaW5nO1xuICBnZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG4gIG9uRWRpdENoYW5nZTogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25BcHByb3ZlOiAoKSA9PiB2b2lkO1xuICBvblJlZ2VuZXJhdGU6IChtZXJjaGFudEZlZWRiYWNrOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN1Ym1pdHRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IE5hcnJhdGl2ZVJldmlldyA9ICh7XG4gIG5hcnJhdGl2ZSxcbiAgYW5ub3RhdGlvbnMsXG4gIGVkaXRlZE5hcnJhdGl2ZSxcbiAgZ2VuZXJhdGlvbk51bWJlcixcbiAgb25FZGl0Q2hhbmdlLFxuICBvbkFwcHJvdmUsXG4gIG9uUmVnZW5lcmF0ZSxcbiAgc3VibWl0dGVkLFxufTogTmFycmF0aXZlUmV2aWV3UHJvcHMpID0+IHtcbiAgY29uc3QgW3Nob3dSZWdlbkNvbmZpcm0sIHNldFNob3dSZWdlbkNvbmZpcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZmVlZGJhY2ssIHNldEZlZWRiYWNrXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCByZW1haW5pbmcgPSBNQVhfR0VORVJBVElPTlMgLSBnZW5lcmF0aW9uTnVtYmVyO1xuICBjb25zdCBsaW1pdFJlYWNoZWQgPSByZW1haW5pbmcgPD0gMDtcbiAgY29uc3QgaGFzRWRpdHMgPSBlZGl0ZWROYXJyYXRpdmUgIT09IG5hcnJhdGl2ZTtcblxuICBjb25zdCBoYW5kbGVSZWdlbmVyYXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGhhc0VkaXRzKSB7XG4gICAgICBzZXRTaG93UmVnZW5Db25maXJtKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblJlZ2VuZXJhdGUoZmVlZGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtUmVnZW5lcmF0ZSA9ICgpID0+IHtcbiAgICBzZXRTaG93UmVnZW5Db25maXJtKGZhbHNlKTtcbiAgICBvblJlZ2VuZXJhdGUoZmVlZGJhY2spO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIHsvKiBDb2FjaCBoZWFkZXIgY2FyZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPEJhZGdlIHR5cGU9XCJpbmZvXCI+QUkgQ29hY2g8L0JhZGdlPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgR2VuZXJhdGlvbiB7Z2VuZXJhdGlvbk51bWJlcn0gb2Yge01BWF9HRU5FUkFUSU9OU31cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBZb3VyIGRpc3B1dGUgbmFycmF0aXZlXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICBSZXZpZXcgdGhlIEFJJ3MgcmVhc29uaW5nLCB0aGVuIGVkaXQgdGhlIG5hcnJhdGl2ZSBiZWxvdy4gVGhpcyBpc1xuICAgICAgICAgIHRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBzdWJtaXR0ZWQgdG8gU3RyaXBlLlxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQUkgU3RyYXRlZ3kgJiBSZWFzb25pbmcgYWNjb3JkaW9uICovfVxuICAgICAge2Fubm90YXRpb25zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8QWNjb3JkaW9uPlxuICAgICAgICAgIDxBY2NvcmRpb25JdGVtXG4gICAgICAgICAgICB0aXRsZT1cIkFJIFN0cmF0ZWd5ICYgUmVhc29uaW5nXCJcbiAgICAgICAgICAgIHN1YnRpdGxlPXtgJHthbm5vdGF0aW9ucy5sZW5ndGh9IHNlY3Rpb24ke2Fubm90YXRpb25zLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfSBhbmFseXplZGB9XG4gICAgICAgICAgICBkZWZhdWx0T3BlblxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgIHthbm5vdGF0aW9ucy5tYXAoKGFubm90YXRpb24sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxJbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgZm9udDogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7YW5ub3RhdGlvbi5zZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+XG4gICAgICAgICAgICAgICAgICAgIHthbm5vdGF0aW9uLnJlYXNvbmluZ31cbiAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICAgICAgPC9BY2NvcmRpb24+XG4gICAgICApfVxuXG4gICAgICB7LyogRWRpdCBjYXJkICovfVxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICdtZWRpdW0nLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICB7c3VibWl0dGVkID8gJ1N1Ym1pdHRlZCBuYXJyYXRpdmUnIDogJ0VkaXQgeW91ciBuYXJyYXRpdmUnfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIHshc3VibWl0dGVkICYmIGhhc0VkaXRzICYmIChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzdWNjZXNzJyB9fT5cbiAgICAgICAgICAgICAgeydcXHUyNzEzJ30gQXV0by1zYXZlZFxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgIHtzdWJtaXR0ZWRcbiAgICAgICAgICAgID8gJ1RoaXMgbmFycmF0aXZlIHdhcyBzdWJtaXR0ZWQgdG8gU3RyaXBlIGFuZCBjYW5ub3QgYmUgY2hhbmdlZC4nXG4gICAgICAgICAgICA6ICdFZGl0cyBhcmUgc2F2ZWQgbG9jYWxseSBhbmQgdHJhdmVsIGZvcndhcmQgdG8gdGhlIFN1Ym1pdCBzdGVwLid9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgdmFsdWU9e2VkaXRlZE5hcnJhdGl2ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRWRpdENoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcm93cz17MTJ9XG4gICAgICAgICAgZGlzYWJsZWQ9e3N1Ym1pdHRlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogUmVnZW5lcmF0aW9uIGNvbmZpcm0gYmFubmVyIFx1MjAxNCBoaWRkZW4gd2hlbiBzdWJtaXR0ZWQgKi99XG4gICAgICB7IXN1Ym1pdHRlZCAmJiBzaG93UmVnZW5Db25maXJtICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIlJlZ2VuZXJhdGluZyB3aWxsIHJlcGxhY2UgeW91ciBlZGl0cy4gQ29udGludWU/XCJcbiAgICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwiZGVzdHJ1Y3RpdmVcIiBvblByZXNzPXtoYW5kbGVDb25maXJtUmVnZW5lcmF0ZX0+XG4gICAgICAgICAgICAgICAgWWVzLCByZWdlbmVyYXRlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9eygpID0+IHNldFNob3dSZWdlbkNvbmZpcm0oZmFsc2UpfT5cbiAgICAgICAgICAgICAgICBLZWVwIGVkaXRpbmdcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogRmVlZGJhY2sgY2FyZCBmb3IgcmVnZW5lcmF0aW9uIFx1MjAxNCBoaWRkZW4gd2hlbiBzdWJtaXR0ZWQgKi99XG4gICAgICB7IXN1Ym1pdHRlZCAmJiAhbGltaXRSZWFjaGVkICYmICFzaG93UmVnZW5Db25maXJtICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ21lZGl1bScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIFdhbnQgdG8gdHJ5IGFnYWluIHdpdGggZGlmZmVyZW50IGd1aWRhbmNlP1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgT3B0aW9uYWwuIFRlbGwgdGhlIEFJIHdoYXQgdG8gZW1waGFzaXplIG9yIGNoYW5nZSBiZWZvcmUgcmVnZW5lcmF0aW5nLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgbGFiZWw9XCJcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIEVtcGhhc2l6ZSB0aGUgZGVsaXZlcnkgdHJhY2tpbmcgbW9yZVwiXG4gICAgICAgICAgICB2YWx1ZT17ZmVlZGJhY2t9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZlZWRiYWNrKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICA8RGl2aWRlciAvPlxuXG4gICAgICB7LyogQWN0aW9uIGJ1dHRvbnMgXHUyMDE0IGhpZGRlbiB3aGVuIHN1Ym1pdHRlZCAqL31cbiAgICAgIHshc3VibWl0dGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtvbkFwcHJvdmV9PlxuICAgICAgICAgICAgICBBcHByb3ZlICZhbXA7IENvbnRpbnVlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgb25QcmVzcz17aGFuZGxlUmVnZW5lcmF0ZUNsaWNrfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bGltaXRSZWFjaGVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBSZWdlbmVyYXRlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICB7bGltaXRSZWFjaGVkID8gKFxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2F0dGVudGlvbicgfX0+XG4gICAgICAgICAgICAgIE5vIGdlbmVyYXRpb25zIHJlbWFpbmluZ1xuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7cmVtYWluaW5nfSBnZW5lcmF0aW9ue3JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfSByZW1haW5pbmdcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZVJldmlldztcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCYWRnZSxcbiAgQmFubmVyLFxuICBCb3gsXG4gIEJ1dHRvbixcbiAgSW5saW5lLFxuICBUZXh0QXJlYSxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSwgUGxheWJvb2tEYXRhIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGludGVycG9sYXRlVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9saWIvbmFycmF0aXZlLXV0aWxzJztcblxuaW50ZXJmYWNlIE5hcnJhdGl2ZUVycm9yUHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhIHwgbnVsbDtcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsO1xuICBlZGl0ZWROYXJyYXRpdmU6IHN0cmluZztcbiAgaXNHZW5lcmF0aW9uTGltaXQ6IGJvb2xlYW47XG4gIG9uRWRpdENoYW5nZTogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25Db250aW51ZTogKCkgPT4gdm9pZDtcbiAgb25SZXRyeTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTmFycmF0aXZlRXJyb3IgPSAoe1xuICBkaXNwdXRlLFxuICBwbGF5Ym9vayxcbiAgZXJyb3JNZXNzYWdlLFxuICBlZGl0ZWROYXJyYXRpdmUsXG4gIGlzR2VuZXJhdGlvbkxpbWl0LFxuICBvbkVkaXRDaGFuZ2UsXG4gIG9uQ29udGludWUsXG4gIG9uUmV0cnksXG59OiBOYXJyYXRpdmVFcnJvclByb3BzKSA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlVGV4dCA9XG4gICAgcGxheWJvb2s/Lm5hcnJhdGl2ZV90ZW1wbGF0ZVxuICAgICAgPyBpbnRlcnBvbGF0ZVRlbXBsYXRlKHBsYXlib29rLm5hcnJhdGl2ZV90ZW1wbGF0ZSwgZGlzcHV0ZSlcbiAgICAgIDogJyc7XG5cbiAgLy8gT24gbW91bnQgb25seTogc2VlZCBwYXJlbnQgc3RhdGUgd2l0aCB0aGUgdGVtcGxhdGUgaWYgdGhlIG5hcnJhdGl2ZSBpcyBlbXB0eVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZWRpdGVkTmFycmF0aXZlICYmIHRlbXBsYXRlVGV4dCkge1xuICAgICAgb25FZGl0Q2hhbmdlKHRlbXBsYXRlVGV4dCk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGRpc3BsYXlUZXh0ID0gZWRpdGVkTmFycmF0aXZlIHx8IHRlbXBsYXRlVGV4dDtcbiAgY29uc3QgaGFzVGVtcGxhdGUgPSBCb29sZWFuKHRlbXBsYXRlVGV4dCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgey8qIENvYWNoIGhlYWRlciBleHBsYWluaW5nIHRoZSBmYWxsYmFjayAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAnbWVkaXVtJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj5BSSBDb2FjaDwvQmFkZ2U+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICB7aXNHZW5lcmF0aW9uTGltaXRcbiAgICAgICAgICAgID8gJ0dlbmVyYXRpb24gbGltaXQgcmVhY2hlZCdcbiAgICAgICAgICAgIDogJ0FJIGdlbmVyYXRpb24gdW5hdmFpbGFibGUnfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAge2lzR2VuZXJhdGlvbkxpbWl0XG4gICAgICAgICAgICA/ICdZb3UgaGF2ZSB1c2VkIGFsbCBhdmFpbGFibGUgQUkgbmFycmF0aXZlIGdlbmVyYXRpb25zIGZvciB0aGlzIGRpc3B1dGUuIFlvdSBjYW4gc3RpbGwgZWRpdCB0aGUgdGVtcGxhdGUgYmVsb3cgYW5kIHN1Ym1pdCBpdCBhcyB5b3VyIG1hbnVhbCBuYXJyYXRpdmUuJ1xuICAgICAgICAgICAgOiAnV2UgY291bGQgbm90IHJlYWNoIHRoZSBBSSB0aGlzIHRpbWUuIFlvdSBjYW4gZWRpdCB0aGUgcmVhc29uLWNvZGUtc3BlY2lmaWMgdGVtcGxhdGUgYmVsb3cgYW5kIHN1Ym1pdCBpdCBtYW51YWxseSwgb3IgdHJ5IGFnYWluIGluIGEgbW9tZW50LiBZb3VyIGRlYWRsaW5lIGlzIG5vdCBhZmZlY3RlZC4nfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogSW5saW5lIGVycm9yIGRldGFpbCAob25seSBmb3Igbm9uLWxpbWl0IGVycm9ycykgKi99XG4gICAgICB7ZXJyb3JNZXNzYWdlICYmICFpc0dlbmVyYXRpb25MaW1pdCAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY3JpdGljYWxcIlxuICAgICAgICAgIHRpdGxlPVwiRGV0YWlsc1wiXG4gICAgICAgICAgZGVzY3JpcHRpb249e2Vycm9yTWVzc2FnZX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBFZGl0IGNhcmQgKi99XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgcGFkZGluZzogJ21lZGl1bScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIHtoYXNUZW1wbGF0ZSA/ICdFZGl0IHRoZSB0ZW1wbGF0ZScgOiAnV3JpdGUgeW91ciBuYXJyYXRpdmUnfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAge2hhc1RlbXBsYXRlID8gKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgRmlsbCBpbiB0aGUgW2JyYWNrZXRlZCBzZWN0aW9uc10gd2l0aCB5b3VyIHNwZWNpZmljIGRldGFpbHMuXG4gICAgICAgICAgICBTdHJpcGUtdmVyaWZpZWQgZmllbGRzIChBVlMsIENWViwgM0RTKSBhcmUgYWxyZWFkeSBmaWxsZWQgaW4uXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBEZXNjcmliZSB3aGF0IGhhcHBlbmVkLCB3aHkgdGhpcyBjaGFyZ2Ugd2FzIGxlZ2l0aW1hdGUsIGFuZCB0aGVcbiAgICAgICAgICAgIGV2aWRlbmNlIHRoYXQgc3VwcG9ydHMgeW91ciBjYXNlLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgdmFsdWU9e2Rpc3BsYXlUZXh0fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25FZGl0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICByb3dzPXsxNH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICBoYXNUZW1wbGF0ZVxuICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA6ICdEZXNjcmliZSB3aGF0IGhhcHBlbmVkLCB3aHkgdGhpcyBjaGFyZ2Ugd2FzIGxlZ2l0aW1hdGUsIGFuZCBhbnkgc3VwcG9ydGluZyBkZXRhaWxzLi4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQWN0aW9uIGJ1dHRvbnMgKi99XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtvbkNvbnRpbnVlfT5cbiAgICAgICAgICBDb250aW51ZSB3aXRoIE1hbnVhbCBOYXJyYXRpdmVcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIHshaXNHZW5lcmF0aW9uTGltaXQgJiYgKFxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInNlY29uZGFyeVwiIG9uUHJlc3M9e29uUmV0cnl9PlxuICAgICAgICAgICAgVHJ5IEFnYWluXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnJhdGl2ZUVycm9yO1xuIiwgImltcG9ydCB7IERpc3B1dGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgVEVNUExBVEVfRklFTERfTUFQOiBSZWNvcmQ8c3RyaW5nLCAoZDogRGlzcHV0ZSkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkPiA9IHtcbiAgYXZzX2FkZHJlc3NfY2hlY2s6IChkKSA9PiBkLmF2c19hZGRyZXNzX2NoZWNrLFxuICBhdnNfemlwX2NoZWNrOiAoZCkgPT4gZC5hdnNfemlwX2NoZWNrLFxuICBjdmNfY2hlY2s6IChkKSA9PiBkLmN2Y19jaGVjayxcbiAgdGhyZWVfZF9zZWN1cmVfcmVzdWx0OiAoZCkgPT4gZC50aHJlZV9kX3NlY3VyZV9yZXN1bHQsXG4gIHRocmVlX2Rfc2VjdXJlX3ZlcnNpb246IChkKSA9PiBkLnRocmVlX2Rfc2VjdXJlX3ZlcnNpb24sXG4gIGF1dGhvcml6YXRpb25fY29kZTogKGQpID0+IGQuYXV0aG9yaXphdGlvbl9jb2RlLFxuICBuZXR3b3JrX3N0YXR1czogKGQpID0+IGQubmV0d29ya19zdGF0dXMsXG4gIGN1c3RvbWVyX2VtYWlsOiAoZCkgPT4gZC5jdXN0b21lcl9lbWFpbCxcbiAgY3VzdG9tZXJfbmFtZTogKGQpID0+IGQuY3VzdG9tZXJfbmFtZSxcbiAgYmlsbGluZ19hZGRyZXNzOiAoZCkgPT4gZC5iaWxsaW5nX2FkZHJlc3MsXG4gIGNoYXJnZV9kZXNjcmlwdGlvbjogKGQpID0+IGQuY2hhcmdlX2Rlc2NyaXB0aW9uLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgZGlzcHV0ZTogRGlzcHV0ZSk6IHN0cmluZyB7XG4gIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC9cXHtcXHsoXFx3KylcXH1cXH0vZywgKF9tYXRjaCwgZmllbGQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGFjY2Vzc29yID0gVEVNUExBVEVfRklFTERfTUFQW2ZpZWxkXTtcbiAgICBpZiAoIWFjY2Vzc29yKSByZXR1cm4gJ04vQSc7XG4gICAgY29uc3QgdmFsdWUgPSBhY2Nlc3NvcihkaXNwdXRlKTtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycgPyB2YWx1ZSA6ICdOL0EnO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEJhbm5lcixcbiAgQ2hlY2tib3gsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUge1xuICBEaXNwdXRlLFxuICBFdmlkZW5jZUZpbGUsXG4gIFBsYXlib29rRGF0YSxcbiAgU3VibWlzc2lvblJlc3BvbnNlLFxuICBTdWJtaXNzaW9uV2FybmluZyxcbn0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCBTdWJtaXNzaW9uQ29uZmlybWF0aW9uIGZyb20gJy4vU3VibWlzc2lvbkNvbmZpcm1hdGlvbic7XG5cbmludGVyZmFjZSBTdWJtaXRWaWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhO1xuICBldmlkZW5jZUZpbGVzOiBFdmlkZW5jZUZpbGVbXTtcbiAgbmFycmF0aXZlVGV4dDogc3RyaW5nO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIG9uU3VibWl0dGVkOiAocmVzcG9uc2U6IFN1Ym1pc3Npb25SZXNwb25zZSkgPT4gdm9pZDtcbn1cblxudHlwZSBTdGF0ZSA9XG4gIHwgeyBraW5kOiAnaWRsZScgfVxuICB8IHsga2luZDogJ3N1Ym1pdHRpbmcnIH1cbiAgfCB7IGtpbmQ6ICdzdWNjZXNzJzsgcmVzcG9uc2U6IFN1Ym1pc3Npb25SZXNwb25zZSB9XG4gIHwge1xuICAgICAga2luZDogJ2Vycm9yJztcbiAgICAgIGNvZGU6IHN0cmluZztcbiAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgIHRlcm1pbmFsOiBib29sZWFuO1xuICAgICAgd2FybmluZ3M6IFN1Ym1pc3Npb25XYXJuaW5nW107XG4gICAgfTtcblxuY29uc3QgVEVSTUlOQUxfQ09ERVMgPSBuZXcgU2V0KFtcbiAgJ2Rpc3B1dGVfbm90X3N1Ym1pdHRhYmxlJyxcbiAgJ3ZhbGlkYXRpb25fZmFpbGVkJyxcbl0pO1xuXG5mdW5jdGlvbiBjb3VudE1hbmRhdG9yeUF0dGFjaGVkKFxuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhLFxuICBldmlkZW5jZUZpbGVzOiBFdmlkZW5jZUZpbGVbXSxcbik6IHsgYXR0YWNoZWQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9IHtcbiAgLy8gQ291bnRlciBtaXJyb3JzIHdoYXQgYWN0dWFsbHkgZ2V0cyBzdWJtaXR0ZWQuIEEgbWFuZGF0b3J5IGl0ZW0gY291bnRzIGFzXG4gIC8vIGF0dGFjaGVkIGlmIGFueSBvZiB0aGUgdGhyZWUgc3VibWlzc2lvbiBwYXRocyBpcyBjb3ZlcmVkOiBhdXRvZmlsbGVkIGZyb21cbiAgLy8gU3RyaXBlIChzdHJpcGVfZmllbGQpLCBjb3ZlcmVkIGJ5IHRoZSBuYXJyYXRpdmUgKG5hcnJhdGl2ZV9vbmx5KSwgb3IgaGFzXG4gIC8vIGEgcmVhbCB1cGxvYWRlZCBmaWxlLlxuICBjb25zdCBtYW5kYXRvcnkgPSBwbGF5Ym9vay5ldmlkZW5jZV9jaGVja2xpc3QuZmlsdGVyKFxuICAgIChpKSA9PiBpLmNhdGVnb3J5ID09PSAnbWFuZGF0b3J5JyxcbiAgKTtcbiAgY29uc3QgZmlsZWQgPSBuZXcgU2V0KGV2aWRlbmNlRmlsZXMubWFwKChmKSA9PiBmLmNoZWNrbGlzdF9pdGVtX2tleSkpO1xuICBjb25zdCBhdHRhY2hlZCA9IG1hbmRhdG9yeS5maWx0ZXIoXG4gICAgKGkpID0+IGkuc3RyaXBlX2ZpZWxkIHx8IGkubmFycmF0aXZlX29ubHkgfHwgZmlsZWQuaGFzKGkuaXRlbSksXG4gICkubGVuZ3RoO1xuICByZXR1cm4geyBhdHRhY2hlZCwgdG90YWw6IG1hbmRhdG9yeS5sZW5ndGggfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3VibWl0Vmlldyh7XG4gIGRpc3B1dGUsXG4gIHBsYXlib29rLFxuICBldmlkZW5jZUZpbGVzLFxuICBuYXJyYXRpdmVUZXh0LFxuICBjb250ZXh0LFxuICBvblN1Ym1pdHRlZCxcbn06IFN1Ym1pdFZpZXdQcm9wcykge1xuICBjb25zdCBbYWNrbm93bGVkZ2VkLCBzZXRBY2tub3dsZWRnZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPFN0YXRlPih7IGtpbmQ6ICdpZGxlJyB9KTtcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCB7IGF0dGFjaGVkLCB0b3RhbCB9ID0gY291bnRNYW5kYXRvcnlBdHRhY2hlZChwbGF5Ym9vaywgZXZpZGVuY2VGaWxlcyk7XG4gIGNvbnN0IG5hcnJhdGl2ZVdvcmRzID0gbmFycmF0aXZlVGV4dC50cmltKCkuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbikubGVuZ3RoO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICBzZXRTdGF0ZSh7IGtpbmQ6ICdzdWJtaXR0aW5nJyB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBTdWJtaXNzaW9uUmVzcG9uc2UgfT4oXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH0vc3VibWl0YCxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgKTtcbiAgICAgIHNldFN0YXRlKHsga2luZDogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UuZGF0YSB9KTtcbiAgICAgIG9uU3VibWl0dGVkKHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBlcnIuY29kZSA/PyAnaW50ZXJuYWxfZXJyb3InO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAga2luZDogJ2Vycm9yJyxcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgIHRlcm1pbmFsOiBURVJNSU5BTF9DT0RFUy5oYXMoY29kZSksXG4gICAgICAgICAgLy8gQXBpRXJyb3IgZG9lcyBub3QgZXhwb3NlIHRoZSByZXNwb25zZSBib2R5LCBzbyB3YXJuaW5ncyBhcmVcbiAgICAgICAgICAvLyBub3QgYXZhaWxhYmxlIGZyb20gdGhlIGNhdGNoLiBTdXJmYWNlIHRoZW0gdmlhIHRoZSBtZXNzYWdlIG9ubHkuXG4gICAgICAgICAgd2FybmluZ3M6IFtdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBraW5kOiAnZXJyb3InLFxuICAgICAgICAgIGNvZGU6ICdpbnRlcm5hbF9lcnJvcicsXG4gICAgICAgICAgbWVzc2FnZTogJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBZb3VyIHN1Ym1pc3Npb24gd2FzIE5PVCBzZW50LicsXG4gICAgICAgICAgdGVybWluYWw6IGZhbHNlLFxuICAgICAgICAgIHdhcm5pbmdzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmtpbmQgPT09ICdzdWNjZXNzJykge1xuICAgIHJldHVybiA8U3VibWlzc2lvbkNvbmZpcm1hdGlvbiByZXNwb25zZT17c3RhdGUucmVzcG9uc2V9IC8+O1xuICB9XG5cbiAgY29uc3QgaXNTdWJtaXR0aW5nID0gc3RhdGUua2luZCA9PT0gJ3N1Ym1pdHRpbmcnO1xuICBjb25zdCBpc1Rlcm1pbmFsRXJyb3IgPSBzdGF0ZS5raW5kID09PSAnZXJyb3InICYmIHN0YXRlLnRlcm1pbmFsO1xuICBjb25zdCBzdWJtaXREaXNhYmxlZCA9ICFhY2tub3dsZWRnZWQgfHwgaXNTdWJtaXR0aW5nIHx8IGlzVGVybWluYWxFcnJvcjtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJywgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJyB9fT5TdWJtaXQgZXZpZGVuY2U8L0lubGluZT5cblxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJywgcGFkZGluZzogJ21lZGl1bScsIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIGJvcmRlclJhZGl1czogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkRpc3B1dGU8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e2Rpc3B1dGUuaWR9PC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5SZWFzb248L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e3BsYXlib29rLmRpc3BsYXlfbmFtZX08L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19Pk1hbmRhdG9yeSBldmlkZW5jZTwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57YXR0YWNoZWR9IG9mIHt0b3RhbH0gYXR0YWNoZWQ8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19Pk5hcnJhdGl2ZTwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57bmFycmF0aXZlV29yZHN9IHdvcmRzPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHtzdGF0ZS5raW5kID09PSAnZXJyb3InICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9e3N0YXRlLnRlcm1pbmFsID8gJ2NyaXRpY2FsJyA6ICdjYXV0aW9uJ31cbiAgICAgICAgICB0aXRsZT17c3RhdGUudGVybWluYWwgPyBcIkNhbid0IHN1Ym1pdFwiIDogJ1N1Ym1pc3Npb24gZmFpbGVkJ31cbiAgICAgICAgICBkZXNjcmlwdGlvbj17c3RhdGUubWVzc2FnZX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHthdHRhY2hlZCA8IHRvdGFsICYmICFpc1Rlcm1pbmFsRXJyb3IgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNhdXRpb25cIlxuICAgICAgICAgIHRpdGxlPVwiTWlzc2luZyBtYW5kYXRvcnkgZXZpZGVuY2VcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtgJHt0b3RhbCAtIGF0dGFjaGVkfSBtYW5kYXRvcnkgaXRlbSR7dG90YWwgLSBhdHRhY2hlZCA9PT0gMSA/ICcnIDogJ3MnfSBub3QgYXR0YWNoZWQuIFlvdSBjYW4gc3RpbGwgc3VibWl0LCBidXQgeW91ciBjaGFuY2VzIGltcHJvdmUgd2l0aCBtb3JlIGV2aWRlbmNlLmB9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7IWlzVGVybWluYWxFcnJvciAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXNzaW9uIGlzIGZpbmFsXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk9uY2UgeW91IHN1Ym1pdCwgeW91ciBldmlkZW5jZSBpcyBmaW5hbCBhbmQgY2Fubm90IGJlIGNoYW5nZWQgb3IgcmVjYWxsZWQuIFN0cmlwZSB3aWxsIHNlbmQgaXQgZGlyZWN0bHkgdG8gdGhlIGNhcmQgaXNzdWVyLlwiXG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8Q2hlY2tib3hcbiAgICAgICAgbGFiZWw9XCJJIHVuZGVyc3RhbmQgdGhpcyBzdWJtaXNzaW9uIGlzIGZpbmFsLlwiXG4gICAgICAgIGNoZWNrZWQ9e2Fja25vd2xlZGdlZH1cbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHNldEFja25vd2xlZGdlZCgocHJldikgPT4gIXByZXYpfVxuICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nIHx8IGlzVGVybWluYWxFcnJvcn1cbiAgICAgIC8+XG5cbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3N1Ym1pdERpc2FibGVkfVxuICAgICAgICAgIG9uUHJlc3M9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1N1Ym1pdHRpbmcgPyAoXG4gICAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgICAgIDxJbmxpbmU+U3VibWl0dGluZyBldmlkZW5jZS4uLjwvSW5saW5lPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICdTdWJtaXQgdG8gU3RyaXBlJ1xuICAgICAgICAgICl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgQm94LCBCYW5uZXIsIEJ1dHRvbiwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgU3VibWlzc2lvblJlc3BvbnNlLCBTdWJtaXNzaW9uV2FybmluZyB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBTdWJtaXNzaW9uQ29uZmlybWF0aW9uUHJvcHMge1xuICByZXNwb25zZTogU3VibWlzc2lvblJlc3BvbnNlO1xuICBvbkJhY2tUb0xpc3Q/OiAoKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVdhcm5pbmcodzogU3VibWlzc2lvbldhcm5pbmcpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHcuY29kZSkge1xuICAgIGNhc2UgJ2ZpZWxkX3RydW5jYXRlZCc6XG4gICAgICByZXR1cm4gYFlvdXIgbmFycmF0aXZlIHdhcyB0cnVuY2F0ZWQgZnJvbSAke3cub3JpZ2luYWxfbGVuZ3RofSB0byAke3cudHJ1bmNhdGVkX2xlbmd0aH0gY2hhcmFjdGVycyBiZWZvcmUgc3VibWlzc2lvbi5gO1xuICAgIGNhc2UgJ2ZpZWxkX2NvbGxpc2lvbic6XG4gICAgICByZXR1cm4gYFwiJHt3Lmxvc2luZ19pdGVtfVwiIGNvbGxpZGVkIHdpdGggXCIke3cud2lubmluZ19pdGVtfVwiIG9uICR7dy5maWVsZH07IHJlc29sdmVkIGJ5ICR7dy5yZXNvbHV0aW9uID09PSAndW5jYXRlZ29yaXplZF9maWxlJyA/ICdhdHRhY2hpbmcgYXMgdW5jYXRlZ29yaXplZCBmaWxlJyA6ICdkcm9wcGluZyB0aGUgbG9zaW5nIGl0ZW0nfS5gO1xuICAgIGNhc2UgJ21pc3NpbmdfbWFuZGF0b3J5X2l0ZW1zJzpcbiAgICAgIHJldHVybiBgTWFuZGF0b3J5IGl0ZW1zIHdlcmUgbm90IGF0dGFjaGVkOiAke3cuaXRlbXMuam9pbignLCAnKX0uIFN1Ym1pdHRlZCB3aXRob3V0IHRoZW0uYDtcbiAgICBjYXNlICdkZWFkbGluZV9wYXNzZWQnOlxuICAgICAgcmV0dXJuIGBUaGUgcmVzcG9uc2UgZGVhZGxpbmUgaGFzIHBhc3NlZC4gU3VibWl0dGVkIGxhdGUuYDtcbiAgICBjYXNlICdjb25jYXRfc2tpcHBlZCc6XG4gICAgICByZXR1cm4gYFwiJHt3LmZpbGVfbmFtZX1cIiBjb3VsZCBub3QgYmUgbWVyZ2VkIGludG8gJHt3LnNsb3R9OiAke3cucmVhc29ufS4gU3VibWl0dGVkIHdpdGhvdXQgaXQuYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdWJtaXNzaW9uQ29uZmlybWF0aW9uKHsgcmVzcG9uc2UsIG9uQmFja1RvTGlzdCB9OiBTdWJtaXNzaW9uQ29uZmlybWF0aW9uUHJvcHMpIHtcbiAgY29uc3Qgc3VibWl0dGVkQXQgPSBuZXcgRGF0ZShyZXNwb25zZS5zdWJtaXR0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIGNvbnN0IGhhc1dhcm5pbmdzID0gcmVzcG9uc2Uud2FybmluZ3MgJiYgcmVzcG9uc2Uud2FybmluZ3MubGVuZ3RoID4gMDtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJywgcGFkZGluZzogJ2xhcmdlJyB9fT5cbiAgICAgIHtoYXNXYXJuaW5ncyAmJiAoXG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXR0ZWQgd2l0aCB3YXJuaW5nc1wiXG4gICAgICAgICAgZGVzY3JpcHRpb249e1xuICAgICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgICAge3Jlc3BvbnNlLndhcm5pbmdzLm1hcCgodywgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxJbmxpbmUga2V5PXtpfSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgICAgICAgICAgXHUyMDIyIHtkZXNjcmliZVdhcm5pbmcodyl9XG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgIHRpdGxlPVwiRXZpZGVuY2Ugc3VibWl0dGVkXCJcbiAgICAgICAgZGVzY3JpcHRpb249XCJZb3VyIHJlYnV0dGFsIGlzIG9uIGl0cyB3YXkgdG8gdGhlIGNhcmQgaXNzdWVyLlwiXG4gICAgICAvPlxuXG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJyB9fT5XaGF0IGhhcHBlbnMgbmV4dDwvSW5saW5lPlxuICAgICAgICA8Qm94PlxuICAgICAgICAgIFRoZSBiYW5rIHR5cGljYWxseSB0YWtlcyA2MC03NSBkYXlzIHRvIGlzc3VlIGEgZGVjaXNpb24uIFlvdSB3aWxsIGJlXG4gICAgICAgICAgbm90aWZpZWQgaW4gU3RyaXBlIHdoZW4gdGhlIGRpc3B1dGUgaXMgcmVzb2x2ZWQuXG4gICAgICAgIDwvQm94PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5TdWJtaXR0ZWQgYXQ8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e3N1Ym1pdHRlZEF0fTwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7b25CYWNrVG9MaXN0ICYmIChcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgb25QcmVzcz17b25CYWNrVG9MaXN0fT5cbiAgICAgICAgICBCYWNrIHRvIGRpc3B1dGVzXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTZWxlY3QsXG4gIFNwaW5uZXIsXG4gIFRhYnMsXG4gIFRhYixcbiAgVGFiTGlzdCxcbiAgVGFiUGFuZWxzLFxuICBUYWJQYW5lbCxcbiAgQmFubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZUNhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9EaXNwdXRlQ2FyZCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCBFbXB0eVN0YXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRW1wdHlTdGF0ZSc7XG5pbXBvcnQgRXJyb3JCYW5uZXIgZnJvbSAnLi4vY29tcG9uZW50cy9FcnJvckJhbm5lcic7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgeyBpc1Jlc29sdmVkIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5cbnR5cGUgVmlld1N0YXRlID0gJ2xvYWRpbmcnIHwgJ2Vycm9yJyB8ICdyZWFkeSc7XG50eXBlIFN0YXR1c0ZpbHRlciA9ICdhbGwnIHwgJ25lZWRzX3Jlc3BvbnNlJyB8ICd1bmRlcl9yZXZpZXcnIHwgJ3Jlc29sdmVkJztcblxuY29uc3QgRklMVEVSX09QVElPTlM6IHsgdmFsdWU6IFN0YXR1c0ZpbHRlcjsgbGFiZWw6IHN0cmluZyB9W10gPSBbXG4gIHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ0FsbCBkaXNwdXRlcycgfSxcbiAgeyB2YWx1ZTogJ25lZWRzX3Jlc3BvbnNlJywgbGFiZWw6ICdOZWVkcyByZXNwb25zZScgfSxcbiAgeyB2YWx1ZTogJ3VuZGVyX3JldmlldycsIGxhYmVsOiAnVW5kZXIgcmV2aWV3JyB9LFxuICB7IHZhbHVlOiAncmVzb2x2ZWQnLCBsYWJlbDogJ1Jlc29sdmVkJyB9LFxuXTtcblxuZnVuY3Rpb24gbWF0Y2hlc0ZpbHRlcihkaXNwdXRlOiBEaXNwdXRlLCBmaWx0ZXI6IFN0YXR1c0ZpbHRlcik6IGJvb2xlYW4ge1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4gZGlzcHV0ZS5zdGF0dXMgPT09ICduZWVkc19yZXNwb25zZScgfHwgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJztcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIGRpc3B1dGUuc3RhdHVzID09PSAndW5kZXJfcmV2aWV3JyB8fCBkaXNwdXRlLnN0YXR1cyA9PT0gJ3dhcm5pbmdfdW5kZXJfcmV2aWV3JztcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENvdW50VGV4dChjb3VudDogbnVtYmVyLCBmaWx0ZXI6IFN0YXR1c0ZpbHRlcik6IHN0cmluZyB7XG4gIGNvbnN0IG5vdW4gPSBjb3VudCA9PT0gMSA/ICdkaXNwdXRlJyA6ICdkaXNwdXRlcyc7XG4gIHN3aXRjaCAoZmlsdGVyKSB7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gJHtub3VufWA7XG4gICAgY2FzZSAnbmVlZHNfcmVzcG9uc2UnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSBuZWVkaW5nIHJlc3BvbnNlYDtcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSB1bmRlciByZXZpZXdgO1xuICAgIGNhc2UgJ3Jlc29sdmVkJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gcmVzb2x2ZWRgO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICB9XG59XG5cbmNvbnN0IERpc3B1dGVMaXN0VmlldyA9IChjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgeyBlbnZpcm9ubWVudCwgdXNlckNvbnRleHQgfSA9IGNvbnRleHQ7XG4gIGNvbnN0IFt2aWV3U3RhdGUsIHNldFZpZXdTdGF0ZV0gPSB1c2VTdGF0ZTxWaWV3U3RhdGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtkaXNwdXRlcywgc2V0RGlzcHV0ZXNdID0gdXNlU3RhdGU8RGlzcHV0ZVtdPihbXSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxTdGF0dXNGaWx0ZXI+KCdhbGwnKTtcblxuICBjb25zdCBbc2VsZWN0ZWREaXNwdXRlLCBzZXRTZWxlY3RlZERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1dvcmtmbG93LCBzZXRTaG93V29ya2Zsb3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIGNvbnN0IGxvYWREaXNwdXRlcyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRWaWV3U3RhdGUoJ2xvYWRpbmcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZVtdIH0+KCcvYXBpL2Rpc3B1dGVzJywgY29udGV4dFJlZi5jdXJyZW50KTtcbiAgICAgIHNldERpc3B1dGVzKHJlc3VsdC5kYXRhKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgncmVhZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvclxuICAgICAgICAgID8gZXJyLm1lc3NhZ2VcbiAgICAgICAgICA6ICdGYWlsZWQgdG8gbG9hZCBkaXNwdXRlcy4gUGxlYXNlIHRyeSBhZ2Fpbi4nO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdlcnJvcicpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZERpc3B1dGVzKCk7XG4gIH0sIFtsb2FkRGlzcHV0ZXNdKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3REaXNwdXRlID0gKGRpc3B1dGU6IERpc3B1dGUpID0+IHtcbiAgICBzZXRTZWxlY3RlZERpc3B1dGUoZGlzcHV0ZSk7XG4gICAgc2V0U2hvd1dvcmtmbG93KHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsb3NlV29ya2Zsb3cgPSAoc2hvd246IGJvb2xlYW4pID0+IHtcbiAgICBzZXRTaG93V29ya2Zsb3coc2hvd24pO1xuICAgIGlmICghc2hvd24pIHNldFNlbGVjdGVkRGlzcHV0ZShudWxsKTtcbiAgfTtcblxuICAvLyBTb3J0IGJ5IGRlYWRsaW5lIChzb29uZXN0IGZpcnN0KVxuICBjb25zdCBzb3J0ZWREaXNwdXRlcyA9IFsuLi5kaXNwdXRlc10uc29ydChcbiAgICAoYSwgYikgPT4gbmV3IERhdGUoYS5kdWVfYnkpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGIuZHVlX2J5KS5nZXRUaW1lKCksXG4gICk7XG5cbiAgY29uc3QgZmlsdGVyZWREaXNwdXRlcyA9IHNvcnRlZERpc3B1dGVzLmZpbHRlcigoZCkgPT4gbWF0Y2hlc0ZpbHRlcihkLCBzdGF0dXNGaWx0ZXIpKTtcblxuICByZXR1cm4gKFxuICAgIDxDb250ZXh0VmlldyB0aXRsZT1cIldpbkJhY2tcIiBkZXNjcmlwdGlvbj1cIkd1aWRlZCBkaXNwdXRlIHJlc29sdXRpb25cIj5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdsb2FkaW5nJyAmJiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIHBhZGRpbmc6ICd4bGFyZ2UnLFxuICAgICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBMb2FkaW5nIGRpc3B1dGVzLi4uXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ2Vycm9yJyAmJiAoXG4gICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvck1lc3NhZ2V9IC8+XG4gICAgICApfVxuXG4gICAgICB7dmlld1N0YXRlID09PSAncmVhZHknICYmIChcbiAgICAgICAgPFRhYnMgZml0dGVkIHNpemU9XCJtZWRpdW1cIj5cbiAgICAgICAgICA8VGFiTGlzdD5cbiAgICAgICAgICAgIDxUYWIgaWQ9XCJkaXNwdXRlc1wiPkRpc3B1dGVzPC9UYWI+XG4gICAgICAgICAgICA8VGFiIGlkPVwiaW5zaWdodHNcIj5JbnNpZ2h0czwvVGFiPlxuICAgICAgICAgIDwvVGFiTGlzdD5cbiAgICAgICAgICA8VGFiUGFuZWxzPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiZGlzcHV0ZXNcIj5cbiAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJywgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgICAgIHtkaXNwdXRlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8RW1wdHlTdGF0ZVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk5vIGRpc3B1dGVzIHlldFwiXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2hlbiBhIGRpc3B1dGUgY29tZXMgaW4sIHdlJ2xsIHdhbGsgeW91IHRocm91Z2ggZXhhY3RseSB3aGF0IHRvIGRvLlwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbkVsZW1lbnRzPXtbJ2xhYmVsJ119XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFN0YXR1c0ZpbHRlcihlLnRhcmdldC52YWx1ZSBhcyBTdGF0dXNGaWx0ZXIpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge0ZJTFRFUl9PUFRJT05TLm1hcCgob3B0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0LnZhbHVlfSB2YWx1ZT17b3B0LnZhbHVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge29wdC5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cblxuICAgICAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nVG9wOiAnc21hbGwnLCBwYWRkaW5nQm90dG9tOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2dldENvdW50VGV4dChmaWx0ZXJlZERpc3B1dGVzLmxlbmd0aCwgc3RhdHVzRmlsdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkRGlzcHV0ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5vIHtGSUxURVJfT1BUSU9OUy5maW5kKChvKSA9PiBvLnZhbHVlID09PSBzdGF0dXNGaWx0ZXIpPy5sYWJlbC50b0xvd2VyQ2FzZSgpfSBkaXNwdXRlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkRGlzcHV0ZXMubWFwKChkaXNwdXRlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGlzcHV0ZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkaXNwdXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCkgPT4gaGFuZGxlU2VsZWN0RGlzcHV0ZShkaXNwdXRlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImluc2lnaHRzXCI+XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiSW5zaWdodHNcIlxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXaW4gcmF0ZSBhbmFseXRpY3MgYW5kIGRpc3B1dGUgcGF0dGVybnMgd2lsbCBhcHBlYXIgaGVyZS5cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICBDb21pbmcgaW4gV0lOLTIyIGFuZCBXSU4tMjMuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICA8L1RhYlBhbmVscz5cbiAgICAgICAgPC9UYWJzPlxuICAgICAgKX1cblxuICAgICAge3NlbGVjdGVkRGlzcHV0ZSAmJiAoXG4gICAgICAgIDxEaXNwdXRlV29ya2Zsb3dcbiAgICAgICAgICBkaXNwdXRlPXtzZWxlY3RlZERpc3B1dGV9XG4gICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICBzaG93bj17c2hvd1dvcmtmbG93fVxuICAgICAgICAgIHNldFNob3duPXtoYW5kbGVDbG9zZVdvcmtmbG93fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L0NvbnRleHRWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZUxpc3RWaWV3O1xuIiwgImltcG9ydCB7IEJveCwgQmFkZ2UsIEJ1dHRvbiwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSwgZ2V0VXJnZW5jeUJhZGdlLCBnZXRSZWFzb25Db2RlTGFiZWwgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZUNhcmRQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIG9uU2VsZWN0OiAoZGlzcHV0ZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuY29uc3QgRGlzcHV0ZUNhcmQgPSAoeyBkaXNwdXRlLCBvblNlbGVjdCB9OiBEaXNwdXRlQ2FyZFByb3BzKSA9PiB7XG4gIGNvbnN0IHN0YXR1c0JhZGdlID0gZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCB1cmdlbmN5QmFkZ2UgPSBnZXRVcmdlbmN5QmFkZ2UoZGlzcHV0ZS5kdWVfYnksIGRpc3B1dGUuc3RhdHVzKTtcbiAgY29uc3QgcmVhc29uTGFiZWwgPSBnZXRSZWFzb25Db2RlTGFiZWwoZGlzcHV0ZS5uZXR3b3JrLCBkaXNwdXRlLnJlYXNvbl9jb2RlKTtcblxuICByZXR1cm4gKFxuICAgIDxCdXR0b25cbiAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgY3NzPXt7IHdpZHRoOiAnZmlsbCcgfX1cbiAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VsZWN0KGRpc3B1dGUuaWQpfVxuICAgID5cbiAgICAgIDxCb3hcbiAgICAgICAgY3NzPXt7XG4gICAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgICBnYXA6ICd4c21hbGwnLFxuICAgICAgICAgIHdpZHRoOiAnZmlsbCcsXG4gICAgICAgICAgcGFkZGluZzogJ3NtYWxsJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge2Zvcm1hdEFtb3VudChkaXNwdXRlLmFtb3VudCwgZGlzcHV0ZS5jdXJyZW5jeSl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgICAgIHt1cmdlbmN5QmFkZ2UgJiYgKFxuICAgICAgICAgICAgICA8QmFkZ2UgdHlwZT17dXJnZW5jeUJhZGdlLnR5cGV9Pnt1cmdlbmN5QmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfbmFtZSB8fCAnVW5rbm93biBjdXN0b21lcid9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICB7cmVhc29uTGFiZWwgJiYgKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge3JlYXNvbkxhYmVsfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5uZXR3b3JrLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZGlzcHV0ZS5uZXR3b3JrLnNsaWNlKDEpfSB7ZGlzcHV0ZS5yZWFzb25fY29kZX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLmlkLnNsaWNlKDAsIDEyKX0uLi5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVDYXJkO1xuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRW1wdHlTdGF0ZS50c3hcblxuaW1wb3J0IHsgQm94LCBJY29uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRW1wdHlTdGF0ZVByb3BzIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuY29uc3QgRW1wdHlTdGF0ZSA9ICh7IHRpdGxlLCBkZXNjcmlwdGlvbiB9OiBFbXB0eVN0YXRlUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBjc3M9e3tcbiAgICAgICAgcGFkZGluZzogJ3hsYXJnZScsXG4gICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEljb24gbmFtZT1cImluZm9cIiBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICB7dGl0bGV9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICB7ZGVzY3JpcHRpb259XG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVtcHR5U3RhdGU7XG4iLCAiaW1wb3J0IHtcbiAgQm94LFxuICBCYW5uZXIsXG4gIElubGluZSxcbiAgU2V0dGluZ3NWaWV3LFxuICBEaXZpZGVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5cbmNvbnN0IEFwcFNldHRpbmdzID0gKHsgZW52aXJvbm1lbnQsIHVzZXJDb250ZXh0IH06IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTZXR0aW5nc1ZpZXc+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nLCBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBTdWJzY3JpcHRpb25cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIFN1YnNjcmlwdGlvbiBtYW5hZ2VtZW50IHdpbGwgYmUgYXZhaWxhYmxlIGhlcmUuIENvbWluZyBpbiBXSU4tMjQuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBBY2NvdW50XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBDb25uZWN0ZWQgU3RyaXBlIGFjY291bnQgaW5mb3JtYXRpb24gd2lsbCBhcHBlYXIgaGVyZS5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEFib3V0IFdpbkJhY2tcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+XG4gICAgICAgICAgICBWZXJzaW9uIDAuMC4xXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uIGZvciBTdHJpcGUgbWVyY2hhbnRzLiBCdWlsdCBieSBKS0IgVGVjaC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L1NldHRpbmdzVmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNldHRpbmdzO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsY0FBYztBQUN0QixjQUFRLGNBQWM7QUFBQTtBQUFBOzs7QUNIdEI7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsa0JBQWtCLFFBQVEsWUFBWSxRQUFRLGNBQWMsUUFBUSxZQUFZLFFBQVEsWUFBWSxRQUFRLE1BQU0sUUFBUSxZQUFZLFFBQVEsV0FBVyxRQUFRLFVBQVUsUUFBUSxTQUFTLFFBQVEscUJBQXFCLFFBQVEsVUFBVSxRQUFRLFlBQVksUUFBUSxhQUFhLFFBQVEsZUFBZSxRQUFRLFNBQVMsUUFBUSxRQUFRLFFBQVEsZUFBZSxRQUFRLG1CQUFtQixRQUFRLDRCQUE0QixRQUFRLGlCQUFpQixRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsWUFBWSxRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsT0FBTyxRQUFRLFlBQVksUUFBUSxTQUFTLFFBQVEsTUFBTSxRQUFRLE9BQU8sUUFBUSxpQkFBaUIsUUFBUSxZQUFZLFFBQVEsVUFBVSxRQUFRLGtCQUFrQixRQUFRLHlCQUF5QixRQUFRLG1CQUFtQixRQUFRLFlBQVksUUFBUSxjQUFjLFFBQVEsT0FBTyxRQUFRLFdBQVcsUUFBUSxXQUFXLFFBQVEsU0FBUyxRQUFRLGNBQWMsUUFBUSxNQUFNLFFBQVEsV0FBVyxRQUFRLFNBQVMsUUFBUSxRQUFRLFFBQVEsWUFBWSxRQUFRLGdCQUFnQjtBQUNyL0IsY0FBUSxVQUFVLFFBQVEsWUFBWSxRQUFRLFdBQVcsUUFBUSxXQUFXLFFBQVEsZUFBZSxRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsUUFBUTtBQUNySixVQUFNLGdCQUFnQixVQUFRO0FBQzlCLFVBQU0sVUFBVSxVQUFRO0FBQ3hCLFVBQU0sWUFBWTtBQUNsQixVQUFNLGVBQWUsQ0FBQyxjQUFjO0FBQ2hDLGNBQU0sdUJBQXVCLFVBQVUsZUFBZSxVQUFVLFNBQVM7QUFDekUsY0FBTSxlQUFlLENBQUMsV0FBWSxHQUFHLGNBQWMsS0FBSyxXQUFXLGlDQUFLLFFBQUwsRUFBWSxzQkFBNEMsWUFBWSxVQUFVLGFBQWEsZUFBZSxLQUFLLEVBQUM7QUFDbkwscUJBQWEsdUJBQXVCO0FBQ3BDLGVBQU87QUFBQSxNQUNYO0FBQ0EsVUFBTSxrQkFBa0IsQ0FBQyxNQUFNLGVBQWUscUJBQXFCO0FBQy9ELGNBQU0sbUJBQW1CLEdBQUcsUUFBUSw0QkFBNEIsTUFBTTtBQUFBLFVBQ2xFO0FBQUEsUUFDSixDQUFDO0FBQ0QsWUFBSSxDQUFDLGtCQUFrQjtBQUNuQixpQkFBTztBQUFBLFFBQ1g7QUFDQSxlQUFPLGFBQWEsZUFBZTtBQUFBLE1BQ3ZDO0FBQ0EsY0FBUSxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixDQUFDLFNBQVMsV0FBVyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBQ3hHLGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUN6RCxjQUFRLFFBQVEsZ0JBQWdCLFNBQVMsQ0FBQyxHQUFHLElBQUk7QUFDakQsY0FBUSxTQUFTLGdCQUFnQixVQUFVLENBQUMsV0FBVyxlQUFlLE9BQU8sR0FBRyxJQUFJO0FBQ3BGLGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLEdBQUcsSUFBSTtBQUN2RCxjQUFRLE1BQU0sZ0JBQWdCLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDN0MsY0FBUSxjQUFjLGdCQUFnQixlQUFlLENBQUMsYUFBYSxHQUFHLElBQUk7QUFDMUUsY0FBUSxTQUFTLGdCQUFnQixVQUFVLENBQUMsR0FBRyxJQUFJO0FBQ25ELGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQzlELGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLEdBQUcsSUFBSTtBQUN2RCxjQUFRLE9BQU8sZ0JBQWdCLFFBQVEsQ0FBQyxHQUFHLElBQUk7QUFDL0MsY0FBUSxjQUFjLGdCQUFnQixlQUFlLENBQUMsV0FBVyxVQUFVLGlCQUFpQixpQkFBaUIsaUJBQWlCLEdBQUcsSUFBSTtBQUNySSxjQUFRLFlBQVksZ0JBQWdCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUNoRSxjQUFRLG1CQUFtQixnQkFBZ0Isb0JBQW9CLENBQUMsR0FBRyxJQUFJO0FBQ3ZFLGNBQVEseUJBQXlCLGdCQUFnQiwwQkFBMEIsQ0FBQyxHQUFHLElBQUk7QUFDbkYsY0FBUSxrQkFBa0IsZ0JBQWdCLG1CQUFtQixDQUFDLEdBQUcsSUFBSTtBQUNyRSxjQUFRLFVBQVUsZ0JBQWdCLFdBQVcsQ0FBQyxHQUFHLElBQUk7QUFDckQsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsaUJBQWlCLGlCQUFpQixpQkFBaUIsR0FBRyxJQUFJO0FBQzVHLGNBQVEsaUJBQWlCLGdCQUFnQixrQkFBa0IsQ0FBQyxHQUFHLElBQUk7QUFDbkUsY0FBUSxPQUFPLGdCQUFnQixRQUFRLENBQUMsR0FBRyxJQUFJO0FBQy9DLGNBQVEsTUFBTSxnQkFBZ0IsT0FBTyxDQUFDLEdBQUcsSUFBSTtBQUM3QyxjQUFRLFNBQVMsZ0JBQWdCLFVBQVUsQ0FBQyxHQUFHLElBQUk7QUFDbkQsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsT0FBTyxnQkFBZ0IsUUFBUSxDQUFDLEdBQUcsSUFBSTtBQUMvQyxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxRQUFRLFNBQVMsa0JBQWtCLFNBQVMsT0FBTyxHQUFHLElBQUk7QUFDMUcsY0FBUSxPQUFPLGdCQUFnQixRQUFRLENBQUMsR0FBRyxJQUFJO0FBQy9DLGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQ2hFLGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLEdBQUcsSUFBSTtBQUN2RCxjQUFRLE9BQU8sZ0JBQWdCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUN4RCxjQUFRLGlCQUFpQixnQkFBZ0Isa0JBQWtCLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDMUUsY0FBUSw0QkFBNEIsZ0JBQWdCLDZCQUE2QixDQUFDLEdBQUcsSUFBSTtBQUN6RixjQUFRLG1CQUFtQixnQkFBZ0Isb0JBQW9CLENBQUMsU0FBUyxPQUFPLEdBQUcsSUFBSTtBQUN2RixjQUFRLGVBQWUsZ0JBQWdCLGdCQUFnQixDQUFDLEdBQUcsSUFBSTtBQUMvRCxjQUFRLFFBQVEsZ0JBQWdCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUN4RCxjQUFRLFNBQVMsZ0JBQWdCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUMxRCxjQUFRLGVBQWUsZ0JBQWdCLGdCQUFnQixDQUFDLEdBQUcsSUFBSTtBQUMvRCxjQUFRLGFBQWEsZ0JBQWdCLGNBQWMsQ0FBQyw2QkFBNkIsZUFBZSxHQUFHLElBQUk7QUFDdkcsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsVUFBVSxnQkFBZ0IsV0FBVyxDQUFDLEdBQUcsSUFBSTtBQUNyRCxjQUFRLHFCQUFxQixnQkFBZ0Isc0JBQXNCLENBQUMsR0FBRyxJQUFJO0FBQzNFLGNBQVEsU0FBUyxnQkFBZ0IsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQzFELGNBQVEsVUFBVSxnQkFBZ0IsV0FBVyxDQUFDLEdBQUcsSUFBSTtBQUNyRCxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxHQUFHLElBQUk7QUFDdkQsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsTUFBTSxnQkFBZ0IsT0FBTyxDQUFDLEdBQUcsSUFBSTtBQUM3QyxjQUFRLFlBQVksZ0JBQWdCLGFBQWEsQ0FBQyxHQUFHLElBQUk7QUFDekQsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsY0FBYyxnQkFBZ0IsZUFBZSxDQUFDLEdBQUcsSUFBSTtBQUM3RCxjQUFRLFlBQVksZ0JBQWdCLGFBQWEsQ0FBQyxHQUFHLElBQUk7QUFDekQsY0FBUSxrQkFBa0IsZ0JBQWdCLG1CQUFtQixDQUFDLEdBQUcsSUFBSTtBQUNyRSxjQUFRLFFBQVEsZ0JBQWdCLFNBQVMsQ0FBQyxHQUFHLElBQUk7QUFDakQsY0FBUSxXQUFXLGdCQUFnQixZQUFZLENBQUMsR0FBRyxJQUFJO0FBQ3ZELGNBQVEsT0FBTyxnQkFBZ0IsUUFBUSxDQUFDLEdBQUcsSUFBSTtBQUMvQyxjQUFRLGVBQWUsZ0JBQWdCLGdCQUFnQixDQUFDLEdBQUcsSUFBSTtBQUMvRCxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxHQUFHLElBQUk7QUFDdkQsY0FBUSxXQUFXLGdCQUFnQixZQUFZLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDOUQsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDaEUsY0FBUSxVQUFVLGdCQUFnQixXQUFXLENBQUMsU0FBUyxHQUFHLElBQUk7QUFBQTtBQUFBOzs7QUMvRTlEO0FBQUE7QUFBQTtBQW9CQSxVQUFJLFlBQVksU0FBUyxXQUFXLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDNUQsWUFBSSxNQUF1QztBQUN6QyxjQUFJLFdBQVcsUUFBVztBQUN4QixrQkFBTSxJQUFJLE1BQU0sOENBQThDO0FBQUEsVUFDaEU7QUFBQSxRQUNGO0FBRUEsWUFBSSxDQUFDLFdBQVc7QUFDZCxjQUFJO0FBQ0osY0FBSSxXQUFXLFFBQVc7QUFDeEIsb0JBQVEsSUFBSTtBQUFBLGNBQ1Y7QUFBQSxZQUVGO0FBQUEsVUFDRixPQUFPO0FBQ0wsZ0JBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzVCLGdCQUFJLFdBQVc7QUFDZixvQkFBUSxJQUFJO0FBQUEsY0FDVixPQUFPLFFBQVEsT0FBTyxXQUFXO0FBQUUsdUJBQU8sS0FBSztBQUFBLGNBQWEsQ0FBQztBQUFBLFlBQy9EO0FBQ0Esa0JBQU0sT0FBTztBQUFBLFVBQ2Y7QUFFQSxnQkFBTSxjQUFjO0FBQ3BCLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFFQSxhQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNoRGpCO0FBQUE7QUFBQTtBQUtBLFVBQUksa0JBQW1CLFdBQVEsUUFBSyxtQkFBb0IsU0FBVSxLQUFLO0FBQ25FLGVBQVEsT0FBTyxJQUFJLGFBQWMsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLE1BQzVEO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsa0JBQWtCO0FBQzFCLFVBQU0sY0FBYyxnQkFBZ0IsaUJBQW9CO0FBQ3hELFVBQU0sa0JBQWtCLE1BQU07QUFYOUI7QUFjSSxjQUFNLGdCQUFlLGdCQUFXLHVCQUFYLG1CQUErQjtBQUNwRCxTQUFDLEdBQUcsWUFBWSxTQUFTLGNBQWMsdUNBQXVDO0FBQzlFLGVBQU87QUFBQSxNQUNYO0FBQ0EsY0FBUSxrQkFBa0I7QUFBQTtBQUFBOzs7QUNsQjFCO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLDhCQUE4QjtBQUN0QyxVQUFNLGNBQWM7QUFDcEIsVUFBTSw4QkFBOEIsTUFBUztBQUFJLG1CQUFHLFlBQVksaUJBQWlCLEVBQzVFLEtBQUssNEJBQTRCLEVBQ2pDLEtBQUssQ0FBQyxjQUFjLFNBQVMsRUFDN0IsTUFBTSxNQUFNLEtBQUs7QUFBQTtBQUN0QixjQUFRLDhCQUE4QjtBQUFBO0FBQUE7OztBQ1J0QztBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxzQkFBc0I7QUFDOUIsVUFBTSxjQUFjO0FBQ3BCLFVBQU0sc0JBQXNCLE1BQVk7QUFDcEMsY0FBTSxTQUFTLE9BQU8sR0FBRyxZQUFZLGlCQUFpQixFQUFFLEtBQUssb0JBQW9CO0FBQ2pGLFlBQUksQ0FBQyxRQUFRO0FBQ1QsZ0JBQU0sSUFBSSxNQUFNLGtDQUFrQztBQUFBLFFBQ3REO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFDQSxjQUFRLHNCQUFzQjtBQUFBO0FBQUE7OztBQ1g5QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxnQkFBZ0I7QUFDeEIsVUFBTSx3QkFBd0I7QUFDOUIsVUFBTSxnQkFBZ0IsQ0FBTyxPQUFzQix5QkFBdEIsSUFBc0IsbUJBQXRCLEtBQUssVUFBVSxDQUFDLEdBQU07QUFDL0MsY0FBTSxTQUFTLE9BQU8sR0FBRyxzQkFBc0IscUJBQXFCO0FBQ3BFLGNBQU0sT0FBTyxpQ0FDTixVQURNO0FBQUEsVUFFVCxTQUFTLGlDQUNGLFFBQVEsVUFETjtBQUFBLFlBRUwsZUFBZSxVQUFVO0FBQUEsVUFDN0I7QUFBQSxRQUNKO0FBQ0EsY0FBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLElBQUk7QUFDdEMsY0FBTSxVQUFVLENBQUM7QUFDakIsaUJBQVMsUUFBUSxRQUFRLENBQUMsT0FBTyxRQUFRO0FBQ3JDLGtCQUFRLE9BQU87QUFBQSxRQUNuQixDQUFDO0FBQ0QsY0FBTSx1QkFBdUI7QUFBQSxVQUN6QixNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYjtBQUFBLFVBQ0EsSUFBSSxTQUFTO0FBQUEsVUFDYixZQUFZLFNBQVM7QUFBQSxVQUNyQixRQUFRLFNBQVM7QUFBQSxVQUNqQixZQUFZLFNBQVM7QUFBQSxVQUNyQixNQUFNLFNBQVM7QUFBQSxVQUNmLEtBQUssU0FBUztBQUFBLFFBQ2xCO0FBQ0EsZ0JBQVEsU0FBUyxRQUFRLElBQUksY0FBYyxHQUFHO0FBQUEsVUFDMUMsS0FBSztBQUNELGlDQUFxQixPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2hEO0FBQUEsVUFDSjtBQUNJLGlDQUFxQixjQUFjLE1BQU0sU0FBUyxZQUFZO0FBQzlEO0FBQUEsUUFDUjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQ0EsY0FBUSxnQkFBZ0I7QUFBQTtBQUFBOzs7QUN2Q3hCO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGVBQWU7QUFDdkIsVUFBTSxjQUFjO0FBQ3BCLFVBQU0sZUFBZSxDQUFPLE9BQTZCLHlCQUE3QixJQUE2QixtQkFBN0IsWUFBWSxVQUFVLENBQUMsR0FBTTtBQUNyRCxjQUFNLE1BQU0sSUFBSSxJQUFJLFVBQVU7QUFDOUIsZ0JBQVEsR0FBRyxZQUFZLGlCQUFpQixFQUFFLEtBQUssZUFBZSxJQUFJLFdBQVcsSUFBSSxRQUFRLE9BQU87QUFBQSxNQUNwRztBQUNBLGNBQVEsZUFBZTtBQUFBO0FBQUE7OztBQ1J2QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxnQ0FBZ0M7QUFDeEMsVUFBTSxnQ0FBZ0M7QUFDdEMsVUFBTSxrQkFBa0I7QUFDeEIsVUFBTSxpQkFBaUI7QUFDdkIsVUFBSSx5QkFBeUI7QUFDN0IsVUFBTSxnQ0FBZ0MsTUFBWTtBQUM5QyxZQUFJLENBQUMsd0JBQXdCO0FBQ3pCLG9DQUEwQixPQUFPLEdBQUcsOEJBQThCLDZCQUE2QixLQUN6RixnQkFBZ0IsZ0JBQ2hCLGVBQWU7QUFBQSxRQUN6QjtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQ0EsY0FBUSxnQ0FBZ0M7QUFBQTtBQUFBOzs7QUNmeEM7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsZ0NBQWdDO0FBQ3hDLFVBQUksa0NBQWtDO0FBQ3RDLGFBQU8sZUFBZSxTQUFTLGlDQUFpQyxFQUFFLFlBQVksTUFBTSxLQUFLLFdBQVk7QUFBRSxlQUFPLGdDQUFnQztBQUFBLE1BQStCLEVBQUUsQ0FBQztBQUFBO0FBQUE7OztBQ0poTDtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxpQkFBaUI7QUFDekIsVUFBTSxRQUFRO0FBQ2QsVUFBTSxpQkFBaUIsQ0FBTyxNQUFNLFlBQVk7QUFDNUMsY0FBTSx1QkFBdUIsT0FBTyxHQUFHLE1BQU0sK0JBQStCO0FBQzVFLGVBQU8scUJBQXFCLE1BQU0sT0FBTztBQUFBLE1BQzdDO0FBQ0EsY0FBUSxpQkFBaUI7QUFBQTtBQUFBOzs7QUNSekI7QUFBQTtBQUFBO0FBRUEsVUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsZUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsTUFDNUQ7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxzQkFBc0IsUUFBUSx1QkFBdUIsUUFBUSxtQkFBbUIsUUFBUSxpQkFBaUIsUUFBUSx1QkFBdUI7QUFPaEosVUFBTSxjQUFjLGdCQUFnQixpQkFBb0I7QUFDeEQsVUFBTSxhQUFhO0FBQ25CLFVBQU0sbUJBQW1CO0FBQ3pCLFVBQU0seUJBQU4sTUFBNkI7QUFBQSxRQUN6QixZQUFZLE1BQU07QUFDZCxlQUFLLFFBQVE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsYUFBYTtBQUNULGlCQUFPLEtBQUssTUFBTTtBQUFBLFFBQ3RCO0FBQUEsUUFDQSxnQkFBZ0I7QUFDWixpQkFBTyxLQUFLLE1BQU07QUFBQSxRQUN0QjtBQUFBLFFBQ0EsaUJBQWlCO0FBQ2IsaUJBQU8sS0FBSztBQUFBLFFBQ2hCO0FBQUEsUUFFQSxXQUFXO0FBQ1AsZ0JBQU0sSUFBSSxNQUFNLDZEQUE2RDtBQUFBLFFBQ2pGO0FBQUEsUUFFQSxTQUFTO0FBQ0wsZ0JBQU0sRUFBRSxLQUFLLElBQUksS0FBSztBQUN0QixjQUFJLFNBQVMsUUFBVztBQUNwQixtQkFBTyxRQUFRLE9BQU8sSUFBSSxNQUFNLHlCQUF5QixDQUFDO0FBQUEsVUFDOUQsT0FDSztBQUNELG1CQUFPLFFBQVEsUUFBUSxJQUFJO0FBQUEsVUFDL0I7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLFVBQU0sdUJBQU4sTUFBMkI7QUFBQSxRQUN2QixZQUFZQSxRQUFPO0FBQ2YsZUFBSyxTQUFTQTtBQUFBLFFBQ2xCO0FBQUEsUUFFQSxnQkFBZ0I7QUFDWixpQkFBTztBQUFBLFFBQ1g7QUFBQSxRQUNNLFlBQVksTUFBTSxNQUFNLE1BQU0sUUFBUSxTQUFTLGFBQWEsVUFBVSxVQUFVO0FBQUE7QUFDbEYsYUFBQyxHQUFHLFlBQVksU0FBUyxhQUFhLFNBQVMsNkNBQTZDO0FBQzVGLGtCQUFNLGVBQWU7QUFBQSxjQUNqQjtBQUFBLGNBQ0E7QUFBQSxZQUNKO0FBQ0EsZ0JBQUksYUFBYTtBQUNiLDJCQUFhLE9BQU87QUFBQSxZQUN4QjtBQUNBLGtCQUFNLGFBQWEsUUFBUTtBQUMzQixnQkFBSSxjQUFjLGlCQUFpQixLQUFLLFVBQVUsR0FBRztBQUNqRCxvQkFBTSxJQUFJLE1BQU0sc0xBQXNMO0FBQUEsWUFDMU07QUFDQSxrQkFBTSxNQUFNLElBQUksSUFBSSxNQUFNLEdBQUcsY0FBYyxNQUFNO0FBQ2pELGtCQUFNLE9BQU8sTUFBTSxLQUFLLE9BQU8sSUFBSSxTQUFTLEdBQUcsWUFBWTtBQUUzRCxtQkFBTyxJQUFJLHVCQUF1QixJQUFJO0FBQUEsVUFDMUM7QUFBQTtBQUFBLE1BQ0o7QUFDQSxjQUFRLHVCQUF1QjtBQUkvQixjQUFRLGlCQUFpQjtBQUN6QixVQUFNLG1CQUFtQixNQUFNLElBQUkscUJBQXFCLFdBQVcsY0FBYztBQUNqRixjQUFRLG1CQUFtQjtBQUMzQixjQUFRLHVCQUF1QjtBQUMvQixjQUFRLHNCQUFzQixVQUFVLFFBQVE7QUFBQTtBQUFBOzs7QUMvRWhEO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLHFDQUFxQztBQUM3QyxVQUFNLGVBQWU7QUFDckIsVUFBTSxxQ0FBcUMsQ0FBQyxFQUFFLE1BQU0sS0FBSyxNQUFNLENBQU8sWUFBWTtBQUM5RSxjQUFNLE1BQU0sSUFBSSxJQUFJLFdBQVcsUUFBUSw2Q0FBNkM7QUFDcEYsWUFBSSxhQUFhLElBQUksV0FBVyxLQUFLLFVBQVUsbUJBQUssUUFBUyxDQUFDO0FBQzlELFlBQUksYUFBYSxJQUFJLGtCQUFrQixXQUFXO0FBQ2xELGNBQU0sVUFBVSxHQUFHLGFBQWEsa0JBQWtCO0FBQ2xELGNBQU0sV0FBVyxPQUFPLFlBQVksTUFBTSxNQUFNLElBQUksV0FBVyxJQUFJLFFBQVEsT0FBTyxDQUFDLEdBQUcsTUFBTSxPQUFPO0FBQ25HLGVBQU8sU0FDRixLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUN0QixLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVM7QUFBQSxNQUN0QztBQUNBLGNBQVEscUNBQXFDO0FBQUE7QUFBQTs7O0FDZDdDO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLHdCQUF3QixRQUFRLHFCQUFxQjtBQUM3RCxVQUFNLDRCQUE0QjtBQUFBLFFBQzlCLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNWO0FBRUEsY0FBUSxxQkFBcUI7QUFDN0IsVUFBTSx3QkFBd0IsQ0FBQyxhQUFhO0FBQ3hDLGdCQUFRLHFCQUFxQixrQ0FDdEIsNEJBQ0E7QUFBQSxNQUVYO0FBQ0EsY0FBUSx3QkFBd0I7QUFBQTtBQUFBOzs7QUNmaEM7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsdUJBQXVCO0FBQy9CLFVBQU0sdUNBQXVDO0FBQzdDLFVBQU0sZ0NBQWdDO0FBQ3RDLFVBQU0sdUJBQXVCO0FBQzdCLFVBQU0sY0FBYztBQUNwQixVQUFNQyx3QkFBdUIsQ0FBTyxzQkFBc0I7QUFDdEQsWUFBSSxPQUFPLEdBQUcsOEJBQThCLDZCQUE2QixHQUFHO0FBQ3hFLGdCQUFNLGdDQUFnQyxHQUFHLHFDQUFxQyxvQ0FBb0MscUJBQXFCLGtCQUFrQjtBQUN6SixpQkFBTyw2QkFBNkIsaUJBQWlCO0FBQUEsUUFDekQsT0FDSztBQUNELGtCQUFRLEdBQUcsWUFBWSxpQkFBaUIsRUFBRSxLQUFLLHFCQUFxQixpQkFBaUI7QUFBQSxRQUN6RjtBQUFBLE1BQ0o7QUFDQSxjQUFRLHVCQUF1QkE7QUFBQTtBQUFBOzs7QUNoQi9CLE1BQUFDLHFCQUFBO0FBQUE7QUFBQTtBQUVBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxVQUFNLGNBQWM7QUFDcEIsY0FBUSxVQUFVLFlBQVk7QUFBQTtBQUFBOzs7QUNKOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsTUFBQUMsaUJBQXlEO0FBQ3pELE1BQUFDLGNBT087OztBQ1JQLE1BQUFDLGlCQUE0QztBQUM1QyxNQUFBQyxjQVlPOzs7QUNDQSxNQUFNLGVBQTZCLENBQUMsVUFBVSxZQUFZLGFBQWEsUUFBUTtBQUUvRSxNQUFNLHFCQUFpRDtBQUFBLElBQzVELFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWOzs7QUNyQkEseUJBQWlDO0FBSWpDLE1BQU0sb0JBQW9CO0FBRTFCLE1BQU0sY0FBYyxvQkFDaEIsMEJBQ0E7QUFFRyxNQUFNLFdBQU4sY0FBdUIsTUFBTTtBQUFBLElBQ2xDLFlBQ0UsU0FDTyxRQUNBLE1BQ1A7QUFDQSxZQUFNLE9BQU87QUFITjtBQUNBO0FBR1AsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFNQSxXQUFzQixhQUNwQixNQUNBLFNBQ0EsTUFDWTtBQUFBO0FBN0JkO0FBOEJFLFlBQU0sWUFBWSxVQUFNLGlCQUFBQyxTQUFxQjtBQUU3QyxZQUFNLE9BQU8sS0FBSyxVQUFVLGlDQUN2QixPQUR1QjtBQUFBLFFBRTFCLFVBQVMsYUFBUSxnQkFBUixtQkFBcUI7QUFBQSxRQUM5QixhQUFZLGFBQVEsZ0JBQVIsbUJBQXFCLFFBQVE7QUFBQSxNQUMzQyxFQUFDO0FBRUQsWUFBTSxXQUFXLE1BQU0sTUFBTSxHQUFHLGNBQWMsUUFBUTtBQUFBLFFBQ3BELFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLG9CQUFvQjtBQUFBLFFBQ3RCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsY0FBTSxRQUFRLE1BQU0sU0FBUyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQUEsVUFDL0MsU0FBUyxTQUFTO0FBQUEsUUFDcEIsRUFBRTtBQUNGLGNBQU0sSUFBSTtBQUFBLFVBQ1IsTUFBTSxTQUFTLE1BQU0sV0FBVyxjQUFjLFNBQVM7QUFBQSxVQUN2RCxTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFDQSxhQUFPLFNBQVMsS0FBSztBQUFBLElBQ3ZCO0FBQUE7QUFLQSxXQUFzQixhQUNwQixNQUNBLFNBQ0EsTUFDWTtBQUFBO0FBbEVkO0FBbUVFLFlBQU0sWUFBWSxVQUFNLGlCQUFBQSxTQUFxQjtBQUU3QyxZQUFNLE9BQU8sS0FBSyxVQUFVLGlDQUN2QixPQUR1QjtBQUFBLFFBRTFCLFVBQVMsYUFBUSxnQkFBUixtQkFBcUI7QUFBQSxRQUM5QixhQUFZLGFBQVEsZ0JBQVIsbUJBQXFCLFFBQVE7QUFBQSxNQUMzQyxFQUFDO0FBRUQsWUFBTSxXQUFXLE1BQU0sTUFBTSxHQUFHLGNBQWMsUUFBUTtBQUFBLFFBQ3BELFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLG9CQUFvQjtBQUFBLFFBQ3RCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsY0FBTSxRQUFRLE1BQU0sU0FBUyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQUEsVUFDL0MsU0FBUyxTQUFTO0FBQUEsUUFDcEIsRUFBRTtBQUNGLGNBQU0sSUFBSTtBQUFBLFVBQ1IsTUFBTSxTQUFTLE1BQU0sV0FBVyxjQUFjLFNBQVM7QUFBQSxVQUN2RCxTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFDQSxhQUFPLFNBQVMsS0FBSztBQUFBLElBQ3ZCO0FBQUE7QUFPQSxXQUFzQixjQUNwQixNQUNBLFNBQ1k7QUFBQTtBQXhHZDtBQXlHRSxZQUFNLFlBQVksVUFBTSxpQkFBQUEsU0FBcUI7QUFFN0MsWUFBTSxPQUFPLEtBQUssVUFBVTtBQUFBLFFBQzFCLFVBQVMsYUFBUSxnQkFBUixtQkFBcUI7QUFBQSxRQUM5QixhQUFZLGFBQVEsZ0JBQVIsbUJBQXFCLFFBQVE7QUFBQSxNQUMzQyxDQUFDO0FBRUQsWUFBTSxXQUFXLE1BQU0sTUFBTSxHQUFHLGNBQWMsUUFBUTtBQUFBLFFBQ3BELFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLG9CQUFvQjtBQUFBLFFBQ3RCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsY0FBTSxRQUFRLE1BQU0sU0FBUyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQUEsVUFDL0MsU0FBUyxTQUFTO0FBQUEsUUFDcEIsRUFBRTtBQUNGLGNBQU0sSUFBSTtBQUFBLFVBQ1IsTUFBTSxTQUFTLE1BQU0sV0FBVyxjQUFjLFNBQVM7QUFBQSxVQUN2RCxTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFDQSxhQUFPLFNBQVMsS0FBSztBQUFBLElBQ3ZCO0FBQUE7OztBQ2pJQSxNQUFNLHFCQUE2QztBQUFBLElBQ2pELGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLEVBQ3JCO0FBRU8sV0FBUyxtQkFBbUIsU0FBc0IsWUFBbUM7QUFaNUY7QUFhRSxZQUFPLHdCQUFtQixHQUFHLFdBQVcsa0JBQWpDLFlBQWtEO0FBQUEsRUFDM0Q7QUFFQSxNQUFNLG9CQUFxQyxDQUFDLE9BQU8sUUFBUSxrQkFBa0IsaUJBQWlCO0FBRXZGLFdBQVMsV0FBVyxRQUF5QjtBQUNsRCxXQUFPLGtCQUFrQixTQUFTLE1BQXVCO0FBQUEsRUFDM0Q7QUFFTyxXQUFTLGVBQWUsUUFHN0I7QUFDQSxZQUFRLFFBQVE7QUFBQSxNQUNkLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFDSCxlQUFPLEVBQUUsT0FBTyxrQkFBa0IsTUFBTSxTQUFTO0FBQUEsTUFDbkQsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUNILGVBQU8sRUFBRSxPQUFPLGdCQUFnQixNQUFNLE9BQU87QUFBQSxNQUMvQyxLQUFLO0FBQ0gsZUFBTyxFQUFFLE9BQU8sT0FBTyxNQUFNLFdBQVc7QUFBQSxNQUMxQyxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQ0gsZUFBTyxFQUFFLE9BQU8sUUFBUSxNQUFNLFdBQVc7QUFBQSxNQUMzQyxLQUFLO0FBQ0gsZUFBTyxFQUFFLE9BQU8sWUFBWSxNQUFNLE9BQU87QUFBQSxNQUMzQztBQUNFLGVBQU8sRUFBRSxPQUFPLFFBQVEsTUFBTSxPQUFPO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBRU8sV0FBUyxpQkFBaUIsT0FBdUI7QUFDdEQsVUFBTSxNQUFNLElBQUksS0FBSztBQUNyQixVQUFNLE1BQU0sSUFBSSxLQUFLLEtBQUs7QUFDMUIsV0FBTyxLQUFLLE1BQU0sSUFBSSxRQUFRLElBQUksSUFBSSxRQUFRLE1BQU0sTUFBTyxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzFFO0FBUU8sV0FBUyxpQkFBaUIsT0FBOEI7QUFDN0QsVUFBTSxVQUFVLElBQUksS0FBSyxLQUFLLEVBQUUsUUFBUSxJQUFJLEtBQUssSUFBSTtBQUNyRCxRQUFJLFdBQVc7QUFBRyxhQUFPLEVBQUUsTUFBTSxHQUFHLE9BQU8sR0FBRyxXQUFXLEtBQUs7QUFDOUQsVUFBTSxhQUFhLEtBQUssTUFBTSxXQUFXLE1BQU8sS0FBSyxHQUFHO0FBQ3hELFdBQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxNQUFNLGFBQWEsRUFBRTtBQUFBLE1BQ2hDLE9BQU8sYUFBYTtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUlPLFdBQVMsZUFBZSxNQUEyQjtBQUN4RCxRQUFJLE9BQU87QUFBRyxhQUFPO0FBQ3JCLFFBQUksUUFBUTtBQUFJLGFBQU87QUFDdkIsV0FBTztBQUFBLEVBQ1Q7QUFFTyxXQUFTLGdCQUNkLE9BQ0EsUUFDNkM7QUFDN0MsUUFBSSxXQUFXLE1BQU07QUFBRyxhQUFPO0FBRS9CLFVBQU0sT0FBTyxpQkFBaUIsS0FBSztBQUNuQyxVQUFNLE9BQU8sZUFBZSxLQUFLLElBQUk7QUFFckMsUUFBSSxLQUFLO0FBQVcsYUFBTyxFQUFFLE9BQU8sV0FBVyxNQUFNLFNBQVM7QUFDOUQsUUFBSSxLQUFLLE9BQU87QUFBRyxhQUFPLEVBQUUsT0FBTyxHQUFHLEtBQUssU0FBUyxLQUFLLGVBQWUsTUFBTSxLQUFLO0FBQ25GLFdBQU8sRUFBRSxPQUFPLEdBQUcsS0FBSyxjQUFjLE1BQU0sS0FBSztBQUFBLEVBQ25EOzs7QUN0RkEsa0JBQW9DO0FBZ0J4QjtBQVRaLE1BQU0sY0FBYyxDQUFDLEVBQUUsU0FBUyxRQUFRLE1BQXdCO0FBQzlELFdBQ0UsNENBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxTQUFTLFNBQVM7QUFBQSxNQUM1QixzREFBQztBQUFBLFFBQ0MsTUFBSztBQUFBLFFBQ0wsT0FBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsU0FDRSxVQUNFLDRDQUFDO0FBQUEsVUFBTyxTQUFTO0FBQUEsVUFBUztBQUFBLFNBQUssSUFDN0I7QUFBQSxPQUVSO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHNCQUFROzs7QUMxQmYscUJBQW9DO0FBQ3BDLE1BQUFDLGFBQW1DO0FBNkIvQixNQUFBQyxzQkFBQTtBQXJCSixNQUFNLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxPQUFPLE1BQTBCO0FBQy9ELFVBQU0sQ0FBQyxFQUFFLE9BQU8sUUFBSSx1QkFBUyxDQUFDO0FBRTlCLGdDQUFVLE1BQU07QUFDZCxZQUFNLEtBQUssWUFBWSxNQUFNLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQU07QUFDMUQsYUFBTyxNQUFNLGNBQWMsRUFBRTtBQUFBLElBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFFVixRQUFJLENBQUMsU0FBUyxXQUFXLE1BQU07QUFBRyxhQUFPO0FBRXpDLFVBQU0sT0FBTyxpQkFBaUIsS0FBSztBQUNuQyxVQUFNLE9BQU8sZUFBZSxLQUFLLElBQUk7QUFDckMsVUFBTSxXQUFXLEtBQUssT0FBTyxLQUFLLENBQUMsS0FBSztBQUV4QyxVQUFNLFFBQVEsS0FBSyxZQUNmLG9CQUNBLEtBQUssU0FBUyxJQUNaLEdBQUcsS0FBSyxxQkFDUixHQUFHLEtBQUssU0FBUyxLQUFLO0FBRTVCLFdBQ0UsOENBQUM7QUFBQSxNQUNDLEtBQUs7QUFBQSxRQUNILE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLFFBQVE7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxRQUNULGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BRUE7QUFBQSxxREFBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFlBQVksT0FBTyxXQUFXLGFBQWEsWUFBWTtBQUFBLFVBQ2hHLHFCQUFXLGdCQUFnQjtBQUFBLFNBQzlCO0FBQUEsUUFDQSw2Q0FBQztBQUFBLFVBQU0sTUFBTSxLQUFLLFlBQVksV0FBVztBQUFBLFVBQU87QUFBQSxTQUFNO0FBQUE7QUFBQSxLQUN4RDtBQUFBLEVBRUo7QUFFQSxNQUFPLHdCQUFROzs7QUNqRGYsTUFBQUMsYUFBMkQ7QUFnQnZELE1BQUFDLHNCQUFBO0FBRkosV0FBUyxRQUFRLEVBQUUsT0FBTyxNQUFNLEdBQWlCO0FBQy9DLFdBQ0UsOENBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLFlBQVksaUJBQWlCLFFBQVEsU0FBUztBQUFBLE1BQ2xGO0FBQUEscURBQUM7QUFBQSxVQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsVUFBSTtBQUFBLFNBQU07QUFBQSxRQUM3RCw2Q0FBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sVUFBVTtBQUFBLFVBQUk7QUFBQSxTQUFNO0FBQUE7QUFBQSxLQUMzQztBQUFBLEVBRUo7QUFFQSxXQUFTLGFBQWEsUUFBZ0IsVUFBMEI7QUFDOUQsV0FBTyxJQUFJLEtBQUssYUFBYSxTQUFTO0FBQUEsTUFDcEMsT0FBTztBQUFBLE1BQ1AsVUFBVSxTQUFTLFlBQVk7QUFBQSxJQUNqQyxDQUFDLEVBQUUsT0FBTyxTQUFTLEdBQUc7QUFBQSxFQUN4QjtBQUVBLFdBQVMsV0FBVyxXQUEyQjtBQUM3QyxXQUFPLElBQUksS0FBSyxZQUFZLEdBQUksRUFBRSxtQkFBbUIsU0FBUztBQUFBLE1BQzVELE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBRUEsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLFNBQVMsUUFBUSxNQUE0QjtBQUN0RSxVQUFNLGNBQWMsZUFBZSxRQUFRLE1BQU07QUFFakQsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsaUJBQWlCLGFBQWEsU0FBUyxVQUFVLGNBQWMsU0FBUztBQUFBLE1BRTdHO0FBQUEsc0RBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLFlBQVksaUJBQWlCLFFBQVEsU0FBUztBQUFBLFVBQ2xGO0FBQUEseURBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxPQUFPO0FBQUEsY0FDaEQsdUJBQWEsUUFBUSxRQUFRLFFBQVEsUUFBUTtBQUFBLGFBQ2hEO0FBQUEsWUFDQSw2Q0FBQztBQUFBLGNBQU0sTUFBTSxZQUFZO0FBQUEsY0FBTyxzQkFBWTtBQUFBLGFBQU07QUFBQTtBQUFBLFNBQ3BEO0FBQUEsU0FHRSxRQUFRLGlCQUFpQixRQUFRLG1CQUNqQyw4Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNuQztBQUFBLG9CQUFRLGlCQUNQLDZDQUFDO0FBQUEsY0FBUSxPQUFNO0FBQUEsY0FBVyxPQUFPLFFBQVE7QUFBQSxhQUFlO0FBQUEsWUFFekQsUUFBUSxrQkFDUCw2Q0FBQztBQUFBLGNBQVEsT0FBTTtBQUFBLGNBQVEsT0FBTyxRQUFRO0FBQUEsYUFBZ0I7QUFBQTtBQUFBLFNBRTFEO0FBQUEsUUFHRiw2Q0FBQyxzQkFBUTtBQUFBLFFBR1IsVUFDQyw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFNBQVMsU0FBUyxRQUFRLFNBQVM7QUFBQSxVQUM3Qyx1REFBQyxzQkFBUTtBQUFBLFNBQ1gsSUFFQSw4Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNuQztBQUFBLG9CQUFRLGNBQWMsUUFBUSxjQUM3Qiw2Q0FBQztBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sT0FBTyxHQUFHLFFBQVEsV0FBVyxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksUUFBUSxXQUFXLE1BQU0sQ0FBQyxlQUFlLFFBQVE7QUFBQSxhQUMxRztBQUFBLFlBRUQsUUFBUSxvQkFDUCw2Q0FBQztBQUFBLGNBQVEsT0FBTTtBQUFBLGNBQW1CLE9BQU8sV0FBVyxRQUFRLGdCQUFnQjtBQUFBLGFBQUc7QUFBQSxZQUVoRixRQUFRLHNCQUNQLDZDQUFDO0FBQUEsY0FBUSxPQUFNO0FBQUEsY0FBYyxPQUFPLFFBQVE7QUFBQSxhQUFvQjtBQUFBLFlBRWpFLFFBQVEsbUJBQ1AsNkNBQUM7QUFBQSxjQUFRLE9BQU07QUFBQSxjQUFrQixPQUFPLFFBQVE7QUFBQSxhQUFpQjtBQUFBLFlBRWxFLFFBQVEsZUFDUCw2Q0FBQztBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sT0FBTyw2Q0FBQztBQUFBLGdCQUFLLE1BQU0sUUFBUTtBQUFBLGdCQUFhLFFBQU87QUFBQSxnQkFBUztBQUFBLGVBQVk7QUFBQSxhQUN0RTtBQUFBLFlBRUQsUUFBUSxZQUFZLE9BQU8sS0FBSyxRQUFRLFFBQVEsRUFBRSxTQUFTLEtBQzFEO0FBQUEsY0FDRyxpQkFBTyxRQUFRLFFBQVEsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUM5Qyw2Q0FBQztBQUFBLGdCQUFrQixPQUFPO0FBQUEsZ0JBQUssT0FBTztBQUFBLGlCQUF4QixHQUE2QixDQUM1QztBQUFBLGFBQ0g7QUFBQTtBQUFBLFNBRUo7QUFBQSxRQUlGLDZDQUFDLHNCQUFRO0FBQUEsUUFDVCw4Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVU7QUFBQSxVQUNyQztBQUFBLDBEQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sV0FBVztBQUFBLGNBQUc7QUFBQTtBQUFBLGdCQUFVLFFBQVE7QUFBQTtBQUFBLGFBQUc7QUFBQSxZQUN6RSxRQUFRLGFBQ1AsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxXQUFXO0FBQUEsY0FBRztBQUFBO0FBQUEsZ0JBQVMsUUFBUTtBQUFBO0FBQUEsYUFBVTtBQUFBO0FBQUEsU0FFcEY7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTywwQkFBUTs7O0FDbkhmLE1BQUFDLGFBQW1DO0FBVy9CLE1BQUFDLHNCQUFBO0FBRkosTUFBTSxjQUFjLENBQUMsRUFBRSxVQUFVLFNBQVMsYUFBYSxjQUFjLE1BQXdCO0FBQzNGLFdBQ0UsOENBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLGlCQUFpQixhQUFhLFNBQVMsVUFBVSxjQUFjLFNBQVM7QUFBQSxNQUM1RztBQUFBLHFEQUFDO0FBQUEsVUFBTSxNQUFLO0FBQUEsVUFBTztBQUFBLFNBQVE7QUFBQSxRQUMzQiw2Q0FBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFdBQVc7QUFBQSxVQUNwRDtBQUFBLFNBQ0g7QUFBQSxRQUNBLDZDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sWUFBWTtBQUFBLFVBQzdDLHlCQUFlLGtCQUFrQixTQUM5QixZQUFZLG9CQUFvQixrQkFBa0IsSUFBSSxLQUFLLHdDQUMzRDtBQUFBLFNBQ047QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyxzQkFBUTs7O0FDekJmLE1BQUFDLGFBQTRCO0FBc0N0QixNQUFBQyxzQkFBQTtBQTlCTixXQUFTLGNBQWMsVUFBa0M7QUFDdkQsVUFBTSxVQUFvQixDQUFDO0FBRTNCLFVBQU0saUJBQWlCLFNBQVMsbUJBQzdCLE9BQU8sQ0FBQyxTQUFTLEtBQUssYUFBYSxlQUFlLEtBQUssWUFBWSxLQUFLLEVBQ3hFLE1BQU0sR0FBRyxDQUFDO0FBQ2IsZUFBVyxRQUFRLGdCQUFnQjtBQUNqQyxjQUFRLEtBQUsscUJBQXFCLEtBQUssS0FBSyxZQUFZLEdBQUc7QUFBQSxJQUM3RDtBQUVBLFVBQU0sY0FBYyxTQUFTLGdCQUFnQixNQUFNLEdBQUcsQ0FBQztBQUN2RCxlQUFXLFdBQVcsYUFBYTtBQUNqQyxZQUFNLFdBQVcsUUFBUSxRQUFRLFdBQVcsTUFBTSxJQUM5QyxvQkFBb0IsUUFBUSxRQUFRLE1BQU0sQ0FBQyxFQUFFLFlBQVksTUFDekQsUUFBUSxRQUFRLFdBQVcsV0FBVyxJQUNwQywwQkFBMEIsUUFBUSxRQUFRLE1BQU0sQ0FBQyxFQUFFLFlBQVksTUFDL0QsVUFBVSxRQUFRLFFBQVEsWUFBWTtBQUM1QyxjQUFRLEtBQUssUUFBUTtBQUFBLElBQ3ZCO0FBRUEsV0FBTyxRQUFRLE1BQU0sR0FBRyxDQUFDO0FBQUEsRUFDM0I7QUFFQSxNQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsWUFBWSxNQUF5QjtBQUNyRSxVQUFNLFFBQVEsY0FDVixTQUFTLG1CQUFtQixnQkFDNUIsY0FBYyxRQUFRO0FBRTFCLFdBQ0UsOENBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsTUFDcEM7QUFBQSxxREFBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sY0FBYyxZQUFZLFdBQVc7QUFBQSxVQUN2RCx3QkFBYyw4QkFBOEI7QUFBQSxTQUMvQztBQUFBLFFBQ0EsNkNBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsVUFDbkMsZ0JBQU0sSUFBSSxDQUFDLE1BQU0sVUFDaEIsOENBQUM7QUFBQSxZQUVDLEtBQUs7QUFBQSxjQUNILE9BQU87QUFBQSxjQUNQLEtBQUs7QUFBQSxjQUNMLFFBQVE7QUFBQSxjQUNSLGlCQUFpQjtBQUFBLGNBQ2pCLFNBQVM7QUFBQSxjQUNULGNBQWM7QUFBQSxZQUNoQjtBQUFBLFlBRUE7QUFBQSwyREFBQztBQUFBLGdCQUNDLEtBQUs7QUFBQSxrQkFDSCxRQUFRO0FBQUEsa0JBQ1IsUUFBUTtBQUFBLGtCQUNSLE9BQU87QUFBQSxnQkFDVDtBQUFBLGdCQUVBLHdEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFFBQVEsT0FBTyxZQUFZO0FBQUEsa0JBQ3BFO0FBQUEsNEJBQVE7QUFBQSxvQkFBRTtBQUFBO0FBQUEsaUJBQ2I7QUFBQSxlQUNGO0FBQUEsY0FDQSw2Q0FBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLE9BQU87QUFBQSxnQkFBSTtBQUFBLGVBQUs7QUFBQTtBQUFBLGFBckJoQyxLQXNCUCxDQUNEO0FBQUEsU0FDSDtBQUFBLFFBQ0EsNkNBQUM7QUFBQSxVQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsVUFBRztBQUFBLFNBRXREO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sdUJBQVE7OztBQzVFZixNQUFBQyxhQUFzRDtBQVk1QyxNQUFBQyxzQkFBQTtBQUxWLE1BQU0sWUFBWSxDQUFDLEVBQUUsZUFBZSxnQkFBZ0IsTUFBc0I7QUFDeEUsV0FDRSw2Q0FBQztBQUFBLE1BQ0MsdURBQUM7QUFBQSxRQUFjLE9BQU07QUFBQSxRQUNuQix3REFBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNwQztBQUFBLDBEQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLGNBQ25DO0FBQUEsNkRBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLFlBQVksV0FBVztBQUFBLGtCQUFHO0FBQUEsaUJBRXZEO0FBQUEsZ0JBQ0EsNkNBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sWUFBWTtBQUFBLGtCQUM3QztBQUFBLGlCQUNIO0FBQUE7QUFBQSxhQUNGO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxjQUNuQztBQUFBLDZEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxZQUFZLFdBQVc7QUFBQSxrQkFBRztBQUFBLGlCQUV2RDtBQUFBLGdCQUNBLDZDQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLFlBQVk7QUFBQSxrQkFDN0M7QUFBQSxpQkFDSDtBQUFBO0FBQUEsYUFDRjtBQUFBO0FBQUEsU0FDRjtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sb0JBQVE7OztBQ2xDZixNQUFBQyxnQkFBeUQ7QUFDekQsTUFBQUMsY0FBbUQ7OztBQ2dCbkQsV0FBUyxpQkFBaUIsS0FBd0M7QUFDaEUsUUFBSSxDQUFDO0FBQUssYUFBTztBQUNqQixZQUFRLEtBQUs7QUFBQSxNQUNYLEtBQUs7QUFBUSxlQUFPO0FBQUEsTUFDcEIsS0FBSztBQUFRLGVBQU87QUFBQSxNQUNwQixLQUFLO0FBQWUsZUFBTztBQUFBLE1BQzNCLEtBQUs7QUFBYSxlQUFPO0FBQUEsTUFDekI7QUFBUyxlQUFPO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBRUEsV0FBU0MsWUFBVyxJQUFvQjtBQUN0QyxXQUFPLElBQUksS0FBSyxLQUFLLEdBQUksRUFBRSxtQkFBbUIsU0FBUztBQUFBLE1BQ3JELE9BQU87QUFBQSxNQUFTLEtBQUs7QUFBQSxNQUFXLE1BQU07QUFBQSxJQUN4QyxDQUFDO0FBQUEsRUFDSDtBQUVBLFdBQVMsZUFBZSxRQUFnQixVQUEyQjtBQUNqRSxXQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxNQUNwQyxPQUFPO0FBQUEsTUFDUCxVQUFVLDhCQUFZO0FBQUEsSUFDeEIsQ0FBQyxFQUFFLE9BQU8sU0FBUyxHQUFHO0FBQUEsRUFDeEI7QUFPTyxXQUFTLHFCQUNkLE1BQ0EsU0FDMEI7QUFDMUIsVUFBTSxRQUFRLEtBQUs7QUFDbkIsUUFBSSxDQUFDO0FBQU8sYUFBTztBQUVuQixZQUFRLE9BQU87QUFBQSxNQUNiLEtBQUssY0FBYztBQUNqQixjQUFNLE9BQU8sUUFBUTtBQUNyQixjQUFNLE1BQU0sUUFBUTtBQUNwQixZQUFJLENBQUMsUUFBUSxDQUFDO0FBQUssaUJBQU87QUFBQSxZQUN4QixRQUFRO0FBQUEsWUFDUixPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDWjtBQUNBLGNBQU0sV0FBVyxTQUFTO0FBQzFCLGNBQU0sVUFBVSxRQUFRO0FBQ3hCLFlBQUksWUFBWTtBQUFTLGlCQUFPO0FBQUEsWUFDOUIsUUFBUTtBQUFBLFlBQ1IsT0FBTztBQUFBLFlBQ1AsVUFBVTtBQUFBLFVBQ1o7QUFDQSxZQUFJLFlBQVk7QUFBUyxpQkFBTztBQUFBLFlBQzlCLFFBQVE7QUFBQSxZQUNSLE9BQU8sWUFBWSxpQkFBaUIsSUFBSSxXQUFXLGlCQUFpQixHQUFHO0FBQUEsWUFDdkUsVUFBVTtBQUFBLFVBQ1o7QUFDQSxlQUFPO0FBQUEsVUFDTCxRQUFRO0FBQUEsVUFDUixPQUFPLFlBQVksaUJBQWlCLElBQUksV0FBVyxpQkFBaUIsR0FBRztBQUFBLFVBQ3ZFLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSyxhQUFhO0FBQ2hCLGNBQU0sTUFBTSxRQUFRO0FBQ3BCLFlBQUksQ0FBQyxPQUFPLFFBQVEsaUJBQWlCLFFBQVE7QUFBYSxpQkFBTztBQUFBLFlBQy9ELFFBQVE7QUFBQSxZQUNSLE9BQU87QUFBQSxZQUNQLFVBQVU7QUFBQSxVQUNaO0FBQ0EsWUFBSSxRQUFRO0FBQVEsaUJBQU87QUFBQSxZQUN6QixRQUFRO0FBQUEsWUFDUixPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDWjtBQUNBLGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSyxrQkFBa0I7QUFDckIsY0FBTSxTQUFTLFFBQVE7QUFDdkIsWUFBSSxDQUFDO0FBQVEsaUJBQU87QUFBQSxZQUNsQixRQUFRO0FBQUEsWUFDUixPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDWjtBQUNBLGNBQU0sVUFBVSxRQUFRO0FBQ3hCLFlBQUksV0FBVztBQUFpQixpQkFBTztBQUFBLFlBQ3JDLFFBQVE7QUFBQSxZQUNSLE9BQU8sVUFBVSwwQkFBMEIsYUFBYTtBQUFBLFlBQ3hELFVBQVU7QUFBQSxVQUNaO0FBQ0EsWUFBSSxXQUFXO0FBQXdCLGlCQUFPO0FBQUEsWUFDNUMsUUFBUTtBQUFBLFlBQ1IsT0FBTztBQUFBLFlBQ1AsVUFBVTtBQUFBLFVBQ1o7QUFDQSxlQUFPO0FBQUEsVUFDTCxRQUFRO0FBQUEsVUFDUixPQUFPLGVBQWU7QUFBQSxVQUN0QixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUssaUJBQWlCO0FBQ3BCLGNBQU0sT0FBTyxRQUFRO0FBQ3JCLGNBQU0sU0FBUyxRQUFRO0FBQ3ZCLFlBQUksQ0FBQyxRQUFRLENBQUM7QUFBUSxpQkFBTztBQUM3QixZQUFJLFdBQVc7QUFBdUIsaUJBQU87QUFBQSxZQUMzQyxRQUFRO0FBQUEsWUFDUixPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDWjtBQUNBLFlBQUksUUFBUSxXQUFXO0FBQXVCLGlCQUFPO0FBQUEsWUFDbkQsUUFBUTtBQUFBLFlBQ1IsT0FBTyx3QkFBd0I7QUFBQSxZQUMvQixVQUFVO0FBQUEsVUFDWjtBQUNBLFlBQUk7QUFBTSxpQkFBTztBQUFBLFlBQ2YsUUFBUTtBQUFBLFlBQ1IsT0FBTyxjQUFjO0FBQUEsWUFDckIsVUFBVTtBQUFBLFVBQ1o7QUFDQSxZQUFJLFdBQVc7QUFBdUIsaUJBQU87QUFBQSxZQUMzQyxRQUFRO0FBQUEsWUFDUixPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDWjtBQUNBLGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU8sbUJBQW1CO0FBQUEsVUFDMUIsVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsTUFDQSxLQUFLO0FBQ0gsWUFBSSxDQUFDLFFBQVE7QUFBZ0IsaUJBQU87QUFDcEMsZUFBTztBQUFBLFVBQ0wsUUFBUTtBQUFBLFVBQ1IsT0FBTyxRQUFRO0FBQUEsVUFDZixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0YsS0FBSztBQUNILFlBQUksQ0FBQyxRQUFRO0FBQWlCLGlCQUFPO0FBQ3JDLGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU8sUUFBUTtBQUFBLFVBQ2YsVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJLENBQUMsUUFBUTtBQUFrQixpQkFBTztBQUN0QyxlQUFPO0FBQUEsVUFDTCxRQUFRO0FBQUEsVUFDUixPQUFPQSxZQUFXLFFBQVEsZ0JBQWdCO0FBQUEsVUFDMUMsVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJLENBQUMsUUFBUTtBQUFhLGlCQUFPO0FBQ2pDLGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRixLQUFLLGVBQWU7QUFDbEIsY0FBTSxVQUFVLFFBQVE7QUFDeEIsWUFBSSxDQUFDLFdBQVcsUUFBUSxXQUFXO0FBQUcsaUJBQU87QUFDN0MsY0FBTSxJQUFJLFFBQVE7QUFDbEIsZUFBTztBQUFBLFVBQ0wsUUFBUTtBQUFBLFVBQ1IsT0FBTyxhQUFhLGVBQWUsRUFBRSxRQUFRLFFBQVEsUUFBUSxRQUFRQSxZQUFXLEVBQUUsT0FBTztBQUFBLFVBQ3pGLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUNILGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUtFLGVBQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNaO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7OztBQy9NQSxNQUFBQyxhQUE0QjtBQXNCcEIsTUFBQUMsc0JBQUE7QUFiUixXQUFTLGlCQUFpQixXQUFtQixPQUFxQztBQUNoRixRQUFJLFVBQVUsS0FBSyxjQUFjO0FBQUcsYUFBTztBQUMzQyxRQUFJLGFBQWE7QUFBTyxhQUFPO0FBQy9CLFVBQU0sV0FBVyxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU8sWUFBWSxRQUFTLEVBQUUsQ0FBQztBQUNqRSxXQUFPLEdBQUc7QUFBQSxFQUNaO0FBRUEsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLFdBQVcsTUFBTSxNQUE4QjtBQUMxRSxVQUFNLGdCQUFnQixpQkFBaUIsV0FBVyxLQUFLO0FBRXZELFdBQ0UsOENBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFDbkM7QUFBQSxzREFBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxZQUFZLGdCQUFnQjtBQUFBLFVBQ2xEO0FBQUEseURBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLGNBQWMsWUFBWSxXQUFXO0FBQUEsY0FBRztBQUFBLGFBRTdEO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUNoRDtBQUFBO0FBQUEsZ0JBQVU7QUFBQSxnQkFBSztBQUFBLGdCQUFNO0FBQUE7QUFBQSxhQUN4QjtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBQ0EsNkNBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxpQkFBaUIsYUFBYSxjQUFjLFdBQVcsVUFBVSxTQUFTO0FBQUEsVUFDbkYsMEJBQ0MsNkNBQUM7QUFBQSxZQUNDLEtBQUs7QUFBQSxjQUNILGlCQUFpQjtBQUFBLGNBQ2pCLGNBQWM7QUFBQSxjQUNkLE9BQU87QUFBQSxjQUNQLFNBQVM7QUFBQSxZQUNYO0FBQUEsWUFFQSx1REFBQztBQUFBLGNBQVE7QUFBQSxhQUFJO0FBQUEsV0FDZixJQUVBLDZDQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVO0FBQUEsWUFDN0IsdURBQUM7QUFBQSxjQUFRO0FBQUEsYUFBSTtBQUFBLFdBQ2Y7QUFBQSxTQUVKO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sNEJBQVE7OztBQ25EZixNQUFBQyxnQkFBeUI7QUFDekIsTUFBQUMsYUFBMkU7OztBQ0QzRSxNQUFBQyxnQkFBeUI7QUFDekIsTUFBQUMsYUFBMkU7QUF5SW5FLE1BQUFDLHNCQUFBO0FBM0hSLFdBQVMsZUFBZSxPQUF1QjtBQUM3QyxRQUFJLFFBQVE7QUFBTSxhQUFPLEdBQUc7QUFDNUIsUUFBSSxRQUFRLE9BQU87QUFBTSxhQUFPLElBQUksUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUMzRCxXQUFPLElBQUksU0FBUyxPQUFPLE9BQU8sUUFBUSxDQUFDO0FBQUEsRUFDN0M7QUFFQSxNQUFNLG9CQUE0QztBQUFBLElBQ2hELEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBUUEsV0FBUyxrQkFBa0IsTUFBMEIsVUFBc0M7QUFDekYsVUFBTSxLQUFLLHNCQUFRLElBQUksWUFBWSxFQUFFLEtBQUs7QUFDMUMsUUFBSSxFQUFFLFNBQVMsR0FBRztBQUFHLGFBQU87QUFDNUIsUUFBSSxLQUFLLGtCQUFrQjtBQUFJLGFBQU8sa0JBQWtCO0FBQ3hELFVBQU0sUUFBUSw4QkFBWSxJQUFJLFlBQVk7QUFDMUMsVUFBTSxNQUFNLEtBQUssWUFBWSxHQUFHO0FBQ2hDLFFBQUksT0FBTyxHQUFHO0FBQ1osWUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLENBQUM7QUFDOUIsVUFBSSxrQkFBa0I7QUFBTSxlQUFPLGtCQUFrQjtBQUFBLElBQ3ZEO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxXQUFTLGFBQWEsVUFBMEI7QUFwRGhEO0FBcURFLFVBQU0sTUFBOEI7QUFBQSxNQUNsQyxtQkFBbUI7QUFBQSxNQUNuQixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsSUFDaEI7QUFDQSxZQUFPLFNBQUksY0FBSixZQUFpQjtBQUFBLEVBQzFCO0FBRUEsTUFBTSxvQkFBb0IsQ0FBQztBQUFBLElBQ3pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLE1BQThCO0FBQzVCLFVBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBd0IsSUFBSTtBQUN0RCxVQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsS0FBSztBQUNwRCxVQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksd0JBQVMsS0FBSztBQUUxQyxVQUFNLHVCQUF1QixDQUFPLGVBSzlCO0FBakZSO0FBa0ZJLGVBQVMsSUFBSTtBQUViLFlBQU0saUJBQWlCLGtCQUFrQixXQUFXLE1BQU0sV0FBVyxRQUFRO0FBQzdFLFVBQUksbUJBQW1CLGdCQUFnQixtQkFBbUIsY0FBYztBQUN0RTtBQUFBLFVBQ0U7QUFBQSxRQUNGO0FBQ0E7QUFBQSxNQUNGO0FBRUEsZ0JBQVUsSUFBSTtBQUVkLFVBQUk7QUFDRixjQUFNLFNBQVMsTUFBTTtBQUFBLFVBQ25CLGlCQUFpQjtBQUFBLFVBQ2pCO0FBQUEsVUFDQTtBQUFBLFlBQ0Usb0JBQW9CO0FBQUEsWUFDcEIsZ0JBQWdCLFdBQVc7QUFBQSxZQUMzQixZQUFXLGdCQUFXLGFBQVgsWUFBdUI7QUFBQSxZQUNsQyxXQUFXLFdBQVc7QUFBQSxZQUN0QixXQUFXO0FBQUEsVUFDYjtBQUFBLFFBQ0Y7QUFDQSxxQkFBYSxPQUFPLElBQUk7QUFDeEIsdUJBQWUsS0FBSztBQUFBLE1BQ3RCLFNBQVMsS0FBUDtBQUNBLGlCQUFTLGtHQUFrRztBQUFBLE1BQzdHLFVBQUU7QUFDQSxrQkFBVSxLQUFLO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBRUEsVUFBTSxvQkFBb0IsTUFBTTtBQUM5QixlQUFTLG1HQUFtRztBQUFBLElBQzlHO0FBRUEsVUFBTSxlQUFlLE1BQVk7QUFDL0IsVUFBSSxDQUFDO0FBQWM7QUFDbkIsZUFBUyxJQUFJO0FBRWIsVUFBSTtBQUNGLGNBQU07QUFBQSxVQUNKLGlCQUFpQiw0QkFBNEIsYUFBYTtBQUFBLFVBQzFEO0FBQUEsUUFDRjtBQUNBLHFCQUFhLElBQUk7QUFBQSxNQUNuQixTQUFTLEtBQVA7QUFDQSxpQkFBUyxtQ0FBbUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFHQSxRQUFJLFdBQVc7QUFDYixVQUFJLGNBQWM7QUFDaEIsZUFDRSw4Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsUUFBUSxVQUFVLE1BQU0sT0FBTztBQUFBLFVBQ3BFO0FBQUEseURBQUM7QUFBQSxjQUFLLE1BQUs7QUFBQSxjQUFRLE1BQUs7QUFBQSxhQUFTO0FBQUEsWUFDakMsNkNBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsY0FDcEQsdUJBQWE7QUFBQSxhQUNoQjtBQUFBLFlBQ0EsNkNBQUM7QUFBQSxjQUFNLE1BQUs7QUFBQSxjQUFRLHVCQUFhLGFBQWEsU0FBUztBQUFBLGFBQUU7QUFBQSxZQUN6RCw2Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUNoRCx5QkFBZSxhQUFhLFNBQVM7QUFBQSxhQUN4QztBQUFBO0FBQUEsU0FDRjtBQUFBLE1BRUo7QUFDQSxhQUNFLDZDQUFDO0FBQUEsUUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLFFBQUc7QUFBQSxPQUV0RDtBQUFBLElBRUo7QUFFQSxXQUNFLDhDQUFDO0FBQUEsTUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLE1BQ25DO0FBQUEsaUJBQ0MsNkNBQUM7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLE9BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLFdBQVcsTUFBTSxTQUFTLElBQUk7QUFBQSxTQUNoQztBQUFBLFFBR0QsZ0JBQWdCLENBQUMsY0FDaEIsOENBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsVUFDcEM7QUFBQSwwREFBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsUUFBUSxVQUFVLE1BQU0sT0FBTztBQUFBLGNBQ3BFO0FBQUEsNkRBQUM7QUFBQSxrQkFBSyxNQUFLO0FBQUEsa0JBQVEsTUFBSztBQUFBLGlCQUFTO0FBQUEsZ0JBQ2pDLDZDQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFdBQVc7QUFBQSxrQkFDcEQsdUJBQWE7QUFBQSxpQkFDaEI7QUFBQSxnQkFDQSw2Q0FBQztBQUFBLGtCQUFNLE1BQUs7QUFBQSxrQkFBUSx1QkFBYSxhQUFhLFNBQVM7QUFBQSxpQkFBRTtBQUFBLGdCQUN6RCw2Q0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsa0JBQ2hELHlCQUFlLGFBQWEsU0FBUztBQUFBLGlCQUN4QztBQUFBO0FBQUEsYUFDRjtBQUFBLFlBQ0EsOENBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsY0FDbkM7QUFBQSw2REFBQztBQUFBLGtCQUFLLFNBQVMsTUFBTSxlQUFlLElBQUk7QUFBQSxrQkFDdEMsdURBQUM7QUFBQSxvQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sT0FBTztBQUFBLG9CQUFHO0FBQUEsbUJBQU87QUFBQSxpQkFDMUQ7QUFBQSxnQkFDQSw2Q0FBQztBQUFBLGtCQUFLLFNBQVM7QUFBQSxrQkFDYix1REFBQztBQUFBLG9CQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxXQUFXO0FBQUEsb0JBQUc7QUFBQSxtQkFBTTtBQUFBLGlCQUM3RDtBQUFBO0FBQUEsYUFDRjtBQUFBO0FBQUEsU0FDRixJQUVBLDhDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ25DO0FBQUEsMkJBQ0MsNkNBQUM7QUFBQSxjQUFLLFNBQVMsTUFBTSxlQUFlLEtBQUs7QUFBQSxjQUN2Qyx1REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsZ0JBQUc7QUFBQSxlQUFjO0FBQUEsYUFDdEU7QUFBQSxZQUVGLDZDQUFDO0FBQUEsY0FDQyxPQUFPLFNBQVMsY0FBYztBQUFBLGNBQzlCLFNBQVE7QUFBQSxjQUNSLFlBQVk7QUFBQSxjQUNaLFNBQVM7QUFBQSxhQUNYO0FBQUEsWUFDQSw2Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUFHO0FBQUEsYUFFdEQ7QUFBQTtBQUFBLFNBQ0Y7QUFBQTtBQUFBLEtBRUo7QUFBQSxFQUVKO0FBRUEsTUFBTyw0QkFBUTs7O0FEdExGLE1BQUFDLHNCQUFBO0FBSGIsV0FBUyxpQkFBaUIsVUFBNkM7QUFDckUsWUFBUSxVQUFVO0FBQUEsTUFDaEIsS0FBSztBQUNILGVBQU8sNkNBQUM7QUFBQSxVQUFNLE1BQUs7QUFBQSxVQUFXO0FBQUEsU0FBUTtBQUFBLE1BQ3hDLEtBQUs7QUFDSCxlQUFPLDZDQUFDO0FBQUEsVUFBTSxNQUFLO0FBQUEsVUFBVTtBQUFBLFNBQU87QUFBQSxNQUN0QyxLQUFLO0FBQ0gsZUFBTyw2Q0FBQztBQUFBLFVBQU0sTUFBSztBQUFBLFVBQVU7QUFBQSxTQUFhO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBRUEsV0FBUyxxQkFBcUIsUUFBMkI7QUFDdkQsWUFBUSxPQUFPLFFBQVE7QUFBQSxNQUNyQixLQUFLO0FBQ0gsZUFBTyw2Q0FBQztBQUFBLFVBQU0sTUFBSztBQUFBLFVBQU87QUFBQSxTQUFXO0FBQUEsTUFDdkMsS0FBSztBQUNILGVBQU8sNkNBQUM7QUFBQSxVQUFNLE1BQUs7QUFBQSxVQUFVO0FBQUEsU0FBYTtBQUFBLE1BQzVDLEtBQUs7QUFDSCxlQUFPLDZDQUFDO0FBQUEsVUFBTSxNQUFLO0FBQUEsVUFBVTtBQUFBLFNBQVE7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFRQSxNQUFNLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxVQUFVLFFBQVEsTUFDaEQsNkNBQUM7QUFBQSxJQUFLO0FBQUEsSUFDSix3REFBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFdBQVcsUUFBUSxTQUFTO0FBQUEsTUFDdkQ7QUFBQSxxREFBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLE9BQU87QUFBQSxVQUMzQztBQUFBLFNBQ0g7QUFBQSxRQUNBLDZDQUFDO0FBQUEsVUFBSyxNQUFNLFdBQVcsY0FBYztBQUFBLFVBQWUsTUFBSztBQUFBLFNBQVM7QUFBQTtBQUFBLEtBQ3BFO0FBQUEsR0FDRjtBQUdGLE1BQU0sZ0JBQWdCLENBQUM7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLE1BQTBCO0FBQ3hCLFVBQU0sY0FBYyxpQkFBaUIsSUFBSSxLQUFLO0FBQzlDLFVBQU0sZ0JBQWdCLGlCQUFpQixJQUFJLE9BQU87QUFDbEQsVUFBTSxnQkFBZ0IsaUJBQWlCLElBQUksT0FBTztBQUNsRCxVQUFNLGVBQWUsaUJBQWlCLElBQUksTUFBTTtBQUloRCxVQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxVQUFNLGtCQUFrQixNQUFNO0FBQzVCLFVBQUk7QUFBYSxvQkFBWTtBQUM3QixtQkFBYSxJQUFJO0FBQ2pCLGlCQUFXLE1BQU0sYUFBYSxLQUFLLEdBQUcsR0FBSTtBQUFBLElBQzVDO0FBRUEsVUFBTSxpQkFBZ0IsdURBQW1CLFlBQVc7QUFDcEQsVUFBTSxjQUFhLHVEQUFtQixZQUFXO0FBQ2pELFVBQU0sY0FBYSx1REFBbUIsWUFBVztBQUVqRCxXQUNFLDhDQUFDO0FBQUEsTUFBSSxLQUFLO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsUUFDVCxjQUFjO0FBQUEsUUFDZCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLE1BQ0U7QUFBQSxzREFBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsUUFBUSxTQUFTO0FBQUEsVUFDckQ7QUFBQSx5REFBQztBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ047QUFBQSxjQUNBLFVBQVU7QUFBQSxjQUNWLFVBQVUsaUJBQWlCLGNBQWM7QUFBQSxjQUN6QyxjQUFZLEtBQUs7QUFBQSxhQUNuQjtBQUFBLFlBQ0EsOENBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxXQUFXLE9BQU8sT0FBTztBQUFBLGNBQ3BEO0FBQUEsOERBQUM7QUFBQSxrQkFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssVUFBVSxRQUFRLFVBQVUsTUFBTSxPQUFPO0FBQUEsa0JBQ3BFO0FBQUEsaUVBQUM7QUFBQSxzQkFBTyxLQUFLO0FBQUEsd0JBQ1gsTUFBTTtBQUFBLHdCQUNOLFlBQVk7QUFBQSx3QkFDWixPQUFPLGdCQUFnQixhQUFhLFVBQVUsY0FBYztBQUFBLHNCQUM5RDtBQUFBLHNCQUNHLGVBQUs7QUFBQSxxQkFDUjtBQUFBLG9CQUNDLHFCQUFxQixxQkFBcUIsaUJBQWlCO0FBQUEsb0JBQzNELGlCQUFpQixLQUFLLFFBQVE7QUFBQTtBQUFBLGlCQUNqQztBQUFBLGdCQUNDLHFCQUNDLDZDQUFDO0FBQUEsa0JBQU8sS0FBSztBQUFBLG9CQUNYLE1BQU07QUFBQSxvQkFDTixPQUFPLGFBQWEsY0FBYztBQUFBLGtCQUNwQztBQUFBLGtCQUNHLDRCQUFrQjtBQUFBLGlCQUNyQjtBQUFBLGdCQUVGLDhDQUFDO0FBQUEsa0JBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsTUFBTSxPQUFPO0FBQUEsa0JBQ2pEO0FBQUEsaUVBQUM7QUFBQSxzQkFDQyxPQUFNO0FBQUEsc0JBQ04sVUFBVTtBQUFBLHNCQUNWLFNBQVMsTUFBTSxnQkFBZ0IsS0FBSztBQUFBLHFCQUN0QztBQUFBLHFCQUNFLEtBQUssaUJBQWlCLHNCQUN0Qiw2Q0FBQztBQUFBLHNCQUNDLE9BQU8sb0JBQW9CLFlBQVk7QUFBQSxzQkFDdkMsVUFBVTtBQUFBLHNCQUNWLFNBQVMsTUFBTSxnQkFBZ0IsT0FBTztBQUFBLHFCQUN4QztBQUFBLG9CQUVELEtBQUssa0JBQWtCLENBQUMsWUFDdkIsNkNBQUM7QUFBQSxzQkFDQyxPQUFPLFFBQVEsZUFBZTtBQUFBLHNCQUM5QixVQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNLGdCQUFnQixPQUFPO0FBQUEscUJBQ3hDLElBQ0UsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsWUFDcEM7QUFBQSxzQkFDRTtBQUFBLHFFQUFDO0FBQUEsMEJBQ0MsT0FBTyxRQUFRLGVBQWU7QUFBQSwwQkFDOUIsVUFBVTtBQUFBLDBCQUNWLFNBQVMsTUFBTSxnQkFBZ0IsT0FBTztBQUFBLHlCQUN4QztBQUFBLHdCQUNBLDZDQUFDO0FBQUEsMEJBQ0MsT0FBTyxlQUFlLGFBQWEsWUFBWTtBQUFBLDBCQUMvQyxVQUFVO0FBQUEsMEJBQ1YsU0FBUyxNQUFNLGdCQUFnQixNQUFNO0FBQUEseUJBQ3ZDO0FBQUE7QUFBQSxxQkFDRixJQUNFO0FBQUEsb0JBQ0gsYUFBYSxnQkFDWiw2Q0FBQztBQUFBLHNCQUNDLE9BQU8sYUFBYTtBQUFBLHNCQUNwQixVQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNLGdCQUFnQixNQUFNO0FBQUEscUJBQ3ZDO0FBQUE7QUFBQSxpQkFFSjtBQUFBO0FBQUEsYUFDRjtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBRUMsZUFDQyw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFlBQVksVUFBVSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQUEsVUFDeEUsdURBQUM7QUFBQSxZQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsWUFDaEQsZUFBSztBQUFBLFdBQ1I7QUFBQSxTQUNGO0FBQUEsUUFHRCxrQkFBa0IsS0FBSyxpQkFBaUIsc0JBQ3ZDLDZDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsWUFBWSxVQUFVLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFBQSxVQUN4RSx1REFBQztBQUFBLFlBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLGFBQWEsY0FBYyxZQUFZO0FBQUEsWUFDM0UsOEJBQ0csa0JBQWtCLFdBQ2xCLEtBQUs7QUFBQSxXQUNYO0FBQUEsU0FDRjtBQUFBLFFBR0QsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsYUFDbkMsOENBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxZQUFZLFVBQVUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQzFEO0FBQUEseURBQUM7QUFBQSxjQUNDLE9BQU8sS0FBSyxpQkFBaUIsMEJBQTBCO0FBQUEsY0FDdkQsYUFDRSxLQUFLLGlCQUNELGlFQUNBO0FBQUEsY0FFTixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxjQUFjLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDN0MsTUFBTTtBQUFBLGFBQ1I7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxRQUFRLFNBQVM7QUFBQSxjQUNwRDtBQUFBLCtCQUNDLDZDQUFDO0FBQUEsa0JBQU8sTUFBSztBQUFBLGtCQUFZLE1BQUs7QUFBQSxrQkFBUSxTQUFTO0FBQUEsa0JBQWlCO0FBQUEsaUJBRWhFO0FBQUEsZ0JBRUQsYUFDQyw2Q0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxVQUFVO0FBQUEsa0JBQUc7QUFBQSxpQkFFcEQ7QUFBQTtBQUFBLGFBRUo7QUFBQSxZQUNDLEtBQUssa0JBQ0osNkNBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsY0FBRztBQUFBLGFBRXREO0FBQUE7QUFBQSxTQUVKO0FBQUEsUUFHRCxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLGtCQUN2Qyw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFlBQVksU0FBUztBQUFBLFVBQy9CLHVEQUFDO0FBQUEsWUFDQztBQUFBLFlBQ0Esa0JBQWtCLEtBQUs7QUFBQSxZQUN2QjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFdBQ0Y7QUFBQSxTQUNGO0FBQUE7QUFBQSxLQUVKO0FBQUEsRUFFSjtBQUVBLE1BQU8sd0JBQVE7OztBSENQLE1BQUFDLHVCQUFBO0FBN05SLE1BQU0saUJBQXNELENBQUMsYUFBYSxlQUFlLGFBQWE7QUFFdEcsTUFBTSxrQkFBcUU7QUFBQSxJQUN6RSxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsRUFDZjtBQVFBLFdBQVMsa0JBQ1AsT0FDQSxTQUNnQjtBQUNoQixVQUFNLFFBQXdCLENBQUM7QUFDL0IsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxLQUFLLFFBQVE7QUFDbkIsWUFBTSxTQUFTLHFCQUFxQixNQUFNLE9BQU87QUFDakQsV0FBSSxpQ0FBUSxZQUFXLFlBQVk7QUFDakMsY0FBTSxLQUFLLFFBQVE7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFDQSxRQUFJLFFBQVEsaUJBQWlCO0FBQzNCLGlCQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssT0FBTyxRQUFRLFFBQVEsZUFBZSxHQUFHO0FBQ2xFLFlBQUksT0FBTyxPQUFPO0FBQ2hCLGdCQUFNLE9BQU87QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxTQUFTLFVBQVUsU0FBUyxVQUFVLGVBQWUsVUFBVSxNQUE4QjtBQTlEMUg7QUErREUsVUFBTSxTQUFRLDBDQUFVLHVCQUFWLFlBQWdDLENBQUM7QUFDL0MsVUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSTtBQUFBLE1BQXlCLE1BQ25FLGtCQUFrQixPQUFPLE9BQU87QUFBQSxJQUNsQztBQUNBLFVBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSTtBQUFBLE1BQ2xDLE1BQUc7QUFwRVAsWUFBQUM7QUFvRVUsZ0JBQUFBLE1BQUEsUUFBUSxvQkFBUixPQUFBQSxNQUEyQixDQUFDO0FBQUE7QUFBQSxJQUNwQztBQUlBLFVBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUk7QUFBQSxNQUM5QyxNQUFNO0FBQ0osY0FBTSxVQUFVLG9CQUFJLElBQWtDO0FBQ3RELG1CQUFXLFFBQVEsT0FBTztBQUN4QixjQUFJLEtBQUssZ0JBQWdCO0FBQ3ZCLG9CQUFRLElBQUksS0FBSyxNQUFNLG9CQUFJLElBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFBQSxVQUM1RDtBQUFBLFFBQ0Y7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSxVQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQThDLENBQUMsQ0FBQztBQUNwRixVQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEtBQUs7QUFHaEUsVUFBTSwwQkFBc0Isc0JBQTZDLElBQUk7QUFDN0UsVUFBTSxzQkFBa0Isc0JBQTZDLElBQUk7QUFDekUsVUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUdyQixpQ0FBVSxNQUFNO0FBOUZsQixVQUFBQTtBQStGSSxZQUFNLGdCQUFnQixrQkFBa0IsT0FBTyxPQUFPO0FBQ3RELHdCQUFrQixhQUFhO0FBQy9CLHlCQUFtQixVQUFVO0FBQzdCLFlBQU0sYUFBWUEsTUFBQSxRQUFRLG9CQUFSLE9BQUFBLE1BQTJCLENBQUM7QUFDOUMsb0JBQWMsU0FBUztBQUN2QixxQkFBZSxVQUFVO0FBRXpCLFlBQU0sZUFBZSxvQkFBSSxJQUFrQztBQUMzRCxpQkFBVyxRQUFRLE9BQU87QUFDeEIsWUFBSSxLQUFLLGdCQUFnQjtBQUN2Qix1QkFBYSxJQUFJLEtBQUssTUFBTSxvQkFBSSxJQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQUEsUUFDakU7QUFBQSxNQUNGO0FBQ0EsMEJBQW9CLFlBQVk7QUFBQSxJQUNsQyxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsaUJBQWlCLFFBQVEsaUJBQWlCLHFDQUFVLFdBQVcsQ0FBQztBQUd4RixpQ0FBVSxNQUFNO0FBQ2QsWUFBTSxhQUFhLE1BQVk7QUFDN0IsWUFBSTtBQUNGLGdCQUFNLFNBQVMsTUFBTTtBQUFBLFlBQ25CLGlCQUFpQixRQUFRO0FBQUEsWUFDekIsV0FBVztBQUFBLFVBQ2I7QUFDQSxnQkFBTSxVQUErQyxDQUFDO0FBQ3RELHFCQUFXLFFBQVEsT0FBTyxNQUFNO0FBQzlCLG9CQUFRLEtBQUssc0JBQXNCO0FBQUEsVUFDckM7QUFDQSx3QkFBYyxPQUFPO0FBQUEsUUFDdkIsU0FBUyxLQUFQO0FBQ0Esa0JBQVEsTUFBTSxtQ0FBbUMsR0FBRztBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUNBLGlCQUFXO0FBQUEsSUFDYixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFJZixVQUFNLHlCQUFxQixzQkFBdUIsQ0FBQyxDQUFDO0FBRXBELFVBQU0sdUJBQW1CLDJCQUFZLENBQUMsYUFBNkI7QUFDakUseUJBQW1CLFVBQVU7QUFDN0IsVUFBSSxvQkFBb0IsU0FBUztBQUMvQixxQkFBYSxvQkFBb0IsT0FBTztBQUFBLE1BQzFDO0FBQ0EsMEJBQW9CLFVBQVUsV0FBVyxNQUFNO0FBQzdDLHFCQUFhLGlCQUFpQixRQUFRLE1BQU0sV0FBVyxTQUFTO0FBQUEsVUFDOUQsaUJBQWlCLG1CQUFtQjtBQUFBLFFBQ3RDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQixrQkFBUSxNQUFNLG1DQUFtQyxHQUFHO0FBQUEsUUFDdEQsQ0FBQztBQUFBLE1BQ0gsR0FBRyxHQUFHO0FBQUEsSUFDUixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFLZixVQUFNLHFCQUFpQixzQkFBbUIsQ0FBQyxDQUFDO0FBRTVDLFVBQU0saUJBQWEsMkJBQVksTUFBTTtBQUNuQyxVQUFJLGdCQUFnQixTQUFTO0FBQzNCLHFCQUFhLGdCQUFnQixPQUFPO0FBQ3BDLHdCQUFnQixVQUFVO0FBQUEsTUFDNUI7QUFDQSxtQkFBYSxpQkFBaUIsUUFBUSxNQUFNLFdBQVcsU0FBUztBQUFBLFFBQzlELGlCQUFpQixlQUFlO0FBQUEsTUFDbEMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRO0FBQ2hCLGdCQUFRLE1BQU0sbUNBQW1DLEdBQUc7QUFBQSxNQUN0RCxDQUFDO0FBQUEsSUFDSCxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFZixVQUFNLG1CQUFlLDJCQUFZLENBQUMsYUFBeUI7QUFDekQscUJBQWUsVUFBVTtBQUl6QixVQUFJLGdCQUFnQixTQUFTO0FBQzNCLHFCQUFhLGdCQUFnQixPQUFPO0FBQ3BDLHdCQUFnQixVQUFVO0FBQUEsTUFDNUI7QUFDQSxtQkFBYSxpQkFBaUIsUUFBUSxNQUFNLFdBQVcsU0FBUztBQUFBLFFBQzlELGlCQUFpQjtBQUFBLE1BQ25CLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQixnQkFBUSxNQUFNLG1DQUFtQyxHQUFHO0FBQUEsTUFDdEQsQ0FBQztBQUFBLElBQ0gsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBS2YsaUNBQVUsTUFBTTtBQUNkLGFBQU8sTUFBTTtBQUNYLFlBQUksZ0JBQWdCLFNBQVM7QUFDM0IsdUJBQWEsZ0JBQWdCLE9BQU87QUFDcEMsMEJBQWdCLFVBQVU7QUFDMUIsdUJBQWEsaUJBQWlCLFFBQVEsTUFBTSxXQUFXLFNBQVM7QUFBQSxZQUM5RCxpQkFBaUIsZUFBZTtBQUFBLFVBQ2xDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQixvQkFBUSxNQUFNLCtDQUErQyxHQUFHO0FBQUEsVUFDbEUsQ0FBQztBQUFBLFFBQ0g7QUFDQSxZQUFJLG9CQUFvQixTQUFTO0FBQy9CLHVCQUFhLG9CQUFvQixPQUFPO0FBQ3hDLDhCQUFvQixVQUFVO0FBQzlCLHVCQUFhLGlCQUFpQixRQUFRLE1BQU0sV0FBVyxTQUFTO0FBQUEsWUFDOUQsaUJBQWlCLG1CQUFtQjtBQUFBLFVBQ3RDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQixvQkFBUSxNQUFNLCtDQUErQyxHQUFHO0FBQUEsVUFDbEUsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFFRixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFZixVQUFNLG1CQUFlLDJCQUFZLENBQUMsYUFBcUI7QUFDckQsd0JBQWtCLENBQUMsU0FBUztBQUMxQixjQUFNLFdBQVcsaUNBQUssT0FBTCxFQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssVUFBVTtBQUN4RCx5QkFBaUIsUUFBUTtBQUN6QixlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSCxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsVUFBTSx3QkFBb0IsMkJBQVksQ0FBQyxVQUFrQixVQUFrQjtBQUN6RSxvQkFBYyxDQUFDLFNBQVM7QUFDdEIsY0FBTSxXQUFXLGlDQUFLLE9BQUwsRUFBVyxDQUFDLFdBQVcsTUFBTTtBQUM5QyxxQkFBYSxRQUFRO0FBQ3JCLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsVUFBTSx1QkFBbUIsMkJBQVksQ0FBQyxVQUFrQixTQUE4QjtBQUNwRixvQkFBYyxDQUFDLFNBQVUsaUNBQUssT0FBTCxFQUFXLENBQUMsV0FBVyxLQUFLLEVBQUU7QUFBQSxJQUN6RCxHQUFHLENBQUMsQ0FBQztBQUVMLFVBQU0sMEJBQXNCLDJCQUFZLENBQUMsVUFBa0IsWUFBNkI7QUFDdEYsMEJBQW9CLENBQUMsU0FBUztBQXRPbEMsWUFBQUE7QUF1T00sY0FBTSxPQUFPLElBQUksSUFBSSxJQUFJO0FBQ3pCLGNBQU0sV0FBVyxJQUFJLEtBQUlBLE1BQUEsS0FBSyxJQUFJLFFBQVEsTUFBakIsT0FBQUEsTUFBc0IsQ0FBQyxDQUFDO0FBQ2pELFlBQUksU0FBUyxJQUFJLE9BQU8sR0FBRztBQUN6QixtQkFBUyxPQUFPLE9BQU87QUFBQSxRQUN6QixPQUFPO0FBQ0wsbUJBQVMsSUFBSSxPQUFPO0FBQUEsUUFDdEI7QUFDQSxhQUFLLElBQUksVUFBVSxRQUFRO0FBQzNCLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQyxDQUFDO0FBR0wsUUFBSSxDQUFDLFlBQVksTUFBTSxXQUFXLEdBQUc7QUFDbkMsYUFDRSw4Q0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsU0FBUztBQUFBLFFBQzVCLHdEQUFDO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixhQUFZO0FBQUEsU0FDZDtBQUFBLE9BQ0Y7QUFBQSxJQUVKO0FBR0EsVUFBTSxtQkFBbUIsWUFBWSxDQUFDO0FBQ3RDLFFBQUksZUFBZTtBQUNuQixRQUFJLGtCQUFrQjtBQUNwQixxQkFBZSxNQUNaLE9BQU8sQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQ3ZDLEtBQUssQ0FBQyxHQUFHLE1BQUc7QUF0UW5CLFlBQUFBLEtBQUE7QUFzUXVCLGlCQUFBQSxNQUFBLEVBQUUsa0JBQUYsT0FBQUEsTUFBbUIsU0FBUSxPQUFFLGtCQUFGLFlBQW1CO0FBQUEsT0FBSTtBQUFBLElBQ3ZFO0FBR0EsVUFBTSxVQUFVLGVBQWUsSUFBSSxDQUFDLGNBQWM7QUFBQSxNQUNoRDtBQUFBLE1BQ0EsT0FBTyxnQkFBZ0I7QUFBQSxNQUN2QixPQUFPLGFBQWEsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLFFBQVE7QUFBQSxJQUNqRSxFQUFFLEVBQUUsT0FBTyxDQUFDLFVBQVUsTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUc1QyxVQUFNLGFBQWEsTUFBTTtBQUN6QixVQUFNLGlCQUFpQixNQUFNLE9BQU8sQ0FBQyxTQUFTLGVBQWUsS0FBSyxLQUFLLEVBQUU7QUFFekUsV0FDRSwrQ0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFDckQ7QUFBQSxvQkFDQyw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFNBQ2QsSUFFQSw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFNBQ2Q7QUFBQSxRQUdGLDhDQUFDO0FBQUEsVUFBa0IsV0FBVztBQUFBLFVBQWdCLE9BQU87QUFBQSxTQUFZO0FBQUEsUUFFaEUsWUFDQywrQ0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNwQztBQUFBLDBEQUFDO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxPQUFPLEdBQUcsb0JBQW9CLGtCQUFrQixJQUFJLEtBQUs7QUFBQSxjQUN6RCxhQUFhLG9CQUNULGdDQUNBO0FBQUEsYUFDTjtBQUFBLFlBQ0EsOENBQUM7QUFBQSxjQUFLLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQyxpQkFBaUI7QUFBQSxjQUMxRCx3REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxPQUFPO0FBQUEsZ0JBQzNDLDhCQUFvQix5QkFBeUI7QUFBQSxlQUNoRDtBQUFBLGFBQ0Y7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdELFFBQVEsSUFBSSxDQUFDLEVBQUUsVUFBVSxPQUFPLE9BQU8sV0FBVyxHQUFHLGVBQ3BELCtDQUFDO0FBQUEsVUFBbUIsS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxVQUNqRDtBQUFBLHlCQUFhLEtBQUssOENBQUMsdUJBQVE7QUFBQSxZQUM1Qiw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFFBQVEsT0FBTyxhQUFhLGVBQWUsWUFBWTtBQUFBLGNBQ2hHO0FBQUEsYUFDSDtBQUFBLFlBQ0MsV0FBVyxJQUFJLENBQUMsU0FBUztBQTdUcEMsa0JBQUFBLEtBQUE7QUE4VFksb0JBQU0sZUFBZSxxQkFBcUIsTUFBTSxPQUFPO0FBQ3ZELHFCQUNFLDhDQUFDO0FBQUEsZ0JBRUM7QUFBQSxnQkFDQSxTQUFTLENBQUMsQ0FBQyxlQUFlLEtBQUs7QUFBQSxnQkFDL0IsbUJBQW1CLHNDQUFnQjtBQUFBLGdCQUNuQyxtQkFBa0JBLE1BQUEsaUJBQWlCLElBQUksS0FBSyxJQUFJLE1BQTlCLE9BQUFBLE1BQW1DLG9CQUFJLElBQUk7QUFBQSxnQkFDN0QsUUFBTyxnQkFBVyxLQUFLLFVBQWhCLFlBQXlCO0FBQUEsZ0JBQ2hDLGVBQWMsZ0JBQVcsS0FBSyxVQUFoQixZQUF5QjtBQUFBLGdCQUN2QyxXQUFXLFFBQVE7QUFBQSxnQkFDbkIsU0FBUyxXQUFXO0FBQUEsZ0JBQ3BCLFVBQVUsTUFBTSxhQUFhLEtBQUssSUFBSTtBQUFBLGdCQUN0QyxpQkFBaUIsQ0FBQyxZQUFZLG9CQUFvQixLQUFLLE1BQU0sT0FBTztBQUFBLGdCQUNwRSxlQUFlLENBQUMsVUFBVSxrQkFBa0IsS0FBSyxNQUFNLEtBQUs7QUFBQSxnQkFDNUQsYUFBYTtBQUFBLGdCQUNiLGNBQWMsQ0FBQyxTQUFTLGlCQUFpQixLQUFLLE1BQU0sSUFBSTtBQUFBLGdCQUN4RDtBQUFBLGlCQWRLLEtBQUssSUFlWjtBQUFBLFlBRUosQ0FBQztBQUFBO0FBQUEsV0ExQk8sUUEyQlYsQ0FDRDtBQUFBLFFBRUQsOENBQUMsdUJBQVE7QUFBQSxRQUVULDhDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sV0FBVztBQUFBLFVBQUc7QUFBQSxTQUVyRDtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLDRCQUFROzs7QUsvVmYsTUFBQUMsZ0JBQXlEOzs7QUNzQmxELE1BQU0sa0JBQWtCO0FBQ3hCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sdUJBQXVCOzs7QUN4QnBDLE1BQUFDLGdCQUF5QjtBQUN6QixNQUFBQyxjQVNPO0FBNEVELE1BQUFDLHVCQUFBO0FBOUROLE1BQU0seUJBQXlCLENBQUM7QUFBQSxJQUM5QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixNQUFtQztBQS9CbkM7QUFnQ0UsVUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHdCQUFTLEVBQUU7QUFFM0MsVUFBTSxZQUFZLGtCQUFrQjtBQUNwQyxVQUFNLGVBQWUsYUFBYTtBQUdsQyxVQUFNLGFBQWEsb0JBQUksSUFBMEI7QUFDakQsZUFBVyxRQUFRLGVBQWU7QUFDaEMsaUJBQVcsSUFBSSxLQUFLLG9CQUFvQixJQUFJO0FBQUEsSUFDOUM7QUFRQSxVQUFNLGtCQUFpQixhQUFRLG9CQUFSLFlBQTJCLENBQUM7QUFDbkQsVUFBTSxrQkFBaUIsMENBQVUsdUJBQVYsWUFBZ0MsQ0FBQztBQUN4RCxVQUFNLGVBQWUsZUFBZSxJQUFJLENBQUMsU0FBUztBQW5EcEQsVUFBQUM7QUFvREksWUFBTSxjQUFjLFdBQVcsSUFBSSxLQUFLLElBQUk7QUFDNUMsWUFBTSxjQUFjLHFCQUFxQixNQUFNLE9BQU87QUFDdEQsWUFBTSxjQUFhLDJDQUFhLFlBQVc7QUFDM0MsWUFBTSxrQkFBa0IsQ0FBQyxHQUFFQSxNQUFBLGVBQWUsS0FBSyxVQUFwQixnQkFBQUEsSUFBMkI7QUFDdEQsWUFBTSxrQkFBa0IsQ0FBQyxDQUFDLEtBQUs7QUFDL0IsWUFBTSxZQUFZLENBQUMsQ0FBQyxlQUFlLGNBQWM7QUFDakQsVUFBSTtBQUNKLFVBQUksYUFBYTtBQUNmLHNCQUFjO0FBQUEsTUFDaEIsV0FBVyxZQUFZO0FBQ3JCLHNCQUFjO0FBQUEsTUFDaEIsV0FBVyxpQkFBaUI7QUFDMUIsc0JBQWMsa0JBQWtCLGdCQUFnQjtBQUFBLE1BQ2xELE9BQU87QUFDTCxzQkFBYztBQUFBLE1BQ2hCO0FBQ0EsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0saUJBQWlCLGFBQWEsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7QUFDL0QsVUFBTSxhQUFhLGFBQWE7QUFDaEMsVUFBTSxnQkFBZ0IsbUJBQW1CO0FBRXpDLFdBQ0UsK0NBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLE1BRXREO0FBQUEsdURBQUM7QUFBQSxVQUNDLEtBQUs7QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLGlCQUFpQjtBQUFBLFlBQ2pCLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxVQUNoQjtBQUFBLFVBRUE7QUFBQSwwREFBQztBQUFBLGNBQU0sTUFBSztBQUFBLGNBQU87QUFBQSxhQUFRO0FBQUEsWUFDM0IsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsY0FBRztBQUFBLGFBRTFEO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLFlBQVk7QUFBQSxjQUFHO0FBQUEsYUFJbkQ7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdDLFdBQ0MsK0NBQUM7QUFBQSxVQUNDLEtBQUs7QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLGlCQUFpQjtBQUFBLFlBQ2pCLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxVQUNoQjtBQUFBLFVBRUE7QUFBQSwyREFBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxZQUFZLGlCQUFpQixRQUFRLFNBQVM7QUFBQSxjQUNwRTtBQUFBLDhEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sY0FBYyxZQUFZLFdBQVc7QUFBQSxrQkFBRztBQUFBLGlCQUU3RDtBQUFBLGdCQUNBLCtDQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxrQkFDaEQ7QUFBQTtBQUFBLG9CQUFlO0FBQUEsb0JBQUs7QUFBQSxvQkFBVztBQUFBO0FBQUEsaUJBQ2xDO0FBQUE7QUFBQSxhQUNGO0FBQUEsWUFFQyxpQkFDQyw4Q0FBQztBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsT0FBTTtBQUFBLGNBQ04sYUFBWTtBQUFBLGFBQ2Q7QUFBQSxZQUdGLDhDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssRUFBRTtBQUFBLGNBQzVCLHVCQUFhLElBQUksQ0FBQyxFQUFFLE1BQU0sVUFBVSxHQUFHLFVBQVU7QUFDaEQsc0JBQU0sVUFBVSxVQUFVO0FBQzFCLHVCQUNFLCtDQUFDO0FBQUEsa0JBQW9CLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQUEsa0JBQzVDO0FBQUEscUJBQUMsV0FBVyw4Q0FBQyx1QkFBUTtBQUFBLG9CQUN0QiwrQ0FBQztBQUFBLHNCQUNDLEtBQUs7QUFBQSx3QkFDSCxPQUFPO0FBQUEsd0JBQ1AsS0FBSztBQUFBLHdCQUNMLFFBQVE7QUFBQSx3QkFDUixZQUFZO0FBQUEsd0JBQ1osVUFBVTtBQUFBLHNCQUNaO0FBQUEsc0JBRUE7QUFBQSx1RUFBQztBQUFBLDBCQUNDLEtBQUs7QUFBQSw0QkFDSCxPQUFPO0FBQUEsNEJBQ1AsS0FBSztBQUFBLDRCQUNMLFFBQVE7QUFBQSw0QkFDUixPQUFPO0FBQUEsMEJBQ1Q7QUFBQSwwQkFFQTtBQUFBLDBFQUFDO0FBQUEsOEJBQ0MsS0FBSztBQUFBLGdDQUNILE1BQU07QUFBQSxnQ0FDTixPQUFPLFlBQVksWUFBWTtBQUFBLDhCQUNqQztBQUFBLDhCQUVDLHNCQUFZLFdBQVc7QUFBQSw2QkFDMUI7QUFBQSw0QkFDQSw4Q0FBQztBQUFBLDhCQUNDLEtBQUs7QUFBQSxnQ0FDSCxNQUFNO0FBQUEsZ0NBQ04sT0FBTyxZQUFZLFlBQVk7QUFBQSw4QkFDakM7QUFBQSw4QkFFQyxlQUFLO0FBQUEsNkJBQ1I7QUFBQTtBQUFBLHlCQUNGO0FBQUEsd0JBQ0EsOENBQUM7QUFBQSwwQkFDQyxLQUFLO0FBQUEsNEJBQ0gsTUFBTTtBQUFBLDRCQUNOLFlBQVk7QUFBQSw0QkFDWixPQUFPLFlBQVksWUFBWTtBQUFBLDBCQUNqQztBQUFBLDBCQUVDLHVCQUFhLE9BQU87QUFBQSx5QkFDdkI7QUFBQTtBQUFBLHFCQUNGO0FBQUE7QUFBQSxtQkE3Q1EsS0FBSyxJQThDZjtBQUFBLGNBRUosQ0FBQztBQUFBLGFBQ0g7QUFBQSxZQUVBLDhDQUFDO0FBQUEsY0FBSyxTQUFTO0FBQUEsY0FDYix3REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxPQUFPO0FBQUEsZ0JBQzNDO0FBQUEsZUFDSDtBQUFBLGFBQ0Y7QUFBQTtBQUFBLFNBQ0YsSUFFQSw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFNBQ2Q7QUFBQSxRQUlGLCtDQUFDO0FBQUEsVUFDQyxLQUFLO0FBQUEsWUFDSCxPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxpQkFBaUI7QUFBQSxZQUNqQixTQUFTO0FBQUEsWUFDVCxjQUFjO0FBQUEsVUFDaEI7QUFBQSxVQUVBO0FBQUEsMERBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLGNBQWMsWUFBWSxXQUFXO0FBQUEsY0FBRztBQUFBLGFBRTdEO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUFHO0FBQUEsYUFFdEQ7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixhQUFZO0FBQUEsY0FDWixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxZQUFZLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDM0MsTUFBTTtBQUFBLGFBQ1I7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdDLGVBQ0MsOENBQUM7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLE9BQU07QUFBQSxVQUNOLGFBQWEscUJBQXFCO0FBQUEsU0FDcEMsSUFFQSwrQ0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsUUFBUSxVQUFVLFlBQVksZ0JBQWdCO0FBQUEsVUFDbkY7QUFBQSwwREFBQztBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsU0FBUyxNQUFNLFdBQVcsUUFBUTtBQUFBLGNBQ25DO0FBQUEsYUFFRDtBQUFBLFlBQ0EsK0NBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsY0FDaEQ7QUFBQTtBQUFBLGdCQUFVO0FBQUEsZ0JBQUs7QUFBQSxnQkFBZ0I7QUFBQSxnQkFBWSxjQUFjLElBQUksS0FBSztBQUFBLGdCQUFJO0FBQUE7QUFBQSxhQUN6RTtBQUFBO0FBQUEsU0FDRjtBQUFBO0FBQUEsS0FFSjtBQUFBLEVBRUo7QUFFQSxNQUFPLGlDQUFROzs7QUM1UGYsTUFBQUMsY0FBNEM7QUFvQnBDLE1BQUFDLHVCQUFBO0FBYlIsTUFBTSxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsTUFBZ0M7QUFDckUsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFDdEQseURBQUM7QUFBQSxRQUNDLEtBQUs7QUFBQSxVQUNILE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLGlCQUFpQjtBQUFBLFVBQ2pCLFNBQVM7QUFBQSxVQUNULGNBQWM7QUFBQSxRQUNoQjtBQUFBLFFBRUE7QUFBQSx3REFBQztBQUFBLFlBQU0sTUFBSztBQUFBLFlBQU87QUFBQSxXQUFRO0FBQUEsVUFDM0IsOENBQUM7QUFBQSxZQUFRLE1BQUs7QUFBQSxXQUFRO0FBQUEsVUFDdEIsOENBQUM7QUFBQSxZQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsWUFBRztBQUFBLFdBRTFEO0FBQUEsVUFDQSwrQ0FBQztBQUFBLFlBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLFlBQVk7QUFBQSxZQUFHO0FBQUE7QUFBQSxjQUNzQjtBQUFBLGNBQ3RFLFFBQVE7QUFBQSxjQUFRO0FBQUEsY0FBYyxRQUFRO0FBQUEsY0FBWTtBQUFBO0FBQUEsV0FFckQ7QUFBQTtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sOEJBQVE7OztBQ25DZixNQUFBQyxnQkFBeUI7QUFDekIsTUFBQUMsY0FVTztBQXlERyxNQUFBQyx1QkFBQTtBQTNDVixNQUFNLGtCQUFrQixDQUFDO0FBQUEsSUFDdkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixNQUE0QjtBQUMxQixVQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFTLEtBQUs7QUFDOUQsVUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHdCQUFTLEVBQUU7QUFFM0MsVUFBTSxZQUFZLGtCQUFrQjtBQUNwQyxVQUFNLGVBQWUsYUFBYTtBQUNsQyxVQUFNLFdBQVcsb0JBQW9CO0FBRXJDLFVBQU0sd0JBQXdCLE1BQU07QUFDbEMsVUFBSSxVQUFVO0FBQ1osNEJBQW9CLElBQUk7QUFBQSxNQUMxQixPQUFPO0FBQ0wscUJBQWEsUUFBUTtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUVBLFVBQU0sMEJBQTBCLE1BQU07QUFDcEMsMEJBQW9CLEtBQUs7QUFDekIsbUJBQWEsUUFBUTtBQUFBLElBQ3ZCO0FBRUEsV0FDRSwrQ0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFFdEQ7QUFBQSx1REFBQztBQUFBLFVBQ0MsS0FBSztBQUFBLFlBQ0gsT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFlBQ0wsaUJBQWlCO0FBQUEsWUFDakIsU0FBUztBQUFBLFlBQ1QsY0FBYztBQUFBLFVBQ2hCO0FBQUEsVUFFQTtBQUFBLDJEQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLFlBQVksaUJBQWlCLFFBQVEsU0FBUztBQUFBLGNBQ3BFO0FBQUEsOERBQUM7QUFBQSxrQkFBTSxNQUFLO0FBQUEsa0JBQU87QUFBQSxpQkFBUTtBQUFBLGdCQUMzQiwrQ0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsa0JBQUc7QUFBQTtBQUFBLG9CQUN4QztBQUFBLG9CQUFpQjtBQUFBLG9CQUFLO0FBQUE7QUFBQSxpQkFDcEM7QUFBQTtBQUFBLGFBQ0Y7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksV0FBVztBQUFBLGNBQUc7QUFBQSxhQUUxRDtBQUFBLFlBQ0EsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxZQUFZO0FBQUEsY0FBRztBQUFBLGFBR25EO0FBQUE7QUFBQSxTQUNGO0FBQUEsUUFHQyxZQUFZLFNBQVMsS0FDcEIsOENBQUM7QUFBQSxVQUNDLHdEQUFDO0FBQUEsWUFDQyxPQUFNO0FBQUEsWUFDTixVQUFVLEdBQUcsWUFBWSxpQkFBaUIsWUFBWSxXQUFXLElBQUksS0FBSztBQUFBLFlBQzFFLGFBQVc7QUFBQSxZQUVYLHdEQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLGNBQ25DLHNCQUFZLElBQUksQ0FBQyxZQUFZLFVBQzVCLCtDQUFDO0FBQUEsZ0JBQWdCLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsZ0JBQ2hEO0FBQUEsZ0VBQUM7QUFBQSxvQkFDQyxLQUFLO0FBQUEsc0JBQ0gsTUFBTTtBQUFBLHNCQUNOLFlBQVk7QUFBQSxzQkFDWixPQUFPO0FBQUEsc0JBQ1AsZUFBZTtBQUFBLG9CQUNqQjtBQUFBLG9CQUVDLHFCQUFXO0FBQUEsbUJBQ2Q7QUFBQSxrQkFDQSw4Q0FBQztBQUFBLG9CQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxPQUFPO0FBQUEsb0JBQzNDLHFCQUFXO0FBQUEsbUJBQ2Q7QUFBQTtBQUFBLGlCQWJRLEtBY1YsQ0FDRDtBQUFBLGFBQ0g7QUFBQSxXQUNGO0FBQUEsU0FDRjtBQUFBLFFBSUYsK0NBQUM7QUFBQSxVQUNDLEtBQUs7QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLGlCQUFpQjtBQUFBLFlBQ2pCLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxVQUNoQjtBQUFBLFVBRUE7QUFBQSwyREFBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxZQUFZLGlCQUFpQixRQUFRLFNBQVM7QUFBQSxjQUNwRTtBQUFBLDhEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sY0FBYyxZQUFZLFdBQVc7QUFBQSxrQkFDdkQsc0JBQVksd0JBQXdCO0FBQUEsaUJBQ3ZDO0FBQUEsZ0JBQ0MsQ0FBQyxhQUFhLFlBQ2IsK0NBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sVUFBVTtBQUFBLGtCQUM5QztBQUFBO0FBQUEsb0JBQVM7QUFBQTtBQUFBLGlCQUNaO0FBQUE7QUFBQSxhQUVKO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUNoRCxzQkFDRyxrRUFDQTtBQUFBLGFBQ047QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxhQUFhLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDNUMsTUFBTTtBQUFBLGNBQ04sVUFBVTtBQUFBLGFBQ1o7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdDLENBQUMsYUFBYSxvQkFDYiw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sU0FDRSwrQ0FBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxZQUNuQztBQUFBLDREQUFDO0FBQUEsZ0JBQU8sTUFBSztBQUFBLGdCQUFjLFNBQVM7QUFBQSxnQkFBeUI7QUFBQSxlQUU3RDtBQUFBLGNBQ0EsOENBQUM7QUFBQSxnQkFBTyxTQUFTLE1BQU0sb0JBQW9CLEtBQUs7QUFBQSxnQkFBRztBQUFBLGVBRW5EO0FBQUE7QUFBQSxXQUNGO0FBQUEsU0FFSjtBQUFBLFFBSUQsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsb0JBQy9CLCtDQUFDO0FBQUEsVUFDQyxLQUFLO0FBQUEsWUFDSCxPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxpQkFBaUI7QUFBQSxZQUNqQixTQUFTO0FBQUEsWUFDVCxjQUFjO0FBQUEsVUFDaEI7QUFBQSxVQUVBO0FBQUEsMERBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLGNBQWMsWUFBWSxXQUFXO0FBQUEsY0FBRztBQUFBLGFBRTdEO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUFHO0FBQUEsYUFFdEQ7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixhQUFZO0FBQUEsY0FDWixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxZQUFZLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDM0MsTUFBTTtBQUFBLGFBQ1I7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdGLDhDQUFDLHVCQUFRO0FBQUEsUUFHUixDQUFDLGFBQ0EsK0NBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssWUFBWSxpQkFBaUIsUUFBUSxTQUFTO0FBQUEsVUFDcEU7QUFBQSwyREFBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxjQUNuQztBQUFBLDhEQUFDO0FBQUEsa0JBQU8sTUFBSztBQUFBLGtCQUFVLFNBQVM7QUFBQSxrQkFBVztBQUFBLGlCQUUzQztBQUFBLGdCQUNBLDhDQUFDO0FBQUEsa0JBQ0MsU0FBUztBQUFBLGtCQUNULFVBQVU7QUFBQSxrQkFDWDtBQUFBLGlCQUVEO0FBQUE7QUFBQSxhQUNGO0FBQUEsWUFDQyxlQUNDLDhDQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGNBQUc7QUFBQSxhQUV0RCxJQUVBLCtDQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGNBQ2hEO0FBQUE7QUFBQSxnQkFBVTtBQUFBLGdCQUFZLGNBQWMsSUFBSSxLQUFLO0FBQUEsZ0JBQUk7QUFBQTtBQUFBLGFBQ3BEO0FBQUE7QUFBQSxTQUVKO0FBQUE7QUFBQSxLQUVKO0FBQUEsRUFFSjtBQUVBLE1BQU8sMEJBQVE7OztBQy9OZixNQUFBQyxnQkFBMEI7QUFDMUIsTUFBQUMsY0FPTzs7O0FDTlAsTUFBTSxxQkFBeUU7QUFBQSxJQUM3RSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7QUFBQSxJQUM1QixlQUFlLENBQUMsTUFBTSxFQUFFO0FBQUEsSUFDeEIsV0FBVyxDQUFDLE1BQU0sRUFBRTtBQUFBLElBQ3BCLHVCQUF1QixDQUFDLE1BQU0sRUFBRTtBQUFBLElBQ2hDLHdCQUF3QixDQUFDLE1BQU0sRUFBRTtBQUFBLElBQ2pDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtBQUFBLElBQzdCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUFBLElBQ3pCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUFBLElBQ3pCLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFBQSxJQUN4QixpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7QUFBQSxJQUMxQixvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7QUFBQSxFQUMvQjtBQUVPLFdBQVMsb0JBQW9CLFVBQWtCLFNBQTBCO0FBQzlFLFdBQU8sU0FBUyxRQUFRLGtCQUFrQixDQUFDLFFBQVEsVUFBa0I7QUFDbkUsWUFBTSxXQUFXLG1CQUFtQjtBQUNwQyxVQUFJLENBQUM7QUFBVSxlQUFPO0FBQ3RCLFlBQU0sUUFBUSxTQUFTLE9BQU87QUFDOUIsYUFBTyxVQUFVLFVBQWEsVUFBVSxRQUFRLFVBQVUsS0FBSyxRQUFRO0FBQUEsSUFDekUsQ0FBQztBQUFBLEVBQ0g7OztBRDZCTSxNQUFBQyx1QkFBQTtBQTdCTixNQUFNLGlCQUFpQixDQUFDO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixNQUEyQjtBQUN6QixVQUFNLGdCQUNKLHFDQUFVLHNCQUNOLG9CQUFvQixTQUFTLG9CQUFvQixPQUFPLElBQ3hEO0FBR04saUNBQVUsTUFBTTtBQUNkLFVBQUksQ0FBQyxtQkFBbUIsY0FBYztBQUNwQyxxQkFBYSxZQUFZO0FBQUEsTUFDM0I7QUFBQSxJQUVGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsVUFBTSxjQUFjLG1CQUFtQjtBQUN2QyxVQUFNLGNBQWMsUUFBUSxZQUFZO0FBRXhDLFdBQ0UsK0NBQUM7QUFBQSxNQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLE1BRXREO0FBQUEsdURBQUM7QUFBQSxVQUNDLEtBQUs7QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLGlCQUFpQjtBQUFBLFlBQ2pCLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxVQUNoQjtBQUFBLFVBRUE7QUFBQSwwREFBQztBQUFBLGNBQU0sTUFBSztBQUFBLGNBQU87QUFBQSxhQUFRO0FBQUEsWUFDM0IsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsY0FDcEQsOEJBQ0csNkJBQ0E7QUFBQSxhQUNOO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLFlBQVk7QUFBQSxjQUM3Qyw4QkFDRyx5SkFDQTtBQUFBLGFBQ047QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdDLGdCQUFnQixDQUFDLHFCQUNoQiw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFNBQ2Y7QUFBQSxRQUlGLCtDQUFDO0FBQUEsVUFDQyxLQUFLO0FBQUEsWUFDSCxPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxpQkFBaUI7QUFBQSxZQUNqQixTQUFTO0FBQUEsWUFDVCxjQUFjO0FBQUEsVUFDaEI7QUFBQSxVQUVBO0FBQUEsMERBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLGNBQWMsWUFBWSxXQUFXO0FBQUEsY0FDdkQsd0JBQWMsc0JBQXNCO0FBQUEsYUFDdkM7QUFBQSxZQUNDLGNBQ0MsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsY0FBRztBQUFBLGFBR3RELElBRUEsOENBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsY0FBRztBQUFBLGFBR3REO0FBQUEsWUFFRiw4Q0FBQztBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGNBQ1AsVUFBVSxDQUFDLE1BQU0sYUFBYSxFQUFFLE9BQU8sS0FBSztBQUFBLGNBQzVDLE1BQU07QUFBQSxjQUNOLGFBQ0UsY0FDSSxTQUNBO0FBQUEsYUFFUjtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBR0EsK0NBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsVUFDbkM7QUFBQSwwREFBQztBQUFBLGNBQU8sTUFBSztBQUFBLGNBQVUsU0FBUztBQUFBLGNBQVk7QUFBQSxhQUU1QztBQUFBLFlBQ0MsQ0FBQyxxQkFDQSw4Q0FBQztBQUFBLGNBQU8sTUFBSztBQUFBLGNBQVksU0FBUztBQUFBLGNBQVM7QUFBQSxhQUUzQztBQUFBO0FBQUEsU0FFSjtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHlCQUFROzs7QUxxQlQsTUFBQUMsdUJBQUE7QUFySU4sTUFBTSxpQkFBaUIsQ0FBQztBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLE1BQTJCO0FBR3pCLFVBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSTtBQUFBLE1BQXlCLE1BQ2pELGtCQUFrQixXQUFXO0FBQUEsSUFDL0I7QUFDQSxVQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQXdCLElBQUk7QUFDcEUsVUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFpQixNQUFNLGVBQWU7QUFDeEUsVUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFnQyxDQUFDLENBQUM7QUFDeEUsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBaUIsQ0FBQztBQUNsRSxVQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQXdCLElBQUk7QUFDcEUsVUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBa0IsS0FBSztBQUV6RSxVQUFNLGlCQUFhLHNCQUE4QixPQUFPO0FBQ3hELFVBQU0sbUJBQWUsc0JBQWUsQ0FBQztBQUNyQyxVQUFNLHdCQUFvQixzQkFBZSxDQUFDO0FBRzFDLGlDQUFVLE1BQU07QUFDZCxpQkFBVyxVQUFVO0FBQUEsSUFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUdaLGlDQUFVLE1BQU07QUFDZCxVQUFJLFVBQVUsZ0JBQWdCLENBQUMsY0FBYztBQUMzQztBQUFBLE1BQ0Y7QUFFQSxtQkFBYSxVQUFVLEtBQUssSUFBSTtBQUNoQyx3QkFBa0IsVUFBVTtBQUU1QixZQUFNLFdBQVcsWUFBWSxNQUFZO0FBRXZDLFlBQUksS0FBSyxJQUFJLElBQUksYUFBYSxVQUFVLHNCQUFzQjtBQUM1RCx3QkFBYyxRQUFRO0FBQ3RCLDBCQUFnQixtREFBbUQ7QUFDbkUsbUJBQVMsT0FBTztBQUNoQjtBQUFBLFFBQ0Y7QUFFQSxZQUFJO0FBQ0YsZ0JBQU0saUJBQWlCLE1BQU07QUFBQSxZQUMzQixtQkFBbUI7QUFBQSxZQUNuQixXQUFXO0FBQUEsVUFDYjtBQUVBLGNBQUksZUFBZSxXQUFXLGFBQWE7QUFDekMsMEJBQWMsUUFBUTtBQUN0Qix5QkFBYSxlQUFlLFNBQVM7QUFDckMsMkJBQWUsZUFBZSxXQUFXO0FBQ3pDLG9DQUF3QixlQUFlLFNBQVM7QUFDaEQscUJBQVMsUUFBUTtBQUFBLFVBQ25CLFdBQVcsZUFBZSxXQUFXLFVBQVU7QUFDN0MsMEJBQWMsUUFBUTtBQUN0Qiw0QkFBZ0IsZUFBZSxLQUFLO0FBQ3BDLHFCQUFTLE9BQU87QUFBQSxVQUNsQjtBQUFBLFFBRUYsU0FBUSxHQUFOO0FBQ0EsNEJBQWtCLFdBQVc7QUFDN0IsY0FBSSxrQkFBa0IsV0FBVyxHQUFHO0FBQ2xDLDBCQUFjLFFBQVE7QUFDdEIsNEJBQWdCLG1FQUFtRTtBQUNuRixxQkFBUyxPQUFPO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsTUFDRixJQUFHLGdCQUFnQjtBQUVuQixhQUFPLE1BQU0sY0FBYyxRQUFRO0FBQUEsSUFDckMsR0FBRyxDQUFDLE9BQU8sY0FBYyx1QkFBdUIsQ0FBQztBQUVqRCxVQUFNLHFCQUFpQiwyQkFBWSxDQUFPLHFCQUE2QjtBQUNyRSxlQUFTLFlBQVk7QUFDckIsc0JBQWdCLElBQUk7QUFDcEIsMkJBQXFCLEtBQUs7QUFFMUIsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNO0FBQUEsVUFDckI7QUFBQSxVQUNBLFdBQVc7QUFBQSxVQUNYO0FBQUEsWUFDRSxZQUFZLFFBQVE7QUFBQSxZQUNwQixhQUFhLFFBQVE7QUFBQSxZQUNyQixTQUFTLFFBQVE7QUFBQSxZQUNqQixtQkFBbUI7QUFBQSxVQUNyQjtBQUFBLFFBQ0Y7QUFFQSx3QkFBZ0IsU0FBUyxhQUFhO0FBQ3RDLDRCQUFvQixDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQUEsTUFDeEMsU0FBUyxLQUFQO0FBQ0EsWUFBSSxlQUFlLFlBQVksSUFBSSxXQUFXLE9BQU8sSUFBSSxTQUFTLG9CQUFvQjtBQUNwRiwrQkFBcUIsSUFBSTtBQUN6QiwwQkFBZ0IsSUFBSSxPQUFPO0FBQUEsUUFDN0IsV0FBVyxlQUFlLE9BQU87QUFDL0IsMEJBQWdCLElBQUksT0FBTztBQUFBLFFBQzdCLE9BQU87QUFDTCwwQkFBZ0IsaURBQWlEO0FBQUEsUUFDbkU7QUFDQSxpQkFBUyxPQUFPO0FBQUEsTUFDbEI7QUFBQSxJQUNGLElBQUcsQ0FBQyxRQUFRLElBQUksUUFBUSxhQUFhLFFBQVEsT0FBTyxDQUFDO0FBRXJELFVBQU0sb0JBQWdCLDJCQUFZLE1BQU07QUFDdEMsZ0JBQVUsZUFBZTtBQUFBLElBQzNCLEdBQUcsQ0FBQyxXQUFXLGVBQWUsQ0FBQztBQUUvQixVQUFNLHVCQUFtQiwyQkFBWSxDQUFDLHFCQUE2QjtBQUNqRSxxQkFBZSxnQkFBZ0I7QUFBQSxJQUNqQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBRW5CLFVBQU0sa0JBQWMsMkJBQVksTUFBTTtBQUNwQyxzQkFBZ0IsSUFBSTtBQUNwQixlQUFTLE1BQU07QUFBQSxJQUNqQixHQUFHLENBQUMsQ0FBQztBQUVMLFVBQU0sMEJBQXNCLDJCQUFZLE1BQU07QUFDNUMsZ0JBQVUsZUFBZTtBQUFBLElBQzNCLEdBQUcsQ0FBQyxXQUFXLGVBQWUsQ0FBQztBQUcvQixRQUFJLFdBQVc7QUFDYixhQUNFLDhDQUFDO0FBQUEsUUFDQyxXQUFXO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsUUFDWCxjQUFjO0FBQUEsUUFDZCxXQUFTO0FBQUEsT0FDWDtBQUFBLElBRUo7QUFFQSxZQUFRLE9BQU87QUFBQSxNQUNiLEtBQUs7QUFDSCxlQUNFLDhDQUFDO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsWUFBWTtBQUFBLFVBQ1o7QUFBQSxTQUNGO0FBQUEsTUFHSixLQUFLO0FBQ0gsZUFDRSw4Q0FBQztBQUFBLFVBQW9CO0FBQUEsU0FBa0I7QUFBQSxNQUczQyxLQUFLO0FBQ0gsZUFDRSw4Q0FBQztBQUFBLFVBQ0M7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGNBQWM7QUFBQSxVQUNkLFdBQVc7QUFBQSxVQUNYLGNBQWM7QUFBQSxTQUNoQjtBQUFBLE1BR0osS0FBSztBQUNILGVBQ0UsOENBQUM7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2QsWUFBWTtBQUFBLFVBQ1osU0FBUztBQUFBLFNBQ1g7QUFBQSxJQUVOO0FBQUEsRUFDRjtBQUVBLE1BQU8seUJBQVE7OztBT3hOZixNQUFBQyxnQkFBaUM7QUFDakMsTUFBQUMsY0FPTzs7O0FDUlAsTUFBQUMsY0FBNEM7QUFrQ2hDLE1BQUFDLHVCQUFBO0FBMUJaLFdBQVMsZ0JBQWdCLEdBQThCO0FBQ3JELFlBQVEsRUFBRSxNQUFNO0FBQUEsTUFDZCxLQUFLO0FBQ0gsZUFBTyxxQ0FBcUMsRUFBRSxzQkFBc0IsRUFBRTtBQUFBLE1BQ3hFLEtBQUs7QUFDSCxlQUFPLElBQUksRUFBRSwrQkFBK0IsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLHVCQUF1QixvQ0FBb0M7QUFBQSxNQUN4SyxLQUFLO0FBQ0gsZUFBTyxzQ0FBc0MsRUFBRSxNQUFNLEtBQUssSUFBSTtBQUFBLE1BQ2hFLEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsZUFBTyxJQUFJLEVBQUUsdUNBQXVDLEVBQUUsU0FBUyxFQUFFO0FBQUEsSUFDckU7QUFBQSxFQUNGO0FBRWUsV0FBUix1QkFBd0MsRUFBRSxVQUFVLGFBQWEsR0FBZ0M7QUFDdEcsVUFBTSxjQUFjLElBQUksS0FBSyxTQUFTLFlBQVksRUFBRSxlQUFlO0FBQ25FLFVBQU0sY0FBYyxTQUFTLFlBQVksU0FBUyxTQUFTLFNBQVM7QUFFcEUsV0FDRSwrQ0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsU0FBUyxRQUFRO0FBQUEsTUFDcEQ7QUFBQSx1QkFDQyw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFDRSw4Q0FBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxZQUNuQyxtQkFBUyxTQUFTLElBQUksQ0FBQyxHQUFHLE1BQ3pCLCtDQUFDO0FBQUEsY0FBZSxLQUFLLEVBQUUsTUFBTSxVQUFVO0FBQUEsY0FBRztBQUFBO0FBQUEsZ0JBQ3JDLGdCQUFnQixDQUFDO0FBQUE7QUFBQSxlQURULENBRWIsQ0FDRDtBQUFBLFdBQ0g7QUFBQSxTQUVKO0FBQUEsUUFHRiw4Q0FBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFNBQ2Q7QUFBQSxRQUVBLCtDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLFVBQ25DO0FBQUEsMERBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFVBQVU7QUFBQSxjQUFHO0FBQUEsYUFBaUI7QUFBQSxZQUNuRCw4Q0FBQztBQUFBLGNBQUk7QUFBQSxhQUdMO0FBQUEsWUFDQSwrQ0FBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVU7QUFBQSxjQUNyQztBQUFBLDhEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxrQkFBRztBQUFBLGlCQUFZO0FBQUEsZ0JBQ2xFLDhDQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sVUFBVTtBQUFBLGtCQUFJO0FBQUEsaUJBQVk7QUFBQTtBQUFBLGFBQ2pEO0FBQUE7QUFBQSxTQUNGO0FBQUEsUUFFQyxnQkFDQyw4Q0FBQztBQUFBLFVBQU8sTUFBSztBQUFBLFVBQVksU0FBUztBQUFBLFVBQWM7QUFBQSxTQUVoRDtBQUFBO0FBQUEsS0FFSjtBQUFBLEVBRUo7OztBRDRDVyxNQUFBQyx1QkFBQTtBQXpFWCxNQUFNLGlCQUFpQixvQkFBSSxJQUFJO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsV0FBUyx1QkFDUCxVQUNBLGVBQ3FDO0FBS3JDLFVBQU0sWUFBWSxTQUFTLG1CQUFtQjtBQUFBLE1BQzVDLENBQUMsTUFBTSxFQUFFLGFBQWE7QUFBQSxJQUN4QjtBQUNBLFVBQU0sUUFBUSxJQUFJLElBQUksY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDO0FBQ3BFLFVBQU0sV0FBVyxVQUFVO0FBQUEsTUFDekIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLE1BQU0sSUFBSSxFQUFFLElBQUk7QUFBQSxJQUMvRCxFQUFFO0FBQ0YsV0FBTyxFQUFFLFVBQVUsT0FBTyxVQUFVLE9BQU87QUFBQSxFQUM3QztBQUVlLFdBQVIsV0FBNEI7QUFBQSxJQUNqQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixHQUFvQjtBQUNsQixVQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsS0FBSztBQUN0RCxVQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQWdCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDMUQsVUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUVyQixVQUFNLEVBQUUsVUFBVSxNQUFNLElBQUksdUJBQXVCLFVBQVUsYUFBYTtBQUMxRSxVQUFNLGlCQUFpQixjQUFjLEtBQUssRUFBRSxNQUFNLEtBQUssRUFBRSxPQUFPLE9BQU8sRUFBRTtBQUV6RSxhQUFlLGVBQWU7QUFBQTtBQWhGaEM7QUFpRkksaUJBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQixZQUFJO0FBQ0YsZ0JBQU0sV0FBVyxNQUFNO0FBQUEsWUFDckIsaUJBQWlCLFFBQVE7QUFBQSxZQUN6QixXQUFXO0FBQUEsVUFDYjtBQUNBLG1CQUFTLEVBQUUsTUFBTSxXQUFXLFVBQVUsU0FBUyxLQUFLLENBQUM7QUFDckQsc0JBQVksU0FBUyxJQUFJO0FBQUEsUUFDM0IsU0FBUyxLQUFQO0FBQ0EsY0FBSSxlQUFlLFVBQVU7QUFDM0Isa0JBQU0sUUFBTyxTQUFJLFNBQUosWUFBWTtBQUN6QixxQkFBUztBQUFBLGNBQ1AsTUFBTTtBQUFBLGNBQ047QUFBQSxjQUNBLFNBQVMsSUFBSTtBQUFBLGNBQ2IsVUFBVSxlQUFlLElBQUksSUFBSTtBQUFBLGNBR2pDLFVBQVUsQ0FBQztBQUFBLFlBQ2IsQ0FBQztBQUFBLFVBQ0gsT0FBTztBQUNMLHFCQUFTO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsY0FDVCxVQUFVO0FBQUEsY0FDVixVQUFVLENBQUM7QUFBQSxZQUNiLENBQUM7QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQTtBQUVBLFFBQUksTUFBTSxTQUFTLFdBQVc7QUFDNUIsYUFBTyw4Q0FBQztBQUFBLFFBQXVCLFVBQVUsTUFBTTtBQUFBLE9BQVU7QUFBQSxJQUMzRDtBQUVBLFVBQU0sZUFBZSxNQUFNLFNBQVM7QUFDcEMsVUFBTSxrQkFBa0IsTUFBTSxTQUFTLFdBQVcsTUFBTTtBQUN4RCxVQUFNLGlCQUFpQixDQUFDLGdCQUFnQixnQkFBZ0I7QUFFeEQsV0FDRSwrQ0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsU0FBUyxRQUFRO0FBQUEsTUFDckQ7QUFBQSxzREFBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sVUFBVTtBQUFBLFVBQUc7QUFBQSxTQUFlO0FBQUEsUUFFakQsK0NBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLFNBQVMsVUFBVSxpQkFBaUIsYUFBYSxjQUFjLFNBQVM7QUFBQSxVQUM3RztBQUFBLDJEQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxZQUFZLGdCQUFnQjtBQUFBLGNBQ2hFO0FBQUEsOERBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUFHO0FBQUEsaUJBQU87QUFBQSxnQkFDN0QsOENBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxVQUFVO0FBQUEsa0JBQUksa0JBQVE7QUFBQSxpQkFBRztBQUFBO0FBQUEsYUFDaEQ7QUFBQSxZQUNBLCtDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxZQUFZLGdCQUFnQjtBQUFBLGNBQ2hFO0FBQUEsOERBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUFHO0FBQUEsaUJBQU07QUFBQSxnQkFDNUQsOENBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxVQUFVO0FBQUEsa0JBQUksbUJBQVM7QUFBQSxpQkFBYTtBQUFBO0FBQUEsYUFDM0Q7QUFBQSxZQUNBLCtDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxZQUFZLGdCQUFnQjtBQUFBLGNBQ2hFO0FBQUEsOERBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUFHO0FBQUEsaUJBQWtCO0FBQUEsZ0JBQ3hFLCtDQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sVUFBVTtBQUFBLGtCQUFJO0FBQUE7QUFBQSxvQkFBUztBQUFBLG9CQUFLO0FBQUEsb0JBQU07QUFBQTtBQUFBLGlCQUFTO0FBQUE7QUFBQSxhQUNsRTtBQUFBLFlBQ0EsK0NBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLFlBQVksZ0JBQWdCO0FBQUEsY0FDaEU7QUFBQSw4REFBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsa0JBQUc7QUFBQSxpQkFBUztBQUFBLGdCQUMvRCwrQ0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFVBQVU7QUFBQSxrQkFBSTtBQUFBO0FBQUEsb0JBQWU7QUFBQTtBQUFBLGlCQUFNO0FBQUE7QUFBQSxhQUMxRDtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBRUMsTUFBTSxTQUFTLFdBQ2QsOENBQUM7QUFBQSxVQUNDLE1BQU0sTUFBTSxXQUFXLGFBQWE7QUFBQSxVQUNwQyxPQUFPLE1BQU0sV0FBVyxpQkFBaUI7QUFBQSxVQUN6QyxhQUFhLE1BQU07QUFBQSxTQUNyQjtBQUFBLFFBR0QsV0FBVyxTQUFTLENBQUMsbUJBQ3BCLDhDQUFDO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixhQUFhLEdBQUcsUUFBUSwwQkFBMEIsUUFBUSxhQUFhLElBQUksS0FBSztBQUFBLFNBQ2xGO0FBQUEsUUFHRCxDQUFDLG1CQUNBLDhDQUFDO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixhQUFZO0FBQUEsU0FDZDtBQUFBLFFBR0YsOENBQUM7QUFBQSxVQUNDLE9BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFVBQVUsTUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9DLFVBQVUsZ0JBQWdCO0FBQUEsU0FDNUI7QUFBQSxRQUVBLDhDQUFDO0FBQUEsVUFDQyx3REFBQztBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsVUFBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBRVIseUJBQ0MsK0NBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLFFBQVEsU0FBUztBQUFBLGNBQ3JEO0FBQUEsOERBQUMsdUJBQVE7QUFBQSxnQkFDVCw4Q0FBQztBQUFBLGtCQUFPO0FBQUEsaUJBQXNCO0FBQUE7QUFBQSxhQUNoQyxJQUVBO0FBQUEsV0FFSjtBQUFBLFNBQ0Y7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKOzs7QXRCOUIyQixNQUFBQyx1QkFBQTtBQTlIM0IsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLFNBQVMsZ0JBQWdCLFNBQVMsT0FBTyxTQUFTLE1BQTRCO0FBQ3ZHLFVBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx5QkFBcUIsUUFBUTtBQUNuRSxVQUFNLENBQUMsU0FBUyxVQUFVLFFBQUkseUJBQWtCLGNBQWM7QUFDOUQsVUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHlCQUE4QixJQUFJO0FBQ2xFLFVBQU0sQ0FBQyxTQUFTLFVBQVUsUUFBSSx5QkFBa0Q7QUFBQSxNQUM5RSxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQ0QsVUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHlCQUE4RDtBQUFBLE1BQ3hGLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxJQUNaLENBQUM7QUFDRCxVQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHlCQUFTLEVBQUU7QUFDekQsVUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUkseUJBQXlCLENBQUMsQ0FBQztBQUdyRSxVQUFNLGlCQUFhLHVCQUFPLE9BQU87QUFDakMsZUFBVyxVQUFVO0FBRXJCLGtDQUFVLE1BQU07QUFDZCxVQUFJLENBQUM7QUFBTztBQUVaLFlBQU0sWUFBWSxNQUFZO0FBQzVCLG1CQUFXLEVBQUUsU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzVDLGtCQUFVLEVBQUUsU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBSTNDLGNBQU0sc0JBQXNCLENBQUMsQ0FBQyxlQUFlO0FBQzdDLGNBQU0sQ0FBQyxlQUFlLGNBQWMsSUFBSSxNQUFNLFFBQVEsV0FBVztBQUFBLFVBQy9ELGFBQWdDLGlCQUFpQixlQUFlLE1BQU0sV0FBVyxPQUFPO0FBQUEsVUFDeEYsc0JBQ0ksYUFBcUMsa0JBQWtCLFdBQVcsU0FBUztBQUFBLFlBQ3pFLFNBQVMsZUFBZTtBQUFBLFlBQ3hCLGFBQWEsZUFBZTtBQUFBLFVBQzlCLENBQUMsSUFDRCxRQUFRLE9BQU8sSUFBSSxTQUFTLGtCQUFrQixHQUFHLENBQUM7QUFBQSxRQUN4RCxDQUFDO0FBRUQsWUFBSSxjQUFjLFdBQVcsYUFBYTtBQUN4QyxnQkFBTSxVQUFVLGNBQWMsTUFBTTtBQUNwQyxxQkFBVyxPQUFPO0FBQ2xCLGNBQUksUUFBUSxnQkFBZ0I7QUFDMUIsK0JBQW1CLFFBQVEsY0FBYztBQUFBLFVBQzNDO0FBQUEsUUFDRixPQUFPO0FBQ0wsZ0JBQU0sTUFBTSxjQUFjO0FBQzFCLG9CQUFVLENBQUMsU0FBVSxpQ0FDaEIsT0FEZ0I7QUFBQSxZQUVuQixTQUFTLGVBQWUsV0FBVyxJQUFJLFVBQVU7QUFBQSxVQUNuRCxFQUFFO0FBQUEsUUFDSjtBQUNBLG1CQUFXLENBQUMsU0FBVSxpQ0FBSyxPQUFMLEVBQVcsU0FBUyxNQUFNLEVBQUU7QUFFbEQsWUFBSSxlQUFlLFdBQVcsYUFBYTtBQUN6QyxzQkFBWSxlQUFlLE1BQU0sSUFBSTtBQUFBLFFBQ3ZDLE9BQU87QUFDTCxnQkFBTSxNQUFNLGVBQWU7QUFFM0IsY0FBSSxFQUFFLGVBQWUsWUFBWSxJQUFJLFdBQVcsTUFBTTtBQUNwRCxzQkFBVSxDQUFDLFNBQVUsaUNBQ2hCLE9BRGdCO0FBQUEsY0FFbkIsVUFBVSxlQUFlLFdBQVcsSUFBSSxVQUFVO0FBQUEsWUFDcEQsRUFBRTtBQUFBLFVBQ0o7QUFDQSxzQkFBWSxJQUFJO0FBQUEsUUFDbEI7QUFDQSxtQkFBVyxDQUFDLFNBQVUsaUNBQUssT0FBTCxFQUFXLFVBQVUsTUFBTSxFQUFFO0FBR25ELFlBQUk7QUFDRixnQkFBTSxjQUFjLE1BQU07QUFBQSxZQUN4QixpQkFBaUIsZUFBZTtBQUFBLFlBQ2hDLFdBQVc7QUFBQSxVQUNiO0FBQ0EsMkJBQWlCLFlBQVksSUFBSTtBQUFBLFFBQ25DLFNBQVMsS0FBUDtBQUNBLGtCQUFRLE1BQU0sbUNBQW1DLEdBQUc7QUFDcEQsMkJBQWlCLENBQUMsQ0FBQztBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUVBLGdCQUFVO0FBQUEsSUFDWixHQUFHLENBQUMsT0FBTyxlQUFlLElBQUksZUFBZSxTQUFTLGVBQWUsV0FBVyxDQUFDO0FBT2pGLGtDQUFVLE1BQU07QUFDZCxVQUFJLGdCQUFnQjtBQUFhO0FBQ2pDO0FBQUEsUUFDRSxpQkFBaUIsZUFBZTtBQUFBLFFBQ2hDLFdBQVc7QUFBQSxNQUNiLEVBQ0csS0FBSyxDQUFDLFdBQVcsaUJBQWlCLE9BQU8sSUFBSSxDQUFDLEVBQzlDLE1BQU0sQ0FBQyxRQUFRLFFBQVEsTUFBTSxxQ0FBcUMsR0FBRyxDQUFDO0FBQUEsSUFDM0UsR0FBRyxDQUFDLGFBQWEsZUFBZSxFQUFFLENBQUM7QUFFbkMsVUFBTSxZQUFZLFFBQVEsUUFBUSxxQkFBcUI7QUFFdkQsVUFBTSxlQUFlLGFBQWEsUUFBUSxXQUFXO0FBQ3JELFVBQU0sY0FBYyxpQkFBaUI7QUFDckMsVUFBTSxhQUFhLGlCQUFpQixhQUFhLFNBQVM7QUFFMUQsVUFBTSxhQUFhLE1BQU07QUFDdkIsVUFBSSxDQUFDLFlBQVk7QUFDZix1QkFBZSxhQUFhLGVBQWUsRUFBRTtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYSxNQUFNO0FBQ3ZCLFVBQUksQ0FBQyxhQUFhO0FBQ2hCLHVCQUFlLGFBQWEsZUFBZSxFQUFFO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBRUEsVUFBTSxnQkFBZ0IsaUJBQWlCLFFBQVEsTUFBTTtBQUNyRCxVQUFNLFdBQVcsZ0JBQWdCLEtBQUssQ0FBQyxXQUFXLFFBQVEsTUFBTTtBQUVoRSxVQUFNLGtCQUFrQixNQUFNO0FBQzVCLFlBQU0sb0JBQW9CLFFBQVE7QUFFbEMsYUFDRSwrQ0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsUUFDckQ7QUFBQSxpQkFBTyxXQUFXLDhDQUFDO0FBQUEsWUFBWSxTQUFTLE9BQU87QUFBQSxXQUFTO0FBQUEsVUFFeEQsb0JBQ0MsK0NBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxRQUFRLFVBQVUsU0FBUyxVQUFVLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxZQUN4RTtBQUFBLDREQUFDO0FBQUEsZ0JBQVEsTUFBSztBQUFBLGVBQVM7QUFBQSxjQUN2Qiw4Q0FBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsZ0JBQUc7QUFBQSxlQUFtQjtBQUFBO0FBQUEsV0FDM0UsSUFDRSxPQUFPLFdBQ1QsOENBQUM7QUFBQSxZQUFZLFNBQVMsT0FBTztBQUFBLFdBQVUsSUFDckMsV0FDRjtBQUFBLFlBQ0U7QUFBQSw0REFBQztBQUFBLGdCQUNDLFVBQVUsU0FBUztBQUFBLGdCQUNuQixTQUFTLFNBQVM7QUFBQSxnQkFDbEIsYUFBYTtBQUFBLGdCQUNiO0FBQUEsZUFDRjtBQUFBLGNBQ0EsOENBQUM7QUFBQSxnQkFBYTtBQUFBLGdCQUFvQixhQUFhO0FBQUEsZUFBVTtBQUFBO0FBQUEsV0FDM0QsSUFFQSw4Q0FBQztBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsT0FBTTtBQUFBLFlBQ04sYUFBWTtBQUFBLFdBQ2Q7QUFBQSxVQUdGLDhDQUFDO0FBQUEsWUFBZ0I7QUFBQSxZQUFrQixTQUFTLFFBQVE7QUFBQSxXQUFTO0FBQUEsVUFFNUQsWUFDQyw4Q0FBQztBQUFBLFlBQ0MsZUFBZSxTQUFTO0FBQUEsWUFDeEIsaUJBQWlCLFNBQVM7QUFBQSxXQUM1QjtBQUFBO0FBQUEsT0FFSjtBQUFBLElBRUo7QUFFQSxXQUNFLDhDQUFDO0FBQUEsTUFDQyxPQUFPLFdBQVcsZUFBZSxHQUFHLE1BQU0sR0FBRyxFQUFFO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsTUFDQSxzQkFBc0I7QUFBQSxRQUNwQixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsZUFDRSxhQUNFLDhDQUFDO0FBQUEsUUFBTyxNQUFLO0FBQUEsUUFBVSxTQUFTLE1BQU0sU0FBUyxLQUFLO0FBQUEsUUFDakQsc0JBQVksU0FBUztBQUFBLE9BQ3hCLElBRUEsK0NBQUM7QUFBQSxRQUFPLE1BQUs7QUFBQSxRQUFVLFNBQVM7QUFBQSxRQUFZO0FBQUE7QUFBQSxVQUNuQyxtQkFBbUIsYUFBYSxlQUFlO0FBQUE7QUFBQSxPQUN4RDtBQUFBLE1BR0osaUJBQ0UsY0FDRSw4Q0FBQztBQUFBLFFBQU8sU0FBUyxNQUFNLFNBQVMsS0FBSztBQUFBLFFBQUc7QUFBQSxPQUFNLElBRTlDLCtDQUFDO0FBQUEsUUFBTyxTQUFTO0FBQUEsUUFBWTtBQUFBO0FBQUEsVUFDcEIsbUJBQW1CLGFBQWEsZUFBZTtBQUFBO0FBQUEsT0FDeEQ7QUFBQSxNQUlKLHlEQUFDO0FBQUEsUUFBSSxLQUFLLEVBQUUsT0FBTyxJQUFJO0FBQUEsUUFDckI7QUFBQSx5REFBQztBQUFBLFlBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxlQUFlLFNBQVMsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLFlBQzdFO0FBQUEsMkJBQ0MsOENBQUM7QUFBQSxnQkFDQyxNQUFLO0FBQUEsZ0JBQ0wsT0FBTTtBQUFBLGdCQUNOLGFBQVk7QUFBQSxlQUNkO0FBQUEsY0FFRiw4Q0FBQztBQUFBLGdCQUFjLE9BQU8sUUFBUTtBQUFBLGdCQUFRLFFBQVEsUUFBUTtBQUFBLGVBQVE7QUFBQTtBQUFBLFdBQ2hFO0FBQUEsVUFDQSwrQ0FBQztBQUFBLFlBQ0MsUUFBTTtBQUFBLFlBQ04sTUFBSztBQUFBLFlBQ0wsYUFBYTtBQUFBLFlBQ2IsbUJBQW1CLENBQUMsUUFBUSxlQUFlLEdBQWlCO0FBQUEsWUFFNUQ7QUFBQSw0REFBQztBQUFBLGdCQUNFLHVCQUFhLElBQUksQ0FBQyxTQUNqQiw4Q0FBQztBQUFBLGtCQUFlLElBQUk7QUFBQSxrQkFDakIsNkJBQW1CO0FBQUEsbUJBRFosSUFFVixDQUNEO0FBQUEsZUFDSDtBQUFBLGNBQ0EsK0NBQUM7QUFBQSxnQkFDQztBQUFBLGdFQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQUNWLDBCQUFnQjtBQUFBLG1CQUNuQjtBQUFBLGtCQUNBLDhDQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQVNYLHdEQUFDO0FBQUEsc0JBQ0M7QUFBQSxzQkFDQTtBQUFBLHNCQUNBLFNBQVMsV0FBVztBQUFBLHNCQUNwQjtBQUFBLHNCQUNBO0FBQUEsc0JBQ0E7QUFBQSxxQkFDRjtBQUFBLG1CQUNGO0FBQUEsa0JBQ0EsOENBQUM7QUFBQSxvQkFBUyxJQUFHO0FBQUEsb0JBQ1YsMEJBQWdCLGVBQ2pCLDhDQUFDO0FBQUEsc0JBQ0M7QUFBQSxzQkFDQTtBQUFBLHNCQUNBO0FBQUEsc0JBQ0EsU0FBUyxXQUFXO0FBQUEsc0JBQ3BCO0FBQUEsc0JBQ0EseUJBQXlCO0FBQUEsc0JBQ3pCLFdBQVcsQ0FBQyxTQUFTO0FBQ25CLDJDQUFtQixJQUFJO0FBQ3ZCLHVDQUFlLFFBQVE7QUFBQSxzQkFDekI7QUFBQSxzQkFDQSxnQkFBZ0IsTUFBTSxlQUFlLFVBQVU7QUFBQSxzQkFDL0M7QUFBQSxxQkFDRjtBQUFBLG1CQUVGO0FBQUEsa0JBQ0EsOENBQUM7QUFBQSxvQkFBUyxJQUFHO0FBQUEsb0JBQ1YsdUJBQWEsUUFBUSx3QkFDcEIsOENBQUM7QUFBQSxzQkFDQyxVQUFVO0FBQUEsd0JBQ1IsZUFBZTtBQUFBLHdCQUNmLGNBQWMsUUFBUTtBQUFBLHdCQUN0QixnQkFBZ0I7QUFBQSx3QkFDaEIsVUFBVSxDQUFDO0FBQUEsc0JBQ2I7QUFBQSxxQkFDRixJQUNFLFdBQ0YsOENBQUM7QUFBQSxzQkFDQztBQUFBLHNCQUNBO0FBQUEsc0JBQ0E7QUFBQSxzQkFDQSxlQUFlO0FBQUEsc0JBQ2YsU0FBUyxXQUFXO0FBQUEsc0JBQ3BCLGFBQWEsQ0FBQyxhQUFhO0FBQ3pCLG1DQUFXLGlDQUNOLFVBRE07QUFBQSwwQkFFVCx1QkFBdUIsU0FBUztBQUFBLHdCQUNsQyxFQUFDO0FBQUEsc0JBQ0g7QUFBQSxxQkFDRixJQUVBLDhDQUFDO0FBQUEsc0JBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxRQUFRLFNBQVM7QUFBQSxzQkFDOUMsd0RBQUM7QUFBQSx3QkFBUSxNQUFLO0FBQUEsdUJBQVM7QUFBQSxxQkFDekI7QUFBQSxtQkFFSjtBQUFBO0FBQUEsZUFDRjtBQUFBO0FBQUEsV0FDRjtBQUFBO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTywwQkFBUTs7O0FEblJMLE1BQUFDLHVCQUFBO0FBM0NWLE1BQU0scUJBQXFCLENBQUMsWUFBbUM7QUFqQi9EO0FBa0JFLFVBQU0sRUFBRSxZQUFZLElBQUk7QUFDeEIsVUFBTSxtQkFBa0IsZ0RBQWEsa0JBQWIsbUJBQTRCO0FBRXBELFVBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx5QkFBb0IsU0FBUztBQUMvRCxVQUFNLENBQUMsU0FBUyxVQUFVLFFBQUkseUJBQXlCLElBQUk7QUFDM0QsVUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHlCQUFTLEtBQUs7QUFHdEQsVUFBTSxpQkFBYSx1QkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUVyQixVQUFNLGtCQUFjLDRCQUFZLE1BQVk7QUFDMUMsVUFBSSxDQUFDLGlCQUFpQjtBQUNwQixxQkFBYSxZQUFZO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLG1CQUFhLFNBQVM7QUFDdEIsVUFBSTtBQUNGLGNBQU0sU0FBUyxNQUFNO0FBQUEsVUFDbkIsbUNBQW1DO0FBQUEsVUFDbkMsV0FBVztBQUFBLFFBQ2I7QUFDQSxtQkFBVyxPQUFPLElBQUk7QUFDdEIscUJBQWEsT0FBTztBQUFBLE1BQ3RCLFNBQVMsS0FBUDtBQUNBLFlBQUksZUFBZSxZQUFZLElBQUksV0FBVyxLQUFLO0FBQ2pELHVCQUFhLFlBQVk7QUFBQSxRQUMzQixPQUFPO0FBQ0wsdUJBQWEsT0FBTztBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLElBQ0YsSUFBRyxDQUFDLGVBQWUsQ0FBQztBQUVwQixrQ0FBVSxNQUFNO0FBQ2Qsa0JBQVk7QUFBQSxJQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFaEIsUUFBSSxjQUFjLFdBQVc7QUFDM0IsYUFDRSw4Q0FBQztBQUFBLFFBQVksT0FBTTtBQUFBLFFBQ2pCLHdEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLFFBQVEsU0FBUztBQUFBLFVBQzlDLHdEQUFDO0FBQUEsWUFBUSxNQUFLO0FBQUEsV0FBUTtBQUFBLFNBQ3hCO0FBQUEsT0FDRjtBQUFBLElBRUo7QUFFQSxRQUFJLGNBQWMsZ0JBQWdCLGNBQWMsV0FBVyxDQUFDLFNBQVM7QUFDbkUsYUFDRSw4Q0FBQztBQUFBLFFBQVksT0FBTTtBQUFBLFFBQ2pCLHdEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLFFBQVEsU0FBUztBQUFBLFVBQzlDLHdEQUFDO0FBQUEsWUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLFlBQUc7QUFBQSxXQUV0RDtBQUFBLFNBQ0Y7QUFBQSxPQUNGO0FBQUEsSUFFSjtBQUVBLFVBQU0sY0FBYyxlQUFlLFFBQVEsTUFBTTtBQUNqRCxVQUFNLGNBQWMsbUJBQW1CLFFBQVEsU0FBUyxRQUFRLFdBQVc7QUFFM0UsV0FDRSwrQ0FBQztBQUFBLE1BQVksT0FBTTtBQUFBLE1BQ2pCO0FBQUEsdURBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ3ZEO0FBQUEsMkRBQUM7QUFBQSxjQUNDLEtBQUs7QUFBQSxnQkFDSCxPQUFPO0FBQUEsZ0JBQ1AsS0FBSztBQUFBLGdCQUNMLFlBQVk7QUFBQSxnQkFDWixRQUFRO0FBQUEsY0FDVjtBQUFBLGNBRUE7QUFBQSw4REFBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsa0JBQUc7QUFBQSxpQkFFMUQ7QUFBQSxnQkFDQSw4Q0FBQztBQUFBLGtCQUFNLE1BQU0sWUFBWTtBQUFBLGtCQUFPLHNCQUFZO0FBQUEsaUJBQU07QUFBQTtBQUFBLGFBQ3BEO0FBQUEsWUFFQSwrQ0FBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxjQUNwQztBQUFBLDhEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxZQUFZLFdBQVc7QUFBQSxrQkFDakQsOENBQWUsUUFBUSxPQUFPLFFBQVEsTUFBTSxHQUFHO0FBQUEsaUJBQ2xEO0FBQUEsZ0JBQ0EsK0NBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUNoRDtBQUFBLDRCQUFRLFFBQVEsT0FBTyxDQUFDLEVBQUUsWUFBWSxJQUNyQyxRQUFRLFFBQVEsTUFBTSxDQUFDO0FBQUEsb0JBQUc7QUFBQSxvQkFDM0IsUUFBUTtBQUFBO0FBQUEsaUJBQ1g7QUFBQTtBQUFBLGFBQ0Y7QUFBQSxhQUVFLFFBQVEsV0FBVyxvQkFDbkIsUUFBUSxXQUFXLDZCQUNuQiw4Q0FBQztBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsS0FBSyxFQUFFLE9BQU8sT0FBTztBQUFBLGNBQ3JCLFNBQVMsTUFBTSxnQkFBZ0IsSUFBSTtBQUFBLGNBQ3BDO0FBQUEsYUFFRDtBQUFBO0FBQUEsU0FFSjtBQUFBLFFBRUEsOENBQUM7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0EsT0FBTztBQUFBLFVBQ1AsVUFBVTtBQUFBLFNBQ1o7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyw2QkFBUTs7O0F5Qm5JZixNQUFBQyxpQkFBeUQ7QUFDekQsTUFBQUMsY0FZTzs7O0FDYlAsTUFBQUMsY0FBMkM7QUFvQ2pDLE1BQUFDLHVCQUFBO0FBM0JWLFdBQVNDLGNBQWEsUUFBZ0IsVUFBMEI7QUFDOUQsV0FBTyxJQUFJLEtBQUssYUFBYSxTQUFTO0FBQUEsTUFDcEMsT0FBTztBQUFBLE1BQ1AsVUFBVSxTQUFTLFlBQVk7QUFBQSxJQUNqQyxDQUFDLEVBQUUsT0FBTyxTQUFTLEdBQUc7QUFBQSxFQUN4QjtBQUVBLE1BQU0sY0FBYyxDQUFDLEVBQUUsU0FBUyxTQUFTLE1BQXdCO0FBQy9ELFVBQU0sY0FBYyxlQUFlLFFBQVEsTUFBTTtBQUNqRCxVQUFNLGVBQWUsZ0JBQWdCLFFBQVEsUUFBUSxRQUFRLE1BQU07QUFDbkUsVUFBTSxjQUFjLG1CQUFtQixRQUFRLFNBQVMsUUFBUSxXQUFXO0FBRTNFLFdBQ0UsOENBQUM7QUFBQSxNQUNDLE1BQUs7QUFBQSxNQUNMLEtBQUssRUFBRSxPQUFPLE9BQU87QUFBQSxNQUNyQixTQUFTLE1BQU0sU0FBUyxRQUFRLEVBQUU7QUFBQSxNQUVsQyx5REFBQztBQUFBLFFBQ0MsS0FBSztBQUFBLFVBQ0gsT0FBTztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFFBQ1g7QUFBQSxRQUVBO0FBQUEseURBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTLFlBQVksaUJBQWlCLFFBQVEsU0FBUztBQUFBLFlBQ2xGO0FBQUEsNERBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLFlBQVksV0FBVztBQUFBLGdCQUNqRCxVQUFBQSxjQUFhLFFBQVEsUUFBUSxRQUFRLFFBQVE7QUFBQSxlQUNoRDtBQUFBLGNBQ0EsK0NBQUM7QUFBQSxnQkFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLGdCQUNwQztBQUFBLGdFQUFDO0FBQUEsb0JBQU0sTUFBTSxZQUFZO0FBQUEsb0JBQU8sc0JBQVk7QUFBQSxtQkFBTTtBQUFBLGtCQUNqRCxnQkFDQyw4Q0FBQztBQUFBLG9CQUFNLE1BQU0sYUFBYTtBQUFBLG9CQUFPLHVCQUFhO0FBQUEsbUJBQU07QUFBQTtBQUFBLGVBRXhEO0FBQUE7QUFBQSxXQUNGO0FBQUEsVUFDQSw4Q0FBQztBQUFBLFlBQU8sS0FBSyxFQUFFLE1BQU0sVUFBVTtBQUFBLFlBQzVCLGtCQUFRLGlCQUFpQjtBQUFBLFdBQzVCO0FBQUEsVUFDQyxlQUNDLDhDQUFDO0FBQUEsWUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLFlBQ2hEO0FBQUEsV0FDSDtBQUFBLFVBRUYsK0NBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsWUFDbkM7QUFBQSw2REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsZ0JBQ2hEO0FBQUEsMEJBQVEsUUFBUSxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksUUFBUSxRQUFRLE1BQU0sQ0FBQztBQUFBLGtCQUFFO0FBQUEsa0JBQUUsUUFBUTtBQUFBO0FBQUEsZUFDaEY7QUFBQSxjQUNBLCtDQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxnQkFDaEQ7QUFBQSwwQkFBUSxHQUFHLE1BQU0sR0FBRyxFQUFFO0FBQUEsa0JBQUU7QUFBQTtBQUFBLGVBQzNCO0FBQUE7QUFBQSxXQUNGO0FBQUE7QUFBQSxPQUNGO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHNCQUFROzs7QUNqRWYsTUFBQUMsY0FBa0M7QUFTOUIsTUFBQUMsdUJBQUE7QUFGSixNQUFNLGFBQWEsQ0FBQyxFQUFFLE9BQU8sWUFBWSxNQUF1QjtBQUM5RCxXQUNFLCtDQUFDO0FBQUEsTUFDQyxLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BRUE7QUFBQSxzREFBQztBQUFBLFVBQUssTUFBSztBQUFBLFVBQU8sTUFBSztBQUFBLFNBQVE7QUFBQSxRQUMvQiw4Q0FBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFdBQVc7QUFBQSxVQUNwRDtBQUFBLFNBQ0g7QUFBQSxRQUNBLDhDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLFVBQ2hEO0FBQUEsU0FDSDtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHFCQUFROzs7QUZ1RlAsTUFBQUMsdUJBQUE7QUE1RlIsTUFBTSxpQkFBMkQ7QUFBQSxJQUMvRCxFQUFFLE9BQU8sT0FBTyxPQUFPLGVBQWU7QUFBQSxJQUN0QyxFQUFFLE9BQU8sa0JBQWtCLE9BQU8saUJBQWlCO0FBQUEsSUFDbkQsRUFBRSxPQUFPLGdCQUFnQixPQUFPLGVBQWU7QUFBQSxJQUMvQyxFQUFFLE9BQU8sWUFBWSxPQUFPLFdBQVc7QUFBQSxFQUN6QztBQUVBLFdBQVMsY0FBYyxTQUFrQixRQUErQjtBQUN0RSxZQUFRLFFBQVE7QUFBQSxNQUNkLEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsZUFBTyxRQUFRLFdBQVcsb0JBQW9CLFFBQVEsV0FBVztBQUFBLE1BQ25FLEtBQUs7QUFDSCxlQUFPLFFBQVEsV0FBVyxrQkFBa0IsUUFBUSxXQUFXO0FBQUEsTUFDakUsS0FBSztBQUNILGVBQU8sV0FBVyxRQUFRLE1BQU07QUFBQSxNQUNsQztBQUNFLGVBQU87QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUVBLFdBQVMsYUFBYSxPQUFlLFFBQThCO0FBQ2pFLFVBQU0sT0FBTyxVQUFVLElBQUksWUFBWTtBQUN2QyxZQUFRLFFBQVE7QUFBQSxNQUNkLEtBQUs7QUFDSCxlQUFPLEdBQUcsU0FBUztBQUFBLE1BQ3JCLEtBQUs7QUFDSCxlQUFPLEdBQUc7QUFBQSxNQUNaLEtBQUs7QUFDSCxlQUFPLEdBQUc7QUFBQSxNQUNaLEtBQUs7QUFDSCxlQUFPLEdBQUc7QUFBQSxNQUNaO0FBQ0UsZUFBTyxHQUFHLFNBQVM7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFFQSxNQUFNLGtCQUFrQixDQUFDLFlBQW1DO0FBaEU1RDtBQWlFRSxVQUFNLEVBQUUsYUFBYSxZQUFZLElBQUk7QUFDckMsVUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHlCQUFvQixTQUFTO0FBQy9ELFVBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx5QkFBb0IsQ0FBQyxDQUFDO0FBQ3RELFVBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx5QkFBUyxFQUFFO0FBQ25ELFVBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx5QkFBdUIsS0FBSztBQUVwRSxVQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHlCQUF5QixJQUFJO0FBQzNFLFVBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx5QkFBUyxLQUFLO0FBR3RELFVBQU0saUJBQWEsdUJBQU8sT0FBTztBQUNqQyxlQUFXLFVBQVU7QUFFckIsVUFBTSxtQkFBZSw0QkFBWSxNQUFZO0FBQzNDLG1CQUFhLFNBQVM7QUFDdEIsVUFBSTtBQUNGLGNBQU0sU0FBUyxNQUFNLGFBQWtDLGlCQUFpQixXQUFXLE9BQU87QUFDMUYsb0JBQVksT0FBTyxJQUFJO0FBQ3ZCLHFCQUFhLE9BQU87QUFBQSxNQUN0QixTQUFTLEtBQVA7QUFDQSxjQUFNLFVBQ0osZUFBZSxXQUNYLElBQUksVUFDSjtBQUNOLHdCQUFnQixPQUFPO0FBQ3ZCLHFCQUFhLE9BQU87QUFBQSxNQUN0QjtBQUFBLElBQ0YsSUFBRyxDQUFDLENBQUM7QUFFTCxrQ0FBVSxNQUFNO0FBQ2QsbUJBQWE7QUFBQSxJQUNmLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsVUFBTSxzQkFBc0IsQ0FBQyxZQUFxQjtBQUNoRCx5QkFBbUIsT0FBTztBQUMxQixzQkFBZ0IsSUFBSTtBQUFBLElBQ3RCO0FBRUEsVUFBTSxzQkFBc0IsQ0FBQyxVQUFtQjtBQUM5QyxzQkFBZ0IsS0FBSztBQUNyQixVQUFJLENBQUM7QUFBTywyQkFBbUIsSUFBSTtBQUFBLElBQ3JDO0FBR0EsVUFBTSxpQkFBaUIsQ0FBQyxHQUFHLFFBQVEsRUFBRTtBQUFBLE1BQ25DLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVE7QUFBQSxJQUN0RTtBQUVBLFVBQU0sbUJBQW1CLGVBQWUsT0FBTyxDQUFDLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQztBQUVwRixXQUNFLCtDQUFDO0FBQUEsTUFBWSxPQUFNO0FBQUEsTUFBVSxhQUFZO0FBQUEsTUFDdEM7QUFBQSxzQkFBYyxhQUNiLCtDQUFDO0FBQUEsVUFDQyxLQUFLO0FBQUEsWUFDSCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsWUFDUixRQUFRO0FBQUEsVUFDVjtBQUFBLFVBRUE7QUFBQSwwREFBQztBQUFBLGNBQVEsTUFBSztBQUFBLGFBQVE7QUFBQSxZQUN0Qiw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxjQUFHO0FBQUEsYUFFdEQ7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdELGNBQWMsV0FDYiw4Q0FBQztBQUFBLFVBQVksU0FBUztBQUFBLFNBQWM7QUFBQSxRQUdyQyxjQUFjLFdBQ2IsK0NBQUM7QUFBQSxVQUFLLFFBQU07QUFBQSxVQUFDLE1BQUs7QUFBQSxVQUNoQjtBQUFBLDJEQUFDO0FBQUEsY0FDQztBQUFBLDhEQUFDO0FBQUEsa0JBQUksSUFBRztBQUFBLGtCQUFXO0FBQUEsaUJBQVE7QUFBQSxnQkFDM0IsOENBQUM7QUFBQSxrQkFBSSxJQUFHO0FBQUEsa0JBQVc7QUFBQSxpQkFBUTtBQUFBO0FBQUEsYUFDN0I7QUFBQSxZQUNBLCtDQUFDO0FBQUEsY0FDQztBQUFBLDhEQUFDO0FBQUEsa0JBQVMsSUFBRztBQUFBLGtCQUNYLHdEQUFDO0FBQUEsb0JBQUksS0FBSyxFQUFFLFNBQVMsU0FBUyxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsb0JBQ3BELG1CQUFTLFdBQVcsSUFDbkIsOENBQUM7QUFBQSxzQkFDQyxPQUFNO0FBQUEsc0JBQ04sYUFBWTtBQUFBLHFCQUNkLElBRUE7QUFBQSxzQkFDRTtBQUFBLHNFQUFDO0FBQUEsMEJBQ0MsT0FBTTtBQUFBLDBCQUNOLGdCQUFnQixDQUFDLE9BQU87QUFBQSwwQkFDeEIsT0FBTztBQUFBLDBCQUNQLFVBQVUsQ0FBQyxNQUFNLGdCQUFnQixFQUFFLE9BQU8sS0FBcUI7QUFBQSwwQkFFOUQseUJBQWUsSUFBSSxDQUFDLFFBQ25CLDhDQUFDO0FBQUEsNEJBQXVCLE9BQU8sSUFBSTtBQUFBLDRCQUNoQyxjQUFJO0FBQUEsNkJBRE0sSUFBSSxLQUVqQixDQUNEO0FBQUEseUJBQ0g7QUFBQSx3QkFFQSw4Q0FBQztBQUFBLDBCQUFJLEtBQUssRUFBRSxZQUFZLFNBQVMsZUFBZSxRQUFRO0FBQUEsMEJBQ3RELHdEQUFDO0FBQUEsNEJBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSw0QkFDaEQsdUJBQWEsaUJBQWlCLFFBQVEsWUFBWTtBQUFBLDJCQUNyRDtBQUFBLHlCQUNGO0FBQUEsd0JBRUMsaUJBQWlCLFdBQVcsSUFDM0IsOENBQUM7QUFBQSwwQkFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLFFBQVEsU0FBUztBQUFBLDBCQUM5Qyx5REFBQztBQUFBLDRCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsNEJBQUc7QUFBQTtBQUFBLCtCQUNoRCxvQkFBZSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsWUFBWSxNQUFuRCxtQkFBc0QsTUFBTTtBQUFBLDhCQUFjO0FBQUE7QUFBQSwyQkFDaEY7QUFBQSx5QkFDRixJQUVBLGlCQUFpQixJQUFJLENBQUMsWUFDcEIsOENBQUM7QUFBQSwwQkFFQztBQUFBLDBCQUNBLFVBQVUsTUFBTSxvQkFBb0IsT0FBTztBQUFBLDJCQUZ0QyxRQUFRLEVBR2YsQ0FDRDtBQUFBO0FBQUEscUJBRUw7QUFBQSxtQkFFSjtBQUFBLGlCQUNGO0FBQUEsZ0JBQ0EsOENBQUM7QUFBQSxrQkFBUyxJQUFHO0FBQUEsa0JBQ1gseURBQUM7QUFBQSxvQkFBSSxLQUFLLEVBQUUsU0FBUyxTQUFTO0FBQUEsb0JBQzVCO0FBQUEsb0VBQUM7QUFBQSx3QkFDQyxNQUFLO0FBQUEsd0JBQ0wsT0FBTTtBQUFBLHdCQUNOLGFBQVk7QUFBQSx1QkFDZDtBQUFBLHNCQUNBLDhDQUFDO0FBQUEsd0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSx3QkFBRztBQUFBLHVCQUV0RDtBQUFBO0FBQUEsbUJBQ0Y7QUFBQSxpQkFDRjtBQUFBO0FBQUEsYUFDRjtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBR0QsbUJBQ0MsOENBQUM7QUFBQSxVQUNDLFNBQVM7QUFBQSxVQUNUO0FBQUEsVUFDQSxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsU0FDWjtBQUFBO0FBQUEsS0FFSjtBQUFBLEVBRUo7QUFFQSxNQUFPLDBCQUFROzs7QUcxTmYsTUFBQUMsY0FNTztBQU9DLE1BQUFDLHVCQUFBO0FBSlIsTUFBTSxjQUFjLENBQUMsRUFBRSxhQUFhLFlBQVksTUFBNkI7QUFDM0UsV0FDRSw4Q0FBQztBQUFBLE1BQ0MseURBQUM7QUFBQSxRQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLFNBQVMsU0FBUztBQUFBLFFBQ3ZEO0FBQUEseURBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsWUFDcEM7QUFBQSw0REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsZ0JBQUc7QUFBQSxlQUUxRDtBQUFBLGNBQ0EsOENBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGdCQUFHO0FBQUEsZUFFdEQ7QUFBQTtBQUFBLFdBQ0Y7QUFBQSxVQUVBLDhDQUFDLHVCQUFRO0FBQUEsVUFFVCwrQ0FBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxZQUNwQztBQUFBLDREQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFdBQVc7QUFBQSxnQkFBRztBQUFBLGVBRTFEO0FBQUEsY0FDQSw4Q0FBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsZ0JBQUc7QUFBQSxlQUV0RDtBQUFBO0FBQUEsV0FDRjtBQUFBLFVBRUEsOENBQUMsdUJBQVE7QUFBQSxVQUVULCtDQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFlBQ3BDO0FBQUEsNERBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksV0FBVztBQUFBLGdCQUFHO0FBQUEsZUFFMUQ7QUFBQSxjQUNBLDhDQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sT0FBTztBQUFBLGdCQUFHO0FBQUEsZUFFL0I7QUFBQSxjQUNBLDhDQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxnQkFBRztBQUFBLGVBRXREO0FBQUE7QUFBQSxXQUNGO0FBQUE7QUFBQSxPQUNGO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHNCQUFROzs7QTdCaERmLCtCQUFjO0FBQ1AsTUFBTSxhQUFhO0FBVTFCLE1BQU8sbUJBQVE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLE1BQ3JCLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxNQUNkLDJCQUEyQjtBQUFBLFFBQ3pCLGVBQWU7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxFQUNiOyIsCiAgIm5hbWVzIjogWyJmZXRjaCIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJyZXF1aXJlX3NpZ25hdHVyZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiZmV0Y2hTdHJpcGVTaWduYXR1cmUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiZm9ybWF0RGF0ZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJfYSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiX2EiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJmb3JtYXRBbW91bnQiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
