const headerContainerRow = document.querySelector('.container-row')
const chooseAnAvatarHTML = `
        <div class="choose-an-avatar">
            <div class="choose-an-avatar-div">
                <div class="choose-an-avatar_header">
                    <div class="choose-an-avatar_header-text">Выберите аватар</div>
                    <button class="choose-an-avatar_header-x"><img src="./icons/x.png" alt=""></button>
                </div>

                <div class="avatar-div">
                    <ul class="avatar-list">
                        <li class="avatar" id="1"><img src="./iconsAvatar/1.svg" alt=""></li>
                        <li class="avatar" id="2"><img src="./iconsAvatar/2.svg" alt=""></li>
                        <li class="avatar avatar_active" id="3"><img src="./iconsAvatar/3.svg" alt=""></li> 
                        <li class="avatar" id="4"><img src="./iconsAvatar/4.svg" alt=""></li>
                        <li class="avatar" id="5"><img src="./iconsAvatar/5.svg" alt=""></li>
                        <li class="avatar" id="6"><img src="./iconsAvatar/6.svg" alt=""></li>
                        <li class="avatar" id="7"><img src="./iconsAvatar/7.svg" alt=""></li>
                        <li class="avatar" id="8"><img src="./iconsAvatar/8.svg" alt=""></li>
                        <li class="avatar" id="9"><img src="./iconsAvatar/9.svg" alt=""></li>
                        <li class="avatar" id="10"><img src="./iconsAvatar/10.svg" alt=""></li>
                    </ul>
                </div>

                <div class="choose-an-avatar_wraper-btn">
                    <button class="choose-an-avatar-btn">Выбрать</button>
                </div>
            </div>
        </div>
    `

headerContainerRow.insertAdjacentHTML('beforeend', chooseAnAvatarHTML)

const avatars = document.querySelectorAll('.avatar')

const login = document.querySelector('.login')
const chooseAnAvatar = document.querySelector('.choose-an-avatar')
const closeChooseAnAvatar = document.querySelector('.choose-an-avatar_header-x')
const chooseAnAvatarBtn = document.querySelector('.choose-an-avatar-btn')
const avatarList = document.querySelector('.avatar-list')

chooseAnAvatarBtn.addEventListener('click', chooseAvatar);

login.addEventListener('click', function () {
    chooseAnAvatar.classList.add('choose-an-avatar_active')
});

closeChooseAnAvatar.addEventListener('click', function () {
    chooseAnAvatar.classList.remove('choose-an-avatar_active')
});

avatars.forEach( item => {
    item.addEventListener(
      "click",
      () => {
        item.parentElement.parentElement.querySelector('.avatar_active').classList.remove('avatar_active');
        item.classList.add("avatar_active");
        colorForm = item.classList[1];
      },
      false
    );
});

let avatarId = 0;
if (localStorage.getItem('avatarId')) {
    avatarId = JSON.parse(localStorage.getItem('avatarId'));

    login.innerHTML = "";
    const loginAvatarHTML = `<img class="login-img login-img_avatar${avatarId}" src="#" alt="">`
    login.insertAdjacentHTML('afterbegin', loginAvatarHTML)
}


function chooseAvatar() {
    avatarId = avatarList.querySelector('.avatar_active').id

    login.innerHTML = "";
    const loginAvatarHTML = `<img class="login-img login-img_avatar${avatarId}" src="#" alt="">`
    login.insertAdjacentHTML('afterbegin', loginAvatarHTML)

    localStorage.setItem('avatarId', JSON.stringify(avatarId));
    chooseAnAvatar.classList.remove('choose-an-avatar_active')
}

