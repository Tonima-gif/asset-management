

const About = () => {
    return (
        <div>
            <h1  id='about' className="text-4xl font-bold text-purple-950 py-10 text-center">About Information</h1>
            <div className='md:w-11/12 mx-auto h-[490px] border-2 p-8 rounded-lg overflow-y-scroll'>

<h1 className="text-xl font-bold text-gray-900 py-3">About Us</h1>
<p className="text-base text-gray-500 font-semibold">Welcome to Asset Management site, your trusted partner in comprehensive asset management solutions. Our mission is to empower organizations by managing and optimizing their valuable assets efficiently, ensuring peak performance and long-term sustainability.</p>
<h1 className="text-xl font-bold text-gray-900 py-3">Who We Are</h1>
<p className="text-base text-gray-500 font-semibold">At Asset Management site, we specialize in providing innovative and tailored asset management services that meet the diverse needs of businesses across industries. With a focus on transparency, accountability, and excellence, we’ve built a reputation for delivering value-driven results to our clients.</p>
<h1 className="text-xl font-bold text-gray-900 py-3">What We Offer</h1>
<p className="text-base text-gray-500 font-semibold"><span className="text-gray-800 font-bold py-4">Employee Opportunities : </span> Join a dynamic and inclusive work environment where innovation and professional growth thrive. We are always looking for talented individuals who are ready to make an impact.<br></br>

<span className="text-gray-900 font-bold py-4">HR Collaboration : </span> Be a part of a team that values people. Our HR department works closely with employees to nurture talent, foster development, and create a supportive workplace culture.
<br></br>
<span  className="text-gray-900 font-bold py-4">Asset Request Platform : </span> Our advanced asset request system ensures seamless access to tools and resources, helping businesses streamline operations and achieve their goals effectively.</p>
<h1 className="text-xl font-bold text-gray-900 py-3">Join Us</h1>
<p className="text-base text-gray-500 font-semibold"><span className="text-gray-800 font-bold">As an Employee : </span>Whether you’re just starting your career or looking to take it to the next level, Asset Management site offers opportunities to grow, learn, and contribute meaningfully. Explore our career opportunities and become a part of a team that’s shaping the future of asset management.
<br></br>
<span  className="text-gray-900 font-bold py-4">As a HR Partner : </span> If you’re an HR professional passionate about creating positive work environments and nurturing talent, we invite you to join us in driving organizational excellence.
<br></br>
<span className="text-gray-900 font-bold py-4">Assets Request : </span> Need specific tools or resources? Our efficient asset request system allows employees and clients to easily request and manage assets, ensuring smooth operations every step of the way.</p>

<h1 className="text-xl font-bold text-gray-900 py-3">Why Choose Us</h1>
<p className="text-base text-gray-500 font-semibold">Expertise in delivering scalable and reliable asset management solutions.

Commitment to sustainability and long-term value creation.
<br></br>
A team of dedicated professionals who prioritize client satisfaction.
<br></br>
We’re here to help you unlock the full potential of your assets. Let’s grow together</p>
</div>

<div id='pack' className='md:w-11/12 mx-auto'>
    <h1 className="text-4xl py-12 font-bold text-gray-900">Package Details</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         <div className='bg-gray-200 shadow-lg border-2 border-gray-300 rounded-xl py-12'>
            <img className='mx-auto' src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
            <h1 className='text-xl font-bold text-center py-5 text-black'>Maximum 5 employees</h1>
            <p className='text-xl font-semibold text-center text-gray-800'>$ 5</p>
         </div>
        <div  className='bg-gray-200 shadow-lg border-2 border-gray-300 rounded-xl py-12'>
        <div className='flex justify-center items-center'>
        <img src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
        <img src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
        </div>
            <h1 className='text-xl font-bold text-center py-5 text-black'>Maximum 10 employees</h1>
            <p className='text-xl font-semibold text-center text-gray-800'>$ 8</p>
         </div>
        <div  className='bg-gray-200 shadow-lg border-2 border-gray-300 rounded-xl py-12'>
        <div className='flex justify-center items-center'>
        <img src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
        <img src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
        <img src="https://img.icons8.com/?size=50&id=11220&format=png" alt="" />
        </div>
            <h1 className='text-xl font-bold text-center py-5 text-black'>Maximum 20 employees</h1>
            <p className='text-xl font-semibold text-center text-gray-800'>$ 15</p>
         </div>
         </div>
</div>

        </div>
    );
};

export default About;