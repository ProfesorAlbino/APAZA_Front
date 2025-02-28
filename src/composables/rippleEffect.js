/* ripple animation on click menu link */
export const rippleEffect = () => {
  const buttons = document.querySelectorAll('li')
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect()
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top

      let span = document.createElement('span')
      span.classList.add('ripple-effect')
      span.style.left = x + 'px'
      span.style.top = y + 'px'
      this.appendChild(span)

      setTimeout(() => span.remove(), 1000)
    })
  })
}
