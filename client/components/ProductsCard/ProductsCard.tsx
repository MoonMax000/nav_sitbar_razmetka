const ProductsCard = () => (
  <div className="container-card p-6">
    <h3 className="text-lg font-semibold text-white">Products</h3>
    <div className="mt-4 grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg bg-moonlessNight p-4 text-center">
          <div className="mx-auto h-16 w-16 rounded-lg bg-primary/20"></div>
          <p className="mt-2 text-sm text-white">Product {i}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ProductsCard;
