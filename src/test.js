const testBoard = document.querySelector('.test-board');
const start = document.querySelector('#start');

const backSound = document.createElement('audio');
backSound.autoplay = true;

const testBackground = document.createElement('div');
testBackground.classList.add('test-background');
function closeTest() {
    testBackground.classList.add('close-background');
    setTimeout(() => {
        testBackground.classList.remove('close-background');
        testBackground.remove();
    }, 340);
};

const reset = document.createElement('h3');
reset.classList.add('space-button');
reset.classList.add('reset');
reset.textContent = 'Заново';
reset.onclick = () => {
    drop();
    resultTest.replaceWith(start);
    closeTest();
    backSound.src = '';
}

function drop() {
    const audio = new Audio();
    audio.src = './src/sounds/bull.mp3';
    audio.autoplay = true;
};

const questions = [
    {q: 'Ви впевненні в своїх рішеннях?', type: true},
    {q: 'Ви вважаєте себе красивою/красивим?', type: true},
    {q: 'Ви би хотіли повернути минуле?', type: false},
    {q: 'Ви соромитесь при дівчинах/хлопцях?', type: false},
    {q: 'Ви боїтесь публіки?', type: false},
    {q: 'Ви займайтесь спортом?', type: true},
    {q: 'Ми самі винні у своїх проблемах?', type: true},
    {q: 'Ви освідчувались в коханні?', type: true},
    {q: 'Ви би стрибнули з парашутом?', type: true},
    {q: 'Ви звинувачуйте інших в своїх невдачах?', type: false},
    {q: 'Ви часто вихваляйтесь?', type: false},
    {q: 'Життя несправедливе?', type: false},
    {q: 'Ви добра людина?', type: true},
    {q: 'Ви злопамятний?', type: false},
    {q: 'Ви любите життя?', type: true},
];

const HTML = questions.map((el, index) => {
    if (el.type) {
        const question = document.createElement('div');
        question.classList.add('anime');
        question.innerHTML = `
        <p id="type" style="display: none">true</p> 
        <h1 class="ask">${el.q}</h1>
        <div class="space-button">
            <h3 id="yesButton${index + 1}" class="button">Так</h3>
            <h3 id="noButton${index + 1}" class="button">Ні</h3>
        </div>
        `;
        return question;
    }
    else {
        const question = document.createElement('div');
        question.classList.add('anime');
        question.innerHTML = `
        <p id="type" style="display: none">false</p> 
        <h1 class="ask">${el.q}</h1>
        <div class="space-button">
            <h3 id="yesButton" class="button">Так</h3>
            <h3 id="noButton" class="button">Ні</h3>
        </div>
        `;
        return question;
    } 
});

const resultTest = document.createElement('div');
resultTest.classList.add('total');
resultTest.innerHTML = `
<div id="inner">
    <h1 class="ask" style="border-bottom: 1px solid #fff;">Ваш результат:</h1>
    <h2 class="ask"></h2>
</div>
`;

let counter = 0;

function app() {
    HTML.forEach((node, index) => {
        const btns = node.querySelectorAll('.button')
        btns.forEach(btn => {
         btn.addEventListener('click', e => {
             btn.style.background = 'darkcyan';
             setTimeout(() => {
                 btn.style.background = 'transparent';
             }, 100)
             drop();
             if (type.textContent == 'true' && btn.innerHTML == 'Так') {
                 counter+=1
             } else if (type.textContent == 'false' && btn.innerHTML == 'Ні') {
                 counter+=1;
             }; 
             if (index !== HTML.length -1) {
                node.replaceWith(HTML[index + 1])
             }
             
             if (index == HTML.length -1) {
                 resultTest.querySelector('h2').textContent = result();
                 main.style.margin = '250px auto auto auto';
                 node.replaceWith(resultTest)
                 resultTest.querySelector('#inner').appendChild(reset);
                 counter = 0;
             }
         }, {once: true});
        })
     })
};


function result() {
    if (counter <= 5) return 'Будь-те впевненіше';
    else if (counter > 5 && counter < 10) return 'Більше позитиву в думках';
    else if (counter >= 10 && counter < 14) return 'Непогано, гарний потенціал';
    else if (counter >= 13) return 'Ви впевнена у собі людина';
};

start.onclick = () => {
    document.body.append(backSound);
    testBoard.appendChild(testBackground);
    backSound.src = './src/sounds/test.mp3';
    drop();
    app();
    start.replaceWith(HTML[0]);
    main.style.margin = '200px auto auto auto';
};



