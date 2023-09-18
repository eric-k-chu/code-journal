const $photoUrl = document.querySelector('#photo-url');
const $photo = document.querySelector('.photo-wrapper > img');
const $form = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  $photo.src = $photoUrl.value;
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const entry = {
    title: $form[0].value,
    photoUrl: $form[1].value,
    notes: $form[2].value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $photo.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function renderEntry(entry) {
  const $newEntry = document.createElement('li');
  const $divColumnIMG = document.createElement('div');
  const $divPhotoWrapper = document.createElement('div');
  const $img = document.createElement('img');
  const $divColumnText = document.createElement('div');
  const $paragrahTitle = document.createElement('p');
  const $titleText = document.createTextNode(entry.title);
  const $paragrahNotes = document.createElement('p');
  const $notesText = document.createTextNode(entry.notes);

  $newEntry.setAttribute('class', 'row');
  $divColumnIMG.setAttribute('class', 'column-half');
  $divPhotoWrapper.setAttribute('class', 'photo-wrapper');
  $img.setAttribute('src', entry.photoUrl);
  $divColumnText.setAttribute('class', 'column-half');
  $paragrahTitle.setAttribute('class', 'font-bold');
  $paragrahTitle.appendChild($titleText);
  $paragrahNotes.appendChild($notesText);

  $newEntry.appendChild($divColumnIMG);
  $divColumnIMG.appendChild($divPhotoWrapper);
  $divPhotoWrapper.appendChild($img);
  $newEntry.appendChild($divColumnText);
  $divColumnText.appendChild($paragrahTitle);
  $divColumnText.appendChild($paragrahNotes);

  return $newEntry;
}

const $entryList = document.querySelector('.entries-list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (const entry of data.entries) {
    $entryList.appendChild(renderEntry(entry));
  }
});

// const $noEntries = document.querySelector('#no-entries');
// function toggleNoEntries() {
//   $noEntries.classList.toggle('hidden');
// }
