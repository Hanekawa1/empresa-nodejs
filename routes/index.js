var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) =>{
    if(error){console.log(error);}
    res.render('index', { title: "Listar Empresas",
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
  res.render('cadastro', {title: "Cadastrar empresa", 
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
      res.redirect('/');
    });
});

router.get('/edit', function(req, res, next){
  res.render('atualizar', { title: "Atualizar uma Empresa", doc: {"nome":"", "endereco":"", "numero":"", "bairro":"", "cidade":"" }, action: '/atualizar'});
});

router.get('/deletar', function(req, res){
  res.render('deletar', {title: "Deletar uma Empresa"});
});

router.get('/edit/:id', function(req, res){
    var id = req.params.id;
    global.db.buscarEmpresaPorId(id, (error, docs) => {
      if(error) { return console.log(error);}
      res.render('cadastro', {title: "Atualizar uma empresa", dadosempresa : docs[0], action: '/edit/' + docs[0]._id});
    });
});

router.get('/funcionario', function(req, res){
  global.db.listarFuncionarios((error, docs) =>{
    if(error){console.log(error);}
    res.render('funcionario', { title: "Cadastrar um Funcionário",
    docs : docs});
  });
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
        res.redirect('/');
      });
});

module.exports = router;
