// ------- components for React
import { Component }     from "react"
import { Route, Routes } from "react-router"

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



class App extends Component {

	constructor(props) {
		super(props)

		this.setToC = this.setToC.bind(this)

		this.state = {
			mobile_nav: false,
			isAPILoaded: false,
		}

		this.slider = {}
	}

	componentDidMount() {
		Array.from(document.getElementsByClassName('tns-slider')).forEach(sliderEl=>{
			const id = sliderEl.id.replace("-carousel","")

			this.slider[id] = tns({
				container: `#${id}-carousel`,
				items: 1,
				autoplay: false,
				arrowKeys: true,
				loop: false,
				lazyload: true,
				speed: 0,
				nav: false,
			});

			Array.from(document.getElementsByClassName(`${id}-thumbnail`)).forEach(thumb=>{
				thumb.addEventListener("click", e=>{
					this.slider[id].goTo( parseInt(thumb.dataset.tnsIndex) )
				})
			})
		});
	}

	setToC(data){
		this.setState({toc: data})
	}

	render() {

		return (
			<main>
				<Header />

				<div className="mt-5">
					<div className="row no-gutters">

						<div id="content-container" className="d-block d-lg-flex justify-content-center">
							<div id="content" className="col-lg-9 col-md-12 ps-lg-4 pe-lg-4 ps-md-5 pe-md-5 p-4">
								<Routes>
									<Route path="/"      element={<Page   hideMobileNav={this.hideMobileNav} />} />
									<Route path="/:page" element={<Page   hideMobileNav={this.hideMobileNav} setToC={this.setToC} />} />
									<Route path="/:group/:page" element={<Page   hideMobileNav={this.hideMobileNav} setToC={this.setToC} />} />
								</Routes>
							</div>

							<TableOfContents toc={this.state.toc} mobile_nav={this.state.mobile_nav} />
						</div>
					</div>
				</div>

			</main>
		);
	}
}

export default withRouter(App);
