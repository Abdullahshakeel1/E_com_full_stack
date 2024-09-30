import axios from "axios"
import { SummaryApi } from "../common"

const FetchPRODUCTbyCategory = async (category) => {
  const response = await axios.post(SummaryApi.GethCategoryWiseProduct.url ,{category} )
return response?.data

}

export default FetchPRODUCTbyCategory
