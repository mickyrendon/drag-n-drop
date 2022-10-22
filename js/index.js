window.onload = emptyList
// global vars**
const list = document.querySelector('.list')
// inputs form
const name =   document.querySelector('.name')
const price =  document.querySelector('.price')

// empty list
function emptyList(){
    const ol = list
    
    if(ol.childElementCount === 0){
        const mesg = document.createElement('span')
        mesg.classList.add('mesg')
        mesg.style.display = 'inline-block'

        const txt = document.createTextNode('Lista vacía, agrega un nuevo ítem')

        ol.appendChild(mesg)
        return mesg.appendChild(txt)
    }
    if(ol.childElementCount > 0){
        return ol.children[0].style.display = 'none'
    }

}
// form add item
function prevent(){
    const addF = document.forms['form-add']

    addF.addEventListener('submit', e => {
        console.log('prevenido');
        e.preventDefault()
        name.focus()
        return name.value = '', price.value = ''

    })
}

const event = document.querySelector('.btn').addEventListener('click', () => {
    let nameVal =  name.value
    let priceVal = price.value
    prevent()
    
    if(nameVal.length < 1 || priceVal.length < 1){
        alert('Llene los dos campos con sus respectivos carácteres');
    }else if(list.childElementCount < 11){
        return emptyList(), newItem(), dragStart()
    }else{
        return alert('Lista llena')
    }
})
// iterator
function* idGen(){
    let id = 0;
    while(true){
        id++
        if(id === 10){
            alert('Lista llena')
            return id
        }
        yield id
    }
}
const id = idGen()

// new item
function newItem(){
    // parentnode
    const ol =  list//document.querySelector('.list')
    //new html element
    const li =  document.createElement('li')  
    li.classList.add('paragraph', 'item')
    li.setAttribute('draggable', 'true')
    li.setAttribute('id', `p-${id.next().value}`)
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
function dragStart(){
    const item = document.querySelectorAll('.item')
    console.log(item);

    
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
            console.log(itm.id);
        })
        
        itm.addEventListener('dragend', () =>{
            console.log('dragging ended');
            itm.classList.remove('dragging')
        })
        dragOver()
    })
    
   
}
function dragOver(){
    const list = document.querySelector('.list')

    list.addEventListener('dragover', e =>{
        e.preventDefault()
    })

    list.addEventListener('drop', e =>{
        console.log('drop');
        const idP = e.dataTransfer.getData('id')
        console.log(`paragraph id ${idP}` );
        // getting id from idP 
        const prgId = document.getElementById(idP)
        list.append(prgId)
    })
}