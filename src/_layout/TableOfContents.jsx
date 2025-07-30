import { Route, Routes } from "react-router"


function TableOfContents(props){

  function listItems(list){
    return list?.map((listItem, i)=>{

      return <li key={'section'+i}>
          <a href={'#' + listItem.id}> {listItem.text}</a>
          <ul>
            { listItem.children ? listItems(listItem.children) : null }
          </ul>
        </li>
    })
  }



  const el = () => {
    if (props.toc?.length <= 0){
      return
    }

    return (
      <div id="toc-container" className="bd-toc col-lg-2 me-2 d-lg-block d-none">
        <strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
        <ul id="TableOfContents">
          {listItems(props.toc)}
        </ul>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/:group/:page" element={ el() } />
      <Route path="/:page"        element={ el() } />
    </Routes>
  )
}

export default TableOfContents
