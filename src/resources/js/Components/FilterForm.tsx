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
            {children != undefined && (<div className="xs:w-full">
                <div className="relative w-full">
                {children}
                </div>
            </div>)}
        </div>
    </>);
}