import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"

function TableOfContents(){
  const [ToC, setToC] = useState()

  useEffect(() => {
    setToC(null)
    setToC(initToC())
  }, [location.pathname])

  function listItems(list){
    return list?.map((listItem, i)=>{

      return(
        <li key={'section'+i}>
          <a href={'#' + listItem.id}> {listItem.text}</a>
          <ul>
            { listItem.children ? listItems(listItem.children) : null }
          </ul>
        </li>
      )
    })
  }

  function initToC(){
    // get all <h2> elements in this page and transform into a Table of Content
    // for right-side-of-page navigation
    return Array.from(document.getElementsByClassName("event-group")).map(eventGroup=>{
      const groupEl = Array.from(eventGroup.getElementsByTagName("h2"))[0];
      return {
        text:     groupEl.innerText,
        id:       groupEl.id,
        children: Array.from(eventGroup.getElementsByClassName("event")).map(event=>{
          const eventEl = Array.from(event.getElementsByTagName("h3"))[0];
          return{
            text: eventEl.innerText,
            id:   eventEl.id,
          }
        })
      }
    })
  }


  const el = () => {

    if (!ToC || ToC.length <= 0){
      return <div></div>
    }

    return (
      <div id="toc-container" className="bd-toc col-lg-2 me-2 d-lg-block d-none">
        <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
        <ul id="TableOfContents">
          {listItems(ToC)}
        </ul>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/"      element={ el() } />
      <Route path="/:page" element={ el() } />
    </Routes>
  )
}

export default TableOfContents
