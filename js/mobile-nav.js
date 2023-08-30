const headerContainer = document.querySelector('.header')
const headerMobileNavHTML = `
    <div class="mobile-nav">
    <div class="mobile-nav-logo logo">D.Dunсan</div>

    <nav class="mobile-nav-list">
        <ul>
            <li><a href="./index.html">Главная</a></li>
            <li><a href="./moduls.html">Учебные модули</a></li>
            <li><a href="./chapters.html">Разделы</a></li>
        </ul>
    </nav>

    <button class="close_mobile-nav"><img src="../icons/close.png" alt=""></button>
    </div>
`


headerContainer.insertAdjacentHTML('afterend', headerMobileNavHTML)


const openMobileNav = document.querySelector('.open_mobile-nav')
const closeMobileNav = document.querySelector('.close_mobile-nav')
const mobileNav = document.querySelector('.mobile-nav')


openMobileNav.addEventListener('click', function () {
    mobileNav.classList.add('active');
})

mobileNav.addEventListener('click', function () {
    mobileNav.classList.remove('active');
})