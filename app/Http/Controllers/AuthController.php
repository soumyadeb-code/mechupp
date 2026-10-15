<?php

namespace App\Http\Controllers;

use App\Mail\OtpEmail;
use App\Models\PasswordOtp;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Authenticate Super Admin or Admin user.
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials, true)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid email or password.',
        ], 401);
    }

    /**
     * Log out current user.
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Get current authenticated user profile.
     */
    public function me(): JsonResponse
    {
        if (Auth::check()) {
            $user = Auth::user();
            return response()->json([
                'authenticated' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ]);
        }

        return response()->json([
            'authenticated' => false,
        ]);
    }

    /**
     * Send OTP for password reset (valid for 5 minutes).
     */
    public function sendOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'No account found with this email address.',
        ]);

        $email = $request->email;
        $otp = sprintf('%06d', mt_rand(100000, 999999));
        $expiresAt = now()->addMinutes(5);

        // Delete old OTPs for this email
        PasswordOtp::where('email', $email)->delete();

        PasswordOtp::create([
            'email' => $email,
            'otp' => $otp,
            'expires_at' => $expiresAt,
        ]);

        $emailSent = false;
        try {
            Mail::to($email)->send(new OtpEmail($otp));
            $emailSent = true;
        } catch (\Throwable $e) {
            Log::error('Failed sending OTP email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'A 6-digit OTP has been sent to your email. It is valid for 5 minutes.',
            'expires_in_seconds' => 300,
            'email_sent' => $emailSent,
        ]);
    }

    /**
     * Verify OTP and reset password.
     */
    public function resetPasswordWithOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
            'password' => 'required|string|min:6',
        ]);

        $otpRecord = PasswordOtp::where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$otpRecord || $otpRecord->expires_at->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'The OTP entered is invalid or has expired (validity is 5 minutes). Please request a new OTP.',
            ], 422);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete used OTP
        PasswordOtp::where('email', $request->email)->delete();

        // Log the user in
        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully! You are now logged in.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }
}
