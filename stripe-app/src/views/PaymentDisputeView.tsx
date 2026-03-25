import {
  Box,
  ContextView,
  Banner,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";

/**
 * PaymentDisputeView — shown on the payment detail page in Stripe Dashboard.
 * Activates when a payment has an associated dispute.
 * environment.objectContext?.id gives the payment intent ID.
 */
const PaymentDisputeView = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <ContextView title="WinBack">
      <Box css={{ padding: "medium" }}>
        <Banner
          type="default"
          title="WinBack"
          description="Guided dispute resolution for this payment."
        />
      </Box>
    </ContextView>
  );
};

export default PaymentDisputeView;
