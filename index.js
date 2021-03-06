let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $result = document.querySelector('#result');
let $gameTime = document.querySelector('#game-time');

let colors = ['red', 'blue', 'yellow', 'pink', 'green'];
let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);


function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', true);
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
    isGameStarted = true;
    //console.log('Start');
    //hide 'Start' button
    $start.classList.add('hide');
    //change background color of frame
    $game.style.backgroundColor = '#fff';
    let interval = setInterval(function() {
        let time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);


    renderBox();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    let defaultTime = +$gameTime.value;
    $time.textContent = defaultTime.toFixed(1);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    $start.classList.remove('hide');
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    $timeHeader.classList.add('hide');
    $resultHeader.classList.remove('hide');
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

//Generate random Box
function renderBox() {
    $game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(10, 100);
    let fieldGameSize = $game.getBoundingClientRect();
    let maxTop = fieldGameSize.height - boxSize;
    let maxLeft = fieldGameSize.width - boxSize;
    let randomColorIndex = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';;
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $game.insertAdjacentElement('afterbegin', box);

}

//Generate random square size and position
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}