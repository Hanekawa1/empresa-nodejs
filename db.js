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

function deletarEmpresa(id, callback){
    global.conn.collection("dadosempresa").deleteOne({_id: new ObjectId(id)}, callback);
}

function atualizarEmpresa(id, dados, callback){
    global.conn.collection("dadosempresa").updateOne({_id: new ObjectId(id)},
        {$set : {
            nome: dados.nome, 
            endereco: dados.endereco, 
            numero: dados.numero,
            bairro: dados.bairro,
            cidade: dados.cidade }}, callback
    );
}

function inserirFuncionario(dados, callback){
    global.conn.collection("dadosfuncionario").insert(dados, callback);
}

function listarFuncionarios(callback){
    global.conn.collection("dadosfuncionario").find({}).toArray(callback);
}

function buscarFuncionarioPorId(id, callback){
    global.conn.collection("dadosfuncionario").find(new ObjectId(id)).toArray(callback);
}

function deletarFuncionario(id, callback){
    global.conn.collection("dadosfuncionario").deleteOne({_id: new ObjectId(id)}, callback);
}
function atualizarFuncionario(id, dados, callback){
    global.conn.collection("dadosfuncionario").updateOne({_id: new ObjectId(id)},
        {$set: {
            nome: dados.nome,
            matricula : dados.matricula,
            rg : dados.rg,
            cpf : dados.cpf,
            rua : dados.rua,
            numero : dados.numero,
            bairro : dados.bairro,
            cidade : dados.cidade
        }}, callback
    );
}

module.exports = { 
    listarEmpresas, 
    cadastrarEmpresas, 
    buscarEmpresaPorId, 
    deletarEmpresa, 
    atualizarEmpresa, 
    inserirFuncionario,
    listarFuncionarios,
    buscarFuncionarioPorId,
    deletarFuncionario,
    atualizarFuncionario
}
