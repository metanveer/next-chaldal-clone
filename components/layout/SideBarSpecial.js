import React from "react";
import styles from "./SideBarSpecial.module.css";
import Link from "next/link";
import nameToUrl from "../../utils/name-to-url";

const SideBarSpecial = ({
  offersCount = null,
  itemName = "Health & Beauty",
}) => {
  return (
    <Link href={`/${nameToUrl(itemName)}`}>
      <a>
        <li className={styles.sideBarItem}>
          <div className={styles.itemName}>{itemName}</div>
          {offersCount && <div className={styles.offer}>{offersCount}</div>}
        </li>
      </a>
    </Link>
  );
};

export default SideBarSpecial;
