// ------- components for React
import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router"

// withRouter allows us access to app url history
// and, more importantly here, hook events into url changes
import { withRouter } from "./withRouter.jsx"

// ------- primary stylesheet
import "./_styles/custom.css"

// ------- components for layout (header, sidebar)
import Header  from "./_layout/Header"
import TableOfContents from "./_layout/TableOfContents"

// ------- components for pages
import Page   from "./Page"

// -----------------------------------



function App(){

  const location = useLocation()

	useEffect(() => {
    initImgCarousels()
    hideMobileNav()
  }, [location.pathname]);

  const carousel = {}
  let modalImgIndex = 0
  let activeImgGroup
  let modalEl, modalImg, nextBtn, prevBtn, closeBtn


  function hideMobileNav(){
    const topNavbarClasses = document.getElementById('navbarNav')?.classList
		topNavbarClasses.remove('show')
  }

  function hideModal(){
    activeImgGroup = null
    modalImgIndex = 0
    modalEl.style.display = "none"
    modalImg.src = null
  }

  function showModal(groupName, i){
    activeImgGroup = groupName
    modalImgIndex = i
    modalImg.src = carousel[groupName][i]
    modalEl.style.display = "block"
  }

  const nextImg = () => {
    modalImgIndex += 1
    if (modalImgIndex < carousel[activeImgGroup]?.length) {
      modalImg.src = carousel[activeImgGroup][modalImgIndex]
    } else {
      hideModal()
    }
  }

  const prevImg = () => {
    modalImgIndex -= 1
    if (modalImgIndex >= 0){
      modalImg.src = carousel[activeImgGroup][modalImgIndex]
    } else {
      hideModal()
    }
  }

  const kbd = {
    "Escape":     hideModal,
    "ArrowLeft":  prevImg,
    "ArrowRight": nextImg
  }


  const initImgCarousels = () => {

    modalEl  = document.getElementById('modal')
    modalImg = modalEl.getElementsByTagName('img')[0]
    closeBtn = modalEl.getElementsByClassName('close')[0]
    nextBtn  = document.getElementById("next-image-link")
    prevBtn  = document.getElementById("prev-image-link")

    document.addEventListener("keydown", e=>{
      kbd[e.key] ? kbd[e.key]() : {}
    })

    nextBtn.addEventListener("click",  e=> nextImg())
    prevBtn.addEventListener("click",  e=> prevImg())
    closeBtn.addEventListener("click", e=> hideModal())
    modalImg.addEventListener("click", e=> nextImg())

    Array.from(document.getElementsByClassName("thumbnailGroup")).forEach(thumbnailGroup=>{
      const groupname = thumbnailGroup.dataset.groupName
      const thumbnails = Array.from(thumbnailGroup.getElementsByTagName("img"))

      carousel[groupname] = thumbnails.map(thumbnail => thumbnail.dataset.fullsizeSrc)
      thumbnails.forEach((thumbnail, i) => {
        thumbnail.addEventListener("click", e=>{
          showModal(groupname, i)
        })
      })
    })
  }



  return (
    <main>
      <Header />

      <div className="mt-5">
        <div className="row no-gutters">

          <div id="content-container" className="d-flex justify-content-center">
            <div id="content" className="col-lg-9 col-12 ps-lg-4 pe-lg-4 ps-md-5 pe-md-5 p-4">
              <Routes>
                <Route path="/"      element={<Page />} />
                <Route path="/:page" element={<Page />} />
              </Routes>
            </div>

            <TableOfContents />
          </div>
        </div>
      </div>

      <div id="modal" style={{"display": "none"}}>
        <div id="modal-content">
          <div id="modal-nav">
            <span></span>
            <div id="prev-next">
              <button id="prev-image-link" href="#" aria-label="previous image"> ← </button>
              <button id="next-image-link" href="#" aria-label="next image"> → </button>
            </div>

            <button href="#" className="close">x</button>
          </div>
          <img id="modal-image" src="null" />
        </div>
      </div>
    </main>
  );
}

export default withRouter(App);
