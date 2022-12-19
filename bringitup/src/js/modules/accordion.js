export default class Accordion {
    constructor ({
        links = null, 
        bodies = null
    }) {
        this.links = document.querySelectorAll(links);
        this.bodies = document.querySelectorAll(bodies); 
    }


    bindTriggers () {
        this.links.forEach((link, index) => {
            link.addEventListener('click', () => {
                if (getComputedStyle(this.bodies[index]).display === 'none') {
                    this.bodies[index].style.display = 'block';
                } else {
                    this.bodies[index].style.display = 'none';
                }
            });
        });
    }




    init () {
        this.bindTriggers();
    }
}