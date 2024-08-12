type ProductCardProps = {
  brand: string;
  name: string;
  price: string;
  imageLink: string;
  rating: number | null;
  description: string;
};

const ProductCard = ({
  brand,
  name,
  price,
  imageLink,
  rating,
}: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 transition hover:shadow-lg hover:bg-gray-100 rounded-2xl p-4 w-64 h-96 flex flex-col">
      <img
        className="h-40 w-full object-cover rounded-lg mb-4"
        src={imageLink}
        alt="Product"
      />
      <h3 className="text-lg font-medium">{name}</h3>
      <span className="text-sm text-gray-500">{brand}</span>
      <span className="text-lg font-bold mt-2">Price: {price}</span>
      {rating && (
        <span className="text-sm font-medium text-yellow-500">
          Rating: {rating}
        </span>
      )}
    </div>
  );
};

export default ProductCard;
