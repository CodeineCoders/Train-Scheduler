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
//moment.js
    var currentTime = moment();

    //grabbing database from firebase

    database.ref().on("child_added", function (snapshot) {

        var train = snapshot.val().train;
        var trainDestination = snapshot.val().trainDestination;
        var trainTime = snapshot.val().trainTime;
        var trainFrequency = snapshot.val().trainFrequency;

        var arrival = snapshot.val().arrival;

        // adding input to tbody
        $("tbody").append("<tr><td>" + train + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td><td>" + arrival + "</td></tr>");



    });

    // submit button and adding new train
    $("button").click(function () {

        var trainName = $("#inputTrainName").val().trim();
        var destination = $("#inputDestination").val().trim();
        var time = $("#inputTime").val().trim();
        var frequency = $("#inputFrequency").val().trim();
        //moment.js
        var firstTrainConverted = moment(time, "hh:mm").subtract("1, years");
        var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
        var remainder = difference % frequency;
        var minUntilTrain = frequency - remainder;
        var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");


        var addedTrain = {
            train: trainName,
            trainDestination: destination,
            trainTime: time,
            trainFrequency: frequency,
            arrival: nextTrain
        }
        // reseting the database with empty .val("");
        database.ref().push(addedTrain);

        $("#inputTrainName").val("");
        $("#inputDestination").val("");
        $("#inputTime").val("");
        $("#inputFrequency").val("");

    });




});