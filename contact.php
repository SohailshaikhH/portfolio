<?php
// Set headers to handle AJAX requests
header('Content-Type: application/json');

// Get form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate form data
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

// Set email recipient
$to = 'shaikhsohail10m@gmail.com';

// Set email subject
$subject = 'New Contact Form Submission from ' . $name;

// Build email content
$email_content = "Name: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

// Build email headers
$email_headers = "From: $name <$email>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send the email
try {
    $mail_sent = mail($to, $subject, $email_content, $email_headers);
    
    if ($mail_sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent.'
        ]);
    } else {
        throw new Exception('Could not send the email.');
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>
