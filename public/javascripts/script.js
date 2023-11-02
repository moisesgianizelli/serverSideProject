document.addEventListener('DOMContentLoaded', function () {
  const manageBookingNavItem = document.querySelector('.nav-item');
  const subMenu = manageBookingNavItem.querySelector('.sub-menu');

  manageBookingNavItem.addEventListener('click', function (event) {
    event.preventDefault();

    if (subMenu.style.display === 'block') {
      subMenu.style.display = 'none';
    } else {
      subMenu.style.display = 'block';
    }
  });
});
