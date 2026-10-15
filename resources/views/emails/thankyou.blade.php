<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎟️ Your Early Bird Discount is Locked! Welcome to MechUpp.</title>
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
            max-width: 600px;
            margin: 30px auto;
            background: #161922;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(134, 149, 168, 0.25);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .header {
            background: linear-gradient(135deg, #eb5f0d 0%, #c44e05 100%);
            padding: 35px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 3px;
            color: #ffffff;
            text-transform: uppercase;
        }
        .header p {
            margin: 8px 0 0 0;
            font-size: 13px;
            letter-spacing: 2px;
            color: rgba(255,255,255,0.95);
            text-transform: uppercase;
            font-weight: 700;
        }
        .content {
            padding: 35px 30px;
        }
        .greeting {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 18px;
        }
        .text {
            font-size: 15px;
            line-height: 1.65;
            color: #8695a8;
            margin-bottom: 20px;
        }
        .text strong {
            color: #ffffff;
        }
        .highlight-box {
            background-color: rgba(235, 95, 13, 0.12);
            border: 1px solid rgba(235, 95, 13, 0.4);
            border-radius: 12px;
            padding: 16px 20px;
            margin: 20px 0;
            color: #eb5f0d;
            font-weight: 800;
            font-size: 15px;
            text-align: center;
        }
        .card {
            background-color: #0d0f14;
            border: 1px solid rgba(134, 149, 168, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
        }
        .card h3 {
            margin: 0 0 12px 0;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #eb5f0d;
            font-weight: 800;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(134, 149, 168, 0.15);
            font-size: 14px;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            color: #868687;
            font-weight: 600;
        }
        .detail-value {
            color: #ffffff;
            font-weight: 700;
        }
        .btn {
            display: block;
            width: 100%;
            text-align: center;
            background: #eb5f0d;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 0;
            border-radius: 12px;
            font-weight: 800;
            font-size: 14px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            box-shadow: 0 10px 25px -5px rgba(235, 95, 13, 0.45);
            margin-top: 25px;
        }
        .signoff {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(134, 149, 168, 0.2);
            font-size: 15px;
            color: #8695a8;
        }
        .footer {
            background-color: #080a0e;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid rgba(134, 149, 168, 0.2);
            font-size: 12px;
            color: #868687;
        }
        .footer strong {
            color: #8695a8;
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
            <div class="greeting">Hi {{ $name }},</div>

            <div class="text">
                Thank you for claiming your <strong>Early Bird spot</strong>! We have successfully received your details, and your exclusive launch discount is now secured.
            </div>

            <div class="text">
                At <strong>MechUpp</strong>, we are on a mission to completely transform how Patna takes care of its two-wheelers. Whether it's a sudden breakdown on any road or a routine service at your home, our verified mechanics will be just a tap away.
            </div>

            <div class="card">
                <h3>Your Registration Summary</h3>
                <div class="detail-row">
                    <span class="detail-label">Full Name:</span>
                    <span class="detail-value">{{ $name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone Number:</span>
                    <span class="detail-value">{{ $phone_no }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">{{ $email }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Motor / Bike:</span>
                    <span class="detail-value">{{ $motor_name }}</span>
                </div>
            </div>

            <div class="text">
                <strong>What happens next?</strong><br>
                You don't need to do anything else. You are officially on the VIP launch list. We will reach out to this email and your contact number as soon as we open our doors for booking.
            </div>

            <div class="highlight-box">
                ⚡ Get ready for Patna's 1st Quick Bike Care.
            </div>

            <div class="signoff">
                Best,<br>
                <strong style="color: #ffffff;">The MechUpp Team</strong><br>
                <span style="font-size: 13px; color: #8695a8;">(Aethenox Motoserv Pvt. Ltd.)</span>
            </div>

            <a href="https://www.mechupp.com" class="btn">Visit MechUpp Website</a>
        </div>

        <div class="footer">
            <p>© 2026 <strong>MechUpp</strong> (Aethenox Motoserv Pvt. Ltd.). All rights reserved.</p>
            <p>Patna's 1st Quick Bike Care — Doorstep Service & On-Road Breakdown Assistance.</p>
        </div>
    </div>
</body>
</html>
