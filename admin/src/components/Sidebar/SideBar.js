import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { GetLogo } from "../../Store/LogoAction"
import { useSelector, useDispatch } from "react-redux"

import { RiProductHuntFill, RiContactsBook2Fill, RiCoupon3Line, RiLogoutCircleLine } from "react-icons/ri"
import { MdViewCarousel, MdPolicy } from "react-icons/md"
import { FaHashtag } from "react-icons/fa"
import { AiTwotoneFileExclamation, AiOutlineUnorderedList } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg"
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "../../Style/Sidebar.css"


const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/category",
    name: "Category",
    icon: <BiCategory />,
    subRoutes: [
      {
        path: "/category/maincategory",
        name: "Main Category ",
        icon: <AiOutlineUnorderedList />,
      },
      {
        path: "/category/category",
        name: "Category",
        icon: <AiOutlineUnorderedList />,
      },
      {
        path: "/category/subcategory",
        name: "Sub Category",
        icon: <AiOutlineUnorderedList />,
      },
    ],
  },
  {
    path: "/banner",
    name: "Banner",
    icon: <MdViewCarousel />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <RiContactsBook2Fill />,
  },
  {
    path: "/product",
    name: "Product",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/product/add",
        name: "Add Product ",
        icon: <CgAdd />,
      },
      {
        path: "/product/list",
        name: "Product List",
        icon: <RiProductHuntFill />,
      },

    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },

  {
    path: "/attribute",
    name: "Attribute",
    icon: <FaHashtag />,
  },
  {
    path: "/policy",
    name: "Policy",
    icon: <MdPolicy />,
  },
  {
    path: "/coupon",
    name: "Coupon",
    icon: <RiCoupon3Line />,
  },
  {
    path: "/logo",
    name: "Logo",
    icon: <GiClothes />,
  },
  
];

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const { getLogoLoading, getLogoMsg } = useSelector((state) => state.logo)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    dispatch(GetLogo())
  }, [])
  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminName");
    window.location.reload(true);
  }
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {getLogoLoading ? "Loding...." : <img src={getLogoMsg.Logo} alt="logo" style={{ maxWidth: "120px", margin: "auto" }} />}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes route_scroll">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
            <div className="d-flex ms-2" onClick={() => LogOut()} style={{cursor:"pointer"}}>
            <div className="icon me-2"><RiLogoutCircleLine/></div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                       {localStorage.getItem("token") && <p >Logout</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
            </div>

            {/* <div className="logout m-auto">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    {localStorage.getItem("token") && <button className="btn btn-danger ms-1" onClick={() => LogOut()}>Logout</button>}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div> */}

          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
