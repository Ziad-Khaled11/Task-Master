document.addEventListener('DOMContentLoaded', function() {
    fetch('side-pannel.html') // Fetch the sidebar HTML file
        .then(response => response.text()) // Get the text content
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data; // Insert into the sidebar container
        })
        .catch(error => console.error('Error loading sidebar:', error)); // Error handling
});
document.addEventListener('DOMContentLoaded', function() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.side-bar');

    if (btn && sidebar) {
        btn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});
