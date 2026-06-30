// Game State
const gameState = {
    currentGame: null,
    score: 0,
    totalQuestions: 5,
    currentQuestion: 0,
    answers: [],
    currentProblem: null
};

// Fruit emojis for addition and subtraction
const fruits = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍉', '🍑', '🥝'];

// Money denominations
const money = {
    coins: [
        { value: 1, emoji: '🪙', label: '1 sen' },
        { value: 5, emoji: '🪙', label: '5 sen' },
        { value: 10, emoji: '🪙', label: '10 sen' },
        { value: 20, emoji: '🪙', label: '20 sen' },
        { value: 50, emoji: '🪙', label: '50 sen' }
    ],
    notes: [
        { value: 1, emoji: '💵', label: 'RM1' },
        { value: 5, emoji: '💵', label: 'RM5' },
        { value: 10, emoji: '💵', label: 'RM10' },
        { value: 50, emoji: '💵', label: 'RM50' }
    ]
};

// Time options (in 12-hour format)
const timeOptions = [
    { hour: 3, minute: 0, label: '3:00' },
    { hour: 6, minute: 0, label: '6:00' },
    { hour: 9, minute: 0, label: '9:00' },
    { hour: 12, minute: 0, label: '12:00' },
    { hour: 1, minute: 30, label: '1:30' },
    { hour: 2, minute: 15, label: '2:15' },
    { hour: 4, minute: 45, label: '4:45' }
];

// Start Game Function
function startGame(gameType) {
    gameState.currentGame = gameType;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    gameState.answers = [];
    
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById(`${gameType}Game`).classList.remove('hidden');
    
    loadQuestion();
}

// Back to Menu Function
function backToMenu() {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    
    const games = ['tambahGame', 'tolakGame', 'masaGame', 'wangGame'];
    games.forEach(game => {
        document.getElementById(game).classList.add('hidden');
    });
    
    gameState.currentGame = null;
}

// Load Question Based on Game Type
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        showResults();
        return;
    }

    const gameType = gameState.currentGame;
    
    switch(gameType) {
        case 'tambah':
            generateTambahQuestion();
            break;
        case 'tolak':
            generateTolakQuestion();
            break;
        case 'masa':
            generateMasaQuestion();
            break;
        case 'wang':
            generateWangQuestion();
            break;
    }
}

// TAMBAH (Addition) Game
function generateTambahQuestion() {
    const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
    const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
    const answer = num1 + num2;
    
    gameState.currentProblem = {
        num1: num1,
        num2: num2,
        answer: answer
    };
    
    displayTambahQuestion(num1, num2, answer);
}

