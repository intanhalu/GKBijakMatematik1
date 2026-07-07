// Game State
const gameState = {
    currentGame: null,
    currentDifficulty: null,
    score: 0,
    totalQuestions: 10,
    currentQuestion: 0,
    answers: [],
    currentProblem: null,
    questions: []
};

const fruits = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍉', '🍑', '🥝'];

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

const timeOptions = [
    { hour: 1, minute: 0, label: '1:00' },
    { hour: 2, minute: 0, label: '2:00' },
    { hour: 3, minute: 0, label: '3:00' },
    { hour: 4, minute: 0, label: '4:00' },
    { hour: 5, minute: 0, label: '5:00' },
    { hour: 6, minute: 0, label: '6:00' },
    { hour: 7, minute: 0, label: '7:00' },
    { hour: 8, minute: 0, label: '8:00' },
    { hour: 9, minute: 0, label: '9:00' },
    { hour: 10, minute: 0, label: '10:00' },
    { hour: 11, minute: 0, label: '11:00' },
    { hour: 12, minute: 0, label: '12:00' },
    { hour: 1, minute: 30, label: '1:30' },
    { hour: 2, minute: 15, label: '2:15' },
    { hour: 3, minute: 45, label: '3:45' },
    { hour: 4, minute: 30, label: '4:30' },
    { hour: 5, minute: 15, label: '5:15' },
    { hour: 6, minute: 45, label: '6:45' },
    { hour: 7, minute: 30, label: '7:30' },
    { hour: 8, minute: 15, label: '8:15' },
    { hour: 9, minute: 30, label: '9:30' },
    { hour: 10, minute: 45, label: '10:45' },
    { hour: 11, minute: 15, label: '11:15' },
    { hour: 12, minute: 30, label: '12:30' },
    { hour: 2, minute: 30, label: '2:30' },
    { hour: 3, minute: 15, label: '3:15' },
    { hour: 4, minute: 15, label: '4:15' },
    { hour: 5, minute: 45, label: '5:45' },
    { hour: 6, minute: 30, label: '6:30' },
    { hour: 7, minute: 15, label: '7:15' }
];

/*
// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
   }
    return shuffled;
}

// Generate questions for Kenali Nombor (Recognize Numbers)
function generateKenaliNomborQuestions(difficulty) {
    const allQuestions = [];
    let minRange, maxRange;
    
    if (difficulty === 'beginner') {
        minRange = 1;
        maxRange = 10;
    } else if (difficulty === 'intermediate') {
        minRange = 1;
        maxRange = 20;
    } else if (difficulty === 'advanced') {
       minRange = 1;
       maxRange = 50;
        
    }

     //Create 30 questions with random counts
     for (let i = 0; i < 30; i++) {
        const count = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        allQuestions.push({
            count: count,
            type: 'items'
        });
    }
    
    // Shuffle and return first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}*/

// Utility untuk shuffle array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Peta nombor → perkataan ringkas (boleh tambah lagi)
const numberWords = {
    1: "satu", 2: "dua", 3: "tiga", 4: "empat", 5: "lima",
    6: "enam", 7: "tujuh", 8: "lapan", 9: "sembilan", 10: "sepuluh",
    11: "sebelas", 12: "dua belas", 13: "tiga belas", 14: "empat belas",
    15: "lima belas", 16: "enam belas", 17: "tujuh belas", 18: "lapan belas",
    19: "sembilan belas", 20: "dua puluh", 21: "dua puluh satu",
    22: "dua puluh dua", 23: "dua puluh tiga", 24: "dua puluh empat",
    25: "dua puluh lima", 26: "dua puluh enam",
    30: "tiga puluh", 40: "empat puluh", 50: "lima puluh"
};

