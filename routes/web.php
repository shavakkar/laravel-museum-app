<?php

use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::post('/enquiry', [EnquiryController::class, 'store']);
});

// Route::middleware(['auth', 'role:sub-admin'])->group(function () {
//     Route::get('/subadmin/dashboard', [SubAdminController::class, 'index']);
// });

Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/admin/enquiries', [EnquiryController::class, 'index']);
});



Route::get('/report', function () {
    return Inertia::render('User/Report');
})->middleware(['auth'])->name('report.user');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('/reports', ReportController::class);
});

require __DIR__.'/auth.php';
