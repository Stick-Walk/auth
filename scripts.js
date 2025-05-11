var id = null;

PlayerIO.quickConnect.simpleGetCaptcha(
    "stick-link-75uokqwdak2qix0siinhig", 
    300,                                    //Image width
    50,                                    //Image height
    function (captcha) {
        var url = captcha.captchaImageUrl;  //Display this in the user registration form
        id = captcha.captchaKey;       //Save this for later
        document.getElementById("captchaImage").src = url
    }, function (error) {
        console.log(error);
    }
);

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userCaptchaInput = document.getElementById('captchaInput').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    PlayerIO.authenticate(
        "stick-link-75uokqwdak2qix0siinhig",
        "public",                                   //A connection with the authentication type SimpleUsers
        {
            register: "true",
            username: username,
            password: password,
            email: email,
            captchaKey: id,                        //The captcha key we got earlier
            captchaValue: userCaptchaInput,     //What the user entered
        },
        {},
        function (client) {
            alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
        },
        function (error) {
            alert(error)
        }
    );
    
    // Optionally, clear the form
    document.getElementById('registerForm').reset();
});
