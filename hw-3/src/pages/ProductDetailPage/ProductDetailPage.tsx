import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "@/features/products";
import { Loader } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading) return <Loader />;

  if (isError || !product) {
    return (
      <div className="product-detail__error">
        <p>{t("errors.apiError")}</p>
        <Link to={ROUTES.PRODUCTS}>{t("products.backToList")}</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to={ROUTES.PRODUCTS} className="product-detail__back">
        ← {t("products.backToList")}
      </Link>

      <div className="product-detail__content">
        <div className="product-detail__gallery">
          <img
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            className="product-detail__main-image"
          />
          {product.images.length > 1 && (
            <div className="product-detail__thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="product-detail__thumb"
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <span className="product-detail__category">{product.category}</span>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__rating">
            ⭐ {product.rating.toFixed(1)}
          </div>

          <div className="product-detail__price-block">
            <span className="product-detail__price">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="product-detail__discount">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__meta">
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">
                {t("products.brand")}
              </span>
              <span className="product-detail__meta-value">
                {product.brand || "—"}
              </span>
            </div>
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">
                {t("products.stock")}
              </span>
              <span className="product-detail__meta-value">
                {product.stock}
              </span>
            </div>
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">
                {t("products.category")}
              </span>
              <span className="product-detail__meta-value">
                {product.category}
              </span>
            </div>
          </div>

          {product.reviews.length > 0 && (
            <div className="product-detail__reviews">
              <h3>Reviews ({product.reviews.length})</h3>
              {product.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="product-detail__review">
                  <div className="product-detail__review-header">
                    <strong>{review.reviewerName}</strong>
                    <span>{"⭐".repeat(Math.round(review.rating))}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
