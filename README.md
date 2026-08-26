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

## V11.5
- Corrigido o zoom excessivo da home em celular vertical.
- Removido `object-fit: cover` no retrato.
- A arte passa a usar 100% da largura do aparelho e mantém proporção 3:2.
- Nenhuma lateral da arte é cortada; Geovana, Pudim, título e botões permanecem visíveis.
- Hotspots continuam alinhados à arte.

## V12 — Home vertical nativa
- Mantém a Home horizontal existente em desktop e celular na horizontal.
- Adiciona uma arte 9:16 exclusiva para celular em modo retrato.
- A arte vertical não possui botões desenhados no fundo.
- Som, idioma, perfil, jogar, mundos, ranking e aprender continuam sendo controles reais do jogo.
- Os controles são reposicionados sobre a composição vertical.
- Todas as fases, áudio, Pudim animado e sistema de dicas da V11.5 foram preservados.

## V12.2 — Uma única imagem na Home
- Removida a arte horizontal da tela inicial.
- A imagem vertical `home-mobile-v12.png` é agora a única imagem da Home.
- A mesma composição é usada em celular, tablet, notebook e desktop.
- Em telas largas, a arte vertical permanece centralizada.
- Mantidos os botões funcionais e toda a lógica do jogo.

## V12.3
- Reorganizados os controles sobre a Home vertical.
- Som e idioma menores e visíveis no topo esquerdo.
- Perfil reduzido no topo direito.
- Balão do Pudim reposicionado para não cobrir seu rosto.
- Jogar centralizado na área livre.
- Mundos, Ranking e Aprender alinhados em uma fileira.
- Pudim caminhante ocultado somente na Home, pois o personagem já faz parte da arte.
- Pudim animado e interativo continua nas fases.

## V12.4 — Nova tela principal
- Nova arte vertical aplicada como única imagem da Home.
- Botões desenhados na própria arte.
- Hotspots transparentes mantêm Som, Idioma, Perfil, Jogar, Mundos, Ranking e Aprender funcionais.
- Removidos da Home os elementos duplicados de balão, aviso e Pudim caminhante.
- As fases e o Pudim animado/interativo continuam preservados.

## V12.5
- Nova arte vertical compactada aplicada à tela principal.
- Hotspots reajustados para os novos botões desenhados.
- Mantidas as funções Som, Idioma, Perfil, Jogar, Mundos, Ranking e Aprender.
- Fases e interações do Pudim preservadas.

## V12.6 — Correção de abertura em celular
- Corrigida a Home que só aparecia após girar o celular.
- Retrato agora usa o viewport real do navegador (`100dvh`).
- A arte 9:16 é dimensionada para caber integralmente na tela.
- Removido o cálculo que podia criar uma Home maior que a área visível.
- Mantidos hotspots e funções da V12.5.

## V12.7 — Somente retrato
- Removido o layout horizontal/paisagem da Home.
- O jogo passa a usar sempre a composição vertical 9:16.
- Ao girar o aparelho, a interface não troca para uma versão horizontal.
- Mantidos os controles funcionais e as fases.

## V12.8 — Hotfix retrato inicial
- Home vertical passa a ser o layout padrão, antes de qualquer media query.
- Removida dependência de `:has()` para dimensionar a tela inicial.
- Removido `body position: fixed` como requisito da Home.
- Adicionado viewport explícito para largura real do aparelho.
- A página abre diretamente em retrato sem precisar girar o telefone.
