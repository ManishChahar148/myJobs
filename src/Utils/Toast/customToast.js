import { toast } from 'react-toastify'; 
import './Toast.scss';


const customToast = (title, message) => {
    toast(
        <div className='toastContainer'>
            <div>{title}</div>
            <div>{message}</div>
        </div>,
    );
}

export default customToast;