function Login() {
  
    return (
      <>
        <div className="login-container" id="login-container">
          <div className="login-form-container signup-container">
            <form action="#">
              <h2>Create Account</h2>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Navn" name="" id="" />
              <input type="email" placeholder="Email" name="" id="" />
              <input type="password" placeholder="Passord" name="" id="" />
              <button id="signUp">Sign Up</button>
            </form>
          </div>
          <div className="signup-form-container signin-container">
            <form action="#">
              <h2>Create Account</h2>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Navn" name="" id="" />
              <input type="email" placeholder="Email" name="" id="" />
              <input type="password" placeholder="Passord" name="" id="" />
              <button id="signIn">Sign In</button>
            </form>
          </div>
        </div>
      </>
    )
  }
  
  export default Login