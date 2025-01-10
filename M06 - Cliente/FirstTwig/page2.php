<?php
require_once './vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

$currentFile = basename($_SERVER['PHP_SELF']);

$navItems = [
    ['name' => 'Sobre Mí', 'link' => 'index.php', 'active' => $currentFile == 'index.php', 'disabled' => false],
    ['name' => 'Proyectos', 'link' => 'page1.php', 'active' => $currentFile == 'page1.php', 'disabled' => false],
    ['name' => 'Tecnologías', 'link' => 'page2.php', 'active' => $currentFile == 'page2.php', 'disabled' => false],
];

$technologies = [
    [
        'name' => 'HTML',
        'image' => 'https://via.placeholder.com/150/FF5733/FFFFFF?text=HTML',
    ],
    [
        'name' => 'CSS',
        'image' => 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=CSS',
    ],
    [
        'name' => 'JavaScript',
        'image' => 'https://via.placeholder.com/150/FFD700/FFFFFF?text=JavaScript',
    ],
    [
        'name' => 'PHP',
        'image' => 'https://via.placeholder.com/150/6F42C1/FFFFFF?text=PHP',
    ],
    [
        'name' => 'Bootstrap',
        'image' => 'https://via.placeholder.com/150/563D7C/FFFFFF?text=Bootstrap',
    ],
    [
        'name' => 'Twig',
        'image' => 'https://via.placeholder.com/150/00BFFF/FFFFFF?text=Twig',
    ],
    [
        'name' => 'MySQL',
        'image' => 'https://via.placeholder.com/150/00758F/FFFFFF?text=MySQL',
    ],
    [
        'name' => 'React',
        'image' => 'https://via.placeholder.com/150/61DAFB/FFFFFF?text=React',
    ],
];

echo $twig->render('page2.html', [
    'navItems' => $navItems,
    'technologies' => $technologies,
]);
