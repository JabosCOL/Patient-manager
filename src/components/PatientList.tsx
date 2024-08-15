import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

export default function PatientList() {

	const patients = usePatientStore(state => state.patients)

	return (
		<div className="md:w-1/2 lg:w-3/5 md:h-[47rem] mt-10 md:mt-0 overflow-y-scroll">
			{patients.length ? (
				<>
					<div className="sticky top-0 bg-gray-100 pb-10">
						<h2 className="text-3xl font-black text-center">Patient List</h2>
						<p className="text-lg mt-5 text-center">Manage your {''}
							<span className="text-indigo-600 font-bold">Patients and Appointments</span>
						</p>
					</div>
					{patients.map(patient => (
						<PatientDetails
							key={patient.id}
							patient={patient}
						/>
					))}
				</>
			) : (
				<>
					<h2 className="text-3xl font-black text-center">There are not patients</h2>
					<p className="text-lg mt-5 mb-10 text-center">Start adding patients {''}
						<span className="text-indigo-600 font-bold">and they'll show up here</span>
					</p>
				</>
			)}
		</div>
	)
}
