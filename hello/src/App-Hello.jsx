import { useState } from "react";
import "./App.css";

import Titulo from "./Titulo";

 function App() {
   //let nome = "Wanderson Cesar";
    const [nome, setNome] = useState ("Hellen");
    const [sobrenome, setSobrenome] = useState ("");
  
   console.log();
     return (
       <div className="App">
         {/* <h1>Feliz aniversario - {nome} {sobrenome} {"<3"} </h1> */}
         <Titulo texto={`Bem vindo ${nome}`} />
         <p>Nome: <strong>{nome} {sobrenome}</strong></p>
         <br />
         <input value={nome}
         type="text" 
         placeholder="Digite o nome !"
         onChange={
           (e) => {setNome(e.target.value)}
         }
         />
  
         <br />
         <input value={sobrenome}
         type="text" 
         placeholder="Digite o Sobrenome !"
         onChange={
           (e) => {setSobrenome(e.target.value)}
         }
         />
  
         <p>Sobrenome: <strong>{}</strong></p>
       </div>
     );
   }
  
   export default App-Hello;
