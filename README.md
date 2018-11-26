# Blood Glucose Control

![BGC](https://firebasestorage.googleapis.com/v0/b/blood-glucose-control.appspot.com/o/imgs%2Flogo.png?alt=media&token=77e76cc0-101d-47b6-a05e-2a9796dcc747)

[![N|Ionic](https://firebasestorage.googleapis.com/v0/b/blood-glucose-control.appspot.com/o/imgs%2FPOWERED%20BY%20(2).png?alt=media&token=485f9cf2-4b53-4fe9-9c1a-a7e9a8a81c8a)](https://ionicframework.com)
Blood Glucose Control (BGC) é um software que gerencia as medições de glicemia do usuário, fornecendo ferramentas como: relatórios, listagem dos registros com filtros inteligentes, adições de forma simples. Ainda está em sua fase inicial.

# Novas funções!

  - Relatórios: mensais, anuais e semanais:
  -- Veja detalhes avançados sobre medições por turno;
-- Gerador de média de todos os registros de acordo com o relatório;
-- Indicadores de níveis de glicemia acima e abaixo do normal;
  - Paginação com infinite scroll na aba de medições.
  - 3 novos filtros adicionados na pesquisa:
  -- Por turno;
-- Por data;
-- Por nível (alto, médio e baixo).
-- Layout da tela de registros melhorado, abaixo as implementações:
-- Visual melhorado;
-- Ordenamento por data;
-- Infinite scroll;
- Tela de detalhe do registro com melhorias:
-- Linguística dos itens melhorado;
-- Agora nas datas do registro é mostrado o dia da semana.

### Instalação
Instale as dependencias e inicie o servidor.

```sh
$ npm install -g ionic
$ npm install
$ ionic serve
```
O servidor por padrão iniciará em localhost na porta 8100, para alterações de url consulte a documentação oficial do Ionic: 
https://ionicframework.com/docs/

Para compilar para navegador(web)...

```sh
$ npm install -g ionic
$ npm install
$ ionic build web
```
Será gerado uma pasta chamada "www" com os respectivos arquivos web.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
