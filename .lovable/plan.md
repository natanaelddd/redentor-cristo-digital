
# Redesign do Curso Preparatório para Batismo

Vamos transformar a experiência do curso com um visual mais bonito, elementos de gamificação sutil e sensação de progresso e conquista.

---

## 1. Barra de Progresso Global

- Adicionar uma barra de progresso no topo da tela de seleção de lições mostrando "X de 8 lições concluídas"
- Porcentagem visual com texto motivacional que muda conforme o progresso:
  - 0%: "Sua jornada começa aqui!"
  - 25%: "Ótimo começo, continue firme!"
  - 50%: "Metade do caminho! Você está indo muito bem!"
  - 75%: "Quase lá! Falta pouco!"
  - 100%: "Parabéns! Curso completo!"

## 2. Visual Refinado

- Gradiente suave no header da página (azul/dourado espiritual)
- Cards de lição com ícones temáticos por lição (cruz, pomba, água, livro, etc.) usando Lucide icons
- Fundo com gradiente sutil ao invés do cinza plano
- Animações suaves de entrada nos cards (fade-in escalonado)
- Tela de leitura com tipografia melhorada: versículos bíblicos destacados em caixas estilizadas com borda lateral colorida

## 3. Gamificação Sutil

- **Badges/Medalhas**: Ao concluir cada lição, mostrar uma mini-celebração com confetti sutil (CSS) e uma mensagem encorajadora
- **Streak visual**: Na lista de lições, as concluídas ganham um "selo dourado" ao invés do simples check verde
- **Tela de conclusão**: Quando todas as 8 lições forem concluídas, mostrar um certificado visual de conclusão com o nome do aluno, nome da igreja e do pastor
- **Mensagens motivacionais**: Frases de encorajamento contextuais ao longo do fluxo

## 4. Tela de Sucesso Aprimorada

- Animação de celebração ao enviar respostas (confetti CSS simples)
- Mensagem bíblica motivacional aleatória
- Mostrar progresso atualizado: "Você completou X de 8 lições!"
- Se for a última lição, mostrar tela especial de certificado

## 5. Certificado de Conclusão

- Card estilizado com bordas ornamentais
- Nome do aluno, igreja, pastor
- Data de conclusão
- Botão para captura de tela / compartilhar

---

## Arquivos Modificados

- `src/pages/Quiz.tsx` -- redesign completo da UI com todos os elementos acima
- `src/components/ui/progress.tsx` -- já existe, será reutilizado
- Possível criação de `src/components/CourseCompletionCertificate.tsx` para o certificado
- Possível criação de `src/components/ConfettiEffect.tsx` para animação de celebração

Nenhuma mudança no backend ou banco de dados. Tudo client-side.
