function ex01() {
    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value
    document.getElementById('output').innerHTML = resolve01(...input.trim().split(" ").map(Number));
    form.reset()
}

function resolve01() {
    let soma = 0;

    for (let i = 0; i < arguments.length; i++) {
        soma += arguments[i];
    }

    const media = soma / arguments.length;

    return `Média: ${media}`;

} 