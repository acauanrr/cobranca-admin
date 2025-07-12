# Arquitetura de Referência e Tecnologia

A arquitetura e as tecnologias escolhidas são ideais para o **desenvolvimento assistido por IA**.  
A **tipagem estrita** é o nosso "contrato de confiança" com o agente.

---

### Atuação do Agente de IA nesta fase

- **Geração de Boilerplate**:  
  O agente pode criar toda a configuração inicial para cada serviço (`api-gateway`, `portal-devedor`, `worker-ia`) com base na stack definida.

- **Configuração de Infraestrutura**:  
  Gerar `Dockerfiles` otimizados para cada aplicação e um `docker-compose.yml` completo, incluindo redes, volumes e variáveis de ambiente.

- **Validação de Escolhas**:  
  O agente pode ser questionado sobre os **prós e contras de uma tecnologia** (ex:  
  _"Compare RabbitMQ e Kafka para nosso caso de uso específico de auditoria e notificação"_)  
  para **validar decisões arquiteturais**.

---

# Estrutura de Pastas (Monorepo com PNPM Workspaces)

Essa estrutura será o **mapa mental do agente de IA**.  
Todos os prompts deverão fazer referência a essa estrutura para que o código gerado seja inserido no local correto.

---

### Atuação do Agente de IA

- O agente deve ser **treinado via contexto de prompt** a sempre respeitar essa estrutura.

  **Exemplos**:
  - _"Crie um novo componente de UI na pasta `packages/ui-components`"_
  - _"Adicione uma entidade de domínio em `packages/core-domain`"_
