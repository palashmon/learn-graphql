import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends Component {
  displayBooks() {
    const { loading, error, books } = this.props.data;

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>Error :(</div>;

    return books.map(book => {
      return <li key={book.id}>{book.name}</li>;
    });
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
