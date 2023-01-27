let $bassStrings;
const scaleNotes = ['G', 'D', 'A', 'E'];

export function createBassTab(element, num) {
    const $bassTab = document.createElement('div');

    $bassTab.classList.add("bass-tab");

    if (!element.hasChildNodes()) {//<-- first print on screen

        for (let i = 0; i < scaleNotes.length; i++) {
            $bassTab.innerHTML += `
            <p id="bass-${i}" class="bass-strings">
                ${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}
            </p>
            `;
        }
    }

    if (element.hasChildNodes()) {
        $bassStrings = document.querySelectorAll('.bass-strings');

        for (let i = 0; i < $bassStrings.length; i++) {
            
            if ($bassStrings[i].innerText.length === 41) {
                console.log('No more tabs on this div');
                break;
            } else {
                $bassStrings[i].innerText += `——${num[i].value === "" ? "—" : num[i].value}`;
            }

        }

    }

    if (!element.hasChildNodes()) {//<-- prevents double div
        element.appendChild($bassTab);
    }

}