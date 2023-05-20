import React from "react";
import { Link } from "react-router-dom";

function Authentication({title, name, btnSubmit, isLogin ,children, onSubmit}) {
    return (
        <section className="auth">
          <div className="auth__container">
            <h2 className="auth__title">{title}</h2>
            <form action="#" className="auth__form"  name={name} onSubmit={onSubmit}>
              {children}
              <button className="auth__submit-button" type="submit">{btnSubmit}</button>
              <Link className="auth__link" to="/sign-in">{isLogin}</Link>
            </form>
          </div>
        </section>
      );
}

export default Authentication;
