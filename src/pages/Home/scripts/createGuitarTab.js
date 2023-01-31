let $guitarStrings;
const scaleNotes = ['E', 'B' ,'G', 'D', 'A', 'E'];

export function createGuitarTab(element, id) {
    
    const $guitarTab = document.createElement('article');
    $guitarTab.classList.add('guitar-tab');
    $guitarTab.id = id;

    element.appendChild($guitarTab);

}

export function addGuitarNotes(element, num, idClass) {
    
    if (!element.hasChildNodes()) {

        for (let i = 0; i < scaleNotes.length; i++) {

            const guitarStrings = document.createElement('p');//<-- create <p> the element
            guitarStrings.classList.add('guitar-strings', idClass);//<-- add class

            guitarStrings.textContent += `${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}`;

            element.appendChild(guitarStrings);
        }

    }

    if (element.hasChildNodes()) {

        $guitarStrings = document.querySelectorAll(`.${idClass}`);

        for (let i = 0; i < $guitarStrings.length; i++) {
            
            if ($guitarStrings[i].textContent.length >= 41) {
                console.log('%cNo more tabs on this article .bass-tab', 'background-color:yellow; color:#000; font-size:20px;');
                break;
            } else {
                $guitarStrings[i].textContent += `——${num[i].value === "" ? "—" : num[i].value}`;
            }
            
        }
        
    }
    
}