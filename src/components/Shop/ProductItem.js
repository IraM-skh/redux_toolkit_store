import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { itemsInCartSliceActions } from "../../store/items-in-cart-slice";
import { useDispatch } from "react-redux";
const ProductItem = (props) => {
    const dispatchFun = useDispatch();
    const { title, price, description } = props;

    const addItemInCartHandler = () => {
        dispatchFun(
            itemsInCartSliceActions.addItem({
                title,
                price,
                amount: 1,
            })
        );
    };
    return (
        <li className={styles.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={styles.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={styles.actions}>
                    <button onClick={addItemInCartHandler}>
                        Добавить в Корзину
                    </button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
