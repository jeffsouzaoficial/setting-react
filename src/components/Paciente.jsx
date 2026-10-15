function Paciente(props) {

  const link = `https://wa.me/${props.whatsapp}`

  return (
    <div>
      <h2>{props.nome}</h2>
      <p>Dia: {props.dia}</p>
      <p>Horário: {props.horario}</p>
      <p>Valor: R$ {props.valor}</p>
      {props.ativo === true ? (
      <button onClick={() => props.encerrarTratamento(props.id)}>Encerrar tratamento</button>
      ) : (
        <p>Tratamento Encerrado</p>
      )}
      <a href={link} target="_blank">Conversar no WhatsApp</a>
    </div>
  )
}

export default Paciente