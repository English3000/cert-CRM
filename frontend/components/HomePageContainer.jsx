import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/sessionActions';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session
});

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user))
});

 //POTENTIAL BUGS: inputs
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: false, email: 'admin@cert.crm', password: 'adminDemo'};
  }

  render() {
    const { errors, signIn } = this.props;
    const { form, email, password } = this.state;

    return (<div id='home-page'>
      <main style={{display: 'flex', flex: 1}}></main>
      <footer style={{position: 'absolute', bottom: 0, zIndex: 2,
                      backgroundColor: 'black'}}>
        <span onClick={() => this.setState({form: !form})}>Admin</span>
        {form ? <div>
          <div style={{display: 'flex'}}>
            <input type='text' placeholder='Email' autoFocus
                   defaultValue={email} style={{marginLeft: 5}}
                   onChange={event => this.setState({email: event.target.value})}/>
            <input type='password' placeholder='Password'
                   defaultValue={password} style={{marginLeft: 5}}
                   onChange={event => this.setState({password: event.target.value})}/>
            <span onClick={() => signIn({email, password})}
                  style={{backgroundColor: 'gray', marginLeft: 5}}>Sign In
            </span>
          </div>
          <p style={{color: 'white'}}>{errors ? errors.map(
            err => <span>{`${err}. `}</span>
          ) : ' '}</p>
        </div> : null}
      </footer>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
