// 
// Todo.js
//

// get an element by id
function getById(element) {
	return document.getElementById(element)
}

// set the contents of an element by id
function setById(element, value) {
	document.getElementById(element).innerHTML = value
}

// mix options into object
function mix(options, object)
{
	options = options || {};

	for(var key in options) {
		object[key] = options[key];
	}
}

// build any object w/ options
function newObject(options) {
	mix(options, this);
};


function makeTodo(options) {
	var obj = new newObject(options);

	obj.render = function() {
		var container = getById("todoList")
		var list = document.createElement("li");
		var text = document.createTextNode(this.action);
		container.appendChild(list).appendChild(text);
	}

	return obj;
}

function refreshTodos() {
	// select all todods
	var todoList = getById("todoList");
	// remove them
	while (todoList.firstChild) {
		todoList.removeChild(todoList.firstChild)
	}

	// render all todos
	for (t in todos) {
		var todo = todos[t];
		console.log(todo);
		todo.render();
	}
}

// predefined todos
var todos = [
	makeTodo({
		action: "take out the garbage",
		time: Date.now()
	}),
	makeTodo({
		action: "wash the dishes",
		time: Date.now()
	})
]

// add todos click event
var button = getById("submit")
button.onclick = function() {
	todos.push(makeTodo({
		action: getById("action").value,
		time: Date.now()
	}));
	refreshTodos();
	return false;
}

window.onload = refreshTodos();

