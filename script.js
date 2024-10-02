const columns = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card");

// elemento global dos cards 
let draggedCard;

// função para iniciar ao mover draggedCard
const dragStar = (event) => {
    draggedCard = event.target;
    console.log(draggedCard);
    event.dataTransfer.effectAllowed = 'move';
}

// tira o bloqueio ao mover o cursor 
const dragOver = (event) => {
    event.preventDefault();
}

// criar a seleção do css azul ao mover em outro card
const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.add("column__highlight"); 
    }
}

// para não selecionar as duas colunas ao mesmo tempo
const dragLeave = ({ target }) => {
    target.classList.remove("column__highlight");
}

// para mover os cards de uma coluna a outra 
// e para não colocar em cima do outro
const drop = ({ target }) => { 
    if (target.classList.contains("column__cards")) {
        target.classList.remove("column__highlight");
        target.append(draggedCard);
    }
}

// para criar os cards
const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;
    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true"; 

    // Quando não estiver no card, não selecionar
    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent) card.remove();
    });

    card.addEventListener("dragstart", dragStar);
    target.append(card);
    card.focus(); 
}

// para receber cada elemento da lista, criar um evento ao mover 
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStar);
});

// Adicionar os eventos às colunas
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver); 
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});
