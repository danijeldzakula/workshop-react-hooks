import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <NavLink className='py-2' to="/">Workshop - React Hooks</NavLink>
      
        <ul className="flex gap-2">
          <NavLink className='p-2 px-4' to="/">Home</NavLink>
          <NavLink className='p-2 px-4' to="/theme">Theme</NavLink>
        </ul>
      </div>
    </header>
  )
}