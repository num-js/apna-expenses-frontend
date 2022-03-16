import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@material-ui/core';
import AddKhataForm from '../Khata/AddKhataForm';

function Dropdown() {

    const [showDropdown, setShowDropdown] = useState(false);

    const { selectedKhata, allKhatas } = useSelector(state => state.khataReducer);
    const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

    return (
        <>
            <div class="dropdown inline-block relative">
                <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    <span class="mr-1">{selectedKhata?.title}</span>
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul class={`dropdown-menu absolute text-gray-700 pt-1 z-10 bg-gray-300 mt-2 whitespace-nowrap ${!showDropdown ? 'hidden' : ''}`} style={{ borderRadius: '4px' }}>
                    <div class="py-3 px-4 text-gray-900 dark:text-white bg-gray-400 hover:bg-gray-500 hover:text-gray-100 cursor-pointer">
                        <span class="block" onClick={() => setToggleBottomSheet(true)}> + Add Khata</span>
                    </div>
                    {
                        allKhatas?.map(khata => (
                            <li class="">
                                <a class="bg-gray-200 hover:bg-gray-500 hover:text-gray-100 py-2 px-4 block whitespace-no-wrap" href="#">
                                    {khata.title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Drawer
                anchor={"bottom"}
                open={toggleBottomSheet}
                onClose={() => setToggleBottomSheet(false)}
                style={{ background: 'transparent' }}
            >
                <AddKhataForm setToggleBottomSheet={setToggleBottomSheet} />
            </Drawer>
        </>
    )
}

export default Dropdown;