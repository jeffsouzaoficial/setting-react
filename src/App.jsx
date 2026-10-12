import Paciente from "./components/Paciente";

const pacientes = [
  { id: 1, nome: "Anna Karenina", dia: "Segunda",horario:"14:00", valor: 200 },
  { id: 2, nome: "Sherlock Holmes", dia: "Terça",horario:"15:00", valor: 200 },
  { id: 3, nome: "Dom Casmurro", dia: "Quarta",horario:"13:00", valor: 200 },
]

function App() {
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