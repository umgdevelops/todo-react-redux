import React, { Component } from 'react';
import axios from 'axios';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        description: '',
        priority: '',
        completed: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Add Form submitted:`);
    // console.log(`Todo Description: ${this.state.description}`);
    // console.log(`Todo Priority: ${this.state.priority}`);
    const newTodo = {
      description: this.state.description,
      priority: this.state.priority,
      completed: this.state.completed
    };
    
    axios.post('http://localhost:6001/todos/add', newTodo)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/');
    });

    this.setState({
      description: '',
      priority: '',
      completed: false
    })
    
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]:e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <h4>Create New Todo</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group"> 
              <label>Description: </label>
                <input type="text"
                  name = "description"
                  className="form-control"
                  placeholder="Enter new task"
                  value={this.state.description}
                  onChange={this.handleChange}
                  />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <label className="inline"><b>Priority:</b></label>
              </div>
              <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priority" 
                        id="priorityLow" 
                        value="Low"
                        checked={this.state.priority==='Low'} 
                        onChange={this.handleChange}
                        />
                <label htmlFor="priorityLow" className="form-check-label">Low</label>
              </div>
              <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priority" 
                        id="priorityMedium" 
                        value="Medium" 
                        checked={this.state.priority==='Medium'} 
                        onChange={this.handleChange}
                        />
                <label htmlFor="priorityMedium" className="form-check-label">Medium</label>
              </div>
              <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priority" 
                        id="priorityHigh" 
                        value="High" 
                        checked={this.state.priority==='High'} 
                        onChange={this.handleChange}
                        />
                <label htmlFor="priorityHigh" className="form-check-label">High</label>
              </div>
            </div>
            <button type="submit" className="btn btn-dark">Add Todo</button>
          </form>
      </div>
    )
  }
}

export default AddTodo