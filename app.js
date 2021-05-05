var express = require('express');


var ticketRouter = require('./routes/tickets');


var app = express();
app.use(express.json());

app.use('/ticket',ticketRouter);

let port = process.env.PORT;
if(port == null|| port == ""){
    port = 3000;
}

app.listen(port, () => console.log(`Example app list on port ${port}`))


module.exports = app;

