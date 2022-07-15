import { User } from "../models/User.js";
import {generateRefreshToken, generateToken}  from "../utils/tokenManager.js";


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
          generateRefreshToken(user.id, res)
        return res.json({token, expiresIn})
    } catch (error) {
        
    }
};

export const infoUser = async(req, res) => {
    try {
        const user = await User.findOne(req.uid).lean();
        return res.json({email: user.email})
    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }
}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};