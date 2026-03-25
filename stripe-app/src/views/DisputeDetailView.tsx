import {
  Box,
  ContextView,
  Banner,
  Spinner,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";

/**
 * DisputeDetailView — shown on the dispute detail page in Stripe Dashboard.
 * This is the main entry point for Dispute Buddy's guided resolution flow.
 */
const DisputeDetailView = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <ContextView title="Dispute Buddy">
      <Box css={{ padding: "medium" }}>
        <Banner
          type="default"
          title="Dispute Buddy is loading..."
          description="We're setting up your guided dispute resolution experience."
        />
      </Box>
    </ContextView>
  );
};

export default DisputeDetailView;
