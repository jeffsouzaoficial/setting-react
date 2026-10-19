import { useState, useEffect } from 'react'

import Paciente from "./components/Paciente";

function App() {

  const pacientesSalvos = JSON.parse(localStorage.getItem("setting-pacientes"))

  const [pacientes, setPacientes] = useState(pacientesSalvos || [
    { id: 1, nome: "Anna Karenina", dia: "Segunda", horario: "14:00", valor: 200, duracao: 50, ativo: true, whatsapp: "5511900000001" },
    { id: 2, nome: "Sherlock Holmes", dia: "Terça", horario: "15:00", valor: 200, duracao: 50, ativo: true, whatsapp: "5511900000002" },
    { id: 3, nome: "Dom Casmurro", dia: "Quarta", horario: "13:00", valor: 200, duracao: 50, ativo: false, whatsapp: "5511900000003" },
    { id: 4, nome: "Emma Bovary", dia: "Quarta", horario: "14:00", valor: 200, duracao: 50, ativo: true, whatsapp: "5511900000004" },
  ])



  const [diaEscolhido, setDiaEscolhido] = useState("Segunda")

  const [novoNome, setNovoNome] = useState("")

  const [novoDia, setNovoDia] = useState("Segunda")

  const [novoHorario, setNovoHorario] = useState("")

  const [novoValor, setNovoValor] = useState("")

  const [novaDuracao, setNovaDuracao] = useState("")

  const [novoWhatsapp, setNovoWhatsapp] = useState("")

  const [feriados, setFeriados] = useState([])

  const anoAtual = new Date().getFullYear()


  useEffect(() => {
    localStorage.setItem("setting-pacientes", JSON.stringify(pacientes))
  }, [pacientes])

  useEffect(() => {
    async function buscarFeriados() {
      const resposta = await fetch(`https://brasilapi.com.br/api/feriados/v1/${anoAtual}`)
      const dados = await resposta.json()
      setFeriados(dados)
    }

    buscarFeriados()
  }, [])


  const pacientesFiltrados = pacientes.filter((paciente) => paciente.dia === diaEscolhido)

  const pacientesAtivos = pacientes.filter((paciente) => paciente.ativo === true)

  const faturamentoSemanal = pacientesAtivos.reduce((total, paciente) => total + paciente.valor, 0)

  const minutosSemanais = pacientesAtivos.reduce((total, paciente) => total + paciente.duracao, 0)

  const horas = Math.floor(minutosSemanais / 60)
  const minutosRestantes = minutosSemanais % 60

  const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

  function descobrirDia(data) {
    const numero = new Date(`${data}T00:00:00`).getDay()
    return diasDaSemana[numero]
  }

  function pacientesDoFeriado(data) {
    const dia = descobrirDia(data)
    return pacientesAtivos.filter((paciente) => paciente.dia === dia)
  }

  function cadastrarPaciente() {
    if (novoNome === "" || novoDia === "" || novoHorario === "" || novoValor === "" || novaDuracao === "" || novoWhatsapp === "") {
      alert("Preencha todos os campos.")
      return
    }

    const horarioOcupado = pacientes.some(
      (paciente) => paciente.dia === novoDia && paciente.horario === novoHorario && paciente.ativo === true
    )

    if (horarioOcupado) {
      alert("Esse horário já está reservado.")
      return
    }

    const novoPaciente = {
      id: Date.now(),
      nome: novoNome,
      dia: novoDia,
      horario: novoHorario,
      valor: Number(novoValor),
      duracao: Number(novaDuracao),
      ativo: true,
      whatsapp: novoWhatsapp
    }
    setPacientes([...pacientes, novoPaciente])
  }

  function encerrarTratamento(id) {
    const confirmou = confirm("Deseja encerrar o tratamento deste paciente?")

    if (confirmou === false) {
      return
    }
    setPacientes(
      pacientes.map((paciente) =>
        paciente.id === id ? { ...paciente, ativo: false } : paciente
      )
    )
  }

  return (
    <div>
      <h1>Setting</h1>

      <h2>Resumo da semana</h2>
      <p>Faturamento semanal: R$ {faturamentoSemanal}</p>
      <p>Tempo de atendimento: {horas}h {minutosRestantes}min</p>
      <p>Pacientes ativos: {pacientesAtivos.length}</p>

      <h2>Novo paciente</h2>
      <input
        type="text"
        placeholder="Nome do paciente"
        value={novoNome}
        onChange={(evento) => setNovoNome(evento.target.value)}
      />

      <input
        type="tel"
        placeholder="Whatsapp do paciente"
        value={novoWhatsapp}
        onChange={(evento) => setNovoWhatsapp(evento.target.value)}
      />

      <select value={novoDia} onChange={(evento) => setNovoDia(evento.target.value)}>
        <option value="Segunda">Segunda</option>
        <option value="Terça">Terça</option>
        <option value="Quarta">Quarta</option>
        <option value="Quinta">Quinta</option>
        <option value="Sexta">Sexta</option>
      </select>

      <input
        type="time"
        placeholder="Horario da sessão"
        value={novoHorario}
        onChange={(evento) => setNovoHorario(evento.target.value)}
      />

      <input
        type="number"
        placeholder="Valor da sessão"
        value={novoValor}
        onChange={(evento) => setNovoValor(evento.target.value)}
      />

      <input
        type="number"
        placeholder="Tempo de sessão"
        value={novaDuracao}
        onChange={(evento) => setNovaDuracao(evento.target.value)}
      />

      <button onClick={cadastrarPaciente}>Cadastrar</button>


      <h2>Agenda</h2>

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
          id={paciente.id}
          nome={paciente.nome}
          dia={paciente.dia}
          horario={paciente.horario}
          valor={paciente.valor}
          encerrarTratamento={encerrarTratamento}
          ativo={paciente.ativo}
          whatsapp={paciente.whatsapp}
        />
      ))}

      <h2>Feriados de {anoAtual}</h2>
      <ul>
        {feriados.map((feriado) => (
          <li key={feriado.date}>{feriado.date} — {feriado.name} ({descobrirDia(feriado.date)}): {pacientesDoFeriado(feriado.date).length} paciente(s)</li>
        ))}
      </ul>
    </div>

  )
}

export default App