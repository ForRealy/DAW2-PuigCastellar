let oper = "";
let show: HTMLInputElement = document.getElementById("show")! as HTMLInputElement;
let binary: HTMLInputElement = document.getElementById("binary")! as HTMLInputElement;
let hexa: HTMLInputElement = document.getElementById("hexa")! as HTMLInputElement;

const checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="decimal"]');


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

function setValue(num: number) {
    const numStr = num.toString(); 
    if (binary.checked) {
        show.value += num.toString(2);
    } else if (hexa.checked) {
        show.value += num.toString(16);
    } else {
        show.value += numStr;
    }
    oper += numStr; 
}

function cl() {
    show.value = "";
    oper = "";
}

function setOperator(op: string) {
    const lastChar = oper.charAt(oper.length - 1);
    if (oper.length > 0 && !isOperator(lastChar)) {
        show.value += op; 
        oper += op; 
    }
}

function isOperator(character: string): boolean {
    return ['+', '-', '*', '/', '%', '.' ].includes(character);
}

function calculate() {
    try {
        const result = eval(oper); 
        if (binary.checked) {
            show.value = result.toString(2); 
        } else if (hexa.checked) {
            show.value = result.toString(16); 
        } else {
            show.value = result.toString(); 
        }
        oper = result.toString(); 
    } catch (error) {
        show.value = "Error";
        oper = "";
    }
}


function changeTheme(theme: string) {
    const themeLink = document.getElementById('style') as HTMLLinkElement;
  
   
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
    radio.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeTheme(target.value);
    });
  });
  
  