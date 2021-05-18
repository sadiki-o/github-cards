import React from 'react'
import './App.css'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor() {
    super()
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    if(!navigator.onLine){
      alert("No internet Connection")
      this.setState({value:""})
    }else{
      fetch(`https://api.github.com/users/${this.state.value}`)
    .then(res => res.json())
    .then(
         (data) => {
          if(data.message == "Not Found"){
            alert(`user ${this.state.value} was not found`)
            this.setState({value:""})
          }else{
            let found = false;
            this.props.posts.forEach(element => {
              if(element[0] == data.id){
                alert(`name ${data.login} already exist`)
                this.setState({value:""})
                found = true;
              }
            });
            if(!found){
              this.props.dispatch({
              type: 'ADD_POST',
              payload: [data.id, data.login, data.avatar_url] 
            })
              this.setState({value:""})
            }
          }
         }
    )
    event.preventDefault()
    
    }
    
  }

  handleDelete(e){
    let n = [...this.props.posts]
    n.forEach((el,index) => {
      if(el[0] == e.target.id){
        this.props.dispatch({type:"REMOVE_ITEM", payload:index})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Github Cards</h1>
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
            placeHolder="Enter a github user"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div>
              <button type="submit" className="sub" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </form>
          <div className="cards-list">
            {this.props.posts.map(post => (
            <div className="card" key={post[0]}>
              <img alt="user-profile" className="card-image" src={post[2]}/>
              <p>{post[1]}</p>
              <button class="delete" id={post[0]} onClick={this.handleDelete}>Delete</button>
            </div>
            
          ))}
          </div>
          
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return { posts: state.posts }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)