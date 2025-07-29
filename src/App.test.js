import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
});

describe('App Component', () => {
  describe('Initial Rendering', () => {
    test('renders the app title and header', () => {
      render(<App />);
      
      expect(screen.getByText('To-Do List')).toBeInTheDocument();
      expect(screen.getByText('Amit Vibing- Context Mgmt demo')).toBeInTheDocument();
      expect(screen.getByText('0 tasks left')).toBeInTheDocument();
    });

    test('renders the task input form', () => {
      render(<App />);
      
      expect(screen.getByPlaceholderText('Task title...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    test('renders filter buttons', () => {
      render(<App />);
      
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
    });

    test('shows empty state when no tasks', () => {
      render(<App />);
      
      expect(screen.getByText('No tasks to show.')).toBeInTheDocument();
    });
  });

  describe('Adding Tasks', () => {
    test('adds a new task with title and description', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const descInput = screen.getByPlaceholderText('Description (optional)');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Test task');
      await user.type(descInput, 'Test description');
      await user.click(addButton);
      
      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
      expect(titleInput).toHaveValue('');
      expect(descInput).toHaveValue('');
    });

    test('adds a task with only title (no description)', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Simple task');
      await user.click(addButton);
      
      expect(screen.getByText('Simple task')).toBeInTheDocument();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
    });

    test('shows error when trying to add empty task', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const addButton = screen.getByRole('button', { name: 'Add' });
      await user.click(addButton);
      
      expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
    });

    test('shows error when trying to add task with only whitespace', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, '   ');
      await user.click(addButton);
      
      expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
    });

    test('adds multiple tasks correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'First task');
      await user.click(addButton);
      
      await user.type(titleInput, 'Second task');
      await user.click(addButton);
      
      await user.type(titleInput, 'Third task');
      await user.click(addButton);
      
      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.getByText('Second task')).toBeInTheDocument();
      expect(screen.getByText('Third task')).toBeInTheDocument();
      expect(screen.getByText('3 tasks left')).toBeInTheDocument();
    });
  });

  describe('Toggling Tasks', () => {
    test('toggles task completion status', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Toggle test task');
      await user.click(addButton);
      
      const task = screen.getByText('Toggle test task');
      const checkbox = task.parentElement.querySelector('input[type="checkbox"]');
      
      // Initially unchecked
      expect(checkbox).not.toBeChecked();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
      
      // Toggle to completed
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      expect(screen.getByText('0 tasks left')).toBeInTheDocument();
      
      // Toggle back to active
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
    });
  });

  describe('Deleting Tasks', () => {
    test('deletes a task when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Task to delete');
      await user.click(addButton);
      
      expect(screen.getByText('Task to delete')).toBeInTheDocument();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
      
      // Delete the task
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await user.click(deleteButton);
      
      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
      expect(screen.getByText('0 tasks left')).toBeInTheDocument();
      expect(screen.getByText('No tasks to show.')).toBeInTheDocument();
    });

    test('deletes correct task when multiple tasks exist', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add multiple tasks
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'First task');
      await user.click(addButton);
      
      await user.type(titleInput, 'Second task');
      await user.click(addButton);
      
      await user.type(titleInput, 'Third task');
      await user.click(addButton);
      
      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.getByText('Second task')).toBeInTheDocument();
      expect(screen.getByText('Third task')).toBeInTheDocument();
      
      // Delete the second task
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      await user.click(deleteButtons[1]); // Second delete button
      
      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.queryByText('Second task')).not.toBeInTheDocument();
      expect(screen.getByText('Third task')).toBeInTheDocument();
      expect(screen.getByText('2 tasks left')).toBeInTheDocument();
    });
  });

  describe('Filtering Tasks', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add three tasks
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Active task 1');
      await user.click(addButton);
      
      await user.type(titleInput, 'Active task 2');
      await user.click(addButton);
      
      await user.type(titleInput, 'Completed task');
      await user.click(addButton);
      
      // Complete the third task
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[2]); // Third checkbox
    });

    test('shows all tasks when "All" filter is selected', async () => {
      const user = userEvent.setup();
      const allButton = screen.getByRole('button', { name: 'All' });
      await user.click(allButton);
      
      expect(screen.getByText('Active task 1')).toBeInTheDocument();
      expect(screen.getByText('Active task 2')).toBeInTheDocument();
      expect(screen.getByText('Completed task')).toBeInTheDocument();
    });

    test('shows only active tasks when "Active" filter is selected', async () => {
      const user = userEvent.setup();
      const activeButton = screen.getByRole('button', { name: 'Active' });
      await user.click(activeButton);
      
      expect(screen.getByText('Active task 1')).toBeInTheDocument();
      expect(screen.getByText('Active task 2')).toBeInTheDocument();
      expect(screen.queryByText('Completed task')).not.toBeInTheDocument();
    });

    test('shows only completed tasks when "Completed" filter is selected', async () => {
      const user = userEvent.setup();
      const completedButton = screen.getByRole('button', { name: 'Completed' });
      await user.click(completedButton);
      
      expect(screen.queryByText('Active task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Active task 2')).not.toBeInTheDocument();
      expect(screen.getByText('Completed task')).toBeInTheDocument();
    });

    test('updates task count correctly when filtering', async () => {
      const user = userEvent.setup();
      
      // All filter (default)
      expect(screen.getByText('2 tasks left')).toBeInTheDocument();
      
      // Active filter
      const activeButton = screen.getByRole('button', { name: 'Active' });
      await user.click(activeButton);
      expect(screen.getByText('2 tasks left')).toBeInTheDocument();
      
      // Completed filter
      const completedButton = screen.getByRole('button', { name: 'Completed' });
      await user.click(completedButton);
      expect(screen.getByText('0 tasks left')).toBeInTheDocument();
    });
  });

  describe('Editing Tasks', () => {
    test('enters edit mode when edit button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Original task');
      await user.click(addButton);
      
      // Click edit button
      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);
      
      // Check that edit form appears
      expect(screen.getByPlaceholderText('Edit task title...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Edit description (optional)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      
      // Check that original form is disabled
      expect(screen.getByPlaceholderText('Task title...')).toBeDisabled();
      expect(screen.getByPlaceholderText('Description (optional)')).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    });

    test('saves edited task correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Original task');
      await user.click(addButton);
      
      // Edit the task
      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);
      
      const editTitleInput = screen.getByPlaceholderText('Edit task title...');
      const editDescInput = screen.getByPlaceholderText('Edit description (optional)');
      const saveButton = screen.getByRole('button', { name: 'Save' });
      
      await user.clear(editTitleInput);
      await user.type(editTitleInput, 'Updated task');
      await user.type(editDescInput, 'Updated description');
      await user.click(saveButton);
      
      expect(screen.getByText('Updated task')).toBeInTheDocument();
      expect(screen.getByText('Updated description')).toBeInTheDocument();
      expect(screen.queryByText('Original task')).not.toBeInTheDocument();
    });

    test('cancels edit mode correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Original task');
      await user.click(addButton);
      
      // Enter edit mode
      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);
      
      // Cancel edit
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await user.click(cancelButton);
      
      // Check that original task is still there and edit form is gone
      expect(screen.getByText('Original task')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Edit task title...')).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText('Task title...')).not.toBeDisabled();
    });

    test('shows error when trying to save empty edited task', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Original task');
      await user.click(addButton);
      
      // Edit the task
      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);
      
      const editTitleInput = screen.getByPlaceholderText('Edit task title...');
      const saveButton = screen.getByRole('button', { name: 'Save' });
      
      await user.clear(editTitleInput);
      await user.click(saveButton);
      
      expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
    });
  });

  describe('localStorage Persistence', () => {
    test('loads tasks from localStorage on mount', () => {
      const mockTasks = [
        { id: '_test1', text: 'Saved task 1', description: 'Description 1', completed: false },
        { id: '_test2', text: 'Saved task 2', description: 'Description 2', completed: true }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));
      
      render(<App />);
      
      expect(screen.getByText('Saved task 1')).toBeInTheDocument();
      expect(screen.getByText('Saved task 2')).toBeInTheDocument();
      expect(screen.getByText('1 task left')).toBeInTheDocument();
    });

    test('saves tasks to localStorage when tasks change', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Test task');
      await user.click(addButton);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'todoApp.tasks',
        expect.stringContaining('Test task')
      );
    });

    test('handles corrupted localStorage gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      render(<App />);
      
      expect(screen.getByText('No tasks to show.')).toBeInTheDocument();
      expect(screen.getByText('0 tasks left')).toBeInTheDocument();
    });

    test('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Quota exceeded');
      });
      
      const user = userEvent.setup();
      render(<App />);
      
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      // Should not crash when localStorage fails
      expect(() => {
        user.type(titleInput, 'Test task');
        user.click(addButton);
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    test('clears error message when valid task is added after error', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      // Try to add empty task (should show error)
      await user.click(addButton);
      expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
      
      // Add valid task (should clear error)
      const titleInput = screen.getByPlaceholderText('Task title...');
      await user.type(titleInput, 'Valid task');
      await user.click(addButton);
      
      expect(screen.queryByText('Task cannot be empty.')).not.toBeInTheDocument();
    });

    test('clears error message when edit is cancelled', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a task
      const titleInput = screen.getByPlaceholderText('Task title...');
      const addButton = screen.getByRole('button', { name: 'Add' });
      
      await user.type(titleInput, 'Test task');
      await user.click(addButton);
      
      // Enter edit mode and try to save empty task
      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);
      
      const editTitleInput = screen.getByPlaceholderText('Edit task title...');
      const saveButton = screen.getByRole('button', { name: 'Save' });
      
      await user.clear(editTitleInput);
      await user.click(saveButton);
      
      expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
      
      // Cancel edit (should clear error)
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await user.click(cancelButton);
      
      expect(screen.queryByText('Task cannot be empty.')).not.toBeInTheDocument();
    });
  });
});
