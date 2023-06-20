const limits = [["#b2766f", "#9d8e48"], ["#97914b", "#529687"],["#4e9689", "#7b84a3"], ["#8484a3","#b37673"]];
let colorFormat = {"rgb-hex": d => d3.color(d).formatHex(), "rgb": d => `rgb(${d3.color(d).r},${d3.color(d).g},${d3.color(d).b})`,
					"rgb-ard": d => `${d3.color(d).r},${d3.color(d).g},${d3.color(d).b}`,
					"hsl": d => d3.hsl(d).formatHsl(), "cielab": d => `lab(${d3.lab(d).l}% ${d3.lab(d).a} ${d3.lab(d).b})`};

function createScale(lim, size) {
	return d3.scaleLinear()
		.range([lim[0], lim[1]])
		.domain([1,size+1]);
}
function interpolator(lims, index) {
	return d3.interpolateLab(d3.lab(lims[0]), d3.lab(lims[1]))(index/10)
}

function getColors(params) {
	let colorComplete = {};
	// let params = getWidgetValues();
	for (let index = 1 ; index < 5 ; index++) {
		let lims = limits[index-1];
		let l = `linha${index}`;
		colorComplete[l] = d3.range(1, +params.colors+1).map(i => d3.interpolateLab(d3.lab(lims[0]), d3.lab(lims[1]))(i/10)); 
		
		let hslColor = colorComplete[l].map(c => d3.hsl(c))
		hslColor.forEach(d => {d.s += +params.saturation_diff});
		hslColor.forEach(d => {d.l += +params.luminance_diff});
		colorComplete[l] = hslColor.map(d => colorFormat[params.color_space](d));
	}
	return colorComplete;
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