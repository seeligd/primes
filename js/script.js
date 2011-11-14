/* Author:

*/



var canvas = document.getElementById("visualization")
var ctx = canvas.getContext("2d");
var max;

var height;
var width;

var state = {};
state.x = 1;
state.y = 2;

state.i = 2;
state.j = 2;

var timer;

window.onresize = resize;

resize(); // before doing any work, make sure the canvas is big enough


function resize() {
	height = window.innerHeight;
	width = window.innerWidth;
	height = 100;
	width = 100;
	canvas.height = height;
	canvas.width = width;

	init();
}

function init() {
	// fill canvas with black?
	// calculate the number of primes (no use going past that number)
	max = canvas.height * canvas.width;

	console.log('init: ', canvas.height, canvas.width, max);
	//sieve();
	//
	//
	setInterval(iterativeSieve,1);
}

function iterativeSquare() {
	state.x += 2;
	state.y += 4;

	var x = state.x;
	var y = state.y;

	ctx.globalAlpha = 0.2;
	ctx.fillRect(x,y,100+y ,100-x);
}

function iterativeSieve()
{
	if (state.i > max) {
		timer.stop();
		return;
	}

	if (state.i * state.j > max) {
		state.i++;
		state.j = 2; // next factor
	}

	drawPoint(state.i * state.j);
	state.j+=1;

}

// http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function sieve() {
	// 
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
	console.log(column,row);
	
}


