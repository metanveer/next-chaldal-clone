import css from "./Stats.module.css";

const Stats = () => {
  return (
    <section className={css.statsSection}>
      <div className={css.content}>
        <img
          className={css.mapImage}
          src="/stats/chaldal_new_warehouses.webp"
          alt="Chaldal new warehouses"
        />
        <div className={css.statsWrapper}>
          <div className={css.statData}>Dhaka</div>
          <div className={css.statTitle}>Total Orders Placed</div>
          <div className={css.statData}>2469892</div>
          <div className={css.statTitle}>Total Savings</div>
          <div className={css.statData}>৳209,940,820</div>
          <div className={css.statTitle}>Time Saved</div>
          <div className={css.statData}>1,852,419 hrs</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
