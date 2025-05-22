// LeadSourceIndex.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, FormEventHandler, useEffect } from 'react';
import { useForm, usePage, Link  } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { PageProps, Paginator, Ticket  } from '@/types';
import Filter from './Partials/Filter';
import Pagination from '@/Components/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

export default function TicketIndex({ auth, page, filter }: PageProps<{ page: Paginator, filter: any }>) {


    const [filterStatus, setFilterStatus] = useState();
    const [hasToken, setHasToken] = useState<boolean>(false);
    const [confirmingNewDealer, setConfirmingNewDealer] = useState(false);
    const [tickets,setTickets] = useState<Ticket[]>();

    const confirmNewLeadSource = () => {
        setConfirmingNewDealer(true);
    };

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

            const token = localStorage.getItem("authToken"); // Token armazenado após login
            console.log(token);
            const response = await axios.get(
                `/api/tickets`,
                {
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

    }, [filterStatus, hasToken]);

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
        description: ''
        // category_id: ''
    });
    
    const closeModal = () => {
        setConfirmingNewDealer(false);

        reset();
    };

    const createTicket: FormEventHandler = (e) => {
        e.preventDefault();

        store(route('api.tickets.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };



    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tickets</h2>}
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">   
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">

                        <Filter search={""} filter={filter}>
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
                                            <Link href={route('tickets.edit',item.id)} className='mr-1'>
                                                <SecondaryButton >Editar</SecondaryButton>
                                            </Link>
                                           
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

            <Modal show={confirmingNewDealer} onClose={closeModal}>
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

                        <InputError message={errors.title} className="mt-2" />
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

                        <InputError message={errors.description} className="mt-2" />
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
