<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpEmail extends Mailable
{
    use Queueable, SerializesModels;

    public string $otp;

    /**
     * Create a new message instance.
     */
    public function __construct(string $otp)
    {
        $this->otp = $otp;
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
        ->subject('Your Password Reset OTP - MechUpp')
        ->view('emails.otp', [
            'otp' => $this->otp,
        ]);
    }
}
