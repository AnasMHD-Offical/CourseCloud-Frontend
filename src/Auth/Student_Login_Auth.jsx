import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Student_Login_Auth({children}) {

    const student = useSelector(state => state?.student?.student_data?.student)
    console.log(student);
  
    if(student){
      return <Navigate to={"/"}/> 
    }
    return children
}

export default Student_Login_Auth