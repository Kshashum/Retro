import React from 'react'
import './Home.css'
import Product from './Product'
const Home = () => {
    return (
        <div className="home">
            <div className="home_container">
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonMusic/2021/Marketing/EvergreenFree_DMUX-4110/Gateway/DV3A/US-EN_030121_FreeTierQ1Refresh_ACQ_GW_Hero_D_3000x1200_CV3._CB655482702_.jpg" alt="background" className="home_image"/>
            <div className="home_row">
                <Product name={"Transformers DVD"}
                productid={1500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
                <Product name={"Transformers DVD"}
                productid={2500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
                <Product name={"Transformers DVD"}
                productid={3500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            </div>
            <div className="home_row">
            <Product name={"Transformers DVD"}
                productid={4500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            <Product name={"Transformers DVD"}
                productid={5500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            <Product name={"Transformers DVD"}
                productid={6500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            <Product name={"Transformers DVD"}
                productid={7500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            </div>
            <div className="home_row">
            <Product name={"Transformers DVD"}
                productid={8500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            <Product name={"Transformers DVD"}
                productid={9500}
                shortDescription={"Transformers: Revenge of the Fallen: Two-Movie Mega Collection [2 Discs] - Wproductidescreen - DVD"}
                price={"175"}
                />
            </div>
            </div>
        </div>
    )
}

export default Home
