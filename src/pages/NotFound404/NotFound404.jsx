const NotFound404 = () => {
    return (
        <div className="px-6 py-10 flex flex-col justify-center items-center text-center space-y-4 min-h-screen bg-base-300">
            <title>Page Not Found</title>
            <h2 className="text-8xl text-primary font-extrabold">404</h2>
            <h3 className="text-4xl font-semibold text-secondary">Page Not Found</h3>
            <p className="text-neutral-600 text-xl">The page you are looking for doesn't exist.</p>
        </div>
    );
};

export default NotFound404;