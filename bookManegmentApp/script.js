let books = [];
let sortAscending = true;

const IMAGE_URL = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBookBtn");
    const sortBtn = document.getElementById("sortBtn");
    const filterDropdown = document.getElementById("filterCategory");

    if (addBtn) addBtn.addEventListener("click", addBook);
    if (sortBtn) sortBtn.addEventListener("click", sortBooks);
    if (filterDropdown) filterDropdown.addEventListener("change", renderUI);
});

function addBook() {
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value;

    if (!title || !author) {
        alert("Please fill all fields");
        return;
    }

    let book = {
        title,
        author,
        category,
        imageUrl: IMAGE_URL
    };

    books.push(book);
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";

    renderUI();
}

function sortBooks() {
    books.sort((a, b) => {
        return sortAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    sortAscending = !sortAscending;
    document.getElementById("sortBtn").innerText = sortAscending
        ? "Sort A → Z"
        : "Sort Z → A";

    renderUI();
}

function deleteBook(index) {
    books.splice(index, 1);
    renderUI();
}

function renderUI() {
    let bookList = document.getElementById("bookList");
    if (!bookList) return;

    let filterValue = document.getElementById("filterCategory").value;

    bookList.innerHTML = "";

    books
        .filter(book => filterValue === "All" || book.category === filterValue)
        .forEach((book, index) => {
            let card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${book.imageUrl}" alt="Book" />
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <button class="deleteBtn" onclick="deleteBook(${index})">Delete</button>
            `;

            bookList.appendChild(card);
        });
}
