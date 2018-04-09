window.addEventListener("load", initialize)
var playArea;
var playAreaContext;
var canvasWidth = 1000;
var canvasHeight = 500;
var tileWidth = 25;
var tileHeight = 25;
var player;
var npc = new Array();
var usedPositions = new Array();
var lastKeyPress;
var gameConsole;
var generateNPCType;

function initialize()
{
    gameConsole = $(".console_window");
    playArea = document.getElementById("play_canvas");
    playArea.width = canvasWidth;
    playArea.height = canvasHeight;
    playAreaContext = playArea.getContext("2d");
    player = new playerTile(tileWidth, tileHeight, "blue", 0, 0, true);
    setInterval(refreshFrames, 20);
}

function npcTile(width, height, x, y, type, dialog)
{
    var attack;
    var health;
    var defense;
    var canInteract = false;
    this.type = type;
    this.dialog = dialog;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    if (this.type == "enemy")
        {
            color = "red";
        }
    else if (this.type == "major")
        {
            color = "green";
            canInteract = true;
        }
    else if (this.type == "npc")
        {
            color = "grey";
        }
    playAreaContext.fillStyle = color;
    playAreaContext.fillRect(this.x, this.y, this.width, this.height);
    
    this.update = function ()
    {
        playAreaContext.fillStyle = color;
        playAreaContext.fillRect(this.x, this.y, this.width, this.height);
    }
    
}

function playerTile(width, height, color, x, y)
{
    var attack;
    var health;
    var defense;
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
        this.hitOther();
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
    
    this.hitOther = function ()
    {
        for (var i = 0; i < npc.length; i++)
            {
                    if ((this.x + this.width > npc[i].x && !(this.x >= npc[i].x + npc[i].width)) && this.y == npc[i].y) 
                    {
                        console.log("the boxes hit");
                        if (lastKeyPress == "W")
                            {
                                this.y += 25;    
                            }
                        else if (lastKeyPress == "S")
                            {
                                this.y -= 25;
                            }
                         else if (lastKeyPress == "A")
                            {
                                this.x += 25;    
                            }
                         else if (lastKeyPress == "D")
                            {
                                this.x -=25;
                            }
                        
                    }
            }
    }
}

function refreshFrames()
{
    clearScreen();
    player.update();
    
    for (var i = 0; i < npc.length; i++)
        {
            npc[i].update();
        }
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
                lastKeyPress = "W";
            }
        else if (event.which == "83") //S pressed
            {
                player.speedY += 25;
                lastKeyPress = "S";
            }
        else if (event.which == "65") //A pressed
            {
                player.speedX -= 25;
                lastKeyPress = "A";
            }
        else if (event.which == "68") //D pressed
            {
                player.speedX += 25; 
                lastKeyPress = "D";
            }
        else if (event.which == "70")
            {
                lastKeyPress ="F";
                //interact method
            }
     player.newPos();
});

function addNPC(event)
{
    console.log("entered add npc function");
    console.log("x: " + event.offsetX);
    console.log("y: " + event.offsetY);
    var xPos = event.offsetX;
    var yPos = event.offsetY;
    
    while (xPos % 25 != 0)
        {
            xPos += 1;   
        }
     while (yPos % 25 != 0)
        {
            yPos += 1;   
        }
    generateNPCType = $(".changeNPCType").val();
    
    npc.push(new npcTile(tileWidth, tileHeight, xPos, yPos, generateNPCType, ""));
    usedPositions.push([xPos, yPos]);
}

function interact()
{
    //once f is pressed, check if player is touching an npc, if they are, get the npc from the array, and display the npc message or other attribute that must be assigned to game tiles
    
}