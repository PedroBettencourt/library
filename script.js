const myLibrary = [];

function Book(name, author, year, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(name, author, year, pages, read) {
    const newBook = new Book(name, author, year, pages, read);
    myLibrary.push(newBook);
};

function displayLibrary() {
    for (const book of myLibrary) {
        const table = document.querySelector("table");
        const row = document.createElement("tr");
        row.innerHTML += `<td>${book.name}</td>
                       <td>${book.author}</td>
                       <td>${book.year}</td>
                       <td>${book.pages}</td>
                       <td>${book.read}</td>`;
        table.appendChild(row);
    }
}

addBookToLibrary("The Farthest Shore", "Ursula Le Guin", 1972, 259, false);
addBookToLibrary("The Song of Achilles", "Madeline Miller", 2011, 408, true);

displayLibrary()

const value = document.querySelector("form button");
console.log(value.value);
value.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
});