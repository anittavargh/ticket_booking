const mongoose =  require('bluebird').promisifyAll(require('mongoose'));

const URI = "mongodb+srv://scratchNwin:abcd1234@cluster0.ut6x8.mongodb.net/test";

(async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    if(mongoose.connection.readyState ==1) console.log("mongodb connected");
})().catch(err => {
    console.error(err);
});

module.exports = mongoose;