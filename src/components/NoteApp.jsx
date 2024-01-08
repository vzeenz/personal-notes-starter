import React, { useState } from "react";
import { getInitialData, showFormattedDate } from "../utils";

function NoteApp() {
  const [getData, setData] = useState(getInitialData);
  // console.log(getData);

  const [Title, setTitle] = useState("");
  // console.log(Title);

  const [Isi, setIsi] = useState("");
  // console.log(Isi);

  const [search, setSearch] = useState("");
  // console.log(search);

  let isArc = getData
    .filter((data) => data.archived == true)
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search.toLowerCase());
    });
  let isnotArc = getData
    .filter((data) => data.archived == false)
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search.toLowerCase());
    });

  let Tgl = showFormattedDate(new Date());

  function addData() {
    let newData = {
      id: +new Date(),
      title: Title,
      body: Isi,
      createdAt: Tgl,
      archived: false,
    };

    setData([...getData, newData]);
  }

  function deleteData(id) {
    const dataBaru = getData.filter((data) => data.id !== id);
    setData(dataBaru);
  }

  function archiveData(id) {
    const dataBaru = getData.map((data) => {
      if (id == data.id) {
        return { ...data, archived: !data.archived };
      }
      return data;
    });

    setData(dataBaru);
  }

  return (
    <>
      <header className="note-app__header">
        <h1>Notes</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="search"
          type="text"
        />
      </header>
      <div className="note-app__body">
        <div className="note-input">
          <h2>Enter Notes</h2>
          <p className="note-input__title__char-limit">Remaining Characters</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={Title}
          />
          <textarea
            value={Isi}
            onChange={(e) => setIsi(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"></textarea>
          <button onClick={addData}>Send</button>
        </div>
      </div>

      <div className="note-app__body">
        <h2>Catatan Active</h2>
        <div className="notes-list">
          {getData
            .filter((arsp) => arsp.archived == false)
            .filter((cari) => {
              return search.toLocaleLowerCase() === ""
                ? cari
                : cari.title.toLocaleLowerCase().includes(search.toLowerCase());
            })
            .map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-item__content">
                  <h2 className="note-item__title">{note.title}</h2>
                  <p className="note-item__date">
                    {showFormattedDate(note.createdAt)}
                  </p>
                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    onClick={() => deleteData(note.id)}
                    className="note-item__delete-button">
                    Delete
                  </button>
                  <button
                    onClick={() => archiveData(note.id)}
                    className="note-item__archive-button">
                    Archive
                  </button>
                </div>
              </div>
            ))}
          {isnotArc.length ? (
            ""
          ) : (
            <h1 className="notes-list__empty-message">data kosong</h1>
          )}
        </div>
      </div>

      <div className="note-app__body">
        <h2>Archive</h2>
        <div className="notes-list">
          {getData
            .filter((arsp) => arsp.archived == true)
            .filter((cari) => {
              return search.toLocaleLowerCase() === ""
                ? cari
                : cari.title.toLocaleLowerCase().includes(search.toLowerCase());
            })
            .map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-item__content">
                  <h2 className="note-item__title">{note.title}</h2>
                  <p className="note-item__date">
                    {showFormattedDate(note.createdAt)}
                  </p>
                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    onClick={() => deleteData(note.id)}
                    className="note-item__delete-button">
                    Delete
                  </button>
                  <button
                    onClick={() => archiveData(note.id)}
                    className="note-item__archive-button">
                    Archive
                  </button>
                </div>
              </div>
            ))}
          {isArc.length ? (
            ""
          ) : (
            <h1 className="notes-list__empty-message">data kosong</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default NoteApp;
