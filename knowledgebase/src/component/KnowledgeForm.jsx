import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/KnowledgeForm.css'
const KnowledgeForm = ({ addKnowledgeEntry}) => {
  const [newEntry, setNewEntry] = useState({
    knowledge: '',
    Rule: [
      {
        Rulename: '',
        description: '',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const addRule = () => {
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      Rule: [...prevEntry.Rule, { Rulename: '', description: '' }],
    }));
  };

  const handleChangeRule = (index, e) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      Rule: prevEntry.Rule.map((rule, i) => (i === index ? { ...rule, [name]: value } : rule)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addKnowledgeEntry(newEntry);
    setNewEntry({
      knowledge: '',
      Rule: [
        {
          Rulename: '',
          description: '',
        },
      ],
    });
  };
  
  return (
    <>
    <form onSubmit={handleSubmit}className='bg-input' >
       <label style={{marginLeft:'20px', paddingTop:'40px'}} htmlFor="">Knowledge:
        <input  style={{ width:'80%',marginLeft:'20px'}}type="text" name="knowledge" placeholder='KnowledgeName'  value={newEntry.knowledge} required onChange={handleChange} />
        {newEntry.Rule.map((rule, index) => (
          <div style={{display:'flex' , alignContent:'center' ,padding:'30px'}} key={index}>
            <span style={{marginRight:'15px'}}> Rules:</span>
           <input style={{marginRight:'15px'}}
              type="text"
              name="Rulename"
              value={rule.Rulename}
              onChange={(e) => handleChangeRule(index, e)}
              placeholder="If Or Then" required />
             <span style={{marginRight:'15px'}}> Description:</span>
            <input style={{marginRight:'15px'}}
              type="text"
              name="description"
              value={rule.description}
              onChange={(e) => handleChangeRule(index, e)}
              placeholder="Description" required /> 
              <button className='btn btn-success' type="button" onClick={addRule}><IoMdAdd/></button></div>
              
         
        ))}
       </label>
       <div>
      <button style={{marginBottom:'15px'}} className='btn btn-primary' type="submit">Add Knowledge</button></div>
    </form></>
  );
};

export default KnowledgeForm;

