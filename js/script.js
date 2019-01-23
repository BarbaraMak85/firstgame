var params = {
    gameState: 'notStarted',
    progress: [],
    player: {
        name: '',
        score: 0
    },
    playerPointsElem: document.getElementById('js-playerPoints'),
    playerNameElem: document.getElementById('js-playerName'),
    computerPointsElem: document.getElementById('js-computerPoints'),
    computer: {
        score: 0
    },
    newGameElem: document.getElementById('js-newGameElement'),
    pickElem: document.getElementById('js-playerPickElement'),
    resultsElem: document.getElementById('js-resultsTableElement'),
    playerPickElem: document.getElementById('js-playerPick'),
    computerPickElem: document.getElementById('js-computerPick'),
    playerResultElem: document.getElementById('js-playerResult'),
    computerResultElem: document.getElementById('js-computerResult'),
    elements: document.getElementsByClassName("player-move"),
    newGameBtn: document.getElementById('js-newGameButton'),
    pickRock: document.getElementById('js-playerPick_rock'),
    pickPaper: document.getElementById('js-playerPick_paper'),
    pickScissors: document.getElementById('js-playerPick_scissors')

}

params.newGameBtn.addEventListener('click', newGame);

function setGameElements() {
    params.progress = [];

    switch (params.gameState) {
        case 'started':
            params.newGameElem.style.display = 'none';
            params.pickElem.style.display = 'block';
            params.resultsElem.style.display = 'block';
            break;
        case 'ended':
            params.newGameBtn.innerText = 'Play agin';
        case 'notStarted':
        default:
            params.newGameElem.style.display = 'block';
            params.pickElem.style.display = 'none';
            params.resultsElem.style.display = 'none';
    }
}

setGameElements();


function newGame() {
    params.player.name = prompt('Please enter your name', 'Imię gracza');
    if (params.player.name) {
        params.player.score = params.computer.score = 0;
        params.gameState = 'started';
        setGameElements();
        params.playerNameElem.innerHTML = params.player.name;
        setGamePoints();
    }

}

function checkWinner() {
    if (params.player.score >= 10) {
        params.gameState = 'ended';
        showModal('Wygrałeś runde!')
        setGameElements();
    } else if (params.computer.score >= 10) {
        params.gameState = 'ended';
        showModal('Przegrałeś runde!')
        setGameElements();
    } else {};
}


function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function playerMove(move, isComputerMove, roundWinner) {

    if (!isComputerMove) {
        var newRound = {
            roundId: params.progress.length,
            playerMove: move
        };

        params.progress.push(newRound);
    } else {
        var round = params.progress[params.progress.length - 1];
        round.computerMove = move;
        round.roundWinner = roundWinner;

        var newTableRow = document.createElement("tr");
        newTableRow.innerHTML = "<td>" + round.roundId + "</td><td>" + round.playerMove + "</td><td>" + round.computerMove + "</td><td>" + round.roundWinner + "</td>" + "<td>" + gameResult() + "</td>";
        document.getElementById("result-table").appendChild(newTableRow);


    }
}

function gameResult() {

    var computerWin = 0;
    var playerWin = 0;

    var roundWinners = params.progress.map(x => x.roundWinner);
    computerWin = roundWinners.filter(x => x == "computer").length;
    playerWin = roundWinners.filter(x => x == "player").length;

    return playerWin + "-" + computerWin;
}


function checkRoundWinner(playerPick, computerPick) {
    params.playerResultElem.innerHTML = params.computerResultElem.innerHTML = '';
    var winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        params.playerResultElem.innerHTML = "Win!";
        params.player.score++;
    } else if (winnerIs == 'computer') {
        params.computerResultElem.innerHTML = "Win!";
        params.computer.score++;
    }

    return winnerIs;
}


function setGamePoints() {
    params.playerPointsElem.innerHTML = params.player.score;
    params.computerPointsElem.innerHTML = params.computer.score;
}


function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerMove(playerPick, false);
    params.playerPickElem.innerHTML = playerPick;
    params.computerPickElem.innerHTML = computerPick;
    var roundWinner = checkRoundWinner(playerPick, computerPick);
    playerMove(computerPick, true, roundWinner);
    checkWinner();
    setGamePoints();

}

for (i = 0; i < params.elements.length; i++) {
    var element = params.elements[i];

    element.onclick = (function() {

        var move = element.getAttribute("data-move");

        return function() {
            playerPick(move);
        }
    })();

}