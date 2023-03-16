<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home/index');
})->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/tareas', function() { return Inertia::render('Task/index'); });
    Route::get('/tareas/usuarios', function() { return Inertia::render('RolTask/index'); });
    Route::get('/tareas/asignadas', function() { return Inertia::render('AsignedTask/index'); });
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//     Route::inertia('/', 'Home/index');
// });

require __DIR__.'/auth.php';
