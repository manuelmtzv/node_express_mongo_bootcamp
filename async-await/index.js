const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file :zipper_mouth_face:");

      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("success");
    });
  });
};

const getDocPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);

    const resOne = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const resTwo = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const resThree = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([resOne, resTwo, resThree]);

    const imgs = all.map((el) => el.body.message);

    await writeFilePromise("dog-img.txt", imgs.join("\n"));
  } catch (err) {
    throw err;
  }

  return "2. Ready";
};

(async () => {
  try {
    console.log("1. Will get dog pics");
    console.log(await getDocPic());
    console.log("3. Done getting dog pics!");
  } catch (err) {
    console.log(err);
  }
})();

// console.log("Step-1. Will get dog pics");

// getDocPic().then((data) => {
//   console.log(data);
//   console.log("Step-3. Done getting dogs pics");
// });

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     const { message: url } = res.body;

//     return writeFilePromise("dog-img.txt", url);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
