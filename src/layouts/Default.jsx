import Footer from "../components/Footer";
import Header from "../components/Header";

export const Default = ({ children }) => (
	<>
		<Header />
		<div style={{ width: "100%", height: "100%" }}>{children}</div>
		<Footer />
	</>
);
