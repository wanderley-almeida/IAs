/** Junta classes condicionalmente (substituto leve de clsx). */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

/** Remove acentos e normaliza para comparação de busca. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
