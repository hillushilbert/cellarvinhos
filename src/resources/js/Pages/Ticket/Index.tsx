// LeadSourceIndex.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, FormEventHandler, useEffect } from 'react';
import { useForm, usePage, Link  } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Category, PageProps, Paginator, Ticket  } from '@/types';
import Filter from './Partials/Filter';
import Pagination from '@/Components/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import UpdateTicketForm from './Partials/UpdateTicketForm';

export function addDefault(lista:Array<any>, itemDefault: any)
{
    if(lista.filter(item => item.id == 0).length == 0){
        lista.unshift(itemDefault);
    }    
}

export default function TicketIndex({ auth, page, filter }: PageProps<{ page: Paginator, filter: any }>) {


    const [categorySelected, setCategorySelected] = useState<number>(0);
    const [statusSelected, setStatusSelected] = useState<string>('');
    const [hasToken, setHasToken] = useState<boolean>(false);
    const [confirmingNewTicket, setConfirmingNewTicket] = useState(false);
    const [confirmingStoreTicket, setConfirmingStoreTicket] = useState(false);
    const [tickets,setTickets] = useState<Ticket[]>();
    const [errorMessage,setErrorMessage] = useState<string>();

    const confirmNewLeadSource = () => {
        setConfirmingNewTicket(true);
    };

    const onCategoryChange = (id:number) => {
        console.log(`category_id: ${id}`);
        setCategorySelected(id);
    }

    const onStatusChange = (status:string) => {
        console.log(`status: ${status}`);
        setStatusSelected(status);
    }

    const [categories, setCategories] = useState<Category[]>([{ 
        id: 0, 
        name: "Selecione" 
    }]);


    useEffect(() => {
        const fetchToken = async() => {
            try 
            {
                if(hasToken == false || localStorage.getItem("authToken") == undefined){
                    const response = await axios.get(
                        `/get-token`
                    );
                    console.log(response.data);
                    setHasToken(true);
                    localStorage.setItem("authToken",response.data.token);
                }
            } catch (error) {
                setHasToken(false);
                console.error('Erro pegar dado de authenticacao:', error);
            }
        }

        fetchToken();
    }, [hasToken]);

    useEffect(() => {
        const fetchTickets = async() => {
            try 
            {
                let url = `/api/tickets`;
                let params = {};

                if(categorySelected > 0 || statusSelected != ''){
                    params = {
                        category_id: categorySelected,
                        status: statusSelected
                    }
                }

                const token = localStorage.getItem("authToken"); // Token armazenado após login
                console.log(token);
                const response = await axios.get(
                    `/api/tickets`,
                    {
                        params: params,
                        headers: {
                            Authorization: `Bearer ${token}`, // Passando um token no header
                            "Accept": "application/json", // Adicionando um header personalizado
                        },
                    }
                );
                console.log(response.data);
                setTickets(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        }
        // Inicialmente, carregamos todas as opções
        if(hasToken){
            fetchTickets();
        }
    }, [hasToken, categorySelected, statusSelected, confirmingStoreTicket]);


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
        // Inicialmente, carregamos todas as opções
        if(hasToken){
            fetchCategories();
        }
    }, [hasToken]);

    const {
        data,
        setData,
        delete: destroy,
        post: store,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        description: '',
        category_id: ''
        // category_id: ''
    });
    
    const closeModal =  () => {
        setConfirmingStoreTicket(!confirmingStoreTicket);
        setConfirmingNewTicket(false);
        setErrorMessage('');
        reset();
    };

    const createTicket: FormEventHandler = async (e) => {
        
        e.preventDefault();
        let response;
        try 
        {
            
            const token = localStorage.getItem("authToken"); // Token armazenado após login

            response = await axios.post(
                `/api/tickets`,
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
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tickets</h2>}
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">   
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">

                        <Filter onStatusChange={onStatusChange} onCategoryChange={onCategoryChange}>
                            <PrimaryButton onClick={confirmNewLeadSource}>Adicionar</PrimaryButton>
                        </Filter>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">Id</th>
                                        <th scope="col" className="px-4 py-3">Titulo</th>
                                        <th scope="col" className="px-4 py-3">Descrição</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3 text-end md:pr-20">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tickets && tickets.map(item => (
                                    <tr className="border-b ">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">{item.id}</th>
                                        <td className="px-4 py-3">{item.title}</td>
                                        <td className="px-4 py-3">{item.description}</td>
                                        <td className="px-4 py-3">{item.status}</td>
                                        <td className="px-4 py-3 flex items-center justify-end">         
                                            <UpdateTicketForm ticketId={item.id} onCloseModal={closeModal} />                                           
                                        </td>
                                    </tr>
                                )) }    
                                </tbody>
                            </table>
                            {/* <Pagination links={page.links} /> */}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingNewTicket} onClose={closeModal}>
                <form onSubmit={createTicket} className="p-6">
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

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Criar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
};
