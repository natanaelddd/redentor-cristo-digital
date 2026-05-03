## Plano: Salvar progresso do curso de batismo

### Como vai funcionar para o aluno

1. Ao digitar o nome e começar o curso, o progresso é salvo automaticamente no navegador (localStorage)
2. Se a pessoa fechar a aba ou o celular, ao voltar na página do curso, verá uma mensagem: **"Bem-vindo(a) de volta, [Nome]! Deseja continuar de onde parou?"**
3. Ao clicar "Continuar", volta direto para a lição e etapa (leitura ou questionário) onde parou, com todas as respostas já preenchidas
4. Ao clicar "Começar do zero", limpa tudo e recomeça
5. Quando o aluno **envia** as respostas de uma lição, aquela lição aparece marcada com um check verde na lista, indicando que já foi concluída
6. As respostas rascunho são salvas automaticamente a cada mudança de texto

### Por que localStorage (e no banco de dados)

- Os alunos **no fazem login** -- so digitam o nome
- localStorage funciona no mesmo dispositivo/navegador sem necessidade de autenticacao
- Simples e imediato, sem complexidade extra
- Tambem consultamos o banco (`quiz_submissions`) para marcar licoes ja enviadas

### Mudancas tecnicas

**Arquivo: `src/pages/Quiz.tsx`**

- Ao confirmar o nome, salvar `studentName` no localStorage
- Ao mudar de etapa ou lição, salvar `step`, `selectedLessonNumber` no localStorage  
- Ao digitar respostas, salvar `answers` no localStorage (debounced ou onChange)
- Ao carregar a página, verificar se existe progresso salvo no localStorage
- Se existir, mostrar tela de "Continuar ou Começar do zero?" antes do fluxo normal
- Ao enviar respostas com sucesso, limpar o progresso daquela lição do localStorage
- Consultar `quiz_submissions` pelo nome do aluno para mostrar quais lições já foram enviadas (check verde na lista de lições)
- Ao clicar "Responder outra lição", manter o nome salvo e ir para seleção

Nenhuma mudança no banco de dados e necessária.
