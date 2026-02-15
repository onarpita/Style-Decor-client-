import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-300 p-10">
            <div>
                <img src={logo} className="w-10" />
                <h3 className="text-3xl font-semibold">Style Decor</h3>
            </div>
            <div>
                <h3 className="text-3xl font-semibold">Get in touch</h3>
                <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                <p><strong>Phone:</strong> +8801963836103</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Link to="https://facebook.com">
                    <FaFacebookF size={20} />
                </Link>
                <Link to="https://x.com">
                    <FaXTwitter size={20} />
                </Link>
                <Link to="https://instagram.com">
                    <FaInstagram size={20} />
                </Link>
                <Link to="https://youtube.com">
                    <FaYoutube size={20} />
                </Link>
            </div>
            <div>
                <p><strong>Business Working Hours:</strong> 9:00 am - 2:00 pm, 4:00 pm - 11:00 pm</p>
                <p>&copy; {new Date().getFullYear()} All rights reserved by Style Decor</p>
            </div>
        </footer>
    );
};

export default Footer;