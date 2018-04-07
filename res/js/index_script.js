window.addEventListener("load", initialize);
var widthOfGridInTiles = 40;
var heightOfGridInTiles = 20;


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
}

function testMove(playerTile)
{
  
}
