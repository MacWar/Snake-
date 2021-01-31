//info 
// canvas ma 800 x 800 póki co dzielę go na 25 rzędów i 25 lini 
// czyli jednostką węża jest 32px (np.głowa ma 32px, każda kolejna część ogona bd miała 40px itd) 
//wczytanie canvasu
let canv=document.querySelector(".canvas-snake")
let ctx=canv.getContext('2d');
//tworzenie snaka 
let snake=[];
snake[0]={
    x:500,
    y:500
}
//wczytywanie obrazków
const tlo=new Image();
tlo.src="img/tlo.jpg";
let glowa=new Image();
glowa.src="img/head_lewo.png";


//funkcja odpowiadająca za rysowanie na canvasie
function rysuj(){
    ctx.drawImage(tlo,0,0);
    ctx.drawImage(glowa,snake[0].x,snake[0].y,32,32);
}
let odswiez=setInterval(rysuj,100)