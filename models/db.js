var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
}

mongoose.connect('mongodb+srv://enairo:enairo@cluster0-pte8o.mongodb.net/newsroom',
    options,
    function (error) {
        if (error) {
            console.log('je suis le probleme !!!', err);
        } else {
            console.log("**** PERFECT CONNECT ****");
        }
    });


module.exports = mongoose;
