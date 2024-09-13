document.addEventListener('DOMContentLoaded', function() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.side-bar');

    if (btn && sidebar) {
        btn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});

