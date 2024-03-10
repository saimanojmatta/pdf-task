import {  useDispatch, useSelector } from "react-redux"
import { signoutstart ,deleteuserfailure,deleteusersuccess} from "../redux/user/userSlice"
import {Link} from 'react-router-dom'
const Profile = () => {
  const{currentuser,loading,error}=useSelector((state)=>state.user)
 const dispatch = useDispatch()
  const handlesignout=async()=>{
    try{
      dispatch(signoutstart())
      const res=await fetch('/api/auth/signout',)
      const data=res.json()
      if(data.success===false){
        dispatch(deleteuserfailure(data.message))
      }
      dispatch(deleteusersuccess(data))
    }catch(err){
      dispatch(deleteuserfailure(err.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile</h1>
        <form className="flex flex-col gap-4">
          <img className="rounded-full h-24 w-24 object-cover cursor-point self-center mt-2"
           src={currentuser?currentuser.avatar:null} alt="profile" />
        <input type="text" placeholder="username" defaultValue={currentuser.username}
        className="border p-3 rounded-lg" id="username"  />
        <input type="email" placeholder="email"defaultValue={currentuser.email}
        className="border p-3 rounded-lg" id="email"  />
        </form>
        <Link to={'/sign-in'}>
        <button className="bg-slate-700 max-w-lg mx-auto text-white rounded-lg p-3 uppercase hover:opacity-95 " 
        onClick={handlesignout}> Signout</button>
        </Link>
    </div>
  )
}
export default Profile