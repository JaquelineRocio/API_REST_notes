import { User } from "../models/User.js";
import {generateToken}  from "../utils/tokenManager.js";


export const register =  async (req, res)=>{
  
    const {email, password} = req.body;
  
    try {
        let user = await User.findOne({email})
        if(user) throw {code: 11000};
        
        user = new User({email, password});
        await user.save()

        //jwt token

        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error);
        //Alternativa por mongoose
        if(error.code === 11000)
        {
            return res.status(400).json({error: "Ya existe este usuario"})
        }
    }
};

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user) 
            return res.status(403).json({error: "No existe este usuario"});
        const respuestaPassword = await user.comparePassword(password);
       
        if(!respuestaPassword)
            return res.status(403).json({error: "Contraseña incorrecta"})
        
           // Generar el token
           const {token, expiresIn} = generateToken(user.id);

        return res.json({token, expiresIn})
    } catch (error) {
        
    }
};

export const infoUser = async(req, res) => {
    try {
        const user = await User.findOne(req.uid);
        return res.json({user})
    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }
}