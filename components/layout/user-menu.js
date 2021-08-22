import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  RiProfileLine,
  RiShoppingBag3Line,
  RiMoneyDollarCircleLine,
  RiKey2Line,
  RiLogoutBoxRLine,
  RiLoginBoxLine,
  RiUserAddLine,
} from "react-icons/ri";
import css from "./user-menu.module.css";
import { signOut, useSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import FlowerLoader from "../common/flower-loader";
import { useQuery } from "react-query";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import Modal from "../common/modal";
import { getUserProfile } from "../../utils/query-helpers";
import AuthSwitcher from "../login/auth-switcher";
import DotMenuItem from "./dot-menu-item";

const UserMenu = () => {
  const [session, loading] = useSession();

  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const dispatch = useDispatch();

  const menuLinks = [
    {
      to: "/user/profile",
      icon: <RiProfileLine />,
      text: "My Profile",
    },
    {
      to: "/user/orders",
      icon: <RiShoppingBag3Line />,
      text: "My Orders",
    },
    {
      to: "/user/payment-history",
      icon: <RiMoneyDollarCircleLine />,
      text: "Payment History",
    },
    {
      to: "/user/change-password",
      icon: <RiKey2Line />,
      text: "Change Password",
    },
  ];

  const handleSignIn = () => {
    dispatch(showModal("auth-modal"));
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const enableQuery = session ? true : false;

  const { data: userProfile } = useQuery("navbar", getUserProfile, {
    enabled: enableQuery,
    initialData: session?.user,
  });

  const handleLogOut = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
    // const data = await signOut({ redirect: false, callbackUrl: "/" });
    // router.push(data.url);
  };

  function handleShowModal() {
    dispatch(showModal("user-three-dot-menu"));
  }

  return (
    <>
      <span onClick={handleShowModal} className={css.threeDotMenu}>
        <BsThreeDotsVertical />
      </span>
      {modalShown && modalId === "user-three-dot-menu" && (
        <Modal modalWidth={250} onCloseModal={handleCloseModal}>
          <div className={css.menuContent}>
            <ul className={css.listContainer}>
              {session ? (
                <>
                  <span>
                    {userProfile ? (
                      <span className={css.userSection}>
                        <span className={css.userIcon}>
                          <FaUser />
                        </span>
                        <span className={css.userName}>
                          {`${userProfile.name || userProfile.email}`}
                        </span>
                      </span>
                    ) : (
                      <FlowerLoader />
                    )}
                  </span>
                  {menuLinks.map((item, index) => (
                    <DotMenuItem
                      key={index}
                      to={item.to}
                      menuIcon={item.icon}
                      text={item.text}
                    />
                  ))}
                  <DotMenuItem
                    noLink
                    menuIcon={<RiLogoutBoxRLine />}
                    text="Log out"
                    onClick={handleLogOut}
                  />
                </>
              ) : (
                <>
                  <DotMenuItem
                    to="/account/login"
                    menuIcon={<RiLoginBoxLine />}
                    text="Log in"
                  />
                  <DotMenuItem
                    to="/account/login"
                    menuIcon={<RiUserAddLine />}
                    text="Sign up"
                  />
                </>
              )}
            </ul>
          </div>
        </Modal>
      )}
      {session && (
        <div className={css.dropdown}>
          <Link href="/user/profile">
            <a className={css.dropbtn}>
              {userProfile ? (
                <>
                  <span className={css.userIcon}>
                    <FaUser />
                  </span>
                  <span className={css.userName}>
                    {`${userProfile.name || userProfile.email}`}
                  </span>
                </>
              ) : (
                <FlowerLoader />
              )}
            </a>
          </Link>

          <div className={css.dropdownContent}>
            <ul>
              {menuLinks.map((item, index) => (
                <Link key={index} href={item.to}>
                  <a>
                    <li className={css.listItem}>{item.text}</li>
                  </a>
                </Link>
              ))}
              <a onClick={handleLogOut}>
                <li className={css.listItem}>Log out</li>
              </a>
            </ul>
          </div>
        </div>
      )}
      {!session && (
        <button onClick={handleSignIn} className={css.btnSignIn}>
          Sign In
        </button>
      )}
      {modalShown && modalId === "auth-modal" && (
        <Modal modalWidth={340} onCloseModal={handleCloseModal}>
          <AuthSwitcher />
        </Modal>
      )}
    </>
  );
};

export default UserMenu;
