let profilepic = document.getElementById('profile-pic');
let inputfile = document.getElementById('input-file');
inputfile.onchange = function(){
    profilepic.src = URL.createObjectURL(inputfile.files[0]);
}