import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResult from '../SearchResult';

// Mock data for testing
const mockResults = [
  { name: 'Location 1', latitude: '40.7128', longitude: '-74.0060', score: '0.9' },
  { name: 'Location 2', latitude: '34.0522', longitude: '-118.2437', score: '0.8' },
];

describe('SearchResult Component', () => {
  test('renders the table with search results when results are provided', () => {
    render(<SearchResult results={mockResults} />);

    // Check if the table headers are rendered
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('latitude')).toBeInTheDocument();
    expect(screen.getByText('longitude')).toBeInTheDocument();
    expect(screen.getByText('score')).toBeInTheDocument();

    // Check if the mock results are rendered
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('40.7128')).toBeInTheDocument();
    expect(screen.getByText('-74.0060')).toBeInTheDocument();
    expect(screen.getByText('0.9')).toBeInTheDocument();

    expect(screen.getByText('Location 2')).toBeInTheDocument();
    expect(screen.getByText('34.0522')).toBeInTheDocument();
    expect(screen.getByText('-118.2437')).toBeInTheDocument();
    expect(screen.getByText('0.8')).toBeInTheDocument();
  });

  test('renders the "No results found" message when no results are provided', () => {
    render(<SearchResult results={[]} />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
