reCAPTCHA = {
    settings: {
    },

    config: function(settings) {
        return _.extend(this.settings, settings);
    },
};


window.onloadcaptcha = function() {
    $('[name=reCaptcha]').each( function(index){
        $(this).empty();
        grecaptcha.render(this.id, {
                sitekey: reCAPTCHA.settings.publickey,
                theme: reCAPTCHA.settings.theme,
                callback: function () {
                return;
            }
        });
    });
};

Template.reCAPTCHA.rendered = function() {
    $.getScript('//www.google.com/recaptcha/api.js?onload=onloadcaptcha&render=explicit');
};
