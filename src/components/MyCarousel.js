import React, { useState, useRef, useEffect} from 'react';
import OwlCarousel from 'react-owl-carousel2';
import CurrencyFormat from "react-currency-format";
import 'react-owl-carousel2/lib/styles.css'; 
import "../styles/MyCarousel.css"

function MyCarousel() {
    const [capitals, setCapitals] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        const getAllCountries = await fetch('https://restcountries.eu/rest/v2/all');
        const getCapitals = await getAllCountries.json();
        setCapitals(getCapitals);

    }

    const options = {
        items: 1,
        nav: true,
        loop:true,
        autoplay: true,
        autoplayHoverPause:true,
        dots: true,
        navText:["<",">"]
    };
     
    const events = {
        onDragged: function(event) {},
        onChanged: function(event) {}
    };
    const car = useRef();

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
    }

    console.log("this is images>>>>", capitals);
    return (
       <div>
           <OwlCarousel 
            ref={car} 
            options={options} 
            events={events}
           >
               {
                   capitals?.map(capital =>(
                       <div className="carousel__item" key={capital?.name}>
                           <div className="carousel__item--info">
                                <h1     className="carousel__item--title">  {capital?.name}
                                </h1>
                                <h2>{capital?.capital}</h2>
                                <p className="carousel__item--description">
                                    {capital?.subregion}
                                </p>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Population: {value}</h3>
                                    )}
                                    value={capital?.population}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                />
                           </div>

                           <div className="carousel__item--imageContainer">
                           <img  src={capital?.flag} alt="\"/>
                        </div>
                       </div>
                       
                   ))
               }
               
           </OwlCarousel>
       </div>
    )
}

export default MyCarousel
