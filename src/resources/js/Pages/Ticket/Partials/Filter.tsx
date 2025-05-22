import { useRef, FormEventHandler, PropsWithChildren, useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Category, FilterInputs } from '@/types';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';

export function addDefault(lista:Array<any>, itemDefault: any)
{
    if(lista.filter(item => item.id == 0).length == 0){
        lista.unshift(itemDefault);
    }    
}

export default function Filter({ onCategoryChange, onStatusChange, children }: PropsWithChildren & { onCategoryChange: (id:number) => void, onStatusChange: (id:string) => void}) {

    const [hasToken, setHasToken] = useState<boolean>(false);
    

    const [categories, setCategories] = useState<Category[]>([{ 
        id: 0, 
        name: "Selecione" 
    }]);
    
    const {
        data,
        setData,
    } = useForm({
        category_id: '',
        status: ''
        // category_id: ''
    });

    const changeCategoryHandle = (e: React.FormEvent<HTMLSelectElement>) => {
        setData('category_id', e.currentTarget.value);
        onCategoryChange(parseInt(e.currentTarget.value));
    };

    const changeStatusHandle = (e: React.FormEvent<HTMLSelectElement>) => {
        setData('status', e.currentTarget.value);
        onStatusChange(e.currentTarget.value);
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

    return (
        <div className="flex flex-col md:flex-row xs:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full">
                <div className="relative w-full">
            
                    <div className="mt-6 flex flex-col md:flex-row items-center">

                        <div className="w-full md:w-1/3">
                            {children}
                        </div>

                        <div className="w-full md:w-1/3">
                            <InputLabel htmlFor="category_id" value="Categoria" />
                            <select 
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-5 p-2  w-11/12"
                                name="category_id" 
                                id="category_id"
                                value={data.category_id} 
                                onChange={changeCategoryHandle}
                                >
                                    {categories.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                    )) }    
                            </select>  
                        </div>


                        <div className="w-full md:w-1/3">
                            <InputLabel htmlFor="status" value="Status" />
                            <select 
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-5 p-2  w-11/12"
                                name="status" 
                                id="status"
                                value={data.status} 
                                onChange={changeStatusHandle}
                                >
                                    <option value=""></option>
                                    <option value="aberto">Aberto</option>
                                    <option value="em progresso">Em Progresso</option>
                                    <option value="resolvido">Resolvido</option>
                            </select>  
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}