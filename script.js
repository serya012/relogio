// Cores padrão usando CSS variables
const DEFAULT_COLOR_1 = '#333333';
const DEFAULT_COLOR_2 = '#f30606da';

// Função para obter as cores salvas ou usar cores padrão
function getSavedColor(key, defaultColor) {
    try {
        const savedColor = localStorage.getItem(key);
        return savedColor !== null ? savedColor : defaultColor;
    } catch (error) {
        console.warn('Erro ao acessar localStorage:', error);
        return defaultColor;
    }
}

// Função para salvar cor com tratamento de erro
function saveColor(key, color) {
    try {
        localStorage.setItem(key, color);
    } catch (error) {
        console.warn('Erro ao salvar no localStorage:', error);
    }
}

// Variáveis para as cores
let colorPicker1 = getSavedColor('colorPicker1', DEFAULT_COLOR_1);
let colorPicker2 = getSavedColor('colorPicker2', DEFAULT_COLOR_2);

// Seleção dos elementos
const colorPickerElement1 = document.getElementById('color-picker-1');
const colorPickerElement2 = document.getElementById('color-picker-2');

// Configurar as cores iniciais
colorPickerElement1.value = colorPicker1;
colorPickerElement2.value = colorPicker2;

// Atualizar as variáveis CSS
updateCSSVariables();

// Adicionar eventos de mudança
colorPickerElement1.addEventListener('input', () => changeColor(1));
colorPickerElement2.addEventListener('input', () => changeColor(2));

// Adicionar evento para reset com duplo clique
colorPickerElement1.addEventListener('dblclick', () => resetColor(1));
colorPickerElement2.addEventListener('dblclick', () => resetColor(2));

// Função para atualizar variáveis CSS
function updateCSSVariables() {
    document.documentElement.style.setProperty('--color-picker-1', colorPicker1);
    document.documentElement.style.setProperty('--color-picker-2', colorPicker2);
}

// Função para trocar a cor
function changeColor(pickerNumber) {
    const newColor = pickerNumber === 1 ? colorPickerElement1.value : colorPickerElement2.value;
    
    if (pickerNumber === 1) {
        colorPicker1 = newColor;
        saveColor('colorPicker1', newColor);
    } else {
        colorPicker2 = newColor;
        saveColor('colorPicker2', newColor);
    }
    
    updateCSSVariables();
}

// Função para resetar cor
function resetColor(pickerNumber) {
    const defaultColor = pickerNumber === 1 ? DEFAULT_COLOR_1 : DEFAULT_COLOR_2;
    const element = pickerNumber === 1 ? colorPickerElement1 : colorPickerElement2;
    
    element.value = defaultColor;
    
    if (pickerNumber === 1) {
        colorPicker1 = defaultColor;
        saveColor('colorPicker1', defaultColor);
    } else {
        colorPicker2 = defaultColor;
        saveColor('colorPicker2', defaultColor);
    }
    
    updateCSSVariables();
    
    // Feedback visual
    element.style.transform = 'scale(1.2)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Gerenciamento do relógio
let relogioInterval;

function startClock() {
    function updateTime() {
        const dateToday = new Date();
        let hr = dateToday.getHours().toString().padStart(2, '0');
        let min = dateToday.getMinutes().toString().padStart(2, '0');
        let sec = dateToday.getSeconds().toString().padStart(2, '0');

        document.getElementById('horas').textContent = hr;
        document.getElementById('minutos').textContent = min;
        document.getElementById('segundos').textContent = sec;
    }
    
    // Atualizar imediatamente e depois a cada segundo
    updateTime();
    relogioInterval = setInterval(updateTime, 1000);
}

// Iniciar o relógio quando a página carregar
document.addEventListener('DOMContentLoaded', startClock);

// Cleanup quando a página for descarregada
window.addEventListener('beforeunload', () => {
    if (relogioInterval) {
        clearInterval(relogioInterval);
    }
});