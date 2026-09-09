import Link from 'next/link';

export default function CategoryCard({ category }) {
  const isLarge = category.size === 'large';

  return (
    <Link
      href={`/shop?category=${category.id}`}
      className={`bento-card ${isLarge ? 'bento-card--large' : ''}`}
    >
      <div className="bento-card__overlay" />
      {category.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={category.image} alt={category.name} />
      )}
      <div className="bento-card__content">
        <h3 className="bento-card__title">{category.name}</h3>
        {isLarge && category.description && (
          <p className="bento-card__subtitle">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
