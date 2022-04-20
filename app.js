
// let banco = [
//     {'tarefa' : 'teste', 'status' : 'checked'},
//     {'tarefa' : 'testet', 'status' : ''},
//     {'tarefa' : 'testet', 'status' : ''},
    
// ];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))
 
function create(tarefa, status, indice) {
//    var hours = document.createElement('p')
    var div = document.createElement('label')
    div.classList.add('todo_item')
    // hours.classList.add('horas')
    div.innerHTML =

        `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div class="tarefa">${tarefa}</div>
        <input class="btn" type="button" value="" data-indice=${indice}>
        `
        
   
        document.querySelector('.list').appendChild(div)
}   
    function limparTarefas() {
        var todoList = document.getElementById('list')
        while (todoList.firstChild) {
            todoList.removeChild(todoList.lastChild)
        }
    }

function atualizarTela() {
    limparTarefas();
    const banco = getBanco()
    banco.forEach ((item, indice) => create (item.tarefa, item.status, indice));
}
atualizarTela()
    function cadastrarTarefa(evento) {
        const tecla = evento.key;
        const texto = evento.target.value   
            if(tecla === 'Enter') {
                const banco = getBanco()
                banco.push ({'tarefa' : texto, 'status' : ''})
                setBanco(banco)
                atualizarTela();
                evento.target.value = ''
            }
            
    }

    const removerItem = (indice) => {
        const banco = getBanco()
        banco.splice (indice, 1)
        setBanco(banco)
        atualizarTela()
    }
    const atualizarItem = (indice) => {
        const banco = getBanco()
        banco[indice].status = banco[indice].status === '' ? 'checked' : '';
        setBanco(banco)
        atualizarTela()
    }
    const clickItem = (evento) => {
        const elemento = evento.target;
        if (elemento.type === 'button'){
            const indice = elemento.dataset.indice;
            removerItem(indice)
        }else if (elemento.type === 'checkbox'){
            const indice = elemento.dataset.indice;
            atualizarItem(indice)
        }
        console.log(elemento)
    }
 document.getElementById('newtarefa').addEventListener('keypress', cadastrarTarefa);    
 document.querySelector('.list').addEventListener('click', clickItem);

atualizarTela()

