const DecoratorCard = ({decorator}) => {
    return (
        <div className="card bg-base-200 border border-neutral-300">
            <div className="card-body">
                <h2 className="card-title">{decorator.displayName}</h2>
            </div>
        </div>
    );
};

export default DecoratorCard;