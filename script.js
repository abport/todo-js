const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos')).reverse()

if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    // Prevent the form of it's dedault behavior
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        const item = `
                    <p class="todoText">${todoText}</p>
                    <span>
                        <i class="fas fa-times" job="delete"></i>
                    </span>
                    `;
    
        const position = "beforeend";
        
        todoEl.insertAdjacentHTML(position, item);

        todoEl.addEventListener('click', (event) => {
            todoEl.classList.toggle('completed')
            updateLS()

            const element = event.target; // return the clicked element inside list 
            const elementJob = element.attributes.job ? element.attributes.job.value: '';
            if (elementJob && elementJob == "delete") {
                todoEl.remove()
                updateLS()
            }
        })

        todosUL.prepend(todoEl)

        input.value = ''

        updateLS()
    }
}

// Update Local Storage
function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
