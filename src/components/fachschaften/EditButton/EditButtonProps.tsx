import { FormEvent } from "react"

export default interface EditButtonProps {
    editMode: boolean
    setEditMode: (mode: boolean) => void
    className?: string
    // onClickHandler?: (event: MouseEvent) => void
}