import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";


class DoodleAdmin extends React.Component {
  //Constructor for component
  constructor(props)
  {
    super(props)
    //Create a state thats an array that will hold the data from DB
    this.state = {

      times: [] 

    };
    
  }


  //Lifecycle method to get the data from the database
  componentDidMount() {
    //Calls method that updates states by using a fetch request from DB
    this.updateStates();

  }
  //Lifecycle method runs after DidMount to set the values based on the updated states
  componentDidUpdate() {
    this.setValue();
  }

  //This function updates the time values, checkbox values, and user name values from state
  setValue()
  {
    //Run a for loop for the 10 spots
    for(let i=0; i<this.state.times.length; i++)
    {
      //update each element with the correct data
      document.getElementById("time"+(i+1)).value = this.state.times[i].time;
      document.getElementById("uslot"+(i+1)).textContent = this.state.times[i].user;

      //if the user doesn't equal blank, then make sure checkbox is checked
      if(this.state.times[i].user != '')
      {
        document.getElementById("slot"+(i+1)).checked = true;
      }

    }
    

  }

  //This function calls the server and gets the data from the server using a fetch request
  updateStates(){
    //Get times and set to array in states
    fetch('http://localhost:5000/times')
      .then(res => res.json())
      .then(data => this.setState({'times':data}));
  }

  //This function is called once the save button is clicked
  updateTime(){
    //get new times and create an array
    let data = [];
    //For loop to create array based on new time values set in input boxes
    for(let i=0; i<this.state.times.length; i++)
    {
      let currentslot = i+1;
      let currenttime = document.getElementById("time"+(i+1)).value;
      let currentuser = document.getElementById("uslot"+(i+1)).textContent;

      data.push([currentslot,currenttime,currentuser])
    }

    

    
    //pass array to server using a post request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch('http://localhost:5000/send', options);

    //refresh page to show updated results
    window.location.reload(false);

  }

  //This function is called when the reset button is pushed
  resetVal(){
    //builds and empty dataset to pass to the server with just the slots and no users/times
    
    let data = [];
    //for loop to build data set
    for(let i=0; i<this.state.times.length; i++)
    {
      let currentslot = i+1;
      let currenttime = '';
      let currentuser = '';

      data.push([currentslot,currenttime,currentuser])
    }
    
    //pass array to server to update using fetch POST
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch('http://localhost:5000/send', options);

    //refresh page
    window.location.reload(false);
    

  }

  //Render method for component
  render()
  {
    return(
      <div>
        <h1>Welcome to the Admin Edit Page!</h1>
        <label>You can only update the times. Once done, press save. The users currently have meetings will be shown </label>
        <br></br>
        <label id="nameinput" >Name</label>
        <input id="nameinput" type="text" />
        <br></br>
        <table>
            <th>Times</th>
            <tr>
              <td><input class="timeinput" id="time1" type="text" /></td>
              <td><input class="timeinput" id="time2" type="text" /></td>
              <td><input class="timeinput" id="time3" type="text" /></td>
              <td><input class="timeinput" id="time4" type="text" /></td>
              <td><input class="timeinput" id="time5" type="text" /></td>
              <td><input class="timeinput" id="time6" type="text" /></td>
              <td><input class="timeinput" id="time7" type="text" /></td>
              <td><input class="timeinput" id="time8" type="text" /></td>
              <td><input class="timeinput" id="time9" type="text" /></td>
              <td><input class="timeinput" id="time10" type="text" /></td>
            </tr>
            <tr>
              <td> <input class= "slotbox" id="slot1" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot2" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot3" type="checkbox" />  </td>
              <td> <input class= "slotbox" id="slot4" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot5" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot6" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot7" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot8" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot9" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot10" type="checkbox" /> </td>
            </tr>
            <tr>
              <td> <label class="userlabel" id="uslot1" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot2" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot3" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot4" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot5" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot6" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot7" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot8" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot9" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot10" type="text">user1</label></td>
            </tr>
        </table>
        
        <button id="savebtn" onClick={() => this.updateTime()}>Save</button>
        <button id="savebtn" onClick={() => this.resetVal()}>Reset</button>
      </div>
      
    );

    
  }
  

}

class DoodleGuest extends React.Component {
  //This class is mostly similar to DoodleAdmin above with slight changes
  //Constructor for class component
  constructor(props)
  {
    super(props)
    
    this.state = {

      times: [] 

    };
    
  }


  //Lifecycle method to get the data from the database
  componentDidMount() {
    
    this.updateStates();

  }

  //Lifecycle method set the values
  componentDidUpdate() {
    this.setValue();
  }

  //Method called when webpage loads
  setValue()
  {
    //Runs a for loop
    for(let i=0; i<this.state.times.length; i++)
    { 
      //Sets the time values based on state
      document.getElementById("time"+(i+1)).textContent = this.state.times[i].time;
      
      //Set the user values and checkbox values for users that are already taken that time slot
      if(this.state.times[i].user != '')
      {
        document.getElementById("slot"+(i+1)).checked = true;
        document.getElementById("slot"+(i+1)).disabled = true;
        document.getElementById("uslot"+(i+1)).textContent = 'taken';
      }
      else{
        //Set the user value for slots that are open. the text below will say currently open
        document.getElementById("uslot"+(i+1)).textContent = 'open'
      }
      

    }
    

  }

  //Update states method contacts server to get DB information
  updateStates(){
    //Get times and set to array in states
    fetch('http://localhost:5000/times')
      .then(res => res.json())
      .then(data => this.setState({'times':data}));
  }

