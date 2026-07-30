import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const shortcuts = [
  { label: "Serviços", href: "/servicos" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

export default function NotFound() {
  return (
    <section className="bg-surface-0">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="font-display text-5xl font-medium text-gold-500/60">404</p>
        <h1 className="font-display mt-4 text-3xl font-medium text-heading">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-500">
          O endereço pode ter mudado ou não existe. Use a busca ou os atalhos
          abaixo para encontrar o que precisa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/busca" variant="primary" size="lg">
            <Icon name="search" className="h-5 w-5" />
            Buscar no site
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Ir para o início
          </Button>
        </div>
        <nav aria-label="Atalhos" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink-700 transition-colors hover:border-azure-500 hover:text-link"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
