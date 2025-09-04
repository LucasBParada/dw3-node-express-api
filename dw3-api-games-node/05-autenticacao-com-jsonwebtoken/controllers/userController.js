import userService from "../Services/userService.js"

const createUser = async (req,res) => {
    try{
        const{name,email,password} = req.body
        await userService.Create(name, email, password)
        res.status(201).json({success: 'Usuario cadastrado com sucesso'})
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

//Função para realizar o LOGIN
const loginUser = async(req,res) => {
    try{
        const{email, password} = req.body
        const user = await userService.getOne(email)
        if(user != undefined){
            res.status(200).json({success:"Login efetuado com sucesso"})
        }else{
            res.status(400).json({error:"Usuário não encontrado!"})
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}







export default {createUser, loginUser}