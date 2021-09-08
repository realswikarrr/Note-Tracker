const noteLists = document.querySelector("[data-note-data]");
const formContainer = document.querySelector("[data-form-container]");
const titleContainer = document.querySelector("[data-title-container]");
const detailContainer = document.querySelector("[data-detail-container]");

const LOCAL_STORAGE_NOTE_KEY = "notes.list";
notes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTE_KEY)) || [];

// Adding The Notes To The List
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleContainer.value;
  const description = detailContainer.value;
  if (
    title == null ||
    description == null ||
    title == "" ||
    description == ""
  ) {
    alert("Don't Leave Anything Empty");
    return;
  }
  const items = addNote(title, description);
  notes.push(items);
  titleContainer.value = null;
  detailContainer.value = null;
  saveAndRender();
});

function addNote(title, description) {
  return { id: Date.now().toString(), title: title, description: description };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_NOTE_KEY, JSON.stringify(notes));
}

function saveAndRender() {
  save();
  render();
}

// Rendering The Notes
function render() {
  clearNotes(noteLists);
  if (notes.length == 0) {
    let item = document.createElement("div");
    item.setAttribute("id", "notes");
    item.innerHTML =
      item.innerHTML = `<h2>Your Notes</h2><hr /> <p class="note-text">No Notes Yet Start Adding Notes From The Above : 🥱</p>`;
    noteLists.appendChild(item);
  } else {
    let item = document.createElement("div");
    item.setAttribute("id", "notes");
    item.innerHTML = item.innerHTML = `<h2>Your Notes</h2><hr />`;
    noteLists.appendChild(item);
  }

  notes.forEach((note, index) => {
    let item = document.createElement("div");
    item.setAttribute("id", "notes");
    let insideDiv = document.createElement("div");
    insideDiv.classList.add("note");
    insideDiv.innerHTML = `<p class="note-counter">Note ${index + 1}</p>
    <h3 class="note-title">${note.title}</h3>
    <p class="note-text">${note.description}</p>
    <button class="note-btn" data-note-id=${note.id}>Delete Note</button>
    <button class="note-btn edit-btn" data-note-id=${
      note.id
    }>Edit Note</button>`;
    item.appendChild(insideDiv);
    noteLists.appendChild(item);
  });
}

function clearNotes(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Deleting The Notes
document.addEventListener("click", (e) => {
  const item = e.target;
  if (item.className == "note-btn") {
    noteId = item.dataset.noteId;
    const updatedNote = notes.filter((item) => item.id !== noteId);
    notes = updatedNote;
    saveAndRender();
  }
});

// Updating The Notes
document.addEventListener("click", (e) => {
  const item = e.target;
  if (item.className == "note-btn edit-btn") {
    noteId = item.dataset.noteId;
    let oldTitle = notes.find((item) => item.id === noteId).title;
    let oldDescription = notes.find((item) => item.id === noteId).description;
    let title = titleContainer.value;
    let description = detailContainer.value;
    if (
      title == null ||
      description == null ||
      title == "" ||
      description == ""
    ) {
      titleContainer.value = oldTitle;
      detailContainer.value = oldDescription;
      const updatedNote = notes.filter((item) => item.id !== noteId);
      notes = updatedNote;
      saveAndRender();
    }
  }
});

render();
