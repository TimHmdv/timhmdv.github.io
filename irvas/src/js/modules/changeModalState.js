import checkNumInputs from "./checkNumInputs";

const changeModalState =  (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
            windowWidth = document.querySelector('#width'),
            windowHeight = document.querySelector('#height'),
            windowType = document.querySelector('#view_type'),
            windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs(windowWidth);
    checkNumInputs(windowHeight);

    function bindActionToElements (event, element, property) {
        element.forEach((item, index) => {
            item.addEventListener(event, () => {
                state[property] = index;
                console.log(state);
            });
        });
    }

    bindActionToElements('click', windowForm, 'form')

}

export default changeModalState;