import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Layout as AntLayout, Menu, PageHeader, Icon } from 'antd'
import { format, subMonths } from 'date-fns'

const { Header, Sider, Content } = AntLayout

interface Props {
  date: string
  backTo: string
  currentPage: string
}

const Layout: React.FC<Props> = ({ children, date, backTo, currentPage }) => {
  const history = useHistory()

  const months = Array(12)
    .fill(new Date())
    .map((date, i) => subMonths(date, i))

  const groupedMonths = Object.entries(
    months.reduce((all: { [key: string]: Date[] }, month) => {
      const year = format(month, 'yyyy')

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
        <PageHeader
          backIcon={<Icon type='arrow-left' />}
          onBack={() => history.push(backTo)}
          title={format(new Date(date), 'MMMM yyyy')}
        />
      </Header>

      <AntLayout>
        <Sider width={300} theme='light'>
          <Menu selectedKeys={[date]}>
            {groupedMonths.map(([year, group]) => {
              return (
                <Menu.ItemGroup key={year} title={year}>
                  {group.map(month => {
                    return (
                      <Menu.Item key={format(month, 'yyyy-MM')}>
                        <Link to={`/${format(month, 'yyyy-MM')}/${currentPage}`}>{format(month, 'LLLL')}</Link>
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
