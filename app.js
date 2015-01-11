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

// define chapter
function makeChapter(options) {
	var obj = new newObject(options);

	// render chapter
	obj.render = function() {
		setById("title", this.title);
		setById("story", this.story);
	};

	return obj;
}

var c1 = new makeChapter({
	title: 'Chapter 1',
	story: 'You are in a dark room...'
})

var c2 = new makeChapter({
	title: 'Chapter 2',
	story: 'The room is empty.'
})

c1.render()
