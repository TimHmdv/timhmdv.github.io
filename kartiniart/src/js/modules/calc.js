const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
            materialBlock = document.querySelector(material),
            optionsBlock = document.querySelector(options),
            promocodeBlock = document.querySelector(promocode),
            resultBlock = document.querySelector(result);

    let sum = 0;

    const calFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
            state.sum = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state.sum = sum;
        }
    }

    sizeBlock.addEventListener('change', calFunc);
    materialBlock.addEventListener('change', calFunc);
    optionsBlock.addEventListener('change', calFunc);
    promocodeBlock.addEventListener('input', calFunc);
}

export default calc;