// Generate questions untuk Kenali Nombor
function generateKenaliNomborQuestions(difficulty) {
    const allQuestions = [];
    let minRange, maxRange;
    
    if (difficulty === 'beginner') {
        minRange = 1;
        maxRange = 10;
    } else if (difficulty === 'intermediate') {
        minRange = 5;
        maxRange = 20;
    } else if (difficulty === 'advanced') {
        minRange = 10;
        maxRange = 50;
    }
    
    for (let i = 0; i < 30; i++) {
        // Untuk advanced, campurkan dua jenis soalan
        if (difficulty === 'advanced' && Math.random() < 0.5) {
            // Soalan jenis word (contoh: tulis 26 dalam perkataan)
            const number = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
            const correctWord = numberWords[number] || number.toString();
            
            // Cari distractors (jawapan salah)
            let options = new Set([correctWord]);
            while (options.size < 4) {
                let randomNum = Math.floor(Math.random() * maxRange) + 1;
                let randomWord = numberWords[randomNum] || randomNum.toString();
                options.add(randomWord);
            }
            
            allQuestions.push({
                type: 'word',
                question: `Tulis nombor ${number} dalam perkataan.`,
                correctAnswer: correctWord,
                options: shuffleArray(Array.from(options))
            });
        } else {
            // Soalan jenis items (kira nombor)
            const count = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
            allQuestions.push({
                type: 'items',
                count: count
            });
        }
    }
    
    // Shuffle dan ambil 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}


// Generate all 30 questions for tambah
function generateTambahQuestions() {
    const allQuestions = [];
    
    // Create 15 fruit-based questions
    for (let i = 0; i < 15; i++) {
        const num1 = Math.floor(Math.random() * 5) + 1;
        const num2 = Math.floor(Math.random() * 5) + 1;
        allQuestions.push({
            type: 'fruit',
            num1: num1,
            num2: num2,
            answer: num1 + num2
        });
    }
    
    // Create 15 number-based questions
    for (let i = 0; i < 15; i++) {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        allQuestions.push({
            type: 'number',
            num1: num1,
            num2: num2,
            answer: num1 + num2
        });
    }
    
    // Shuffle all 30 questions and return only first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}

// Generate all 30 questions for tolak
function generateTolakQuestions() {
    const allQuestions = [];
    
    // Create 15 fruit-based questions
    for (let i = 0; i < 15; i++) {
        let num1 = Math.floor(Math.random() * 8) + 3;
        const num2 = Math.floor(Math.random() * num1) + 1;
        allQuestions.push({
            type: 'fruit',
            num1: num1,
            num2: num2,
            answer: num1 - num2
        });
    }
    
    // Create 15 number-based questions
    for (let i = 0; i < 15; i++) {
        let num1 = Math.floor(Math.random() * 15) + 5;
        const num2 = Math.floor(Math.random() * num1) + 1;
        allQuestions.push({
            type: 'number',
            num1: num1,
            num2: num2,
            answer: num1 - num2
        });
    }
    
    // Shuffle all 30 questions and return only first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}

// Generate all 30 questions for masa
function generateMasaQuestions() {
    const allQuestions = [];
    
    // Create 30 time questions
    for (let i = 0; i < 30; i++) {
        const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];
        allQuestions.push({
            hour: time.hour,
            minute: time.minute,
            answer: time.label
        });
    }
    
    // Shuffle all 30 questions and return only first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}

// Generate all 30 questions for wang
function generateWangQuestions() {
    const allQuestions = [];
    
    // Create 30 money questions
    for (let i = 0; i < 30; i++) {
        const targetAmount = Math.floor(Math.random() * 50) + 5;
        const moneyTypes = ['coins', 'notes'];
        const moneyType = moneyTypes[Math.floor(Math.random() * moneyTypes.length)];
        const combination = generateMoneyCombination(targetAmount, moneyType);
        allQuestions.push({
            amount: targetAmount,
            combination: combination,
            moneyType: moneyType
        });
    }
    
    // Shuffle all 30 questions and return only first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}

// Generate all 30 questions for bentuk
function generateBentukQuestions() {
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star'];
    const allQuestions = [];
    
    // Create 30 shape questions (6 of each shape)
    for (let i = 0; i < 30; i++) {
        const shape = shapes[i % 5];
        allQuestions.push({
            shape: shape
        });
    }
    
    // Shuffle all 30 questions and return only first 10
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
}

function startDifficultySelection(gameType) {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('difficultySelection').classList.remove('hidden');
}

function startGame(gameType, difficulty = null) {
    gameState.currentGame = gameType;
    gameState.currentDifficulty = difficulty;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    gameState.answers = [];
    
    // Generate questions based on game type
    if (gameType === 'kenaliNombor') {
        gameState.questions = generateKenaliNomborQuestions(difficulty);
    } else if (gameType === 'tambah') {
        gameState.questions = generateTambahQuestions();
    } else if (gameType === 'tolak') {
        gameState.questions = generateTolakQuestions();
    } else if (gameType === 'masa') {
        gameState.questions = generateMasaQuestions();
    } else if (gameType === 'wang') {
        gameState.questions = generateWangQuestions();
    } else if (gameType === 'bentuk') {
        gameState.questions = generateBentukQuestions();
    }
    
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('difficultySelection').classList.add('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById(`${gameType}Game`).classList.remove('hidden');
    
    loadQuestion();
}

function backToMenu() {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('difficultySelection').classList.add('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    
    const games = ['kenaliNomborGame', 'tambahGame', 'tolakGame', 'masaGame', 'wangGame', 'bentukGame'];
    games.forEach(game => {
        document.getElementById(game).classList.add('hidden');
    });
    
    gameState.currentGame = null;
    gameState.currentDifficulty = null;
}

function loadQuestion() {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        showResults();
        return;
    }

    const gameType = gameState.currentGame;
    const question = gameState.questions[gameState.currentQuestion];
    
    // Update progress bar
    const percentage = (gameState.currentQuestion / gameState.totalQuestions) * 100;
    document.getElementById(`${gameType}Progress`).style.width = percentage + '%';
    document.getElementById(`${gameType}QNum`).textContent = gameState.currentQuestion + 1;
    
    switch(gameType) {
        case 'kenaliNombor':
            displayKenaliNomborQuestion(question);
            break;
        case 'tambah':
            displayTambahQuestion(question);
            break;
        case 'tolak':
            displayTolakQuestion(question);
            break;
        case 'masa':
            displayMasaQuestion(question);
            break;
        case 'wang':
            displayWangQuestion(question);
            break;
        case 'bentuk':
            displayBentukQuestion(question);
            break;
    }
}

// Display Kenali Nombor Question
function displayKenaliNomborQuestion(question) {
    const nomborVisual = document.getElementById('nomborVisual');
    nomborVisual.innerHTML = '';
    
    const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Create items to display
    for (let i = 0; i < question.count; i++) {
        const item = document.createElement('span');
        item.style.fontSize = '2.5em';
        item.style.marginRight = '10px';
        item.textContent = selectedFruit;
        nomborVisual.appendChild(item);
    }
    
    // Generate options with possible answers
    const options = [question.count];
    let difficulty = gameState.currentDifficulty;
    let minRange, maxRange;
    
    if (difficulty === 'beginner') {
        minRange = 1;
        maxRange = 10;
    } else if (difficulty === 'intermediate') {
        minRange = 10;
        maxRange = 50;
    } else if (difficulty === 'advanced') {
        minRange = 50;
        maxRange = 100;
    }
    
    // Generate 3 more different options
    while (options.length < 4) {
        const option = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('kenaliNomborOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkKenaliNomborAnswer(option, question.count, 'kenaliNombor');
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('kenaliNomborFeedback').innerHTML = '';
}

function displayTambahQuestion(question) {
    document.getElementById('fruit-group1').innerHTML = '';
    document.getElementById('fruit-group2').innerHTML = '';
    
    if (question.type === 'fruit') {
        const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
        
        for (let i = 0; i < question.num1; i++) {
            const fruit = document.createElement('div');
            fruit.className = 'fruit';
            fruit.textContent = selectedFruit;
            document.getElementById('fruit-group1').appendChild(fruit);
        }
        
        for (let i = 0; i < question.num2; i++) {
            const fruit = document.createElement('div');
            fruit.className = 'fruit';
            fruit.textContent = selectedFruit;
            document.getElementById('fruit-group2').appendChild(fruit);
        }
    } else {
        const num1 = document.createElement('div');
        num1.className = 'number-display';
        num1.textContent = question.num1;
        document.getElementById('fruit-group1').appendChild(num1);
        
        const num2 = document.createElement('div');
        num2.className = 'number-display';
        num2.textContent = question.num2;
        document.getElementById('fruit-group2').appendChild(num2);
    }
    
    displayOptions(question.answer, 'tambah');
    document.getElementById('tambahFeedback').innerHTML = '';
}

function displayTolakQuestion(question) {
    document.getElementById('fruit-group3').innerHTML = '';
    document.getElementById('fruit-group4').innerHTML = '';
    
    if (question.type === 'fruit') {
        const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
        
        for (let i = 0; i < question.num1; i++) {
            const fruit = document.createElement('div');
            fruit.className = 'fruit';
            fruit.textContent = selectedFruit;
            document.getElementById('fruit-group3').appendChild(fruit);
        }
        
        const group4 = document.getElementById('fruit-group4');
        for (let i = 0; i < question.num2; i++) {
            const fruit = document.createElement('div');
            fruit.className = 'fruit';
            fruit.textContent = selectedFruit;
            fruit.style.opacity = '0.5';
            fruit.style.textDecoration = 'line-through';
            group4.appendChild(fruit);
        }
    } else {
        const num1 = document.createElement('div');
        num1.className = 'number-display';
        num1.textContent = question.num1;
        document.getElementById('fruit-group3').appendChild(num1);
        
        const group4 = document.getElementById('fruit-group4');
        const num2 = document.createElement('div');
        num2.className = 'number-display';
        num2.textContent = question.num2;
        num2.style.opacity = '0.5';
        num2.style.textDecoration = 'line-through';
        group4.appendChild(num2);
    }
    
    displayOptions(question.answer, 'tolak');
    document.getElementById('tolakFeedback').innerHTML = '';
}

function displayMasaQuestion(question) {
    drawClock(question.hour, question.minute);
    document.getElementById('masaQuestion').textContent = 'Berapa jam menunjukkan jam tersebut?';
    
    const options = [question];
    const availableTimes = gameState.questions.filter((q, i) => i !== gameState.currentQuestion);
    
    for (let i = 0; i < 3 && availableTimes.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableTimes.length);
        options.push(availableTimes[randomIndex]);
        availableTimes.splice(randomIndex, 1);
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('masaOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${String(option.hour).padStart(2, '0')}:${String(option.minute).padStart(2, '0')}`;
        button.onclick = () => checkAnswer(button.textContent, `${String(question.hour).padStart(2, '0')}:${String(question.minute).padStart(2, '0')}`, 'masa');
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

function displayWangQuestion(question) {
    const moneyVisual = document.getElementById('moneyVisual');
    moneyVisual.innerHTML = '';
    
    // Create a container for money items with labels
    const moneyItemsMap = {};
    
    question.combination.forEach(item => {
        const key = item.label;
        if (!moneyItemsMap[key]) {
            moneyItemsMap[key] = 0;
        }
        moneyItemsMap[key]++;
    });
    
    // Display each unique money item with count
    for (const [label, count] of Object.entries(moneyItemsMap)) {
        const itemContainer = document.createElement('div');
        itemContainer.style.display = 'flex';
        itemContainer.style.flexDirection = 'column';
        itemContainer.style.alignItems = 'center';
        itemContainer.style.gap = '5px';
        
        // Display emojis
        const emojiContainer = document.createElement('div');
        emojiContainer.style.display = 'flex';
        emojiContainer.style.gap = '5px';
        emojiContainer.style.flexWrap = 'wrap';
        emojiContainer.style.justifyContent = 'center';
        
        for (let i = 0; i < count; i++) {
            const element = document.createElement('span');
            element.style.fontSize = '2.5em';
            element.textContent = question.combination.find(c => c.label === label).emoji;
            emojiContainer.appendChild(element);
        }
        
        // Display label in BLACK color
        const labelElement = document.createElement('div');
        labelElement.style.fontSize = '1em';
        labelElement.style.fontWeight = 'bold';
        labelElement.style.color = 'black';
        labelElement.textContent = label;
        
        itemContainer.appendChild(emojiContainer);
        itemContainer.appendChild(labelElement);
        moneyVisual.appendChild(itemContainer);
    }
    
    document.getElementById('wangQuestion').textContent = 'Jumlah wang di atas ialah berapa?';
    
    const options = [question.amount];
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
        button.onclick = () => checkAnswer(option, question.amount, 'wang');
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('wangFeedback').innerHTML = '';
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

function displayBentukQuestion(question) {
    const bentukVisual = document.getElementById('bentukVisual');
    bentukVisual.innerHTML = '';
    
    const shapes = {
        'circle': '<div class="shape circle"></div>',
        'square': '<div class="shape square"></div>',
        'triangle': '<div class="shape triangle"></div>',
        'rectangle': '<div class="shape rectangle"></div>',
        'star': '<div class="star shape">⭐</div>'
    };
    
    bentukVisual.innerHTML = shapes[question.shape];
    
    const shapeNames = {
        'circle': 'Bulatan',
        'square': 'Segiempat Sama',
        'triangle': 'Segitiga',
        'rectangle': 'Segiempat Tepat',
        'star': 'Bintang'
    };
    
    document.getElementById('bentukQuestion').textContent = 'Apakah nama bentuk ini?';
    
    const allShapes = ['circle', 'square', 'triangle', 'rectangle', 'star'];
    const options = [question.shape];
    const availableShapes = allShapes.filter(s => s !== question.shape);
    
    // Shuffle available shapes and pick 3
    availableShapes.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 3; i++) {
        options.push(availableShapes[i]);
    }
    
    // Shuffle all options
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('bentukOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = shapeNames[option];
        button.onclick = () => checkBentukAnswer(option, question.shape);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('bentukFeedback').innerHTML = '';
}

function displayOptions(answer, gameType) {
    let maxRange = 10;
    if (gameType === 'tolak') maxRange = 15;
    
    const options = [answer];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * maxRange) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById(`${gameType}Options`);
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, answer, gameType);
        optionsContainer.appendChild(button);
    });
}

// Check Kenali Nombor Answer
function checkKenaliNomborAnswer(selectedAnswer, correctAnswer, gameType) {
    const feedbackElement = document.getElementById(`${gameType}Feedback`);
    const buttons = document.querySelectorAll(`#${gameType}Options .option-btn`);
    
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Highlight the clicked button
    buttons.forEach(btn => {
        let btnValue = parseInt(btn.textContent);
        
        if (btnValue === selectedAnswer) {
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

function checkBentukAnswer(selectedAnswer, correctAnswer) {
    const gameType = 'bentuk';
    const feedbackElement = document.getElementById('bentukFeedback');
    const buttons = document.querySelectorAll('#bentukOptions .option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Get the shape names map
    const shapeNames = {
        'circle': 'Bulatan',
        'square': 'Segiempat Sama',
        'triangle': 'Segitiga',
        'rectangle': 'Segiempat Tepat',
        'star': 'Bintang'
    };
    
    // Highlight the clicked button
    buttons.forEach(btn => {
        // Find which shape this button represents
        let buttonShape = null;
        for (const [shape, name] of Object.entries(shapeNames)) {
            if (btn.textContent === name) {
                buttonShape = shape;
                break;
            }
        }
        
        if (buttonShape === selectedAnswer) {
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
                feedbackElement.textContent = `✗ Salah! Jawapan yang betul ialah ${shapeNames[correctAnswer]}`;
            }
        }
    });
    
    document.getElementById('bentukScore').textContent = gameState.score;
    
    gameState.currentQuestion++;
    setTimeout(() => {
        loadQuestion();
    }, 2000);
}

function checkAnswer(selectedAnswer, correctAnswer, gameType) {
    const feedbackElement = document.getElementById(`${gameType}Feedback`);
    const buttons = document.querySelectorAll(`#${gameType}Options .option-btn`);
    
    buttons.forEach(btn => btn.disabled = true);
    
    let isCorrect = false;
    
    if (gameType === 'masa') {
        isCorrect = String(selectedAnswer) === String(correctAnswer);
    } else if (typeof selectedAnswer === 'number' && typeof correctAnswer === 'number') {
        isCorrect = selectedAnswer === correctAnswer;
    } else {
        isCorrect = String(selectedAnswer) === String(correctAnswer);
    }
    
    // Highlight the clicked button
    buttons.forEach(btn => {
        let btnValue = btn.textContent;
        
        let btnCompare = btnValue;
        let selectedCompare = String(selectedAnswer);
        
        if (!isNaN(btnValue) && !isNaN(selectedAnswer)) {
            btnCompare = parseInt(btnValue);
            selectedCompare = parseInt(selectedAnswer);
        }
        
        if (btnCompare === selectedCompare || btnValue === selectedAnswer) {
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

function showResults() {
    const gameType = gameState.currentGame;
    const difficulty = gameState.currentDifficulty;
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
    } else if (percentage >= 90) {
        emoji = '😄';
        message = 'Luar biasa! Sangat cemerlang!';
    } else if (percentage >= 80) {
        emoji = '😊';
        message = 'Bagus! Teruskan berlatih.';
    } else if (percentage >= 70) {
        emoji = '👍';
        message = 'Lumayan! Boleh lebih baik.';
    } else if (percentage >= 60) {
        emoji = '😐';
        message = 'Anda boleh lebih baik. Cuba lagi!';
    } else {
        emoji = '😢';
        message = 'Teruskan berlatih, pasti boleh!';
    }
    
    const gameNames = {
        'kenaliNombor': 'Kenali Nombor',
        'tambah': 'Tambah',
        'tolak': 'Tolak',
        'masa': 'Masa',
        'wang': 'Wang',
        'bentuk': 'Bentuk'
    };
    
    let difficultyName = '';
    if (difficulty === 'beginner') {
        difficultyName = ' (Bijak Matematik 1)';
    } else if (difficulty === 'intermediate') {
        difficultyName = ' (Bijak Matematik 2)';
    } else if (difficulty === 'advanced') {
        difficultyName = ' (Bijak Matematik 3&4)';
    }
    
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <div class="result-score">${score} / ${total}</div>
        <div class="result-percentage" style="font-size: 1.5em; margin: 15px 0;">${percentage}%</div>
        <div class="result-message">${message}</div>
        <div style="margin-top: 20px; font-size: 1em;">Permainan: ${gameNames[gameType]}${difficultyName}</div>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainMenu').classList.remove('hidden');
});
