var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) =>{
    if(error){console.log(error);}
    res.render('index', { title: "Gerenciar Empresas",
    docs : docs});
  });
});
/*
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) =>{
    if(error){console.log(error);}
    res.render('cadastro', { title: "Cadastrar Empresas",
    dadosempresa: {nome: "", logradouro: "", numero: "", bairro: "", cidade: ""},
    docs : docs});
  });
});
*/
router.get('/cadastro', function(req, res){
  res.render('cadastro', {title: "Cadastrar uma Empresa", 
              dadosempresa: {nome: "", logradouro: "", numero: "", bairro: "", cidade: ""}, 
              action: '/cadastro' });
});

router.post('/cadastro', function(req, res){
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var numero = parseInt(req.body.numero);
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    global.db.cadastrarEmpresas({ nome, endereco, numero, bairro, cidade }, (error, resultado) => {
      if(error){ return console.log(error);}
      res.redirect('/listarEmpresas');
    });
});

router.post('/edit/:id', function(req, res){
  var id = req.params.id;
  var nome = req.body.nome;
  var endereco = req.body.endereco;
  var numero = parseInt(req.body.numero);
  var bairro = req.body.bairro;
  var cidade = req.body.cidade;
  global.db.atualizarEmpresa(id, { nome, endereco, numero, bairro, cidade }, (error, resultado) => {
    if(error){ return console.log(error);}
    res.redirect('/listarEmpresas');
  });
});

router.get('/edit/:id', function(req, res){
    var id = req.params.id;
    global.db.buscarEmpresaPorId(id, (error, docs) => {
      if(error) { return console.log(error);}
      res.render('cadastro', {title: "Atualizar uma empresa", dadosempresa : docs[0], action: '/edit/' + docs[0]._id});
    });
});

router.get('/deletar/:id', function(req, res){
    var id = req.params.id;
    global.db.deletarEmpresa(id, (error, docs) => {
      if(error) { return console.log(error);}
      res.redirect('/');
    })
})

router.get('/funcionario', function(req, res){
    res.render('funcionario', { title: "Cadastrar um Funcionário",
    dadosfuncionario: {nome: "", matricula: "", rg: "", cpf: "", rua: "", numero: "", bairro: "", cidade: ""}, 
    action: '/funcionario' });
});

router.post('/funcionario', function(req, res){
    var nome = req.body.nomeFuncionario;
    var matricula = req.body.matricula;
    var rg = req.body.rg;
    var cpf = req.body.cpf;
    var rua = req.body.rua;
    var numero = req.body.numero;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;

    global.db.inserirFuncionario(
      {nome, matricula, rg, cpf, rua, numero, bairro, cidade},
      (error, resultado) => {
        if(error){ return console.log(error);}
        res.redirect('/listarFunc');
      });
});

router.get('/listarFunc', function(req, res){
  global.db.listarFuncionarios((error, docs) =>{
    if(error){console.log(error);}
    res.render('listarFunc', { title: "Lista de Funcionários já cadastrados",
    docs : docs});
  });

});
router.get('/listarEmpresas', function(req, res) {
  global.db.listarEmpresas((error, docs) =>{
    if(error){console.log(error);}
    res.render('listarEmpresas', { title: "Lista de Empresas já cadastradas",
    docs : docs});
  });
});

router.get('/funcedit/:id', function(req, res){
  var id = req.params.id;
  global.db.buscarFuncionarioPorId(id, (error, docs) => {
    if(error) { return console.log(error);}
    res.render('funcionario', {title: "Editar um funcionário", 
    dadosfuncionario : docs[0], action: '/funcedit/' + docs[0]._id});
  });
});

router.post('/funcedit/:id', function(req, res){
  var id = req.params.id;
  var nome = req.body.nomeFuncionario;
  var matricula = req.body.matricula;
  var rg = req.body.rg;
  var cpf = req.body.cpf;
  var rua = req.body.rua;
  var numero = req.body.numero;
  var bairro = req.body.bairro;
  var cidade = req.body.cidade;
  global.db.atualizarFuncionario(id, { nome, matricula, rg, cpf, rua, numero, bairro, cidade }, 
    (error, resultado) => {
    if(error){ return console.log(error);}
    res.redirect('/listarFunc');
  });
});

router.get('/funcdeletar/:id', function(req, res){
  var id = req.params.id;
  global.db.deletarFuncionario(id, (error, docs) => {
    if(error) { return console.log(error);}
    res.redirect('/listarFunc');
  })
})

module.exports = router;
