<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MechUpp — Patna's 1st Quick Bike Care | Powered by Aethenox Motoserv</title>
    <meta name="description" content="MechUpp connects riders with trusted mechanics nearby. Claim your Early Bird spot for Patna's 1st Quick Bike Care.">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-background text-foreground antialiased font-body min-h-screen">
    <div id="app"></div>
</body>
</html>
