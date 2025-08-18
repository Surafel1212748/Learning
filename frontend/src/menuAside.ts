import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/analytics/analytics-list',
    label: 'Analytics',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiChartLine' in icon ? icon['mdiChartLine' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ANALYTICS'
  },
  {
    href: '/courses/courses-list',
    label: 'Courses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COURSES'
  },
  {
    href: '/discussion_boards/discussion_boards-list',
    label: 'Discussion boards',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiForumOutline' in icon ? icon['mdiForumOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DISCUSSION_BOARDS'
  },
  {
    href: '/enrollments/enrollments-list',
    label: 'Enrollments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiClipboardCheckOutline' in icon ? icon['mdiClipboardCheckOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ENROLLMENTS'
  },
  {
    href: '/instructors/instructors-list',
    label: 'Instructors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccountTie' in icon ? icon['mdiAccountTie' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_INSTRUCTORS'
  },
  {
    href: '/students/students-list',
    label: 'Students',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiSchool' in icon ? icon['mdiSchool' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_STUDENTS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
