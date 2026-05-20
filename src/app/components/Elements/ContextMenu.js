import React from "react";
import {
    Toast
} from 'react-bootstrap';

class ContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu : []
        };
    }
    
    render () {
        return (<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={this.state.style} onFocus={()=>{console.log('Context Focus')}} onBlur={()=>{this.contextMenuHide()}}>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Action</a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Another action</a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Something else here</a></li>
                    <li class="dropdown-divider"><a href="#" ref={this.contextMenu}></a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Separated link</a></li>
        </ul>)
    }
}

export default ContextMenu;