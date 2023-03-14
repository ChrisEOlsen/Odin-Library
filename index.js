let myLibrary = []

function Book(title, author, id, status) {
  this.title = title
  this.author = author
  this.id = id
  this.status = "unread"
}

function saveToLibrary(book) {
  myLibrary.push(book)
}

function saveDemoBooks() {
  const book1 = new Book(
    "The Hobbit",
    "J.R.R Tolkien",
    myLibrary.length,
    "unread"
  )
  saveToLibrary(book1)
  const book2 = new Book(
    "Animal Farm",
    "George Orwell",
    myLibrary.length,
    "unread"
  )
  saveToLibrary(book2)
  const book3 = new Book(
    "The Saint James Holy Bible",
    "Jesus",
    myLibrary.length,
    "unread"
  )
  saveToLibrary(book3)
}

const libraryArea = document.querySelector(".library-area")
const addBook = document.querySelector(".add-book")

function displaySavedBooks(arr) {
  for (let i = 0; i < arr.length; i++) {
    const newBook = document.createElement("book")
    newBook.classList.add("book")
    newBook.setAttribute("id", i)
    newBook.innerHTML =
      `<div class="title">` +
      arr[i].title.replace(/<|>/g, " ") + //Safeguard html input
      `</div>
      <div class="author">` +
      arr[i].author.replace(/<|>/g, " ") +
      `</div>
      <div class="read-button">
        <button class="` +
      arr[i].status +
      `">` +
      arr[i].status +
      `</button>
      </div>`
    libraryArea.prepend(newBook)
    const title = document.querySelector(".title") //Change font size based on title length
    title.textContent.length >= 30
      ? (title.style.cssText = "font-size: 30px")
      : (title.style.cssText = "font-size: 36px")
  }
  //read and unread button declaration
  const readButton = document.querySelectorAll(".read-button button")
  readButton.forEach(r => {
    r.addEventListener("click", () => {
      if (r.classList == "unread") {
        r.classList.remove("unread")
        r.classList.add("read")
        r.textContent = "read"
        myLibrary[r.parentElement.parentElement.id].status = "read"
      } else {
        r.classList.remove("read")
        r.classList.add("unread")
        r.textContent = "unread"
        myLibrary[r.parentElement.parentElement.id].status = "unread"
      }
    })
  })
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
      if (title.value == "" || author.value == "") return
      const newBook = new Book(title.value, author.value, myLibrary.length)
      saveToLibrary(newBook)
      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild)
        }
      }
      removeAllChildNodes(libraryArea)
      displaySavedBooks(myLibrary)
    })
  }
})
