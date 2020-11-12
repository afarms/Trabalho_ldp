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
        // cria um novo usuarrio

        const { nome, senha , plano} = formDate

        let planoCliente = plano

        // como so temos planos de 1 a 3, aqui e feito um tratamento, para que caso o usuario insira um numero maior que 3 seu plano seja 3
        
        
        const cliente = await api.post(`cliente`, {nome, senha, idplano:planoCliente})
        
        console.log(JSON.stringify(cliente))
        
        localStorage.setItem("cliente-atual", JSON.stringify(cliente))
        history.push('/login')

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        let newVal
        console.log(value);
        if(name == 'plano'){
            // como so temos planos de 1 a 3, aqui e feito um tratamento, para que caso o usuario insira um numero maior que 3 seu plano seja 3
            if(parseInt(value)<1){
                newVal = 1
            }else if(parseInt(value) > 3){
                newVal = 3
            }else{
                newVal = value
            }
            setFormDate({ ...formDate, [name]: newVal.toString()})
        }else{
            setFormDate({ ...formDate, [name]: value})
        }
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
                            <input className='ratioField'
                                id="senha"
                                name="senha"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-block">
                            <label  htmlFor="plano">Plano</label>
                            <input 
                                id="plano"
                                name="plano"
                                type="number"
                                placeholder="insira um numero entra de 1 a 3"
                                onChange={handleInputChange}
                                value = {formDate.plano}
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