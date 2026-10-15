<?php

use App\Http\Controllers\AdminManagerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CmsController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

// Public API routes (CSRF exempted for fetch calls)
Route::group(['middleware' => ['web']], function () {
    Route::post('/api/inquiries', [InquiryController::class, 'store'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    Route::post('/api/login', [AuthController::class, 'login'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    Route::post('/api/logout', [AuthController::class, 'logout'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    Route::get('/api/me', [AuthController::class, 'me']);

    Route::post('/api/forgot-password/send-otp', [AuthController::class, 'sendOtp'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    Route::post('/api/forgot-password/reset', [AuthController::class, 'resetPasswordWithOtp'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    // CMS Public API
    Route::get('/api/cms', [CmsController::class, 'index']);

    // CMS Admin API
    Route::post('/api/admin/cms', [CmsController::class, 'update'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    // Admin & Super Admin protected routes
    Route::get('/api/admin/inquiries', [InquiryController::class, 'index']);
    Route::delete('/api/admin/inquiries/{id}', [InquiryController::class, 'destroy'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

    // Super Admin exclusive routes
    Route::get('/api/super-admin/admins', [AdminManagerController::class, 'index']);
    Route::post('/api/super-admin/admins', [AdminManagerController::class, 'store'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::put('/api/super-admin/admins/{id}', [AdminManagerController::class, 'update'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::delete('/api/super-admin/admins/{id}', [AdminManagerController::class, 'destroy'])
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
});

// Single Page Application Fallback Route (Serves React App for /, /dashboard, etc.)
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
