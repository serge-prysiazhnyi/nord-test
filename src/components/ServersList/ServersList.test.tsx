import { render, screen, within } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import ServersList from './ServersList'
import { ServerData } from '../../types'
import mockServers from '../../mocks/mockServers.json'

const getRowsData = () => {
  const rows = screen.getAllByRole('row')

  return rows.slice(1).map((row) => {
    const cells = within(row).getAllByRole('cell')
    return {
      name: cells[0].textContent,
      distance: Number(cells[1].textContent),
    }
  })
}

describe('ServersList', () => {
  const renderComponent = (servers: ServerData[] = []) => {
    render(<ServersList servers={servers} />)

    const user = UserEvent.setup()

    const nameColumnHead = screen.getByRole('button', { name: /name/i })
    const distanceColumnHead = screen.getByRole('button', { name: /distance/i })
    // const arrowIcon = screen.getByRole('img', { name: /arrow up/i })

    return {
      user,
      nameColumnHead,
      distanceColumnHead,
      //   arrowIcon,
    }
  }

  test('should render table with correct headers', () => {
    renderComponent(mockServers)

    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/distance/i)).toBeInTheDocument()
  })

  test('should render list of servers with defaullt sorting', () => {
    renderComponent(mockServers)

    const rows = getRowsData()
    const sortedServers = [...mockServers].sort((a, b) =>
      a.name.localeCompare(b.name),
    )

    sortedServers.forEach((server, i) => {
      expect(server.name).toBe(rows[i]['name'])
      expect(server.distance).toBe(rows[i]['distance'])
    })
  })

  test('should handle sorting by name in desc order', async () => {
    const { user, nameColumnHead } = renderComponent(mockServers)

    await user.click(nameColumnHead)

    const rows = getRowsData()
    const sortedServers = [...mockServers].sort((a, b) =>
      b.name.localeCompare(a.name),
    )

    sortedServers.forEach((server, i) => {
      expect(server.name).toBe(rows[i]['name'])
    })
  })

  test('should handle sorting by distance', async () => {
    const { user, distanceColumnHead } = renderComponent(mockServers)

    await user.click(distanceColumnHead)

    const rows = getRowsData()

    const sortedServers = [...mockServers].sort(
      (a, b) => a.distance - b.distance,
    )

    sortedServers.forEach((server, i) => {
      expect(server.distance).toBe(rows[i]['distance'])
    })
  })

  test('should handle sorting by distance in desc order', async () => {
    const { user, distanceColumnHead } = renderComponent(mockServers)

    await user.click(distanceColumnHead)
    await user.click(distanceColumnHead)

    const rows = getRowsData()

    const sortedServers = [...mockServers].sort(
      (a, b) => b.distance - a.distance,
    )

    sortedServers.forEach((server, i) => {
      expect(server.distance).toBe(rows[i]['distance'])
    })
  })

  test('should render arrow pointing up by default', () => {
    renderComponent(mockServers)
    const arrowIcon = screen.getByRole('img', { name: /arrow up/i })

    expect(arrowIcon).toBeInTheDocument()
  })

  test('should toggle arrow direction in name column', async () => {
    const { user, nameColumnHead } = renderComponent(mockServers)

    await user.click(nameColumnHead)

    const arrowIcon = await screen.findByRole('img', { name: /arrow down/i })

    expect(arrowIcon).toBeInTheDocument()
  })

  test('should move arrow when changing sort column', async () => {
    const { user, distanceColumnHead } = renderComponent(mockServers)

    await user.click(distanceColumnHead)

    const arrowIcon = await within(distanceColumnHead).findByRole('img', {
      name: /arrow up/i,
    })

    expect(arrowIcon).toBeInTheDocument()
  })
})
