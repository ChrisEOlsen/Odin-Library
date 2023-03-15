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
    "read"
  )
  saveToLibrary(book1)
  const book2 = new Book(
    "Animal Farm",
    "George Orwell",
    myLibrary.length,
    "read"
  )
  saveToLibrary(book2)
  const book3 = new Book(
    "The Saint James Holy Bible",
    "Jesus",
    myLibrary.length,
    "read"
  )
  saveToLibrary(book3)
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const libraryArea = document.querySelector(".library-area")
const addBook = document.querySelector(".add-book")
let addBookActive = false

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
      </div>
      <button class='delete'>X</button>`
    libraryArea.prepend(newBook)
    //Change font size based on title length
    const title = document.querySelector(".title")
    title.textContent.length >= 30
      ? (title.style.cssText = "font-size: 30px")
      : (title.style.cssText = "font-size: 36px")
    //mouseover event for delete button
    const delButton = document.querySelector(".delete")
    newBook.addEventListener("mouseenter", () => {
      delButton.style.display = "flex"
    })
    newBook.addEventListener("mouseleave", () => {
      delButton.style.display = "none"
    })
    delButton.addEventListener("mouseenter", () => {
      delButton.style.color = "red"
    })
    delButton.addEventListener("mouseleave", () => {
      delButton.style.color = "black"
    })
    //delete button function (removes book)
    delButton.addEventListener("click", () => {
      if (addBookActive) return
      myLibrary.splice(delButton.parentElement.id, 1)
      removeAllChildNodes(libraryArea)
      displaySavedBooks(myLibrary)
    })
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

addBook.addEventListener("click", () => {
  if (!addBookActive) {
    addBookActive = true
    const newBookPrompt = document.createElement("newBookPrompt")
    newBookPrompt.classList.add("new-book-prompt")
    newBookPrompt.innerHTML = `
      <textarea class="input-title" cols="30" rows="10" placeholder="Title"></textarea>
      <textarea class="input-author" cols="30" rows="10" placeholder="By: Author"></textarea>
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
      removeAllChildNodes(libraryArea)
      displaySavedBooks(myLibrary)
    })
  }
})
