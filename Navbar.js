import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed-top shadow navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/"><img src="/images/check2-circle.svg" alt="#" />todo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navLinks" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse align-right" id="navLinks">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink exact className="nav-link" to="/">Todos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/add">Add Todo</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
