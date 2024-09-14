
const Login = document.querySelector('.login');
const Register = document.querySelector('.register');
const Input = document.querySelector('.input-box input');
const Label = document.querySelector('.input-box label');
Input.addEventListener('input', () => {
    if (Input.value) {
        Label.classList.add('filled');
    } else {
        Label.classList.remove('filled');
    }
});

const input = document.getElementById("eInput");
const label = document.getElementById('eLabel');
input.addEventListener('input', () => {
    if (input.value) {
        label.classList.add('filled');
    } else {
        abel.classList.remove('filled');
    }
});
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // Toggle password visibility
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.name = 'eye-outline'; // Change to 'eye' icon
    } else {
        passwordInput.type = 'password';
        eyeIcon.name = 'eye-off-outline'; // Change to 'eye-off' icon
    }
}
const backgrounds = [
    '../resources/login-bg/download (10).jpg',
    '../resources/login-bg/color_periwinkle.jpg',
    '../resources/login-bg/download (9).jpg',
    '../resources/login-bg/steam-design-with-raindrops.jpg',
    '../resources/login-bg/login.jpg'
];

// Get a random background
const randomIndex = Math.floor(Math.random() * backgrounds.length);
const randomBackground = backgrounds[randomIndex];

// Set the body background image
document.body.style.backgroundImage = `url('${randomBackground}')`;

/*const accessKey = 'f73QLZJ_DnewbyJVDRtmRSkX1-034SrHHq7amCJCfdc'; // Replace with your Unsplash access key
const query = 'dark blue universe'; // The search query
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

// Fetch photos from Unsplash
fetch(url)
    .then(response => response.json())
    .then(data => {
        const photos = data.results;

        // Check if photos are available
        if (photos.length === 0) {
            console.error('No photos available.');
            return;
        }

        // Create or update image element
        let img = document.getElementById('unsplash-photo');
        if (!img) {
            img = document.createElement('img');
            img.id = 'unsplash-photo';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover'; // Ensure the image covers the viewport
            img.style.zIndex = '-1'; // Ensure the image is behind other content
            document.body.appendChild(img);
        }

        // Select a random index
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * photos.length);
        } while ([1, 2, 3, 4, 5, 7, 8].includes(randomIndex));

        // Set the image source and alt text
        img.src = photos[randomIndex].urls.full; // Use the full-size URL
        img.alt = photos[randomIndex].alt_description || 'Unsplash Photo';

    })
    .catch(error => {
        console.error('Error fetching photos:', error);
    });*/

function login() {
    Login.style.display = 'flex';
    Register.style.display = 'none';
}

function register() {
    Login.style.display = 'none';
    Register.style.display = 'block';
}

function changePage() {
    window.location.href = '../main\ page/main\ page.html';
}