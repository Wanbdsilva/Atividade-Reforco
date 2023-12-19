import { useState } from "react";
import axios from "axios";
import "./App.css";

import Titulo from "./Titulo";
//https://viacep.com.br/ws/09340-570/json/

function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const buscarEndereco = async (cep) => {
    if ( cep.length < 8 ) {
      setMensagem(`O CEP deve conter pelo menos 8 caracteres ! Voce digitou apenas ${cep.length}`);
      return;
    }
    setMensagem("");//zera a mensagem
    
    //chamar a api
    try {
      const retorno = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  
      console.log(retorno);
      if (retorno.data.erro) {
        setMensagem("CEP não encontrado");
        return;
      }

      //deu certo, trouxe o endereço
      setEndereco(retorno.data.logradouro);
      setBairro(retorno.data.bairro);
      setCidade(retorno.data.localidade);
      setEstado(retorno.data.uf);

    } catch (error) {
      setMensagem("Verifique o CEP digitado e sua conexão com a internet !");
    }
  };

  const cadastrarContato = async (e) => {
    e.preventDefault();
    
    try {
      const retorno = await axios.post('http://localhost:3000/agenda', {
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        numero: numero,
        complemento: complemento,
        cidade: cidade,
        estado: estado
      });

      setMensagem("Cadastro efetuado com sucesso ! ");
      
    } catch (error) {
      setMensagem("Erro na conexão com o servidor")
    }
  }

  return (
    <div className="App">
      <Titulo texto={`Agenda de Contatos`} />
      <span>{mensagem}</span>

      <form onSubmit={cadastrarContato}>
        <input 
          type="number" 
          name="CEP" 
          placeholder="Informe seu cep" 
          value={cep}
          onChange={(e) => {
            setCep(e.target.value);
          }}

          onBlur={
            () => {
              buscarEndereco(cep);
            }
          }
        />  

        <br />

        <input 
          type="text"
          name="Endereço"
          placeholder="endereço"
          value={endereco}
          onChange={(e) => {
            setEndereco(e.target.value);
          }} 
        />

        <br />

        <input
          type="text"
          name="Número"
          placeholder="Número"
          value={numero}
          onChange={(e) => {setNumero(e.target.value)}}
        />  

        <br />

        <input
          type="text"
          name="Complemento"
          placeholder="Complemento"
          value={complemento}
          onChange={(e) => {setComplemento(e.target.value)}}
        />  

        <br />

        <input
          type="text"
          name="Bairro"
          placeholder="Bairro"
          value={bairro}
          onChange={(e) => {setBairro(e.target.value)}}
        />  

        <br />

        <input
          type="text"
          name="Cidade"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => {setCidade(e.target.value)}}
        />  

        <br />

        <input
          type="text"
          name="Estado"
          placeholder="Estado"
          value={estado}
          onChange={(e) => {setEstado(e.target.value)}}
        />  

          <br /><br />
          <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default App;