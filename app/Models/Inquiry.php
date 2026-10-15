<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_no',
        'email',
        'motor_name',
        'age_group',
        'gender',
        'occupation_type',
        'vehicle_type',
        'vehicle_details',
        'servicing_frequency',
        'current_servicing_place',
        'satisfaction_level',
        'main_frustrations',
        'billing_transparency',
        'had_breakdown',
        'breakdown_action',
        'would_use_doorstep',
        'switch_reasons',
    ];

    protected $casts = [
        'main_frustrations' => 'array',
        'switch_reasons' => 'array',
    ];
}
