import classes from './FavoritesItem.module.css'
import React, {useState, useEffect} from "react";

function FavoritesItem(props){
    const [Text, setText] = useState('')

    //change title
    useEffect(()=>{
        props.setname(Text)
        props.setIDN(props.id)
    },[Text])

    return <li className={classes.diva}>
            <img align="left" className={classes.image} src={props.url} alt={props.title}/>
            <input className={classes.inp}  type="text" placeholder={props.title} onChange={event => {setText(event.target.value)}}/>
            <button className={classes.btn} onClick={()=>props.onChangeFav(props.id)}>Not Favorite</button>
            </li>;
}

export default FavoritesItem;