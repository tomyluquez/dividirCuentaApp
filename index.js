const buttonNext = document.querySelector('.siguiente')

buttonNext.addEventListener('click', () => {
    const cantPersonas = document.querySelector('.cantPersonas').value

    if(!cantPersonas){
        alert('por favor ingresa la cantidad de personas')
    } else {
        localStorage.setItem('cantPersonas', cantPersonas)
        document.location= 'main.html'
    }
})


