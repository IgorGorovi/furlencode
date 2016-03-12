var config = {
	url: 'http://localhost:8080'
}

var hitTypes = {
	'pageLoad': {
		'location' : window.location.href,
		'title': document.title ? document.title : ''
	},
	'event' : {

	}
}

var form = document.createElement('form');
form.setAttribute('method', 'post');
form.setAttribute('action', config.url);
form.setAttribute('id', 'analytics');

function addFields(data) {
	for (var key in data) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('name', key);
		input.setAttribute('value', data[key]);
		form.appendChild(input);
	}
}

function analytics (userId) {
	this.userId = userId;
	this.send = function (hitType, data) {
		console.log(hitType, data);
		if (!data) {
			data = hitTypes[hitType];
		}
		console.log(data);
		addFields(data);
		form.submit();
	}
}