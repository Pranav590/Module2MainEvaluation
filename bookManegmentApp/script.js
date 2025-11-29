let books = [];

const imageUrl =
    "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

// DOM elements
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categorySelect = document.getElementById("category");
const bookList = document.getElementById("bookList");

document.getElementById("addBookBtn").addEventListener("click", addBook);
document.getElementById("sortAZ").addEventListener("click", () => sortBooks("ASC"));
document.getElementById("sortZA").addEventListener("click", () => sortBooks("DESC"));
document.getElementById("filterCategory").addEventListener("change", filterBooks);

// Add Book
function addBook() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const category = categorySelect.value;

    if (!title || !author || !category) {
        alert("Please fill all fields!");
        return;
    }

    const newBook = {
        title,
        author,
        category,
        imageUrl
    };

    books.push(newBook);
    renderBooks(books);

    titleInput.value = "";
    authorInput.value = "";
    categorySelect.value = "";
}

// Render Books
function renderBooks(list) {
    bookList.innerHTML = "";

    list.forEach((book, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${book.imageUrl}" alt="book">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Category: ${book.category}</p>
            <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
        `;

        bookList.appendChild(card);
    });
}

// Delete Book
function deleteBook(index) {
    books.splice(index, 1);
    renderBooks(books);
}

// Sort Books
function sortBooks(order) {
    books.sort((a, b) =>
        order === "ASC"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    renderBooks(books);
}

// Filter Books
function filterBooks() {
    const selected = document.getElementById("filterCategory").value;

    if (selected === "All") {
        renderBooks(books);
    } else {
        const filtered = books.filter(book => book.category === selected);
        renderBooks(filtered);
    }
}
