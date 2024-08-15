import { toast } from 'react-toastify';
import { usePatientStore } from "../store"
import PatientDetailDisplay from "./PatientDetailDisplay"
import { Patient } from "../types"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient} : PatientDetailsProps) {

    const deletePatient = usePatientStore(state => state.deletePatient)
    const getPatientById = usePatientStore(state => state.getPatientById)

    const handleDelete = () => {
        deletePatient(patient.id)
        toast.error("The patient has been deleted! 🐶", {
            position: "top-right"
        })
    }

    return (
        <div className="mx-5 mb-10 px-5 py-10 bg-white rounded-lg shadow-lg">
            <PatientDetailDisplay
                label="id"
                data={patient.id}
            />
            <PatientDetailDisplay
                label="name"
                data={patient.name}
            />
            <PatientDetailDisplay
                label="owner"
                data={patient.owner}
            />
            <PatientDetailDisplay
                label="e-mail"
                data={patient.email}
            />
            <PatientDetailDisplay
                label="date"
                data={patient.date.toString()}
            />
            <PatientDetailDisplay
                label="symptoms"
                data={patient.symptoms}
            />
            <div className="flex justify-between mt-10">
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 w-2/5 py-2 uppercase font-bold text-sm text-white transition-colors rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >
                    edit
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 w-2/5 py-2 uppercase font-bold text-sm text-white transition-colors rounded-lg"
                    onClick={handleDelete}
                >
                    delete
                </button>
            </div>
        </div>
    )
}
