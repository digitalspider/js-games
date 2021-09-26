var currentAnimalIndex = 0;
var gameList;
var type;

function initGame(gameType) {
  var gameStarted = document.getElementById('gameStarted');
  var gameLoading = document.getElementById('gameLoading');
  gameStarted.style.display = 'none';
  gameLoading.style.display = 'none';
  if (gameType) {
    type = gameType;
    gameStarted.style.display = 'block';
    var gameTypeElements = document.getElementsByClassName('gameType');
    for (gameTypeEle of gameTypeElements) {
      gameTypeEle.textContent = gameType;
    }
    gameList = gameData[gameType];
    if (gameList) {
      loadAnimal(gameType, gameList, currentAnimalIndex);
    } else {
      console.err('No game list loaded');
    }
  } else {
    var choices = Object.getOwnPropertyNames(gameData);
    for (choice of choices) {
      gameLoading.innerHTML += `<button id="${choice}" onclick="startGame(this)">${choice}</button><br/>`
    }
    gameLoading.style.display = 'block';
  }
}

function startGame(buttonElement) {
  // console.log(buttonElement.id);
  initGame(buttonElement.id);
}

function nextAnswer() {
  document.getElementById('answerWrong').style.display = 'none';
  document.getElementById('answerCorrect').style.display = 'none';
  currentAnimalIndex++;
  loadAnimal(type, gameList, currentAnimalIndex);
}

function clickButton(element) {
  document.getElementById('answerWrong').style.display = 'none';
  document.getElementById('answerCorrect').style.display = 'none';
  var wrongElement = document.getElementById('answerWrong');
  var correctElement = document.getElementById('answerCorrect');
  console.log(element);
  var isCorrect = element.getAttribute('isCorrect');
  console.log(isCorrect);
  if (isCorrect == 'true') {
    correctElement.style.display = 'block';
  } else {
    wrongElement.style.display = 'block';
  }
}

function randomNumber(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColour() {
  var red = randomNumber(0,256).toString(16);
  var green = randomNumber(0,256).toString(16);
  var blue = randomNumber(0,256).toString(16);
  var backgroundColour = `#${red}${green}${blue}`; // RGB = Red Green Blue 256x256x256
  return backgroundColour;
}

function loadAnimal(gameType, gameList, currentAnimalIndex) {
  document.getElementById('body').style.backgroundColor = getRandomColour();
  var animalObject = gameList[currentAnimalIndex];
  const { imageName, correctAnswer, options } = animalObject;
  var imageUrl = imageName && imageName.startsWith('http') ? imageName : `img/${gameType}/${imageName}`;
  document.getElementById('image').setAttribute('src', imageUrl);
  var option1 = document.getElementById('option1');
  var option2 = document.getElementById('option2');
  var option3 = document.getElementById('option3');
  document.getElementById('correctAnimal').innerHTML = correctAnswer;
  option1.innerHTML = options[0];
  option2.innerHTML = options[1];
  option3.innerHTML = options[2];
  option1.setAttribute('isCorrect', 'false');
  option2.setAttribute('isCorrect', 'false');
  option3.setAttribute('isCorrect', 'false');
  var index = options.indexOf(correctAnswer);
  if (index == 0) {
    option1.setAttribute('isCorrect', 'true');
  }
  else if (index == 1) {
    option2.setAttribute('isCorrect', 'true');
  }
  else if (index == 2) {
    option3.setAttribute('isCorrect', 'true');
  }
}
