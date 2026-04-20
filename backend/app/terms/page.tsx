import { LegalLayout } from "../components/legal-layout";

export const metadata = {
  title: "Terms of Service | WinBack",
  description:
    "Terms governing your use of the WinBack Stripe App, published by JB Technology LLC.",
};

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 20, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and
        use of the WinBack Stripe App and the website at{" "}
        <a href="https://winbackpay.com">winbackpay.com</a> (collectively, the
        &quot;Service&quot;), operated by JB Technology LLC
        (&quot;WinBack,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;). By installing or using the Service, you agree to
        these Terms. If you do not agree, do not install or use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        WinBack is a Stripe App that helps merchants respond to payment
        disputes. The Service provides reason-code-specific playbooks, an
        AI-assisted dispute narrative generator, evidence checklists, and
        reporting. WinBack is a tool that guides you through the dispute
        process. It is not a legal, financial, or payment-services adviser,
        and it is not a managed dispute service.
      </p>

      <h2>2. Eligibility and account</h2>
      <p>
        To use the Service, you must have a Stripe account in good standing,
        be authorized to act on behalf of the business associated with that
        Stripe account, and be legally capable of entering into a binding
        contract. We authenticate you through Stripe, and your access to the
        App is tied to your Stripe account.
      </p>
      <p>
        You are responsible for keeping your Stripe credentials secure and for
        all activity that occurs under your account.
      </p>

      <h2>3. Fees and billing</h2>
      <p>
        WinBack is offered under a hybrid pricing model. Current options
        include:
      </p>
      <ul>
        <li>
          <strong>Pay-Per-Win.</strong> No monthly fee. We charge a success fee
          of fifteen percent (15%) of any dispute amount you recover while
          using the Service.
        </li>
        <li>
          <strong>Pro.</strong> A flat monthly fee of $79 per month (or $59
          per month billed annually) for unlimited disputes and no success
          fee.
        </li>
      </ul>
      <p>
        Fees are billed through Stripe. By using the Service, you authorize
        WinBack to charge applicable fees to the payment method associated
        with your Stripe account. Fees are non-refundable except where
        required by law. We may change our pricing or plans by posting an
        update and, where required, giving you advance notice through the App
        or by email. Continued use of the Service after a pricing change
        means you accept the new pricing.
      </p>
      <p>
        You are responsible for any taxes associated with your use of the
        Service other than taxes based on our net income.
      </p>

      <h2>4. Your responsibilities</h2>
      <p>You agree that you will:</p>
      <ul>
        <li>
          Provide accurate, complete, and current information in any dispute
          response you submit through the Service
        </li>
        <li>
          Only upload evidence that you have the right to use and that is not
          fraudulent, misleading, or unlawful
        </li>
        <li>
          Review every AI-drafted narrative before submission and take
          responsibility for its contents
        </li>
        <li>Comply with all applicable laws and with Stripe&apos;s terms</li>
        <li>
          Not misuse the Service to make false dispute claims, to submit
          fabricated evidence, or to defraud your customers, your payment
          processor, or any third party
        </li>
      </ul>

      <h2>5. Evidence submissions are final</h2>
      <p>
        When you submit a dispute response through the Service, WinBack relays
        the narrative and evidence file identifiers to Stripe. Stripe&apos;s
        submission of dispute evidence to the card network is final and
        cannot be undone. You are solely responsible for reviewing and
        approving each submission before it is sent. Once submitted, a
        response cannot be retrieved, edited, or withdrawn through the
        Service.
      </p>

      <h2>6. AI-generated content</h2>
      <p>
        The Service uses Anthropic&apos;s Claude models to draft dispute
        narratives from the facts, evidence metadata, and playbook instructions
        you provide. AI-generated text may contain errors, omissions, or
        statements that are inaccurate or unsupported by your evidence.
      </p>
      <ul>
        <li>
          You are responsible for reviewing, editing, and approving any
          AI-generated content before it is submitted to Stripe or to any
          third party
        </li>
        <li>
          We screen generated narratives for fabricated evidence references
          and strip references that do not match files you have actually
          uploaded, but we cannot guarantee that every generated statement is
          accurate
        </li>
        <li>
          You retain the right to edit, replace, or discard any AI-generated
          narrative at any time
        </li>
      </ul>

      <h2>7. No guarantee of dispute outcomes</h2>
      <p>
        Card networks, issuing banks, and Stripe make the final decisions on
        every dispute. WinBack provides guidance based on reason-code
        playbooks and historical patterns, but we cannot guarantee that any
        dispute will be won or that any particular amount will be recovered.
        Past performance does not predict future results. Nothing in the
        Service constitutes legal advice.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        WinBack, including its playbooks, software, designs, and content, is
        owned by JB Technology LLC and is protected by intellectual property
        laws. We grant you a limited, non-exclusive, non-transferable,
        revocable license to use the Service for your internal business
        purposes and in accordance with these Terms.
      </p>
      <p>
        You retain ownership of the data, narratives, and evidence you
        provide. You grant WinBack a limited license to process that content
        as needed to operate the Service, including transmitting it to Stripe
        and to the subprocessors listed in our Privacy Policy.
      </p>
      <p>
        You may not reverse engineer, resell, or create derivative works from
        the Service without our prior written consent.
      </p>

      <h2>9. Acceptable use</h2>
      <p>You may not use the Service to:</p>
      <ul>
        <li>
          Violate any law, regulation, card network rule, or third-party right
        </li>
        <li>
          Submit dispute responses containing fraudulent, fabricated, or
          misleading information
        </li>
        <li>
          Reverse engineer, probe, or interfere with the security of the
          Service
        </li>
        <li>
          Attempt to gain unauthorized access to another merchant&apos;s
          account or data
        </li>
        <li>
          Use the Service to harass, defame, or harm any individual or entity
        </li>
        <li>
          Resell, sublicense, or offer the Service as a managed dispute
          service to third parties without our prior written consent
        </li>
      </ul>

      <h2>10. Termination</h2>
      <p>
        You may stop using the Service at any time by uninstalling the App
        from your Stripe Dashboard. We may suspend or terminate your access
        to the Service if you breach these Terms, if we are required to do so
        by law, or if continuing to provide the Service would expose WinBack
        or other merchants to material risk.
      </p>
      <p>
        Upon termination, your right to use the Service ends. Provisions that
        by their nature should survive termination will survive, including
        sections on intellectual property, disclaimers, limitation of
        liability, indemnification, and governing law.
      </p>

      <h2>11. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot;
        WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
        TO THE FULLEST EXTENT PERMITTED BY LAW, WINBACK DISCLAIMS ALL
        WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF
        COURSE OF DEALING OR USAGE OF TRADE.
      </p>
      <p>
        WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR FREE,
        OR SECURE, OR THAT ANY DISPUTE RESPONSE SUBMITTED THROUGH THE SERVICE
        WILL RESULT IN A FAVORABLE OUTCOME.
      </p>

      <h2>12. Limitation of liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, WINBACK AND ITS OFFICERS,
        MEMBERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY
        LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATING
        TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE
        TERMS OR THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU
        PAID WINBACK IN THE TWELVE MONTHS BEFORE THE EVENT GIVING RISE TO THE
        CLAIM OR (B) $100.
      </p>

      <h2>13. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless JB Technology LLC
        and its officers, members, employees, and agents from and against any
        claims, liabilities, damages, losses, and expenses (including
        reasonable attorneys&apos; fees) arising out of or relating to your
        use of the Service, your dispute submissions, your violation of these
        Terms, or your violation of any law or third-party right.
      </p>

      <h2>14. Governing law and venue</h2>
      <p>
        These Terms are governed by the laws of the State of California,
        without regard to its conflict of laws rules. You and WinBack agree
        that any action arising out of or relating to these Terms or the
        Service will be brought exclusively in the state or federal courts
        located in San Francisco County, California, and you consent to
        personal jurisdiction and venue in those courts.
      </p>

      <h2>15. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will
        revise the &quot;Last updated&quot; date at the top of the page. For
        material changes, we will provide additional notice, such as emailing
        you or displaying a notice inside the App. Your continued use of the
        Service after the change takes effect means you accept the revised
        Terms.
      </p>

      <h2>16. Miscellaneous</h2>
      <ul>
        <li>
          <strong>Entire agreement.</strong> These Terms, together with our{" "}
          <a href="/privacy">Privacy Policy</a>, form the entire agreement
          between you and WinBack regarding the Service.
        </li>
        <li>
          <strong>Severability.</strong> If any provision of these Terms is
          held unenforceable, the remaining provisions will remain in full
          force and effect.
        </li>
        <li>
          <strong>No waiver.</strong> Our failure to enforce any provision is
          not a waiver of our right to do so later.
        </li>
        <li>
          <strong>Assignment.</strong> You may not assign these Terms without
          our prior written consent. We may assign these Terms in connection
          with a merger, acquisition, or sale of assets.
        </li>
        <li>
          <strong>No agency.</strong> Nothing in these Terms creates an
          agency, partnership, joint venture, or employment relationship
          between you and WinBack.
        </li>
      </ul>

      <h2>17. Contact us</h2>
      <p>Questions about these Terms can be sent to:</p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@winbackpay.com">support@winbackpay.com</a>
        </li>
        <li>
          <strong>Entity:</strong> JB Technology LLC, publisher of the WinBack
          Stripe App
        </li>
      </ul>
    </LegalLayout>
  );
}
