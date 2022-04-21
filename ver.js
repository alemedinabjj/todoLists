const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

  const atualizarRel = () => {
    let relogio = document.querySelector('.relogio')

    var horariop = new Date ()
    var horariog = horariop.getHours() + ':' + horariop.getMinutes() + ':' + horariop.getSeconds()
     relogio.innerHTML = horariog
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
    corrigir(hora.getMonth()+1) +
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
