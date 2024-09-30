import axios from 'axios'
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';
const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const {data} = await axios.post(SummaryApi.AddToCart.url,{productId : id},{
    headers: {
        'Content-Type': 'application/json'
    },  
    withCredentials: true
})
if(data?.success){
 toast.success(data?.message)
}
if(data?.error){
 
    toast.error(data?.message)
  
}
return data
};

export default AddToCart;
