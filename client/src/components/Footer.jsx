/* eslint-disable no-unused-vars */
import logo from '../assets/ec-logo.png';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { CgFacebook } from 'react-icons/cg';
import { IoLogoTwitter } from 'react-icons/io';


export const footerHomeLinks = [{
    title: 'Our Website',
    links: [
        { title: 'Home', link: '/' },
        { title: 'Products', link: '/' },
        { title: 'Services', link: '/' },
        { title: 'Contact Us', link: '/' },
        { title: 'Offers', link: '/' },
    ]
  }]
  export const footerLinks = [{
    title: 'Quick Links',
    links: [
        { title: 'About Us', link: '/' },
        { title: 'Delivery Information', link: '/' },
        { title: 'Privacy Policy', link: '/' },
        { title: 'Discount', link: '/' },
        { title: 'Custom Service', link: '/' },
    ]
  }]
const footerInfo = [{
    title: 'Help & Info',
    links: [
        { title: 'Track Your Order', link: '/' },
        { title: 'Returns & Exchanges', link: '/' },
        { title: 'Shipping & Delivery', link: '/' },
        { title: 'Find A Store', link: '/' },
    ]
}]
const footerStore = [{
    title: 'Contact Us',
    links: [
        { title: '123 Main St, Anytown, CA 12345' },
        { title: 'Phone: (123) 456-7890' },
        { title: 'Email: info@ecomgrove.com' }
    ]
}]
const footerSocial = [
    {icon: <CgFacebook />},
    {icon: <IoLogoTwitter />},
    {icon: <AiFillInstagram />},
    {icon: <AiFillYoutube />},
]

const Footer = () => {
    return (
        <footer className='bg-color_2 mt-6 flex flex-col '>
            <div className='flex flex-col xl:flex-row gap-8 items-center justify-between  mx-auto mt-12 px-4 container py-6 w-full'>
                <div className='flex-1 flex flex-col items-center lg:items-start'>    
                    <img src={logo} alt="logo" className='h-20'/>          
                    <h1 className='text-color_6 text-2xl font-semibold flex gap-4 mt-6 mb-4 '>Ecom-Grove</h1>
                    <p className='text-color_4  text-center w-[400px] lg:text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae.</p>             
                    <div className='flex gap-8 mt-6 mb-4'>
                    {
                        footerSocial.map(icon => (
                            <a key={icon.icon} href="" className='text-color_4 cursor-pointer hover:text-color_6 text-xl'>{icon.icon}</a>
                        ))
                    }
                    </div>
                 
                </div>

                <div className='  flex-1 grid grid-cols-2 gap-8 md:grid-cols-4'>
                 {/* links */}
                     <div>  
                    {
                        footerHomeLinks.map(item => (
                            <h2 key={item.index} className='text-color_4 text-xl font-medium mb-4'>{item.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {footerHomeLinks.flatMap(item => item.links).map(link => (
                                <li key={link.link} className='text-color_4 hover:text-color_6  mt-2'><a href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>   
                </div>
                {/* links */}
                <div>  
                    {
                        footerLinks.map(item => (
                            <h2 key={item.index} className='text-color_4 text-xl font-medium mb-4'>{item.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {footerLinks.flatMap(item => item.links).map(link => (
                                <li key={link.link} className='text-color_4 hover:text-color_6  mt-2'><a href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>   
                </div>
                {/* info */}
                <div> 
                    {
                        footerInfo.map((infoItem, index) => (
                            <h2 key={infoItem.index} className='text-color_4 text-xl font-medium mb-4'>{infoItem.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {footerInfo.flatMap(infoItem => infoItem.links).map(linkItem => (
                                <li key={linkItem.link} className='text-color_4 hover:text-color_6 mt-2'><a href={linkItem.link}>{linkItem.title}</a></li>
                            ))}
                        </ul>   
                </div>
                {/* store */}
                <div>
                    {
                        footerStore.map(storeItem => (
                            <h2 key={storeItem.index} className='text-color_4 text-xl font-medium mb-4'>{storeItem.title}</h2>
                        ))}
                        <ul className='flex flex-col'>
                            {footerStore.flatMap(storeItem =>storeItem.links).map(link => (
                                <li key={link.link} className='text-color_4 hover:text-color_5 mt-2 cursor-pointer'><a href={link.link}>{link.title}</a></li>
                            ))}
                        </ul>

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