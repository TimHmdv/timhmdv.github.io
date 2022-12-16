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
        this.allPhoneInputs = document.querySelectorAll('[name="phone"]');
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

    inputMask () {
        this.allPhoneInputs.forEach(phoneInput => {
            phoneInput.addEventListener('focus', function (e) {
                e.target.value = '+1 ';
            });
            phoneInput.addEventListener('input', function (e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = '+1 ' + (!x[3] ? (!x[2] ? x[2] : '(' + x[2]) : '(' + x[2] + ') ' + x[3] 
                                          + (x[4] ? '-' + x[4] : ''));
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
        this.inputMask();
        this.clearInputs();
        this.sendData();
    }
}