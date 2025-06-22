import SHOP_DATA from "../../data/shop";
import CollectionPreview from "../../components/collection-preview/collection-preview";

const ShopPage = () => {
  return (
    <>
      <div>
        {SHOP_DATA.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;
