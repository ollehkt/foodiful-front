import { InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { api } from '../../components/axios/axiosInstance'
import ClassList from '../../components/class/ClassList'
import { ClassType } from '../../components/class/types/classTypes'
import { getStoredUser } from '../../components/util/userStorage'

export const getServerSideProps = async (): Promise<{ props: { classes: ClassType[] } }> => {
  const { data: classes } = await api('/class/all')
  return { props: { classes } }
}

const ClassPage = ({ classes }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])
  return (
    <div>
      <ClassList classList={classes} />
    </div>
  )
}

export default ClassPage
