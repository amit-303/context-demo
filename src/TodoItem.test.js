import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

// Mock functions for props
const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();
const mockOnEditSave = jest.fn();
const mockOnEditCancel = jest.fn();
const mockSetEditInput = jest.fn();
const mockSetEditDescInput = jest.fn();

const defaultProps = {
  id: 1,
  text: 'Test task',
  description: 'Test description',
  completed: false,
  onToggle: mockOnToggle,
  onDelete: mockOnDelete,
  onEdit: mockOnEdit,
  onEditSave: mockOnEditSave,
  onEditCancel: mockOnEditCancel,
  isEditing: false,
  editInput: '',
  editDescInput: '',
  setEditInput: mockSetEditInput,
  setEditDescInput: mockSetEditDescInput,
};

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders task with title and description', () => {
      render(<TodoItem {...defaultProps} />);
      
      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    test('renders task without description', () => {
      const propsWithoutDesc = { ...defaultProps, description: '' };
      render(<TodoItem {...propsWithoutDesc} />);
      
      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    test('renders completed task with strikethrough', () => {
      const completedProps = { ...defaultProps, completed: true };
      render(<TodoItem {...completedProps} />);
      
      const taskText = screen.getByText('Test task');
      expect(taskText).toHaveStyle('text-decoration: line-through');
      expect(taskText).toHaveStyle('color: #888');
    });

    test('renders incomplete task without strikethrough', () => {
      render(<TodoItem {...defaultProps} />);
      
      const taskText = screen.getByText('Test task');
      expect(taskText).toHaveStyle('text-decoration: none');
      expect(taskText).toHaveStyle('color: #222');
    });

    test('renders checkbox with correct checked state', () => {
      render(<TodoItem {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    test('renders checkbox as checked for completed task', () => {
      const completedProps = { ...defaultProps, completed: true };
      render(<TodoItem {...completedProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    test('renders edit and delete buttons', () => {
      render(<TodoItem {...defaultProps} />);
      
      expect(screen.getByTitle('Edit')).toBeInTheDocument();
      expect(screen.getByTitle('Delete')).toBeInTheDocument();
    });
  });

  describe('Interaction - Toggle', () => {
    test('calls onToggle when checkbox is clicked', () => {
      render(<TodoItem {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    test('calls onToggle with correct aria-label for incomplete task', () => {
      render(<TodoItem {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Mark as complete');
    });

    test('calls onToggle with correct aria-label for completed task', () => {
      const completedProps = { ...defaultProps, completed: true };
      render(<TodoItem {...completedProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Mark as incomplete');
    });
  });

  describe('Interaction - Delete', () => {
    test('calls onDelete when delete button is clicked', () => {
      render(<TodoItem {...defaultProps} />);
      
      const deleteButton = screen.getByTitle('Delete');
      fireEvent.click(deleteButton);
      
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    test('delete button has correct aria-label', () => {
      render(<TodoItem {...defaultProps} />);
      
      const deleteButton = screen.getByTitle('Delete');
      expect(deleteButton).toHaveAttribute('aria-label', 'Delete task');
    });
  });

  describe('Interaction - Edit', () => {
    test('calls onEdit when edit button is clicked', () => {
      render(<TodoItem {...defaultProps} />);
      
      const editButton = screen.getByTitle('Edit');
      fireEvent.click(editButton);
      
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    test('edit button has correct aria-label', () => {
      render(<TodoItem {...defaultProps} />);
      
      const editButton = screen.getByTitle('Edit');
      expect(editButton).toHaveAttribute('aria-label', 'Edit task');
    });
  });

  describe('Editing Mode', () => {
    const editingProps = {
      ...defaultProps,
      isEditing: true,
      editInput: 'Updated task',
      editDescInput: 'Updated description',
    };

    test('renders edit form when isEditing is true', () => {
      render(<TodoItem {...editingProps} />);
      
      expect(screen.getByPlaceholderText('Edit task title...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Edit description (optional)')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('edit inputs have correct values', () => {
      render(<TodoItem {...editingProps} />);
      
      const titleInput = screen.getByPlaceholderText('Edit task title...');
      const descInput = screen.getByPlaceholderText('Edit description (optional)');
      
      expect(titleInput).toHaveValue('Updated task');
      expect(descInput).toHaveValue('Updated description');
    });

    test('calls setEditInput when title input changes', () => {
      render(<TodoItem {...editingProps} />);
      
      const titleInput = screen.getByPlaceholderText('Edit task title...');
      fireEvent.change(titleInput, { target: { value: 'New title' } });
      
      expect(mockSetEditInput).toHaveBeenCalledWith('New title');
    });

    test('calls setEditDescInput when description input changes', () => {
      render(<TodoItem {...editingProps} />);
      
      const descInput = screen.getByPlaceholderText('Edit description (optional)');
      fireEvent.change(descInput, { target: { value: 'New description' } });
      
      expect(mockSetEditDescInput).toHaveBeenCalledWith('New description');
    });

    test('calls onEditSave when form is submitted', () => {
      render(<TodoItem {...editingProps} />);
      
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      
      expect(mockOnEditSave).toHaveBeenCalledTimes(1);
    });

    test('calls onEditCancel when cancel button is clicked', () => {
      render(<TodoItem {...editingProps} />);
      
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      expect(mockOnEditCancel).toHaveBeenCalledTimes(1);
    });

    test('title input has autoFocus', () => {
      render(<TodoItem {...editingProps} />);
      
      const titleInput = screen.getByPlaceholderText('Edit task title...');
      expect(titleInput).toHaveFocus();
    });

    test('inputs have correct aria-labels', () => {
      render(<TodoItem {...editingProps} />);
      
      const titleInput = screen.getByPlaceholderText('Edit task title...');
      const descInput = screen.getByPlaceholderText('Edit description (optional)');
      
      expect(titleInput).toHaveAttribute('aria-label', 'Edit task title');
      expect(descInput).toHaveAttribute('aria-label', 'Edit task description');
    });
  });

  describe('Accessibility', () => {
    test('checkbox has correct aria-label for incomplete task', () => {
      render(<TodoItem {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Mark as complete');
    });

    test('checkbox has correct aria-label for completed task', () => {
      const completedProps = { ...defaultProps, completed: true };
      render(<TodoItem {...completedProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Mark as incomplete');
    });

    test('edit and delete buttons have correct titles', () => {
      render(<TodoItem {...defaultProps} />);
      
      expect(screen.getByTitle('Edit')).toBeInTheDocument();
      expect(screen.getByTitle('Delete')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty text gracefully', () => {
      const emptyProps = { ...defaultProps, text: '' };
      render(<TodoItem {...emptyProps} />);
      
      // Should render without crashing
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('handles very long text', () => {
      const longText = 'A'.repeat(1000);
      const longProps = { ...defaultProps, text: longText };
      render(<TodoItem {...longProps} />);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    test('handles special characters in text', () => {
      const specialText = 'Task with <script>alert("xss")</script> & special chars';
      const specialProps = { ...defaultProps, text: specialText };
      render(<TodoItem {...specialProps} />);
      
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });
  });
}); 