import React from "react";
import "./ProfileDetailsPage.scss";

function ProfileDetailsPage() {
  return (
    <div className="profile-details-page">
      <section className="section-info">
        <h2>Basic information</h2>
        <form>
          {/*E-Mail*/}
          <div>
            <label htmlFor="email" hidden>
              E-Mail
            </label>
            <span className="label">E-Mail</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-Mail"
            ></input>
          </div>
          {/*Login*/}
          <div>
            <label htmlFor="login" hidden>
              Login
            </label>
            <span className="label">Login</span>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Login"
            ></input>
          </div>
          {/*Name*/}
          <div>
            <label htmlFor="name" hidden>
              Name
            </label>
            <span className="label">Name</span>
            <input type="text" name="name" id="name" placeholder="Name"></input>
          </div>
          {/*Surname*/}
          <div>
            <label htmlFor="surname" hidden>
              Surname
            </label>
            <span className="label">Surname</span>
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
            ></input>
          </div>
        </form>
        <button className="save-btn accent">Save</button>
      </section>
      <section className="section-info">
        <h2>Password</h2>
        <form>
          {/*Password1*/}
          <div>
            <label htmlFor="password1" hidden>
              Password
            </label>
            <span className="label">Password</span>
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder="Password"
            ></input>
          </div>
          {/*Password2*/}
          <div>
            <label htmlFor="password2" hidden>
              Repeat Password
            </label>
            <span className="label">Confirm password</span>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repeat Password"
            ></input>
          </div>
        </form>
        <button className="save-btn accent">Save</button>
      </section>
    </div>
  );
}

export default ProfileDetailsPage;
