//
// Todo.js
//

// get an element by id
function getById(element) {
	return document.getElementById(element)
}

// set the contents of an element by id
function setById(element, value) {
	if (document.getElementById(element).innerHTML)
		document.getElementById(element).innerHTML = value
	else
		document.getElementById(element).value = value
}

// mix options into object
function mix(options, object) {
	options = options || {};

	for(var key in options) {
		object[key] = options[key];
	}
}

// build any object w/ options
function newObject(options) {
	mix(options, this);
};


/*
 * Todo
 */

function Todo(options) {
	mix(options, this);
}

Todo.prototype = {
	render: function() {
		var container = getById("todoList")
		var list = document.createElement("li");
		var text = document.createTextNode(this.action);
		container.appendChild(list).appendChild(text);
	},
	time: function() {
		return Date.now()
	}
}

/*
 * TodoList
 */

function TodoList(options) {
	mix(options, this);
}

TodoList.prototype = {
	id: 'todoList',
	todos: [],

	add: function(action) {
		todo = new Todo({action: action});
		this.todos.push(todo);
		this.refresh()
	},

	refresh: function() {
		list_id = getById(this.id);
		while(list_id.firstChild)
			list_id.removeChild(list_id.firstChild);
		this.todos.forEach(function(t){
			t.render();
			console.log(t.action)
		})
	}
}

function makeTodo(options) {
	var obj = obj || new TodoList(options);
	return obj
}

/*
 * TodoAction
 */

function TodoAction(options) {
	mix(options, this);
	this.element = getById('submit');
	this.element.onclick = this.push_todo;
}

TodoAction.prototype = {
	push_todo: function() {
		action = getById('action').value;
		if (action) {
			makeTodo().add(action);
			setById('action', '')
		}
		return false
	}
}

action = new TodoAction();
