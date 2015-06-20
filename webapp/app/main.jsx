'use strict';

const React = require('react');
const Qwest = require('qwest');

class SampleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Loading /api/hello' };
  }
  componentDidMount() {
    Qwest.get('/api/hello').then(
      function(response) {
        this.setState({ text: 'Response received: ' + response.text });
      }.bind(this)
    );
  }
  someCallback() {
    window.console.log("this is a callback! ");
  }
  render() {
    var Button = require('react-bootstrap').Button;

    return (
      <div>
        <header className="padded"><h1>Sample Application</h1></header>
        <main className="text-center padded">
          <section>
            <h2>Nice!</h2>
            <img src="/assets/images/robot.svg" width="400" height="400" />
            <pre>{this.state.text}</pre>
            <Button bsStyle="success" bsSize="small" onClick={this.someCallback}>
              Something
            </Button>
          </section>
        </main>
      </div>
    );
  }
}

React.render(<SampleApplication />, document.body);
