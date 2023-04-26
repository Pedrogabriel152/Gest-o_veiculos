# Gestao_veiculos

Nesse projeto para o Frontend decidi usar React.js com Typescript utilizando o react na versão 18.2.0

Algumas das dependências do Front:

    - "node": v19.8.1, utilizada para instalar as dependências,
    - "axios": "^1.3.5", utilizada para realizar a comunicação com o back,
    - "react-icons": "^4.8.0", utilizada para adicionar o icons utilizados,
    - "react-router-dom": "^6.10.0", utlizada para criar as rotas do front,
    - "react-toastify": "^9.1.2", utilizada para exibir os alertas customizados

Já para o Backend decidi utilizar o framework Laravel para facilitar no desenvolvimente e ate um possível expanção da aplicação futura.

Suas dependencias são:

    - "php": "7.4", como foi solicitado para o desenvolvimento do projeto,
    
    - "composer", é utilizado para instalar as dependência necessárias do backend,

    - O resto das dependências são as necessária para que o próprio Laravel necessita para funcinar
    
  
  # Colocando o projeto para rodar 
  
  Primeiro deve-se instalar o MySQL, Node e o PHP 7.4 no computador, após isso suba o serviço do MySQL e execute o seguinte comando 
  
    - CREATE DATABASE veiculos;
    
  Com o banco criado agora abra a pasta server no terminal e execulte o seguinte comando
  
    - composer install
  
  Esse comando irá instalar as dependências do projeto no backend. Após insstalada todas as dependências execute este comando e não feche o terminal.
  
    - php artisan serve
    
   Agora se tem a aplicação backend funcionando, faltando somente colocar pro frontend funcionar.
   
   Para isso abra um novo terminal agora na pasta client e execute o comando:
   
    - npm install
   
   Esse comando irá instalar as dependências do projeto no frontend. Após insstalada todas as dependências execute este comando e não feche o terminal.
    
    - npm start
    
    
   Feito todos esses passos você irá conseguir mexer na aplicação.
  
