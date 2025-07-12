# Padrões de Código e Convenções

## Linguagem

- **Português do Brasil**:  
  Para **comentários**, **nomes de variáveis** e **documentação**.

- **Inglês**:  
  Para **nomes de funções**, **classes**, **métodos** e demais elementos do **código-fonte**.

## Commits

- Utilizar o padrão **[Conventional Commits](https://www.conventionalcommits.org/)**.  
  Exemplo:
  ```bash
  feat(cobranca): adiciona serviço de notificação
  ```

## Nomenclatura

- Serviços do NestJS devem terminar com `Service`  
  Exemplo: `CobrancaService`

- Controladores devem terminar com `Controller`  
  Exemplo: `NotificacaoController`

## Formatação

- Utilizaremos **Prettier** e **ESLint** para padronização do código.
- A **IA deve gerar código que já esteja em conformidade** com as regras definidas nesses formatad