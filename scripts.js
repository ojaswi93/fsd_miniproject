document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
  
    menuBtn.onclick = function () {
      sidebar.classList.toggle("collapsed");
  
      if (sidebar.classList.contains("collapsed")) {
        mainContent.style.marginLeft = 'var(--sidebar-width-collapsed)';
      } else {
        mainContent.style.marginLeft = 'var(--sidebar-width)';
      }
    };
  });

  document.getElementById('filter-toggle').addEventListener('click', function() {
    var filterBox = document.getElementById('filter-box');
    filterBox.classList.toggle('show');
});
  