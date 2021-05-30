import React, { useState } from 'react'

import {
  Select,
 } from '@chakra-ui/react'

import {fetchProjects} from '../utils/atom'
import {useRecoilValue} from 'recoil'

import {useUser} from '@clerk/clerk-react'

import {useParams} from 'react-router-dom'


const ProjectDropdown = ({handleChange, defaultValue}) => {
  
  return (
    <>
      <Select borderWidth={2} onChange={handleChange} borderColor='brandpurple.100' color='white' w={200} placeholder='Select Project'>
        <React.Suspense fallback={null}>
          <ProjectOptions defaultValue={defaultValue} />
        </React.Suspense>
      </Select>
    </>
  )
}

const ProjectOptions = ({defaultValue}) => {
  const projects = useRecoilValue(fetchProjects);
  const user = useUser()
  
  return (
    <>
      {projects.map((data, index) => {
        if (data.uuid === defaultValue) {
          return <option selected key={index} value={data.uuid}>{data.name}</option>
        } else {
          return <option key={index} value={data.uuid}>{data.name}</option>
        }
      })}
    </>
  )
}

export default ProjectDropdown