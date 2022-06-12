import { Container } from "semantic-ui-react";
import Header from "./header";
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
    return (
       <Container>
            <Header   />
            {props.children}
            <h2>Footer</h2>
    </Container>
  )
}

export default Layout;