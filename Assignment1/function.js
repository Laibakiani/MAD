export function getAvailableProducts(products) {
    return products.filter(product => product.inStock);
}

export function findProduct(products, id) {
    return products.find(product => product.id === id);
}

export function getProductNames(products) {
    return products.map(product => product.name);
}