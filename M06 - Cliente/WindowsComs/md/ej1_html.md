```
<!DOCTYPE html>
<html>
 
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>Programació amb galetes</title>
  <script src="./dist/index.js"></script> 
  <script>
  </script>
</head>
 
<body onload="carregarCookies()">
  <h1 id="header">Text en català</h1>
  <p id="paragraph">Per veure els canvis, actualitzar la pàgina. (Original)<br /></p>
  <button onclick="document.cookie = 'idioma = catala; expires=01 Jan 2000 00:00:00 UTC';">Català</button>
  <button onclick="document.cookie = 'idioma = castella; expires=31 Dec 2030';">Castellà</button>
  <button onclick="document.cookie = 'idioma = angles';">Anglès</button><br />
  <button onclick="document.cookie = 'color = red';">Vermell</button>
  <button onclick="document.cookie = 'color = blue; expires=31 Dec 2030';">Blau</button>
  <button onclick="document.cookie = 'color = green';">Verd</button>
</body>
 
</html>
```