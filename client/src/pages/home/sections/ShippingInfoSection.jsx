import { shippingInfo } from '../../../assets/data'

const ShippingInfoSection = () => {
  return (
    <div className='container flex flex-col md:flex-row items-center justify-evenly pt-12'>
      {
        shippingInfo.map((info, id) => (
          <div key={id} className='flex flex-col gap-2 items-center mb-4'>
            <img src={info.url} alt="" className='h-12'/>
            <h3 className='text-lg font-medium'>{info.name}</h3>
            <p className='text-neutral-500'>{info.desc}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ShippingInfoSection
