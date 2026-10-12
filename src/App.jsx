import { useState } from 'react'

import Paciente from "./components/Paciente";

function App() {
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: "Anna Karenina", dia: "Segunda",horario:"14:00", valor: 200 },
    { id: 2, nome: "Sherlock Holmes", dia: "Terça",horario:"15:00", valor: 200 },
    { id: 3, nome: "Dom Casmurro", dia: "Quarta",horario:"13:00", valor: 200 },
  ])

  return (
    <div>
      <h1>Setting</h1>
      {pacientes.map((paciente) => (
        <Paciente 
        key={paciente.id} 
        nome={paciente.nome} 
        dia={paciente.dia} 
        horario={paciente.horario} 
        valor={paciente.valor}
        />
      ))}
    </div>
  )
}

export default App