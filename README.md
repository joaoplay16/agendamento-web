
[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]
# Agendamento Web

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
    <li>
      <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#scripts-disponíveis">Scripts Disponíveis</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o projeto
> Agendamento de procedimentos estéticos online

Agendamento Web  é um sistema de agendamento de horários para serviços de estética. **Demo** https://agendamento-web-mu.vercel.app/

#### 🚧  🚀 Em construção...  🚧

## Tecnologias utilizadas
- [NodeJS](https://nodejs.org/pt-br/)
- [React](https://reactjs.com)
- [Material-UI](https://material-ui.com/pt/)
- [Firebase](http://console.firebase.com)
- [Mercadopago](https://www.mercadopago.com.br/developers/pt/guides)

## Começando
Siga as instruções para conseguir executar o projeto localmente.

### Pré-requisitos
- yarn
`npm install -g yarn`

### Instalação
1. Instale os pacotes
`yarn install`
2. Obtenha as credenciais do mercado pago em: https://www.mercadopago.com.br/developers/panel
3. Renomeie o arquivo** .env.example**  para **.env**
4. Insira as respectivas credenciais 
```
REACT_APP_API_HOST=http://localhost:8088
MP_ACCESS_TOKEN=<ACCESS_TOKEN>
REACT_APP_MP_PUBLISHABLE_KEY=<PUBLIC_KEY>
```

## Scripts disponíveis
No diretório do projeto, você pode rodar:

### `yarn dev`
Executa o projeto no servidor de desenvolvimento.
Abra http://localhost:3000 para visualizar no navegador
### `yarn start`
Irá executar o servidor express que contém a api de pagamento e a build de produção. 
Abra http://localhost:8088 no navegador para visualizar a build de produção.
A rota para a api de pagamentos é a seguinte: http://localhost:8088/process_payment

### `yarn build`
Faz build do aplicativo para produção na pasta** /build.**

## Utilização
Abra um terminal, no diretório do projeto execute `yarn start` para iniciar o servidor da api de pagamentos, em seguida abra outro terminal e execute `yarn dev` para executar o front-end da aplicação

## Licença
Distribuído sob a licença do MIT. Ver `LICENSE` para mais informações.

## Contato
joaoplay16@gmail.com

[linkedin-url]: https://www.linkedin.com/in/joao-pedro-de-freitas/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/joaoplay16/agendamento-web/blob/main/LICENSE.txt

