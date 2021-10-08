// import React from 'react';

// import Input from '../../shared/components/FormElements/Input';
// import Button from '../../shared/components/FormElements/Button';
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH
// } from '../../shared/util/validators';
// import { useForm } from '../../shared/hooks/form-hook';
// import './PlaceForm.css';


// import Select from 'react-select'

// // const colourOptions = [
// //   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
// //   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
// //   { value: 'purple', label: 'Purple', color: '#5243AA' },
// //   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
// //   { value: 'orange', label: 'Orange', color: '#FF8B00' },
// //   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
// //   { value: 'green', label: 'Green', color: '#36B37E' },
// //   { value: 'forest', label: 'Forest', color: '#00875A' },
// //   { value: 'slate', label: 'Slate', color: '#253858' },
// //   { value: 'silver', label: 'Silver', color: '#666666' },
// // ]


// const NewPlace = () => {
//   const [formState, inputHandler] = useForm(
//     {
//       title: {
//         value: '',
//         isValid: false
//       },
//       description: {
//         value: '',
//         isValid: false
//       },
//       address: {
//         value: '',
//         isValid: false
//       },
//       assignedTo: {
//         value: '',
//         isValid: true
//       }
//     },
//     false
//   );

//   const placeSubmitHandler = event => {
//     event.preventDefault();
//     console.log(formState.inputs); // send this to the backend!
//   };

//   return (
//     <form className="place-form" onSubmit={placeSubmitHandler}>
//       <Input
//         id="title"
//         element="input"
//         type="text"
//         label="Title"
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText="Please enter a valid title."
//         onInput={inputHandler}
//       />
//       <Input
//         id="description"
//         element="textarea"
//         label="Description"
//         validators={[VALIDATOR_MINLENGTH(5)]}
//         errorText="Please enter a valid description (at least 5 characters)."
//         onInput={inputHandler}
//       />
//       <Input
//         id="address"
//         element="input"
//         label="Address"
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText="Please enter a valid address."
//         onInput={inputHandler}
//       />
//      <Select
//      id="assignedTo"
//      element="input"
//     isMulti
//     name="colors"
//     options={colourOptions}
//     className="basic-multi-select"
//     classNamePrefix="select"
//     onInput={(e)=> {

//       const assignedToState = formState.assignedTo.value 
//       assignedToState = e.target;
//       inputHandler(assignedToState);
//     }
//     }
//   />
//       <Button type="submit" disabled={!formState.isValid}>
//         ADD PLACE
//       </Button>
//     </form>
//   );
// };

// export default NewPlace;
//fn component in most cases
//TODO look up when to use class component
//import Layout from '../../Shared/components/Layout';
//import axios from "axios";
import React,{ useState } from 'react';
 import Select from 'react-select'
//import Dropdown from './Dropdown';
//import DropCustom from '../../Shared/components/DropCustom';


const colourOptions = [
  { value: 'Joey', label: 'Joey', color: '#00B8D9', name:'Joey' },
  { value: 'Juan', label: 'Juan', color: '#0052CC' , name:'Juan'},
  { value: 'Maria', label: 'Maria', color: '#5243AA', name:'Maria' }
  
]

const DEFAULT_DATA = {
    title: "Some Title",
    description: "",
    link: "",
    priority:"2",
    timeToFinish: 60,
    creator: "u3",
  
}

const options = [
    { label: "Brad", value: "Brad" },
    { label: "Chad", value: "mango" },
    { label: "Drew", value: "strawberry" },
  ];

