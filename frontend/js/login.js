let resposta = document.getElementById('resposta')
let btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => {
        return res.json()  
    })
    .then((dados) => {
        resposta.innerHTML = `${dados.message}`
        document.querySelector('form').reset()
        if(dados.token){
            localStorage.setItem('token',dados.token)
            localStorage.setItem('nome',dados.nome)
            location.href = '../index.html'
        }
    })
    .catch((err) => {
        console.error("Erro ao logar o usuário", err)
        resposta.innerHTML = "Erro ao logar o usuário"
    })
})