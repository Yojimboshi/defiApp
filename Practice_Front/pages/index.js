import React from 'react';

//importing
import Style from '../styles/index.module.css';
import { HeroSection, Service, BigNFTSilder, Title, Category, NFTCard } from '../components/ComponentsIndex';

const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSilder />
            {/* <Title 
                heading="Browse by category"
                paragraph="Explore the NFTs in the most featured categories."
            />
            <Category /> */}
            <NFTCard />
        </div>
    );
};

export default Home;