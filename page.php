<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vision Video - Support</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="body">
        <header>
            <div class="logo">Vision Video</div>
        </header>
        <main>
            <section class="support">
                <h1>Support Center</h1>
                <p>If you have any questions or need assistance, please fill out the form below or check our FAQ section.</p>

                <h2>Frequently Asked Questions (FAQ)</h2>
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
            </section>
            <div class="focused"></div>
        </main>

        <div class="full-page-cover">
        <div class="verification">
            <p>Please enter the code you were given on Qualtrics:</p>
            <input></input>
            <button>Submit</button>
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


<?php

    require_once 'api/config.php';
    require 'api/func_process_uid.php';

    echo fetchAndMarkUid($conn);



    
?>


</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="module" src="./js/main.js"></script>