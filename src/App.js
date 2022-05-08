import React, {useState, useEffect} from "react";
import AlbumsList from "./components/Albums/AlbumsList";
import FavoritesList from "./components/Favorites/FavoritesList"

function App() {

  //Favorites and Text states
  const [idN,setidN]=useState(-1);
  const [searchTerm, setSearchTerm] = useState('')
  const [id,setIdFav]=useState(-1);
  const [Text, setText] = useState('')

  //load data
  const[dataalbums, setAlbums]=useState(null);
  const[dataphotos, setPhotos]=useState(null);
  const[data, setData]=useState(null);
  const[loading, setLoading]=useState(true);
  const [rerender, setRerender] = useState(false);

  //loading albums
  useEffect(()=>{
      fetch('http://jsonplaceholder.typicode.com/albums/?_limit=20')
        .then((response) => response.json())
        .then((json) => {
            setAlbums(json)
            console.log(json)
        });
   
  },[]);

  //loading photos
  useEffect(()=>{
        fetch('http://jsonplaceholder.typicode.com/photos/?_limit=20')
        .then((response) => response.json())
        .then((json) => { 
          setPhotos(json)
          console.log(json)
        });


  },[]);

  //building of the array data with all the albums and photos--->LocalStorage
  useEffect(()=>{
    if( loading && dataalbums && dataphotos){
      var check=localStorage.getItem("data")
      
      //caso nao tenha data posterior
      if(check){
        setLoading(false)
        setData(JSON.parse(check))
      }else{
        var array=[];
      
        for(let i=0; i< 20; i++){
          array.push(({
            id: dataalbums[i].id,
            title: dataalbums[i].title,
            url: dataphotos[i].url,
            fav: "No" 
          }));
        }
        localStorage.setItem("data",JSON.stringify(array))
        setLoading(false)
        setData(array)
        }
    }
  },[dataalbums,dataphotos]);

  //Change state of Favorites
  useEffect(()=>{
    if(id!=-1){
    for(let i=0;i<20;i++){
      if(id==data[i].id){
        if(data[i].fav=="No"){
          data[i].fav="Yes"
          localStorage.removeItem("data")
          localStorage.setItem("data",JSON.stringify(data))
          setRerender(!rerender);
        }else{
          data[i].fav="No"
          localStorage.removeItem("data")
          localStorage.setItem("data",JSON.stringify(data))
          setRerender(!rerender);
        }
      }
    }
    }
  },[id]);

  //Change state of Titles
  useEffect(()=>{
    if(Text!="" && idN!=-1){
      for(let i=0;i<20;i++){
        if(idN==data[i].id){
            data[i].title=Text
            localStorage.removeItem("data")
            localStorage.setItem("data",JSON.stringify(data))
            setRerender(!rerender);
        }
      }
    }
  },[idN,Text]);

  return (
    <div className="diva">
      {loading && <div>A moment please...</div>}

      {data && <div ><h1 className="titlefav">Favorites</h1>
      <div className="divb" ><FavoritesList onChangeText={(NewText)=>{setText(NewText)}} onChangeIDN={(NewIDN)=>{setidN(NewIDN)}}
      onChangeIdFav={(NewId)=>{setIdFav(NewId)}} 
      favorites={data}></FavoritesList></div>

      <h1 className="titleAlbums">Albums</h1> 
      <input className="inpsearch" type="text" placeholder="Search by title" onChange={event => {setSearchTerm(event.target.value)}}/>
      
      <div className="divc"><AlbumsList onChangeText={(NewText)=>{setText(NewText)}} onChangeIDN={(NewIDN)=>{setidN(NewIDN)}}
      onChangeIdFav={(NewId)=>{setIdFav(NewId)}} 
      albums={data.filter((value)=>{
        if(searchTerm ==""){
          return value;
        }else if(value.title.toLowerCase().includes(searchTerm.toLowerCase())){
          return value;
        }
      })}></AlbumsList></div>

      </div> }  
    </div>
  );
}

export default App;
