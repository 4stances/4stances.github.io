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

function loadClips() {
	loadJSONFile('./static-data/clips.json', function(content) {
		renderClips(content)
	})
}

function renderClips(clips) {
	for (var i = 0; i <= clips.length - 1; i++) {
		renderClip(clips[i])
	}	
}

function renderClip(clip) {
	const path = './videos/'
	const fileName = clip.video_file
	const html = '<video width="250" height="250" controls class="clip"><source src="' 
		+ fileName
		+ '" type="video/mp4" /></video>'
	document.getElementById("clips").innerHTML += html
}
