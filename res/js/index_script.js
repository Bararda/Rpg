window.addEventListener("load", initialize)
var playArea;
var playAreaContext;
var canvasWidth = 1000;
var canvasHeight = 500;
var tileWidth = 25;
var tileHeight = 25;
var player;

function initialize()
{
    playArea = document.getElementById("play_canvas");
    playArea.width = canvasWidth;
    playArea.height = canvasHeight;
    playAreaContext = playArea.getContext("2d");
    player = new gameTile(tileWidth, tileHeight, "blue", 0, 0);
    setInterval(refreshFrames, 20);
}

function gameTile(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    playAreaContext.fillStyle = color;
    playAreaContext.fillRect(this.x, this.y, this.width, this.height);
    
    this.update = function ()
    {
        playAreaContext.fillStyle = color;
        this.hitScreenEdge();
        playAreaContext.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.newPos = function()
    {
        this.x += this.speedX;
        this.y += this.speedY;  
    }
    
    this.hitScreenEdge = function()
    {
        var bottom = playAreaContext.canvas.height - this.height;
        var right = playAreaContext.canvas.width - this.width;
        
        if (this.y > bottom)
            {
                this.y = bottom;
            }
        else if(this.x > right)
            {
                this.x = right;
            }
        else if (this.y < 0)
            {
                this.y = 0;
            }
        else if (this.x < 0)
            {
                this.x = 0;
            }
    }
}

function refreshFrames()
{
    clearScreen();
    player.update();
}

function clearScreen()
{
    playAreaContext.clearRect(0,0, canvasWidth, canvasHeight);
}

$("html").keydown(function(event)
{
    player.speedY = 0;
    player.speedX = 0;
     if (event.which == "87") //W pressed
            {
                player.speedY -= 25;   
            }
        else if (event.which == "83") //S pressed
            {
                player.speedY += 25;      
            }
        else if (event.which == "65") //A pressed
            {
                player.speedX -= 25;        
            }
        else if (event.which == "68") //D pressed
            {
                player.speedX += 25;       
            }
     player.newPos();
});