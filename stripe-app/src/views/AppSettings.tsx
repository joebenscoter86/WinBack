import {
  Box,
  SettingsView,
  Banner,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";

/**
 * AppSettings — settings page for WinBack.
 * Subscription status, account info, and preferences.
 */
const AppSettings = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <SettingsView>
      <Box css={{ padding: "medium" }}>
        <Banner
          type="default"
          title="WinBack Settings"
          description="Manage your subscription and preferences."
        />
      </Box>
    </SettingsView>
  );
};

export default AppSettings;
