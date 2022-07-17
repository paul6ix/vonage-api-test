//Setting API credentials

const apiKey = "47533381";
const sessionId = "1_MX40NzUzMzM4MX5-MTY1NzAzMDA4ODEzNn5WTEpBMkVrN1dvdFdJQktqTTk2RkJkN3F-fg";
const token = "T1==cGFydG5lcl9pZD00NzUzMzM4MSZzaWc9ZTc4ODBjZTQzYmIwZTliMTQxNjY0NGMwZDhlYTYzYTUzZGI2YjVkYzpzZXNzaW9uX2lkPTFfTVg0ME56VXpNek00TVg1LU1UWTFOekF6TURBNE9ERXpObjVXVEVwQk1rVnJOMWR2ZEZkSlFrdHFUVGsyUmtKa04zRi1mZyZjcmVhdGVfdGltZT0xNjU3MDMwMTQyJm5vbmNlPTAuOTQ0NDIwMjI1NDE0NjM0MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjU5NjIyMTQxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

function initializeSession() {
    let session = OT.initSession(apiKey, sessionId);
    //Subscriber options
    let subscriberOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        name: 'Guest',
        subscribeToAudio: true,
        subscribeToVideo: true,
        style: {buttonDisplayMode: 'on'}
    }


    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
        let subscriber = session.subscribe(event.stream, 'subscriber', subscriberOptions
            , handleError);
        //Adding toggle button  for video
        document.getElementById("vidBtn").addEventListener("click", function () {
            if (subscriberOptions.subscribeToVideo === true) {
                subscriber.subscribeToVideo(false)
                subscriberOptions.subscribeToVideo = false
                document.getElementById('videoBtn').innerHTML = "Video On"
            } else {
                subscriber.subscribeToVideo(true)
                subscriberOptions.subscribeToVideo = true
                document.getElementById('videoBtn').innerHTML = "Video Off"
            }

        });
        //Adding toggle button  for audio
        document.getElementById("audBtn").addEventListener("click", function () {
            if (subscriberOptions.subscribeToAudio === true) {
                subscriber.subscribeToAudio(false)
                subscriberOptions.subscribeToAudio = false
                document.getElementById('audBtn').innerHTML = "Audio On"
            } else {
                subscriber.subscribeToAudio(true)
                subscriberOptions.subscribeToAudio = true
                document.getElementById('audBtn').innerHTML = "Audio Off"
            }

        });
    });

    //Publisher options
    let publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        name: 'Paul Okpor',
        publishVideo: true,
        publishAudio: true,
        style: {buttonDisplayMode: 'on'}

    }
    //Adding toggle button  for video
    document.getElementById("videoBtn").addEventListener("click", function () {
        if (publisherOptions.publishVideo === true) {
            publisher.publishVideo(false)
            publisherOptions.publishVideo = false
            document.getElementById('videoBtn').innerHTML = "Video On"
            console.log("Video off")
        } else {
            publisher.publishVideo(true)
            publisherOptions.publishVideo = true
            console.log("video on")
            document.getElementById('videoBtn').innerHTML = "Video Off"
        }

    });
    //Adding toggle button  for audio
    document.getElementById("audioBtn").addEventListener("click", function () {
        if (publisherOptions.publishAudio === true) {
            publisher.publishAudio(false)
            publisherOptions.publishAudio = false
            document.getElementById('audioBtn').innerHTML = "Audio On"
            console.log("audio off")
        } else {
            publisher.publishAudio(true)
            publisherOptions.publishAudio = true
            console.log("video on")
            document.getElementById('audioBtn').innerHTML = "Audio Off"
        }

    });

    // Create a publisher
    let publisher = OT.initPublisher('publisher', publisherOptions
        , handleError);


    // Connect to the session
    session.connect(token, function (error) {
        console.log("Connected successfully")
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}


initializeSession();