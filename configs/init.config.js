const mongoose =  require('bluebird').promisifyAll(require('mongoose'));

const URI = "mongodb+srv://test:test@cluster0.z0wnm.mongodb.net/test";

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