import { ReactNode } from 'react'
import {
  HomeFilled,
  AppstoreFilled,
  BarsOutlined,
  ToolOutlined,
  UsergroupDeleteOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons'

export interface IMenuChild {
  title: string
  key: string
  icon: ReactNode
}
export interface IMenuItem {
  title: string
  key: string
  icon: ReactNode
  isPublic?: boolean
  children?: IMenuChild[]

}
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: <HomeFilled />, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: 'products',
    icon: <AppstoreFilled />,
    children: [
      // 子菜单列表
      {
        title: '品类管理',
        key: 'category',
        icon: <BarsOutlined />,
      },
      {
        title: '商品管理',
        key: 'product',
        icon: <ToolOutlined />,
      },
    ],
  },

  {
    title: '用户管理',
    key: 'user',
    icon: <UsergroupDeleteOutlined />,
  },
  {
    title: '角色管理',
    key: 'role',
    icon: <SafetyOutlined />,
  },

  {
    title: '图形图表',
    key: 'charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: 'bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: 'line',
        icon: <LineChartOutlined />,
      },
      {
        title: '饼图',
        key: 'pie',
        icon: <PieChartOutlined />,
      },
    ],
  },
]

export default menuList
