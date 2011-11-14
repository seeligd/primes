/* Author:

*/



var canvas = document.getElementById("visualization")
var ctx = canvas.getContext("2d");

var imageData;

var max;

var height;
var width;

var state = {};
state.z = 2;


var stats;

init(); 


function init() {
	window.onresize = onresize;
	stats = document.getElementById("stats");
	onresize();


	begin();
}

function onresize() {
	height = window.innerHeight;
	width = window.innerWidth;
	
	// hack to limit data set size
	//height = 200;
	//width = 500;

	canvas.height = height;
	canvas.width = width;

	// create new imagedata array
	imageData = ctx.createImageData(width,height);

}

function begin() {

	// calculate the number of primes (no use going past that number)
	max = canvas.height * canvas.width;
	console.log('starting: ', canvas.height, canvas.width, max);

	/*
	for (var i = 2; i < max; i++)
	{
		innerSieve(i);
		//console.log(i);
	}

	*/
	innerSieve();
}

function innerSieve() {
	var i = state.z;
	for (var j = 2; j*i<=max; j++)
	{
		var index = j * i;

		// increase opacity
		imageData.data[(index*4)+3] += 90;
		//imageData.data[(index*4)+3] = 255;

		var r = imageData.data[(index*4)]
		var g = imageData.data[(index*4)+1]
		var b = imageData.data[(index*4)+2]
		var a = imageData.data[(index*4)+3]

	}

	state.z++;
	stats.innerHTML = i;
	if (i % 10 == 0)
	{
		setTimeout(innerSieve,1);
		ctx.putImageData(imageData,0,0);
	}
	else {
		innerSieve();
	}

}

function iterativeSieve()
{
	if (state.i > max) {
		return false;
	}

	if (state.i * state.j > max) {
		state.i++;
		state.j = 2; // next factor
	}

	drawPoint(state.i * state.j);
	state.j+=1;

	return true;

}

// http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function sieve() {

	if ( ( state.i <= max) && (state.j * state.i <= max) )
	{
		drawPoint(state.i * state.j);

	}
	for (var i = 2; i<=max; i++)
	{
		for (var j = 2; j*i<=max; j++)
		{
			drawPoint(j*i);
		}
	}
}


function drawPoint(x)
{
	var row = Math.floor(x / width);
	var column = Math.floor(x % width);
	ctx.globalAlpha = 0.2;
	ctx.fillRect(column,row,1,1);
}

function addPoint(x)
{
	var row = Math.floor(x / width);
	var column = Math.floor(x % width);
	ctx.globalAlpha = 0.2;
	ctx.fillRect(column,row,1,1);
}


