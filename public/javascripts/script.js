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
  // Display a confirmation dialog
  var confirmation = window.confirm(
    'Are you sure you want to delete this booking?',
  );

  // If the user confirms, submit the form
}
