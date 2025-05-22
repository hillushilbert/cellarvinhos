import { useRef, useState, FormEventHandler, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Category } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';



export function addDefault(lista:Array<any>, itemDefault: any)
{
    if(lista.filter(item => item.id == 0).length == 0){
        lista.unshift(itemDefault);
    }    
}

export default function UpdateTicketForm({ ticketId, onCloseModal }: { ticketId:number, onCloseModal: ()=> void  }) {
  
    const [confirmingUserUpdating, setConfirmingUserUpdating] = useState(false);
    const [errorMessage,setErrorMessage] = useState<string>();
    
    const {
        data,
        setData,
        patch: patch,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        description: '',
        category_id: '',
        status: ''
    });

    const confirmUserUpdating = () => {
        setConfirmingUserUpdating(true);
    };

    const closeModal = () => {
        setConfirmingUserUpdating(false);
        setErrorMessage('');
        reset();
        onCloseModal();
    };

    const [categories, setCategories] = useState<Category[]>([{ 
        id: 0, 
        name: "Selecione" 
    }]);

    useEffect(() => {
        
        const fetchTicket = async() => {
            try 
            {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(
                  `/api/tickets/${ticketId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Passando um token no header
                            "Accept": "application/json", // Adicionando um header personalizado
                        },
                    }
                );
                console.log(response.data);
                setData({...data, 
                    title: response.data.title,
                    description: response.data.description,
                    category_id: response.data.category_id,
                    status: response.data.status,
                });

            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        }
        // Inicialmente, carregamos todas as opções
        if(confirmingUserUpdating){
            fetchTicket();
        }
    }, [ticketId, confirmingUserUpdating]);

    useEffect(() => {
        const fetchCategories = async() => {
            try 
            {

                const token = localStorage.getItem("authToken"); // Token armazenado após login
                console.log(token);
                const response = await axios.get(
                    `/api/categories`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Passando um token no header
                            "Accept": "application/json", // Adicionando um header personalizado
                        },
                    }
                );
                console.log(response.data);
                addDefault(response.data.data,{id:0, name:""});
                setCategories(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        }

        if(confirmingUserUpdating)
            fetchCategories();

    }, [confirmingUserUpdating]);

    const updateTicket: FormEventHandler = async (e) => {
        
        e.preventDefault();
        let response;
        try 
        {
            const token = localStorage.getItem("authToken"); // Token armazenado após login

            response = await axios.put(
                `/api/tickets/${ticketId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Passando um token no header
                        "Accept": "application/json", // Adicionando um header personalizado
                    },
                }
            );
            console.log(response.data);
            closeModal();
        } catch (error) {
            console.error('Erro ao buscar opções:', error);
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) {
                setErrorMessage(error.response.data.errors);
            } else {
                setErrorMessage('Ocorreu um erro desconhecido.');
            }
        }
    };

    return (
        <>
            <SecondaryButton onClick={confirmUserUpdating} className='mr-1'>Editar</SecondaryButton>

            <Modal show={confirmingUserUpdating} onClose={closeModal}>
                <form onSubmit={updateTicket} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Criar nova Marca
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Nome Empresa" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="Nome da Empresa"
                        />

                        <InputError message={typeof errorMessage === 'object' && errorMessage !== null ? (errorMessage as any).title : undefined} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="description" value="Descrição" />

                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="Marca"
                        />

                        <InputError message={typeof errorMessage === 'object' && errorMessage !== null ? (errorMessage as any).description : undefined} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="category_id" value="Categoria" />
                        <select 
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-5 p-2  w-11/12"
                            name="category_id" 
                            id="category_id"
                            value={data.category_id} 
                            onChange={(e)=> { setData('category_id', e.target.value)}}
                            >
                            {categories.map(item => (
                                    <option value={item.id}>{item.name}</option>
                            )) }  
                        </select>  

                        <InputError message={typeof errorMessage === 'object' && errorMessage !== null ? (errorMessage as any).category_id : undefined} className="mt-2" />
                    </div>
                    
                    <div className="mt-6">
                        <InputLabel htmlFor="status" value="Status" />
                        <select 
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-5 p-2  w-11/12"
                            name="status" 
                            id="status"
                            value={data.status} 
                            onChange={(e)=> { setData('status', e.target.value)}}
                            >
                                <option value=""></option>
                                <option value="aberto">Aberto</option>
                                <option value="em progresso">Em Progresso</option>
                                <option value="resolvido">Resolvido</option>
                        </select>  

                        <InputError message={typeof errorMessage === 'object' && errorMessage !== null ? (errorMessage as any).status : undefined} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Salvar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
 