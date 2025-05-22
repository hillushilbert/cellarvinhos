import { useRef, FormEventHandler, PropsWithChildren } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FilterInputs } from '@/types';

export default function FilterForm({ routeName, filter, children }: PropsWithChildren & { routeName: any, filter: FilterInputs}) {

    const searchInput = useRef<HTMLInputElement>(null);

    const { data, setData, get , errors, processing, recentlySuccessful } = useForm({
        search: filter.search
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        get(route(routeName));
    };

    return (<>
        <div className="flex flex-col md:flex-row xs:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {children != undefined && (<div className="xs:w-1/4 sm:w-3/12 md:w-2/12 w-4/12">
                <div className="relative w-full">
                {children}
                </div>
            </div>)}
            <div className="xs:w-3/4 sm:w-9/12 md:w-10/12 w-8/12">
                <form className="flex items-center" onSubmit={submit}>
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 sm:w-1/2 md:w-4/12   focus:border-primary-500 pl-10 p-2 " placeholder="Search" 
                            value={data.search} 
                            ref={searchInput}
                            onChange={(e) => setData('search', e.target.value)}
                            required={false} />
                        
                        <PrimaryButton disabled={processing}>Pesquisar</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </>);
}