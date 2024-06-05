const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const judulCatatan = document.getElementById('judulCatatan').value;
  const isiCatatan = document.getElementById('isiCatatan').value;

  
  const catatanElement = document.createElement('div');
  catatanElement.classList.add('catatan'); 


  catatanElement.style.display = 'flex';
  
  
  catatanElement.style.width = '19%';
  catatanElement.style.backgroundColor = '#ddd';
  catatanElement.style.margin = '5px';
  catatanElement.style.marginLeft = '5px';
  catatanElement.style.gap = '10px';

  
  const judulElement = document.createElement('h3');
  judulElement.textContent = judulCatatan;

  
  const isiElement = document.createElement('p');
  isiElement.textContent = isiCatatan;

 
  catatanElement.appendChild(judulElement);
  catatanElement.appendChild(isiElement);

  const catatanContainer = document.getElementById('catatan-container');
  catatanContainer.style.display = 'flex';
  catatanContainer.style.flexDirection = 'row';
  catatanContainer.style.justifyContent = 'space-between';

  
  catatanContainer.appendChild(catatanElement);



  
  const noteElement = document.createElement('div');
  noteElement.classList.add('note-items'); 
  noteElement.style.border = '1px solid #ddd';
  
  noteElement.style.height = '30%';
  noteElement.style.padding = '10px';
  noteElement.style.borderRadius = '5px';
  noteElement.style.backgroundColor = '#ddd';


  noteElement.appendChild(judulElement);
  noteElement.appendChild(isiElement);

  
  catatanElement.appendChild(noteElement);

  
  form.reset();
});
