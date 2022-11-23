const images = () => {
    const imgPopUp = document.createElement('div'),
            workSection = document.querySelector('.works'),
            bigImage = document.createElement('img');

    imgPopUp.classList.add('popup');
    workSection.appendChild(imgPopUp);
    
    imgPopUp.style.justifyContent = 'center';
    imgPopUp.style.alignItems = 'center';
    imgPopUp.style.display = 'none';
    
    imgPopUp.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        
        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopUp.style.display = 'flex';

            const path = target.parentNode.getAttribute('href');

            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) {
            imgPopUp.style.display = 'none';
        }
    });
}

export default images;