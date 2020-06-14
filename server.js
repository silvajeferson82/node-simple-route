const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

//Função para gerenciar rotas.
const rotear = function (pathname) {
  if (pathname && pathname !== '/') {
    const arquivo = path.join(__dirname, `${pathname}.html`);
    const existe = fs.existsSync(arquivo);
    if (existe) {
      return arquivo;
    }
    return path.join(__dirname, 'erro.html');
  }
  return path.join(__dirname, 'artigos.html');
};

//Iniciando server
const server = http.createServer((request, response) => {
  //Obtendo o pathname digitando 
  const pathname = url.parse(request.url).pathname;
  //processando o roteamento do pathname
  const pagina = rotear(pathname);
  //Renderizar pagina
  fs.readFile(pagina, (err, html) => {
    response.writeHeader(200, { 'Content-Type': 'text/html' });
    response.end(html);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando em localhost:3000');
});
