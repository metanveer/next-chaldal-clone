import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import css from "./user-menu.module.css";

import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { setCurrentUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
    dispatch(setCurrentUser(null));
  };

  return (
    <>
      <div className={css.dropdown}>
        <Link href="/customer/profile">
          <a className={css.dropbtn}>
            <span className={css.userIcon}>
              <FaUser />
            </span>
            <span className={css.userName}>{user.name || user.email}</span>
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
    </>
  );
};

export default UserMenu;
