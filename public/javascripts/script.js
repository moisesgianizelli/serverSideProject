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
