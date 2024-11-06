<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $description = htmlspecialchars(trim($_POST['description']));

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = 'your_email@example.com'; // Replace with your email address
        $subject = "New Contact Us Submission from $name";
        $message = "Name: $name\nEmail: $email\nDescription:\n$description";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            header("Location: contact.html?status=success"); // Redirect with success
            exit();
        } else {
            header("Location: contact.html?status=error"); // Redirect with error
            exit();
        }
    } else {
        header("Location: contact.html?status=invalid_email"); // Redirect for invalid email
        exit();
    }
} else {
    echo "Invalid request method.";
}
?>
