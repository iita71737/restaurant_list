//初始設定
const left = document.querySelector('.left')

left.addEventListener('input', function(event) {
  event.target.parentElement.children[1].value = event.target.value
  event.target.parentElement.children[2].value = event.target.value
})

const editrating= document.querySelector('.editrating')

editrating.addEventListener('input', function(event) {
  event.target.parentElement.children[1].value = event.target.value
  event.target.parentElement.children[2].value = event.target.value
})
