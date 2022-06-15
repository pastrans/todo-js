import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML 
const divTodolist = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

    const htmlTodo = `
        <li class="${ (todo.completado)? 'completed' : ''}" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : ''}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodolist.append(div.firstElementChild);

    return div

}

// Eventos 
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
});

divTodolist.addEventListener('click', (event) => {
    const nombreElement = event.target.localName; // input, label, button
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if (nombreElement.includes('input')) { // click in the check
        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed'); // toggle agrega la clase y si no esta y si está la quita
    } else if (nombreElement.includes('button')) {
        todoList.deleteTodo(todoId);
        divTodolist.removeChild(todoElement);
    }


})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodolist.children.length - 1; i >= 0; i--) {

        const elemento = divTodolist.children[i];

        if (elemento.classList.contains('completed')) {
            divTodolist.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodolist.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})