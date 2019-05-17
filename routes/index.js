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

router.get('/cadastro', function(req, res) {
  global.db.listarEmpresas((error, docs) =>{
    if(error){console.log(error);}
    res.render('cadastro', { title: "Cadastrar Empresas",
    docs : docs});
  });
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

router.get('/atualizar', function(req, res, next){
  res.render('atualizar', { title: "Atualizar uma Empresa", doc: {"nome":"", "endereco":"", "numero":"", "bairro":"", "cidade":"" }, action: '/atualizar'});
});

router.get('/deletar', function(req, res){
  res.render('deletar', {title: "Deletar uma Empresa"});
});

router.get('/atualizar/:id', function(req, res, next){
    var id = req.params.id;
    global.db.findOne(id, (error, resultado) => {
      if(error) { return console.log(error);}
      res.render('/atualizar', {title: "Atualizar uma empresa", doc: resultado[0], action: '/atualizar/' + resultado[0]._id});
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
