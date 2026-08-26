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

## V13.3 — Correção do cenário e Pudim
- Usa exatamente o cenário enviado pelo usuário na pista.
- Corrigidos todos os caminhos dos frames do Pudim para arquivos realmente existentes em public/sprites.
- Caminhada usa walk-0.png até walk-7.png.
- Acerto usa correct/happy; erro usa wrong; dica usa idle.
- Eliminado o ícone de imagem quebrada.

## V13.4 — Dicas do Pudim
- Pudim agora é um botão real, compatível com toque no celular.
- Ao tocar nele durante a questão, ele para e mostra a dica por 8 segundos.
- A dica informa a primeira letra e a quantidade de letras da resposta correta, sem entregar a resposta.
- Com o som ligado, Pudim também fala a dica em português.

## V13.5 — Frames limpos do Pudim
- Removidos da caminhada os recortes que continham pedaços do frame vizinho.
- Criados 8 quadros limpos a partir do Pudim isolado.
- Todos os frames usam a mesma caixa e o mesmo alinhamento.
- Mantidas caminhada, direção, balão e dica clicável.

## V13.6 — Pudim Companheiro Interativo
- Pudim caminha normalmente e para em intervalos aleatórios.
- Durante as pausas, conversa com a criança em inglês e português.
- Perguntas incluem: está tudo bem, tem dúvidas, precisa de ajuda e quer uma dica.
- Quando pergunta se quer uma dica, a criança pode tocar no Pudim.
- Ao parar, Pudim mantém o mesmo personagem, tamanho e estilo lateral.
- O balão foi ampliado e fica acima do mascote sem esconder o texto.
- Com som ligado, as falas são reproduzidas em inglês e depois em português.
