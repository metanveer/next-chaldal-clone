import Link from "next/link";
import css from "./dot-menu-item.module.css";

const DotMenuItem = ({ to, menuIcon, text, noLink, onClick }) => {
  if (noLink) {
    return (
      <span onClick={onClick}>
        <li className={css.listItemModal}>
          <span className={css.listIconModal}>{menuIcon}</span>
          <span>{text}</span>
        </li>
      </span>
    );
  }

  return (
    <Link href={to}>
      <a>
        <li className={css.listItemModal}>
          <span className={css.listIconModal}>{menuIcon}</span>
          <span>{text}</span>
        </li>
      </a>
    </Link>
  );
};

export default DotMenuItem;
