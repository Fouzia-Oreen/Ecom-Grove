/* eslint-disable no-unused-vars */
import logo from '../assets/ecom-grove_logo.svg';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { CgFacebook } from 'react-icons/cg';
import { IoLogoTwitter } from 'react-icons/io';

const links = [{
    title: 'Quick Links',
    links: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/' },
        { title: 'Products', link: '/' },
        { title: 'Services', link: '/' },
        { title: 'Contact', link: '/' },
    ]
}]
const info = [{
    title: 'Help & Info',
    links: [
        { title: 'Track Your Order', link: '/' },
        { title: 'Returns & Exchanges', link: '/' },
        { title: 'Shipping & Delivery', link: '/' },
        { title: 'Find A Store', link: '/' },
    ]
}]
const store = [{
    title: 'Contact Us',
    links: [
        { title: '123 Main St, Anytown, CA 12345' },
        { title: 'Phone: (123) 456-7890' },
        { title: 'Email: info@ecomgrove.com' }
    ]
}]
const social = [
    {icon: <CgFacebook />},
    {icon: <IoLogoTwitter />},
    {icon: <AiFillInstagram />},
    {icon: <AiFillYoutube />},
]

const Footer = () => {
    return (
        <footer className='bg-color_2 mt-6 flex flex-col '>
            <div className='p-4 flex flex-col gap-8 md:flex-row md:px-4 lg:px-14 mb-4 justify-between'>
                {/* logo & newsletter */}
                <div className=''>              
                    <h1 className='text-color_6 text-2xl font-semibold flex gap-4 mt-6 mb-4'><img src={logo} alt="logo" className='h-8'/>Ecom-Grove</h1>
                    <p className='text-gray-600 text-sm w-full md:w-[380px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae.</p>
                    <div>
                    <h2 className='mt-4 mb-2 font-semibold text-color_4'>Subscribe for updates</h2>
                    <div className=''>
                    <input type='email' placeholder='Enter your email' className=' p-2  w-[340px] absolute border-[1px] border-color_4 bg-transparent focus:outline-none' />
                    <button className='bg-color_4 text-color_1 py-2 px-4 rounded-full relative ml-[240px] mt-[1px]'>Subscribe</button>
                    </div>
                </div>
                </div>

                <div className=' flex flex-col gap-4 md:flex-row md:gap-8 flex-wrap'>
                {/* links */}
                <div>  
                    {
                        links.map(item => (
                            <h2 key={item.index} className='text-color_4 text-lg font-medium'>{item.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {links.flatMap(item => item.links).map(link => (
                                <li key={link.link} className='text-gray-500 hover:text-gray-600 text-sm mt-2'><a href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>   
                </div>
                {/* info */}
                <div> 
                    {
                        info.map((infoItem, index) => (
                            <h2 key={infoItem.index} className='text-color_4 text-lg font-medium'>{infoItem.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {info.flatMap(infoItem => infoItem.links).map(linkItem => (
                                <li key={linkItem.link} className='text-gray-500 hover:text-gray-600 text-sm mt-2'><a href={linkItem.link}>{linkItem.title}</a></li>
                            ))}
                        </ul>   
                </div>
                {/* store */}
                <div>
                    {
                        store.map(storeItem => (
                            <h2 key={storeItem.index} className='text-color_4 text-lg font-medium'>{storeItem.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {store.flatMap(storeItem =>storeItem.links).map(link => (
                                <li key={link.link} className='text-gray-500 hover:text-gray-600 text-sm mt-2'><a href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>
                    {/* social - icons */}
                    <div className='flex gap-4 mt-4'>
                        {
                            social.map(icon => (
                                <a key={icon.icon} href="" className='text-color_4 cursor-pointer hover:text-color_6 text-lg'>{icon.icon}</a>
                            ))
                        }
                    </div>
                </div>
                </div>
            </div>
            <p className='text-center text-white p-4 bg-color_5'>
                &copy; 2022 Ecom-Grove. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;