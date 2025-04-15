function openTab(event, tabName) {
    // Get all elements with class="tab-content" and hide them
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

console.log(Array.from(document.getElementsByClassName('card')));

const cardsList = Array.from(document.getElementsByClassName('card'));

function showDirections(card){
    const img = card.children[0];
    const ingredients = card.children[1];
    const directions = card.children[2];

    ingredients.classList.toggle('hidden');
    directions.classList.toggle('hidden');
    // directions.style.display = "block";
    
    // console.log(cardsList.children[2]);
}
