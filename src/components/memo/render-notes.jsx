import { uuidv4 } from '@/helpers';
import update from 'immutability-helper';
import { HAS_WINDOW, STORAGE_NOTES } from '@/helpers/constant';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ListItem } from './list-item';
import 'react-toastify/dist/ReactToastify.css';

const initForm = {
  title: '',
  _id: '',
};

const RenderNotes = ({ setData }) => {
  const [refetchNotes, setRefetchNotes] = useState(false);
  const [notes, setNotes] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NOTES));

    if (data !== null) {
      return data || [];
    }

    return [];
  });

  useEffect(() => {
    if (HAS_WINDOW) {
      localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes));
    }
  }, [notes, refetchNotes]);

  const inputRef = useRef(null);
  const [form, setForm] = useState(initForm);

  const onChange = useCallback((event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();

    const payload = {
      title: form.title,
      _id: uuidv4(),
    };

    setNotes((prev) => {
      return [...prev, payload];
    });

    setForm(initForm);

    setRefetchNotes((p) => !p);

    toast.success('Create note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    inputRef.current.focus();
  }, []);

  const editNote = useCallback((data) => {
    setNotes((prev) => {
      const findNote = prev.find((p) => p._id === data._id);

      findNote.title = data.title;

      return [...prev];
    });

    setRefetchNotes((p) => !p);

    toast.info('Updated this note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }, []);

  const removeNote = useCallback((id) => {
    setNotes((prev) => {
      const notes = prev.filter((p) => p._id !== id);
      return notes;
    });

    setRefetchNotes((p) => !p);

    toast.error('Removed this note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }, []);

  const removeAllNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        notes: notes,
      };
    });
  }, [notes]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setNotes((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  const listNotes = useCallback(() => {
    return notes.map((note, idx) => {
      return <ListItem key={note._id} note={note} index={idx} moveCard={moveCard} editNote={editNote} removeNote={removeNote} />;
    });
  }, [notes]);

  console.log('re-render notes');

  return (
    <div>
      <div className='flex justify-between border-b mb-4 pb-4'>
        <h2 className='text-2xl'>Notes List</h2>
        <button className='p-2 bg-neutral-200 rounded-md' type='button' onClick={removeAllNotes}>Clear All</button>
      </div>

      <form className='grid' onSubmit={onSubmit}>
        <div className='flex gap-2'>
          <input className='px-4 rounded-md bg-neutral-200 w-max p-2' ref={inputRef} type="text" name="title" placeholder="Notes" value={form.title} onChange={onChange} />
          <button className='rounded-md bg-purple-700 text-white p-2 px-4' type="submit">Save</button>
        </div>
      </form>

      {notes.length > 0 ? <ul className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">{listNotes()}</ul> : <p className='p-4'>No found data</p>}
    </div>
  );
};

export default RenderNotes;
// export default memo(RenderNotes);
