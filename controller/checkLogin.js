'use strict';
class CheckLogin {
    constructor(){
      //super();
      this.login = this.login.bind(this);
    }
    async login(req, res, next){
        res.send('接口现在通了');
    }

}
export default new CheckLogin();