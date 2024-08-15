import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

function App() {
	return (
		<div className="container mx-auto">
			<h1 className="font-black text-5xl text-center py-20 md:w-2/3 md:mx-auto">Follow-up veterinary <span className="text-indigo-600">Patients</span></h1>

			<div className="md:flex pb-5">
				<PatientForm />
				<PatientList />
			</div>
			<ToastContainer />
		</div>
	)
}

export default App
