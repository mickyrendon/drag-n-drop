// - REPLICA EL EJERCICIO COMPLETO DEL VÍDEO
const section = document.querySelectorAll('.section')
const paragraph = document.querySelectorAll('.paragraph')

paragraph.forEach(pgr=>{

    pgr.addEventListener('dragstart', e =>{
        console.log(`dragging box number ${pgr.innerText}`);
        // adding class
        pgr.classList.add('dragging')
        // it returns id because making reference to html id element
        e.dataTransfer.setData('id', pgr.id)
        // const phantom = document.querySelector('.phantom')
        // e.dataTransfer.setDragImage(phantom, 0, 0)
    })

    pgr.addEventListener('dragend', () =>{
        // console.log('dragging ended');
        pgr.classList.remove('dragging')
    })
})


section.forEach(sctn =>{

    sctn.addEventListener('dragover', e =>{
        e.preventDefault()
    })

    sctn.addEventListener('drop', e =>{
        console.log('drop');
        const idP = e.dataTransfer.getData('id')
        console.log(`paragraph id ${idP}` );
        // getting id from idP 
        const prgId = document.getElementById(idP)
        sctn.append(prgId)
    })
})

// - AÑADE EL CÓDIGO NECESARIO PARA QUE AL ARRASTRAR UN FRAGMENTO DEL PUZZLE A LA PAPELERA, ÉSTE SE ELIMINE
// paperBin
const paperBin = document.querySelector(".paper-bin")

paperBin.addEventListener("dragover", e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
})

paperBin.addEventListener("drop", e => {
    const idPrg = e.dataTransfer.getData("id")
    const removeP = document.getElementById(idPrg)
    removeP.remove()
})

