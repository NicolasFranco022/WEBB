function ex03() {
    const form = document.querySelector('#form03');
    const input = form.querySelector('input[name="in_03"]').value;
    const numbers = input.trim().split(" ").map(Number);
    document.getElementById('output').innerHTML = resolve03(numbers);
    form.reset();
}

function resolve03(numbers) {
    const evenOrOdd = numbers.map(function (item) {
        return isEven(item);
    });

    return evenOrOdd.join("<br>");
}

function isEven(val) {
    return val % 2 === 0 ? "PAR" : "ÍMPAR";
}