import { FaBars } from "react-icons/fa6";
import IndianTime from "./IndianTime";

const TopNav = ({ toggleSideNavbar })=>{
    return(
        <>
        <div style={{display:'flex', justifyContent:"space-between", alignItems:'center', height:'70px', padding:'0px 20px', background:'#FFFFFF'}}>
            <div className="" style={{display:'flex', justifyContent:"space-between", alignItems:'center', }}>
            
            <button  onClick={toggleSideNavbar} style={{all:'unset', cursor:'pointer'}}><FaBars size={25}/></button>
            <span style={{marginLeft:'30px', fontSize:'1.2rem', fontWeight:'700', color:'#17A2BF'}}>Metrolite App Customer</span>

            </div>

            <div>
               <IndianTime/>
            </div>

        </div>
        </>

    )
}

export default TopNav