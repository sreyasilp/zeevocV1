import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed for notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for react-toastify
import emailjs from 'emailjs-com'; // Import emailjs

const Result = () => {
    return (
        <p className="success-message">Your Message has been successfully sent. We will contact you soon.</p>
    )
}

function ContactForm() {
    const [result, setResult] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        // Send the email using emailjs
        emailjs.sendForm('zeevoc', 'template_k6mon96', e.target, '59RTopnOo-s5UtUft')
           .then((result) => {
                // window.location.reload(); // Reload the page after successful form submission
                toast.success('Message Sent Successfully');
                setResult(true);
            }, (error) => {
                console.log(error.text);
                toast.error('Failed to Send Message');
            });
    };

    setTimeout(() => {
        setResult(false);
    }, 5000);

    return (
        <form action="" onSubmit={sendEmail}>
            <div className="rn-form-group">
                <input 
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="email"
                name="from_email"
                placeholder="Your Email"
                required
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="text"
                name="from_phone"
                placeholder="Phone Number"
                required
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="text"
                name="from_subject"
                placeholder="Subject"
                required
                />
            </div>
            
            <div className="rn-form-group">
                <textarea 
                name="message"
                placeholder="Your Message"
                required
                >
                </textarea>
            </div>

            <div className="rn-form-group">
                <button className="rn-contact-button-style btn-solid" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Submit Now</button>
            </div> 

            <div className="rn-form-group">
                {result? <Result /> : null}
            </div> 
        </form>
    )
}

export default ContactForm;
