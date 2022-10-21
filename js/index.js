window.onload = emptyList
// empty list
function emptyList(){
    const ol =  document.querySelector('.list')
    
    if(ol.childElementCount === 0){
        console.log('if');
        const mesg = document.createElement('span')
        mesg.classList.add('mesg')
        mesg.style.display = 'inline-block'
        const txt = document.createTextNode('Lista vacía, agrega un nuevo ítem')

        ol.appendChild(mesg)
        mesg.appendChild(txt)
    }else{
        console.log('cartel eliminado');
// todo: ocultar el cartel creado
        // mesg.style.display = 'none'

    }
    console.log(ol.childElementCount);

}
// form add item
function prevent(){
    const addF = document.forms['form-add']

    addF.addEventListener('submit', e => {
        console.log('prevenido');
        e.preventDefault()
    })
}

document.querySelector('.btn').addEventListener('click', () => {
    prevent()
    newItem()
})

// new item
function newItem(){
    // inputs value
    const name =   document.querySelector('.name')
    const price =  document.querySelector('.price')
    // parentnode
    const ol =  document.querySelector('.list')
    //new html element
    const li =  document.createElement('li')  
    li.classList.add('paragraph', 'item')
    li.setAttribute('draggable', 'true')
    // todo: sett id 
    li.setAttribute('id', 'p-5')
    // li child
    const ctr       = document.createElement('div')  
    ctr.classList.add('ctr')
    const spanName  = document.createElement('span')  
    const spanPrice = document.createElement('span')  
    // adding text content
    const liVal = document.createTextNode(name.value)
    const priceVal = document.createTextNode(price.value)

    ol.appendChild(li)
    li.appendChild(ctr)
    ctr.appendChild(spanName)
    ctr.appendChild(spanPrice)
    spanName.appendChild(liVal)
    spanPrice.appendChild(priceVal)
}

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

// drag & drop
const section = document.querySelectorAll('.section')
const item = document.querySelectorAll('.item')

item.forEach( itm =>{

    itm.addEventListener('dragstart', e =>{
        console.log(`dragging box number ${itm.innerText}`);
        // adding class
        itm.classList.add('dragging')
        // it returns id because making reference to html id element
        // todo: hacer referencia a la funcion de id no al selector id
        e.dataTransfer.setData('id', itm.id)
        // const phantom = document.querySelector('.phantom')
        // e.dataTransfer.setDragImage(phantom, 0, 0)
    })

    itm.addEventListener('dragend', () =>{
        // console.log('dragging ended');
        itm.classList.remove('dragging')
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