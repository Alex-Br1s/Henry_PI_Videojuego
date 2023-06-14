import { NavLink } from 'react-router-dom';
import imagen from '../image/landing-page-img.jpg'

const LandingPage = () =>{
    return (
        <div className='style'>
            <NavLink to={'/home'}>
            <button>Ir al Homepage</button>
            </NavLink>
            <img className='img-landing' src={imagen} alt="" />
        </div>
    )
}

export default LandingPage