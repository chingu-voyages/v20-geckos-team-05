import React from "react";
import './footer.css';

import githubLogo from "../../assets/iconmonstr-github-3.svg";
import twitterLogo from "../../assets/icons8-twitter.svg";
import linkedInLogo from "../../assets/iconmonstr-linkedin-3.svg";

function Footer ({footerColor}) {

    return (
        <div className="footerContainer" style={{background: `${footerColor}`, transition: "background 1s ease-in-out",}}>
            <div className="creatorSection">
                <div className=" section info">
                    Built by:
                </div>
                <div className="section sectionOne">
                    <div className="name">
                        Jon Hill
                    </div>
                    <div className="socialSection">
                        <a className="logo githubLogo" 
                            href="https://github.com/jondhill333" 
                            target="_blank"  
                            rel="noopener noreferrer"
                        >
                            <img src={githubLogo} alt="Jon-Hill-github-page-link-logo"/>
                        </a>
                        <a href="https://twitter.com/jon_hill33"  
                           target="_blank"  rel="noopener noreferrer"
                           className="logo twitterLogo"
                        >
                            <img src={twitterLogo} alt="Jon-Hill-twitter-page-link-logo" />
                        </a>
                        <a href="https://www.linkedin.com/in/jonathan-hill-1b293339/"  
                            target="_blank"  rel="noopener noreferrer" 
                            className="logo linkedInLogo"
                        >
                            <img src={linkedInLogo} alt="Jon-Hill-linkedIn-page-link-logo"/>
                        </a>
                    </div>
                </div>
                <div className="section sectionTwo">
                <div className="name">
                    Marco Ruggeri
                </div>
                    <div className="socialSection">
                    <a href="https://github.com/marcoruggeri"  
                       target="_blank"  rel="noopener noreferrer" 
                       className="logo githubLogo"
                    >
                        <img src={githubLogo} alt="Marco-Ruggeri-github-page-link-logo"/>
                    </a>
                    </div>
                </div>
            </div>

            <div className="attributeSection">
            <div className="roundIcons">Icons made by 
                <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons"> Roundicons</a> from 
                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
            <div>Twitter icon icon by Icons8</div>

            </div>
        </div>
    )

}

export default Footer;