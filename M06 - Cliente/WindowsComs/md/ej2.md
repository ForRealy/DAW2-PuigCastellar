```

function carregar() {
  let h1: HTMLHeadingElement = document.getElementById("header") as HTMLHeadingElement;
  let p: HTMLParagraphElement = document.getElementById("paragraph") as HTMLParagraphElement;

  switch (localStorage.getItem("idioma")){
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
  document.body.style.backgroundColor = localStorage.getItem("color") as string;

}
```