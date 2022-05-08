import React, {useState, useEffect} from "react";
import AlbumsItem from './AlbumsItem'
import classes from './AlbumsList.module.css'

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
            {props.albums.map(album => <AlbumsItem
            setIDN={(IDN)=>{setidN(IDN)}}
            setname={(NText)=>{setText(NText)}}
            onChangeFav={(NewId)=>{setId(NewId)}}
            key={album.id}
            id={album.id}
            url={album.url}
            fav={album.fav}
            title={album.title}
            ></AlbumsItem>)}
        </ul>
    );
}

export default AlbunsList;