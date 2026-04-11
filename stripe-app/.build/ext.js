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
    onFileChange
  }) => {
    const whyExpanded = expandedSections.has("why");
    const whereExpanded = expandedSections.has("where");
    const notesExpanded = expandedSections.has("notes");
    const fileExpanded = expandedSections.has("file");
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
              disabled: isUnavailable || isPositive,
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
                    !isUnavailable && !isPositive && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, {
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
        notesExpanded && !isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
          css: { marginLeft: "xlarge" },
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.TextArea, {
            label: "Your notes",
            placeholder: "e.g. tracking #, file name, where to find this...",
            value: notes,
            onChange: (e) => onNotesChange(e.target.value),
            rows: 2
          })
        }),
        fileExpanded && !isUnavailable && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Box, {
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
      default:
        return null;
    }
  }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EZWFkbGluZVRpbWVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL2V2aWRlbmNlL0V2aWRlbmNlQ2hlY2tsaXN0LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9ldmlkZW5jZS9DaGVja2xpc3RQcm9ncmVzcy50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvQ2hlY2tsaXN0SXRlbS50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvZXZpZGVuY2UvRmlsZVVwbG9hZFNlY3Rpb24udHN4IiwgIi4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVDYXJkLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeCIsICIuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU0RLX1ZFUlNJT04gPSB2b2lkIDA7XG5leHBvcnRzLlNES19WRVJTSU9OID0gJzkuMS4wJztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFibGVIZWFkZXJDZWxsID0gZXhwb3J0cy5UYWJsZUhlYWQgPSBleHBvcnRzLlRhYmxlRm9vdGVyID0gZXhwb3J0cy5UYWJsZUNlbGwgPSBleHBvcnRzLlRhYmxlQm9keSA9IGV4cG9ydHMuVGFiID0gZXhwb3J0cy5UYWJQYW5lbHMgPSBleHBvcnRzLlRhYlBhbmVsID0gZXhwb3J0cy5UYWJMaXN0ID0gZXhwb3J0cy5Td2l0Y2ggPSBleHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGV4cG9ydHMuU3Bpbm5lciA9IGV4cG9ydHMuU3BhcmtsaW5lID0gZXhwb3J0cy5TaWduSW5WaWV3ID0gZXhwb3J0cy5TZXR0aW5nc1ZpZXcgPSBleHBvcnRzLlNlbGVjdCA9IGV4cG9ydHMuUmFkaW8gPSBleHBvcnRzLlByb3BlcnR5TGlzdCA9IGV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBleHBvcnRzLk1lbnUgPSBleHBvcnRzLk1lbnVJdGVtID0gZXhwb3J0cy5NZW51R3JvdXAgPSBleHBvcnRzLkxpc3QgPSBleHBvcnRzLkxpc3RJdGVtID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5MaW5lQ2hhcnQgPSBleHBvcnRzLklubGluZSA9IGV4cG9ydHMuSW1nID0gZXhwb3J0cy5JY29uID0gZXhwb3J0cy5Gb3JtRmllbGRHcm91cCA9IGV4cG9ydHMuRm9jdXNWaWV3ID0gZXhwb3J0cy5EaXZpZGVyID0gZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBleHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBleHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBleHBvcnRzLkRhdGVGaWVsZCA9IGV4cG9ydHMuQ29udGV4dFZpZXcgPSBleHBvcnRzLkNoaXAgPSBleHBvcnRzLkNoaXBMaXN0ID0gZXhwb3J0cy5DaGVja2JveCA9IGV4cG9ydHMuQnV0dG9uID0gZXhwb3J0cy5CdXR0b25Hcm91cCA9IGV4cG9ydHMuQm94ID0gZXhwb3J0cy5CYXJDaGFydCA9IGV4cG9ydHMuQmFubmVyID0gZXhwb3J0cy5CYWRnZSA9IGV4cG9ydHMuQWNjb3JkaW9uID0gZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gdm9pZCAwO1xuZXhwb3J0cy5Ub29sdGlwID0gZXhwb3J0cy5UZXh0RmllbGQgPSBleHBvcnRzLlRleHRBcmVhID0gZXhwb3J0cy5UYXNrTGlzdCA9IGV4cG9ydHMuVGFza0xpc3RJdGVtID0gZXhwb3J0cy5UYWJzID0gZXhwb3J0cy5UYWJsZVJvdyA9IGV4cG9ydHMuVGFibGUgPSB2b2lkIDA7XG5jb25zdCBqc3hfcnVudGltZV8xID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJAcmVtb3RlLXVpL3JlYWN0XCIpO1xuY29uc3QgdmVyc2lvbl8xID0gcmVxdWlyZShcIi4uL3ZlcnNpb25cIik7XG5jb25zdCB3aXRoU2RrUHJvcHMgPSAoQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgV2l0aFNka1Byb3BzID0gKHByb3BzKSA9PiAoKDAsIGpzeF9ydW50aW1lXzEuanN4KShDb21wb25lbnQsIHsgLi4ucHJvcHMsIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSwgc2RrVmVyc2lvbjogdmVyc2lvbl8xLlNES19WRVJTSU9OLCBzY2hlbWFWZXJzaW9uOiBcInY5XCIgfSkpO1xuICAgIFdpdGhTZGtQcm9wcy53cmFwcGVkQ29tcG9uZW50TmFtZSA9IHdyYXBwZWRDb21wb25lbnROYW1lO1xuICAgIHJldHVybiBXaXRoU2RrUHJvcHM7XG59O1xuY29uc3QgZGVmaW5lQ29tcG9uZW50ID0gKG5hbWUsIGZyYWdtZW50UHJvcHMsIHdyYXBXaXRoU2RrUHJvcHMpID0+IHtcbiAgICBjb25zdCByZW1vdGVDb21wb25lbnQgPSAoMCwgcmVhY3RfMS5jcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCkobmFtZSwge1xuICAgICAgICBmcmFnbWVudFByb3BzLFxuICAgIH0pO1xuICAgIGlmICghd3JhcFdpdGhTZGtQcm9wcykge1xuICAgICAgICByZXR1cm4gcmVtb3RlQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aFNka1Byb3BzKHJlbW90ZUNvbXBvbmVudCk7XG59O1xuZXhwb3J0cy5BY2NvcmRpb25JdGVtID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb25JdGVtJywgWyd0aXRsZScsICdhY3Rpb25zJywgJ21lZGlhJywgJ3N1YnRpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5BY2NvcmRpb24gPSBkZWZpbmVDb21wb25lbnQoJ0FjY29yZGlvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFkZ2UgPSBkZWZpbmVDb21wb25lbnQoJ0JhZGdlJywgW10sIHRydWUpO1xuZXhwb3J0cy5CYW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ0Jhbm5lcicsIFsnYWN0aW9ucycsICdkZXNjcmlwdGlvbicsICd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQmFyQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0JhckNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5Cb3ggPSBkZWZpbmVDb21wb25lbnQoJ0JveCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0J1dHRvbkdyb3VwJywgWydtZW51VHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuQnV0dG9uID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoZWNrYm94ID0gZGVmaW5lQ29tcG9uZW50KCdDaGVja2JveCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXBMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdDaGlwTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ2hpcCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ29udGV4dFZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0NvbnRleHRWaWV3JywgWydhY3Rpb25zJywgJ2Jhbm5lcicsICdmb290ZXJDb250ZW50JywgJ3ByaW1hcnlBY3Rpb24nLCAnc2Vjb25kYXJ5QWN0aW9uJ10sIHRydWUpO1xuZXhwb3J0cy5EYXRlRmllbGQgPSBkZWZpbmVDb21wb25lbnQoJ0RhdGVGaWVsZCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VNb2R1bGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VNb2R1bGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VQcm9wZXJ0eUxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRldGFpbFBhZ2VUYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZVRhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EaXZpZGVyID0gZGVmaW5lQ29tcG9uZW50KCdEaXZpZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Gb2N1c1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ0ZvY3VzVmlldycsIFsnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ0Zvcm1GaWVsZEdyb3VwJywgW10sIHRydWUpO1xuZXhwb3J0cy5JY29uID0gZGVmaW5lQ29tcG9uZW50KCdJY29uJywgW10sIHRydWUpO1xuZXhwb3J0cy5JbWcgPSBkZWZpbmVDb21wb25lbnQoJ0ltZycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW5saW5lID0gZGVmaW5lQ29tcG9uZW50KCdJbmxpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpbmVDaGFydCA9IGRlZmluZUNvbXBvbmVudCgnTGluZUNoYXJ0JywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5rID0gZGVmaW5lQ29tcG9uZW50KCdMaW5rJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnTGlzdEl0ZW0nLCBbJ2ljb24nLCAnaW1hZ2UnLCAnc2Vjb25kYXJ5VGl0bGUnLCAndGl0bGUnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVHcm91cCA9IGRlZmluZUNvbXBvbmVudCgnTWVudUdyb3VwJywgWyd0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuTWVudUl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ01lbnVJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51ID0gZGVmaW5lQ29tcG9uZW50KCdNZW51JywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuZXhwb3J0cy5PbmJvYXJkaW5nVmlldyA9IGRlZmluZUNvbXBvbmVudCgnT25ib2FyZGluZ1ZpZXcnLCBbJ2Vycm9yJ10sIHRydWUpO1xuZXhwb3J0cy5QbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdQbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5Qcm9wZXJ0eUxpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3RJdGVtJywgWydsYWJlbCcsICd2YWx1ZSddLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdQcm9wZXJ0eUxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlJhZGlvID0gZGVmaW5lQ29tcG9uZW50KCdSYWRpbycsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNlbGVjdCA9IGRlZmluZUNvbXBvbmVudCgnU2VsZWN0JywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTZXR0aW5nc1ZpZXcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNpZ25JblZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1NpZ25JblZpZXcnLCBbJ2Rlc2NyaXB0aW9uQWN0aW9uQ29udGVudHMnLCAnZm9vdGVyQ29udGVudCddLCB0cnVlKTtcbmV4cG9ydHMuU3BhcmtsaW5lID0gZGVmaW5lQ29tcG9uZW50KCdTcGFya2xpbmUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlNwaW5uZXIgPSBkZWZpbmVDb21wb25lbnQoJ1NwaW5uZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlN0cmlwZUZpbGVVcGxvYWRlciA9IGRlZmluZUNvbXBvbmVudCgnU3RyaXBlRmlsZVVwbG9hZGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5Td2l0Y2ggPSBkZWZpbmVDb21wb25lbnQoJ1N3aXRjaCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYkxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1RhYkxpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiUGFuZWxzID0gZGVmaW5lQ29tcG9uZW50KCdUYWJQYW5lbHMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYiA9IGRlZmluZUNvbXBvbmVudCgnVGFiJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUJvZHkgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlQm9keScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVDZWxsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUNlbGwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlRm9vdGVyID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUZvb3RlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVIZWFkID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUhlYWQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkZXJDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZSA9IGRlZmluZUNvbXBvbmVudCgnVGFibGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlUm93ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZVJvdycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFicyA9IGRlZmluZUNvbXBvbmVudCgnVGFicycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFza0xpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdEl0ZW0nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYXNrTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEFyZWEgPSBkZWZpbmVDb21wb25lbnQoJ1RleHRBcmVhJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVGV4dEZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0RmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5Ub29sdGlwID0gZGVmaW5lQ29tcG9uZW50KCdUb29sdGlwJywgWyd0cmlnZ2VyJ10sIHRydWUpO1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogUHJpdmF0ZSEgVGhpcyBhbGxvd3MgdGhlIHNoYXJlZCBlbmRwb2ludCB0byBiZSBpbnRpYWxpemVkXG4gKiBzbyB0aGF0IHRoZSBTREsgY2FuIGNvbW11bmljYXRlIHdpdGggdGhlIERhc2hib2FyZC5cbiAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRIb3N0RW5kcG9pbnQgPSB2b2lkIDA7XG5jb25zdCBpbnZhcmlhbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaW52YXJpYW50XCIpKTtcbmNvbnN0IGdldEhvc3RFbmRwb2ludCA9ICgpID0+IHtcbiAgICAvLyBUaGlzIGlzIGVuZHBvaW50IGlzIGNyZWF0ZWQgZnJvbSB0aGUgTWVzc2FnZVBvcnQgdHJhbnNmZXJyZWQgZnJvbSB0aGUgaG9zdCBlbnZcbiAgICAvLyBhcyBhIHBhcnQgb2YgdGhlIGBpbml0X2V4dGVuc2lvbmAgbWVzc2FnZS5cbiAgICBjb25zdCBob3N0RW5kcG9pbnQgPSBnbG9iYWxUaGlzLl9fU3RyaXBlRXh0RXhwb3J0cz8uZW5kcG9pbnQ7XG4gICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKGhvc3RFbmRwb2ludCwgJ2hvc3RFbmRwb2ludCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQnKTtcbiAgICByZXR1cm4gaG9zdEVuZHBvaW50O1xufTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gZ2V0SG9zdEVuZHBvaW50O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSB2b2lkIDA7XG5jb25zdCBfZW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuLi9fZW5kcG9pbnRcIik7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpXG4gICAgLmNhbGwuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KClcbiAgICAudGhlbigoc3VwcG9ydGVkKSA9PiBzdXBwb3J0ZWQpXG4gICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hBcHBFbWJlZGRlZEtleSgpO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGFwcCBlbWJlZGRlZCBrZXknKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaUtleTtcbn07XG5leHBvcnRzLmZldGNoQXBwRW1iZWRkZWRLZXkgPSBmZXRjaEFwcEVtYmVkZGVkS2V5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gdm9pZCAwO1xuY29uc3QgZmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vZmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWUgPSBhc3luYyAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBhcGlLZXkgPSBhd2FpdCAoMCwgZmV0Y2hBcHBFbWJlZGRlZEtleV8xLmZldGNoQXBwRW1iZWRkZWRLZXkpKCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGluaXQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgY29uc3Qgc2VyaWFsaXphYmxlUmVzcG9uc2UgPSB7XG4gICAgICAgIGpzb246IHVuZGVmaW5lZCxcbiAgICAgICAgYXJyYXlCdWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb2s6IHJlc3BvbnNlLm9rLFxuICAgICAgICByZWRpcmVjdGVkOiByZXNwb25zZS5yZWRpcmVjdGVkLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgdHlwZTogcmVzcG9uc2UudHlwZSxcbiAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgfTtcbiAgICBzd2l0Y2ggKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkge1xuICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZVJlc3BvbnNlLmFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc2VyaWFsaXphYmxlUmVzcG9uc2U7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUZyYW1lID0gZmV0Y2hWaWFGcmFtZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFIb3N0ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0ID0gYXN5bmMgKGVuY29kZWRVcmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5jb2RlZFVybCk7XG4gICAgcmV0dXJuICgwLCBfZW5kcG9pbnRfMS5nZXRIb3N0RW5kcG9pbnQpKCkuY2FsbC5zdHJpcGVBcGlGZXRjaCh1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCBvcHRpb25zKTtcbn07XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IGZldGNoVmlhSG9zdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGZldGNoVmlhRnJhbWVfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhRnJhbWVcIik7XG5jb25zdCBmZXRjaFZpYUhvc3RfMSA9IHJlcXVpcmUoXCIuL2ZldGNoVmlhSG9zdFwiKTtcbmxldCBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gbnVsbDtcbmNvbnN0IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCkge1xuICAgICAgICBzZWxlY3RlZFN0cmlwZUFwaUZldGNoID0gKGF3YWl0ICgwLCBzdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlfMS5zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXkpKCkpXG4gICAgICAgICAgICA/IGZldGNoVmlhRnJhbWVfMS5mZXRjaFZpYUZyYW1lXG4gICAgICAgICAgICA6IGZldGNoVmlhSG9zdF8xLmZldGNoVmlhSG9zdDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkU3RyaXBlQXBpRmV0Y2g7XG59O1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IHZvaWQgMDtcbnZhciBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDsgfSB9KTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IHN0cmlwZUFwaUZldGNoID0gYXN5bmMgKHBhdGgsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcmVmZXJyZWRGZXRjaE1ldGhvZCA9IGF3YWl0ICgwLCBhcGlfMS5zZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCkoKTtcbiAgICByZXR1cm4gcHJlZmVycmVkRmV0Y2hNZXRob2QocGF0aCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5zdHJpcGVBcGlGZXRjaCA9IHN0cmlwZUFwaUZldGNoO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSBleHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBleHBvcnRzLlNUUklQRV9BUElfS0VZID0gZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IHZvaWQgMDtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBIdHRwQ2xpZW50IHRoYXQgY2FuIGJlIHBsdWdnZWQgaW50byBzdHJpcGUtbm9kZVxuICogdGhhdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHVzZSBzdHJpcGUtbm9kZSBpbiBleHRlbnNpb25zIGlmIHRoZSBEYXNoYm9hcmRcbiAqIHByb3ZpZGVzIGEgYHN0cmlwZUFwaUZldGNoYCBmdW5jdGlvbiB0aGF0IHdpbGwgcmVsYXkgQVBJIGNhbGxzIHRocm91Z2ggdGhlXG4gKiBEYXNoYm9hcmQgYW5kIHBpZ2d5IGJhY2sgb24gdGhlIHVzZXIncyBEYXNoYm9hcmQgc2Vzc2lvbi5cbiAqL1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBhcGlGZXRjaF8xID0gcmVxdWlyZShcIi4vYXBpRmV0Y2hcIik7XG5jb25zdCBtYXRjaGVzU3RyaXBlS2V5ID0gL1twc11rXyh0ZXN0fGxpdmUpX1tBLVphLXowLTldKy87XG5jbGFzcyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNwKSB7XG4gICAgICAgIHRoaXMuX3Jlc3AgPSByZXNwO1xuICAgIH1cbiAgICBnZXRIZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5oZWFkZXJzO1xuICAgIH1cbiAgICBnZXRTdGF0dXNDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcC5zdGF0dXM7XG4gICAgfVxuICAgIGdldFJhd1Jlc3BvbnNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICB0b1N0cmVhbSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJlYW1zIGhhdmUgbm90IGJlZW4gaW1wbGVtZW50ZWQgaW4gdGhlIFN0cmlwZSBIVFRQIGNsaWVudCcpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgeyBqc29uIH0gPSB0aGlzLl9yZXNwO1xuICAgICAgICBpZiAoanNvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdSZXNwb25zZSBib2R5IHVuZGVmaW5lZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdHJpcGVBcHBzSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoZmV0Y2gpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBnZXRDbGllbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3N0cmlwZS11aS1leHRlbnNpb24nO1xuICAgIH1cbiAgICBhc3luYyBtYWtlUmVxdWVzdChob3N0LCBwb3J0LCBwYXRoLCBtZXRob2QsIGhlYWRlcnMsIHJlcXVlc3REYXRhLCBwcm90b2NvbCwgX3RpbWVvdXQpIHtcbiAgICAgICAgKDAsIGludmFyaWFudF8xLmRlZmF1bHQpKHByb3RvY29sID09PSAnaHR0cHMnLCAnTXVzdCB1c2UgaHR0cHMgY29ubmVjdGlvbnMgaW4gVUkgZXh0ZW5zaW9ucycpO1xuICAgICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAocmVxdWVzdERhdGEpIHtcbiAgICAgICAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gcmVxdWVzdERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGhlYWRlcnMuQXV0aG9yaXphdGlvbjtcbiAgICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgbWF0Y2hlc1N0cmlwZUtleS50ZXN0KGF1dGhIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgYWN0dWFsIHN0cmlwZSBrZXlzIHdoZW4gdXNpbmcgdGhlIFN0cmlwZSBKUyBBUEkgY2xpZW50IHdpdGggVUkgZXh0ZXNpb25zLlxcblxcbiBJbnN0ZWFkLCB1c2UgYFNUUklQRV9BUElfS0VZYCBmcm9tIGBAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvaHR0cF9jbGllbnRgIGFzIGEgcGxhY2Vob2xkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBgJHtwcm90b2NvbH06Ly8ke2hvc3R9YCk7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9mZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKTtcbiAgICAgICAgLy8gVE9ETzogQWRkIHN1cHBvcnQgZm9yIHRpbWVvdXRzLlxuICAgICAgICByZXR1cm4gbmV3IFN0cmlwZUFwcHNIdHRwUmVzcG9uc2UocmVzcCk7XG4gICAgfVxufVxuZXhwb3J0cy5TdHJpcGVBcHBzSHR0cENsaWVudCA9IFN0cmlwZUFwcHNIdHRwQ2xpZW50O1xuLy8gRE8gTk9UIGNoYW5nZSB0aGlzIHN0cmluZyB3aXRob3V0IGEgZGVwcmVjYXRpb24gcGxhbi4gVGhlIHJ1bnRpbWUgY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoaXNcbi8vIGV4YWN0IHN0cmluZyBpcyBwYXNzZWQsIG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuLy8gU2VlOiBtYW5hZ2UvZnJvbnRlbmQvc3JjL3RhaWxvci9leHRlbnNpb25zL2hvc3QvYXBpX2ZldGNoLmpzXG5leHBvcnRzLlNUUklQRV9BUElfS0VZID0gJ0RPX05PVF9QQVNTX0FfUkVBTF9BUElfS0VZJztcbmNvbnN0IGNyZWF0ZUh0dHBDbGllbnQgPSAoKSA9PiBuZXcgU3RyaXBlQXBwc0h0dHBDbGllbnQoYXBpRmV0Y2hfMS5zdHJpcGVBcGlGZXRjaCk7XG5leHBvcnRzLmNyZWF0ZUh0dHBDbGllbnQgPSBjcmVhdGVIdHRwQ2xpZW50O1xuZXhwb3J0cy5BVVRIT1JJWkFUSU9OX0hFQURFUiA9ICdBdXRob3JpemF0aW9uJztcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9WQUxVRSA9IGBCZWFyZXIgJHtleHBvcnRzLlNUUklQRV9BUElfS0VZfWA7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSB2b2lkIDA7XG5jb25zdCBodHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi4vaHR0cENsaWVudFwiKTtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoeyBob3N0LCBwb3J0IH0pID0+IGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cHM6Ly8ke2hvc3R9OiR7cG9ydH0vdjEvYXBwcy9hcHBfZW1iZWRkZWRfYmFja2VuZF9zaWduYXR1cmVgKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncGF5bG9hZCcsIEpTT04uc3RyaW5naWZ5KHsgLi4ucGF5bG9hZCB9KSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2luY2x1ZGVfb25seVtdJywgJ3NpZ25hdHVyZScpO1xuICAgIGNvbnN0IGNsaWVudCA9ICgwLCBodHRwQ2xpZW50XzEuY3JlYXRlSHR0cENsaWVudCkoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGNsaWVudC5tYWtlUmVxdWVzdChob3N0LCBwb3J0LCB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoLCAnR0VUJywge30sIG51bGwsICdodHRwcycpO1xuICAgIHJldHVybiByZXNwb25zZVxuICAgICAgICAudGhlbigocikgPT4gci50b0pTT04oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuc2lnbmF0dXJlKTtcbn07XG5leHBvcnRzLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRDb25uZWN0aW9uU2V0dGluZ3MgPSBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHZvaWQgMDtcbmNvbnN0IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgaG9zdDogJ2FwaS5zdHJpcGUuY29tJyxcbiAgICBwb3J0OiA0NDMsXG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0gZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncztcbmNvbnN0IHNldENvbm5lY3Rpb25TZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIGV4cG9ydHMuY29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgICAgICAuLi5kZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzLFxuICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gc2V0Q29ubmVjdGlvblNldHRpbmdzO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IHZvaWQgMDtcbmNvbnN0IGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMSA9IHJlcXVpcmUoXCIuL3NpZ25hdHVyZS9jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9hcGkvc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XCIpO1xuY29uc3QgY29ubmVjdGlvblNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzXCIpO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9fZW5kcG9pbnRcIik7XG5jb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGFzeW5jIChhZGRpdGlvbmFsUGF5bG9hZCkgPT4ge1xuICAgIGlmIChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKSB7XG4gICAgICAgIGNvbnN0IGZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkgPSAoMCwgY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseV8xLmNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkpKGNvbm5lY3Rpb25TZXR0aW5nc18xLmNvbm5lY3Rpb25TZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuZmV0Y2hTdHJpcGVTaWduYXR1cmUoYWRkaXRpb25hbFBheWxvYWQpO1xuICAgIH1cbn07XG5leHBvcnRzLmZldGNoU3RyaXBlU2lnbmF0dXJlID0gZmV0Y2hTdHJpcGVTaWduYXR1cmU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBUaGlzIGZpbGUgbW92ZWQgdG8gdXRpbHM7IHJlLWV4cG9ydGVkIHRvIG5vdCBicmVhayBpbXBvcnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzaWduYXR1cmVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NpZ25hdHVyZVwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpZ25hdHVyZV8xLmZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIi8vIEFVVE9HRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG5pbXBvcnQgUGF5bWVudERpc3B1dGVWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcnO2ltcG9ydCBEaXNwdXRlTGlzdFZpZXcgZnJvbSAnLi4vc3JjL3ZpZXdzL0Rpc3B1dGVMaXN0Vmlldyc7aW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4uL3NyYy92aWV3cy9BcHBTZXR0aW5ncyc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjYtMDQtMDUgMTY6NDg6MjkuMTk1ODg2IC0wNzAwIFBEVCBtPSswLjAxODM2ODEyNic7XG5cbmV4cG9ydCB7IFxuICBQYXltZW50RGlzcHV0ZVZpZXcsXG5cbiAgRGlzcHV0ZUxpc3RWaWV3LFxuXG4gIEFwcFNldHRpbmdzXG4gfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL3N0cmlwZS5jb20vc3RyaXBlLWFwcC5zY2hlbWEuanNvblwiLFxuICBcImljb25cIjogXCJcIixcbiAgXCJpZFwiOiBcImNvbS5qa2J0ZWNoLndpbmJhY2tcIixcbiAgXCJuYW1lXCI6IFwiV2luQmFja1wiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgZGlzcHV0ZSBkZXRhaWxzIHRvIGd1aWRlIG1lcmNoYW50cyB0aHJvdWdoIHRoZSByZXNwb25zZSBwcm9jZXNzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImRpc3B1dGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlN1Ym1pdCBldmlkZW5jZSBhbmQgcmVzcG9uc2VzIG9uIGJlaGFsZiBvZiB0aGUgbWVyY2hhbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiY2hhcmdlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY2hhcmdlIGRldGFpbHMgYXNzb2NpYXRlZCB3aXRoIGRpc3B1dGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImN1c3RvbWVyX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgY3VzdG9tZXIgaW5mb3JtYXRpb24gZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJmaWxlX3JlYWRcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlJlYWQgdXBsb2FkZWQgZXZpZGVuY2UgZmlsZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV93cml0ZVwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiVXBsb2FkIGV2aWRlbmNlIGZpbGVzIGZvciBkaXNwdXRlIHJlc3BvbnNlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJwYXltZW50X2ludGVudF9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHBheW1lbnQgaW50ZW50IGRldGFpbHMgZm9yIGRpc3B1dGUgY29udGV4dFwiXG4gICAgfVxuICBdLFxuICBcInBvc3RfaW5zdGFsbF9hY3Rpb25cIjoge1xuICAgIFwidHlwZVwiOiBcInNldHRpbmdzXCJcbiAgfSxcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93aW5iYWNrcGF5LmNvbS9hcGkvXCIsXG4gICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9cIlxuICAgICAgXSxcbiAgICAgIFwicHVycG9zZVwiOiBcIlwiXG4gICAgfSxcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJQYXltZW50RGlzcHV0ZVZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQucGF5bWVudC5kZXRhaWxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJEaXNwdXRlTGlzdFZpZXdcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuZHJhd2VyLmRlZmF1bHRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJBcHBTZXR0aW5nc1wiLFxuICAgICAgICBcInZpZXdwb3J0XCI6IFwic2V0dGluZ3NcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxufTtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCYWRnZSxcbiAgQnV0dG9uLFxuICBDb250ZXh0VmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxufSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgRGlzcHV0ZVdvcmtmbG93IGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZVdvcmtmbG93JztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB0eXBlIHsgRGlzcHV0ZSB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdGF0dXNCYWRnZSwgZ2V0UmVhc29uQ29kZUxhYmVsIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAnbm9fZGlzcHV0ZScgfCAnZXJyb3InIHwgJ3JlYWR5JztcblxuY29uc3QgUGF5bWVudERpc3B1dGVWaWV3ID0gKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCB7IGVudmlyb25tZW50IH0gPSBjb250ZXh0O1xuICBjb25zdCBwYXltZW50SW50ZW50SWQgPSBlbnZpcm9ubWVudD8ub2JqZWN0Q29udGV4dD8uaWQ7XG5cbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2Rpc3B1dGUsIHNldERpc3B1dGVdID0gdXNlU3RhdGU8RGlzcHV0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd1dvcmtmbG93LCBzZXRTaG93V29ya2Zsb3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIGNvbnN0IGxvYWREaXNwdXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcGF5bWVudEludGVudElkKSB7XG4gICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWaWV3U3RhdGUoJ2xvYWRpbmcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvYnktcGF5bWVudC1pbnRlbnQvJHtwYXltZW50SW50ZW50SWR9YCxcbiAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgKTtcbiAgICAgIHNldERpc3B1dGUocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdyZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICBzZXRWaWV3U3RhdGUoJ25vX2Rpc3B1dGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtwYXltZW50SW50ZW50SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlKCk7XG4gIH0sIFtsb2FkRGlzcHV0ZV0pO1xuXG4gIGlmICh2aWV3U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ25vX2Rpc3B1dGUnIHx8IHZpZXdTdGF0ZSA9PT0gJ2Vycm9yJyB8fCAhZGlzcHV0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBhbGlnblg6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTm8gZGlzcHV0ZSBvbiB0aGlzIHBheW1lbnQuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Db250ZXh0Vmlldz5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHJlYXNvbkxhYmVsID0gZ2V0UmVhc29uQ29kZUxhYmVsKGRpc3B1dGUubmV0d29yaywgZGlzcHV0ZS5yZWFzb25fY29kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCI+XG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgICAgIGdhcDogJ3NtYWxsJyxcbiAgICAgICAgICAgIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGFsaWduWTogJ2NlbnRlcicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIERpc3B1dGVcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAge3JlYXNvbkxhYmVsID8/IGRpc3B1dGUucmVhc29uLnJlcGxhY2UoL18vZywgJyAnKX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgICBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9eycgJ31cbiAgICAgICAgICAgIHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICB7KGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8XG4gICAgICAgICAgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX25lZWRzX3Jlc3BvbnNlJykgJiYgKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNzcz17eyB3aWR0aDogJ2ZpbGwnIH19XG4gICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRTaG93V29ya2Zsb3codHJ1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgT3BlbiBpbiBXaW5CYWNrXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cblxuICAgICAgPERpc3B1dGVXb3JrZmxvd1xuICAgICAgICBkaXNwdXRlPXtkaXNwdXRlfVxuICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICBzaG93bj17c2hvd1dvcmtmbG93fVxuICAgICAgICBzZXRTaG93bj17c2V0U2hvd1dvcmtmbG93fVxuICAgICAgLz5cbiAgICA8L0NvbnRleHRWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGF5bWVudERpc3B1dGVWaWV3O1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBCYW5uZXIsXG4gIEZvY3VzVmlldyxcbiAgSW5saW5lLFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgV2l6YXJkU3RlcCwgRGlzcHV0ZSwgUGxheWJvb2tEYXRhIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IFdJWkFSRF9TVEVQUywgV0laQVJEX1NURVBfTEFCRUxTIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGdldERheXNSZW1haW5pbmcsIGlzUmVzb2x2ZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4vRXJyb3JCYW5uZXInO1xuaW1wb3J0IERlYWRsaW5lVGltZXIgZnJvbSAnLi9EZWFkbGluZVRpbWVyJztcbmltcG9ydCBEaXNwdXRlT3ZlcnZpZXcgZnJvbSAnLi9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3JztcbmltcG9ydCBDb2FjaEhlYWRlciBmcm9tICcuL3Jldmlldy9Db2FjaEhlYWRlcic7XG5pbXBvcnQgUXVpY2tBY3Rpb25zIGZyb20gJy4vcmV2aWV3L1F1aWNrQWN0aW9ucyc7XG5pbXBvcnQgTGVhcm5Nb3JlIGZyb20gJy4vcmV2aWV3L0xlYXJuTW9yZSc7XG5pbXBvcnQgRXZpZGVuY2VDaGVja2xpc3QgZnJvbSAnLi9ldmlkZW5jZS9FdmlkZW5jZUNoZWNrbGlzdCc7XG5cbmludGVyZmFjZSBEaXNwdXRlV29ya2Zsb3dQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgc2hvd246IGJvb2xlYW47XG4gIHNldFNob3duOiAoc2hvd246IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbmNvbnN0IERpc3B1dGVXb3JrZmxvdyA9ICh7IGRpc3B1dGU6IGluaXRpYWxEaXNwdXRlLCBjb250ZXh0LCBzaG93biwgc2V0U2hvd24gfTogRGlzcHV0ZVdvcmtmbG93UHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRTdGVwLCBzZXRDdXJyZW50U3RlcF0gPSB1c2VTdGF0ZTxXaXphcmRTdGVwPigncmV2aWV3Jyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGU+KGluaXRpYWxEaXNwdXRlKTtcbiAgY29uc3QgW3BsYXlib29rLCBzZXRQbGF5Ym9va10gPSB1c2VTdGF0ZTxQbGF5Ym9va0RhdGEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBib29sZWFuOyBwbGF5Ym9vazogYm9vbGVhbiB9Pih7XG4gICAgZGlzcHV0ZTogZmFsc2UsXG4gICAgcGxheWJvb2s6IGZhbHNlLFxuICB9KTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPHsgZGlzcHV0ZTogc3RyaW5nIHwgbnVsbDsgcGxheWJvb2s6IHN0cmluZyB8IG51bGwgfT4oe1xuICAgIGRpc3B1dGU6IG51bGwsXG4gICAgcGxheWJvb2s6IG51bGwsXG4gIH0pO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93bikgcmV0dXJuO1xuXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh7IGRpc3B1dGU6IHRydWUsIHBsYXlib29rOiB0cnVlIH0pO1xuICAgICAgc2V0RXJyb3JzKHsgZGlzcHV0ZTogbnVsbCwgcGxheWJvb2s6IG51bGwgfSk7XG5cbiAgICAgIC8vIEZldGNoIGVucmljaGVkIGRpc3B1dGUgYW5kIHBsYXlib29rIGluIHBhcmFsbGVsXG4gICAgICAvLyBTa2lwIHBsYXlib29rIGZldGNoIGlmIHJlYXNvbl9jb2RlIGlzIGVtcHR5ICh0ZXN0IGRpc3B1dGVzLCB1bmtub3duIGNvZGVzKVxuICAgICAgY29uc3Qgc2hvdWxkRmV0Y2hQbGF5Ym9vayA9ICEhaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGU7XG4gICAgICBjb25zdCBbZGlzcHV0ZVJlc3VsdCwgcGxheWJvb2tSZXN1bHRdID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKFtcbiAgICAgICAgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihgL2FwaS9kaXNwdXRlcy8ke2luaXRpYWxEaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCksXG4gICAgICAgIHNob3VsZEZldGNoUGxheWJvb2tcbiAgICAgICAgICA/IGZldGNoQmFja2VuZDx7IGRhdGE6IFBsYXlib29rRGF0YSB9PignL2FwaS9wbGF5Ym9va3MnLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICAgICAgbmV0d29yazogaW5pdGlhbERpc3B1dGUubmV0d29yayxcbiAgICAgICAgICAgICAgcmVhc29uX2NvZGU6IGluaXRpYWxEaXNwdXRlLnJlYXNvbl9jb2RlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBBcGlFcnJvcignTm8gcmVhc29uIGNvZGUnLCA0MDQpKSxcbiAgICAgIF0pO1xuXG4gICAgICBpZiAoZGlzcHV0ZVJlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldERpc3B1dGUoZGlzcHV0ZVJlc3VsdC52YWx1ZS5kYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGRpc3B1dGVSZXN1bHQucmVhc29uO1xuICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBkaXNwdXRlOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGUgZGV0YWlscy4nLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBkaXNwdXRlOiBmYWxzZSB9KSk7XG5cbiAgICAgIGlmIChwbGF5Ym9va1Jlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldFBsYXlib29rKHBsYXlib29rUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gcGxheWJvb2tSZXN1bHQucmVhc29uO1xuICAgICAgICAvLyA0MDQgaXMgbm90IGFuIGVycm9yIC0tIGp1c3QgbWVhbnMgbm8gcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGVcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSkge1xuICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5Ym9vazogZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBwbGF5Ym9vay4nLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQbGF5Ym9vayhudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlib29rOiBmYWxzZSB9KSk7XG4gICAgfTtcblxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbc2hvd24sIGluaXRpYWxEaXNwdXRlLmlkLCBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLCBpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZV0pO1xuXG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IFdJWkFSRF9TVEVQUy5pbmRleE9mKGN1cnJlbnRTdGVwKTtcbiAgY29uc3QgaXNGaXJzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IDA7XG4gIGNvbnN0IGlzTGFzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IFdJWkFSRF9TVEVQUy5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0xhc3RTdGVwKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcChXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmICghaXNGaXJzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRheXNSZW1haW5pbmcgPSBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KTtcbiAgY29uc3QgaXNVcmdlbnQgPSBkYXlzUmVtYWluaW5nIDwgNSAmJiAhaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG5cbiAgY29uc3QgcmVuZGVyUmV2aWV3VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTG9hZGluZ1BsYXlib29rID0gbG9hZGluZy5wbGF5Ym9vaztcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgICB7ZXJyb3JzLmRpc3B1dGUgJiYgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9ycy5kaXNwdXRlfSAvPn1cblxuICAgICAgICB7aXNMb2FkaW5nUGxheWJvb2sgPyAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJtZWRpdW1cIiAvPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+TG9hZGluZyBwbGF5Ym9vay4uLjwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogZXJyb3JzLnBsYXlib29rID8gKFxuICAgICAgICAgIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMucGxheWJvb2t9IC8+XG4gICAgICAgICkgOiBwbGF5Ym9vayA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvYWNoSGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRsaW5lPXtwbGF5Ym9vay5jb2FjaF9oZWFkbGluZX1cbiAgICAgICAgICAgICAgc3VtbWFyeT17cGxheWJvb2suY29hY2hfc3VtbWFyeX1cbiAgICAgICAgICAgICAgdXJnZW5jeU1vZGU9e2lzVXJnZW50fVxuICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxRdWlja0FjdGlvbnMgcGxheWJvb2s9e3BsYXlib29rfSB1cmdlbmN5TW9kZT17aXNVcmdlbnR9IC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgdGl0bGU9XCJObyBwbGF5Ym9vayBhdmFpbGFibGVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXZSBkb24ndCBoYXZlIGEgc3BlY2lmaWMgcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGUgeWV0LiBVc2UgdGhlIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyB0byBidWlsZCB5b3VyIHJlc3BvbnNlLlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RGlzcHV0ZU92ZXJ2aWV3IGRpc3B1dGU9e2Rpc3B1dGV9IGxvYWRpbmc9e2xvYWRpbmcuZGlzcHV0ZX0gLz5cblxuICAgICAgICB7cGxheWJvb2sgJiYgKFxuICAgICAgICAgIDxMZWFybk1vcmVcbiAgICAgICAgICAgIGlzc3VlclN1bW1hcnk9e3BsYXlib29rLmNvYWNoX2lzc3Vlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgYWNxdWlyZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9hY3F1aXJlcl9zdW1tYXJ5fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVmlld1xuICAgICAgdGl0bGU9e2BEaXNwdXRlICR7aW5pdGlhbERpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLmB9XG4gICAgICBzaG93bj17c2hvd259XG4gICAgICBzZXRTaG93bj17c2V0U2hvd259XG4gICAgICBjb25maXJtQ2xvc2VNZXNzYWdlcz17e1xuICAgICAgICB0aXRsZTogJ0xlYXZlIGRpc3B1dGUgd29ya2Zsb3c/JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdZb3VyIHByb2dyZXNzIG9uIHRoaXMgc3RlcCB3aWxsIG5vdCBiZSBzYXZlZC4nLFxuICAgICAgICBjYW5jZWxBY3Rpb246ICdTdGF5JyxcbiAgICAgICAgZXhpdEFjdGlvbjogJ0xlYXZlJyxcbiAgICAgIH19XG4gICAgICBwcmltYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNMYXN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgb25QcmVzcz17KCkgPT4gc2V0U2hvd24oZmFsc2UpfT5cbiAgICAgICAgICAgIFN1Ym1pdCAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9e2hhbmRsZU5leHR9PlxuICAgICAgICAgICAgTmV4dDoge1dJWkFSRF9TVEVQX0xBQkVMU1tXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV1dfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZWNvbmRhcnlBY3Rpb249e1xuICAgICAgICBpc0ZpcnN0U3RlcCA/IChcbiAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9eygpID0+IHNldFNob3duKGZhbHNlKX0+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVCYWNrfT5cbiAgICAgICAgICAgIEJhY2s6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCAtIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgID5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScgfX0+XG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBwYWRkaW5nQm90dG9tOiAnc21hbGwnIH19PlxuICAgICAgICAgIDxEZWFkbGluZVRpbWVyIGR1ZUJ5PXtkaXNwdXRlLmR1ZV9ieX0gc3RhdHVzPXtkaXNwdXRlLnN0YXR1c30gLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxUYWJzXG4gICAgICAgICAgZml0dGVkXG4gICAgICAgICAgc2l6ZT1cIm1lZGl1bVwiXG4gICAgICAgICAgc2VsZWN0ZWRLZXk9e2N1cnJlbnRTdGVwfVxuICAgICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlPXsoa2V5KSA9PiBzZXRDdXJyZW50U3RlcChrZXkgYXMgV2l6YXJkU3RlcCl9XG4gICAgICAgID5cbiAgICAgICAgICA8VGFiTGlzdD5cbiAgICAgICAgICAgIHtXSVpBUkRfU1RFUFMubWFwKChzdGVwKSA9PiAoXG4gICAgICAgICAgICAgIDxUYWIga2V5PXtzdGVwfSBpZD17c3RlcH0+XG4gICAgICAgICAgICAgICAge1dJWkFSRF9TVEVQX0xBQkVMU1tzdGVwXX1cbiAgICAgICAgICAgICAgPC9UYWI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInJldmlld1wiPlxuICAgICAgICAgICAgICB7cmVuZGVyUmV2aWV3VGFiKCl9XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiZXZpZGVuY2VcIj5cbiAgICAgICAgICAgICAgPEV2aWRlbmNlQ2hlY2tsaXN0XG4gICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICBwbGF5Ym9vaz17cGxheWJvb2t9XG4gICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dFJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgIGlzVXJnZW50PXtpc1VyZ2VudH1cbiAgICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nPXtkYXlzUmVtYWluaW5nfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cIm5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgMzogQUkgTmFycmF0aXZlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiR2VuZXJhdGUgYSBjb21wZWxsaW5nIG5hcnJhdGl2ZSBiYXNlZCBvbiB5b3VyIGV2aWRlbmNlLiBSZXZpZXcsIGVkaXQsIGFuZCBhcHByb3ZlIGJlZm9yZSBzdWJtaXNzaW9uLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEFJIG5hcnJhdGl2ZSBnZW5lcmF0aW9uIGFuZCBlZGl0aW5nIHdpbGwgYmUgYnVpbHQgaW4gV0lOLTE4IGFuZCBXSU4tMTkuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgNDogU3VibWl0IEV2aWRlbmNlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUmV2aWV3IGV2ZXJ5dGhpbmcgb25lIGZpbmFsIHRpbWUuIFN1Ym1pc3Npb24gdG8gU3RyaXBlIGlzIGlycmV2b2NhYmxlLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEZpbmFsIHJldmlldyBhbmQgU3RyaXBlIHN1Ym1pc3Npb24gd2lsbCBiZSBidWlsdCBpbiBXSU4tMjAuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICA8L1RhYlBhbmVscz5cbiAgICAgICAgPC9UYWJzPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Gb2N1c1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlV29ya2Zsb3c7XG4iLCAiZXhwb3J0IHR5cGUgRGlzcHV0ZVN0YXR1cyA9XG4gIHwgJ25lZWRzX3Jlc3BvbnNlJ1xuICB8ICd1bmRlcl9yZXZpZXcnXG4gIHwgJ3dvbidcbiAgfCAnbG9zdCdcbiAgfCAnd2FybmluZ19uZWVkc19yZXNwb25zZSdcbiAgfCAnd2FybmluZ191bmRlcl9yZXZpZXcnXG4gIHwgJ3dhcm5pbmdfY2xvc2VkJ1xuICB8ICdjaGFyZ2VfcmVmdW5kZWQnO1xuXG5leHBvcnQgdHlwZSBDYXJkTmV0d29yayA9ICd2aXNhJyB8ICdtYXN0ZXJjYXJkJyB8ICdhbWV4JyB8ICdkaXNjb3ZlcicgfCAndW5rbm93bic7XG5cbmV4cG9ydCB0eXBlIFdpemFyZFN0ZXAgPSAncmV2aWV3JyB8ICdldmlkZW5jZScgfCAnbmFycmF0aXZlJyB8ICdzdWJtaXQnO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBTOiBXaXphcmRTdGVwW10gPSBbJ3JldmlldycsICdldmlkZW5jZScsICduYXJyYXRpdmUnLCAnc3VibWl0J107XG5cbmV4cG9ydCBjb25zdCBXSVpBUkRfU1RFUF9MQUJFTFM6IFJlY29yZDxXaXphcmRTdGVwLCBzdHJpbmc+ID0ge1xuICByZXZpZXc6ICdSZXZpZXcnLFxuICBldmlkZW5jZTogJ0V2aWRlbmNlJyxcbiAgbmFycmF0aXZlOiAnTmFycmF0aXZlJyxcbiAgc3VibWl0OiAnU3VibWl0Jyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcHV0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBjdXJyZW5jeTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc3RhdHVzOiBEaXNwdXRlU3RhdHVzO1xuICBkdWVfYnk6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgbmV0d29yazogQ2FyZE5ldHdvcms7XG4gIHBheW1lbnRfaW50ZW50Pzogc3RyaW5nO1xuICBjaGFyZ2VfaWQ6IHN0cmluZztcbiAgY3VzdG9tZXJfbmFtZT86IHN0cmluZztcbiAgY3VzdG9tZXJfZW1haWw/OiBzdHJpbmc7XG4gIGNyZWF0ZWQ6IG51bWJlcjtcbiAgZXZpZGVuY2VfZHVlX2J5OiBudW1iZXI7XG4gIC8vIEVucmljaGVkIGZpZWxkcyAoYXZhaWxhYmxlIGFmdGVyIGRldGFpbCBmZXRjaClcbiAgdHJhbnNhY3Rpb25fZGF0ZT86IG51bWJlcjtcbiAgY2FyZF9icmFuZD86IHN0cmluZztcbiAgY2FyZF9sYXN0ND86IHN0cmluZztcbiAgYmlsbGluZ19hZGRyZXNzPzogc3RyaW5nO1xuICBjaGFyZ2VfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJlY2VpcHRfdXJsPzogc3RyaW5nO1xuICBoYXNfZXZpZGVuY2U/OiBib29sZWFuO1xuICBldmlkZW5jZV9zdWJtaXNzaW9uX2NvdW50PzogbnVtYmVyO1xuICBpc19jaGFyZ2VfcmVmdW5kYWJsZT86IGJvb2xlYW47XG4gIG1ldGFkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgY2hlY2tsaXN0X3N0YXRlPzogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIGNoZWNrbGlzdF9ub3Rlcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIC8vIEF1dG8tcHVsbCBmaWVsZHMgKFdJTi0zNylcbiAgYXZzX2FkZHJlc3NfY2hlY2s/OiBzdHJpbmc7XG4gIGF2c196aXBfY2hlY2s/OiBzdHJpbmc7XG4gIGN2Y19jaGVjaz86IHN0cmluZztcbiAgdGhyZWVfZF9zZWN1cmVfcmVzdWx0Pzogc3RyaW5nO1xuICB0aHJlZV9kX3NlY3VyZV92ZXJzaW9uPzogc3RyaW5nO1xuICBhdXRob3JpemF0aW9uX2NvZGU/OiBzdHJpbmc7XG4gIG5ldHdvcmtfc3RhdHVzPzogc3RyaW5nO1xuICByZWZ1bmRzPzogQXJyYXk8eyBhbW91bnQ6IG51bWJlcjsgY3JlYXRlZDogbnVtYmVyOyBzdGF0dXM6IHN0cmluZyB9Pjtcbn1cblxuLy8gUGxheWJvb2sgdHlwZXMgKG1pcnJvcnMgYmFja2VuZCBQbGF5Ym9va0RhdGEpXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VDaGVja2xpc3RJdGVtIHtcbiAgaXRlbTogc3RyaW5nO1xuICBjYXRlZ29yeTogJ21hbmRhdG9yeScgfCAncmVjb21tZW5kZWQnIHwgJ3NpdHVhdGlvbmFsJztcbiAgY29udGV4dDogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgd2h5X21hdHRlcnM6IHN0cmluZztcbiAgd2hlcmVfdG9fZmluZD86IHN0cmluZztcbiAgc3RyaXBlX2ZpZWxkPzogc3RyaW5nO1xuICB1cmdlbmN5X2Vzc2VudGlhbDogYm9vbGVhbjtcbiAgdXJnZW5jeV9vcmRlcjogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGF5Ym9va0RhdGEge1xuICBuZXR3b3JrOiBzdHJpbmc7XG4gIHJlYXNvbl9jb2RlOiBzdHJpbmc7XG4gIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb2FjaF9oZWFkbGluZTogc3RyaW5nO1xuICBjb2FjaF9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2lzc3Vlcl9zdW1tYXJ5OiBzdHJpbmc7XG4gIGNvYWNoX2FjcXVpcmVyX3N1bW1hcnk6IHN0cmluZztcbiAgaXNzdWVyX2V2YWx1YXRpb246IHN0cmluZztcbiAgYWNxdWlyZXJfcHJlcmV2aWV3OiBzdHJpbmc7XG4gIGV2aWRlbmNlX2NoZWNrbGlzdDogRXZpZGVuY2VDaGVja2xpc3RJdGVtW107XG4gIGNvbW1vbl9taXN0YWtlczogeyBtaXN0YWtlOiBzdHJpbmc7IGV4cGxhbmF0aW9uOiBzdHJpbmcgfVtdO1xuICBwcm9fdGlwczogeyB0aXA6IHN0cmluZyB9W107XG4gIHVyZ2VuY3lfZXNzZW50aWFsczogeyBzdW1tYXJ5OiBzdHJpbmc7IG9yZGVyZWRfaXRlbXM6IHN0cmluZ1tdIH07XG4gIG5hcnJhdGl2ZV90ZW1wbGF0ZTogc3RyaW5nO1xuICByZXNwb25zZV9kZWFkbGluZV9kYXlzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VGaWxlIHtcbiAgaWQ6IHN0cmluZztcbiAgc3RyaXBlX2ZpbGVfaWQ6IHN0cmluZztcbiAgY2hlY2tsaXN0X2l0ZW1fa2V5OiBzdHJpbmc7XG4gIGZpbGVfbmFtZTogc3RyaW5nO1xuICBmaWxlX3NpemU6IG51bWJlcjtcbiAgbWltZV90eXBlOiBzdHJpbmc7XG4gIHVwbG9hZGVkX2F0OiBzdHJpbmc7XG59XG4iLCAiaW1wb3J0IGZldGNoU3RyaXBlU2lnbmF0dXJlIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9zaWduYXR1cmUnO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5cbi8vIFRvZ2dsZSBmb3IgbG9jYWwgZGV2ZWxvcG1lbnQ6IHNldCB0byB0cnVlIHdoZW4gcnVubmluZyBgc3RyaXBlIGFwcHMgc3RhcnRgXG5jb25zdCBVU0VfTE9DQUxfQkFDS0VORCA9IHRydWU7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gVVNFX0xPQ0FMX0JBQ0tFTkRcbiAgPyAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICA6ICdodHRwczovL3dpbmJhY2twYXkuY29tJztcblxuZXhwb3J0IGNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcHVibGljIHN0YXR1czogbnVtYmVyLFxuICApIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnQXBpRXJyb3InO1xuICB9XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBBdXRvbWF0aWNhbGx5IGluY2x1ZGVzIFN0cmlwZSBBcHAgc2lnbmF0dXJlIGFuZCBpZGVudGl0eSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5kYXRhLFxuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCBQQVRDSCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcl9pZDogY29udGV4dC51c2VyQ29udGV4dD8uaWQsXG4gICAgYWNjb3VudF9pZDogY29udGV4dC51c2VyQ29udGV4dD8uYWNjb3VudC5pZCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0ke3BhdGh9YCwge1xuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLmVycm9yIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCBQT1NUIHJlcXVlc3QgdG8gYSBcImRlbGV0ZVwiIGVuZHBvaW50IG9uIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBVc2VzIFBPU1QgYmVjYXVzZSBTdHJpcGUgQXBwIHNpZ25hdHVyZSB2ZXJpZmljYXRpb24gcmVxdWlyZXMgYSBib2R5LFxuICogYW5kIHNvbWUgcHJveGllcyBzdHJpcCBib2RpZXMgZnJvbSBERUxFVEUgcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVCYWNrZW5kPFQgPSB1bmtub3duPihcbiAgcGF0aDogc3RyaW5nLFxuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWUsXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFDS0VORF9VUkx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLmVycm9yIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDYXJkTmV0d29yaywgRGlzcHV0ZVN0YXR1cyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBSRUFTT05fQ09ERV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICd2aXNhOjEwLjQnOiAnRnJhdWQgLS0gQ2FyZCBOb3QgUHJlc2VudCcsXG4gICd2aXNhOjEzLjEnOiAnTWVyY2hhbmRpc2UgLyBTZXJ2aWNlcyBOb3QgUmVjZWl2ZWQnLFxuICAndmlzYToxMy4yJzogJ0NhbmNlbGxlZCBSZWN1cnJpbmcgVHJhbnNhY3Rpb24nLFxuICAndmlzYToxMy4zJzogJ05vdCBhcyBEZXNjcmliZWQgb3IgRGVmZWN0aXZlJyxcbiAgJ3Zpc2E6MTMuNic6ICdDcmVkaXQgTm90IFByb2Nlc3NlZCcsXG4gICdtYXN0ZXJjYXJkOjQ4MDgnOiAnQXV0aG9yaXphdGlvbi1SZWxhdGVkIERpc3B1dGUnLFxuICAnbWFzdGVyY2FyZDo0ODUzJzogJ05vdCBhcyBEZXNjcmliZWQgLyBEZWZlY3RpdmUnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYXNvbkNvZGVMYWJlbChuZXR3b3JrOiBDYXJkTmV0d29yaywgcmVhc29uQ29kZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBSRUFTT05fQ09ERV9MQUJFTFNbYCR7bmV0d29ya306JHtyZWFzb25Db2RlfWBdID8/IG51bGw7XG59XG5cbmNvbnN0IFJFU09MVkVEX1NUQVRVU0VTOiBEaXNwdXRlU3RhdHVzW10gPSBbJ3dvbicsICdsb3N0JywgJ3dhcm5pbmdfY2xvc2VkJywgJ2NoYXJnZV9yZWZ1bmRlZCddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNvbHZlZChzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gUkVTT0xWRURfU1RBVFVTRVMuaW5jbHVkZXMoc3RhdHVzIGFzIERpc3B1dGVTdGF0dXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHVzQmFkZ2Uoc3RhdHVzOiBzdHJpbmcpOiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHR5cGU6ICd1cmdlbnQnIHwgJ3dhcm5pbmcnIHwgJ3Bvc2l0aXZlJyB8ICduZWdhdGl2ZScgfCAnaW5mbyc7XG59IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgY2FzZSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ05lZWRzIFJlc3BvbnNlJywgdHlwZTogJ3VyZ2VudCcgfTtcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgIGNhc2UgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnVW5kZXIgUmV2aWV3JywgdHlwZTogJ2luZm8nIH07XG4gICAgY2FzZSAnd29uJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnV29uJywgdHlwZTogJ3Bvc2l0aXZlJyB9O1xuICAgIGNhc2UgJ2xvc3QnOlxuICAgIGNhc2UgJ3dhcm5pbmdfY2xvc2VkJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTG9zdCcsIHR5cGU6ICduZWdhdGl2ZScgfTtcbiAgICBjYXNlICdjaGFyZ2VfcmVmdW5kZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdSZWZ1bmRlZCcsIHR5cGU6ICdpbmZvJyB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4geyBsYWJlbDogc3RhdHVzLCB0eXBlOiAnaW5mbycgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c1JlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZHVlID0gbmV3IERhdGUoZHVlQnkpO1xuICByZXR1cm4gTWF0aC5jZWlsKChkdWUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVSZW1haW5pbmcge1xuICBkYXlzOiBudW1iZXI7XG4gIGhvdXJzOiBudW1iZXI7XG4gIGlzRXhwaXJlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVSZW1haW5pbmcoZHVlQnk6IHN0cmluZyk6IFRpbWVSZW1haW5pbmcge1xuICBjb25zdCB0b3RhbE1zID0gbmV3IERhdGUoZHVlQnkpLmdldFRpbWUoKSAtIERhdGUubm93KCk7XG4gIGlmICh0b3RhbE1zIDw9IDApIHJldHVybiB7IGRheXM6IDAsIGhvdXJzOiAwLCBpc0V4cGlyZWQ6IHRydWUgfTtcbiAgY29uc3QgdG90YWxIb3VycyA9IE1hdGguZmxvb3IodG90YWxNcyAvICgxMDAwICogNjAgKiA2MCkpO1xuICByZXR1cm4ge1xuICAgIGRheXM6IE1hdGguZmxvb3IodG90YWxIb3VycyAvIDI0KSxcbiAgICBob3VyczogdG90YWxIb3VycyAlIDI0LFxuICAgIGlzRXhwaXJlZDogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVyZ2VuY3lUaWVyID0gJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJnZW5jeVRpZXIoZGF5czogbnVtYmVyKTogVXJnZW5jeVRpZXIge1xuICBpZiAoZGF5cyA8IDUpIHJldHVybiAndXJnZW50JztcbiAgaWYgKGRheXMgPD0gMTMpIHJldHVybiAnd2FybmluZyc7XG4gIHJldHVybiAncG9zaXRpdmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJnZW5jeUJhZGdlKFxuICBkdWVCeTogc3RyaW5nLFxuICBzdGF0dXM6IHN0cmluZyxcbik6IHsgbGFiZWw6IHN0cmluZzsgdHlwZTogVXJnZW5jeVRpZXIgfSB8IG51bGwge1xuICBpZiAoaXNSZXNvbHZlZChzdGF0dXMpKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0aW1lID0gZ2V0VGltZVJlbWFpbmluZyhkdWVCeSk7XG4gIGNvbnN0IHRpZXIgPSBnZXRVcmdlbmN5VGllcih0aW1lLmRheXMpO1xuXG4gIGlmICh0aW1lLmlzRXhwaXJlZCkgcmV0dXJuIHsgbGFiZWw6ICdFeHBpcmVkJywgdHlwZTogJ3VyZ2VudCcgfTtcbiAgaWYgKHRpbWUuZGF5cyA8IDUpIHJldHVybiB7IGxhYmVsOiBgJHt0aW1lLmRheXN9ZCAke3RpbWUuaG91cnN9aCBsZWZ0YCwgdHlwZTogdGllciB9O1xuICByZXR1cm4geyBsYWJlbDogYCR7dGltZS5kYXlzfWQgbGVmdGAsIHR5cGU6IHRpZXIgfTtcbn1cbiIsICIvLyBzdHJpcGUtYXBwL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeFxuXG5pbXBvcnQgeyBCYW5uZXIsIEJveCwgQnV0dG9uIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIEVycm9yQmFubmVyUHJvcHMge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIG9uUmV0cnk/OiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBFcnJvckJhbm5lciA9ICh7IG1lc3NhZ2UsIG9uUmV0cnkgfTogRXJyb3JCYW5uZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiY3JpdGljYWxcIlxuICAgICAgICB0aXRsZT1cIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAgICAgZGVzY3JpcHRpb249e21lc3NhZ2V9XG4gICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgIG9uUmV0cnkgPyAoXG4gICAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e29uUmV0cnl9PlJldHJ5PC9CdXR0b24+XG4gICAgICAgICAgKSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JCYW5uZXI7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQmFkZ2UsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgeyBnZXRUaW1lUmVtYWluaW5nLCBnZXRVcmdlbmN5VGllciwgaXNSZXNvbHZlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmludGVyZmFjZSBEZWFkbGluZVRpbWVyUHJvcHMge1xuICBkdWVCeTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbn1cblxuY29uc3QgRGVhZGxpbmVUaW1lciA9ICh7IGR1ZUJ5LCBzdGF0dXMgfTogRGVhZGxpbmVUaW1lclByb3BzKSA9PiB7XG4gIGNvbnN0IFssIHNldFRpY2tdID0gdXNlU3RhdGUoMCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpZCA9IHNldEludGVydmFsKCgpID0+IHNldFRpY2soKHQpID0+IHQgKyAxKSwgNjBfMDAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpZCk7XG4gIH0sIFtkdWVCeV0pO1xuXG4gIGlmICghZHVlQnkgfHwgaXNSZXNvbHZlZChzdGF0dXMpKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0aW1lID0gZ2V0VGltZVJlbWFpbmluZyhkdWVCeSk7XG4gIGNvbnN0IHRpZXIgPSBnZXRVcmdlbmN5VGllcih0aW1lLmRheXMpO1xuICBjb25zdCBpc1VyZ2VudCA9IHRpbWUuZGF5cyA8IDUgJiYgIXRpbWUuaXNFeHBpcmVkO1xuXG4gIGNvbnN0IGxhYmVsID0gdGltZS5pc0V4cGlyZWRcbiAgICA/ICdEZWFkbGluZSBwYXNzZWQnXG4gICAgOiB0aW1lLmRheXMgPT09IDBcbiAgICAgID8gYCR7dGltZS5ob3Vyc31oIHJlbWFpbmluZ2BcbiAgICAgIDogYCR7dGltZS5kYXlzfWQgJHt0aW1lLmhvdXJzfWggcmVtYWluaW5nYDtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGNzcz17e1xuICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICAgIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJyxcbiAgICAgICAgcGFkZGluZzogJ3NtYWxsJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnLCBjb2xvcjogaXNVcmdlbnQgPyAnY3JpdGljYWwnIDogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHtpc1VyZ2VudCA/ICdSZXNwb25kIG5vdycgOiAnUmVzcG9uc2UgZGVhZGxpbmUnfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8QmFkZ2UgdHlwZT17dGltZS5pc0V4cGlyZWQgPyAndXJnZW50JyA6IHRpZXJ9PntsYWJlbH08L0JhZGdlPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGVhZGxpbmVUaW1lcjtcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBEaXZpZGVyLCBJbmxpbmUsIExpbmssIFNwaW5uZXIgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGdldFN0YXR1c0JhZGdlIH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzJztcblxuaW50ZXJmYWNlIERpc3B1dGVPdmVydmlld1Byb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIEluZm9Sb3dQcm9wcyB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBSZWFjdC5SZWFjdE5vZGU7XG59XG5cbmZ1bmN0aW9uIEluZm9Sb3coeyBsYWJlbCwgdmFsdWUgfTogSW5mb1Jvd1Byb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnLCBkaXN0cmlidXRlOiAnc3BhY2UtYmV0d2VlbicsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT57bGFiZWx9PC9JbmxpbmU+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicgfX0+e3ZhbHVlfTwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBbW91bnQoYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICBjdXJyZW5jeTogY3VycmVuY3kudG9VcHBlckNhc2UoKSxcbiAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUodGltZXN0YW1wOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICogMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdzaG9ydCcsXG4gICAgZGF5OiAnbnVtZXJpYycsXG4gIH0pO1xufVxuXG5jb25zdCBEaXNwdXRlT3ZlcnZpZXcgPSAoeyBkaXNwdXRlLCBsb2FkaW5nIH06IERpc3B1dGVPdmVydmlld1Byb3BzKSA9PiB7XG4gIGNvbnN0IHN0YXR1c0JhZGdlID0gZ2V0U3RhdHVzQmFkZ2UoZGlzcHV0ZS5zdGF0dXMpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJywgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJywgcGFkZGluZzogJ21lZGl1bScsIGJvcmRlclJhZGl1czogJ21lZGl1bScgfX0+XG4gICAgICB7LyogSGVhZGVyOiBhbW91bnQgKyBzdGF0dXMgKi99XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0+XG4gICAgICAgICAge2Zvcm1hdEFtb3VudChkaXNwdXRlLmFtb3VudCwgZGlzcHV0ZS5jdXJyZW5jeSl9XG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICA8L0JveD5cblxuICAgICAgey8qIEN1c3RvbWVyIGluZm8gKi99XG4gICAgICB7KGRpc3B1dGUuY3VzdG9tZXJfbmFtZSB8fCBkaXNwdXRlLmN1c3RvbWVyX2VtYWlsKSAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfbmFtZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIkN1c3RvbWVyXCIgdmFsdWU9e2Rpc3B1dGUuY3VzdG9tZXJfbmFtZX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRW1haWxcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9lbWFpbH0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgIHsvKiBFbnJpY2hlZCBzZWN0aW9uICovfVxuICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdzbWFsbCcsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIHtkaXNwdXRlLmNhcmRfYnJhbmQgJiYgZGlzcHV0ZS5jYXJkX2xhc3Q0ICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93XG4gICAgICAgICAgICAgIGxhYmVsPVwiQ2FyZFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtgJHtkaXNwdXRlLmNhcmRfYnJhbmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkaXNwdXRlLmNhcmRfYnJhbmQuc2xpY2UoMSl9IGVuZGluZyBpbiAke2Rpc3B1dGUuY2FyZF9sYXN0NH1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJUcmFuc2FjdGlvbiBkYXRlXCIgdmFsdWU9e2Zvcm1hdERhdGUoZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtkaXNwdXRlLmNoYXJnZV9kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIkRlc2NyaXB0aW9uXCIgdmFsdWU9e2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9ufSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuYmlsbGluZ19hZGRyZXNzICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQmlsbGluZyBhZGRyZXNzXCIgdmFsdWU9e2Rpc3B1dGUuYmlsbGluZ19hZGRyZXNzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUucmVjZWlwdF91cmwgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJSZWNlaXB0XCJcbiAgICAgICAgICAgICAgdmFsdWU9ezxMaW5rIGhyZWY9e2Rpc3B1dGUucmVjZWlwdF91cmx9IHRhcmdldD1cIl9ibGFua1wiPlZpZXcgcmVjZWlwdDwvTGluaz59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUubWV0YWRhdGEgJiYgT2JqZWN0LmtleXMoZGlzcHV0ZS5tZXRhZGF0YSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoZGlzcHV0ZS5tZXRhZGF0YSkubWFwKChba2V5LCB2YWxdKSA9PiAoXG4gICAgICAgICAgICAgICAgPEluZm9Sb3cga2V5PXtrZXl9IGxhYmVsPXtrZXl9IHZhbHVlPXt2YWx9IC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7LyogRm9vdGVyOiBJRHMgKi99XG4gICAgICA8RGl2aWRlciAvPlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHhzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdkaXNhYmxlZCcgfX0+RGlzcHV0ZToge2Rpc3B1dGUuaWR9PC9JbmxpbmU+XG4gICAgICAgIHtkaXNwdXRlLmNoYXJnZV9pZCAmJiAoXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2Rpc2FibGVkJyB9fT5DaGFyZ2U6IHtkaXNwdXRlLmNoYXJnZV9pZH08L0lubGluZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZU92ZXJ2aWV3O1xuIiwgImltcG9ydCB7IEJveCwgQmFkZ2UsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBDb2FjaEhlYWRlclByb3BzIHtcbiAgaGVhZGxpbmU6IHN0cmluZztcbiAgc3VtbWFyeTogc3RyaW5nO1xuICB1cmdlbmN5TW9kZTogYm9vbGVhbjtcbiAgZGF5c1JlbWFpbmluZz86IG51bWJlcjtcbn1cblxuY29uc3QgQ29hY2hIZWFkZXIgPSAoeyBoZWFkbGluZSwgc3VtbWFyeSwgdXJnZW5jeU1vZGUsIGRheXNSZW1haW5pbmcgfTogQ29hY2hIZWFkZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJywgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJywgcGFkZGluZzogJ21lZGl1bScsIGJvcmRlclJhZGl1czogJ21lZGl1bScgfX0+XG4gICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj5BSSBDb2FjaDwvQmFkZ2U+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHtoZWFkbGluZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHt1cmdlbmN5TW9kZSAmJiBkYXlzUmVtYWluaW5nICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGBZb3UgaGF2ZSAke2RheXNSZW1haW5pbmd9IGRheSR7ZGF5c1JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfS4gRm9jdXMgb24gdGhlIGVzc2VudGlhbHMgYmVsb3cuYFxuICAgICAgICAgIDogc3VtbWFyeX1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29hY2hIZWFkZXI7XG4iLCAiaW1wb3J0IHsgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBQbGF5Ym9va0RhdGEgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5pbnRlcmZhY2UgUXVpY2tBY3Rpb25zUHJvcHMge1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhO1xuICB1cmdlbmN5TW9kZTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZGVyaXZlQWN0aW9ucyhwbGF5Ym9vazogUGxheWJvb2tEYXRhKTogc3RyaW5nW10ge1xuICBjb25zdCBhY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0IG1hbmRhdG9yeUl0ZW1zID0gcGxheWJvb2suZXZpZGVuY2VfY2hlY2tsaXN0XG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jYXRlZ29yeSA9PT0gJ21hbmRhdG9yeScgJiYgaXRlbS5jb250ZXh0ID09PSAnYWxsJylcbiAgICAuc2xpY2UoMCwgMyk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBtYW5kYXRvcnlJdGVtcykge1xuICAgIGFjdGlvbnMucHVzaChgQ29uZmlybSB5b3UgaGF2ZTogJHtpdGVtLml0ZW0udG9Mb3dlckNhc2UoKX1gKTtcbiAgfVxuXG4gIGNvbnN0IHRvcE1pc3Rha2VzID0gcGxheWJvb2suY29tbW9uX21pc3Rha2VzLnNsaWNlKDAsIDIpO1xuICBmb3IgKGNvbnN0IG1pc3Rha2Ugb2YgdG9wTWlzdGFrZXMpIHtcbiAgICBjb25zdCByZWZyYW1lZCA9IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdOb3QgJylcbiAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoNCkudG9Mb3dlckNhc2UoKX1gXG4gICAgICA6IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdTa2lwcGluZyAnKVxuICAgICAgICA/IGBNYWtlIHN1cmUgeW91J3JlIHVzaW5nICR7bWlzdGFrZS5taXN0YWtlLnNsaWNlKDkpLnRvTG93ZXJDYXNlKCl9YFxuICAgICAgICA6IGBDaGVjazogJHttaXN0YWtlLm1pc3Rha2UudG9Mb3dlckNhc2UoKX1gO1xuICAgIGFjdGlvbnMucHVzaChyZWZyYW1lZCk7XG4gIH1cblxuICByZXR1cm4gYWN0aW9ucy5zbGljZSgwLCA1KTtcbn1cblxuY29uc3QgUXVpY2tBY3Rpb25zID0gKHsgcGxheWJvb2ssIHVyZ2VuY3lNb2RlIH06IFF1aWNrQWN0aW9uc1Byb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gdXJnZW5jeU1vZGVcbiAgICA/IHBsYXlib29rLnVyZ2VuY3lfZXNzZW50aWFscy5vcmRlcmVkX2l0ZW1zXG4gICAgOiBkZXJpdmVBY3Rpb25zKHBsYXlib29rKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHt1cmdlbmN5TW9kZSA/ICdGb2N1cyBvbiB0aGVzZSBlc3NlbnRpYWxzJyA6ICdZb3VyIG5leHQgc3RlcHMnfVxuICAgICAgPC9JbmxpbmU+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICB7aXRlbXMubWFwKCh0ZXh0LCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgc3RhY2s6ICd4JyxcbiAgICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdzdXJmYWNlJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJ3NtYWxsJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnc21hbGwnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEvMTInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgIHtpbmRleCArIDF9LlxuICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknIH19Pnt0ZXh0fTwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIERvbid0IHdvcnJ5LCB3ZSdsbCB3YWxrIHlvdSB0aHJvdWdoIGVhY2ggb2YgdGhlc2Ugb24gdGhlIG5leHQgc3RlcC5cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUXVpY2tBY3Rpb25zO1xuIiwgImltcG9ydCB7IEFjY29yZGlvbiwgQWNjb3JkaW9uSXRlbSwgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgTGVhcm5Nb3JlUHJvcHMge1xuICBpc3N1ZXJTdW1tYXJ5OiBzdHJpbmc7XG4gIGFjcXVpcmVyU3VtbWFyeTogc3RyaW5nO1xufVxuXG5jb25zdCBMZWFybk1vcmUgPSAoeyBpc3N1ZXJTdW1tYXJ5LCBhY3F1aXJlclN1bW1hcnkgfTogTGVhcm5Nb3JlUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8QWNjb3JkaW9uPlxuICAgICAgPEFjY29yZGlvbkl0ZW0gdGl0bGU9XCJXaHkgdGhpcyBtYXR0ZXJzXCI+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBXaGF0IHRoZSBiYW5rIGNoZWNrc1xuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2lzc3VlclN1bW1hcnl9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIFdoYXQgaGFwcGVucyB0byB5b3VyIHJlc3BvbnNlXG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICB7YWNxdWlyZXJTdW1tYXJ5fVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9BY2NvcmRpb25JdGVtPlxuICAgIDwvQWNjb3JkaW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGVhcm5Nb3JlO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJhbm5lciwgRGl2aWRlciwgSW5saW5lLCBMaW5rIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlLCBQbGF5Ym9va0RhdGEsIEV2aWRlbmNlQ2hlY2tsaXN0SXRlbSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IHBhdGNoQmFja2VuZCwgZmV0Y2hCYWNrZW5kIH0gZnJvbSAnLi4vLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgQ2hlY2tsaXN0UHJvZ3Jlc3MgZnJvbSAnLi9DaGVja2xpc3RQcm9ncmVzcyc7XG5pbXBvcnQgQ2hlY2tsaXN0SXRlbSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBFeHBhbmRlZFNlY3Rpb24gfSBmcm9tICcuL0NoZWNrbGlzdEl0ZW0nO1xuXG5pbnRlcmZhY2UgRXZpZGVuY2VDaGVja2xpc3RQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIHBsYXlib29rOiBQbGF5Ym9va0RhdGEgfCBudWxsO1xuICBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0VmFsdWU7XG4gIGlzVXJnZW50OiBib29sZWFuO1xuICBkYXlzUmVtYWluaW5nOiBudW1iZXI7XG59XG5cbnR5cGUgQ2hlY2tsaXN0U3RhdGUgPSBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPjtcbnR5cGUgTm90ZXNTdGF0ZSA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbmNvbnN0IENBVEVHT1JZX09SREVSOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bJ2NhdGVnb3J5J11bXSA9IFsnbWFuZGF0b3J5JywgJ3JlY29tbWVuZGVkJywgJ3NpdHVhdGlvbmFsJ107XG5cbmNvbnN0IENBVEVHT1JZX0xBQkVMUzogUmVjb3JkPEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXSwgc3RyaW5nPiA9IHtcbiAgbWFuZGF0b3J5OiAnTWFuZGF0b3J5JyxcbiAgcmVjb21tZW5kZWQ6ICdSZWNvbW1lbmRlZCcsXG4gIHNpdHVhdGlvbmFsOiAnU2l0dWF0aW9uYWwnLFxufTtcblxuZnVuY3Rpb24gZm9ybWF0Q2hlY2tWYWx1ZShyYXc6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICBpZiAoIXJhdykgcmV0dXJuICdOb3QgY2hlY2tlZCc7XG4gIHN3aXRjaCAocmF3KSB7XG4gICAgY2FzZSAncGFzcyc6IHJldHVybiAnTWF0Y2gnO1xuICAgIGNhc2UgJ2ZhaWwnOiByZXR1cm4gJ05vIG1hdGNoJztcbiAgICBjYXNlICd1bmF2YWlsYWJsZSc6IHJldHVybiAnTm90IGNoZWNrZWQnO1xuICAgIGNhc2UgJ3VuY2hlY2tlZCc6IHJldHVybiAnTm90IGNoZWNrZWQnO1xuICAgIGRlZmF1bHQ6IHJldHVybiByYXc7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0czogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRzICogMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICBtb250aDogJ3Nob3J0JywgZGF5OiAnbnVtZXJpYycsIHllYXI6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KGFtb3VudDogbnVtYmVyLCBjdXJyZW5jeT86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeSA/PyAndXNkJyxcbiAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG59XG5cbi8qKlxuICogU3RhdHVzIG9mIGEgc3RyaXBlX2ZpZWxkLWxpbmtlZCBjaGVja2xpc3QgaXRlbTpcbiAqIC0gJ3Bvc2l0aXZlJzogZGF0YSBleGlzdHMgYW5kIGhlbHBzIHRoZSBjYXNlIChhdXRvLWNoZWNrLCBzaG93IHZhbHVlKVxuICogLSAndW5hdmFpbGFibGUnOiB2ZXJpZmljYXRpb24gd2Fzbid0IGNvbGxlY3RlZCBhdCBjaGVja291dCAoZ3JleSBvdXQsIGV4cGxhaW4pXG4gKiAtICduZWdhdGl2ZSc6IHZlcmlmaWNhdGlvbiBmYWlsZWQsIGh1cnRzIHRoZSBjYXNlICh3YXJuIG1lcmNoYW50KVxuICogLSBudWxsOiBubyBzdHJpcGVfZmllbGQgb3Igbm90IGEgbWFwcGVkIGl0ZW1cbiAqL1xuZXhwb3J0IHR5cGUgU3RyaXBlRmllbGRTdGF0dXMgPSAncG9zaXRpdmUnIHwgJ3VuYXZhaWxhYmxlJyB8ICduZWdhdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyaXBlRmllbGRSZXN1bHQge1xuICBzdGF0dXM6IFN0cmlwZUZpZWxkU3RhdHVzO1xuICB2YWx1ZTogc3RyaW5nO1xuICBndWlkYW5jZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRTdHJpcGVGaWVsZFJlc3VsdChpdGVtOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW0sIGRpc3B1dGU6IERpc3B1dGUpOiBTdHJpcGVGaWVsZFJlc3VsdCB8IG51bGwge1xuICBjb25zdCBmaWVsZCA9IGl0ZW0uc3RyaXBlX2ZpZWxkO1xuICBpZiAoIWZpZWxkKSByZXR1cm4gbnVsbDtcblxuICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSAnYXZzX3Jlc3VsdCc6IHtcbiAgICAgIGNvbnN0IGFkZHIgPSBkaXNwdXRlLmF2c19hZGRyZXNzX2NoZWNrO1xuICAgICAgY29uc3QgemlwID0gZGlzcHV0ZS5hdnNfemlwX2NoZWNrO1xuICAgICAgaWYgKCFhZGRyICYmICF6aXApIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3VuYXZhaWxhYmxlJyxcbiAgICAgICAgdmFsdWU6ICdOb3QgY29sbGVjdGVkIGF0IGNoZWNrb3V0JyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiQWRkcmVzcyB2ZXJpZmljYXRpb24gd2Fzbid0IHJ1biBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGNhbid0IGJlIGFkZGVkIGFmdGVyIHRoZSBmYWN0IC0tIGZvY3VzIHlvdXIgZW5lcmd5IG9uIHRoZSBvdGhlciBldmlkZW5jZSBpdGVtcyBpbnN0ZWFkLlwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFkZHJGYWlsID0gYWRkciA9PT0gJ2ZhaWwnO1xuICAgICAgY29uc3QgemlwRmFpbCA9IHppcCA9PT0gJ2ZhaWwnO1xuICAgICAgaWYgKGFkZHJGYWlsICYmIHppcEZhaWwpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdBZGRyZXNzOiBubyBtYXRjaCwgWklQOiBubyBtYXRjaCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIlRoZSBiaWxsaW5nIGFkZHJlc3MgZGlkbid0IG1hdGNoIHdoYXQgdGhlIGJhbmsgaGFzIG9uIGZpbGUuIFRoZSBpc3N1ZXIgd2lsbCBzZWUgdGhpcyBhdXRvbWF0aWNhbGx5IC0tIGl0IHdlYWtlbnMgeW91ciBjYXNlLiBGb2N1cyBvbiBzdHJlbmd0aGVuaW5nIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGFkZHJGYWlsIHx8IHppcEZhaWwpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ25lZ2F0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBZGRyZXNzOiAke2Zvcm1hdENoZWNrVmFsdWUoYWRkcil9LCBaSVA6ICR7Zm9ybWF0Q2hlY2tWYWx1ZSh6aXApfWAsXG4gICAgICAgIGd1aWRhbmNlOiBcIlBhcnRpYWwgYWRkcmVzcyBtYXRjaCAtLSBvbmUgZWxlbWVudCBkaWRuJ3QgbWF0Y2guIFRoZSBpc3N1ZXIgd2lsbCBzZWUgdGhpcy4gSXQncyBub3QgYXMgZGFtYWdpbmcgYXMgYSBmdWxsIG1pc21hdGNoLCBidXQgc3RyZW5ndGhlbiB5b3VyIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYEFkZHJlc3M6ICR7Zm9ybWF0Q2hlY2tWYWx1ZShhZGRyKX0sIFpJUDogJHtmb3JtYXRDaGVja1ZhbHVlKHppcCl9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdjdmNfY2hlY2snOiB7XG4gICAgICBjb25zdCBjdmMgPSBkaXNwdXRlLmN2Y19jaGVjaztcbiAgICAgIGlmICghY3ZjIHx8IGN2YyA9PT0gJ3VuYXZhaWxhYmxlJyB8fCBjdmMgPT09ICd1bmNoZWNrZWQnKSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IGNvbGxlY3RlZCBhdCBjaGVja291dCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIlRoZSBzZWN1cml0eSBjb2RlIChDVlYpIHdhc24ndCB2ZXJpZmllZCBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGNhbid0IGJlIGFkZGVkIGFmdGVyIHRoZSBmYWN0IC0tIGZvY3VzIHlvdXIgZW5lcmd5IG9uIHRoZSBvdGhlciBldmlkZW5jZSBpdGVtcyBpbnN0ZWFkLlwiLFxuICAgICAgfTtcbiAgICAgIGlmIChjdmMgPT09ICdmYWlsJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAnbmVnYXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NWVjogbm8gbWF0Y2gnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgQ1ZWIGNoZWNrIGZhaWxlZCBvbiB0aGlzIHRyYW5zYWN0aW9uIC0tIHRoZSBjb2RlIGVudGVyZWQgZGlkbid0IG1hdGNoLiBUaGUgaXNzdWVyIHdpbGwgc2VlIHRoaXMgYXV0b21hdGljYWxseSBhbmQgaXQgaHVydHMgeW91ciBjYXNlLiBGb2N1cyBvbiBzdHJlbmd0aGVuaW5nIG90aGVyIGV2aWRlbmNlIHRvIGNvbXBlbnNhdGUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0NWViB2ZXJpZmllZCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSAndGhyZWVfZF9zZWN1cmUnOiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBkaXNwdXRlLnRocmVlX2Rfc2VjdXJlX3Jlc3VsdDtcbiAgICAgIGlmICghcmVzdWx0KSByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICd1bmF2YWlsYWJsZScsXG4gICAgICAgIHZhbHVlOiAnTm90IHVzZWQgb24gdGhpcyB0cmFuc2FjdGlvbicsXG4gICAgICAgIGd1aWRhbmNlOiBcIjNEIFNlY3VyZSB3YXNuJ3QgdXNlZCBvbiB0aGlzIHRyYW5zYWN0aW9uLiBUaGlzIGlzIHRoZSBzaW5nbGUgc3Ryb25nZXN0IGRlZmVuc2UgZm9yIGZyYXVkIGRpc3B1dGVzIC0tIGNvbnNpZGVyIGVuYWJsaW5nIGl0IGZvciBmdXR1cmUgdHJhbnNhY3Rpb25zLiBGb3IgdGhpcyBkaXNwdXRlLCBmb2N1cyBvbiB0aGUgb3RoZXIgZXZpZGVuY2UgaXRlbXMuXCIsXG4gICAgICB9O1xuICAgICAgY29uc3QgdmVyc2lvbiA9IGRpc3B1dGUudGhyZWVfZF9zZWN1cmVfdmVyc2lvbjtcbiAgICAgIGlmIChyZXN1bHQgPT09ICdhdXRoZW50aWNhdGVkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogdmVyc2lvbiA/IGBWZXJpZmllZCBieSBiYW5rICgzRFMgdiR7dmVyc2lvbn0pYCA6ICdWZXJpZmllZCBieSBiYW5rICgzRFMpJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuIFRoaXMgaXMgeW91ciBzdHJvbmdlc3QgcGllY2Ugb2YgZXZpZGVuY2UuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKHJlc3VsdCA9PT0gJ2F0dGVtcHRfYWNrbm93bGVkZ2VkJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0JhbmsgdmVyaWZpY2F0aW9uIGF0dGVtcHRlZCcsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB0aGUgYmFuayBhY2tub3dsZWRnZWQgdGhlIDNEUyBhdHRlbXB0LCB3aGljaCBzdGlsbCBwcm92aWRlcyBsaWFiaWxpdHkgc2hpZnQgaW4gbW9zdCBjYXNlcy5cIixcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBgM0RTIHJlc3VsdDogJHtyZXN1bHR9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlICdhdXRob3JpemF0aW9uJzoge1xuICAgICAgY29uc3QgY29kZSA9IGRpc3B1dGUuYXV0aG9yaXphdGlvbl9jb2RlO1xuICAgICAgY29uc3Qgc3RhdHVzID0gZGlzcHV0ZS5uZXR3b3JrX3N0YXR1cztcbiAgICAgIGlmICghY29kZSAmJiAhc3RhdHVzKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChzdGF0dXMgPT09ICdkZWNsaW5lZF9ieV9uZXR3b3JrJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAnbmVnYXRpdmUnLFxuICAgICAgICB2YWx1ZTogJ0RlY2xpbmVkIGJ5IG5ldHdvcmsnLFxuICAgICAgICBndWlkYW5jZTogXCJUaGUgYXV0aG9yaXphdGlvbiB3YXMgZGVjbGluZWQgYnkgdGhlIG5ldHdvcmsuIFRoaXMgaXMgdW51c3VhbCBmb3IgYSBjb21wbGV0ZWQgY2hhcmdlIC0tIGNvbnRhY3Qgc3VwcG9ydCBpZiB0aGlzIGRvZXNuJ3QgbG9vayByaWdodC5cIixcbiAgICAgIH07XG4gICAgICBpZiAoY29kZSAmJiBzdGF0dXMgPT09ICdhcHByb3ZlZF9ieV9uZXR3b3JrJykgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYEFwcHJvdmVkIChhdXRoIGNvZGU6ICR7Y29kZX0pYCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgaWYgKGNvZGUpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGBBdXRoIGNvZGU6ICR7Y29kZX1gLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgICBpZiAoc3RhdHVzID09PSAnYXBwcm92ZWRfYnlfbmV0d29yaycpIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6ICdBcHByb3ZlZCBieSBuZXR3b3JrJyxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYE5ldHdvcmsgc3RhdHVzOiAke3N0YXR1c31gLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgJ2N1c3RvbWVyX2VtYWlsJzpcbiAgICAgIGlmICghZGlzcHV0ZS5jdXN0b21lcl9lbWFpbCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiBkaXNwdXRlLmN1c3RvbWVyX2VtYWlsLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAnYmlsbGluZ19hZGRyZXNzJzpcbiAgICAgIGlmICghZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MsXG4gICAgICAgIGd1aWRhbmNlOiBcIldlIHB1bGxlZCB0aGlzIGZyb20geW91ciB0cmFuc2FjdGlvbiAtLSB5b3UncmUgY292ZXJlZCBoZXJlLlwiLFxuICAgICAgfTtcbiAgICBjYXNlICd0cmFuc2FjdGlvbl9kYXRlJzpcbiAgICAgIGlmICghZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogJ3Bvc2l0aXZlJyxcbiAgICAgICAgdmFsdWU6IGZvcm1hdERhdGUoZGlzcHV0ZS50cmFuc2FjdGlvbl9kYXRlKSxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIGNhc2UgJ3JlY2VpcHRfdXJsJzpcbiAgICAgIGlmICghZGlzcHV0ZS5yZWNlaXB0X3VybCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6ICdwb3NpdGl2ZScsXG4gICAgICAgIHZhbHVlOiAnUmVjZWlwdCBhdmFpbGFibGUnLFxuICAgICAgICBndWlkYW5jZTogXCJXZSBwdWxsZWQgdGhpcyBmcm9tIHlvdXIgdHJhbnNhY3Rpb24gLS0geW91J3JlIGNvdmVyZWQgaGVyZS5cIixcbiAgICAgIH07XG4gICAgY2FzZSAncmVmdW5kX2RhdGEnOiB7XG4gICAgICBjb25zdCByZWZ1bmRzID0gZGlzcHV0ZS5yZWZ1bmRzO1xuICAgICAgaWYgKCFyZWZ1bmRzIHx8IHJlZnVuZHMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHIgPSByZWZ1bmRzWzBdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAncG9zaXRpdmUnLFxuICAgICAgICB2YWx1ZTogYFJlZnVuZCBvZiAke2Zvcm1hdEN1cnJlbmN5KHIuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX0gb24gJHtmb3JtYXREYXRlKHIuY3JlYXRlZCl9YCxcbiAgICAgICAgZ3VpZGFuY2U6IFwiV2UgcHVsbGVkIHRoaXMgZnJvbSB5b3VyIHRyYW5zYWN0aW9uIC0tIHlvdSdyZSBjb3ZlcmVkIGhlcmUuXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBCdWlsZHMgdGhlIGluaXRpYWwgY2hlY2tsaXN0IHN0YXRlIGJ5IG1lcmdpbmc6XG4gKiAxLiBEZWZhdWx0IChhbGwgZmFsc2UpXG4gKiAyLiBBdXRvLXBvcHVsYXRlZCBpdGVtcyAodHJ1ZSBpZiBTdHJpcGUgZGF0YSBleGlzdHMpXG4gKiAzLiBTYXZlZCBzdGF0ZSBmcm9tIFN1cGFiYXNlIChvdmVycmlkZXMgZXZlcnl0aGluZylcbiAqL1xuZnVuY3Rpb24gYnVpbGRJbml0aWFsU3RhdGUoXG4gIGl0ZW1zOiBFdmlkZW5jZUNoZWNrbGlzdEl0ZW1bXSxcbiAgZGlzcHV0ZTogRGlzcHV0ZSxcbik6IENoZWNrbGlzdFN0YXRlIHtcbiAgY29uc3Qgc3RhdGU6IENoZWNrbGlzdFN0YXRlID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIHN0YXRlW2l0ZW0uaXRlbV0gPSBmYWxzZTtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRTdHJpcGVGaWVsZFJlc3VsdChpdGVtLCBkaXNwdXRlKTtcbiAgICBpZiAocmVzdWx0Py5zdGF0dXMgPT09ICdwb3NpdGl2ZScpIHtcbiAgICAgIHN0YXRlW2l0ZW0uaXRlbV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoZGlzcHV0ZS5jaGVja2xpc3Rfc3RhdGUpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSkpIHtcbiAgICAgIGlmIChrZXkgaW4gc3RhdGUpIHtcbiAgICAgICAgc3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmNvbnN0IEV2aWRlbmNlQ2hlY2tsaXN0ID0gKHsgZGlzcHV0ZSwgcGxheWJvb2ssIGNvbnRleHQsIGlzVXJnZW50LCBkYXlzUmVtYWluaW5nIH06IEV2aWRlbmNlQ2hlY2tsaXN0UHJvcHMpID0+IHtcbiAgY29uc3QgaXRlbXMgPSBwbGF5Ym9vaz8uZXZpZGVuY2VfY2hlY2tsaXN0ID8/IFtdO1xuICBjb25zdCBbY2hlY2tsaXN0U3RhdGUsIHNldENoZWNrbGlzdFN0YXRlXSA9IHVzZVN0YXRlPENoZWNrbGlzdFN0YXRlPigoKSA9PlxuICAgIGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKSxcbiAgKTtcbiAgY29uc3QgW25vdGVzU3RhdGUsIHNldE5vdGVzU3RhdGVdID0gdXNlU3RhdGU8Tm90ZXNTdGF0ZT4oXG4gICAgKCkgPT4gZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMgPz8ge30sXG4gICk7XG4gIGNvbnN0IFtleHBhbmRlZFNlY3Rpb25zLCBzZXRFeHBhbmRlZFNlY3Rpb25zXSA9IHVzZVN0YXRlPE1hcDxzdHJpbmcsIFNldDxFeHBhbmRlZFNlY3Rpb24+Pj4obmV3IE1hcCgpKTtcbiAgY29uc3QgW2ZpbGVzU3RhdGUsIHNldEZpbGVzU3RhdGVdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgRXZpZGVuY2VGaWxlIHwgbnVsbD4+KHt9KTtcbiAgY29uc3QgW3Nob3dGdWxsQ2hlY2tsaXN0LCBzZXRTaG93RnVsbENoZWNrbGlzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVmcyBmb3IgZGVib3VuY2VkIHNhdmVzXG4gIGNvbnN0IGNoZWNrbGlzdFRpbWVvdXRSZWYgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsPihudWxsKTtcbiAgY29uc3Qgbm90ZXNUaW1lb3V0UmVmID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgLy8gUmVidWlsZCBzdGF0ZSB3aGVuIGRpc3B1dGUgb3IgcGxheWJvb2sgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldENoZWNrbGlzdFN0YXRlKGJ1aWxkSW5pdGlhbFN0YXRlKGl0ZW1zLCBkaXNwdXRlKSk7XG4gICAgc2V0Tm90ZXNTdGF0ZShkaXNwdXRlLmNoZWNrbGlzdF9ub3RlcyA/PyB7fSk7XG4gIH0sIFtkaXNwdXRlLmlkLCBkaXNwdXRlLmNoZWNrbGlzdF9zdGF0ZSwgZGlzcHV0ZS5jaGVja2xpc3Rfbm90ZXMsIHBsYXlib29rPy5yZWFzb25fY29kZV0pO1xuXG4gIC8vIEZldGNoIGV2aWRlbmNlIGZpbGVzIG9uIG1vdW50IC8gZGlzcHV0ZSBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEZpbGVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRXZpZGVuY2VGaWxlW10gfT4oXG4gICAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfS9ldmlkZW5jZS1maWxlc2AsXG4gICAgICAgICAgY29udGV4dFJlZi5jdXJyZW50LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaWxlTWFwOiBSZWNvcmQ8c3RyaW5nLCBFdmlkZW5jZUZpbGUgfCBudWxsPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVzdWx0LmRhdGEpIHtcbiAgICAgICAgICBmaWxlTWFwW2ZpbGUuY2hlY2tsaXN0X2l0ZW1fa2V5XSA9IGZpbGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmlsZXNTdGF0ZShmaWxlTWFwKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZXZpZGVuY2UgZmlsZXM6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZldGNoRmlsZXMoKTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICBjb25zdCBwZXJzaXN0Q2hlY2tsaXN0ID0gdXNlQ2FsbGJhY2soKG5ld1N0YXRlOiBDaGVja2xpc3RTdGF0ZSkgPT4ge1xuICAgIGlmIChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgIH1cbiAgICBjaGVja2xpc3RUaW1lb3V0UmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBhdGNoQmFja2VuZChgL2FwaS9kaXNwdXRlcy8ke2Rpc3B1dGUuaWR9YCwgY29udGV4dFJlZi5jdXJyZW50LCB7XG4gICAgICAgIGNoZWNrbGlzdF9zdGF0ZTogbmV3U3RhdGUsXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGNoZWNrbGlzdCBzdGF0ZTonLCBlcnIpO1xuICAgICAgfSk7XG4gICAgfSwgNTAwKTtcbiAgfSwgW2Rpc3B1dGUuaWRdKTtcblxuICBjb25zdCBwZXJzaXN0Tm90ZXMgPSB1c2VDYWxsYmFjaygobmV3Tm90ZXM6IE5vdGVzU3RhdGUpID0+IHtcbiAgICBpZiAobm90ZXNUaW1lb3V0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChub3Rlc1RpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgfVxuICAgIG5vdGVzVGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwYXRjaEJhY2tlbmQoYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCwge1xuICAgICAgICBjaGVja2xpc3Rfbm90ZXM6IG5ld05vdGVzLFxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaGVja2xpc3Qgbm90ZXM6JywgZXJyKTtcbiAgICAgIH0pO1xuICAgIH0sIDEwMDApO1xuICB9LCBbZGlzcHV0ZS5pZF0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZSA9IHVzZUNhbGxiYWNrKChpdGVtTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q2hlY2tsaXN0U3RhdGUoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0geyAuLi5wcmV2LCBbaXRlbU5hbWVdOiAhcHJldltpdGVtTmFtZV0gfTtcbiAgICAgIHBlcnNpc3RDaGVja2xpc3QobmV3U3RhdGUpO1xuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH0pO1xuICB9LCBbcGVyc2lzdENoZWNrbGlzdF0pO1xuXG4gIGNvbnN0IGhhbmRsZU5vdGVzQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGl0ZW1OYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBzZXROb3Rlc1N0YXRlKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdOb3RlcyA9IHsgLi4ucHJldiwgW2l0ZW1OYW1lXTogdmFsdWUgfTtcbiAgICAgIHBlcnNpc3ROb3RlcyhuZXdOb3Rlcyk7XG4gICAgICByZXR1cm4gbmV3Tm90ZXM7XG4gICAgfSk7XG4gIH0sIFtwZXJzaXN0Tm90ZXNdKTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGl0ZW1OYW1lOiBzdHJpbmcsIGZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGwpID0+IHtcbiAgICBzZXRGaWxlc1N0YXRlKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbaXRlbU5hbWVdOiBmaWxlIH0pKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25Ub2dnbGUgPSB1c2VDYWxsYmFjaygoaXRlbU5hbWU6IHN0cmluZywgc2VjdGlvbjogRXhwYW5kZWRTZWN0aW9uKSA9PiB7XG4gICAgc2V0RXhwYW5kZWRTZWN0aW9ucygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IG5ldyBNYXAocHJldik7XG4gICAgICBjb25zdCBzZWN0aW9ucyA9IG5ldyBTZXQocHJldi5nZXQoaXRlbU5hbWUpID8/IFtdKTtcbiAgICAgIGlmIChzZWN0aW9ucy5oYXMoc2VjdGlvbikpIHtcbiAgICAgICAgc2VjdGlvbnMuZGVsZXRlKHNlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnMuYWRkKHNlY3Rpb24pO1xuICAgICAgfVxuICAgICAgbmV4dC5zZXQoaXRlbU5hbWUsIHNlY3Rpb25zKTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgLy8gTm8gcGxheWJvb2sgZmFsbGJhY2tcbiAgaWYgKCFwbGF5Ym9vayB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgIDxCYW5uZXJcbiAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgdGl0bGU9XCJObyBldmlkZW5jZSBjaGVja2xpc3QgYXZhaWxhYmxlXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5vIHNwZWNpZmljIGV2aWRlbmNlIGNoZWNrbGlzdCBmb3IgdGhpcyByZWFzb24gY29kZS4gVXNlIFN0cmlwZSdzIGdlbmVyYWwgZXZpZGVuY2UgZ3VpZGVsaW5lcyBmb3IgeW91ciByZXNwb25zZS5cIlxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIC8vIEZpbHRlciBmb3IgdXJnZW5jeSBtb2RlXG4gIGNvbnN0IGVmZmVjdGl2ZVVyZ2VuY3kgPSBpc1VyZ2VudCAmJiAhc2hvd0Z1bGxDaGVja2xpc3Q7XG4gIGxldCBkaXNwbGF5SXRlbXMgPSBpdGVtcztcbiAgaWYgKGVmZmVjdGl2ZVVyZ2VuY3kpIHtcbiAgICBkaXNwbGF5SXRlbXMgPSBpdGVtc1xuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS51cmdlbmN5X2Vzc2VudGlhbClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiAoYS51cmdlbmN5X29yZGVyID8/IDk5OSkgLSAoYi51cmdlbmN5X29yZGVyID8/IDk5OSkpO1xuICB9XG5cbiAgLy8gR3JvdXAgYnkgY2F0ZWdvcnlcbiAgY29uc3QgZ3JvdXBlZCA9IENBVEVHT1JZX09SREVSLm1hcCgoY2F0ZWdvcnkpID0+ICh7XG4gICAgY2F0ZWdvcnksXG4gICAgbGFiZWw6IENBVEVHT1JZX0xBQkVMU1tjYXRlZ29yeV0sXG4gICAgaXRlbXM6IGRpc3BsYXlJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY2F0ZWdvcnkgPT09IGNhdGVnb3J5KSxcbiAgfSkpLmZpbHRlcigoZ3JvdXApID0+IGdyb3VwLml0ZW1zLmxlbmd0aCA+IDApO1xuXG4gIC8vIFByb2dyZXNzIGNvdW50cyAoYWx3YXlzIGFnYWluc3QgZnVsbCBsaXN0LCBub3QgZmlsdGVyZWQpXG4gIGNvbnN0IHRvdGFsSXRlbXMgPSBpdGVtcy5sZW5ndGg7XG4gIGNvbnN0IGNvbXBsZXRlZEl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBjaGVja2xpc3RTdGF0ZVtpdGVtLml0ZW1dKS5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbGFyZ2UnIH19PlxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgIHRpdGxlPVwiR2F0aGVyIHlvdXIgZXZpZGVuY2VcIlxuICAgICAgICBkZXNjcmlwdGlvbj1cIkhlcmUncyB3aGF0IHlvdSdsbCBuZWVkIHRvIGJ1aWxkIHlvdXIgY2FzZS4gRXhwYW5kIGVhY2ggaXRlbSB0byBzZWUgd2h5IGl0IG1hdHRlcnMgYW5kIGpvdCBkb3duIG5vdGVzIGFzIHlvdSBnby5cIlxuICAgICAgLz5cblxuICAgICAgPENoZWNrbGlzdFByb2dyZXNzIGNvbXBsZXRlZD17Y29tcGxldGVkSXRlbXN9IHRvdGFsPXt0b3RhbEl0ZW1zfSAvPlxuXG4gICAgICB7aXNVcmdlbnQgJiYgKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxCYW5uZXJcbiAgICAgICAgICAgIHR5cGU9XCJjYXV0aW9uXCJcbiAgICAgICAgICAgIHRpdGxlPXtgJHtkYXlzUmVtYWluaW5nfSBkYXkke2RheXNSZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gbGVmdCB0byByZXNwb25kYH1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtzaG93RnVsbENoZWNrbGlzdFxuICAgICAgICAgICAgICA/ICdTaG93aW5nIGFsbCBldmlkZW5jZSBpdGVtcy4nXG4gICAgICAgICAgICAgIDogJ1Nob3dpbmcgb25seSBlc3NlbnRpYWwgaXRlbXMgdG8gbWF4aW1pemUgeW91ciBjaGFuY2VzLid9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93RnVsbENoZWNrbGlzdCghc2hvd0Z1bGxDaGVja2xpc3QpfT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdpbmZvJyB9fT5cbiAgICAgICAgICAgICAge3Nob3dGdWxsQ2hlY2tsaXN0ID8gJ1Nob3cgZXNzZW50aWFscyBvbmx5JyA6ICdWaWV3IGZ1bGwgY2hlY2tsaXN0J31cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7Z3JvdXBlZC5tYXAoKHsgY2F0ZWdvcnksIGxhYmVsLCBpdGVtczogZ3JvdXBJdGVtcyB9LCBncm91cEluZGV4KSA9PiAoXG4gICAgICAgIDxCb3gga2V5PXtjYXRlZ29yeX0gY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICB7Z3JvdXBJbmRleCA+IDAgJiYgPERpdmlkZXIgLz59XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnc2Vjb25kYXJ5JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAge2dyb3VwSXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdHJpcGVSZXN1bHQgPSBnZXRTdHJpcGVGaWVsZFJlc3VsdChpdGVtLCBkaXNwdXRlKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxDaGVja2xpc3RJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLml0ZW19XG4gICAgICAgICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXshIWNoZWNrbGlzdFN0YXRlW2l0ZW0uaXRlbV19XG4gICAgICAgICAgICAgICAgc3RyaXBlRmllbGRSZXN1bHQ9e3N0cmlwZVJlc3VsdCA/PyB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgZXhwYW5kZWRTZWN0aW9ucz17ZXhwYW5kZWRTZWN0aW9ucy5nZXQoaXRlbS5pdGVtKSA/PyBuZXcgU2V0KCl9XG4gICAgICAgICAgICAgICAgbm90ZXM9e25vdGVzU3RhdGVbaXRlbS5pdGVtXSA/PyAnJ31cbiAgICAgICAgICAgICAgICBleGlzdGluZ0ZpbGU9e2ZpbGVzU3RhdGVbaXRlbS5pdGVtXSA/PyBudWxsfVxuICAgICAgICAgICAgICAgIGRpc3B1dGVJZD17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtjb250ZXh0UmVmLmN1cnJlbnR9XG4gICAgICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IGhhbmRsZVRvZ2dsZShpdGVtLml0ZW0pfVxuICAgICAgICAgICAgICAgIG9uU2VjdGlvblRvZ2dsZT17KHNlY3Rpb24pID0+IGhhbmRsZVNlY3Rpb25Ub2dnbGUoaXRlbS5pdGVtLCBzZWN0aW9uKX1cbiAgICAgICAgICAgICAgICBvbk5vdGVzQ2hhbmdlPXsodmFsdWUpID0+IGhhbmRsZU5vdGVzQ2hhbmdlKGl0ZW0uaXRlbSwgdmFsdWUpfVxuICAgICAgICAgICAgICAgIG9uRmlsZUNoYW5nZT17KGZpbGUpID0+IGhhbmRsZUZpbGVDaGFuZ2UoaXRlbS5pdGVtLCBmaWxlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKSl9XG5cbiAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdkaXNhYmxlZCcgfX0+XG4gICAgICAgIFlvdXIgcHJvZ3Jlc3MgYW5kIG5vdGVzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgPC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFdmlkZW5jZUNoZWNrbGlzdDtcbiIsICJpbXBvcnQgeyBCb3gsIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBDaGVja2xpc3RQcm9ncmVzc1Byb3BzIHtcbiAgY29tcGxldGVkOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbnR5cGUgRnJhY3Rpb25XaWR0aCA9ICcxLzEyJyB8ICcyLzEyJyB8ICczLzEyJyB8ICc0LzEyJyB8ICc1LzEyJyB8ICc2LzEyJyB8ICc3LzEyJyB8ICc4LzEyJyB8ICc5LzEyJyB8ICcxMC8xMicgfCAnMTEvMTInIHwgJ2ZpbGwnO1xuXG5mdW5jdGlvbiBnZXRQcm9ncmVzc1dpZHRoKGNvbXBsZXRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyKTogRnJhY3Rpb25XaWR0aCB8IG51bGwge1xuICBpZiAodG90YWwgPT09IDAgfHwgY29tcGxldGVkID09PSAwKSByZXR1cm4gbnVsbDtcbiAgaWYgKGNvbXBsZXRlZCA+PSB0b3RhbCkgcmV0dXJuICdmaWxsJztcbiAgY29uc3QgdHdlbGZ0aHMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKChjb21wbGV0ZWQgLyB0b3RhbCkgKiAxMikpO1xuICByZXR1cm4gYCR7dHdlbGZ0aHN9LzEyYCBhcyBGcmFjdGlvbldpZHRoO1xufVxuXG5jb25zdCBDaGVja2xpc3RQcm9ncmVzcyA9ICh7IGNvbXBsZXRlZCwgdG90YWwgfTogQ2hlY2tsaXN0UHJvZ3Jlc3NQcm9wcykgPT4ge1xuICBjb25zdCBwcm9ncmVzc1dpZHRoID0gZ2V0UHJvZ3Jlc3NXaWR0aChjb21wbGV0ZWQsIHRvdGFsKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ3N1YmhlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIEV2aWRlbmNlIFByb2dyZXNzXG4gICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7Y29tcGxldGVkfSBvZiB7dG90YWx9IGNvbXBsZXRlZFxuICAgICAgICA8L0lubGluZT5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveCBjc3M9e3sgYmFja2dyb3VuZENvbG9yOiAnY29udGFpbmVyJywgYm9yZGVyUmFkaXVzOiAncm91bmRlZCcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAge3Byb2dyZXNzV2lkdGggPyAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3N1cmZhY2UnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICdyb3VuZGVkJyxcbiAgICAgICAgICAgICAgd2lkdGg6IHByb2dyZXNzV2lkdGgsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICd4eHNtYWxsJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPElubGluZT57JyAnfTwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICd4eHNtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmU+eycgJ308L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tsaXN0UHJvZ3Jlc3M7XG4iLCAiaW1wb3J0IHsgQm94LCBDaGVja2JveCwgQmFkZ2UsIElubGluZSwgTGluaywgSWNvbiwgVGV4dEFyZWEgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvY29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbSwgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU3RyaXBlRmllbGRSZXN1bHQgfSBmcm9tICcuL0V2aWRlbmNlQ2hlY2tsaXN0JztcbmltcG9ydCBGaWxlVXBsb2FkU2VjdGlvbiBmcm9tICcuL0ZpbGVVcGxvYWRTZWN0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhwYW5kZWRTZWN0aW9uID0gJ3doeScgfCAnd2hlcmUnIHwgJ25vdGVzJyB8ICdmaWxlJztcblxuaW50ZXJmYWNlIENoZWNrbGlzdEl0ZW1Qcm9wcyB7XG4gIGl0ZW06IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbTtcbiAgY2hlY2tlZDogYm9vbGVhbjtcbiAgc3RyaXBlRmllbGRSZXN1bHQ/OiBTdHJpcGVGaWVsZFJlc3VsdDtcbiAgZXhwYW5kZWRTZWN0aW9uczogU2V0PEV4cGFuZGVkU2VjdGlvbj47XG4gIG5vdGVzOiBzdHJpbmc7XG4gIGV4aXN0aW5nRmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbDtcbiAgZGlzcHV0ZUlkOiBzdHJpbmc7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb246IEV4cGFuZGVkU2VjdGlvbikgPT4gdm9pZDtcbiAgb25Ob3Rlc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRmlsZUNoYW5nZTogKGZpbGU6IEV2aWRlbmNlRmlsZSB8IG51bGwpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIGdldENhdGVnb3J5QmFkZ2UoY2F0ZWdvcnk6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVsnY2F0ZWdvcnknXSkge1xuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgY2FzZSAnbWFuZGF0b3J5JzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5lZ2F0aXZlXCI+UkVRVUlSRUQ8L0JhZGdlPjtcbiAgICBjYXNlICdyZWNvbW1lbmRlZCc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJ3YXJuaW5nXCI+SEVMUEZVTDwvQmFkZ2U+O1xuICAgIGNhc2UgJ3NpdHVhdGlvbmFsJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIm5ldXRyYWxcIj5JRiBBUFBMSUNBQkxFPC9CYWRnZT47XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3RyaXBlU3RhdHVzQmFkZ2UocmVzdWx0OiBTdHJpcGVGaWVsZFJlc3VsdCkge1xuICBzd2l0Y2ggKHJlc3VsdC5zdGF0dXMpIHtcbiAgICBjYXNlICdwb3NpdGl2ZSc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJpbmZvXCI+RlJPTSBTVFJJUEU8L0JhZGdlPjtcbiAgICBjYXNlICd1bmF2YWlsYWJsZSc6XG4gICAgICByZXR1cm4gPEJhZGdlIHR5cGU9XCJuZXV0cmFsXCI+Tk9UIEFWQUlMQUJMRTwvQmFkZ2U+O1xuICAgIGNhc2UgJ25lZ2F0aXZlJzpcbiAgICAgIHJldHVybiA8QmFkZ2UgdHlwZT1cIndhcm5pbmdcIj5IRUFEUyBVUDwvQmFkZ2U+O1xuICB9XG59XG5cbmludGVyZmFjZSBTZWN0aW9uVG9nZ2xlUHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICBleHBhbmRlZDogYm9vbGVhbjtcbiAgb25QcmVzczogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgU2VjdGlvblRvZ2dsZSA9ICh7IGxhYmVsLCBleHBhbmRlZCwgb25QcmVzcyB9OiBTZWN0aW9uVG9nZ2xlUHJvcHMpID0+IChcbiAgPExpbmsgb25QcmVzcz17b25QcmVzc30+XG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHhzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPEljb24gbmFtZT17ZXhwYW5kZWQgPyAnY2hldnJvblVwJyA6ICdjaGV2cm9uRG93bid9IHNpemU9XCJ4c21hbGxcIiAvPlxuICAgIDwvQm94PlxuICA8L0xpbms+XG4pO1xuXG5jb25zdCBDaGVja2xpc3RJdGVtID0gKHtcbiAgaXRlbSxcbiAgY2hlY2tlZCxcbiAgc3RyaXBlRmllbGRSZXN1bHQsXG4gIGV4cGFuZGVkU2VjdGlvbnMsXG4gIG5vdGVzLFxuICBleGlzdGluZ0ZpbGUsXG4gIGRpc3B1dGVJZCxcbiAgY29udGV4dCxcbiAgb25Ub2dnbGUsXG4gIG9uU2VjdGlvblRvZ2dsZSxcbiAgb25Ob3Rlc0NoYW5nZSxcbiAgb25GaWxlQ2hhbmdlLFxufTogQ2hlY2tsaXN0SXRlbVByb3BzKSA9PiB7XG4gIGNvbnN0IHdoeUV4cGFuZGVkID0gZXhwYW5kZWRTZWN0aW9ucy5oYXMoJ3doeScpO1xuICBjb25zdCB3aGVyZUV4cGFuZGVkID0gZXhwYW5kZWRTZWN0aW9ucy5oYXMoJ3doZXJlJyk7XG4gIGNvbnN0IG5vdGVzRXhwYW5kZWQgPSBleHBhbmRlZFNlY3Rpb25zLmhhcygnbm90ZXMnKTtcbiAgY29uc3QgZmlsZUV4cGFuZGVkID0gZXhwYW5kZWRTZWN0aW9ucy5oYXMoJ2ZpbGUnKTtcblxuICBjb25zdCBpc1VuYXZhaWxhYmxlID0gc3RyaXBlRmllbGRSZXN1bHQ/LnN0YXR1cyA9PT0gJ3VuYXZhaWxhYmxlJztcbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHN0cmlwZUZpZWxkUmVzdWx0Py5zdGF0dXMgPT09ICduZWdhdGl2ZSc7XG4gIGNvbnN0IGlzUG9zaXRpdmUgPSBzdHJpcGVGaWVsZFJlc3VsdD8uc3RhdHVzID09PSAncG9zaXRpdmUnO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3tcbiAgICAgIHN0YWNrOiAneScsXG4gICAgICBnYXA6ICdzbWFsbCcsXG4gICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnbWVkaXVtJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2NvbnRhaW5lcicsXG4gICAgfX0+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGFsaWduWTogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxDaGVja2JveFxuICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZX1cbiAgICAgICAgICBkaXNhYmxlZD17aXNVbmF2YWlsYWJsZSB8fCBpc1Bvc2l0aXZlfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0uaXRlbX1cbiAgICAgICAgLz5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHhzbWFsbCcsIHdpZHRoOiAnZmlsbCcgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3tcbiAgICAgICAgICAgICAgZm9udDogJ2JvZHknLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnc2VtaWJvbGQnLFxuICAgICAgICAgICAgICBjb2xvcjogaXNVbmF2YWlsYWJsZSA/ICdkaXNhYmxlZCcgOiBjaGVja2VkID8gJ3NlY29uZGFyeScgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge2l0ZW0uaXRlbX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAge3N0cmlwZUZpZWxkUmVzdWx0ICYmIGdldFN0cmlwZVN0YXR1c0JhZGdlKHN0cmlwZUZpZWxkUmVzdWx0KX1cbiAgICAgICAgICAgIHtnZXRDYXRlZ29yeUJhZGdlKGl0ZW0uY2F0ZWdvcnkpfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdCAmJiAoXG4gICAgICAgICAgICA8SW5saW5lIGNzcz17e1xuICAgICAgICAgICAgICBmb250OiAnY2FwdGlvbicsXG4gICAgICAgICAgICAgIGNvbG9yOiBpc05lZ2F0aXZlID8gJ2F0dGVudGlvbicgOiAnc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICB7c3RyaXBlRmllbGRSZXN1bHQudmFsdWV9XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgbGFiZWw9XCJXaHkgdGhpcyBtYXR0ZXJzXCJcbiAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doeUV4cGFuZGVkfVxuICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ3doeScpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsoaXRlbS53aGVyZV90b19maW5kIHx8IHN0cmlwZUZpZWxkUmVzdWx0KSAmJiAoXG4gICAgICAgICAgICAgIDxTZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICAgICAgbGFiZWw9e3N0cmlwZUZpZWxkUmVzdWx0ID8gJ0RldGFpbHMnIDogJ1doZXJlIHRvIGZpbmQgdGhpcyd9XG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ9e3doZXJlRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gb25TZWN0aW9uVG9nZ2xlKCd3aGVyZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshaXNVbmF2YWlsYWJsZSAmJiAhaXNQb3NpdGl2ZSAmJiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFNlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtub3RlcyA/ICdZb3VyIG5vdGVzJyA6ICdBZGQgbm90ZXMnfVxuICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ9e25vdGVzRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBvblNlY3Rpb25Ub2dnbGUoJ25vdGVzJyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8U2VjdGlvblRvZ2dsZVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2V4aXN0aW5nRmlsZSA/IGV4aXN0aW5nRmlsZS5maWxlX25hbWUgOiAnQXR0YWNoIGZpbGUnfVxuICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ9e2ZpbGVFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uU2VjdGlvblRvZ2dsZSgnZmlsZScpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgICAge3doeUV4cGFuZGVkICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtpdGVtLndoeV9tYXR0ZXJzfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt3aGVyZUV4cGFuZGVkICYmIChpdGVtLndoZXJlX3RvX2ZpbmQgfHwgc3RyaXBlRmllbGRSZXN1bHQpICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScsIHBhZGRpbmc6ICdzbWFsbCcsIGJvcmRlclJhZGl1czogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiBpc05lZ2F0aXZlID8gJ2F0dGVudGlvbicgOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtzdHJpcGVGaWVsZFJlc3VsdFxuICAgICAgICAgICAgICA/IHN0cmlwZUZpZWxkUmVzdWx0Lmd1aWRhbmNlXG4gICAgICAgICAgICAgIDogaXRlbS53aGVyZV90b19maW5kfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHtub3Rlc0V4cGFuZGVkICYmICFpc1VuYXZhaWxhYmxlICYmIChcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luTGVmdDogJ3hsYXJnZScgfX0+XG4gICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICBsYWJlbD1cIllvdXIgbm90ZXNcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIHRyYWNraW5nICMsIGZpbGUgbmFtZSwgd2hlcmUgdG8gZmluZCB0aGlzLi4uXCJcbiAgICAgICAgICAgIHZhbHVlPXtub3Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Ob3Rlc0NoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAge2ZpbGVFeHBhbmRlZCAmJiAhaXNVbmF2YWlsYWJsZSAmJiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkxlZnQ6ICd4bGFyZ2UnIH19PlxuICAgICAgICAgIDxGaWxlVXBsb2FkU2VjdGlvblxuICAgICAgICAgICAgZGlzcHV0ZUlkPXtkaXNwdXRlSWR9XG4gICAgICAgICAgICBjaGVja2xpc3RJdGVtS2V5PXtpdGVtLml0ZW19XG4gICAgICAgICAgICBleGlzdGluZ0ZpbGU9e2V4aXN0aW5nRmlsZX1cbiAgICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgICBvbkZpbGVDaGFuZ2U9e29uRmlsZUNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGVja2xpc3RJdGVtO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCYW5uZXIsIEJhZGdlLCBJbmxpbmUsIExpbmssIEljb24sIFN0cmlwZUZpbGVVcGxvYWRlciB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCB0eXBlIHsgRXZpZGVuY2VGaWxlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgZGVsZXRlQmFja2VuZCB9IGZyb20gJy4uLy4uL2xpYi9hcGlDbGllbnQnO1xuXG5pbnRlcmZhY2UgRmlsZVVwbG9hZFNlY3Rpb25Qcm9wcyB7XG4gIGRpc3B1dGVJZDogc3RyaW5nO1xuICBjaGVja2xpc3RJdGVtS2V5OiBzdHJpbmc7XG4gIGV4aXN0aW5nRmlsZTogRXZpZGVuY2VGaWxlIHwgbnVsbDtcbiAgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlO1xuICBvbkZpbGVDaGFuZ2U6IChmaWxlOiBFdmlkZW5jZUZpbGUgfCBudWxsKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRGaWxlU2l6ZShieXRlczogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKGJ5dGVzIDwgMTAyNCkgcmV0dXJuIGAke2J5dGVzfSBCYDtcbiAgaWYgKGJ5dGVzIDwgMTAyNCAqIDEwMjQpIHJldHVybiBgJHsoYnl0ZXMgLyAxMDI0KS50b0ZpeGVkKDEpfSBLQmA7XG4gIHJldHVybiBgJHsoYnl0ZXMgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDEpfSBNQmA7XG59XG5cbmZ1bmN0aW9uIGdldE1pbWVMYWJlbChtaW1lVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhcHBsaWNhdGlvbi9wZGYnOiAnUERGJyxcbiAgICAnaW1hZ2UvcG5nJzogJ1BORycsXG4gICAgJ2ltYWdlL2pwZWcnOiAnSlBHJyxcbiAgICAnaW1hZ2UvZ2lmJzogJ0dJRicsXG4gICAgJ3RleHQvY3N2JzogJ0NTVicsXG4gICAgJ3RleHQvcGxhaW4nOiAnVFhUJyxcbiAgfTtcbiAgcmV0dXJuIG1hcFttaW1lVHlwZV0gPz8gJ0ZJTEUnO1xufVxuXG5jb25zdCBGaWxlVXBsb2FkU2VjdGlvbiA9ICh7XG4gIGRpc3B1dGVJZCxcbiAgY2hlY2tsaXN0SXRlbUtleSxcbiAgZXhpc3RpbmdGaWxlLFxuICBjb250ZXh0LFxuICBvbkZpbGVDaGFuZ2UsXG59OiBGaWxlVXBsb2FkU2VjdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93UmVwbGFjZSwgc2V0U2hvd1JlcGxhY2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZENvbXBsZXRlID0gYXN5bmMgKGZpbGVPYmplY3Q6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICB0eXBlPzogc3RyaW5nO1xuICB9KSA9PiB7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0U2F2aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IEV2aWRlbmNlRmlsZSB9PihcbiAgICAgICAgYC9hcGkvZGlzcHV0ZXMvJHtkaXNwdXRlSWR9L2V2aWRlbmNlLWZpbGVzYCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAge1xuICAgICAgICAgIGNoZWNrbGlzdF9pdGVtX2tleTogY2hlY2tsaXN0SXRlbUtleSxcbiAgICAgICAgICBzdHJpcGVfZmlsZV9pZDogZmlsZU9iamVjdC5pZCxcbiAgICAgICAgICBmaWxlX25hbWU6IGZpbGVPYmplY3QuZmlsZW5hbWUgPz8gJ3VudGl0bGVkJyxcbiAgICAgICAgICBmaWxlX3NpemU6IGZpbGVPYmplY3Quc2l6ZSxcbiAgICAgICAgICBtaW1lX3R5cGU6IGZpbGVPYmplY3QudHlwZSA/PyAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBvbkZpbGVDaGFuZ2UocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0U2hvd1JlcGxhY2UoZmFsc2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBzYXZlIGZpbGUgcmVjb3JkLiBUaGUgZmlsZSB3YXMgdXBsb2FkZWQgdG8gU3RyaXBlIGJ1dCB3ZSBjb3VsZCBub3QgbGluayBpdC4gVHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGxvYWRFcnJvciA9ICgpID0+IHtcbiAgICBzZXRFcnJvcignVXBsb2FkIGZhaWxlZC4gQ2hlY2sgeW91ciBmaWxlIGlzIHVuZGVyIDEwTUIgYW5kIGEgc3VwcG9ydGVkIHR5cGUgKFBERiwgUE5HLCBKUEcsIEdJRiwgQ1NWLCBUWFQpLicpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWV4aXN0aW5nRmlsZSkgcmV0dXJuO1xuICAgIHNldEVycm9yKG51bGwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZUJhY2tlbmQoXG4gICAgICAgIGAvYXBpL2Rpc3B1dGVzLyR7ZGlzcHV0ZUlkfS9ldmlkZW5jZS1maWxlcy8ke2V4aXN0aW5nRmlsZS5pZH1gLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgKTtcbiAgICAgIG9uRmlsZUNoYW5nZShudWxsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGZpbGUuIFRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPEJhbm5lclxuICAgICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgICAgdGl0bGU9XCJVcGxvYWQgaXNzdWVcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtlcnJvcn1cbiAgICAgICAgICBvbkRpc21pc3M9eygpID0+IHNldEVycm9yKG51bGwpfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAge2V4aXN0aW5nRmlsZSAmJiAhc2hvd1JlcGxhY2UgPyAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJywgd3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT1cInhzbWFsbFwiIC8+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICAgIHtleGlzdGluZ0ZpbGUuZmlsZV9uYW1lfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT1cImluZm9cIj57Z2V0TWltZUxhYmVsKGV4aXN0aW5nRmlsZS5taW1lX3R5cGUpfTwvQmFkZ2U+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2Zvcm1hdEZpbGVTaXplKGV4aXN0aW5nRmlsZS5maWxlX3NpemUpfVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPExpbmsgb25QcmVzcz17KCkgPT4gc2V0U2hvd1JlcGxhY2UodHJ1ZSl9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnaW5mbycgfX0+UmVwbGFjZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmsgb25QcmVzcz17aGFuZGxlUmVtb3ZlfT5cbiAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ2NyaXRpY2FsJyB9fT5SZW1vdmU8L0lubGluZT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogKFxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIHtzaG93UmVwbGFjZSAmJiAoXG4gICAgICAgICAgICA8TGluayBvblByZXNzPXsoKSA9PiBzZXRTaG93UmVwbGFjZShmYWxzZSl9PlxuICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5DYW5jZWwgcmVwbGFjZTwvSW5saW5lPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPFN0cmlwZUZpbGVVcGxvYWRlclxuICAgICAgICAgICAgbGFiZWw9e3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ0Nob29zZSBmaWxlJ31cbiAgICAgICAgICAgIHB1cnBvc2U9XCJkaXNwdXRlX2V2aWRlbmNlXCJcbiAgICAgICAgICAgIG9uQ29tcGxldGU9e2hhbmRsZVVwbG9hZENvbXBsZXRlfVxuICAgICAgICAgICAgb25FcnJvcj17aGFuZGxlVXBsb2FkRXJyb3J9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIFBERiwgUE5HLCBKUEcsIG9yIEdJRi4gTWF4IDEwTUIuXG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVVcGxvYWRTZWN0aW9uO1xuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIENvbnRleHRWaWV3LFxuICBJbmxpbmUsXG4gIFNlbGVjdCxcbiAgU3Bpbm5lcixcbiAgVGFicyxcbiAgVGFiLFxuICBUYWJMaXN0LFxuICBUYWJQYW5lbHMsXG4gIFRhYlBhbmVsLFxuICBCYW5uZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcbmltcG9ydCBEaXNwdXRlQ2FyZCBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVDYXJkJztcbmltcG9ydCBEaXNwdXRlV29ya2Zsb3cgZnJvbSAnLi4vY29tcG9uZW50cy9EaXNwdXRlV29ya2Zsb3cnO1xuaW1wb3J0IEVtcHR5U3RhdGUgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVN0YXRlJztcbmltcG9ydCBFcnJvckJhbm5lciBmcm9tICcuLi9jb21wb25lbnRzL0Vycm9yQmFubmVyJztcbmltcG9ydCB7IGZldGNoQmFja2VuZCwgQXBpRXJyb3IgfSBmcm9tICcuLi9saWIvYXBpQ2xpZW50JztcbmltcG9ydCB7IGlzUmVzb2x2ZWQgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcblxudHlwZSBWaWV3U3RhdGUgPSAnbG9hZGluZycgfCAnZXJyb3InIHwgJ3JlYWR5JztcbnR5cGUgU3RhdHVzRmlsdGVyID0gJ2FsbCcgfCAnbmVlZHNfcmVzcG9uc2UnIHwgJ3VuZGVyX3JldmlldycgfCAncmVzb2x2ZWQnO1xuXG5jb25zdCBGSUxURVJfT1BUSU9OUzogeyB2YWx1ZTogU3RhdHVzRmlsdGVyOyBsYWJlbDogc3RyaW5nIH1bXSA9IFtcbiAgeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnQWxsIGRpc3B1dGVzJyB9LFxuICB7IHZhbHVlOiAnbmVlZHNfcmVzcG9uc2UnLCBsYWJlbDogJ05lZWRzIHJlc3BvbnNlJyB9LFxuICB7IHZhbHVlOiAndW5kZXJfcmV2aWV3JywgbGFiZWw6ICdVbmRlciByZXZpZXcnIH0sXG4gIHsgdmFsdWU6ICdyZXNvbHZlZCcsIGxhYmVsOiAnUmVzb2x2ZWQnIH0sXG5dO1xuXG5mdW5jdGlvbiBtYXRjaGVzRmlsdGVyKGRpc3B1dGU6IERpc3B1dGUsIGZpbHRlcjogU3RhdHVzRmlsdGVyKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAoZmlsdGVyKSB7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiBkaXNwdXRlLnN0YXR1cyA9PT0gJ25lZWRzX3Jlc3BvbnNlJyB8fCBkaXNwdXRlLnN0YXR1cyA9PT0gJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnO1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgICByZXR1cm4gZGlzcHV0ZS5zdGF0dXMgPT09ICd1bmRlcl9yZXZpZXcnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ191bmRlcl9yZXZpZXcnO1xuICAgIGNhc2UgJ3Jlc29sdmVkJzpcbiAgICAgIHJldHVybiBpc1Jlc29sdmVkKGRpc3B1dGUuc3RhdHVzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q291bnRUZXh0KGNvdW50OiBudW1iZXIsIGZpbHRlcjogU3RhdHVzRmlsdGVyKTogc3RyaW5nIHtcbiAgY29uc3Qgbm91biA9IGNvdW50ID09PSAxID8gJ2Rpc3B1dGUnIDogJ2Rpc3B1dGVzJztcbiAgc3dpdGNoIChmaWx0ZXIpIHtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSAke25vdW59YDtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IG5lZWRpbmcgcmVzcG9uc2VgO1xuICAgIGNhc2UgJ3VuZGVyX3Jldmlldyc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHVuZGVyIHJldmlld2A7XG4gICAgY2FzZSAncmVzb2x2ZWQnOlxuICAgICAgcmV0dXJuIGAke2NvdW50fSByZXNvbHZlZGA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gJHtub3VufWA7XG4gIH1cbn1cblxuY29uc3QgRGlzcHV0ZUxpc3RWaWV3ID0gKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCB7IGVudmlyb25tZW50LCB1c2VyQ29udGV4dCB9ID0gY29udGV4dDtcbiAgY29uc3QgW3ZpZXdTdGF0ZSwgc2V0Vmlld1N0YXRlXSA9IHVzZVN0YXRlPFZpZXdTdGF0ZT4oJ2xvYWRpbmcnKTtcbiAgY29uc3QgW2Rpc3B1dGVzLCBzZXREaXNwdXRlc10gPSB1c2VTdGF0ZTxEaXNwdXRlW10+KFtdKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlciwgc2V0U3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlPFN0YXR1c0ZpbHRlcj4oJ2FsbCcpO1xuXG4gIGNvbnN0IFtzZWxlY3RlZERpc3B1dGUsIHNldFNlbGVjdGVkRGlzcHV0ZV0gPSB1c2VTdGF0ZTxEaXNwdXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93V29ya2Zsb3csIHNldFNob3dXb3JrZmxvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgY29uc3QgbG9hZERpc3B1dGVzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldFZpZXdTdGF0ZSgnbG9hZGluZycpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlW10gfT4oJy9hcGkvZGlzcHV0ZXMnLCBjb250ZXh0UmVmLmN1cnJlbnQpO1xuICAgICAgc2V0RGlzcHV0ZXMocmVzdWx0LmRhdGEpO1xuICAgICAgc2V0Vmlld1N0YXRlKCdyZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIGVyciBpbnN0YW5jZW9mIEFwaUVycm9yXG4gICAgICAgICAgPyBlcnIubWVzc2FnZVxuICAgICAgICAgIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGVzLiBQbGVhc2UgdHJ5IGFnYWluLic7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ2Vycm9yJyk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGlzcHV0ZXMoKTtcbiAgfSwgW2xvYWREaXNwdXRlc10pO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdERpc3B1dGUgPSAoZGlzcHV0ZTogRGlzcHV0ZSkgPT4ge1xuICAgIHNldFNlbGVjdGVkRGlzcHV0ZShkaXNwdXRlKTtcbiAgICBzZXRTaG93V29ya2Zsb3codHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2VXb3JrZmxvdyA9IChzaG93bjogYm9vbGVhbikgPT4ge1xuICAgIHNldFNob3dXb3JrZmxvdyhzaG93bik7XG4gICAgaWYgKCFzaG93bikgc2V0U2VsZWN0ZWREaXNwdXRlKG51bGwpO1xuICB9O1xuXG4gIC8vIFNvcnQgYnkgZGVhZGxpbmUgKHNvb25lc3QgZmlyc3QpXG4gIGNvbnN0IHNvcnRlZERpc3B1dGVzID0gWy4uLmRpc3B1dGVzXS5zb3J0KFxuICAgIChhLCBiKSA9PiBuZXcgRGF0ZShhLmR1ZV9ieSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYi5kdWVfYnkpLmdldFRpbWUoKSxcbiAgKTtcblxuICBjb25zdCBmaWx0ZXJlZERpc3B1dGVzID0gc29ydGVkRGlzcHV0ZXMuZmlsdGVyKChkKSA9PiBtYXRjaGVzRmlsdGVyKGQsIHN0YXR1c0ZpbHRlcikpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRleHRWaWV3IHRpdGxlPVwiV2luQmFja1wiIGRlc2NyaXB0aW9uPVwiR3VpZGVkIGRpc3B1dGUgcmVzb2x1dGlvblwiPlxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ2xvYWRpbmcnICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgcGFkZGluZzogJ3hsYXJnZScsXG4gICAgICAgICAgICBhbGlnblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIExvYWRpbmcgZGlzcHV0ZXMuLi5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApfVxuXG4gICAgICB7dmlld1N0YXRlID09PSAnZXJyb3InICYmIChcbiAgICAgICAgPEVycm9yQmFubmVyIG1lc3NhZ2U9e2Vycm9yTWVzc2FnZX0gLz5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdyZWFkeScgJiYgKFxuICAgICAgICA8VGFicyBmaXR0ZWQgc2l6ZT1cIm1lZGl1bVwiPlxuICAgICAgICAgIDxUYWJMaXN0PlxuICAgICAgICAgICAgPFRhYiBpZD1cImRpc3B1dGVzXCI+RGlzcHV0ZXM8L1RhYj5cbiAgICAgICAgICAgIDxUYWIgaWQ9XCJpbnNpZ2h0c1wiPkluc2lnaHRzPC9UYWI+XG4gICAgICAgICAgPC9UYWJMaXN0PlxuICAgICAgICAgIDxUYWJQYW5lbHM+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJkaXNwdXRlc1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnc21hbGwnLCBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICAgICAge2Rpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgIDxFbXB0eVN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiTm8gZGlzcHV0ZXMgeWV0XCJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXaGVuIGEgZGlzcHV0ZSBjb21lcyBpbiwgd2UnbGwgd2FsayB5b3UgdGhyb3VnaCBleGFjdGx5IHdoYXQgdG8gZG8uXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgaGlkZGVuRWxlbWVudHM9e1snbGFiZWwnXX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlIGFzIFN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7RklMVEVSX09QVElPTlMubWFwKChvcHQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHQudmFsdWV9IHZhbHVlPXtvcHQudmFsdWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmdUb3A6ICdzbWFsbCcsIHBhZGRpbmdCb3R0b206ICdzbWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0Q291bnRUZXh0KGZpbHRlcmVkRGlzcHV0ZXMubGVuZ3RoLCBzdGF0dXNGaWx0ZXIpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWREaXNwdXRlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm8ge0ZJTFRFUl9PUFRJT05TLmZpbmQoKG8pID0+IG8udmFsdWUgPT09IHN0YXR1c0ZpbHRlcik/LmxhYmVsLnRvTG93ZXJDYXNlKCl9IGRpc3B1dGVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWREaXNwdXRlcy5tYXAoKGRpc3B1dGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEaXNwdXRlQ2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Rpc3B1dGUuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoKSA9PiBoYW5kbGVTZWxlY3REaXNwdXRlKGRpc3B1dGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwiaW5zaWdodHNcIj5cbiAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICAgICAgPEJhbm5lclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJJbnNpZ2h0c1wiXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldpbiByYXRlIGFuYWx5dGljcyBhbmQgZGlzcHV0ZSBwYXR0ZXJucyB3aWxsIGFwcGVhciBoZXJlLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIENvbWluZyBpbiBXSU4tMjIgYW5kIFdJTi0yMy5cbiAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgIDwvVGFiUGFuZWxzPlxuICAgICAgICA8L1RhYnM+XG4gICAgICApfVxuXG4gICAgICB7c2VsZWN0ZWREaXNwdXRlICYmIChcbiAgICAgICAgPERpc3B1dGVXb3JrZmxvd1xuICAgICAgICAgIGRpc3B1dGU9e3NlbGVjdGVkRGlzcHV0ZX1cbiAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxuICAgICAgICAgIHNob3duPXtzaG93V29ya2Zsb3d9XG4gICAgICAgICAgc2V0U2hvd249e2hhbmRsZUNsb3NlV29ya2Zsb3d9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlTGlzdFZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBCYWRnZSwgQnV0dG9uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGdldFN0YXR1c0JhZGdlLCBnZXRVcmdlbmN5QmFkZ2UsIGdldFJlYXNvbkNvZGVMYWJlbCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmludGVyZmFjZSBEaXNwdXRlQ2FyZFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgb25TZWxlY3Q6IChkaXNwdXRlSWQ6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QW1vdW50KGFtb3VudDogbnVtYmVyLCBjdXJyZW5jeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5LnRvVXBwZXJDYXNlKCksXG4gIH0pLmZvcm1hdChhbW91bnQgLyAxMDApO1xufVxuXG5jb25zdCBEaXNwdXRlQ2FyZCA9ICh7IGRpc3B1dGUsIG9uU2VsZWN0IH06IERpc3B1dGVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHVyZ2VuY3lCYWRnZSA9IGdldFVyZ2VuY3lCYWRnZShkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCByZWFzb25MYWJlbCA9IGdldFJlYXNvbkNvZGVMYWJlbChkaXNwdXRlLm5ldHdvcmssIGRpc3B1dGUucmVhc29uX2NvZGUpO1xuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgb25QcmVzcz17KCkgPT4gb25TZWxlY3QoZGlzcHV0ZS5pZCl9XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3hzbWFsbCcsXG4gICAgICAgICAgd2lkdGg6ICdmaWxsJyxcbiAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPXt1cmdlbmN5QmFkZ2UudHlwZX0+e3VyZ2VuY3lCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8ICdVbmtub3duIGN1c3RvbWVyJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIHtyZWFzb25MYWJlbCAmJiAoXG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICB7cmVhc29uTGFiZWx9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICl9XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9IHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZUNhcmQ7XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeFxuXG5pbXBvcnQgeyBCb3gsIEljb24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBFbXB0eVN0YXRlUHJvcHMge1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5jb25zdCBFbXB0eVN0YXRlID0gKHsgdGl0bGUsIGRlc2NyaXB0aW9uIH06IEVtcHR5U3RhdGVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGNzcz17e1xuICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICBhbGlnblg6ICdjZW50ZXInLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHtkZXNjcmlwdGlvbn1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlTdGF0ZTtcbiIsICJpbXBvcnQge1xuICBCb3gsXG4gIEJhbm5lcixcbiAgSW5saW5lLFxuICBTZXR0aW5nc1ZpZXcsXG4gIERpdmlkZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcblxuY29uc3QgQXBwU2V0dGluZ3MgPSAoeyBlbnZpcm9ubWVudCwgdXNlckNvbnRleHQgfTogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFNldHRpbmdzVmlldz5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScsIHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgU3Vic2NyaXB0aW9uIG1hbmFnZW1lbnQgd2lsbCBiZSBhdmFpbGFibGUgaGVyZS4gQ29taW5nIGluIFdJTi0yNC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEFjY291bnRcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIENvbm5lY3RlZCBTdHJpcGUgYWNjb3VudCBpbmZvcm1hdGlvbiB3aWxsIGFwcGVhciBoZXJlLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgQWJvdXQgV2luQmFja1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5cbiAgICAgICAgICAgIFZlcnNpb24gMC4wLjFcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEd1aWRlZCBkaXNwdXRlIHJlc29sdXRpb24gZm9yIFN0cmlwZSBtZXJjaGFudHMuIEJ1aWx0IGJ5IEpLQiBUZWNoLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvU2V0dGluZ3NWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwU2V0dGluZ3M7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxjQUFjO0FBQ3RCLGNBQVEsY0FBYztBQUFBO0FBQUE7OztBQ0h0QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxrQkFBa0IsUUFBUSxZQUFZLFFBQVEsY0FBYyxRQUFRLFlBQVksUUFBUSxZQUFZLFFBQVEsTUFBTSxRQUFRLFlB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QUNFLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQTtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxNQUNyQixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsTUFDZCwyQkFBMkI7QUFBQSxRQUN6QixlQUFlO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDYjsiLAogICJuYW1lcyI6IFsiZmV0Y2giLCAiZmV0Y2hTdHJpcGVTaWduYXR1cmUiLCAicmVxdWlyZV9zaWduYXR1cmUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImZldGNoU3RyaXBlU2lnbmF0dXJlIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3VpIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZm9ybWF0RGF0ZSIsICJfYSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJmb3JtYXRBbW91bnQiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
