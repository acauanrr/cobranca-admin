ADR 002: Escolha do Framework de Backend - NestJS
Data: 2025-07-08

Status: Aceito

Contexto
Para o "Sistema de Cobrança Administrativa", precisamos de um framework de backend robusto, escalável e que se integre bem com o ecossistema TypeScript, que é um pilar do projeto para garantir a tipagem forte. O backend servirá como uma API Gateway (BFF - Backend for Frontend), orquestrando chamadas para outros serviços (como a API do SITAC) e expondo dados de forma segura para o portal-devedor.

Decisão
Adotaremos o NestJS como o framework principal para o desenvolvimento da api-gateway e de futuros micro-serviços de domínio.

Justificativa
A escolha pelo NestJS foi baseada nos seguintes pontos-chave:

TypeScript Nativo: NestJS é construído sobre TypeScript desde o início, o que se alinha perfeitamente com nosso requisito de tipagem estrita de ponta-a-ponta. Isso melhora a manutenibilidade e reduz erros em tempo de execução.

Arquitetura Opinativa e Modular: O framework impõe uma arquitetura organizada baseada em Módulos, Controladores e Serviços. Essa estrutura modular facilita a separação de responsabilidades (SoC), o teste e a escalabilidade do código.

Ecossistema Completo: NestJS possui integrações oficiais e bem documentadas para ferramentas essenciais que usaremos, como TypeORM (para comunicação com o PostgreSQL), Swagger/OpenAPI (para documentação de API automática) e Passport.js (para autenticação).

Injeção de Dependência: Seu sistema de Injeção de Dependência facilita a escrita de código desacoplado e altamente testável, o que é uma boa prática de engenharia de software.

Desempenho: Por baixo dos panos, NestJS utiliza frameworks HTTP robustos e rápidos como Express (padrão) ou Fastify, garantindo um ótimo desempenho para a API.

Consequências
Curva de Aprendizagem: Para desenvolvedores não familiarizados com os padrões do NestJS (que são inspirados no Angular), pode haver uma pequena curva de aprendizagem inicial.

Boilerplate: A estrutura opinativa pode gerar um pouco mais de código inicial (boilerplate) para criar módulos e serviços, mas esse custo é compensado pela organização e manutenibilidade a longo prazo.