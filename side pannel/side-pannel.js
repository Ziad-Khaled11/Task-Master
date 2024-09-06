const navLink = document.querySelectorAll('.nav__link');
const wondowPathName = window.location.pathname;

navLink.forEach(navLinkel =>{
    const navLinkPathname = new URL(navLinkel.herf).pathname;
    if(wondowPathName === navLinkPathname){
        navLinkel.classList.add('active')
    }
});