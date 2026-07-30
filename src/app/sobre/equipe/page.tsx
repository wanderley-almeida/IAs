import type { Metadata } from "next";
import { team } from "@/content/team";
import { PENDING } from "@/types/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Equipe",
  "Conheça a equipe do Cartório de Notas e de Protesto de Potirendaba/SP.",
  "/sobre/equipe",
);

export default function EquipePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "Equipe", href: "/sobre/equipe" },
        ]}
        eyebrow="Quem atende você"
        title="Nossa equipe"
        lede="Profissionais preparados para orientar cada ato com atenção, técnica e respeito ao seu tempo."
      />

      <section className="bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <li
                key={`${member.name}-${member.role}`}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-2xl border border-line bg-surface-1 p-6"
              >
                <span className="inline-flex rounded-full bg-action/10 p-3 text-link">
                  <Icon name="userCheck" className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-heading">
                  {member.name === PENDING ? (
                    <span className="text-ink-500 italic">{PENDING}</span>
                  ) : (
                    member.name
                  )}
                </h2>
                <p className="text-sm font-medium text-gold-500">
                  {member.role}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
                  {member.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
