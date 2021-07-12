import Link from "next/link";
import { useRouter } from "next/router";
import Highlighter from "react-highlight-words";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import css from "./MenuItem.module.css";

const MenuItem = ({
  name,
  id,
  activeId,
  icon,
  setActiveId,
  slug,
  containsProducts,
}) => {
  const router = useRouter();
  const { value } = useSelector((state) => state.search);

  const activeStyle = router.asPath === `/${slug}` && css.active;

  const searchWords = value.split(" ");

  return (
    <Link href={`/${slug}`}>
      <a>
        <li onClick={setActiveId} className={css.child}>
          {icon && <img className={css.iconPrimary} src={icon} alt={name} />}
          <div className={`${css.name} ${activeStyle}`}>
            <Highlighter
              highlightClassName={css.highlighted}
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={name}
            />
          </div>
          {!containsProducts && (
            <div className={css.rightArrow}>
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