// const options = [
//     { label: "Grapes 🍇", value: "grapes" },
//     { label: "Mango 🥭", value: "mango" },
//     { label: "Strawberry 🍓", value: "strawberry", disabled: true },
//   ];

  
const NewPlace = () => {
    const [ form, setForm ] = useState(DEFAULT_DATA);

    // const submitForm = () => {
    //     //request POST , vs absolute path
    //     fetch("/api/resources"), {
                                //^
    //         body: JSON.stringify(form),
    //         headers: {"Content-Type": "application/json"},
    //         method: "POST"
        
    //     }
    // }

    const submitForm = () => {

       // axios.post("/api/resources", form)
        // fetch("/api/resources", {
        //   body: JSON.stringify(form),
        //   headers: {"Content-Type": "application/json"},
        //   method: "POST"
        // })
       
        //axios.post('http://localhost:8080/api/resources', form);
console.log(form);
        return fetch('http://localhost:8080/api/resources', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response;
                // console.log(response);
                // window.location.reload();
              } else {
               console.log('Somthing happened wrong');
              }
        }).catch(err => err);
           // .then(response => this.setState({ articleId: response.data.id }));
      }

     

    const resetForm = () => setForm(DEFAULT_DATA);

    const handleChange = (e) => {
        //console.log("Input is called/changing");
        //console.log(e.target.value);
        //console.log("called on:" + e.target.name );
        const { name, value } = e.target;
        
        setForm({ 
            ...form,
            [name]: value
         });
         //

        // console.log(form);
    }
    const handleAssignChange = (e) => {
      //console.log("Input is called/changing");
      //console.log(e.target.value);
      //console.log("called on:" + e.target.name );
      //const {  value } = e.target;
      console.log("input" + e);
      setForm({ 
          ...form,
          assignedTo: e
       });

      // console.log(form);
  }
    //console.log(form);
    
    return (
      <div>
      <div>
      <div className="container">
          <div className="columns">
              <div className="column is-8 is-offset-2">
                  <div className="resource-form">
                     
                      <h1 className="title">Add New Resource</h1>
                          <form>
                              <div className="field">
                                  <label className="label">Title</label>
                                  <div className="control">
                                      <input 
                                      value={form.title}
                                      onChange={handleChange}
                                      name="title"
                                      className="input" 
                                      type="text" 
                                      placeholder="Learn Next JS and Sanity IO" />
                              </div>
                          </div>
                              <div className="field">
                                  <label className="label">Description</label>
                                  <div className="control">
                                      <textarea 
                                      value={form.description}
                                      onChange={handleChange}
                                      name="description"
                                      className="textarea" 
                                      placeholder="Learn these technologies because they are very popular and enable better SEO">
                                      </textarea>
                              </div>
                              </div>
                          <div className="field">
                                  <label className="label">Link</label>
                                  <div className="control">
                                      <input 
                                      value={form.link}
                                      onChange={handleChange}
                                      name="link"
                                      className="input" 
                                      type="text" 
                                      placeholder="https://academylink.com" />
                              </div>
                          </div>
                          <div className="field">
                              <label className="label">Priority</label>
                              <div className="control">
                                  <div className="select">
                                  <select 
                                  value={form.priority}
                                  onChange={handleChange}
                                  name="priority"
                                  >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </select>
                                  </div>
                              </div>
                              </div>
                          <div className="field">
                                  <label className="label">Time to Finish</label>
                                  <div className="control">
                                      <input
                                      value={form.timeToFinish}
                                      onChange={handleChange}
                                      name="timeToFinish"
                                       className="input" 
                                       type="number" 
                                       placeholder="60 (Time is in minutes)" />
                              </div>
                              <p className="help">Time in minutes</p>
                          </div>
                          <div className="field">  
                          <Select
 inputValue={form.assignedTo}
  onInputChange={handleAssignChange}
    id="assignedTo"
    element="input"
    isMulti
    name="colors"
    options={colourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    
    
  /> 
                          </div>
                          <div className="field is-grouped">
                              <div className="control">
                                  <button 
                                  type="button"
                                  onClick={submitForm}
                                  className="button is-link">Submit</button>
                              </div>
                             
                            
                              <div className="control">
                                  <button 
                                  type="button"
                                  onClick={resetForm}
                                  className="button is-link is-light">Cancel</button>
                              </div>
                              </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      
      </div>
      </div>
            
    )
}

export default NewPlace;

