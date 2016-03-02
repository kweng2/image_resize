$(document).ready(function() {

/*  TODO:
*
*   1.  When the user clicks and drags on either of the resize targets,
*       the crop area should resize in an intuitive way.
*   
*   2.  When the user clicks and drags on the crop area but not on the
*       resize targets, the crop area should move in an intuitive way.
*   
*   3.  When the user clicks on the Crop! button, display a browser alert
*       that indicates the boundaries of the crop area, relative to the
*       container div (don't worry about the native size of the image).
*
*   4.  You don't need to handle touch events.
*
*   5.  You don't need to do anything more style-wise, we are only
*       interested in the functionality for this task.
*
*   6.  You don't need to actually crop the image. Just alerting
*       the boundaries of the crop area is sufficient.
*/

// Initalize variable for mouse dragging
var $mouseDown = false;
var $dragCropArea = false;

// Detect mouse down on either resize target
$('.resize').on('mousedown', function() {
  $mouseDown = true;
});

$('.resize').on('mouseup', function() {
  $mouseDown = false;
});

$('.ne').on('mousemove', function(event) {
  if($mouseDown) {
    var width = event.pageX - $('.sw').offset().left - 20;
    $('.croparea').width(width);

    var height = $('.sw').offset().top + 20 - event.pageY;
    $('.croparea').height(height);
    $('.croparea').css('margin-top', (event.pageY - 28));
  }
});

$('.sw').on('mousemove', function(event) {
  if($mouseDown) {
    var width = $('.ne').offset().left + 20 - event.pageX;
    $('.croparea').width(width);
    $('.croparea').css('margin-left', event.pageX - 36);

    var height = event.pageY - $('.ne').offset().top - 20;
    $('.croparea').height(height);
  }
});

$('.croparea').on('mousedown', function() {
  $dragCropArea = true;
});
$('.croparea').on('mouseup', function() {
  $dragCropArea = false;
});

$('.croparea').on('mousemove', function(event) {
  if($dragCropArea && !$mouseDown) {

    var marginLeft = Number($('.croparea').css('margin-left').slice(0, -2)) + event.originalEvent.movementX;
    $('.croparea').css('margin-left', marginLeft);

    var marginTop = Number($('.croparea').css('margin-top').slice(0, -2)) + event.originalEvent.movementY;
    $('.croparea').css('margin-top', marginTop);    
  }
});

$('.docrop').click(function() {
  var width = $('.ne').offset().left - $('.sw').offset().left;
  var height = $('.sw').offset().top - $('.ne').offset().top;
  alert('Cropping to width: ' +  width + 'px, ' + 'and height: ' + height + 'px');
});

});