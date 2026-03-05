<?php

use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::post('/enquiry', [EnquiryController::class, 'store']);
    Route::get('/enquiry', [EnquiryController::class, 'create']);
});

Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/admin/enquiries', [EnquiryController::class, 'index']);
    Route::delete('/admin/enquiries/{enquiry}', [EnquiryController::class, 'destroy']);
});


Route::middleware(['auth', 'role:super-admin'])->group(function () { 
    // Page to show form 
    Route::get('/admin/subadmins/create', [SubAdminController::class, 'create']); 
    // Handle form submission 
    Route::post('/admin/subadmins', [SubAdminController::class, 'store']); }); 

    Route::middleware(['auth', 'role:sub-admin'])->group(function () { 
        Route::get('/subadmin/dashboard', [SubAdminController::class, 'dashboard']); 
    }
);


// Route::get('/report', function () {
//     return Inertia::render('User/Report');
// })->middleware(['auth'])->name('report.user');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware('auth')->group(function () {
//     Route::resource('/reports', ReportController::class);
// });

require __DIR__.'/auth.php';
