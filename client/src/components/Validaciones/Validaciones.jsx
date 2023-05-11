
const Validaciones = ({ Validar }) => {
/// validaciones del back
  return (
    <>
      {
            Validar?.map((dato, key) => {
              return (
                <div key={key}>{Object.values(dato)}</div>
              )
            })
            }
    </>
  )
}

export default Validaciones
