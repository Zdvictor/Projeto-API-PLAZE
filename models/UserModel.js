const knex = require("../database/database")
const bcrypt = require("bcrypt")



class UserModel {

    async findAll() {

        try {

           var users = await knex.select("*").from("users")
           return users



        }catch(err) {

            console.log(err)
            return undefined


        }
    }

    async findById(id) {

        try {

        var user = await knex.select('*').where({id}).table('users')

        if(user.length > 0) {

            return user

        }else {


            return undefined

        }


        }catch(err) {

            console.log(err)
            return false

        }


    }

    async findByEmail(email) {

        try {

            var user = await knex.select('*').where({email}).table('users')

            if(user.length > 0) {

                return true

            }else {

                return false

            }


        }catch(err) {

            console.log(err)
            return undefined

        }


    }

    async userRegister(user,email,password,data,cdg) {

        try {

            var hash = await bcrypt.hash(password, 10)

            await knex.insert({user,email,password: hash,data,cdgafiliado: cdg}).into('users')

            return true


        }catch(err) {

            console.log(err)
            return false


        }

    }

    async userLogin(email,password) {

        try {


            var user = await knex.select("*").where({email}).table("users")

            if(user.length > 0) {
               
                var correct = await bcrypt.compare(password,user[0].password)
                
                if(correct) {

                    return {status: true, ok: "Login Realizado com Sucesso", data: user}

                }else {

                    return {status: false, err: "A Senha esta Incorreta Verifique Novamente"}

                }
                
            }else {

                return {status: false, err: "O Email Nao Existe Verifique Novamente" }

            }


        }catch(err) {

            console.log(err)
            return false

        }


    }


};


module.exports = new UserModel()
