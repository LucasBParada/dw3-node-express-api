import gameService from "../Services/gameService.js";
import { ObjectId } from "mongodb";
 
//Função para LISTAR jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    //Cod. 200 (OK) - Requisição feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error in server" });
  }
};
 
// Função para CADASTRAR jogos
const createGame = async (req, res) => {
  try {
    const { title, year, price, descriptions} = req.body;
    await gameService.Create(title, year,price,descriptions);
    res.sendStatus(201) // Cód. 201 (Created) : Recurso criado
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: "Internal error in server" });
  }
};

//Função para DELETAR jogos
const deleteGame = async(req,res) => {
  try{
    if (ObjectId.isValid(req.params.id)){
    const id = req.params.id
    gameService.Delete(id)
    res.sendStatus(204) //Código 204 (NO CONTENT) - Bem sucedido mas sem conteúdo para retornar
    }else{
      res.status(400).json({error:'A ID enviada é inválida'})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({error:'Erro interno do servidor.'})
    //res.status(500) - Envia somente status
  }
}

//Função para ALTERAR jogos
const updateGame = async(req,res) => {
  try{
    if (ObjectId.isValid(req.params.id)){
      const id = req.params.id
      const{title,year,price,descriptions} = req.body
      const game = await gameService.Update(id,title,year,price,descriptions)
      res.status(200).json({game}) //Ok
    }else{
      res.sendStatus(400) //Bad request
    }
  }catch(error){
    console.log(error)
    res.status(500).json({error: "Erro interno do servidor"})
  }
}
 
// Função para buscar um único jogo
const getOneGame = async (req,res) => {
  try{
    if(ObjectId.isValid(req.params.id)){
      const id = req.params.id
      const game = await gameService.getOne(id)
      if(!game){
        res.status(404).json({error: 'O jogo não foi encontrado'})
      }else{
        res.status(200).json({game})
      }
    }else{
      res.status(400).json({error:'A ID enviada é inválida'})
    }
  }catch(error){
    console.log(error)
    res.sendStatus(500)
  }
}

export default { getAllgames, createGame, deleteGame, updateGame, getOneGame};
