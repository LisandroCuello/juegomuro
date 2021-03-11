var objetoJuego;
var obstaculos = [];
var limite = [];
var nombre = prompt("Ingrese su nombre")
var puntosSumados = [];

const bt = window.addEventListener('keydown',function(e){
			areaDeJuego.tecla = e.keyCode;
			btArriba = areaDeJuego.tecla;

			window.addEventListener('keyup', function(e){
						areaDeJuego.tecla = false;
					});
			return btArriba

		});
		

//Inicio de Juego. Se Crea el canvas, el tablero de puntos y los primeros los obstaculos y limites
function arrancarJuego(){
	objetoJuego = new componente(30,30,"red",10,120,"circulo");
	puntos = new componente("15px", "consola", "black", 280, 40, "texto");
	limite.push(new componente(500, 1, "red", 0, 0));
	limite.push(new componente(500, 1, "red", 0, 249,9));

	areaDeJuego.inicio();
}


//Constructor del Canvas
var areaDeJuego = {
	canvas : document.createElement("canvas"),

	inicio : function() {
		this.canvas.width = 500;
		this.canvas.height = 250;
		this.contexto = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frame = 0;
		this.intervalo = setInterval(areaDeJuegoActualizada,20);
	
	},
	borrar : function(){
		this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	parar : function(){
		clearInterval(this.intervalo);
	}
}


//Constructor para los obstaculos, limites y tablero de puntos
function componente(width, height, color, x, y, tipo){
	this.tipo = tipo;
	this.width = width;
	this.height = height;
	this.velocidadX = 0;
	this.velocidadY = 0;
	this.x = x;
	this.y = y;

	this.actualizar = function(){
		ctxt = areaDeJuego.contexto;
		
		if (tipo == "texto") {
			ctxt.font = this.width + " " + this.height;
			ctxt.fillStyle = color;	
			ctxt.fillText(this.texto, this.x, this.y);
		} else {
				ctxt.fillStyle = color; 
				ctxt.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	this.movimiento = function(){
		this.x += this.velocidadX;
		this.y += this.velocidadY;
		objetoJuego.velocidadX = 0;
		objetoJuego.velocidadY = 0;
		
		if (areaDeJuego.tecla && areaDeJuego.tecla ==38){
			objetoJuego.velocidadY = -3; 
		}
		if (areaDeJuego.tecla && areaDeJuego.tecla ==40){
			objetoJuego.velocidadY = 3;
		}
	}

	this.chocar = function(otroObj){
		var izq = this.x;
		var der = this.x + (this.width);
		var arr = this.y;
		var aba = this.y + (this.height);

		var otroIzquierda = otroObj.x;
		var otroDerecha = otroObj.x + (otroObj.width);
		var otroArriba = otroObj.y;
		var otroAbajo = otroObj.y + (otroObj.height);

		var choque = true;

		if ((aba < otroArriba)||
			(arr > otroAbajo)||
			(der < otroIzquierda)||
			(izq > otroDerecha)){
			choque = false;
		}
		return choque;
	}
}


//funcion que calcula el intevalo entre los obstaculos
function intervalos(n){
	if ((areaDeJuego.frame / n) % 1 == 0) {
		return true;
	}
	return false;
}

//funcion para juntar todos los Objetos
function areaDeJuegoActualizada(){
	var x, height, distancia,
		minHeight, maxHeight,
		minDistancia,
		maxDistancia;


	for (i = 0; i < obstaculos.length; i +=1){
		if (objetoJuego.chocar(obstaculos[i])) {
			areaDeJuego.parar();
			return;
		}
	}

	for (i = 0; i < limite.length; i +=1){
		if (objetoJuego.chocar(limite[i])) {
			areaDeJuego.parar();
			return;
		}
	}

	areaDeJuego.borrar();
	areaDeJuego.frame +=1;

	//Niveles
	/*Nivel 1. Crea dos obstaculos uno arriba del otro con una distacia min y max random, cada cierto tiempo(intervalo) ,y si los puntos concuerdan, se crean dos mas*/
	if (areaDeJuego.frame == 1 || intervalos(100) && puntosSumados.length < 1000){
		
		x = areaDeJuego.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		minDistancia = 50;
		maxDistancia = 100;

		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		distancia = Math.floor(Math.random()*(maxDistancia-minDistancia+1)+minDistancia);
	
		obstaculos.push(new componente(10, height, "red", x, 0));
		obstaculos.push(new componente(10, x - height - distancia, "red", x, height + distancia));
	}
	//Nivel 2. Aumenta la velocidad en la que se crea los obstaculos, ademas se disminuye la distancia entre el de arriba y el de abajo
	else if(intervalos(90) && puntosSumados.length > 1000 && puntosSumados.length < 2000){
		
			x = areaDeJuego.canvas.width;
			minHeight = 20;
			maxHeight = 200;
			minDistancia = 50;
			maxDistancia = 80;

			height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			distancia = Math.floor(Math.random()*(maxDistancia-minDistancia+1)+minDistancia);
	
			obstaculos.push(new componente(10, height, "blue", x, 0));
			obstaculos.push(new componente(10, x - height - distancia, "blue", x, height + distancia));


	}
	//nivel 3. vuelve a disminuir la distancia y el intevalo
	else if(intervalos(60) && puntosSumados.length > 2000 && puntosSumados.length < 3000){

			x = areaDeJuego.canvas.width;
			minHeight = 20;
			maxHeight = 200;
			minDistancia = 50;
			maxDistancia = 60;

			height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			distancia = Math.floor(Math.random()*(maxDistancia-minDistancia+1)+minDistancia);
	
			obstaculos.push(new componente(10, height, "black", x, 0));
			obstaculos.push(new componente(10, x - height - distancia, "black", x, height + distancia));
		
	}
	//nivel 4. Se mantiene la distancia y el intervalo del nivel anterior pero se cambia en color del fondo de canvas con transition en css
	else if(intervalos(60) && puntosSumados.length > 3000){

			x = areaDeJuego.canvas.width;
			minHeight = 20;
			maxHeight = 200;
			minDistancia = 50;
			maxDistancia = 60;

			height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			distancia = Math.floor(Math.random()*(maxDistancia-minDistancia+1)+minDistancia);
	
			obstaculos.push(new componente(10, height, "red", x, 0));
			obstaculos.push(new componente(10, x - height - distancia, "red", x, height + distancia));
			
			var canvas = document.querySelector("canvas");
			canvas.className ='fondo';

	}
	else if( intervalos(60) && puntosSumados.length == 4000){

			alert(`ganaste ${nombre}!!!`);
	}


	//velocidad en la que se desplazan los obstaculos y limites dentro del canvas
	for (i = 0; i < obstaculos.length; i += 1) {
		obstaculos[i].x += -3;
		obstaculos[i].actualizar();
	}

	for (i = 0; i < limite.length; i += 1) {
		limite[i].x += -0;
		limite[i].actualizar();
	}

	puntos.texto = `Puntos de ${nombre}:  ` + areaDeJuego.frame;
	puntosSumados.push(areaDeJuego.frame);
	puntos.actualizar();
	objetoJuego.movimiento();
	objetoJuego.actualizar();
}

