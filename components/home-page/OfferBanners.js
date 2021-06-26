import Link from "next/link";
import css from "./OfferBanners.module.css";

function OfferBanners() {
  return (
    <section className={css.offerBanner}>
      <Link href="/popular">
        <a>
          <div>
            <img className={css.imageA} src="/home-banners/offerImage1.webp" />
          </div>
        </a>
      </Link>
      <Link href="/fresh-fruit">
        <a>
          <div>
            <img className={css.imageB} src="/home-banners/offerImage2.webp" />
          </div>
        </a>
      </Link>
    </section>
  );
}

export default OfferBanners;