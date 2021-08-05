import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
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

const UserMenu = () => {
  const [session, loading] = useSession();

  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const dispatch = useDispatch();

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

  return (
    <>
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
              <Link href="/user/profile">
                <a>
                  <li className={css.listItem}>My Profile</li>
                </a>
              </Link>
              <Link href="/user/orders">
                <a>
                  <li className={css.listItem}>My Orders</li>
                </a>
              </Link>
              <Link href="/user/payment-history">
                <a>
                  <li className={css.listItem}>Payment History</li>
                </a>
              </Link>
              <Link href="/user/orders">
                <a>
                  <li className={css.listItem}>Your Orders</li>
                </a>
              </Link>
              <Link href="/user/change-password">
                <a>
                  <li className={css.listItem}>Change Password</li>
                </a>
              </Link>
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
