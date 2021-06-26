import css from "./StoreBadges.module.css";

const StoreBadges = ({ mountedAt }) => {
  return (
    <div className={css.storeBadges}>
      <a
        href="https://play.google.com/store/apps/details?id=com.chaldal.poached"
        target="_blank"
      >
        <img
          className={css.playStore}
          src="/get-app/play_store.svg"
          alt="Get it on GooglePlay Store"
        />
      </a>
      <a
        href="https://apps.apple.com/us/app/chaldal/id1104493220"
        target="_blank"
      >
        <img
          className={css.appleStore}
          src="/get-app/app_store.svg"
          alt="Get it on Apple app store"
        />
      </a>
    </div>
  );
};

export default StoreBadges;
