const $photoUrl = document.querySelector('#photo-url');
const $photo = document.querySelector('.photo-wrapper > img');
const $form = document.querySelector('form');
const $entryList = document.querySelector('.entries-list');
const $entryForm = document.querySelector('[data-view="entry-form"]');
const $entries = document.querySelector('[data-view="entries"]');
const $entriesAnchor = document.querySelector('.tabs');
const $newEntryButton = document.querySelector('.new-button');
const $noEntries = document.querySelector('#no-entries');
const $entryFormHeader = document.querySelector('#entry-form-header');
const $delButton = document.querySelector('.del-button');
const $delEntryModal = document.querySelector('.modal-delete');
const $delCancel = document.querySelector('.del-cancel-button');
const $delConfirm = document.querySelector('.del-conf-button');

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

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $entryList.prepend(renderEntry(entry));

    // on first submit remove the no entries element
    if (data.entries.length === 1) {
      toggleNoEntries();
    }
  } else {
    entry.entryID = data.editing.entryID;
    const entryIndex = entryIndexOf(data.editing.entryID);
    const $list = document.querySelectorAll('li');
    data.entries[entryIndex] = entry;
    $list[entryIndex].replaceWith(renderEntry(entry));
    data.editing = null;
  }
  viewSwap('entries');
});

function renderEntry(entry) {
  const $newEntry = document.createElement('li');
  const $divColumnIMG = document.createElement('div');
  const $divPhotoWrapper = document.createElement('div');
  const $img = document.createElement('img');
  const $divColumnText = document.createElement('div');
  const $divRow = document.createElement('div');
  const $paragrahTitle = document.createElement('p');
  const $titleText = document.createTextNode(entry.title);
  const $editIcon = document.createElement('i');
  const $paragrahNotes = document.createElement('p');
  const $notesText = document.createTextNode(entry.notes);

  $newEntry.setAttribute('class', 'row');
  $divColumnIMG.setAttribute('class', 'column-half');
  $divPhotoWrapper.setAttribute('class', 'photo-wrapper');
  $img.setAttribute('src', entry.photoUrl);
  $divColumnText.setAttribute('class', 'column-half');
  $divRow.classList.add('row', 'justify-between');
  $paragrahTitle.setAttribute('class', 'font-bold');
  $editIcon.classList.add('fa', 'fa-pencil', 'edit-icon');
  $paragrahTitle.appendChild($titleText);
  $paragrahNotes.appendChild($notesText);

  $newEntry.appendChild($divColumnIMG);
  $divColumnIMG.appendChild($divPhotoWrapper);
  $divPhotoWrapper.appendChild($img);
  $newEntry.appendChild($divColumnText);
  $divColumnText.appendChild($divRow);
  $divRow.appendChild($paragrahTitle);
  $divRow.appendChild($editIcon);
  $divColumnText.appendChild($paragrahNotes);

  $newEntry.setAttribute('data-entry-id', entry.entryID);
  return $newEntry;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (const entry of data.entries) {
    $entryList.appendChild(renderEntry(entry));
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.classList.toggle('hidden');
  }
}

function viewSwap(view) {
  if (view === 'entries' && data.view !== 'entries') {
    data.view = view;
    $entryForm.classList.toggle('hidden');
    $entries.classList.toggle('hidden');

    if (data.editing !== null) {
      $delButton.classList.toggle('hidden');
    }
    data.editing = null;
    $entryFormHeader.textContent = 'New Entry';
    $photo.src = 'images/placeholder-image-square.jpg';
    $form.reset();
  } else if (view === 'entry-form') {
    data.view = view;
    $entryForm.classList.toggle('hidden');
    $entries.classList.toggle('hidden');
  }
}

$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});

$newEntryButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$entryList.addEventListener('click', function (event) {
  viewSwap('entry-form');
  const currEntryID = event.target.closest('li').getAttribute('data-entry-id');
  for (const entry of data.entries) {
    if (currEntryID === entry.entryID.toString()) {
      data.editing = entry;
    }
  }
  $form[0].value = data.editing.title;
  $form[1].value = data.editing.photoUrl;
  $photo.src = $photoUrl.value;
  $form[2].value = data.editing.notes;
  $entryFormHeader.textContent = 'Edit Entry';
  $delButton.classList.toggle('hidden');
});

$delButton.addEventListener('click', function (event) {
  $delEntryModal.classList.toggle('hidden');
});

$delCancel.addEventListener('click', function (event) {
  $delEntryModal.classList.toggle('hidden');
});

$delConfirm.addEventListener('click', function (event) {
  const entryIndex = entryIndexOf(data.editing.entryID);
  const $list = document.querySelectorAll('li');

  data.entries.splice(entryIndex, 1);
  $list[entryIndex].remove();

  if (data.entries.length === 0) {
    $noEntries.classList.toggle('hidden');
  }
  $delEntryModal.classList.toggle('hidden');
  viewSwap('entries');
});

function entryIndexOf(id) {
  if (data.entries.length === 0) {
    return;
  }

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === id) {
      return i;
    }
  }
}
