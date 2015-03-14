reCAPTCHA = {
    settings: {},
    
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
}


Template.reCAPTCHA.rendered = function() {
    
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
        grecaptcha.reset();
    }


}
