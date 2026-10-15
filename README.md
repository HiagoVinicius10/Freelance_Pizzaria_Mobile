#  Pizzaria Cardoso — Mobile

Aplicativo mobile desenvolvido para o sistema **Pizzaria Cardoso**, com o objetivo de facilitar o registro e o acompanhamento de pedidos durante o atendimento da pizzaria.

O aplicativo permite que os garçons registrem pedidos diretamente pelo celular, enviando as informações para a API do sistema. Os pedidos ficam disponíveis para acompanhamento no computador da cozinha, facilitando a comunicação entre a equipe e a organização dos atendimentos.

##  Tecnologias utilizadas

- **React Native** — desenvolvimento de interfaces mobile para Android e iOS.
- **TypeScript** — tipagem estática para melhorar a organização e a segurança do código.
- **Expo** — ferramenta que facilita o desenvolvimento, a execução e a construção do aplicativo.
- **StyleSheet** — recurso do React Native utilizado para definir e organizar os estilos dos componentes.
- **Axios** — comunicação HTTP com a API do sistema.
- **Expo Router** — organização da navegação entre as telas do aplicativo.
- **AsyncStorage** — armazenamento local de informações, como o token de autenticação.

##  Funcionalidades

- **Autenticação de usuários:** acesso ao aplicativo por meio de login.
- **Registro de pedidos:** permite que os garçons registrem pedidos pelo celular.
- **Integração com a API:** envio e recebimento de informações do sistema.
- **Acompanhamento dos pedidos:** integração com o fluxo de pedidos exibidos na cozinha.
- **Gerenciamento de sessão:** armazenamento e utilização do token de autenticação para acessar os recursos protegidos da API.
- **Interface mobile:** telas desenvolvidas para facilitar a utilização do sistema durante o atendimento.

##  Pré-requisitos

Antes de executar o projeto, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go/) ou um emulador Android configurado.
- A API do sistema Pizzaria Cardoso configurada e em execução.

##  Como executar o projeto

**1. Clone o repositório**

```bash
git clone URL_DO_SEU_REPOSITORIO
```

**2. Entre na pasta do projeto**

```bash
cd NOME_DA_PASTA
```

**3. Instale as dependências**

```bash
npm install
```

**4. Configure a URL da API**

Verifique o arquivo de configuração da API do projeto e configure o endereço do Back-end.

Se estiver utilizando um emulador Android padrão do Android Studio, o endereço `http://10.0.2.2:3333` permite acessar, a partir do emulador, um servidor executado na porta `3333` do computador.

Caso utilize um celular físico, será necessário configurar o endereço IP local do computador, mantendo o celular e o computador na mesma rede Wi-Fi.

Ajuste a URL conforme a configuração real do seu Back-end.

**5. Inicie o Expo**

```bash
npx expo start
```

Depois, siga as instruções exibidas no terminal para abrir o aplicativo no ambiente de desenvolvimento disponível.

##  Integração com o Back-end

O aplicativo utiliza uma API REST para realizar a autenticação e enviar as informações dos pedidos.

A comunicação entre o Mobile, o Back-end e a interface utilizada na cozinha permite centralizar os dados e manter o fluxo de atendimento integrado.

##  Objetivo do projeto

Desenvolver uma aplicação mobile integrada a um sistema de gerenciamento para pizzaria, aplicando conhecimentos de React Native, TypeScript, navegação entre telas, autenticação, consumo de APIs e estilização de interfaces.

## 👨 Desenvolvedor

**Hiago Vinicius dos Santos Antônio**

- LinkedIn: https://www.linkedin.com/in/hiago-vinicius-desenvolvedor/

---

*Projeto desenvolvido para fins profissionais e de demonstração de conhecimentos em desenvolvimento mobile e integração com APIs.*