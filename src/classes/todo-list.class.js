export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guadarLocalStorage();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guadarLocalStorage();
    }

    marcarCompletado(id) {

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guadarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guadarLocalStorage();
    }

    guadarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) ?
            JSON.parse(localStorage.getItem('todo')) : [];
    }

}