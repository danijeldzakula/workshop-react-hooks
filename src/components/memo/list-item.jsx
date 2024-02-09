import { ESCAPE_CODE, ESCAPE_KEY, ESC_KEY, HAS_WINDOW } from '@/helpers/constant';
import { useEffect, useId, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import 'react-toastify/dist/ReactToastify.css';

export const ListItem = ({ note, index, moveCard, editNote, removeNote }) => {
  const id = useId();
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState({
    updateTitle: note.title,
    _id: note._id,
  });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const toggleEditNote = () => {
    setToggle(true);

    setTimeout(() => {
      inputRef && inputRef?.current.focus();
    }, 0);
  };

  const handleSaveNote = (event) => {
    event.preventDefault();
    const payload = {
      title: form.updateTitle,
      _id: form._id,
    };
    editNote(payload);
    setToggle(false);
  };

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const onEscape = (event) => {
    if (event.key === ESCAPE_KEY || event.key === ESC_KEY || event.which === ESCAPE_CODE) {
      setToggle(false);
    }
  };

  useEffect(() => {
    toggle && HAS_WINDOW && window.addEventListener('keydown', onEscape, false);

    return () => {
      toggle && HAS_WINDOW && window.removeEventListener('keydown', onEscape, false);
    };
  }, [toggle]);

  return (
    <li className='p-4 bg-neutral-200 flex flex-col gap-4' ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {!toggle ? (
        <div>
          <p className='p-4 bg-white min-h-[100px] mb-4 rounded-md'>{note.title}</p>
          <button className='px-4 bg-orange-400 rounded-md p-2 w-full' type='button' onClick={toggleEditNote}>Edit</button>
        </div>
      ) : (
        <form className='grid gap-4' onSubmit={handleSaveNote}>
          <textarea className='p-4 bg-white min-h-[100px] rounded-md w-full' ref={inputRef} id={id} type="text" value={form.updateTitle} name="updateTitle" placeholder="Notes" onChange={onChange} />
          <button className='px-4 bg-green-700 text-white rounded-md p-2 w-full' type="submit">Save</button>
        </form>
      )}

      <button className='px-4 bg-red-700 text-white rounded-md p-2 w-full' type='button' onClick={() => removeNote(note._id)}>Remove</button>
    </li>
  );
};