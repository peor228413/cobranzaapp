const server = require("./src/server");
const db = require("./src/lib/db");

const port = 3010;

db.connect()
.then(()=>{
  console.log("DB connected");
  server.listen(port, ()=>{
    console.log(`Server is running port ${port}`);
  });
})
.catch((error)=>{
    console.error(`DB connection error ${error}`);
    process.exit(1);
})
