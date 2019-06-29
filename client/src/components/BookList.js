import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
  // Intial state
  state = {
    selected: null,
  };

  displayBooks() {
    const { loading, error, books } = this.props.data;

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error.message}</div>;

    // Sort book by name
    books.sort((a, b) => a.name.localeCompare(b.name));

    return books.map(book => (
      <li key={book.id} onClick={e => this.setState({ selected: book.id })}>
        {book.name}
      </li>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <ul id="book-list">{this.displayBooks()}</ul>
        </div>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
