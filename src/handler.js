const notes = require("./notes");

const addNoteHandler = (req, h) => {
  const { title, tag, body } = req.payload;
  const id = new Date().getTime().toString();
  const createAt = new Date().toString();
  const updateAt = createAt;
  const newNote = {
    title,
    tag,
    body,
    id,
    createAt,
    updateAt,
  };
  notes.push(newNote);
  const isSucces = notes.filter((note) => note.id === id).length > 0;
  if (isSucces) {
    const response = h.response({
      status: "succes",
      message: "Catatan Berhasil Tambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);

    return response;
  }
  const response = h.response({
    status: "succes",
    message: "Catatan Gagal Di Tambahkan",
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = () => ({
  status: "succes",
  data: {
    notes,
  },
});
const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id === id);
  if (note !== undefined) {
    return {
      status: "succes",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Data Tidak Ditemukan !",
  });
  response.code(404);
  return response;
};

const editNoteHandler = (req, h) => {
  const { id } = req.params;
  const { title, tag, body } = req.payload;
  const updateAt = new Date().getTime().toString();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title: title || notes[index].title,
      tag: tag || notes[index].tag,
      body: body || notes[index].body,
      updateAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
      data: {
        notes,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Catatan berhasil di hapus",
      data: {
        notes,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal menghapus catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteHandler,
  deleteNoteHandler,
};
