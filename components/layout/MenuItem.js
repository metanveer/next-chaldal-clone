import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./MenuItem.module.css";

const MenuItem = ({
  name,
  id,
  activeId,
  icon,
  setActiveId,
  slug,
  containsProducts,
}) => {
  return (
    <Link href={`/${slug}`}>
      <a>
        <li onClick={setActiveId} className={styles.child}>
          {icon && <img className={styles.iconPrimary} src={icon} alt={name} />}
          <div>
            {id}_{name}
          </div>
          {!containsProducts && (
            <div className={styles.rightArrow}>
              {activeId === id ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </div>
          )}
        </li>
      </a>
    </Link>
  );
};

export default MenuItem;
