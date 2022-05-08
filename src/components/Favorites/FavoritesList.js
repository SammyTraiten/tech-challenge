import FavoritesItem from './FavoritesItem'
import classes from './FavoritesList.module.css'
import React, {useState, useEffect} from "react";

function AlbunsList(props){
    const [idN,setidN]=useState(-1);
    const [id,setId]=useState(-1);
    const [Text, setText] = useState('');

    //change Fav
    useEffect(()=>{
        props.onChangeIdFav(id)
    },[id]);

    //changeTitle
    useEffect(()=>{
        props.onChangeText(Text)
        props.onChangeIDN(idN)
    },[idN,Text]);

    return (
        <ul className={classes.list}>
            {props.favorites.filter(favorite => favorite.fav != "No").map(favoriteFilter => <FavoritesItem
            setIDN={(IDN)=>{setidN(IDN)}}
            setname={(NText)=>{setText(NText)}}
            onChangeFav={(NewId)=>{setId(NewId)}}
            key={favoriteFilter.id}
            id={favoriteFilter.id}
            url={favoriteFilter.url}
            title={favoriteFilter.title}
            ></FavoritesItem>)}
        </ul>
    );
}

export default AlbunsList;