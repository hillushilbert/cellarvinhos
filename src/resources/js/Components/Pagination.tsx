import React from 'react';
import { Link } from '@inertiajs/react';

interface LinkProps {
    active: boolean;
    url: string;
    label: string;
}
  
export default function Pagination({ links } : {links: Array<LinkProps>}) {
  
    function getClassName(active: boolean) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-carrerablue-100 focus:border-primary focus:text-white bg-carrerablue-200 text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }
    console.log(links);
    console.log(` links length ${links.length}` );
    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => {
                        link.label = link.label.replace("&laquo; Previous", "<<");
                        link.label = link.label.replace("&laquo; Anterior", "<<");
                        link.label = link.label.replace("Next &raquo;", ">>");
                        link.label = link.label.replace("Próximo &raquo;", ">>");
                        return (
                            link.url === null ?
                                    (<div
                                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                        >{link.label}</div>) :
  
                                    (<Link
                                                className={getClassName(link.active)}
                                                href={ link.url }
                                            >{link.label}</Link>)
                                    )
                    })}
                </div>
            </div>
        )
    );
}