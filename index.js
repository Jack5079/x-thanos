const playSound = url=>new Audio(url).play()

class Thanos extends HTMLElement {
  constructor() {
    super()
    let soundtimeout
    let imgtimeout
    this.style.cursor = 'pointer'
    let img = new Image(80, 80)
    img.src = 'https://www.google.com/logos/fnbx/thanos/thanos_idle.png'
    this.appendChild(img)
    let snap = true // default to snap
    let elements

    this.addEventListener('click', function () {
      clearTimeout(soundtimeout) // clear idle timeout if it's there
      clearTimeout(imgtimeout) // clear sound timeout if it's there      
      imgtimeout = setTimeout(()=>{ // after 1 second change back to the normal img
        this.querySelector('img').src = 'https://www.google.com/logos/fnbx/thanos/thanos_idle.png'
      }, 4400)
       snap = !snap // switch the next state
      if (!snap) { // if it's snapping
        soundtimeout = setTimeout(()=>playSound('https://www.google.com/logos/fnbx/thanos/thanos_snap_sound.mp3'), 1000) // play the sound
        this.querySelector('img').src = 'snap.gif' // snap picture

        elements = Array.from(document.querySelectorAll('body *')) // array of everything on the page
          .filter(ele=>
              !this.contains(ele)  // can't be in gauntlet
              && !ele.children.length  // can't have other stuff in it
              && getComputedStyle(ele).display != 'none' // must be visble
              )
            .filter((h,_,arr)=>arr.indexOf(h) < arr.length / 2) // get first half
        elements.forEach(ele => {
          ele.animate([ // fade away
            {opacity: 0, filter: 'blur(50px)'} // fade and blur
          ], {
            duration: 2300,
            fill: 'forwards',
            delay: 2100, // timed with the snap
            easing: 'ease-out'
          })
        })
      } else { // if it's reverse
        playSound('https://www.google.com/logos/fnbx/thanos/thanos_reverse_sound.mp3')
        this.querySelector('img').src = 'reverse.gif' // snap picture
        elements.forEach(ele => {
         ele.animate([ // reverse the snap effect
           { opacity: 1, filter: 'blur(0)' }
         ], {
           duration: 3100,
           delay: 1000, // timed with the time overlay
           fill: 'forwards',
           easing: 'ease-in'
          })
        })
      }
    })
  }
}
customElements.define('x-thanos', Thanos)