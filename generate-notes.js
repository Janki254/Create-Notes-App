const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => addNote(note));
}

addBtn.addEventListener('click', () => addNote());

function addNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class='tools'>
            <button class='edit'><i class='fas fa-edit'></i></button>
            <button class='delete'><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class='mainEle ${text ? '' : 'hidden'}'></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const mainEle = note.querySelector('.mainEle');
    const textAreaEle = note.querySelector('textarea');

    textAreaEle.value = text;
    mainEle.innerHTML = marked(text);

    deleteBtn.addEventListener('click', () => {
        note.remove();

        updateLS();
    });
    editBtn.addEventListener('click', () => {
        mainEle.classList.toggle('hidden');
        textAreaEle.classList.toggle('hidden');
    });

    textAreaEle.addEventListener('input', (e) => {
        const {value} = e.target;

        mainEle.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach((note) => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}
