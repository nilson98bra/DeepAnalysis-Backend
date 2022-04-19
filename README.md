# Deep Analysis

## Rotas

### User

#### Cadastro do E-mail

- POST: /user/cadEmail/

_Body_

```javascript
{
  "email": "nilson@nilson.com"
}

```

#### Enviar código de verificação

- POST: /user/sendVerifCode/

_Body_

```javascript
{
  "email": "nilson@nilson.com"
}

```

#### Verificação de Código

- POST: /user/verifyCode

_Body_

```javascript
{
  "email": "nilson@nilson.com",
  "code": "146987"
}

```

#### Refresh Token

- POST: /user/auth/refreshToken

_Body_

```javascript
{
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0zNzJlLTQzNmMtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDMwMjM1MCwiZXhwIjoxNjUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM"
}

```

#### Informar nome e telefone

- PATCH: /user/auth/refreshToken

_Body_

```javascript
{
    "nameUser": "Nilson Santos",
    "phone": "13 991179467"
}

```

#### Informar nome e telefone

- PATCH: /user/nameAndPhone

_Body_

```javascript
{
    "nameUser": "Nilson Santos",
    "phone": "13 991179467"
}

```

#### Cadastrar preferências do usuário

- PATCH: /user/cadUserEspec

_Body_

```javascript
{
   "notifyInitBathymetry": true,
   "notifyEndBathymetry": true,
   "notifyObstacle": false
}

```


### Route

#### Cadastrar Rota

- POST: /route/cadRoute

_Body_

```javascript
{
    "lt":{
        "type":"Point",
        "coordinates":[-46.332200, -23.961800]
        },
    "rt":{
        "type":"Point",
        "coordinates":[-46.332200, -23.961886]
        },
    "lb":{
        "type":"Point",
        "coordinates":[-46.332200, -23.961800]
        },
    "rb":{
        "type":"Point",
        "coordinates":[-46.332200, -53.961822]
        }
}

```


#### Selecionar uma rota

- GET: /route/:_id

#### Selecionar todas as rotas

- GET: /route/getAllRoutes

### Deep

#### Cadastrar Profundidade

- POST: /deep/cadDeep

_Body_

```javascript
{
    "coordinate":{
        "type":"Point",
        "coordinates":[-46.39744, -23.98753]
    },
    "value": 1000,
    "idRoute":"552a0c63-c62f-4813-a72e-b204d737d703"
}

```
 
#### Selecionar todas as profundidades da rota

- GET: /route/:_idRoute





