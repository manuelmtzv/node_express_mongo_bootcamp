const http = require('http')
const fs = require('fs')
const url = require('url')

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataArray = JSON.parse(data)

function replaceTemplate(template, element) {
  let output = template.replace(/{%PRODUCTNAME%}/g, element.productName)
  output = output.replace(/{%IMAGE%}/g, element.image)
  output = output.replace(/{%PRICE%}/g, element.price)
  output = output.replace(/{%FROM%}/g, element.from)
  output = output.replace(/{%NUTRIENTS%}/g, element.nutrients)
  output = output.replace(/{%QUANTITY%}/g, element.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, element.description)
  output = output.replace(/{%ID%}/g, element.id)

  if (!element.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }

  return output
}

// ? Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  switch (pathname) {
    case '/': // ? Root
      res.writeHead(302, { Location: 'http://localhost:2000/overview' })
      res.end()
      break
    case '/overview': // ? Overview
      res.writeHead(200, { 'Content-Type': 'text/html' })

      const cardsHtml = dataArray
        .map((product) => {
          return replaceTemplate(templateCard, product)
        })
        .join('')

      res.end(templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml))
      break
    case '/product':
      res.writeHead(200, { 'Content-Type': 'text/html' })

      const product = replaceTemplate(templateProduct, dataArray[query.id])

      res.end(product)
      break
    case '/api':
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(data)
      break
    default:
      res.statusCode = 404
      res.end('Page not found!')
      break
  }
})

server.listen(2000, 'localhost', () => {
  console.log('Listening to requests on port 2000.')
})
