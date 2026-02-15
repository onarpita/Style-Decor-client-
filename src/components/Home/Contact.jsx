const Contact = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-center text-4xl font-semibold">Contact Us</h2>
            <form className="w-full max-w-3xl space-y-4 mx-auto">
                <input name="name" className="input w-full" placeholder="Name" />
                <input name="email" className="input w-full" placeholder="Email" />
                <input name="subject" className="input w-full" placeholder="Subject" />
                <textarea name="message" className="textarea w-full resize-none" rows={5} placeholder="Write your message"></textarea>
                <button className="btn btn-primary text-black">Send</button>
            </form>
        </div>
    );
};

export default Contact;