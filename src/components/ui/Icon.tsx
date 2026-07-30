import { cn } from "@/lib/utils";

/**
 * Conjunto de ícones próprio (SVG outline 24×24, traço 1.5) - sem dependência
 * externa. Todos decorativos por padrão (aria-hidden); o texto adjacente rotula.
 */
const paths: Record<string, React.ReactNode> = {
  phone: (
    <path d="M4.5 3h4l2 5-2.5 1.5a12 12 0 0 0 6.5 6.5L16 13.5l5 2v4a2 2 0 0 1-2 2A16.5 16.5 0 0 1 2.5 5a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5 9.5 14.5" />
      <path d="M19 13.5V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5" />
    </>
  ),
  check: <path d="m5 12.5 5 5L19.5 7" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4.5" />
      <path d="M12 17.2v.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
      <path d="m9 11.5 2.5 2.5 4-4.5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M10 12h5m-5 4h5" />
    </>
  ),
  pen: (
    <>
      <path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5Z" />
      <path d="m12.5 7.5 4 4" />
    </>
  ),
  seal: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-2 7 5.5-2.5 5.5 2.5-2-7" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4Z" />
      <path d="M6 4a2 2 0 0 0-2 2v2h4M10 9h6m-6 4h6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16m-6 0h12M12 4 6 6.5m6-2.5 6 2.5" />
      <path d="M3.5 12.5 6 6.5l2.5 6a3 3 0 0 1-5 0Z" />
      <path d="m15.5 12.5 2.5-6 2.5 6a3 3 0 0 1-5 0Z" />
    </>
  ),
  landmark: (
    <>
      <path d="m3 9 9-5.5L21 9H3Z" />
      <path d="M5 9v8m4.5-8v8m5-8v8M19 9v8M3.5 20.5h17" />
    </>
  ),
  barcode: (
    <path d="M4 6v12M8 6v12m3.5-12v12M15 6v12m5-12v12" />
  ),
  userCheck: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="m15.5 10.5 2 2 4-4.5" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m5.5 5.5 13 13" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6.5" width="13" height="11" rx="2" />
      <path d="m16 11 5-3v8l-5-3" />
    </>
  ),
  home: (
    <path d="m4 11 8-7 8 7v9a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9Z" />
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1" />
      <path d="M9 8h2m2 0h2M9 12h2m2 0h2M9 16h2m2 0h2M12 21v-3" />
    </>
  ),
  handshake: (
    <>
      <path d="m8 12-3-3 4-4 3 2 3-2 4 4-3 3" />
      <path d="m8 12 4 4 4-4M10 14l-1.5 1.5M14 14l1.5 1.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14" r="4.5" />
      <path d="m11.5 10.5 8-8M17 5l2.5 2.5M14 8l2 2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5V5m0 14v2.5M2.5 12H5m14 0h2.5M4.9 4.9l1.8 1.8m10.6 10.6 1.8 1.8m0-14.2-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </>
  ),
  moon: (
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
  ),
  accessibility: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="7.3" r="1.6" />
      <path d="M7.5 10.2c3 .9 6 .9 9 0M12 11.5v3m0 0-2 4.3m2-4.3 2 4.3" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M9 21h6m-3-4v4" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6 shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
