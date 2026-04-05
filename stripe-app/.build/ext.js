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
  var import_react2 = __require("react");
  var import_ui8 = __toESM(require_ui());

  // src/components/DisputeWorkflow.tsx
  var import_react = __require("react");
  var import_ui7 = __toESM(require_ui());

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
  var PROD_BACKEND = "https://winbackpay.com";
  var LOCAL_BACKEND = "http://localhost:3000";
  function getBackendUrl(mode) {
    return mode === "development" ? LOCAL_BACKEND : PROD_BACKEND;
  }
  var ApiError = class extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
      this.name = "ApiError";
    }
  };
  function fetchBackend(path, context, data) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const signature = yield (0, import_signature.default)();
      const body = JSON.stringify(__spreadProps(__spreadValues({}, data), {
        user_id: (_a = context.userContext) == null ? void 0 : _a.id,
        account_id: (_b = context.userContext) == null ? void 0 : _b.account.id
      }));
      const backendUrl = getBackendUrl((_c = context.environment) == null ? void 0 : _c.mode);
      const response = yield fetch(`${backendUrl}${path}`, {
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

  // src/components/DisputeWorkflow.tsx
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  var DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }) => {
    const [currentStep, setCurrentStep] = (0, import_react.useState)("review");
    const [dispute, setDispute] = (0, import_react.useState)(initialDispute);
    const [playbook, setPlaybook] = (0, import_react.useState)(null);
    const [loading, setLoading] = (0, import_react.useState)({
      dispute: false,
      playbook: false
    });
    const [errors, setErrors] = (0, import_react.useState)({
      dispute: null,
      playbook: null
    });
    const contextRef = (0, import_react.useRef)(context);
    contextRef.current = context;
    (0, import_react.useEffect)(() => {
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
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
        css: { padding: "medium", stack: "y", gap: "medium" },
        children: [
          isUrgent && playbook && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UrgencyBanner_default, {
            daysRemaining,
            essentials: playbook.urgency_essentials
          }),
          errors.dispute && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ErrorBanner_default, {
            message: errors.dispute
          }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DisputeOverview_default, {
            dispute,
            loading: loading.dispute
          }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Divider, {}),
          isLoadingPlaybook ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
            css: { alignX: "center", padding: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Spinner, {
                size: "medium"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Loading playbook..."
              })
            ]
          }) : errors.playbook ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ErrorBanner_default, {
            message: errors.playbook
          }) : playbook ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CoachHeader_default, {
                headline: playbook.coach_headline,
                summary: playbook.coach_summary,
                urgencyMode: isUrgent,
                daysRemaining
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(QuickActions_default, {
                playbook,
                urgencyMode: isUrgent
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LearnMore_default, {
                issuerSummary: playbook.coach_issuer_summary,
                acquirerSummary: playbook.coach_acquirer_summary
              })
            ]
          }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Banner, {
            type: "default",
            title: "No playbook available",
            description: "We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          })
        ]
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.FocusView, {
      title: `Dispute ${initialDispute.id.slice(0, 12)}...`,
      shown,
      setShown,
      confirmCloseMessages: {
        title: "Leave dispute workflow?",
        description: "Your progress on this step will not be saved.",
        cancelAction: "Stay",
        exitAction: "Leave"
      },
      primaryAction: isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Button, {
        type: "primary",
        onPress: () => setShown(false),
        children: "Submit (placeholder)"
      }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Button, {
        type: "primary",
        onPress: handleNext,
        children: [
          "Next: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]
        ]
      }),
      secondaryAction: isFirstStep ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Button, {
        onPress: () => setShown(false),
        children: "Cancel"
      }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Button, {
        onPress: handleBack,
        children: [
          "Back: ",
          WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Box, {
        css: { padding: "medium" },
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Tabs, {
          fitted: true,
          size: "medium",
          selectedKey: currentStep,
          onSelectionChange: (key) => setCurrentStep(key),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.TabList, {
              children: WIZARD_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Tab, {
                id: step,
                children: WIZARD_STEP_LABELS[step]
              }, step))
            }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.TabPanel, {
                  id: "review",
                  children: renderReviewTab()
                }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.TabPanel, {
                  id: "evidence",
                  children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
                    css: { padding: "medium", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Banner, {
                        type: "default",
                        title: "Step 2: Gather Evidence",
                        description: "Check off required evidence items and upload supporting files."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "Evidence checklist and file upload will be built in WIN-14 and WIN-16."
                      })
                    ]
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.TabPanel, {
                  id: "narrative",
                  children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
                    css: { padding: "medium", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Banner, {
                        type: "default",
                        title: "Step 3: AI Narrative",
                        description: "Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
                        css: { font: "caption", color: "secondary" },
                        children: "AI narrative generation and editing will be built in WIN-18 and WIN-19."
                      })
                    ]
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.TabPanel, {
                  id: "submit",
                  children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui7.Box, {
                    css: { padding: "medium", stack: "y", gap: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Banner, {
                        type: "caution",
                        title: "Step 4: Submit Evidence",
                        description: "Review everything one final time. Submission to Stripe is irrevocable."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ui7.Inline, {
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
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  var PaymentDisputeView = (context) => {
    var _a;
    const { environment } = context;
    const paymentIntentId = (_a = environment == null ? void 0 : environment.objectContext) == null ? void 0 : _a.id;
    const [viewState, setViewState] = (0, import_react2.useState)("loading");
    const [dispute, setDispute] = (0, import_react2.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react2.useState)(false);
    const contextRef = (0, import_react2.useRef)(context);
    contextRef.current = context;
    const loadDispute = (0, import_react2.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react2.useEffect)(() => {
      loadDispute();
    }, [loadDispute]);
    if (viewState === "loading") {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Spinner, {
            size: "large"
          })
        })
      });
    }
    if (viewState === "no_dispute" || viewState === "error" || !dispute) {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.ContextView, {
        title: "WinBack",
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Box, {
          css: { padding: "medium", alignX: "center" },
          children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
            css: { font: "caption", color: "secondary" },
            children: "No dispute on this payment."
          })
        })
      });
    }
    const statusBadge = getStatusBadge(dispute.status);
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.ContextView, {
      title: "WinBack",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
          css: { padding: "medium", stack: "y", gap: "medium" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
              css: {
                stack: "x",
                gap: "small",
                distribute: "space-between",
                alignY: "center"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                  css: { font: "heading", fontWeight: "semibold" },
                  children: "Dispute"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Badge, {
                  type: statusBadge.type,
                  children: statusBadge.label
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Box, {
              css: { stack: "y", gap: "xsmall" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui8.Inline, {
                  css: { font: "body" },
                  children: [
                    dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                    " ",
                    dispute.reason_code
                  ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Inline, {
                  css: { font: "caption", color: "secondary" },
                  children: dispute.reason.replace(/_/g, " ")
                })
              ]
            }),
            (dispute.status === "needs_response" || dispute.status === "warning_needs_response") && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui8.Button, {
              type: "primary",
              css: { width: "fill" },
              onPress: () => setShowWorkflow(true),
              children: "Open in WinBack"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(DisputeWorkflow_default, {
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
  var import_react3 = __require("react");
  var import_ui11 = __toESM(require_ui());

  // src/components/DisputeCard.tsx
  var import_ui9 = __toESM(require_ui());
  var import_jsx_runtime9 = __require("react/jsx-runtime");
  function formatAmount2(amount, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }
  var DisputeCard = ({ dispute, onSelect }) => {
    const statusBadge = getStatusBadge(dispute.status);
    const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Button, {
      type: "secondary",
      css: { width: "fill" },
      onPress: () => onSelect(dispute.id),
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
        css: {
          stack: "y",
          gap: "xsmall",
          width: "fill",
          padding: "small"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
            css: { stack: "x", gap: "small", distribute: "space-between", alignY: "center" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
                css: { font: "body", fontWeight: "semibold" },
                children: formatAmount2(dispute.amount, dispute.currency)
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
                css: { stack: "x", gap: "xsmall" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
                    type: statusBadge.type,
                    children: statusBadge.label
                  }),
                  urgencyBadge && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Badge, {
                    type: urgencyBadge.type,
                    children: urgencyBadge.label
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui9.Inline, {
            css: { font: "caption" },
            children: dispute.customer_name || "Unknown customer"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Box, {
            css: { stack: "x", gap: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Inline, {
                css: { font: "caption", color: "secondary" },
                children: [
                  dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1),
                  " ",
                  dispute.reason_code
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui9.Inline, {
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
  var import_ui10 = __toESM(require_ui());
  var import_jsx_runtime10 = __require("react/jsx-runtime");
  var EmptyState = ({ title, description }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui10.Box, {
      css: {
        padding: "xlarge",
        stack: "y",
        gap: "small",
        alignX: "center",
        alignY: "center"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Icon, {
          name: "info",
          size: "large"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
          css: { font: "heading", fontWeight: "semibold" },
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_ui10.Inline, {
          css: { font: "caption", color: "secondary" },
          children: description
        })
      ]
    });
  };
  var EmptyState_default = EmptyState;

  // src/views/DisputeListView.tsx
  var import_jsx_runtime11 = __require("react/jsx-runtime");
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
    const [viewState, setViewState] = (0, import_react3.useState)("loading");
    const [disputes, setDisputes] = (0, import_react3.useState)([]);
    const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
    const [statusFilter, setStatusFilter] = (0, import_react3.useState)("all");
    const [selectedDispute, setSelectedDispute] = (0, import_react3.useState)(null);
    const [showWorkflow, setShowWorkflow] = (0, import_react3.useState)(false);
    const contextRef = (0, import_react3.useRef)(context);
    contextRef.current = context;
    const loadDisputes = (0, import_react3.useCallback)(() => __async(void 0, null, function* () {
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
    (0, import_react3.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.ContextView, {
      title: "WinBack",
      description: "Guided dispute resolution",
      children: [
        viewState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
          css: {
            padding: "xlarge",
            alignX: "center",
            alignY: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Spinner, {
              size: "large"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
              css: { font: "caption", color: "secondary" },
              children: "Loading disputes..."
            })
          ]
        }),
        viewState === "error" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ErrorBanner_default, {
          message: errorMessage
        }),
        viewState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Tabs, {
          fitted: true,
          size: "medium",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.TabList, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Tab, {
                  id: "disputes",
                  children: "Disputes"
                }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Tab, {
                  id: "insights",
                  children: "Insights"
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.TabPanels, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                  id: "disputes",
                  children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
                    css: { padding: "small", stack: "y", gap: "small" },
                    children: disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EmptyState_default, {
                      title: "No disputes yet",
                      description: "When a dispute comes in, we'll walk you through exactly what to do."
                    }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Select, {
                          label: "Filter",
                          hiddenElements: ["label"],
                          value: statusFilter,
                          onChange: (e) => setStatusFilter(e.target.value),
                          children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", {
                            value: opt.value,
                            children: opt.label
                          }, opt.value))
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
                          css: { paddingTop: "small", paddingBottom: "small" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: getCountText(filteredDisputes.length, statusFilter)
                          })
                        }),
                        filteredDisputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Box, {
                          css: { padding: "medium", alignX: "center" },
                          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Inline, {
                            css: { font: "caption", color: "secondary" },
                            children: [
                              "No ",
                              (_a = FILTER_OPTIONS.find((o) => o.value === statusFilter)) == null ? void 0 : _a.label.toLowerCase(),
                              " disputes."
                            ]
                          })
                        }) : filteredDisputes.map((dispute) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DisputeCard_default, {
                          dispute,
                          onSelect: () => handleSelectDispute(dispute)
                        }, dispute.id))
                      ]
                    })
                  })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.TabPanel, {
                  id: "insights",
                  children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui11.Box, {
                    css: { padding: "medium" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Banner, {
                        type: "default",
                        title: "Insights",
                        description: "Win rate analytics and dispute patterns will appear here."
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ui11.Inline, {
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
        selectedDispute && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DisputeWorkflow_default, {
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
  var import_ui12 = __toESM(require_ui());
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  var AppSettings = ({ environment, userContext }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.SettingsView, {
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
        css: { stack: "y", gap: "medium", padding: "medium" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Subscription"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Subscription management will be available here. Coming in WIN-24."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "Account"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "caption", color: "secondary" },
                children: "Connected Stripe account information will appear here."
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_ui12.Box, {
            css: { stack: "y", gap: "xsmall" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "heading", fontWeight: "semibold" },
                children: "About WinBack"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
                css: { font: "body" },
                children: "Version 0.0.1"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_ui12.Inline, {
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
  var BUILD_TIME = "2026-04-05 16:26:24.190238 -0700 PDT m=+2214.482812959";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvX2VuZHBvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3V0aWxzL2FwaS9mZXRjaEFwcEVtYmVkZGVkS2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2ZldGNoVmlhRnJhbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9hcGkvZmV0Y2hWaWFIb3N0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvYXBpRmV0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9odHRwQ2xpZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlL2NyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9zaWduYXR1cmUvY29ubmVjdGlvblNldHRpbmdzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHMvc2lnbmF0dXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlLmpzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9QYXltZW50RGlzcHV0ZVZpZXcudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdy50c3giLCAiLi4vc3JjL2xpYi90eXBlcy50cyIsICIuLi9zcmMvbGliL2FwaUNsaWVudC50cyIsICIuLi9zcmMvbGliL3V0aWxzLnRzIiwgIi4uL3NyYy9jb21wb25lbnRzL0Vycm9yQmFubmVyLnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvRGlzcHV0ZU92ZXJ2aWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9yZXZpZXcvQ29hY2hIZWFkZXIudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9RdWlja0FjdGlvbnMudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9MZWFybk1vcmUudHN4IiwgIi4uL3NyYy9jb21wb25lbnRzL3Jldmlldy9VcmdlbmN5QmFubmVyLnRzeCIsICIuLi9zcmMvdmlld3MvRGlzcHV0ZUxpc3RWaWV3LnRzeCIsICIuLi9zcmMvY29tcG9uZW50cy9EaXNwdXRlQ2FyZC50c3giLCAiLi4vc3JjL2NvbXBvbmVudHMvRW1wdHlTdGF0ZS50c3giLCAiLi4vc3JjL3ZpZXdzL0FwcFNldHRpbmdzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNES19WRVJTSU9OID0gdm9pZCAwO1xuZXhwb3J0cy5TREtfVkVSU0lPTiA9ICc5LjEuMCc7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRhYmxlSGVhZGVyQ2VsbCA9IGV4cG9ydHMuVGFibGVIZWFkID0gZXhwb3J0cy5UYWJsZUZvb3RlciA9IGV4cG9ydHMuVGFibGVDZWxsID0gZXhwb3J0cy5UYWJsZUJvZHkgPSBleHBvcnRzLlRhYiA9IGV4cG9ydHMuVGFiUGFuZWxzID0gZXhwb3J0cy5UYWJQYW5lbCA9IGV4cG9ydHMuVGFiTGlzdCA9IGV4cG9ydHMuU3dpdGNoID0gZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBleHBvcnRzLlNwaW5uZXIgPSBleHBvcnRzLlNwYXJrbGluZSA9IGV4cG9ydHMuU2lnbkluVmlldyA9IGV4cG9ydHMuU2V0dGluZ3NWaWV3ID0gZXhwb3J0cy5TZWxlY3QgPSBleHBvcnRzLlJhZGlvID0gZXhwb3J0cy5Qcm9wZXJ0eUxpc3QgPSBleHBvcnRzLlByb3BlcnR5TGlzdEl0ZW0gPSBleHBvcnRzLlBsYXRmb3JtQ29uZmlndXJhdGlvblZpZXcgPSBleHBvcnRzLk9uYm9hcmRpbmdWaWV3ID0gZXhwb3J0cy5NZW51ID0gZXhwb3J0cy5NZW51SXRlbSA9IGV4cG9ydHMuTWVudUdyb3VwID0gZXhwb3J0cy5MaXN0ID0gZXhwb3J0cy5MaXN0SXRlbSA9IGV4cG9ydHMuTGluayA9IGV4cG9ydHMuTGluZUNoYXJ0ID0gZXhwb3J0cy5JbmxpbmUgPSBleHBvcnRzLkltZyA9IGV4cG9ydHMuSWNvbiA9IGV4cG9ydHMuRm9ybUZpZWxkR3JvdXAgPSBleHBvcnRzLkZvY3VzVmlldyA9IGV4cG9ydHMuRGl2aWRlciA9IGV4cG9ydHMuRGV0YWlsUGFnZVRhYmxlID0gZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZXhwb3J0cy5EYXRlRmllbGQgPSBleHBvcnRzLkNvbnRleHRWaWV3ID0gZXhwb3J0cy5DaGlwID0gZXhwb3J0cy5DaGlwTGlzdCA9IGV4cG9ydHMuQ2hlY2tib3ggPSBleHBvcnRzLkJ1dHRvbiA9IGV4cG9ydHMuQnV0dG9uR3JvdXAgPSBleHBvcnRzLkJveCA9IGV4cG9ydHMuQmFyQ2hhcnQgPSBleHBvcnRzLkJhbm5lciA9IGV4cG9ydHMuQmFkZ2UgPSBleHBvcnRzLkFjY29yZGlvbiA9IGV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IHZvaWQgMDtcbmV4cG9ydHMuVG9vbHRpcCA9IGV4cG9ydHMuVGV4dEZpZWxkID0gZXhwb3J0cy5UZXh0QXJlYSA9IGV4cG9ydHMuVGFza0xpc3QgPSBleHBvcnRzLlRhc2tMaXN0SXRlbSA9IGV4cG9ydHMuVGFicyA9IGV4cG9ydHMuVGFibGVSb3cgPSBleHBvcnRzLlRhYmxlID0gdm9pZCAwO1xuY29uc3QganN4X3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtcnVudGltZVwiKTtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwiQHJlbW90ZS11aS9yZWFjdFwiKTtcbmNvbnN0IHZlcnNpb25fMSA9IHJlcXVpcmUoXCIuLi92ZXJzaW9uXCIpO1xuY29uc3Qgd2l0aFNka1Byb3BzID0gKENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHdyYXBwZWRDb21wb25lbnROYW1lID0gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC50b1N0cmluZygpO1xuICAgIGNvbnN0IFdpdGhTZGtQcm9wcyA9IChwcm9wcykgPT4gKCgwLCBqc3hfcnVudGltZV8xLmpzeCkoQ29tcG9uZW50LCB7IC4uLnByb3BzLCB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsIHNka1ZlcnNpb246IHZlcnNpb25fMS5TREtfVkVSU0lPTiwgc2NoZW1hVmVyc2lvbjogXCJ2OVwiIH0pKTtcbiAgICBXaXRoU2RrUHJvcHMud3JhcHBlZENvbXBvbmVudE5hbWUgPSB3cmFwcGVkQ29tcG9uZW50TmFtZTtcbiAgICByZXR1cm4gV2l0aFNka1Byb3BzO1xufTtcbmNvbnN0IGRlZmluZUNvbXBvbmVudCA9IChuYW1lLCBmcmFnbWVudFByb3BzLCB3cmFwV2l0aFNka1Byb3BzKSA9PiB7XG4gICAgY29uc3QgcmVtb3RlQ29tcG9uZW50ID0gKDAsIHJlYWN0XzEuY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQpKG5hbWUsIHtcbiAgICAgICAgZnJhZ21lbnRQcm9wcyxcbiAgICB9KTtcbiAgICBpZiAoIXdyYXBXaXRoU2RrUHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHJlbW90ZUNvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhTZGtQcm9wcyhyZW1vdGVDb21wb25lbnQpO1xufTtcbmV4cG9ydHMuQWNjb3JkaW9uSXRlbSA9IGRlZmluZUNvbXBvbmVudCgnQWNjb3JkaW9uSXRlbScsIFsndGl0bGUnLCAnYWN0aW9ucycsICdtZWRpYScsICdzdWJ0aXRsZSddLCB0cnVlKTtcbmV4cG9ydHMuQWNjb3JkaW9uID0gZGVmaW5lQ29tcG9uZW50KCdBY2NvcmRpb24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJhZGdlID0gZGVmaW5lQ29tcG9uZW50KCdCYWRnZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQmFubmVyID0gZGVmaW5lQ29tcG9uZW50KCdCYW5uZXInLCBbJ2FjdGlvbnMnLCAnZGVzY3JpcHRpb24nLCAndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLkJhckNoYXJ0ID0gZGVmaW5lQ29tcG9uZW50KCdCYXJDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQm94ID0gZGVmaW5lQ29tcG9uZW50KCdCb3gnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbkdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdCdXR0b25Hcm91cCcsIFsnbWVudVRyaWdnZXInXSwgdHJ1ZSk7XG5leHBvcnRzLkJ1dHRvbiA9IGRlZmluZUNvbXBvbmVudCgnQnV0dG9uJywgW10sIHRydWUpO1xuZXhwb3J0cy5DaGVja2JveCA9IGRlZmluZUNvbXBvbmVudCgnQ2hlY2tib3gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5DaGlwTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnQ2hpcExpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNoaXAgPSBkZWZpbmVDb21wb25lbnQoJ0NoaXAnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkNvbnRleHRWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdDb250ZXh0VmlldycsIFsnYWN0aW9ucycsICdiYW5uZXInLCAnZm9vdGVyQ29udGVudCcsICdwcmltYXJ5QWN0aW9uJywgJ3NlY29uZGFyeUFjdGlvbiddLCB0cnVlKTtcbmV4cG9ydHMuRGF0ZUZpZWxkID0gZGVmaW5lQ29tcG9uZW50KCdEYXRlRmllbGQnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlTW9kdWxlID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlTW9kdWxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlUHJvcGVydHlMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5EZXRhaWxQYWdlVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ0RldGFpbFBhZ2VUYWJsZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRGl2aWRlciA9IGRlZmluZUNvbXBvbmVudCgnRGl2aWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRm9jdXNWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdGb2N1c1ZpZXcnLCBbJ2Zvb3RlckNvbnRlbnQnLCAncHJpbWFyeUFjdGlvbicsICdzZWNvbmRhcnlBY3Rpb24nXSwgdHJ1ZSk7XG5leHBvcnRzLkZvcm1GaWVsZEdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdGb3JtRmllbGRHcm91cCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSWNvbiA9IGRlZmluZUNvbXBvbmVudCgnSWNvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuSW1nID0gZGVmaW5lQ29tcG9uZW50KCdJbWcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLklubGluZSA9IGRlZmluZUNvbXBvbmVudCgnSW5saW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5MaW5lQ2hhcnQgPSBkZWZpbmVDb21wb25lbnQoJ0xpbmVDaGFydCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGluayA9IGRlZmluZUNvbXBvbmVudCgnTGluaycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGlzdEl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ0xpc3RJdGVtJywgWydpY29uJywgJ2ltYWdlJywgJ3NlY29uZGFyeVRpdGxlJywgJ3RpdGxlJywgJ3ZhbHVlJ10sIHRydWUpO1xuZXhwb3J0cy5MaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5NZW51R3JvdXAgPSBkZWZpbmVDb21wb25lbnQoJ01lbnVHcm91cCcsIFsndGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnVJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdNZW51SXRlbScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTWVudSA9IGRlZmluZUNvbXBvbmVudCgnTWVudScsIFsndHJpZ2dlciddLCB0cnVlKTtcbmV4cG9ydHMuT25ib2FyZGluZ1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ09uYm9hcmRpbmdWaWV3JywgWydlcnJvciddLCB0cnVlKTtcbmV4cG9ydHMuUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldyA9IGRlZmluZUNvbXBvbmVudCgnUGxhdGZvcm1Db25maWd1cmF0aW9uVmlldycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuUHJvcGVydHlMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0SXRlbScsIFsnbGFiZWwnLCAndmFsdWUnXSwgdHJ1ZSk7XG5leHBvcnRzLlByb3BlcnR5TGlzdCA9IGRlZmluZUNvbXBvbmVudCgnUHJvcGVydHlMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5SYWRpbyA9IGRlZmluZUNvbXBvbmVudCgnUmFkaW8nLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5TZWxlY3QgPSBkZWZpbmVDb21wb25lbnQoJ1NlbGVjdCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlNldHRpbmdzVmlldyA9IGRlZmluZUNvbXBvbmVudCgnU2V0dGluZ3NWaWV3JywgW10sIHRydWUpO1xuZXhwb3J0cy5TaWduSW5WaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdTaWduSW5WaWV3JywgWydkZXNjcmlwdGlvbkFjdGlvbkNvbnRlbnRzJywgJ2Zvb3RlckNvbnRlbnQnXSwgdHJ1ZSk7XG5leHBvcnRzLlNwYXJrbGluZSA9IGRlZmluZUNvbXBvbmVudCgnU3BhcmtsaW5lJywgW10sIHRydWUpO1xuZXhwb3J0cy5TcGlubmVyID0gZGVmaW5lQ29tcG9uZW50KCdTcGlubmVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5TdHJpcGVGaWxlVXBsb2FkZXIgPSBkZWZpbmVDb21wb25lbnQoJ1N0cmlwZUZpbGVVcGxvYWRlcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU3dpdGNoID0gZGVmaW5lQ29tcG9uZW50KCdTd2l0Y2gnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5UYWJMaXN0ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJQYW5lbCA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYlBhbmVscyA9IGRlZmluZUNvbXBvbmVudCgnVGFiUGFuZWxzJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWIgPSBkZWZpbmVDb21wb25lbnQoJ1RhYicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVCb2R5ID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUJvZHknLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlQ2VsbCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVDZWxsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUZvb3RlciA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVGb290ZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlSGVhZCA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVIZWFkJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUhlYWRlckNlbGwgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlSGVhZGVyQ2VsbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGUgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZVJvdyA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVSb3cnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYnMgPSBkZWZpbmVDb21wb25lbnQoJ1RhYnMnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhc2tMaXN0SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3RJdGVtJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYXNrTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnVGFza0xpc3QnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRBcmVhID0gZGVmaW5lQ29tcG9uZW50KCdUZXh0QXJlYScsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRleHRGaWVsZCA9IGRlZmluZUNvbXBvbmVudCgnVGV4dEZpZWxkJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVG9vbHRpcCA9IGRlZmluZUNvbXBvbmVudCgnVG9vbHRpcCcsIFsndHJpZ2dlciddLCB0cnVlKTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFByaXZhdGUhIFRoaXMgYWxsb3dzIHRoZSBzaGFyZWQgZW5kcG9pbnQgdG8gYmUgaW50aWFsaXplZFxuICogc28gdGhhdCB0aGUgU0RLIGNhbiBjb21tdW5pY2F0ZSB3aXRoIHRoZSBEYXNoYm9hcmQuXG4gKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SG9zdEVuZHBvaW50ID0gdm9pZCAwO1xuY29uc3QgaW52YXJpYW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImludmFyaWFudFwiKSk7XG5jb25zdCBnZXRIb3N0RW5kcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBlbmRwb2ludCBpcyBjcmVhdGVkIGZyb20gdGhlIE1lc3NhZ2VQb3J0IHRyYW5zZmVycmVkIGZyb20gdGhlIGhvc3QgZW52XG4gICAgLy8gYXMgYSBwYXJ0IG9mIHRoZSBgaW5pdF9leHRlbnNpb25gIG1lc3NhZ2UuXG4gICAgY29uc3QgaG9zdEVuZHBvaW50ID0gZ2xvYmFsVGhpcy5fX1N0cmlwZUV4dEV4cG9ydHM/LmVuZHBvaW50O1xuICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShob3N0RW5kcG9pbnQsICdob3N0RW5kcG9pbnQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkJyk7XG4gICAgcmV0dXJuIGhvc3RFbmRwb2ludDtcbn07XG5leHBvcnRzLmdldEhvc3RFbmRwb2ludCA9IGdldEhvc3RFbmRwb2ludDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gdm9pZCAwO1xuY29uc3QgX2VuZHBvaW50XzEgPSByZXF1aXJlKFwiLi4vX2VuZHBvaW50XCIpO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5ID0gYXN5bmMgKCkgPT4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKVxuICAgIC5jYWxsLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSgpXG4gICAgLnRoZW4oKHN1cHBvcnRlZCkgPT4gc3VwcG9ydGVkKVxuICAgIC5jYXRjaCgoKSA9PiBmYWxzZSk7XG5leHBvcnRzLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSA9IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hBcHBFbWJlZGRlZEtleSA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXkgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoQXBwRW1iZWRkZWRLZXkoKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBhcHAgZW1iZWRkZWQga2V5Jyk7XG4gICAgfVxuICAgIHJldHVybiBhcGlLZXk7XG59O1xuZXhwb3J0cy5mZXRjaEFwcEVtYmVkZGVkS2V5ID0gZmV0Y2hBcHBFbWJlZGRlZEtleTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IHZvaWQgMDtcbmNvbnN0IGZldGNoQXBwRW1iZWRkZWRLZXlfMSA9IHJlcXVpcmUoXCIuL2ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lID0gYXN5bmMgKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgYXBpS2V5ID0gYXdhaXQgKDAsIGZldGNoQXBwRW1iZWRkZWRLZXlfMS5mZXRjaEFwcEVtYmVkZGVkS2V5KSgpO1xuICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBpbml0KTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIGNvbnN0IHNlcmlhbGl6YWJsZVJlc3BvbnNlID0ge1xuICAgICAgICBqc29uOiB1bmRlZmluZWQsXG4gICAgICAgIGFycmF5QnVmZmVyOiB1bmRlZmluZWQsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIG9rOiByZXNwb25zZS5vayxcbiAgICAgICAgcmVkaXJlY3RlZDogcmVzcG9uc2UucmVkaXJlY3RlZCxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIHR5cGU6IHJlc3BvbnNlLnR5cGUsXG4gICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgIH07XG4gICAgc3dpdGNoIChyZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIHtcbiAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5qc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXJpYWxpemFibGVSZXNwb25zZS5hcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHNlcmlhbGl6YWJsZVJlc3BvbnNlO1xufTtcbmV4cG9ydHMuZmV0Y2hWaWFGcmFtZSA9IGZldGNoVmlhRnJhbWU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZldGNoVmlhSG9zdCA9IHZvaWQgMDtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4uL19lbmRwb2ludFwiKTtcbmNvbnN0IGZldGNoVmlhSG9zdCA9IGFzeW5jIChlbmNvZGVkVXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGVuY29kZWRVcmwpO1xuICAgIHJldHVybiAoMCwgX2VuZHBvaW50XzEuZ2V0SG9zdEVuZHBvaW50KSgpLmNhbGwuc3RyaXBlQXBpRmV0Y2godXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0cy5mZXRjaFZpYUhvc3QgPSBmZXRjaFZpYUhvc3Q7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3Qgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0c0ZldGNoQXBwRW1iZWRkZWRLZXlcIik7XG5jb25zdCBmZXRjaFZpYUZyYW1lXzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUZyYW1lXCIpO1xuY29uc3QgZmV0Y2hWaWFIb3N0XzEgPSByZXF1aXJlKFwiLi9mZXRjaFZpYUhvc3RcIik7XG5sZXQgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IG51bGw7XG5jb25zdCBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkU3RyaXBlQXBpRmV0Y2gpIHtcbiAgICAgICAgc2VsZWN0ZWRTdHJpcGVBcGlGZXRjaCA9IChhd2FpdCAoMCwgc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5XzEuc3VwcG9ydHNGZXRjaEFwcEVtYmVkZGVkS2V5KSgpKVxuICAgICAgICAgICAgPyBmZXRjaFZpYUZyYW1lXzEuZmV0Y2hWaWFGcmFtZVxuICAgICAgICAgICAgOiBmZXRjaFZpYUhvc3RfMS5mZXRjaFZpYUhvc3Q7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZFN0cmlwZUFwaUZldGNoO1xufTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSBzZWxlY3RQcmVmZXJyZWRTdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2ggPSB2b2lkIDA7XG52YXIgc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL3NlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2hcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGVjdFByZWZlcnJlZFN0cmlwZUFwaUZldGNoXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2g7IH0gfSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0cmlwZUFwaUZldGNoID0gdm9pZCAwO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBzdHJpcGVBcGlGZXRjaCA9IGFzeW5jIChwYXRoLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgcHJlZmVycmVkRmV0Y2hNZXRob2QgPSBhd2FpdCAoMCwgYXBpXzEuc2VsZWN0UHJlZmVycmVkU3RyaXBlQXBpRmV0Y2gpKCk7XG4gICAgcmV0dXJuIHByZWZlcnJlZEZldGNoTWV0aG9kKHBhdGgsIG9wdGlvbnMpO1xufTtcbmV4cG9ydHMuc3RyaXBlQXBpRmV0Y2ggPSBzdHJpcGVBcGlGZXRjaDtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBleHBvcnRzLkFVVEhPUklaQVRJT05fSEVBREVSID0gZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9IGV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSB2b2lkIDA7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgSHR0cENsaWVudCB0aGF0IGNhbiBiZSBwbHVnZ2VkIGludG8gc3RyaXBlLW5vZGVcbiAqIHRoYXQgd2lsbCBhbGxvdyB0aGUgdXNlciB0byB1c2Ugc3RyaXBlLW5vZGUgaW4gZXh0ZW5zaW9ucyBpZiB0aGUgRGFzaGJvYXJkXG4gKiBwcm92aWRlcyBhIGBzdHJpcGVBcGlGZXRjaGAgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbGF5IEFQSSBjYWxscyB0aHJvdWdoIHRoZVxuICogRGFzaGJvYXJkIGFuZCBwaWdneSBiYWNrIG9uIHRoZSB1c2VyJ3MgRGFzaGJvYXJkIHNlc3Npb24uXG4gKi9cbmNvbnN0IGludmFyaWFudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJpbnZhcmlhbnRcIikpO1xuY29uc3QgYXBpRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2FwaUZldGNoXCIpO1xuY29uc3QgbWF0Y2hlc1N0cmlwZUtleSA9IC9bcHNda18odGVzdHxsaXZlKV9bQS1aYS16MC05XSsvO1xuY2xhc3MgU3RyaXBlQXBwc0h0dHBSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IocmVzcCkge1xuICAgICAgICB0aGlzLl9yZXNwID0gcmVzcDtcbiAgICB9XG4gICAgZ2V0SGVhZGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3AuaGVhZGVycztcbiAgICB9XG4gICAgZ2V0U3RhdHVzQ29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3Auc3RhdHVzO1xuICAgIH1cbiAgICBnZXRSYXdSZXNwb25zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3A7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgdG9TdHJlYW0oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyZWFtcyBoYXZlIG5vdCBiZWVuIGltcGxlbWVudGVkIGluIHRoZSBTdHJpcGUgSFRUUCBjbGllbnQnKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHsganNvbiB9ID0gdGhpcy5fcmVzcDtcbiAgICAgICAgaWYgKGpzb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUmVzcG9uc2UgYm9keSB1bmRlZmluZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU3RyaXBlQXBwc0h0dHBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGZldGNoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgZ2V0Q2xpZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpcGUtdWktZXh0ZW5zaW9uJztcbiAgICB9XG4gICAgYXN5bmMgbWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgcGF0aCwgbWV0aG9kLCBoZWFkZXJzLCByZXF1ZXN0RGF0YSwgcHJvdG9jb2wsIF90aW1lb3V0KSB7XG4gICAgICAgICgwLCBpbnZhcmlhbnRfMS5kZWZhdWx0KShwcm90b2NvbCA9PT0gJ2h0dHBzJywgJ011c3QgdXNlIGh0dHBzIGNvbm5lY3Rpb25zIGluIFVJIGV4dGVuc2lvbnMnKTtcbiAgICAgICAgY29uc3QgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlcXVlc3REYXRhKSB7XG4gICAgICAgICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IHJlcXVlc3REYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBoZWFkZXJzLkF1dGhvcml6YXRpb247XG4gICAgICAgIGlmIChhdXRoSGVhZGVyICYmIG1hdGNoZXNTdHJpcGVLZXkudGVzdChhdXRoSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgdXNlIGFjdHVhbCBzdHJpcGUga2V5cyB3aGVuIHVzaW5nIHRoZSBTdHJpcGUgSlMgQVBJIGNsaWVudCB3aXRoIFVJIGV4dGVzaW9ucy5cXG5cXG4gSW5zdGVhZCwgdXNlIGBTVFJJUEVfQVBJX0tFWWAgZnJvbSBgQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2h0dHBfY2xpZW50YCBhcyBhIHBsYWNlaG9sZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWApO1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5fZmV0Y2godXJsLnRvU3RyaW5nKCksIGZldGNoT3B0aW9ucyk7XG4gICAgICAgIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciB0aW1lb3V0cy5cbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpcGVBcHBzSHR0cFJlc3BvbnNlKHJlc3ApO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RyaXBlQXBwc0h0dHBDbGllbnQgPSBTdHJpcGVBcHBzSHR0cENsaWVudDtcbi8vIERPIE5PVCBjaGFuZ2UgdGhpcyBzdHJpbmcgd2l0aG91dCBhIGRlcHJlY2F0aW9uIHBsYW4uIFRoZSBydW50aW1lIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGlzXG4vLyBleGFjdCBzdHJpbmcgaXMgcGFzc2VkLCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbi8vIFNlZTogbWFuYWdlL2Zyb250ZW5kL3NyYy90YWlsb3IvZXh0ZW5zaW9ucy9ob3N0L2FwaV9mZXRjaC5qc1xuZXhwb3J0cy5TVFJJUEVfQVBJX0tFWSA9ICdET19OT1RfUEFTU19BX1JFQUxfQVBJX0tFWSc7XG5jb25zdCBjcmVhdGVIdHRwQ2xpZW50ID0gKCkgPT4gbmV3IFN0cmlwZUFwcHNIdHRwQ2xpZW50KGFwaUZldGNoXzEuc3RyaXBlQXBpRmV0Y2gpO1xuZXhwb3J0cy5jcmVhdGVIdHRwQ2xpZW50ID0gY3JlYXRlSHR0cENsaWVudDtcbmV4cG9ydHMuQVVUSE9SSVpBVElPTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvbic7XG5leHBvcnRzLkFVVEhPUklaQVRJT05fVkFMVUUgPSBgQmVhcmVyICR7ZXhwb3J0cy5TVFJJUEVfQVBJX0tFWX1gO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gdm9pZCAwO1xuY29uc3QgaHR0cENsaWVudF8xID0gcmVxdWlyZShcIi4uL2h0dHBDbGllbnRcIik7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKHsgaG9zdCwgcG9ydCB9KSA9PiBhc3luYyAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHBzOi8vJHtob3N0fToke3BvcnR9L3YxL2FwcHMvYXBwX2VtYmVkZGVkX2JhY2tlbmRfc2lnbmF0dXJlYCk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3BheWxvYWQnLCBKU09OLnN0cmluZ2lmeSh7IC4uLnBheWxvYWQgfSkpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdpbmNsdWRlX29ubHlbXScsICdzaWduYXR1cmUnKTtcbiAgICBjb25zdCBjbGllbnQgPSAoMCwgaHR0cENsaWVudF8xLmNyZWF0ZUh0dHBDbGllbnQpKCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBjbGllbnQubWFrZVJlcXVlc3QoaG9zdCwgcG9ydCwgdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCwgJ0dFVCcsIHt9LCBudWxsLCAnaHR0cHMnKTtcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgLnRoZW4oKHIpID0+IHIudG9KU09OKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnNpZ25hdHVyZSk7XG59O1xuZXhwb3J0cy5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0Q29ubmVjdGlvblNldHRpbmdzID0gZXhwb3J0cy5jb25uZWN0aW9uU2V0dGluZ3MgPSB2b2lkIDA7XG5jb25zdCBkZWZhdWx0Q29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIGhvc3Q6ICdhcGkuc3RyaXBlLmNvbScsXG4gICAgcG9ydDogNDQzLFxufTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5leHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IGRlZmF1bHRDb25uZWN0aW9uU2V0dGluZ3M7XG5jb25zdCBzZXRDb25uZWN0aW9uU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICBleHBvcnRzLmNvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICAgICAgLi4uZGVmYXVsdENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgfTtcbn07XG5leHBvcnRzLnNldENvbm5lY3Rpb25TZXR0aW5ncyA9IHNldENvbm5lY3Rpb25TZXR0aW5ncztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSB2b2lkIDA7XG5jb25zdCBjcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5XzEgPSByZXF1aXJlKFwiLi9zaWduYXR1cmUvY3JlYXRlRmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseVwiKTtcbmNvbnN0IHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xID0gcmVxdWlyZShcIi4vYXBpL3N1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleVwiKTtcbmNvbnN0IGNvbm5lY3Rpb25TZXR0aW5nc18xID0gcmVxdWlyZShcIi4vc2lnbmF0dXJlL2Nvbm5lY3Rpb25TZXR0aW5nc1wiKTtcbmNvbnN0IF9lbmRwb2ludF8xID0gcmVxdWlyZShcIi4vX2VuZHBvaW50XCIpO1xuY29uc3QgZmV0Y2hTdHJpcGVTaWduYXR1cmUgPSBhc3luYyAoYWRkaXRpb25hbFBheWxvYWQpID0+IHtcbiAgICBpZiAoYXdhaXQgKDAsIHN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleV8xLnN1cHBvcnRzRmV0Y2hBcHBFbWJlZGRlZEtleSkoKSkge1xuICAgICAgICBjb25zdCBmZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5ID0gKDAsIGNyZWF0ZUZldGNoU3RyaXBlU2lnbmF0dXJlRGlyZWN0bHlfMS5jcmVhdGVGZXRjaFN0cmlwZVNpZ25hdHVyZURpcmVjdGx5KShjb25uZWN0aW9uU2V0dGluZ3NfMS5jb25uZWN0aW9uU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gZmV0Y2hTdHJpcGVTaWduYXR1cmVEaXJlY3RseShhZGRpdGlvbmFsUGF5bG9hZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKDAsIF9lbmRwb2ludF8xLmdldEhvc3RFbmRwb2ludCkoKS5jYWxsLmZldGNoU3RyaXBlU2lnbmF0dXJlKGFkZGl0aW9uYWxQYXlsb2FkKTtcbiAgICB9XG59O1xuZXhwb3J0cy5mZXRjaFN0cmlwZVNpZ25hdHVyZSA9IGZldGNoU3RyaXBlU2lnbmF0dXJlO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gVGhpcyBmaWxlIG1vdmVkIHRvIHV0aWxzOyByZS1leHBvcnRlZCB0byBub3QgYnJlYWsgaW1wb3J0c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2lnbmF0dXJlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zaWduYXR1cmVcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBzaWduYXR1cmVfMS5mZXRjaFN0cmlwZVNpZ25hdHVyZTtcbiIsICIvLyBBVVRPR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuaW1wb3J0IFBheW1lbnREaXNwdXRlVmlldyBmcm9tICcuLi9zcmMvdmlld3MvUGF5bWVudERpc3B1dGVWaWV3JztpbXBvcnQgRGlzcHV0ZUxpc3RWaWV3IGZyb20gJy4uL3NyYy92aWV3cy9EaXNwdXRlTGlzdFZpZXcnO2ltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuLi9zcmMvdmlld3MvQXBwU2V0dGluZ3MnO1xuXG5leHBvcnQgKiBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdmVyc2lvbic7XG5leHBvcnQgY29uc3QgQlVJTERfVElNRSA9ICcyMDI2LTA0LTA1IDE2OjI2OjI0LjE5MDIzOCAtMDcwMCBQRFQgbT0rMjIxNC40ODI4MTI5NTknO1xuXG5leHBvcnQgeyBcbiAgUGF5bWVudERpc3B1dGVWaWV3LFxuXG4gIERpc3B1dGVMaXN0VmlldyxcblxuICBBcHBTZXR0aW5nc1xuIH07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL3N0cmlwZS1hcHAuc2NoZW1hLmpzb25cIixcbiAgXCJpY29uXCI6IFwiXCIsXG4gIFwiaWRcIjogXCJjb20uamtidGVjaC53aW5iYWNrXCIsXG4gIFwibmFtZVwiOiBcIldpbkJhY2tcIixcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZGlzcHV0ZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGRpc3B1dGUgZGV0YWlscyB0byBndWlkZSBtZXJjaGFudHMgdGhyb3VnaCB0aGUgcmVzcG9uc2UgcHJvY2Vzc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJkaXNwdXRlX3dyaXRlXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJTdWJtaXQgZXZpZGVuY2UgYW5kIHJlc3BvbnNlcyBvbiBiZWhhbGYgb2YgdGhlIG1lcmNoYW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImNoYXJnZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGNoYXJnZSBkZXRhaWxzIGFzc29jaWF0ZWQgd2l0aCBkaXNwdXRlc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBlcm1pc3Npb25cIjogXCJjdXN0b21lcl9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIGN1c3RvbWVyIGluZm9ybWF0aW9uIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwiZmlsZV9yZWFkXCIsXG4gICAgICBcInB1cnBvc2VcIjogXCJSZWFkIHVwbG9hZGVkIGV2aWRlbmNlIGZpbGVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImZpbGVfd3JpdGVcIixcbiAgICAgIFwicHVycG9zZVwiOiBcIlVwbG9hZCBldmlkZW5jZSBmaWxlcyBmb3IgZGlzcHV0ZSByZXNwb25zZXNcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwZXJtaXNzaW9uXCI6IFwicGF5bWVudF9pbnRlbnRfcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBwYXltZW50IGludGVudCBkZXRhaWxzIGZvciBkaXNwdXRlIGNvbnRleHRcIlxuICAgIH1cbiAgXSxcbiAgXCJwb3N0X2luc3RhbGxfYWN0aW9uXCI6IHtcbiAgICBcInR5cGVcIjogXCJzZXR0aW5nc1wiXG4gIH0sXG4gIFwidWlfZXh0ZW5zaW9uXCI6IHtcbiAgICBcImNvbnRlbnRfc2VjdXJpdHlfcG9saWN5XCI6IHtcbiAgICAgIFwiY29ubmVjdC1zcmNcIjogW1xuICAgICAgICBcImh0dHBzOi8vd2luYmFja3BheS5jb20vYXBpL1wiLFxuICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJcIlxuICAgIH0sXG4gICAgXCJ2aWV3c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiUGF5bWVudERpc3B1dGVWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLnBheW1lbnQuZGV0YWlsXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiRGlzcHV0ZUxpc3RWaWV3XCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLmRyYXdlci5kZWZhdWx0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiQXBwU2V0dGluZ3NcIixcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInNldHRpbmdzXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCJcbn07XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQmFkZ2UsXG4gIEJ1dHRvbixcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU3Bpbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgeyBmZXRjaEJhY2tlbmQsIEFwaUVycm9yIH0gZnJvbSAnLi4vbGliL2FwaUNsaWVudCc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG50eXBlIFZpZXdTdGF0ZSA9ICdsb2FkaW5nJyB8ICdub19kaXNwdXRlJyB8ICdlcnJvcicgfCAncmVhZHknO1xuXG5jb25zdCBQYXltZW50RGlzcHV0ZVZpZXcgPSAoY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIGNvbnN0IHsgZW52aXJvbm1lbnQgfSA9IGNvbnRleHQ7XG4gIGNvbnN0IHBheW1lbnRJbnRlbnRJZCA9IGVudmlyb25tZW50Py5vYmplY3RDb250ZXh0Py5pZDtcblxuICBjb25zdCBbdmlld1N0YXRlLCBzZXRWaWV3U3RhdGVdID0gdXNlU3RhdGU8Vmlld1N0YXRlPignbG9hZGluZycpO1xuICBjb25zdCBbZGlzcHV0ZSwgc2V0RGlzcHV0ZV0gPSB1c2VTdGF0ZTxEaXNwdXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93V29ya2Zsb3csIHNldFNob3dXb3JrZmxvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVmIHRvIGF2b2lkIGNvbnRleHQgcmVmZXJlbmNlIGlkZW50aXR5IGNoYW5nZXMgdHJpZ2dlcmluZyByZS1mZXRjaGVzXG4gIGNvbnN0IGNvbnRleHRSZWYgPSB1c2VSZWYoY29udGV4dCk7XG4gIGNvbnRleHRSZWYuY3VycmVudCA9IGNvbnRleHQ7XG5cbiAgY29uc3QgbG9hZERpc3B1dGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFwYXltZW50SW50ZW50SWQpIHtcbiAgICAgIHNldFZpZXdTdGF0ZSgnbm9fZGlzcHV0ZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFZpZXdTdGF0ZSgnbG9hZGluZycpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEJhY2tlbmQ8eyBkYXRhOiBEaXNwdXRlIH0+KFxuICAgICAgICBgL2FwaS9kaXNwdXRlcy9ieS1wYXltZW50LWludGVudC8ke3BheW1lbnRJbnRlbnRJZH1gLFxuICAgICAgICBjb250ZXh0UmVmLmN1cnJlbnQsXG4gICAgICApO1xuICAgICAgc2V0RGlzcHV0ZShyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIHNldFZpZXdTdGF0ZSgnbm9fZGlzcHV0ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0Vmlld1N0YXRlKCdlcnJvcicpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW3BheW1lbnRJbnRlbnRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZERpc3B1dGUoKTtcbiAgfSwgW2xvYWREaXNwdXRlXSk7XG5cbiAgaWYgKHZpZXdTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250ZXh0VmlldyB0aXRsZT1cIldpbkJhY2tcIj5cbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NvbnRleHRWaWV3PlxuICAgICk7XG4gIH1cblxuICBpZiAodmlld1N0YXRlID09PSAnbm9fZGlzcHV0ZScgfHwgdmlld1N0YXRlID09PSAnZXJyb3InIHx8ICFkaXNwdXRlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250ZXh0VmlldyB0aXRsZT1cIldpbkJhY2tcIj5cbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScsIGFsaWduWDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICBObyBkaXNwdXRlIG9uIHRoaXMgcGF5bWVudC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NvbnRleHRWaWV3PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBzdGF0dXNCYWRnZSA9IGdldFN0YXR1c0JhZGdlKGRpc3B1dGUuc3RhdHVzKTtcblxuICByZXR1cm4gKFxuICAgIDxDb250ZXh0VmlldyB0aXRsZT1cIldpbkJhY2tcIj5cbiAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdtZWRpdW0nLCBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBzdGFjazogJ3gnLFxuICAgICAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICAgICAgZGlzdHJpYnV0ZTogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYWxpZ25ZOiAnY2VudGVyJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgRGlzcHV0ZVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxCYWRnZSB0eXBlPXtzdGF0dXNCYWRnZS50eXBlfT57c3RhdHVzQmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScgfX0+XG4gICAgICAgICAgICB7ZGlzcHV0ZS5uZXR3b3JrLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgZGlzcHV0ZS5uZXR3b3JrLnNsaWNlKDEpfXsnICd9XG4gICAgICAgICAgICB7ZGlzcHV0ZS5yZWFzb25fY29kZX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLnJlYXNvbi5yZXBsYWNlKC9fL2csICcgJyl9XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIHsoZGlzcHV0ZS5zdGF0dXMgPT09ICduZWVkc19yZXNwb25zZScgfHxcbiAgICAgICAgICBkaXNwdXRlLnN0YXR1cyA9PT0gJ3dhcm5pbmdfbmVlZHNfcmVzcG9uc2UnKSAmJiAoXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgY3NzPXt7IHdpZHRoOiAnZmlsbCcgfX1cbiAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IHNldFNob3dXb3JrZmxvdyh0cnVlKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBPcGVuIGluIFdpbkJhY2tcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICA8RGlzcHV0ZVdvcmtmbG93XG4gICAgICAgIGRpc3B1dGU9e2Rpc3B1dGV9XG4gICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgIHNob3duPXtzaG93V29ya2Zsb3d9XG4gICAgICAgIHNldFNob3duPXtzZXRTaG93V29ya2Zsb3d9XG4gICAgICAvPlxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYXltZW50RGlzcHV0ZVZpZXc7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEJhbm5lcixcbiAgRGl2aWRlcixcbiAgRm9jdXNWaWV3LFxuICBJbmxpbmUsXG4gIFNwaW5uZXIsXG4gIFRhYnMsXG4gIFRhYixcbiAgVGFiTGlzdCxcbiAgVGFiUGFuZWxzLFxuICBUYWJQYW5lbCxcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IHR5cGUgeyBXaXphcmRTdGVwLCBEaXNwdXRlLCBQbGF5Ym9va0RhdGEgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgV0laQVJEX1NURVBTLCBXSVpBUkRfU1RFUF9MQUJFTFMgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgZ2V0RGF5c1JlbWFpbmluZywgaXNSZXNvbHZlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgRXJyb3JCYW5uZXIgZnJvbSAnLi9FcnJvckJhbm5lcic7XG5pbXBvcnQgRGlzcHV0ZU92ZXJ2aWV3IGZyb20gJy4vcmV2aWV3L0Rpc3B1dGVPdmVydmlldyc7XG5pbXBvcnQgQ29hY2hIZWFkZXIgZnJvbSAnLi9yZXZpZXcvQ29hY2hIZWFkZXInO1xuaW1wb3J0IFF1aWNrQWN0aW9ucyBmcm9tICcuL3Jldmlldy9RdWlja0FjdGlvbnMnO1xuaW1wb3J0IExlYXJuTW9yZSBmcm9tICcuL3Jldmlldy9MZWFybk1vcmUnO1xuaW1wb3J0IFVyZ2VuY3lCYW5uZXIgZnJvbSAnLi9yZXZpZXcvVXJnZW5jeUJhbm5lcic7XG5cbmludGVyZmFjZSBEaXNwdXRlV29ya2Zsb3dQcm9wcyB7XG4gIGRpc3B1dGU6IERpc3B1dGU7XG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZTtcbiAgc2hvd246IGJvb2xlYW47XG4gIHNldFNob3duOiAoc2hvd246IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbmNvbnN0IERpc3B1dGVXb3JrZmxvdyA9ICh7IGRpc3B1dGU6IGluaXRpYWxEaXNwdXRlLCBjb250ZXh0LCBzaG93biwgc2V0U2hvd24gfTogRGlzcHV0ZVdvcmtmbG93UHJvcHMpID0+IHtcbiAgY29uc3QgW2N1cnJlbnRTdGVwLCBzZXRDdXJyZW50U3RlcF0gPSB1c2VTdGF0ZTxXaXphcmRTdGVwPigncmV2aWV3Jyk7XG4gIGNvbnN0IFtkaXNwdXRlLCBzZXREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGU+KGluaXRpYWxEaXNwdXRlKTtcbiAgY29uc3QgW3BsYXlib29rLCBzZXRQbGF5Ym9va10gPSB1c2VTdGF0ZTxQbGF5Ym9va0RhdGEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8eyBkaXNwdXRlOiBib29sZWFuOyBwbGF5Ym9vazogYm9vbGVhbiB9Pih7XG4gICAgZGlzcHV0ZTogZmFsc2UsXG4gICAgcGxheWJvb2s6IGZhbHNlLFxuICB9KTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPHsgZGlzcHV0ZTogc3RyaW5nIHwgbnVsbDsgcGxheWJvb2s6IHN0cmluZyB8IG51bGwgfT4oe1xuICAgIGRpc3B1dGU6IG51bGwsXG4gICAgcGxheWJvb2s6IG51bGwsXG4gIH0pO1xuXG4gIC8vIFJlZiB0byBhdm9pZCBjb250ZXh0IHJlZmVyZW5jZSBpZGVudGl0eSBjaGFuZ2VzIHRyaWdnZXJpbmcgcmUtZmV0Y2hlc1xuICBjb25zdCBjb250ZXh0UmVmID0gdXNlUmVmKGNvbnRleHQpO1xuICBjb250ZXh0UmVmLmN1cnJlbnQgPSBjb250ZXh0O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93bikgcmV0dXJuO1xuXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh7IGRpc3B1dGU6IHRydWUsIHBsYXlib29rOiB0cnVlIH0pO1xuICAgICAgc2V0RXJyb3JzKHsgZGlzcHV0ZTogbnVsbCwgcGxheWJvb2s6IG51bGwgfSk7XG5cbiAgICAgIC8vIEZldGNoIGVucmljaGVkIGRpc3B1dGUgYW5kIHBsYXlib29rIGluIHBhcmFsbGVsXG4gICAgICAvLyBTa2lwIHBsYXlib29rIGZldGNoIGlmIHJlYXNvbl9jb2RlIGlzIGVtcHR5ICh0ZXN0IGRpc3B1dGVzLCB1bmtub3duIGNvZGVzKVxuICAgICAgY29uc3Qgc2hvdWxkRmV0Y2hQbGF5Ym9vayA9ICEhaW5pdGlhbERpc3B1dGUucmVhc29uX2NvZGU7XG4gICAgICBjb25zdCBbZGlzcHV0ZVJlc3VsdCwgcGxheWJvb2tSZXN1bHRdID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKFtcbiAgICAgICAgZmV0Y2hCYWNrZW5kPHsgZGF0YTogRGlzcHV0ZSB9PihgL2FwaS9kaXNwdXRlcy8ke2luaXRpYWxEaXNwdXRlLmlkfWAsIGNvbnRleHRSZWYuY3VycmVudCksXG4gICAgICAgIHNob3VsZEZldGNoUGxheWJvb2tcbiAgICAgICAgICA/IGZldGNoQmFja2VuZDx7IGRhdGE6IFBsYXlib29rRGF0YSB9PignL2FwaS9wbGF5Ym9va3MnLCBjb250ZXh0UmVmLmN1cnJlbnQsIHtcbiAgICAgICAgICAgICAgbmV0d29yazogaW5pdGlhbERpc3B1dGUubmV0d29yayxcbiAgICAgICAgICAgICAgcmVhc29uX2NvZGU6IGluaXRpYWxEaXNwdXRlLnJlYXNvbl9jb2RlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBBcGlFcnJvcignTm8gcmVhc29uIGNvZGUnLCA0MDQpKSxcbiAgICAgIF0pO1xuXG4gICAgICBpZiAoZGlzcHV0ZVJlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldERpc3B1dGUoZGlzcHV0ZVJlc3VsdC52YWx1ZS5kYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGRpc3B1dGVSZXN1bHQucmVhc29uO1xuICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBkaXNwdXRlOiBlcnIgaW5zdGFuY2VvZiBBcGlFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBsb2FkIGRpc3B1dGUgZGV0YWlscy4nLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBkaXNwdXRlOiBmYWxzZSB9KSk7XG5cbiAgICAgIGlmIChwbGF5Ym9va1Jlc3VsdC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIHNldFBsYXlib29rKHBsYXlib29rUmVzdWx0LnZhbHVlLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyID0gcGxheWJvb2tSZXN1bHQucmVhc29uO1xuICAgICAgICAvLyA0MDQgaXMgbm90IGFuIGVycm9yIC0tIGp1c3QgbWVhbnMgbm8gcGxheWJvb2sgZm9yIHRoaXMgcmVhc29uIGNvZGVcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDA0KSkge1xuICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5Ym9vazogZXJyIGluc3RhbmNlb2YgQXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBwbGF5Ym9vay4nLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQbGF5Ym9vayhudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlib29rOiBmYWxzZSB9KSk7XG4gICAgfTtcblxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbc2hvd24sIGluaXRpYWxEaXNwdXRlLmlkLCBpbml0aWFsRGlzcHV0ZS5uZXR3b3JrLCBpbml0aWFsRGlzcHV0ZS5yZWFzb25fY29kZV0pO1xuXG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IFdJWkFSRF9TVEVQUy5pbmRleE9mKGN1cnJlbnRTdGVwKTtcbiAgY29uc3QgaXNGaXJzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IDA7XG4gIGNvbnN0IGlzTGFzdFN0ZXAgPSBjdXJyZW50SW5kZXggPT09IFdJWkFSRF9TVEVQUy5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0xhc3RTdGVwKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcChXSVpBUkRfU1RFUFNbY3VycmVudEluZGV4ICsgMV0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgIGlmICghaXNGaXJzdFN0ZXApIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwKFdJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRheXNSZW1haW5pbmcgPSBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KTtcbiAgY29uc3QgaXNVcmdlbnQgPSBkYXlzUmVtYWluaW5nIDwgNSAmJiAhaXNSZXNvbHZlZChkaXNwdXRlLnN0YXR1cyk7XG5cbiAgY29uc3QgcmVuZGVyUmV2aWV3VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTG9hZGluZ1BsYXlib29rID0gbG9hZGluZy5wbGF5Ym9vaztcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAge2lzVXJnZW50ICYmIHBsYXlib29rICYmIDxVcmdlbmN5QmFubmVyIGRheXNSZW1haW5pbmc9e2RheXNSZW1haW5pbmd9IGVzc2VudGlhbHM9e3BsYXlib29rLnVyZ2VuY3lfZXNzZW50aWFsc30gLz59XG5cbiAgICAgICAge2Vycm9ycy5kaXNwdXRlICYmIDxFcnJvckJhbm5lciBtZXNzYWdlPXtlcnJvcnMuZGlzcHV0ZX0gLz59XG5cbiAgICAgICAgPERpc3B1dGVPdmVydmlldyBkaXNwdXRlPXtkaXNwdXRlfSBsb2FkaW5nPXtsb2FkaW5nLmRpc3B1dGV9IC8+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICB7aXNMb2FkaW5nUGxheWJvb2sgPyAoXG4gICAgICAgICAgPEJveCBjc3M9e3sgYWxpZ25YOiAnY2VudGVyJywgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibWVkaXVtXCIgLz5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkxvYWRpbmcgcGxheWJvb2suLi48L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IGVycm9ycy5wbGF5Ym9vayA/IChcbiAgICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JzLnBsYXlib29rfSAvPlxuICAgICAgICApIDogcGxheWJvb2sgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxDb2FjaEhlYWRlclxuICAgICAgICAgICAgICBoZWFkbGluZT17cGxheWJvb2suY29hY2hfaGVhZGxpbmV9XG4gICAgICAgICAgICAgIHN1bW1hcnk9e3BsYXlib29rLmNvYWNoX3N1bW1hcnl9XG4gICAgICAgICAgICAgIHVyZ2VuY3lNb2RlPXtpc1VyZ2VudH1cbiAgICAgICAgICAgICAgZGF5c1JlbWFpbmluZz17ZGF5c1JlbWFpbmluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UXVpY2tBY3Rpb25zIHBsYXlib29rPXtwbGF5Ym9va30gdXJnZW5jeU1vZGU9e2lzVXJnZW50fSAvPlxuICAgICAgICAgICAgPExlYXJuTW9yZVxuICAgICAgICAgICAgICBpc3N1ZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9pc3N1ZXJfc3VtbWFyeX1cbiAgICAgICAgICAgICAgYWNxdWlyZXJTdW1tYXJ5PXtwbGF5Ym9vay5jb2FjaF9hY3F1aXJlcl9zdW1tYXJ5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICB0aXRsZT1cIk5vIHBsYXlib29rIGF2YWlsYWJsZVwiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldlIGRvbid0IGhhdmUgYSBzcGVjaWZpYyBwbGF5Ym9vayBmb3IgdGhpcyByZWFzb24gY29kZSB5ZXQuIFVzZSB0aGUgZ2VuZXJhbCBldmlkZW5jZSBndWlkZWxpbmVzIHRvIGJ1aWxkIHlvdXIgcmVzcG9uc2UuXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGb2N1c1ZpZXdcbiAgICAgIHRpdGxlPXtgRGlzcHV0ZSAke2luaXRpYWxEaXNwdXRlLmlkLnNsaWNlKDAsIDEyKX0uLi5gfVxuICAgICAgc2hvd249e3Nob3dufVxuICAgICAgc2V0U2hvd249e3NldFNob3dufVxuICAgICAgY29uZmlybUNsb3NlTWVzc2FnZXM9e3tcbiAgICAgICAgdGl0bGU6ICdMZWF2ZSBkaXNwdXRlIHdvcmtmbG93PycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnWW91ciBwcm9ncmVzcyBvbiB0aGlzIHN0ZXAgd2lsbCBub3QgYmUgc2F2ZWQuJyxcbiAgICAgICAgY2FuY2VsQWN0aW9uOiAnU3RheScsXG4gICAgICAgIGV4aXRBY3Rpb246ICdMZWF2ZScsXG4gICAgICB9fVxuICAgICAgcHJpbWFyeUFjdGlvbj17XG4gICAgICAgIGlzTGFzdFN0ZXAgPyAoXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uUHJlc3M9eygpID0+IHNldFNob3duKGZhbHNlKX0+XG4gICAgICAgICAgICBTdWJtaXQgKHBsYWNlaG9sZGVyKVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBvblByZXNzPXtoYW5kbGVOZXh0fT5cbiAgICAgICAgICAgIE5leHQ6IHtXSVpBUkRfU1RFUF9MQUJFTFNbV0laQVJEX1NURVBTW2N1cnJlbnRJbmRleCArIDFdXX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgc2Vjb25kYXJ5QWN0aW9uPXtcbiAgICAgICAgaXNGaXJzdFN0ZXAgPyAoXG4gICAgICAgICAgPEJ1dHRvbiBvblByZXNzPXsoKSA9PiBzZXRTaG93bihmYWxzZSl9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17aGFuZGxlQmFja30+XG4gICAgICAgICAgICBCYWNrOiB7V0laQVJEX1NURVBfTEFCRUxTW1dJWkFSRF9TVEVQU1tjdXJyZW50SW5kZXggLSAxXV19XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICA+XG4gICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgPFRhYnNcbiAgICAgICAgICBmaXR0ZWRcbiAgICAgICAgICBzaXplPVwibWVkaXVtXCJcbiAgICAgICAgICBzZWxlY3RlZEtleT17Y3VycmVudFN0ZXB9XG4gICAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2U9eyhrZXkpID0+IHNldEN1cnJlbnRTdGVwKGtleSBhcyBXaXphcmRTdGVwKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUYWJMaXN0PlxuICAgICAgICAgICAge1dJWkFSRF9TVEVQUy5tYXAoKHN0ZXApID0+IChcbiAgICAgICAgICAgICAgPFRhYiBrZXk9e3N0ZXB9IGlkPXtzdGVwfT5cbiAgICAgICAgICAgICAgICB7V0laQVJEX1NURVBfTEFCRUxTW3N0ZXBdfVxuICAgICAgICAgICAgICA8L1RhYj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvVGFiTGlzdD5cbiAgICAgICAgICA8VGFiUGFuZWxzPlxuICAgICAgICAgICAgPFRhYlBhbmVsIGlkPVwicmV2aWV3XCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJSZXZpZXdUYWIoKX1cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJldmlkZW5jZVwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgMjogR2F0aGVyIEV2aWRlbmNlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiQ2hlY2sgb2ZmIHJlcXVpcmVkIGV2aWRlbmNlIGl0ZW1zIGFuZCB1cGxvYWQgc3VwcG9ydGluZyBmaWxlcy5cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgICAgICBFdmlkZW5jZSBjaGVja2xpc3QgYW5kIGZpbGUgdXBsb2FkIHdpbGwgYmUgYnVpbHQgaW4gV0lOLTE0IGFuZCBXSU4tMTYuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cIm5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgMzogQUkgTmFycmF0aXZlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiR2VuZXJhdGUgYSBjb21wZWxsaW5nIG5hcnJhdGl2ZSBiYXNlZCBvbiB5b3VyIGV2aWRlbmNlLiBSZXZpZXcsIGVkaXQsIGFuZCBhcHByb3ZlIGJlZm9yZSBzdWJtaXNzaW9uLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEFJIG5hcnJhdGl2ZSBnZW5lcmF0aW9uIGFuZCBlZGl0aW5nIHdpbGwgYmUgYnVpbHQgaW4gV0lOLTE4IGFuZCBXSU4tMTkuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgc3RhY2s6ICd5JywgZ2FwOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlN0ZXAgNDogU3VibWl0IEV2aWRlbmNlXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUmV2aWV3IGV2ZXJ5dGhpbmcgb25lIGZpbmFsIHRpbWUuIFN1Ym1pc3Npb24gdG8gU3RyaXBlIGlzIGlycmV2b2NhYmxlLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgIEZpbmFsIHJldmlldyBhbmQgU3RyaXBlIHN1Ym1pc3Npb24gd2lsbCBiZSBidWlsdCBpbiBXSU4tMjAuXG4gICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9UYWJQYW5lbD5cbiAgICAgICAgICA8L1RhYlBhbmVscz5cbiAgICAgICAgPC9UYWJzPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Gb2N1c1ZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlV29ya2Zsb3c7XG4iLCAiZXhwb3J0IHR5cGUgRGlzcHV0ZVN0YXR1cyA9XG4gIHwgJ25lZWRzX3Jlc3BvbnNlJ1xuICB8ICd1bmRlcl9yZXZpZXcnXG4gIHwgJ3dvbidcbiAgfCAnbG9zdCdcbiAgfCAnd2FybmluZ19uZWVkc19yZXNwb25zZSdcbiAgfCAnd2FybmluZ191bmRlcl9yZXZpZXcnXG4gIHwgJ3dhcm5pbmdfY2xvc2VkJ1xuICB8ICdjaGFyZ2VfcmVmdW5kZWQnO1xuXG5leHBvcnQgdHlwZSBDYXJkTmV0d29yayA9ICd2aXNhJyB8ICdtYXN0ZXJjYXJkJyB8ICdhbWV4JyB8ICdkaXNjb3ZlcicgfCAndW5rbm93bic7XG5cbmV4cG9ydCB0eXBlIFdpemFyZFN0ZXAgPSAncmV2aWV3JyB8ICdldmlkZW5jZScgfCAnbmFycmF0aXZlJyB8ICdzdWJtaXQnO1xuXG5leHBvcnQgY29uc3QgV0laQVJEX1NURVBTOiBXaXphcmRTdGVwW10gPSBbJ3JldmlldycsICdldmlkZW5jZScsICduYXJyYXRpdmUnLCAnc3VibWl0J107XG5cbmV4cG9ydCBjb25zdCBXSVpBUkRfU1RFUF9MQUJFTFM6IFJlY29yZDxXaXphcmRTdGVwLCBzdHJpbmc+ID0ge1xuICByZXZpZXc6ICdSZXZpZXcnLFxuICBldmlkZW5jZTogJ0V2aWRlbmNlJyxcbiAgbmFycmF0aXZlOiAnTmFycmF0aXZlJyxcbiAgc3VibWl0OiAnU3VibWl0Jyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcHV0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBjdXJyZW5jeTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc3RhdHVzOiBEaXNwdXRlU3RhdHVzO1xuICBkdWVfYnk6IHN0cmluZztcbiAgcmVhc29uX2NvZGU6IHN0cmluZztcbiAgbmV0d29yazogQ2FyZE5ldHdvcms7XG4gIHBheW1lbnRfaW50ZW50Pzogc3RyaW5nO1xuICBjaGFyZ2VfaWQ6IHN0cmluZztcbiAgY3VzdG9tZXJfbmFtZT86IHN0cmluZztcbiAgY3VzdG9tZXJfZW1haWw/OiBzdHJpbmc7XG4gIGNyZWF0ZWQ6IG51bWJlcjtcbiAgZXZpZGVuY2VfZHVlX2J5OiBudW1iZXI7XG4gIC8vIEVucmljaGVkIGZpZWxkcyAoYXZhaWxhYmxlIGFmdGVyIGRldGFpbCBmZXRjaClcbiAgdHJhbnNhY3Rpb25fZGF0ZT86IG51bWJlcjtcbiAgY2FyZF9icmFuZD86IHN0cmluZztcbiAgY2FyZF9sYXN0ND86IHN0cmluZztcbiAgYmlsbGluZ19hZGRyZXNzPzogc3RyaW5nO1xuICBjaGFyZ2VfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJlY2VpcHRfdXJsPzogc3RyaW5nO1xuICBoYXNfZXZpZGVuY2U/OiBib29sZWFuO1xuICBldmlkZW5jZV9zdWJtaXNzaW9uX2NvdW50PzogbnVtYmVyO1xuICBpc19jaGFyZ2VfcmVmdW5kYWJsZT86IGJvb2xlYW47XG4gIG1ldGFkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuLy8gUGxheWJvb2sgdHlwZXMgKG1pcnJvcnMgYmFja2VuZCBQbGF5Ym9va0RhdGEpXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZpZGVuY2VDaGVja2xpc3RJdGVtIHtcbiAgaXRlbTogc3RyaW5nO1xuICBjYXRlZ29yeTogJ21hbmRhdG9yeScgfCAncmVjb21tZW5kZWQnIHwgJ3NpdHVhdGlvbmFsJztcbiAgY29udGV4dDogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgd2h5X21hdHRlcnM6IHN0cmluZztcbiAgdXJnZW5jeV9lc3NlbnRpYWw6IGJvb2xlYW47XG4gIHVyZ2VuY3lfb3JkZXI6IG51bWJlciB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxheWJvb2tEYXRhIHtcbiAgbmV0d29yazogc3RyaW5nO1xuICByZWFzb25fY29kZTogc3RyaW5nO1xuICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29hY2hfaGVhZGxpbmU6IHN0cmluZztcbiAgY29hY2hfc3VtbWFyeTogc3RyaW5nO1xuICBjb2FjaF9pc3N1ZXJfc3VtbWFyeTogc3RyaW5nO1xuICBjb2FjaF9hY3F1aXJlcl9zdW1tYXJ5OiBzdHJpbmc7XG4gIGlzc3Vlcl9ldmFsdWF0aW9uOiBzdHJpbmc7XG4gIGFjcXVpcmVyX3ByZXJldmlldzogc3RyaW5nO1xuICBldmlkZW5jZV9jaGVja2xpc3Q6IEV2aWRlbmNlQ2hlY2tsaXN0SXRlbVtdO1xuICBjb21tb25fbWlzdGFrZXM6IHsgbWlzdGFrZTogc3RyaW5nOyBleHBsYW5hdGlvbjogc3RyaW5nIH1bXTtcbiAgcHJvX3RpcHM6IHsgdGlwOiBzdHJpbmcgfVtdO1xuICB1cmdlbmN5X2Vzc2VudGlhbHM6IHsgc3VtbWFyeTogc3RyaW5nOyBvcmRlcmVkX2l0ZW1zOiBzdHJpbmdbXSB9O1xuICBuYXJyYXRpdmVfdGVtcGxhdGU6IHN0cmluZztcbiAgcmVzcG9uc2VfZGVhZGxpbmVfZGF5czogbnVtYmVyO1xufVxuIiwgImltcG9ydCBmZXRjaFN0cmlwZVNpZ25hdHVyZSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvc2lnbmF0dXJlJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuXG5jb25zdCBQUk9EX0JBQ0tFTkQgPSAnaHR0cHM6Ly93aW5iYWNrcGF5LmNvbSc7XG5jb25zdCBMT0NBTF9CQUNLRU5EID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG5cbmZ1bmN0aW9uIGdldEJhY2tlbmRVcmwobW9kZT86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnID8gTE9DQUxfQkFDS0VORCA6IFBST0RfQkFDS0VORDtcbn1cblxuZXhwb3J0IGNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcHVibGljIHN0YXR1czogbnVtYmVyLFxuICApIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnQXBpRXJyb3InO1xuICB9XG59XG5cbi8qKlxuICogTWFrZXMgYW4gYXV0aGVudGljYXRlZCByZXF1ZXN0IHRvIHRoZSBXaW5CYWNrIGJhY2tlbmQuXG4gKiBBdXRvbWF0aWNhbGx5IGluY2x1ZGVzIFN0cmlwZSBBcHAgc2lnbmF0dXJlIGFuZCBpZGVudGl0eSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJhY2tlbmQ8VCA9IHVua25vd24+KFxuICBwYXRoOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSxcbiAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IGZldGNoU3RyaXBlU2lnbmF0dXJlKCk7XG5cbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5kYXRhLFxuICAgIHVzZXJfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmlkLFxuICAgIGFjY291bnRfaWQ6IGNvbnRleHQudXNlckNvbnRleHQ/LmFjY291bnQuaWQsXG4gIH0pO1xuXG4gIGNvbnN0IGJhY2tlbmRVcmwgPSBnZXRCYWNrZW5kVXJsKGNvbnRleHQuZW52aXJvbm1lbnQ/Lm1vZGUpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2JhY2tlbmRVcmx9JHtwYXRofWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ1N0cmlwZS1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgfSxcbiAgICBib2R5LFxuICB9KTtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgIH0pKTtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8VD47XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEaXNwdXRlU3RhdHVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFJFU09MVkVEX1NUQVRVU0VTOiBEaXNwdXRlU3RhdHVzW10gPSBbJ3dvbicsICdsb3N0JywgJ3dhcm5pbmdfY2xvc2VkJywgJ2NoYXJnZV9yZWZ1bmRlZCddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNvbHZlZChzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gUkVTT0xWRURfU1RBVFVTRVMuaW5jbHVkZXMoc3RhdHVzIGFzIERpc3B1dGVTdGF0dXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHVzQmFkZ2Uoc3RhdHVzOiBzdHJpbmcpOiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHR5cGU6ICd1cmdlbnQnIHwgJ3dhcm5pbmcnIHwgJ3Bvc2l0aXZlJyB8ICduZWdhdGl2ZScgfCAnaW5mbyc7XG59IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlICduZWVkc19yZXNwb25zZSc6XG4gICAgY2FzZSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc6XG4gICAgICByZXR1cm4geyBsYWJlbDogJ05lZWRzIFJlc3BvbnNlJywgdHlwZTogJ3VyZ2VudCcgfTtcbiAgICBjYXNlICd1bmRlcl9yZXZpZXcnOlxuICAgIGNhc2UgJ3dhcm5pbmdfdW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnVW5kZXIgUmV2aWV3JywgdHlwZTogJ2luZm8nIH07XG4gICAgY2FzZSAnd29uJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnV29uJywgdHlwZTogJ3Bvc2l0aXZlJyB9O1xuICAgIGNhc2UgJ2xvc3QnOlxuICAgIGNhc2UgJ3dhcm5pbmdfY2xvc2VkJzpcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTG9zdCcsIHR5cGU6ICduZWdhdGl2ZScgfTtcbiAgICBjYXNlICdjaGFyZ2VfcmVmdW5kZWQnOlxuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdSZWZ1bmRlZCcsIHR5cGU6ICdpbmZvJyB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4geyBsYWJlbDogc3RhdHVzLCB0eXBlOiAnaW5mbycgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c1JlbWFpbmluZyhkdWVCeTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZHVlID0gbmV3IERhdGUoZHVlQnkpO1xuICByZXR1cm4gTWF0aC5jZWlsKChkdWUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJnZW5jeUJhZGdlKFxuICBkdWVCeTogc3RyaW5nLFxuICBzdGF0dXM6IHN0cmluZyxcbik6IHsgbGFiZWw6IHN0cmluZzsgdHlwZTogJ3VyZ2VudCcgfCAnd2FybmluZycgfCAncG9zaXRpdmUnIH0gfCBudWxsIHtcbiAgaWYgKGlzUmVzb2x2ZWQoc3RhdHVzKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF5cyA9IGdldERheXNSZW1haW5pbmcoZHVlQnkpO1xuICBpZiAoZGF5cyA8IDUpIHJldHVybiB7IGxhYmVsOiBgJHtkYXlzfWQgbGVmdGAsIHR5cGU6ICd1cmdlbnQnIH07XG4gIGlmIChkYXlzIDw9IDEzKSByZXR1cm4geyBsYWJlbDogYCR7ZGF5c31kIGxlZnRgLCB0eXBlOiAnd2FybmluZycgfTtcbiAgcmV0dXJuIHsgbGFiZWw6IGAke2RheXN9ZCBsZWZ0YCwgdHlwZTogJ3Bvc2l0aXZlJyB9O1xufVxuIiwgIi8vIHN0cmlwZS1hcHAvc3JjL2NvbXBvbmVudHMvRXJyb3JCYW5uZXIudHN4XG5cbmltcG9ydCB7IEJhbm5lciwgQm94LCBCdXR0b24gfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgRXJyb3JCYW5uZXJQcm9wcyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25SZXRyeT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVycm9yQmFubmVyID0gKHsgbWVzc2FnZSwgb25SZXRyeSB9OiBFcnJvckJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ21lZGl1bScgfX0+XG4gICAgICA8QmFubmVyXG4gICAgICAgIHR5cGU9XCJjcml0aWNhbFwiXG4gICAgICAgIHRpdGxlPVwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgICAgICBkZXNjcmlwdGlvbj17bWVzc2FnZX1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgb25SZXRyeSA/IChcbiAgICAgICAgICAgIDxCdXR0b24gb25QcmVzcz17b25SZXRyeX0+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJhbm5lcjtcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBJbmxpbmUsIExpbmssIFNwaW5uZXIgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBEaXNwdXRlIH0gZnJvbSAnLi4vLi4vbGliL3R5cGVzJztcbmltcG9ydCB7IGdldFN0YXR1c0JhZGdlLCBnZXRVcmdlbmN5QmFkZ2UsIGdldERheXNSZW1haW5pbmcgfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuXG5pbnRlcmZhY2UgRGlzcHV0ZU92ZXJ2aWV3UHJvcHMge1xuICBkaXNwdXRlOiBEaXNwdXRlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSW5mb1Jvd1Byb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZnVuY3Rpb24gSW5mb1Jvdyh7IGxhYmVsLCB2YWx1ZSB9OiBJbmZvUm93UHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PntsYWJlbH08L0lubGluZT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT57dmFsdWV9PC9JbmxpbmU+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLFxuICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ3Nob3J0JyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfSk7XG59XG5cbmNvbnN0IERpc3B1dGVPdmVydmlldyA9ICh7IGRpc3B1dGUsIGxvYWRpbmcgfTogRGlzcHV0ZU92ZXJ2aWV3UHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHVyZ2VuY3lCYWRnZSA9IGdldFVyZ2VuY3lCYWRnZShkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuICBjb25zdCBkYXlzUmVtYWluaW5nID0gZGlzcHV0ZS5kdWVfYnkgPyBnZXREYXlzUmVtYWluaW5nKGRpc3B1dGUuZHVlX2J5KSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICB7LyogSGVhZGVyOiBhbW91bnQgKyBiYWRnZXMgKi99XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgIHtmb3JtYXRBbW91bnQoZGlzcHV0ZS5hbW91bnQsIGRpc3B1dGUuY3VycmVuY3kpfVxuICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd4JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICA8QmFkZ2UgdHlwZT17c3RhdHVzQmFkZ2UudHlwZX0+e3N0YXR1c0JhZGdlLmxhYmVsfTwvQmFkZ2U+XG4gICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICA8QmFkZ2UgdHlwZT17dXJnZW5jeUJhZGdlLnR5cGV9Pnt1cmdlbmN5QmFkZ2UubGFiZWx9PC9CYWRnZT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQ291bnRkb3duICovfVxuICAgICAge2RheXNSZW1haW5pbmcgIT09IG51bGwgJiYgZGF5c1JlbWFpbmluZyA+IDAgJiYgKFxuICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICB7ZGF5c1JlbWFpbmluZ30ge2RheXNSZW1haW5pbmcgPT09IDEgPyAnZGF5JyA6ICdkYXlzJ30gdG8gcmVzcG9uZFxuICAgICAgICA8L0lubGluZT5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBDdXN0b21lciBpbmZvICovfVxuICAgICAge2Rpc3B1dGUuY3VzdG9tZXJfbmFtZSAmJiAoXG4gICAgICAgIDxJbmZvUm93IGxhYmVsPVwiQ3VzdG9tZXJcIiB2YWx1ZT17ZGlzcHV0ZS5jdXN0b21lcl9uYW1lfSAvPlxuICAgICAgKX1cbiAgICAgIHtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsICYmIChcbiAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJFbWFpbFwiIHZhbHVlPXtkaXNwdXRlLmN1c3RvbWVyX2VtYWlsfSAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEVucmljaGVkIHNlY3Rpb24gKi99XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZzogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAge2Rpc3B1dGUuY2FyZF9icmFuZCAmJiBkaXNwdXRlLmNhcmRfbGFzdDQgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3dcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXJkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ake2Rpc3B1dGUuY2FyZF9icmFuZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRpc3B1dGUuY2FyZF9icmFuZC5zbGljZSgxKX0gZW5kaW5nIGluICR7ZGlzcHV0ZS5jYXJkX2xhc3Q0fWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUudHJhbnNhY3Rpb25fZGF0ZSAmJiAoXG4gICAgICAgICAgICA8SW5mb1JvdyBsYWJlbD1cIlRyYW5zYWN0aW9uIGRhdGVcIiB2YWx1ZT17Zm9ybWF0RGF0ZShkaXNwdXRlLnRyYW5zYWN0aW9uX2RhdGUpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Rpc3B1dGUuY2hhcmdlX2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxJbmZvUm93IGxhYmVsPVwiRGVzY3JpcHRpb25cIiB2YWx1ZT17ZGlzcHV0ZS5jaGFyZ2VfZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3MgJiYgKFxuICAgICAgICAgICAgPEluZm9Sb3cgbGFiZWw9XCJCaWxsaW5nIGFkZHJlc3NcIiB2YWx1ZT17ZGlzcHV0ZS5iaWxsaW5nX2FkZHJlc3N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5yZWNlaXB0X3VybCAmJiAoXG4gICAgICAgICAgICA8SW5mb1Jvd1xuICAgICAgICAgICAgICBsYWJlbD1cIlJlY2VpcHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17PExpbmsgaHJlZj17ZGlzcHV0ZS5yZWNlaXB0X3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+VmlldyByZWNlaXB0PC9MaW5rPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGlzcHV0ZS5tZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhkaXNwdXRlLm1ldGFkYXRhKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhkaXNwdXRlLm1ldGFkYXRhKS5tYXAoKFtrZXksIHZhbF0pID0+IChcbiAgICAgICAgICAgICAgICA8SW5mb1JvdyBrZXk9e2tleX0gbGFiZWw9e2tleX0gdmFsdWU9e3ZhbH0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXI6IElEcyAqL31cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkRpc3B1dGU6IHtkaXNwdXRlLmlkfTwvSW5saW5lPlxuICAgICAgICB7ZGlzcHV0ZS5jaGFyZ2VfaWQgJiYgKFxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PkNoYXJnZToge2Rpc3B1dGUuY2hhcmdlX2lkfTwvSW5saW5lPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwdXRlT3ZlcnZpZXc7XG4iLCAiaW1wb3J0IHsgQm94LCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuXG5pbnRlcmZhY2UgQ29hY2hIZWFkZXJQcm9wcyB7XG4gIGhlYWRsaW5lOiBzdHJpbmc7XG4gIHN1bW1hcnk6IHN0cmluZztcbiAgdXJnZW5jeU1vZGU6IGJvb2xlYW47XG4gIGRheXNSZW1haW5pbmc/OiBudW1iZXI7XG59XG5cbmNvbnN0IENvYWNoSGVhZGVyID0gKHsgaGVhZGxpbmUsIHN1bW1hcnksIHVyZ2VuY3lNb2RlLCBkYXlzUmVtYWluaW5nIH06IENvYWNoSGVhZGVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnc3ViaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHtoZWFkbGluZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHt1cmdlbmN5TW9kZSAmJiBkYXlzUmVtYWluaW5nICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGBZb3UgaGF2ZSAke2RheXNSZW1haW5pbmd9IGRheSR7ZGF5c1JlbWFpbmluZyA9PT0gMSA/ICcnIDogJ3MnfS4gRm9jdXMgb24gdGhlIGVzc2VudGlhbHMgYmVsb3cuYFxuICAgICAgICAgIDogc3VtbWFyeX1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29hY2hIZWFkZXI7XG4iLCAiaW1wb3J0IHsgQm94LCBJY29uLCBJbmxpbmUgfSBmcm9tICdAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWknO1xuaW1wb3J0IHR5cGUgeyBQbGF5Ym9va0RhdGEgfSBmcm9tICcuLi8uLi9saWIvdHlwZXMnO1xuXG5pbnRlcmZhY2UgUXVpY2tBY3Rpb25zUHJvcHMge1xuICBwbGF5Ym9vazogUGxheWJvb2tEYXRhO1xuICB1cmdlbmN5TW9kZTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZGVyaXZlQWN0aW9ucyhwbGF5Ym9vazogUGxheWJvb2tEYXRhKTogc3RyaW5nW10ge1xuICBjb25zdCBhY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0IG1hbmRhdG9yeUl0ZW1zID0gcGxheWJvb2suZXZpZGVuY2VfY2hlY2tsaXN0XG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jYXRlZ29yeSA9PT0gJ21hbmRhdG9yeScgJiYgaXRlbS5jb250ZXh0ID09PSAnYWxsJylcbiAgICAuc2xpY2UoMCwgMyk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBtYW5kYXRvcnlJdGVtcykge1xuICAgIGFjdGlvbnMucHVzaChgQ29uZmlybSB5b3UgaGF2ZTogJHtpdGVtLml0ZW0udG9Mb3dlckNhc2UoKX1gKTtcbiAgfVxuXG4gIGNvbnN0IHRvcE1pc3Rha2VzID0gcGxheWJvb2suY29tbW9uX21pc3Rha2VzLnNsaWNlKDAsIDIpO1xuICBmb3IgKGNvbnN0IG1pc3Rha2Ugb2YgdG9wTWlzdGFrZXMpIHtcbiAgICBjb25zdCByZWZyYW1lZCA9IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdOb3QgJylcbiAgICAgID8gYE1ha2Ugc3VyZSB5b3UncmUgJHttaXN0YWtlLm1pc3Rha2Uuc2xpY2UoNCkudG9Mb3dlckNhc2UoKX1gXG4gICAgICA6IG1pc3Rha2UubWlzdGFrZS5zdGFydHNXaXRoKCdTa2lwcGluZyAnKVxuICAgICAgICA/IGBNYWtlIHN1cmUgeW91J3JlIHVzaW5nICR7bWlzdGFrZS5taXN0YWtlLnNsaWNlKDkpLnRvTG93ZXJDYXNlKCl9YFxuICAgICAgICA6IGBDaGVjazogJHttaXN0YWtlLm1pc3Rha2UudG9Mb3dlckNhc2UoKX1gO1xuICAgIGFjdGlvbnMucHVzaChyZWZyYW1lZCk7XG4gIH1cblxuICByZXR1cm4gYWN0aW9ucy5zbGljZSgwLCA1KTtcbn1cblxuY29uc3QgUXVpY2tBY3Rpb25zID0gKHsgcGxheWJvb2ssIHVyZ2VuY3lNb2RlIH06IFF1aWNrQWN0aW9uc1Byb3BzKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gdXJnZW5jeU1vZGVcbiAgICA/IHBsYXlib29rLnVyZ2VuY3lfZXNzZW50aWFscy5vcmRlcmVkX2l0ZW1zXG4gICAgOiBkZXJpdmVBY3Rpb25zKHBsYXlib29rKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdzdWJoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAge3VyZ2VuY3lNb2RlID8gJ0ZvY3VzIG9uIHRoZXNlIGVzc2VudGlhbHMnIDogJ1lvdXIgbmV4dCBzdGVwcyd9XG4gICAgICA8L0lubGluZT5cbiAgICAgIHtpdGVtcy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgIDxCb3gga2V5PXtpbmRleH0gY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJywgYWxpZ25ZOiAndG9wJyB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9XCJ4c21hbGxcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT57dGV4dH08L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApKX1cbiAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICBEb24ndCB3b3JyeSwgd2UnbGwgd2FsayB5b3UgdGhyb3VnaCBlYWNoIG9mIHRoZXNlIG9uIHRoZSBuZXh0IHN0ZXAuXG4gICAgICA8L0lubGluZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFF1aWNrQWN0aW9ucztcbiIsICJpbXBvcnQgeyBBY2NvcmRpb24sIEFjY29yZGlvbkl0ZW0sIEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIExlYXJuTW9yZVByb3BzIHtcbiAgaXNzdWVyU3VtbWFyeTogc3RyaW5nO1xuICBhY3F1aXJlclN1bW1hcnk6IHN0cmluZztcbn1cblxuY29uc3QgTGVhcm5Nb3JlID0gKHsgaXNzdWVyU3VtbWFyeSwgYWNxdWlyZXJTdW1tYXJ5IH06IExlYXJuTW9yZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEFjY29yZGlvbj5cbiAgICAgIDxBY2NvcmRpb25JdGVtIHRpdGxlPVwiV2h5IHRoaXMgbWF0dGVyc1wiPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdtZWRpdW0nIH19PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgICAgV2hhdCB0aGUgYmFuayBjaGVja3NcbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIHtpc3N1ZXJTdW1tYXJ5fVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2JvZHknLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgICBXaGF0IGhhcHBlbnMgdG8geW91ciByZXNwb25zZVxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAge2FjcXVpcmVyU3VtbWFyeX1cbiAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICA8L0FjY29yZGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExlYXJuTW9yZTtcbiIsICIvLyBzdHJpcGUtYXBwL3NyYy9jb21wb25lbnRzL3Jldmlldy9VcmdlbmN5QmFubmVyLnRzeFxuXG5pbXBvcnQgeyBCYW5uZXIsIEJveCwgSW5saW5lIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcblxuaW50ZXJmYWNlIFVyZ2VuY3lCYW5uZXJQcm9wcyB7XG4gIGRheXNSZW1haW5pbmc6IG51bWJlcjtcbiAgZXNzZW50aWFsczoge1xuICAgIHN1bW1hcnk6IHN0cmluZztcbiAgICBvcmRlcmVkX2l0ZW1zOiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuY29uc3QgVXJnZW5jeUJhbm5lciA9ICh7IGRheXNSZW1haW5pbmcsIGVzc2VudGlhbHMgfTogVXJnZW5jeUJhbm5lclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAnc21hbGwnIH19PlxuICAgICAgPEJhbm5lclxuICAgICAgICB0eXBlPVwiY2F1dGlvblwiXG4gICAgICAgIHRpdGxlPXtgJHtkYXlzUmVtYWluaW5nfSBkYXkke2RheXNSZW1haW5pbmcgPT09IDEgPyAnJyA6ICdzJ30gbGVmdCB0byByZXNwb25kYH1cbiAgICAgICAgZGVzY3JpcHRpb249XCJGb2N1cyBvbiB0aGUgZXNzZW50aWFscyBiZWxvdyB0byBtYXhpbWl6ZSB5b3VyIGNoYW5jZXMuXCJcbiAgICAgIC8+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICdzbWFsbCcgfX0+XG4gICAgICAgIDxCb3g+e2Vzc2VudGlhbHMuc3VtbWFyeX08L0JveD5cbiAgICAgICAgPEJveCBjc3M9e3sgc3RhY2s6ICd5JywgZ2FwOiAneHNtYWxsJyB9fT5cbiAgICAgICAgICB7ZXNzZW50aWFscy5vcmRlcmVkX2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxJbmxpbmUga2V5PXtpbmRleH0gY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgICAgIDxCb3g+e2luZGV4ICsgMX0uPC9Cb3g+XG4gICAgICAgICAgICAgIDxCb3g+e2l0ZW19PC9Cb3g+XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVyZ2VuY3lCYW5uZXI7XG4iLCAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQ29udGV4dFZpZXcsXG4gIElubGluZSxcbiAgU2VsZWN0LFxuICBTcGlubmVyLFxuICBUYWJzLFxuICBUYWIsXG4gIFRhYkxpc3QsXG4gIFRhYlBhbmVscyxcbiAgVGFiUGFuZWwsXG4gIEJhbm5lcixcbn0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL3VpJztcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSAnQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHQnO1xuaW1wb3J0IERpc3B1dGVDYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvRGlzcHV0ZUNhcmQnO1xuaW1wb3J0IERpc3B1dGVXb3JrZmxvdyBmcm9tICcuLi9jb21wb25lbnRzL0Rpc3B1dGVXb3JrZmxvdyc7XG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5U3RhdGUnO1xuaW1wb3J0IEVycm9yQmFubmVyIGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCYW5uZXInO1xuaW1wb3J0IHsgZmV0Y2hCYWNrZW5kLCBBcGlFcnJvciB9IGZyb20gJy4uL2xpYi9hcGlDbGllbnQnO1xuaW1wb3J0IHsgaXNSZXNvbHZlZCB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFZpZXdTdGF0ZSA9ICdsb2FkaW5nJyB8ICdlcnJvcicgfCAncmVhZHknO1xudHlwZSBTdGF0dXNGaWx0ZXIgPSAnYWxsJyB8ICduZWVkc19yZXNwb25zZScgfCAndW5kZXJfcmV2aWV3JyB8ICdyZXNvbHZlZCc7XG5cbmNvbnN0IEZJTFRFUl9PUFRJT05TOiB7IHZhbHVlOiBTdGF0dXNGaWx0ZXI7IGxhYmVsOiBzdHJpbmcgfVtdID0gW1xuICB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwgZGlzcHV0ZXMnIH0sXG4gIHsgdmFsdWU6ICduZWVkc19yZXNwb25zZScsIGxhYmVsOiAnTmVlZHMgcmVzcG9uc2UnIH0sXG4gIHsgdmFsdWU6ICd1bmRlcl9yZXZpZXcnLCBsYWJlbDogJ1VuZGVyIHJldmlldycgfSxcbiAgeyB2YWx1ZTogJ3Jlc29sdmVkJywgbGFiZWw6ICdSZXNvbHZlZCcgfSxcbl07XG5cbmZ1bmN0aW9uIG1hdGNoZXNGaWx0ZXIoZGlzcHV0ZTogRGlzcHV0ZSwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBib29sZWFuIHtcbiAgc3dpdGNoIChmaWx0ZXIpIHtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnbmVlZHNfcmVzcG9uc2UnOlxuICAgICAgcmV0dXJuIGRpc3B1dGUuc3RhdHVzID09PSAnbmVlZHNfcmVzcG9uc2UnIHx8IGRpc3B1dGUuc3RhdHVzID09PSAnd2FybmluZ19uZWVkc19yZXNwb25zZSc7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBkaXNwdXRlLnN0YXR1cyA9PT0gJ3VuZGVyX3JldmlldycgfHwgZGlzcHV0ZS5zdGF0dXMgPT09ICd3YXJuaW5nX3VuZGVyX3Jldmlldyc7XG4gICAgY2FzZSAncmVzb2x2ZWQnOlxuICAgICAgcmV0dXJuIGlzUmVzb2x2ZWQoZGlzcHV0ZS5zdGF0dXMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb3VudFRleHQoY291bnQ6IG51bWJlciwgZmlsdGVyOiBTdGF0dXNGaWx0ZXIpOiBzdHJpbmcge1xuICBjb25zdCBub3VuID0gY291bnQgPT09IDEgPyAnZGlzcHV0ZScgOiAnZGlzcHV0ZXMnO1xuICBzd2l0Y2ggKGZpbHRlcikge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9ICR7bm91bn1gO1xuICAgIGNhc2UgJ25lZWRzX3Jlc3BvbnNlJzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gbmVlZGluZyByZXNwb25zZWA7XG4gICAgY2FzZSAndW5kZXJfcmV2aWV3JzpcbiAgICAgIHJldHVybiBgJHtjb3VudH0gdW5kZXIgcmV2aWV3YDtcbiAgICBjYXNlICdyZXNvbHZlZCc6XG4gICAgICByZXR1cm4gYCR7Y291bnR9IHJlc29sdmVkYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAke2NvdW50fSAke25vdW59YDtcbiAgfVxufVxuXG5jb25zdCBEaXNwdXRlTGlzdFZpZXcgPSAoY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIGNvbnN0IHsgZW52aXJvbm1lbnQsIHVzZXJDb250ZXh0IH0gPSBjb250ZXh0O1xuICBjb25zdCBbdmlld1N0YXRlLCBzZXRWaWV3U3RhdGVdID0gdXNlU3RhdGU8Vmlld1N0YXRlPignbG9hZGluZycpO1xuICBjb25zdCBbZGlzcHV0ZXMsIHNldERpc3B1dGVzXSA9IHVzZVN0YXRlPERpc3B1dGVbXT4oW10pO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3RhdHVzRmlsdGVyLCBzZXRTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGU8U3RhdHVzRmlsdGVyPignYWxsJyk7XG5cbiAgY29uc3QgW3NlbGVjdGVkRGlzcHV0ZSwgc2V0U2VsZWN0ZWREaXNwdXRlXSA9IHVzZVN0YXRlPERpc3B1dGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dXb3JrZmxvdywgc2V0U2hvd1dvcmtmbG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBSZWYgdG8gYXZvaWQgY29udGV4dCByZWZlcmVuY2UgaWRlbnRpdHkgY2hhbmdlcyB0cmlnZ2VyaW5nIHJlLWZldGNoZXNcbiAgY29uc3QgY29udGV4dFJlZiA9IHVzZVJlZihjb250ZXh0KTtcbiAgY29udGV4dFJlZi5jdXJyZW50ID0gY29udGV4dDtcblxuICBjb25zdCBsb2FkRGlzcHV0ZXMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0Vmlld1N0YXRlKCdsb2FkaW5nJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoQmFja2VuZDx7IGRhdGE6IERpc3B1dGVbXSB9PignL2FwaS9kaXNwdXRlcycsIGNvbnRleHRSZWYuY3VycmVudCk7XG4gICAgICBzZXREaXNwdXRlcyhyZXN1bHQuZGF0YSk7XG4gICAgICBzZXRWaWV3U3RhdGUoJ3JlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgQXBpRXJyb3JcbiAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgOiAnRmFpbGVkIHRvIGxvYWQgZGlzcHV0ZXMuIFBsZWFzZSB0cnkgYWdhaW4uJztcbiAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFZpZXdTdGF0ZSgnZXJyb3InKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWREaXNwdXRlcygpO1xuICB9LCBbbG9hZERpc3B1dGVzXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0RGlzcHV0ZSA9IChkaXNwdXRlOiBEaXNwdXRlKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWREaXNwdXRlKGRpc3B1dGUpO1xuICAgIHNldFNob3dXb3JrZmxvdyh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbG9zZVdvcmtmbG93ID0gKHNob3duOiBib29sZWFuKSA9PiB7XG4gICAgc2V0U2hvd1dvcmtmbG93KHNob3duKTtcbiAgICBpZiAoIXNob3duKSBzZXRTZWxlY3RlZERpc3B1dGUobnVsbCk7XG4gIH07XG5cbiAgLy8gU29ydCBieSBkZWFkbGluZSAoc29vbmVzdCBmaXJzdClcbiAgY29uc3Qgc29ydGVkRGlzcHV0ZXMgPSBbLi4uZGlzcHV0ZXNdLnNvcnQoXG4gICAgKGEsIGIpID0+IG5ldyBEYXRlKGEuZHVlX2J5KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZV9ieSkuZ2V0VGltZSgpLFxuICApO1xuXG4gIGNvbnN0IGZpbHRlcmVkRGlzcHV0ZXMgPSBzb3J0ZWREaXNwdXRlcy5maWx0ZXIoKGQpID0+IG1hdGNoZXNGaWx0ZXIoZCwgc3RhdHVzRmlsdGVyKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgdGl0bGU9XCJXaW5CYWNrXCIgZGVzY3JpcHRpb249XCJHdWlkZWQgZGlzcHV0ZSByZXNvbHV0aW9uXCI+XG4gICAgICB7dmlld1N0YXRlID09PSAnbG9hZGluZycgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgICAgIGFsaWduWDogJ2NlbnRlcicsXG4gICAgICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTG9hZGluZyBkaXNwdXRlcy4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHt2aWV3U3RhdGUgPT09ICdlcnJvcicgJiYgKFxuICAgICAgICA8RXJyb3JCYW5uZXIgbWVzc2FnZT17ZXJyb3JNZXNzYWdlfSAvPlxuICAgICAgKX1cblxuICAgICAge3ZpZXdTdGF0ZSA9PT0gJ3JlYWR5JyAmJiAoXG4gICAgICAgIDxUYWJzIGZpdHRlZCBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgPFRhYkxpc3Q+XG4gICAgICAgICAgICA8VGFiIGlkPVwiZGlzcHV0ZXNcIj5EaXNwdXRlczwvVGFiPlxuICAgICAgICAgICAgPFRhYiBpZD1cImluc2lnaHRzXCI+SW5zaWdodHM8L1RhYj5cbiAgICAgICAgICA8L1RhYkxpc3Q+XG4gICAgICAgICAgPFRhYlBhbmVscz5cbiAgICAgICAgICAgIDxUYWJQYW5lbCBpZD1cImRpc3B1dGVzXCI+XG4gICAgICAgICAgICAgIDxCb3ggY3NzPXt7IHBhZGRpbmc6ICdzbWFsbCcsIHN0YWNrOiAneScsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICB7ZGlzcHV0ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPEVtcHR5U3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJObyBkaXNwdXRlcyB5ZXRcIlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIldoZW4gYSBkaXNwdXRlIGNvbWVzIGluLCB3ZSdsbCB3YWxrIHlvdSB0aHJvdWdoIGV4YWN0bHkgd2hhdCB0byBkby5cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5FbGVtZW50cz17WydsYWJlbCddfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUgYXMgU3RhdHVzRmlsdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtGSUxURVJfT1BUSU9OUy5tYXAoKG9wdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgPEJveCBjc3M9e3sgcGFkZGluZ1RvcDogJ3NtYWxsJywgcGFkZGluZ0JvdHRvbTogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDb3VudFRleHQoZmlsdGVyZWREaXNwdXRlcy5sZW5ndGgsIHN0YXR1c0ZpbHRlcil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZERpc3B1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJywgYWxpZ25YOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBObyB7RklMVEVSX09QVElPTlMuZmluZCgobykgPT4gby52YWx1ZSA9PT0gc3RhdHVzRmlsdGVyKT8ubGFiZWwudG9Mb3dlckNhc2UoKX0gZGlzcHV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZERpc3B1dGVzLm1hcCgoZGlzcHV0ZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPERpc3B1dGVDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGlzcHV0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcHV0ZT17ZGlzcHV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpID0+IGhhbmRsZVNlbGVjdERpc3B1dGUoZGlzcHV0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgICA8VGFiUGFuZWwgaWQ9XCJpbnNpZ2h0c1wiPlxuICAgICAgICAgICAgICA8Qm94IGNzcz17eyBwYWRkaW5nOiAnbWVkaXVtJyB9fT5cbiAgICAgICAgICAgICAgICA8QmFubmVyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkluc2lnaHRzXCJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiV2luIHJhdGUgYW5hbHl0aWNzIGFuZCBkaXNwdXRlIHBhdHRlcm5zIHdpbGwgYXBwZWFyIGhlcmUuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgICAgICAgQ29taW5nIGluIFdJTi0yMiBhbmQgV0lOLTIzLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvVGFiUGFuZWw+XG4gICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgIDwvVGFicz5cbiAgICAgICl9XG5cbiAgICAgIHtzZWxlY3RlZERpc3B1dGUgJiYgKFxuICAgICAgICA8RGlzcHV0ZVdvcmtmbG93XG4gICAgICAgICAgZGlzcHV0ZT17c2VsZWN0ZWREaXNwdXRlfVxuICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgc2hvd249e3Nob3dXb3JrZmxvd31cbiAgICAgICAgICBzZXRTaG93bj17aGFuZGxlQ2xvc2VXb3JrZmxvd31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3B1dGVMaXN0VmlldztcbiIsICJpbXBvcnQgeyBCb3gsIEJhZGdlLCBCdXR0b24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IERpc3B1dGUgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RhdHVzQmFkZ2UsIGdldFVyZ2VuY3lCYWRnZSB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmludGVyZmFjZSBEaXNwdXRlQ2FyZFByb3BzIHtcbiAgZGlzcHV0ZTogRGlzcHV0ZTtcbiAgb25TZWxlY3Q6IChkaXNwdXRlSWQ6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QW1vdW50KGFtb3VudDogbnVtYmVyLCBjdXJyZW5jeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5LnRvVXBwZXJDYXNlKCksXG4gIH0pLmZvcm1hdChhbW91bnQgLyAxMDApO1xufVxuXG5jb25zdCBEaXNwdXRlQ2FyZCA9ICh7IGRpc3B1dGUsIG9uU2VsZWN0IH06IERpc3B1dGVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzQmFkZ2UgPSBnZXRTdGF0dXNCYWRnZShkaXNwdXRlLnN0YXR1cyk7XG4gIGNvbnN0IHVyZ2VuY3lCYWRnZSA9IGdldFVyZ2VuY3lCYWRnZShkaXNwdXRlLmR1ZV9ieSwgZGlzcHV0ZS5zdGF0dXMpO1xuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICBjc3M9e3sgd2lkdGg6ICdmaWxsJyB9fVxuICAgICAgb25QcmVzcz17KCkgPT4gb25TZWxlY3QoZGlzcHV0ZS5pZCl9XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICBzdGFjazogJ3knLFxuICAgICAgICAgIGdhcDogJ3hzbWFsbCcsXG4gICAgICAgICAgd2lkdGg6ICdmaWxsJyxcbiAgICAgICAgICBwYWRkaW5nOiAnc21hbGwnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICdzbWFsbCcsIGRpc3RyaWJ1dGU6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnYm9keScsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgICAgICB7Zm9ybWF0QW1vdW50KGRpc3B1dGUuYW1vdW50LCBkaXNwdXRlLmN1cnJlbmN5KX1cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3gnLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgICAgPEJhZGdlIHR5cGU9e3N0YXR1c0JhZGdlLnR5cGV9PntzdGF0dXNCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAge3VyZ2VuY3lCYWRnZSAmJiAoXG4gICAgICAgICAgICAgIDxCYWRnZSB0eXBlPXt1cmdlbmN5QmFkZ2UudHlwZX0+e3VyZ2VuY3lCYWRnZS5sYWJlbH08L0JhZGdlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJyB9fT5cbiAgICAgICAgICB7ZGlzcHV0ZS5jdXN0b21lcl9uYW1lIHx8ICdVbmtub3duIGN1c3RvbWVyJ31cbiAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneCcsIGdhcDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIHtkaXNwdXRlLm5ldHdvcmsuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkaXNwdXRlLm5ldHdvcmsuc2xpY2UoMSl9IHtkaXNwdXRlLnJlYXNvbl9jb2RlfVxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAge2Rpc3B1dGUuaWQuc2xpY2UoMCwgMTIpfS4uLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcHV0ZUNhcmQ7XG4iLCAiLy8gc3RyaXBlLWFwcC9zcmMvY29tcG9uZW50cy9FbXB0eVN0YXRlLnRzeFxuXG5pbXBvcnQgeyBCb3gsIEljb24sIElubGluZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmludGVyZmFjZSBFbXB0eVN0YXRlUHJvcHMge1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5jb25zdCBFbXB0eVN0YXRlID0gKHsgdGl0bGUsIGRlc2NyaXB0aW9uIH06IEVtcHR5U3RhdGVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGNzcz17e1xuICAgICAgICBwYWRkaW5nOiAneGxhcmdlJyxcbiAgICAgICAgc3RhY2s6ICd5JyxcbiAgICAgICAgZ2FwOiAnc21hbGwnLFxuICAgICAgICBhbGlnblg6ICdjZW50ZXInLFxuICAgICAgICBhbGlnblk6ICdjZW50ZXInLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnaGVhZGluZycsIGZvbnRXZWlnaHQ6ICdzZW1pYm9sZCcgfX0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvSW5saW5lPlxuICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2NhcHRpb24nLCBjb2xvcjogJ3NlY29uZGFyeScgfX0+XG4gICAgICAgIHtkZXNjcmlwdGlvbn1cbiAgICAgIDwvSW5saW5lPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlTdGF0ZTtcbiIsICJpbXBvcnQge1xuICBCb3gsXG4gIEJhbm5lcixcbiAgSW5saW5lLFxuICBTZXR0aW5nc1ZpZXcsXG4gIERpdmlkZXIsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSB9IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0JztcblxuY29uc3QgQXBwU2V0dGluZ3MgPSAoeyBlbnZpcm9ubWVudCwgdXNlckNvbnRleHQgfTogRXh0ZW5zaW9uQ29udGV4dFZhbHVlKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFNldHRpbmdzVmlldz5cbiAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ21lZGl1bScsIHBhZGRpbmc6ICdtZWRpdW0nIH19PlxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdjYXB0aW9uJywgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgU3Vic2NyaXB0aW9uIG1hbmFnZW1lbnQgd2lsbCBiZSBhdmFpbGFibGUgaGVyZS4gQ29taW5nIGluIFdJTi0yNC5cbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICA8Qm94IGNzcz17eyBzdGFjazogJ3knLCBnYXA6ICd4c21hbGwnIH19PlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdoZWFkaW5nJywgZm9udFdlaWdodDogJ3NlbWlib2xkJyB9fT5cbiAgICAgICAgICAgIEFjY291bnRcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIENvbm5lY3RlZCBTdHJpcGUgYWNjb3VudCBpbmZvcm1hdGlvbiB3aWxsIGFwcGVhciBoZXJlLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgIDxCb3ggY3NzPXt7IHN0YWNrOiAneScsIGdhcDogJ3hzbWFsbCcgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgZm9udDogJ2hlYWRpbmcnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnIH19PlxuICAgICAgICAgICAgQWJvdXQgV2luQmFja1xuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnQ6ICdib2R5JyB9fT5cbiAgICAgICAgICAgIFZlcnNpb24gMC4wLjFcbiAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8SW5saW5lIGNzcz17eyBmb250OiAnY2FwdGlvbicsIGNvbG9yOiAnc2Vjb25kYXJ5JyB9fT5cbiAgICAgICAgICAgIEd1aWRlZCBkaXNwdXRlIHJlc29sdXRpb24gZm9yIFN0cmlwZSBtZXJjaGFudHMuIEJ1aWx0IGJ5IEpLQiBUZWNoLlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvU2V0dGluZ3NWaWV3PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwU2V0dGluZ3M7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxjQUFjO0FBQ3RCLGNBQVEsY0FBYztBQUFBO0FBQUE7OztBQ0h0QjtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxrQkFBa0IsUUFBUSxZQUFZLFFBQVEsY0FBYyxRQUFRLFlBQVksUUFBUSxZQUFZLFFBQVEsTUFBTSxRQUFRLFlBQVksUUFBUSxXQUFXLFFBQVEsVUFBVSxRQUFRLFNBQVMsUUFBUSxxQkFBcUIsUUFBUSxVQUFVLFFBQVEsWUFBWSxRQUFRLGFBQWEsUUFBUSxlQUFlLFFBQVEsU0FBUyxRQUFRLFFBQVEsUUFBUSxlQUFlLFFBQVEsbUJBQW1CLFFBQVEsNEJBQTRCLFFBQVEsaUJBQWlCLFFBQVEsT0FBTyxRQUFRLFdBQVcsUUFBUSxZQUFZLFFBQVEsT0FBTyxRQUFRLFdBQVcsUUFBUSxPQUFPLFFBQVEsWUFBWSxRQUFRLFNBQVMsUUFBUSxNQUFNLFFBQVEsT0FBTyxRQUFRLGlCQUFpQixRQUFRLFlBQVksUUFBUSxVQUFVLFFBQVEsa0JBQWtCLFFBQVEseUJBQXlCLFFBQVEsbUJBQW1CLFFB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QUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxNQUNyQixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsTUFDZCwyQkFBMkI7QUFBQSxRQUN6QixlQUFlO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFlBQVk7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDYjsiLAogICJuYW1lcyI6IFsiZmV0Y2giLCAiZmV0Y2hTdHJpcGVTaWduYXR1cmUiLCAicmVxdWlyZV9zaWduYXR1cmUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiZmV0Y2hTdHJpcGVTaWduYXR1cmUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF91aSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3VpIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF91aSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImZvcm1hdEFtb3VudCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
