import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/sessionActions'; //

const mapStateToProps = ({ errors }) => ({
  errors: errors.session
});

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user))
});

class HomePage extends React.Component {
  state = {form: false, email: 'admin@cert.crm', password: 'adminDemo'};

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
            <input type='text' placeholder='Email'
                   defaultValue='admin@cert.crm'/>
            <input type='password' placeholder='Password'
                   defaultValue='adminDemo' onChange/>
            <span onClick={() => signIn({email, password})}
                  style={backgroundColor: 'gray'}>Sign In
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
