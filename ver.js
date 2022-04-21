const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
    localStorage.setItem("todoList", JSON.stringify(banco));

const atualizarRel = () => {
    let relogio = document.querySelector('.relogio')
    let diaSem = document.querySelector('.diasem')
    let diasemana = document.querySelector('.semana')



    var horariop = new Date()
    var DiaSemana = horariop.getDay()
    var diaS = corrigir(horariop.getDate()) + '/' + corrigir(horariop.getMonth() + 1) + '/' + corrigir(horariop.getFullYear())
    var horariog = corrigir(horariop.getHours()) + ':' + corrigir(horariop.getMinutes()) + ':' + corrigir(horariop.getSeconds())
    relogio.innerHTML = horariog
    diaSem.innerHTML = diaS
    diasemana.innerHTML = DiaSemana
    switch (DiaSemana) {
        case 4:
            diasemana.innerHTML = 'QUI'
            break;

        case 5:
            diasemana.innerHTML = 'SEX'
            break
        case 6:
            diasemana.innerHTML = 'SAB'
            break
        case 7:
            diasemana.innerHTML = 'DOM'
            break
        case 8: 
            diasemana.innerHTML = 'SEG'
            break
        case 9:
            diasemana.innerHTML = 'TER'
            break
        case 10:
            diasemana.innerHTML = 'QUA'
            break
    }
}


setInterval(atualizarRel)



const corrigir = (numero) => {
    if (numero < 10) {
        numero = "0" + numero;
    }
    return numero;
};

function create(item, indice) {
    // obtem as partes do item (date, status, tarefa)
    const { date, status, tarefa } = item;
    var div = document.createElement("label");
    div.classList.add("todo_item");

    // cria a data a partir do objeto date do localStorage
    let hora = new Date(date);
    let data =
        corrigir(hora.getDate()) +
        "/" +
        corrigir(hora.getMonth() + 1) +
        "/" +
        hora.getFullYear();
    let horas = corrigir(hora.getHours());
    let minutes = corrigir(hora.getMinutes());
    let seconds = corrigir(hora.getSeconds());

    div.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div class="tarefa">${tarefa}</div>
        <div class="hora">Tarefa criada em: ${data} ás ${horas}:${minutes}:${seconds}</div>
        <input class="btn" type="button" value="" data-indice=${indice}>
        `;

    document.querySelector(".list").appendChild(div);
}

function limparTarefas() {
    var todoList = document.getElementById("list");
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

function atualizarTela() {
    limparTarefas();
    const banco = getBanco();
    // passa o item em vez de cada parte dele
    banco.forEach((item, indice) => create(item, indice));
}

function cadastrarTarefa(evento) {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === "Enter") {
        const banco = getBanco();
        // inclui o date na tarefa armazenada no localStorage
        banco.push({ date: new Date(), tarefa: texto, status: "" });
        setBanco(banco);
        atualizarTela();
        evento.target.value = "";
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
};
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
};
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
    console.log(elemento);
};

// Inicialização
document.getElementById("newtarefa")
    .addEventListener("keypress", cadastrarTarefa);
document.querySelector(".list").addEventListener("click", clickItem);
atualizarTela();
