function startGame() {

	for (var i = 1; i <= 9; i = i + 1) {
		clearBox(i);
	}
	document.winner = null;
	document.strategy = 7;
	document.counter=0;
	document.totalTurns =1;
	document.getElementById("s" + 7).innerText = "O";
	setMessage("Computer gets to start.");
}

function setMessage(msg) {
	document.getElementById("message").innerText = msg;
}

function nextMove(square) {
	if (document.winner != null) {
		alert("Game Over");
		setMessage(document.winner + " already won the game.");
	} else if (square.innerText == "") {
		square.innerText = "X";
		document.counter= document.counter+1;
		document.totalTurns = document.totalTurns+1;
		if(document.totalTurns==9){
			setMessage("It's a Tie!!");
		}
		if(checkForWinner("X")){
			setMessage("Congratulations! You win!");
			document.winner = "X";
		}
		else{
			computerPlay();	
			document.totalTurns = document.totalTurns+1;
			if(checkForWinner("O")){
				setMessage("Sorry You Lost");
				document.winner = "O";
			}
			if(document.totalTurns==9){
				setMessage("It's a Tie!!");
			}
		}
	} else {
		setMessage("That square is already used.");
	}
}

function computerPlay(){
	var move = makeMove();
	console.log(move);
	if(move==0){
		if (document.counter == 1) {
			switch(document.strategy){
				case 1: document.getElementById("s" + 3).innerText = "O";break;
				case 2: document.getElementById("s" + 9).innerText = "O";break;
				case 3: document.getElementById("s" + 1).innerText = "O";break;
				case 4: document.getElementById("s" + 9).innerText = "O";break;
				case 5: document.getElementById("s" + 3).innerText = "O";break;
				case 6: document.getElementById("s" + 1).innerText = "O";break;
				case 8: document.getElementById("s" + 1).innerText = "O";break;
				case 9: document.getElementById("s" + 3).innerText = "O";break;
			}
		}
		else{
			switch(document.strategy){
				case 3: document.getElementById("s" + 9).innerText = "O";break;
				case 4: document.getElementById("s" + 5).innerText = "O";break;
				case 5: document.getElementById("s" + (document.getElementById("s" + 1).innerText == "X" ?  9: 1)).innerText = "O";break;
				case 8: document.getElementById("s" + 3).innerText = "O";break;
			}
		}
	}
	else{
		document.getElementById("s" + move).innerText = "O";
	}
}

function makeMove(){
	for(var i=0;i<2;i++){
		if(checkSet(1, 2, 3, i)!=0){
			return checkSet(1,2,3,i);
		}
		if(checkSet(4, 5, 6,i)!=0){
			return checkSet(4,5,6,i);
		}
		if(checkSet(7, 8, 9,i)!=0){
			return checkSet(7,8,9,i);
		}
		if(checkSet(1, 4,7,i)!=0){
			return checkSet(1,4,7,i);
		}
		if(checkSet(2, 5, 8,i)!=0){
			return checkSet(2,5,8,i);
		}
		if(checkSet(3, 6, 9,i)!=0){
			return checkSet(3,6,9,i);
		}
		if(checkSet(1, 5, 9,i)!=0){
			return checkSet(1,5,9,i);
		}
		if(checkSet(3, 5, 7,i)!=0){
			return checkSet(3,5,7,i);
		}
	}
	
	return 0;

}

function checkSet(a, b, c,m){
	var t = [];
	t.push(getBox(a));
	t.push(getBox(b));
	t.push(getBox(c));

	var copy = [];

	for(var i=0;i<t.length;i++){
		copy.push(t[i]);
	}

	for(var i=0;i<copy.length;i++){
		if(copy[i]==""){
			copy.splice(i, 1);
		}
	}

	if(copy[0]==copy[1] && copy[0]=="O" && m==0 && copy.length==2){
		for(var i =0;i<t.length;i++){
			if(t[i]==""){
				if(i==0){return a;}
				else if(i==1){return b;}
				else{return c;}
			}
		}
	}
	else if(copy[0]==copy[1] && copy[0]=="X" && m==1 && copy.length==2){
		for(var i =0;i<t.length;i++){
			if(t[i]==""){
				if(i==0){return a;}
				else if(i==1){return b;}
				else{return c;}
			}
		}
	}
	else{
		return 0;
	}

	return 0;
}
function checkForWinner(move) {
	var result = false;
	if (checkRow(1, 2, 3, move) || 
		checkRow(4, 5, 6, move) ||
		checkRow(7, 8, 9, move) || 
		checkRow(1, 4, 7, move) ||
		checkRow(2, 5, 8, move) ||
		checkRow(3, 6, 9, move) ||
		checkRow(1, 5, 9, move) ||
		checkRow(3, 5, 7, move)) {
		
		result = true;
	}
	return result;
}

function checkRow(a, b, c, move) {
	var result = false;
	if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
		result = true;
	}
	return result;
}

function getBox(number) {
	return document.getElementById("s" + number).innerText;
}

function clearBox(number) {
	document.getElementById("s" + number).innerText = "";
}
