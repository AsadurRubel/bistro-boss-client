
const FoodCard = ({item}) => {
    const {image, name, price, recipe} = item;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Image" /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-5 mt-5 px-2 rounded-lg">$: {price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;