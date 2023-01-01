import React from 'react';
import './css/footer.css';
import './css/body.css';

function Footer() {
  return (
    <footer>
      <div className="footer-option">BetterSwap..the better way to trade</div>
      <div className="logo">BetterSwap</div>
      <div className="footer-option">
        <a href="#" target="_blank">Docs</a>
        <a href="#" target="_blank">Discord</a>
        <a href="#" target="_blank">Twitter</a>
      </div>

    </footer>
  );
}

export default Footer;
