/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const previousDataJSON = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});

if (previousDataJSON) {
  data = JSON.parse(previousDataJSON);
}
