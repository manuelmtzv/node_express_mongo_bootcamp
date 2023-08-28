const fs = require('fs')
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  const breed = data

  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((res) => {
      const { message: url } = res.body

      fs.writeFile('dog-img.txt', url, (err) => {
        if (err) return console.log(err)

        console.log('Random dog image save to file')
      })
    })
    .catch((err) => console.log(err.message))
})
