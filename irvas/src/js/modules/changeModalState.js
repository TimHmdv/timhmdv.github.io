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
        if (NodeList.prototype.isPrototypeOf(element)) {
            element.forEach((item, index) => {
                item.addEventListener(event, () => {
                    switch (item.nodeName) {
                        case 'SPAN':
                            state[property] = index;
                            console.log(state);
                            break;
                        case 'INPUT':
                            if (item.getAttribute('type') === 'checkbox') {
                                index === 0 ? state[property] = 'Холодное' : state[property] = 'Тёплое';
                                console.log(state);
                                element.forEach((box, j) => {
                                    box.checked = false;
                                    if (index == j) {
                                        box.checked = true;
                                    }
                                });
                            }
                            break;
                    }
                });
            });
        } else if (Object.prototype.isPrototypeOf(element)) {
            element.addEventListener(event, () => {
                state[property] = element.value;
                console.log(state);
            });
        } 
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('input', windowHeight, 'height');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('change', windowProfile, 'profile');

}

export default changeModalState;