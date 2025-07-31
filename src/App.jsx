// ------- components for React
import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router"

// withRouter allows us access to app url history
// and, more importantly here, hook events into url changes
import { withRouter } from "./withRouter.jsx"

import { tns } from "tiny-slider"
import 'tiny-slider/dist/tiny-slider.css';

// ------- primary stylesheet
import "./_styles/custom.css"

// ------- components for layout (header, sidebar)
import Header  from "./_layout/Header"
import TableOfContents from "./_layout/TableOfContents"

// ------- components for pages
import Page   from "./Page"

// -----------------------------------



function App(){
  const slider = {}
  const location = useLocation();

	useEffect(() => {
    // check for presence of image carousels in current page on each url change
    initImgCarousels()
    hideMobileNav()
  }, [location.pathname]);


  function hideMobileNav(){
    const topNavbarClasses = document.getElementById('navbarNav')?.classList
		topNavbarClasses.remove('show')
  }

  function hideModal(id){
    // change properties the modal div
    const modalEl = document.getElementById((`${id}Modal`));
    modalEl.classList.remove('show')
    modalEl.style.display = "none"
    modalEl.ariaHidden = true

    // remove properties from <body>
    document.body.classList.remove("modal-open")
    document.body.style = ""

    // remove <div class="modal-backdrop"> from DOM
    Array.from(document.getElementsByClassName("modal-backdrop")).forEach(backdrop=>{
      backdrop.remove()
    })
  }


  const initImgCarousels = () => {

    Array.from(document.getElementsByClassName("tns-slider")).forEach(sliderEl=>{
      const id = sliderEl.id.replace("-carousel","")

      slider[id] = tns({
        container: `#${id}-carousel`,
        items: 1,
        autoplay: false,
        arrowKeys: true,
        loop: false,
        lazyload: true,
        speed: 0,
        nav: false,
      });

      // allow user to click on any thumbnail to open the fullscreen modal to that specific img
      Array.from(document.getElementsByClassName(`${id}-thumbnail`)).forEach(thumb=>{
        thumb.addEventListener("click", e=>{
          slider[id].goTo( parseInt(thumb.dataset.tnsIndex) )
        })
      })

      // allow user to click/tap any fullsize image to progress through the image slider
      Array.from(sliderEl.children).forEach(fullImg=>{
        fullImg.addEventListener("click", e=>{
          const info = slider[id].getInfo()

          if (info.index < info.slideCount-1){
            // progress to the next img in this slider
            slider[id].goTo("next")
          } else{
            // close the modal
            // XXX: can't figure out how to use bootstrap's .hide()
            //      so I'm recreating it manually
            hideModal(id)
          }
        })
      })
    });
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

    </main>
  );
}

export default withRouter(App);
