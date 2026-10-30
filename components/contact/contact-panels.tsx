import { site } from "@/data/site";

/**
 * /contact channel panels.
 *
 * Every panel is a single real link built from `site.links` — the source of
 * truth for genuine channels. Nothing here invents a channel: email, phone,
 * WhatsApp, GitHub and LinkedIn are exactly what the site publishes.
 *
 * Progressive disclosure: the channel's actual address/handle is always in
 * the accessibility tree, always visible on touch and coarse-pointer devices,
 * and revealed on hover or keyboard focus for fine pointers. Motion is purely
 * responsive — the panel lifts, lights and responds to press only while it is
 * being interacted with; nothing here glows on its own.
 */

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

interface Channel {
  id: string;
  index: string;
  label: string;
  /** The revealed detail — a real address or profile URL. */
  handle: string;
  href: string;
  external: boolean;
  description: string;
  action: string;
  icon: React.ReactNode;
}

/** Strip protocol and trailing slash so the handle reads the way people type it. */
function humanUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const CHANNELS: Channel[] = [
  {
    id: "email",
    index: "01",
    label: "EMAIL",
    handle: site.email,
    href: site.links.email,
    external: false,
    description:
      "For a technical challenge, a project idea, a research question or a professional opportunity.",
    action: "OPENS YOUR MAIL CLIENT",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    ),
  },
  {
    id: "phone",
    index: "02",
    label: "PHONE",
    handle: "+91 94900 04978",
    href: site.links.phone,
    external: false,
    description:
      "For a direct conversation — calls during working hours, Indian Standard Time.",
    action: "OPENS YOUR DIALER",
    icon: <PhoneIcon />,
  },
  {
    id: "whatsapp",
    index: "03",
    label: "WHATSAPP",
    handle: humanUrl(site.links.whatsapp),
    href: site.links.whatsapp,
    external: true,
    description: "Quick messages and voice notes on WhatsApp.",
    action: "OPENS WHATSAPP",
    icon: <MessageCircleIcon />,
  },
  {
    id: "github",
    index: "04",
    label: "GITHUB",
    handle: humanUrl(site.links.github),
    href: site.links.github,
    external: true,
    description: "Open-source repositories — read the code directly.",
    action: "OPENS IN A NEW TAB",
    icon: <GithubIcon />,
  },
  {
    id: "linkedin",
    index: "05",
    label: "LINKEDIN",
    handle: humanUrl(site.links.linkedin),
    href: site.links.linkedin,
    external: true,
    description: "Professional profile and network.",
    action: "OPENS IN A NEW TAB",
    icon: <LinkedinIcon />,
  },
];

function ChannelPanel({ channel }: { channel: Channel }) {
  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      className="card-depth group flex h-full flex-col border border-line bg-background p-6 md:p-8"
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-muted transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-signal group-focus-visible:text-signal">
          {channel.icon}
        </span>
      </span>

      <span className="flex flex-1 flex-col transition-transform duration-200 ease-out group-active:scale-[0.99]">
        <span className="display mt-6 block text-2xl md:text-3xl">{channel.label}</span>
        <span className="mt-3 block text-sm leading-relaxed text-muted">{channel.description}</span>

        <span className="mt-auto block pt-8">
          <span className="block break-all font-mono text-sm text-foreground transition-[opacity,transform] duration-500 ease-out pointer-fine:translate-y-2 pointer-fine:opacity-0 pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:translate-y-0 pointer-fine:group-focus-visible:opacity-100">
            {channel.handle}
          </span>
          <span className="mt-3 block h-px w-full origin-left bg-signal transition-transform duration-500 ease-out pointer-fine:scale-x-0 pointer-fine:group-hover:scale-x-100 pointer-fine:group-focus-visible:scale-x-100" />
          <span className="label-mono mt-3 block text-faint">{channel.action}</span>
        </span>
      </span>
    </a>
  );
}

/** The direct-channel panels, sourced entirely from `site.links`. */
export default function ContactPanels() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {CHANNELS.map((channel) => (
        <ChannelPanel key={channel.id} channel={channel} />
      ))}
    </div>
  );
}
