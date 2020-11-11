import React, { ChangeEvent, FormEvent, useState } from "react";
import { Route, Router, useHistory, } from "react-router-dom";
import { Cliente } from "../models/cliente";
import api from "../services/api";
import "../styles/Cliente.css"

export default function CreateCliente() {
    const [formDate, setFormDate] = useState({
        nome: '',
        senha: '',
        plano: undefined
    })

    const history = useHistory()

    async function handleCadastro(e: FormEvent){
        e.preventDefault()


        const { nome, senha , plano} = formDate

        let planoCliente = plano

    
        if(plano<1){
            planoCliente = 1
        }else if(plano > 3){
            planoCliente = 3
        }
        
        const cliente = await api.post(`cliente`, {nome, senha, idplano:planoCliente})
        
        // const cliente = new Cliente({
        //     nome: nome,
        //     senha: senha,
        //     plano: plano
        // })
        console.log(JSON.stringify(cliente))
        
        localStorage.setItem("cliente-atual", JSON.stringify(cliente))
        history.push('/login')

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        setFormDate({ ...formDate, [name]: value})
    }

    return (
        <div id="page-cliente-login">
            <main>
                <form onSubmit={handleCadastro}className="create-cliente-form">
                    <fieldset>
                        <legend>Cadastro Cliente</legend>
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
                            <label htmlFor="plano">Plano</label>
                            <input
                                id="plano"
                                name="plano"
                                type="number"
                                placeholder="Digite um número de 1 à 3"
                                onChange={handleInputChange}
                            />
                        </div>
                    </fieldset>
                    <button className="confirm-button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
    );
}