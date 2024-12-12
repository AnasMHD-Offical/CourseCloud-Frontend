import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Admin_Auth({children}) {

  const admin = useSelector(state => state?.admin?.admin_data?.admin)
  console.log(admin);
  
    if(!admin){
      return <Navigate to={"/admin/login"}/> 
    }
    return children
}

export default Admin_Auth