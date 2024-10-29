import React, { useState, useMemo } from 'react'

import { ServerData, DIRECTIONS } from '../../types'
import Arrow from '../Arrow/Arrow'

interface ServersListProps {
  servers: ServerData[]
}

type SortKey = keyof ServerData

interface SortConfig {
  key: SortKey
  direction: DIRECTIONS
}

const ServersList: React.FC<ServersListProps> = ({ servers }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: DIRECTIONS.asc,
  })

  const sortedServers = useMemo(() => {
    const sortedData = [...servers]

    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === DIRECTIONS.asc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortConfig.direction === DIRECTIONS.asc
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue)
    })

    return sortedData
  }, [servers, sortConfig.direction, sortConfig.key])

  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig) => {
      return {
        key,
        direction:
          prevConfig.key === key && prevConfig.direction === DIRECTIONS.asc
            ? DIRECTIONS.desc
            : DIRECTIONS.asc,
      }
    })
  }

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig.key !== columnKey) {
      return <div />
    }
    return sortConfig.direction === DIRECTIONS.asc ? (
      <Arrow />
    ) : (
      <Arrow reversed />
    )
  }

  return (
    <>
      {servers.length > 0 && (
        <table>
          <thead>
            <tr>
              {(['name', 'distance'] as const).map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  role="button"
                  aria-label={column}
                >
                  <div>
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    <SortIcon columnKey={column} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedServers.map((server) => (
              <tr key={server.name}>
                <td>{server.name}</td>
                <td>{server.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default ServersList