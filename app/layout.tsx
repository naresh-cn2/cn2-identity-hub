import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CommandPalette from "@/components/layout/command-palette";
import PageTransition from "@/components/layout/page-transition";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cn2-identity-hub.vercel.app"),
  title: {
    default: "Bukya Naresh — CN2.dev",
    template: "%s — Bukya Naresh / CN2.dev",
  },
  description:
    "CN2.dev — the digital headquarters of Bukya Naresh. Quantitative intelligence through research, markets, data and engineering: deterministic systems for understanding markets.",
  alternates: { canonical: "/" },
  keywords: [
    "quantitative research",
    "systematic trading",
    "market data infrastructure",
    "backtesting",
    "risk engineering",
    "Bukya Naresh",
    "CN2.dev",
    "CN2",
  ],
  authors: [{ name: "Bukya Naresh" }],
  creator: "Bukya Naresh",
  openGraph: {
    title: "Bukya Naresh — CN2.dev",
    description:
      "Quantitative intelligence through research, markets, data and engineering.",
    type: "website",
    siteName: "Bukya Naresh — CN2.dev",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bukya Naresh — CN2.dev",
    description:
      "Quantitative intelligence through research, markets, data and engineering.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
  ],
};

const themeInit = `(function(){try{var t=localStorage.getItem('ni-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="label-mono fixed left-4 top-4 z-[100] -translate-y-24 bg-signal px-4 py-2 text-white transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar />
          <CommandPalette />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
