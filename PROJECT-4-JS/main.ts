const form = document.getElementById('form') as HTMLFormElement;
const inputText = document.getElementById('text') as HTMLInputElement;
const table = document.querySelector('table tbody') as HTMLTableSectionElement;
type Task = {
    id: number;
    text: string;
    isComplete: boolean;
};
let list: Task[] = [];
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const obj: Task = {
        id: Date.now(),
        text: inputText.value,
        isComplete: false
    };
    list.push(obj);
    inputText.value = '';
    inputText.focus();
    displayData();
});
const displayData = (): void => {
    table.innerHTML = '';
    list.forEach((value, index) => {

        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td>${index + 1}</td>
            <td class="${value.isComplete ? 'cancelled' : ''}">
                ${value.text}
            </td>
            <td>
            ${
                !value.isComplete
                ?
                `<button class="btn btn-success"
                onclick="handleComplete(${value.id})">
                Complete
                </button>`
                :
                `<button class="btn btn-danger"
                onclick="handleDelete(${value.id})">
                Remove
                </button>`
            }
            </td>
        `;
        table.appendChild(row);
    });
};
function handleDelete(id: number): void {
    list = list.filter(value => value.id !== id);
    displayData();
}
function handleComplete(id: number): void {
    list = list.map(value => {
        if (value.id === id) {
            return {
                ...value,
                isComplete: true
            };
        }
        return value;
    });
    displayData();
}
