function loadJSONFile(file, callback) {
	var client = new XMLHttpRequest();
	client.open('GET', file);
	client.onreadystatechange = function() {
		if (client.readyState === XMLHttpRequest.DONE) {
		  	callback(JSON.parse(client.responseText));
	    }
	}
	client.send();
}

function loadClips(callback) {
	loadJSONFile('./static-data/clips.json', function(content) {
		callback(content)
	})
}

function renderClips(clips) {
	for (var i = clips.length - 1; i >= 0; i--) {
		renderClip(clips[i])
	}
	var numberOfPlaceholders = 3 - (clips.length % 3)
	for (var i = 0; i < numberOfPlaceholders; i++) {
		renderClipPlaceholder()
	}
}

function renderClip(clip) {
	const path = './videos/'
	const fileName = clip.video_file
	const html = '<div class="clip">'
		+ '<video controls class="video">'
		+ '<source src="' + path + fileName + '" type="video/mp4" />'
		+ '</video>'
		+ '<div class="metadata">'
		+ '<span class="trick">' + clip.name + '</span>'
		+ '<span class="skater">' + clip.skater_name + ' (<a href="https://www.instagram.com/' + clip.skater_instagram + '">@' + clip.skater_instagram + '</a>)</span>'
		+ '<span class="filmer">Filmer: <a href="https://www.instagram.com/' + clip.filmer_instagram + '">@' + clip.filmer_instagram + '</a></span>'
		+ '<span class="location">' + clip.location + '</span>'
		+ '</div>'
		+ '</div>'
	document.getElementById("clips").innerHTML += html
}

function renderClipPlaceholder() {
	const html = '<img src="./images/clip-placeholder.png" class="clip-placeholder" />'
	document.getElementById("clips").innerHTML += html
}

function renderTricks(clips) {
	const tricks = new Set()
	for (var i = 0; i < clips.length; i++) {
		tricks.add(clips[i].name)
	}
	for (let trickName of tricks) {
		renderTrick(trickName)
	}
}

function renderTrick(trickName) {
	const html = '<span class="trick">' 
		+ trickName
		+ '</span>'
	document.getElementById("tricks").innerHTML += html
}

function renderSkaters(clips) {
	const skaters = new Set()
	for (var i = 0; i < clips.length; i++) {
		skaters.add(clips[i].skater_name)
	}
	for (let skater of skaters) {
		renderSkater(skater)
	}
}

function renderSkater(name) {
	const html = '<span class="skater">' 
		+ name
		+ '</span>'
	document.getElementById("skaters").innerHTML += html
}

function renderFilmers(clips) {
	const filmers = new Set()
	for (var i = 0; i < clips.length; i++) {
		filmers.add(clips[i].filmer_instagram)
	}
	for (let filmer of filmers) {
		renderFilmer(filmer)
	}
}

function renderFilmer(name) {
	const html = '<span class="filmer">' 
		+ '<a href="https://www.instagram.com/' + name + '">@' + name + '</a>'
		+ '</span>'
	document.getElementById("filmers").innerHTML += html
}

function renderLocations(clips) {
	const locations = new Set()
	for (var i = 0; i < clips.length; i++) {
		locations.add(clips[i].location)
	}
	for (let location of locations) {
		renderLocation(location)
	}
}

function renderLocation(name) {
	const html = '<span class="location">' 
		+ name
		+ '</span>'
	document.getElementById("locations").innerHTML += html
}

