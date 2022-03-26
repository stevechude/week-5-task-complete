let products = require('../lib/products.json')
const { writeDataToFile } = require('../server/utils')

function findAll() {
    return new Promise((res, rej) => {
        res(products)
    })
}


function findWithId(id) {
    return new Promise((res, rej) => {
        const product = products.find((p) => p.id == id)
        res(product)
    })
}


function create(product) {
    return new Promise((resolve, rej) => {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
        })

        const newProduct = { id: uuid, ...product }
        products.push(newProduct)
        writeDataToFile('./lib/products.json', products)
        resolve(newProduct)
    })
}

function update(id, product) {
    //console.log(product)
       return new Promise((res, rej) => {
       const index = products.findIndex((p) => p.id == id)
       products[index] = {id, ...product}   

       writeDataToFile('./lib/products.json', products)
       res(products[index])
   })
}

function remove(id) {
    //console.log(product)
       return new Promise((res, rej) => {
       products = products.filter((p) => p.id != id)

       writeDataToFile('./lib/products.json', products)
       res()
   })
}

module.exports = {
    findAll,
    findWithId,
    create,
    update,
    remove
}