"use strict";
let oper = "";
let show = document.getElementById("show");
let binary = document.getElementById("binary");
let hexa = document.getElementById("hexa");
const checkboxes = document.querySelectorAll('input[name="decimal"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxes.forEach(item => {
                if (item !== checkbox) {
                    item.checked = false;
                }
            });
        }
    });
});
function setValue(num) {
    const numStr = num.toString();
    if (binary.checked) {
        show.value += num.toString(2);
    }
    else if (hexa.checked) {
        show.value += num.toString(16);
    }
    else {
        show.value += numStr;
    }
    oper += numStr;
}
function cl() {
    show.value = "";
    oper = "";
}
function setOperator(op) {
    const lastChar = oper.charAt(oper.length - 1);
    if (oper.length > 0 && !isOperator(lastChar)) {
        show.value += op;
        oper += op;
    }
}
function isOperator(character) {
    return ['+', '-', '*', '/', '%', '.'].includes(character);
}
function calculate() {
    try {
        const result = eval(oper);
        if (binary.checked) {
            show.value = result.toString(2);
        }
        else if (hexa.checked) {
            show.value = result.toString(16);
        }
        else {
            show.value = result.toString();
        }
        oper = result.toString();
    }
    catch (error) {
        show.value = "Error";
        oper = "";
    }
}
function changeTheme(theme) {
    const themeLink = document.getElementById('style');
    switch (theme) {
        case 'pink':
            themeLink.href = './pink.css';
            break;
        case 'purple':
            themeLink.href = './purple.css';
            break;
        default:
            themeLink.href = './style.css';
            break;
    }
}
const themeRadios = document.querySelectorAll('input[name="theme"]');
themeRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const target = event.target;
        changeTheme(target.value);
    });
});
