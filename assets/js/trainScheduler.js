$(document).ready( function() {

    var trainName;
    var destination;
    var time;
    var frequency;


    $("button").click(function() {

    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    time = $("#inputTime").val().trim();
    frequency = $("#inputFrequency").val().trim();


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwUgolHJtNB8h7yLC9Z8uCllmMQmMjuAA",
    authDomain: "train-scheduler-743f3.firebaseapp.com",
    databaseURL: "https://train-scheduler-743f3.firebaseio.com",
    projectId: "train-scheduler-743f3",
    storageBucket: "train-scheduler-743f3.appspot.com",
    messagingSenderId: "373305274421"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  event.preventDefault();

  database.ref().push({
      train: trainName,
      trainDestination: destination,
      trainTime: time,
      trainFrequency: frequency

  })

  database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());
      console.log(snapshot.val().train);
      console.log(snapshot.val().trainDestination);
      console.log(snapshot.val().trainTime);
      console.log(snapshot.val().trainFrequency);
      
  });


});


    



});