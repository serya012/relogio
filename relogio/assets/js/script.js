// Função para obter as cores salvas ou usar cores padrão
function getSavedColor(key, defaultColor) {
    const savedColor = localStorage.getItem(key);
    return savedColor !== null ? savedColor : defaultColor;
}

// Variáveis para as cores dos quadradinhos
let colorPicker1 = getSavedColor('colorPicker1', '#333333');
let colorPicker2 = getSavedColor('colorPicker2', '#f30606da');

// Seleção dos elementos dos quadradinhos
const colorPickerElement1 = document.getElementById('color-picker-1');
const colorPickerElement2 = document.getElementById('color-picker-2');

// Configurar as cores iniciais
colorPickerElement1.value = colorPicker1;
colorPickerElement2.value = colorPicker2;

// Atualizar as variáveis CSS
document.documentElement.style.setProperty('--color-picker-1', colorPicker1);
document.documentElement.style.setProperty('--color-picker-2', colorPicker2);

// Adicionar eventos de mudança para cada elemento de entrada de cor
colorPickerElement1.addEventListener('input', () => changeColor(1));
colorPickerElement2.addEventListener('input', () => changeColor(2));

// Função para trocar a cor
function changeColor(pickerNumber) {
    // Obter os valores de cor diretamente dos elementos de entrada
    const newColor = pickerNumber === 1 ? colorPickerElement1.value : colorPickerElement2.value;

    // Atualizar a variável de cor correspondente
    if (pickerNumber === 1) {
        colorPicker1 = newColor;
    } else {
        colorPicker2 = newColor;
    }

    // Armazenar as cores no localStorage
    localStorage.setItem('colorPicker1', colorPicker1);
    localStorage.setItem('colorPicker2', colorPicker2);

    // Atualizar as variáveis CSS
    document.documentElement.style.setProperty('--color-picker-1', colorPicker1);
    document.documentElement.style.setProperty('--color-picker-2', colorPicker2);
}

// Definição de um intervalo de atualização do relógio
const relogio = setInterval(function time() {
    // Obtenção da hora atual
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    // Formatação das horas que adiciona um zero à esquerda se forem menores que 10
    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec; 

    // Atualização do conteúdo HTML com os valores formatados
    document.getElementById('horas').textContent = hr;
    document.getElementById('minutos').textContent = min;
    document.getElementById('segundos').textContent = sec;
}, 1000); // Atualizar a cada segundo
