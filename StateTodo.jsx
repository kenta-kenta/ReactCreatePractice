import { useState } from "react";
import './StateTodo.css'

let maxId = 0;
export default function StateTodo() {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);
  const [desc, setDesc] = useState();


  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setTitle('')
    setTodo([
      ...todo,
      {
        id: ++maxId,
        title,
        created: new Date(),
        isDone: false,
        clear: false
      },
    ]);
  };

  const handleDone = (e) => {
    const todos = todo.map((item) => {
      if (item.id === Number(e.target.dataset.id)) {
        return {
          ...item,
          isDone: !item.isDone,
          clear : !item.clear
        };
      } else {
        return item;
      }
    })
    const sorted = [...todos];
    sorted.sort((m,n) => m.clear - n.clear );
    setTodo(sorted);
  };

  const handleDelete = e => {
    setTodo(todo.filter(item => 
        item.id !== Number(e.target.dataset.id)
      )
    )
  };

  const handleSort = () => {
    const sorted = [...todo];
    sorted.sort((m,n) => {
      if(desc) {
        return n.created.getTime() - m.created.getTime();
      } else {
        return m.created.getTime() - n.created.getTime();
      }
    });
    setDesc(d => !d);
    setTodo(sorted);
  };

  return (
    <>
      <form>
        <label htmlFor="title">
          やること：
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>
        <button type="button" onClick={handleClick}>
          追加
        </button>
        <button type="button" onClick={handleSort}>
          ソート（{desc ? '↑' : '↓'}）
        </button>
        <hr />
      </form>

      <ul>
        {todo.map((item) => (
          <li key={item.id} className={item.isDone ? "done" : ""}>
            {item.title}
            <button type="button" onClick={handleDone} data-id={item.id}>
              {item.clear ? '元に戻す' : '済'}
            </button>
            <button type="button" onClick={handleDelete} data-id={item.id}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
