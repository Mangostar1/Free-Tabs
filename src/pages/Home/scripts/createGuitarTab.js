let $guitarStrings;
const scaleNotes = ['E', 'B' ,'G', 'D', 'A', 'E'];

export function createGuitarTab(element, num) {
    const $guitarTab = document.createElement('div');

    $guitarTab.id = 'guitar-tab';
    $guitarTab.classList.add('guitar-tab');

    if (!element.hasChildNodes()) {

        for (let i = 0; i < scaleNotes.length; i++) {
            $guitarTab.innerHTML += `
                <p id="guitar-${i}" class="guitar-strings">
                    ${scaleNotes[i]} ——${num[i].value === "" ? "—" : num[i].value}
                </p>
            `;
        }

    }

    if (element.hasChildNodes()) {

        $guitarStrings = document.querySelectorAll('.guitar-strings');

        for (let i = 0; i < $guitarStrings.length; i++) {
            $guitarStrings[i].innerText += `——${num[i].value === "" ? "—" : num[i].value}`;
        }
        
    }

    if (!element.hasChildNodes()) {
        element.appendChild($guitarTab);
    }
}