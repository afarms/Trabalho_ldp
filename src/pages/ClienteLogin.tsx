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
        e.preventDefault()

        const { nome, senha } = formDate

        let cliente = await api.get(`login/${nome}/${senha}`)
        
        // const cliente = new Cliente({
        //     nome: nome,
        //     senha: senha,
        //     plano: 3
        // })
        if(cliente.data){
            
            console.log(JSON.stringify(cliente.data))
            
            localStorage.setItem("cliente-atual", JSON.stringify(cliente.data))
            history.push('/mensagens')
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
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