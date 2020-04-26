import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getDataApi();
  }, []);

  async function getDataApi() {
    const { data } = await api.get("repositories");
    setRepositories(data);
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/aderson.decarvalho",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
    
      const updataRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(updataRepositories);
    } catch (erro) {
      alert('Erro delete Repository.')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;