import React, {
    Component
} from 'react';

class Todo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
            {this.props.todo}               
            <button onClick={this.props.onClick}>X</button>
            </li>
        );
    }
}

export default Todo;