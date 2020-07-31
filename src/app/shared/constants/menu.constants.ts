export const MenuConstants = {
  menuData: [
    {
      title: 'Demo Game',
      path: 'dashboard',
      icon: '../../../assets/images/platform-settings-item.png',
      arrow: '../../../assets/images/menu-arrow.png',
      children: [
        {
          title: 'Games',
          path: 'dashboard',
        },
      ]
    },
    {
      title: 'Invite Friends',
      path: 'friends',
      icon: '../../../assets/images/friends.png',
    }
  ],
  logoutItem: {
    title: 'Log Out',
    path: 'auth',
    icon: '../../../assets/images/logout.png',
    arrow: null
  }
}