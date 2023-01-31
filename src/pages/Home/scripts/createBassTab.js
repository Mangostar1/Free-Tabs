let $strings;
const scaleNotes = ['G', 'D', 'A', 'E'];

export function createBassTab(element, id) {
    
    const $bassTab = document.createElement('article');
    $bassTab.classList.add("bass-tab");//<-- main class
    $bassTab.id = id;

    element.appendChild($bassTab);

}

export function addNotes(element, num, idClass) {
    
    if (!element.hasChildNodes()) {//<-- first print on screen
        
        for (let i = 0; i < scaleNotes.length; i++) {

            const bassStrings = document.createElement('p');//<-- create <p> the element
            bassStrings.classList.add('bass-strings', idClass);//<-- add class
            
            bassStrings.textContent += `${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}`;
            
            element.appendChild(bassStrings);

        }

    } else {
        
        //Select second class to work without bugs when you have more than one ".bass-tab" article
        $strings = document.querySelectorAll(`.${idClass}`);
    
        for (let i = 0; i < $strings.length; i++) {
            
            if ($strings[i].textContent.length >= 41) {
                console.log('%cNo more tabs on this div', 'background-color:yellow; color:#000; font-size:20px;');
                break;
            } else {
                $strings[i].textContent += `——${num[i].value === "" ? "—" : num[i].value}`;
            }
            
        }
    }

}