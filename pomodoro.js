$(document).ready(function() {
  //Makes bootstrap tooltip work
  $('[data-toggle="tooltip"]').tooltip();
  var breakLength = 5;
  var minutes = 25;
  var seconds = 59;
  //Tracks whether this is the first time you're clicking play/pause
  var first = true;
  //Tracked whether countdown is active or paused
  var paused = true;
  //Tracks whether you're working on on a break
  var working = true;
  var countd;
  var sound = document.getElementById("alarm");
  
  $("#play-pause").click(function() {
    //If this is the first time you're clicking play, start countdown from session length
    if (first) {
      paused = false;
      workCountdown();
      first = false;
    }
    //If you hit play/pause while counting down, pause countdown
    else {
    if (!paused) {
    paused = true;
    }
      //If already paused, hitting play/pause makes it go again
    else {
      paused = false;
    }
    }
  })
  //Decrease break length, can not go lower than 1 minute
  $("#break-less").click(function() {
    
    if (breakLength > 1) {
      breakLength--;
      $("#break-length").html(breakLength);
      }
  });
  
  //Increase break length
  $("#break-more").click(function() {
      breakLength++;
      $("#break-length").html(breakLength);
      
  });
  
  //Decrease work session length, can not go lower than 1 minute
  $("#session-less").click(function() {
    
    if (minutes > 1) {
      minutes--;
      $("#session-length").html(minutes);
      numberDisplay(minutes, "minutes");
      }
  });
  
  //Increase work session length
  $("#session-more").click(function() {
      minutes++;
      $("#session-length").html(minutes);
      numberDisplay(minutes, "minutes");
  });
  
  //Resets to starting status
  $("#reset").click(function() {
    first = true;
    paused = true;
    clearInterval(countd);
    minutes = 25;
    seconds = 0;
    breakLength = 5;
    $("#break-or-work").css("visibility", "hidden");
    $("#session-length").html(minutes);
    $("#break-length").html(breakLength);
    numberDisplay(minutes, "minutes");
    numberDisplay(seconds, "seconds");
  })
  
  //Work session length function
    function workCountdown() {
      sound.play();
      //We're working, here!
      working = true;
      seconds = 59;
      //Start at 1 second less than session length
      countdown(minutes-1, seconds);
      //Change to working background
      $("#main").css("background", "#94D838");
      //Display Work time!
      $("#break-or-work").html("<h3>Work Time!</h3");
      $("#break-or-work").css("visibility", "visible");
        
      }
      
  //General countdown function, used for both work and break time
  function countdown(min, sec){
    
    numberDisplay(sec, "seconds");
    numberDisplay(min, "minutes");
    //If we still haven't gotten to zero minutes and zero seconds...
    if (min >= 0) {
    countd = setInterval(function() {
      //and if we aren't paused, do this every 1 second.
      if (!paused) {
      if (sec > 0) {
        //If seconds is over 0, display them
        numberDisplay(sec, "seconds");
        sec--;
        }
        //If seconds are at 0, display where we're at and then decrease min and sec
      else if (sec == 0) {
        numberDisplay(sec, "seconds");
        numberDisplay(min, "minutes");
        min--;
        sec--;
        }
         //When seconds dip below 0, set them back at 59, stop the countdown, and start it over again w/ new minute value
        else if (sec < 0) {
          sec = 59;
          clearInterval(countd);
          countdown(min, sec);       
          }
      }
      }, 1000);
    }
    //Once we've counted down to 0, we start counting down break length
    else {
    if (working == true) {
      working = false;
      breakCountdown();
    }
      //If we've just finished counting down the break, we start over with working session again
    else {
      working = true;
      workCountdown();
    }
    
    }
  }
    
  
  
  function breakCountdown() {
    //We're on break now!
    working = false;
    //Play bell
    sound.play();
    //Switch to break background
    $("#main").css("background", "#A167A5");
    $("#break-or-work").html("<h3>Break Time!</h3");
    numberDisplay(breakLength, "minutes");
    numberDisplay("0", "seconds");
    var breakMin = breakLength-1;
    var breakSec = 59;
    //Countdown using break length
    countdown(breakMin, breakSec);
  }
  
  //Displays numbers in standardized way
  function numberDisplay(num, numType) {
    //Displays minutes in minutes span
    if (numType == "minutes") {
      //Double digit displayed as is
    if (num >= 10) {
      $("#minutes").html(num);
    }
    else {
      //Single digit gets a 0 in front of it
      $("#minutes").html("0" + num);
    }
    }
    //Same but for seconds
    else if (numType == "seconds") {
    if (num >= 10) {
      $("#seconds").html(num);
    }
    else {
      $("#seconds").html("0" + num);
    }
    }
  }
})