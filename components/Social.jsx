'use client'

import {RiLinkedinFill, RiGithubFill} from 'react-icons/ri';
import { SiWellfound} from 'react-icons/si';
import Link from 'next/link';

const icons = [
    {
    path: 'https://linkedin.com/in/lauchundev',
    name: <RiLinkedinFill />,
},
{
    path: 'https://github.com/dlaucodes',
    name: <RiGithubFill />,
},
{
    path: 'https://wellfound.com/u/chun-k-lau',
    name: <SiWellfound />,
},
];



const Social = ({containerStyles, iconsStyles}) => {
  return (
    <div className={`${containerStyles}`}>
        {icons.map((icon, index)=>{
            return(
                <Link href={icon.path} key={index} target="_blank">
                    <div className={`${iconsStyles}`}>{icon.name}</div>
                </Link>
            )
        })}
    </div>
  )
}

export default Social