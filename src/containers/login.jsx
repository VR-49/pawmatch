import React from "react";

const LoginContainer = () => {
  return (
    <div className="login-container">
        <h1>PawMatch</h1>
        <h4>login</h4>
        <form onSubmit={handleSubmit}>
        <div>
          <label>
              Username: 
              <input
                type="text"
                value={username}
                onchange={e => setUsername(e.target.value)}
              />
          </label>
        </div>  
        <div>
            <label>
                Password: 
                <input 
                type='password'
                value = {password}
                onchange={e => setPassword(e.target.value)}>
                </input>
            </label>
            </div>
        </form>
        <span><a href='/createAccount'>Create an account.</a></span>
    </div>
  )
}

export default LoginContainer;