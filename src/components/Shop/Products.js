import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const Products = (props) => {
    const allItemsArr = useSelector((state) => state.item.items);
    const itemsJsx = allItemsArr.map((item, index) => {
        return (
            <ProductItem
                key={item.title + index}
                title={item.title}
                price={item.price}
                description={item.description}
            />
        );
    });
    return (
        <section className={styles.products}>
            <h2>В нашем магазине товары самого высокого качества</h2>
            <ul>{itemsJsx}</ul>
        </section>
    );
};

export default Products;
