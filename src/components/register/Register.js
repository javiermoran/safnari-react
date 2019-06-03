import React from 'react';

const Register = () => (
  <div className="Register">
    <div class="container">
      <h1>Create account</h1>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" class="form-control" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input type="password" class="form-control" placeholder="Password" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Repeat password" />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
);

export default Register;
