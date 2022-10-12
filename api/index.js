require("dotenv").config();
const express = require("express");
const { createServer } = require("http");

const { connect, disconnect } = require("mongoose");
const createLogger = require("./utils/createLogger");
const logger = createLogger(module);
const cors = require("cors");
const { name, version } = require("./package.json");

const {
  env: { MONGO_URL, PORT },
} = process;

const api = express();
const server = createServer(api);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connect(MONGO_URL)
  .then(() => {
    console.log(`DB connected on ${MONGO_URL}`);
  })
  .then(() => {
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("T1", (data) => {
        console.log("T1 server");
        console.log(data);
        // createHost(data);
        const host = data.host.host;
        socket.join(host);
        console.log("Teacher joined room:");
        console.log(host);
        // socket.broadcast.emit("T1.5", data);
      });

      socket.on("T2", (data) => {
        console.log("T2 server");
        console.log(data);

        // const host = data.host.host;
        socket.broadcast.emit("T2.5", data);
      });

      socket.on("T3", (data) => {
        console.log("T3 server");
        console.log(data);
        debugger;
        const host = data.host;
        // socket.broadcast.emit("T3.5", data);
        console.log("Sent question to:");
        console.log(`${host}_room`);

        socket.to(`${host}_room`).emit("T3.5", data);
      });

      socket.on("T4", (data) => {
        console.log("T4 server");
        console.log(data);

        const host = data.host.host;
        socket.to(`${host}_room`).emit("T4.5", data);
      });

      socket.on("T5", (data) => {
        console.log("T5 server");
        console.log(data);
        const feedbackRecipient = data.socketId;
        // const host = data.host.host;
        // socket.to(`${host}_room`).emit("T5.5", data);
        io.to(feedbackRecipient).emit("T5.5", data);
      });

      socket.on("T6", (data) => {
        console.log("T6 server");
        console.log(data);

        const host = data.host.host;
        socket.to(`${host}_room`).emit("T6.5", data);
      });

      socket.on("Tclose", (data) => {
        console.log("Tclose server");
        console.log(data);

        const host = data.hostTemp;
        console.log(host);
        socket.to(`${host}_room`).emit("Tclose.5", data);
      });

      socket.on("S1", (data) => {
        console.log("S1 server");
        console.log(data);
        // createHostStudent(data);
        const host = data.host.host;
        socket.join(`${host}_room`);
        console.log("Student joined room");
        console.log(`${host}_room`);
        // socket.broadcast.emit("S1.5", data);
        socket.to(host).emit("S1.5", data);
      });

      socket.on("S4", (data) => {
        console.log("S4 server");
        console.log(data);

        const host = data.host;
        // socket.broadcast.emit("S4.5", data);
        console.log("host:");
        console.log(host);
        socket.to(host).emit("S4.5", data);
      });
    });
  })
  .then(() => {
    logger.info("db connected");

    const {
      usersRouter,
      // questionsRouter,
      gameCodesRouter,
      questionsRouter,
    } = require("./routes");

    api.use(cors());

    /*api.use((_, res, next) => {
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Origin", "*");

      next();
    })*/ api.get("/", (req, res) => res.send(`${name} v${version} ;)`));

    api.use(
      "/api",
      usersRouter,
      // questionsRouter,
      gameCodesRouter,
      questionsRouter
    );

    server.listen(PORT, () => console.log(`API running on port ${PORT}`));

    // server.listen(3001, () => {
    //   console.log("server is running");
    // });

    process.on("SIGINT", () => {
      if (!process.stopped) {
        process.stopped = true;

        logger.info("\napi stopped");

        disconnect().then(() => {
          logger.info("db disconnected");

          process.exit(0);
        });
      }
    });
  })
  .catch((error) => {
    logger.error(error);
  });
