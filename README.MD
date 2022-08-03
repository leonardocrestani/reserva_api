# API REST Reserva de quadras

## Descrição do projeto
<p> O projeto contempla a criação de uma API REST utilizando o modelo de Clean Architecure e Clean Code para reserva de quadras esportivas possuindo endpoints para cadastro de usuários e autenticação utilizando JWT, cadastro de locais, quadras e horários além de reserva de horários em quadras e locais especificos. Para a construção foram utilizadas ferramentas como NodeJS com TypeScript e expressJS e para banco de dados mongoDB com container docker para subida da aplicação </p>

## Features
### Autenticação
- Autenticação na aplicação com token JWT
- Usuário autentica com email e senha
### Usuários
- Cadastro de um novo usuário
    - Quando um novo usuário for cadastrado vai receber o token de autenticação automaticamente para continuar e fazer outras requisições na página
    - Possui validações de CPF, email e demais campos    
- Listagem de um usuário pelo seu email
- Procura de um usuário cruzando email e senha para validar e autenticar
- Atualização das informações de um usuário
- Exclusão de um usuário
### Locais
- Cadastro de um novo local
    - O cadastro de um novo local pode contar com quadras iniciais ou podem ser cadastradas posteriormente
    - Possui validações de CNPJ, CEP e demais campos
- Listagem de um local pelo nome
- Listagem de todos os locais cadastrados
- Atualização das informações de um local
- Exclusão de um local
### Quadras
- Cadastro de um nova quadra
    - O cadastro de um nova quadra sempre vai estar conectado a um local que a quadra pertence
    - As quadras possuem horarios que são criados posteriormente pelo endpoint de "schedules"
- Listagem de quadras pelo id
- Atualização do nome de uma quadra
- Exclusão de uma quadra
### Horários
- Cadastro de um novo horário
    - O cadastro de um novo horário vai pertencer a uma quadra e deve respeitar as validações de horário do local, sendo possível cadastrar um horário a cada hora
    - O horário possui ligação com e sempre vai pertencer a uma determinada quadra, e após ele ser reservado vai pertencer ao usuário que reservou
- Listagem de horários pelo id
- Exclusão de um horário
- Reserva de um horário
    - A reserva de horário é feita por um usuário e assim aquele horário vai pertencer a ele e possuir a "flag" que está reservado

## Instalação local
Para instalação local é preciso trocar o DATABASE_URL no arquivo .env para a URL do mongoDB da sua máquina, as collections serão geradas automaticamente pelo prisma, é necessário ter o mongoDB instalado na máquina ou utilizar o mongoDB Atlas<br>

Instalar dependências
```bash
npm install
```

Compilar o projeto <br>
```bash
npm run build
```

Executar aplicação <br>
Após a compilação o arquivo compilado de TS para JS vai ser criado na pasta "/dist" e assim disponível para execução
```bash
npm run start
```

Localmente a API pode ser inicializada com o comando de desenvolvimento onde não é feita a compilação do código TypeScript
```bash
npm run dev
```
> A API estará disponível na URL http://localhost:3000

## Testes
- Testes locais unitarios foram implementados mas não estão completamente funcionais e precisam de correções
Rodar testes
```bash
npm run test:unit
```
> Os testes serão rodados localmente utilizando "in memory test" e os resultados mostrados

## Endpoints

### Autenticação
- (POST) Autenticação '/api/auth'

### Usuários
- (POST) Cadastro '/api/users'
- (GET) Listagem de um usuário pelo email '/api/users/:email'
- (PUT) Autenticação dos dados de um usuario '/api/users/:email'
- (DELETE) Exclusão de um usuario 'api/users/:email'

### Locais
- (POST) Cadastro '/api/places'
- (GET) Listagem de um local pelo nome '/api/places/:name'
- (GET) Listagem de todos os locais '/api/places?limit=&offset='
- (PUT) Atualização dos dados de um local '/api/places/:name'
- (DELETE) Exclusão de um local '/api/places/:name'

### Quadras
- (POST) Cadastro 'api/courts'
- (GET) Listagem de uma quadra pelo id 'api/courts/:id'
- (PUT) Atualização do nome de uma quadra '/api/courts/:id'
- (DELETE) Exclusão de uma quadra '/api/courts/:id'

### Horários
- (POST) Cadastro 'api/schedules'
- (GET) Listagem de um horário pelo id 'api/schedules/:id'
- (PUT) Reserva de um horario 'api/schedules/book/:id'
- (DELETE) Exclusão de um horario '/api/schedules/:id'
