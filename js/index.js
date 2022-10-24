window.onload = emptyList
// global vars**
const list = document.querySelector('.list')
const id = idGen()
// inputs form
const name =   document.querySelector('.name')
const price =  document.querySelector('.price')
// library properties
Sortable.create(list, {
    animation: 150,
    group: 'Lista',
    store: {
        set: (sortable)=>{
            const listOrder = sortable.toArray()
            console.log(listOrder);
            localStorage.setItem(sortable.options.group.name, listOrder.join(', '))
        },
        get: (sortable)=>{
            const order = localStorage.getItem(sortable.options.group.name)
            order ? order.split(',') : []
        },
    }
})
// /////////////////
function localStrg(){
    const li = document.querySelectorAll('.item')
    li ? console.log(li) : []
}
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
        return emptyList(), newItem(), dragStart(), localStrg()
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
// new item
function newItem(){
    // parentnode
    const ol = list
    //new html element
    const li = document.createElement('li')  
          li.classList.add('paragraph', 'item')
          li.setAttribute('draggable', 'true')
          li.setAttribute('data-id', `p-${id.next().value}`)
    // li child
    const ctr       = document.createElement('div')  
          ctr.classList.add('ctr')
    const spanName  = document.createElement('span')  
    const spanPrice = document.createElement('span')  
    // adding text content
    const liVal     = document.createTextNode(name.value)
    const priceVal  = document.createTextNode(price.value)

    ol.appendChild(li)
    li.appendChild(ctr)
    ctr.appendChild(spanName)
    ctr.appendChild(spanPrice)
    spanName.appendChild(liVal)
    spanPrice.appendChild(priceVal)

    return li
}


// drag & drop
function dragStart(){
    const item = document.querySelectorAll('.item')
    
    item.forEach( itm =>{
        itm.addEventListener('dragstart', e =>{
            // adding class
            itm.classList.add('dragging')
        })
        
        itm.addEventListener('dragend', () =>{
            itm.classList.remove('dragging')
        })
    })
    
   
}
// function dragOver(itm){
//     const list = document.querySelector('.list')

//     list.addEventListener('dragover', e =>{
//         e.preventDefault()
//     })

//     list.addEventListener('drop', e =>{
//         const idP = e.dataTransfer.getData('id')
//         console.log(`drop id ${idP}` );
//         // getting id from idP 
//         const prgId = document.getElementById(idP)
//         // console.log(itm);
//         // list.append(prgId)
//     })
//     // paperBin
// function bin(){
//     const paperBin = document.querySelector(".paper-bin")
//     // Sortable.onRemove

//     paperBin.addEventListener("dragover", e => {
    //         e.preventDefault()
    //         e.dataTransfer.dropEffect = "copy"
//     })

//     paperBin.addEventListener("drop", e => {
//         const idPrg = e.dataTransfer.getData("id")
//         const removeP = document.getElementById(idPrg)
//         console.log('remover');
//         removeP.remove()
//         console.log('removido');
//     })
// }
// }