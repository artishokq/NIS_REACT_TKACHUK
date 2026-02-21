import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { Product } from "../model/types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({
  product,
}: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="product-card__discount">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__category">
          {t("products.category")}: {product.category}
        </p>
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <span className="product-card__rating">
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
});
