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

    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });


    // Create a publisher
    let publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        name: 'Paul Okpor',
        style : {buttonDisplayMode: 'on'}
    }, handleError);

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