const headerBtn = document.querySelector('.header-btn-pop');
const popUp = document.querySelector('.pop-up');
const createModule = document.querySelector('.create-module');
const windowCreateModule = document.querySelector('.create-new-module');
const windowCloseModule = document.querySelector('.create-new-module_header-x');

const createModuleBtn = document.querySelector('.create-new-module_header-btn');

const modulesList = document.querySelector('.modules-list');
const moduleHeader = document.querySelector('header')


// headerBtn.addEventListener('click', function () {
//     popUp.classList.toggle('pop-up-active')
// });
createModule.addEventListener('click', function () {
    windowCreateModule.classList.add('create-new-module_active')
});
windowCloseModule.addEventListener('click', function () {
    windowCreateModule.classList.remove('create-new-module_active')
});
createModuleBtn.addEventListener('click', addNewModule);
modulesList.addEventListener('click', deleteModule);
modulesList.addEventListener('click', editModuleName);




let modules = [];

if (localStorage.getItem('modules')) {
    modules = JSON.parse(localStorage.getItem('modules'));
}

modules.forEach( function (module) {
    renderModule(module);
})
checkEmptyList();


function addNewModule(ev) {
    ev.preventDefault();
    const moduleNameInput = document.querySelector('.create-new-module_input');
    if (moduleNameInput.value !== "") {
        const idModuleCard = Date.now();
        
        const module = {
            idModule: idModuleCard,
            title: moduleNameInput.value,
            chapters: [

            ],
        };

        modules.push(module);

        renderModule(module);
        console.log(modules)

        // moduleNameInput = " ";
        windowCreateModule.classList.remove('create-new-module_active')
        moduleNameInput.value = "";
        checkEmptyList();
        saveToLocalStorage();
    } else {
        moduleNameInput.classList.add('warning-red')
    }

}




let moduleName = '';
function editModuleName(event) {
    if (event.target.dataset.action !== 'edit-module') return;
    const parentModule = event.target.closest('.module-card')
    const idMod = Number(parentModule.id);
    // console.log(modules)
    

    modules.forEach(it => {
        if (it.idModule == idMod) {
            moduleName = it.title;
        }
    })

    const editModuleNameHTML = `
        <div class="edit-module-name">
            <div class="edit-module-name_div">
                <div class="edit-module-name_header">
                    <div class="edit-module-name_header-text">Редактировать название</div>
                    <button class="edit-module-name_header-x"><img src="../icons/x.png" alt=""></button>
                </div>
                <input type="text" class="edit-module-name_input" placeholder="" value="${moduleName}">
                <div class="wraper-btn">
                    <button class="edit-module-name_header-btn">Сохранить</button>
                </div>
            </div>
        </div>
    `;
    moduleHeader.insertAdjacentHTML('afterend', editModuleNameHTML);

    const windowCloseModuleEditName = document.querySelector('.edit-module-name_header-x');
    windowCloseModuleEditName.addEventListener('click', function () {
        document.querySelector('.edit-module-name').remove();
    });

    document.querySelector('.edit-module-name_header-btn').addEventListener('click', saveNewModuleName);
}

function saveNewModuleName() {
    const newName = document.querySelector('.edit-module-name_input').value
    modules.forEach(it => {
        if (it.title == moduleName) {
            it.title = newName;
        }
    })

    saveToLocalStorage();

    document.querySelector('.edit-module-name').remove();
    location.reload();
}



function deleteModule(event) {
    if (event.target.dataset.action !== 'delete') return;
    const parentNode = event.target.closest('.module-card');

    console.log(parentNode)

    const id = Number(parentNode.id);
    console.log(id)

    modules = modules.filter(function (module) {
        return module.idModule !== id;
    })

    parentNode.remove();
    console.log(modules)

    checkEmptyList();
    saveToLocalStorage();
}



function checkEmptyList() {
    if (modules.length === 0) {
        const emptyListElement = `<li class="emptyList ">
                                    <span class="no-text__task">Вы пока не создали ни одного модуля ;( </span>
                                </li>`
        modulesList.insertAdjacentHTML('afterbegin', emptyListElement);
    }

    if (modules.length > 0) {
        const emptyListEl = document.querySelector('.emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}


function saveToLocalStorage() {
    localStorage.setItem('modules', JSON.stringify(modules))
}

function renderModule(module) {
    const moduleCardHTML = `
        <li class="module-card" id="${module.idModule}">
            <div class="module-title">${module.title}</div>
            <div class="card-container">
                <div class="module-sections-text">Разделы</div>
                <ul class="module-sections">

                </ul>
            </div>
            <button class="edit-module-card" data-action="edit-module"></button>
            <button class="delete-module-card" data-action="delete"></button>
        </li>
    `;

    modulesList.insertAdjacentHTML('afterbegin', moduleCardHTML);
    renderLiModul(module)
}

function renderLiModul(module) {
    const moduleSectionList = document.querySelector('.module-sections')
    
    if (module.chapters.length === 0) {
        const empty = `<li class="no-chapters">В этом модуле пока нет разделов</li>`
        moduleSectionList.insertAdjacentHTML('beforeend', empty);
    }

    if (module.chapters.length > 0) {
        module.chapters.forEach(it => {
            const moduleChapterHTML = `<li class="module-section">${it.title}</li>`
            moduleSectionList.insertAdjacentHTML('beforeend', moduleChapterHTML);
        })    
    } 
}


const moduleTitles = document.querySelectorAll('.module-title')

moduleTitles.forEach (item => {
    item.addEventListener ('click', goToChapters)
})



function goToChapters(event) {
    // event.preventDefault();
    const idModule = Number(event.target.closest('.module-card').id);
    localStorage.setItem('idOfTheModuleToGoToTheChapters', JSON.stringify(idModule))
    window.location.href = 'chapters.html'
    // document.location.replace("http://127.0.0.1:5500/chapters.html");
}
