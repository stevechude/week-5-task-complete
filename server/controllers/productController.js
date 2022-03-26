const Product = require('../models/productModel')

// here we get all products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}


// here we get a single products
// @route GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findWithId(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product not found.' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// here we create a product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            // console.log(body)
            const {
                organization,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
            } = JSON.parse(body);

            const product = {
                organization: organization,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                products: products,
                marketValue: marketValue,
                address: address,
                ceo: ceo,
                country: country,
                noOfEmployees: noOfEmployees,
                employees: employees,
            }
            const newProduct = await Product.create(product)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(newProduct), null, 3);
        })
    } catch (error) {
        console.log(error)
    }
}

// here we Update a product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const findProduct = await Product.findWithId(id)
        if (!findProduct) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product not found.' }))
        } else {
            let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            // console.log(body)
            const {
                organization,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
            } = JSON.parse(body);

            const productData = {
                organization: organization || findProduct.organization,
                createdAt: findProduct.createdAt,
                updatedAt: new Date().toISOString(),
                products: products || findProduct.products,
                marketValue: marketValue || findProduct.products,
                address: address || findProduct.address,
                ceo: ceo || findProduct.address,
                country: country || findProduct.country,
                noOfEmployees: noOfEmployees || findProduct.noOfEmployees,
                employees: employees || findProduct.employees,
            }
            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updProduct), null, 2);
        })
        }

    } catch (error) {
        console.log(error)
    }
}

// here we Delete a product
// @route DELETE /api/products
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findWithId(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product not found.' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed.` }))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}