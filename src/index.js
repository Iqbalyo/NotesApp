
import './style/st.css';
import '../footer.js';
import '../nav.js';

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    loader.remove();
  });
}); 



const baseUrl = 'https://notes-api.dicoding.dev/v2';
const notesList = document.getElementById('listnotes');
const getNote = async () => {
  const requestOptions = {
    method: 'GET',
};
  try {
    const response = await fetch(`${baseUrl}/notes`,   requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();

    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllNotes(responseJson.data || []);
    }
  } catch (error) {
    console.error('Error fetching notes:', error);
    showResponseMessage('Failed to load notes. Please check your internet connection or try again later.');
  }
  
};
let existingNotes = []; 

const getExistingNotes = () => {

  return existingNotes;
}
const insertNotes = async (note) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    };

    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();

    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {

     
      getNote();
      showResponseMessage('Catatan berhasil ditambahkan!');
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

const updateNote = async (note) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345'
      },
      body: JSON.stringify(note)
    }
 
    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();
 
    showResponseMessage(responseJson.message);
    getNote();
  } catch (error) {
    showResponseMessage(error);
  }
};
const removeBook = (noteId) => {
  fetch(`${baseUrl}/delete/{noteId}`, {
    method: 'DELETE',
    headers: {
      'X-Auth-Token': '12345'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    showResponseMessage(responseJson.message);
    getBook();
  }).catch(error => {
    showResponseMessage(error);
  });
};
const renderAllNotes = (notes) => {
  const listNoteElement = document.querySelector('#listnote');
  listNoteElement.innerHTML = ''; 

  if (notes && notes.length > 0) {
    notes.forEach(note => {
    listNoteElement.innerHTML += `
    <div class="Catatancontainer">
    <div class="catatan">
    <h3 class="judul-catatan">${note.title}</h3>
    <p class="isi-catatan">${note.body}</p>
    <button type="button" class="button-delete" id="${note.id}">Hapus</button>
  </div>
  </div>
    `;
  });
} else {
  
    listNoteElement.innerHTML = '<p>Tidak ada catatan yang ditemukan.</p>';
  }

  const buttons = document.querySelectorAll('.button-delete');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      const noteId = event.target.id;
      removeNote(noteId);
    });
  });
};

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message);
};

const removeNote = async (noteId) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'YOUR_AUTH_TOKEN' 
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }

    const responseJson = await response.json();

  
    const deletedNoteElement = document.getElementById(noteId); 
    if (deletedNoteElement) {
      deletedNoteElement.parentElement.remove();
    } else {
      console.warn(`Note with ID ${noteId} not found in UI, but may be deleted on the server.`);
    }

    console.log(`Note ${responseJson?.id} (if available) deleted successfully.`); 

  

  } catch (error) {
    console.error('Error deleting note:', error);
    showResponseMessage('Failed to delete note. Please try again later.');
  }
};


document.addEventListener('DOMContentLoaded', () => {

  const inputNoteTitle = document.querySelector('#judulCatatan');
  const inputNoteBody = document.querySelector('#isiCatatan');
  const buttonSaveNote = document.querySelector('form button[type="submit"]'); 
  buttonSaveNote.addEventListener('click', function (event) {
    event.preventDefault(); 

    const note = {
      title: inputNoteTitle.value,
      body: inputNoteBody.value
    };

    insertNotes(note);

    
    inputNoteTitle.value = '';
    inputNoteBody.value = '';
  });

  getNote();
});
