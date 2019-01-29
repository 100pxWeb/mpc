<?php 
    $tasks = [
        (object) ["title" => "ASD", "checked" => true],
        (object) ["title" => "QWE", "checked" => false],
        (object) ["title" => "ASD", "checked" => true],
        (object) ["title" => "QWE", "checked" => false],
        (object) ["title" => "ASD", "checked" => true],
        (object) ["title" => "QWE", "checked" => true],
    ];


    $tasks = json_encode($tasks);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="assets/index.js"></script>
</head>
<body>
    <div class="app-container">
        <todo-list data='<?php print $tasks ?>'/>
    </div>
</body>
</html>