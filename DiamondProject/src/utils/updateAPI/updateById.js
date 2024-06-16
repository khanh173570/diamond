import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
const updateById = async (apiUpdate, id, field, value) => {
    try {
        const response = await fetch(`${apiUpdate}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        if (data) {
            toast.success('Update successfully');
        }
    } catch (error) {
        console.log(error);
        toast.error('Update error');
    }
}; 
export default updateById; 