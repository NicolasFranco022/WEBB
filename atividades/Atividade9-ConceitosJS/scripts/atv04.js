function ex04() {
    const form = document.querySelector('#form04');
    const input = form.querySelector('input[name="in_04"]').value;
    const numbers = input.trim().split(" ").map(Number);
    document.getElementById('output').innerHTML = resolve04(numbers);
    form.reset();
}

function resolve04(numbers) {
    const perfectNums = numbers
        .map(function (item) {
            return parseInt(item);
        })
        .filter(function (val) {
            return filter_perfeito(val);
        });

    return perfectNums.join(" ");
}

function filter_perfeito(val) {
    let sum = 0;
    for (let i = 1; i < val; i++) {
        if (val % i === 0) {
            sum += i;
        }
    }
    return sum === val;
}
