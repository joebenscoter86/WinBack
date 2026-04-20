import { LegalLayout } from "../components/legal-layout";

export const metadata = {
  title: "Privacy Policy | WinBack",
  description:
    "How WinBack (JB Technology LLC) collects, uses, and protects information about the merchants who use our Stripe App for dispute management.",
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 20, 2026">
      <p>
        This Privacy Policy describes how JB Technology LLC (&quot;WinBack,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
        shares information when you install and use the WinBack Stripe App
        (the &quot;App&quot;) and the related website at{" "}
        <a href="https://winbackpay.com">winbackpay.com</a> (together, the
        &quot;Service&quot;).
      </p>
      <p>
        WinBack is designed with a simple privacy posture: we process the
        minimum amount of information needed to help merchants win chargeback
        disputes. In particular, we do not store the evidence files that
        merchants submit to Stripe.
      </p>

      <h2>1. Information we collect</h2>

      <h3>Information we receive from Stripe</h3>
      <p>
        When you install the App in your Stripe Dashboard, Stripe authenticates
        you and grants WinBack access to a defined set of API scopes. Using
        those scopes, we receive:
      </p>
      <ul>
        <li>
          Your Stripe account identifier and the email address Stripe associates
          with your account
        </li>
        <li>
          Dispute records, including reason codes, amounts, deadlines, and
          status
        </li>
        <li>
          Charge, customer, and payment intent metadata associated with those
          disputes (for example, amount, currency, timestamps, and customer
          identifiers that Stripe returns to us)
        </li>
        <li>
          Identifiers for evidence files you upload through the App (see below)
        </li>
      </ul>

      <h3>Information you provide directly</h3>
      <ul>
        <li>
          Dispute narrative text that you type, edit, or accept from the
          AI-generated draft
        </li>
        <li>
          Checklist notes, feedback on AI output, and any other input you
          provide within the App
        </li>
        <li>
          Support correspondence you send to{" "}
          <a href="mailto:support@winbackpay.com">support@winbackpay.com</a> or
          through any other channel
        </li>
        <li>
          Waitlist sign-ups and contact forms submitted through{" "}
          <a href="https://winbackpay.com">winbackpay.com</a>
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          Usage telemetry (which pages you view, which actions you take, how
          long operations take) so we can improve the product
        </li>
        <li>
          Error and performance events captured by our monitoring provider
          (Sentry), which may include IP address, browser type, and technical
          diagnostic data
        </li>
        <li>
          Standard server logs (request paths, timestamps, response codes)
        </li>
      </ul>

      <h2>2. What we do not collect or store</h2>
      <p>
        We want to be explicit about the data that WinBack deliberately avoids
        touching:
      </p>
      <ul>
        <li>
          <strong>We do not store your evidence files.</strong> When you upload
          a receipt, shipping document, screenshot, or other file to support a
          dispute, the file travels directly from your browser to the Stripe
          Files API. WinBack receives only the Stripe-issued file identifier,
          the file name, size, and MIME type. The actual file contents never
          reach WinBack servers.
        </li>
        <li>
          <strong>We do not collect cardholder or PCI-scoped data.</strong>{" "}
          Card numbers, CVVs, and other payment-account data remain inside
          Stripe. WinBack is not a payment processor and does not touch
          card data.
        </li>
        <li>
          <strong>We do not sell personal information.</strong> We do not rent,
          sell, or trade your data or your customers&apos; data to third
          parties.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and improve the Service</li>
        <li>
          Generate AI-drafted dispute narratives, which are produced by
          Anthropic&apos;s Claude models based on the dispute facts and
          evidence metadata you provide
        </li>
        <li>
          Show you dispute guidance, win-rate statistics, and account-specific
          dashboards
        </li>
        <li>
          Send you operational notices, billing receipts, and account alerts
        </li>
        <li>Respond to support requests and feedback</li>
        <li>
          Detect, investigate, and prevent fraud, abuse, and security incidents
        </li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>4. Subprocessors we use</h2>
      <p>
        We rely on a small set of vendors to operate the Service. Each is bound
        by its own data processing commitments and handles only the data needed
        for its role:
      </p>
      <ul>
        <li>
          <strong>Stripe.</strong> Authentication, dispute management, file
          storage, and billing
        </li>
        <li>
          <strong>Anthropic.</strong> AI narrative generation via the Claude
          API. Anthropic does not use your prompts or outputs to train its
          models
        </li>
        <li>
          <strong>Supabase.</strong> Managed PostgreSQL database hosting for
          dispute metadata and account records
        </li>
        <li>
          <strong>Vercel.</strong> Web hosting and edge compute for our website
          and API
        </li>
        <li>
          <strong>Sentry.</strong> Error monitoring and performance tracing
        </li>
      </ul>
      <p>
        If we add or replace a subprocessor that materially changes how your
        data is processed, we will update this policy and, where required,
        notify you in advance.
      </p>

      <h2>5. How we share information</h2>
      <p>
        We share information only in limited circumstances:
      </p>
      <ul>
        <li>With the subprocessors listed above, solely to operate the Service</li>
        <li>
          With Stripe, when you ask us to submit a dispute response on your
          behalf (your narrative and evidence file identifiers are transmitted
          to Stripe so the response can be filed)
        </li>
        <li>
          With your consent, or at your direction, such as when you ask us to
          share dispute records with your accountant or counsel
        </li>
        <li>
          To comply with a valid legal process, such as a subpoena or court
          order, or to protect our rights, property, or safety
        </li>
        <li>
          In connection with a merger, acquisition, or sale of assets, in which
          case we will provide notice before your information is transferred
          and becomes subject to a different privacy policy
        </li>
      </ul>

      <h2>6. Data retention</h2>
      <p>
        We retain dispute metadata for as long as your account is active, and
        for a reasonable period afterward so that you can access historical
        records if you reinstall the App. We retain billing records and
        support correspondence for the period required by applicable tax, audit,
        and legal obligations.
      </p>
      <p>
        Because we do not store evidence file contents, there is no evidence
        retention period on our side. Files you upload are held by Stripe
        according to Stripe&apos;s own policies.
      </p>

      <h2>7. Your rights and choices</h2>
      <p>
        Depending on where you live, you may have rights under the California
        Consumer Privacy Act as amended by the California Privacy Rights Act
        (&quot;CCPA/CPRA&quot;) or other applicable privacy laws. These may
        include the right to:
      </p>
      <ul>
        <li>
          Know what personal information we have collected about you and how we
          use it
        </li>
        <li>Access or receive a copy of your personal information</li>
        <li>Request deletion of your personal information</li>
        <li>Request correction of inaccurate personal information</li>
        <li>
          Opt out of the sale or sharing of your personal information (we do
          not sell or share personal information as those terms are defined
          under the CCPA/CPRA)
        </li>
        <li>
          Not receive discriminatory treatment for exercising your privacy
          rights
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:support@winbackpay.com">support@winbackpay.com</a>. We
        may need to verify your identity before acting on a request. You may
        also authorize an agent to make a request on your behalf in accordance
        with applicable law.
      </p>

      <h2>8. Security</h2>
      <p>
        We protect the Service with industry-standard measures, including
        transport encryption (TLS), encryption at rest, least-privilege access
        controls, and authenticated API routes. We verify every request from
        the App using Stripe App signature verification, so untrusted traffic
        cannot reach merchant data.
      </p>
      <p>
        No system is perfectly secure. If we become aware of a breach that
        affects your personal information, we will notify you and any required
        authorities in accordance with applicable law.
      </p>

      <h2>9. International users</h2>
      <p>
        WinBack is operated from the United States. If you use the Service from
        outside the United States, your information will be transferred to,
        stored in, and processed in the United States. By using the Service,
        you acknowledge this transfer.
      </p>

      <h2>10. Children&apos;s privacy</h2>
      <p>
        The Service is intended for business use and is not directed to
        children under 13. We do not knowingly collect personal information
        from children under 13. If you believe a child has provided us with
        personal information, contact us and we will delete it.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we
        will revise the &quot;Last updated&quot; date at the top of the page.
        For material changes, we will provide additional notice, such as
        emailing you or displaying a notice inside the App. Your continued use
        of the Service after an update means you accept the revised policy.
      </p>

      <h2>12. Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or how we handle your
        information, contact us at:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@winbackpay.com">support@winbackpay.com</a>
        </li>
        <li>
          <strong>Entity:</strong> JB Technology LLC, the publisher of the
          WinBack Stripe App
        </li>
      </ul>
    </LegalLayout>
  );
}
