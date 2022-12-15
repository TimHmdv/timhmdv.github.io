import postData from "./services/requests";

export default class SendForm {
    constructor ({
        form,
        url,
        progress = {
            success: 'Data has been successfully sent!',
            loading: 'Sending in progress...',
            error: 'Error while sending data!'
        }
    }) {
        this.form = document.querySelector(form);
        this.allInputs = this.form.querySelector('input');
        this.url = url;
        this.progress = progress;
    }


    prepareData () {
        this.formData = new FormData(this.form);
    }

    sendData () {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.prepareData();

            this.status = document.createElement('div');

            this.status.style.cssText = `
                padding-top: 15px;
                font-weight: bold;
                font-size: 24px;
            `;

            this.status.innerHTML = this.progress.loading;

            this.form.parentNode.append(this.status);
            
            postData(this.url, this.formData)
            .then(res => {
                this.status.innerHTML = this.progress.success;
                console.log(res);
            })
            .catch(res => {
                this.status.innerHTML = this.progress.error;
                console.log(res);
            })
            .finally(() => {
                this.clearInputs();
                setTimeout(() => {
                    this.status.remove();
                }, 9000);
            });
        });
    }

    checkMailInputs () {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
           input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
           }); 
        });
    }

    clearInputs () {
        Array.from(this.allInputs).forEach(input=> {
            input.value='';
        });
    }

    init () {
        this.checkMailInputs();
        this.clearInputs();
        this.sendData();
    }
}