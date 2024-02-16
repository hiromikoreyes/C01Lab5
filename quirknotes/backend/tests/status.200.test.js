const fetch = require("node-fetch");

test("1+2=3, empty arraWy is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  await deleteAll();

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(Array.isArray(getAllNotesBody.response)).toBe(true);
  expect(getAllNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  await deleteAll();

  let i = 0;
  while (i < 2) {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `test`,
        content: `test`,
      }),
    });

    const addedResBody = await addedRes.json();
    expect(addedRes.status).toBe(200);
    expect(addedResBody.response).toBe("Note added succesfully.");
    i++;
  }

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  await deleteAll();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
    
      const addedRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `abc`,
          content: `abc`,
        }),
      });

      const addedResBody = await addedRes.json();

      expect(addedRes.status).toBe(200)
      expect(addedResBody.response).toBe("Note added succesfully.")


      const deletedRes = await fetch(`${SERVER_URL}/deleteNote/${addedResBody.insertedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `abc`,
          content: `abc`,
        }),
      });

      const deletedBody = await deletedRes.json();

      const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const getAllNotesBody = await getAllNotesRes.json();

      expect(deletedRes.status).toBe(200)
      expect(getAllNotesBody.response.length).toBe(0);
      expect(deletedBody.response).toBe(`Document with ID ${addedResBody.insertedId} deleted.`)
      await deleteAll()
});

  test("/patchNote - Patch with content and title", async () => {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `abc`,
          content: `abc`,
        }),
      });

      const addedResBody = await addedRes.json();

      expect(addedRes.status).toBe(200)
      expect(addedResBody.response).toBe("Note added succesfully.")

      const patchRes = await fetch(`${SERVER_URL}/patchNote/${addedResBody.insertedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `123`,
          content: `123`,
        }),
      });

      const patchBody = await patchRes.json();

      const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const getAllNotesBody = await getAllNotesRes.json();

      expect(patchRes.status).toBe(200)
      expect(getAllNotesBody.response[0].title).toBe(`123`)
      expect(getAllNotesBody.response[0].content).toBe(`123`)
      expect(patchBody.response).toBe(`Document with ID ${addedResBody.insertedId} patched.`)
      await deleteAll()
  });

  test("/patchNote - Patch with just title", async () => {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `abc`,
        content: `abc`,
      }),
    });

    const addedResBody = await addedRes.json();

    const patchRes = await fetch(`${SERVER_URL}/patchNote/${addedResBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `123`
      }),
    });

    const patchBody = await patchRes.json();
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const getAllNotesBody = await getAllNotesRes.json();

    expect(patchRes.status).toBe(200)
    expect(getAllNotesBody.response[0].title).toBe(`123`)
    expect(getAllNotesBody.response[0].content).toBe(`abc`)

    expect(patchRes.status).toBe(200)
    expect(patchBody.response).toBe(`Document with ID ${addedResBody.insertedId} patched.`)
    await deleteAll()
  });

  test("/patchNote - Patch with just content", async () => {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `abc`,
        content: `abc`,
      }),
    });

    const addedResBody = await addedRes.json();

    const patchRes = await fetch(`${SERVER_URL}/patchNote/${addedResBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `123`
      }),
    });

    const patchBody = await patchRes.json();
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const getAllNotesBody = await getAllNotesRes.json();

    expect(patchRes.status).toBe(200)
    expect(getAllNotesBody.response[0].title).toBe(`abc`)
    expect(getAllNotesBody.response[0].content).toBe(`123`)
    expect(patchBody.response).toBe(`Document with ID ${addedResBody.insertedId} patched.`)
    await deleteAll()
  });

  test("/deleteAllNotes - Delete one note", async () => {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `abc`,
        content: `abc`,
      }),
    });


    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      body: {
        "Content-Type": "application/json",
      },
    });
    
    const deleteAllBody = await deleteAllRes.json();

    expect(deleteAllRes.status).toBe(200)
    expect(deleteAllBody.response).toBe(`1 note(s) deleted.` )
    await deleteAll()
  });

  test("/deleteAllNotes - Delete three notes", async () => {

    for(let i = 0; i < 3; i++){
      const addedRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `test`,
          content: `test`,
        }),
      });
    }

    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      body: {
        "Content-Type": "application/json",
      },
    });
    
    const deleteAllBody = await deleteAllRes.json();

    expect(deleteAllRes.status).toBe(200)
    expect(deleteAllBody.response).toBe(`3 note(s) deleted.` )
    await deleteAll()
  });

  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const addedRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `test`,
        content: `test`,
      }),
    });

    const addedResBody = await addedRes.json()

    const color = "#FF0000";
    const updateColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${addedResBody.insertedId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color }),
    });

    const updateColorBody = await updateColorRes.json();

    expect(updateColorRes.status).toBe(200)
    expect(updateColorBody.message).toBe(`Note color updated successfully.`)
    deleteAll()
  });

// Helper Function
const deleteAll = async () => {
  const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    body: {
      "Content-Type": "application/json",
    },
  });
};
