 export const sortTodo = (arr) => {
    return arr.sort((a, b)=> a.text.localeCompare(b.text))

}
