import React, { useContext } from 'react'
import { useUserData } from '../../lib/react/hooks/useUserData'
import styles from './searchblock.less'
import { UserBlock } from './UserBlock'

export function SearchBlock() {
  const { data, loading } = useUserData()
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
