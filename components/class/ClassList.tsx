import React from 'react'
import { ClassType } from '../../types/classTypes'
import ClassItem from './ClassItem'

interface PropsType {
  classList: ClassType[]
}

const ClassList = ({ classList }: PropsType) => {
  return (
    <div>
      {classList.map((classItem) => (
        <ClassItem key={classItem.id} classItem={classItem} />
      ))}
    </div>
  )
}

export default ClassList
