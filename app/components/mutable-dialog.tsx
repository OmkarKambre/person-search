import { GenericDialogProps } from 'path/to/generic-dialog-props'; // Adjust the import path as necessary

interface MutableDialogProps<T> extends GenericDialogProps<T> {
    onEdit?: (updatedPerson: T) => void;
}

const MutableDialog: React.FC<MutableDialogProps<UserFormData>> = ({ onEdit, ...props }) => {
    // ... existing code
}; 