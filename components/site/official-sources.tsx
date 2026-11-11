import { ExternalLink } from "lucide-react";

type Source = { label: string; url: string };

const STEAM = { label: "ROB RUN on Steam (official game listing)", url: "https://store.steampowered.com/app/4262460/" };
const HELP = { label: "Kefir ROB RUN Help Center", url: "https://kefirgames.helpshift.com/hc/en/14-rob-run/" };
const NEWS = { label: "ROB RUN developer announcements on Steam", url: "https://steamcommunity.com/app/4262460/allnews/" };
const SWITCH = { label: "Kefir — invite a friend on another server", url: "https://kefirgames.helpshift.com/hc/en/14-rob-run/faq/1382-how-to-invite-a-friend-to-a-party-if-it-says-they-are-on-another-server/" };
const WIPE = { label: "Kefir — Federal Raid wipe rules", url: "https://kefirgames.helpshift.com/hc/en/14-rob-run/faq/1346-what-is-the-federal-raid-wipe/" };
const BANK = { label: "Kefir — opening a bank account and laundering money", url: "https://kefirgames.helpshift.com/hc/en/14-rob-run/faq/1355-how-do-i-open-a-bank-account-and-why-launder-money/" };

const byPage: Record<string, Source[]> = {
  "": [STEAM, HELP, NEWS],
  "server-status": [NEWS, HELP, STEAM],
  "change-server": [SWITCH, HELP, NEWS],
  wipe: [WIPE, NEWS, HELP],
  console: [STEAM, NEWS],
  "bank-account": [BANK, WIPE, HELP],
};

export function OfficialSources({ slug }: { slug: string }) {
  const sources = byPage[slug] ?? [STEAM, HELP];
  return (
    <section aria-labelledby="verified-sources-title" className="content-card">
      <h2 id="verified-sources-title" className="text-2xl">Check the original sources</h2>
      <p className="mt-3">Information reviewed November 11, 2026. This independent guide is not a live status feed. The latest official source takes precedence when game rules or availability change.</p>
      <ul className="mt-5 space-y-3">
        {sources.map(({ label, url }) => (
          <li key={url}>
            <a className="inline-flex max-w-full items-start gap-2 break-words text-primary underline underline-offset-4 hover:text-foreground" href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mt-1 shrink-0" size={15} aria-hidden="true" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
