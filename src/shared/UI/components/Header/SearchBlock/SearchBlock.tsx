import React, { useContext } from 'react'
import { userContext } from '../../../../utils/react/context/userContext'
import styles from './searchblock.less'
import { UserBlock } from './UserBlock'

export function SearchBlock() {
  const { data, loading } = useContext(userContext)
  return (
    <div className={styles.searchBlock}>
      <UserBlock
        avatarSrc={data?.iconImg}
        username={data?.name}
        loading={loading}
      />
    </div>
  )
}
