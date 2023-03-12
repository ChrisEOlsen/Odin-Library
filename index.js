let myLibrary = []

function Book(title, author, id) {
  this.title = title
  this.author = author
  this.id = id
}

function saveToLibrary(book) {
  myLibrary.push(book)
}

function saveDemoBooks() {
  const book1 = new Book("The Hobbit", "J.R.R Tolkien", myLibrary.length)
  saveToLibrary(book1)
  const book2 = new Book("Animal Farm", "George Orwell", myLibrary.length)
  saveToLibrary(book2)
  const book3 = new Book("The Holy Bible", "Jesus", myLibrary.length)
  saveToLibrary(book3)
}

const libraryArea = document.querySelector(".library-area")
const addBook = document.querySelector(".add-book")

function displaySavedBooks(arr) {
  for (let i = 0; i < arr.length; i++) {
    const newBook = document.createElement("book")
    newBook.classList.add("book")
    newBook.innerHTML =
      `<div class="title">` +
      arr[i].title +
      `</div>
      <div class="author">` +
      arr[i].author +
      `</div>
      <div class="read-button">
        <button>Read</button>
      </div>`
    libraryArea.prepend(newBook)
  }
}
//Create array content
saveDemoBooks()
//Load all demo books
displaySavedBooks(myLibrary)

let addBookActive = false

addBook.addEventListener("click", () => {
  if (!addBookActive) {
    addBookActive = true
    const newBookPrompt = document.createElement("newBookPrompt")
    newBookPrompt.classList.add("new-book-prompt")
    newBookPrompt.innerHTML = `
      <textarea class="input-title" cols="30" rows="10" placeholder="Title"></textarea>
      <textarea class="input-author" cols="30" rows="10" placeholder="Author"></textarea>
      <div class="input-buttons">
        <button class="cancel">Cancel</button>
        <button class="confirm">Confirm</button>
      </div>
    `
    libraryArea.prepend(newBookPrompt)

    const cancel = document.querySelector(".cancel")
    cancel.addEventListener("click", () => {
      addBookActive = false
      libraryArea.removeChild(newBookPrompt)
    })
    const confirm = document.querySelector(".confirm")
    confirm.addEventListener("click", () => {
      addBookActive = false
      const title = document.querySelector(".input-title")
      const author = document.querySelector(".input-author")
      const newBook = new Book(title.value, author.value, myLibrary.length + 1)
      saveToLibrary(newBook)
      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild)
        }
      }
      removeAllChildNodes(libraryArea)
      displaySavedBooks(myLibrary)
      console.log(myLibrary)
    })
  }
})
