import React from 'react'
import { ClassType } from './types/classTypes'

interface PropsType {
  classItem: ClassType
}

const ClassItem = ({ classItem }: PropsType) => {
  return <div>ClassItem</div>
}

export default ClassItem
