var conexao = require("mongodb").MongoClient;

conexao.connect("mongodb://localhost/empresa")
.then(conn => global.conn = conn.db("empresa"))
.catch(error => console.log(error))

function listarEmpresas(callback){
    global.conn.collection("dadosempresa").find({}).toArray(callback);
}

function cadastrarEmpresas(dados, callback){
    global.conn.collection("dadosempresa").insert(dados, callback);
}

var ObjectId = require("mongodb").ObjectId;

function buscarEmpresaPorId(id, callback){
    global.conn.collection("dadosempresa").find(new ObjectId(id)).toArray(callback);
}

function deletarEmpresa(dados, callback){
    global.conn.collection("dadosempresa").remove({dados}).toArray(callback);
}

function atualizarEmpresa(dados, callback){
    global.conn.collection("dadosempresa").update(dados, callback);
}

function inserirFuncionario(dados, callback){
    global.conn.collection("dadosfuncionario").insert(dados, callback);
}

function listarFuncionarios(callback){
    global.conn.collection("dadosfuncionario").find({}).toArray(callback);
}

module.exports = { 
    listarEmpresas, 
    cadastrarEmpresas, 
    buscarEmpresaPorId, 
    deletarEmpresa, 
    atualizarEmpresa, 
    inserirFuncionario,
    listarFuncionarios
}
