const fs = require("fs");

// ? Files

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (!err) {
    textIn = data;

    console.log(textIn);
  }
});

console.log("Reading file...");
