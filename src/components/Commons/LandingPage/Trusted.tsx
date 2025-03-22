function Trusted() {

  const items=[
    {
      img:"images/time.png",
      title:"Save Time",
      description:"Send payments to hundreds of beneficiaries in just a few clicks."
    },
    {
      img:"images/trusted.png",
      title:"Trusted and Secure",
      description:"Join businesses across Africa enjoying secure payments for every transaction."
    },
    {
      img:"images/reporting.png",
      title:"Comprehensive Reporting",
      description:"Track every event effortlessly from a single dashboard"
    },
    {
      img:"images/seamless.png",
      title:"Seamless Beneficiary Management",
      description:"Easily manage, add, and update beneficiary details without hassle."
    }
  ]
  return (
    <div className="relative mt-[480px] lg:px-[6.25vw]  ">
      <h3 className="text-center my-5 font-medium text-[42px] text-black/90">
        Why businesses choose Alfasente
      </h3>

      <div className="grid grid-cols-2 gap-7">
        {items.map((item,index)=>(
           <div className="border border-[#E4E8F1] rounded-[10px] px-5 py-3 " key={index}>
           <div className="rounded ">
           <img src={item.img} alt="Time Saving" />
           </div>
 
           <div className="flex flex-col mt-4 ">
             <span className="font-semibold text-[18px]">{item.title}</span>
             <span className="text-[15px] font-normal text-[#5C6474] inline-block whitespace-nowrap">
              {item.description}
             </span>
           </div>
         </div>
        ))}
        </div>
       

        

        
        
      
    </div>
  );
}

export default Trusted;
