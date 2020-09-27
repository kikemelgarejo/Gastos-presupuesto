var restante = 0;

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
    restante = presupuesto;

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
        refrescarListado();
    }
}

const agregarGasto = () => {
    let tipoGasto = document.querySelector("#tipoGasto").value;
    let cantidad = parseInt(document.querySelector("#cantidadGasto").value);

    if(cantidad<1 || isNaN(cantidad) || tipoGasto.trim()===''){
        mostrarError("#msj_error_creargasto", "Rellene todos los campos con valores válidos");
        return;
    }

    if(cantidad>restante){
        mostrarError("#msj_error_creargasto","La cantidad no debe superar el restante");
        return;
    }

    let nuevoGasto = {
        tipoGasto,
        cantidad
    }

    let gastos = JSON.parse(localStorage.getItem("gastos"));
    gastos.push(nuevoGasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    refrescarListado();

    document.querySelector("#formGastos").reset();
}

const refrescarListado = () => {
    let presupuesto = localStorage.getItem("presupuesto");
    let gastos = JSON.parse(localStorage.getItem("gastos"));

    let totalGastos = 0;
    let listadoHTML = '';
    gastos.map(gasto=>{
        listadoHTML += `<li class="gastos">
                            <p> ${gasto.tipoGasto}
                            <span class="gastos">$ ${gasto.cantidad}</span>
                            </p>
                        </li>`;

        totalGastos += parseInt(gasto.cantidad);
    });

    console.log("total de gasto: " +totalGastos);

    restante = presupuesto - totalGastos;

    let divControlGastos = document.querySelector("#divControlGastos");

    divControlGastos.innerHTML= '';

    if((presupuesto/4)>restante){
        clase = "alert alert-danger";
    }else if((presupuesto/2)>restante){
        clase = "alert alert-warning";
    }else{
        clase = "alert alert-success";
    }

    divControlGastos.innerHTML=`<div class ="gastos-realizados">
                                    <h2>Listado de gastos</h2>
                                    ${listadoHTML}
                                    <div class="alert alert-primary">
                                    Presupuesto:$ ${presupuesto}</div>
                                    <div class="${clase}">
                                    Restante:$ ${restante}</div>

                                    <button
                                    onclick="reiniciarPresupuesto()"
                                    class="button u-full-width">Reiniciar presupuesto</button>
                                </div>`;
}

const reiniciarPresupuesto = () =>{
    localStorage.clear(); //se borra localstorage
    location.reload(true); //se reinicia la página
}

const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);//se hace referencia al div donde quiero que muestre el error
    divError.innerHTML=`<p class="alerta-error">${mensaje}</p>`;//toma el div y le inserta el siguiente html
    setTimeout(()=>{ divError.innerHTML=``;},2000);//pasado 2 segundos de visualizacion del mensaje este metodo luego lo borrará

}