import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/sessionActions';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  SignIn: user => dispatch(signIn(user))
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: false, email: 'admin@cert.crm', password: 'demoAdmin'};
  }

  render() {
    const { errors, SignIn } = this.props;
    const { form, email, password } = this.state;

    return (<div id='home-page'>
      <main style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: 700}}>
        <p style={{fontSize: 50}}>Your Company Page</p>
      </main>
      <footer style={{position: 'fixed', bottom: 0, zIndex: 2, width: '100%',
                      backgroundColor: 'black', color: 'white', display: 'flex',
                      padding: 7.5}}>
        <button className='clickable' style={{height: 22.5}}
                onClick={() => this.setState({form: !form})}>Admin</button>
        <div>
          {form ? <div style={{display: 'flex'}}>
              <input type='text' placeholder='Email' autoFocus
                     defaultValue={email} style={{marginLeft: 7.5}}
                     onChange={event => this.setState({email: event.target.value})}/>
              <input type='password' placeholder='Password'
                     defaultValue={password} style={{marginLeft: 7.5}}
                     onChange={event => this.setState({password: event.target.value})}/>
              <button className='clickable button' onClick={() => SignIn({email, password})}
                    style={{marginLeft: 7.5, backgroundColor: 'white', color: 'black'}}>
                Sign In
              </button>
          </div> : <div>&emsp;</div>}
          <p style={{fontSize: 12, marginLeft: 7.5, marginTop: 2.5}}>{errors.length > 0 ? errors.map(
            err => <span key={`${err}`} style={{color: 'white'}}>{`${err}. `}</span>
          ) : <span key='no-errors' style={{color: 'black'}}>&emsp;</span>}</p>
        </div>
      </footer>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
