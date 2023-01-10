let $bassStrings;
const scaleNotes = ['G', 'D', 'A', 'E'];

export function createBassTab(element, num) {
    const $bassTab = document.createElement('div');

    $bassTab.id = "bass-tab";
    $bassTab.classList.add("bass-tab");

    if (!element.hasChildNodes()) {

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
            $bassStrings[i].innerText += `——${num[i].value === "" ? "—" : num[i].value}`;
        }
    }

    if (!element.hasChildNodes()) {
        element.appendChild($bassTab);
    }
}