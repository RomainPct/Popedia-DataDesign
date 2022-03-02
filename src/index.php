<!DOCTYPE html>
<html>
<head lang="fr">
    <meta charset="utf-8">
    <title><?php include 'php/rooterTitle.php' ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="Découvrez les candidats à l'électione présidentielle sous un nouvel angle grâce à une mise en parallèle avec la popularité sur Wikipédia.">

    <!-- OG Data -->
    <meta property="og:image" content="https://beta.romainpenchenat.com/assets/images/ekipedia_og.jpg">
    <meta property="og:title" content="Ekipédia - Visualisation de la présidentielle 2022">
    <meta property="og:description" content="Découvrez les candidats à l'électione présidentielle sous un nouvel angle grâce à une mise en parallèle avec la popularité sur Wikipédia.">
    <meta property="og:url" content="https://beta.romainpenchenat.com/">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="Ekipédia - Visualisation de la présidentielle 2022">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">

    <!-- Favicon : https://realfavicongenerator.net -->

    <!-- Style -->
    <link rel="stylesheet" href="{{style_url}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
</head>
<body>
    <?php include 'pages/elements/header.php'; ?>
    
    <?php include 'php/rooter.php'; ?>

    <?php include 'pages/elements/footer.php'; ?>

    <script src="{{script_url}}"></script>
</body>
</html>

