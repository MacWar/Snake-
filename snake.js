/*Canvas ma wymiary 800x800, jednostki poszczególne mają wymiary 40x40*/

/*Wczytanie canvasa*/
let canv = document.querySelector(".canvas-snake")
let ctx = canv.getContext('2d');

let canv1 = document.querySelector(".information")
let ctx1 = canv1.getContext('2d');

/*Utworzenie snake'a*/
let snake = [];
snake[0] = { x: 0, y: 0 }

/*Utworzenie jedzenia*/
var jedzenie = {
    x: Math.floor(Math.random() * 20) * 40,
    y: Math.floor(Math.random() * 20) * 40
}

/*Utworzenie zmienne odpowiadającej za wynik gry*/
var wynik = 0;

/*Wczytanie grafik*/
const tlo = new Image();
const tlo1 = new Image();
var glowa = new Image();
var mysz = new Image();
var szczur = new Image();
var zaba = new Image();
var waz = new Image();

tlo.src = "img/bushes.jpg";
tlo1.src = "img/background1.png";
glowa.src = "img/head_dol.png";
mysz.src = "img/mice.gif";
szczur.src = "img/rat.gif";
zaba.src = "img/frog.png";
waz.src = "img/snake.png";

/*Wczytanie audio*/
var ruch = new Audio();
var zjedzone = new Audio();
var koniec = new Audio();
var muzwtle = new Audio();

ruch.src = "sound/ruch.wav";
zjedzone.src = "sound/zjedzone.wav";
koniec.src = "sound/koniec.wav";
muzwtle.src = "sound/muzawtle.mp3";

/*Zmienne*/
let kierunek;

var losowa;
losowa = getRandomInt(0, 3);

/*Funkcja odpowiadająca za rysowanie na canvasie*/
function rysuj() {
    ctx.drawImage(tlo, 0, 0);
    ctx1.drawImage(tlo1, 0, 0, 800, 85);

    snake.forEach(element => {
        if (element == snake[0]) {
            ctx.drawImage(glowa, snake[0].x, snake[0].y, 40, 40);
            ctx.strokeStyle = "black";
            ctx.strokeRect(element.x, element.y, 40, 40)
        }
        else {
            ctx.fillStyle = "purple";
            ctx.fillRect(element.x, element.y, 40, 40)
            ctx.strokeStyle = "black";
            ctx.strokeRect(element.x, element.y, 40, 40)
        }
    });

    /*Wyświetlanie zwierzaka odpowiadającego wylosowanej liczbie*/
    if (losowa == 0) {
        ctx.drawImage(mysz, jedzenie.x, jedzenie.y, 40, 40);
    }
    else if (losowa == 1) {
        ctx.drawImage(szczur, jedzenie.x, jedzenie.y, 40, 40);
    }
    else if (losowa == 2) {
        ctx.drawImage(zaba, jedzenie.x, jedzenie.y, 40, 40);
    }

    /*Ustalenie starej pozycji*/
    let glowaX = snake[0].x;
    let glowaY = snake[0].y;

    /*Określenie kierunku*/
    switch (kierunek) {
        case "lewo":
            glowaX = glowaX - 40;
            glowa.src = "img/head_lewo.png"
            break;
        case "gora":
            glowaY = glowaY - 40;
            glowa.src = "img/head_gora.png"
            break;
        case "dol":
            glowaY = glowaY + 40;
            glowa.src = "img/head_dol.png"
            break;
        case "prawo":
            glowaX = glowaX + 40;
            glowa.src = "img/head_prawo.png"
            break;
    }

    /*Działanie, gdy snake zje posiłek*/
    if (glowaX == jedzenie.x && glowaY == jedzenie.y) {
        zjedzone.play();
        wynik++;
        jedzenie = {
            x: Math.floor(Math.random() * 20) * 40,
            y: Math.floor(Math.random() * 20) * 40
        }
        losowa = getRandomInt(0, 3);
    } else {
        snake.pop();
    }

    /*Dodanie nowej głowy*/
    let nowaglowa = {
        x: glowaX,
        y: glowaY
    }

    /*Koniec gry*/
    if (glowaX < 0 || glowaX > 19 * 40 || glowaY < 0 || glowaY > 19 * 40 || kolizja(nowaglowa, snake)) {
        clearInterval(odswiez);
        muzwtle.pause();
        koniec.play();
    }

    /*Aktualizacja snake'a*/
    snake.unshift({ x: glowaX, y: glowaY });

    /*Wyświetlanie wyniku*/
    ctx1.drawImage(waz, 5, -5, 80, 80);
    ctx1.fillStyle = "black";
    ctx1.font = "50px Changa one";
    ctx1.fillText(wynik, 90, 55);
}

let odswiez = setInterval(rysuj, 100);

/*Funkcja sprawdzająca czy wystąpiła kolizja*/
function kolizja(glowa, tablica) {
    for (let i = 0; i < tablica.length; i++) {
        if (glowa.x == tablica[i].x && glowa.y == tablica[i].y) {
            return true;
        }
    }
    return false;
}

/*Sprawdzanie naciśniętego klawisza*/
document.addEventListener("keydown", sprawdzKlaw);
function sprawdzKlaw(event) {
    switch (event.keyCode) {
        case 37:
            if (kierunek != "prawo") {
                ruch.play();
                kierunek = "lewo";
            }
            break;
        case 38:
            if (kierunek != "dol") {
                ruch.play();
                kierunek = "gora";
            }
            break;
        case 39:
            if (kierunek != "lewo") {
                ruch.play();
                kierunek = "prawo";
            }
            break;
        case 40:
            if (kierunek != "gora") {
                ruch.play();
                kierunek = "dol";
            }
            break;
    }
}

/*Funkcja odpowiedzialna za odtwarzanie muzyki w tle*/
document.addEventListener("click", muzyka);
function muzyka(event) {
    var idelementu = event.target.id;

    if (idelementu == "on") {
        muzwtle.volume = 0.25;
        muzwtle.play();
        setTimeout(odczekanie, 4000);
        muzwtle.loop = true;
    }
    if (idelementu == "off") {
        muzwtle.pause();
    }
}

function odczekanie() {
    muzwtle.volume = 1;
}

/*Funkcja losująca liczby potrzebne do rozpoznania pokarmu*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}