# Teste Duff

Este é um desafio para avaliar minhas habilidades como Backend Developer.

## Tecnologias utilizadas:

1. Nest - https://nestjs.com/
2. Postgres - https://www.postgresql.org/
3. TypeORM - https://typeorm.io/
4. Docker - https://www.docker.com/
5. Swagger - https://swagger.io/
6. RabbitMQ - https://www.rabbitmq.com/

### Funcionalidades:

1. Crie um microserviço para os estilos de cerveja
   Precisamos que crie uma api que possamos listar, cadastrar, deletar e atualizar nossos estilos de cerveja e suas temperaturas(C.R.U.D).

2. Criar um endpoint
   Para nos ajudar a criar nossa máquina cervejeira, desenvolva uma api Restful na qual, dada uma temperatura, ela nos devolva o estilo de cerveja mais adequado para aquela temperatura e uma playlist que contenha o nome desse estilo(use a api do spotify para buscar as playlist).

## Execução do projeto:

### Ferrametas:

- [Docker: para criar as imagens da aplicação](https://www.docker.com/)
- [Docker Compose: para dar start e subir as configurações do docker](https://docs.docker.com/compose/install/)
- [Node.js: para executar os nossos códigos](https://nodejs.org/en/download/)
- [Yarn: para usar como gerenciador de pacotes pro projeto](https://yarnpkg.com/lang/en/docs/install/)

### Instalando:

Para iniciar a instalação é necessário clonar o projeto do GitHub num diretório de sua preferência:

```shell
cd "diretorio de sua preferencia"
git clone https://github.com/vinisco/duff.git
```

Criar um arquivo .env na pasta raiz do projeto utilizando como modelo o arquivo .env.example, _não se esquecer das credenciais do Spotify_.

Com o docker já inicializado, rodar o comando do docker compose pra subir a aplicação:

```shell
docker-compose up -d
```

Para rodar os testes:

```shell
yarn test
```

### Utilizando:

A aplicação estará rodando na porta 4000. Siga a documentação para testar o funcionamento da API:

http:localhost:4000/documentation
