<php
    
    $router->post('/api/register', [App\Http\AuthController::class, 'register']);
    $router->post('/api/login', [App\Http\AuthController::class, 'login']);