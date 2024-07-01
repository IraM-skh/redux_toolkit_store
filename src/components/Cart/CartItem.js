import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { itemsInCartSliceActions } from "../../store/items-in-cart-slice";

const CartItem = (props) => {
    const { title, quantity, total, price } = props.item;
    const dispatchFun = useDispatch();
    const decremetHandler = () => {
        dispatchFun(itemsInCartSliceActions.decrementItem(title));
    };
    const incremetHandler = () => {
        dispatchFun(itemsInCartSliceActions.incrementItem(title));
    };
    return (
        <li className={styles.item}>
            <header>
                <h3>{title}</h3>
                <div className={styles.price}>
                    ${total.toFixed(2)}{" "}
                    <span className={styles["item-price"]}>
                        (${price.toFixed(2)} / шт.)
                    </span>
                </div>
            </header>
            <div className={styles.details}>
                <div className={styles.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={styles.actions}>
                    <button onClick={decremetHandler}>-</button>
                    <button onClick={incremetHandler}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
