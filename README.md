# As Aventuras de Geovana — V10.4

Pudim integrado às fases: caminhada na trilha, pausas, falas e reações. Mascote estático removido da área da pergunta. Tailwind removido.


## V10.10
- Pudim usa somente um PNG isolado durante a caminhada, eliminando recortes duplicados.
- Movimento em quatro fases visuais para simular passos sem deslizar.
- Questões revisadas para remover emojis que entregavam respostas.
- Balões continuam bilíngues.

## V11
- Pudim agora é clicável durante os desafios.
- Ao clicar, ele para, mostra uma dica sem entregar diretamente a resposta e lê a dica em português.
- A dica usa a primeira letra e quantidade de letras da alternativa correta.
- Após alguns segundos, Pudim volta às frases motivacionais e à caminhada.

## V11.1
- Corrigida a interação do Pudim.
- Toda a área visual do mascote agora aceita clique/toque.
- Enter e Espaço também ativam a dica para acessibilidade.
- Ao pedir dica, Pudim para e troca para pose frontal.
- A área clicável foi ampliada sem criar botão visível sobre o cenário.

## V11.2
- Pudim ganhou voz própria mais aguda e infantil.
- Ao clicar, ele diz “Miau!” e depois lê a dica.
- A voz usa pitch elevado e tenta priorizar uma voz feminina/infantil disponível no navegador.
- Há fallback automático para uma voz em português disponível no dispositivo.

## V11.3
- Tela inicial adaptada para desktop, notebook, tablet, celular e TV.
- Arte principal preserva a proporção original sem cortar Geovana, Pudim ou logotipo.
- Áreas clicáveis continuam sobre a arte e recebem tamanho mínimo adequado para toque.
- Suporte a `100svh` melhora a exibição em navegadores móveis.

## V11.4
- Corrigida a home em modo retrato.
- Em celular/tablet vertical a arte passa a preencher toda a viewport.
- Centralização forçada em 50%/50%, eliminando o deslocamento lateral.
- `object-fit: cover` remove as faixas vazias no modo retrato.
- Hotspots permanecem vinculados ao mesmo contêiner escalado da arte.
