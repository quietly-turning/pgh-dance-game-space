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
import HomePage    from "./Pages/Home.jsx"
import EventsPage  from "./Pages/Events.jsx"
import NewsPage    from "./Pages/News.jsx"
import ContactPage from "./Pages/Contact.jsx"

// -----------------------------------

function App(){
  const location = useLocation()

  function hideMobileNav(){
    const topNavbarClasses = document.getElementById('navbarNav')?.classList
    topNavbarClasses.remove('show')
  }

  useEffect(() => {
    hideMobileNav()

    // scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })
  }, [location.pathname]);

  return (
    <main>
      <Header />

      <div className="mt-5">
        <div className="row no-gutters">

          <div id="content-container" className="d-flex justify-content-center">
            <div id="content" className="col-lg-9 col-12 ps-lg-4 pe-lg-4 ps-md-5 pe-md-5 p-4">
              <Routes>
                <Route path="/"        element={<HomePage />} />
                <Route path="/Events"  element={<EventsPage />} />
                <Route path="/News"    element={<NewsPage />} />
                <Route path="/Contact" element={<ContactPage />} />
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
