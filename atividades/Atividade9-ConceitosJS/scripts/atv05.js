function ex05() {

    const form05 = document.querySelector('#form05')
    const input05 = form05.querySelector('input[name="in_05"]').value

    const objInput = JSON.parse(input05)
    resolve05(objInput);
}

function resolve05(dados) {
    const objeto = new Construtora(dados)

    const show = []

    for (let key in objeto) {
        show.push(`${key}: ${objeto[key]}`);
    }

    output.innerHTML = show.join("<br>");

}
function Construtora(data) {
    for (let key in data) {
        this[key] = data[key];
    };
}
