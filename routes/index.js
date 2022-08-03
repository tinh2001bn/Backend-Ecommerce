
const userRoutes = require('./User');
const productRoutes = require('./Product')
const cartRoutes = require('./Cart');
const orderRoutes = require('./Order')
function route(app){
    app.use('/api', userRoutes);
    app.use('/product',productRoutes)
    app.use('/cart',cartRoutes)
    app.use('/order',orderRoutes)
}        
 module.exports =route;