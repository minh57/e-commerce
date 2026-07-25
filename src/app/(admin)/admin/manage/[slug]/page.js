'use client'
import {useParams} from 'next/navigation';
import DynamicCrudPage from '@/app/components/DynamicCrudPage';
export default function Page(){
    const {slug} = useParams()
    return(
        <DynamicCrudPage slug={slug}/>
    );
}