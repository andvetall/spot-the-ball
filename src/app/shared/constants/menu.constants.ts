export const MenuConstants = {
  menuData: [
    {
      title: 'Demo Game',
      path: '',
      icon: '../../../assets/images/platform-settings-item.png',
      arrow: '../../../assets/images/menu-arrow.png',
      children: [
        {
          title: 'Games',
          path: 'dashboard',
        },
      ]
    }
  ],
  logoutItem: {
    title: 'Log Out',
    path: 'auth',
    icon: '../../../assets/images/logout.png',
    arrow: null
  }
}