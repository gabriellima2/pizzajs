import Header from "../components/Header";

export const App = ({ children }) => (
	<>
		<Header />
		<div style={{ width: "100%", height: "100%" }}>{children}</div>
	</>
);
