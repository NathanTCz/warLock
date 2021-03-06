/*
 * This is the main engine for all static elements.
 * This is where all of the handlers are added to elements
 * that are not loaded dynamically with AJAX, but rather
 * always part of the page. eg. the search bar. This script
 * also serves generic objects such as access point entry.
*/


/* Search Bar */
$(document).on('keyup', '#name_box', function(){
  var q = $(this).val();

  $.ajax({
    url: 'ajax/php/search.php?q='+q,
    success: function(data) {
      $('#contents').html(data);
      $('#name_box').val(q);
      ajax_callstack.push(this);
    }
  });
});

/* Upload File Button */
$(document).on('click', '#up_csv', function(){
  $.ajax({
    url: 'ajax/php/upload.php',
    success: function(data) {
      $('#contents').html(data);
      ajax_callstack.push(this);
    }
  });
});

/* Create Lock Files Button

 * This use of the button is deprecated as of v1.1.3
 * see comments in ajax/php/create_doors.php

$(document).on('click', '#cr_doors', function(){
  $.ajax({
    url: 'ajax/php/create_doors.php',
    success: function(data) {
      $('#contents').html(data);
    }
  });
});*/

/* Create Lock Files Button */
$(document).on('click', '#sync', function(){
  var sendData = {
    go: 'go',
  };

  $.ajax({
    url: 'ajax/php/create_doors.php',
    type: 'POST',
    data: sendData,
    success: function(data) {
      $('#contents').html(data);
      ajax_callstack.push(this);
    }
  });
});



/* Logout button */
$(document).on('click', '#logout', function(){
  $.ajax({
    url: 'includes/login.php?logout=yes',
    success: function(data) {
      $('html').html(data);
    }
  });
});

/* Validate group/access point entry */
$(document).on('keyup', '#points', function(){
  var sendData = {
    q: $(this).val(),
  };

  $.ajax({
    url: 'ajax/php/check_points.php',
    type: 'POST',
    data: sendData,
    success: function(data) {
      $('#point_errors').html(data);
    }
  });
});


/* Back button */
$(document).on('click', '#back', function(){
  if (ajax_callstack.length > 1) {
    ajax_callstack.pop();
    $.ajax( ajax_callstack.pop() );
  }
});


// this is for the back button
var ajax_callstack = [];