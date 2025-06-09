function ex02() {
    const form = document.querySelector('#form02')
    const input = form.querySelector('input[name="in_02"]').value
    document.getElementById('output').innerHTML = resolve02(...input.trim().split(" ").map(Number));
    form.reset()
}

let resolve02 = function(...rest) {
    let soma = 0;

    for (let i = 0; i < rest.length; i++) {
        soma += rest[i];
    }

    const media = soma / rest.length;

    return `Média: ${media}`;
}
