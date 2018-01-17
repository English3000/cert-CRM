import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/sessionActions';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session
});

const mapDispatchToProps = dispatch => ({
  SignIn: user => dispatch(signIn(user))
});

 //POTENTIAL BUGS: inputs
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: false, email: 'admin@cert.crm', password: 'adminDemo'};
  }

  render() {
    const { errors, SignIn } = this.props;
    const { form, email, password } = this.state;

    return (<div id='home-page'>
      <main style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: 700}}>
        <p style={{fontSize: 50}}>Company Page</p>
      </main>
      <footer style={{position: 'absolute', bottom: 0, zIndex: 2, width: '100%',
                      backgroundColor: 'black', color: 'white', display: 'flex',
                      padding: 7.5}}>
        <span className='clickable'
              onClick={() => this.setState({form: !form})}>Admin</span>
        <div>
          {form ? <div style={{display: 'flex'}}>
              <input type='text' placeholder='Email' autoFocus
                     defaultValue={email} style={{marginLeft: 7.5}}
                     onChange={event => this.setState({email: event.target.value})}/>
              <input type='password' placeholder='Password'
                     defaultValue={password} style={{marginLeft: 7.5}}
                     onChange={event => this.setState({password: event.target.value})}/>
              <span className='clickable' onClick={() => SignIn({email, password})}
                    style={{marginLeft: 7.5, backgroundColor: 'white', color: 'black',
                            borderRadius: 2, paddingLeft: 5, paddingRight: 5}}>Sign In
              </span>
          </div> : <div>&emsp;</div>}
          <p style={{fontSize: 12}}>{errors ? errors.map(
            err => <span key={`${err}`} style={{color: 'white'}}>{`${err}. `}</span>
          ) : <span key='no-errors'>&emsp;</span>}</p>
        </div>
      </footer>
    </div>); //errors aren't appearing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
