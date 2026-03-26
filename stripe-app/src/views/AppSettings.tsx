import {
  Box,
  Banner,
  Inline,
  SettingsView,
  Divider,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';

const AppSettings = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <SettingsView>
      <Box css={{ stack: 'y', gap: 'medium', padding: 'medium' }}>
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Subscription
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Subscription management will be available here. Coming in WIN-24.
          </Inline>
        </Box>

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Account
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Connected Stripe account information will appear here.
          </Inline>
        </Box>

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            About WinBack
          </Inline>
          <Inline css={{ font: 'body' }}>
            Version 0.0.1
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Guided dispute resolution for Stripe merchants. Built by JKB Tech.
          </Inline>
        </Box>
      </Box>
    </SettingsView>
  );
};

export default AppSettings;
