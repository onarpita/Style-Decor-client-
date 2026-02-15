const Newsletter = () => {
    return (
        <div>
            <div className="card bg-base-300">
                <div className="card-body space-y-5 items-center py-20">
                    <h1 className="text-center font-semibold text-4xl">Subscribe to our Newsletter</h1>
                    <form className="w-full max-w-xl join">
                        <input className="input join-item w-full" placeholder="Email" />
                        <button className="btn join-item">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;