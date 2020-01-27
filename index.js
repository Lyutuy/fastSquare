let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);


function startGame() {
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

function endGame() {
    isGameStarted = false;
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

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#000';
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