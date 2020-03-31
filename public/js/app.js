


const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const mssg1 = document.querySelector('#message-1')
const mssg2 =document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
    mssg1.textContent='Loading...'
    mssg2.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mssg1.textContent=data.error
        }
        else{
            mssg1.textContent=data.location
            mssg2.textContent=data.forecast

        }
    })
})
})
