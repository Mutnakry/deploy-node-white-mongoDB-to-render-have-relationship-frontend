
import Lessonses from './Lessonses.tsx'
import ManuModale from '../modale/ManuModale.tsx'
import Navbar from '../../components/Navbar.tsx'

function Home() {
    return (
       <div>
        <Navbar/>
         <div className='max-w-screen-2xl mx-auto'>
            <div className='flex w-full'>
                <div className='md:w-2/6 w-2/6 '>
                    <ManuModale />
                </div>
                <div className='md:w-4/6 w-4/6'>
                    <Lessonses />
                </div>
            </div>

        </div>
       </div>
    )
}

export default Home