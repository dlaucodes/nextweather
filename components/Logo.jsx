import Link from "next/link"
import Image from "next/image"

const Logo = () => {
  return (
    <Link href='/'>
       <Image 
       src="/android-chrome-512x512.png"
       width={50}
       height={50}
       alt="logo"
         /> 
        
    </Link>
  )
}

export default Logo