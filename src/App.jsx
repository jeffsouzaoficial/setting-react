import { useState } from 'react'

import Paciente from "./components/Paciente";

function App() {
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: "Anna Karenina", dia: "Segunda",horario:"14:00", valor: 200 },
    { id: 2, nome: "Sherlock Holmes", dia: "Terça",horario:"15:00", valor: 200 },
    { id: 3, nome: "Dom Casmurro", dia: "Quarta",horario:"13:00", valor: 200 },
    { id: 4, nome: "Emma Bovary", dia: "Quarta",horario:"14:00", valor: 200 },
  ])

  const [diaEscolhido, setDiaEscolhido] = useState("Segunda")


  const pacientesFiltrados = pacientes.filter((paciente) => paciente.dia === diaEscolhido)

  return (
    <div>
      <h1>Setting</h1>

      <select value={diaEscolhido} onChange={(evento) => setDiaEscolhido(evento.target.value)}>
        <option value="Segunda">Segunda</option>
        <option value="Terça">Terça</option>
        <option value="Quarta">Quarta</option>
        <option value="Quinta">Quinta</option>
        <option value="Sexta">Sexta</option>
      </select>

      {pacientesFiltrados.map((paciente) => (
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