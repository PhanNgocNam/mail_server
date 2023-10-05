const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(
  cors({
    origin: "*",
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // use SSL - TLS
  auth: {
    user: "voduytao3@gmail.com",
    pass: "dcrgjxavvolnhdfi",
  },
});

app.post("/message", async (req, res) => {
  const { name, mail } = req.query;
  const { message } = req.body;
  try {
    const info = await transporter.sendMail({
      from: mail, // sender address
      to: "realcm471@gmail.com, mailforwork0101@gmail.com", // list of receivers
      subject: `Hello From Portfolio!, ${mail} ,name: ${name}`, // Subject line
      text: "Hello world?", // plain text body
      html: `<p>${message}</p>`, // html body
    });
    if (!info.messageId) return res.send("nope!");
    res.send({ code: 200, msg: "success!" });
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(8080, () => console.log("Server is running on port 8080..."));
