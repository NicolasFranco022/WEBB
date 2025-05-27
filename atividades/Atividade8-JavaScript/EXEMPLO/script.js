
function addStudent() {

    
    const form = document.querySelector('#formStudent')
    const input_nome = form.querySelector('input[name="nome"]')
    const input_turma = form.querySelector('select[name="turma"]')
    alert(input_nome)
    const table = document.querySelector('#table_student');
    
    const line = document.createElement('tr')
   
    const col_nome = document.createElement('td')
    col_nome.textContent = input_nome.value
    const col_turma = document.createElement('td')    
    col_turma.textContent = input_turma.value
    
    line.appendChild(col_nome);
    line.appendChild(col_turma);
    
    table.appendChild(line);
    const select = document.querySelector('#select_student');
    
    const op = document.createElement("option");
    
    op.textContent = input_nome.value
    
    op.value = input_nome.value
    select.appendChild(op)
    form .reset()
}