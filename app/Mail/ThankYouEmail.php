<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ThankYouEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Inquiry $inquiry;

    /**
     * Create a new message instance.
     */
    public function __construct(Inquiry $inquiry)
    {
        $this->inquiry = $inquiry;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from(
            config('mail.from.address', 'support@mechupp.com'),
            config('mail.from.name', 'MechUpp Powered by Aethenox Motoserv')
        )
        ->subject('🎟️ Your Early Bird Discount is Locked! Welcome to MechUpp.')
        ->view('emails.thankyou', [
            'name' => $this->inquiry->name,
            'phone_no' => $this->inquiry->phone_no,
            'email' => $this->inquiry->email,
            'motor_name' => $this->inquiry->motor_name,
        ]);
    }
}
