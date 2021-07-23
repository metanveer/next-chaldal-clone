import React from "react";
import styles from "./sidebar-special.module.css";
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
          <span className={styles.itemName}>{itemName}</span>
          {offersCount && <span className={styles.offer}>{offersCount}</span>}
        </li>
      </a>
    </Link>
  );
};

export default SideBarSpecial;
