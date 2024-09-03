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

// function applyJob() {
//   var btn = document.getElementById("applyBtn");
//   btn.innerHTML = "Applied!";
//   btn.disabled = true;  // Optional: Disable the button after applying
//   btn.style.cursor = "default";
//   btn.style.backgroundColor = "#d5bdaf";
// }

document.querySelector('.read-more').addEventListener('click', function(e) {
e.preventDefault();
window.location.href = this.href;
});

function approve(button) {
button.innerHTML = "Approved!";
button.disabled = true;  // Optional: Disable the button after applying
button.style.cursor = "default";
button.style.backgroundColor = "#d5bdaf";
}

// Add event listener to approve buttons
const approveButtons = document.querySelectorAll('.approve-btn');

approveButtons.forEach(button => {
  button.addEventListener('click', (event) => {
      approve(event.target);
  });
});

function apply(button) {
button.innerHTML = "Applied!";
button.disabled = true;  // Optional: Disable the button after applying
button.style.cursor = "default";
button.style.backgroundColor = "#d5bdaf";
}

// Add event listener to approve buttons
const applyButtons = document.querySelectorAll('.applyBtn');

applyButtons.forEach(button => {
  button.addEventListener('click', (event) => {
      apply(event.target);
  });
});

