"use client"

import React, { useState } from 'react'

interface Props {
    id?: string;
}

const Expandable = (props: Props) => {
    const { id } = props;
    const [dropDowns, setDropDowns] = useState<{ [key: string]: boolean }>({})
    const handleClick = (id: string) => {
        console.log(id, "id---");
        
        setDropDowns((pre) => ({ ...pre, [id]: !pre[id] }))
    }
    console.log(dropDowns, "dropdowns----");

    return (
        <button className='border-black border p-1 text-black' onClick={() => handleClick(id || '')}>
            Expand
        </button>
    )
}

export default Expandable