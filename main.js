'use strict'
var game = {};
game.playerHp=100;
game.playerAttMax=20;
game.playerAttMin =10;
game.playerEsquiveMax =50;
game.playerEsquiveMin =10;
game.dragonHP = 200;
game.dragonAttMax =50;
game.dragonAttMin =10;
game.playerEsquiveMax =50;
game.playerEsquiveMin =10;
game.potion =2;
game.round =1;						

$('#envoiFighter').on("click",selectFighter);
$('#envoiFighter').on("click",hideChoseFighter);
$('#envoiDragon').on("click",selectDragon);
$('#envoiDragon').on("click",hideChoseDragon);
$('#envoiDragon').on("click",loop);
$('#quit').on("click",quitt);
$('#replay').on("click",refresh);
$("#next").on("click",loop);

function usePotion(){
	if (game.potion >0 ) {
	game.playerHp = game.playerHp + 100;
	console.log(game.playerHp);
	$("#text").append("<p>Utilisation de la potion. Les HP remontent de 100.</p>");

			
	game.potion--;	
}
else{
	$("#text").append("<p>Vous n'avez plus de potion</p>");
	
			
}
}

function selectFighter(){
	var fighter = $("input:checked").val();
	if (fighter == "chevalier") {
		game.playerAttMax= 50;
	}
	else if (fighter == "nain") {
		game.playerHp = 150;
	}
	else{
		game.playerEsquiveMax = 70;
	}
}

function hideChoseFighter(){
	$("#choseFighter").slideUp("low");
	$("#choseDragon").slideDown("low");
}

function selectDragon(){
	var dragon = $("input:checked").val();
	if (dragon == "black") {
		game.dragonAttMax= 70;
	}
	else if (dragon == "ice") {
		game.dragonHp = 150;
	}
	else{
		game.dragonEsquiveMax = 70;
	}
	
}

function hideChoseDragon(){
	$("#choseDragon").slideUp("low");
	$("#attack").slideDown("low");
}
function protect(attack){
	var esquive = Math.random();
	if (esquive < .5) {
		$("#text").append("<p>l'attaque est déviée la puissance de l'attaque est divisée par deux. </p>");
	return(attack = attack/2);
	}
	else{
		return(attack);
	}
}

function getRand(min,max){
	return Math.floor(Math.random()*(max-min + 1)) + min;
}

function refresh(){
	location.reload();
}

function quitt(){
	$("#Winner").html("");
	$("#Winner").html("<h3>Merci d'avoir jouer!</h3>");
}

function GameWinner(){
	$("#attack").slideUp('fast');
	$("#Winner").slideDown('fast');
	
	switch(game.winner){

		case 1 :
			$("#Winner").append("<h1>Vous avez gagné!</h1><br> <img src='img/minicloud.gif'>");
			
		break;

		case 2 :
			$("#Winner").append("<h1>Vous avez perdu!</h1><img src='img/2336.gif'> ");
		break;
	}

}

function loop(){
			fight();
}

function fight(){
	
		$("#text").html("<h2>round: "+game.round+"</h2>");
		var random =  Math.random();

		if (random < .5) {
			game.playerAtt = getRand(game.playerAttMin,game.playerAttMax);
		$("#text").append("<img src='img/zseph.gif'>");
		$("#text").append("<p>Le joueur attaque le dragon avec un puissance de "+game.playerAtt+" PA</p>");
		game.dragonHP = game.dragonHP - protect(game.playerAtt) ;

		}
		else{
			game.dragonAtt = getRand(game.dragonAttMin,game.dragonAttMax);
			$("#text").append("<img src='img/dragon3.gif'><br>");
			
			$("#text").append("<p>Le dragon attaque le joueur avec un puissance de "+game.dragonAtt+" PA</p>");
			game.playerHp = game.playerHp - protect(game.dragonAtt);

		}
		
		$("#text").append("<p>Les points de vie du dragons sont à "+game.dragonHP+" HP</p>");
		$("#text").append("<p>les points de vie du joueur sont à "+game.playerHp+" HP</p>");
		if(game.potion>0 ){

		$("#text").append('<button id="potion" name="potion" value="usePotion"><i class="fa fa-flask" aria-hidden="true"></i></button>');
		$("#potion").on("click",usePotion);
		$("#text").append("<p>les points de vie du joueur sont à "+game.playerHp+" HP </p>");

		}
			game.round ++;
		if (game.playerHp < 0 || game.dragonHP < 0) {
			if(game.playerHp <= 0){
				game.winner = 2;
			}
			else{
				game.winner = 1;
			}
			GameWinner();
			$("#attack").slideUp('fast');
			$("#Winner").slideDown('low');
		}
}
