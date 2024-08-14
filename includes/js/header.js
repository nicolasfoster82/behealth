document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector("#navbar");
    const open = document.querySelector("#open");
    const close = document.querySelector("#close");
    const menuLinks = document.querySelectorAll("#navbar .nav-list a"); 
    const dropbtn = document.querySelector("#navbar .dropbtn"); 

    open.addEventListener("click", () => {
        navbar.classList.add("visible");
        document.body.classList.add('scroll-lock');
    });

    close.addEventListener("click", () => {
        navbar.classList.remove("visible");
        document.body.classList.remove('scroll-lock');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (link !== dropbtn) {
                navbar.classList.remove("visible");
                document.body.classList.remove('scroll-lock');
            }
        });
    });
});

