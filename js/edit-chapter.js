
if (localStorage.getItem('editChapter')) {
    editableChapter = JSON.parse(localStorage.getItem('editChapter'));
}

if (localStorage.getItem('modules')) {
    modules = JSON.parse(localStorage.getItem('modules'));
}


const sectionName = document.querySelector('.add-new-section-name')
const sectionNamesHTML = `
    <input type="text" class="section-name" placeholder="Введите название..." value="${editableChapter.title}">
    <input type="text" class="section-description" placeholder="Введите описание..." value="${editableChapter.description}">
`;
sectionName.insertAdjacentHTML('afterbegin', sectionNamesHTML);

const sectionLiCards = document.querySelector('.card-list')

editableChapter.cards.forEach(it => {

    const cardLiHTML = `
        <li class="card" id="${it.idCard}">
            <div class="add-new-section-card">
                <div class="card-decoration">
                    <p class="gray"></p>
                    <button class="btn-x" data-action="delete">
                        <img src="../icons/close.png" alt="">
                    </button>
                </div>

                <div class="card-content">
                    <input contenteditable="true" type="text" maxlength="700" class="card-input card-term" placeholder="Термин..." value="${it.cardTerm}">
                    <input type="text" maxlength="700" class="card-input card-definition" placeholder="Определение....." value="${it.cardDefinition}">
                </div>
            </div>
        </li>
    `

    sectionLiCards.insertAdjacentHTML('beforeend', cardLiHTML);
})    


const cardList = document.querySelector(".card-list");
const addCardBtn = document.querySelector(".add-card_btn");
addCardBtn.addEventListener('click', addCard);
cardList.addEventListener('click', deleteCard);

function addCard (ev) {
    ev.preventDefault();
    const idCard = Date.now()

    const cardHTML = `<li class="card" id="${idCard}">
                            <div class="add-new-section-card">
                                <div class="card-decoration">
                                    <p class="gray"></p>
                                    <button class="btn-x" data-action="delete">
                                        <img src="../icons/close.png" alt="">
                                    </button>
                                </div>

                                <div class="card-content">
                                    <div>
                                        <input type="text" maxlength="600" class="card-input card-term" placeholder="Термин...">
                                    </div>    
                                    <div>
                                        <input type="text" maxlength="600" class="card-input card-definition" placeholder="Определение.....">
                                    </div>
                                </div>
                            </div>
                        </li>`;
    cardList.insertAdjacentHTML('beforeend', cardHTML);
}


const addChapterBtn = document.querySelectorAll(".add-new-section-btn");
addChapterBtn.forEach (item => {
    item.addEventListener ('click', addChapter)
})


const warning = document.querySelector('.warning-div')
const warHTML = `<div class="red-war">ПОЛЕ ДОЛЖНО БЫТЬ ЗАПОЛНЕНО</div>`;

function addChapter (ev) {
    ev.preventDefault();
    const list = document.querySelectorAll('.card');
    const sectionName = document.querySelector(".section-name");
    const sectionDescription = document.querySelector(".section-description");
    
    const cardInputs = document.querySelectorAll('.card-input')
    let howManyEmpty = 0
    cardInputs.forEach(it => {
        if (it.value == ""){
            it.insertAdjacentHTML('afterend', warHTML);
            howManyEmpty++
        }
    })

    function deleteWar(){
        document.querySelectorAll('.red-war').forEach(it => it.remove())
    }
    setTimeout(deleteWar, 6000); 
    
    if (sectionName.value == "") {
        sectionName.classList.add('warning-red')
        function classBack2() {
            sectionName.classList.remove('warning-red')
        }
        setTimeout(classBack2, 6000);
    }


    if (list.length >= 2 && sectionName.value !== "" && howManyEmpty == 0) {
        const chapter = {
            idChapter: editableChapter.idChapter,
            title: sectionName.value,
            description: sectionDescription.value,
            cards: [
        
            ],
        };


        list.forEach (item => {
            const inputsCard = item.querySelectorAll('.card-input');
            
            const term = inputsCard[0].value;
            const definition = inputsCard[1].value;

            const card = {
                idCard: item.id,
                cardTerm: term, 
                cardDefinition: definition,
            };
            chapter.cards.push(card);
        });

        modules.forEach(it => {
            it.chapters.forEach(chap => {
    
                if (chap.idChapter == editableChapter.idChapter) {
                    const ind = it.chapters.indexOf(chap)
                    it.chapters.splice(ind, 1, chapter)
                }
            })
        })

        saveToLocalStorage();
        // clearing();
        window.location.href = 'cards.html';
        // document.location.replace("http://127.0.0.1:5500/cards.html");

    } 
    if (list.length < 2) {
        warning.classList.add('warning-div_active')
        function classBack() {
            warning.classList.remove('warning-div_active')
        }
        setTimeout(classBack, 6000);
    }
    // delete localStorage.test;
};









function deleteCard (ev) {
    if (ev.target.dataset.action !== 'delete') return;

    const parentNode = ev.target.closest('.card');

    parentNode.remove();
    // console.log(parentNode.id);
}

function saveToLocalStorage() {
    localStorage.setItem('modules', JSON.stringify(modules))
}