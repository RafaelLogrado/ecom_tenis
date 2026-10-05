// let login_usuario = document.getElementById('login_usuario')
// let login_produto = document.getElementById('login_produto')
// let login_movimento = document.getElementById('login_movimento')
let token = localStorage.getItem('token')
let nome = localStorage.getItem('nome')

if(token){
    if(document.getElementById('login_usuario')){
        document.getElementById('login_usuario').innerHTML = `
        <a href="./html/usuario_listar.html">Listar</a>&emsp;
        <a href="./html/usuario_consultar.html">Consultar</a>&emsp;
        <a href="./html/usuario_atualizar.html">Atualizar</a>&emsp;
        <a href="./html/usuario_apagar.html">Apagar</a>
        <a href="#" id="btn_logout">Logout</a>&emsp; 
        <span class="titulo_menu">&emsp; Usuário: ${nome}</span>
        `
    }
    if(document.getElementById('login_produto')){
        document.getElementById('login_produto').innerHTML = `
        <span class="titulo_menu">Produtos</span>&emsp;
        <a href="./html/produto_cadastrar.html">Cadastrar</a>&emsp;
        <a href="./html/produto_listar.html">Listar</a>&emsp;
        <a href="./html/produto_consultar.html">Consultar</a>&emsp;
        <a href="./html/produto_atualizar.html">Atualizar</a>&emsp;
        <a href="./html/produto_apagar.html">Apagar</a>
        <br><br><hr><br>
        `
    }
    if(document.getElementById('login_movimento')){
        document.getElementById('login_movimento').innerHTML = `
        <span class="titulo_menu">Operações</span>&emsp;
        <a href="./html/movimento_cadastrar.html">Cadastrar Movimento</a>&emsp;
        <a href="./html/movimento_listar.html">Listar Movimento</a>&emsp;
        <a href="./html/mov_categoria_listar.html">Listar Por Categoria</a>
        <a href="./html/mov_historico_saida.html">Listar Historico Saídas</a>
        <br><br><hr><br><br><br>
        `
    }

    let btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.clear()
        location.reload()
    })
}else{
    login_usuario.innerHTML = ``
    login_produto.innerHTML = ``
    login_movimento.innerHTML = ``
}