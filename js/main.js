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
  data.entries.push(entry);
  $photo.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
