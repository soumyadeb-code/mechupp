<?php

namespace App\Http\Controllers;

use App\Mail\ThankYouEmail;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    /**
     * List all customer inquiries (Protected for Super Admin & Admin).
     */
    public function index(): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated access.',
            ], 401);
        }

        $inquiries = Inquiry::orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $inquiries,
        ]);
    }

    /**
     * Store a new customer survey response and send thank-you email.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone_no' => 'nullable|string|max:30',
            'motor_name' => 'nullable|string|max:100',
            'age_group' => 'nullable|string|max:50',
            'gender' => 'nullable|string|max:50',
            'occupation_type' => 'nullable|string|max:100',
            'vehicle_type' => 'nullable|string|max:50',
            'vehicle_details' => 'nullable|string|max:200',
            'servicing_frequency' => 'nullable|string|max:100',
            'current_servicing_place' => 'nullable|string|max:100',
            'satisfaction_level' => 'nullable|string|max:100',
            'main_frustrations' => 'nullable|array',
            'billing_transparency' => 'nullable|string|max:100',
            'had_breakdown' => 'nullable|string|max:100',
            'breakdown_action' => 'nullable|string|max:100',
            'would_use_doorstep' => 'nullable|string|max:100',
            'switch_reasons' => 'nullable|array',
        ]);

        // Fallback for motor_name if vehicle_details provided
        if (empty($validated['motor_name'])) {
            $validated['motor_name'] = $validated['vehicle_details'] ?? ($validated['vehicle_type'] ?? 'Two Wheeler');
        }

        if (empty($validated['phone_no'])) {
            $validated['phone_no'] = 'Not Provided';
        }

        $inquiry = Inquiry::create($validated);

        // Attempt sending Early Bird confirmation email via SMTP
        $emailSent = false;
        try {
            Mail::to($inquiry->email)->send(new ThankYouEmail($inquiry));
            $emailSent = true;
        } catch (\Throwable $e) {
            Log::error('SMTP Mail error for inquiry ID ' . $inquiry->id . ': ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your Early Bird discount spot is locked.',
            'email_sent' => $emailSent,
            'data' => $inquiry,
        ], 201);
    }

    /**
     * Delete customer inquiry.
     */
    public function destroy($id): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $inquiry = Inquiry::findOrFail($id);
        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer inquiry record deleted successfully.',
        ]);
    }
}
