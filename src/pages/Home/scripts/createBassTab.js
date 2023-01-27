let $strings;
const scaleNotes = ['G', 'D', 'A', 'E'];

export function createBassTab(element, num) {
    
    const $bassTab = document.createElement('article');

    $bassTab.classList.add("bass-tab");

    
    if (!element.hasChildNodes()) {//<-- first print on screen
        
        
        for (let i = 0; i < scaleNotes.length; i++) {

            const bassStrings = document.createElement('p');
            bassStrings.classList.add('bass-strings');
            
            bassStrings.textContent += `${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}`;
            
            $bassTab.appendChild(bassStrings);

        }

    }

    if (element.hasChildNodes()) {
        $strings = document.querySelectorAll('.bass-strings');

        for (let i = 0; i < $strings.length; i++) {
            
            if ($strings[i].textContent.length === 41) {
                console.log('%cNo more tabs on this div', 'background-color:yellow; font-size:20px;');
                break;
            } else {
                $strings[i].textContent += `——${num[i].value === "" ? "—" : num[i].value}`;
            }

        }

    }
    
    setTimeout(() => {
        $strings = document.querySelectorAll('.bass-strings');
    
        console.log($strings[0].textContent.length === 41);
    }, 1);

    if (element.children.length === 0) {//<-- prevents double div
        element.appendChild($bassTab);
    }

}