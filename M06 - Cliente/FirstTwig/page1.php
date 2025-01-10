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

$projects = [
    [
        'title' => 'FirstTwigCV',
        'description' => 'Proyecto para practicar Twig',
        'link' => 'https://github.com/ForRealy/FirstTwigCV',  
        'image' => './src/twig-logo-300x155.png',  
    ],
    [
        'title' => 'TokyoNightV2 ',
        'description' => 'Tema para Discord basado en TokyoNight',
        'link' => 'https://github.com/ForRealy/TokyoNightV2', 
        'image' => './src/preview.png', 
    ],
];

echo $twig->render('page1.html', [
    'navItems' => $navItems,
    'projects' => $projects,
]);
