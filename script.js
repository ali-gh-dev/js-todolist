let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let form1 = document.querySelector('form');

// Functions
function refresh_tasks() {
    // hide/show "search field" & "clear all button"
    if (tasks.length === 0 ){
        document.getElementById('search').style.display = 'none';
        document.getElementById('clear-all').style.display = 'none';
    }else{
        document.getElementById('search').style.display = 'block';
        document.getElementById('clear-all').style.display = 'block';
    }

    let tasks_tag = document.querySelector('#tasks');
    tasks_tag.innerHTML = "";
    for (let task of tasks) {
        let new_tag = `
                <div class="col">
                    <div class="card text-bg-info">
                        <div class="card-body">
                            <p class="card-text">${task}</p>
                        </div>
                        <div class="d-flex justify-content-evenly mb-1">
                            <a class="text-danger fw-bold fs-3 delete-task"><i class="bi bi-x"></i></a>
                            <a class="text-secondary fw-bold fs-4"><i class="bi bi-pencil"></i></a>
                        </div>
                    </div>
                </div> `;
        tasks_tag.innerHTML += new_tag;
    }

}

refresh_tasks();

function create_task(ev) {
    ev.preventDefault();
    // let task_text = new FormData(form1).get('task-text').trim();
    let task_text = document.querySelector('#task-text').value.trim();


    if (task_text.length === 0) {
        document.querySelector('#input-invalid').textContent = 'کادر خالی است';
    } else if (tasks.includes(task_text)) {
        document.querySelector('#input-invalid').textContent = 'متن وارد شده تکراری است';
    } else {
        document.querySelector('#input-invalid').textContent = '';
        tasks.push(task_text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.querySelector('#task-text').value = '';
        refresh_tasks();
        location.reload();
    }

}

function delete_task(ev) {
    let task_text = ev.target.parentElement.parentElement.previousElementSibling.firstElementChild.textContent;
    tasks.splice(tasks.indexOf(task_text),1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refresh_tasks();
    location.reload();
}

function clear_all(){
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refresh_tasks();
}

// Events
form1.addEventListener('submit', create_task);
document.querySelectorAll('a.delete-task').forEach(tag => tag.addEventListener('click', delete_task));
document.getElementById('clear-all').addEventListener('click', clear_all);
