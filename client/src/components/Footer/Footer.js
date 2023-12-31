import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone,faEnvelope,faLocationDot } from "@fortawesome/free-solid-svg-icons"
import "./Footer.css"

function Footer(props) {
    return (
        <div className="footer-container">
            
        <div className="details-container">
            <ul>
                <li><p>Privacy Policy</p></li>
                <li><p>Terms and Conditions</p></li>
                <li><p>Returns and Exchanges</p></li>
                <li><p>Frequently Asked Questions</p></li>
                <li><p>Shipping Information</p></li>
                <li><p>Customer Support</p></li>
            </ul>
        </div>

        <div className="location-container">
            <h3>Our Location</h3>
            <div>
            <iframe className="frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11743.979157381971!2d25.374830250060413!3d42.61906650953431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a85581c598de43%3A0x1d21c72b69a82965!2z0KbQtdC90YLRitGAINCa0LDQt9Cw0L3Qu9GK0Lo!5e0!3m2!1sbg!2sbg!4v1689675484767!5m2!1sbg!2sbg" style={{ width: "600px", height: "450px", border: "0",loading:"lazy" ,referrerPolicy:"no-referrer-when-downgrade"}} allowFullScreen=""  ></iframe>
            </div>
        </div>

        <div className="contact-container">
            <h3>Contact Details</h3>
            <p> <FontAwesomeIcon icon={faPhone} className="icon" /> + 359 123 456 789</p>
            <p> <FontAwesomeIcon icon={faEnvelope} className="icon" /> myWatchShop1234@gmail.com</p>
            <p> <FontAwesomeIcon icon={faLocationDot} className="icon" /> str: my street №3,Kazanlak,Bulgaria</p>
        </div>

        <div className="rights-container">
            <p>All Rights Reserved</p>
            <p>CompanyName &copy; 2023</p>
        </div>

        </div>
    )
}

export default Footer