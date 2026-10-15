<?php

namespace App\Models;
namespace App\Http\Controllers;

use App\Models\CmsSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CmsController extends Controller
{
    /**
     * Default fallback CMS settings
     */
    protected array $defaults = [
        'logo_url' => '',
        'favicon_url' => '',
        'logo_title' => 'MechUpp',
        'logo_tagline' => 'Tune Upp. Gear Upp. MechUpp',
        'hero_badge' => '⚡ 1-MINUTE PATNA RIDER SURVEY',
        'hero_title' => "HELP SHAPE PATNA'S 1ST QUICK BIKE CARE & LOCK YOUR DISCOUNT",
        'hero_subtitle' => "Claim your Early Bird spot! MechUpp Powered by Aethenox Motoserv is bringing Patna's 1st Quick Bike Care directly to your doorstep & road.",
        'hero_image' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2048&q=85',
        'hero_cta_text' => 'TAKE SURVEY AND CLAIM DISCOUNT',
        'support_email' => 'mechupp.official@gmail.com',
        'support_phone' => '+91 98765 43210',
        'footer_text' => '© 2026 MechUpp (Aethenox Motoserv Pvt. Ltd.). All rights reserved.',
        'social_links' => '[{"id":"1","platform":"Website","url":"https://www.mechupp.com","icon":"Globe"},{"id":"2","platform":"Instagram","url":"https://instagram.com/mechupp","icon":"Instagram"},{"id":"3","platform":"Twitter / X","url":"https://x.com/mechupp","icon":"Twitter"},{"id":"4","platform":"YouTube","url":"https://youtube.com/@mechupp","icon":"Video"},{"id":"5","platform":"WhatsApp","url":"https://wa.me/919876543210","icon":"MessageCircle"}]',
    ];

    /**
     * Get all CMS settings.
     */
    public function index()
    {
        $settingsFromDb = CmsSetting::all()->pluck('value', 'key')->toArray();
        $merged = array_merge($this->defaults, $settingsFromDb);

        return response()->json([
            'success' => true,
            'data' => $merged,
        ]);
    }

    /**
     * Update CMS settings & handle file uploads (Logo, Favicon).
     */
    public function update(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Validate text fields
        $validated = $request->validate([
            'logo_title' => 'nullable|string|max:255',
            'logo_tagline' => 'nullable|string|max:255',
            'logo_url' => 'nullable|string|max:2000',
            'favicon_url' => 'nullable|string|max:2000',
            'hero_badge' => 'nullable|string|max:255',
            'hero_title' => 'nullable|string|max:500',
            'hero_subtitle' => 'nullable|string|max:2000',
            'hero_image' => 'nullable|string|max:2000',
            'hero_cta_text' => 'nullable|string|max:255',
            'support_email' => 'nullable|email|max:255',
            'support_phone' => 'nullable|string|max:50',
            'footer_text' => 'nullable|string|max:500',
            'social_links' => 'nullable|string',
        ]);

        // Save text settings
        foreach ($validated as $key => $val) {
            if ($val !== null) {
                CmsSetting::setKey($key, $val);
            }
        }

        // Handle Logo removal option
        if ($request->has('remove_logo') && $request->boolean('remove_logo')) {
            CmsSetting::setKey('logo_url', '');
        }

        // Handle Logo file upload
        if ($request->hasFile('logo')) {
            $request->validate([
                'logo' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            ]);
            $file = $request->file('logo');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            // Ensure uploads directory exists
            $uploadDir = public_path('uploads/cms');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            
            $file->move($uploadDir, $filename);
            $logoUrl = '/uploads/cms/' . $filename;
            CmsSetting::setKey('logo_url', $logoUrl);
        }

        // Handle Favicon file upload
        if ($request->hasFile('favicon')) {
            $request->validate([
                'favicon' => 'mimes:ico,png,gif,svg,webp|max:2048',
            ]);
            $file = $request->file('favicon');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            $uploadDir = public_path('uploads/cms');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $file->move($uploadDir, $filename);
            $faviconUrl = '/uploads/cms/' . $filename;
            CmsSetting::setKey('favicon_url', $faviconUrl);
        }

        // Fetch updated settings
        $settingsFromDb = CmsSetting::all()->pluck('value', 'key')->toArray();
        $merged = array_merge($this->defaults, $settingsFromDb);

        return response()->json([
            'success' => true,
            'message' => 'CMS Settings updated successfully!',
            'data' => $merged,
        ]);
    }
}
