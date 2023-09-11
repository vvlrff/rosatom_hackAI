import React from 'react'
import VideoSection from '../../components/VideoSection'
import InfoSection from '../../components/InfoSection'
import { homeObjOne, homeObjThree, homeObjTwo } from '../../components/InfoSection/Data'
import NavbarStart from '../../components/NavbarStart'

const HomePage = () => {
    return (
        <>
            <NavbarStart />
            <VideoSection />
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
        </>
    )
}

export default HomePage