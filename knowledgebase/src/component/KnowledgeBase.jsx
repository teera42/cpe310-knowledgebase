import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KnowledgeForm from './KnowledgeForm';
import KnowledgeList from './KnowledgeList';

const KnowledgeBase = () => {
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      try {
        const response = await axios.get('http://localhost:3001/knowledgebaseeditor');
        setKnowledgeBase(response.data);
      } catch (error) {
        console.error('Error fetching knowledge base:', error);
      }
    };

    fetchKnowledgeBase();
  }, []);

  const addKnowledgeEntry = async (newKnowledgeEntry) => {
    try {
      const response = await axios.post('http://localhost:3001/knowledgebaseeditor', newKnowledgeEntry);
      setKnowledgeBase((prevKnowledgeBase) => [...prevKnowledgeBase, response.data]);
    } catch (error) {
      console.error('Error adding knowledge entry:', error);
    }
  };

  const editKnowledgeEntry = async (id, updatedKnowledgeEntry) => {
    try {
      await axios.put(`http://localhost:3001/knowledgebaseeditor/${id}`, updatedKnowledgeEntry);
      setKnowledgeBase((prevKnowledgeBase) =>
        prevKnowledgeBase.map((entry) => (entry.id === id ? updatedKnowledgeEntry : entry))
      );
    } catch (error) {
      console.error('Error editing knowledge entry:', error);
    }
  };

  const deleteKnowledgeEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/knowledgebaseeditor/${id}`);
      setKnowledgeBase((prevKnowledgeBase) => prevKnowledgeBase.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting knowledge entry:', error);
    }
  };

  return (
    <div>
      <KnowledgeForm addKnowledgeEntry={addKnowledgeEntry} />
      <KnowledgeList
        knowledgeBase={knowledgeBase}
        editKnowledgeEntry={editKnowledgeEntry}
        deleteKnowledgeEntry={deleteKnowledgeEntry}
      />
    </div>
  );
};

export default KnowledgeBase;
