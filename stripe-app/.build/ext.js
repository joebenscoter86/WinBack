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
  var import_react5 = __require("react");
  var import_ui12 = __toESM(require_ui());

  // src/components/DisputeWorkflow.tsx
  var import_react4 = __require("react");
  var import_ui11 = __toESM(require_ui());

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
          error.message || error.error || `API error: ${response.status}`,
          response.status
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
  var import_react3 = __require("react");
  var import_ui10 = __toESM(require_ui());

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
    onFileChange
  }) => {
    const [error, setError] = (0, import_react2.useState)(null);
    const [showReplace, setShowReplace] = (0, import_react2.useState)(false);
    const [saving, setSaving] = (0, import_react2.useState)(false);
    const handleUploadComplete = (fileObject) => __async(void 0, null, function* () {
      var _a, _b;
      setError(null);
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
            mime_type: (_b = fileObject.type) != null ? _b : "application/octet-stream"
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
    autoPopulated,
    expandedSections,
    notes,
    existingFile,
    disputeId,
    context,
    onToggle,
    onSectionToggle,
    onNotesChange,
    onFileChange
  }) => {
    const whyExpanded = expandedSections.has("why");
    const whereExpanded = expandedSections.has("where");
    const notesExpanded = expandedSections.has("notes");
    const fileExpanded = expandedSections.has("file");
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
      css: { stack: "y", gap: "small", padding: "small", borderRadius: "medium", backgroundColor: "container" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
          css: { stack: "x", gap: "small", alignY: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Checkbox, {
              label: "",
              checked,
              onChange: onToggle,
              "aria-label": item.item
            }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
              css: { stack: "y", gap: "xxsmall", width: "fill" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
                  css: { stack: "x", gap: "xsmall", alignY: "center", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                      css: { font: "body", fontWeight: "semibold", color: checked ? "secondary" : void 0 },
                      children: item.item
                    }),
                    autoPopulated && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
                      type: "info",
                      children: "FROM STRIPE"
                    }),
                    getCategoryBadge(item.category)
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
                  css: { stack: "x", gap: "small", wrap: "wrap" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: "Why this matters",
                      expanded: whyExpanded,
                      onPress: () => onSectionToggle("why")
                    }),
                    item.where_to_find && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SectionToggle, {
                      label: "Where to find this",
                      expanded: whereExpanded,
                      onPress: () => onSectionToggle("where")
                    }),
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
        whereExpanded && item.where_to_find && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge", padding: "small", borderRadius: "small" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
            css: { font: "caption", color: "secondary" },
            children: item.where_to_find
          })
        }),
        notesExpanded && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TextArea, {
            label: "Your notes",
            placeholder: "e.g. tracking #, file name, where to find this...",
            value: notes,
            onChange: (e) => onNotesChange(e.target.value),
            rows: 2
          })
        }),
        fileExpanded && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FileUploadSection_default, {
            disputeId,
            checklistItemKey: item.item,
            existingFile,
            context,
            onFileChange
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
    const [checklistState, setChecklistState] = (0, import_react3.useState)(
      () => buildInitialState(items, dispute)
    );
    const [notesState, setNotesState] = (0, import_react3.useState)(
      () => {
        var _a2;
        return (_a2 = dispute.checklist_notes) != null ? _a2 : {};
      }
    );
    const [expandedSections, setExpandedSections] = (0, import_react3.useState)(/* @__PURE__ */ new Map());
    const [filesState, setFilesState] = (0, import_react3.useState)({});
    const [showFullChecklist, setShowFullChecklist] = (0, import_react3.useState)(false);
    const checklistTimeoutRef = (0, import_react3.useRef)(null);
    const notesTimeoutRef = (0, import_react3.useRef)(null);
    const contextRef = (0, import_react3.useRef)(context);
    contextRef.current = context;
    (0, import_react3.useEffect)(() => {
      var _a2;
      setChecklistState(buildInitialState(items, dispute));
      setNotesState((_a2 = dispute.checklist_notes) != null ? _a2 : {});
    }, [dispute.id, dispute.checklist_state, dispute.checklist_notes, playbook == null ? void 0 : playbook.reason_code]);
    (0, import_react3.useEffect)(() => {
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
    const persistChecklist = (0, import_react3.useCallback)((newState) => {
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
    const persistNotes = (0, import_react3.useCallback)((newNotes) => {
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
    const handleToggle = (0, import_react3.useCallback)((itemName) => {
      setChecklistState((prev) => {
        const newState = __spreadProps(__spreadValues({}, prev), { [itemName]: !prev[itemName] });
        persistChecklist(newState);
        return newState;
      });
    }, [persistChecklist]);
    const handleNotesChange = (0, import_react3.useCallback)((itemName, value) => {
      setNotesState((prev) => {
        const newNotes = __spreadProps(__spreadValues({}, prev), { [itemName]: value });
        persistNotes(newNotes);
        return newNotes;
      });
    }, [persistNotes]);
    const handleFileChange = (0, import_react3.useCallback)((itemName, file) => {
      setFilesState((prev) => __spreadProps(__spreadValues({}, prev), { [itemName]: file }));
    }, []);
    const handleSectionToggle = (0, import_react3.useCallback)((itemName, section) => {
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Banner, {
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
              return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChecklistItem_default, {
                item,
                checked: !!checklistState[item.item],
                autoPopulated: isAutoPopulated(item, dispute),
                expandedSections: (_a2 = expandedSections.get(item.item)) != null ? _a2 : /* @__PURE__ */ new Set(),
                notes: (_b = notesState[item.item]) != null ? _b : "",
                existingFile: (_c = filesState[item.item]) != null ? _c : null,
                disputeId: dispute.id,
                context: contextRef.current,
                onToggle: () => handleToggle(item.item),
                onSectionToggle: (section) => handleSectionToggle(item.item, section),
                onNotesChange: (value) => handleNotesChange(item.item, value),
                onFileChange: (file) => handleFileChange(item.item, file)
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

  // src/components/DisputeWorkflow.tsx
  var import_jsx_runtime11 = __require("react/jsx-runtime");
  var DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }) => {
    const [currentStep, setCurrentStep] = (0, import_react4.useState)("review");
    const [dispute, setDispute] = (0, import_react4.useState)(initialDispute);
    const [playbook, setPlaybook] = (0, import_react4.useState)(null);
    const [loading, setLoading] = (0, import_react4.useState)({
      dispute: false,
      playbook: false
    });
    const [errors, setErrors] = (0, import_react4.useState)({
      dispute: null,
      playbook: null
    });
    const contextRef = (0, import_react4.useRef)(context);
    contextRef.current = context;
    (0, import_react4.useEffect)(() => {
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
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
        css: { padding: "medium", stack: "y", gap: "large" },
        children: [
          errors.dispute && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ErrorBanner_default, {
            message: errors.dispute
          }),
          isLoadingPlaybook ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
            css: { alignX: "center", padding: "medium", stack: "y", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Spinner, {
                size: "medium"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Loading playbook..."
              })
            ]
          }) : errors.playbook ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ErrorBanner_default, {
            message: errors.playbook
          }) : playbook ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CoachHeader_default, {
                headline: playbook.coach_headline,
                summary: playbook.coach_summary,
                urgencyMode: isUrgent,
                daysRemaining
              }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(QuickActions_default, {
                playbook,
                urgencyMode: isUrgent
              })
            ]
          }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
            type: "default",
            title: "No playbook available",
            description: "We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DisputeOverview_default, {
            dispute,
            loading: loading.dispute
          }),
          playbook && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LearnMore_default, {
            issuerSummary: playbook.coach_issuer_summary,
            acquirerSummary: playbook.coach_acquirer_summary
          })
        ]
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.FocusView, {
      title: `Dispute ${initialDispute.id.slice(0, 12)}...`,
      shown,
      setShown,
      confirmCloseMessages: {
        title: "Leave dispute workflow?",
        description: "Your progress on this step will not be saved.",
        cancelAction: "Stay",
        exitAction: "Leave"
      },
      primaryAction: isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Button, {
        type: "primary",
        onPress: () => setShown(false),
        children: "Submit (placeholder)"
      }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Button, {
        type: "primary",
        onPress: handleNext,
        children: [
          "Next: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]
        ]
      }),
      secondaryAction: isFirstStep ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Button, {
        onPress: () => setShown(false),
        children: "Cancel"
      }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Button, {
        onPress: handleBack,
        children: [
          "Back: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
        css: { stack: "y" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
            css: { padding: "medium", paddingBottom: "small" },
            children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DeadlineTimer_default, {
              dueBy: dispute.due_by,
              status: dispute.status
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Tabs, {
            fitted: true,
            size: "medium",
            selectedKey: currentStep,
            onSelectionChange: (key) => setCurrentStep(key),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabList, {
                children: WIZARD_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Tab, {
                  id: step,
                  children: WIZARD_STEP_LABELS[step]
                }, step))
              }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.TabPanels, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                    id: "review",
                    children: renderReviewTab()
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                    id: "evidence",
                    children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceChecklist_default, {
                      dispute,
                      playbook,
                      context: contextRef.current,
                      isUrgent,
                      daysRemaining
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                    id: "narrative",
                    children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                      css: { padding: "medium", stack: "y", gap: "medium" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
                          type: "default",
                          title: "Step 3: AI Narrative",
                          description: "Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                          css: { font: "caption", color: "secondary" },
                          children: "AI narrative generation and editing will be built in WIN-18 and WIN-19."
                        })
                      ]
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                    id: "submit",
                    children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                      css: { padding: "medium", stack: "y", gap: "medium" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
                          type: "caution",
                          title: "Step 4: Submit Evidence",
                          description: "Review everything one final time. Submission to Stripe is irrevocable."
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
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
        ]
      })
    });
  };
  var DisputeWorkflow_default = DisputeWorkflow;

  // src/views/PaymentDisputeView.tsx
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  var PaymentDisputeView = (context) => {
    var _a;
    const { environment } = context;
    const paymentIntentId = (_a = environment == null ? void 0 : environment.objectContext) == null ? void 0 : _a.id;
    const [viewState, setViewState] = (0, import_react5.useState)("loading");
    const [dispute, setDispute] = (0, import_react5.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react5.useState)(false);
    const contextRef = (0, import_react5.useRef)(context);
    contextRef.current = context;
    const loadDispute = (0, import_react5.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react5.useEffect)(() => {
      loadDispute();
    }, [loadDispute]);
    if (viewState === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Spinner, {
            size: "large"
          })
        })
      });
    }
    if (viewState === "no_dispute" || viewState === "error" || !dispute) {
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
            css: { font: "caption", color: "secondary" },
            children: "No dispute on this payment."
          })
        })
      });
    }
    const statusBadge = getStatusBadge(dispute.status);
    const reasonLabel = getReasonCodeLabel(dispute.network, dispute.reason_code);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.ContextView, {
      title: "WinBack",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
          css: { padding: "medium", stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
              css: {
                stack: "x",
                gap: "small",
                distribute: "space-between",
                alignY: "center"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                  css: { font: "heading", fontWeight: "semibold" },
                  children: "Dispute"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Badge, {
                  type: statusBadge.type,
                  children: statusBadge.label
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
              css: { stack: "y", gap: "xsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                  css: { font: "body", fontWeight: "semibold" },
                  children: reasonLabel != null ? reasonLabel : dispute.reason.replace(/_/g, " ")
                }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: [
                    dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                    " ",
                    dispute.reason_code
                  ]
                })
              ]
            }),
            (dispute.status === "needs_response" || dispute.status === "warning_needs_response") && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Button, {
              type: "primary",
              css: { width: "fill" },
              onPress: () => setShowWorkflow(true),
              children: "Open in WinBack"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(DisputeWorkflow_default, {
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
  var import_react6 = __require("react");
  var import_ui15 = __toESM(require_ui());

  // src/components/DisputeCard.tsx
  var import_ui13 = __toESM(require_ui());
  var import_jsx_runtime13 = __require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Button, {
      type: "secondary",
      css: { width: "fill" },
      onPress: () => onSelect(dispute.id),
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
        css: {
          stack: "y",
          gap: "xsmall",
          width: "fill",
          padding: "small"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
            css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
                css: { font: "body", fontWeight: "semibold" },
                children: formatAmount2(dispute.amount, dispute.currency)
              }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
                css: { stack: "x", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Badge, {
                    type: statusBadge.type,
                    children: statusBadge.label
                  }),
                  urgencyBadge && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Badge, {
                    type: urgencyBadge.type,
                    children: urgencyBadge.label
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
            css: { font: "caption" },
            children: dispute.customer_name || "Unknown customer"
          }),
          reasonLabel && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui13.Inline, {
            css: { font: "caption", color: "secondary" },
            children: reasonLabel
          }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Box, {
            css: { stack: "x", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Inline, {
                css: { font: "caption", color: "secondary" },
                children: [
                  dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                  " ",
                  dispute.reason_code
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui13.Inline, {
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
  var import_ui14 = __toESM(require_ui());
  var import_jsx_runtime14 = __require("react/jsx-runtime");
  var EmptyState = ({ title, description }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_ui14.Box, {
      css: {
        padding: "xlarge",
        stack: "y",
        gap: "small",
        alignX: "center",
        alignY: "center"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Icon, {
          name: "info",
          size: "large"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
          css: { font: "heading", fontWeight: "semibold" },
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ui14.Inline, {
          css: { font: "caption", color: "secondary" },
          children: description
        })
      ]
    });
  };
  var EmptyState_default = EmptyState;

  // src/views/DisputeListView.tsx
  var import_jsx_runtime15 = __require("react/jsx-runtime");
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
    const [viewState, setViewState] = (0, import_react6.useState)("loading");
    const [disputes, setDisputes] = (0, import_react6.useState)([]);
    const [errorMessage, setErrorMessage] = (0, import_react6.useState)("");
    const [statusFilter, setStatusFilter] = (0, import_react6.useState)("all");
    const [selectedDispute, setSelectedDispute] = (0, import_react6.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react6.useState)(false);
    const contextRef = (0, import_react6.useRef)(context);
    contextRef.current = context;
    const loadDisputes = (0, import_react6.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react6.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.ContextView, {
      title: "WinBack",
      description: "Guided dispute resolution",
      children: [
        viewState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
          css: {
            padding: "xlarge",
            alignX: "center",
            alignY: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Spinner, {
              size: "large"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Loading disputes..."
            })
          ]
        }),
        viewState === "error" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ErrorBanner_default, {
          message: errorMessage
        }),
        viewState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Tabs, {
          fitted: true,
          size: "medium",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.TabList, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Tab, {
                  id: "disputes",
                  children: "Disputes"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Tab, {
                  id: "insights",
                  children: "Insights"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.TabPanel, {
                  id: "disputes",
                  children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Box, {
                    css: { padding: "small", stack: "y", gap: "small" },
                    children: disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyState_default, {
                      title: "No disputes yet",
                      description: "When a dispute comes in, we'll walk you through exactly what to do."
                    }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Select, {
                          label: "Filter",
                          hiddenElements: ["label"],
                          value: statusFilter,
                          onChange: (e) => setStatusFilter(e.target.value),
                          children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", {
                            value: opt.value,
                            children: opt.label
                          }, opt.value))
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Box, {
                          css: { paddingTop: "small", paddingBottom: "small" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: getCountText(filteredDisputes.length, statusFilter)
                          })
                        }),
                        filteredDisputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Box, {
                          css: { padding: "medium", alignX: "center" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: [
                              "No ",
                              (_a = FILTER_OPTIONS.find((o) => o.value === statusFilter)) == null ? void 0 : _a.label.toLowerCase(),
                              " disputes."
                            ]
                          })
                        }) : filteredDisputes.map((dispute) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DisputeCard_default, {
                          dispute,
                          onSelect: () => handleSelectDispute(dispute)
                        }, dispute.id))
                      ]
                    })
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.TabPanel, {
                  id: "insights",
                  children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui15.Box, {
                    css: { padding: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Banner, {
                        type: "default",
                        title: "Insights",
                        description: "Win rate analytics and dispute patterns will appear here."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui15.Inline, {
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
        selectedDispute && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DisputeWorkflow_default, {
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
  var import_ui16 = __toESM(require_ui());
  var import_jsx_runtime16 = __require("react/jsx-runtime");
  var AppSettings = ({ environment, userContext }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.SettingsView, {
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui16.Box, {
        css: { stack: "y", gap: "medium", padding: "medium" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui16.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Subscription"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Subscription management will be available here. Coming in WIN-24."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui16.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Account"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Connected Stripe account information will appear here."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_ui16.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "About WinBack"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
                css: { font: "body" },
                children: "Version 0.0.1"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_ui16.Inline, {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EZWFkbGluZVRpbWVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9ldmlkZW5jZS9DaGVja2xpc3RQcm9ncmVzcy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0SXRlbS50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvRmlsZVVwbG9hZFNlY3Rpb24udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeCIsICIuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU0RLX1ZFUlNJT04gPSB2b2lkIDA7XG5leHBvcnRzLlNES19WRVJTSU9OID0gJzkuMS4wJztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFibGVIZWFkZXJDZWxsID0gZXhwb3J0cy5UYWJsZUhlYWQgPSBleHBvcnRzLlRhYmxlRm9vdGVyID0gZXhwb3J0cy5UYWJsZUNlbGwgPSBleHBvcnRzLlRhYmxlQm9keSA9IGV4cG9ydHMuVGFiID0gZXhwb3J0cy5UYWJQYW5lbHMgPSBleHBvcnRzLlRhYlBhbmVsID0gZXhwb3J0cy5UYWJMaXN0ID0gZXhwb3J0cy5Td2l0Y2ggPSBleHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGV4cG9ydHMuU3Bpbm5lciA9IGV4cG9ydHMuU3BhcmtsaW5lID0gZXhwb3J0cy5TaWduSW5WaWV3ID0gZXhwb3J0cy5TZXR0aW5nc1ZpZXcgPSBleHBvcnRzLlNlbGVjdCA9IGV4cG9ydHMuUmFkaW8gPSBleHBvcnRzLlByb3BlcnR5TGlzdCA9IGV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBleHBvcnRzLk1lbnUgPSBleHBvcnRzLk1lbnVJdGVtID0gZXhwb3J0cy5NZW51R3JvdXAgPSBleHBvcnRzLkxpc3QgPSBleHBvcnRzLkxpc3RJdGVtID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5MaW5lQ2hhcnQgPSBleHBvcnRzLklubGluZSA9IGV4cG9ydHMuSW1nID0gZXhwb3J0cy5JY29uID0gZXhwb3J0cy5Gb3JtRmllbGRHcm91cCA9IGV4cG9ydHMuRm9jdXNWaWV3ID0gZXhwb3J0cy5EaXZpZGVyID0gZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBleHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBleHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBleHBvcnRzLkRhdGVGaWVsZCA9IGV4cG9ydHMuQ29udGV4dFZpZXcgPSBleHBvcnRzLkNoaXAgPSBleHBvcnRzLkNoaXBMaXN0ID0gZXhwb3J0cy5DaGVja2JveCA9IGV4cG9ydHMuQnV0dG9uID0gZXhwb3J0cy5CdXR0b25Hcm91cCA9IGV4cG9ydHMuQm94ID0gZXhwb3J0cy5CYXJDaGFydCA9IGV4cG9ydHMuQmFubmVyID0gZXhwb3J0cy5CYWRnZSA9IGV4cG9ydHMuQWNjb3JkaW9uID0gZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gdm9pZCAwO1xuZXhwb3J0cy5Ub29sdGlwID0gZXhwb3J0cy5UZXh0RmllbGQgPSBleHBvcnRzLlRleHRBcmVhID0gZXhwb3J0cy5UYXNrTGlzdCA9IGV4cG9ydHMuVGFza0xpc3RJdGVtID0gZXhwb3J0cy5UYWJzID0gZXhwb3J0cy5UYWJsZVJvdyA9IGV4cG9ydHMuVGFibGUgPSB2b2lkIDA7XG5jb25zdCBqc3hfcnVudGltZV8xID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJAcmVtb3RlLXVpL3JlYWN0XCIpO1xuY29uc3QgdmVyc2lvbl8xID0gcmVxdWlyZShcIi4uL3ZlcnNpb25cIik7XG5jb25zdCB3aXRoU2RrUHJvcHMgPSAoQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgV2l0aFNka1Byb3BzID0gKHByb3BzKSA9PiAoKDAsIGpzeF9ydW50aW1lXzEuanN4KShDb21wb25lbnQsIHsgLi4ucHJvcHMsIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSwgc2RrVmVyc2lvbjogdmVyc2lvbl8xLlNES19WRVJTSU9OLCBzY2hlbWFWZXJzaW9uOiBcInY5XCIgfSkpO1xuICAgIFdpdGhTZGtQcm9wcy53cmFwcGVkQ29tcG9uZW50TmFtZSA9IHdyYXBwZWRDb21wb25lbnROYW1lO1xuICAgIHJldHVybiBXaXRoU2RrUHJvcHM7XG59O1xuY29uc3QgZGVmaW5lQ29tcG9uZW50ID0gKG5hbWUsIGZyYWdtZW50UHJvcHMsIHdyYXBXaXRoU2RrUHJvcHMpID0+IHtcbiAgICBjb25zdCByZW1vdGVDb21wb25lbnQgPSAoMCwgcmVhY3RfMS5jcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCkobmFtZSwge1xuICAgICAgICBmcmFnbWVudFByb3BzLFxuICAgIH0pO1xuICAgIGlmICghd3JhcFdpdGhTZGtQcm9wcykge1xuICAgICAgICByZXR1cm4gcmVtb3RlQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aFNka1Byb3BzKHJlbW90ZUNvbXBvbmVudCk7XG59O1xuZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb25JdGVtJywgWyd0aXRsZScsICdhY3Rpb25zJywgJ21lZGlhJywgJ3N1YnRpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5BY2NvcmRpb24gPSBkZWZpbmVDb21wb25lbnQoJ0FjY29yZGlvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFkZ2UgPSBkZWZpbmVDb21wb25lbnQoJ0JhZGdlJywgW10sIHRydWUpO1xuZXhwb3J0cy5CYW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ0Jhbm5lcicsIFsnYWN0aW9ucycsICdkZXNjcmlwdGlvbicsICd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQmFyQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0JhckNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5Cb3ggPSBkZWZpbmVDb21wb25lbnQoJ0JveCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0J1dHRvbkdyb3VwJywgWydtZW51VHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoZWNrYm94ID0gZGVmaW5lQ29tcG9uZW50KCdDaGVja2JveCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXBMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdDaGlwTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ2hpcCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ29udGV4dFZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0NvbnRleHRWaWV3JywgWydhY3Rpb25zJywgJ2Jhbm5lcicsICdmb290ZXJDb250ZW50JywgJ3ByaW1hcnlBY3Rpb24nLCAnc2Vjb25kYXJ5QWN0aW9uJ10sIHRydWUpO1xuZXhwb3J0cy5EYXRlRmllbGQgPSBkZWZpbmVDb21wb25lbnQoJ0RhdGVGaWVsZCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VNb2R1bGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VUYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZVRhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EaXZpZGVyID0gZGVmaW5lQ29tcG9uZW50KCdEaXZpZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Gb2N1c1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0ZvY3VzVmlldycsIFsnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0Zvcm1GaWVsZEdyb3VwJywgW10sIHRydWUpO1xuZXhwb3J0cy5JY29uID0gZGVmaW5lQ29tcG9uZW50KCdJY29uJywgW10sIHRydWUpO1xuZXhwb3J0cy5JbWcgPSBkZWZpbmVDb21wb25lbnQoJ0ltZycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW5saW5lID0gZGVmaW5lQ29tcG9uZW50KCdJbmxpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpbmVDaGFydCA9IGRlZmluZUNvbXBvbmVudCgnTGluZUNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5rID0gZGVmaW5lQ29tcG9uZW50KCdMaW5rJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnTGlzdEl0ZW0nLCBbJ2ljb24nLCAnaW1hZ2UnLCAnc2Vjb25kYXJ5VGl0bGUnLCAndGl0bGUnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVHcm91cCA9IGRlZmluZUNvbXBvbmVudCgnTWVudUdyb3VwJywgWyd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuTWVudUl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ01lbnVJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51ID0gZGVmaW5lQ29tcG9uZW50KCdNZW51JywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuZXhwb3J0cy5PbmJvYXJkaW5nVmlldyA9IGRlZmluZUNvbXBvbmVudCgnT25ib2FyZGluZ1ZpZXcnLCBbJ2Vycm9yJ10sIHRydWUpO1xuZXhwb3J0cy5QbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdQbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5Qcm9wZXJ0eUxpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3RJdGVtJywgWydsYWJlbCcsICd2YWx1ZSddLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlJhZGlvID0gZGVmaW5lQ29tcG9uZW50KCdSYWRpbycsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNlbGVjdCA9IGRlZmluZUNvbXBvbmVudCgnU2VsZWN0JywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTZXR0aW5nc1ZpZXcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNpZ25JblZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1NpZ25JblZpZXcnLCBbJ2Rlc2NyaXB0aW9uQWN0aW9uQ29udGVudHMnLCAnZm9vdGVyQ29udGVudCddLCB0cnVlKTtcbmV4cG9ydHMuU3BhcmtsaW5lID0gZGVmaW5lQ29tcG9uZW50KCdTcGFya2xpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNwaW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ1NwaW5uZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGRlZmluZUNvbXBvbmVudCgnU3RyaXBlRmlsZVVwbG9hZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Td2l0Y2ggPSBkZWZpbmVDb21wb25lbnQoJ1N3aXRjaCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1RhYkxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiUGFuZWxzID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbHMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYiA9IGRlZmluZUNvbXBvbmVudCgnVGFiJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUJvZHkgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlQm9keScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVDZWxsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUNlbGwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlRm9vdGVyID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUZvb3RlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVIZWFkID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUhlYWQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkZXJDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnVGFibGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlUm93ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZVJvdycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFicyA9IGRlZmluZUNvbXBvbmVudCgnVGFicycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFza0xpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdEl0ZW0nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEFyZWEgPSBkZWZpbmVDb21wb25lbnQoJ1RleHRBcmVhJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0RmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5Ub29sdGlwID0gZGVmaW5lQ29tcG9uZW50KCdUb29sdGlwJywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogUHJpdmF0ZSEgVGhpcyBhbGxvd3MgdGhlIHNoYXJlZCBlbmRwb2ludCB0byBiZSBpbnRpYWxpemVkXG4gKiBzbyB0aGF0IHRoZSBTREsgY2FuIGNvbW11bmljYXRlIHdpdGggdGhlIERhc2hib2FyZC5cbiAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRIb3N0RW5kcG9pbnQgPSB2b2lkIDA7XG5jb25zdCBpbnZhcmlhbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaW52YXJpYW50XCIpKTtcbmNvbnN0IGdldEhvc3RFbmRwb2ludCA9ICgpID0+IHtcbiAgICAvLyBUaGlzIGlzIGVuZHBvaW50IGlzIGNyZWF0ZWQgZnJvbSB0aGUgTWVzc2FnZVBvcnQgdHJhbnNmZXJyZWQgZnJvbSB0aGUgaG9zdCBlbnZcbiAgICAvLyBhcyBhIHBhcnQgb2YgdGhlIGBpbml0X2V4dGVuc2lvbmAgbWVzc2FnZS5cbiAgICBjb25zdCBob3N0RW5kcG9pbnQgPSBnbG9iYWxUaGlzLl9fU3RyaXBlRXh0RXhwb3J0cz8uZW5kcG9pbnQ7XG4gICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKGhvc3RFbmRwb2ludCwgJ2hvc3RFbmRwb2ludCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQnKTtcbiAgICByZXR1cm4gaG9zdEVuZHBvaW50O1xufTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gZ2V0SG9zdEVuZHBvaW50O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSB2b2lkIDA7XG5jb25zdCBfZW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuLi9fZW5kcG9pbnRcIik7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpXG4gICAgLmNhbGwuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KClcbiAgICAudGhlbigoc3VwcG9ydGVkKSA9PiBzdXBwb3J0ZWQpXG4gICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hBcHBFbWJlZGRlZEtleSgpO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGFwcCBlbWJlZGRlZCBrZXknKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaUtleTtcbn07XG5leHBvcnRzLmZldGNoQXBwRW1iZWRkZWRLZXkgPSBmZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gdm9pZCAwO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vZmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWUgPSBhc3luYyAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgZmV0Y2hBcHBFbWJlZGRlZEtleV8xLmZldGNoQXBwRW1iZWRkZWRLZXkpKCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGluaXQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgY29uc3Qgc2VyaWFsaXphYmxlUmVzcG9uc2UgPSB7XG4gICAgICAgIGpzb246IHVuZGVmaW5lZCxcbiAgICAgICAgYXJyYXlCdWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb2s6IHJlc3BvbnNlLm9rLFxuICAgICAgICByZWRpcmVjdGVkOiByZXNwb25zZS5yZWRpcmVjdGVkLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgdHlwZTogcmVzcG9uc2UudHlwZSxcbiAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgfTtcbiAgICBzd2l0Y2ggKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkge1xuICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc2VyaWFsaXphYmxlUmVzcG9uc2U7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gZmV0Y2hWaWFGcmFtZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFIb3N0ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0ID0gYXN5bmMgKGVuY29kZWRVcmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5jb2RlZFVybCk7XG4gICAgcmV0dXJuICgwLCBfZW5kcG9pbnRfMS5nZXRIb3N0RW5kcG9pbnQpKCkuY2FsbC5zdHJpcGVBcGlGZXRjaCh1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCBvcHRpb25zKTtcbn07XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IGZldGNoVmlhSG9zdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWVfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhRnJhbWVcIik7XG5jb25zdCBmZXRjaFZpYUhvc3RfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhSG9zdFwiKTtcbmxldCBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gbnVsbDtcbmNvbnN0IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCkge1xuICAgICAgICBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gKGF3YWl0ICgwLCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMS5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkpKCkpXG4gICAgICAgICAgICA/IGZldGNoVmlhRnJhbWVfMS5mZXRjaFZpYUZyYW1lXG4gICAgICAgICAgICA6IGZldGNoVmlhSG9zdF8xLmZldGNoVmlhSG9zdDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkU3RyaXBlQXBpRmV0Y2g7XG59O1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHZvaWQgMDtcbnZhciBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDsgfSB9KTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IHN0cmlwZUFwaUZldGNoID0gYXN5bmMgKHBhdGgsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcmVmZXJyZWRGZXRjaE1ldGhvZCA9IGF3YWl0ICgwLCBhcGlfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCkoKTtcbiAgICByZXR1cm4gcHJlZmVycmVkRmV0Y2hNZXRob2QocGF0aCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5zdHJpcGVBcGlGZXRjaCA9IHN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSBleHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBleHBvcnRzLlNUUklQRV9BUElfS0VZID0gZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IHZvaWQgMDtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBIdHRwQ2xpZW50IHRoYXQgY2FuIGJlIHBsdWdnZWQgaW50byBzdHJpcGUtbm9kZVxuICogdGhhdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHVzZSBzdHJpcGUtbm9kZSBpbiBleHRlbnNpb25zIGlmIHRoZSBEYXNoYm9hcmRcbiAqIHByb3ZpZGVzIGEgYHN0cmlwZUFwaUZldGNoYCBmdW5jdGlvbiB0aGF0IHdpbGwgcmVsYXkgQVBJIGNhbGxzIHRocm91Z2ggdGhlXG4gKiBEYXNoYm9hcmQgYW5kIHBpZ2d5IGJhY2sgb24gdGhlIHVzZXIncyBEYXNoYm9hcmQgc2Vzc2lvbi5cbiAqL1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBhcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vYXBpRmV0Y2hcIik7XG5jb25zdCBtYXRjaGVzU3RyaXBlS2V5ID0gL1twc11rXyh0ZXN0fGxpdmUpX1tBLVphLXowLTldKy87XG5jbGFzcyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwKSB7XG4gICAgICAgIHRoaXMuX3Jlc3AgPSByZXNwO1xuICAgIH1cbiAgICBnZXRIZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5oZWFkZXJzO1xuICAgIH1cbiAgICBnZXRTdGF0dXNDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5zdGF0dXM7XG4gICAgfVxuICAgIGdldFJhd1Jlc3BvbnNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICB0b1N0cmVhbSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJlYW1zIGhhdmUgbm90IGJlZW4gaW1wbGVtZW50ZWQgaW4gdGhlIFN0cmlwZSBIVFRQIGNsaWVudCcpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgeyBqc29uIH0gPSB0aGlzLl9yZXNwO1xuICAgICAgICBpZiAoanNvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdSZXNwb25zZSBib2R5IHVuZGVmaW5lZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdHJpcGVBcHBzSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoZmV0Y2gpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBnZXRDbGllbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3N0cmlwZS11aS1leHRlbnNpb24nO1xuICAgIH1cbiAgICBhc3luYyBtYWtlUmVxdWVzdChob3N0LCBwb3J0LCBwYXRoLCBtZXRob2QsIGhlYWRlcnMsIHJlcXVlc3REYXRhLCBwcm90b2NvbCwgX3RpbWVvdXQpIHtcbiAgICAgICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKHByb3RvY29sID09PSAnaHR0cHMnLCAnTXVzdCB1c2UgaHR0cHMgY29ubmVjdGlvbnMgaW4gVUkgZXh0ZW5zaW9ucycpO1xuICAgICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAocmVxdWVzdERhdGEpIHtcbiAgICAgICAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gcmVxdWVzdERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGhlYWRlcnMuQXV0aG9yaXphdGlvbjtcbiAgICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgbWF0Y2hlc1N0cmlwZUtleS50ZXN0KGF1dGhIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgYWN0dWFsIHN0cmlwZSBrZXlzIHdoZW4gdXNpbmcgdGhlIFN0cmlwZSBKUyBBUEkgY2xpZW50IHdpdGggVUkgZXh0ZXNpb25zLlxcblxcbiBJbnN0ZWFkLCB1c2UgYFNUUklQRV9BUElfS0VZYCBmcm9tIGBAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvaHR0cF9jbGllbnRgIGFzIGEgcGxhY2Vob2xkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBgJHtwcm90b2NvbH06Ly8ke2hvc3R9YCk7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9mZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKTtcbiAgICAgICAgLy8gVE9ETzogQWRkIHN1cHBvcnQgZm9yIHRpbWVvdXRzLlxuICAgICAgICByZXR1cm4gbmV3IFN0cmlwZUFwcHNIdHRwUmVzcG9uc2UocmVzcCk7XG4gICAgfVxufVxuZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IFN0cmlwZUFwcHNIdHRwQ2xpZW50O1xuLy8gRE8gTk9UIGNoYW5nZSB0aGlzIHN0cmluZyB3aXRob3V0IGEgZGVwcmVjYXRpb24gcGxhbi4gVGhlIHJ1bnRpbWUgY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoaXNcbi8vIGV4YWN0IHN0cmluZyBpcyBwYXNzZWQsIG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuLy8gU2VlOiBtYW5hZ2UvZnJvbnRlbmQvc3JjL3RhaWxvci9leHRlbnNpb25zL2hvc3QvYXBpX2ZldGNoLmpzXG5leHBvcnRzLlNUUklQRV9BUElfS0VZID0gJ0RPX05PVF9QQVNTX0FfUkVBTF9BUElfS0VZJztcbmNvbnN0IGNyZWF0ZUh0dHBDbGllbnQgPSAoKSA9PiBuZXcgU3RyaXBlQXBwc0h0dHBDbGllbnQoYXBpRmV0Y2hfMS5zdHJpcGVBcGlGZXRjaCk7XG5leHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBjcmVhdGVIdHRwQ2xpZW50O1xuZXhwb3J0cy5BVVRIT1JJWkFUSU9OX0hFQURFUiA9ICdBdXRob3JpemF0aW9uJztcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGBCZWFyZXIgJHtleHBvcnRzLlNUUklQRV9BUElfS0VZfWA7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSB2b2lkIDA7XG5jb25zdCBodHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi4vaHR0cENsaWVudFwiKTtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoeyBob3N0LCBwb3J0IH0pID0+IGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cHM6Ly8ke2hvc3R9OiR7cG9ydH0vdjEvYXBwcy9hcHBfZW1iZWRkZWRfYmFja2VuZF9zaWduYXR1cmVgKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncGF5bG9hZCcsIEpTT04uc3RyaW5naWZ5KHsgLi4ucGF5bG9hZCB9KSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2luY2x1ZGVfb25seVtdJywgJ3NpZ25hdHVyZScpO1xuICAgIGNvbnN0IGNsaWVudCA9ICgwLCBodHRwQ2xpZW50XzEuY3JlYXRlSHR0cENsaWVudCkoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGNsaWVudC5tYWtlUmVxdWVzdChob3N0LCBwb3J0LCB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCAnR0VUJywge30sIG51bGwsICdodHRwcycpO1xuICAgIHJldHVybiByZXNwb25zZVxuICAgICAgICAudGhlbigocikgPT4gci50b0pTT04oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuc2lnbmF0dXJlKTtcbn07XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRDb25uZWN0aW9uU2V0dGluZ3MgPSBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHZvaWQgMDtcbmNvbnN0IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgaG9zdDogJ2FwaS5zdHJpcGUuY29tJyxcbiAgICBwb3J0OiA0NDMsXG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0gZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncztcbmNvbnN0IHNldENvbm5lY3Rpb25TZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIGV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgICAgICAuLi5kZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzLFxuICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gc2V0Q29ubmVjdGlvblNldHRpbmdzO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IHZvaWQgMDtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMSA9IHJlcXVpcmUoXCIuL3NpZ25hdHVyZS9jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9hcGkvc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XCIpO1xuY29uc3QgY29ubmVjdGlvblNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzXCIpO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9fZW5kcG9pbnRcIik7XG5jb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGFzeW5jIChhZGRpdGlvbmFsUGF5bG9hZCkgPT4ge1xuICAgIGlmIChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKSB7XG4gICAgICAgIGNvbnN0IGZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoMCwgY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseV8xLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkpKGNvbm5lY3Rpb25TZXR0aW5nc18xLmNvbm5lY3Rpb25TZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hTdHJpcGVTaWduYXR1cmUoYWRkaXRpb25hbFBheWxvYWQpO1xuICAgIH1cbn07XG5leHBvcnRzLmZldGNoU3RyaXBlU2lnbmF0dXJlID0gZmV0Y2hTdHJpcGVTaWduYXR1cmU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBUaGlzIGZpbGUgbW92ZWQgdG8gdXRpbHM7IHJlLWV4cG9ydGVkIHRvIG5vdCBicmVhayBpbXBvcnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaWduYXR1cmVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NpZ25hdHVyZVwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpZ25hdHVyZV8xLmZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIi8vIEFVVE9HRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG5pbXBvcnQgUGF5bWVudERpc3B1dGVWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcnO2ltcG9ydCBEaXNwdXRlTGlzdFZpZXcgZnJvbSAnLi4vc3JjL3ZpZXdzL0Rpc3B1dGVMaXN0Vmlldyc7aW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4uL3NyYy92aWV3cy9BcHBTZXR0aW5ncyc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjYtMDQtMDUgMTY6NDg6MjkuMTk1ODg2IC0wNzAwIFBEVCBtPSswLjAxODM2ODEyNic7XG5cbmV4cG9ydCB7IFxuICBQYXltZW50RGlzcHV0ZVZpZXcsXG5cbiAgRGlzcHV0ZUxpc3RWaWV3LFxuXG4gIEFwcFNldHRpbmdzXG4gfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL3N0cmlwZS5jb20vc3RyaXBlLWFwcC5zY2hlbWEuanNvblwiLFxuICBcImljb25cIjogXCJcIixcbiAgXCJpZFwiOiBcImNvbS5qa2J0ZWNoLndpbmJhY2tcIixcbiAgXCJuYW1lXCI6IFwiV2luQmFja1wiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZGlzcHV0ZSBkZXRhaWxzIHRvIGd1aWRlIG1lcmNoYW50cyB0aHJvdWdoIHRoZSByZXNwb25zZSBwcm9jZXNzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImRpc3B1dGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN1Ym1pdCBldmlkZW5jZSBhbmQgcmVzcG9uc2VzIG9uIGJlaGFsZiBvZiB0aGUgbWVyY2hhbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiY2hhcmdlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY2hhcmdlIGRldGFpbHMgYXNzb2NpYXRlZCB3aXRoIGRpc3B1dGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImN1c3RvbWVyX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY3VzdG9tZXIgaW5mb3JtYXRpb24gZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJmaWxlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgdXBsb2FkZWQgZXZpZGVuY2UgZmlsZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV93cml0ZVwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiVXBsb2FkIGV2aWRlbmNlIGZpbGVzIGZvciBkaXNwdXRlIHJlc3BvbnNlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X2ludGVudF9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHBheW1lbnQgaW50ZW50IGRldGFpbHMgZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfVxuICBdLFxuICBcInBvc3RfaW5zdGFsbF9hY3Rpb25cIjoge1xuICAgIFwidHlwZVwiOiBcInNldHRpbmdzXCJcbiAgfSxcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93aW5iYWNrcGF5LmNvbS9hcGkvXCIsXG4gICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9cIlxuICAgICAgXSxcbiAgICAgIFwicHVycG9zZVwiOiBcIlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJQYXltZW50RGlzcHV0ZVZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQucGF5bWVudC5kZXRhaWxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJEaXNwdXRlTGlzdFZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBTZXR0aW5nc1wiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic2V0dGluZ3NcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxufTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCYWRnZSxcbiAgQnV0dG9uLFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSwgZ2V0UmVhc29uQ29kZUxhYmVsIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAnbm9fZGlzcHV0ZScgfCAnZXJyb3InIHwgJ3JlYWR5JztcblxuY29uc3QgUGF5bWVudERpc3B1dGVWaWV3ID0gKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCB7IGVudmlyb25tZW50IH0gPSBjb250ZXh0O1xuICBjb25zdCBwYXltZW50SW50ZW50SWQgPSBlbnZpcm9ubWVudD8ub2JqZWN0Q29udGV4dD8uaWQ7XG5cbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1dvcmtmbG93LCBzZXRTaG93V29ya2Zsb3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIGNvbnN0IGxvYWREaXNwdXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcGF5bWVudEludGVudElkKSB7XG4gICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWaWV3U3RhdGUoJ2xvYWRpbmcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvYnktcGF5bWVudC1pbnRlbnQvJHtwYXltZW50SW50ZW50SWR9YCxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgKTtcbiAgICAgIHNldERpc3B1dGUocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdyZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtwYXltZW50SW50ZW50SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlKCk7XG4gIH0sIFtsb2FkRGlzcHV0ZV0pO1xuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ25vX2Rpc3B1dGUnIHx8IHZpZXdTdGF0ZSA9PT0gJ2Vycm9yJyB8fCAhZGlzcHV0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTm8gZGlzcHV0ZSBvbiB0aGlzIHBheW1lbnQuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHJlYXNvbkxhYmVsID0gZ2V0UmVhc29uQ29kZUxhYmVsKGRpc3B1dGUubmV0d29yaywgZGlzcHV0ZS5yZWFzb25fY29kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIERpc3B1dGVcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge3JlYXNvbkxhYmVsID8/IGRpc3B1dGUucmVhc29uLnJlcGxhY2UoL18vZywgJyAnKX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgICBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9eycgJ31cbiAgICAgICAgICAgIHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICB7KGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8XG4gICAgICAgICAgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJykgJiYgKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNzcz17eyB3aWR0aDogJ2ZpbGwnIH19XG4gICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRTaG93V29ya2Zsb3codHJ1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgT3BlbiBpbiBXaW5CYWNrXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cblxuICAgICAgPERpc3B1dGVXb3JrZmxvd1xuICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICBzaG93bj17c2hvd1dvcmtmbG93fVxuICAgICAgICBzZXRTaG93bj17c2V0U2hvd1dvcmtmbG93fVxuICAgICAgLz5cbiAgICA8L0NvbnRleHRWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudERpc3B1dGVWaWV3O1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBCYW5uZXIsXG4gIEZvY3VzVmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgV2l6YXJkU3RlcCwgRGlzcHV0ZSwgUGxheWJvb2tEYXRhIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IFdJWkFSRF9TVEVQUywgV0laQVJEX1NURVBfTEFCRUxTIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldERheXNSZW1haW5pbmcsIGlzUmVzb2x2ZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4vRXJyb3JCYW5uZXInO1xuaW1wb3J0IERlYWRsaW5lVGltZXIgZnJvbSAnLi9EZWFkbGluZVRpbWVyJztcbmltcG9ydCBEaXNwdXRlT3ZlcnZpZXcgZnJvbSAnLi9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3JztcbmltcG9ydCBDb2FjaEhlYWRlciBmcm9tICcuL3Jldmlldy9Db2FjaEhlYWRlcic7XG5pbXBvcnQgUXVpY2tBY3Rpb25zIGZyb20gJy4vcmV2aWV3L1F1aWNrQWN0aW9ucyc7XG5pbXBvcnQgTGVhcm5Nb3JlIGZyb20gJy4vcmV2aWV3L0xlYXJuTW9yZSc7XG5pbXBvcnQgRXZpZGVuY2VDaGVja2xpc3QgZnJvbSAnLi9ldmlkZW5jZS9FdmlkZW5jZUNoZWNrbGlzdCc7XG5cbmludGVyZmFjZSBEaXNwdXRlV29ya2Zsb3dQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgc2hvd246IGJvb2xlYW47XG4gIHNldFNob3duOiAoc2hvd246IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbmNvbnN0IERpc3B1dGVXb3JrZmxvdyA9ICh7IGRpc3B1dGU6IGluaXRpYWxEaXNwdXRlLCBjb250ZXh0LCBzaG93biwgc2V0U2hvd24gfTogRGlzcHV0ZVdvcmtmbG93UHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRTdGVwLCBzZXRDdXJyZW50U3RlcF0gPSB1c2VTdGF0ZTxXaXphcmRTdGVwPigncmV2aWV3Jyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGU+KGluaXRpYWxEaXNwdXRlKTtcbiAgY29uc3QgW3BsYXlib29rLCBzZXRQbGF5Ym9va10gPSB1c2VTdGF0ZTxQbGF5Ym9va0RhdGEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBib29sZWFuOyBwbGF5Ym9vazogYm9vbGVhbiB9Pih7XG4gICAgZGlzcHV0ZTogZmFsc2UsXG4gICAgcGxheWJvb2s6IGZhbHNlLFxuICB9KTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPHsgZGlzcHV0ZTogc3RyaW5nIHwgbnVsbDsgcGxheWJvb2s6IHN0cmluZyB8IG51bGwgfT4oe1xuICAgIGRpc3B1dGU6IG51bGwsXG4gICAgcGxheWJvb2s6IG51bGwsXG4gIH0pO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93bikgcmV0dXJuO1xuXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh7IGRpc3B1dGU6IHRydWUsIHBsYXlib29rOiB0cnVlIH0pO1xuICAgICAgc2V0RXJyb3JzKHsgZGlzcHV0ZTogbnVsbCwgcGxheWJvb2s6IG51bGwgfSk7XG5cbiAgICAgIC8vIEZldGNoIGVucmljaGVkIGRpc3B1dGUgYW5kIHBsYXlib29rIGluIHBhcmFsbGVsXG4gICAgICAvLyBTa2lwIHBsYXlib29rIGZldGNoIGlmIHJlYXNvbl9jb2RlIGlzIGVtcHR5ICh0ZXN0IGRpc3B1dGVzLCB1bmtub3duIGNvZGVzKVxuICAgICAgY29uc3Qgc2hvdWxkRmV0Y2hQbGF5Ym9vayA9ICEhaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGU7XG4gICAgICBjb25zdCBbZGlzcHV0ZVJlc3VsdCwgcGxheWJvb2tSZXN1bHRdID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKFtcbiAgICAgICAgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihgL2FwaS9kaXNwdXRlcy8ke2luaXRpYWxEaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCksXG4gICAgICAgIHNob3VsZEZldGNoUGxheWJvb2tcbiAgICAgICAgICA/IGZldGNoQmFja2VuZDx7IGRhdGE6IFBsYXlib29rRGF0YSB9PignL2FwaS9wbGF5Ym9va3MnLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICAgICAgbmV0d29yazogaW5pdGlhbERpc3B1dGUubmV0d29yayxcbiAgICAgICAgICAgICAgcmVhc29uX2NvZGU6IGluaXRpYWxEaXNwdXRlLnJlYXNvbl9jb2RlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBBcGlFcnJvcignTm8gcmVhc29uIGNvZGUnLCA0MDQpKSxcbiAgICAgIF0pO1xuXG4gICAgICBpZiAoZGlzcHV0ZVJlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldERpc3B1dGUoZGlzcHV0ZVJlc3VsdC52YWx1ZS5kYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGRpc3B1dGVSZXN1bHQucmVhc29uO1xuICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBkaXNwdXRlOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGUgZGV0YWlscy4nLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBkaXNwdXRlOiBmYWxzZSB9KSk7XG5cbiAgICAgIGlmIChwbGF5Ym9va1Jlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldFBsYXlib29rKHBsYXlib29rUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gcGxheWJvb2tSZXN1bHQucmVhc29uO1xuICAgICAgICAvLyA0MDQgaXMgbm90IGFuIGVycm9yIC0tIGp1c3QgbWVhbnMgbm8gcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGVcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSkge1xuICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5Ym9vazogZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBwbGF5Ym9vay4nLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQbGF5Ym9vayhudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlib29rOiBmYWxzZSB9KSk7XG4gICAgfTtcblxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbc2hvd24sIGluaXRpYWxEaXNwdXRlLmlkLCBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLCBpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZV0pO1xuXG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IFdJWkFSRF9TVEVQUy5pbmRleE9mKGN1cnJlbnRTdGVwKTtcbiAgY29uc3QgaXNGaXJzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IDA7XG4gIGNvbnN0IGlzTGFzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IFdJWkFSRF9TVEVQUy5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0xhc3RTdGVwKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcChXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmICghaXNGaXJzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRheXNSZW1haW5pbmcgPSBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KTtcbiAgY29uc3QgaXNVcmdlbnQgPSBkYXlzUmVtYWluaW5nIDwgNSAmJiAhaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG5cbiAgY29uc3QgcmVuZGVyUmV2aWV3VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTG9hZGluZ1BsYXlib29rID0gbG9hZGluZy5wbGF5Ym9vaztcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgICB7ZXJyb3JzLmRpc3B1dGUgJiYgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9ycy5kaXNwdXRlfSAvPn1cblxuICAgICAgICB7aXNMb2FkaW5nUGxheWJvb2sgPyAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+TG9hZGluZyBwbGF5Ym9vay4uLjwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogZXJyb3JzLnBsYXlib29rID8gKFxuICAgICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMucGxheWJvb2t9IC8+XG4gICAgICAgICkgOiBwbGF5Ym9vayA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvYWNoSGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRsaW5lPXtwbGF5Ym9vay5jb2FjaF9oZWFkbGluZX1cbiAgICAgICAgICAgICAgc3VtbWFyeT17cGxheWJvb2suY29hY2hfc3VtbWFyeX1cbiAgICAgICAgICAgICAgdXJnZW5jeU1vZGU9e2lzVXJnZW50fVxuICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxRdWlja0FjdGlvbnMgcGxheWJvb2s9e3BsYXlib29rfSB1cmdlbmN5TW9kZT17aXNVcmdlbnR9IC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgdGl0bGU9XCJObyBwbGF5Ym9vayBhdmFpbGFibGVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXZSBkb24ndCBoYXZlIGEgc3BlY2lmaWMgcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGUgeWV0LiBVc2UgdGhlIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyB0byBidWlsZCB5b3VyIHJlc3BvbnNlLlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RGlzcHV0ZU92ZXJ2aWV3IGRpc3B1dGU9e2Rpc3B1dGV9IGxvYWRpbmc9e2xvYWRpbmcuZGlzcHV0ZX0gLz5cblxuICAgICAgICB7cGxheWJvb2sgJiYgKFxuICAgICAgICAgIDxMZWFybk1vcmVcbiAgICAgICAgICAgIGlzc3VlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2lzc3Vlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgYWNxdWlyZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9hY3F1aXJlcl9zdW1tYXJ5fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVmlld1xuICAgICAgdGl0bGU9e2BEaXNwdXRlICR7aW5pdGlhbERpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLmB9XG4gICAgICBzaG93bj17c2hvd259XG4gICAgICBzZXRTaG93bj17c2V0U2hvd259XG4gICAgICBjb25maXJtQ2xvc2VNZXNzYWdlcz17e1xuICAgICAgICB0aXRsZTogJ0xlYXZlIGRpc3B1dGUgd29ya2Zsb3c/JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdZb3VyIHByb2dyZXNzIG9uIHRoaXMgc3RlcCB3aWxsIG5vdCBiZSBzYXZlZC4nLFxuICAgICAgICBjYW5jZWxBY3Rpb246ICdTdGF5JyxcbiAgICAgICAgZXhpdEFjdGlvbjogJ0xlYXZlJyxcbiAgICAgIH19XG4gICAgICBwcmltYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNMYXN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0U2hvd24oZmFsc2UpfT5cbiAgICAgICAgICAgIFN1Ym1pdCAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZU5leHR9PlxuICAgICAgICAgICAgTmV4dDoge1dJWkFSRF9TVEVQX0xBQkVMU1tXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV1dfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZWNvbmRhcnlBY3Rpb249e1xuICAgICAgICBpc0ZpcnN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9eygpID0+IHNldFNob3duKGZhbHNlKX0+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIEJhY2s6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgID5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBwYWRkaW5nQm90dG9tOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxEZWFkbGluZVRpbWVyIGR1ZUJ5PXtkaXNwdXRlLmR1ZV9ieX0gc3RhdHVzPXtkaXNwdXRlLnN0YXR1c30gLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxUYWJzXG4gICAgICAgICAgZml0dGVkXG4gICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgc2VsZWN0ZWRLZXk9e2N1cnJlbnRTdGVwfVxuICAgICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlPXsoa2V5KSA9PiBzZXRDdXJyZW50U3RlcChrZXkgYXMgV2l6YXJkU3RlcCl9XG4gICAgICAgID5cbiAgICAgICAgICA8VGFiTGlzdD5cbiAgICAgICAgICAgIHtXSVpBUkRfU1RFUFMubWFwKChzdGVwKSA9PiAoXG4gICAgICAgICAgICAgIDxUYWIga2V5PXtzdGVwfSBpZD17c3RlcH0+XG4gICAgICAgICAgICAgICAge1dJWkFSRF9TVEVQX0xBQkVMU1tzdGVwXX1cbiAgICAgICAgICAgICAgPC9UYWI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInJldmlld1wiPlxuICAgICAgICAgICAgICB7cmVuZGVyUmV2aWV3VGFiKCl9XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiZXZpZGVuY2VcIj5cbiAgICAgICAgICAgICAgPEV2aWRlbmNlQ2hlY2tsaXN0XG4gICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgIGlzVXJnZW50PXtpc1VyZ2VudH1cbiAgICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cIm5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgMzogQUkgTmFycmF0aXZlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiR2VuZXJhdGUgYSBjb21wZWxsaW5nIG5hcnJhdGl2ZSBiYXNlZCBvbiB5b3VyIGV2aWRlbmNlLiBSZXZpZXcsIGVkaXQsIGFuZCBhcHByb3ZlIGJlZm9yZSBzdWJtaXNzaW9uLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEFJIG5hcnJhdGl2ZSBnZW5lcmF0aW9uIGFuZCBlZGl0aW5nIHdpbGwgYmUgYnVpbHQgaW4gV0lOLTE4IGFuZCBXSU4tMTkuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgNDogU3VibWl0IEV2aWRlbmNlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUmV2aWV3IGV2ZXJ5dGhpbmcgb25lIGZpbmFsIHRpbWUuIFN1Ym1pc3Npb24gdG8gU3RyaXBlIGlzIGlycmV2b2NhYmxlLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEZpbmFsIHJldmlldyBhbmQgU3RyaXBlIHN1Ym1pc3Npb24gd2lsbCBiZSBidWlsdCBpbiBXSU4tMjAuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICA8L1RhYlBhbmVscz5cbiAgICAgICAgPC9UYWJzPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Gb2N1c1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlV29ya2Zsb3c7XG4iLCAiZXhwb3J0IHR5cGUgRGlzcHV0ZVN0YXR1cyA9XG4gIHwgJ25lZWRzX3Jlc3BvbnNlJ1xuICB8ICd1bmRlcl9yZXZpZXcnXG4gIHwgJ3dvbidcbiAgfCAnbG9zdCdcbiAgfCAnd2FybmluZ19uZWVkc19yZXNwb25zZSdcbiAgfCAnd2FybmluZ191bmRlcl9yZXZpZXcnXG4gIHwgJ3dhcm5pbmdfY2xvc2VkJ1xuICB8ICdjaGFyZ2VfcmVmdW5kZWQnO1xuXG5leHBvcnQgdHlwZSBDYXJkTmV0d29yayA9ICd2aXNhJyB8ICdtYXN0ZXJjYXJkJyB8ICdhbWV4JyB8ICdkaXNjb3ZlcicgfCAndW5rbm93bic7XG5cbmV4cG9ydCB0eXBlIFdpemFyZFN0ZXAgPSAncmV2aWV3JyB8ICdldmlkZW5jZScgfCAnbmFycmF0aXZlJyB8ICdzdWJtaXQnO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBTOiBXaXphcmRTdGVwW10gPSBbJ3JldmlldycsICdldmlkZW5jZScsICduYXJyYXRpdmUnLCAnc3VibWl0J107XG5cbmV4cG9ydCBjb25zdCBXSVpBUkRfU1RFUF9MQUJFTFM6IFJlY29yZDxXaXphcmRTdGVwLCBzdHJpbmc+ID0ge1xuICByZXZpZXc6ICdSZXZpZXcnLFxuICBldmlkZW5jZTogJ0V2aWRlbmNlJyxcbiAgbmFycmF0aXZlOiAnTmFycmF0aXZlJyxcbiAgc3VibWl0OiAnU3VibWl0Jyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcHV0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBjdXJyZW5jeTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc3RhdHVzOiBEaXNwdXRlU3RhdHVzO1xuICBkdWVfYnk6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgbmV0d29yazogQ2FyZE5ldHdvcms7XG4gIHBheW1lbnRfaW50ZW50Pzogc3RyaW5nO1xuICBjaGFyZ2VfaWQ6IHN0cmluZztcbiAgY3VzdG9tZXJfbmFtZT86IHN0cmluZztcbiAgY3VzdG9tZXJfZW1haWw/OiBzdHJpbmc7XG4gIGNyZWF0ZWQ6IG51bWJlcjtcbiAgZXZpZGVuY2VfZHVlX2J5OiBudW1iZXI7XG4gIC8vIEVucmljaGVkIGZpZWxkcyAoYXZhaWxhYmxlIGFmdGVyIGRldGFpbCBmZXRjaClcbiAgdHJhbnNhY3Rpb25fZGF0ZT86IG51bWJlcjtcbiAgY2FyZF9icmFuZD86IHN0cmluZztcbiAgY2FyZF9sYXN0ND86IHN0cmluZztcbiAgYmlsbGluZ19hZGRyZXNzPzogc3RyaW5nO1xuICBjaGFyZ2VfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJlY2VpcHRfdXJsPzogc3RyaW5nO1xuICBoYXNfZXZpZGVuY2U/OiBib29sZWFuO1xuICBldmlkZW5jZV9zdWJtaXNzaW9uX2NvdW50PzogbnVtYmVyO1xuICBpc19jaGFyZ2VfcmVmdW5kYWJsZT86IGJvb2xlYW47XG4gIG1ldGFkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgY2hlY2tsaXN0X3N0YXRlPzogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIGNoZWNrbGlzdF9ub3Rlcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG59XG5cbi8vIFBsYXlib29rIHR5cGVzIChtaXJyb3JzIGJhY2tlbmQgUGxheWJvb2tEYXRhKVxuXG5leHBvcnQgaW50ZXJmYWNlIEV2aWRlbmNlQ2hlY2tsaXN0SXRlbSB7XG4gIGl0ZW06IHN0cmluZztcbiAgY2F0ZWdvcnk6ICdtYW5kYXRvcnknIHwgJ3JlY29tbWVuZGVkJyB8ICdzaXR1YXRpb25hbCc7XG4gIGNvbnRleHQ6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIHdoeV9tYXR0ZXJzOiBzdHJpbmc7XG4gIHdoZXJlX3RvX2ZpbmQ/OiBzdHJpbmc7XG4gIHVyZ2VuY3lfZXNzZW50aWFsOiBib29sZWFuO1xuICB1cmdlbmN5X29yZGVyOiBudW1iZXIgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXlib29rRGF0YSB7XG4gIG5ldHdvcms6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvYWNoX2hlYWRsaW5lOiBzdHJpbmc7XG4gIGNvYWNoX3N1bW1hcnk6IHN0cmluZztcbiAgY29hY2hfaXNzdWVyX3N1bW1hcnk6IHN0cmluZztcbiAgY29hY2hfYWNxdWlyZXJfc3VtbWFyeTogc3RyaW5nO1xuICBpc3N1ZXJfZXZhbHVhdGlvbjogc3RyaW5nO1xuICBhY3F1aXJlcl9wcmVyZXZpZXc6IHN0cmluZztcbiAgZXZpZGVuY2VfY2hlY2tsaXN0OiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bXTtcbiAgY29tbW9uX21pc3Rha2VzOiB7IG1pc3Rha2U6IHN0cmluZzsgZXhwbGFuYXRpb246IHN0cmluZyB9W107XG4gIHByb190aXBzOiB7IHRpcDogc3RyaW5nIH1bXTtcbiAgdXJnZW5jeV9lc3NlbnRpYWxzOiB7IHN1bW1hcnk6IHN0cmluZzsgb3JkZXJlZF9pdGVtczogc3RyaW5nW10gfTtcbiAgbmFycmF0aXZlX3RlbXBsYXRlOiBzdHJpbmc7XG4gIHJlc3BvbnNlX2RlYWRsaW5lX2RheXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmlkZW5jZUZpbGUge1xuICBpZDogc3RyaW5nO1xuICBzdHJpcGVfZmlsZV9pZDogc3RyaW5nO1xuICBjaGVja2xpc3RfaXRlbV9rZXk6IHN0cmluZztcbiAgZmlsZV9uYW1lOiBzdHJpbmc7XG4gIGZpbGVfc2l6ZTogbnVtYmVyO1xuICBtaW1lX3R5cGU6IHN0cmluZztcbiAgdXBsb2FkZWRfYXQ6IHN0cmluZztcbn1cbiIsICJpbXBvcnQgZmV0Y2hTdHJpcGVTaWduYXR1cmUgZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3NpZ25hdHVyZSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcblxuLy8gVG9nZ2xlIGZvciBsb2NhbCBkZXZlbG9wbWVudDogc2V0IHRvIHRydWUgd2hlbiBydW5uaW5nIGBzdHJpcGUgYXBwcyBzdGFydGBcbmNvbnN0IFVTRV9MT0NBTF9CQUNLRU5EID0gdHJ1ZTtcblxuY29uc3QgQkFDS0VORF9VUkwgPSBVU0VfTE9DQUxfQkFDS0VORFxuICA/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIDogJ2h0dHBzOi8vd2luYmFja3BheS5jb20nO1xuXG5leHBvcnQgY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBwdWJsaWMgc3RhdHVzOiBudW1iZXIsXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdBcGlFcnJvcic7XG4gIH1cbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIHJlcXVlc3QgdG8gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqIEF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgU3RyaXBlIEFwcCBzaWduYXR1cmUgYW5kIGlkZW50aXR5IGZpZWxkcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQmFja2VuZDxUID0gdW5rbm93bj4oXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlLFxuICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLm1lc3NhZ2UgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIFBBVENIIHJlcXVlc3QgdG8gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhdGNoQmFja2VuZDxUID0gdW5rbm93bj4oXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlLFxuICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgLi4uZGF0YSxcbiAgICB1c2VyX2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5pZCxcbiAgICBhY2NvdW50X2lkOiBjb250ZXh0LnVzZXJDb250ZXh0Py5hY2NvdW50LmlkLFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBQ0tFTkRfVVJMfSR7cGF0aH1gLCB7XG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IuZXJyb3IgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbiBhdXRoZW50aWNhdGVkIFBPU1QgcmVxdWVzdCB0byBhIFwiZGVsZXRlXCIgZW5kcG9pbnQgb24gdGhlIFdpbkJhY2sgYmFja2VuZC5cbiAqIFVzZXMgUE9TVCBiZWNhdXNlIFN0cmlwZSBBcHAgc2lnbmF0dXJlIHZlcmlmaWNhdGlvbiByZXF1aXJlcyBhIGJvZHksXG4gKiBhbmQgc29tZSBwcm94aWVzIHN0cmlwIGJvZGllcyBmcm9tIERFTEVURSByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnU3RyaXBlLVNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfSkpO1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihcbiAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IuZXJyb3IgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxUPjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENhcmROZXR3b3JrLCBEaXNwdXRlU3RhdHVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFJFQVNPTl9DT0RFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgJ3Zpc2E6MTAuNCc6ICdGcmF1ZCAtLSBDYXJkIE5vdCBQcmVzZW50JyxcbiAgJ3Zpc2E6MTMuMSc6ICdNZXJjaGFuZGlzZSAvIFNlcnZpY2VzIE5vdCBSZWNlaXZlZCcsXG4gICd2aXNhOjEzLjInOiAnQ2FuY2VsbGVkIFJlY3VycmluZyBUcmFuc2FjdGlvbicsXG4gICd2aXNhOjEzLjMnOiAnTm90IGFzIERlc2NyaWJlZCBvciBEZWZlY3RpdmUnLFxuICAndmlzYToxMy42JzogJ0NyZWRpdCBOb3QgUHJvY2Vzc2VkJyxcbiAgJ21hc3RlcmNhcmQ6NDgwOCc6ICdBdXRob3JpemF0aW9uLVJlbGF0ZWQgRGlzcHV0ZScsXG4gICdtYXN0ZXJjYXJkOjQ4NTMnOiAnTm90IGFzIERlc2NyaWJlZCAvIERlZmVjdGl2ZScsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVhc29uQ29kZUxhYmVsKG5ldHdvcms6IENhcmROZXR3b3JrLCByZWFzb25Db2RlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIFJFQVNPTl9DT0RFX0xBQkVMU1tgJHtuZXR3b3JrfToke3JlYXNvbkNvZGV9YF0gPz8gbnVsbDtcbn1cblxuY29uc3QgUkVTT0xWRURfU1RBVFVTRVM6IERpc3B1dGVTdGF0dXNbXSA9IFsnd29uJywgJ2xvc3QnLCAnd2FybmluZ19jbG9zZWQnLCAnY2hhcmdlX3JlZnVuZGVkJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Jlc29sdmVkKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBSRVNPTFZFRF9TVEFUVVNFUy5pbmNsdWRlcyhzdGF0dXMgYXMgRGlzcHV0ZVN0YXR1cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNCYWRnZShzdGF0dXM6IHN0cmluZyk6IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdHlwZTogJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnIHwgJ25lZ2F0aXZlJyB8ICdpbmZvJztcbn0ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICBjYXNlICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTmVlZHMgUmVzcG9uc2UnLCB0eXBlOiAndXJnZW50JyB9O1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgY2FzZSAnd2FybmluZ191bmRlcl9yZXZpZXcnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdVbmRlciBSZXZpZXcnLCB0eXBlOiAnaW5mbycgfTtcbiAgICBjYXNlICd3b24nOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdXb24nLCB0eXBlOiAncG9zaXRpdmUnIH07XG4gICAgY2FzZSAnbG9zdCc6XG4gICAgY2FzZSAnd2FybmluZ19jbG9zZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdMb3N0JywgdHlwZTogJ25lZ2F0aXZlJyB9O1xuICAgIGNhc2UgJ2NoYXJnZV9yZWZ1bmRlZCc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ1JlZnVuZGVkJywgdHlwZTogJ2luZm8nIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7IGxhYmVsOiBzdGF0dXMsIHR5cGU6ICdpbmZvJyB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzUmVtYWluaW5nKGR1ZUJ5OiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdWUgPSBuZXcgRGF0ZShkdWVCeSk7XG4gIHJldHVybiBNYXRoLmNlaWwoKGR1ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVJlbWFpbmluZyB7XG4gIGRheXM6IG51bWJlcjtcbiAgaG91cnM6IG51bWJlcjtcbiAgaXNFeHBpcmVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVJlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogVGltZVJlbWFpbmluZyB7XG4gIGNvbnN0IHRvdGFsTXMgPSBuZXcgRGF0ZShkdWVCeSkuZ2V0VGltZSgpIC0gRGF0ZS5ub3coKTtcbiAgaWYgKHRvdGFsTXMgPD0gMCkgcmV0dXJuIHsgZGF5czogMCwgaG91cnM6IDAsIGlzRXhwaXJlZDogdHJ1ZSB9O1xuICBjb25zdCB0b3RhbEhvdXJzID0gTWF0aC5mbG9vcih0b3RhbE1zIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gIHJldHVybiB7XG4gICAgZGF5czogTWF0aC5mbG9vcih0b3RhbEhvdXJzIC8gMjQpLFxuICAgIGhvdXJzOiB0b3RhbEhvdXJzICUgMjQsXG4gICAgaXNFeHBpcmVkOiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXJnZW5jeVRpZXIgPSAndXJnZW50JyB8ICd3YXJuaW5nJyB8ICdwb3NpdGl2ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5VGllcihkYXlzOiBudW1iZXIpOiBVcmdlbmN5VGllciB7XG4gIGlmIChkYXlzIDwgNSkgcmV0dXJuICd1cmdlbnQnO1xuICBpZiAoZGF5cyA8PSAxMykgcmV0dXJuICd3YXJuaW5nJztcbiAgcmV0dXJuICdwb3NpdGl2ZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmdlbmN5QmFkZ2UoXG4gIGR1ZUJ5OiBzdHJpbmcsXG4gIHN0YXR1czogc3RyaW5nLFxuKTogeyBsYWJlbDogc3RyaW5nOyB0eXBlOiBVcmdlbmN5VGllciB9IHwgbnVsbCB7XG4gIGlmIChpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG5cbiAgaWYgKHRpbWUuaXNFeHBpcmVkKSByZXR1cm4geyBsYWJlbDogJ0V4cGlyZWQnLCB0eXBlOiAndXJnZW50JyB9O1xuICBpZiAodGltZS5kYXlzIDwgNSkgcmV0dXJuIHsgbGFiZWw6IGAke3RpbWUuZGF5c31kICR7dGltZS5ob3Vyc31oIGxlZnRgLCB0eXBlOiB0aWVyIH07XG4gIHJldHVybiB7IGxhYmVsOiBgJHt0aW1lLmRheXN9ZCBsZWZ0YCwgdHlwZTogdGllciB9O1xufVxuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRXJyb3JCYW5uZXIudHN4XG5cbmltcG9ydCB7IEJhbm5lciwgQm94LCBCdXR0b24gfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRXJyb3JCYW5uZXJQcm9wcyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25SZXRyeT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVycm9yQmFubmVyID0gKHsgbWVzc2FnZSwgb25SZXRyeSB9OiBFcnJvckJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgIHRpdGxlPVwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgICAgICBkZXNjcmlwdGlvbj17bWVzc2FnZX1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgb25SZXRyeSA/IChcbiAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17b25SZXRyeX0+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJhbm5lcjtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB7IGdldFRpbWVSZW1haW5pbmcsIGdldFVyZ2VuY3lUaWVyLCBpc1Jlc29sdmVkIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERlYWRsaW5lVGltZXJQcm9wcyB7XG4gIGR1ZUJ5OiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5jb25zdCBEZWFkbGluZVRpbWVyID0gKHsgZHVlQnksIHN0YXR1cyB9OiBEZWFkbGluZVRpbWVyUHJvcHMpID0+IHtcbiAgY29uc3QgWywgc2V0VGlja10gPSB1c2VTdGF0ZSgwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gc2V0VGljaygodCkgPT4gdCArIDEpLCA2MF8wMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGlkKTtcbiAgfSwgW2R1ZUJ5XSk7XG5cbiAgaWYgKCFkdWVCeSB8fCBpc1Jlc29sdmVkKHN0YXR1cykpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRpbWUgPSBnZXRUaW1lUmVtYWluaW5nKGR1ZUJ5KTtcbiAgY29uc3QgdGllciA9IGdldFVyZ2VuY3lUaWVyKHRpbWUuZGF5cyk7XG4gIGNvbnN0IGlzVXJnZW50ID0gdGltZS5kYXlzIDwgNSAmJiAhdGltZS5pc0V4cGlyZWQ7XG5cbiAgY29uc3QgbGFiZWwgPSB0aW1lLmlzRXhwaXJlZFxuICAgID8gJ0RlYWRsaW5lIHBhc3NlZCdcbiAgICA6IHRpbWUuZGF5cyA9PT0gMFxuICAgICAgPyBgJHt0aW1lLmhvdXJzfWggcmVtYWluaW5nYFxuICAgICAgOiBgJHt0aW1lLmRheXN9ZCAke3RpbWUuaG91cnN9aCByZW1haW5pbmdgO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgY3NzPXt7XG4gICAgICAgIHN0YWNrOiAneCcsXG4gICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLFxuICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsIGNvbG9yOiBpc1VyZ2VudCA/ICdjcml0aWNhbCcgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge2lzVXJnZW50ID8gJ1Jlc3BvbmQgbm93JyA6ICdSZXNwb25zZSBkZWFkbGluZSd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCYWRnZSB0eXBlPXt0aW1lLmlzRXhwaXJlZCA/ICd1cmdlbnQnIDogdGllcn0+e2xhYmVsfTwvQmFkZ2U+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWFkbGluZVRpbWVyO1xuIiwgImltcG9ydCB7IEJveCwgQmFkZ2UsIERpdmlkZXIsIElubGluZSwgTGluaywgU3Bpbm5lciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UgfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZU92ZXJ2aWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSW5mb1Jvd1Byb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZnVuY3Rpb24gSW5mb1Jvdyh7IGxhYmVsLCB2YWx1ZSB9OiBJbmZvUm93UHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PntsYWJlbH08L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57dmFsdWV9PC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ3Nob3J0JyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmNvbnN0IERpc3B1dGVPdmVydmlldyA9ICh7IGRpc3B1dGUsIGxvYWRpbmcgfTogRGlzcHV0ZU92ZXJ2aWV3UHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIHsvKiBIZWFkZXI6IGFtb3VudCArIHN0YXR1cyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5cbiAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ3VzdG9tZXIgaW5mbyAqL31cbiAgICAgIHsoZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8IGRpc3B1dGUuY3VzdG9tZXJfZW1haWwpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQ3VzdG9tZXJcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfZW1haWwgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJFbWFpbFwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgey8qIEVucmljaGVkIHNlY3Rpb24gKi99XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY2FyZF9icmFuZCAmJiBkaXNwdXRlLmNhcmRfbGFzdDQgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXJkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ake2Rpc3B1dGUuY2FyZF9icmFuZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUuY2FyZF9icmFuZC5zbGljZSgxKX0gZW5kaW5nIGluICR7ZGlzcHV0ZS5jYXJkX2xhc3Q0fWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIlRyYW5zYWN0aW9uIGRhdGVcIiB2YWx1ZT17Zm9ybWF0RGF0ZShkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRGVzY3JpcHRpb25cIiB2YWx1ZT17ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJCaWxsaW5nIGFkZHJlc3NcIiB2YWx1ZT17ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5yZWNlaXB0X3VybCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIlJlY2VpcHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17PExpbmsgaHJlZj17ZGlzcHV0ZS5yZWNlaXB0X3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+VmlldyByZWNlaXB0PC9MaW5rPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5tZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhkaXNwdXRlLm1ldGFkYXRhKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhkaXNwdXRlLm1ldGFkYXRhKS5tYXAoKFtrZXksIHZhbF0pID0+IChcbiAgICAgICAgICAgICAgICA8SW5mb1JvdyBrZXk9e2tleX0gbGFiZWw9e2tleX0gdmFsdWU9e3ZhbH0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXI6IElEcyAqL31cbiAgICAgIDxEaXZpZGVyIC8+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5EaXNwdXRlOiB7ZGlzcHV0ZS5pZH08L0lubGluZT5cbiAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2lkICYmIChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PkNoYXJnZToge2Rpc3B1dGUuY2hhcmdlX2lkfTwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlT3ZlcnZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIENvYWNoSGVhZGVyUHJvcHMge1xuICBoZWFkbGluZTogc3RyaW5nO1xuICBzdW1tYXJ5OiBzdHJpbmc7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xuICBkYXlzUmVtYWluaW5nPzogbnVtYmVyO1xufVxuXG5jb25zdCBDb2FjaEhlYWRlciA9ICh7IGhlYWRsaW5lLCBzdW1tYXJ5LCB1cmdlbmN5TW9kZSwgZGF5c1JlbWFpbmluZyB9OiBDb2FjaEhlYWRlclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInLCBwYWRkaW5nOiAnbWVkaXVtJywgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkFJIENvYWNoPC9CYWRnZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge2hlYWRsaW5lfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlICYmIGRheXNSZW1haW5pbmcgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gYFlvdSBoYXZlICR7ZGF5c1JlbWFpbmluZ30gZGF5JHtkYXlzUmVtYWluaW5nID09PSAxID8gJycgOiAncyd9LiBGb2N1cyBvbiB0aGUgZXNzZW50aWFscyBiZWxvdy5gXG4gICAgICAgICAgOiBzdW1tYXJ5fVxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2FjaEhlYWRlcjtcbiIsICJpbXBvcnQgeyBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IFBsYXlib29rRGF0YSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5cbmludGVyZmFjZSBRdWlja0FjdGlvbnNQcm9wcyB7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGE7XG4gIHVyZ2VuY3lNb2RlOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBkZXJpdmVBY3Rpb25zKHBsYXlib29rOiBQbGF5Ym9va0RhdGEpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3QgbWFuZGF0b3J5SXRlbXMgPSBwbGF5Ym9vay5ldmlkZW5jZV9jaGVja2xpc3RcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSAnbWFuZGF0b3J5JyAmJiBpdGVtLmNvbnRleHQgPT09ICdhbGwnKVxuICAgIC5zbGljZSgwLCAzKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIG1hbmRhdG9yeUl0ZW1zKSB7XG4gICAgYWN0aW9ucy5wdXNoKGBDb25maXJtIHlvdSBoYXZlOiAke2l0ZW0uaXRlbS50b0xvd2VyQ2FzZSgpfWApO1xuICB9XG5cbiAgY29uc3QgdG9wTWlzdGFrZXMgPSBwbGF5Ym9vay5jb21tb25fbWlzdGFrZXMuc2xpY2UoMCwgMik7XG4gIGZvciAoY29uc3QgbWlzdGFrZSBvZiB0b3BNaXN0YWtlcykge1xuICAgIGNvbnN0IHJlZnJhbWVkID0gbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ05vdCAnKVxuICAgICAgPyBgTWFrZSBzdXJlIHlvdSdyZSAke21pc3Rha2UubWlzdGFrZS5zbGljZSg0KS50b0xvd2VyQ2FzZSgpfWBcbiAgICAgIDogbWlzdGFrZS5taXN0YWtlLnN0YXJ0c1dpdGgoJ1NraXBwaW5nICcpXG4gICAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgdXNpbmcgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoOSkudG9Mb3dlckNhc2UoKX1gXG4gICAgICAgIDogYENoZWNrOiAke21pc3Rha2UubWlzdGFrZS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgYWN0aW9ucy5wdXNoKHJlZnJhbWVkKTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zLnNsaWNlKDAsIDUpO1xufVxuXG5jb25zdCBRdWlja0FjdGlvbnMgPSAoeyBwbGF5Ym9vaywgdXJnZW5jeU1vZGUgfTogUXVpY2tBY3Rpb25zUHJvcHMpID0+IHtcbiAgY29uc3QgaXRlbXMgPSB1cmdlbmN5TW9kZVxuICAgID8gcGxheWJvb2sudXJnZW5jeV9lc3NlbnRpYWxzLm9yZGVyZWRfaXRlbXNcbiAgICA6IGRlcml2ZUFjdGlvbnMocGxheWJvb2spO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlID8gJ0ZvY3VzIG9uIHRoZXNlIGVzc2VudGlhbHMnIDogJ1lvdXIgbmV4dCBzdGVwcyd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIHtpdGVtcy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3N1cmZhY2UnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdzbWFsbCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgICAgYWxpZ25YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMS8xMicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAge2luZGV4ICsgMX0uXG4gICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+e3RleHR9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgRG9uJ3Qgd29ycnksIHdlJ2xsIHdhbGsgeW91IHRocm91Z2ggZWFjaCBvZiB0aGVzZSBvbiB0aGUgbmV4dCBzdGVwLlxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBRdWlja0FjdGlvbnM7XG4iLCAiaW1wb3J0IHsgQWNjb3JkaW9uLCBBY2NvcmRpb25JdGVtLCBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBMZWFybk1vcmVQcm9wcyB7XG4gIGlzc3VlclN1bW1hcnk6IHN0cmluZztcbiAgYWNxdWlyZXJTdW1tYXJ5OiBzdHJpbmc7XG59XG5cbmNvbnN0IExlYXJuTW9yZSA9ICh7IGlzc3VlclN1bW1hcnksIGFjcXVpcmVyU3VtbWFyeSB9OiBMZWFybk1vcmVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxBY2NvcmRpb24+XG4gICAgICA8QWNjb3JkaW9uSXRlbSB0aXRsZT1cIldoeSB0aGlzIG1hdHRlcnNcIj5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIFdoYXQgdGhlIGJhbmsgY2hlY2tzXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7aXNzdWVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCBoYXBwZW5zIHRvIHlvdXIgcmVzcG9uc2VcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHthY3F1aXJlclN1bW1hcnl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0FjY29yZGlvbkl0ZW0+XG4gICAgPC9BY2NvcmRpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMZWFybk1vcmU7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFubmVyLCBEaXZpZGVyLCBJbmxpbmUsIExpbmsgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUsIFBsYXlib29rRGF0YSwgRXZpZGVuY2VDaGVja2xpc3RJdGVtLCBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgcGF0Y2hCYWNrZW5kLCBmZXRjaEJhY2tlbmQgfSBmcm9tICcuLi8uLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCBDaGVja2xpc3RQcm9ncmVzcyBmcm9tICcuL0NoZWNrbGlzdFByb2dyZXNzJztcbmltcG9ydCBDaGVja2xpc3RJdGVtIGZyb20gJy4vQ2hlY2tsaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IEV4cGFuZGVkU2VjdGlvbiB9IGZyb20gJy4vQ2hlY2tsaXN0SXRlbSc7XG5cbmludGVyZmFjZSBFdmlkZW5jZUNoZWNrbGlzdFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgcGxheWJvb2s6IFBsYXlib29rRGF0YSB8IG51bGw7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgaXNVcmdlbnQ6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc6IG51bWJlcjtcbn1cblxudHlwZSBDaGVja2xpc3RTdGF0ZSA9IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xudHlwZSBOb3Rlc1N0YXRlID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuY29uc3QgQ0FURUdPUllfT1JERVI6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXVtdID0gWydtYW5kYXRvcnknLCAncmVjb21tZW5kZWQnLCAnc2l0dWF0aW9uYWwnXTtcblxuY29uc3QgQ0FURUdPUllfTEFCRUxTOiBSZWNvcmQ8RXZpZGVuY2VDaGVja2xpc3RJdGVtWydjYXRlZ29yeSddLCBzdHJpbmc+ID0ge1xuICBtYW5kYXRvcnk6ICdNYW5kYXRvcnknLFxuICByZWNvbW1lbmRlZDogJ1JlY29tbWVuZGVkJyxcbiAgc2l0dWF0aW9uYWw6ICdTaXR1YXRpb25hbCcsXG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBjaGVja2xpc3QgaXRlbSBjYW4gYmUgYXV0by1wb3B1bGF0ZWQgZnJvbSBTdHJpcGUgZGlzcHV0ZSBkYXRhLlxuICovXG5mdW5jdGlvbiBpc0F1dG9Qb3B1bGF0ZWQoaXRlbTogRXZpZGVuY2VDaGVja2xpc3RJdGVtLCBkaXNwdXRlOiBEaXNwdXRlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGxvd2VyID0gaXRlbS5pdGVtLnRvTG93ZXJDYXNlKCk7XG4gIGlmICgobG93ZXIuaW5jbHVkZXMoJ3JlY2VpcHQnKSB8fCBsb3dlci5pbmNsdWRlcygncHJvb2Ygb2YgcHVyY2hhc2UnKSkgJiYgZGlzcHV0ZS5yZWNlaXB0X3VybCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChsb3dlci5pbmNsdWRlcygnY3VzdG9tZXIgZW1haWwnKSAmJiBkaXNwdXRlLmN1c3RvbWVyX2VtYWlsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGxvd2VyLmluY2x1ZGVzKCdiaWxsaW5nIGFkZHJlc3MnKSAmJiBkaXNwdXRlLmJpbGxpbmdfYWRkcmVzcykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChsb3dlci5pbmNsdWRlcygndHJhbnNhY3Rpb24nKSAmJiBsb3dlci5pbmNsdWRlcygnZGF0ZScpICYmIGRpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBCdWlsZHMgdGhlIGluaXRpYWwgY2hlY2tsaXN0IHN0YXRlIGJ5IG1lcmdpbmc6XG4gKiAxLiBEZWZhdWx0IChhbGwgZmFsc2UpXG4gKiAyLiBBdXRvLXBvcHVsYXRlZCBpdGVtcyAodHJ1ZSBpZiBTdHJpcGUgZGF0YSBleGlzdHMpXG4gKiAzLiBTYXZlZCBzdGF0ZSBmcm9tIFN1cGFiYXNlIChvdmVycmlkZXMgZXZlcnl0aGluZylcbiAqL1xuZnVuY3Rpb24gYnVpbGRJbml0aWFsU3RhdGUoXG4gIGl0ZW1zOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bXSxcbiAgZGlzcHV0ZTogRGlzcHV0ZSxcbik6IENoZWNrbGlzdFN0YXRlIHtcbiAgY29uc3Qgc3RhdGU6IENoZWNrbGlzdFN0YXRlID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIHN0YXRlW2l0ZW0uaXRlbV0gPSBmYWxzZTtcbiAgICBpZiAoaXNBdXRvUG9wdWxhdGVkKGl0ZW0sIGRpc3B1dGUpKSB7XG4gICAgICBzdGF0ZVtpdGVtLml0ZW1dID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRpc3B1dGUuY2hlY2tsaXN0X3N0YXRlKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUpKSB7XG4gICAgICBpZiAoa2V5IGluIHN0YXRlKSB7XG4gICAgICAgIHN0YXRlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5jb25zdCBFdmlkZW5jZUNoZWNrbGlzdCA9ICh7IGRpc3B1dGUsIHBsYXlib29rLCBjb250ZXh0LCBpc1VyZ2VudCwgZGF5c1JlbWFpbmluZyB9OiBFdmlkZW5jZUNoZWNrbGlzdFByb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gcGxheWJvb2s/LmV2aWRlbmNlX2NoZWNrbGlzdCA/PyBbXTtcbiAgY29uc3QgW2NoZWNrbGlzdFN0YXRlLCBzZXRDaGVja2xpc3RTdGF0ZV0gPSB1c2VTdGF0ZTxDaGVja2xpc3RTdGF0ZT4oKCkgPT5cbiAgICBidWlsZEluaXRpYWxTdGF0ZShpdGVtcywgZGlzcHV0ZSksXG4gICk7XG4gIGNvbnN0IFtub3Rlc1N0YXRlLCBzZXROb3Rlc1N0YXRlXSA9IHVzZVN0YXRlPE5vdGVzU3RhdGU+KFxuICAgICgpID0+IGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzID8/IHt9LFxuICApO1xuICBjb25zdCBbZXhwYW5kZWRTZWN0aW9ucywgc2V0RXhwYW5kZWRTZWN0aW9uc10gPSB1c2VTdGF0ZTxNYXA8c3RyaW5nLCBTZXQ8RXhwYW5kZWRTZWN0aW9uPj4+KG5ldyBNYXAoKSk7XG4gIGNvbnN0IFtmaWxlc1N0YXRlLCBzZXRGaWxlc1N0YXRlXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV2aWRlbmNlRmlsZSB8IG51bGw+Pih7fSk7XG4gIGNvbnN0IFtzaG93RnVsbENoZWNrbGlzdCwgc2V0U2hvd0Z1bGxDaGVja2xpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZnMgZm9yIGRlYm91bmNlZCBzYXZlc1xuICBjb25zdCBjaGVja2xpc3RUaW1lb3V0UmVmID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IG5vdGVzVGltZW91dFJlZiA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIC8vIFJlYnVpbGQgc3RhdGUgd2hlbiBkaXNwdXRlIG9yIHBsYXlib29rIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRDaGVja2xpc3RTdGF0ZShidWlsZEluaXRpYWxTdGF0ZShpdGVtcywgZGlzcHV0ZSkpO1xuICAgIHNldE5vdGVzU3RhdGUoZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMgPz8ge30pO1xuICB9LCBbZGlzcHV0ZS5pZCwgZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUsIGRpc3B1dGUuY2hlY2tsaXN0X25vdGVzLCBwbGF5Ym9vaz8ucmVhc29uX2NvZGVdKTtcblxuICAvLyBGZXRjaCBldmlkZW5jZSBmaWxlcyBvbiBtb3VudCAvIGRpc3B1dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hGaWxlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZVtdIH0+KFxuICAgICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgICAgIGNvbnRleHRSZWYuY3VycmVudCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZmlsZU1hcDogUmVjb3JkPHN0cmluZywgRXZpZGVuY2VGaWxlIHwgbnVsbD4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgZmlsZU1hcFtmaWxlLmNoZWNrbGlzdF9pdGVtX2tleV0gPSBmaWxlO1xuICAgICAgICB9XG4gICAgICAgIHNldEZpbGVzU3RhdGUoZmlsZU1hcCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGV2aWRlbmNlIGZpbGVzOicsIGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICBmZXRjaEZpbGVzKCk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgY29uc3QgcGVyc2lzdENoZWNrbGlzdCA9IHVzZUNhbGxiYWNrKChuZXdTdGF0ZTogQ2hlY2tsaXN0U3RhdGUpID0+IHtcbiAgICBpZiAoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50KTtcbiAgICB9XG4gICAgY2hlY2tsaXN0VGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjaGVja2xpc3Rfc3RhdGU6IG5ld1N0YXRlLFxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaGVja2xpc3Qgc3RhdGU6JywgZXJyKTtcbiAgICAgIH0pO1xuICAgIH0sIDUwMCk7XG4gIH0sIFtkaXNwdXRlLmlkXSk7XG5cbiAgY29uc3QgcGVyc2lzdE5vdGVzID0gdXNlQ2FsbGJhY2soKG5ld05vdGVzOiBOb3Rlc1N0YXRlKSA9PiB7XG4gICAgaWYgKG5vdGVzVGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgIH1cbiAgICBub3Rlc1RpbWVvdXRSZWYuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcGF0Y2hCYWNrZW5kKGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZS5pZH1gLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgY2hlY2tsaXN0X25vdGVzOiBuZXdOb3RlcyxcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2hlY2tsaXN0IG5vdGVzOicsIGVycik7XG4gICAgICB9KTtcbiAgICB9LCAxMDAwKTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGUgPSB1c2VDYWxsYmFjaygoaXRlbU5hbWU6IHN0cmluZykgPT4ge1xuICAgIHNldENoZWNrbGlzdFN0YXRlKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgLi4ucHJldiwgW2l0ZW1OYW1lXTogIXByZXZbaXRlbU5hbWVdIH07XG4gICAgICBwZXJzaXN0Q2hlY2tsaXN0KG5ld1N0YXRlKTtcbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9KTtcbiAgfSwgW3BlcnNpc3RDaGVja2xpc3RdKTtcblxuICBjb25zdCBoYW5kbGVOb3Rlc0NoYW5nZSA9IHVzZUNhbGxiYWNrKChpdGVtTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Tm90ZXNTdGF0ZSgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3Tm90ZXMgPSB7IC4uLnByZXYsIFtpdGVtTmFtZV06IHZhbHVlIH07XG4gICAgICBwZXJzaXN0Tm90ZXMobmV3Tm90ZXMpO1xuICAgICAgcmV0dXJuIG5ld05vdGVzO1xuICAgIH0pO1xuICB9LCBbcGVyc2lzdE5vdGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IHVzZUNhbGxiYWNrKChpdGVtTmFtZTogc3RyaW5nLCBmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB7XG4gICAgc2V0RmlsZXNTdGF0ZSgocHJldikgPT4gKHsgLi4ucHJldiwgW2l0ZW1OYW1lXTogZmlsZSB9KSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVTZWN0aW9uVG9nZ2xlID0gdXNlQ2FsbGJhY2soKGl0ZW1OYW1lOiBzdHJpbmcsIHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4ge1xuICAgIHNldEV4cGFuZGVkU2VjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBuZXcgTWFwKHByZXYpO1xuICAgICAgY29uc3Qgc2VjdGlvbnMgPSBuZXcgU2V0KHByZXYuZ2V0KGl0ZW1OYW1lKSA/PyBbXSk7XG4gICAgICBpZiAoc2VjdGlvbnMuaGFzKHNlY3Rpb24pKSB7XG4gICAgICAgIHNlY3Rpb25zLmRlbGV0ZShzZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb25zLmFkZChzZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIG5leHQuc2V0KGl0ZW1OYW1lLCBzZWN0aW9ucyk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIE5vIHBsYXlib29rIGZhbGxiYWNrXG4gIGlmICghcGxheWJvb2sgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgIHRpdGxlPVwiTm8gZXZpZGVuY2UgY2hlY2tsaXN0IGF2YWlsYWJsZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJObyBzcGVjaWZpYyBldmlkZW5jZSBjaGVja2xpc3QgZm9yIHRoaXMgcmVhc29uIGNvZGUuIFVzZSBTdHJpcGUncyBnZW5lcmFsIGV2aWRlbmNlIGd1aWRlbGluZXMgZm9yIHlvdXIgcmVzcG9uc2UuXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICAvLyBGaWx0ZXIgZm9yIHVyZ2VuY3kgbW9kZVxuICBjb25zdCBlZmZlY3RpdmVVcmdlbmN5ID0gaXNVcmdlbnQgJiYgIXNob3dGdWxsQ2hlY2tsaXN0O1xuICBsZXQgZGlzcGxheUl0ZW1zID0gaXRlbXM7XG4gIGlmIChlZmZlY3RpdmVVcmdlbmN5KSB7XG4gICAgZGlzcGxheUl0ZW1zID0gaXRlbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udXJnZW5jeV9lc3NlbnRpYWwpXG4gICAgICAuc29ydCgoYSwgYikgPT4gKGEudXJnZW5jeV9vcmRlciA/PyA5OTkpIC0gKGIudXJnZW5jeV9vcmRlciA/PyA5OTkpKTtcbiAgfVxuXG4gIC8vIEdyb3VwIGJ5IGNhdGVnb3J5XG4gIGNvbnN0IGdyb3VwZWQgPSBDQVRFR09SWV9PUkRFUi5tYXAoKGNhdGVnb3J5KSA9PiAoe1xuICAgIGNhdGVnb3J5LFxuICAgIGxhYmVsOiBDQVRFR09SWV9MQUJFTFNbY2F0ZWdvcnldLFxuICAgIGl0ZW1zOiBkaXNwbGF5SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNhdGVnb3J5ID09PSBjYXRlZ29yeSksXG4gIH0pKS5maWx0ZXIoKGdyb3VwKSA9PiBncm91cC5pdGVtcy5sZW5ndGggPiAwKTtcblxuICAvLyBQcm9ncmVzcyBjb3VudHMgKGFsd2F5cyBhZ2FpbnN0IGZ1bGwgbGlzdCwgbm90IGZpbHRlcmVkKVxuICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCBjb21wbGV0ZWRJdGVtcyA9IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tsaXN0U3RhdGVbaXRlbS5pdGVtXSkubGVuZ3RoO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ2xhcmdlJyB9fT5cbiAgICAgIDxCYW5uZXJcbiAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICB0aXRsZT1cIkdhdGhlciB5b3VyIGV2aWRlbmNlXCJcbiAgICAgICAgZGVzY3JpcHRpb249XCJIZXJlJ3Mgd2hhdCB5b3UnbGwgbmVlZCB0byBidWlsZCB5b3VyIGNhc2UuIEV4cGFuZCBlYWNoIGl0ZW0gdG8gc2VlIHdoeSBpdCBtYXR0ZXJzIGFuZCBqb3QgZG93biBub3RlcyBhcyB5b3UgZ28uXCJcbiAgICAgIC8+XG5cbiAgICAgIDxDaGVja2xpc3RQcm9ncmVzcyBjb21wbGV0ZWQ9e2NvbXBsZXRlZEl0ZW1zfSB0b3RhbD17dG90YWxJdGVtc30gLz5cblxuICAgICAge2lzVXJnZW50ICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICB0aXRsZT17YCR7ZGF5c1JlbWFpbmluZ30gZGF5JHtkYXlzUmVtYWluaW5nID09PSAxID8gJycgOiAncyd9IGxlZnQgdG8gcmVzcG9uZGB9XG4gICAgICAgICAgICBkZXNjcmlwdGlvbj17c2hvd0Z1bGxDaGVja2xpc3RcbiAgICAgICAgICAgICAgPyAnU2hvd2luZyBhbGwgZXZpZGVuY2UgaXRlbXMuJ1xuICAgICAgICAgICAgICA6ICdTaG93aW5nIG9ubHkgZXNzZW50aWFsIGl0ZW1zIHRvIG1heGltaXplIHlvdXIgY2hhbmNlcy4nfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPExpbmsgb25QcmVzcz17KCkgPT4gc2V0U2hvd0Z1bGxDaGVja2xpc3QoIXNob3dGdWxsQ2hlY2tsaXN0KX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+XG4gICAgICAgICAgICAgIHtzaG93RnVsbENoZWNrbGlzdCA/ICdTaG93IGVzc2VudGlhbHMgb25seScgOiAnVmlldyBmdWxsIGNoZWNrbGlzdCd9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge2dyb3VwZWQubWFwKCh7IGNhdGVnb3J5LCBsYWJlbCwgaXRlbXM6IGdyb3VwSXRlbXMgfSwgZ3JvdXBJbmRleCkgPT4gKFxuICAgICAgICA8Qm94IGtleT17Y2F0ZWdvcnl9IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAge2dyb3VwSW5kZXggPiAwICYmIDxEaXZpZGVyIC8+fVxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ3NlY29uZGFyeScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIHtncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgPENoZWNrbGlzdEl0ZW1cbiAgICAgICAgICAgICAga2V5PXtpdGVtLml0ZW19XG4gICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgIGNoZWNrZWQ9eyEhY2hlY2tsaXN0U3RhdGVbaXRlbS5pdGVtXX1cbiAgICAgICAgICAgICAgYXV0b1BvcHVsYXRlZD17aXNBdXRvUG9wdWxhdGVkKGl0ZW0sIGRpc3B1dGUpfVxuICAgICAgICAgICAgICBleHBhbmRlZFNlY3Rpb25zPXtleHBhbmRlZFNlY3Rpb25zLmdldChpdGVtLml0ZW0pID8/IG5ldyBTZXQoKX1cbiAgICAgICAgICAgICAgbm90ZXM9e25vdGVzU3RhdGVbaXRlbS5pdGVtXSA/PyAnJ31cbiAgICAgICAgICAgICAgZXhpc3RpbmdGaWxlPXtmaWxlc1N0YXRlW2l0ZW0uaXRlbV0gPz8gbnVsbH1cbiAgICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlLmlkfVxuICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiBoYW5kbGVUb2dnbGUoaXRlbS5pdGVtKX1cbiAgICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlPXsoc2VjdGlvbikgPT4gaGFuZGxlU2VjdGlvblRvZ2dsZShpdGVtLml0ZW0sIHNlY3Rpb24pfVxuICAgICAgICAgICAgICBvbk5vdGVzQ2hhbmdlPXsodmFsdWUpID0+IGhhbmRsZU5vdGVzQ2hhbmdlKGl0ZW0uaXRlbSwgdmFsdWUpfVxuICAgICAgICAgICAgICBvbkZpbGVDaGFuZ2U9eyhmaWxlKSA9PiBoYW5kbGVGaWxlQ2hhbmdlKGl0ZW0uaXRlbSwgZmlsZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0JveD5cbiAgICAgICkpfVxuXG4gICAgICA8RGl2aWRlciAvPlxuXG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnZGlzYWJsZWQnIH19PlxuICAgICAgICBZb3VyIHByb2dyZXNzIGFuZCBub3RlcyBhcmUgc2F2ZWQgYXV0b21hdGljYWxseS5cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXZpZGVuY2VDaGVja2xpc3Q7XG4iLCAiaW1wb3J0IHsgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgQ2hlY2tsaXN0UHJvZ3Jlc3NQcm9wcyB7XG4gIGNvbXBsZXRlZDogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG50eXBlIEZyYWN0aW9uV2lkdGggPSAnMS8xMicgfCAnMi8xMicgfCAnMy8xMicgfCAnNC8xMicgfCAnNS8xMicgfCAnNi8xMicgfCAnNy8xMicgfCAnOC8xMicgfCAnOS8xMicgfCAnMTAvMTInIHwgJzExLzEyJyB8ICdmaWxsJztcblxuZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NXaWR0aChjb21wbGV0ZWQ6IG51bWJlciwgdG90YWw6IG51bWJlcik6IEZyYWN0aW9uV2lkdGggfCBudWxsIHtcbiAgaWYgKHRvdGFsID09PSAwIHx8IGNvbXBsZXRlZCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGlmIChjb21wbGV0ZWQgPj0gdG90YWwpIHJldHVybiAnZmlsbCc7XG4gIGNvbnN0IHR3ZWxmdGhzID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCgoY29tcGxldGVkIC8gdG90YWwpICogMTIpKTtcbiAgcmV0dXJuIGAke3R3ZWxmdGhzfS8xMmAgYXMgRnJhY3Rpb25XaWR0aDtcbn1cblxuY29uc3QgQ2hlY2tsaXN0UHJvZ3Jlc3MgPSAoeyBjb21wbGV0ZWQsIHRvdGFsIH06IENoZWNrbGlzdFByb2dyZXNzUHJvcHMpID0+IHtcbiAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IGdldFByb2dyZXNzV2lkdGgoY29tcGxldGVkLCB0b3RhbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICBFdmlkZW5jZSBQcm9ncmVzc1xuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAge2NvbXBsZXRlZH0gb2Yge3RvdGFsfSBjb21wbGV0ZWRcbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggY3NzPXt7IGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsIGJvcmRlclJhZGl1czogJ3JvdW5kZWQnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgIHtwcm9ncmVzc1dpZHRoID8gKFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdzdXJmYWNlJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAncm91bmRlZCcsXG4gICAgICAgICAgICAgIHdpZHRoOiBwcm9ncmVzc1dpZHRoLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAneHhzbWFsbCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxJbmxpbmU+eycgJ308L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAneHhzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lPnsnICd9PC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrbGlzdFByb2dyZXNzO1xuIiwgImltcG9ydCB7IEJveCwgQ2hlY2tib3gsIEJhZGdlLCBJbmxpbmUsIExpbmssIEljb24sIFRleHRBcmVhIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0sIEV2aWRlbmNlRmlsZSB9IGZyb20gJy4uLy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgRmlsZVVwbG9hZFNlY3Rpb24gZnJvbSAnLi9GaWxlVXBsb2FkU2VjdGlvbic7XG5cbmV4cG9ydCB0eXBlIEV4cGFuZGVkU2VjdGlvbiA9ICd3aHknIHwgJ3doZXJlJyB8ICdub3RlcycgfCAnZmlsZSc7XG5cbmludGVyZmFjZSBDaGVja2xpc3RJdGVtUHJvcHMge1xuICBpdGVtOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW07XG4gIGNoZWNrZWQ6IGJvb2xlYW47XG4gIGF1dG9Qb3B1bGF0ZWQ6IGJvb2xlYW47XG4gIGV4cGFuZGVkU2VjdGlvbnM6IFNldDxFeHBhbmRlZFNlY3Rpb24+O1xuICBub3Rlczogc3RyaW5nO1xuICBleGlzdGluZ0ZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGw7XG4gIGRpc3B1dGVJZDogc3RyaW5nO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIG9uVG9nZ2xlOiAoKSA9PiB2b2lkO1xuICBvblNlY3Rpb25Ub2dnbGU6IChzZWN0aW9uOiBFeHBhbmRlZFNlY3Rpb24pID0+IHZvaWQ7XG4gIG9uTm90ZXNDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkZpbGVDaGFuZ2U6IChmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBnZXRDYXRlZ29yeUJhZGdlKGNhdGVnb3J5OiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bJ2NhdGVnb3J5J10pIHtcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgIGNhc2UgJ21hbmRhdG9yeSc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJuZWdhdGl2ZVwiPlJFUVVJUkVEPC9CYWRnZT47XG4gICAgY2FzZSAncmVjb21tZW5kZWQnOlxuICAgICAgcmV0dXJuIDxCYWRnZSB0eXBlPVwid2FybmluZ1wiPkhFTFBGVUw8L0JhZGdlPjtcbiAgICBjYXNlICdzaXR1YXRpb25hbCc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJuZXV0cmFsXCI+SUYgQVBQTElDQUJMRTwvQmFkZ2U+O1xuICB9XG59XG5cbmludGVyZmFjZSBTZWN0aW9uVG9nZ2xlUHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICBleHBhbmRlZDogYm9vbGVhbjtcbiAgb25QcmVzczogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgU2VjdGlvblRvZ2dsZSA9ICh7IGxhYmVsLCBleHBhbmRlZCwgb25QcmVzcyB9OiBTZWN0aW9uVG9nZ2xlUHJvcHMpID0+IChcbiAgPExpbmsgb25QcmVzcz17b25QcmVzc30+XG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHhzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPEljb24gbmFtZT17ZXhwYW5kZWQgPyAnY2hldnJvblVwJyA6ICdjaGV2cm9uRG93bid9IHNpemU9XCJ4c21hbGxcIiAvPlxuICAgIDwvQm94PlxuICA8L0xpbms+XG4pO1xuXG5jb25zdCBDaGVja2xpc3RJdGVtID0gKHtcbiAgaXRlbSxcbiAgY2hlY2tlZCxcbiAgYXV0b1BvcHVsYXRlZCxcbiAgZXhwYW5kZWRTZWN0aW9ucyxcbiAgbm90ZXMsXG4gIGV4aXN0aW5nRmlsZSxcbiAgZGlzcHV0ZUlkLFxuICBjb250ZXh0LFxuICBvblRvZ2dsZSxcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbk5vdGVzQ2hhbmdlLFxuICBvbkZpbGVDaGFuZ2UsXG59OiBDaGVja2xpc3RJdGVtUHJvcHMpID0+IHtcbiAgY29uc3Qgd2h5RXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2h5Jyk7XG4gIGNvbnN0IHdoZXJlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnd2hlcmUnKTtcbiAgY29uc3Qgbm90ZXNFeHBhbmRlZCA9IGV4cGFuZGVkU2VjdGlvbnMuaGFzKCdub3RlcycpO1xuICBjb25zdCBmaWxlRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnZmlsZScpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnLCBwYWRkaW5nOiAnc21hbGwnLCBib3JkZXJSYWRpdXM6ICdtZWRpdW0nLCBiYWNrZ3JvdW5kQ29sb3I6ICdjb250YWluZXInIH19PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgICBvbkNoYW5nZT17b25Ub2dnbGV9XG4gICAgICAgICAgYXJpYS1sYWJlbD17aXRlbS5pdGVtfVxuICAgICAgICAvPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4eHNtYWxsJywgd2lkdGg6ICdmaWxsJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcsIGNvbG9yOiBjaGVja2VkID8gJ3NlY29uZGFyeScgOiB1bmRlZmluZWQgfX0+XG4gICAgICAgICAgICAgIHtpdGVtLml0ZW19XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIHthdXRvUG9wdWxhdGVkICYmIDxCYWRnZSB0eXBlPVwiaW5mb1wiPkZST00gU1RSSVBFPC9CYWRnZT59XG4gICAgICAgICAgICB7Z2V0Q2F0ZWdvcnlCYWRnZShpdGVtLmNhdGVnb3J5KX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIHdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2h5IHRoaXMgbWF0dGVyc1wiXG4gICAgICAgICAgICAgIGV4cGFuZGVkPXt3aHlFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aHknKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7aXRlbS53aGVyZV90b19maW5kICYmIChcbiAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICBsYWJlbD1cIldoZXJlIHRvIGZpbmQgdGhpc1wiXG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doZXJlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aGVyZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPXtub3RlcyA/ICdZb3VyIG5vdGVzJyA6ICdBZGQgbm90ZXMnfVxuICAgICAgICAgICAgICBleHBhbmRlZD17bm90ZXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdub3RlcycpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgIGxhYmVsPXtleGlzdGluZ0ZpbGUgPyBleGlzdGluZ0ZpbGUuZmlsZV9uYW1lIDogJ0F0dGFjaCBmaWxlJ31cbiAgICAgICAgICAgICAgZXhwYW5kZWQ9e2ZpbGVFeHBhbmRlZH1cbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCdmaWxlJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7d2h5RXhwYW5kZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJywgcGFkZGluZzogJ3NtYWxsJywgYm9yZGVyUmFkaXVzOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2l0ZW0ud2h5X21hdHRlcnN9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge3doZXJlRXhwYW5kZWQgJiYgaXRlbS53aGVyZV90b19maW5kICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtpdGVtLndoZXJlX3RvX2ZpbmR9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge25vdGVzRXhwYW5kZWQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBtYXJnaW5MZWZ0OiAneGxhcmdlJyB9fT5cbiAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgIGxhYmVsPVwiWW91ciBub3Rlc1wiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gdHJhY2tpbmcgIywgZmlsZSBuYW1lLCB3aGVyZSB0byBmaW5kIHRoaXMuLi5cIlxuICAgICAgICAgICAgdmFsdWU9e25vdGVzfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbk5vdGVzQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7ZmlsZUV4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScgfX0+XG4gICAgICAgICAgPEZpbGVVcGxvYWRTZWN0aW9uXG4gICAgICAgICAgICBkaXNwdXRlSWQ9e2Rpc3B1dGVJZH1cbiAgICAgICAgICAgIGNoZWNrbGlzdEl0ZW1LZXk9e2l0ZW0uaXRlbX1cbiAgICAgICAgICAgIGV4aXN0aW5nRmlsZT17ZXhpc3RpbmdGaWxlfVxuICAgICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICAgIG9uRmlsZUNoYW5nZT17b25GaWxlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrbGlzdEl0ZW07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJhbm5lciwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgU3RyaXBlRmlsZVVwbG9hZGVyIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBFdmlkZW5jZUZpbGUgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBkZWxldGVCYWNrZW5kIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5cbmludGVyZmFjZSBGaWxlVXBsb2FkU2VjdGlvblByb3BzIHtcbiAgZGlzcHV0ZUlkOiBzdHJpbmc7XG4gIGNoZWNrbGlzdEl0ZW1LZXk6IHN0cmluZztcbiAgZXhpc3RpbmdGaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIG9uRmlsZUNoYW5nZTogKGZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGwpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEZpbGVTaXplKGJ5dGVzOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoYnl0ZXMgPCAxMDI0KSByZXR1cm4gYCR7Ynl0ZXN9IEJgO1xuICBpZiAoYnl0ZXMgPCAxMDI0ICogMTAyNCkgcmV0dXJuIGAkeyhieXRlcyAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCYDtcbiAgcmV0dXJuIGAkeyhieXRlcyAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMSl9IE1CYDtcbn1cblxuZnVuY3Rpb24gZ2V0TWltZUxhYmVsKG1pbWVUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ2FwcGxpY2F0aW9uL3BkZic6ICdQREYnLFxuICAgICdpbWFnZS9wbmcnOiAnUE5HJyxcbiAgICAnaW1hZ2UvanBlZyc6ICdKUEcnLFxuICAgICdpbWFnZS9naWYnOiAnR0lGJyxcbiAgICAndGV4dC9jc3YnOiAnQ1NWJyxcbiAgICAndGV4dC9wbGFpbic6ICdUWFQnLFxuICB9O1xuICByZXR1cm4gbWFwW21pbWVUeXBlXSA/PyAnRklMRSc7XG59XG5cbmNvbnN0IEZpbGVVcGxvYWRTZWN0aW9uID0gKHtcbiAgZGlzcHV0ZUlkLFxuICBjaGVja2xpc3RJdGVtS2V5LFxuICBleGlzdGluZ0ZpbGUsXG4gIGNvbnRleHQsXG4gIG9uRmlsZUNoYW5nZSxcbn06IEZpbGVVcGxvYWRTZWN0aW9uUHJvcHMpID0+IHtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dSZXBsYWNlLCBzZXRTaG93UmVwbGFjZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlVXBsb2FkQ29tcGxldGUgPSBhc3luYyAoZmlsZU9iamVjdDoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gIH0pID0+IHtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBzZXRTYXZpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRXZpZGVuY2VGaWxlIH0+KFxuICAgICAgICBgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGVJZH0vZXZpZGVuY2UtZmlsZXNgLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICB7XG4gICAgICAgICAgY2hlY2tsaXN0X2l0ZW1fa2V5OiBjaGVja2xpc3RJdGVtS2V5LFxuICAgICAgICAgIHN0cmlwZV9maWxlX2lkOiBmaWxlT2JqZWN0LmlkLFxuICAgICAgICAgIGZpbGVfbmFtZTogZmlsZU9iamVjdC5maWxlbmFtZSA/PyAndW50aXRsZWQnLFxuICAgICAgICAgIGZpbGVfc2l6ZTogZmlsZU9iamVjdC5zaXplLFxuICAgICAgICAgIG1pbWVfdHlwZTogZmlsZU9iamVjdC50eXBlID8/ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIG9uRmlsZUNoYW5nZShyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRTaG93UmVwbGFjZShmYWxzZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHNhdmUgZmlsZSByZWNvcmQuIFRoZSBmaWxlIHdhcyB1cGxvYWRlZCB0byBTdHJpcGUgYnV0IHdlIGNvdWxkIG5vdCBsaW5rIGl0LiBUcnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZEVycm9yID0gKCkgPT4ge1xuICAgIHNldEVycm9yKCdVcGxvYWQgZmFpbGVkLiBDaGVjayB5b3VyIGZpbGUgaXMgdW5kZXIgMTBNQiBhbmQgYSBzdXBwb3J0ZWQgdHlwZSAoUERGLCBQTkcsIEpQRywgR0lGLCBDU1YsIFRYVCkuJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZXhpc3RpbmdGaWxlKSByZXR1cm47XG4gICAgc2V0RXJyb3IobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGVsZXRlQmFja2VuZChcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlSWR9L2V2aWRlbmNlLWZpbGVzLyR7ZXhpc3RpbmdGaWxlLmlkfWAsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICApO1xuICAgICAgb25GaWxlQ2hhbmdlKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byByZW1vdmUgZmlsZS4gVHJ5IGFnYWluLicpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8QmFubmVyXG4gICAgICAgICAgdHlwZT1cImNyaXRpY2FsXCJcbiAgICAgICAgICB0aXRsZT1cIlVwbG9hZCBpc3N1ZVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249e2Vycm9yfVxuICAgICAgICAgIG9uRGlzbWlzcz17KCkgPT4gc2V0RXJyb3IobnVsbCl9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7ZXhpc3RpbmdGaWxlICYmICFzaG93UmVwbGFjZSA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnLCBhbGlnblk6ICdjZW50ZXInLCB3cmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPVwieHNtYWxsXCIgLz5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAge2V4aXN0aW5nRmlsZS5maWxlX25hbWV9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxCYWRnZSB0eXBlPVwiaW5mb1wiPntnZXRNaW1lTGFiZWwoZXhpc3RpbmdGaWxlLm1pbWVfdHlwZSl9PC9CYWRnZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7Zm9ybWF0RmlsZVNpemUoZXhpc3RpbmdGaWxlLmZpbGVfc2l6ZSl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93UmVwbGFjZSh0cnVlKX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5SZXBsYWNlPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8TGluayBvblByZXNzPXtoYW5kbGVSZW1vdmV9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnY3JpdGljYWwnIH19PlJlbW92ZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge3Nob3dSZXBsYWNlICYmIChcbiAgICAgICAgICAgIDxMaW5rIG9uUHJlc3M9eygpID0+IHNldFNob3dSZXBsYWNlKGZhbHNlKX0+XG4gICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkNhbmNlbCByZXBsYWNlPC9JbmxpbmU+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8U3RyaXBlRmlsZVVwbG9hZGVyXG4gICAgICAgICAgICBsYWJlbD17c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnQ2hvb3NlIGZpbGUnfVxuICAgICAgICAgICAgcHVycG9zZT1cImRpc3B1dGVfZXZpZGVuY2VcIlxuICAgICAgICAgICAgb25Db21wbGV0ZT17aGFuZGxlVXBsb2FkQ29tcGxldGV9XG4gICAgICAgICAgICBvbkVycm9yPXtoYW5kbGVVcGxvYWRFcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgUERGLCBQTkcsIEpQRywgb3IgR0lGLiBNYXggMTBNQi5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZFNlY3Rpb247XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU2VsZWN0LFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG4gIEJhbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVDYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZUNhcmQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5U3RhdGUnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCYW5uZXInO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgaXNSZXNvbHZlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFZpZXdTdGF0ZSA9ICdsb2FkaW5nJyB8ICdlcnJvcicgfCAncmVhZHknO1xudHlwZSBTdGF0dXNGaWx0ZXIgPSAnYWxsJyB8ICduZWVkc19yZXNwb25zZScgfCAndW5kZXJfcmV2aWV3JyB8ICdyZXNvbHZlZCc7XG5cbmNvbnN0IEZJTFRFUl9PUFRJT05TOiB7IHZhbHVlOiBTdGF0dXNGaWx0ZXI7IGxhYmVsOiBzdHJpbmcgfVtdID0gW1xuICB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwgZGlzcHV0ZXMnIH0sXG4gIHsgdmFsdWU6ICduZWVkc19yZXNwb25zZScsIGxhYmVsOiAnTmVlZHMgcmVzcG9uc2UnIH0sXG4gIHsgdmFsdWU6ICd1bmRlcl9yZXZpZXcnLCBsYWJlbDogJ1VuZGVyIHJldmlldycgfSxcbiAgeyB2YWx1ZTogJ3Jlc29sdmVkJywgbGFiZWw6ICdSZXNvbHZlZCcgfSxcbl07XG5cbmZ1bmN0aW9uIG1hdGNoZXNGaWx0ZXIoZGlzcHV0ZTogRGlzcHV0ZSwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBib29sZWFuIHtcbiAgc3dpdGNoIChmaWx0ZXIpIHtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnbmVlZHNfcmVzcG9uc2UnOlxuICAgICAgcmV0dXJuIGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBkaXNwdXRlLnN0YXR1cyA9PT0gJ3VuZGVyX3JldmlldycgfHwgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX3VuZGVyX3Jldmlldyc7XG4gICAgY2FzZSAncmVzb2x2ZWQnOlxuICAgICAgcmV0dXJuIGlzUmVzb2x2ZWQoZGlzcHV0ZS5zdGF0dXMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb3VudFRleHQoY291bnQ6IG51bWJlciwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBzdHJpbmcge1xuICBjb25zdCBub3VuID0gY291bnQgPT09IDEgPyAnZGlzcHV0ZScgOiAnZGlzcHV0ZXMnO1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gbmVlZGluZyByZXNwb25zZWA7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gdW5kZXIgcmV2aWV3YDtcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHJlc29sdmVkYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAke2NvdW50fSAke25vdW59YDtcbiAgfVxufVxuXG5jb25zdCBEaXNwdXRlTGlzdFZpZXcgPSAoY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIGNvbnN0IHsgZW52aXJvbm1lbnQsIHVzZXJDb250ZXh0IH0gPSBjb250ZXh0O1xuICBjb25zdCBbdmlld1N0YXRlLCBzZXRWaWV3U3RhdGVdID0gdXNlU3RhdGU8Vmlld1N0YXRlPignbG9hZGluZycpO1xuICBjb25zdCBbZGlzcHV0ZXMsIHNldERpc3B1dGVzXSA9IHVzZVN0YXRlPERpc3B1dGVbXT4oW10pO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3RhdHVzRmlsdGVyLCBzZXRTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGU8U3RhdHVzRmlsdGVyPignYWxsJyk7XG5cbiAgY29uc3QgW3NlbGVjdGVkRGlzcHV0ZSwgc2V0U2VsZWN0ZWREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZXMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGVbXSB9PignL2FwaS9kaXNwdXRlcycsIGNvbnRleHRSZWYuY3VycmVudCk7XG4gICAgICBzZXREaXNwdXRlcyhyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgQXBpRXJyb3JcbiAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZXMuIFBsZWFzZSB0cnkgYWdhaW4uJztcbiAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlcygpO1xuICB9LCBbbG9hZERpc3B1dGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0RGlzcHV0ZSA9IChkaXNwdXRlOiBEaXNwdXRlKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWREaXNwdXRlKGRpc3B1dGUpO1xuICAgIHNldFNob3dXb3JrZmxvdyh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbG9zZVdvcmtmbG93ID0gKHNob3duOiBib29sZWFuKSA9PiB7XG4gICAgc2V0U2hvd1dvcmtmbG93KHNob3duKTtcbiAgICBpZiAoIXNob3duKSBzZXRTZWxlY3RlZERpc3B1dGUobnVsbCk7XG4gIH07XG5cbiAgLy8gU29ydCBieSBkZWFkbGluZSAoc29vbmVzdCBmaXJzdClcbiAgY29uc3Qgc29ydGVkRGlzcHV0ZXMgPSBbLi4uZGlzcHV0ZXNdLnNvcnQoXG4gICAgKGEsIGIpID0+IG5ldyBEYXRlKGEuZHVlX2J5KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZV9ieSkuZ2V0VGltZSgpLFxuICApO1xuXG4gIGNvbnN0IGZpbHRlcmVkRGlzcHV0ZXMgPSBzb3J0ZWREaXNwdXRlcy5maWx0ZXIoKGQpID0+IG1hdGNoZXNGaWx0ZXIoZCwgc3RhdHVzRmlsdGVyKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCIgZGVzY3JpcHRpb249XCJHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uXCI+XG4gICAgICB7dmlld1N0YXRlID09PSAnbG9hZGluZycgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTG9hZGluZyBkaXNwdXRlcy4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdlcnJvcicgJiYgKFxuICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JNZXNzYWdlfSAvPlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ3JlYWR5JyAmJiAoXG4gICAgICAgIDxUYWJzIGZpdHRlZCBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICA8VGFiIGlkPVwiZGlzcHV0ZXNcIj5EaXNwdXRlczwvVGFiPlxuICAgICAgICAgICAgPFRhYiBpZD1cImluc2lnaHRzXCI+SW5zaWdodHM8L1RhYj5cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImRpc3B1dGVzXCI+XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdzbWFsbCcsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICB7ZGlzcHV0ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPEVtcHR5U3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJObyBkaXNwdXRlcyB5ZXRcIlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldoZW4gYSBkaXNwdXRlIGNvbWVzIGluLCB3ZSdsbCB3YWxrIHlvdSB0aHJvdWdoIGV4YWN0bHkgd2hhdCB0byBkby5cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5FbGVtZW50cz17WydsYWJlbCddfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUgYXMgU3RhdHVzRmlsdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtGSUxURVJfT1BUSU9OUy5tYXAoKG9wdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZ1RvcDogJ3NtYWxsJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDb3VudFRleHQoZmlsdGVyZWREaXNwdXRlcy5sZW5ndGgsIHN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZERpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBObyB7RklMVEVSX09QVElPTlMuZmluZCgobykgPT4gby52YWx1ZSA9PT0gc3RhdHVzRmlsdGVyKT8ubGFiZWwudG9Mb3dlckNhc2UoKX0gZGlzcHV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZERpc3B1dGVzLm1hcCgoZGlzcHV0ZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPERpc3B1dGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpID0+IGhhbmRsZVNlbGVjdERpc3B1dGUoZGlzcHV0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJpbnNpZ2h0c1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkluc2lnaHRzXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2luIHJhdGUgYW5hbHl0aWNzIGFuZCBkaXNwdXRlIHBhdHRlcm5zIHdpbGwgYXBwZWFyIGhlcmUuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgQ29taW5nIGluIFdJTi0yMiBhbmQgV0lOLTIzLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgICl9XG5cbiAgICAgIHtzZWxlY3RlZERpc3B1dGUgJiYgKFxuICAgICAgICA8RGlzcHV0ZVdvcmtmbG93XG4gICAgICAgICAgZGlzcHV0ZT17c2VsZWN0ZWREaXNwdXRlfVxuICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgICBzZXRTaG93bj17aGFuZGxlQ2xvc2VXb3JrZmxvd31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVMaXN0VmlldztcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBCdXR0b24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UsIGdldFVyZ2VuY3lCYWRnZSwgZ2V0UmVhc29uQ29kZUxhYmVsIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERpc3B1dGVDYXJkUHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBvblNlbGVjdDogKGRpc3B1dGVJZDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBbW91bnQoYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICBjdXJyZW5jeTogY3VycmVuY3kudG9VcHBlckNhc2UoKSxcbiAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG59XG5cbmNvbnN0IERpc3B1dGVDYXJkID0gKHsgZGlzcHV0ZSwgb25TZWxlY3QgfTogRGlzcHV0ZUNhcmRQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNCYWRnZSA9IGdldFN0YXR1c0JhZGdlKGRpc3B1dGUuc3RhdHVzKTtcbiAgY29uc3QgdXJnZW5jeUJhZGdlID0gZ2V0VXJnZW5jeUJhZGdlKGRpc3B1dGUuZHVlX2J5LCBkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHJlYXNvbkxhYmVsID0gZ2V0UmVhc29uQ29kZUxhYmVsKGRpc3B1dGUubmV0d29yaywgZGlzcHV0ZS5yZWFzb25fY29kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uXG4gICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgIGNzcz17eyB3aWR0aDogJ2ZpbGwnIH19XG4gICAgICBvblByZXNzPXsoKSA9PiBvblNlbGVjdChkaXNwdXRlLmlkKX1cbiAgICA+XG4gICAgICA8Qm94XG4gICAgICAgIGNzcz17e1xuICAgICAgICAgIHN0YWNrOiAneScsXG4gICAgICAgICAgZ2FwOiAneHNtYWxsJyxcbiAgICAgICAgICB3aWR0aDogJ2ZpbGwnLFxuICAgICAgICAgIHBhZGRpbmc6ICdzbWFsbCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLCBhbGlnblk6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIHtmb3JtYXRBbW91bnQoZGlzcHV0ZS5hbW91bnQsIGRpc3B1dGUuY3VycmVuY3kpfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAgICB7dXJnZW5jeUJhZGdlICYmIChcbiAgICAgICAgICAgICAgPEJhZGdlIHR5cGU9e3VyZ2VuY3lCYWRnZS50eXBlfT57dXJnZW5jeUJhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nIH19PlxuICAgICAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX25hbWUgfHwgJ1Vua25vd24gY3VzdG9tZXInfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAge3JlYXNvbkxhYmVsICYmIChcbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtyZWFzb25MYWJlbH1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgKX1cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUubmV0d29yay5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUubmV0d29yay5zbGljZSgxKX0ge2Rpc3B1dGUucmVhc29uX2NvZGV9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5pZC5zbGljZSgwLCAxMil9Li4uXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9CdXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlQ2FyZDtcbiIsICIvLyBzdHJpcGUtYXBwL3NyYy9jb21wb25lbnRzL0VtcHR5U3RhdGUudHN4XG5cbmltcG9ydCB7IEJveCwgSWNvbiwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIEVtcHR5U3RhdGVQcm9wcyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbmNvbnN0IEVtcHR5U3RhdGUgPSAoeyB0aXRsZSwgZGVzY3JpcHRpb24gfTogRW1wdHlTdGF0ZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgY3NzPXt7XG4gICAgICAgIHBhZGRpbmc6ICd4bGFyZ2UnLFxuICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxJY29uIG5hbWU9XCJpbmZvXCIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAge2Rlc2NyaXB0aW9ufVxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFbXB0eVN0YXRlO1xuIiwgImltcG9ydCB7XG4gIEJveCxcbiAgQmFubmVyLFxuICBJbmxpbmUsXG4gIFNldHRpbmdzVmlldyxcbiAgRGl2aWRlcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuXG5jb25zdCBBcHBTZXR0aW5ncyA9ICh7IGVudmlyb25tZW50LCB1c2VyQ29udGV4dCB9OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U2V0dGluZ3NWaWV3PlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJywgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgU3Vic2NyaXB0aW9uXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBTdWJzY3JpcHRpb24gbWFuYWdlbWVudCB3aWxsIGJlIGF2YWlsYWJsZSBoZXJlLiBDb21pbmcgaW4gV0lOLTI0LlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgQWNjb3VudFxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgQ29ubmVjdGVkIFN0cmlwZSBhY2NvdW50IGluZm9ybWF0aW9uIHdpbGwgYXBwZWFyIGhlcmUuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICBBYm91dCBXaW5CYWNrXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknIH19PlxuICAgICAgICAgICAgVmVyc2lvbiAwLjAuMVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgR3VpZGVkIGRpc3B1dGUgcmVzb2x1dGlvbiBmb3IgU3RyaXBlIG1lcmNoYW50cy4gQnVpbHQgYnkgSktCIFRlY2guXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9TZXR0aW5nc1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBTZXR0aW5ncztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGNBQWM7QUFDdEIsY0FBUSxjQUFjO0FBQUE7QUFBQTs7O0FDSHRCO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGtCQUFrQixRQUFRLFlBQVksUUFBUSxjQUFjLFFBQVEsWUFBWSxRQUFRLFlBQVksUUFBUSxNQUFNLFFBQVEsWUFBWSxRQUFRLFdBQVcsUUFBUSxVQUFVLFFBQVEsU0FBUyxRQUFRLHFCQUFxQixRQUFRLFVBQVUsUUFBUSxZQUFZLFFBQVEsYUFBYSxRQUFRLGVBQWUsUUFBUSxTQUFTLFFBQVEsUUFBUSxRQUFRLGVBQWUsUUFBUSxtQkFBbUIsUUFBUSw0QkFBNEIsUUFBUSxpQkFBaUIsUUFBUSxPQUFPLFFBQVEsV0FBVyxRQUFRLFlBQVksUUFBUSxPQUFPLFFBQVEsV0FBVyxRQUFRLE9BQU8sUUFBUSxZQUFZLFFBQVEsU0FBUyxRQUFRLE1BQU0sUUFBUSxPQUFPLFFBQVEsaUJBQWlCLFFBQVEsWUFBWSxRQUFRLFVBQVUsUUFBUSxrQkFBa0IsUUFBUSx5QkFBeUIsUUFBUSxtQkFBbUIsUUFBUSxZQUFZLFFBQVEsY0FBYyxRQUFRLE9BQU8sUUFBUSxXQUFXLFFBQVEsV0FBVyxRQUFRLFNBQVMsUUFBUSxjQUFjLFFBQVEsTUFBTSxRQUFRLFdBQVcsUUFBUSxTQUFTLFFBQVEsUUFBUSxRQUFRLFlBQVksUUFBUSxnQkFBZ0I7QUFDci9CLGNBQVEsVUFBVSxRQUFRLFlBQVksUUFBUSxXQUFXLFFBQVEsV0FBVyxRQUFRLGVBQWUsUUFBUSxPQUFPLFFBQVEsV0FBVyxRQUFRLFFBQVE7QUFDckosVUFBTSxnQkFBZ0IsVUFBUTtBQUM5QixVQUFNLFVBQVUsVUFBUTtBQUN4QixVQUFNLFlBQVk7QUFDbEIsVUFBTSxlQUFlLENBQUMsY0FBYztBQUNoQyxjQUFNLHVCQUF1QixVQUFVLGVBQWUsVUFBVSxTQUFTO0FBQ3pFLGNBQU0sZUFBZSxDQUFDLFdBQVksR0FBRyxjQUFjLEtBQUssV0FBVyxpQ0FBSyxRQUFMLEVBQVksc0JBQTRDLFlBQVksVUFBVSxhQUFhLGVBQWUsS0FBSyxFQUFDO0FBQ25MLHFCQUFhLHVCQUF1QjtBQUNwQyxlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQU0sa0JBQWtCLENBQUMsTUFBTSxlQUFlLHFCQUFxQjtBQUMvRCxjQUFNLG1CQUFtQixHQUFHLFFBQVEsNEJBQTRCLE1BQU07QUFBQSxVQUNsRTtBQUFBLFFBQ0osQ0FBQztBQUNELFlBQUksQ0FBQyxrQkFBa0I7QUFDbkIsaUJBQU87QUFBQSxRQUNYO0FBQ0EsZUFBTyxhQUFhLGVBQWU7QUFBQSxNQUN2QztBQUNBLGNBQVEsZ0JBQWdCLGdCQUFnQixpQkFBaUIsQ0FBQyxTQUFTLFdBQVcsU0FBUyxVQUFVLEdBQUcsSUFBSTtBQUN4RyxjQUFRLFlBQVksZ0JBQWdCLGFBQWEsQ0FBQyxHQUFHLElBQUk7QUFDekQsY0FBUSxRQUFRLGdCQUFnQixTQUFTLENBQUMsR0FBRyxJQUFJO0FBQ2pELGNBQVEsU0FBUyxnQkFBZ0IsVUFBVSxDQUFDLFdBQVcsZUFBZSxPQUFPLEdBQUcsSUFBSTtBQUNwRixjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxHQUFHLElBQUk7QUFDdkQsY0FBUSxNQUFNLGdCQUFnQixPQUFPLENBQUMsR0FBRyxJQUFJO0FBQzdDLGNBQVEsY0FBYyxnQkFBZ0IsZUFBZSxDQUFDLGFBQWEsR0FBRyxJQUFJO0FBQzFFLGNBQVEsU0FBUyxnQkFBZ0IsVUFBVSxDQUFDLEdBQUcsSUFBSTtBQUNuRCxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUM5RCxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxHQUFHLElBQUk7QUFDdkQsY0FBUSxPQUFPLGdCQUFnQixRQUFRLENBQUMsR0FBRyxJQUFJO0FBQy9DLGNBQVEsY0FBYyxnQkFBZ0IsZUFBZSxDQUFDLFdBQVcsVUFBVSxpQkFBaUIsaUJBQWlCLGlCQUFpQixHQUFHLElBQUk7QUFDckksY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDaEUsY0FBUSxtQkFBbUIsZ0JBQWdCLG9CQUFvQixDQUFDLEdBQUcsSUFBSTtBQUN2RSxjQUFRLHlCQUF5QixnQkFBZ0IsMEJBQTBCLENBQUMsR0FBRyxJQUFJO0FBQ25GLGNBQVEsa0JBQWtCLGdCQUFnQixtQkFBbUIsQ0FBQyxHQUFHLElBQUk7QUFDckUsY0FBUSxVQUFVLGdCQUFnQixXQUFXLENBQUMsR0FBRyxJQUFJO0FBQ3JELGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLGlCQUFpQixpQkFBaUIsaUJBQWlCLEdBQUcsSUFBSTtBQUM1RyxjQUFRLGlCQUFpQixnQkFBZ0Isa0JBQWtCLENBQUMsR0FBRyxJQUFJO0FBQ25FLGNBQVEsT0FBTyxnQkFBZ0IsUUFBUSxDQUFDLEdBQUcsSUFBSTtBQUMvQyxjQUFRLE1BQU0sZ0JBQWdCLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDN0MsY0FBUSxTQUFTLGdCQUFnQixVQUFVLENBQUMsR0FBRyxJQUFJO0FBQ25ELGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUN6RCxjQUFRLE9BQU8sZ0JBQWdCLFFBQVEsQ0FBQyxHQUFHLElBQUk7QUFDL0MsY0FBUSxXQUFXLGdCQUFnQixZQUFZLENBQUMsUUFBUSxTQUFTLGtCQUFrQixTQUFTLE9BQU8sR0FBRyxJQUFJO0FBQzFHLGNBQVEsT0FBTyxnQkFBZ0IsUUFBUSxDQUFDLEdBQUcsSUFBSTtBQUMvQyxjQUFRLFlBQVksZ0JBQWdCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUNoRSxjQUFRLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxHQUFHLElBQUk7QUFDdkQsY0FBUSxPQUFPLGdCQUFnQixRQUFRLENBQUMsU0FBUyxHQUFHLElBQUk7QUFDeEQsY0FBUSxpQkFBaUIsZ0JBQWdCLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQzFFLGNBQVEsNEJBQTRCLGdCQUFnQiw2QkFBNkIsQ0FBQyxHQUFHLElBQUk7QUFDekYsY0FBUSxtQkFBbUIsZ0JBQWdCLG9CQUFvQixDQUFDLFNBQVMsT0FBTyxHQUFHLElBQUk7QUFDdkYsY0FBUSxlQUFlLGdCQUFnQixnQkFBZ0IsQ0FBQyxHQUFHLElBQUk7QUFDL0QsY0FBUSxRQUFRLGdCQUFnQixTQUFTLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDeEQsY0FBUSxTQUFTLGdCQUFnQixVQUFVLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDMUQsY0FBUSxlQUFlLGdCQUFnQixnQkFBZ0IsQ0FBQyxHQUFHLElBQUk7QUFDL0QsY0FBUSxhQUFhLGdCQUFnQixjQUFjLENBQUMsNkJBQTZCLGVBQWUsR0FBRyxJQUFJO0FBQ3ZHLGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUN6RCxjQUFRLFVBQVUsZ0JBQWdCLFdBQVcsQ0FBQyxHQUFHLElBQUk7QUFDckQsY0FBUSxxQkFBcUIsZ0JBQWdCLHNCQUFzQixDQUFDLEdBQUcsSUFBSTtBQUMzRSxjQUFRLFNBQVMsZ0JBQWdCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUMxRCxjQUFRLFVBQVUsZ0JBQWdCLFdBQVcsQ0FBQyxHQUFHLElBQUk7QUFDckQsY0FBUSxXQUFXLGdCQUFnQixZQUFZLENBQUMsR0FBRyxJQUFJO0FBQ3ZELGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUN6RCxjQUFRLE1BQU0sZ0JBQWdCLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDN0MsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUN6RCxjQUFRLGNBQWMsZ0JBQWdCLGVBQWUsQ0FBQyxHQUFHLElBQUk7QUFDN0QsY0FBUSxZQUFZLGdCQUFnQixhQUFhLENBQUMsR0FBRyxJQUFJO0FBQ3pELGNBQVEsa0JBQWtCLGdCQUFnQixtQkFBbUIsQ0FBQyxHQUFHLElBQUk7QUFDckUsY0FBUSxRQUFRLGdCQUFnQixTQUFTLENBQUMsR0FBRyxJQUFJO0FBQ2pELGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLEdBQUcsSUFBSTtBQUN2RCxjQUFRLE9BQU8sZ0JBQWdCLFFBQVEsQ0FBQyxHQUFHLElBQUk7QUFDL0MsY0FBUSxlQUFlLGdCQUFnQixnQkFBZ0IsQ0FBQyxHQUFHLElBQUk7QUFDL0QsY0FBUSxXQUFXLGdCQUFnQixZQUFZLENBQUMsR0FBRyxJQUFJO0FBQ3ZELGNBQVEsV0FBVyxnQkFBZ0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQzlELGNBQVEsWUFBWSxnQkFBZ0IsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJO0FBQ2hFLGNBQVEsVUFBVSxnQkFBZ0IsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJO0FBQUE7QUFBQTs7O0FDL0U5RDtBQUFBO0FBQUE7QUFvQkEsVUFBSSxZQUFZLFNBQVMsV0FBVyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQzVELFlBQUksTUFBdUM7QUFDekMsY0FBSSxXQUFXLFFBQVc7QUFDeEIsa0JBQU0sSUFBSSxNQUFNLDhDQUE4QztBQUFBLFVBQ2hFO0FBQUEsUUFDRjtBQUVBLFlBQUksQ0FBQyxXQUFXO0FBQ2QsY0FBSTtBQUNKLGNBQUksV0FBVyxRQUFXO0FBQ3hCLG9CQUFRLElBQUk7QUFBQSxjQUNWO0FBQUEsWUFFRjtBQUFBLFVBQ0YsT0FBTztBQUNMLGdCQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUM1QixnQkFBSSxXQUFXO0FBQ2Ysb0JBQVEsSUFBSTtBQUFBLGNBQ1YsT0FBTyxRQUFRLE9BQU8sV0FBVztBQUFFLHVCQUFPLEtBQUs7QUFBQSxjQUFhLENBQUM7QUFBQSxZQUMvRDtBQUNBLGtCQUFNLE9BQU87QUFBQSxVQUNmO0FBRUEsZ0JBQU0sY0FBYztBQUNwQixnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBRUEsYUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDaERqQjtBQUFBO0FBQUE7QUFLQSxVQUFJLGtCQUFtQixXQUFRLFFBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxlQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxNQUM1RDtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGtCQUFrQjtBQUMxQixVQUFNLGNBQWMsZ0JBQWdCLGlCQUFvQjtBQUN4RCxVQUFNLGtCQUFrQixNQUFNO0FBWDlCO0FBY0ksY0FBTSxnQkFBZSxnQkFBVyx1QkFBWCxtQkFBK0I7QUFDcEQsU0FBQyxHQUFHLFlBQVksU0FBUyxjQUFjLHVDQUF1QztBQUM5RSxlQUFPO0FBQUEsTUFDWDtBQUNBLGNBQVEsa0JBQWtCO0FBQUE7QUFBQTs7O0FDbEIxQjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSw4QkFBOEI7QUFDdEMsVUFBTSxjQUFjO0FBQ3BCLFVBQU0sOEJBQThCLE1BQVM7QUFBSSxtQkFBRyxZQUFZLGlCQUFpQixFQUM1RSxLQUFLLDRCQUE0QixFQUNqQyxLQUFLLENBQUMsY0FBYyxTQUFTLEVBQzdCLE1BQU0sTUFBTSxLQUFLO0FBQUE7QUFDdEIsY0FBUSw4QkFBOEI7QUFBQTtBQUFBOzs7QUNSdEM7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsc0JBQXNCO0FBQzlCLFVBQU0sY0FBYztBQUNwQixVQUFNLHNCQUFzQixNQUFZO0FBQ3BDLGNBQU0sU0FBUyxPQUFPLEdBQUcsWUFBWSxpQkFBaUIsRUFBRSxLQUFLLG9CQUFvQjtBQUNqRixZQUFJLENBQUMsUUFBUTtBQUNULGdCQUFNLElBQUksTUFBTSxrQ0FBa0M7QUFBQSxRQUN0RDtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQ0EsY0FBUSxzQkFBc0I7QUFBQTtBQUFBOzs7QUNYOUI7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsZ0JBQWdCO0FBQ3hCLFVBQU0sd0JBQXdCO0FBQzlCLFVBQU0sZ0JBQWdCLENBQU8sT0FBc0IseUJBQXRCLElBQXNCLG1CQUF0QixLQUFLLFVBQVUsQ0FBQyxHQUFNO0FBQy9DLGNBQU0sU0FBUyxPQUFPLEdBQUcsc0JBQXNCLHFCQUFxQjtBQUNwRSxjQUFNLE9BQU8saUNBQ04sVUFETTtBQUFBLFVBRVQsU0FBUyxpQ0FDRixRQUFRLFVBRE47QUFBQSxZQUVMLGVBQWUsVUFBVTtBQUFBLFVBQzdCO0FBQUEsUUFDSjtBQUNBLGNBQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3RDLGNBQU0sVUFBVSxDQUFDO0FBQ2pCLGlCQUFTLFFBQVEsUUFBUSxDQUFDLE9BQU8sUUFBUTtBQUNyQyxrQkFBUSxPQUFPO0FBQUEsUUFDbkIsQ0FBQztBQUNELGNBQU0sdUJBQXVCO0FBQUEsVUFDekIsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2I7QUFBQSxVQUNBLElBQUksU0FBUztBQUFBLFVBQ2IsWUFBWSxTQUFTO0FBQUEsVUFDckIsUUFBUSxTQUFTO0FBQUEsVUFDakIsWUFBWSxTQUFTO0FBQUEsVUFDckIsTUFBTSxTQUFTO0FBQUEsVUFDZixLQUFLLFNBQVM7QUFBQSxRQUNsQjtBQUNBLGdCQUFRLFNBQVMsUUFBUSxJQUFJLGNBQWMsR0FBRztBQUFBLFVBQzFDLEtBQUs7QUFDRCxpQ0FBcUIsT0FBTyxNQUFNLFNBQVMsS0FBSztBQUNoRDtBQUFBLFVBQ0o7QUFDSSxpQ0FBcUIsY0FBYyxNQUFNLFNBQVMsWUFBWTtBQUM5RDtBQUFBLFFBQ1I7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUNBLGNBQVEsZ0JBQWdCO0FBQUE7QUFBQTs7O0FDdkN4QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxlQUFlO0FBQ3ZCLFVBQU0sY0FBYztBQUNwQixVQUFNLGVBQWUsQ0FBTyxPQUE2Qix5QkFBN0IsSUFBNkIsbUJBQTdCLFlBQVksVUFBVSxDQUFDLEdBQU07QUFDckQsY0FBTSxNQUFNLElBQUksSUFBSSxVQUFVO0FBQzlCLGdCQUFRLEdBQUcsWUFBWSxpQkFBaUIsRUFBRSxLQUFLLGVBQWUsSUFBSSxXQUFXLElBQUksUUFBUSxPQUFPO0FBQUEsTUFDcEc7QUFDQSxjQUFRLGVBQWU7QUFBQTtBQUFBOzs7QUNSdkI7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsZ0NBQWdDO0FBQ3hDLFVBQU0sZ0NBQWdDO0FBQ3RDLFVBQU0sa0JBQWtCO0FBQ3hCLFVBQU0saUJBQWlCO0FBQ3ZCLFVBQUkseUJBQXlCO0FBQzdCLFVBQU0sZ0NBQWdDLE1BQVk7QUFDOUMsWUFBSSxDQUFDLHdCQUF3QjtBQUN6QixvQ0FBMEIsT0FBTyxHQUFHLDhCQUE4Qiw2QkFBNkIsS0FDekYsZ0JBQWdCLGdCQUNoQixlQUFlO0FBQUEsUUFDekI7QUFDQSxlQUFPO0FBQUEsTUFDWDtBQUNBLGNBQVEsZ0NBQWdDO0FBQUE7QUFBQTs7O0FDZnhDO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLGdDQUFnQztBQUN4QyxVQUFJLGtDQUFrQztBQUN0QyxhQUFPLGVBQWUsU0FBUyxpQ0FBaUMsRUFBRSxZQUFZLE1BQU0sS0FBSyxXQUFZO0FBQUUsZUFBTyxnQ0FBZ0M7QUFBQSxNQUErQixFQUFFLENBQUM7QUFBQTtBQUFBOzs7QUNKaEw7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsaUJBQWlCO0FBQ3pCLFVBQU0sUUFBUTtBQUNkLFVBQU0saUJBQWlCLENBQU8sTUFBTSxZQUFZO0FBQzVDLGNBQU0sdUJBQXVCLE9BQU8sR0FBRyxNQUFNLCtCQUErQjtBQUM1RSxlQUFPLHFCQUFxQixNQUFNLE9BQU87QUFBQSxNQUM3QztBQUNBLGNBQVEsaUJBQWlCO0FBQUE7QUFBQTs7O0FDUnpCO0FBQUE7QUFBQTtBQUVBLFVBQUksa0JBQW1CLFdBQVEsUUFBSyxtQkFBb0IsU0FBVSxLQUFLO0FBQ25FLGVBQVEsT0FBTyxJQUFJLGFBQWMsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLE1BQzVEO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsc0JBQXNCLFFBQVEsdUJBQXVCLFFBQVEsbUJBQW1CLFFBQVEsaUJBQWlCLFFBQVEsdUJBQXVCO0FBT2hKLFVBQU0sY0FBYyxnQkFBZ0IsaUJBQW9CO0FBQ3hELFVBQU0sYUFBYTtBQUNuQixVQUFNLG1CQUFtQjtBQUN6QixVQUFNLHlCQUFOLE1BQTZCO0FBQUEsUUFDekIsWUFBWSxNQUFNO0FBQ2QsZUFBSyxRQUFRO0FBQUEsUUFDakI7QUFBQSxRQUNBLGFBQWE7QUFDVCxpQkFBTyxLQUFLLE1BQU07QUFBQSxRQUN0QjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQ1osaUJBQU8sS0FBSyxNQUFNO0FBQUEsUUFDdEI7QUFBQSxRQUNBLGlCQUFpQjtBQUNiLGlCQUFPLEtBQUs7QUFBQSxRQUNoQjtBQUFBLFFBRUEsV0FBVztBQUNQLGdCQUFNLElBQUksTUFBTSw2REFBNkQ7QUFBQSxRQUNqRjtBQUFBLFFBRUEsU0FBUztBQUNMLGdCQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUs7QUFDdEIsY0FBSSxTQUFTLFFBQVc7QUFDcEIsbUJBQU8sUUFBUSxPQUFPLElBQUksTUFBTSx5QkFBeUIsQ0FBQztBQUFBLFVBQzlELE9BQ0s7QUFDRCxtQkFBTyxRQUFRLFFBQVEsSUFBSTtBQUFBLFVBQy9CO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFDQSxVQUFNLHVCQUFOLE1BQTJCO0FBQUEsUUFDdkIsWUFBWUEsUUFBTztBQUNmLGVBQUssU0FBU0E7QUFBQSxRQUNsQjtBQUFBLFFBRUEsZ0JBQWdCO0FBQ1osaUJBQU87QUFBQSxRQUNYO0FBQUEsUUFDTSxZQUFZLE1BQU0sTUFBTSxNQUFNLFFBQVEsU0FBUyxhQUFhLFVBQVUsVUFBVTtBQUFBO0FBQ2xGLGFBQUMsR0FBRyxZQUFZLFNBQVMsYUFBYSxTQUFTLDZDQUE2QztBQUM1RixrQkFBTSxlQUFlO0FBQUEsY0FDakI7QUFBQSxjQUNBO0FBQUEsWUFDSjtBQUNBLGdCQUFJLGFBQWE7QUFDYiwyQkFBYSxPQUFPO0FBQUEsWUFDeEI7QUFDQSxrQkFBTSxhQUFhLFFBQVE7QUFDM0IsZ0JBQUksY0FBYyxpQkFBaUIsS0FBSyxVQUFVLEdBQUc7QUFDakQsb0JBQU0sSUFBSSxNQUFNLHNMQUFzTDtBQUFBLFlBQzFNO0FBQ0Esa0JBQU0sTUFBTSxJQUFJLElBQUksTUFBTSxHQUFHLGNBQWMsTUFBTTtBQUNqRCxrQkFBTSxPQUFPLE1BQU0sS0FBSyxPQUFPLElBQUksU0FBUyxHQUFHLFlBQVk7QUFFM0QsbUJBQU8sSUFBSSx1QkFBdUIsSUFBSTtBQUFBLFVBQzFDO0FBQUE7QUFBQSxNQUNKO0FBQ0EsY0FBUSx1QkFBdUI7QUFJL0IsY0FBUSxpQkFBaUI7QUFDekIsVUFBTSxtQkFBbUIsTUFBTSxJQUFJLHFCQUFxQixXQUFXLGNBQWM7QUFDakYsY0FBUSxtQkFBbUI7QUFDM0IsY0FBUSx1QkFBdUI7QUFDL0IsY0FBUSxzQkFBc0IsVUFBVSxRQUFRO0FBQUE7QUFBQTs7O0FDL0VoRDtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxxQ0FBcUM7QUFDN0MsVUFBTSxlQUFlO0FBQ3JCLFVBQU0scUNBQXFDLENBQUMsRUFBRSxNQUFNLEtBQUssTUFBTSxDQUFPLFlBQVk7QUFDOUUsY0FBTSxNQUFNLElBQUksSUFBSSxXQUFXLFFBQVEsNkNBQTZDO0FBQ3BGLFlBQUksYUFBYSxJQUFJLFdBQVcsS0FBSyxVQUFVLG1CQUFLLFFBQVMsQ0FBQztBQUM5RCxZQUFJLGFBQWEsSUFBSSxrQkFBa0IsV0FBVztBQUNsRCxjQUFNLFVBQVUsR0FBRyxhQUFhLGtCQUFrQjtBQUNsRCxjQUFNLFdBQVcsT0FBTyxZQUFZLE1BQU0sTUFBTSxJQUFJLFdBQVcsSUFBSSxRQUFRLE9BQU8sQ0FBQyxHQUFHLE1BQU0sT0FBTztBQUNuRyxlQUFPLFNBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFDdEIsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTO0FBQUEsTUFDdEM7QUFDQSxjQUFRLHFDQUFxQztBQUFBO0FBQUE7OztBQ2Q3QztBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSx3QkFBd0IsUUFBUSxxQkFBcUI7QUFDN0QsVUFBTSw0QkFBNEI7QUFBQSxRQUM5QixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDVjtBQUVBLGNBQVEscUJBQXFCO0FBQzdCLFVBQU0sd0JBQXdCLENBQUMsYUFBYTtBQUN4QyxnQkFBUSxxQkFBcUIsa0NBQ3RCLDRCQUNBO0FBQUEsTUFFWDtBQUNBLGNBQVEsd0JBQXdCO0FBQUE7QUFBQTs7O0FDZmhDO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLHVCQUF1QjtBQUMvQixVQUFNLHVDQUF1QztBQUM3QyxVQUFNLGdDQUFnQztBQUN0QyxVQUFNLHVCQUF1QjtBQUM3QixVQUFNLGNBQWM7QUFDcEIsVUFBTUMsd0JBQXVCLENBQU8sc0JBQXNCO0FBQ3RELFlBQUksT0FBTyxHQUFHLDhCQUE4Qiw2QkFBNkIsR0FBRztBQUN4RSxnQkFBTSxnQ0FBZ0MsR0FBRyxxQ0FBcUMsb0NBQW9DLHFCQUFxQixrQkFBa0I7QUFDekosaUJBQU8sNkJBQTZCLGlCQUFpQjtBQUFBLFFBQ3pELE9BQ0s7QUFDRCxrQkFBUSxHQUFHLFlBQVksaUJBQWlCLEVBQUUsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQUEsUUFDekY7QUFBQSxNQUNKO0FBQ0EsY0FBUSx1QkFBdUJBO0FBQUE7QUFBQTs7O0FDaEIvQixNQUFBQyxxQkFBQTtBQUFBO0FBQUE7QUFFQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBTSxjQUFjO0FBQ3BCLGNBQVEsVUFBVSxZQUFZO0FBQUE7QUFBQTs7O0FDSjlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLE1BQUFDLGdCQUF5RDtBQUN6RCxNQUFBQyxjQU9POzs7QUNSUCxNQUFBQyxnQkFBNEM7QUFDNUMsTUFBQUMsY0FZTzs7O0FDQ0EsTUFBTSxlQUE2QixDQUFDLFVBQVUsWUFBWSxhQUFhLFFBQVE7QUFFL0UsTUFBTSxxQkFBaUQ7QUFBQSxJQUM1RCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjs7O0FDckJBLHlCQUFpQztBQUlqQyxNQUFNLG9CQUFvQjtBQUUxQixNQUFNLGNBQWMsb0JBQ2hCLDBCQUNBO0FBRUcsTUFBTSxXQUFOLGNBQXVCLE1BQU07QUFBQSxJQUNsQyxZQUNFLFNBQ08sUUFDUDtBQUNBLFlBQU0sT0FBTztBQUZOO0FBR1AsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFNQSxXQUFzQixhQUNwQixNQUNBLFNBQ0EsTUFDWTtBQUFBO0FBNUJkO0FBNkJFLFlBQU0sWUFBWSxVQUFNLGlCQUFBQyxTQUFxQjtBQUU3QyxZQUFNLE9BQU8sS0FBSyxVQUFVLGlDQUN2QixPQUR1QjtBQUFBLFFBRTFCLFVBQVMsYUFBUSxnQkFBUixtQkFBcUI7QUFBQSxRQUM5QixhQUFZLGFBQVEsZ0JBQVIsbUJBQXFCLFFBQVE7QUFBQSxNQUMzQyxFQUFDO0FBRUQsWUFBTSxXQUFXLE1BQU0sTUFBTSxHQUFHLGNBQWMsUUFBUTtBQUFBLFFBQ3BELFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLG9CQUFvQjtBQUFBLFFBQ3RCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsY0FBTSxRQUFRLE1BQU0sU0FBUyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQUEsVUFDL0MsU0FBUyxTQUFTO0FBQUEsUUFDcEIsRUFBRTtBQUNGLGNBQU0sSUFBSTtBQUFBLFVBQ1IsTUFBTSxXQUFXLGNBQWMsU0FBUztBQUFBLFVBQ3hDLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUNBLGFBQU8sU0FBUyxLQUFLO0FBQUEsSUFDdkI7QUFBQTtBQUtBLFdBQXNCLGFBQ3BCLE1BQ0EsU0FDQSxNQUNZO0FBQUE7QUFoRWQ7QUFpRUUsWUFBTSxZQUFZLFVBQU0saUJBQUFBLFNBQXFCO0FBRTdDLFlBQU0sT0FBTyxLQUFLLFVBQVUsaUNBQ3ZCLE9BRHVCO0FBQUEsUUFFMUIsVUFBUyxhQUFRLGdCQUFSLG1CQUFxQjtBQUFBLFFBQzlCLGFBQVksYUFBUSxnQkFBUixtQkFBcUIsUUFBUTtBQUFBLE1BQzNDLEVBQUM7QUFFRCxZQUFNLFdBQVcsTUFBTSxNQUFNLEdBQUcsY0FBYyxRQUFRO0FBQUEsUUFDcEQsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1AsZ0JBQWdCO0FBQUEsVUFDaEIsb0JBQW9CO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsVUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixjQUFNLFFBQVEsTUFBTSxTQUFTLEtBQUssRUFBRSxNQUFNLE9BQU87QUFBQSxVQUMvQyxTQUFTLFNBQVM7QUFBQSxRQUNwQixFQUFFO0FBQ0YsY0FBTSxJQUFJO0FBQUEsVUFDUixNQUFNLFdBQVcsTUFBTSxTQUFTLGNBQWMsU0FBUztBQUFBLFVBQ3ZELFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUNBLGFBQU8sU0FBUyxLQUFLO0FBQUEsSUFDdkI7QUFBQTtBQU9BLFdBQXNCLGNBQ3BCLE1BQ0EsU0FDWTtBQUFBO0FBckdkO0FBc0dFLFlBQU0sWUFBWSxVQUFNLGlCQUFBQSxTQUFxQjtBQUU3QyxZQUFNLE9BQU8sS0FBSyxVQUFVO0FBQUEsUUFDMUIsVUFBUyxhQUFRLGdCQUFSLG1CQUFxQjtBQUFBLFFBQzlCLGFBQVksYUFBUSxnQkFBUixtQkFBcUIsUUFBUTtBQUFBLE1BQzNDLENBQUM7QUFFRCxZQUFNLFdBQVcsTUFBTSxNQUFNLEdBQUcsY0FBYyxRQUFRO0FBQUEsUUFDcEQsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1AsZ0JBQWdCO0FBQUEsVUFDaEIsb0JBQW9CO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsVUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixjQUFNLFFBQVEsTUFBTSxTQUFTLEtBQUssRUFBRSxNQUFNLE9BQU87QUFBQSxVQUMvQyxTQUFTLFNBQVM7QUFBQSxRQUNwQixFQUFFO0FBQ0YsY0FBTSxJQUFJO0FBQUEsVUFDUixNQUFNLFdBQVcsTUFBTSxTQUFTLGNBQWMsU0FBUztBQUFBLFVBQ3ZELFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUNBLGFBQU8sU0FBUyxLQUFLO0FBQUEsSUFDdkI7QUFBQTs7O0FDN0hBLE1BQU0scUJBQTZDO0FBQUEsSUFDakQsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsRUFDckI7QUFFTyxXQUFTLG1CQUFtQixTQUFzQixZQUFtQztBQVo1RjtBQWFFLFlBQU8sd0JBQW1CLEdBQUcsV0FBVyxrQkFBakMsWUFBa0Q7QUFBQSxFQUMzRDtBQUVBLE1BQU0sb0JBQXFDLENBQUMsT0FBTyxRQUFRLGtCQUFrQixpQkFBaUI7QUFFdkYsV0FBUyxXQUFXLFFBQXlCO0FBQ2xELFdBQU8sa0JBQWtCLFNBQVMsTUFBdUI7QUFBQSxFQUMzRDtBQUVPLFdBQVMsZUFBZSxRQUc3QjtBQUNBLFlBQVEsUUFBUTtBQUFBLE1BQ2QsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUNILGVBQU8sRUFBRSxPQUFPLGtCQUFrQixNQUFNLFNBQVM7QUFBQSxNQUNuRCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQ0gsZUFBTyxFQUFFLE9BQU8sZ0JBQWdCLE1BQU0sT0FBTztBQUFBLE1BQy9DLEtBQUs7QUFDSCxlQUFPLEVBQUUsT0FBTyxPQUFPLE1BQU0sV0FBVztBQUFBLE1BQzFDLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFDSCxlQUFPLEVBQUUsT0FBTyxRQUFRLE1BQU0sV0FBVztBQUFBLE1BQzNDLEtBQUs7QUFDSCxlQUFPLEVBQUUsT0FBTyxZQUFZLE1BQU0sT0FBTztBQUFBLE1BQzNDO0FBQ0UsZUFBTyxFQUFFLE9BQU8sUUFBUSxNQUFNLE9BQU87QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFFTyxXQUFTLGlCQUFpQixPQUF1QjtBQUN0RCxVQUFNLE1BQU0sSUFBSSxLQUFLO0FBQ3JCLFVBQU0sTUFBTSxJQUFJLEtBQUssS0FBSztBQUMxQixXQUFPLEtBQUssTUFBTSxJQUFJLFFBQVEsSUFBSSxJQUFJLFFBQVEsTUFBTSxNQUFPLEtBQUssS0FBSyxHQUFHO0FBQUEsRUFDMUU7QUFRTyxXQUFTLGlCQUFpQixPQUE4QjtBQUM3RCxVQUFNLFVBQVUsSUFBSSxLQUFLLEtBQUssRUFBRSxRQUFRLElBQUksS0FBSyxJQUFJO0FBQ3JELFFBQUksV0FBVztBQUFHLGFBQU8sRUFBRSxNQUFNLEdBQUcsT0FBTyxHQUFHLFdBQVcsS0FBSztBQUM5RCxVQUFNLGFBQWEsS0FBSyxNQUFNLFdBQVcsTUFBTyxLQUFLLEdBQUc7QUFDeEQsV0FBTztBQUFBLE1BQ0wsTUFBTSxLQUFLLE1BQU0sYUFBYSxFQUFFO0FBQUEsTUFDaEMsT0FBTyxhQUFhO0FBQUEsTUFDcEIsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBSU8sV0FBUyxlQUFlLE1BQTJCO0FBQ3hELFFBQUksT0FBTztBQUFHLGFBQU87QUFDckIsUUFBSSxRQUFRO0FBQUksYUFBTztBQUN2QixXQUFPO0FBQUEsRUFDVDtBQUVPLFdBQVMsZ0JBQ2QsT0FDQSxRQUM2QztBQUM3QyxRQUFJLFdBQVcsTUFBTTtBQUFHLGFBQU87QUFFL0IsVUFBTSxPQUFPLGlCQUFpQixLQUFLO0FBQ25DLFVBQU0sT0FBTyxlQUFlLEtBQUssSUFBSTtBQUVyQyxRQUFJLEtBQUs7QUFBVyxhQUFPLEVBQUUsT0FBTyxXQUFXLE1BQU0sU0FBUztBQUM5RCxRQUFJLEtBQUssT0FBTztBQUFHLGFBQU8sRUFBRSxPQUFPLEdBQUcsS0FBSyxTQUFTLEtBQUssZUFBZSxNQUFNLEtBQUs7QUFDbkYsV0FBTyxFQUFFLE9BQU8sR0FBRyxLQUFLLGNBQWMsTUFBTSxLQUFLO0FBQUEsRUFDbkQ7OztBQ3RGQSxrQkFBb0M7QUFnQnhCO0FBVFosTUFBTSxjQUFjLENBQUMsRUFBRSxTQUFTLFFBQVEsTUFBd0I7QUFDOUQsV0FDRSw0Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsU0FBUztBQUFBLE1BQzVCLHNEQUFDO0FBQUEsUUFDQyxNQUFLO0FBQUEsUUFDTCxPQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixTQUNFLFVBQ0UsNENBQUM7QUFBQSxVQUFPLFNBQVM7QUFBQSxVQUFTO0FBQUEsU0FBSyxJQUM3QjtBQUFBLE9BRVI7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sc0JBQVE7OztBQzFCZixxQkFBb0M7QUFDcEMsTUFBQUMsYUFBbUM7QUE2Qi9CLE1BQUFDLHNCQUFBO0FBckJKLE1BQU0sZ0JBQWdCLENBQUMsRUFBRSxPQUFPLE9BQU8sTUFBMEI7QUFDL0QsVUFBTSxDQUFDLEVBQUUsT0FBTyxRQUFJLHVCQUFTLENBQUM7QUFFOUIsZ0NBQVUsTUFBTTtBQUNkLFlBQU0sS0FBSyxZQUFZLE1BQU0sUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBTTtBQUMxRCxhQUFPLE1BQU0sY0FBYyxFQUFFO0FBQUEsSUFDL0IsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUVWLFFBQUksQ0FBQyxTQUFTLFdBQVcsTUFBTTtBQUFHLGFBQU87QUFFekMsVUFBTSxPQUFPLGlCQUFpQixLQUFLO0FBQ25DLFVBQU0sT0FBTyxlQUFlLEtBQUssSUFBSTtBQUNyQyxVQUFNLFdBQVcsS0FBSyxPQUFPLEtBQUssQ0FBQyxLQUFLO0FBRXhDLFVBQU0sUUFBUSxLQUFLLFlBQ2Ysb0JBQ0EsS0FBSyxTQUFTLElBQ1osR0FBRyxLQUFLLHFCQUNSLEdBQUcsS0FBSyxTQUFTLEtBQUs7QUFFNUIsV0FDRSw4Q0FBQztBQUFBLE1BQ0MsS0FBSztBQUFBLFFBQ0gsT0FBTztBQUFBLFFBQ1AsS0FBSztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osUUFBUTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsUUFDakIsU0FBUztBQUFBLFFBQ1QsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFFQTtBQUFBLHFEQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksWUFBWSxPQUFPLFdBQVcsYUFBYSxZQUFZO0FBQUEsVUFDaEcscUJBQVcsZ0JBQWdCO0FBQUEsU0FDOUI7QUFBQSxRQUNBLDZDQUFDO0FBQUEsVUFBTSxNQUFNLEtBQUssWUFBWSxXQUFXO0FBQUEsVUFBTztBQUFBLFNBQU07QUFBQTtBQUFBLEtBQ3hEO0FBQUEsRUFFSjtBQUVBLE1BQU8sd0JBQVE7OztBQ2pEZixNQUFBQyxhQUEyRDtBQWdCdkQsTUFBQUMsc0JBQUE7QUFGSixXQUFTLFFBQVEsRUFBRSxPQUFPLE1BQU0sR0FBaUI7QUFDL0MsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsWUFBWSxpQkFBaUIsUUFBUSxTQUFTO0FBQUEsTUFDbEY7QUFBQSxxREFBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxVQUFJO0FBQUEsU0FBTTtBQUFBLFFBQzdELDZDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxVQUFVO0FBQUEsVUFBSTtBQUFBLFNBQU07QUFBQTtBQUFBLEtBQzNDO0FBQUEsRUFFSjtBQUVBLFdBQVMsYUFBYSxRQUFnQixVQUEwQjtBQUM5RCxXQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxNQUNwQyxPQUFPO0FBQUEsTUFDUCxVQUFVLFNBQVMsWUFBWTtBQUFBLElBQ2pDLENBQUMsRUFBRSxPQUFPLFNBQVMsR0FBRztBQUFBLEVBQ3hCO0FBRUEsV0FBUyxXQUFXLFdBQTJCO0FBQzdDLFdBQU8sSUFBSSxLQUFLLFlBQVksR0FBSSxFQUFFLG1CQUFtQixTQUFTO0FBQUEsTUFDNUQsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFNLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxRQUFRLE1BQTRCO0FBQ3RFLFVBQU0sY0FBYyxlQUFlLFFBQVEsTUFBTTtBQUVqRCxXQUNFLDhDQUFDO0FBQUEsTUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssVUFBVSxpQkFBaUIsYUFBYSxTQUFTLFVBQVUsY0FBYyxTQUFTO0FBQUEsTUFFN0c7QUFBQSxzREFBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsWUFBWSxpQkFBaUIsUUFBUSxTQUFTO0FBQUEsVUFDbEY7QUFBQSx5REFBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLE9BQU87QUFBQSxjQUNoRCx1QkFBYSxRQUFRLFFBQVEsUUFBUSxRQUFRO0FBQUEsYUFDaEQ7QUFBQSxZQUNBLDZDQUFDO0FBQUEsY0FBTSxNQUFNLFlBQVk7QUFBQSxjQUFPLHNCQUFZO0FBQUEsYUFBTTtBQUFBO0FBQUEsU0FDcEQ7QUFBQSxTQUdFLFFBQVEsaUJBQWlCLFFBQVEsbUJBQ2pDLDhDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ25DO0FBQUEsb0JBQVEsaUJBQ1AsNkNBQUM7QUFBQSxjQUFRLE9BQU07QUFBQSxjQUFXLE9BQU8sUUFBUTtBQUFBLGFBQWU7QUFBQSxZQUV6RCxRQUFRLGtCQUNQLDZDQUFDO0FBQUEsY0FBUSxPQUFNO0FBQUEsY0FBUSxPQUFPLFFBQVE7QUFBQSxhQUFnQjtBQUFBO0FBQUEsU0FFMUQ7QUFBQSxRQUdGLDZDQUFDLHNCQUFRO0FBQUEsUUFHUixVQUNDLDZDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsU0FBUyxTQUFTLFFBQVEsU0FBUztBQUFBLFVBQzdDLHVEQUFDLHNCQUFRO0FBQUEsU0FDWCxJQUVBLDhDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ25DO0FBQUEsb0JBQVEsY0FBYyxRQUFRLGNBQzdCLDZDQUFDO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixPQUFPLEdBQUcsUUFBUSxXQUFXLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxRQUFRLFdBQVcsTUFBTSxDQUFDLGVBQWUsUUFBUTtBQUFBLGFBQzFHO0FBQUEsWUFFRCxRQUFRLG9CQUNQLDZDQUFDO0FBQUEsY0FBUSxPQUFNO0FBQUEsY0FBbUIsT0FBTyxXQUFXLFFBQVEsZ0JBQWdCO0FBQUEsYUFBRztBQUFBLFlBRWhGLFFBQVEsc0JBQ1AsNkNBQUM7QUFBQSxjQUFRLE9BQU07QUFBQSxjQUFjLE9BQU8sUUFBUTtBQUFBLGFBQW9CO0FBQUEsWUFFakUsUUFBUSxtQkFDUCw2Q0FBQztBQUFBLGNBQVEsT0FBTTtBQUFBLGNBQWtCLE9BQU8sUUFBUTtBQUFBLGFBQWlCO0FBQUEsWUFFbEUsUUFBUSxlQUNQLDZDQUFDO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixPQUFPLDZDQUFDO0FBQUEsZ0JBQUssTUFBTSxRQUFRO0FBQUEsZ0JBQWEsUUFBTztBQUFBLGdCQUFTO0FBQUEsZUFBWTtBQUFBLGFBQ3RFO0FBQUEsWUFFRCxRQUFRLFlBQVksT0FBTyxLQUFLLFFBQVEsUUFBUSxFQUFFLFNBQVMsS0FDMUQ7QUFBQSxjQUNHLGlCQUFPLFFBQVEsUUFBUSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQzlDLDZDQUFDO0FBQUEsZ0JBQWtCLE9BQU87QUFBQSxnQkFBSyxPQUFPO0FBQUEsaUJBQXhCLEdBQTZCLENBQzVDO0FBQUEsYUFDSDtBQUFBO0FBQUEsU0FFSjtBQUFBLFFBSUYsNkNBQUMsc0JBQVE7QUFBQSxRQUNULDhDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssVUFBVTtBQUFBLFVBQ3JDO0FBQUEsMERBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxXQUFXO0FBQUEsY0FBRztBQUFBO0FBQUEsZ0JBQVUsUUFBUTtBQUFBO0FBQUEsYUFBRztBQUFBLFlBQ3pFLFFBQVEsYUFDUCw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFdBQVc7QUFBQSxjQUFHO0FBQUE7QUFBQSxnQkFBUyxRQUFRO0FBQUE7QUFBQSxhQUFVO0FBQUE7QUFBQSxTQUVwRjtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLDBCQUFROzs7QUNuSGYsTUFBQUMsYUFBbUM7QUFXL0IsTUFBQUMsc0JBQUE7QUFGSixNQUFNLGNBQWMsQ0FBQyxFQUFFLFVBQVUsU0FBUyxhQUFhLGNBQWMsTUFBd0I7QUFDM0YsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsaUJBQWlCLGFBQWEsU0FBUyxVQUFVLGNBQWMsU0FBUztBQUFBLE1BQzVHO0FBQUEscURBQUM7QUFBQSxVQUFNLE1BQUs7QUFBQSxVQUFPO0FBQUEsU0FBUTtBQUFBLFFBQzNCLDZDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksV0FBVztBQUFBLFVBQ3BEO0FBQUEsU0FDSDtBQUFBLFFBQ0EsNkNBQUM7QUFBQSxVQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxZQUFZO0FBQUEsVUFDN0MseUJBQWUsa0JBQWtCLFNBQzlCLFlBQVksb0JBQW9CLGtCQUFrQixJQUFJLEtBQUssd0NBQzNEO0FBQUEsU0FDTjtBQUFBO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFPLHNCQUFROzs7QUN6QmYsTUFBQUMsYUFBNEI7QUFzQ3RCLE1BQUFDLHNCQUFBO0FBOUJOLFdBQVMsY0FBYyxVQUFrQztBQUN2RCxVQUFNLFVBQW9CLENBQUM7QUFFM0IsVUFBTSxpQkFBaUIsU0FBUyxtQkFDN0IsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLGVBQWUsS0FBSyxZQUFZLEtBQUssRUFDeEUsTUFBTSxHQUFHLENBQUM7QUFDYixlQUFXLFFBQVEsZ0JBQWdCO0FBQ2pDLGNBQVEsS0FBSyxxQkFBcUIsS0FBSyxLQUFLLFlBQVksR0FBRztBQUFBLElBQzdEO0FBRUEsVUFBTSxjQUFjLFNBQVMsZ0JBQWdCLE1BQU0sR0FBRyxDQUFDO0FBQ3ZELGVBQVcsV0FBVyxhQUFhO0FBQ2pDLFlBQU0sV0FBVyxRQUFRLFFBQVEsV0FBVyxNQUFNLElBQzlDLG9CQUFvQixRQUFRLFFBQVEsTUFBTSxDQUFDLEVBQUUsWUFBWSxNQUN6RCxRQUFRLFFBQVEsV0FBVyxXQUFXLElBQ3BDLDBCQUEwQixRQUFRLFFBQVEsTUFBTSxDQUFDLEVBQUUsWUFBWSxNQUMvRCxVQUFVLFFBQVEsUUFBUSxZQUFZO0FBQzVDLGNBQVEsS0FBSyxRQUFRO0FBQUEsSUFDdkI7QUFFQSxXQUFPLFFBQVEsTUFBTSxHQUFHLENBQUM7QUFBQSxFQUMzQjtBQUVBLE1BQU0sZUFBZSxDQUFDLEVBQUUsVUFBVSxZQUFZLE1BQXlCO0FBQ3JFLFVBQU0sUUFBUSxjQUNWLFNBQVMsbUJBQW1CLGdCQUM1QixjQUFjLFFBQVE7QUFFMUIsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxNQUNwQztBQUFBLHFEQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxjQUFjLFlBQVksV0FBVztBQUFBLFVBQ3ZELHdCQUFjLDhCQUE4QjtBQUFBLFNBQy9DO0FBQUEsUUFDQSw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNuQyxnQkFBTSxJQUFJLENBQUMsTUFBTSxVQUNoQiw4Q0FBQztBQUFBLFlBRUMsS0FBSztBQUFBLGNBQ0gsT0FBTztBQUFBLGNBQ1AsS0FBSztBQUFBLGNBQ0wsUUFBUTtBQUFBLGNBQ1IsaUJBQWlCO0FBQUEsY0FDakIsU0FBUztBQUFBLGNBQ1QsY0FBYztBQUFBLFlBQ2hCO0FBQUEsWUFFQTtBQUFBLDJEQUFDO0FBQUEsZ0JBQ0MsS0FBSztBQUFBLGtCQUNILFFBQVE7QUFBQSxrQkFDUixRQUFRO0FBQUEsa0JBQ1IsT0FBTztBQUFBLGdCQUNUO0FBQUEsZ0JBRUEsd0RBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksUUFBUSxPQUFPLFlBQVk7QUFBQSxrQkFDcEU7QUFBQSw0QkFBUTtBQUFBLG9CQUFFO0FBQUE7QUFBQSxpQkFDYjtBQUFBLGVBQ0Y7QUFBQSxjQUNBLDZDQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sT0FBTztBQUFBLGdCQUFJO0FBQUEsZUFBSztBQUFBO0FBQUEsYUFyQmhDLEtBc0JQLENBQ0Q7QUFBQSxTQUNIO0FBQUEsUUFDQSw2Q0FBQztBQUFBLFVBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxVQUFHO0FBQUEsU0FFdEQ7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyx1QkFBUTs7O0FDNUVmLE1BQUFDLGFBQXNEO0FBWTVDLE1BQUFDLHNCQUFBO0FBTFYsTUFBTSxZQUFZLENBQUMsRUFBRSxlQUFlLGdCQUFnQixNQUFzQjtBQUN4RSxXQUNFLDZDQUFDO0FBQUEsTUFDQyx1REFBQztBQUFBLFFBQWMsT0FBTTtBQUFBLFFBQ25CLHdEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ3BDO0FBQUEsMERBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsY0FDbkM7QUFBQSw2REFBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsWUFBWSxXQUFXO0FBQUEsa0JBQUc7QUFBQSxpQkFFdkQ7QUFBQSxnQkFDQSw2Q0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxZQUFZO0FBQUEsa0JBQzdDO0FBQUEsaUJBQ0g7QUFBQTtBQUFBLGFBQ0Y7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLGNBQ25DO0FBQUEsNkRBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLFlBQVksV0FBVztBQUFBLGtCQUFHO0FBQUEsaUJBRXZEO0FBQUEsZ0JBQ0EsNkNBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sWUFBWTtBQUFBLGtCQUM3QztBQUFBLGlCQUNIO0FBQUE7QUFBQSxhQUNGO0FBQUE7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyxvQkFBUTs7O0FDbENmLE1BQUFDLGdCQUF5RDtBQUN6RCxNQUFBQyxjQUFtRDs7O0FDRG5ELE1BQUFDLGFBQTRCO0FBc0JwQixNQUFBQyxzQkFBQTtBQWJSLFdBQVMsaUJBQWlCLFdBQW1CLE9BQXFDO0FBQ2hGLFFBQUksVUFBVSxLQUFLLGNBQWM7QUFBRyxhQUFPO0FBQzNDLFFBQUksYUFBYTtBQUFPLGFBQU87QUFDL0IsVUFBTSxXQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTyxZQUFZLFFBQVMsRUFBRSxDQUFDO0FBQ2pFLFdBQU8sR0FBRztBQUFBLEVBQ1o7QUFFQSxNQUFNLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxNQUFNLE1BQThCO0FBQzFFLFVBQU0sZ0JBQWdCLGlCQUFpQixXQUFXLEtBQUs7QUFFdkQsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxNQUNuQztBQUFBLHNEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLFlBQVksZ0JBQWdCO0FBQUEsVUFDbEQ7QUFBQSx5REFBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sY0FBYyxZQUFZLFdBQVc7QUFBQSxjQUFHO0FBQUEsYUFFN0Q7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGNBQ2hEO0FBQUE7QUFBQSxnQkFBVTtBQUFBLGdCQUFLO0FBQUEsZ0JBQU07QUFBQTtBQUFBLGFBQ3hCO0FBQUE7QUFBQSxTQUNGO0FBQUEsUUFDQSw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLGlCQUFpQixhQUFhLGNBQWMsV0FBVyxVQUFVLFNBQVM7QUFBQSxVQUNuRiwwQkFDQyw2Q0FBQztBQUFBLFlBQ0MsS0FBSztBQUFBLGNBQ0gsaUJBQWlCO0FBQUEsY0FDakIsY0FBYztBQUFBLGNBQ2QsT0FBTztBQUFBLGNBQ1AsU0FBUztBQUFBLFlBQ1g7QUFBQSxZQUVBLHVEQUFDO0FBQUEsY0FBUTtBQUFBLGFBQUk7QUFBQSxXQUNmLElBRUEsNkNBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxTQUFTLFVBQVU7QUFBQSxZQUM3Qix1REFBQztBQUFBLGNBQVE7QUFBQSxhQUFJO0FBQUEsV0FDZjtBQUFBLFNBRUo7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyw0QkFBUTs7O0FDbkRmLE1BQUFDLGFBQW1FOzs7QUNBbkUsTUFBQUMsZ0JBQXlCO0FBQ3pCLE1BQUFDLGFBQTJFO0FBOEZuRSxNQUFBQyxzQkFBQTtBQWpGUixXQUFTLGVBQWUsT0FBdUI7QUFDN0MsUUFBSSxRQUFRO0FBQU0sYUFBTyxHQUFHO0FBQzVCLFFBQUksUUFBUSxPQUFPO0FBQU0sYUFBTyxJQUFJLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDM0QsV0FBTyxJQUFJLFNBQVMsT0FBTyxPQUFPLFFBQVEsQ0FBQztBQUFBLEVBQzdDO0FBRUEsV0FBUyxhQUFhLFVBQTBCO0FBcEJoRDtBQXFCRSxVQUFNLE1BQThCO0FBQUEsTUFDbEMsbUJBQW1CO0FBQUEsTUFDbkIsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLElBQ2hCO0FBQ0EsWUFBTyxTQUFJLGNBQUosWUFBaUI7QUFBQSxFQUMxQjtBQUVBLE1BQU0sb0JBQW9CLENBQUM7QUFBQSxJQUN6QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLE1BQThCO0FBQzVCLFVBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBd0IsSUFBSTtBQUN0RCxVQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsS0FBSztBQUNwRCxVQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksd0JBQVMsS0FBSztBQUUxQyxVQUFNLHVCQUF1QixDQUFPLGVBSzlCO0FBaERSO0FBaURJLGVBQVMsSUFBSTtBQUNiLGdCQUFVLElBQUk7QUFFZCxVQUFJO0FBQ0YsY0FBTSxTQUFTLE1BQU07QUFBQSxVQUNuQixpQkFBaUI7QUFBQSxVQUNqQjtBQUFBLFVBQ0E7QUFBQSxZQUNFLG9CQUFvQjtBQUFBLFlBQ3BCLGdCQUFnQixXQUFXO0FBQUEsWUFDM0IsWUFBVyxnQkFBVyxhQUFYLFlBQXVCO0FBQUEsWUFDbEMsV0FBVyxXQUFXO0FBQUEsWUFDdEIsWUFBVyxnQkFBVyxTQUFYLFlBQW1CO0FBQUEsVUFDaEM7QUFBQSxRQUNGO0FBQ0EscUJBQWEsT0FBTyxJQUFJO0FBQ3hCLHVCQUFlLEtBQUs7QUFBQSxNQUN0QixTQUFTLEtBQVA7QUFDQSxpQkFBUyxrR0FBa0c7QUFBQSxNQUM3RyxVQUFFO0FBQ0Esa0JBQVUsS0FBSztBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUVBLFVBQU0sb0JBQW9CLE1BQU07QUFDOUIsZUFBUyxtR0FBbUc7QUFBQSxJQUM5RztBQUVBLFVBQU0sZUFBZSxNQUFZO0FBQy9CLFVBQUksQ0FBQztBQUFjO0FBQ25CLGVBQVMsSUFBSTtBQUViLFVBQUk7QUFDRixjQUFNO0FBQUEsVUFDSixpQkFBaUIsNEJBQTRCLGFBQWE7QUFBQSxVQUMxRDtBQUFBLFFBQ0Y7QUFDQSxxQkFBYSxJQUFJO0FBQUEsTUFDbkIsU0FBUyxLQUFQO0FBQ0EsaUJBQVMsbUNBQW1DO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBRUEsV0FDRSw4Q0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxNQUNuQztBQUFBLGlCQUNDLDZDQUFDO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixXQUFXLE1BQU0sU0FBUyxJQUFJO0FBQUEsU0FDaEM7QUFBQSxRQUdELGdCQUFnQixDQUFDLGNBQ2hCLDhDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ3BDO0FBQUEsMERBQUM7QUFBQSxjQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLFFBQVEsVUFBVSxNQUFNLE9BQU87QUFBQSxjQUNwRTtBQUFBLDZEQUFDO0FBQUEsa0JBQUssTUFBSztBQUFBLGtCQUFRLE1BQUs7QUFBQSxpQkFBUztBQUFBLGdCQUNqQyw2Q0FBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsa0JBQ3BELHVCQUFhO0FBQUEsaUJBQ2hCO0FBQUEsZ0JBQ0EsNkNBQUM7QUFBQSxrQkFBTSxNQUFLO0FBQUEsa0JBQVEsdUJBQWEsYUFBYSxTQUFTO0FBQUEsaUJBQUU7QUFBQSxnQkFDekQsNkNBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUNoRCx5QkFBZSxhQUFhLFNBQVM7QUFBQSxpQkFDeEM7QUFBQTtBQUFBLGFBQ0Y7QUFBQSxZQUNBLDhDQUFDO0FBQUEsY0FBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLGNBQ25DO0FBQUEsNkRBQUM7QUFBQSxrQkFBSyxTQUFTLE1BQU0sZUFBZSxJQUFJO0FBQUEsa0JBQ3RDLHVEQUFDO0FBQUEsb0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLE9BQU87QUFBQSxvQkFBRztBQUFBLG1CQUFPO0FBQUEsaUJBQzFEO0FBQUEsZ0JBQ0EsNkNBQUM7QUFBQSxrQkFBSyxTQUFTO0FBQUEsa0JBQ2IsdURBQUM7QUFBQSxvQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sV0FBVztBQUFBLG9CQUFHO0FBQUEsbUJBQU07QUFBQSxpQkFDN0Q7QUFBQTtBQUFBLGFBQ0Y7QUFBQTtBQUFBLFNBQ0YsSUFFQSw4Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNuQztBQUFBLDJCQUNDLDZDQUFDO0FBQUEsY0FBSyxTQUFTLE1BQU0sZUFBZSxLQUFLO0FBQUEsY0FDdkMsdURBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGdCQUFHO0FBQUEsZUFBYztBQUFBLGFBQ3RFO0FBQUEsWUFFRiw2Q0FBQztBQUFBLGNBQ0MsT0FBTyxTQUFTLGNBQWM7QUFBQSxjQUM5QixTQUFRO0FBQUEsY0FDUixZQUFZO0FBQUEsY0FDWixTQUFTO0FBQUEsYUFDWDtBQUFBLFlBQ0EsNkNBQUM7QUFBQSxjQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsY0FBRztBQUFBLGFBRXREO0FBQUE7QUFBQSxTQUNGO0FBQUE7QUFBQSxLQUVKO0FBQUEsRUFFSjtBQUVBLE1BQU8sNEJBQVE7OztBRHpIRixNQUFBQyxzQkFBQTtBQUhiLFdBQVMsaUJBQWlCLFVBQTZDO0FBQ3JFLFlBQVEsVUFBVTtBQUFBLE1BQ2hCLEtBQUs7QUFDSCxlQUFPLDZDQUFDO0FBQUEsVUFBTSxNQUFLO0FBQUEsVUFBVztBQUFBLFNBQVE7QUFBQSxNQUN4QyxLQUFLO0FBQ0gsZUFBTyw2Q0FBQztBQUFBLFVBQU0sTUFBSztBQUFBLFVBQVU7QUFBQSxTQUFPO0FBQUEsTUFDdEMsS0FBSztBQUNILGVBQU8sNkNBQUM7QUFBQSxVQUFNLE1BQUs7QUFBQSxVQUFVO0FBQUEsU0FBYTtBQUFBLElBQzlDO0FBQUEsRUFDRjtBQVFBLE1BQU0sZ0JBQWdCLENBQUMsRUFBRSxPQUFPLFVBQVUsUUFBUSxNQUNoRCw2Q0FBQztBQUFBLElBQUs7QUFBQSxJQUNKLHdEQUFDO0FBQUEsTUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssV0FBVyxRQUFRLFNBQVM7QUFBQSxNQUN2RDtBQUFBLHFEQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sT0FBTztBQUFBLFVBQzNDO0FBQUEsU0FDSDtBQUFBLFFBQ0EsNkNBQUM7QUFBQSxVQUFLLE1BQU0sV0FBVyxjQUFjO0FBQUEsVUFBZSxNQUFLO0FBQUEsU0FBUztBQUFBO0FBQUEsS0FDcEU7QUFBQSxHQUNGO0FBR0YsTUFBTSxnQkFBZ0IsQ0FBQztBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLE1BQTBCO0FBQ3hCLFVBQU0sY0FBYyxpQkFBaUIsSUFBSSxLQUFLO0FBQzlDLFVBQU0sZ0JBQWdCLGlCQUFpQixJQUFJLE9BQU87QUFDbEQsVUFBTSxnQkFBZ0IsaUJBQWlCLElBQUksT0FBTztBQUNsRCxVQUFNLGVBQWUsaUJBQWlCLElBQUksTUFBTTtBQUVoRCxXQUNFLDhDQUFDO0FBQUEsTUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxTQUFTLFNBQVMsY0FBYyxVQUFVLGlCQUFpQixZQUFZO0FBQUEsTUFDM0c7QUFBQSxzREFBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsUUFBUSxTQUFTO0FBQUEsVUFDckQ7QUFBQSx5REFBQztBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ047QUFBQSxjQUNBLFVBQVU7QUFBQSxjQUNWLGNBQVksS0FBSztBQUFBLGFBQ25CO0FBQUEsWUFDQSw4Q0FBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFdBQVcsT0FBTyxPQUFPO0FBQUEsY0FDcEQ7QUFBQSw4REFBQztBQUFBLGtCQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLFFBQVEsVUFBVSxNQUFNLE9BQU87QUFBQSxrQkFDcEU7QUFBQSxpRUFBQztBQUFBLHNCQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsWUFBWSxZQUFZLE9BQU8sVUFBVSxjQUFjLE9BQVU7QUFBQSxzQkFDM0YsZUFBSztBQUFBLHFCQUNSO0FBQUEsb0JBQ0MsaUJBQWlCLDZDQUFDO0FBQUEsc0JBQU0sTUFBSztBQUFBLHNCQUFPO0FBQUEscUJBQVc7QUFBQSxvQkFDL0MsaUJBQWlCLEtBQUssUUFBUTtBQUFBO0FBQUEsaUJBQ2pDO0FBQUEsZ0JBQ0EsOENBQUM7QUFBQSxrQkFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxNQUFNLE9BQU87QUFBQSxrQkFDakQ7QUFBQSxpRUFBQztBQUFBLHNCQUNDLE9BQU07QUFBQSxzQkFDTixVQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNLGdCQUFnQixLQUFLO0FBQUEscUJBQ3RDO0FBQUEsb0JBQ0MsS0FBSyxpQkFDSiw2Q0FBQztBQUFBLHNCQUNDLE9BQU07QUFBQSxzQkFDTixVQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNLGdCQUFnQixPQUFPO0FBQUEscUJBQ3hDO0FBQUEsb0JBRUYsNkNBQUM7QUFBQSxzQkFDQyxPQUFPLFFBQVEsZUFBZTtBQUFBLHNCQUM5QixVQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNLGdCQUFnQixPQUFPO0FBQUEscUJBQ3hDO0FBQUEsb0JBQ0EsNkNBQUM7QUFBQSxzQkFDQyxPQUFPLGVBQWUsYUFBYSxZQUFZO0FBQUEsc0JBQy9DLFVBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU0sZ0JBQWdCLE1BQU07QUFBQSxxQkFDdkM7QUFBQTtBQUFBLGlCQUNGO0FBQUE7QUFBQSxhQUNGO0FBQUE7QUFBQSxTQUNGO0FBQUEsUUFFQyxlQUNDLDZDQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsWUFBWSxVQUFVLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFBQSxVQUN4RSx1REFBQztBQUFBLFlBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxZQUNoRCxlQUFLO0FBQUEsV0FDUjtBQUFBLFNBQ0Y7QUFBQSxRQUdELGlCQUFpQixLQUFLLGlCQUNyQiw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFlBQVksVUFBVSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQUEsVUFDeEUsdURBQUM7QUFBQSxZQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsWUFDaEQsZUFBSztBQUFBLFdBQ1I7QUFBQSxTQUNGO0FBQUEsUUFHRCxpQkFDQyw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFlBQVksU0FBUztBQUFBLFVBQy9CLHVEQUFDO0FBQUEsWUFDQyxPQUFNO0FBQUEsWUFDTixhQUFZO0FBQUEsWUFDWixPQUFPO0FBQUEsWUFDUCxVQUFVLENBQUMsTUFBTSxjQUFjLEVBQUUsT0FBTyxLQUFLO0FBQUEsWUFDN0MsTUFBTTtBQUFBLFdBQ1I7QUFBQSxTQUNGO0FBQUEsUUFHRCxnQkFDQyw2Q0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLFlBQVksU0FBUztBQUFBLFVBQy9CLHVEQUFDO0FBQUEsWUFDQztBQUFBLFlBQ0Esa0JBQWtCLEtBQUs7QUFBQSxZQUN2QjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsV0FDRjtBQUFBLFNBQ0Y7QUFBQTtBQUFBLEtBRUo7QUFBQSxFQUVKO0FBRUEsTUFBTyx3QkFBUTs7O0FGMkJQLE1BQUFDLHVCQUFBO0FBbktSLE1BQU0saUJBQXNELENBQUMsYUFBYSxlQUFlLGFBQWE7QUFFdEcsTUFBTSxrQkFBcUU7QUFBQSxJQUN6RSxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsRUFDZjtBQUtBLFdBQVMsZ0JBQWdCLE1BQTZCLFNBQTJCO0FBQy9FLFVBQU0sUUFBUSxLQUFLLEtBQUssWUFBWTtBQUNwQyxTQUFLLE1BQU0sU0FBUyxTQUFTLEtBQUssTUFBTSxTQUFTLG1CQUFtQixNQUFNLFFBQVEsYUFBYTtBQUM3RixhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksTUFBTSxTQUFTLGdCQUFnQixLQUFLLFFBQVEsZ0JBQWdCO0FBQzlELGFBQU87QUFBQSxJQUNUO0FBQ0EsUUFBSSxNQUFNLFNBQVMsaUJBQWlCLEtBQUssUUFBUSxpQkFBaUI7QUFDaEUsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE1BQU0sU0FBUyxhQUFhLEtBQUssTUFBTSxTQUFTLE1BQU0sS0FBSyxRQUFRLGtCQUFrQjtBQUN2RixhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBUUEsV0FBUyxrQkFDUCxPQUNBLFNBQ2dCO0FBQ2hCLFVBQU0sUUFBd0IsQ0FBQztBQUMvQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLEtBQUssUUFBUTtBQUNuQixVQUFJLGdCQUFnQixNQUFNLE9BQU8sR0FBRztBQUNsQyxjQUFNLEtBQUssUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUNBLFFBQUksUUFBUSxpQkFBaUI7QUFDM0IsaUJBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSyxPQUFPLFFBQVEsUUFBUSxlQUFlLEdBQUc7QUFDbEUsWUFBSSxPQUFPLE9BQU87QUFDaEIsZ0JBQU0sT0FBTztBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLFNBQVMsVUFBVSxTQUFTLFVBQVUsY0FBYyxNQUE4QjtBQTNFL0c7QUE0RUUsVUFBTSxTQUFRLDBDQUFVLHVCQUFWLFlBQWdDLENBQUM7QUFDL0MsVUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSTtBQUFBLE1BQXlCLE1BQ25FLGtCQUFrQixPQUFPLE9BQU87QUFBQSxJQUNsQztBQUNBLFVBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSTtBQUFBLE1BQ2xDLE1BQUc7QUFqRlAsWUFBQUM7QUFpRlUsZ0JBQUFBLE1BQUEsUUFBUSxvQkFBUixPQUFBQSxNQUEyQixDQUFDO0FBQUE7QUFBQSxJQUNwQztBQUNBLFVBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQTRDLG9CQUFJLElBQUksQ0FBQztBQUNyRyxVQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQThDLENBQUMsQ0FBQztBQUNwRixVQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEtBQUs7QUFHaEUsVUFBTSwwQkFBc0Isc0JBQTZDLElBQUk7QUFDN0UsVUFBTSxzQkFBa0Isc0JBQTZDLElBQUk7QUFDekUsVUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUdyQixpQ0FBVSxNQUFNO0FBOUZsQixVQUFBQTtBQStGSSx3QkFBa0Isa0JBQWtCLE9BQU8sT0FBTyxDQUFDO0FBQ25ELHFCQUFjQSxNQUFBLFFBQVEsb0JBQVIsT0FBQUEsTUFBMkIsQ0FBQyxDQUFDO0FBQUEsSUFDN0MsR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLGlCQUFpQixRQUFRLGlCQUFpQixxQ0FBVSxXQUFXLENBQUM7QUFHeEYsaUNBQVUsTUFBTTtBQUNkLFlBQU0sYUFBYSxNQUFZO0FBQzdCLFlBQUk7QUFDRixnQkFBTSxTQUFTLE1BQU07QUFBQSxZQUNuQixpQkFBaUIsUUFBUTtBQUFBLFlBQ3pCLFdBQVc7QUFBQSxVQUNiO0FBQ0EsZ0JBQU0sVUFBK0MsQ0FBQztBQUN0RCxxQkFBVyxRQUFRLE9BQU8sTUFBTTtBQUM5QixvQkFBUSxLQUFLLHNCQUFzQjtBQUFBLFVBQ3JDO0FBQ0Esd0JBQWMsT0FBTztBQUFBLFFBQ3ZCLFNBQVMsS0FBUDtBQUNBLGtCQUFRLE1BQU0sbUNBQW1DLEdBQUc7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFDQSxpQkFBVztBQUFBLElBQ2IsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRWYsVUFBTSx1QkFBbUIsMkJBQVksQ0FBQyxhQUE2QjtBQUNqRSxVQUFJLG9CQUFvQixTQUFTO0FBQy9CLHFCQUFhLG9CQUFvQixPQUFPO0FBQUEsTUFDMUM7QUFDQSwwQkFBb0IsVUFBVSxXQUFXLE1BQU07QUFDN0MscUJBQWEsaUJBQWlCLFFBQVEsTUFBTSxXQUFXLFNBQVM7QUFBQSxVQUM5RCxpQkFBaUI7QUFBQSxRQUNuQixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVE7QUFDaEIsa0JBQVEsTUFBTSxtQ0FBbUMsR0FBRztBQUFBLFFBQ3RELENBQUM7QUFBQSxNQUNILEdBQUcsR0FBRztBQUFBLElBQ1IsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRWYsVUFBTSxtQkFBZSwyQkFBWSxDQUFDLGFBQXlCO0FBQ3pELFVBQUksZ0JBQWdCLFNBQVM7QUFDM0IscUJBQWEsZ0JBQWdCLE9BQU87QUFBQSxNQUN0QztBQUNBLHNCQUFnQixVQUFVLFdBQVcsTUFBTTtBQUN6QyxxQkFBYSxpQkFBaUIsUUFBUSxNQUFNLFdBQVcsU0FBUztBQUFBLFVBQzlELGlCQUFpQjtBQUFBLFFBQ25CLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQixrQkFBUSxNQUFNLG1DQUFtQyxHQUFHO0FBQUEsUUFDdEQsQ0FBQztBQUFBLE1BQ0gsR0FBRyxHQUFJO0FBQUEsSUFDVCxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFZixVQUFNLG1CQUFlLDJCQUFZLENBQUMsYUFBcUI7QUFDckQsd0JBQWtCLENBQUMsU0FBUztBQUMxQixjQUFNLFdBQVcsaUNBQUssT0FBTCxFQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssVUFBVTtBQUN4RCx5QkFBaUIsUUFBUTtBQUN6QixlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSCxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsVUFBTSx3QkFBb0IsMkJBQVksQ0FBQyxVQUFrQixVQUFrQjtBQUN6RSxvQkFBYyxDQUFDLFNBQVM7QUFDdEIsY0FBTSxXQUFXLGlDQUFLLE9BQUwsRUFBVyxDQUFDLFdBQVcsTUFBTTtBQUM5QyxxQkFBYSxRQUFRO0FBQ3JCLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsVUFBTSx1QkFBbUIsMkJBQVksQ0FBQyxVQUFrQixTQUE4QjtBQUNwRixvQkFBYyxDQUFDLFNBQVUsaUNBQUssT0FBTCxFQUFXLENBQUMsV0FBVyxLQUFLLEVBQUU7QUFBQSxJQUN6RCxHQUFHLENBQUMsQ0FBQztBQUVMLFVBQU0sMEJBQXNCLDJCQUFZLENBQUMsVUFBa0IsWUFBNkI7QUFDdEYsMEJBQW9CLENBQUMsU0FBUztBQXRLbEMsWUFBQUE7QUF1S00sY0FBTSxPQUFPLElBQUksSUFBSSxJQUFJO0FBQ3pCLGNBQU0sV0FBVyxJQUFJLEtBQUlBLE1BQUEsS0FBSyxJQUFJLFFBQVEsTUFBakIsT0FBQUEsTUFBc0IsQ0FBQyxDQUFDO0FBQ2pELFlBQUksU0FBUyxJQUFJLE9BQU8sR0FBRztBQUN6QixtQkFBUyxPQUFPLE9BQU87QUFBQSxRQUN6QixPQUFPO0FBQ0wsbUJBQVMsSUFBSSxPQUFPO0FBQUEsUUFDdEI7QUFDQSxhQUFLLElBQUksVUFBVSxRQUFRO0FBQzNCLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQyxDQUFDO0FBR0wsUUFBSSxDQUFDLFlBQVksTUFBTSxXQUFXLEdBQUc7QUFDbkMsYUFDRSw4Q0FBQztBQUFBLFFBQUksS0FBSyxFQUFFLFNBQVMsU0FBUztBQUFBLFFBQzVCLHdEQUFDO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixhQUFZO0FBQUEsU0FDZDtBQUFBLE9BQ0Y7QUFBQSxJQUVKO0FBR0EsVUFBTSxtQkFBbUIsWUFBWSxDQUFDO0FBQ3RDLFFBQUksZUFBZTtBQUNuQixRQUFJLGtCQUFrQjtBQUNwQixxQkFBZSxNQUNaLE9BQU8sQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQ3ZDLEtBQUssQ0FBQyxHQUFHLE1BQUc7QUF0TW5CLFlBQUFBLEtBQUE7QUFzTXVCLGlCQUFBQSxNQUFBLEVBQUUsa0JBQUYsT0FBQUEsTUFBbUIsU0FBUSxPQUFFLGtCQUFGLFlBQW1CO0FBQUEsT0FBSTtBQUFBLElBQ3ZFO0FBR0EsVUFBTSxVQUFVLGVBQWUsSUFBSSxDQUFDLGNBQWM7QUFBQSxNQUNoRDtBQUFBLE1BQ0EsT0FBTyxnQkFBZ0I7QUFBQSxNQUN2QixPQUFPLGFBQWEsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLFFBQVE7QUFBQSxJQUNqRSxFQUFFLEVBQUUsT0FBTyxDQUFDLFVBQVUsTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUc1QyxVQUFNLGFBQWEsTUFBTTtBQUN6QixVQUFNLGlCQUFpQixNQUFNLE9BQU8sQ0FBQyxTQUFTLGVBQWUsS0FBSyxLQUFLLEVBQUU7QUFFekUsV0FDRSwrQ0FBQztBQUFBLE1BQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFDdEQ7QUFBQSxzREFBQztBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFNBQ2Q7QUFBQSxRQUVBLDhDQUFDO0FBQUEsVUFBa0IsV0FBVztBQUFBLFVBQWdCLE9BQU87QUFBQSxTQUFZO0FBQUEsUUFFaEUsWUFDQywrQ0FBQztBQUFBLFVBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNwQztBQUFBLDBEQUFDO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxPQUFPLEdBQUcsb0JBQW9CLGtCQUFrQixJQUFJLEtBQUs7QUFBQSxjQUN6RCxhQUFhLG9CQUNULGdDQUNBO0FBQUEsYUFDTjtBQUFBLFlBQ0EsOENBQUM7QUFBQSxjQUFLLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQyxpQkFBaUI7QUFBQSxjQUMxRCx3REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxPQUFPO0FBQUEsZ0JBQzNDLDhCQUFvQix5QkFBeUI7QUFBQSxlQUNoRDtBQUFBLGFBQ0Y7QUFBQTtBQUFBLFNBQ0Y7QUFBQSxRQUdELFFBQVEsSUFBSSxDQUFDLEVBQUUsVUFBVSxPQUFPLE9BQU8sV0FBVyxHQUFHLGVBQ3BELCtDQUFDO0FBQUEsVUFBbUIsS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxVQUNqRDtBQUFBLHlCQUFhLEtBQUssOENBQUMsdUJBQVE7QUFBQSxZQUM1Qiw4Q0FBQztBQUFBLGNBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFFBQVEsT0FBTyxhQUFhLGVBQWUsWUFBWTtBQUFBLGNBQ2hHO0FBQUEsYUFDSDtBQUFBLFlBQ0MsV0FBVyxJQUFJLENBQUMsU0FBTTtBQXJQakMsa0JBQUFBLEtBQUE7QUFzUFksbUVBQUM7QUFBQSxnQkFFQztBQUFBLGdCQUNBLFNBQVMsQ0FBQyxDQUFDLGVBQWUsS0FBSztBQUFBLGdCQUMvQixlQUFlLGdCQUFnQixNQUFNLE9BQU87QUFBQSxnQkFDNUMsbUJBQWtCQSxNQUFBLGlCQUFpQixJQUFJLEtBQUssSUFBSSxNQUE5QixPQUFBQSxNQUFtQyxvQkFBSSxJQUFJO0FBQUEsZ0JBQzdELFFBQU8sZ0JBQVcsS0FBSyxVQUFoQixZQUF5QjtBQUFBLGdCQUNoQyxlQUFjLGdCQUFXLEtBQUssVUFBaEIsWUFBeUI7QUFBQSxnQkFDdkMsV0FBVyxRQUFRO0FBQUEsZ0JBQ25CLFNBQVMsV0FBVztBQUFBLGdCQUNwQixVQUFVLE1BQU0sYUFBYSxLQUFLLElBQUk7QUFBQSxnQkFDdEMsaUJBQWlCLENBQUMsWUFBWSxvQkFBb0IsS0FBSyxNQUFNLE9BQU87QUFBQSxnQkFDcEUsZUFBZSxDQUFDLFVBQVUsa0JBQWtCLEtBQUssTUFBTSxLQUFLO0FBQUEsZ0JBQzVELGNBQWMsQ0FBQyxTQUFTLGlCQUFpQixLQUFLLE1BQU0sSUFBSTtBQUFBLGlCQVpuRCxLQUFLLElBYVo7QUFBQSxhQUNEO0FBQUE7QUFBQSxXQXJCTyxRQXNCVixDQUNEO0FBQUEsUUFFRCw4Q0FBQyx1QkFBUTtBQUFBLFFBRVQsOENBQUM7QUFBQSxVQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxXQUFXO0FBQUEsVUFBRztBQUFBLFNBRXJEO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sNEJBQVE7OztBVnJKWSxNQUFBQyx1QkFBQTtBQTNGM0IsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLFNBQVMsZ0JBQWdCLFNBQVMsT0FBTyxTQUFTLE1BQTRCO0FBQ3ZHLFVBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBcUIsUUFBUTtBQUNuRSxVQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksd0JBQWtCLGNBQWM7QUFDOUQsVUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHdCQUE4QixJQUFJO0FBQ2xFLFVBQU0sQ0FBQyxTQUFTLFVBQVUsUUFBSSx3QkFBa0Q7QUFBQSxNQUM5RSxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQ0QsVUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHdCQUE4RDtBQUFBLE1BQ3hGLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxJQUNaLENBQUM7QUFHRCxVQUFNLGlCQUFhLHNCQUFPLE9BQU87QUFDakMsZUFBVyxVQUFVO0FBRXJCLGlDQUFVLE1BQU07QUFDZCxVQUFJLENBQUM7QUFBTztBQUVaLFlBQU0sWUFBWSxNQUFZO0FBQzVCLG1CQUFXLEVBQUUsU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzVDLGtCQUFVLEVBQUUsU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBSTNDLGNBQU0sc0JBQXNCLENBQUMsQ0FBQyxlQUFlO0FBQzdDLGNBQU0sQ0FBQyxlQUFlLGNBQWMsSUFBSSxNQUFNLFFBQVEsV0FBVztBQUFBLFVBQy9ELGFBQWdDLGlCQUFpQixlQUFlLE1BQU0sV0FBVyxPQUFPO0FBQUEsVUFDeEYsc0JBQ0ksYUFBcUMsa0JBQWtCLFdBQVcsU0FBUztBQUFBLFlBQ3pFLFNBQVMsZUFBZTtBQUFBLFlBQ3hCLGFBQWEsZUFBZTtBQUFBLFVBQzlCLENBQUMsSUFDRCxRQUFRLE9BQU8sSUFBSSxTQUFTLGtCQUFrQixHQUFHLENBQUM7QUFBQSxRQUN4RCxDQUFDO0FBRUQsWUFBSSxjQUFjLFdBQVcsYUFBYTtBQUN4QyxxQkFBVyxjQUFjLE1BQU0sSUFBSTtBQUFBLFFBQ3JDLE9BQU87QUFDTCxnQkFBTSxNQUFNLGNBQWM7QUFDMUIsb0JBQVUsQ0FBQyxTQUFVLGlDQUNoQixPQURnQjtBQUFBLFlBRW5CLFNBQVMsZUFBZSxXQUFXLElBQUksVUFBVTtBQUFBLFVBQ25ELEVBQUU7QUFBQSxRQUNKO0FBQ0EsbUJBQVcsQ0FBQyxTQUFVLGlDQUFLLE9BQUwsRUFBVyxTQUFTLE1BQU0sRUFBRTtBQUVsRCxZQUFJLGVBQWUsV0FBVyxhQUFhO0FBQ3pDLHNCQUFZLGVBQWUsTUFBTSxJQUFJO0FBQUEsUUFDdkMsT0FBTztBQUNMLGdCQUFNLE1BQU0sZUFBZTtBQUUzQixjQUFJLEVBQUUsZUFBZSxZQUFZLElBQUksV0FBVyxNQUFNO0FBQ3BELHNCQUFVLENBQUMsU0FBVSxpQ0FDaEIsT0FEZ0I7QUFBQSxjQUVuQixVQUFVLGVBQWUsV0FBVyxJQUFJLFVBQVU7QUFBQSxZQUNwRCxFQUFFO0FBQUEsVUFDSjtBQUNBLHNCQUFZLElBQUk7QUFBQSxRQUNsQjtBQUNBLG1CQUFXLENBQUMsU0FBVSxpQ0FBSyxPQUFMLEVBQVcsVUFBVSxNQUFNLEVBQUU7QUFBQSxNQUNyRDtBQUVBLGdCQUFVO0FBQUEsSUFDWixHQUFHLENBQUMsT0FBTyxlQUFlLElBQUksZUFBZSxTQUFTLGVBQWUsV0FBVyxDQUFDO0FBRWpGLFVBQU0sZUFBZSxhQUFhLFFBQVEsV0FBVztBQUNyRCxVQUFNLGNBQWMsaUJBQWlCO0FBQ3JDLFVBQU0sYUFBYSxpQkFBaUIsYUFBYSxTQUFTO0FBRTFELFVBQU0sYUFBYSxNQUFNO0FBQ3ZCLFVBQUksQ0FBQyxZQUFZO0FBQ2YsdUJBQWUsYUFBYSxlQUFlLEVBQUU7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsTUFBTTtBQUN2QixVQUFJLENBQUMsYUFBYTtBQUNoQix1QkFBZSxhQUFhLGVBQWUsRUFBRTtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUVBLFVBQU0sZ0JBQWdCLGlCQUFpQixRQUFRLE1BQU07QUFDckQsVUFBTSxXQUFXLGdCQUFnQixLQUFLLENBQUMsV0FBVyxRQUFRLE1BQU07QUFFaEUsVUFBTSxrQkFBa0IsTUFBTTtBQUM1QixZQUFNLG9CQUFvQixRQUFRO0FBRWxDLGFBQ0UsK0NBQUM7QUFBQSxRQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUFBLFFBQ3JEO0FBQUEsaUJBQU8sV0FBVyw4Q0FBQztBQUFBLFlBQVksU0FBUyxPQUFPO0FBQUEsV0FBUztBQUFBLFVBRXhELG9CQUNDLCtDQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsUUFBUSxVQUFVLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUEsWUFDeEU7QUFBQSw0REFBQztBQUFBLGdCQUFRLE1BQUs7QUFBQSxlQUFTO0FBQUEsY0FDdkIsOENBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGdCQUFHO0FBQUEsZUFBbUI7QUFBQTtBQUFBLFdBQzNFLElBQ0UsT0FBTyxXQUNULDhDQUFDO0FBQUEsWUFBWSxTQUFTLE9BQU87QUFBQSxXQUFVLElBQ3JDLFdBQ0Y7QUFBQSxZQUNFO0FBQUEsNERBQUM7QUFBQSxnQkFDQyxVQUFVLFNBQVM7QUFBQSxnQkFDbkIsU0FBUyxTQUFTO0FBQUEsZ0JBQ2xCLGFBQWE7QUFBQSxnQkFDYjtBQUFBLGVBQ0Y7QUFBQSxjQUNBLDhDQUFDO0FBQUEsZ0JBQWE7QUFBQSxnQkFBb0IsYUFBYTtBQUFBLGVBQVU7QUFBQTtBQUFBLFdBQzNELElBRUEsOENBQUM7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLE9BQU07QUFBQSxZQUNOLGFBQVk7QUFBQSxXQUNkO0FBQUEsVUFHRiw4Q0FBQztBQUFBLFlBQWdCO0FBQUEsWUFBa0IsU0FBUyxRQUFRO0FBQUEsV0FBUztBQUFBLFVBRTVELFlBQ0MsOENBQUM7QUFBQSxZQUNDLGVBQWUsU0FBUztBQUFBLFlBQ3hCLGlCQUFpQixTQUFTO0FBQUEsV0FDNUI7QUFBQTtBQUFBLE9BRUo7QUFBQSxJQUVKO0FBRUEsV0FDRSw4Q0FBQztBQUFBLE1BQ0MsT0FBTyxXQUFXLGVBQWUsR0FBRyxNQUFNLEdBQUcsRUFBRTtBQUFBLE1BQy9DO0FBQUEsTUFDQTtBQUFBLE1BQ0Esc0JBQXNCO0FBQUEsUUFDcEIsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLGVBQ0UsYUFDRSw4Q0FBQztBQUFBLFFBQU8sTUFBSztBQUFBLFFBQVUsU0FBUyxNQUFNLFNBQVMsS0FBSztBQUFBLFFBQUc7QUFBQSxPQUV2RCxJQUVBLCtDQUFDO0FBQUEsUUFBTyxNQUFLO0FBQUEsUUFBVSxTQUFTO0FBQUEsUUFBWTtBQUFBO0FBQUEsVUFDbkMsbUJBQW1CLGFBQWEsZUFBZTtBQUFBO0FBQUEsT0FDeEQ7QUFBQSxNQUdKLGlCQUNFLGNBQ0UsOENBQUM7QUFBQSxRQUFPLFNBQVMsTUFBTSxTQUFTLEtBQUs7QUFBQSxRQUFHO0FBQUEsT0FBTSxJQUU5QywrQ0FBQztBQUFBLFFBQU8sU0FBUztBQUFBLFFBQVk7QUFBQTtBQUFBLFVBQ3BCLG1CQUFtQixhQUFhLGVBQWU7QUFBQTtBQUFBLE9BQ3hEO0FBQUEsTUFJSix5REFBQztBQUFBLFFBQUksS0FBSyxFQUFFLE9BQU8sSUFBSTtBQUFBLFFBQ3JCO0FBQUEsd0RBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsZUFBZSxRQUFRO0FBQUEsWUFDcEQsd0RBQUM7QUFBQSxjQUFjLE9BQU8sUUFBUTtBQUFBLGNBQVEsUUFBUSxRQUFRO0FBQUEsYUFBUTtBQUFBLFdBQ2hFO0FBQUEsVUFDQSwrQ0FBQztBQUFBLFlBQ0MsUUFBTTtBQUFBLFlBQ04sTUFBSztBQUFBLFlBQ0wsYUFBYTtBQUFBLFlBQ2IsbUJBQW1CLENBQUMsUUFBUSxlQUFlLEdBQWlCO0FBQUEsWUFFNUQ7QUFBQSw0REFBQztBQUFBLGdCQUNFLHVCQUFhLElBQUksQ0FBQyxTQUNqQiw4Q0FBQztBQUFBLGtCQUFlLElBQUk7QUFBQSxrQkFDakIsNkJBQW1CO0FBQUEsbUJBRFosSUFFVixDQUNEO0FBQUEsZUFDSDtBQUFBLGNBQ0EsK0NBQUM7QUFBQSxnQkFDQztBQUFBLGdFQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQUNWLDBCQUFnQjtBQUFBLG1CQUNuQjtBQUFBLGtCQUNBLDhDQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQUNYLHdEQUFDO0FBQUEsc0JBQ0M7QUFBQSxzQkFDQTtBQUFBLHNCQUNBLFNBQVMsV0FBVztBQUFBLHNCQUNwQjtBQUFBLHNCQUNBO0FBQUEscUJBQ0Y7QUFBQSxtQkFDRjtBQUFBLGtCQUNBLDhDQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQUNYLHlEQUFDO0FBQUEsc0JBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsc0JBQ3ZEO0FBQUEsc0VBQUM7QUFBQSwwQkFDQyxNQUFLO0FBQUEsMEJBQ0wsT0FBTTtBQUFBLDBCQUNOLGFBQVk7QUFBQSx5QkFDZDtBQUFBLHdCQUNBLDhDQUFDO0FBQUEsMEJBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSwwQkFBRztBQUFBLHlCQUV0RDtBQUFBO0FBQUEscUJBQ0Y7QUFBQSxtQkFDRjtBQUFBLGtCQUNBLDhDQUFDO0FBQUEsb0JBQVMsSUFBRztBQUFBLG9CQUNYLHlEQUFDO0FBQUEsc0JBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsc0JBQ3ZEO0FBQUEsc0VBQUM7QUFBQSwwQkFDQyxNQUFLO0FBQUEsMEJBQ0wsT0FBTTtBQUFBLDBCQUNOLGFBQVk7QUFBQSx5QkFDZDtBQUFBLHdCQUNBLDhDQUFDO0FBQUEsMEJBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSwwQkFBRztBQUFBLHlCQUV0RDtBQUFBO0FBQUEscUJBQ0Y7QUFBQSxtQkFDRjtBQUFBO0FBQUEsZUFDRjtBQUFBO0FBQUEsV0FDRjtBQUFBO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTywwQkFBUTs7O0FEck1MLE1BQUFDLHVCQUFBO0FBM0NWLE1BQU0scUJBQXFCLENBQUMsWUFBbUM7QUFqQi9EO0FBa0JFLFVBQU0sRUFBRSxZQUFZLElBQUk7QUFDeEIsVUFBTSxtQkFBa0IsZ0RBQWEsa0JBQWIsbUJBQTRCO0FBRXBELFVBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBb0IsU0FBUztBQUMvRCxVQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksd0JBQXlCLElBQUk7QUFDM0QsVUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEtBQUs7QUFHdEQsVUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUVyQixVQUFNLGtCQUFjLDJCQUFZLE1BQVk7QUFDMUMsVUFBSSxDQUFDLGlCQUFpQjtBQUNwQixxQkFBYSxZQUFZO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLG1CQUFhLFNBQVM7QUFDdEIsVUFBSTtBQUNGLGNBQU0sU0FBUyxNQUFNO0FBQUEsVUFDbkIsbUNBQW1DO0FBQUEsVUFDbkMsV0FBVztBQUFBLFFBQ2I7QUFDQSxtQkFBVyxPQUFPLElBQUk7QUFDdEIscUJBQWEsT0FBTztBQUFBLE1BQ3RCLFNBQVMsS0FBUDtBQUNBLFlBQUksZUFBZSxZQUFZLElBQUksV0FBVyxLQUFLO0FBQ2pELHVCQUFhLFlBQVk7QUFBQSxRQUMzQixPQUFPO0FBQ0wsdUJBQWEsT0FBTztBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLElBQ0YsSUFBRyxDQUFDLGVBQWUsQ0FBQztBQUVwQixpQ0FBVSxNQUFNO0FBQ2Qsa0JBQVk7QUFBQSxJQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFaEIsUUFBSSxjQUFjLFdBQVc7QUFDM0IsYUFDRSw4Q0FBQztBQUFBLFFBQVksT0FBTTtBQUFBLFFBQ2pCLHdEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLFFBQVEsU0FBUztBQUFBLFVBQzlDLHdEQUFDO0FBQUEsWUFBUSxNQUFLO0FBQUEsV0FBUTtBQUFBLFNBQ3hCO0FBQUEsT0FDRjtBQUFBLElBRUo7QUFFQSxRQUFJLGNBQWMsZ0JBQWdCLGNBQWMsV0FBVyxDQUFDLFNBQVM7QUFDbkUsYUFDRSw4Q0FBQztBQUFBLFFBQVksT0FBTTtBQUFBLFFBQ2pCLHdEQUFDO0FBQUEsVUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLFFBQVEsU0FBUztBQUFBLFVBQzlDLHdEQUFDO0FBQUEsWUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLFlBQUc7QUFBQSxXQUV0RDtBQUFBLFNBQ0Y7QUFBQSxPQUNGO0FBQUEsSUFFSjtBQUVBLFVBQU0sY0FBYyxlQUFlLFFBQVEsTUFBTTtBQUNqRCxVQUFNLGNBQWMsbUJBQW1CLFFBQVEsU0FBUyxRQUFRLFdBQVc7QUFFM0UsV0FDRSwrQ0FBQztBQUFBLE1BQVksT0FBTTtBQUFBLE1BQ2pCO0FBQUEsdURBQUM7QUFBQSxVQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFVBQ3ZEO0FBQUEsMkRBQUM7QUFBQSxjQUNDLEtBQUs7QUFBQSxnQkFDSCxPQUFPO0FBQUEsZ0JBQ1AsS0FBSztBQUFBLGdCQUNMLFlBQVk7QUFBQSxnQkFDWixRQUFRO0FBQUEsY0FDVjtBQUFBLGNBRUE7QUFBQSw4REFBQztBQUFBLGtCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsa0JBQUc7QUFBQSxpQkFFMUQ7QUFBQSxnQkFDQSw4Q0FBQztBQUFBLGtCQUFNLE1BQU0sWUFBWTtBQUFBLGtCQUFPLHNCQUFZO0FBQUEsaUJBQU07QUFBQTtBQUFBLGFBQ3BEO0FBQUEsWUFFQSwrQ0FBQztBQUFBLGNBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxjQUNwQztBQUFBLDhEQUFDO0FBQUEsa0JBQU8sS0FBSyxFQUFFLE1BQU0sUUFBUSxZQUFZLFdBQVc7QUFBQSxrQkFDakQsOENBQWUsUUFBUSxPQUFPLFFBQVEsTUFBTSxHQUFHO0FBQUEsaUJBQ2xEO0FBQUEsZ0JBQ0EsK0NBQUM7QUFBQSxrQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGtCQUNoRDtBQUFBLDRCQUFRLFFBQVEsT0FBTyxDQUFDLEVBQUUsWUFBWSxJQUNyQyxRQUFRLFFBQVEsTUFBTSxDQUFDO0FBQUEsb0JBQUc7QUFBQSxvQkFDM0IsUUFBUTtBQUFBO0FBQUEsaUJBQ1g7QUFBQTtBQUFBLGFBQ0Y7QUFBQSxhQUVFLFFBQVEsV0FBVyxvQkFDbkIsUUFBUSxXQUFXLDZCQUNuQiw4Q0FBQztBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsS0FBSyxFQUFFLE9BQU8sT0FBTztBQUFBLGNBQ3JCLFNBQVMsTUFBTSxnQkFBZ0IsSUFBSTtBQUFBLGNBQ3BDO0FBQUEsYUFFRDtBQUFBO0FBQUEsU0FFSjtBQUFBLFFBRUEsOENBQUM7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0EsT0FBTztBQUFBLFVBQ1AsVUFBVTtBQUFBLFNBQ1o7QUFBQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBTyw2QkFBUTs7O0FlbklmLE1BQUFDLGdCQUF5RDtBQUN6RCxNQUFBQyxjQVlPOzs7QUNiUCxNQUFBQyxjQUEyQztBQW9DakMsTUFBQUMsdUJBQUE7QUEzQlYsV0FBU0MsY0FBYSxRQUFnQixVQUEwQjtBQUM5RCxXQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxNQUNwQyxPQUFPO0FBQUEsTUFDUCxVQUFVLFNBQVMsWUFBWTtBQUFBLElBQ2pDLENBQUMsRUFBRSxPQUFPLFNBQVMsR0FBRztBQUFBLEVBQ3hCO0FBRUEsTUFBTSxjQUFjLENBQUMsRUFBRSxTQUFTLFNBQVMsTUFBd0I7QUFDL0QsVUFBTSxjQUFjLGVBQWUsUUFBUSxNQUFNO0FBQ2pELFVBQU0sZUFBZSxnQkFBZ0IsUUFBUSxRQUFRLFFBQVEsTUFBTTtBQUNuRSxVQUFNLGNBQWMsbUJBQW1CLFFBQVEsU0FBUyxRQUFRLFdBQVc7QUFFM0UsV0FDRSw4Q0FBQztBQUFBLE1BQ0MsTUFBSztBQUFBLE1BQ0wsS0FBSyxFQUFFLE9BQU8sT0FBTztBQUFBLE1BQ3JCLFNBQVMsTUFBTSxTQUFTLFFBQVEsRUFBRTtBQUFBLE1BRWxDLHlEQUFDO0FBQUEsUUFDQyxLQUFLO0FBQUEsVUFDSCxPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsUUFDWDtBQUFBLFFBRUE7QUFBQSx5REFBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVMsWUFBWSxpQkFBaUIsUUFBUSxTQUFTO0FBQUEsWUFDbEY7QUFBQSw0REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFFBQVEsWUFBWSxXQUFXO0FBQUEsZ0JBQ2pELFVBQUFBLGNBQWEsUUFBUSxRQUFRLFFBQVEsUUFBUTtBQUFBLGVBQ2hEO0FBQUEsY0FDQSwrQ0FBQztBQUFBLGdCQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsZ0JBQ3BDO0FBQUEsZ0VBQUM7QUFBQSxvQkFBTSxNQUFNLFlBQVk7QUFBQSxvQkFBTyxzQkFBWTtBQUFBLG1CQUFNO0FBQUEsa0JBQ2pELGdCQUNDLDhDQUFDO0FBQUEsb0JBQU0sTUFBTSxhQUFhO0FBQUEsb0JBQU8sdUJBQWE7QUFBQSxtQkFBTTtBQUFBO0FBQUEsZUFFeEQ7QUFBQTtBQUFBLFdBQ0Y7QUFBQSxVQUNBLDhDQUFDO0FBQUEsWUFBTyxLQUFLLEVBQUUsTUFBTSxVQUFVO0FBQUEsWUFDNUIsa0JBQVEsaUJBQWlCO0FBQUEsV0FDNUI7QUFBQSxVQUNDLGVBQ0MsOENBQUM7QUFBQSxZQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsWUFDaEQ7QUFBQSxXQUNIO0FBQUEsVUFFRiwrQ0FBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxZQUNuQztBQUFBLDZEQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxnQkFDaEQ7QUFBQSwwQkFBUSxRQUFRLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxRQUFRLFFBQVEsTUFBTSxDQUFDO0FBQUEsa0JBQUU7QUFBQSxrQkFBRSxRQUFRO0FBQUE7QUFBQSxlQUNoRjtBQUFBLGNBQ0EsK0NBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGdCQUNoRDtBQUFBLDBCQUFRLEdBQUcsTUFBTSxHQUFHLEVBQUU7QUFBQSxrQkFBRTtBQUFBO0FBQUEsZUFDM0I7QUFBQTtBQUFBLFdBQ0Y7QUFBQTtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sc0JBQVE7OztBQ2pFZixNQUFBQyxjQUFrQztBQVM5QixNQUFBQyx1QkFBQTtBQUZKLE1BQU0sYUFBYSxDQUFDLEVBQUUsT0FBTyxZQUFZLE1BQXVCO0FBQzlELFdBQ0UsK0NBQUM7QUFBQSxNQUNDLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFFQTtBQUFBLHNEQUFDO0FBQUEsVUFBSyxNQUFLO0FBQUEsVUFBTyxNQUFLO0FBQUEsU0FBUTtBQUFBLFFBQy9CLDhDQUFDO0FBQUEsVUFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksV0FBVztBQUFBLFVBQ3BEO0FBQUEsU0FDSDtBQUFBLFFBQ0EsOENBQUM7QUFBQSxVQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsVUFDaEQ7QUFBQSxTQUNIO0FBQUE7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8scUJBQVE7OztBRnVGUCxNQUFBQyx1QkFBQTtBQTVGUixNQUFNLGlCQUEyRDtBQUFBLElBQy9ELEVBQUUsT0FBTyxPQUFPLE9BQU8sZUFBZTtBQUFBLElBQ3RDLEVBQUUsT0FBTyxrQkFBa0IsT0FBTyxpQkFBaUI7QUFBQSxJQUNuRCxFQUFFLE9BQU8sZ0JBQWdCLE9BQU8sZUFBZTtBQUFBLElBQy9DLEVBQUUsT0FBTyxZQUFZLE9BQU8sV0FBVztBQUFBLEVBQ3pDO0FBRUEsV0FBUyxjQUFjLFNBQWtCLFFBQStCO0FBQ3RFLFlBQVEsUUFBUTtBQUFBLE1BQ2QsS0FBSztBQUNILGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxlQUFPLFFBQVEsV0FBVyxvQkFBb0IsUUFBUSxXQUFXO0FBQUEsTUFDbkUsS0FBSztBQUNILGVBQU8sUUFBUSxXQUFXLGtCQUFrQixRQUFRLFdBQVc7QUFBQSxNQUNqRSxLQUFLO0FBQ0gsZUFBTyxXQUFXLFFBQVEsTUFBTTtBQUFBLE1BQ2xDO0FBQ0UsZUFBTztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBRUEsV0FBUyxhQUFhLE9BQWUsUUFBOEI7QUFDakUsVUFBTSxPQUFPLFVBQVUsSUFBSSxZQUFZO0FBQ3ZDLFlBQVEsUUFBUTtBQUFBLE1BQ2QsS0FBSztBQUNILGVBQU8sR0FBRyxTQUFTO0FBQUEsTUFDckIsS0FBSztBQUNILGVBQU8sR0FBRztBQUFBLE1BQ1osS0FBSztBQUNILGVBQU8sR0FBRztBQUFBLE1BQ1osS0FBSztBQUNILGVBQU8sR0FBRztBQUFBLE1BQ1o7QUFDRSxlQUFPLEdBQUcsU0FBUztBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUVBLE1BQU0sa0JBQWtCLENBQUMsWUFBbUM7QUFoRTVEO0FBaUVFLFVBQU0sRUFBRSxhQUFhLFlBQVksSUFBSTtBQUNyQyxVQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQW9CLFNBQVM7QUFDL0QsVUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHdCQUFvQixDQUFDLENBQUM7QUFDdEQsVUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEVBQUU7QUFDbkQsVUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUF1QixLQUFLO0FBRXBFLFVBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLFFBQUksd0JBQXlCLElBQUk7QUFDM0UsVUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEtBQUs7QUFHdEQsVUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBQ2pDLGVBQVcsVUFBVTtBQUVyQixVQUFNLG1CQUFlLDJCQUFZLE1BQVk7QUFDM0MsbUJBQWEsU0FBUztBQUN0QixVQUFJO0FBQ0YsY0FBTSxTQUFTLE1BQU0sYUFBa0MsaUJBQWlCLFdBQVcsT0FBTztBQUMxRixvQkFBWSxPQUFPLElBQUk7QUFDdkIscUJBQWEsT0FBTztBQUFBLE1BQ3RCLFNBQVMsS0FBUDtBQUNBLGNBQU0sVUFDSixlQUFlLFdBQ1gsSUFBSSxVQUNKO0FBQ04sd0JBQWdCLE9BQU87QUFDdkIscUJBQWEsT0FBTztBQUFBLE1BQ3RCO0FBQUEsSUFDRixJQUFHLENBQUMsQ0FBQztBQUVMLGlDQUFVLE1BQU07QUFDZCxtQkFBYTtBQUFBLElBQ2YsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixVQUFNLHNCQUFzQixDQUFDLFlBQXFCO0FBQ2hELHlCQUFtQixPQUFPO0FBQzFCLHNCQUFnQixJQUFJO0FBQUEsSUFDdEI7QUFFQSxVQUFNLHNCQUFzQixDQUFDLFVBQW1CO0FBQzlDLHNCQUFnQixLQUFLO0FBQ3JCLFVBQUksQ0FBQztBQUFPLDJCQUFtQixJQUFJO0FBQUEsSUFDckM7QUFHQSxVQUFNLGlCQUFpQixDQUFDLEdBQUcsUUFBUSxFQUFFO0FBQUEsTUFDbkMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsSUFBSSxJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUTtBQUFBLElBQ3RFO0FBRUEsVUFBTSxtQkFBbUIsZUFBZSxPQUFPLENBQUMsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBRXBGLFdBQ0UsK0NBQUM7QUFBQSxNQUFZLE9BQU07QUFBQSxNQUFVLGFBQVk7QUFBQSxNQUN0QztBQUFBLHNCQUFjLGFBQ2IsK0NBQUM7QUFBQSxVQUNDLEtBQUs7QUFBQSxZQUNILFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxZQUNSLFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFFQTtBQUFBLDBEQUFDO0FBQUEsY0FBUSxNQUFLO0FBQUEsYUFBUTtBQUFBLFlBQ3RCLDhDQUFDO0FBQUEsY0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGNBQUc7QUFBQSxhQUV0RDtBQUFBO0FBQUEsU0FDRjtBQUFBLFFBR0QsY0FBYyxXQUNiLDhDQUFDO0FBQUEsVUFBWSxTQUFTO0FBQUEsU0FBYztBQUFBLFFBR3JDLGNBQWMsV0FDYiwrQ0FBQztBQUFBLFVBQUssUUFBTTtBQUFBLFVBQUMsTUFBSztBQUFBLFVBQ2hCO0FBQUEsMkRBQUM7QUFBQSxjQUNDO0FBQUEsOERBQUM7QUFBQSxrQkFBSSxJQUFHO0FBQUEsa0JBQVc7QUFBQSxpQkFBUTtBQUFBLGdCQUMzQiw4Q0FBQztBQUFBLGtCQUFJLElBQUc7QUFBQSxrQkFBVztBQUFBLGlCQUFRO0FBQUE7QUFBQSxhQUM3QjtBQUFBLFlBQ0EsK0NBQUM7QUFBQSxjQUNDO0FBQUEsOERBQUM7QUFBQSxrQkFBUyxJQUFHO0FBQUEsa0JBQ1gsd0RBQUM7QUFBQSxvQkFBSSxLQUFLLEVBQUUsU0FBUyxTQUFTLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBQSxvQkFDcEQsbUJBQVMsV0FBVyxJQUNuQiw4Q0FBQztBQUFBLHNCQUNDLE9BQU07QUFBQSxzQkFDTixhQUFZO0FBQUEscUJBQ2QsSUFFQTtBQUFBLHNCQUNFO0FBQUEsc0VBQUM7QUFBQSwwQkFDQyxPQUFNO0FBQUEsMEJBQ04sZ0JBQWdCLENBQUMsT0FBTztBQUFBLDBCQUN4QixPQUFPO0FBQUEsMEJBQ1AsVUFBVSxDQUFDLE1BQU0sZ0JBQWdCLEVBQUUsT0FBTyxLQUFxQjtBQUFBLDBCQUU5RCx5QkFBZSxJQUFJLENBQUMsUUFDbkIsOENBQUM7QUFBQSw0QkFBdUIsT0FBTyxJQUFJO0FBQUEsNEJBQ2hDLGNBQUk7QUFBQSw2QkFETSxJQUFJLEtBRWpCLENBQ0Q7QUFBQSx5QkFDSDtBQUFBLHdCQUVBLDhDQUFDO0FBQUEsMEJBQUksS0FBSyxFQUFFLFlBQVksU0FBUyxlQUFlLFFBQVE7QUFBQSwwQkFDdEQsd0RBQUM7QUFBQSw0QkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLDRCQUNoRCx1QkFBYSxpQkFBaUIsUUFBUSxZQUFZO0FBQUEsMkJBQ3JEO0FBQUEseUJBQ0Y7QUFBQSx3QkFFQyxpQkFBaUIsV0FBVyxJQUMzQiw4Q0FBQztBQUFBLDBCQUFJLEtBQUssRUFBRSxTQUFTLFVBQVUsUUFBUSxTQUFTO0FBQUEsMEJBQzlDLHlEQUFDO0FBQUEsNEJBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSw0QkFBRztBQUFBO0FBQUEsK0JBQ2hELG9CQUFlLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxZQUFZLE1BQW5ELG1CQUFzRCxNQUFNO0FBQUEsOEJBQWM7QUFBQTtBQUFBLDJCQUNoRjtBQUFBLHlCQUNGLElBRUEsaUJBQWlCLElBQUksQ0FBQyxZQUNwQiw4Q0FBQztBQUFBLDBCQUVDO0FBQUEsMEJBQ0EsVUFBVSxNQUFNLG9CQUFvQixPQUFPO0FBQUEsMkJBRnRDLFFBQVEsRUFHZixDQUNEO0FBQUE7QUFBQSxxQkFFTDtBQUFBLG1CQUVKO0FBQUEsaUJBQ0Y7QUFBQSxnQkFDQSw4Q0FBQztBQUFBLGtCQUFTLElBQUc7QUFBQSxrQkFDWCx5REFBQztBQUFBLG9CQUFJLEtBQUssRUFBRSxTQUFTLFNBQVM7QUFBQSxvQkFDNUI7QUFBQSxvRUFBQztBQUFBLHdCQUNDLE1BQUs7QUFBQSx3QkFDTCxPQUFNO0FBQUEsd0JBQ04sYUFBWTtBQUFBLHVCQUNkO0FBQUEsc0JBQ0EsOENBQUM7QUFBQSx3QkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLHdCQUFHO0FBQUEsdUJBRXREO0FBQUE7QUFBQSxtQkFDRjtBQUFBLGlCQUNGO0FBQUE7QUFBQSxhQUNGO0FBQUE7QUFBQSxTQUNGO0FBQUEsUUFHRCxtQkFDQyw4Q0FBQztBQUFBLFVBQ0MsU0FBUztBQUFBLFVBQ1Q7QUFBQSxVQUNBLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxTQUNaO0FBQUE7QUFBQSxLQUVKO0FBQUEsRUFFSjtBQUVBLE1BQU8sMEJBQVE7OztBRzFOZixNQUFBQyxjQU1PO0FBT0MsTUFBQUMsdUJBQUE7QUFKUixNQUFNLGNBQWMsQ0FBQyxFQUFFLGFBQWEsWUFBWSxNQUE2QjtBQUMzRSxXQUNFLDhDQUFDO0FBQUEsTUFDQyx5REFBQztBQUFBLFFBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsU0FBUyxTQUFTO0FBQUEsUUFDdkQ7QUFBQSx5REFBQztBQUFBLFlBQUksS0FBSyxFQUFFLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFBQSxZQUNwQztBQUFBLDREQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxZQUFZLFdBQVc7QUFBQSxnQkFBRztBQUFBLGVBRTFEO0FBQUEsY0FDQSw4Q0FBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsT0FBTyxZQUFZO0FBQUEsZ0JBQUc7QUFBQSxlQUV0RDtBQUFBO0FBQUEsV0FDRjtBQUFBLFVBRUEsOENBQUMsdUJBQVE7QUFBQSxVQUVULCtDQUFDO0FBQUEsWUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUztBQUFBLFlBQ3BDO0FBQUEsNERBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLFlBQVksV0FBVztBQUFBLGdCQUFHO0FBQUEsZUFFMUQ7QUFBQSxjQUNBLDhDQUFDO0FBQUEsZ0JBQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxPQUFPLFlBQVk7QUFBQSxnQkFBRztBQUFBLGVBRXREO0FBQUE7QUFBQSxXQUNGO0FBQUEsVUFFQSw4Q0FBQyx1QkFBUTtBQUFBLFVBRVQsK0NBQUM7QUFBQSxZQUFJLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsWUFDcEM7QUFBQSw0REFBQztBQUFBLGdCQUFPLEtBQUssRUFBRSxNQUFNLFdBQVcsWUFBWSxXQUFXO0FBQUEsZ0JBQUc7QUFBQSxlQUUxRDtBQUFBLGNBQ0EsOENBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQUEsZ0JBQUc7QUFBQSxlQUUvQjtBQUFBLGNBQ0EsOENBQUM7QUFBQSxnQkFBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLE9BQU8sWUFBWTtBQUFBLGdCQUFHO0FBQUEsZUFFdEQ7QUFBQTtBQUFBLFdBQ0Y7QUFBQTtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBQUEsRUFFSjtBQUVBLE1BQU8sc0JBQVE7OztBbkJoRGYsK0JBQWM7QUFDUCxNQUFNLGFBQWE7QUFVMUIsTUFBTyxtQkFBUTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2I7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsUUFDZCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsTUFDckIsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLE1BQ2QsMkJBQTJCO0FBQUEsUUFDekIsZUFBZTtBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLEVBQ2I7IiwKICAibmFtZXMiOiBbImZldGNoIiwgImZldGNoU3RyaXBlU2lnbmF0dXJlIiwgInJlcXVpcmVfc2lnbmF0dXJlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIl9hIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImZvcm1hdEFtb3VudCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
