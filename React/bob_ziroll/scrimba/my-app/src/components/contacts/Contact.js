import phoneIcon from '../../images/phone-icon.svg'
import mailIcon from '../../images/mail-icon.svg'

const Contact = (props) => {
  const {img, name, phone, email} = props;
  const available = [
    {not: "mr-whiskerson.png", got: "Sport-02.jpg"},
    {not: "fluffykins.png", got: "Sport-03.jpg"},
    {not: "felix.png", got: "Sport-05.jpg"},
    {not: "pumpkin.png", got: "Sport-06.jpg"}
  ]

  const imgCheck = '../../images/' +
    available.filter(d => (d.not === img.split('/').pop()))[0].got;

  return (
    <div className="contact-card">
      <img src={imgCheck} alt={name} />
      <h3>{name}</h3>
      <div className="info-group">
        <img src={phoneIcon} alt="phone-icon" />
        <p>{phone}</p>
      </div>
      <div className="info-group">
        <img src={mailIcon} alt="mail-icon" /> 
        <span>{email}</span>
      </div>
    </div>
  );
};

export default Contact;