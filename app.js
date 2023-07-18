/*$(document).ready(function() {
  console.log('in function');
  console.info('test1');
  $('#user-form').on('submit', function(e) {
      e.preventDefault();

      let email = $('#email').val();
      console.log()
      $.ajax({
          url: '/getUser',
          type: 'POST',
          data: {
              email: email
          },
          success: function(data) {
              //console.log('success');
              //console.info('test');
              $('#result').html(`Full name: ${data.UserFname} ${data.UserLname}`);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("jqXHR: ", jqXHR);
            console.log("textStatus: ", textStatus);
            console.log("errorThrown: ", errorThrown);
         }
          //error: function(error) {
          //    console.log('Error:', error);
          //}
      });
  });
});
*/

$(document).ready(function() {
    console.log('in function');
    console.info('test1');
    $('#user-form').on('submit', function(e) {
        e.preventDefault();
  
        let email = $('#email').val();
        console.log();
        $.ajax({
            url: `leadership-internship2.azurewebsites.net/getUser?email=${encodeURIComponent(email)}`,
            type: 'GET',
            success: function(data) {
                //console.log('success');
                //console.info('test');
                $('#result').html(`Full name: ${data.UserFname} ${data.UserLname}`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("jqXHR: ", jqXHR);
              console.log("textStatus: ", textStatus);
              console.log("errorThrown: ", errorThrown);
           }
            //error: function(error) {
            //    console.log('Error:', error);
            //}
        });
    });
  });
  