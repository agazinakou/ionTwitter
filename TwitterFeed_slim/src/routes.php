<?php

use Slim\Http\Request;
use Slim\Http\Response;

require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/twitteroauth.php';
require_once __DIR__ . '/OAuth.php';
// Routes

//GET_TWEET
$app->get('/twit', function ($request, $response, $args) {
    $resultat = twitter($this->db);
    return $this->response->withJson($resultat);
});


$app->get('/twitter', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    $resultat = twitter();
    return $this->response->withJson($resultat);
});


$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
