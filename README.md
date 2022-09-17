## Instruções:
- rodar o comando `docker-compose up`
- rodar o comando `docker exec -it <containerIdbackend> npx sequelize db:migrate`
- rodar o comando `docker exec -it <containerIdbackend> npx sequelize-cli db:seed:all`
- apos rodar as migrations é necessário reiniciar os containers encerrando o terminal e rodando docker-compose up novamente
- abrir no navegador a url http://localhost:3021