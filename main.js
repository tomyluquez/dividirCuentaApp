const cantPersonas = localStorage.getItem('cantPersonas')
window.addEventListener('load', () => {
    
    //al cargar la pagina, traemos la cantidad de personas que son desde el local storage y creamos la cantidad de inputs para que completen//
    for(let i=1; i<=cantPersonas; i++){
        const contInputs = document.querySelector('.cont-inputs')
        const inputPersona = document.createElement('input')
        const inputGasto = document.createElement('input')
        inputPersona.classList.add('persona')
        inputPersona.placeholder= (`Persona ${i}`)
        inputGasto.classList.add('gasto')
        contInputs.appendChild(inputPersona)
        contInputs.appendChild(inputGasto)
    }
})

// creamos un evento de click para volver atras si el usuario necesita modificar la cantidad de personas//
const buttonBack = document.querySelector('.back')
buttonBack.addEventListener('click', () => {
    document.location = 'index.html'
})


const buttonCalculador = document.querySelector('.calculador')
buttonCalculador.addEventListener('click', () => {

    // con el boton calcular, traemos la nodelist de las personas y cuanto gasto cada una//
    const personasInputs = document.querySelectorAll('.persona')
    const gastosInputs = document.querySelectorAll('.gasto')

    const arrayPersonas = []

    for(let i=0; i<personasInputs.length; i++){
        if(personasInputs[i].value) {
            arrayPersonas[i] = {nombre: personasInputs[i].value}
        }
    }
    
    for(let i=0; i<gastosInputs.length; i++){
        if(gastosInputs[i].value) {
            arrayPersonas[i]['gasto'] = gastosInputs[i].value
        }
    }

    let count = 0
    for(let valores of arrayPersonas){
        if(valores.nombre && valores.gasto){
            count++
        } 
    }

    if(count === +cantPersonas){
        localStorage.setItem('personas', JSON.stringify(arrayPersonas))
        document.location = 'calculador.html'
    } else {
        const error = document.querySelector('.error')
        error.
        style.display = "block"
    }

  // iteramos cada nodelist y pasamos los datos a un array, luego comprobamos si todos los datos estan completos, sino, lanzamos un error en pantalla
})