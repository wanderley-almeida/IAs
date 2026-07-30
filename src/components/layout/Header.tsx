"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";
import { aboutNav, primaryLinks, servicesNav } from "./nav";

type Menu = "servicos" | "cartorio" | null;

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Fecha menus ao navegar (ajuste de estado durante o render, sem efeito).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  // Sombra sutil após rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Atalho ⌘K / Ctrl-K, Escape e evento global "open-search" (usado pelo hero).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchMounted(true);
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onOpenSearch = () => {
      setSearchMounted(true);
      setSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, []);

  // Clique fora fecha dropdowns do desktop.
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openMenu]);

  // Trava o scroll do body com o menu mobile aberto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openSearch() {
    setSearchMounted(true);
    setSearchOpen(true);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface-0/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-[0_1px_12px_rgba(11,29,51,0.08)]" : "",
      )}
    >
      {/* Faixa superior institucional */}
      <div className="hidden border-b border-line bg-navy-950 text-[0.8125rem] text-white/85 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <p className="flex items-center gap-2">
            <Icon name="clock" className="h-4 w-4 text-gold-400" />
            {site.hours.label}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Icon name="phone" className="h-4 w-4 text-gold-400" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Icon name="mail" className="h-4 w-4 text-gold-400" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="border-b border-line">
        <nav
          ref={navRef}
          aria-label="Navegação principal"
          className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Logo />

          {/* Navegação desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="nav-link px-3 py-2 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:text-navy-700"
            >
              Início
            </Link>

            {/* Dropdown Serviços */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openMenu === "servicos"}
                aria-controls="menu-servicos"
                onClick={() =>
                  setOpenMenu(openMenu === "servicos" ? null : "servicos")
                }
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                  isActive("/servicos")
                    ? "text-navy-700"
                    : "text-ink-700 hover:text-navy-700",
                )}
              >
                Serviços
                <Icon
                  name="chevronDown"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMenu === "servicos" && "rotate-180",
                  )}
                />
              </button>
              {openMenu === "servicos" && (
                <div
                  id="menu-servicos"
                  className="absolute left-1/2 z-50 mt-2 w-[44rem] -translate-x-1/2 rounded-2xl border border-line bg-surface-0 p-6 shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-8">
                    {[servicesNav.notas, servicesNav.protesto].map((group) => (
                      <div key={group.href}>
                        <Link
                          href={group.href}
                          className="mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-wider text-gold-500 uppercase hover:text-gold-400"
                        >
                          {group.label}
                          <Icon name="arrowRight" className="h-3.5 w-3.5" />
                        </Link>
                        <ul className="space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-3 py-2 text-[0.9375rem] text-ink-700 transition-colors hover:bg-surface-1 hover:text-navy-700"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-line pt-4">
                    <Link
                      href="/servicos"
                      className="flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-600"
                    >
                      Ver todos os serviços
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown O Cartório */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openMenu === "cartorio"}
                aria-controls="menu-cartorio"
                onClick={() =>
                  setOpenMenu(openMenu === "cartorio" ? null : "cartorio")
                }
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                  isActive("/sobre") || isActive("/transparencia")
                    ? "text-navy-700"
                    : "text-ink-700 hover:text-navy-700",
                )}
              >
                O Cartório
                <Icon
                  name="chevronDown"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMenu === "cartorio" && "rotate-180",
                  )}
                />
              </button>
              {openMenu === "cartorio" && (
                <div
                  id="menu-cartorio"
                  className="absolute left-0 z-50 mt-2 w-64 rounded-2xl border border-line bg-surface-0 p-3 shadow-xl"
                >
                  <ul className="space-y-0.5">
                    {aboutNav.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-[0.9375rem] text-ink-700 transition-colors hover:bg-surface-1 hover:text-navy-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="nav-link px-3 py-2 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:text-navy-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink-500 transition-colors hover:border-navy-600 hover:text-navy-700"
              aria-label="Buscar no site (atalho Ctrl+K)"
            >
              <Icon name="search" className="h-4.5 w-4.5" />
              <span className="hidden xl:inline">Buscar…</span>
              <kbd
                aria-hidden="true"
                className="hidden rounded border border-line bg-surface-1 px-1.5 text-[0.6875rem] xl:inline"
              >
                Ctrl K
              </kbd>
            </button>

            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-lg bg-navy-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-navy-600 md:flex"
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              aria-label="Abrir menu"
              className="rounded-lg border border-line p-2.5 text-navy-900 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div
          id="menu-mobile"
          className="fixed inset-0 z-50 overflow-y-auto bg-surface-0 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="rounded-lg border border-line p-2.5 text-navy-900"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Navegação móvel" className="px-4 py-6 sm:px-6">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openSearch();
              }}
              className="mb-6 flex w-full items-center gap-3 rounded-xl border border-line px-4 py-3 text-left text-ink-500"
            >
              <Icon name="search" className="h-5 w-5" />
              Buscar serviços…
            </button>

            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block rounded-lg px-3 py-3 text-lg font-medium text-navy-900"
                >
                  Início
                </Link>
              </li>
              {[servicesNav.notas, servicesNav.protesto, aboutNav].map(
                (group) => (
                  <li key={group.label}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
                        {group.label}
                        <Icon
                          name="chevronDown"
                          className="h-5 w-5 text-gold-500 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <ul className="mt-1 mb-2 space-y-0.5 border-l-2 border-line pl-4">
                        <li>
                          <Link
                            href={group.href}
                            className="block rounded-lg px-3 py-2.5 font-medium text-navy-700"
                          >
                            Visão geral
                          </Link>
                        </li>
                        {group.links
                          .filter((l) => l.href !== group.href)
                          .map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-3 py-2.5 text-ink-700"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </details>
                  </li>
                ),
              )}
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-navy-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 rounded-2xl bg-surface-1 p-5">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-medium text-navy-700"
              >
                <Icon name="phone" className="h-5 w-5 text-gold-500" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-ink-700"
              >
                <Icon name="mail" className="h-5 w-5 text-gold-500" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-ink-700">
                <Icon name="clock" className="h-5 w-5 text-gold-500" />
                {site.hours.label}
              </p>
            </div>
          </nav>
        </div>
      )}

      {searchMounted && (
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </header>
  );
}
