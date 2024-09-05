import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings
} from '@tabler/icons-react'
import { nanoid as uniqueId } from 'nanoid'

const Menuitems = [
  {
    id: uniqueId(10),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/',
    children: [
      {
        id: uniqueId(10),
        title: 'Modern',
        icon: IconPoint,
        href: '/',
        chipColor: 'secondary'
      },
      {
        id: uniqueId(10),
        title: 'eCommerce',
        icon: IconPoint,
        href: '/dashboards/ecommerce'
      }
    ]
  },
  {
    id: uniqueId(10),
    title: 'Apps',
    icon: IconApps,
    href: '/apps/',
    children: [
      {
        id: uniqueId(10),
        title: 'Contacts',
        icon: IconPoint,
        href: '/apps/contacts'
      },
      {
        id: uniqueId(10),
        title: 'Chats',
        icon: IconPoint,
        href: '/apps/chats'
      },
      {
        id: uniqueId(10),
        title: 'Notes',
        icon: IconPoint,
        href: '/apps/notes'
      },
      {
        id: uniqueId(10),
        title: 'Calendar',
        icon: IconPoint,
        href: '/apps/calendar'
      },
      {
        id: uniqueId(10),
        title: 'Email',
        icon: IconPoint,
        href: '/apps/email'
      },
      {
        id: uniqueId(10),
        title: 'Tickets',
        icon: IconPoint,
        href: '/apps/tickets'
      },
      {
        id: uniqueId(10),
        title: 'User Profile',
        icon: IconPoint,
        href: '/user-profile',
        children: [
          {
            id: uniqueId(10),
            title: 'Profile',
            icon: IconPoint,
            href: '/user-profile'
          },
          {
            id: uniqueId(10),
            title: 'Followers',
            icon: IconPoint,
            href: '/apps/followers'
          },
          {
            id: uniqueId(10),
            title: 'Friends',
            icon: IconPoint,
            href: '/apps/friends'
          },
          {
            id: uniqueId(10),
            title: 'Gallery',
            icon: IconPoint,
            href: '/apps/gallery'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Ecommerce',
        icon: IconPoint,
        href: '/apps/ecommerce/',
        children: [
          {
            id: uniqueId(10),
            title: 'Shop',
            icon: IconPoint,
            href: '/apps/ecommerce/shop'
          },
          {
            id: uniqueId(10),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/ecommerce/detail/1'
          },
          {
            id: uniqueId(10),
            title: 'List',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-product-list'
          },
          {
            id: uniqueId(10),
            title: 'Checkout',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-checkout'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Blog',
        icon: IconPoint,
        href: '/apps/blog/',
        children: [
          {
            id: uniqueId(10),
            title: 'Posts',
            icon: IconPoint,
            href: '/apps/blog/posts'
          },
          {
            id: uniqueId(10),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow'
          }
        ]
      }
    ]
  },

  {
    id: uniqueId(10),
    title: 'Pages',
    icon: IconClipboard,
    href: '/ui-components/',
    children: [
      {
        id: uniqueId(10),
        title: 'Treeview',
        icon: IconPoint,
        href: '/theme-pages/treeview'
      },
      {
        id: uniqueId(10),
        title: 'Pricing',
        icon: IconPoint,
        href: '/theme-pages/pricing'
      },
      {
        id: uniqueId(10),
        title: 'Account Setting',
        icon: IconPoint,
        href: '/theme-pages/account-settings'
      },
      {
        id: uniqueId(10),
        title: 'FAQ',
        icon: IconPoint,
        href: '/theme-pages/faq'
      },
      {
        id: uniqueId(10),
        title: 'Widgets',
        icon: IconPoint,
        href: '/widgets/cards',
        children: [
          {
            id: uniqueId(10),
            title: 'Cards',
            icon: IconPoint,
            href: '/widgets/cards'
          },
          {
            id: uniqueId(10),
            title: 'Banners',
            icon: IconPoint,
            href: '/widgets/banners'
          },
          {
            id: uniqueId(10),
            title: 'Charts',
            icon: IconPoint,
            href: '/widgets/charts'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Ui',
        icon: IconPoint,
        href: '/ui-components/alert',
        children: [
          {
            id: uniqueId(10),
            title: 'Alert',
            icon: IconPoint,
            href: '/ui-components/alert'
          },
          {
            id: uniqueId(10),
            title: 'Accordion',
            icon: IconPoint,
            href: '/ui-components/accordion'
          },
          {
            id: uniqueId(10),
            title: 'Avatar',
            icon: IconPoint,
            href: '/ui-components/avatar'
          },
          {
            id: uniqueId(10),
            title: 'Chip',
            icon: IconPoint,
            href: '/ui-components/chip'
          },
          {
            id: uniqueId(10),
            title: 'Dialog',
            icon: IconPoint,
            href: '/ui-components/dialog'
          },
          {
            id: uniqueId(10),
            title: 'List',
            icon: IconPoint,
            href: '/ui-components/list'
          },
          {
            id: uniqueId(10),
            title: 'Popover',
            icon: IconPoint,
            href: '/ui-components/popover'
          },
          {
            id: uniqueId(10),
            title: 'Rating',
            icon: IconPoint,
            href: '/ui-components/rating'
          },
          {
            id: uniqueId(10),
            title: 'Tabs',
            icon: IconPoint,
            href: '/ui-components/tabs'
          },
          {
            id: uniqueId(10),
            title: 'Tooltip',
            icon: IconPoint,
            href: '/ui-components/tooltip'
          },
          {
            id: uniqueId(10),
            title: 'Transfer List',
            icon: IconPoint,
            href: '/ui-components/transfer-list'
          },
          {
            id: uniqueId(10),
            title: 'Typography',
            icon: IconPoint,
            href: '/typography'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Charts',
        icon: IconPoint,
        href: '/charts/',
        children: [
          {
            id: uniqueId(10),
            title: 'Line',
            icon: IconPoint,
            href: '/charts/line-chart'
          },
          {
            id: uniqueId(10),
            title: 'Gredient',
            icon: IconPoint,
            href: '/charts/gredient-chart'
          },
          {
            id: uniqueId(10),
            title: 'Area',
            icon: IconPoint,
            href: '/charts/area-chart'
          },
          {
            id: uniqueId(10),
            title: 'Candlestick',
            icon: IconPoint,
            href: '/charts/candlestick-chart'
          },
          {
            id: uniqueId(10),
            title: 'Column',
            icon: IconPoint,
            href: '/charts/column-chart'
          },
          {
            id: uniqueId(10),
            title: 'Doughtnut & Pie',
            icon: IconPoint,
            href: '/charts/doughnut-pie-chart'
          },
          {
            id: uniqueId(10),
            title: 'RadialBar & Radar',
            icon: IconPoint,
            href: '/charts/radialbar-chart'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Auth',
        icon: IconPoint,
        href: '/400',
        children: [
          {
            id: uniqueId(10),
            title: 'Error',
            icon: IconAlertCircle,
            href: '/400'
          },
          {
            id: uniqueId(10),
            title: 'Maintenance',
            icon: IconSettings,
            href: '/auth/maintenance'
          },
          {
            id: uniqueId(10),
            title: 'Login',
            icon: IconLogin,
            href: '/auth/auth1/login',
            children: [
              {
                id: uniqueId(10),
                title: 'Side Login',
                icon: IconPoint,
                href: '/auth/auth1/login'
              },
              {
                id: uniqueId(10),
                title: 'Boxed Login',
                icon: IconPoint,
                href: 'auth/auth2/login'
              }
            ]
          },
          {
            id: uniqueId(10),
            title: 'Register',
            icon: IconUserPlus,
            href: '/auth/auth1/register',
            children: [
              {
                id: uniqueId(10),
                title: 'Side Register',
                icon: IconPoint,
                href: '/auth/auth1/register'
              },
              {
                id: uniqueId(10),
                title: 'Boxed Register',
                icon: IconPoint,
                href: '/auth/auth2/register'
              }
            ]
          },
          {
            id: uniqueId(10),
            title: 'Forgot Password',
            icon: IconRotate,
            href: '/auth/auth1/forgot-password',
            children: [
              {
                id: uniqueId(10),
                title: 'Side Forgot Password',
                icon: IconPoint,
                href: '/auth/auth1/forgot-password'
              },
              {
                id: uniqueId(10),
                title: 'Boxed Forgot Password',
                icon: IconPoint,
                href: '/auth/auth2/forgot-password'
              }
            ]
          },
          {
            id: uniqueId(10),
            title: 'Two Steps',
            icon: IconZoomCode,
            href: '/auth/auth1/two-steps',
            children: [
              {
                id: uniqueId(10),
                title: 'Side Two Steps',
                icon: IconPoint,
                href: '/auth/auth1/two-steps'
              },
              {
                id: uniqueId(10),
                title: 'Boxed Two Steps',
                icon: IconPoint,
                href: '/auth/auth2/two-steps'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: uniqueId(10),
    title: 'Forms',
    icon: IconFileDescription,
    href: '/forms/form-elements/autocomplete',
    children: [
      {
        id: uniqueId(10),
        title: 'Form Elements',
        icon: IconPoint,
        href: '/forms/form-elements/autocomplete',
        children: [
          {
            id: uniqueId(10),
            title: 'Autocomplete',
            icon: IconPoint,
            href: '/forms/form-elements/autocomplete'
          },
          {
            id: uniqueId(10),
            title: 'Button',
            icon: IconPoint,
            href: '/forms/form-elements/button'
          },
          {
            id: uniqueId(10),
            title: 'Radio',
            icon: IconPoint,
            href: '/forms/form-elements/radio'
          },
          {
            id: uniqueId(10),
            title: 'Date Time',
            icon: IconPoint,
            href: '/forms/form-elements/date-time'
          },
          {
            id: uniqueId(10),
            title: 'Slider',
            icon: IconPoint,
            href: '/forms/form-elements/slider'
          },
          {
            id: uniqueId(10),
            title: 'Switch',
            icon: IconPoint,
            href: '/forms/form-elements/switch'
          }
        ]
      },
      {
        id: uniqueId(10),
        title: 'Form Layout',
        icon: IconPoint,
        href: '/forms/form-layouts'
      },
      {
        id: uniqueId(10),
        title: 'Form Horizontal',
        icon: IconPoint,
        href: '/forms/form-horizontal'
      },
      {
        id: uniqueId(10),
        title: 'Form Vertical',
        icon: IconPoint,
        href: '/forms/form-vertical'
      },
      {
        id: uniqueId(10),
        title: 'Form Custom',
        icon: IconPoint,
        href: '/forms/form-custom'
      },
      {
        id: uniqueId(10),
        title: 'Form Wizard',
        icon: IconPoint,
        href: '/forms/form-wizard'
      },
      {
        id: uniqueId(10),
        title: 'Form Validation',
        icon: IconPoint,
        href: '/forms/form-validation'
      }
    ]
  },
  {
    id: uniqueId(10),
    title: 'Tables',
    icon: IconBorderAll,
    href: '/tables/',
    children: [
      {
        id: uniqueId(10),
        title: 'Basic',
        icon: IconPoint,
        href: '/tables/basic'
      },
      {
        id: uniqueId(10),
        title: 'Collapsible',
        icon: IconPoint,
        href: '/tables/collapsible'
      },
      {
        id: uniqueId(10),
        title: 'Enhanced',
        icon: IconPoint,
        href: '/tables/enhanced'
      },
      {
        id: uniqueId(10),
        title: 'Fixed Header',
        icon: IconPoint,
        href: '/tables/fixed-header'
      },
      {
        id: uniqueId(10),
        title: 'Pagination',
        icon: IconPoint,
        href: '/tables/pagination'
      },
      {
        id: uniqueId(10),
        title: 'Search',
        icon: IconPoint,
        href: '/tables/search'
      }
    ]
  }
]
export default Menuitems
