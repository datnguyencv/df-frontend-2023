const modalAdd = document.querySelector('.modal-add-book');
const closeModalAdd = document.querySelector('#close-modal-add');
const overlayAdd = document.querySelector('.overlay-add');
const modalDelete = document.querySelector('.modal-confirm-delete');
const overlayDelete = document.querySelector('.overlay-delete');
const closeModalDelete = document.querySelector('#close-modal-delete');
const btnCancel = document.querySelector('#btn-cancel');
const titleModal = document.getElementById("title-modal");
const btnSubmit = document.getElementById("submit-btn");
const deleteName = document.getElementById("delete-name");

const searchInput = document.querySelector("#search-input");
let currentAction = "";
let idItem = 0;
let baseUrl = window.location.protocol + "//" + window.location.host;
let books = [];
let topics = [];

const getAllBooks = async () => {
  const [resBook, resTopics] = await Promise.all([
    fetch(`${baseUrl}/data/book.json`),
    fetch(`${baseUrl}/data/topic.json`)
  ]);
  const [books, topics] = await Promise.all([resBook.json(), resTopics.json()]);
  await getAllTopics(topics);
  if (books && topics) {
    setDataTable(books);
  }
}

const toggleModal = (modal, overlay) => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

const onClickModalAdd = () => {
  clearForm();
  currentAction = 'Add';
  updateTitleModal();
  toggleModal(modalAdd, overlayAdd);
}

const updateTitleModal = () => {
  titleModal.textContent = currentAction === "Edit" ? 'Edit Book' : 'Add Book';
  btnSubmit.textContent = currentAction === "Edit" ? 'Save' : 'Create';
}

const onClickModalDelete = (id, name) => {
  idItem = id;
  deleteName.textContent = name;
  toggleModal(modalDelete, overlayDelete);
}

closeModalDelete.addEventListener('click', () => toggleModal(modalDelete, overlayDelete));
btnCancel.addEventListener('click', () => toggleModal(modalDelete, overlayDelete));
overlayDelete.addEventListener('click', () => toggleModal(modalDelete, overlayDelete));

closeModalAdd.addEventListener('click', () => toggleModal(modalAdd, overlayAdd));
overlayAdd.addEventListener('click', () => toggleModal(modalAdd, overlayAdd));

const getAllBook = async () => {
  const [resBook, resTopics] = await Promise.all([
    fetch(`${baseUrl}/data/book.json`),
    fetch(`${baseUrl}/data/topic.json`)
  ]);
  [books, topics] = await Promise.all([resBook.json(), resTopics.json()]);
  await getAllTopic(topics);
  console.log(books, topics)
   if (books && topics){
        setDataTable(books);
    }
}
getAllBook();

const getAllTopic = async (topics) => {
  if (topics) {
    const selectTopic = document.getElementById("select-topic");
    topics.forEach(topic => {
      const option = document.createElement("option");
      option.textContent = topic.title;
      option.value = topic.id;
      selectTopic.appendChild(option);
    });
  }
}

const clearForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("select-topic").value = "";
}
const onSubmitForm = () => {
    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const topicId = document.getElementById("select-topic").value;

    if (name.trim() === "" || author.trim() === "" || topicId === "null") {
        alert("Please fill in all information and select a topic.");
        return;
    }

    if (currentAction === 'Add') {
        const newBook = {
            id: Math.floor(Math.random() * (1000 - 6 + 1) + 6),
            name,
            author,
            topic_id: parseInt(topicId),
        };

        books.push(newBook);

        const tbody = document.querySelector("#table-book tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${books.length}</td>
            <td>${newBook.name}</td>
            <td>${newBook.author}</td>
            <td>${getTopicTitle(newBook.topic_id)}</td>
            <td>
                <a id="edit-book" onclick="onClickModalEdit(${newBook.id}, '${newBook.name}', '${newBook.author}', ${newBook.topic_id})" class="edit-book">Edit</a>
                <a id="delete-book" onclick="onClickModalDelete(${newBook.id}, '${newBook.name}')" class="delete-book">Delete</a>
            </td>
        `;

        tbody.appendChild(newRow);
    } else {
        books = books.map(item => {
            if (item.id === idItem) {
                item.name = name;
                item.author = author;
                item.topic_id = topicId;
            }
            return item;
        });

        setDataTable(books);
    }

    toggleModal();
    clearForm();
}
const  onClickModalEdit = (id, name, author, topic_id) =>{
    currentAction = 'Edit';
    updateTitleModal();
    toggleModal(modalAdd,overlayAdd);
    if (id && name && author && author){
        document.getElementById("name").value = name;
        document.getElementById("author").value = author;
        document.getElementById("select-topic").value = topic_id;
        idItem = id;

    }
}
const getTopicTitle = (topicId) => {
    const topic = topics.find(topic => topic.id === topicId);
    return topic ? topic.title : "";
}
const setDataTable = (data) =>{
    console.log("data", data)
    const tbody = document.querySelector("#table-book tbody");
    if (data.length > 0) {
        const topicById = {};
        topics.forEach(topic => {
            topicById[topic.id] = topic.title;
        });
        tbody.innerHTML = "";
        data.forEach((item, index) => {
            const topicTitle = topicById[item.topic_id];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.author}</td>
                <td>${topicTitle}</td>
                 <td>
                   <a id="edit-book" onclick="onClickModalEdit(${item.id}, '${item.name}', '${item.author}', ${item.topic_id})" class="edit-book">Edit</a>
                   <a id="delete-book" onclick="onClickModalDelete(${item.id}, '${item.name}')" class="delete-book">Delete</a>
               </td>
            `;
            tbody.appendChild(row);
        });
    } else {
        tbody.innerHTML = "";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" >
                <div class="no-data">
                   <img src="./assets/empty.svg" alt="No data" >
                        <p>No data</p>                       
                     <button
                        type="button"
                        class="form-btn"
                        id="btn-add-book"
                        onclick="onClickModalAdd()"
                      >
                        Add Book
                  </button>
                </div>
            </td>`;
        tbody.appendChild(row);
    }
}
const onClickDelete = () => {
  const updatedBooks = books.filter(book => book.id !== idItem);
  setDataTable(updatedBooks);
  onClickModalDelete();
}
searchInput.addEventListener('change', (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const filteredBooks = books.filter(book => {
        const bookName = book.name.toLowerCase();
        return bookName.includes(searchValue);
    });
    setDataTable(filteredBooks);
})