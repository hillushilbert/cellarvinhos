import { useRef, FormEventHandler, PropsWithChildren } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FilterInputs } from '@/types';
import FilterForm from '@/Components/FilterForm';

export default function Filter({ search, filter, children }: PropsWithChildren & { search: String, filter: FilterInputs}) {


    return (
        <FilterForm routeName={"tickets.index"} filter={filter} >
            {children}
        </FilterForm>
        );
}