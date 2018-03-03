$(document).ready(() => {
  if ($('#signup-family-error').length) {
    $('#signup-family-modal').modal('toggle');
  } else if ($('#signup-professional-error').length) {
    $('#signup-professional-modal').modal('toggle');
  } else if ($('#signin-error').length) {
    $('#signin-modal').modal('toggle');
  }
  login = () => {
    event.preventDefault();
    if ($('#sign-role').val() === 'default') {
      $('<div  id="signin-error" class="alert alert-danger" role="alert"> Select a user type</div>')
        .insertAfter($('#form-container-sign-in .form-group').last());
    } else if ($('#sign-role').val() === 'family') {
      $('#form-container-sign-in').ajaxSubmit({ url: '/login/family', type: 'post' });
    } else if ($('#sign-role').val() === 'professional') {
      console.log('ajax professional');
    }
  };
  $('#singin-button').on('click', () => {
    this.login();
  });
});
