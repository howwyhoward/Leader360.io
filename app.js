$(document).ready(function() {
  $('#user-form').on('submit', function(e) {
      e.preventDefault();

      let email = $('#email').val();

      $.ajax({
          url: '/getUser',
          type: 'POST',
          data: {
              email: email
          },
          success: function(data) {
              $('#result').html(`Full name: ${data.UserFname} ${data.UserLname}`);
          },
          error: function(error) {
              console.log('Error:', error);
          }
      });
  });
});
