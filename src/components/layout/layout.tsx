import React from 'react'
import { Link } from 'react-router-dom'
import { Layout as AntLayout, Menu, Typography } from 'antd'
import { format, subMonths } from 'date-fns'

const { Header, Sider, Content } = AntLayout
const { Title } = Typography

interface Props {
  date: string
}

const Layout: React.FC<Props> = ({ children, date }) => {
  const months = Array(12)
    .fill(new Date())
    .map((date, i) => subMonths(date, i))

  const groupedMonths = Object.entries(
    months.reduce((all: { [key: string]: Date[] }, month) => {
      const year = format(month, 'yyyy')

      console.log(year)

      if (all[year]) {
        all[year].push(month)
      } else {
        all[year] = [month]
      }

      return all
    }, {}),
  ).reverse()

  return (
    <AntLayout>
      <Header style={{ background: '#fff' }}>
        <Title>{format(new Date(date), 'MMMM yyyy')}</Title>
      </Header>
      <AntLayout>
        <Sider style={{ background: '#fff' }}>
          <Menu selectedKeys={[date]}>
            {groupedMonths.map(([year, group]) => {
              return (
                <Menu.ItemGroup key={year} title={year}>
                  {group.map(month => {
                    return (
                      <Menu.Item key={format(month, 'yyyy-MM')}>
                        <Link to={`/${format(month, 'yyyy-MM')}/transactions`}>{format(month, 'LLLL')}</Link>
                      </Menu.Item>
                    )
                  })}
                </Menu.ItemGroup>
              )
            })}
          </Menu>
        </Sider>
        <Content style={{ minHeight: '100%' }}>{children}</Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
