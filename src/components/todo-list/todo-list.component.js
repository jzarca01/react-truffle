import React, {
    Component
} from 'react';

import TodoListContract from '../../build/contracts/TodoList.json';
import web3, {
  selectContractInstance, mapReponseToJSON
} from '../common/web3';

import Todo from '../todo/todo.component';
  
class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            newTodo: "",
            account: web3.eth.accounts[0] 
        }
        this.submit = this.submit.bind(this);
    }

    async componentWillMount() {
        this.todoList = await selectContractInstance(TodoListContract);

        const todoItems = await this.getTodoItems();
        this.setState({ todoItems });
    }

    async submit(e){
        console.log(e);
        if(e.keyCode === 13){
            const todoList = await selectContractInstance(TodoListContract);
            await todoList.addTodoItem(this.state.newTodo, { from: this.state.account});
        
            const todoItems = await this.getTodoItems();
        
            this.setState({ todoItems, newTodo: "", pending: false });
        }
    }

    async getTodoItems() {    
        const todoItemsResp = await this.todoList.getTodoItems.call();
        const todoItems = mapReponseToJSON(
          todoItemsResp, ['value'], 'arrayOfObject'
        );
        return todoItems;
    }
    
    async deleteTodoItem(index) {
        await this.todoList.deleteTodoItem(index, { from: this.state.account });
        const todoItems = await this.getTodoItems();
    
        this.setState({ todoItems });
    }

    render() {
        return (
        <div className="todoItems">
            <input type="text" value={this.state.newTodo} onChange={e => this.setState({ newTodo: e.target.value })}
            onKeyDown={this.submit}></input>
            <br />
            <ul>
                {this.state.todoItems.map((todo,index) =>
                    <Todo key={index} todo={todo.value} onClick={() => this.deleteTodoItem(index)} />
                )}            
            </ul>
        </div>
        );
    }
}

export default TodoList;