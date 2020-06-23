import React from "react";
import './footer.css';

import githubLogo from "../../assets/iconmonstr-github-3.svg";
import twitterLogo from "../../assets/icons8-twitter.svg";
import linkedInLogo from "../../assets/iconmonstr-linkedin-3.svg";

function Footer () {

    return (
        <div className="footerContainer">
            <div className="creatorSection">
                <div className=" section info">
                    Built by:
                </div>
                <div className="section sectionOne">
                    <div className="name">
                        Jon Hill
                    </div>
                    <div className="socialSection">
                        <a href="https://github.com/jondhill333" target="_blank" className="logo githubLogo">
                            <img src={githubLogo} />
                        </a>
                        <a href="https://twitter.com/jon_hill33"  target="_blank" className="logo twitterLogo">
                            <img src={twitterLogo} />
                        </a>
                        <a href="https://www.linkedin.com/in/jonathan-hill-1b293339/"  target="_blank"  className="logo linkedInLogo">
                            <img src={linkedInLogo} />
                        </a>
                    </div>
                </div>
                <div className="section sectionTwo">
                <div className="name">
                    Marco Ruggeri
                </div>
                    <div className="socialSection">
                    <a href="https://github.com/marcoruggeri"  target="_blank" className="logo githubLogo"><img src={githubLogo}></img></a>
                    </div>
                </div>
            </div>

            <div className="attributeSection">
            <div className="roundIcons">Icons made by 
                <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from 
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            <div>Twitter icon icon by Icons8</div>

            </div>
        </div>
    )

}

export default Footer;