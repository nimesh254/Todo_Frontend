const API_URL = "http://localhost:5226/api/Todo"; // ✅ correct port

async function loadTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();

    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${todo.title}</strong> - ${todo.description || ""}
            <br/>
            Days: ${getDays(todo)}
            <br/>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            <hr/>
        `;
        list.appendChild(li);
    });
}

function getDays(todo) {
    const days = [];
    if (todo.sunday) days.push("Sun");
    if (todo.monday) days.push("Mon");
    if (todo.tuesday) days.push("Tue");
    if (todo.wednesday) days.push("Wed");
    if (todo.thursday) days.push("Thu");
    if (todo.friday) days.push("Fri");
    if (todo.saturday) days.push("Sat");
    return days.join(", ");
}

async function addTodo() {
    const todo = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        sunday: document.getElementById("sunday").checked,
        monday: document.getElementById("monday").checked,
        tuesday: document.getElementById("tuesday").checked,
        wednesday: document.getElementById("wednesday").checked,
        thursday: document.getElementById("thursday").checked,
        friday: document.getElementById("friday").checked,
        saturday: document.getElementById("saturday").checked,
        isCompleted: false // ✅ add this (your model has it)
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
    });

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}

// Load todos when page opens
loadTodos();