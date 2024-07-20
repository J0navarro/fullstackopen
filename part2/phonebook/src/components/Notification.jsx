
const Notificacion = ( { errorMessage } ) => {
    console.log(errorMessage.mensaje);
   if (errorMessage.mensaje===null) {
        return null;
   }
    return <>
        <p className={errorMessage.estado}>{errorMessage.mensaje}</p>
    </>
}

export default  Notificacion