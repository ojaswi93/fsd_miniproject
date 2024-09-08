import React from 'react';
import logopic from "./assets/logo.png";

function HomePage() {
  return (
    <div>
        <div id="header">
            <img id="logo" src={logopic} alt="Logo" />
            <div id="header-container">
                <p id="header-text1">Worksapp</p>
                <p id="header-text2">Where work finds you</p>
            </div>
        </div>

        <div id="main-content2">
            <div className="navbartabs">
                <a href="#">
                <button className="tablink">Company Registration</button>
                </a>
                <a href="#">
                <button className="tablink">Worker Registration</button>
                </a>
                <a href="#">
                <button className="tablink">Login</button>
                </a>
            </div>

            <div className="homecontent">
                <h1>About us</h1>
                <p> WorksApp is dedicated to empowering unskilled laborers by connecting
                    them with short-term job opportunities that match their skills and
                    availability. Our platform bridges the gap between workers and
                    businesses in need of temporary help, making the job search process
                    simple and accessible.
                </p>
                <p> Connecting Startups with Short-term Labor: The platform will act as a
                    medium for startups to find unskilled labor for short-term tasks that
                    do not require formal education.
                </p>
                <p> Providing Income Opportunities for Daily Wage Workers: The website
                    will offer a means of income for individuals who depend on daily
                    wages. By providing a platform where these workers can find and access
                    short-term job opportunities, the website will help improve their
                    livelihood. This is particularly beneficial for those whose earnings
                    are inconsistent and rely heavily on daily job availability.
                </p>
            </div>
        </div>
    </div>
    );
}

export default HomePage;