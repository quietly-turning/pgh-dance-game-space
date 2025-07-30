import { useEffect, useState }  from "react"
import { Link, useLocation } from "react-router"

//  html-react-parse for parsing strings containing HTML markup into react objects
import parse from 'html-react-parser'

import content from "./page-content.js"

function Page(){
  let location = useLocation()


  const transform = function(node){
    if (node.type==="tag"){
    // transform internal <a data-component="Link"> elements to react <Link> elements
    // using html-react-parser's parse() method with the `replace` option
      if (node.name==="a" && node.dataset?.component==="Link"){
        return <Link to={node.attribs.href}>{node.children[0].data}</Link>
      }
    }
  }

  // on url change
  useEffect(() => {
    
    // scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })

  }, [location.pathname]) // only re-render if url's path changes

  return <div>{ parse(content[location.pathname], {replace: transform}) }</div>;
}

export default Page
