import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimalType } from '@/types';

interface EditAnimalModalProps {
  animal: AnimalType;
  onClose: () => void;
  onUpdate: (updatedAnimal: AnimalType) => Promise<void>;
}

const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  animal,
  onClose,
  onUpdate
}) => {
  const [editedAnimal, setEditedAnimal] = useState<AnimalType>(animal);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedAnimal);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-8 rounded-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-4'>Editar Animal</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block mb-2'
            >
              Nombre:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={editedAnimal.name}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block mb-2'
            >
              Descripción:
            </label>
            <textarea
              id='description'
              name='description'
              value={editedAnimal.description}
              onChange={(
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
              ) => handleInputChange(e)}
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='type'
              className='block mb-2'
            >
              Tipo:
            </label>
            <select
              id='type'
              name='type'
              value={editedAnimal.type}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            >
              <option value='dog'>Perro</option>
              <option value='cat'>Gato</option>
              <option value='other'>Otro</option>
            </select>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='age'
              className='block mb-2'
            >
              Edad:
            </label>
            <select
              id='age'
              name='age'
              value={editedAnimal.age}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            >
              <option value='puppy'>Cachorro</option>
              <option value='young'>Joven</option>
              <option value='adult'>Adulto</option>
              <option value='senior'>Anciano</option>
            </select>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='gender'
              className='block mb-2'
            >
              Género:
            </label>
            <select
              id='gender'
              name='gender'
              value={editedAnimal.genre}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            >
              <option value='unknown'>Desconocido</option>
              <option value='male'>Macho</option>
              <option value='female'>Hembra</option>
            </select>
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimalModal;