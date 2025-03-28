let myLibrary = [];

function Book(name, author, year, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}

function eventRead(e) {
    const btn = e.target;
    // Change display
    (btn.textContent === "true") ? btn.textContent = "false" : btn.textContent = "true";
        
    // Change library
    const row = btn.parentNode.parentNode;
    const bookId = row.dataset.id;
    const book = myLibrary.filter(bookLibrary => bookLibrary.id === bookId)[0]
    book.toggleRead();
}

function eventDelete(e) {
    const row = e.target.parentNode.parentNode;
    const bookId = row.dataset.id;
    deleteBook(bookId);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    const table = document.querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML += `<td>${book.name}</td>
                      <td>${book.author}</td>
                      <td>${book.year}</td>
                      <td>${book.pages}</td>
                      <td><button class="read">${book.read}</button></td>
                      <td><button class="delete">Delete</button>`;
    
    // Each book is displayed with its unique id
    row.dataset.id = book.id;
    table.appendChild(row);

    // Add event listeners
    row.querySelector("button.read").addEventListener("click", (e) => eventRead(e));
    row.querySelector("button.delete").addEventListener("click", (e) => eventDelete(e));
}

function displayLibrary() {
    for (const book of myLibrary) {
        displayBook(book);
    }
}

function deleteBook(id) {
    // Remove book from library array
    myLibrary = myLibrary.filter((book) => book.id !== id);

    // Remove book from display
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();
}

Book.prototype.toggleRead = function() {
    (this.read) ? this.read = false : this.read=true;
};

book1 = new Book("The Farthest Shore", "Ursula Le Guin", 1972, 259, false)
book2 = new Book("The Song of Achilles", "Madeline Miller", 2011, 408, true)
addBookToLibrary(book1);
addBookToLibrary(book2);
displayLibrary()

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements.name.value;
    const author = form.elements.author.value;
    const year = form.elements.year.value;
    const pages = form.elements.pages.value;
    const read = form.elements.read.checked;

    console.log(read)
    
    const book = new Book(name, author, year, pages, read);

    addBookToLibrary(book);
    displayBook(book);
});