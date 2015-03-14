reCAPTCHA = {
    settings: {
        theme: 'clean'
    },
    config: function(settings) {
        return _.extend(this.settings, settings);
    }
}


Template.reCAPTCHA.rendered = function() {

    $.getScript('//www.google.com/recaptcha/api.js', function() {
        Recaptcha.create(reCAPTCHA.settings.publickey, 'rendered-captcha-container', {
            theme: reCAPTCHA.settings.theme,
            callback: function() {
                return;
            }
        });
    });

}
