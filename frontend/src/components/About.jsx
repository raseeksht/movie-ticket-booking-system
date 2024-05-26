import React,{useState} from 'react'
import { Accordion,AccordionTitle,AccordionContent,AccordionPanel } from 'flowbite-react'

function About() {
    const [active,setActive] = useState(2)

  return (
    <>
    <Accordion activeItem={2}>
        <AccordionPanel isOpen={active == 1}>
            <AccordionTitle>One</AccordionTitle>
            <AccordionContent>
                one content
            </AccordionContent>
        </AccordionPanel>

        <AccordionPanel isOpen={active == 2}>
            <AccordionTitle>two</AccordionTitle>
            <AccordionContent>
                one content
            </AccordionContent>
        </AccordionPanel>

        <AccordionPanel isOpen={active == 3}>
            <AccordionTitle>Three</AccordionTitle>
            <AccordionContent>
                one content
            </AccordionContent>
        </AccordionPanel>
    
  </Accordion>
    
    </>
  )
}

export default About