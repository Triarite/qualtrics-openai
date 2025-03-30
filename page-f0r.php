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
        <main class="container h-100">
            <section class="support">
                <div class="row">
                    <h1 class="text-center">Support Center</h1>
                    <p class="lead text-center">If you have any questions or need assistance, please fill out the form below or check our FAQ section.</p>
                </div>

                <div class="row text-center mb-4">
                    <div class="col"></div>
                    <div class="col-3">
                        <button class="btn btn-primary w-auto">Visit our Form</button>
                    </div>
                    <div class="col"></div>
                </div>

                <div class="h-100">
                    <h2 class="mt-3 text-center">Frequently Asked Questions (FAQ)</h2>
                    <div class="row">
                        <div class="col">
                            <div class="card w-auto p-2">
                                <div class="card-body">
                                    <div class="card-title fw-bold">Reset Password</div>
                                    <div class="card-text">Click on the "Forgot Password?" link on the sign-in page and follow the instructions to reset your password.</div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card w-auto p-2">
                                <div class="card-body">
                                    <div class="card-title fw-bold">Cancel Subscription</div>
                                    <div class="card-text">You can cancel your subscription anytime in your account settings under "Billing."</div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card w-auto p-2">
                                <div class="card-body">
                                    <div class="card-title fw-bold">Streaming Issue</div>
                                    <div class="card-text">If you experience streaming issues, try refreshing the page or checking your internet connection. If the problem persists, contact support.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">

                </div>
            </section>
            <div class="focused"></div>
        </main>

        <!-- Verification Cover -->
        <div class="full-page-cover">
            <div class="mt-5 card container w-50">
                <div class="card-body">
                    <div class="row">
                        <h3 class="card-title text-center">Please enter the code you were given on Qualtrics:</p>
                    </div>
                    <div class="row mb-3">
                        <div class="col"></div>
                        <div class="col-3 input-group w-75">
                            <input type="text" class="form-control" id="uid_input" />
                            <button class="input-group-append btn btn-primary" type="button" name="uid_submission_button">Submit</button>
                        </div>
                        <div class="col"></div>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <p>&copy; 2025 Vision Video. All rights reserved.</p>
        </footer>
        <div class="unfocused"></div>


        <!-- Chat Box Here -->
        <div class="container">
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
<script type="module" src="./js/main.js"></script>