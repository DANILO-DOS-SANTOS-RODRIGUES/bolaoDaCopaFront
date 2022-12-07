import logo from './logo.svg';
import './App.css';
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import "./styles.css";
import axios from 'axios';
import ReactInputMask from "react-input-mask";


function App() {
  
const api = axios.create({/* local onde é desparado a requisição igual nos estavamos fazendo no postman    */
  baseURL: 'http://localhost:8080'
})
  const formRef = useRef(null);

  

  const response = useCallback(async ({nome, idade,  contato, logradouro, numero, referencia, cep, cidade, estado, cpf, rg, cnpj}) => {

    const result = await api.post('/api/salvarUsuario', {
      //Informe os campos que vão ser enviados pro back-end, separados por ,
      nome, 
      idade,
      contato,
    })

    const documento = {//para fazer uma ligação com uma classe
      cpf: cpf,
      rg: rg,
      cnpj: cnpj
    };
    
    const endereco = {
      logradouro: logradouro,
      numero: numero,
      referencia: referencia,
      cep: cep,
      cidade: cidade,
      estado: estado
    };

    if(result.data.statusCodeValue === 201) {
      alert("Cadastro realizado com sucesso, boa sorte!")
    } else{
      alert(result.data.body);
    }
  }, []);


  function handleSubmit(data, { reset }) {
    if(data.formSenac.email === "") {
      alert("O e-mail é obrigatorio!")
      return;
    }

    if(data.formSenac.bilhete === "") {
      alert('Quantidade de bilhete deve ser informado')
      return;
    } else if(data.formSenac.bilhete <= 0) {
      alert('Numero de bilhetes deve ser maior que ' + data.formSenac.bilhete)
      return;
    }
    
    console.log(data);
    response(data.formSenac)
    reset(data);
    

  }

  return (
    <div className="App">
      <Form  ref={formRef} onSubmit={handleSubmit}>

        <Scope path='formSenac'>
          <Input name="nome" placeholder="Nome"/>
          <Input type="text" name="idade" mask="999" placeholder="idade"/>
          <Input type="text" name="contato" mask="(99) 9 9999-9999" placeholder="Telefone Celular"/>
          <Input type="text" name="cpf" mask="999.999.999-99" placeholder="CPF"/>
          <Input type="text" name="rg" mask="99.999.999-9" placeholder="RG"/>
          {/**Exemplos de como criar os campos no formulario */}
          {/* <Input type="text" name="cpf" mask="999.999.999-99" placeholder="Cpf" maxlength="11"/>
          <Input type="email" name="email" placeholder="E-mail"/>
          <Input type="telefone" mask="(99) 9-9999-9999" name="telefone" placeholder="Telefone" maxlength="11"/>
          <Input type="text" name="redeSocial" placeholder="Rede social"/>
          <Input type="number" name="quantidadeDeBilhete" placeholder="Quantidade de bilhete" maxlength="2"/> */}
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
