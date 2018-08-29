'use strict';
import checkLogin from './checkLogin';
export default app=>{
  app.use('/login',checkLogin);
}