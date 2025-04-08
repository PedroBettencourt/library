let myLibrary = [];

class Book {
    constructor(name, author, year, pages, read) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        (this.read) ? this.read = false : this.read = true;
    }
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

function addBook(name, author, year, pages, read) {
    const book = new Book(name, author, year, pages, read)
    myLibrary.push(book);
    return book;
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

// Form
// Display error messages
function checkValidity(property, message) {
    property.addEventListener("blur", () => {
        property.setCustomValidity("");
        if (!property.checkValidity()) {
            property.setCustomValidity(message);
            property.reportValidity();
        } else {
            return property;
        }
    })
}

const form = document.querySelector("form");

const title = document.querySelector("#name");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

checkValidity(title, "Needs a name with less than 30 characters");
checkValidity(author, "Needs a name with less than 30 characters");
checkValidity(year, "Year needs to be a number with less than 4 digits");
checkValidity(pages, "Pages need to be a number");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleValue = title.value;
    const authorValue = author.value;
    const yearValue = year.value;
    const pagesValue = pages.value;
    const readValue = read.value;

    if (titleValue !== "" && authorValue !== "" && yearValue !== "" &&
        pagesValue !== "" && readValue !== "") {
            const book = addBook(titleValue, authorValue, yearValue, pagesValue, readValue);
            displayBook(book);
        }
});


// Example books
addBook("The Farthest Shore", "Ursula Le Guin", 1972, 259, false);
addBook("The Song of Achilles", "Madeline Miller", 2011, 408, true);

displayLibrary()
