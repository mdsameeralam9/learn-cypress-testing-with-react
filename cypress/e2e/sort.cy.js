// Import the function to be tested
import { sortTodo } from '../../src/helper/sort.js';

// Test suite for the sortTodo utility function
describe('Utility Function: sortTodo', () => {

  // Test case 1: Check if it sorts a typical unsorted array correctly
  it('should sort an array of todo objects alphabetically by text', () => {
    const unsortedTodos = [
      { id: 1, text: 'Clean room' },
      { id: 4, text: 'Write Cypress test' },
      { id: 2, text: 'Do laundry' },
      { id: 3, text: 'Buy groceries' },
    ];

    const expectedSortedTodos = [
      { id: 3, text: 'Buy groceries' },
      { id: 1, text: 'Clean room' },
      { id: 2, text: 'Do laundry' },
      { id: 4, text: 'Write Cypress test' },
    ];

    const result = sortTodo(unsortedTodos);

    // Use `deep.equal` to compare objects in the array
    expect(result).to.deep.equal(expectedSortedTodos);
  });

  // Test case 2: Check its behavior with an already sorted array
  it('should not change the order of an already sorted array', () => {
    const sortedTodos = [
      { id: 1, text: 'Apple' },
      { id: 2, text: 'Banana' },
      { id: 3, text: 'Cherry' },
    ];
    
    // Create a copy to compare against
    const expectedOrder = [...sortedTodos];

    const result = sortTodo(sortedTodos);

    expect(result).to.deep.equal(expectedOrder);
  });

  // Test case 3: Handle an empty array gracefully
  it('should return an empty array when given an empty array', () => {
    const emptyArray = [];
    const result = sortTodo(emptyArray);
    expect(result).to.deep.equal([]);
  });

  // Test case 4: Handle an array with a single item
  it('should return the same array when there is only one item', () => {
    const singleItemArray = [{ id: 1, text: 'A single task' }];
    const result = sortTodo(singleItemArray);
    expect(result).to.deep.equal([{ id: 1, text: 'A single task' }]);
  });

  // Test case 5: Handle case-sensitive sorting correctly
  it('should sort strings with different cases correctly (localeCompare handles this)', () => {
    const mixedCaseTodos = [
        { id: 1, text: 'task C' },
        { id: 2, text: 'Task a' },
        { id: 3, text: 'task B' },
    ];

    const expectedSorted = [
        { id: 2, text: 'Task a' },
        { id: 3, text: 'task B' },
        { id: 1, text: 'task C' },
    ];

    const result = sortTodo(mixedCaseTodos);
    expect(result).to.deep.equal(expectedSorted);
  });

});
