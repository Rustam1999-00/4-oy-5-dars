

var elForm = document.querySelector('.js-form')
var elInput = document.querySelector('.js-input')
var elList = document.querySelector('.js-list')


var elAllbtn = document.querySelector('.allbtn')
var elCombtn = document.querySelector('.combtn')
var elUpbtn = document.querySelector('.upbtn')
var elDelbtn = document.querySelector('.deletebtn');
var elGroupbtn = document.querySelector('.js-groupbtn')



var elAll = document.querySelector('.js-all')
var elCompleted = document.querySelector('.js-Completed')
var elUpCompleted = document.querySelector('.js-up-Completed')
var elTop = document.querySelector('.js-top')

var elDark = document.querySelector('.js-darkbtn')
var elBody = document.querySelector('body')

elDark.addEventListener('click',function(){
    elBody.classList.toggle('dark')
})





let todosData = JSON.parse(window.localStorage.getItem('todos'))





let todo = todosData || []



let rendertodo = (arrey,node)=>{

    node.innerHTML = ''
    
    arrey.forEach((item)=>{
        

    let elnewitem = document.createElement('li')
    elnewitem.setAttribute('class', 'list-group-item d-flex aligIn-items-center')

    let elSpan = document.createElement('span')
    let elNewinput = document.createElement('input')
    let elEditbuton = document.createElement('button')
    let elDeletebutton = document.createElement('button')

elSpan.textContent = item.id + " " + item.text
elSpan.setAttribute('class','flex-grow-1')
elNewinput.type = 'checkbox'
elNewinput.setAttribute('class','js-chek')
elNewinput.dataset.todoId = item.id

elEditbuton.textContent= 'Edit'
elEditbuton.setAttribute('class','bg-warning list-group me-4 px-3 py-2 js-edit')
elEditbuton.dataset.todoId = item.id


elDeletebutton.textContent = 'Delete'
elDeletebutton.setAttribute('class','bg-danger list-group px-3 py-2 js-delete')
elDeletebutton.dataset.todoId = item.id

if(item.isCamplaet){
    elNewinput.checked = true;
    elSpan.style.textDecoration = 'line-through'

}




    elnewitem.appendChild(elNewinput)
    elnewitem.appendChild(elSpan)
    elnewitem.appendChild(elEditbuton)
    elnewitem.appendChild(elDeletebutton)

    node.appendChild(elnewitem)
})


elAll.textContent = todo.length
elCompleted.textContent = arrey.filter((el)=>el.isCamplaet).length;
elUpCompleted.textContent = arrey.filter((el)=>!el.isCamplaet).length






elAllbtn.addEventListener('click',function(evt){
    rendertodo(todo,elList)
})



}
if(todo.length !== 0){
    rendertodo(todo,elList)
}
else{
    let criteH = document.createElement('h2');
    criteH.textContent = "Todo'lar yo'q";
    criteH.setAttribute('class','text-center text-danger')
    elList.appendChild(criteH)
}


elForm.addEventListener("submit",function(evt){
    evt.preventDefault();
   
    elList.innerHTML = ''



    let newobc = {
        id: todo.length ? todo[todo.length-1].id + 1:1,
        text:elInput.value,
        isCamplaet:false 
    }
    todo.push(newobc)
    rendertodo(todo,elList)

    elInput.value = ""

    window.localStorage.setItem('todos',JSON.stringify(todo))


})


elList.addEventListener('click',function(evt){

    if(evt.target.matches(".js-delete")){;

      const todoIds = evt.target.dataset.todoId;
      
      const finidext = todo.findIndex((item) => item.id == todoIds)

    todo.splice(finidext, 1)


    const complet = todo.filter((item)=> item.isCamplaet == true);
    elCompleted.textContent = complet.length
   


    rendertodo(todo,elList)
    }

    if(evt.target.matches('.js-edit')){
        const todoIds = evt.target.dataset.todoId;
        const finitem = todo.find((item)=>item.id == todoIds);
        const newpom = prompt('O\'zgartirish kiriting',finitem.text);
        finitem.text = newpom

        const complet = todo.filter((item)=> item.isCamplaet == true);
        elCompleted.textContent = complet.length

    
    
        rendertodo(todo,elList)
    }
    if(evt.target.matches('.js-chek')){
        const todoIds = evt.target.dataset.todoId;
        const finitem = todo.find((item)=>item.id == todoIds);
        finitem.isCamplaet = !finitem.isCamplaet

        const complet = todo.filter((item)=> item.isCamplaet == true);
        elCompleted.textContent = complet.length

        const upcomplet = todo.filter((item)=> item.isCamplaet == false);
    elUpCompleted.textContent = upcomplet.length
    
        rendertodo(todo,elList)
    }







})

elGroupbtn.addEventListener('click',function(evt){
if(evt.target.matches('.combtn')){

    let combtnclick = todo.filter((item)=>item.isCamplaet);
    rendertodo(combtnclick,elList)
};
if(evt.target.matches('.upbtn')){

    let combtnclick = todo.filter((item)=>!item.isCamplaet);
    rendertodo(combtnclick,elList)
};

if(evt.target.matches('.deletebtn')){
   let deleteb = todo.length == 0
   rendertodo(deleteb,elList)
}
})
   
    // window.addEventListener('scroll',function(evt){
    //     if(window.scrollY < 1500){
    //         elTop.style.display = 'none'
    //     }else{
    //         elTop.style.display = 'inherit'
    //     }
    // })
