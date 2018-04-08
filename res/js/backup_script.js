window.addEventListener("load", initialize);
var widthOfGridInTiles = 40;
var heightOfGridInTiles = 20;
var playerTile;
var speed = 250;

var gridArray = [
                    
                ];

var playArea;

function initialize()
{
    playArea = document.getElementsByClassName("play_screen");

    for (var i = 0; i < heightOfGridInTiles; i++)
        {
            for (var j = 0; j < widthOfGridInTiles; j++)
                {
                    gridArray.push([i,j]);
                }
        }
    
     for (var i = 0; i < heightOfGridInTiles; i++)
         {
             for (var j = 0; j < widthOfGridInTiles; j++)
                 {
                     if (i == 0)
                         {
                            playArea[0].innerHTML += "<div class='grid_tile first_row' id='" + i + "," + j +"'></div>";   
                         }
                     else
                        {
                            playArea[0].innerHTML += "<div class='grid_tile' id='" + i + "," + j +"'></div>"; 
                        }                   
                 }
         }
    
    playerTile = $("#player_tile");
}

$("html").keydown(function(event)
    {
        if (event.which == "87") //W pressed
            {
                playerTile.animate({"top" : "-=25px"}, speed);
            }
        else if (event.which == "83") //S pressed
            {
                playerTile.animate({"top" : "+=25px"}, speed);    
            }
        else if (event.which == "65") //A pressed
            {
                playerTile.animate({"left" : "-=25px"}, speed);     
            }
        else if (event.which == "68") //D pressed
            {
                playerTile.animate({"left" : "+=25px"}, speed);    
            }
    });

$("html").keyup(function(event)
{
        if (event.which == "87") //W pressed
            {
                playerTile.stop(true);
            }
        else if (event.which == "83") //S pressed
            {
                playerTile.stop(true);    
            }
        else if (event.which == "65") //A pressed
            {
                playerTile.stop(true);    
            }
        else if (event.which == "68") //D pressed
            {
                playerTile.stop(true);   
            }             
                
});
