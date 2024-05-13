
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Nav = () => {

  const {user, logOut} = useContext(AuthContext)

  const handleLogout = () =>{
      logOut();
    }

    return (
        <Navbar fluid rounded className="container mx-auto bg-primary">
        <Navbar.Brand href="/">
          
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Tidder Blogs</span>
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
            <Dropdown.Item><Link to='/profile'>Profile</Link></Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
          </div>
          :
          <div className="flex items-center md:order-2 text-white">
            <Link to='/login' className="hover:underline hover:text-secondary">Login</Link>
            <p>/</p>
            <Link to='/register' className="hover:underline hover:text-secondary">Register</Link>
            <Navbar.Toggle />
          </div>
        }
        
        <Navbar.Collapse>
        <Navbar.Link><NavLink to={"/"} className={({ isActive }) => isActive ? ' text-secondary  rounded-xl' : 'transition duration-300 ease-in-out text-white hover:text-secondary'}>Home</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/addblogs"} className={({ isActive }) => isActive ? ' text-secondary rounded-xl' : 'transition duration-300 ease-in-out text-white hover:text-secondary'}>Add Blog</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/allblogs"} className={({ isActive }) => isActive ? ' text-secondary rounded-xl' : 'transition duration-300 ease-in-out text-white hover:text-secondary'}>All Blog</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/featuredblogs"} className={({ isActive }) => isActive ? ' text-secondary rounded-xl' : 'transition duration-300 ease-in-out text-white hover:text-secondary'}>Featured Blogs</NavLink></Navbar.Link>

        <Navbar.Link><NavLink to={"/wishlist"} className={({ isActive }) => isActive ? ' text-secondary rounded-xl' : 'transition duration-300 ease-in-out text-white hover:text-secondary'}>Wishlist</NavLink></Navbar.Link>

        </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;