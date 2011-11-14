/* Author:
	David Seelig
*/

var canvas = document.getElementById("visualization");
var ctx = canvas.getContext("2d");


var imageData,
	startbutton,
	max,
	height,
	width,
	stats,
	running;

var state = {};


init(); 


function init() {
	stats = document.getElementById("stats");
	startButton = document.getElementById("start");
	maxLabel = document.getElementById("max");
	running = false;

	startButton.onclick = startStop;

	// get the correct size
	onresize();

	window.onresize = onresize;

}

function startStop() {
	console.log("start");
	running = !running;
	if (running) {
		startButton.innerHTML = "stop";
		begin();
	}
	else {
		startButton.innerHTML = "start";
	}
}
function onresize() {
	height = window.innerHeight;
	width = window.innerWidth;

	height = (Math.floor(height / 100) * 100);
	width = (Math.floor(width / 100) * 100);

	maxLabel.innerHTML = "Showing numbers 1 - " + height * width + " (" + height + "x" + width + ")";
	
	canvas.height = height;
	canvas.width = width;

}

function begin() {
	// create new imagedata array
	imageData = ctx.createImageData(width,height);
	state.cur = 2;

	// calculate the number of primes (no use going past that number)
	max = canvas.height * canvas.width;

	innerSieve();

}

// http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function innerSieve() {
	var i = state.cur;

	var marked = false;

	// break out if you're at the max
	if (!running || i >= max) {
		printPrimes();
		return;
	}

	for (var j = 2; j*i<=max; j++)
	{
		var index = j * i;
		
		// mark the number

		imageData.data[(index*4)+3] = 255;
		marked = true;

	}

	// to get the next possible prime, go through the 
	// array and find the next unmarked number
	while (state.cur < max)
	{
		// look for the first unmarked number
		state.cur++;
		if (imageData.data[(state.cur*4)+3] == 0) 
			break;
	}

	printStatus(i + "out of " + max);
	setTimeout(innerSieve,1);
	if (marked)
		ctx.putImageData(imageData,0,0);

}

function printPrimes() {
	var primes = new Array();
	for(var i = 2; i<state.cur; i++)
	{
		if (imageData.data[(i*4)+3] == 0)
			primes.push(i);
	}
	printStatus("Primes: " +  primes.join(","));
}

function printStatus(msg)
{
	stats.innerHTML = msg;
}



