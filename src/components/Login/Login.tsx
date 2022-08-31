import { SyntheticEvent, useState } from "react";
import useUserApi from "../../features/users/hooks/useUserApi";
import FormStyled from "../../styles/FormStyled";

const Register = (): JSX.Element => {
  const initialState = {
    username: "",
    password: "",
  };

  const { login } = useUserApi();
  const [formData, setFormData] = useState(initialState);
  const [fieldStatus] = useState("");

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();

    login({ username: formData.username, password: formData.password });

    setFormData(initialState);
  };
  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const hasEmptyFields =
    formData.username.length < 5 || formData.password.length < 5;

  return (
    <FormStyled onSubmit={onSubmitData} className="form">
      <h2 className="form__heading">Create your account</h2>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className={`form__input ${fieldStatus}`}
          autoComplete="off"
          placeholder="Enter your username"
          required
          onChange={onChangeData}
          value={formData.username}
        />
      </div>
      {fieldStatus === "form__input--wrong" && (
        <span className="form__wrong-password">
          Incorrect username or password
        </span>
      )}
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
      <button className="form__button" type="submit" disabled={hasEmptyFields}>
        Login
      </button>
    </FormStyled>
  );
};
export default Register;
