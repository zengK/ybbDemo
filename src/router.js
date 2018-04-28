import Index from '@/components/index'
import Login from '@/components/login'
import Company from '@/components/company'
import CompanyMain from '@/components/comapany/companyMain'
export default [
    {
      	path: '/',
      	component: Login
    },
    {
		path: '/index',
      	component: Index
    },
    {
    path: '/company',
    component: Company
    },
  {
    path: '/company/companyMain',
    component: CompanyMain
  }
]
