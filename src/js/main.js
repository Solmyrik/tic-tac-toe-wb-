// массив победных комбинаций
const arrWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

// получаем элементы из DOM
const items = document.querySelectorAll('.item');
const wrapper = document.querySelector('.wrapper');
const popup = document.querySelector('.popup');
const popupText = document.querySelector('.popup__text');
const restarButton = document.querySelector('.restart');

// создаем переменную для определения, чей сейчас ход
let move = false;

// функция для запуска игры
function play() {
  items.forEach((item) => {
    item.addEventListener('click', handleClick);
  });

  classAdd();
}

// обработка клика
function handleClick(e) {
  const cell = e.target;
  const currentClass = move ? 'o' : 'x';
  placeMark(cell, currentClass);
  if (isWin(currentClass)) {
    endgame(false);
    return;
  }
  if (isDraw()) {
    endgame(true);
    return;
  }
  swapTurns();
  classAdd();
}

// функия для получения результата при окончении игры
function endgame(draw) {
  if (draw) {
    popupText.innerText = 'Ничья';
  } else {
    const winner = move ? 'Нолики' : 'Крестики';
    popupText.innerText = `${winner} Победили`;
  }
  popup.classList.add('show');
}

// функция, которая определяет ничью
function isDraw() {
  return [...items].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

// функция для размещения символа игрока путем добавления класса
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// функция изменения хода
function swapTurns() {
  move = !move;
}

// функция добавления класса для элемента
// то бишь нолика или крестика
function classAdd() {
  wrapper.classList.remove('x');
  wrapper.classList.remove('o');
  if (move) {
    wrapper.classList.add('o');
  } else {
    wrapper.classList.add('x');
  }
}

// проверка на комбинацию победы
function isWin(currentClass) {
  return arrWin
    .map((c) => c.every((index) => items[index].classList.contains(currentClass)))
    .includes(true);
}

// функция для перезапуска игры
function restart() {
  items.forEach((item) => {
    item.classList.remove('x');
    item.classList.remove('o');
    item.removeEventListener('click', handleClick);
  });
  move = false;
  popup.classList.remove('show');
}

restarButton.addEventListener('click', (e) => {
  restart();
  play();
});

play();
