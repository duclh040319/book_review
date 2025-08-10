const btn = document.querySelector('.btn')
const icon = document.querySelectorAll('svg')
for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener('click', (e) => {
        const parentElement = e.target.parentElement
        const childInput = parentElement.querySelector('input')
        childInput.disabled = false
        
        
        
    })
}


btn.addEventListener('click', (e) => {
    e.preventDefault()
})