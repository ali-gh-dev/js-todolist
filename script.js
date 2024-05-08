let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function refresh_tasks() {
    document.querySelector('#tasks').innerHTML = "";
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
                </div>
    `;
        document.querySelector('#tasks').innerHTML += new_tag;
    }
}

refresh_tasks();

let form1 = document.querySelector('form');

function create_task(ev) {
    ev.preventDefault();
    let task_text = new FormData(form1).get('task-text').trim();

    if (task_text.length === 0) {
        document.querySelector('#input-invalid').textContent = 'کادر خالی است';
    } else if (tasks.includes(task_text)) {
        document.querySelector('#input-invalid').textContent = 'متن وارد شده تکراری است';
    } else {
        document.querySelector('#input-invalid').textContent = '';
        tasks.push(task_text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refresh_tasks();
    }
}

function delete_task(ev) {
    let task_text = ev.target.parentElement.parentElement.previousElementSibling.firstElementChild.textContent;
    tasks.splice(tasks.indexOf(task_text),1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let parent_tag = ev.target.parentElement.parentElement.parentElement.parentElement;
    parent_tag.remove();
}


form1.addEventListener('submit', create_task);
document.querySelectorAll('a.delete-task').forEach(tag => tag.addEventListener('click', delete_task));
