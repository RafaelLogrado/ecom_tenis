// Código responsável pelo login do usuário

const Usuario = require('../models/Usuario')

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'proletariado'

const login = async (req,res) => {
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const usuario = await Usuario.findOne({where: {email: valores.email}})
        if(!usuario){
            return res.status(404).json({message: "Usuário não encontrado!"})
        }

        const bytes = cryptoJS.AES.decrypt(usuario.senha, CHAVE_SECRETA)
        const senha = bytes.toString(cryptoJS.enc.Utf8)

        if(valores.senha !== senha){
            return res.status(401).json({message: "Senha e/ou email incorretos!"})
        }

        const horas = 1.5 * 3600000
        const tempoExpiracao = Date.now() + horas

        const payload = {
            idUsuario: usuario.codUsuario,
            nome: usuario.nome,
            expiraEm: tempoExpiracao
        }

        const token = cryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            nome: usuario.nome,
            token: token
        })

    }catch(err){
        res.status(500).json({message: "Não foi possível fazer login"})
        console.error("Não foi possível fazer login", err)
    }
}

module.exports = { login }