type PatientDetailDisplayProps = {
    label: string
    data: string
}

export default function PatientDetailDisplay({ label, data } : PatientDetailDisplayProps) {
    return (
        <p className="font-bold text-gray-700 uppercase mt-2">{label}: {''}
            <span className="font-normal normal-case">{data}</span>
        </p>
    )
}
