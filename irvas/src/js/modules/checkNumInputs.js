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

export default checkNumInputs;