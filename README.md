# API de Controle Financeiro Pessoal

Atividade da aula 7 de Web Mobile. A API registra receitas e despesas e apresenta métricas de saldo e consumo por impulso, apoiando a educação financeira e os ODS 1 e 12.

## Configuração

1. Instale Node.js e npm. Crie um cluster no MongoDB Atlas, um usuário de banco e autorize seu endereço IP nas configurações de rede do Atlas.
2. Copie `.env.example` para `.env` e substitua `MONGODB_URI` pela string de conexão do Atlas, incluindo usuário, senha e nome do banco. Codifique caracteres especiais da senha na URL. Não publique o `.env`.
3. Execute `npm install` e `npm run start` na pasta do projeto. A API ficará em `http://localhost:3000`.
4. Para verificar o projeto: `npm run build` e `npm test`.

## Requisições

`POST /transacoes` recebe JSON, por exemplo:

```json
{
  "descricao": "Conta de luz",
  "valor": 120.50,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

Use `receita` ou `despesa` no campo `tipo`, um valor positivo com até duas casas decimais e um booleano em `consumoConsciente`. O marcador também é obrigatório para receitas, mas somente despesas marcadas como `false` entram no total gasto por impulso. Dados inválidos recebem resposta HTTP 400.

`GET /transacoes` retorna `{ "historico": [...], "metricas": { "saldoTotal": 0, "totalDespesas": 0, "totalGastoImpulso": 0 } }`, com os valores calculados a partir dos registros cadastrados. Teste ambas as rotas no Postman.

## Entrega

Publique o projeto em um repositório público no GitHub, coloque seu endereço real em `github.txt` e inclua esse arquivo no ZIP junto de `src`, `test`, `package.json`, `tsconfig.json`, `nest-cli.json` e os demais arquivos de configuração necessários. Não inclua `.env`, dependências instaladas ou arquivos compilados.
