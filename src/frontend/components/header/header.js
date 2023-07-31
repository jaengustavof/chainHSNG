export const headerEffects = () => {
    const headerTitle = document.getElementById('headerTitle');
    const headerText = document.getElementById('headerText');

    setTimeout(() => {
        headerTitle.classList.remove('no-opacity');
    }, 500);

    setTimeout(() => {
        headerText.classList.remove('no-opacity');
    }, 900);

}