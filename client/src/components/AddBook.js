/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  // Submit the book data to db
  submitForm(e) {
    e.preventDefault();
    // console.log(this.state);

    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  onBookNameChange(e) {
    this.setState({ name: e.target.value });
  }
  onBookGenreChange(e) {
    this.setState({ genre: e.target.value });
  }
  onBookAuthorChange(e) {
    this.setState({ authorId: e.target.value });
  }

  displayAuthors() {
    let { loading, authors } = this.props.getAuthorsQuery;
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    }

    // Sort author by name
    authors.sort((a, b) => a.name.localeCompare(b.name));

    return authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={this.onBookNameChange.bind(this)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={this.onBookGenreChange.bind(this)} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.onBookAuthorChange.bind(this)}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
