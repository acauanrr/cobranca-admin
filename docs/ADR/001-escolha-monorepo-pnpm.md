ADR 001: Escolha de Estratégia de Repositório - Monorepo com PNPM
Data: 2025-07-07

Status: Aceito

Contexto
O projeto "Sistema de Cobrança Administrativa" é composto por múltiplos serviços interdependentes, incluindo uma API Gateway (backend), um portal para o devedor (frontend), e futuramente, workers para tarefas assíncronas e serviços de IA. Precisamos decidir sobre a melhor estratégia para organizar e gerenciar o código-fonte desses serviços. As principais alternativas são múltiplos repositórios (polyrepo) ou um único repositório (monorepo).

Decisão
Adotaremos a abordagem de monorepo, utilizando o pnpm como gerenciador de pacotes e seu mecanismo de workspaces. Todo o código-fonte para todas as aplicações e pacotes compartilhados residirá em um único repositório Git.

Justificativa
A escolha pelo monorepo foi baseada nos seguintes benefícios para este projeto:

Gerenciamento de Dependências Simplificado: Com o pnpm workspaces, podemos gerenciar todas as dependências do projeto a partir da raiz, garantindo consistência de versões e evitando o "inferno das dependências".

Compartilhamento de Código Facilitado: É trivial criar e compartilhar pacotes entre as aplicações. Por exemplo, podemos ter um pacote core-domain com as entidades e tipos de dados (TypeScript) que será usado tanto pela api-gateway quanto pelo portal-devedor, garantindo um contrato de dados forte e consistente entre frontend e backend.

Refatoração Atômica: Mudanças que afetam múltiplos serviços (por exemplo, alterar um campo em uma entidade de domínio) podem ser feitas em um único commit/pull request. Isso torna a refatoração mais segura e fácil de gerenciar.

CI/CD Unificado: Podemos configurar um único pipeline de CI/CD que orquestra o build, teste e deploy de todas as aplicações, com a capacidade de executar pipelines apenas para os serviços que foram alterados.

Melhor Colaboração e Visibilidade: Todos os desenvolvedores têm visibilidade sobre todo o código do projeto, o que facilita a colaboração e o entendimento da arquitetura como um todo.

Consequências
Configuração Inicial: A configuração inicial do ambiente de desenvolvimento e do pipeline de CI/CD é um pouco mais complexa do que em um polyrepo.

Tamanho do Repositório: Com o tempo, o tamanho do repositório e o tempo de clone/checkout podem aumentar. No entanto, para o escopo deste projeto, isso não é uma preocupação imediata.

Ferramentas: Será necessário o uso de ferramentas que suportem monorepos, como o pnpm e configurações específicas nos pipelines de CI para builds otimizados.
