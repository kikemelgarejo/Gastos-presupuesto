const guardarPresupuesto = () => {

    let presupuesto = parseInt(document.querySelector("#presupuestoInicial").value);

    if(presupuesto<1 || isNaN(presupuesto)){
        mostrarError("#msj_error_pregunta", "Cantidad no válida");
        return;
    }
    localStorage.setItem("presupuesto", presupuesto);
    localStorage.setItem("gastos", JSON.stringify([]));
    actualizarVista();
}

const actualizarVista = () =>{
    let presupuesto = localStorage.getItem("presupuesto");

    let divPregunta = document.querySelector("#pregunta");
    let divGastos = document.querySelector("#divGastos");
    let divControlGastos = document.querySelector("#divControlGastos");

    divPregunta.style.display="none";
    divGastos.style.display="none";

    let controlGastos = `<div class="gastos-realizados">
                            <h2>Listado de Gastos</h2>
                            <div class="alert alert-primary">
                                Presupuesto:$ ${presupuesto}
                            </div>
                            <div class="alert alert-success">
                                Restante:$ ${presupuesto}
                            </div>
                        </div>`;

    if(!presupuesto){
        divPregunta.style.display="block";
    }else{
        divPregunta.style.display="none";
        divGastos.style.display="block";
        divControlGastos.innerHTML=controlGastos;
    }
}

const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);//se hace referencia al div donde quiero que muestre el error
    divError.innerHTML=`<p class="alerta-error">${mensaje}</p>`;//toma el div y le inserta el siguiente html
    setTimeout(()=>{ divError.innerHTML=``;},2000);//pasado 2 segundos de visualizacion del mensaje este metodo luego lo borrará

}