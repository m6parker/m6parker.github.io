const pages = [...document.querySelectorAll(".page")];
const gameItems = [...document.querySelectorAll(".game-item")];
const gameInfos = [...document.querySelectorAll(".game-info")];
const bookItems = [...document.querySelectorAll(".book-item")];
const bookInfos = [...document.querySelectorAll(".book-info")];

function getElement(target) {
  return target instanceof Element ? target : target?.parentElement ?? null;
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("hidden", page.id !== pageId);
  });
}

function selectGame(index) {
  if (index < 0) return;
  gameItems.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });
  gameInfos.forEach((info, i) => {
    info.classList.toggle("hidden", i !== index);
  });
}

function selectBook(index) {
  if (index < 0) return;
  bookItems.forEach((item, i) => {
    item.classList.toggle("selected", i === index);
  });
  bookInfos.forEach((info, i) => {
    info.classList.toggle("hidden", i !== index);
  });
}

document.addEventListener("click", (e) => {
  console.log("clicked ", e.target)
  const element = getElement(e.target);
  if (!element) return;

  const navBtn = element.closest(".nav-button");
  if (navBtn && navBtn.id) {
    showPage(navBtn.id);
    return;
  }

  if (element.closest(".sub-block.games")) {
    showPage("games");
    return;
  }

  if (element.closest(".sub-block.books")) {
    showPage("books");
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