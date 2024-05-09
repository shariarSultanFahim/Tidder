
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Nav = () => {

  const {user, logOut} = useContext(AuthContext)

  const handleLogout = () =>{
      logOut()
    }

    return (
        <Navbar fluid rounded>
        <Navbar.Brand href="/">
          {/* <img src="#" className="mr-3 h-6 sm:h-9" alt="Logo" /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tidder Blogs</span>
        </Navbar.Brand>

        {
          user?
          <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={user?.photoURL} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.displayName}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
          </div>
          :
          <div className="flex md:order-2">
            <Link to='/login' className="hover:underline hover:text-primary">Login</Link>
            <p>/</p>
            <Link to='/register' className="hover:underline hover:text-primary">Register</Link>
          </div>
        }
        
        <Navbar.Collapse>
        <Navbar.Link><NavLink to={"/"} className={({ isActive }) => isActive ? 'px-3 py-2 bg-transparent text-primary  rounded-xl  ' : 'btn-ghost border-none bg-transparent hover:bg-transparent px-3 py-2 rounded-xl transition duration-300 ease-in-out hover:scale-110'}>Home</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/addblog"} className={({ isActive }) => isActive ? 'px-3 py-2 bg-transparent text-primary rounded-xl  ' : 'btn-ghost border-none bg-transparent hover:bg-transparent px-3 py-2 rounded-xl transition duration-300 ease-in-out hover:scale-110'}>Add Blog</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/allblog"} className={({ isActive }) => isActive ? 'px-3 py-2 bg-transparent text-primary rounded-xl  ' : 'btn-ghost border-none bg-transparent hover:bg-transparent px-3 py-2 rounded-xl transition duration-300 ease-in-out hover:scale-110'}>All Blog</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/featuredblogs"} className={({ isActive }) => isActive ? 'px-3 py-2 bg-transparent text-primary rounded-xl  ' : 'btn-ghost border-none bg-transparent hover:bg-transparent px-3 py-2 rounded-xl transition duration-300 ease-in-out hover:scale-110'}>Featured Blogs</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/wishlist"} className={({ isActive }) => isActive ? 'px-3 py-2 bg-transparent text-primary rounded-xl  ' : 'btn-ghost border-none bg-transparent hover:bg-transparent px-3 py-2 rounded-xl transition duration-300 ease-in-out hover:scale-110'}>Wishlist</NavLink></Navbar.Link>

        </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;