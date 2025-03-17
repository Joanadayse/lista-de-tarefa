import { useEffect, useState } from "react";
import "./listadetarefas.css"
import { FaTrash } from "react-icons/fa";

export default function ListaDeTarefas(){
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [filtro,setFiltro]= useState("")

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    if (Array.isArray(tarefasSalvas)) {
      setTarefas(tarefasSalvas);
    }
  }, []);

  // Atualizar o localStorage sempre que tarefas for alterado
  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);

function adicionarTarefa() { 
if (novaTarefa.trim() === "") return; 
setTarefas([...tarefas, novaTarefa]); 
setNovaTarefa(""); 
} 


const tarefasFiltradas = filtro
  ? tarefas.filter((tarefa) =>
      tarefa.toLowerCase().includes(filtro.toLowerCase())
    )
  : [];


  function removerTarefa(index) {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas)); // Atualiza localStorage após remoção
  }

 
    return (
      <div className="container">
        <h2>Adicionar tarefa</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>

        <ul className="task-list">
          {tarefas.map((tarefa, index) => (
            <li key={index}>
              {tarefa}{" "}
              <button
                className="delete-btn"
                onClick={() => removerTarefa(index)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <h2>Buscar tarefa</h2>
        <div className="input-group">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="buscar tarefa"
          />
        </div>

        {/* {filtro && (
          <ul>
            {tarefasFiltradas.length > 0 ? (
              tarefasFiltradas.map((tarefa, index) => (
                <li key={index}>{tarefa}</li>
              ))
            ) : (
              <p>Nenhuma tarefa encontrada</p>
            )}
          </ul>
        )} */}

        {filtro && (
          <ul className="task-list">
            {tarefasFiltradas.length > 0 ? (
              tarefasFiltradas.map((tarefa, index) => (
                <li key={index}>{tarefa}</li>
              ))
            ) : (
              <p className="empty-message">Nenhuma tarefa encontrada</p>
            )}
          </ul>
        )}
      </div>
    );
}