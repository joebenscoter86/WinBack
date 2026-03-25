import {
  Box,
  ContextView,
  Banner,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";

/**
 * DisputeListView — shown on the disputes list page in Stripe Dashboard.
 * Provides an overview of active disputes with status and urgency indicators.
 */
const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <ContextView title="WinBack">
      <Box css={{ padding: "medium" }}>
        <Banner
          type="default"
          title="Your Disputes"
          description="WinBack helps you respond to chargebacks with expert guidance."
        />
      </Box>
    </ContextView>
  );
};

export default DisputeListView;
