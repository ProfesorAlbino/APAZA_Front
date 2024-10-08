const initPreloader = function () { 
    let body = document.querySelector('body');
    body.classList.add('preloader-site');
}

const removePreloader = function () {
    let preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none'; 
    }
    let body = document.querySelector('body');
    body.classList.remove('preloader-site');
}

export { initPreloader, removePreloader };