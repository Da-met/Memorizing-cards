const interactiveCard = document.querySelector(".div-interactive-card");

const btnForward = document.querySelector('.btn-forward')
const btnBack = document.querySelector('.btn-back')
const scoreDiv = document.querySelector('.score-div')
const btnFlip = document.querySelector('.btn-flip')

const termsList = document.querySelector('.terms')





interactiveCard.addEventListener('click', flipCard);
btnFlip.addEventListener('click', flipCardsLi);

function flipCard() {
    let c = this.classList;
    c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
}

function flipCardsLi(){
    let c = this.classList;
    c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
    termsList.classList.toggle("none");
}


if (localStorage.getItem('modules')) {
    modules = JSON.parse(localStorage.getItem('modules'));
}

if (localStorage.getItem('idFromCards')) {
    idFromCards = JSON.parse(localStorage.getItem('idFromCards'));
}

let idMod = idFromCards.idMod
let idCard = idFromCards.idCard
let cards = [];
let chapterTitle = 0;

modules.forEach(function(module) {
    if (module.idModule == idMod) {
        console.log(module)
        module.chapters.forEach(function(chapter) {
            if (chapter.idChapter == idCard) {
                chapterTitle = chapter.title;
                cards = chapter.cards;
                console.log(chapter)
            }
        })
    }
})

const container = document.querySelector('.start')
const titleHTML = `<div class="chapters-name section-text">${chapterTitle}</div>`
container.insertAdjacentHTML('afterbegin', titleHTML);


let cardIndex = 0;

showCards();

function showCards() {
    const cardTerm = `<div class="front"><p class="center">%Название%</p></div>`;
    const cardDefinition = `<div class="back"><p class="center">%Определение%</p></div>`;
    const term = cardTerm.replace('%Название%', cards[cardIndex]['cardTerm'])
    const definition = cardDefinition.replace('%Определение%', cards[cardIndex]['cardDefinition'])

    interactiveCard.insertAdjacentHTML('afterbegin', term);
    interactiveCard.insertAdjacentHTML('beforeEnd', definition);

    const score = `<div class="quantity">%номер карты% / %всего%</div>`
    const a = score.replace('%номер карты%', cardIndex+1).replace('%всего%', cards.length)
    scoreDiv.insertAdjacentHTML('afterbegin', a);
}

function showResults() {
    const result = `
        <div class="result">
            <p class="center">Поздравляю! <br>Вы повторили все карточки</p>
            <button class="btn-go-back">Вернуться в начало</button>
        </div>`;
    interactiveCard.insertAdjacentHTML('afterbegin', result);

    
    const btnGoBack = document.querySelector('.btn-go-back')

    // btnGoBack.onclick = goToBack;
    btnGoBack.addEventListener('click', goToBack);
    function goToBack() {
        cardIndex = 0;
        clearCard();
        showCards();
    }
}




btnForward.onclick = checkCard;
btnBack.onclick = stepBack;

function checkCard() {
    if (cardIndex !== cards.length - 1) {
		cardIndex++;
		clearCard();
		showCards();
	} else {
		clearCard();
		showResults()
	}
}


function stepBack() {
    if (cardIndex !== 0) {
        cardIndex--;
        clearCard();
        showCards();
    }
}

function clearCard() {
    interactiveCard.innerHTML = '';
    scoreDiv.innerHTML = '';
}


cards.forEach(it => {
    const liHTML = `
        <li class="card-terms">
            <div class="terms-input term">${it.cardTerm}</div>
            <div class="terms-input definition">${it.cardDefinition}</div>
        </li>
    `;

    termsList.insertAdjacentHTML('beforeEnd', liHTML);
})


// delete localStorage.idFromCards;