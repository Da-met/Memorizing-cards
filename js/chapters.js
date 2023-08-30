const modulesContainer = document.querySelector('.modules-container')

if (localStorage.getItem('modules')) {
    modules = JSON.parse(localStorage.getItem('modules'));

    modules.forEach(function(item, modules) {
        const moduleTitle = item.title
        const idModule = item.idModule
        
        
        renderModuleSection(idModule, moduleTitle)
        renderChapter(item)
    })
    
}
checkList();


function renderModuleSection(idModule, moduleTitle) {

    const moduleSectionHTML = `
        <div class="module" id="${idModule}">
            <div class="module-header">
                <div class="module-name">${moduleTitle}</div>
                <div class="module-tools">
                    <button class="btn-round light-purple create-chapter"><a href="./createCards.html">+</a></button>

                    <button class="btn-round light-purple" id="delete-module"><img src="./icons/trash.png" alt=""></button>
                </div>
            </div>
            <ul class="chapters-list">
             
            </ul>
        </div>
    `;

    modulesContainer.insertAdjacentHTML('afterbegin', moduleSectionHTML);
}

function renderChapter(item) {
    const chapterList = document.querySelector('.chapters-list')

    if (item.chapters.length === 0) {
        const empty = `<li class="emptyCh">В этом модуле пока нет разделов</li>`
        chapterList.insertAdjacentHTML('beforeend', empty)
    }

    if (item.chapters.length > 0) {
        item.chapters.forEach(it => {
            // console.log(it)
            const chapterHTML = `
                <li class="chapter-card"id="${it.idChapter}">
                    <div class="chapter-title">${it.title}</div>
                    <div class="chapter-description">${it.description}</div>
                    <div class="num-cards">Кол-во терминов : ${it.cards.length}</div>
                    <form action="edit-chapter.html">
                        <button class="edit-chapter-card" data-action="editChapter"><img src="" alt=""></button>
                    </form> 
                    <button class="delete-chapter-card" data-action="deleteChapter"><img src="" alt=""></button>
                </li>
            `
            chapterList.insertAdjacentHTML('beforeend', chapterHTML)
        })  
    } 
}



if (localStorage.getItem('idOfTheModuleToGoToTheChapters')) {
    id = JSON.parse(localStorage.getItem('idOfTheModuleToGoToTheChapters'));
    const moduleWithRed = document.getElementById(id)
    
    const titleThisModule = moduleWithRed.querySelector('.module-name')
    const btnsThisModule = moduleWithRed.querySelectorAll('.btn-round')
    const chaptersThisModule = moduleWithRed.querySelectorAll('.chapter-card')
    const chaptersTitlesThisModule = moduleWithRed.querySelectorAll('.chapter-title')

    titleThisModule.classList.add('modules-name_red')
    btnsThisModule.forEach(item => {
        item.classList.add('btn-round_red')
    })
    chaptersThisModule.forEach(item => {
        item.classList.add('chapter-card_red')
    })
    chaptersTitlesThisModule.forEach(item => {
        item.classList.add('chapter-title_red')
    })

    function deleteRedClass() {
        titleThisModule.classList.remove('modules-name_red')
        btnsThisModule.forEach(item => {
            item.classList.remove('btn-round_red')
        })
        chaptersThisModule.forEach(item => {
            item.classList.remove('chapter-card_red')
        })
        chaptersTitlesThisModule.forEach(item => {
            item.classList.remove('chapter-title_red')
        })

    }
    scrollTo(moduleWithRed);
    setTimeout(deleteRedClass, 3000);
        
    delete localStorage.idOfTheModuleToGoToTheChapters;
}

function scrollTo(moduleWithRed) {
    window.scroll({
        left: 0,
        top: moduleWithRed.offsetTop,
        behavior: 'smooth',
    })
}


const btnCreateChapter = document.querySelectorAll('.create-chapter')

btnCreateChapter.forEach( item => {
    item.addEventListener("click", () => {
        const id = item.closest('.module').id
        localStorage.setItem('test', id);
    })
})


const chaptersList = document.querySelectorAll('.chapters-list')
chaptersList.forEach(item => {
    item.addEventListener("click", deleteChapter)
})



chaptersList.forEach(item => {
    item.addEventListener("click", editChapter)
})



function deleteChapter(event) {
    if (event.target.dataset.action !== 'deleteChapter') return;
    const parentCard = event.target.closest('.chapter-card')
    const parentModule = event.target.closest('.module')

    const idCard = Number(parentCard.id);
    const idMod = Number(parentModule.id);

    let modIndex = '';
    modules.forEach(function(module) {
        if (module.idModule == idMod) {
            modIndex = modules.indexOf(module);
        }
    })


    let chapIndex = '';
    modules[modIndex].chapters.forEach( function(chapter) {

        if (chapter.idChapter == idCard) {
            chapIndex = modules[modIndex].chapters.indexOf(chapter)
            }

    })

    modules[modIndex].chapters.splice(chapIndex, 1)

    console.log(modules)

    parentCard.remove();
    saveToLocalStorage()
}



const btnDeleteModule = document.querySelectorAll('#delete-module')

btnDeleteModule.forEach(item => {
    item.addEventListener("click", deleteModule)
})

function deleteModule(event) {
    const parentModule = event.target.closest('.module')
    console.log(parentModule)
    const id = Number(parentModule.id);
    console.log(id)

    modules = modules.filter(function (module) {
        return module.idModule !== id;
    })

    parentModule.remove();
    console.log(modules)


    saveToLocalStorage();
}


function editChapter(event) {
    // event.preventDefault();
    if (event.target.dataset.action !== 'editChapter') return;
    const parentCard = event.target.closest('.chapter-card')
    const parentModule = event.target.closest('.module')

    const idCard = Number(parentCard.id);
    const idMod = Number(parentModule.id);

    let idFromCards = {
        idMod: idMod,
        idCard: idCard,
    }
    localStorage.setItem('idFromCards', JSON.stringify(idFromCards));

    
    let modIndex = '';
    modules.forEach(function(module) {
        if (module.idModule == idMod) {
            modIndex = modules.indexOf(module);
        }
    })

    let chapIndex = '';
    modules[modIndex].chapters.forEach( function(chapter) {
        if (chapter.idChapter == idCard) {
            chapIndex = modules[modIndex].chapters.indexOf(chapter)
            }
    })

    const editChapter = modules[modIndex].chapters[chapIndex];
    
    localStorage.setItem('editChapter', JSON.stringify(editChapter))
}



const chapterCardTitle = document.querySelectorAll('.chapter-title')
chapterCardTitle.forEach (item => {
    item.addEventListener ('click', goToCards)
})

function goToCards(event) {
    const parentCard = event.target.closest('.chapter-card')
    const parentModule = event.target.closest('.module')

    const idCard = Number(parentCard.id);
    const idMod = Number(parentModule.id);
    let idFromCards = {
        idMod: idMod,
        idCard: idCard,
    }

    localStorage.setItem('idFromCards', JSON.stringify(idFromCards));

    window.location.href = 'cards.html'
    // document.location.replace("http://127.0.0.1:5500/cards.html");
}


function saveToLocalStorage() {
    localStorage.setItem('modules', JSON.stringify(modules))
}


function checkList() {
    if (modulesContainer.children.length == 0) {
        const emptyEl = `<li class="emptyEl ">
                                    <span class="no-text__task">Вы пока не создали ни одного модуля, поэтому у вас нет разделов ;( </span>
                                </li>`
        modulesContainer.insertAdjacentHTML('afterbegin', emptyEl);
    }
}
