# Arquivos de marca

Pasta reservada aos arquivos oficiais do logotipo.

## Como usar a arte original (PNG/SVG) no lugar do emblema vetorial

O cabeçalho usa hoje o emblema desenhado em vetor dentro de
`src/components/layout/Logo.tsx` (nítido em qualquer tamanho, imprime em
uma cor). Para usar a arte original em imagem:

1. Salve o arquivo aqui como `emblema.png` (fundo transparente, recorte
   apenas do selo, sem o texto ao lado, mínimo 512x512 px).
2. Em `src/components/layout/Logo.tsx`, troque `<Emblem className="..." />`
   por:

   ```tsx
   import Image from "next/image";

   <Image
     src="/brand/emblema.png"
     alt=""
     width={48}
     height={48}
     className="h-12 w-12 shrink-0"
     priority
   />
   ```

3. Para o favicon, exporte o mesmo recorte em 512x512 px e substitua
   `src/app/icon.svg` por `src/app/icon.png`.

Recomendação: manter também a folha completa gerada (lockups horizontal e
vertical, versão monocromática) nesta pasta, para uso em papelaria e redes
sociais.
