function Paciente(props) {
  return (
    <div>
      <h2>{props.nome}</h2>
      <p>Dia: {props.dia}</p>
      <p>Horário: {props.horario}</p>
      <p>Valor: R$ {props.valor}</p>
    </div>
  )
}

export default Paciente