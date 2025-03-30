<?php
    require '../api/config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vision Video - Sandbox</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</head>
<body oncontextmenu="return false">
    <div class="body">
        <div class="container text-center mt-3">
            <h1>Sandbox</h2>
            <p class="lead">Here, you can paste the context you want the chatbot to use and speak with it given that context.</p>
            <hr/>
        </div>

        <div class="container">
            <div class="row w-100 mb-5">
                <div class="col text-end">
                    <textarea id="context" style="resize: none;" placeholder="Paste here..."></textarea>
                </div>

                <div class="col text-start">
                    <button class="btn btn-primary align-middle" id="contextButton">Set context</button>
                </div>
            </div>
        </div>
        <!-- Chat Box Here -->
        <div class="container w-100">
            <div class="chat-window">
                <h3 class="text-center mb-3">Support Chat</h3>
                <div class="chat-content">
                    <p class="text-center" id="greeting">Welcome to Vision Video Support! How can we assist you today?</p>
                </div>
                <form class="input-group mb-3">
                    <input type="text" class="form-control" id="message-field" placeholder="Type your message...">
                    <button class="btn btn-primary" id="send-button">➤</button>
                </form>
            </div>
        </div>

    </div>




</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
<script type="module" src="../js/main.js"></script>

<script>