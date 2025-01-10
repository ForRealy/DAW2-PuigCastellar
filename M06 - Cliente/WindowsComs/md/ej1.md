```
function carregarCookies() {
  let arrayCookies: string[] = document.cookie.split("; ");
  let nomCookie: string = "";
  let valorCookie: string = "";
  for (let cookie of arrayCookies) {
    let temp = cookie.split("=");
    nomCookie = temp[0];
    valorCookie = temp[1];
    console.log(`Nom de la cookie: ${nomCookie}; valor de la cookie: ${valorCookie}`);

    let h1: HTMLHeadingElement = document.getElementById("header") as HTMLHeadingElement;
    let p: HTMLParagraphElement = document.getElementById("paragraph") as HTMLParagraphElement;

    switch (valorCookie){
      case "castella":
        h1.innerHTML = "Texto en castellano";
        p.innerHTML = "Para ver los cambios, actualitzar la página.";
      break;
      
      case "angles":
        h1.innerHTML = "Text in English";
        p.innerHTML = "To see the changes, refresh the page.";
        break;
      
        case "catala":
        h1.innerHTML = "Text en català";
        p.innerHTML = "Per veure els canvis, actualitzar la pàgina.";
        break;
        
      default:
        h1.innerHTML = "Text en català";
        p.innerHTML = "Per veure els canvis, actualitzar la pàgina. (Original)";
    }
    if (nomCookie == "color") {
      document.body.style.backgroundColor = valorCookie;
    }
  };
}
```