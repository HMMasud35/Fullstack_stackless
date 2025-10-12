const { default: mongoose } = require("mongoose");

const dbConnection = ()=> {
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@backend.yixfp9g.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority&appName=backend`).then(()=> {
    console.log(`database connection successfull`);
  }).catch((err)=>{
    console.log(err.message || "database connection faild");
  })
}

module.exports = dbConnection