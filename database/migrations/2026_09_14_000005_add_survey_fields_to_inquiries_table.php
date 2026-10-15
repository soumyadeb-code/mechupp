<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('phone_no')->nullable()->change();
            $table->string('age_group')->nullable();
            $table->string('gender')->nullable();
            $table->string('occupation_type')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('vehicle_details')->nullable();
            $table->string('servicing_frequency')->nullable();
            $table->string('current_servicing_place')->nullable();
            $table->string('satisfaction_level')->nullable();
            $table->text('main_frustrations')->nullable();
            $table->string('billing_transparency')->nullable();
            $table->string('had_breakdown')->nullable();
            $table->string('breakdown_action')->nullable();
            $table->string('would_use_doorstep')->nullable();
            $table->text('switch_reasons')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
