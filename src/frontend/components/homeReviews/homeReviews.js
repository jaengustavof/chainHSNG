
export const ReviewsEffects = () => {
    const reviewContainer = document.querySelectorAll('.reviews-carousel')[0];
    const reviewsMessages = document.querySelectorAll('.reviews-carrusel_message');
    const pages = Math.round(reviewsMessages.length/3);
    const controlPages = document.querySelectorAll('.page');

    let leftPx = 0;
    let pageIndex = 0;

    const removeSelected = () => {
        for(let page of controlPages){
            page.classList.remove('selected');
        }
    }

    const addSelected = (index) => {
        controlPages[index].classList.add('selected')
    }

    addSelected(pageIndex);

    setInterval(() => {

        if(leftPx < 105 * (pages-1)){
            pageIndex ++;
            leftPx += 105;
            removeSelected();
            addSelected(pageIndex);
        }else{
            leftPx = 0;
            pageIndex = 0;
            removeSelected();
            addSelected(pageIndex);
        }
        reviewContainer.style.left = "-"+leftPx+"%";

    }, 5000);
}