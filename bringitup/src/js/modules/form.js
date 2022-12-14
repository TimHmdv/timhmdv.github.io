import postData from "./services/requests";

export default class SendForm {
    constructor ({
        form,
        url
    }) {
        this.form = document.querySelector(form);
        this.allInputs = this.form.querySelector('input');
        this.url = url;
    }


    prepareData () {
        this.formData = new FormData(this.form);
    }

    sendData () {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            postData(this.url, this.formData)
            .then(res => {
                console.log(res);
            })
            .catch(res => {
                console.log(res);
            })
            .finally(() => {
                this.clearInputs();
            });
        });
    }

    clearInputs () {
        this.allInputs.forEach(input=> {
            input.value='';
        });
    }

    init () {
        this.clearInputs();
        this.prepareData();
        this.sendData();
    }
}