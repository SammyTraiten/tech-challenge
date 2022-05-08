import star from '../../Images/star.png'
import Blackstar from '../../Images/Blackstar.png'

function Icon(props){
    if(props.fav==="Yes"){
        return  <img alt="star" type="image" src={star} height="40" width="40"/>
    }else{
        return  <img alt= "blackstar" type="image" src={Blackstar} height="40" width="40"/>
    }
    
}

export default Icon;