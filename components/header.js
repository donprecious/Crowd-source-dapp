import { Menu } from "semantic-ui-react";
// import {Link} from '../routes'
import Link from 'next/link'
const Header = () => {
    return (
        
        <Menu style={{ marginTop: '10px' }}>
            
            {/* <Link route='/' > <a className='item'> Crowd Coin</a></Link>  */}
            <Menu.Item> 
                <Link href="/">
                    <a>Crowd Coin</a>
                </Link>
            </Menu.Item>
            <Menu.Menu position="right" >
                
                  {/* <Link route='/' > <a className='item'> Crowd Coin</a></Link>  */}
                <Menu.Item>
                    <Link href="/">
                        <a>Crowd Coin</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/campaigns/new">
                        <a>+</a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;