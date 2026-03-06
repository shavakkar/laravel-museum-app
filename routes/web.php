<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubAdminController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Start', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::post('/app/send-otp', [UserController::class, 'sendOtp'])->name('app.sendOtp');
Route::post('/app/verify-otp', [UserController::class, 'verifyOtp'])->name('app.verifyOtp');
Route::post('/app', [UserController::class, 'store'])->name('app.store');


Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::post('/admin', [AdminController::class, 'store'])->name('admin.store');
    Route::delete('/admin/{user}', [AdminController::class, 'destroy'])->name('admin.destroy');

    Route::get('/admin/enquiries', [EnquiryController::class, 'index'])->name('admin.enquiries.index');
    Route::delete('/admin/enquiries/{enquiry}', [EnquiryController::class, 'destroy'])->name('admin.enquiries.destroy');

    Route::get('/admin/locations', [LocationController::class, 'index'])->name('admin.locations.index');
    Route::post('/admin/locations', [LocationController::class, 'store'])->name('admin.locations.store');
    Route::put('/admin/locations/{location}', [LocationController::class, 'update'])->name('admin.locations.update');
    Route::delete('/admin/locations/{location}', [LocationController::class, 'destroy'])->name('admin.locations.destroy');
});

Route::get('/enquiry',  function () {
    return Inertia::render('User/Enquiry');
})->name('user.enquiry');
Route::post('/enquiry', [EnquiryController::class, 'store']);
Route::get('/locations/search', [LocationController::class, 'search'])->name('locations.search');
// Route::get('/enquiry', [EnquiryController::class, 'create']);

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