function displayTambahQuestion(num1, num2, answer) {
    document.getElementById('fruit-group1').innerHTML = '';
    document.getElementById('fruit-group2').innerHTML = '';
    
    const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    for (let i = 0; i < num1; i++) {
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        fruit.textContent = selectedFruit;
        document.getElementById('fruit-group1').appendChild(fruit);
    }
    
    for (let i = 0; i < num2; i++) {
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        fruit.textContent = selectedFruit;
        document.getElementById('fruit-group2').appendChild(fruit);
    }
    
    const options = [answer];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('tambahOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, answer);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('tambahFeedback').innerHTML = '';
}

// TOLAK (Subtraction) Game
function generateTolakQuestion() {
    let num1 = Math.floor(Math.random() * 8) + 3; // 3-10
    const num2 = Math.floor(Math.random() * num1) + 1; // Less than num1
    const answer = num1 - num2;
    
    gameState.currentProblem = {
        num1: num1,
        num2: num2,
        answer: answer
    };
    
    displayTolakQuestion(num1, num2, answer);
}

function displayTolakQuestion(num1, num2, answer) {
    document.getElementById('fruit-group3').innerHTML = '';
    document.getElementById('fruit-group4').innerHTML = '';
    
    const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    for (let i = 0; i < num1; i++) {
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        fruit.textContent = selectedFruit;
        document.getElementById('fruit-group3').appendChild(fruit);
    }
    
    const group4 = document.getElementById('fruit-group4');
    for (let i = 0; i < num2; i++) {
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        fruit.textContent = selectedFruit;
        fruit.style.opacity = '0.5';
        fruit.style.textDecoration = 'line-through';
        group4.appendChild(fruit);
    }
    
    const options = [answer];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('tolakOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, answer);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('tolakFeedback').innerHTML = '';
}

// MASA (Time) Game
function generateMasaQuestion() {
    const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    
    gameState.currentProblem = {
        time: time,
        answer: time.label
    };
    
    displayMasaQuestion(time);
}

function displayMasaQuestion(time) {
    drawClock(time.hour, time.minute);
    
    document.getElementById('masaQuestion').textContent = 'Berapa jam menunjukkan jam tersebut?';
    
    const options = [time.label];
    const availableTimes = timeOptions.filter(t => t.label !== time.label);
    
    for (let i = 0; i < 3 && availableTimes.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableTimes.length);
        options.push(availableTimes[randomIndex].label);
        availableTimes.splice(randomIndex, 1);
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('masaOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, time.label);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('masaFeedback').innerHTML = '';
}

function drawClock(hour, minute) {
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    
    const minuteAngle = (minute / 60) * 360;
    const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30;
    
    minuteHand.setAttribute('x2', 100 + 70 * Math.sin(minuteAngle * Math.PI / 180));
    minuteHand.setAttribute('y2', 100 - 70 * Math.cos(minuteAngle * Math.PI / 180));
    
    hourHand.setAttribute('x2', 100 + 40 * Math.sin(hourAngle * Math.PI / 180));
    hourHand.setAttribute('y2', 100 - 40 * Math.cos(hourAngle * Math.PI / 180));
}

// WANG (Money) Game
function generateWangQuestion() {
    const targetAmount = Math.floor(Math.random() * 50) + 5; // 5-55
    const moneyTypes = ['coins', 'notes'];
    const moneyType = moneyTypes[Math.floor(Math.random() * moneyTypes.length)];
    
    const combination = generateMoneyCombination(targetAmount, moneyType);
    
    gameState.currentProblem = {
        amount: targetAmount,
        combination: combination,
        moneyType: moneyType
    };
    
    displayWangQuestion(combination, targetAmount);
}

function generateMoneyCombination(amount, type) {
    const denominations = type === 'coins' ? money.coins : money.notes;
    const combination = [];
    let remaining = amount;
    
    for (let i = denominations.length - 1; i >= 0 && remaining > 0; i--) {
        const count = Math.floor(remaining / denominations[i].value);
        if (count > 0) {
            for (let j = 0; j < count; j++) {
                combination.push(denominations[i]);
            }
            remaining -= count * denominations[i].value;
        }
    }
    
    return combination;
}

function displayWangQuestion(combination, targetAmount) {
    const moneyVisual = document.getElementById('moneyVisual');
    moneyVisual.innerHTML = '';
    
    combination.forEach(item => {
        const element = document.createElement('div');
        element.style.fontSize = '3em';
        element.textContent = item.emoji;
        moneyVisual.appendChild(element);
    });
    
    document.getElementById('wangQuestion').textContent = `Jumlah wang di atas ialah berapa?`;
    
    const options = [targetAmount];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * 100) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('wangOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, targetAmount);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('wangFeedback').innerHTML = '';
}

// Check Answer Function
function checkAnswer(selectedAnswer, correctAnswer) {
    const gameType = gameState.currentGame;
    const feedbackElement = document.getElementById(`${gameType}Feedback`);
    const buttons = document.querySelectorAll(`#${gameType}Options .option-btn`);
    
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = selectedAnswer === correctAnswer;
    
    buttons.forEach(btn => {
        if (parseInt(btn.textContent) === selectedAnswer || btn.textContent === selectedAnswer) {
            if (isCorrect) {
                btn.classList.add('correct');
                feedbackElement.classList.remove('wrong');
                feedbackElement.classList.add('correct');
                feedbackElement.textContent = '✓ Betul! Bagus sekali!';
                gameState.score++;
            } else {
                btn.classList.add('wrong');
                feedbackElement.classList.remove('correct');
                feedbackElement.classList.add('wrong');
                feedbackElement.textContent = `✗ Salah! Jawapan yang betul ialah ${correctAnswer}`;
            }
        }
    });
    
    document.getElementById(`${gameType}Score`).textContent = gameState.score;
    
    gameState.currentQuestion++;
    setTimeout(() => {
        loadQuestion();
    }, 2000);
}

// Show Results Function
function showResults() {
    const gameType = gameState.currentGame;
    const score = gameState.score;
    const total = gameState.totalQuestions;
    const percentage = Math.round((score / total) * 100);
    
    document.getElementById(`${gameType}Game`).classList.add('hidden');
    
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    let emoji = '😢';
    let message = 'Cuba lagi!';
    
    if (percentage === 100) {
        emoji = '🏆';
        message = 'Sempurna! Anda bijak!';
    } else if (percentage >= 80) {
        emoji = '😄';
        message = 'Luar biasa!';
    } else if (percentage >= 60) {
        emoji = '😊';
        message = 'Bagus! Teruskan berlatih.';
    } else if (percentage >= 40) {
        emoji = '😐';
        message = 'Anda boleh lebih baik. Cuba lagi!';
    }
    
    const gameNames = {
        'tambah': 'Tambah',
        'tolak': 'Tolak',
        'masa': 'Masa',
        'wang': 'Wang'
    };
    
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <div class="result-score">${score} / ${total}</div>
        <div class="result-percentage" style="font-size: 1.5em; margin: 15px 0;">${percentage}%</div>
        <div class="result-message">${message}</div>
        <div style="margin-top: 20px; font-size: 1em;">Permainan: ${gameNames[gameType]}</div>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainMenu').classList.remove('hidden');
});