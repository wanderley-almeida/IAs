import type { IconName } from "@/components/ui/Icon";

/** Ícone representativo de cada serviço (usado em cards, menus e páginas). */
export const serviceIcons: Record<string, IconName> = {
  escrituras: "document",
  procuracoes: "userCheck",
  testamentos: "scroll",
  "atas-notariais": "eye",
  "reconhecimento-de-firma": "pen",
  autenticacao: "copy",
  certidoes: "seal",
  "protesto-de-titulos": "scale",
  "emissao-de-boletos": "barcode",
  "consulta-de-protestos": "search",
  "cancelamento-de-protesto": "checkCircle",
};
