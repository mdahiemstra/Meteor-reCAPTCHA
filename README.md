# Meteor reCAPTCHA V2
This package implements the version 2 of Google reCAPTCHA. 

It is a fork of the package [Altapp/Meteor-reCAPTCHA](https://github.com/Altapp/Meteor-reCAPTCHA) which implements Google reCAPTCHA Version 1.

Google reCAPTCHA is a free CAPTCHA service that protects your site against spam, malicious registrations and other forms of attacks where computers try to disguise themselves as a human. In addition to protecting your site, reCAPTCHA also helps digitize old books and newspapers.

Google reCAPTCHA documentation is available at https://developers.google.com/recaptcha/

Package made with the help of this [StackOverflow question](http://stackoverflow.com/questions/22253196/working-example-of-recaptcha-in-meteor).

## Installation

``` sh
$ meteor add appshore:recaptcha
```

## Setup

###On The Client

Add your reCAPTCHA public key (from Google) to the package. Do this in client-side code.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        theme: 'light'  // 'light' default or 'dark'
        publickey: 'your_public_key_from_google'
    });
});
```

###On The Server

Add your reCAPTCHA private key (from Google) to the package. Do this in server-only code (not just an 'isServer' block) to keep your key secret.

``` javascript
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: 'your_private_key_from_google'
    });
});
```

## Usage

###On The Client

Include the `{{> reCAPTCHA}}` template block in your form template.

``` html
<template name="myTemplate">
    <form>
    	<!-- your form fields... -->

    	{{> reCAPTCHA}}

    	<button type="submit">Submit</button>
    </form>
</template>
```

In your submit event, include the reCAPTCHA data in your method call.

``` javascript
Template.myTemplate.events({
    'submit form': function(evt) {
        evt.preventDefault();

        
        //console.log('g-recaptcha-response', $('#g-recaptcha-response').val(), evt);

        var formData = {
            //get the data from your form fields
            ...
            
            // and the recaptcha response
            g-recaptcha-response : $('#g-recaptcha-response').val()
        };

        Meteor.call('formSubmissionMethod', formData, function (error, result) {
            // recaptcha server response will be in result
            console.log('result: ', error, result);
        });
    }
});
```

###On The Server

In the server method, pass the captcha data and the user's IP address to `reCAPTCHA.verifyCaptcha(clientIP, captchaData)` to verify that the user entered the correct text.

``` javascript
Meteor.methods({
    formSubmissionMethod: function(formData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, formData.g-recaptcha-response);

        //console.log('reCAPTCHA response', verifyCaptchaResponse.data);
        /* verifyCaptchaResponse.data returns a json {
                'success': true|false,
                'error-codes': an-error-code
            };
            [https://developers.google.com/recaptcha/docs/verify](https://developers.google.com/recaptcha/docs/verify)
        */
        
        if( verifyCaptchaResponse.data.success === false ){
            return verifyCaptchaResponse.data;
        }

        //do stuff with your formData

        return true;
    }
});
```