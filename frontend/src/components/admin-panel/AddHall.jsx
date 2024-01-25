import React from 'react'
import { TextInput,Label,Accordion } from 'flowbite-react'

function AddHall() {
  return (
    <>
    <div className='container dark:text-slate-300'>
        <h1 className='text-2xl font-bold mb-5'>Add/Edit Hall Information</h1>
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>Add New Hall</Accordion.Title>
                <Accordion.Content>
                    this is contenct
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Add New Hall</Accordion.Title>
                <Accordion.Content>
                    this is contenct
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Add New Hall</Accordion.Title>
                <Accordion.Content>
                    this is contenct
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>

    </div>
    </>
  )
}

export default AddHall