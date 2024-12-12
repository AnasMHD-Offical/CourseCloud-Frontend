import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Instructor_Auth({children}) {

  const instructor = useSelector(state => state?.instructor?.instructor_data?.instructor)
  console.log(instructor);
  
    if(!instructor){
      return <Navigate to={"/instructor/login"}/> 
    }
    return children
}

export default Instructor_Auth