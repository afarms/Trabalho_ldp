import React, { useState } from "react";
import {BiPlusMedical} from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Cliente } from "../models/cliente";
import { Mensagem } from "../models/message";
import api from "../services/api";
import "../styles/Mensagens.css";

export default function Mensagens() {

    const [ mensagens, setMensagens ] = useState<Mensagem[]>([ ]) // array alteravel de mensagens

    
    const cliente = new Cliente(JSON.parse(localStorage.getItem('cliente-atual'))) // instancia do cliente

    const history = useHistory(); // guarda um hitorico, tambem e utilizado pra navegacao

    function getRandomInt(max: number){
        // retorna um numero aleatorio de 0 ate max
        return Math.floor(Math.random() * Math.floor(max))
    }

    async function getMensagens() {
        // autaliza a lista de mensagens do usuario
        const cliente = new Cliente(JSON.parse(localStorage.getItem('cliente-atual'))) //instancia um cliente a partir do local storage
        const respostaBanco = await api.get(`mensagens/${cliente.id}`) // acessa a rota do banco  pegando uma lista de mensagens de acorrod com o plano
        
        // filtra a resposta do banco que acordo com cada plano
        const plano1 = respostaBanco.data.filter((x:any) => x.idplano == 1)
        const plano2 = respostaBanco.data.filter((x:any) => x.idplano == 2)
        const plano3 = respostaBanco.data.filter((x:any) => x.idplano == 3)
        
        //* o banco retorna todas as mensagens do seu plano e de planos inferiores
        //* logo o plano 2 tera as mensagens do 2 e as do 1 mas nao as do 3

        if (plano1.length > 0){ // caso o team elementos no plano 1 ele atualiza as mensagens
            setMensagens([plano1[getRandomInt(plano1.length)]]) // pega uma mensagem aleatoria do plano 1
        }

        if (plano2.length > 0){ // caso o team elementos no plano 2 ele atualiza as mensagens c
            // pega uma mensagem aleatoria do plano 1 e do plano
            setMensagens([plano1[getRandomInt(plano1.length)], plano2[getRandomInt(plano2.length)]])
        }

        if (plano3.length > 0){// caso o team elementos no plano 2 ele atualiza as mensagens
            // pega uma mensagem aleatoria do plano 1 do plano 2 e do plano 3
            setMensagens([plano1[getRandomInt(plano1.length)], plano2[getRandomInt(plano2.length)], plano3[getRandomInt(plano3.length)]])
        }    
    }

    function hadleLogout(){
        // lipa a variavel do local sotorage que armazena o cliente
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

                    <button onClick={() => getMensagens()} className="get-frases-button" type="submit">
                        <BiPlusMedical />  Frases
                    </button>
                </div>
            </main>
        </div>
    );
}