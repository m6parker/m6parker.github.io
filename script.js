const pages = [...document.querySelectorAll(".page")];
const navButtons = [...document.querySelectorAll(".nav-button")];
const gameItems = [...document.querySelectorAll(".game-item")];
const gameInfos = [...document.querySelectorAll(".game-info")];
const bookItems = [...document.querySelectorAll(".book-item")];
const bookInfos = [...document.querySelectorAll(".book-info")];

const PAGE_ELEMENT_IDS = {
  home: "home",
  games: "games-page",
  books: "books-page",
};

function getElement(target) {
  return target instanceof Element ? target : target?.parentElement ?? null;
}

function showPage(pageKey) {
  const targetPageId = PAGE_ELEMENT_IDS[pageKey];
  if (!targetPageId) return;

  pages.forEach((page) => {
    page.classList.toggle("hidden", page.id !== targetPageId);
  });

  navButtons.forEach((btn) => {
    btn.classList.toggle("selected", btn.id === pageKey);
  });
}

function selectGame(index) {
  if (index < 0 || index >= gameInfos.length) return;
  gameItems.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });
  gameInfos.forEach((info, i) => {
    info.classList.toggle("hidden", i !== index);
  });
}

function selectBook(index) {
  if (index < 0 || index >= bookInfos.length) return;
  bookItems.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });
  bookInfos.forEach((info, i) => {
    info.classList.toggle("hidden", i !== index);
  });
}

document.addEventListener("click", (e) => {
  const element = getElement(e.target);
  if (!element) return;

  const navBtn = element.closest(".nav-button");
  if (navBtn && navBtn.id) {
    showPage(navBtn.id);
    return;
  }

  const homeCard = element.closest("#home .item-container");
  if (homeCard && (homeCard.id === "games" || homeCard.id === "books")) {
    showPage(homeCard.id);
    return;
  }

  const clickedGame = element.closest(".game-item");
  if (clickedGame) {
    selectGame(gameItems.indexOf(clickedGame));
    return;
  }

  const clickedBook = element.closest(".book-item");
  if (clickedBook) {
    selectBook(bookItems.indexOf(clickedBook));
  }
});

showPage("home");
selectGame(0);
selectBook(0);