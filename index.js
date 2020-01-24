let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);


function startGame() {
    //console.log('Start');
    //hide 'Start' button
    $start.classList.add('hide');
    //change background color of frame
    $game.style.backgroundColor = '#fff';

    renderBox();
}

function handleBoxClick(event) {
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
    let maxLeft = fieldGameSize - boxSize;

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