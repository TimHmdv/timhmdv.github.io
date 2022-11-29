const checkNumInputs = (input) => {
    if (NodeList.prototype.isPrototypeOf(input)) {
        input.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/gi, '');
            });
        });
    } else if (Object.prototype.isPrototypeOf(input)) {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/gi, '');
        });
    } else {
        document.querySelector(input).addEventListener('input', () => {
            document.querySelector(input).value = document.querySelector(input).value.replace(/\D/gi, '');
        });
    }
}

const forms = (state) => {
    const allForms = document.querySelectorAll('form'),
            allInputs = document.querySelectorAll('input'),
            phoneInputs = document.querySelectorAll('input[name="user_phone"]'),
            allUploads = document.querySelectorAll('[name="upload"]');

    // checkNumInputs(phoneInputs);

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    const clearInputs = () => {
        allInputs.forEach(item => {
            item.value='';
        });

        allUploads.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    allUploads.forEach (item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    allForms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');

            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let texMessage = document.createElement('div');
            texMessage.textContent = message.loading;
            statusMessage.appendChild(texMessage);

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData(api, formData)
            .then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok)
                texMessage.textContent = message.success;
            })
            .catch(res => {
                console.log(res);
                statusImg.setAttribute('src', message.fail)
                texMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 5000)
            });
        });
    });

}

export default forms;