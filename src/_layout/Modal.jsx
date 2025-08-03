import { useEffect, useState } from "react"

function Modal({isVisible, activeImgGroup, imgIndex, thumbs, onModalHide, setImgIndex}){

  let imgSrc = `/img/events/${activeImgGroup}/full/${thumbs[imgIndex]}`
  const [kdbInit, setKbdInit] = useState(false)

  const incrementIndex = () => {
    setImgIndex(prevIndex => prevIndex+1)
  }

  const decrementIndex = () => {
    setImgIndex(prevIndex => prevIndex-1)
  }

  const kbd = {
    "Escape":     onModalHide,
    "ArrowLeft":  decrementIndex,
    "ArrowRight": incrementIndex
  }

  const keyboardEventListener = (e) => {
    kbd[e.key] ? kbd[e.key]() : {}
  }

  useEffect(() => {
    if (isVisible && !kdbInit){
      window.addEventListener("keydown", keyboardEventListener)
      setKbdInit(true)
    }
  }, [isVisible]);

  const updateImg = () => {
    if (imgIndex < thumbs.length && imgIndex >= 0) {
      imgSrc = `/img/events/${activeImgGroup}/full/${thumbs[imgIndex]}`
    } else {
      onModalHide()
    }
  }

  useEffect(()=>{
    updateImg()
  }, [imgIndex])


  return (
    isVisible ? (
      <div id="modal" style={{"display": 'block'}}>
        <div id="modal-content">
          <div id="modal-nav">
            <span></span>
            <div id="prev-next">
              <button id="prev-image-link" onClick={decrementIndex} aria-label="previous image"> ← </button>
              <button id="next-image-link" onClick={incrementIndex} aria-label="next image"> → </button>
            </div>

            <button href="#" className="close" onClick={onModalHide}>x</button>
          </div>
          <img id="modal-image" onClick={incrementIndex} src={imgSrc} />
        </div>
      </div>
    ) : null
  )
}

export default Modal