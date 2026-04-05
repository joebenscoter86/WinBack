import { Accordion, AccordionItem, Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface LearnMoreProps {
  issuerSummary: string;
  acquirerSummary: string;
}

const LearnMore = ({ issuerSummary, acquirerSummary }: LearnMoreProps) => {
  return (
    <Accordion>
      <AccordionItem title="Why this matters">
        <Box css={{ stack: 'y', gap: 'medium' }}>
          <Box css={{ stack: 'y', gap: 'small' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              What the bank checks
            </Inline>
            <Inline css={{ font: 'body', color: 'secondary' }}>
              {issuerSummary}
            </Inline>
          </Box>
          <Box css={{ stack: 'y', gap: 'small' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              What happens to your response
            </Inline>
            <Inline css={{ font: 'body', color: 'secondary' }}>
              {acquirerSummary}
            </Inline>
          </Box>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};

export default LearnMore;
