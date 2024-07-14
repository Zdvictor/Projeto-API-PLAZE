class Home {


        async index(req,res) {
            
            res.status(200)
            res.send('Oi')


        }



} 


module.exports = new Home()