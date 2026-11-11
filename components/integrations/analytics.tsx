import { integrations } from "@/config/integrations";

const containerId = "GTM-TJDBTK59";

export function Analytics() {
  const measurementId = integrations.analytics.provider === "google-analytics"
    ? integrations.analytics.measurementId
    : null;

  return (
    <>
      {measurementId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${measurementId ? `gtag('config', '${measurementId}');` : ""}
          `,
        }}
      />
      {/* eslint-disable-next-line @next/next/next-script-for-ga -- Queue the GTM startup event before loading the container. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

            (() => {
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtm.js?id=${containerId}';
              document.head.appendChild(script);
            })();
          `,
        }}
      />
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
