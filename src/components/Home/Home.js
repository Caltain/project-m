import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="homeView">

        
            <h3>Wellcome to the world of furniture!</h3>
          
            <p className="img"><img src={"https://media.istockphoto.com/photos/modern-living-room-interior-3d-render-picture-id1293762741?b=1&k=20&m=1293762741&s=170667a&w=0&h=2RI8SmBN4MrEZuTvdwRzaeB887x-dukFcQBpyQ-qwS4="} /></p>
            <Link className="button" to={"/catalog"}>See more offers at the our catalog</Link>


        
        </div>
    )
}

export default Home;