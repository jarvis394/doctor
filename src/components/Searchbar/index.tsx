import React, { useState } from 'react'

type SearchbarProps = {
  title: string
}

const Searchbar: React.FC<SearchbarProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event: any) => {
    setSearchQuery(event.target.value)
  }

  return (
    <input
      type="text"
      placeholder={title}
      value={searchQuery}
      onChange={handleChange}
      style={{
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        border: 'none',
        background: '#292929',
        color: '#ffff',
        fontSize: 16,
        outline: 'none',
        height: 12,
      }}
    />
  )
}

export default Searchbar
