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
                            <a class="text-danger fw-bold fs-3"><i class="bi bi-x"></i></a>
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
        document.querySelector('#input-invalid').textContent = 'لطفا عنوان کار پیش رو را وارد نمایید';
    } else if (tasks.includes(task_text)) {
        document.querySelector('#input-invalid').textContent = 'متن وارد شده تکراری است';
    } else {
        document.querySelector('#input-invalid').textContent = '';
        tasks.push(task_text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refresh_tasks();
    }
}

// function delete_task() {
//
// }


form1.addEventListener('submit', create_task);
// document.querySelector('#delete_task').addEventListener('click', delete_task);
