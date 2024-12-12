import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Instructor_Login_Auth({children}) {

  const instructor = useSelector(state => state?.instructor?.instructor_data?.instructor)
  console.log(instructor);
  
    if(instructor){
      return <Navigate to={"/instructor"}/> 
    }
    return children
}

export default Instructor_Login_Auth