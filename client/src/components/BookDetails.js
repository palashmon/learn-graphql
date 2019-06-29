import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { loading, error, book } = this.props.data;

    if (loading) return <div>Loading book details...</div>;
    if (error) return <div>{error.message}</div>;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>
            <b>Genre:</b> {book.genre}
          </p>
          <p>
            <b>Author:</b> {book.author.name}
          </p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>No book selected...</div>;
  }
  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId,
    },
  }),
})(BookDetails);
