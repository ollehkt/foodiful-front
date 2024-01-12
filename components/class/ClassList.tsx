import React from 'react'
import ClassItem from './ClassItem'
import { ClassType } from './types/classTypes'

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
