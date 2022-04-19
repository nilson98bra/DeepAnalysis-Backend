# Deep Analysis

## Rotas

### User

#### Cadastro do e-mail

- POST: /user/cadEmail

_Body_

```javascript
{
  "email": "teste.00@hotmail.com"
}

```

_Response 201_

```javascript
{
  "message":"Código de verificação enviado."
}

```

#### Enviar código de verificação

- POST: /user/sendVerifCode

_Body_

```javascript
{
  "email": "teste.00@hotmail.com"
}

```

_Response 200_

```javascript
{
  "message":"Código de verificação enviado."
}

```

#### Checagem do código de verificação

- POST: /user/verifyCode

_Body_

```javascript
{
  "email": "teste.00@hotmail.com",
  "code": "146987"
}

```

_Response 200_

```javascript
{
  "token":"eyJhbterti9-tfgdgekpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0saydashiesdfhsihdfdshwelwwtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM",
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0zNzJlLTQzNmMtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDMwMjM1MCwiZXhwIjoxNjUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM"
}

```

#### Login

- POST: /user/login

_Body_

```javascript
{
  "email": "teste.00@hotmail.com"
}

```

_Response 200_

```javascript
{
  "message":"Código de verificação enviado."
}

```

#### Refresh token

- POST: /user/auth/refreshToken

_Body_

```javascript
{
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0zNzJlLTQzNmMtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDMwMjM1MCwiZXhwIjoxNjUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM"
}

```
_Response 200_

```javascript
{
  "token":"eyJhbterti9-tfgdgekpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0saydashiesdfhsihdfdshwelwwtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM",
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhMWNiYmZhOS0zNzJlLTQzNmMtOGM2Ny01MmU2MzA1NGU2NzciLCJlbWFpbCI6Im5pbHNvbi45OEBob3RtYWlsLmNvbSIsImlhdCI6MTY1MDMwMjM1MCwiZXhwIjoxNjUwNjYyMzUwfQ.q02uCOWJ_YsrJsGgZUZMeRE2QlHcYDN_1_JUbc_XEnM"
}

```

#### Informar nome e telefone

- PATCH: /user/nameAndPhone

_Body_

```javascript
{
    "nameUser": "Fulano",
    "phone": "(13) 99117-9467"
}

```

_Response 200_

```javascript
{
  "message":"Nome e telefone atualizados."
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

_Response 200_

```javascript
{
  "message":"Preferências atualizadas."
}

```


### Route

#### Cadastrar rota

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

_Response 201_

```javascript
{
  "message":"Rota criada."
}

```


#### Selecionar uma rota

- GET: /route/:_id

_Response 200_

```javascript

{
    "data": {
        "coordinateLT": {
            "type": "Point",
            "coordinates": [
                -46.332222,
                -23.961822
            ]
        },
        "coordinateRT": {
            "type": "Point",
            "coordinates": [
                -46.332222,
                -23.961822
            ]
        },
        "coordinateLB": {
            "type": "Point",
            "coordinates": [
                -46.332222,
                -23.961822
            ]
        },
        "coordinateRB": {
            "type": "Point",
            "coordinates": [
                -46.332222,
                -53.961822
            ]
        },
        "_id": "552a0c63-c62f-4813-a72e-b204d737d703",
        "date": "2022-04-18T02:12:41.598Z",
        "userId": "a1cbbfa9-372e-436c-8c67-52e63054e677"
    }
}

```

#### Selecionar todas as rotas

- GET: /route/getAllRoutes

_Response 200_

```javascript

{
    "data": [
        {
            "coordinateLT": {
                "type": "Point",
                "coordinates": [
                    -46.332222,
                    -23.961822
                ]
            },
            "coordinateRT": {
                "type": "Point",
                "coordinates": [
                    -46.332222,
                    -23.961822
                ]
            },
            "coordinateLB": {
                "type": "Point",
                "coordinates": [
                    -46.332222,
                    -23.961822
                ]
            },
            "coordinateRB": {
                "type": "Point",
                "coordinates": [
                    -46.332222,
                    -53.961822
                ]
            },
            "_id": "552a0c63-c62f-4813-a72e-b204d737d703",
            "date": "2022-04-18T02:12:41.598Z",
            "userId": "a1cbbfa9-372e-436c-8c67-52e63054e677"
        },
        {
            "coordinateLT": {
                "type": "Point",
                "coordinates": [
                    -46.3322,
                    -23.9618
                ]
            },
            "coordinateRT": {
                "type": "Point",
                "coordinates": [
                    -46.3322,
                    -23.96187
                ]
            },
            "coordinateLB": {
                "type": "Point",
                "coordinates": [
                    -46.3322,
                    -23.9618
                ]
            },
            "coordinateRB": {
                "type": "Point",
                "coordinates": [
                    -46.3322,
                    -53.961822
                ]
            },
            "_id": "5fb0d6d0-dfde-4044-8972-8dd169ce6857",
            "date": "2022-04-19T18:49:44.368Z",
            "userId": "a1cbbfa9-372e-436c-8c67-52e63054e677"
        }
    ]
}

```

### Deep

#### Cadastrar profundidade

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

_Response 201_

```javascript
{
  "message":"Profundidade cadastrada."
}

```
 
#### Selecionar todas as profundidades da rota

- GET: /route/:_idRoute

_Response 200_

```javascript
{
    "data": [
        {
            "coordinate": {
                "type": "Point",
                "coordinates": [
                    -46.39744,
                    -23.98753
                ]
            },
            "_id": "4becfcd0-74da-4a26-9e10-ceb3c16ae8cc",
            "value": 1000,
            "idRoute": "552a0c63-c62f-4813-a72e-b204d737d703"
        }
    ]
}

```



