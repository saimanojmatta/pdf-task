import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
const Header = () => {
  const{currentuser}=useSelector((state)=>state.user)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
         <h1 className='font-bold text-sm  sm:text-xl  '>
          PDF Maker
         </h1>
        </Link>
        <ul className='flex gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            Home
          </li>
        </Link>
          {currentuser?(
        <Link to='/profile'>
            <img className='rounded-full h-7 w-7 object-cover' 
            src= {currentuser.avatar} alt="profile" />
        </Link>
          )
          :(
            <Link to={'sign-in'}>
            <li className='text-slate-700 hover:underline '>
              Sign in
              </li>
            </Link>
            )}
          
        </ul>
      </div>
    </header>
  )
}
export default Header