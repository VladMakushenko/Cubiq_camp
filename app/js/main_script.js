$(".feedback_form").on('submit', function(e) {
    var $this = $(this);
    e.preventDefault();

    // $this.find('[type=submit]').prop('disabled', true);

    // console.log($this.find('input[type="tel"]').val());


    // $.ajax({
    //     type: "POST",
    //     url: "/subscribe",
    //     data: $(this).serialize()
    // }).done(function(data) {
    //     var result = data;

    //     if (result == "ok") {
    //         $this.siblings(".subscribe_error_block").fadeOut(300);
    //         $this.addClass('hidden');

    //         setTimeout(() => {
    //             $this.siblings(".thanks_for_subscribe_block").fadeIn(300);
    //         }, 500);
    //     } else {
    //         $this.siblings(".subscribe_error_block").removeClass('hidden').addClass('visible');
    //         $this.find("input[type='email']").addClass('invalid');

    //         $this.find('[type=submit]').prop('disabled', false);
    //     }
    // });
});



// const input = document.querySelector("input[type='tel']");
// window.intlTelInput(input, {
//     initialCountry: "auto",
//     defaultCountry: 'auto',
//     preferredCountries: ['ru'],
// });