  //Update time method is called when the save button is pressed by guest
  updateTime(){
    //get times and create an array
    let data = [];
    let index = 0;

    //For loop to build data set
    for(let i=0; i<this.state.times.length; i++)
    {
      
      //for checkboxes that are checked and disabled, then that is already taken so a guest cannot allocate.
      //Create that data based on already existing data in state
      if((document.getElementById("slot"+(i+1)).checked == true) && (document.getElementById("slot"+(i+1)).disabled == true))
      {
        let currentslot = i+1;
        let currenttime = document.getElementById("time"+(i+1)).textContent;
        let currentuser = this.state.times[i].user;
        data.push([currentslot,currenttime,currentuser])
      }
      //next check if slot is not checked and not disabled, therefore this is just an empty slot that the guest has not chosen 
      else if((document.getElementById("slot"+(i+1)).checked == false) && (document.getElementById("slot"+(i+1)).disabled == false))
      {
        //Set the values as empty for that time
        let currentslot = i+1;
        let currenttime = document.getElementById("time"+(i)).textContent;
        let currentuser = '';
        data.push([currentslot,currenttime,currentuser])
      }
      //lastly find the slot that the guest has checked and is not disabled, this is the new slot that this guest wants to schedule
      else if((document.getElementById("slot"+(i+1)).checked == true) && (document.getElementById("slot"+(i+1)).disabled == false))
      {
        //if they have not already picked another slot based on index
        if(index==0)
        {
          //then get the values from the name text box and add into data array
          let currentslot = i+1;
          let currenttime = document.getElementById("time"+(i)).textContent;
          let currentuser = document.getElementById("namei").value;
          index=1;
          data.push([currentslot,currenttime,currentuser])
        }
        else{
          //This code will run if the user has checked more than one time slot to allocate to.. it will alert and use the earliest
          alert("Sorry you've checked more than one time slot.. the earliest time slot chosen was set.");
          let currentslot = i+1;
          let currenttime = document.getElementById("time"+(i)).textContent;
          let currentuser = '';
          data.push([currentslot,currenttime,currentuser])
        }
      }

      
    }
    
    
    

    
    //pass data array to server to update DB using POST with fetch
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch('http://localhost:5000/send', options);

    //refresh page
    window.location.reload(false);
  
  }
  
  
  //Render method
  //Difference from DoodleAdmin is that the time inputs are just labels here since guest can't edit times
  render()
  {
    return(
      <div>
        <h1>Welcome to the Guest Schedule Page!</h1>
        <label>You add your name and select ONE available time slot. Once done, press save.</label>
        <br></br>
        <label id="nameinput" >Name</label>
        <input id="namei" type="text" />
        <br></br>
        <table>
            <th>Times</th>
            <tr>
              <td><label class="timeinput" id="time1" type="text" /></td>
              <td><label class="timeinput" id="time2" type="text" /></td>
              <td><label class="timeinput" id="time3" type="text" /></td>
              <td><label class="timeinput" id="time4" type="text" /></td>
              <td><label class="timeinput" id="time5" type="text" /></td>
              <td><label class="timeinput" id="time6" type="text" /></td>
              <td><label class="timeinput" id="time7" type="text" /></td>
              <td><label class="timeinput" id="time8" type="text" /></td>
              <td><label class="timeinput" id="time9" type="text" /></td>
              <td><label class="timeinput" id="time10" type="text" /></td>
            </tr>
            <tr>
              <td> <input class= "slotbox" id="slot1" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot2" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot3" type="checkbox" />  </td>
              <td> <input class= "slotbox" id="slot4" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot5" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot6" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot7" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot8" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot9" type="checkbox" /> </td>
              <td> <input class= "slotbox" id="slot10" type="checkbox" /> </td>
            </tr>
            <tr>
              <td> <label class="userlabel" id="uslot1" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot2" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot3" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot4" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot5" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot6" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot7" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot8" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot9" type="text">user1</label></td>
              <td> <label class="userlabel" id="uslot10" type="text">user1</label></td>
            </tr>
        </table>
        
        <button id="savebtn" onClick={() => this.updateTime()}>Save</button>
        
      </div>
      
    );

    
  }
  

}

//Home page component
class Home extends React.Component {
  //constructor
  constructor(props)
  {
    super(props)
    
    
    
    
  }
  //method that is called once the login button is clicked. 
  verifyAdmin(info) {
    //gets current entered username and password
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //make sure it isn't blank
    if(username == undefined || password == undefined)
    {
      alert("Username or password is not defined to log in")
    }
    else
    {
      //see if it matches the admin username/password saved in the database
      //side note, the admin username is admin and the password is 123 --- you can find this in the Person table in DB
      if(username == info[0].username && password == info[0].password)
      {
        alert('useranme & pass is valid! redirecting to edit page!')
        //Once username and password are validated, take to page to edit
        window.location.href = "./admin";
        
        
      }
      else{
        //If the credentials are incorrect, alert user
        alert('incorrect admin credentials. please try again')
      }
      
    }

    
  }

  //Render method for home page
  render()
  {
    return(
      <div>
        <h1>Welcome to the login screen!</h1>
        <label>Please login or choose to go in as a guest </label>
        <label>Username</label>
        <input id="username" type="text" />
        <label>Password</label>
        <input id="password" type="password" />
        
        <button class="loginbtn" onClick= {() => {
          //onclick of login button, check the credentials for admin

          //Get admin username and password then call the verify admin function with that data
          fetch('http://localhost:5000/users')
          .then(res => res.json())
          .then(data => this.verifyAdmin(data));

        }}>Login</button>
        
        <button class="guestbtn" onClick={() => {window.location.href = "./guest";}}>Continue As Guest</button>
      </div>

    );

    
  }
  

}

//React dom is setup with React Router to have different components loaded in at different stages
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/admin" element={<DoodleAdmin />} />
        <Route path="/guest" element={<DoodleGuest />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
