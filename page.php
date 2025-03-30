<?php
    require 'api/config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vision Video - Support</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</head>
<body oncontextmenu="return false">
    <div class="body">
        <header>
            <div class="logo">Vision Video</div>
        </header>
        <main>
            <section class="support">
                <div class="row">
                    <h1 >Support Center</h1>
                    <p>If you have any questions or need assistance, please fill out the form below or check our FAQ section.</p>
                </div>

                <div>
                    <h2 class="mt-5">Frequently Asked Questions (FAQ)</h2>
                    <div class="faq">
                        <div class="faq-item">
                            <h3>How can I reset my password?</h3>
                            <p>Click on the "Forgot Password?" link on the sign-in page and follow the instructions to reset your password.</p>
                        </div>
                        <div class="faq-item">
                            <h3>How do I cancel my subscription?</h3>
                            <p>You can cancel your subscription anytime in your account settings under "Billing."</p>
                        </div>
                        <div class="faq-item">
                            <h3>What should I do if I encounter a streaming issue?</h3>
                            <p>If you experience streaming issues, try refreshing the page or checking your internet connection. If the problem persists, contact support.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="focused"></div>
        </main>

        <div class="full-page-cover">
            <div class="verification">
                <p>Please enter the code you were given on Qualtrics:</p>
                <input id="uid_input"></input>
                <button name="uid_submission_button">Submit</button>
            </div>
        </div>

        <footer>
            <p>&copy; 2024 Vision Video. All rights reserved.</p>
        </footer>
        <div class="unfocused"></div>
        <div class="chat-window">
            <h3>Support Chat</h3>
            <div class="chat-content">
                <p id="greeting">Welcome to Vision Video Support! How can we assist you today?</p>
            </div>
            <input id="message-field" type="text" placeholder="Type your message...">
            <button id="send-button">Send</button>
        </div>
    </div>

</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
<script type="module" src="./js/main.js"></script>