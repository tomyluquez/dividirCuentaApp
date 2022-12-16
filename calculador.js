const cantidadPersonas = +localStorage.getItem('cantPersonas')
const buttonIndex = document.getElementById('buttonIndex')
window.addEventListener('load', () => {
    const arrayGastos = JSON.parse(localStorage.getItem('personas'))
    

    let gastosIndividuales = []
    for(let valores of arrayGastos){
        gastosIndividuales.push(+valores.gasto)
    }

    const gastosTotal = gastosIndividuales.reduce((a,b) => a+b)
    generarSpan(gastosTotal)
    generarCuentasInd(arrayGastos, gastosIndividuales)
    
})

buttonIndex.addEventListener('click', () => {
    document.location='index.html'
})

const generarSpan = gastosTotal => {
    const spanTotal = document.getElementById('total')
    const spanPersona = document.getElementById('totalPersona')
    spanTotal.innerHTML = `$${gastosTotal}`
    spanPersona.innerHTML = `$${Math.round(gastosTotal / cantidadPersonas)}`
}

const generarCuentasInd= (arrayGastos, gastosIndividuales) => {
    arrayGastos.sort((a,b) => b.gasto - a.gasto)
    const gastosPorPersona = Math.round(gastosIndividuales.reduce((a,b) => a+b) / cantidadPersonas)
    for(let i=0; i<arrayGastos.length; i++){
        if(arrayGastos[i].gasto < gastosPorPersona){
            arrayGastos[i]['debe'] = gastosPorPersona - arrayGastos[i].gasto
        } else if (arrayGastos[i].gasto > gastosPorPersona){
            arrayGastos[i]['recupera'] = arrayGastos[i].gasto - gastosPorPersona
        } else arrayGastos[i]['saldo']= 0
    }
    generarDivision(arrayGastos)
}

const generarDivision = arrayPersonas => {
    const tabla = document.getElementById('tabla')

    arrayPersonas.map(persona => {
        const tr = document.createElement('tr')
        const tdPersona = document.createElement('td')
        const tdGasto = document.createElement('td')
        const tdDebe = document.createElement('td')
        const tdRecupera = document.createElement('td')
        tabla.appendChild(tr)
        tr.appendChild(tdPersona)
        tr.appendChild(tdGasto)
        tr.appendChild(tdDebe)
        tr.appendChild(tdRecupera)
        tdPersona.innerHTML = `${persona.nombre}`
        tdGasto.innerHTML = `$${persona.gasto}`

        if(persona.debe > 0){
            tdDebe.innerHTML = `$${persona.debe}`
            tdRecupera.innerHTML = '$-'
        } else if(persona.recupera > 0){
            tdDebe.innerHTML = '$-'
            tdRecupera.innerHTML = `$${persona.recupera}`
        } else {
            tdDebe.innerHTML = '$-'
            tdRecupera.innerHTML = '$-'
        }
    })

    rutaPagos(arrayPersonas)
}

const rutaPagos = arrayGastos => {
    arrayGastos.reverse()
    const rutaPagos = document.querySelector('.cont-rutaPagos')

    for (let i=0; i<arrayGastos.length; i++){
        for(let j=i+1; j<arrayGastos.length; j++){
            if(arrayGastos[i].saldo === 0){
                const newSpan = document.createElement('span')
                rutaPagos.appendChild(newSpan)
                newSpan.innerHTML = `- ${arrayGastos[i].nombre} no tiene que pagarle a nadie<br>`
            }

            if(arrayGastos[i].debe > 0 && arrayGastos[j].recupera > 0 && arrayGastos[i].debe > arrayGastos[j].recupera){
                const newSpan = document.createElement('span')
                rutaPagos.appendChild(newSpan)
                newSpan.innerHTML = `- ${arrayGastos[i].nombre} tiene que pagarle a ${arrayGastos[j].nombre} $${arrayGastos[j].recupera}<br>`
                arrayGastos[i].debe -= arrayGastos[j].recupera
                arrayGastos[j].recupera = 0
            }

            if(arrayGastos[i].debe > 0 && arrayGastos[j].recupera > 0 && arrayGastos[i].debe <= arrayGastos[j].recupera){
                const newSpan = document.createElement('span')
                rutaPagos.appendChild(newSpan)
                newSpan.innerHTML = `- ${arrayGastos[i].nombre} tiene que pagarle a ${arrayGastos[j].nombre} $${arrayGastos[i].debe}<br>`
                arrayGastos[j].recupera -= arrayGastos[i].debe
                arrayGastos[i].debe = 0
            }
        }
    }

}
