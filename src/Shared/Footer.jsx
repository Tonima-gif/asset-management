

const Footer = () => {
    return (
        <div>
            {/* 1 */}
            <footer className="footer footer-center bg-purple-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <a href="#about" className="link link-hover text-base font-semibold">About us</a>
    <a href="#pack" className="link link-hover  text-base font-semibold">Packages</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href="https://x.com/?lang=en&mx=2" target="https://x.com/?lang=en&mx=2">
       <img src="https://img.icons8.com/?size=48&id=xWVjuc9hryql&format=gif" alt="" />
      </a>
      <a href="https://www.facebook.com/" target="https://www.facebook.com/">
       <img src="https://img.icons8.com/?size=48&id=uLWV5A9vXIPu&format=png" alt="" />
      </a>
      <a href="https://www.linkedin.com/feed/" target="https://www.linkedin.com/feed/">
       <img src="https://img.icons8.com/?size=48&id=xuvGCOXi8Wyg&format=png" alt="" />
      </a>
    </div>
  </nav>
  <aside>
    <p className="text-base font-semibold text-gray-500">Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
</footer>

        </div>
    );
};

export default Footer;