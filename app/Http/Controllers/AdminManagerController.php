<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminManagerController extends Controller
{
    /**
     * Check if current user is Super Admin.
     */
    private function checkSuperAdmin(): ?JsonResponse
    {
        if (!Auth::check() || !Auth::user()->isSuperAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. Only Super Admin can manage admin accounts.',
            ], 403);
        }
        return null;
    }

    /**
     * List all admins and super admins.
     */
    public function index(): JsonResponse
    {
        if ($error = $this->checkSuperAdmin()) return $error;

        $admins = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $admins,
        ]);
    }

    /**
     * Store a new Admin.
     */
    public function store(Request $request): JsonResponse
    {
        if ($error = $this->checkSuperAdmin()) return $error;

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'nullable|in:admin,super_admin',
        ]);

        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'admin',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Admin account created successfully.',
            'data' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
                'created_at' => $admin->created_at,
            ],
        ], 201);
    }

    /**
     * Update an Admin account.
     */
    public function update(Request $request, $id): JsonResponse
    {
        if ($error = $this->checkSuperAdmin()) return $error;

        $admin = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $admin->id,
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|in:admin,super_admin',
        ]);

        $admin->name = $validated['name'];
        $admin->email = $validated['email'];
        if (!empty($validated['password'])) {
            $admin->password = Hash::make($validated['password']);
        }
        if (!empty($validated['role'])) {
            $admin->role = $validated['role'];
        }
        $admin->save();

        return response()->json([
            'success' => true,
            'message' => 'Admin account updated successfully.',
            'data' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
                'updated_at' => $admin->updated_at,
            ],
        ]);
    }

    /**
     * Delete an Admin account.
     */
    public function destroy($id): JsonResponse
    {
        if ($error = $this->checkSuperAdmin()) return $error;

        $admin = User::findOrFail($id);

        if ($admin->id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own account while logged in.',
            ], 422);
        }

        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => 'Admin account deleted successfully.',
        ]);
    }
}
