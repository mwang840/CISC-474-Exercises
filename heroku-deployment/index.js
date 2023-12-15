const http = require("http");
const port = 8080;
const admin = require("firebase-admin");
//Path update, rules fixed


const server = http.createServer(function (req, res){
    res.write("Hello World");
    res.end();
})

var serviceAccount = require("/etc/secrets/firebase.json");
const { getDatabase } = require("firebase-admin/database");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://deployment-test-f060d-default-rtdb.firebaseio.com"
});


const db = getDatabase();
const ref = db.ref('server/saving-data');

const usersRef = ref.child("users");

usersRef.set({
    alaituring: {
        dob: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehopper: {
        dob: "December 9, 1906",
        full_name: "Grace Hopper"
    }
});

server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error);
        }
        // Else sent message of listening
        else {
        console.log('Server is listening on port ' + port);
        }
})
        


