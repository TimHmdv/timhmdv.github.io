export default class Difference {
    constructor ({officer, items}) {
        this.officer = document.querySelector(officer);
        try{this.items = this.officer.querySelectorAll(items);} catch (e) {};
        this.counter = 0;
    }

    bindTriggers() {
        this.officer.querySelector('.plus').addEventListener('click', () => {
            if (this.counter !== this.items.length - 2) {
                this.items[this.counter].style.display = 'flex';
                this.counter++;
            } else {
                this.items[this.counter].style.display = 'flex';
                this.items[this.items.length - 1].remove();
            }
        });
    }

    hideItems() {
        this.items.forEach((item, index, arr) => {
            if (index !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init () {
        try {
            this.hideItems();
            this.bindTriggers();
        } catch (e) {};
    }
}