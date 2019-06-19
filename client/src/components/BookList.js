import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
  displayBooks() {
    const { loading, error, books } = this.props.data;

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error.message}</div>;

    // Sort book by name
    books.sort((a, b) => a.name.localeCompare(b.name));

    return books.map(book => <li key={book.id}>{book.name}</li>);
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
