# Fases e Sprints de Desenvolvimento (Plano Detalhado com Atuação da IA)

Este plano detalha como a **IA participará ativamente de cada sprint**, gerando código, testes, workflows e documentação de forma orientada.

---

## Sprint 0: Fundação e Discovery

### Atuação da IA

- **Tarefa**:  
  `"Com base no nosso plano de CI/CD, gere o workflow do GitHub Actions (.github/workflows/ci.yml) que instala o PNPM, faz o linting e executa testes placeholder para os workspaces apps/*."`

- **Tarefa**:  
  `"Gere o arquivo docker-compose.local.yml com os serviços postgres, redis, api-gateway, portal-devedor e worker-ia, configurando as portas e volumes necessários para o desenvolvimento local."`

- **Tarefa**:  
  `"Crie o template para nossos Architecture Decision Records (ADRs) em docs/ADR/template.md."`

- **Tarefa**:  
  `"Para a Prova de Conceito (PoC) da API SITAC, gere um script simples em Python (usando requests e Pydantic) que consome o endpoint de débitos e valida a resposta contra um modelo de dados."`

---

## Sprint 1: Modelagem do Domínio e Identificação de Débitos

### Atuação da IA

- **Tarefa**:  
  `"Com base nos requisitos da Etapa 1 do documento, gere as entidades Inscrito, Debito e ProcessoAdministrativo usando o ORM Prisma (ou Sequelize, conforme a escolha final) para o PostgreSQL. Inclua validações e tipos de dados corretos."`

- **Tarefa**:  
  `"Gere o DebitoService no NestJS. Crie o método sincronizarDebitosDoSITAC que chama a PoC do Sprint 0. Implemente a lógica de verificação de prescrição (5 anos) e persista os débitos válidos."`

- **Tarefa**:  
  `"Gere 5 testes unitários para o DebitoService usando Jest, cobrindo: 1) débito válido, 2) débito prescrito, 3) débito prestes a prescrever, 4) erro na API do SITAC, 5) nenhum débito novo."`

---

## Sprint 2: Motor de Notificações e Prazos

### Atuação da IA

- **Tarefa**:  
  `"Gere um NotificationService no NestJS. Integre com a API do Twilio para envio de WhatsApp. Crie um método enviarNotificacaoInicial(debitoId)."`

- **Tarefa**:  
  `"Implemente um sistema de agendamento de tarefas (usando node-cron ou BullMQ com Redis) que, 30 dias após a notificação ser enviada com sucesso, mude o status do processo para 'Aguardando Inscrição em DA'."`

- **Tarefa**:  
  `"Crie uma tabela de logs (notification_logs) e a lógica para registrar cada tentativa de envio, seu status (sucesso, falha) e o canal utilizado."`

---

## Sprint 3: Portal do Devedor (Consulta e Pagamento à Vista)

### Atuação da IA

- **Tarefa**:  
  `"No app Next.js (portal-devedor), gere a página de login usando Radix UI e Tailwind CSS. Crie um formulário com CPF e senha."`

- **Tarefa**:  
  `"Crie a página /dashboard que, após o login, busca os débitos do usuário na nossa api-gateway e os exibe em uma tabela."`

- **Tarefa**:  
  `"Para cada débito na tabela, adicione um botão 'Pagar com PIX'. Ao clicar, ele deve chamar um endpoint no backend que integra com uma API de pagamentos (ex: Stripe, PagSeguro) para gerar um QR Code."`
