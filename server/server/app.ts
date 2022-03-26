import http, { IncomingMessage, Server, ServerResponse } from "http";
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')



const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if(req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  } else if(req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } else if(req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)
  } else if(req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)
  } else if(req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3]
    deleteProduct(req, res, id)
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route Not Found' }))
  }
  });

server.listen(3000, () => console.log('server running on port 3000...'));
