// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
  
	  // Pick a remaining element…
	  i = Math.floor(Math.random() * m--);
  
	  // And swap it with the current element.
	  t = array[m];
	  array[m] = array[i];
	  array[i] = t;
	}  
	return array;
}

function downloadJson(json, filename) {
	// Convert the JSON object to a string
	const jsonString = JSON.stringify(json, null, 2);
	// Create a new Blob object from the JSON string
	const blob = new Blob([jsonString], { type: "application/json" });

	// Create a download link element
	const downloadLink = document.createElement("a");

	// Set the download link's properties
	downloadLink.href = URL.createObjectURL(blob);
	downloadLink.download = filename;

	// Append the download link to the document
	document.body.appendChild(downloadLink);

	// Trigger a click event on the download link
	downloadLink.click();

	// Clean up by removing the download link
	document.body.removeChild(downloadLink);
}