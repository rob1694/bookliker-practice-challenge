document.addEventListener("DOMContentLoaded", function() {
getBooks().then(showList)
});

/*Get a list of books & render them http://localhost:3000/books*/
const initial_URL = 'http://localhost:3000/books'

function getBooks() {
    return fetch(initial_URL)
    .then(resp => resp.json())
}

function getSingleBook(id) {
    let URL = `${initial_URL}/${id}`
    return fetch(URL)
    .then(resp => resp.json())
}

function createBookList(bookData) {
    const list = document.getElementById('list'),
    title = document.createElement('li');
    title.id = `${bookData.id}`

    title.textContent = bookData.title;
    list.appendChild(title)
    title.addEventListener('click', onBookClick )
    
    return list
}

function showList(booksObj) {
    booksObj.forEach(book => {
        const booklist = createBookList(book)
        return booklist;
    })
}

/*Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.
(img_url, description, users.username)*/

function createBookPopUp(bookData) {
    const panel = document.getElementById('show-panel'),
    img = document.createElement('img'),
    title = document.createElement('h4'),
    description = document.createElement('p'),
    usernameList = document.createElement('h4');

    img.textContent = bookData.img_url;
    title.textContent = bookData.title;
    description.textContent = bookData.description;
    usernameList.textContent = bookData.users.username;

    panel.appendChild(img)
    panel.appendChild(title)
    panel.appendChild(description)
    panel.appendChild(usernameList)

    return panel;
}

function showBookDetails(booksObj) {
    booksObj.forEach(book => {
        const bookDetails = createBookPopUp(book)
        return bookDetails;
    })
}

function onBookClick(e) {
    getSingleBook(e.target.id)
      .then(createBookPopUp)
}
