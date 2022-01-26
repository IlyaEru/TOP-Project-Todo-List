import { contentDomManipulation } from "./domManip"
export const toDosContent = (function() {
    const homeButtons = document.querySelectorAll('.home-container button');
    homeButtons.forEach((home) => {
        home.addEventListener('click', contentDomManipulation.changeHeader)
    })
})(
)