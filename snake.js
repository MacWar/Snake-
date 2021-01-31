//info 
// canvas ma 800 x 800 póki co dzielę go na 40 rzędów i 40 lini 
// czyli jednostką węża jest 20px (np.głowa ma 20x, każda kolejna część ogona bd miała 20px itd) 
//wczytanie canvasu
let canv=document.querySelector(".canvas-snake")
let ctx=canv.getContext('2d');
//tworzenie snaka 
let snake=[];
snake[0]={
    x:0,
    y:0
}
//wczytywanie obrazków
const tlo=new Image();
tlo.src="img/tlo.jpg";
let glowa=new Image();
glowa.src="img/head_lewo.png";

//zmienne
let kierunek;

//funkcja odpowiadająca za rysowanie na canvasie
function rysuj(){
    ctx.drawImage(tlo,0,0);
    snake.forEach(element => {
        if(element==snake[0]){
            ctx.drawImage(glowa,snake[0].x,snake[0].y,20,20);
            ctx.strokeStyle="black";
            ctx.strokeRect(element.x,element.y,20,20)
        }
        else{
            ctx.fillStyle="purple";
            ctx.fillRect(element.x,element.y,20,20)
            ctx.strokeStyle="black";
            ctx.strokeRect(element.x,element.y,20,20)
        }
    });

    let glowaX=snake[0].x;
    let glowaY=snake[0].y;

    //jak was denerwuje że ogon cały czas rośnie to odkomentujcie poniżej xd
    //snake.pop()

    
    //ustala nową pozycję
    switch(kierunek){
        case "lewo":
        glowaX=glowaX-20;
        glowa.src="img/head_lewo.png"
        break;
        case "gora":
        glowaY=glowaY-20;
        glowa.src="img/head_gora.png"
        break;
        case "dol":
        glowaY=glowaY+20;
        glowa.src="img/head_dol.png"
        break;
        case "prawo":
        glowaX=glowaX+20;
        glowa.src="img/head_prawo.png"
        break;
    }
    //aktualizuje snaka
    snake.unshift({x:glowaX,y:glowaY});
    
}
let odswiez=setInterval(rysuj,150);

//sprawdzanie nacisnietego klawisza
document.addEventListener("keydown",sprawdzKlaw);
function sprawdzKlaw(event){
    switch(event.keyCode){
        case 37:
            if(kierunek!="prawo")
            kierunek="lewo";
            break;
        case 38:
            if(kierunek!="dol")
            kierunek="gora";
            break;
        case 39:
            if(kierunek!="lewo")
            kierunek="prawo";
            break;
        case 40:
            if(kierunek!="gora")
            kierunek="dol";
            break;
    }
}