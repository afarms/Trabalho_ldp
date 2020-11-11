import React, { useState } from "react";
import {BiPlusMedical} from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Cliente } from "../models/cliente";
import { Mensagem } from "../models/message";
import api from "../services/api";
import "../styles/Mensagens.css";

export default function Mensagens() {

    const [ mensagens, setMensagens ] = useState<Mensagem[]>([ ])

    console.log(JSON.parse(localStorage.getItem('cliente-atual')));
    
    const cliente = new Cliente(JSON.parse(localStorage.getItem('cliente-atual')))

    const history = useHistory();

    function getRandomInt(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

    async function getMensagens(params: Cliente) {
       // console.log(cliente);
       setMensagens([])
       const cliente = new Cliente(JSON.parse(localStorage.getItem('cliente-atual')))
       const respostaBanco = await api.get(`mensagens/${cliente.id}`)

       console.log(respostaBanco.data)
        const plano1 = respostaBanco.data.filter((x:any) => x.idplano == 1)
        const plano2 = respostaBanco.data.filter((x:any) => x.idplano == 2)
        const plano3 = respostaBanco.data.filter((x:any) => x.idplano == 3)

        console.log(plano1.length);
        


        if (plano1.length > 0){
            setMensagens([plano1[getRandomInt(plano1.length)]])
        }

        if (plano2.length > 0){
            setMensagens([plano1[getRandomInt(plano1.length)], plano2[getRandomInt(plano2.length)]])
        }

        if (plano3.length > 0){
            setMensagens([plano1[getRandomInt(plano1.length)], plano2[getRandomInt(plano2.length)], plano3[getRandomInt(plano3.length)]])
        }    


       console.log(JSON.parse(localStorage.getItem('cliente-atual')));
        // query e adicionar o resultado na funcao de baixo

        
    }

    function hadleLogout(){
        localStorage.removeItem('cliente-atual')
        history.replace('/login')
    }

    return (
        <div id="page-mensagens">
            <header className='header'>
                <a className='outButton' onClick={() => hadleLogout()}>Sair</a>
            </header>
            <main>
                <div className="frases-cliente">
                    <div className="titulo">
                    <span>Tipo Plano {cliente.plano}</span>
                    </div>

                    {mensagens.map((message:Mensagem) => (
                     <div key={message.id} className="frases">
                         {message.idplano}
                        <label htmlFor="name">{message.mensagem}</label>
                     </div>   
                    ))}

                    <button onClick={() => getMensagens(new Cliente({}))} className="get-frases-button" type="submit">
                        <BiPlusMedical />  Frases
                    </button>
                </div>
            </main>
        </div>
    );
}