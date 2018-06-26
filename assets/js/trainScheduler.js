$(document).ready(function () {
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

    //grabbing database from firebase

    database.ref().on("child_added", function (snapshot) {

        var train = snapshot.val().train;
        var trainDestination = snapshot.val().trainDestination;
        var trainTime = snapshot.val().trainTime;
        var trainFrequency = snapshot.val().trainFrequency
        // adding input to tbody
        $("tbody").append("<tr><td>" + train + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td></tr>");



    });
    // submit button and adding new train
    $("button").click(function () {

        var trainName = $("#inputTrainName").val().trim();
        var destination = $("#inputDestination").val().trim();
        var time = $("#inputTime").val().trim();
        var frequency = $("#inputFrequency").val().trim();

        var addedTrain = {
            train: trainName,
            trainDestination: destination,
            trainTime: time,
            trainFrequency: frequency
        }
        // reseting the database with empty .val("");
        database.ref().push(addedTrain);

        $("#inputTrainName").val("");
        $("#inputDestination").val("");
        $("#inputTime").val("");
        $("#inputFrequency").val("");

    });




});