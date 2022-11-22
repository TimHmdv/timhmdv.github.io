import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const allForms = document.querySelectorAll('form'),
            allInputs = document.querySelectorAll('input'),
            phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    checkNumInputs(phoneInputs);

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

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
    };

    allForms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(res => {
                console.log(res);
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000)
            });
        });
    });

}

export default forms;