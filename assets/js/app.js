const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        // Animate links
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            }else{
                link.style.animation = `navLinkFade 0.3s ease forwards ${index /7 + 1}s`; 
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });
}

const app = () => {
    navSlide();
}

app();
