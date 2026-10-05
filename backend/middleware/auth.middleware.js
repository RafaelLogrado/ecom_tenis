// Código middleware de autorização ao entrar em qualquer página privada

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'proletariado' // deve ficar no arquivo .env

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: "Acesso negado! Faça o login."})
    }
    
    try{
        const bytes = cryptoJS.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(cryptoJS.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(403).json({message: "Acesso proibido"})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now() > payload.expiraEm){
            res.status(401).json({message: "Tempo expirado. Refaça o login."})
        }

        req.usuario = payload

        next()
    }catch(err){
        res.status(401).json({message: "Falha na autenticação"})
        console.error('Falha na autenticação', err)
    }
}

module.exports = authMiddleware