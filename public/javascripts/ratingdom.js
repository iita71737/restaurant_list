const editRating= document.querySelector('.edit-rating')

editRating.addEventListener('input', function(event) {
  event.target.parentElement.children[1].value = event.target.value
  event.target.parentElement.children[2].value = event.target.value
})

const editRating2= document.querySelector('.edit-rating2')

if (editRating2){
  editRating2.addEventListener('input', function(event) {
    event.target.parentElement.children[1].value = event.target.value
    event.target.parentElement.children[2].value = event.target.value
  })
}

