const form = document.getElementById('flashcard-form');
const frontInput = document.getElementById('front-input');
const backInput = document.getElementById('back-input');
const flashcardsList = document.getElementById('flashcards-list');

let flashcards = [];

function renderFlashcards() {
    flashcardsList.innerHTML = '';
    flashcards.forEach((card, idx) => {
        const row = document.createElement('div');
        row.className = 'flashcard-row';

        // Card display/edit state
        if (card.editing) {
            const frontEdit = document.createElement('input');
            frontEdit.type = 'text';
            frontEdit.className = 'edit-input';
            frontEdit.value = card.front;

            const backEdit = document.createElement('input');
            backEdit.type = 'text';
            backEdit.className = 'edit-input';
            backEdit.value = card.back;

            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.textContent = 'Save';
            saveBtn.onclick = () => {
                flashcards[idx].front = frontEdit.value;
                flashcards[idx].back = backEdit.value;
                flashcards[idx].editing = false;
                renderFlashcards();
            };

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'cancel-btn';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => {
                flashcards[idx].editing = false;
                renderFlashcards();
            };

            const editForm = document.createElement('div');
            editForm.style.display = 'flex';
            editForm.style.flexDirection = 'column';
            editForm.style.gap = '5px';
            editForm.appendChild(frontEdit);
            editForm.appendChild(backEdit);
            editForm.appendChild(saveBtn);
            editForm.appendChild(cancelBtn);

            row.appendChild(editForm);
        } else {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'flashcard' + (card.flipped ? ' flipped' : '');
            cardDiv.onclick = () => {
                flashcards[idx].flipped = !flashcards[idx].flipped;
                renderFlashcards();
            };

            const inner = document.createElement('div');
            inner.className = 'flashcard-inner';

            const frontDiv = document.createElement('div');
            frontDiv.className = 'flashcard-front';
            frontDiv.textContent = card.front;

            const backDiv = document.createElement('div');
            backDiv.className = 'flashcard-back';
            backDiv.textContent = card.back;

            inner.appendChild(frontDiv);
            inner.appendChild(backDiv);
            cardDiv.appendChild(inner);

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.onclick = (e) => {
                e.stopPropagation();
                flashcards[idx].editing = true;
                renderFlashcards();
            };

            row.appendChild(cardDiv);
            row.appendChild(editBtn);
        }

        flashcardsList.appendChild(row);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const front = frontInput.value.trim();
    const back = backInput.value.trim();
    if (!front || !back) return;
    flashcards.push({
        front,
        back,
        flipped: false,
        editing: false
    });
    frontInput.value = '';
    backInput.value = '';
    renderFlashcards();
});

// Initial render
renderFlashcards();