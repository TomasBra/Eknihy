import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { About } from '../../components/Homepage/About';
import { BestSeller } from '../../components/Homepage/BestSeller';
import { Carousel } from '../../components/Homepage/Carousel';
import { News } from '../../components/Homepage/News';

export function Homepage() {
    return (
        <div>
            <Carousel></Carousel>
            <div className="container-md" >
                <About />
                <News></News>
                <BestSeller></BestSeller>
            </div>
        </div>);
}