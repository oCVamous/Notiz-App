let titles = [];
let notes = [];

let trashTitles = [];
let trashNotes = [];

let trashFolderModal;
let editFolderModal;

function render(type, id) {
  load();
  trashFolderModal = document.getElementById('allBlur');
  if (type == "cards") {
    let list = document.getElementById('myNotes');
    list.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const note = notes[i];
      list.innerHTML += card(title, note, i);
    }
  } else if (type == "trash") {
    trashFolderModal.innerHTML = fillTrashContent();
    trashFolderModal.classList.remove('d-none');
    let content = document.getElementById('allBlurBox');
    content.innerHTML = '';
    for (let i = 0; i < trashTitles.length; i++) {
      console.log(trashTitles);
      content.innerHTML += trashCard(trashTitles[i], trashNotes[i], i);
    }
  } else if (type == "editCard") {
    trashFolderModal.classList.remove('d-none');
    trashFolderModal.innerHTML = `
      <div class="content">
        <textarea value=${titles[id]} id="editTitle"></textarea>
        <textarea value=${notes[id]} id="editNote"></textarea>
        <img class="add-img" src="img/add-img.png" id="btn" class="addBtn" onclick="saveEdit(id)">
      </div>
    `;
  }
}

function fillTrashContent() {
  return `
  <div id="trashFolder" class="trashFolder">
    <h2>Gelöschte Notizen</h2>
    <div id="deleteNotes" class="deleteNotes">
      <div id="allBlurBox"></div>
    </div>
  </div>
  `;
}

function saveEdit() {
  let title = document.getElementById('editTitle');
  let note = document.getElementById('editNote');
  if (title.value == "" && note.value == "") {
    alert("Du kannst keine leeren Notizen erstellen")
  } else {
    console.log(title);
  }
}

function add(cards) {
  console.log('Läuft!');
  let title = document.getElementById('title');
  let note = document.getElementById('note');
  if (title.value == "" && note.value == "") {
    alert("Du kannst keine leeren Notizen erstellen")
  } else {
    titles.push(title.value);
    notes.push(note.value);
  }
  save();
  render('cards', 0);
  title.value = '';
  note.value = '';
}

function deleteNote(i) {
  trashNotes.push(notes[i]);
  trashTitles.push(titles[i]);

  titles.splice(i, 1);
  notes.splice(i, 1);

  save();
  render("cards", 0);
}

function save() {
  let titlesAsText = JSON.stringify(titles);
  saveArray('titles', titlesAsText);
  let notesAsText = JSON.stringify(notes);
  saveArray('notes', notesAsText);

  let trashTitlesAsText = JSON.stringify(trashTitles);
  saveArray('trashTitles', trashTitlesAsText);
  let trashNotesAsText = JSON.stringify(trashNotes);
  saveArray('trashNotes', trashNotesAsText);
}

function load() {
  let titlesAsText = loadArray('titles');

  if (titlesAsText) {
    titles = JSON.parse(titlesAsText);
  }

  let notesAsText = loadArray('notes');
  console.log(notesAsText)
  if (notesAsText) {

    notes = JSON.parse(notesAsText);
    console.log('here')
  }

  let trashTitlesAsText = loadArray('trashTitles');
  if (trashTitlesAsText) {
    trashTitles = JSON.parse(trashTitlesAsText);
  }

  let trashNotesAsText = loadArray('trashNotes');
  if (trashNotesAsText) {
    trashNotes = JSON.parse(trashNotesAsText);
  }

}

function saveArray(key, text) {
  localStorage.setItem(key, text);
}

function loadArray(key) {
  return localStorage.getItem(key);
}

function hideTrash() {
  trashFolderModal.classList.add('d-none');
}


function trashCard(title, note, i) {
  return `
          <div class="card">
            <div class="card-top">
                <div class="deleteBtn">
                <img class="trash-btn" src="img/icons8-trash-64 (1).png" onclick="deleteNoteTrash(${i})">
                </div>
            </div>
          
            <div class="card-bottom">
              <h2>${title}</h2>
                ${note} <br>
            </div>

          </div>
         
        `;
}

function card(createNewTitle, createNewNote, i) {
  return `
            <div class="card" id="card_${i}">
                <div class="card-top">
                    <div class="deleteBtn">
                        <img class="edit-btn" onclick="openNote(card_${i})" src="img/edit-btn.png" alt="">
                        <img class="trash-btn" src="img/icons8-trash-64 (1).png" onclick="deleteNote(${i})">
                    </div>
                </div>

                <div class="card-bottom">
                  <div id="note${i}" contenteditable="true">
                    <h2>${createNewTitle.replaceAll('\n', '<br/>')}</h2>
                  </div>
                  <div id="title${i}" contenteditable="true">
                    ${createNewNote.replaceAll('\n', '<br/>')} <br>
                  </div>
                </div>
            </div>
         
        `;
}

function deleteNoteTrash(i) {
  trashTitles.splice(i, 1);
  trashNotes.splice(i, 1);

  save();
  render();
}

function openEdit() {
  card.classList.add('scale');
  document.getElementById('card').innerHTML = edit(0);
}

function closeEdit() {
  document.getElementById('editor').classList.add('d-none');
}