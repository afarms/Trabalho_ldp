import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Router, Link } from "react-router-dom";
import { Cliente } from "../models/cliente";
import api from "../services/api";
import "../styles/Cliente.css"

export default function ClienteLogin() {

    const history = useHistory()

    const [formDate, setFormDate] = useState({
        nome: '',
        senha: '',
    })

    async function handleLogin(e: FormEvent){
        // cuida do login
        e.preventDefault()

        const { nome, senha } = formDate

        let cliente = await api.get(`login/${nome}/${senha}`) // verifica se existe o cliente no banco
        
        if(cliente.data){ // caso o cliente exista
            
            console.log(JSON.stringify(cliente.data)) 
            
            localStorage.setItem("cliente-atual", JSON.stringify(cliente.data)) // guardo o cliente no local storage
            history.push('/mensagens') // navega o usuario para tela de mensagens
        }else{
            alert('nome ou senha errados') // caso o usuarrio esteja errado exibe uma mensagem
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        // atualiza a variavel de formulario quando a mudanca em seus valores
        const { name, value } = event.target

        setFormDate({ ...formDate, [name]: value})
    }

    return (
        <div id="page-cliente-login">
            <main>
                <form onSubmit={handleLogin} className="create-cliente-form">
                    <fieldset>
                        <legend>Login Cliente</legend>
                        <div className="input-block">
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                name="nome" 
                                type="text"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                name="senha"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-block">
                            <Link to='/cadastro'>Cadastrar</Link>
                        </div>
                    </fieldset>
                    <button className="confirm-button" type="submit">
                        Logar
                    </button>
                </form>
            </main>
        </div>
    );
}