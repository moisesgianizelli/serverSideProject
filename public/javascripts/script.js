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
