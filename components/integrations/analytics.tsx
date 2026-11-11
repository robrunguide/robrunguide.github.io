/** Google Tag Manager container (GTM-NQG8Q432).
 * The user-provided GTM snippet contained a gtag() stub but not the
 * standard GTM dataLayer bootstrap; load the container once using the
 * canonical GTM bootstrap. GA4 measurement must be configured and
 * published within this GTM container separately.
 */
const containerId = "GTM-NQG8Q432";

export function Analytics() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
          `,
        }}
      />
      <script async src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`} />
    </>
  );
}

export function AnalyticsNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
