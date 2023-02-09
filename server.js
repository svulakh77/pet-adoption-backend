const express = require("express");
const dbConnection = require('./knex/knex');
const app = express();
app.use(express.static('images'))




const PORT = process.env.PORT || 8080;
const petRouter = require("./routes/petsroute.js");
const userRouter = require("./routes/usersroute.js");
const savesRouter = require("./routes/savesroute.js")
const cors = require("cors");
const cookieParser = require('cookie-parser')
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json())
app.use(cookieParser());
app.use("/pets", petRouter);
app.use("/saves",savesRouter)
app.use("/users", userRouter);


dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log('Connected to DB', migration);
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
});
