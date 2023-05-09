const Global = {
    url: 'http://127.0.0.1:8000/api/',
    token: 'token',
    order_status: {
        'pending': 'PENDING',
        'delivered': 'DELIVERED'
    }
}

// Metodo para exportar solo una variable por defecto
// export default Global

// Metodo para exportar mas de una variable si la hubiera
export { Global /*, Otro*/ }
