/* preview image before uploading with fileReader Object */
const inpFile = document.getElementById('image')
const previewContainer = document.getElementById('imagePreview')
const previewImage = previewContainer.querySelector('.image-preview__image')
const previewDefaultText = previewContainer.querySelector('.image-preview__default-text')

inpFile.addEventListener('change', function () {
  const file = this.files[0]
  if (file) {
    const reader = new FileReader()
    previewDefaultText.style.display = 'none'
    previewImage.style.display = 'block'

    reader.addEventListener('load', function () {
      previewImage.setAttribute('src', this.result)
    })
    reader.readAsDataURL(file)
  } else {
    /* refresh upload system when someone come back without choosing a file */
    previewDefaultText.style.display = null
    previewImage.style.display = null
    previewImage.setAttribute('src', '')
  }
})
