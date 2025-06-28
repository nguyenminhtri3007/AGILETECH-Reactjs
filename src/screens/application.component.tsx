import './application.component.scss';
import * as AuthService from "../data/services/auth.service";
import { AuthModel } from '../data/models/auth.model';
import { ErrorModel } from '../common/model/error.model';

const ApplicationComponent = () => {
  
  const signIn = async () => {
    try {
      /** T fake thôi, m tự làm giao diện đi **/
      const model = new AuthModel("adminRefresh");
      const resp = await AuthService.signIn(model);
      console.log("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
      if(error instanceof ErrorModel){
        console.log("ye");
      }
    }
  }
  return (
    <div className="App">
      <input />
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}
 
export default ApplicationComponent;
