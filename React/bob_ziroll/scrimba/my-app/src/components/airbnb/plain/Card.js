import cardImage from "../../../images/star.png";

const Card = (props) => {
  const {img, name, rating, reviewCount, location, title, price, uom, 
    openSpots} = props;
  const badgeText = openSpots === 0 
    ? "SOLD OUT" 
    : location === "Online"
      ? "ONLINE"
      : null
  return (
    <div className="card">
      {badgeText && <div className="card--badge">{badgeText}</div>}
      <img src={`../../images/${img}`} alt={name} className="card--image" />
      <div className="card--stats">
        <img src={cardImage} alt="Star" className="card--star" /> 
        <span>{rating}</span>
        <span className="gray">({reviewCount}) ⠂</span>
        <span className="gray">{location}</span>
      </div> 
      <p>{title}</p>
      <p><span className="bold">From ${price}</span> / {uom}</p>
    </div>
  )
};

export default Card;