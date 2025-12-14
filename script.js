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
