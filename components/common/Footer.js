import Image from "next/image";
import Link from "next/link";
import StoreBadges from "../common/StoreBadges";
import css from "./Footer.module.css";
import {
  logo,
  phoneIcon,
  deliMethods,
  paymentMethods,
  socialMethods,
} from "../../data/footerData";

const Footer = () => {
  return (
    <footer>
      <section className={css.footerRowOne}>
        <div className={css.rowOneContent}>
          <Image
            src={deliMethods.oneHour}
            alt="1 hour delivery"
            width={40}
            height={40}
          />
          <p>1 hour delivery</p>

          <Image
            src={deliMethods.cashOnDelivery}
            alt="Cash on delivery"
            width={40}
            height={40}
          />
          <p>Cash on delivery</p>
        </div>
        <div className={css.rowOneContent}>
          <p>Pay with</p>
          {paymentMethods.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
            />
          ))}
        </div>
      </section>
      <section className={css.footerRowTwo}>
        <div className={css.rowTwoLeft}>
          <div className={css.logo}>
            <img src={logo} alt="Chaldal Logo" />
          </div>
          <article className={css.aboutChaldal}>
            Chaldal.com is an online shop in Dhaka, Bangladesh. We believe time
            is valuable to our fellow Dhaka residents, and that they should not
            have to waste hours in traffic, brave bad weather and wait in line
            just to buy basic necessities like eggs! This is why Chaldal
            delivers everything you need right at your door-step and at no
            additional cost.
          </article>
          <div className={css.footerLinks}>
            <div className={css.Links}>
              <div className={css.footerLinksHeading}>Customer Service</div>
              {/* <Link>Contact Us" to={`/t/contact-us`} /> */}
              <Link href="/t/contact-us">
                <a className={css.textLink}>Contact Us</a>
              </Link>
              <Link href="/t/help">
                <a className={css.textLink}>FAQ</a>
              </Link>
            </div>
            <div className={css.Links}>
              <div className={css.footerLinksHeading}>About Chaldal</div>
              <Link href="/t/privacy">
                <a className={css.textLink}>Privacy Policy</a>
              </Link>
              <Link href="/t/terms">
                <a className={css.textLink}>Terms of Use</a>
              </Link>
            </div>
            <div className={css.Links}>
              <div className={css.footerLinksHeading}>For Business</div>
              <Link href="/corporate">
                <a className={css.textLink}>Corporate</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={css.rowTwoRight}>
          <StoreBadges mountedAt="footer" />
          <div className={css.hotLine}>
            <img src={phoneIcon} alt="Make a phone call to chaldal hotline" />
            <span className={css.phoneNumber}>0188-1234567</span>
          </div>
          <div className={css.hotEmail}>
            <span className={css.emailText}>or email</span>
            <span className={css.email}>support@chaldal.com</span>
          </div>
          <div className={css.socialIcons}>
            {socialMethods.map((item, index) => (
              <a
                className={css.socialIconLink}
                href={item.link}
                target="_blank"
                key={index}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={35}
                  height={35}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
