reCAPTCHA = {
    settings: {},
    
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
}

Template.reCAPTCHA.rendered = function() {
    
    // While the js file is loaded, the captcha is not yet initialized
    // so we wait on timer until ready
    function waitForCaptcha() {
        if ( typeof grecaptcha == 'undefined' ) {
            setTimeout(waitForCaptcha, 1);
        } else {
            grecaptcha.render('recaptcha-container', {
                sitekey:reCAPTCHA.settings.publickey,
                theme: reCAPTCHA.settings.theme,
                callback: function() {
                    return;
                }
            });
        }
    }

    if( typeof grecaptcha == 'undefined' ) {
        $.getScript('//www.google.com/recaptcha/api.js', function() {
            waitForCaptcha();
        });
    } else {
        // required to make room for a new captcha if the template is recalled 
        grecaptcha.reset();
    }


}
