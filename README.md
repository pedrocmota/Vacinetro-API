# Carteira de vacinação digital - API

Faz anos que a sociedade em geral pede ao Governo Federal para desenvolver uma carteira de vacinação digital. Pense o quão mais fácil ficaria a vida caso houvesse, em um único app, todas suas informações de vacinação, sem precisar levar uma caderneta de uma lado para o outro - muitas vezes a perdendo-a.

É pensando nisso que este app é desenvolvido!
\
\
Este app é apenas um experimento em versão alpha, sendo aberto a qualquer tipo de contribuição

## Link dos respositórios

Aplicativo WEB: [Repositório](https://github.com/pedrocmota/SuaCarteiraVacinas-Web)
\
Aplicativo mobile: [Repositório](https://github.com/pedrocmota/SuaCarteiraVacinas-App)

## Instalação API

```bash
git clone https://github.com/pedrocmota/SuaCarteiraVacinas-API
cd SuaCarteiraVacinas-API
npm install
```

## Uso

* É necessário colocar o App Web após o build dentro da pasta "app"
* Pode ser necessário editar as variáveis de ambiente no arquvo .env
* Após a configuração, use:

```bash
npm run dev
```

Ou caso, esteja em modo de produção:

```bash
npm run start
```


## Variáveis de ambiente
Um arquivo de variáveis de ambiente está no repositório
\
| Variável     | Descrição                                                                  | Valor padrão      |
|--------------|----------------------------------------------------------------------------|-------------------|
| PORT         | A porta onde a API irá rodar                                               | 80                |
| X_POWERED_BY | Se a API vai retornar o cabeçalho X-POWERED_BY                             | false             |
| CORS         | Se o mecanismo de CORS deverá ser ativado                                  | true              |
| DEV_DELAY    | Delay (em ms) em cada requisição (Funciona apenas em dev)                  | 200               |
| INFO         | Se o servidor irá retornar informações no terminal após sua inicialização  | true              |
| JWT_KEY      | Chave do JWT (tome cuidado com essa chave)                                 | BOLSONAROGENOCIDA |

## Banco de dados

O projeto utiliza um DB sqlite no próprio endereço da aplicação
\
O banco possui dados fictício de teste, caso queira, apague-os

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
