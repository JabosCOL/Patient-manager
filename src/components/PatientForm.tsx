import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import Error from "./Error"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"

export default function PatientForm() {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

    const addPatient = usePatientStore(state => state.addPatient)
    const updatePatient = usePatientStore(state => state.updatePatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)

    useEffect(() => {
        if (activeId) {
            const editingPatient = patients.filter(patient => patient.id === activeId)[0]
            setValue("name", editingPatient.name)
            setValue("owner", editingPatient.owner)
            setValue("email", editingPatient.email)
            setValue("date", editingPatient.date)
            setValue("symptoms", editingPatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if (activeId) {
            updatePatient(data)
            toast.success("The patient has been updated! 🐶", {
                position: "top-right"
            })
            reset()
            return
        }
        addPatient(data)
        toast.success("A new patient has been added! 🐶", {
            position: "top-right"
        })
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="text-3xl font-black text-center">Patients follow-up</h2>
            <p className="text-lg mt-5 mb-10 text-center">Add and Manage {''}
                <span className="text-indigo-600 font-bold">Patients</span>
            </p>
            <form
                className="py-10 px-5 space-y-5 rounded-lg shadow-md bg-white"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div>
                    <label
                        className="text-sm font-bold uppercase"
                        htmlFor="name"
                    >
                        Patient
                    </label>
                    <input
                        className="p-3 w-full border"
                        type="text"
                        id="name"
                        placeholder="Patient Name"
                        {...register("name", {
                            required: "Patient's name is required"
                        })}
                    />
                    {errors.name && <Error>{errors.name.message}</Error>}
                </div>
                <div>
                    <label
                        className="text-sm font-bold uppercase"
                        htmlFor="owner"
                    >
                        Owner
                    </label>
                    <input
                        className="p-3 w-full border"
                        type="text"
                        id="owner"
                        placeholder="Owner Name"
                        {...register("owner", {
                            required: "Owner's name is required"
                        })}
                    />
                    {errors.owner && <Error>{errors.owner.message}</Error>}
                </div>
                <div>
                    <label
                        className="text-sm font-bold uppercase"
                        htmlFor="email"
                    >
                        E-mail
                    </label>
                    <input
                        className="p-3 w-full border"
                        type="text"
                        id="email"
                        placeholder="E-mail for notifications"
                        {...register("email", {
                            required: "your e-mail is required",
                            pattern: {
                                value: /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/,
                                message: "Please use a valid email"
                            }
                        })}
                    />
                    {errors.email && <Error>{errors.email.message}</Error>}
                </div>
                <div>
                    <label
                        className="text-sm font-bold uppercase"
                        htmlFor="date"
                    >
                        Discharge date
                    </label>
                    <input
                        className="p-3 w-full border"
                        type="date"
                        id="date"
                        {...register("date", {
                            required: "Please select a discharge date"
                        })}
                    />
                    {errors.date && <Error>{errors.date.message}</Error>}
                </div>
                <div>
                    <label
                        className="text-sm font-bold uppercase"
                        htmlFor="symptoms"
                    >
                        Symptoms
                    </label>
                    <textarea
                        className="p-3 w-full border"
                        id="symptoms"
                        placeholder="Patient symptoms"
                        {...register("symptoms", {
                            required: "Patient's symptoms are required"
                        })}
                    />
                    {errors.symptoms && <Error>{errors.symptoms.message}</Error>}
                </div>
                <input className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer uppercase font-bold text-white text-center p-3" type="submit" value={activeId ? "Edit patient" : "Save patient"} />
            </form>
        </div>
    )
}
