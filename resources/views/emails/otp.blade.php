<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP - MechUpp Powered by Aethenox Motoserv</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0d0f14;
            font-family: 'Montserrat', sans-serif;
            color: #ffffff;
        }
        .container {
            max-width: 550px;
            margin: 30px auto;
            background: #161922;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(134, 149, 168, 0.25);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .header {
            background: linear-gradient(135deg, #eb5f0d 0%, #c44e05 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 2px;
            color: #ffffff;
            text-transform: uppercase;
        }
        .header p {
            margin: 6px 0 0 0;
            font-size: 12px;
            letter-spacing: 2px;
            color: rgba(255,255,255,0.95);
            text-transform: uppercase;
            font-weight: 700;
        }
        .content {
            padding: 35px 30px;
            text-align: center;
        }
        .title {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
        }
        .text {
            font-size: 14px;
            line-height: 1.6;
            color: #8695a8;
            margin-bottom: 25px;
        }
        .otp-box {
            background: #0d0f14;
            border: 2px dashed #eb5f0d;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            display: inline-block;
            width: 80%;
        }
        .otp-code {
            font-size: 38px;
            font-weight: 900;
            letter-spacing: 12px;
            color: #ffffff;
            font-family: 'Courier New', Courier, monospace;
        }
        .timer-warning {
            background: rgba(235, 95, 13, 0.15);
            border: 1px solid rgba(235, 95, 13, 0.4);
            border-radius: 8px;
            padding: 10px 15px;
            font-size: 13px;
            color: #eb5f0d;
            font-weight: 700;
            margin-top: 15px;
        }
        .footer {
            background-color: #080a0e;
            padding: 20px;
            text-align: center;
            border-top: 1px solid rgba(134, 149, 168, 0.2);
            font-size: 12px;
            color: #868687;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MECHUPP</h1>
            <p>Powered by Aethenox Motoserv</p>
        </div>
        <div class="content">
            <div class="title">Password Reset Request</div>
            <div class="text">
                You requested a password reset for your <strong style="color: #ffffff;">MechUpp Powered by Aethenox Motoserv</strong> account. Use the 6-digit Verification OTP below to complete your reset.
            </div>

            <div class="otp-box">
                <div class="otp-code">{{ $otp }}</div>
            </div>

            <div class="timer-warning">
                ⏳ Note: This OTP is valid for exactly <strong>5 minutes</strong> only.
            </div>
        </div>
        <div class="footer">
            If you did not request a password reset, please ignore this email.
        </div>
    </div>
</body>
</html>
