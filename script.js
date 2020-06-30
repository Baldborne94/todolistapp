
function Todolist(){
    let ultodo, inputElement, btnAll, btnTodo, btnCompleted;

    let todos = [];

    const loadTodosFromLocalStorage = () =>{
        const localTodos = localStorage.getItem('todos');
        if(localTodos){
            const todoArr = JSON.parse(localTodos);
            if(todoArr){
                todos = todoArr;
            }
        }
    }

    const saveTodoInLocalStorage= () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    const removeTodo = (id)=> {
        // filtriamo solo gli elementi che avranno true or false
        todos = todos.filter( todo => todo.id !== id);
        saveTodoInLocalStorage();
        ultodo.removeChild(ultodo.querySelector('#todo-' + id));
    };

    const toggleTodo = (id, ele)=> {
        // map
        todos = todos.map(  ele => {
            if(ele.id === id){
                ele.completed = !ele.completed;
            }
            return ele;
            
        });
        saveTodoInLocalStorage
        const oldClass = ele.classList.contains('completed') ? 'completed' : 'uncompleted';
        const newClass = oldClass === 'completed'? 'uncompleted': 'completed';
        ele.classList.replace(oldClass, newClass);
        ele.parentNode.classList.toggle('completed');


    };

    const createLi = ({text, completed, id})=> {
        const li = document.createElement('li');
        li.id = 'todo-' +id;
        if(completed){
            li.classList.add('completed');
        }
        const spancheck = document.createElement('span');
        spancheck.classList.add(completed ? 'completed' : 'uncompleted')
        spancheck.addEventListener('click', (e)=>{
            toggleTodo(id, e.target);
        })
        const spancross = document.createElement('span');
        spancross.classList.add('cross');

        spancross.addEventListener('click', (e) => {
            removeTodo(id);
        });

        const textNode = document.createTextNode(text);
        li.appendChild(spancheck);
        li.appendChild(textNode);
        li.appendChild(spancross);
        return li;

    };

    const addNewTodo= (todo) => {
        todos.unshift(todo);
        saveTodoInLocalStorage
        const li = createLi(todo);
        const firstLi = ultodo.firtChild;
        if(!firstLi){
            ultodo.appendChild(li);
        }else{
            ultodo.insertBefore(li, firstLi);
        }
 
    }

    const addTodo = (e) => {
        const key = e.keyCode, ele = e.target;
        //13 - enter key
        if(key === 13 && ele.value.trim().length >2) {
            const todo = {
                text: ele.value.trim(),
                id: todos.length,
                completed: false
            };
            addNewTodo(todo);
        }
    }

    const renderTodos = (todoType)=>{
        const lis = ultodo.querySelectorAll('li');
        if(lis){
            lis.forEach( li => ultodo.removeChild(li));
        }
        const currentTodos = todos.filter( todo => {
            if(todoType === 'all'){
                return todo;
            }

            return (todoType === 'completed')? todo.completed : !todo.completed;
        });

        currentTodos.map( todo => createLi(todo))
        .forEach( li=> ultodo.appendChild(li));

    }

    const toogleBtnClasses = (target, btns=[]) =>{
        target.classList.toggle('active');
        target.setAttribute('disabled', true);

        btns.forEach(btn=> {
            btn.removeAttribute('disabled');
            btn.classList.remove('active');
        })
    }

    const addListener = () => {

        btnAll = document.querySelector('#btnAll');
        btnTodo= document.querySelector('#btnTodo');
        btnCompleted = document.querySelector('#btnCompleted');

        btnAll.addEventListener('click', (e)=>{
            toogleBtnClasses (e.target, [btnCompleted, btnTodo]);
            renderTodos('all');
        })
        btnCompleted.addEventListener('click', (e)=>{
            toogleBtnClasses (e.target, [btnAll, btnTodo]);
            renderTodos('completed');
        })
        btnTodo.addEventListener('click', (e)=>{
            toogleBtnClasses (e.target, [btnAll, btnCompleted]);
            renderTodos('uncomplete');
        })
    }

    const renderTodoList = ()=>{
        loadTodosFromLocalStorage();
        ultodo = document.querySelector('ul#todolist');
        if(!ultodo){
            ul = document.createElement('ul');
            ultodo.id = 'todolist';
            document.body.appendChild(ultodo);
        }
        //const lis = todos.map( todo => creatLi(todo));
        renderTodos('all');

        inputElement = document.querySelector('#todo');
        if(!inputElement){
            input = document.createElement('input');
            input.id = 'todo';
            input.name = 'todo';
            input.placeholder = 'Add new todo';
            ultodo.parentNode.insertBefore(input, ultodo);
        }
        inputElement.addEventListener('keyup', addTodo);



        
        addListener();

    };

 
    // the return  has access over every single element of  the Todolist function
    return {
        getTodos : function(){
            return todos;
        },
        init: function(){
            renderTodoList();
        }
    }
}

const myTodo = Todolist();
myTodo.init();
console.log(myTodo.getTodos);