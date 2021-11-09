import "./App.css";
import "twin.macro";
import { Fps } from "./components/Fps";
import { Debug } from "./components/Debug";

function App() {
	return (
		<div tw="bg-green-500 p-16 h-full w-full">
			foobar
			<Fps />
			<Debug />
		</div>
	);
}

export default App;
