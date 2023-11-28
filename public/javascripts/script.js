document.addEventListener('DOMContentLoaded', function () {
  const manageBookingLink = document.getElementById('manage-booking-link');
  const subMenu = manageBookingLink.nextElementSibling;

  manageBookingLink.addEventListener('click', function (event) {
    event.preventDefault();

    if (subMenu.style.display === 'block') {
      subMenu.style.display = 'none';
    } else {
      subMenu.style.display = 'block';
    }
  });
});
function confirmDelete() {
  var confirmation = window.confirm(
    'Are you sure you want to delete this booking?',
  );
}

function validateForm() {
  var selectedDate = new Date(document.getElementById('date').value);
  var today = new Date();
  selectedDate.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert('Selected date must be today or later.');
    return false;
  }
  return true;
}

function validateForm() {
  var selectedDate = new Date(document.getElementById('date').value);
  var today = new Date();
  selectedDate.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert('Selected date must be today or later.');
    return false;
  }
  return true;
}

function searchGuestList() {
  var input, filter, table, tbody, tr, td, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  table = document.querySelector('.table');
  tbody = table.querySelector('tbody');
  tr = tbody.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    tdName = tr[i].getElementsByTagName('td')[0];
    tdDescription = tr[i].getElementsByTagName('td')[1];
    if (tdName || tdDescription) {
      txtValueName = tdName.textContent || tdName.innerText;
      txtValueDescription =
        tdDescription.textContent || tdDescription.innerText;
      if (
        txtValueName.toUpperCase().indexOf(filter) > -1 ||
        txtValueDescription.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
