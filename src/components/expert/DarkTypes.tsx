import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const types = [
    {
        type : "Fake Scarcity",
        description : "Ever witnessed the kind of content on websites as shown in the image? It is a dark pattern on websites that creates a false sense of urgency showing the limited availability of products. This aims to take advantage of consumer psychology and drive impulsive buying decisions.",
        imageUrl : "/assets/Fake_Scarcity.jpeg",
        link : "https://www.tourradar.com/"
    },
    {
        type : "Misdirection",
        description : "Content is structured in such a manner to divert user attention away from their desired key actions or information, leading them towards an undesired path.  Generally done for promoting a product or service. Deceptive technique used by site owners for their own benefit.",
        imageUrl : "/assets/Misdirection.jpeg",
        link : "https://www.flugladen.de/"
    },
    {
        type : "Fake Social Proof",
        description : "Incorporating this type of dark pattern in a website will mislead the users and exploit their trust. Usually done by creating a false impression of popularity through the fabrication of endorsements, or social signals.",
        imageUrl : "/assets/Fake_Social_proof.jpeg",
        link : "https://www.tourradar.com/"
        
    },
    {
        type : "Fake Urgency",
        description : "In the fake urgency category of dark patterns, pressure is created on users to make quick decisions, manipulating them into taking irrational actions. This aims to create an unreal sense of limited-time opportunities.",
        imageUrl : "/assets/Fake_Urgency.jpeg",
        link : "https://www.ncl.com/"
    }
]

interface darkTypesProps {
  isDisplayedOnDashboard : Boolean
}

const DarkTypes: React.FC<darkTypesProps> = ({isDisplayedOnDashboard}) => {
  return (
    <>
     {isDisplayedOnDashboard ? 
        <div className='hidden md:block w-full h-auto'>
          <h2 className='flex justify-center text-2xl md:text-[2rem] font-bold font-copperPlate text-cyan-500'>Dark Patterns In Web</h2>
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={3000} className='sm:py-4'>
            {types.map((type, index) => (
              <div className='h-full items-center sm:border-2 border-cyan-500 p-4 rounded-md' key={index}>
                <div className='w-full'>
                  <a data-tooltip-id="my-tooltip" data-tooltip-content={`This example snapshot of dark patterns is taken from ${type.link} accessed on 12/24/2023`} href={type.link} target='blank'>
                    <img src={type.imageUrl} alt={type.type} />
                  </a>
                </div>
                <div className='pt-2 w-full'>
                  <h3 className='font-bold my-4'>{type.type}</h3>
                  <p>{type.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div> : 
        <div className='md:mx-10 lg:mx-40'>
          <h2 className='flex justify-center text-2xl md:text-[3rem] font-bold font-copperPlate text-cyan-500'>Dark Patterns In Web</h2>
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={3000} className='sm:py-4'>
            {types.map((type, index) => (
              <div className='h-full sm:flex items-center sm:border-2 border-cyan-500 p-4 rounded-md text-white md:text-xl' key={index}>
                <div className='w-full sm:w-1/2 sm:border-r-2 border-cyan-500 sm:pr-4'>
                  <a data-tooltip-id="my-tooltip" data-tooltip-content={`This example snapshot of dark patterns is taken from ${type.link} accessed on 12/24/2023`} href={type.link} target='blank'><img src={type.imageUrl} alt={type.type} /></a>
                </div>
                <div className='pt-2 sm:pt-0 w-full sm:w-1/2 sm:pl-2'>
                  <h3 className='font-bold my-4'>{type.type}</h3>
                  <p>{type.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
     }
    </>
  )
}

export default DarkTypes