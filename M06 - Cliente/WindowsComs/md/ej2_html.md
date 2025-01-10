```
<!DOCTYPE html>
<html>
 
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>Programació amb Local Storage</title>
  <script src="./dist/index.js"></script> 
  <script>
  </script>
</head>
 
<body onload="carregar()">
  <h1 id="header">Text en català</h1>
  <p id="paragraph">Per veure els canvis, actualitzar la pàgina. (Original)<br /></p>
  <button onclick="localStorage.setItem('idioma', 'catala')">Català</button>
  <button onclick="localStorage.setItem('idioma', 'castella')">Castellà</button>
  <button onclick="localStorage.setItem('idioma', 'angles')">Anglès</button><br />
  <button onclick="localStorage.setItem('color', 'red')">Vermell</button>
  <button onclick="localStorage.setItem('color', 'blue')">Blau</button>
  <button onclick="localStorage.setItem('color', 'green')">Verd</button>
  
</body>

 
</html>

```