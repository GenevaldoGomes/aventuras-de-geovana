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

## V13.7 — Pudim olha para o aluno
- Enquanto caminha, Pudim continua usando a animação lateral.
- Quando para espontaneamente para conversar, vira de frente.
- Quando o aluno toca nele para pedir dica, também vira de frente.
- Durante a interação frontal há uma animação suave de respiração/fala.
- Ao terminar a interação, volta para a caminhada lateral.

## V13.8 — Reações do Pudim
- Acerto: Pudim para, vira de frente, comemora e aparecem estrelas animadas.
- Erro: Pudim para, vira de frente e demonstra tristeza.
- As reações usam imagens frontais dedicadas e não alteram a escala da pista.
- Depois da reação, o fluxo normal do jogo pode continuar.

## V13.9 — Pudim fala somente inglês
- Todas as falas automáticas do Pudim são reproduzidas apenas em inglês.
- Removida a leitura em português das interações e dicas.
- A tradução em português continua aparecendo visualmente nos balões para apoiar a compreensão.
- Acertos, erros, estrelas, caminhada e interações da V13.8 foram preservados.

## V14.2 — Responder falando dentro dos exercícios
- Cada questão ganhou o botão `🎤 Responder falando`.
- O aluno pode dizer em inglês uma das alternativas em vez de tocar nela.
- O navegador converte a fala em texto e compara com as opções da questão.
- Quando identifica uma alternativa, o jogo registra a resposta exatamente como se ela tivesse sido clicada.
- Acertos e erros continuam acionando as reações do Pudim.
- Mostra na tela o que foi entendido pelo reconhecimento de voz.
- Em navegadores sem reconhecimento de fala, é exibida uma orientação para usar Chrome ou Edge e permitir o microfone.

## V14.5 — Interface animada
Cards por categoria flutuam suavemente, ícones reagem, estrelas piscam, o card de conversação ganha brilho, botões têm pulso e feedback ao toque, alternativas recebem brilho passageiro e botões de áudio mostram notas musicais.

## V14.7 — Conversação mais realista
O Pudim agora interpreta o conteúdo da resposta. Se a criança responder algo que não faz sentido para a pergunta, ele explica que não entendeu, dá um exemplo e permanece na mesma pergunta. A conversa só avança quando a resposta é coerente. As respostas do Pudim também mudam conforme nome, sentimento, idade, cor e animal informados.

## V14.8 — Tradução visual na conversação
Todas as mensagens do Pudim no chat exibem inglês e, logo abaixo, a tradução em português. A síntese de voz continua reproduzindo exclusivamente a frase em inglês; a tradução nunca é falada.

## V14.9 — Correção de build Vercel
- Removida chamada inválida `setUnlocked(...)`.
- O desbloqueio dos mundos continua sendo calculado pela constante `unlocked`,
  baseada na quantidade de mundos concluídos.
- Mantidas conversação realista, tradução visual e demais recursos da V14.8.

## V14.10 — Correção saveProfile
- Restaurada a função `saveProfile`.
- O botão Salvar do Perfil volta a atualizar o nome, gravar no localStorage e retornar à tela inicial.
- Mantida a correção anterior de `setUnlocked`.

## V14.11 — Respostas da conversação somente em inglês
- A tradução em português continua disponível apenas como apoio visual.
- A criança precisa responder em inglês para a conversa avançar.
- Respostas detectadas em português são recusadas.
- Pudim orienta em inglês: `Please answer in English`, com tradução visual.
- A voz do Pudim continua falando somente inglês.

## V14.12 — Tela inicial mais animada
- Botão Jogar pulsa com brilho.
- Mundos, Ranking e Aprender flutuam suavemente.
- Estrelas piscam ao redor das áreas clicáveis.
- Perfil recebe brilho discreto.
- Botões reagem ao toque.
- Música inicial substituída por uma composição original mais rápida e alegre, mantendo execução apenas na tela inicial.

## V14.13 — Conversação: personagem e Pudim interativo
- Imagem da Geovana na conversação substituída pela arte principal do jogo.
- Pudim inferior continua caminhando, mas agora para e vira de frente quando fala.
- Ao clicar no Pudim, ele para, vira para o aluno e oferece uma dica em inglês.
- Pudim também pergunta se o aluno precisa de ajuda e indica o uso do microfone/exemplo.
- Após a interação, volta a caminhar.

## V14.15 — Treino de fala no Aprender
Cada card de vocabulário agora possui Ouvir e Treinar fala. No treino, Pudim aparece como tutor, pronuncia a palavra, escuta a criança pelo microfone e dá feedback positivo ou pede nova tentativa. O reconhecimento usa inglês (en-US), mantendo o português apenas como apoio visual.

## V14.16 — Correção TypeScript/Vercel
Corrigido `Object is possibly 'undefined'` na tela Aprender. A categoria selecionada agora é resolvida em `selectedLearnCategory` e o JSX usa acesso seguro antes de renderizar ícone, nome e itens. Mantido o treino de fala com Pudim.
