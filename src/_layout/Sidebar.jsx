import { Component } from "react"
import { Route, Routes }    from "react-router"
import GuidesSidebar from "./GuidesSidebar"

class Sidebar extends Component {

	render() {
		return(
			<Routes>
				<Route path="/"             element={<GuidesSidebar mobile={this.props.mobile} />} />
				<Route path="/Resources"    element={<GuidesSidebar mobile={this.props.mobile} />} />
				<Route path="/:group/:page" element={<GuidesSidebar mobile={this.props.mobile} />} />
			</Routes>
		)
	}
}

export default Sidebar;
