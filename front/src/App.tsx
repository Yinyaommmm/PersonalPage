import { RoutesComponent, RoutesNavbar } from "./router/RoutesComponent";

function App() {
	return (
		<div className=" flex flex-col w-full h-screen">
			<RoutesNavbar />
			<RoutesComponent />
		</div>
	);
}

export default App;
