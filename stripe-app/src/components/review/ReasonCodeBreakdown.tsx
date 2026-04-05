import { Accordion, AccordionItem, Box, Inline } from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface ReasonCodeBreakdownProps {
  playbook: PlaybookData;
  defaultExpanded: boolean;
}

const ReasonCodeBreakdown = ({ playbook }: ReasonCodeBreakdownProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'medium' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {playbook.display_name}
      </Inline>
      <Inline css={{ font: 'body' }}>
        {playbook.description}
      </Inline>
      <Accordion>
        <AccordionItem
          title="What the issuer looks for"
        >
          <Box css={{ whiteSpace: 'pre-wrap' }}>
            {playbook.issuer_evaluation}
          </Box>
        </AccordionItem>
        <AccordionItem
          title="What happens before the issuer sees your case"
        >
          <Box css={{ whiteSpace: 'pre-wrap' }}>
            {playbook.acquirer_prereview}
          </Box>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ReasonCodeBreakdown;
