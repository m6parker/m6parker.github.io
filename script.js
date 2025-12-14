// ---------------------- dragging windows ----------------------

const windowHeaders = document.querySelectorAll('.window-header');
let isDragging = false;
let offsetX;
let offsetY;
let selectedWindow;
windowHeaders.forEach(header => {
    header.addEventListener('mousedown', (e) => {
        e.preventDefault();

        document.querySelector('.start-menu').classList.add('hidden')
        
        selectedWindow = document.querySelector(`.${header.id}-window`);
        isDragging = true;
        offsetX = e.clientX - selectedWindow.getBoundingClientRect().left;
        offsetY = e.clientY - selectedWindow.getBoundingClientRect().top;

        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', stopDragging);
    });
});

function moveWindow(e){
    if(!isDragging)return
    selectedWindow.style.left = `${e.clientX - offsetX}px`;
    selectedWindow.style.top = `${e.clientY - offsetY}px`;
}

function stopDragging(){
    isDragging = false;
    selectedWindow = null;
    document.removeEventListener('mousemove', moveWindow);
    document.removeEventListener('mouseup', stopDragging);
}

document.querySelector('.start-menu-button').addEventListener('click', () => {
    document.querySelector('.start-menu').classList.toggle('hidden')
});


// ----------------- desktop icon interactions -----------------

const closeButtons = document.querySelectorAll('.x-button');
const desktopIcons = document.querySelectorAll('.desktop-icon');
const documentIcons = document.querySelectorAll('.document-icon');
const gameIcons = document.querySelectorAll('.game-icon');
const websiteIcons = document.querySelectorAll('.website-icon');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector(`.${button.id}-window`).classList.add('hidden');
        document.querySelector(`.${button.id}-task`).classList.add('hidden');
    });
});

desktopIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if(!icon.id){return}
        document.querySelector(`.${icon.id}-window`).classList.remove('hidden');
        document.querySelector(`.${icon.id}-task`).classList.remove('hidden');
    });
});

documentIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if(!icon.id || icon.id==='games' || icon.id==='websites'){return}
        document.querySelector(`.${icon.id}-window`).classList.remove('hidden');
        document.querySelector(`.${icon.id}-task`).classList.remove('hidden');
    });
});

const clock = document.querySelector('.time');
function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const formattedDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        
        clock.textContent = `
            ${formattedDate}
            ${hours}:${minutes}:${seconds}
        `;
    }

setInterval(updateClock, 1000);
updateClock();


function showGames(){
    document.querySelector('.path').textContent = 'Desktop\\Projects\\Games';
    gameIcons.forEach(icon => {
        icon.classList.remove('hidden');
    });
    websiteIcons.forEach(icon => {
        icon.classList.add('hidden');
    });
}
function showWebsites(){
    document.querySelector('.path').textContent = 'Desktop\\Projects\\Websites';
    gameIcons.forEach(icon => {
        icon.classList.add('hidden');
    });
    websiteIcons.forEach(icon => {
        icon.classList.remove('hidden');
    });
}
function hideFolderContents(){
    document.querySelector('.path').textContent = 'Desktop\\Projects';
    gameIcons.forEach(icon => {
        icon.classList.add('hidden');
    });
    websiteIcons.forEach(icon => {
        icon.classList.add('hidden');
    });
}
function hideFolders(){
    document.querySelector('.games-folder').classList.add('hidden')
    document.querySelector('.websites-folder').classList.add('hidden')
}
function showFolders(){
    document.querySelector('.games-folder').classList.remove('hidden')
    document.querySelector('.websites-folder').classList.remove('hidden')
}

documentIcons.forEach(icon => {
    icon.addEventListener('click', ()=>{
        hideFolders();
        if(icon.id === 'websites'){
            showWebsites();
        }else if(icon.id === 'games'){
            showGames();
        }else{
            return;
        }
    });
});

document.querySelector('.back-button').addEventListener('click', ()=>{
    showFolders();
    hideFolderContents();
});