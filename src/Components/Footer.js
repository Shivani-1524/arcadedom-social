import React from 'react'
import { faCodeBranch, faLinkedin, FontAwesomeIcon, faMedium, faTwitter } from '../Assets/icons/icons'


const Footer = () => {
    return (
        <footer className="docs-footer white-bg">
            <p className="sm-p mg-t-15">Made with 💖 by Shivani</p>
            <div className="flex-row  mg-t-10">
                <a target="_blank" rel="noreferrer" href="https://twitter.com/Shivani07517015">
                    <FontAwesomeIcon icon={faTwitter} className="btn icon-btn" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://medium.com/@shivanipothirajan">
                    <FontAwesomeIcon icon={faMedium} className="btn icon-btn" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shivani-pothirajan-2b276996/">
                    <button className="btn icon-btn">
                        <FontAwesomeIcon icon={faLinkedin} className="btn icon-btn" />
                    </button>
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/Shivani-1524">
                    <FontAwesomeIcon icon={faCodeBranch} className="btn icon-btn" />
                </a>
            </div>
        </footer>
    )
}

export { Footer }