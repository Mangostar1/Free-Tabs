let $strings;
const scaleNotes = ['G', 'D', 'A', 'E'];

export function createBassTab(element, num) {
    
    const $bassTab = document.createElement('article');
    $bassTab.classList.add("bass-tab");
    $bassTab.id = num;

    element.appendChild($bassTab);

}

export function addNotes(element, num) {
    
    if (!element.hasChildNodes()) {//<-- first print on screen
        
        for (let i = 0; i < scaleNotes.length; i++) {

            const bassStrings = document.createElement('p');
            bassStrings.classList.add('bass-strings');
            
            bassStrings.textContent += `${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}`;
            
            element.appendChild(bassStrings);

        }

    } else {
        
        $strings = document.querySelectorAll('.bass-strings');
    
        for (let i = 0; i < $strings.length; i++) {
            
            if ($strings[i].textContent.length === 41) {
                console.log('%cNo more tabs on this div', 'background-color:yellow; color:#000; font-size:20px;');
                break;
            } else {
                $strings[i].textContent += `——${num[i].value === "" ? "—" : num[i].value}`;
            }
    
        }
    }

}