import { SyntheticEvent, useState } from "react";
import useUserApi from "../../features/users/hooks/useUserApi";
import FormStyled from "./RegisterStyled";

const Register = (): JSX.Element => {
  const initialState = {
    username: "",
    password: "",
    repeatPassword: "",
  };

  const { register } = useUserApi();
  const [formData, setFormData] = useState(initialState);
  const [fieldStatus, setFieldStatus] = useState("");

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setFieldStatus("form__input--wrong");
    } else {
      register({ username: formData.username, password: formData.password });
    }

    setFormData(initialState);
  };

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldStatus("");
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const hasEmptyFields =
    formData.username.length < 5 ||
    formData.password.length < 5 ||
    formData.repeatPassword.length < 5;

  return (
    <FormStyled onSubmit={onSubmitData} className="form">
      <span className="form__heading">Create your account</span>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="form__input"
          autoComplete="off"
          placeholder="Enter your username"
          required
          onChange={onChangeData}
          value={formData.username}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={`form__input ${fieldStatus}`}
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          required
          onChange={onChangeData}
          value={formData.password}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Repeat password
        </label>
        <input
          id="repeatPassword"
          className={`form__input ${fieldStatus}`}
          type="password"
          autoComplete="off"
          placeholder="Repeat you password"
          required
          onChange={onChangeData}
          value={formData.repeatPassword}
        />
      </div>
      <button className="form__button" type="submit" disabled={hasEmptyFields}>
        Register
      </button>
    </FormStyled>
  );
};
export default Register;
