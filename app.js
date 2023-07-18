$(document).ready(function() {
  console.log('in function');
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
              console.log('success');
              $('#result').html(`Full name: ${data.UserFname} ${data.UserLname}`);
          },
          error: function(error) {
              console.log('Error:', error);
          }
      });
  });
});
