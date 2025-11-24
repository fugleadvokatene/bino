import 'bootstrap/dist/js/bootstrap.bundle'
import './lang.js'
import './editable.js'

document.getElementById("language-select").addEventListener('change', (event) => {
  event.target.form.submit();
});

document.querySelectorAll('.closer').forEach(el => el.addEventListener('click', function() {
  this.parentElement.style.display = 'none';
}));
