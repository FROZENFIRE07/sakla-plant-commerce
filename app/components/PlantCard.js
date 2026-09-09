import Link from 'next/link';

export default function PlantCard({ plant, variant = 'shop' }) {
  const isHome = variant === 'home';

  if (isHome) {
    return (
      <Link href={`/shop/${plant.id}`} className={`plant-card plant-card--home`}>
        <div className="plant-card__image">
          {plant.tags?.[0] && (
            <div className="plant-card__tags">
              <span className="tag">{plant.tags[0]}</span>
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={plant.image} alt={plant.name} />
        </div>
        <div className="plant-card__body">
          <div>
            <h4 className="plant-card__name" style={{ fontSize: '18px' }}>{plant.name}</h4>
            <p className="plant-card__scientific" style={{ marginBottom: '4px' }}>{plant.shortDesc}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="plant-card__price" style={{ marginLeft: 0, color: 'var(--color-primary)' }}>
              ₹{plant.price.toLocaleString('en-IN')}
            </span>
            <span className="plant-card__add-btn">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shop/${plant.id}`} className="plant-card">
      <div className="plant-card__image">
        {plant.tags?.length > 0 && (
          <div className="plant-card__tags">
            {plant.tags.slice(0, 1).map(tag => (
              <span key={tag} className="tag" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plant.image} alt={plant.name} />
      </div>
      <div className="plant-card__body">
        <div>
          <div className="plant-card__header">
            <h3 className="plant-card__name">{plant.name}</h3>
            <span className="plant-card__price">₹{plant.price.toLocaleString('en-IN')}</span>
          </div>
          <p className="plant-card__scientific">{plant.scientificName}</p>
          {plant.careIcons?.length > 0 && (
            <div className="plant-card__care-icons">
              {plant.careIcons.map(icon => (
                <div key={icon} className="plant-card__care-icon">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="plant-card__cta">View Details</button>
      </div>
    </Link>
  );
}
