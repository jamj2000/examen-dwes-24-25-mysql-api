'use client'
import { useFormStatus } from "react-dom";

export default function Button(props) {
    const { pending } = useFormStatus()

    return (
        <button {...props} disabled={pending}>

            {pending ? 'Realizando operación...' : props.children}

        </button>
    );
}