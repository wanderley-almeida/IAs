import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Lora: serifada de transição, sóbria e legível. Escolhida no lugar de
 * Fraunces, cujo desenho expressivo destoava do tom institucional.
 */
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Escrituras, Procurações, Protesto e mais`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Serviços de notas e protesto com segurança jurídica e atendimento humano: escrituras, procurações, testamentos, reconhecimento de firma, autenticação, protesto de títulos e certidões.",
  openGraph: {
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#081527",
  width: "device-width",
  initialScale: 1,
};

/**
 * Aplica o tema e o tamanho de fonte salvos ANTES do primeiro paint,
 * evitando flash. Sem preferência salva, segue o sistema do usuário.
 *
 * A checagem de THEME_PREF_VERSION descarta uma única vez as preferências
 * gravadas pela versão anterior do menu, que não oferecia a opção Sistema
 * e podia deixar "Claro" fixado sem escolha consciente do usuário.
 */
const themeInitScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem("themePrefVersion")!=="2"){localStorage.removeItem("theme");localStorage.setItem("themePrefVersion","2")}var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;var f=parseFloat(localStorage.getItem("fontScale"));if(f>=0.875&&f<=1.25){d.style.fontSize=(f*100)+"%"}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${lora.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-action px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <ScrollReveal />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
