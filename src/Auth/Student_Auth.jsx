import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Student_Auth({children}) {

  const student = useSelector(state => state?.student?.student_data?.student)
  console.log(student);
  
    if(!student){
      return <Navigate to={"/landing"}/> 
    }
    return children
}

export default Student_Auth