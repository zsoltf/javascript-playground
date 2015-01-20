function getById(element) {
	return document.getElementById(element)
}

function setById(element, value) {
	document.getElementById(element).innerHTML = value
}

function mix(options, object)
{
	options = options || {};

	// mix options into object
	for(var key in options) {
		object[key] = options[key];
	}
}

// build any object w/ options
function newObject(options) {
	mix(options, this);
};

var EventFacade = {
	subjects: {},

	subscribe: function(subject, listener) {
		console.log(subject);
		if (!this.subjects[subject]) this.subjects[subject] = [];
		this.subjects[subject].push(listener)
	},

	publish: function(subject, data) {
		console.log(subject);
		if (!this.subjects[subject]) return;
		this.subjects[subject].forEach(function(listener) {
			console.log(listener);
			eval(listener);
		});
	}
}

// define chapter
function Chapter(options) {
	var obj = new newObject(options);

			//EventFacade.subscribe(this.next_event, function(data) { console.log(data) })

	// render chapter
	obj.render_chapter = function() {
		next_event = this.next_event;
		this_event = this.title;
		done = this.done;
		success_message = this.success_message;

		setById("title", this.title);
		setById("story", this.story);
		setById("success", this.success);
		setById("failure", this.failure);
		console.log(this.title);
		console.log(getById("success"));

		getById("success").onclick = function() {
			alert(success_message);
			done()
		}
	};


	return obj;
}

var c1 = new Chapter({
	title: 'Chapter 1',
	story: 'You are in a dark room...',
	success: 'Turn on the lights',
	success_message: 'Lights ON',
	failure: 'Walk around',
	failure_message: 'Creepy zombie jumps out and attacks you... you\'re adventure ends.',
	next_event: 'Chapter 2',
	done: function() {
		EventFacade.publish('Chapter 1')
	}
});

var c2 = new Chapter({
	title: 'Chapter 2',
	story: 'The room is empty.',
	success: 'Find shelter inside',
	success_message: 'You Survived the Apocalypse',
	failure: 'Find shelter outside',
	failure_message: 'Creepy zombie jumps out and attacks you... you\'re adventure ends.',
	previous_chapter: 'Chapter 1',
	init: function() {
		EventFacade.subscribe('Chapter 1', 'c2.render_chapter()')
	}
});

c2.init();
c1.render_chapter();
