pragma solidity ^ 0.4 .4;

contract TodoList {
    TodoItem[] public todoList;

    struct TodoItem {
        bytes32 value;
        bool active;
    }

    function addTodoItem(bytes32 _value) public returns(bool success) {
        TodoItem memory todoItem;
        todoItem.value = _value;
        todoItem.active = false;

        todoList.push(todoItem);
        return true;
    }

    function getTodoItems() public constant returns(bytes32[], bool[]) {
        uint length = todoList.length;

        bytes32[] memory values = new bytes32[](length);
        bool[] memory actives = new bool[](length);

        for (uint i = 0; i < length; i++) {
            values[i] = todoList[i].value;
            actives[i] = todoList[i].active;
        }

        return (values, actives);
    }

    function deleteTodoItem(uint index) public returns(bool success) {
        if (index >= todoList.length) return;

        for (uint i = index; i < todoList.length - 1; i++) {
            todoList[i] = todoList[i + 1];
        }

        delete todoList[todoList.length - 1];
        todoList.length--;
        return true;
    }
}