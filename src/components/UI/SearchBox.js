import styles from "./SearchBox.module.css";
import lente from "../Images/magn_glass.png";

function SearchBox(props){
    return(
        <div className={styles.wrap_search_box}>
            <input onChange={props.onChange} className={styles.search_box} placeholder="Cerca"></input>
            <img className={styles.lente} src={lente} alt="lente_ingrandimento"></img>
        </div>
    );
}

export default SearchBox;