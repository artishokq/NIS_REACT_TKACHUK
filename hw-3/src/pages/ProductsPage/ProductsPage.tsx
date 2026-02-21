import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "@/features/products";
import { selectPageSize } from "@/features/settings";
import { ProductCard } from "@/entities/product";
import { Loader } from "@/shared/ui";
import "./ProductsPage.css";

export default function ProductsPage() {
  const { t } = useTranslation();
  const pageSize = useSelector(selectPageSize);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  const skip = (currentPage - 1) * pageSize;

  const { data, isLoading, isError } = useGetProductsQuery({
    limit: pageSize,
    skip,
    q: searchQuery || undefined,
  });

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.total / pageSize);
  }, [data, pageSize]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params: Record<string, string> = { page: "1" };
      if (searchInput.trim()) {
        params.q = searchInput.trim();
      }
      setSearchParams(params);
    },
    [searchInput, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params: Record<string, string> = { page: String(page) };
      if (searchQuery) {
        params.q = searchQuery;
      }
      setSearchParams(params);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchQuery, setSearchParams],
  );

  const paginationButtons = useMemo(() => {
    const buttons: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }
    return buttons;
  }, [currentPage, totalPages]);

  return (
    <div className="products-page">
      <h1 className="products-page__title">{t("products.title")}</h1>

      <form className="products-page__search" onSubmit={handleSearch}>
        <input
          type="text"
          className="products-page__search-input"
          placeholder={t("products.searchPlaceholder")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="products-page__search-btn">
          {t("common.search")}
        </button>
      </form>

      {isLoading && <Loader />}

      {isError && (
        <div className="products-page__error">
          <p>{t("errors.apiError")}</p>
        </div>
      )}

      {data && data.products.length === 0 && (
        <div className="products-page__empty">
          <p className="products-page__empty-icon">📭</p>
          <p>{t("products.noProducts")}</p>
        </div>
      )}

      {data && data.products.length > 0 && (
        <>
          <div className="products-page__grid">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="products-page__pagination">
              <button
                className="products-page__page-btn"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ←
              </button>

              {paginationButtons.map((page) => (
                <button
                  key={page}
                  className={`products-page__page-btn ${
                    page === currentPage
                      ? "products-page__page-btn--active"
                      : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="products-page__page-btn"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                →
              </button>

              <span className="products-page__page-info">
                {t("products.page")} {currentPage} {t("products.of")}{" "}
                {totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
