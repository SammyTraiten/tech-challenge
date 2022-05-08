import React, {useState, useEffect} from "react";
import classes from './AlbumsItem.module.css'
import Icon from '../Icon/Icon'

function AlbunsItem(props){

    const [Text, setText] = useState('')

    //change title
    useEffect(()=>{
        props.setname(Text)
        props.setIDN(props.id)
    },[Text])

    return <li className={classes.diva} >
        <div>
           <input className={classes.inp} type="text" placeholder={props.title} onChange={event => {setText(event.target.value)}}/>
           <button className={classes.btn} onClick={()=>props.onChangeFav(props.id)}><Icon fav={props.fav}></Icon></button>
           
        </div>
        <div>
            <img className={classes.image} src={props.url} alt={props.title}/>
        </div>
    </li>
}

export default AlbunsItem;