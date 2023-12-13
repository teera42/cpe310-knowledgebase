import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import{BsFillTrashFill , BsFillPencilFill}from 'react-icons/bs'
import { RiSubtractFill } from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css'
const KnowledgeList = ({ knowledgeBase, editKnowledgeEntry, deleteKnowledgeEntry }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedEntry, setEditedEntry] = useState(null);
  const [newRule, setNewRule] = useState({ Rulename: '', description: '' });
const[search,setSearch] = useState('')
  const handleEditClick = (entry) => {
    setEditMode(entry.id);
    setEditedEntry({ ...entry });
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedEntry(null);
  };

  const handleEditRule = (index, field, value) => {
    setEditedEntry((prevEntry) => ({
      ...prevEntry,
      Rule: prevEntry.Rule.map((rule, i) => (i === index ? { ...rule, [field]: value } : rule)),
    }));
  };

  const handleAddRule = () => {
    setEditedEntry((prevEntry) => ({
      ...prevEntry,
      Rule: [...prevEntry.Rule, { ...newRule }],
    }));
    setNewRule({ Rulename: '', description: '' });
  };

  const handleRemoveRule = (index) => {
    setEditedEntry((prevEntry) => ({
      ...prevEntry,
      Rule: prevEntry.Rule.filter((_, i) => i !== index),
    }));
  };

  const handleSaveEdit = () => {
    editKnowledgeEntry(editedEntry.id, editedEntry);
    setEditMode(null);
    setEditedEntry(null);
  };

  return (
    <div>
      <Container style={{fontSize:'16px'}}>
        <Form>
        <InputGroup className="my-3">
        <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Search for Knowledge"/>
        </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr >
            <th>KnowledgeNo.</th>
            <th>KnowledgeName</th>
            <th>Rule/Description</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeBase.filter((entry)=>{
               return search.toLowerCase()===' '? entry:entry.knowledge.toLowerCase().includes(search);
            }).map((entry) => (
          <tr key={entry.id}>
            <td>k{entry.id}</td>
            <td>{entry.knowledge}</td>
            
            {editMode === entry.id ? (
              <div>
                {/* Edit Form for Knowledge Entry */}
                <div>
                  KnowledgeName:
                  <input style={{width:'70%'}}
                    type="text"
                    name="knowledge"
                    value={editedEntry.knowledge}
                    onChange={(e) => setEditedEntry({ ...editedEntry, knowledge: e.target.value })}
                  />
                </div>
                {/* Edit Form for Rules */}
                <ul>
                  {editedEntry.Rule.map((rule, index) => (
                    <div  key={index}>
                      <div style={{paddingTop:'10px'}}>
                        Rule Name:
                        <input
                          type="text"
                          name="Rulename"
                          value={rule.Rulename}
                          onChange={(e) => handleEditRule(index, 'Rulename', e.target.value)}
                        />
                      </div>
                      <div style={{padding:'10px'}}>
                        Description:
                        <input
                          type="text"
                          name="description"
                          value={rule.description}
                          onChange={(e) => handleEditRule(index, 'description', e.target.value)}
                        />
                      </div>
                      <button style={{fontSize:'16px'}} className='btn btn-danger'
                       onClick={() => handleRemoveRule(index)}>Remove Rule</button>
                    </div>
                  ))}
                </ul>

                {/* Add Rule Form */}
                <div  style={{padding:'10px'}}>
                  Rule Name:
                  <input
                    type="text"
                    name="Rulename"
                    value={newRule.Rulename}
                    onChange={(e) => setNewRule({ ...newRule, Rulename: e.target.value })}
                  />
                </div>
                <div>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={newRule.description}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  />
                </div>
                <br />
                <div style={{display:'flex',justifyContent:'center',gap:'30px',padding:'10px',fontSize:'12px'}}>
                <button className='btn btn-success' onClick={handleAddRule}>Add Rule</button>
                {/* Buttons for saving and canceling edits */}
                <button className='btn btn-primary' onClick={handleSaveEdit}>Save</button>
                <button className='btn btn-danger' onClick={handleCancelEdit}>Cancel</button></div>
              </div>
            ) : (
              <div>
                {entry.Rule.length > 0 && (
                  <div>
                    {entry.Rule.map((rule, index) => (
                      <div key={index}>
                        <td>Rule:{rule.Rulename}
                        {rule.description && <label style={{marginLeft:'30px'}}>Description: {rule.description}</label>}</td>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            )}<td> 
                <button className='btn btn-primary' style={{marginRight:'30px'}}onClick={() => handleEditClick(entry)}><BsFillPencilFill/>Edit</button>
                <button className='btn btn-danger' onClick={() => deleteKnowledgeEntry(entry.id)}><BsFillTrashFill/>Delete</button></td>
          </tr>
        ))}
          </tbody>
        </Table>
      </Container>

    </div>
    
  );
};

export default KnowledgeList;
