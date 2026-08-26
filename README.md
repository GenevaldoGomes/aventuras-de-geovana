# As Aventuras de Geovana — V13

Código reconstruído do zero. Home 9:16 é o layout padrão e não depende de rotação/orientation para aparecer. Mantém 4 mundos, 40 questões, áudio, progresso, ranking, aprender e Pudim interativo com dicas.

## V13.1 — Correção de segurança para Vercel
- Next.js atualizado de 15.5.2 para 15.5.21.
- Removido lockfile antigo para a Vercel gerar dependências compatíveis no novo deploy.
- React/React DOM mantidos em 19.1.0.
- Nenhuma alteração no jogo, na Home vertical 9:16 ou nas funções da V13.

## V13.2 — Pudim realmente animado
- A caminhada não usa mais uma única imagem deslizando.
- Pudim agora alterna quadros de caminhada enquanto se desloca.
- Há quadros diferentes para parado/dica, acerto e erro.
- Mantida a interação de clicar no Pudim para receber dica.
