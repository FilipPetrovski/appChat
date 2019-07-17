import {UserModel} from '../models/userModel';

export class UserServices {
  users: UserModel[] = [
    new UserModel(0, 'Echo Bot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg' +
      '/220px-User_icon_2.svg.png'),
    new UserModel(1, 'Reverse Bot', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1' +
      '.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new UserModel(2, 'Waiting Bot', 'http://files.softicons.com/download/' +
      'application-icons/toolbar-icons-by-gentleface/png/512/user.png'),
    new UserModel(3, 'Lady Capulet', 'https://cdn1.vectorstock.com/i/1000x1000/88/10/' +
      'computer-user-person-icon-vector-9868810.jpg'),
  ];
  getUser(index: number) {
    return this.users[index];
  }
}
