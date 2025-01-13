<?PHP
//Twig Setup
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('views');
$twig = new \Twig\Environment($loader);

//Twig Render
echo $twig->render('home.html', ['name' => 'Alejandro']);
