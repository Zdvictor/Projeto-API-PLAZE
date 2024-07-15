const UserModel = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const salt = require("../jwt/salt")

class User {
    

    async findUsers(req,res) {

        var users = await UserModel.findAll()

        if(users != undefined) {

            res.status(200)
            res.json({users})

        }else {

            res.status(404)
            

        }
    }

    
    async findId(req,res) {

        var id = req.params.id

        var user = await UserModel.findById(id)

        if(user != undefined) {

            res.status(200)
            res.json(user)

        }else {

            res.status(404)
            res.json({err: "Nenhum Usuario Encontrado"})


        }


    }

    async findEmail(req,res) {

        var email = req.body.email

        var result = await UserModel.findByEmail(email)

        if(email) {

            res.status(400)
            res.json({err: "Email Cadastrado Ja Existe"})

        }else {

            res.status(200)
            res.json({status: "Email Ainda Nao Existe"})


        }


    }

    async create(req,res) {

        var user = req.body.email.split("@")[0]
        var email = req.body.email
        var password = req.body.password
        var data = req.body.data
        var cdg = req.body.cdg

        var emailExist = await UserModel.findByEmail(email)

        if(emailExist) {

            res.status(400)
            res.json({err: "O Email Ja Existe No Banco de Dados"})
            return

        }
        

        var result = await UserModel.userRegister(user,email,password,data,cdg)

        if(result) {

            res.status(200)
            res.json({status: "Cadastrado com Sucesso"})


        }else {

            res.status(404)
            res.json({status: "Erro Verifique os Dados"})

        }


    }


    async login(req,res) {

        var email = req.body.email
        var password = req.body.password

        var result = await UserModel.userLogin(email,password)


        if(result.status){

            console.log(salt)
            var token = jwt.sign({data: result.data}, salt)
            res.status(200)
            res.json({token: token})

        }else {

            res.status(404)
            res.json({err: result.err})


        }
    }


    async verify(req,res) {

        var token = req.headers['authorization'].split(' ')[1]
       
        var dados = jwt.verify(token,salt, (err, decoded) => {

            if(err) {

                res.status(404)
                res.json({err: "Token Invalido"})

            }else {

                res.status(200)
                res.json(decoded)

            }


        })


    }

    

};


module.exports = new User()