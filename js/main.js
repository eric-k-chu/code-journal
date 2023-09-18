const $photoUrl = document.querySelector('#photo-url');
const $photo = document.querySelector('.photo-wrapper > img');

$photoUrl.addEventListener('input', function (event) {
  $photo.src = $photoUrl.value;
  event.preventDefault();
});
