import Profile from '@/Components/build/Profile'
import React from 'react'

function Admin_Profile() {
  return (
    <>
        <Profile current_role={"Admin"} user_route={"api/admin/get_admin_data"} />
    </>
  )
}

export default Admin_Profile